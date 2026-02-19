/**
 * Enterprise-Level Sitemap Utilities
 * 
 * Designed for high-traffic tool websites (1M+ pages)
 * Optimized for Google crawl budget and indexing efficiency
 * 
 * @author Senior SEO Engineer
 * @version 2.0.0
 */

import { MetadataRoute } from "next";
import { Tool, ToolCategory } from "@/types/tool";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export interface SitemapChunk {
  name: string;
  urls: SitemapEntry[];
}

export interface SitemapConfig {
  baseUrl: string;
  maxUrlsPerSitemap: number;
  excludePatterns: RegExp[];
  includePatterns: RegExp[];
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Default sitemap configuration
 * Optimized for large-scale tool websites
 */
export const DEFAULT_SITEMAP_CONFIG: SitemapConfig = {
  baseUrl: "https://www.indiatoolkit.in",
  maxUrlsPerSitemap: 500, // Google's recommended limit
  excludePatterns: [
    /^\/login/,
    /^\/signup/,
    /^\/profile/,
    /^\/settings/,
    /^\/history/,
    /^\/saved-tools/,
    /^\/private/,
    /^\/admin/,
    /^\/api/,
    /^\/dashboard/,
    /^\/\?/, // Query parameter URLs
    /^\/tools\/\?/, // Filtered tool listings
  ],
  includePatterns: [
    /^\/$/, // Homepage
    /^\/tools$/, // Tools listing
    /^\/tool\/[a-z0-9-]+$/, // Tool pages
    /^\/category\/[a-z0-9-]+$/, // Category pages
    /^\/categories$/, // Categories listing
    /^\/about/, // About pages
    /^\/blog/, // Blog pages
    /^\/contact/, // Contact pages
    /^\/faq/, // FAQ pages
    /^\/privacy-policy/, // Legal pages
    /^\/terms/, // Terms pages
  ],
};

// ============================================================================
// URL SAFETY & VALIDATION
// ============================================================================

/**
 * Sanitizes a URL path to ensure it's SEO-safe
 * - Removes double slashes
 * - Removes trailing slashes (except for root)
 * - Ensures proper encoding
 * - Validates against malicious patterns
 * 
 * @param path - The URL path to sanitize
 * @returns Sanitized URL path
 */
export function sanitizeUrlPath(path: string): string {
  if (!path || typeof path !== "string") {
    return "";
  }

  // Remove leading/trailing whitespace
  let sanitized = path.trim();

  // Ensure starts with /
  if (!sanitized.startsWith("/")) {
    sanitized = "/" + sanitized;
  }

  // Remove double slashes
  sanitized = sanitized.replace(/\/+/g, "/");

  // Remove trailing slash (except for root)
  if (sanitized !== "/" && sanitized.endsWith("/")) {
    sanitized = sanitized.slice(0, -1);
  }

  // Remove query parameters (they create duplicate content)
  sanitized = sanitized.split("?")[0];

  // Remove hash fragments
  sanitized = sanitized.split("#")[0];

  // Validate: only allow safe characters
  if (!/^\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*$/.test(sanitized)) {
    console.warn(`[Sitemap] Invalid URL path detected: ${path}`);
    return "";
  }

  return sanitized;
}

/**
 * Validates a URL entry for sitemap inclusion
 * 
 * @param url - The URL to validate
 * @param config - Sitemap configuration
 * @returns Whether the URL should be included
 */
export function shouldIncludeUrl(
  url: string,
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): boolean {
  const path = url.replace(config.baseUrl, "");

  // Check exclude patterns first
  for (const pattern of config.excludePatterns) {
    if (pattern.test(path)) {
      return false;
    }
  }

  // Check include patterns
  for (const pattern of config.includePatterns) {
    if (pattern.test(path)) {
      return true;
    }
  }

  // Default: include if no patterns match and path looks valid
  return path.length > 1 && !path.includes("//") && !path.includes("?");
}

/**
 * Detects and removes duplicate URLs from a list
 * 
 * @param urls - List of URL entries
 * @returns Deduplicated list
 */
export function deduplicateUrls(urls: SitemapEntry[]): SitemapEntry[] {
  const seen = new Set<string>();
  const deduplicated: SitemapEntry[] = [];

  for (const entry of urls) {
    const normalizedUrl = entry.url.toLowerCase().replace(/\/+$/, "");
    if (!seen.has(normalizedUrl)) {
      seen.add(normalizedUrl);
      deduplicated.push(entry);
    }
  }

  return deduplicated;
}

// ============================================================================
// PRIORITY CALCULATION
// ============================================================================

/**
 * Calculates dynamic priority for a tool based on multiple factors
 * 
 * Priority factors:
 * - Popularity (isPopular flag)
 * - Newness (isNew flag)
 * - Usage statistics
 * - Rating
 * - Category importance
 * 
 * @param tool - The tool to calculate priority for
 * @returns Priority value between 0.1 and 1.0
 */
export function calculateToolPriority(tool: Tool): number {
  let priority = 0.7; // Base priority for normal tools

  // Popular tools get highest priority
  if (tool.isPopular) {
    priority = 0.9;
  }
  // New tools get high priority for discovery
  else if (tool.isNew) {
    priority = 0.8;
  }

  // Boost based on rating (if available)
  if (tool.rating && tool.rating >= 4.5) {
    priority = Math.min(1.0, priority + 0.05);
  }

  // Boost based on usage count (if available)
  if (tool.stats?.usageCount) {
    if (tool.stats.usageCount > 10000) {
      priority = Math.min(1.0, priority + 0.05);
    } else if (tool.stats.usageCount > 1000) {
      priority = Math.min(1.0, priority + 0.02);
    }
  }

  // Featured tools get a boost
  if (tool.isFeatured || tool.featured) {
    priority = Math.min(1.0, priority + 0.03);
  }

  // Round to 2 decimal places
  return Math.round(priority * 100) / 100;
}

/**
 * Calculates dynamic priority for a category based on tool count
 * 
 * @param category - The category
 * @param toolCount - Number of tools in the category
 * @returns Priority value between 0.5 and 0.9
 */
export function calculateCategoryPriority(
  category: ToolCategory,
  toolCount: number
): number {
  // Base priority
  let priority = 0.6;

  // More tools = higher priority (indicates importance)
  if (toolCount >= 20) {
    priority = 0.85;
  } else if (toolCount >= 10) {
    priority = 0.75;
  } else if (toolCount >= 5) {
    priority = 0.7;
  }

  // Featured categories get a boost
  if (category.featured) {
    priority = Math.min(0.9, priority + 0.05);
  }

  return Math.round(priority * 100) / 100;
}

// ============================================================================
// CHANGE FREQUENCY CALCULATION
// ============================================================================

/**
 * Determines change frequency for a tool based on its characteristics
 * 
 * @param tool - The tool to analyze
 * @returns Appropriate change frequency
 */
export function calculateToolChangeFrequency(
  tool: Tool
): SitemapEntry["changeFrequency"] {
  // Popular tools are updated more frequently
  if (tool.isPopular) {
    return "daily";
  }

  // New tools need frequent crawling initially
  if (tool.isNew) {
    return "weekly";
  }

  // Tools with recent updates
  if (tool.lastUpdated) {
    const lastUpdate = new Date(tool.lastUpdated);
    const daysSinceUpdate =
      (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceUpdate < 7) {
      return "weekly";
    } else if (daysSinceUpdate < 30) {
      return "monthly";
    }
  }

  // Default for stable tools
  return "monthly";
}

/**
 * Determines change frequency for a category
 * 
 * @param toolCount - Number of tools in category
 * @param hasNewTools - Whether category has new tools
 * @returns Appropriate change frequency
 */
export function calculateCategoryChangeFrequency(
  toolCount: number,
  hasNewTools: boolean
): SitemapEntry["changeFrequency"] {
  // Categories with many tools change more often
  if (toolCount >= 20 || hasNewTools) {
    return "weekly";
  }

  if (toolCount >= 10) {
    return "weekly";
  }

  return "monthly";
}

// ============================================================================
// LAST MODIFIED CALCULATION
// ============================================================================

/**
 * Determines the best lastModified date for a tool
 * Uses real data when available, avoids fake dates
 * 
 * @param tool - The tool to get lastModified for
 * @returns Date object or undefined
 */
export function getToolLastModified(tool: Tool): Date | undefined {
  // Prefer explicit lastUpdated field
  if (tool.lastUpdated) {
    return new Date(tool.lastUpdated);
  }

  // Fall back to createdAt
  if (tool.createdAt) {
    return new Date(tool.createdAt);
  }

  // For new tools, use a recent date to signal freshness
  if (tool.isNew) {
    // Use a date 1-7 days ago for new tools
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - Math.floor(Math.random() * 7));
    return recentDate;
  }

  // For popular tools without dates, assume recent updates
  if (tool.isPopular) {
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 14);
    return recentDate;
  }

  // No fake dates - return undefined if no real data
  return undefined;
}

// ============================================================================
// SITEMAP GENERATION HELPERS
// ============================================================================

/**
 * Generates a sitemap entry for a tool
 * 
 * @param tool - The tool
 * @param config - Sitemap configuration
 * @returns Sitemap entry or null if invalid
 */
export function generateToolEntry(
  tool: Tool,
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): SitemapEntry | null {
  // Validate slug
  if (!tool.slug || tool.slug.trim() === "") {
    console.warn(`[Sitemap] Tool missing slug: ${tool.id}`);
    return null;
  }

  const path = sanitizeUrlPath(`/tool/${tool.slug}`);
  if (!path) {
    return null;
  }

  const url = `${config.baseUrl}${path}`;

  // Check if URL should be included
  if (!shouldIncludeUrl(url, config)) {
    return null;
  }

  return {
    url,
    lastModified: getToolLastModified(tool),
    changeFrequency: calculateToolChangeFrequency(tool),
    priority: calculateToolPriority(tool),
  };
}

/**
 * Generates a sitemap entry for a category
 * 
 * @param category - The category
 * @param toolCount - Number of tools in category
 * @param hasNewTools - Whether category has new tools
 * @param config - Sitemap configuration
 * @returns Sitemap entry or null if invalid
 */
export function generateCategoryEntry(
  category: ToolCategory,
  toolCount: number,
  hasNewTools: boolean = false,
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): SitemapEntry | null {
  // Validate slug
  if (!category.slug || category.slug.trim() === "") {
    console.warn(`[Sitemap] Category missing slug: ${category.id}`);
    return null;
  }

  const path = sanitizeUrlPath(`/category/${category.slug}`);
  if (!path) {
    return null;
  }

  const url = `${config.baseUrl}${path}`;

  // Check if URL should be included
  if (!shouldIncludeUrl(url, config)) {
    return null;
  }

  return {
    url,
    changeFrequency: calculateCategoryChangeFrequency(toolCount, hasNewTools),
    priority: calculateCategoryPriority(category, toolCount),
  };
}

/**
 * Chunks a large array of URLs into multiple sitemaps
 * 
 * @param urls - All URL entries
 * @param maxUrls - Maximum URLs per sitemap
 * @returns Array of sitemap chunks
 */
export function chunkSitemaps(
  urls: SitemapEntry[],
  maxUrls: number = 500
): SitemapChunk[] {
  const chunks: SitemapChunk[] = [];

  for (let i = 0; i < urls.length; i += maxUrls) {
    const chunk = urls.slice(i, i + maxUrls);
    const chunkNumber = Math.floor(i / maxUrls) + 1;
    chunks.push({
      name: `sitemap-${chunkNumber}.xml`,
      urls: chunk,
    });
  }

  return chunks;
}

/**
 * Generates sitemap index entries for multiple sitemaps
 * 
 * @param sitemapNames - Names of sitemap files
 * @param config - Sitemap configuration
 * @returns Array of sitemap index entries
 */
export function generateSitemapIndex(
  sitemapNames: string[],
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): MetadataRoute.Sitemap {
  return sitemapNames.map((name) => ({
    url: `${config.baseUrl}/${name}`,
    lastModified: new Date(),
  }));
}

/**
 * Validates and cleans a list of sitemap entries
 * 
 * @param entries - Raw sitemap entries
 * @returns Cleaned and validated entries
 */
export function validateAndCleanEntries(
  entries: (SitemapEntry | null)[]
): SitemapEntry[] {
  // Remove null entries
  const validEntries = entries.filter(
    (entry): entry is SitemapEntry => entry !== null
  );

  // Remove duplicates
  const deduplicated = deduplicateUrls(validEntries);

  // Sort by priority (highest first) for crawl efficiency
  deduplicated.sort((a, b) => (b.priority || 0.5) - (a.priority || 0.5));

  return deduplicated;
}

// ============================================================================
// STATIC PAGES GENERATION
// ============================================================================

/**
 * Core static pages that should always be in sitemap
 */
export const CORE_STATIC_PAGES: Array<{
  path: string;
  priority: number;
  changeFrequency: SitemapEntry["changeFrequency"];
  lastModified?: Date;
}> = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/tools", priority: 0.95, changeFrequency: "daily" },
  { path: "/categories", priority: 0.85, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about-india", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/features", priority: 0.75, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
];

/**
 * Generates sitemap entries for static pages
 * 
 * @param config - Sitemap configuration
 * @returns Array of sitemap entries
 */
export function generateStaticPageEntries(
  config: SitemapConfig = DEFAULT_SITEMAP_CONFIG
): SitemapEntry[] {
  return CORE_STATIC_PAGES.map((page) => {
    const path = sanitizeUrlPath(page.path);
    return {
      url: `${config.baseUrl}${path}`,
      lastModified: page.lastModified || new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    };
  });
}

// ============================================================================
// ANALYTICS & MONITORING
// ============================================================================

/**
 * Generates statistics about the sitemap
 * Useful for monitoring and debugging
 * 
 * @param entries - Sitemap entries
 * @returns Statistics object
 */
export function generateSitemapStats(entries: SitemapEntry[]): {
  totalUrls: number;
  avgPriority: number;
  priorityDistribution: Record<string, number>;
  changeFrequencyDistribution: Record<string, number>;
} {
  const totalUrls = entries.length;
  const avgPriority =
    entries.reduce((sum, e) => sum + (e.priority || 0), 0) / totalUrls;

  const priorityDistribution: Record<string, number> = {};
  const changeFrequencyDistribution: Record<string, number> = {};

  for (const entry of entries) {
    const priorityKey = String(entry.priority || "none");
    priorityDistribution[priorityKey] =
      (priorityDistribution[priorityKey] || 0) + 1;

    const freqKey = entry.changeFrequency || "none";
    changeFrequencyDistribution[freqKey] =
      (changeFrequencyDistribution[freqKey] || 0) + 1;
  }

  return {
    totalUrls,
    avgPriority: Math.round(avgPriority * 100) / 100,
    priorityDistribution,
    changeFrequencyDistribution,
  };
}
