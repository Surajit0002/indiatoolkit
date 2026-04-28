// Tool Usage Analytics System
// Tracks tool usage for trending calculations and personalized recommendations
import React from 'react';

interface ToolUsage {
  toolId: string;
  toolSlug: string;
  clicks: number;
  uniqueUsers: number;
  lastUsed: string;
  firstUsed: string;
  dailyUsage: Record<string, number>;
  clicks24h?: number;
  clicks7d?: number;
  trendingScore?: number;
  isTrending?: boolean;
}

interface ToolClickEvent {
  toolId: string;
  toolSlug: string;
  timestamp: string;
  userId?: string;
  userAgent?: string;
  referrer?: string;
}

const STORAGE_KEY = 'toolkit-analytics-v2';
const TRENDING_KEY = 'toolkit-trending-v2';
const RECENT_USAGE_KEY = 'toolkit-recent-usage';

class ToolAnalytics {
  private data: Record<string, ToolUsage> = {};
  private initialized: boolean = false;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.data = JSON.parse(stored);
        }
      }
      this.initialized = true;
    } catch (error) {
      console.warn('Failed to load analytics data:', error);
      this.data = {};
      this.initialized = false;
    }
  }

  private saveToStorage() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      }
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  trackToolClick(event: ToolClickEvent) {
    const { toolId, toolSlug, timestamp } = event;
    const today = new Date().toISOString().split('T')[0];

    if (!this.data[toolId]) {
      this.data[toolId] = {
        toolId,
        toolSlug,
        clicks: 0,
        uniqueUsers: 0,
        lastUsed: timestamp,
        firstUsed: timestamp,
        dailyUsage: {},
      };
    }

    const toolData = this.data[toolId];
    toolData.clicks += 1;
    toolData.lastUsed = timestamp;
    
    if (!toolData.dailyUsage[today]) {
      toolData.dailyUsage[today] = 0;
    }
    toolData.dailyUsage[today] += 1;

    // Track recent usage for personalized recommendations
    this.trackRecentUsage(toolId, toolSlug, timestamp);

    this.saveToStorage();

    // Send to server for persistent tracking (optional)
    this.sendToServer(event);
  }

  private trackRecentUsage(toolId: string, toolSlug: string, timestamp: string) {
    const recent: Array<{ toolId: string; toolSlug: string; timestamp: string }> = 
      this.getRecentUsage();
    
    recent.unshift({ toolId, toolSlug, timestamp });
    
    // Keep only last 10 usages
    if (recent.length > 10) {
      recent.splice(10);
    }

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(RECENT_USAGE_KEY, JSON.stringify(recent));
      }
    } catch (error) {
      console.warn('Failed to save recent usage:', error);
    }
  }

  getRecentUsage(): Array<{ toolId: string; toolSlug: string; timestamp: string }> {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(RECENT_USAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch (error) {
      console.warn('Failed to load recent usage:', error);
    }
    return [];
  }

  getToolStats(toolId: string): ToolUsage | null {
    return this.data[toolId] || null;
  }

  getAllToolStats(): ToolUsage[] {
    return Object.values(this.data);
  }

  getTrendingTools(limit: number = 10): ToolUsage[] {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];

    const tools = Object.values(this.data).map(tool => {
      // Calculate 24h clicks
      let clicks24h = 0;
      let clicks7d = 0;
      const clicksAllTime = tool.clicks;

      for (const [date, count] of Object.entries(tool.dailyUsage)) {
        if (date >= yesterdayStr) {
          clicks24h += count;
        }
        if (date >= sevenDaysAgoStr) {
          clicks7d += count;
        }
      }

      // Calculate trending score
      // Weight: recent velocity heavily, absolute numbers moderately
      const velocityScore = clicks24h * 10; // 24h activity
      const weekScore = clicks7d * 2; // 7-day activity
      const totalScore = Math.log(clicksAllTime + 1) * 5; // All-time (logarithmic)

      const trendingScore = velocityScore + weekScore + totalScore;

      // Check if trending (significant 24h activity or growth)
      const isTrending = clicks24h >= 5 || clicks24h > (clicks7d / 7) * 2;

      return {
        ...tool,
        clicks24h,
        clicks7d,
        trendingScore,
        isTrending,
      };
    });

    // Sort by trending score, then by 24h clicks
    return tools
      .sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return b.trendingScore! - a.trendingScore!;
      })
      .slice(0, limit);
  }

  getPopularTools(limit: number = 10): ToolUsage[] {
    return Object.values(this.data)
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, limit);
  }

  getPersonalizedRecommendations(allTools: Array<{ id: string; slug: string; category: string; tags?: string[] }>, limit: number = 6) {
    const recent = this.getRecentUsage();
    
    if (recent.length === 0) {
      // Return popular tools if no history
      return this.getPopularTools(limit);
    }

    // Get categories and tags from recent tools
    const recentToolIds = new Set(recent.map(t => t.toolId));
    const recentTools = allTools.filter(t => recentToolIds.has(t.id));
    
    const categoryCounts: Record<string, number> = {};
    const tagCounts: Record<string, number> = {};

    recentTools.forEach(tool => {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
      tool.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Score all tools based on similarity to recent usage
    const scoredTools = allTools
      .filter(tool => !recentToolIds.has(tool.id)) // Exclude recently used
      .map(tool => {
        let score = 0;

        // Category match bonus
        if (categoryCounts[tool.category]) {
          score += categoryCounts[tool.category] * 3;
        }

        // Tag match bonus
        tool.tags?.forEach(tag => {
          if (tagCounts[tag]) {
            score += tagCounts[tag] * 2;
          }
        });

        // Popularity bonus
        const toolStats = this.data[tool.id];
        if (toolStats) {
          score += Math.log(toolStats.clicks + 1);
        }

        return { tool, score };
      })
      .sort((a, b) => b.score - a.score);

    return scoredTools.slice(0, limit).map(item => item.tool);
  }

  private sendToServer(_event: ToolClickEvent) {
    // Optional: Send analytics to server for persistent tracking
    // In production, implement with fetch/API
    if (process.env.NODE_ENV === 'production') {
      // Implementation would go here
    }
  }

  clearData() {
    this.data = {};
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(RECENT_USAGE_KEY);
        localStorage.removeItem(TRENDING_KEY);
      }
    } catch (error) {
      console.warn('Failed to clear analytics data:', error);
    }
    this.initialized = false;
  }
}

// Singleton instance
export const toolAnalytics = new ToolAnalytics();

// React hook for easy usage
export function useTrackToolClick() {
  return (toolId: string, toolSlug: string) => {
    const event: ToolClickEvent = {
      toolId,
      toolSlug,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof window !== 'undefined' ? document.referrer : undefined,
    };
    toolAnalytics.trackToolClick(event);
  };
}

export function useTrendingTools() {
  const [trending, setTrending] = React.useState<ToolUsage[]>([]);

  React.useEffect(() => {
    setTrending(toolAnalytics.getTrendingTools(10));
  }, []);

  return trending;
}

export function usePopularTools() {
  const [popular, setPopular] = React.useState<ToolUsage[]>([]);

  React.useEffect(() => {
    setPopular(toolAnalytics.getPopularTools(10));
  }, []);

  return popular;
}
