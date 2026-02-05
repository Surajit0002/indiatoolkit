import { MetadataRoute } from "next";
import { tools } from "../data/tools";
import { categories } from "../data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.indiatoolkit.in/";
  const currentDate = new Date();

  // Helper to calculate priority based on tool popularity
  const calculatePriority = (tool: typeof tools[0]): number => {
    if (tool.isPopular) return 0.9;
    if (tool.isNew) return 0.8;
    return 0.7;
  };

  // Helper to determine change frequency
  const getChangeFrequency = (tool: typeof tools[0]): "daily" | "weekly" | "monthly" | "yearly" => {
    if (tool.isPopular) return "daily";
    if (tool.isNew) return "weekly";
    return "monthly";
  };

  // Dynamic tool URLs with SEO-optimized metadata
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: getChangeFrequency(tool),
    priority: calculatePriority(tool),
  }));

  // Category URLs with priority based on tool count
  const categoryUrls = categories.map((cat) => {
    const toolCount = tools.filter(t => t.category === cat.slug).length;
    return {
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: Math.min(0.9, 0.5 + (toolCount / 100)),
    };
  });

  // Core static pages with highest priority
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/advanced-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools-showcase`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Information pages
  const infoUrls = [
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about-india`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/documentation`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    },
  ];

  // User dashboard pages (lower priority as they're authenticated)
  const userUrls = [
    {
      url: `${baseUrl}/profile`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/saved-tools`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Auth pages
  const authUrls = [
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [
    ...staticUrls,
    ...infoUrls,
    ...userUrls,
    ...authUrls,
    ...categoryUrls,
    ...toolUrls,
  ];
}
