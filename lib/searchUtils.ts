import { Tool } from "@/types/tool";
import { categories } from "@/data/categories";

export interface SearchFilters {
  category?: string;
  toolType?: string;
  difficulty?: string;
  tags?: string[];
  minRating?: number;
  maxResults?: number;
  sortBy?: 'relevance' | 'popularity' | 'newest' | 'rating';
}

export interface SearchResult {
  tool: Tool;
  relevanceScore: number;
  matchType: 'exact' | 'partial' | 'fuzzy' | 'category' | 'tag';
  matchedFields: string[];
}

export interface SearchAnalytics {
  query: string;
  resultsCount: number;
  searchTime: number;
  filtersApplied: SearchFilters;
  topMatches: SearchResult[];
}

// Advanced fuzzy search algorithm
export function fuzzySearch(query: string, text: string, threshold: number = 0.6): boolean {
  if (!query || !text) return false;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match
  if (textLower.includes(queryLower)) return true;
  
  // Levenshtein distance for fuzzy matching
  const distance = levenshteinDistance(queryLower, textLower);
  const similarity = 1 - (distance / Math.max(queryLower.length, textLower.length));
  
  return similarity >= threshold;
}

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // insertion
        matrix[j - 1][i] + 1,     // deletion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Advanced search with multiple criteria
export function advancedSearch(
  tools: Tool[],
  query: string,
  filters: SearchFilters = {}
): SearchResult[] {
  const startTime = performance.now();
  const queryLower = query.toLowerCase().trim();
  
  if (!queryLower) return [];
  
  let results: SearchResult[] = [];
  
  // Search through all tools
  tools.forEach(tool => {
    const matches: SearchResult[] = [];
    const matchedFields: string[] = [];
    
    // Name matching (highest priority)
    if (fuzzySearch(queryLower, tool.name)) {
      matches.push({
        tool,
        relevanceScore: calculateRelevanceScore(queryLower, tool.name, 'name'),
        matchType: 'exact',
        matchedFields: ['name']
      });
      matchedFields.push('name');
    }
    
    // Description matching
    if (fuzzySearch(queryLower, tool.description)) {
      matches.push({
        tool,
        relevanceScore: calculateRelevanceScore(queryLower, tool.description, 'description'),
        matchType: 'partial',
        matchedFields: ['description']
      });
      matchedFields.push('description');
    }
    
    // Category matching
    const category = categories.find(cat => cat.id === tool.category);
    if (category && fuzzySearch(queryLower, category.name)) {
      matches.push({
        tool,
        relevanceScore: calculateRelevanceScore(queryLower, category.name, 'category'),
        matchType: 'category',
        matchedFields: ['category']
      });
      matchedFields.push('category');
    }
    
    // Tags matching
    if (tool.tags) {
      const matchingTags = tool.tags.filter(tag => 
        fuzzySearch(queryLower, tag)
      );
      if (matchingTags.length > 0) {
        matches.push({
          tool,
          relevanceScore: calculateRelevanceScore(queryLower, matchingTags.join(' '), 'tags'),
          matchType: 'tag',
          matchedFields: ['tags']
        });
        matchedFields.push('tags');
      }
    }
    
    // Fuzzy matching for broader results
    if (matches.length === 0) {
      const toolContent = `${tool.name} ${tool.description} ${category?.name || ''} ${tool.tags?.join(' ') || ''}`;
      if (fuzzySearch(queryLower, toolContent, 0.3)) {
        matches.push({
          tool,
          relevanceScore: calculateRelevanceScore(queryLower, toolContent, 'fuzzy'),
          matchType: 'fuzzy',
          matchedFields: ['fuzzy']
        });
      }
    }
    
    // Apply filters
    if (matches.length > 0 && passesFilters(tool, filters)) {
      const bestMatch = matches.reduce((prev, current) => 
        current.relevanceScore > prev.relevanceScore ? current : prev
      );
      results.push(bestMatch);
    }
  });
  
  // Sort by relevance score
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Apply sorting
  if (filters.sortBy) {
    results = sortResults(results, filters.sortBy);
  }
  
  // Limit results
  if (filters.maxResults) {
    results = results.slice(0, filters.maxResults);
  }
  
  return results;
}

// Calculate relevance score based on match quality
function calculateRelevanceScore(query: string, content: string, field: string): number {
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  
  let score = 0;
  
  // Exact match bonus
  if (contentLower.includes(queryLower)) {
    score += 100;
    // Bonus for exact phrase match at start
    if (contentLower.startsWith(queryLower)) {
      score += 50;
    }
  }
  
  // Word boundary matches
  const words = queryLower.split(/\s+/);
  words.forEach(word => {
    if (contentLower.includes(word)) {
      score += 30;
      // Extra bonus for word at start
      if (contentLower.startsWith(word)) {
        score += 20;
      }
    }
  });
  
  // Field-specific weighting
  const fieldWeights: Record<string, number> = {
    name: 3,
    description: 1,
    category: 2,
    tags: 1.5,
    fuzzy: 0.5
  };
  
  score *= fieldWeights[field] || 1;
  
  // Length penalty for very long content
  if (content.length > 200) {
    score *= 0.8;
  }
  
  return score;
}

// Check if tool passes all filters
function passesFilters(tool: Tool, filters: SearchFilters): boolean {
  if (filters.category && tool.category !== filters.category) {
    return false;
  }
  
  if (filters.toolType && tool.type !== filters.toolType) {
    return false;
  }
  
  if (filters.difficulty && tool.difficulty !== filters.difficulty) {
    return false;
  }
  
  if (filters.tags && filters.tags.length > 0) {
    if (!tool.tags || !filters.tags.every(tag => tool.tags?.includes(tag))) {
      return false;
    }
  }
  
  if (filters.minRating && tool.rating && tool.rating < filters.minRating) {
    return false;
  }
  
  return true;
}

// Sort results based on criteria
function sortResults(results: SearchResult[], sortBy: string): SearchResult[] {
  switch (sortBy) {
    case 'popularity':
      return results.sort((a, b) => (b.tool.usageCount || 0) - (a.tool.usageCount || 0));
    case 'newest':
      return results.sort((a, b) => 
        new Date(b.tool.createdAt || '').getTime() - new Date(a.tool.createdAt || '').getTime()
      );
    case 'rating':
      return results.sort((a, b) => (b.tool.rating || 0) - (a.tool.rating || 0));
    case 'relevance':
    default:
      return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}

// Generate search suggestions
export function generateSuggestions(query: string, tools: Tool[], limit: number = 5): string[] {
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase();
  const suggestions = new Set<string>();
  
  // Extract words from tool names and descriptions
  tools.forEach(tool => {
    const words = [
      ...tool.name.split(/\s+/),
      ...tool.description.split(/\s+/),
      ...(tool.tags || [])
    ];
    
    words.forEach(word => {
      const wordLower = word.toLowerCase();
      if (wordLower.startsWith(queryLower) && word.length > query.length) {
        suggestions.add(word);
      }
    });
  });
  
  return Array.from(suggestions).slice(0, limit);
}

// Search analytics and tracking
export function trackSearch(query: string, results: SearchResult[]): SearchAnalytics {
  return {
    query,
    resultsCount: results.length,
    searchTime: performance.now(),
    filtersApplied: {},
    topMatches: results.slice(0, 3)
  };
}

// Category-based search
export function searchByCategory(categoryId: string, tools: Tool[]): Tool[] {
  return tools.filter(tool => tool.category === categoryId);
}

// Tag-based search
export function searchByTag(tag: string, tools: Tool[]): Tool[] {
  return tools.filter(tool => tool.tags?.includes(tag));
}

// Recent searches (in-memory storage)
class RecentSearches {
  private static searches: string[] = [];
  private static readonly MAX_RECENT = 10;
  
  static add(query: string): void {
    if (!query.trim()) return;
    
    // Remove if already exists
    const index = this.searches.indexOf(query);
    if (index > -1) {
      this.searches.splice(index, 1);
    }
    
    // Add to beginning
    this.searches.unshift(query);
    
    // Keep only recent searches
    if (this.searches.length > this.MAX_RECENT) {
      this.searches = this.searches.slice(0, this.MAX_RECENT);
    }
  }
  
  static get(): string[] {
    return [...this.searches];
  }
  
  static clear(): void {
    this.searches = [];
  }
}

export { RecentSearches };