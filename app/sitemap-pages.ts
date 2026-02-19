/**
 * Pages Sitemap - /sitemap-pages.xml
 * 
 * Generates sitemap entries for static and informational pages
 * Includes core pages, legal pages, and other important routes
 */

import { MetadataRoute } from "next";
import {
  generateStaticPageEntries,
  validateAndCleanEntries,
  DEFAULT_SITEMAP_CONFIG,
  generateSitemapStats,
} from "@/lib/sitemap-utils";

export default function pagesSitemap(): MetadataRoute.Sitemap {
  // Generate entries for static pages
  const staticEntries = generateStaticPageEntries(DEFAULT_SITEMAP_CONFIG);

  // Additional informational pages
  const additionalPages = [
    {
      url: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/advanced-tools`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/tools-showcase`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/documentation`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Combine all entries
  const allEntries = [...staticEntries, ...additionalPages];

  // Validate and clean
  const validEntries = validateAndCleanEntries(allEntries);

  // Log stats for monitoring (only in development)
  if (process.env.NODE_ENV === "development") {
    const stats = generateSitemapStats(validEntries);
    console.log("[Sitemap:Pages]", stats);
  }

  return validEntries;
}
