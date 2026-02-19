/**
 * Tools Sitemap - /sitemap-tools.xml
 * 
 * Generates sitemap entries for all tool pages
 * Optimized for large-scale tool directories
 * 
 * Features:
 * - Dynamic priority based on popularity and usage
 * - Intelligent change frequency
 * - Real lastModified dates
 * - Automatic URL validation
 */

import { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import {
  generateToolEntry,
  validateAndCleanEntries,
  DEFAULT_SITEMAP_CONFIG,
  generateSitemapStats,
} from "@/lib/sitemap-utils";

export default function toolsSitemap(): MetadataRoute.Sitemap {
  // Generate entries for all tools
  const rawEntries = tools.map((tool) => generateToolEntry(tool, DEFAULT_SITEMAP_CONFIG));

  // Validate and clean entries
  const validEntries = validateAndCleanEntries(rawEntries);

  // Log stats for monitoring (only in development)
  if (process.env.NODE_ENV === "development") {
    const stats = generateSitemapStats(validEntries);
    console.log("[Sitemap:Tools]", stats);
  }

  return validEntries;
}
