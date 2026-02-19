/**
 * Categories Sitemap - /sitemap-categories.xml
 * 
 * Generates sitemap entries for all category pages
 * Priority based on tool count and category importance
 */

import { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { tools } from "@/data/tools";
import {
  generateCategoryEntry,
  validateAndCleanEntries,
  DEFAULT_SITEMAP_CONFIG,
  generateSitemapStats,
} from "@/lib/sitemap-utils";

export default function categoriesSitemap(): MetadataRoute.Sitemap {
  // Generate entries for all categories
  const rawEntries = categories.map((category) => {
    // Count tools in this category
    const categoryTools = tools.filter((t) => t.category === category.id);
    const toolCount = categoryTools.length;
    
    // Check if category has new tools
    const hasNewTools = categoryTools.some((t) => t.isNew);

    return generateCategoryEntry(category, toolCount, hasNewTools, DEFAULT_SITEMAP_CONFIG);
  });

  // Validate and clean entries
  const validEntries = validateAndCleanEntries(rawEntries);

  // Log stats for monitoring (only in development)
  if (process.env.NODE_ENV === "development") {
    const stats = generateSitemapStats(validEntries);
    console.log("[Sitemap:Categories]", stats);
  }

  return validEntries;
}
