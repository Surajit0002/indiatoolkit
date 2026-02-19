/**
 * Schema.org utilities for structured data generation
 * Helps with SEO by providing rich snippets in search results
 */

import { Tool, ToolCategory } from "@/types/tool";

const BASE_URL = "https://www.indiatoolkit.in";

/**
 * Generate BreadcrumbList schema for any page
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate SoftwareApplication schema for a tool
 */
export function generateSoftwareSchema(tool: Tool): object {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: `${BASE_URL}/tool/${tool.slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: tool.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: tool.rating,
          ratingCount: tool.stats?.usageCount || 100,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    author: {
      "@type": "Organization",
      name: "India Toolkit",
      url: BASE_URL,
    },
  };
}

/**
 * Generate FAQ schema for a tool or category
 */
export function generateFaqSchema(
  faqs: { question: string; answer: string }[]
): object | null {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate WebPage schema for category pages
 */
export function generateWebPageSchema(options: {
  name: string;
  description: string;
  url: string;
  type?: "WebPage" | "CollectionPage" | "CategoryPage";
}): object {
  return {
    "@context": "https://schema.org",
    "@type": options.type || "CollectionPage",
    name: options.name,
    description: options.description,
    url: options.url.startsWith("http") ? options.url : `${BASE_URL}${options.url}`,
    isPartOf: {
      "@type": "WebSite",
      name: "India Toolkit",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "India Toolkit",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}

/**
 * Generate ItemList schema for category pages with tools
 */
export function generateItemListSchema(
  category: ToolCategory,
  tools: Tool[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} Tools`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: `${BASE_URL}/tool/${tool.slug}`,
      },
    })),
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "India Toolkit",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/indiatoolkit",
      "https://www.facebook.com/indiatoolkit",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

/**
 * Generate WebSite schema with search action
 */
export function generateWebSiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "India Toolkit",
    url: BASE_URL,
    description: "Free online tools for everyone in India",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Combine multiple schemas into a single JSON-LD script
 */
export function combineSchemas(...schemas: (object | null)[]): string {
  const validSchemas = schemas.filter(Boolean);
  return JSON.stringify(validSchemas.length === 1 ? validSchemas[0] : validSchemas);
}

/**
 * Generate HowTo schema for tool guides
 */
export function generateHowToSchema(options: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  tool?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description,
    step: options.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    tool: options.tool,
  };
}
