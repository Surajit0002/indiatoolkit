/**
 * Sitemap Index - /sitemap.xml
 * 
 * Enterprise-level sitemap for IndiaToolkit.in
 * Generates a unified sitemap with all URLs for optimal crawling
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

import { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

// Base URL for the site
const BASE_URL = "https://www.indiatoolkit.in";

/**
 * Generate the main sitemap with all URLs
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about-india`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/advanced-tools`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/tools-showcase`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/documentation`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/community`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Generate tool pages
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((tool) => tool.slug && tool.slug.trim() !== "")
    .map((tool) => ({
      url: `${BASE_URL}/tool/${tool.slug}`,
      lastModified: tool.lastUpdated ? new Date(tool.lastUpdated) : 
                   tool.createdAt ? new Date(tool.createdAt) : now,
      changeFrequency: tool.isPopular ? "daily" as const :
                       tool.isNew ? "weekly" as const : "monthly" as const,
      priority: tool.isPopular ? 0.9 :
                tool.isNew ? 0.8 :
                tool.rating && tool.rating >= 4.5 ? 0.75 : 0.7,
    }));

  // Generate category pages
  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((category) => category.slug && category.slug.trim() !== "")
    .map((category) => {
      // Count tools in this category
      const toolCount = tools.filter((t) => t.category === category.id).length;
      
      return {
        url: `${BASE_URL}/category/${category.slug}`,
        lastModified: now,
        changeFrequency: toolCount >= 10 ? "weekly" as const : "monthly" as const,
        priority: toolCount >= 20 ? 0.85 :
                  toolCount >= 10 ? 0.75 :
                  toolCount >= 5 ? 0.7 : 0.6,
      };
    });

  // Combine all entries
  return [...staticPages, ...toolPages, ...categoryPages];
}
