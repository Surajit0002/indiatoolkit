import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tools } from "../data/tools";
import { categories } from "../data/categories";
import { toolAnalytics } from "@/lib/analytics/tool-analytics";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

export function getToolsByCategory(categorySlug: string) {
  return tools.filter((tool) => tool.category === categorySlug);
}

export function getAllCategories() {
  return categories;
}

export function getAllTools() {
  return tools;
}

export function getPopularTools() {
  // Sort popular tools to the top, then by order in array
  return [...tools].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return 0;
  });
}

export function getRecentTools() {
  // Get recently added tools (those marked as new or last in array)
  return [...tools]
    .filter(tool => tool.isNew)
    .slice(0, 8);
}

export function getFeaturedTools() {
  // Get featured/highlighted tools
  return [...tools]
    .filter(tool => tool.isFeatured)
    .slice(0, 6);
}

export function getToolsBySearch(query: string) {
  const searchTerm = query.toLowerCase();
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm) ||
    tool.description.toLowerCase().includes(searchTerm) ||
    tool.category.toLowerCase().includes(searchTerm)
  );
}

export function getTrendingTools(limit: number = 10) {
  const trending = toolAnalytics.getTrendingTools(limit);
  return trending.map(t => tools.find(tool => tool.id === t.toolId)).filter(Boolean);
}

export function getPopularToolsByUsage(limit: number = 10) {
  const popular = toolAnalytics.getPopularTools(limit);
  return popular.map(t => tools.find(tool => tool.id === t.toolId)).filter(Boolean);
}

export function getPersonalizedRecommendations(recentToolIds: string[], limit: number = 6) {
  const allToolObjects = tools.map(t => ({ id: t.id, slug: t.slug, category: t.category, tags: t.tags || [] }));
  const recommendations = toolAnalytics.getPersonalizedRecommendations(allToolObjects, limit);
  return recommendations.map(t => {
    // t can be either ToolUsage (has toolId) or Tool-like (has id)
    const toolId = 'toolId' in t ? t.toolId : t.id;
    return tools.find(tool => tool.id === toolId);
  }).filter(Boolean);
}

export function trackToolUsage(toolId: string, toolSlug: string) {
  const event = {
    toolId,
    toolSlug,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
    referrer: typeof window !== 'undefined' ? document.referrer : undefined,
  };
  toolAnalytics.trackToolClick(event);
}
