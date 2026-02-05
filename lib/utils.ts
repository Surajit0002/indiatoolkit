import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tools } from "../data/tools";
import { categories } from "../data/categories";

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
