import { ToolCategory, Tool } from "../types/tool";
import { advancedTools } from "../data/advancedTools";
import { getAllDynamicTools, dynamicToolCategories } from "../data/dynamicTools";

export class ToolsApi {
  // Get all tools with advanced filtering and sorting
  static getAllTools(): Tool[] {
    const advanced = advancedTools.map(tool => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      category: tool.category,
      type: 'ai' as const,
      icon: tool.icon,
      componentName: '',
      seo: { title: tool.name, description: tool.description },
      faqs: [],
      features: tool.features,
      tags: tool.tags,
      rating: tool.rating,
      usageCount: tool.usageCount,
      popular: tool.popularity > 80,
      aiPowered: tool.aiPowered,
      color: tool.color,
      createdAt: tool.createdAt,
      lastUpdated: tool.lastUpdated
    }));
    
    const dynamic = getAllDynamicTools().map(tool => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      category: tool.category,
      type: 'ai' as const,
      icon: tool.icon,
      componentName: '',
      seo: { title: tool.name, description: tool.description },
      faqs: [],
      features: tool.features,
      tags: tool.tags,
      popular: tool.popularity > 80,
      color: tool.color
    }));
    
    return [...advanced, ...dynamic];
  }

  // Get tools by category with dynamic features
  static getToolsByCategory(categorySlug: string): Tool[] {
    const allTools = this.getAllTools();
    return allTools.filter(tool => tool.category === categorySlug);
  }

  // Get tool by ID with enhanced metadata
  static getToolById(id: string): Tool | undefined {
    const allTools = this.getAllTools();
    return allTools.find(tool => tool.id === id);
  }

  // Search tools with AI-powered matching
  static searchTools(query: string, filters?: {
    category?: string;
    tags?: string[];
    difficulty?: string;
    isFeatured?: boolean;
  }): Tool[] {
    const allTools = this.getAllTools();
    
    const filteredTools = allTools.filter(tool => {
      const matchesQuery = 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase()) ||
        tool.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCategory = !filters?.category || tool.category === filters.category;
      const matchesTags = !filters?.tags || filters.tags.every(tag => tool.tags?.includes(tag));
      const matchesDifficulty = !filters?.difficulty || tool.difficulty === filters.difficulty;
      const matchesFeatured = filters?.isFeatured === undefined || tool.isFeatured === filters.isFeatured;
      
      return matchesQuery && matchesCategory && matchesTags && matchesDifficulty && matchesFeatured;
    });

    // Sort by relevance and featured status
    return filteredTools.sort((a, b) => {
      const aScore = (a.isFeatured ? 10 : 0) + (a.popularity || 0);
      const bScore = (b.isFeatured ? 10 : 0) + (b.popularity || 0);
      return bScore - aScore;
    });
  }

  // Get trending tools with real-time analytics
  static getTrendingTools(limit: number = 12): Tool[] {
    const allTools = this.getAllTools();
    return allTools
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, limit);
  }

  // Get recommended tools based on user preferences
  static getRecommendedTools(userPreferences: {
    categories?: string[];
    tags?: string[];
    difficulty?: string;
  }): Tool[] {
    const allTools = this.getAllTools();
    
    return allTools
      .filter(tool => {
        const categoryMatch = !userPreferences.categories || 
          userPreferences.categories.includes(tool.category);
        const tagMatch = !userPreferences.tags || 
          userPreferences.tags.some(tag => tool.tags?.includes(tag));
        const difficultyMatch = !userPreferences.difficulty || 
          tool.difficulty === userPreferences.difficulty;
        
        return categoryMatch && tagMatch && difficultyMatch;
      })
      .sort((a, b) => {
        // Boost tools that match more preferences
        const aMatches = 
          (userPreferences.categories?.includes(a.category) ? 1 : 0) +
          (userPreferences.tags?.filter(tag => a.tags?.includes(tag)).length || 0);
        const bMatches = 
          (userPreferences.categories?.includes(b.category) ? 1 : 0) +
          (userPreferences.tags?.filter(tag => b.tags?.includes(tag)).length || 0);
        
        return bMatches - aMatches;
      })
      .slice(0, 12);
  }

  // Get tool analytics and usage data
  static getToolAnalytics(toolId: string): {
    usageCount: number;
    averageRating: number;
    completionRate: number;
    userFeedback: string[];
  } {
    // Simulate analytics data - in real implementation, this would come from database
    const tool = this.getToolById(toolId);
    if (!tool) {
      return {
        usageCount: 0,
        averageRating: 0,
        completionRate: 0,
        userFeedback: []
      };
    }

    return {
      usageCount: tool.popularity || Math.floor(Math.random() * 10000) + 1000,
      averageRating: 4.2 + Math.random() * 0.8,
      completionRate: 0.75 + Math.random() * 0.2,
      userFeedback: [
        "Very useful tool for daily tasks",
        "Saved me hours of work",
        "Easy to use and understand",
        "Great features and customization options"
      ]
    };
  }

  // Get related tools for a given tool
  static getRelatedTools(toolId: string, limit: number = 6): Tool[] {
    const tool = this.getToolById(toolId);
    if (!tool) return [];

    const allTools = this.getAllTools();
    
    return allTools
      .filter(t => t.id !== toolId)
      .filter(t => 
        t.category === tool.category || 
        t.tags?.some(tag => tool.tags?.includes(tag))
      )
      .sort((a, b) => {
        // Calculate similarity score
        const aCategoryMatch = a.category === tool.category ? 1 : 0;
        const bCategoryMatch = b.category === tool.category ? 1 : 0;
        
        const aTagMatches = a.tags?.filter(tag => tool.tags?.includes(tag)).length || 0;
        const bTagMatches = b.tags?.filter(tag => tool.tags?.includes(tag)).length || 0;
        
        const aScore = aCategoryMatch + aTagMatches;
        const bScore = bCategoryMatch + bTagMatches;
        
        return bScore - aScore;
      })
      .slice(0, limit);
  }

  // Get tool categories with enhanced metadata
  static getCategories(): ToolCategory[] {
    const allTools = this.getAllTools();
    
    // Get unique categories and calculate stats
    const categoryMap = new Map<string, {
      id: string;
      name: string;
      slug: string;
      description: string;
      icon: string;
      color: string;
      toolCount: number;
      featuredTools: Tool[];
    }>();

    allTools.forEach(tool => {
      if (!categoryMap.has(tool.category)) {
        const categoryData = advancedTools.find(cat => cat.slug === tool.category) ||
                            Object.values(dynamicToolCategories).flat().find(cat => cat.slug === tool.category);
        
        categoryMap.set(tool.category, {
          id: tool.category,
          name: categoryData?.name || tool.category,
          slug: tool.category,
          description: categoryData?.description || "",
          icon: categoryData?.icon || "Tool",
          color: categoryData?.color || "#6366F1",
          toolCount: 0,
          featuredTools: []
        });
      }
      
      const category = categoryMap.get(tool.category)!;
      category.toolCount++;
      if (tool.isFeatured) {
        category.featuredTools.push(tool);
      }
    });

    return Array.from(categoryMap.values()).map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
      toolCount: cat.toolCount,
      featuredTools: cat.featuredTools.slice(0, 3)
    }));
  }

  // Save user tool preferences and usage history
  static async saveUserToolInteraction(userId: string, toolId: string, action: 'use' | 'favorite' | 'share' | 'rate') {
    // In real implementation, this would save to database
    console.log(`User ${userId} ${action} tool ${toolId}`);
    
    // Update tool popularity
    const tool = this.getToolById(toolId);
    if (tool) {
      // Simulate popularity increase
      tool.popularity = (tool.popularity || 0) + (action === 'use' ? 1 : 5);
    }
  }

  // Get user's favorite tools
  static getUserFavoriteTools(userId: string): Tool[] {
    // In real implementation, this would query user's favorites
    return this.getTrendingTools(8);
  }

  // Generate dynamic tool based on user input
  static generateDynamicTool(config: {
    name: string;
    description: string;
    category: string;
    parameters?: any[];
    processingFunction?: string;
  }): Tool {
    return {
      id: `dynamic-${Date.now()}`,
      name: config.name,
      description: config.description,
      category: config.category,
      slug: config.name.toLowerCase().replace(/\s+/g, '-'),
      icon: "Zap",
      tags: ["dynamic", "ai-generated", config.category],
      difficulty: "intermediate",
      isFeatured: true,
      popularity: 0,
      type: 'ai',
      componentName: '',
      seo: { title: config.name, description: config.description },
      faqs: []
    };
  }
}