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
  return tools.filter((tool) => tool.isPopular);
}
