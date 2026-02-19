import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.indiatoolkit.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/login/",
          "/signup/",
          "/profile/",
          "/saved-tools/",
          "/history/",
          "/settings/",
          "/api/",
          "/contact-us/",  // Duplicate of /contact - keep only one indexed
          "/*?*",  // Disallow URLs with query parameters to prevent duplicate content
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/private/",
          "/login/",
          "/signup/",
          "/profile/",
          "/saved-tools/",
          "/history/",
          "/settings/",
          "/api/",
          "/contact-us/",
        ],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-tools.xml`,
      `${baseUrl}/sitemap-categories.xml`,
      `${baseUrl}/sitemap-pages.xml`,
    ],
    host: "www.indiatoolkit.in",
  };
}
