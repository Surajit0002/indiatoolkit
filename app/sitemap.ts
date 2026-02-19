/**
 * Sitemap Index - /sitemap.xml
 * 
 * Enterprise-level sitemap index for IndiaToolkit.in
 * References multiple specialized sitemaps for optimal crawling
 * 
 * Architecture:
 * - /sitemap.xml (this file) - Index pointing to all sitemaps
 * - /sitemap-tools.xml - All tool pages
 * - /sitemap-categories.xml - All category pages
 * - /sitemap-pages.xml - Static and informational pages
 * 
 * Benefits:
 * - Better crawl budget distribution
 * - Faster indexing of new content
 * - Scalable to millions of URLs
 * - Easy to maintain and extend
 * 
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps
 */

import { MetadataRoute } from "next";

// Sitemap configuration
const BASE_URL = "https://www.indiatoolkit.in";

/**
 * Generate sitemap index
 * 
 * This creates a sitemap index file that references all individual sitemaps.
 * Google recommends using a sitemap index when you have multiple sitemaps.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Sitemap index entries - these reference individual sitemap files
    {
      url: `${BASE_URL}/sitemap-tools.xml`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/sitemap-categories.xml`,
      lastModified: now,
    },
    {
      url: `${BASE_URL}/sitemap-pages.xml`,
      lastModified: now,
    },
  ];
}
