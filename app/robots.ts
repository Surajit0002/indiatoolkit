import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.indiatoolkit.in/";

  return {
    rules: {
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
        "/contact-us/",
      ],
      crawlDelay: 1,
    },
    sitemap: `${baseUrl}sitemap.xml`,
    host: "www.indiatoolkit.in",
  };
}
