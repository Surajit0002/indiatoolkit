import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/login/", "/profile/"],
    },
    sitemap: "https://www.indiatoolkit.in/sitemap.xml",
  };
}
