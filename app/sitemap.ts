import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const SITE_URL = "https://opensource.mainstreetwealth.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "/",
    "/directory",
    "/github",
    "/docs",
    "/roadmap",
    "/changelog",
    "/contribute",
    "/license-governance",
    "/community",
    "/request-a-tool",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOLS.filter(
    (t) => t.category !== "hub" && t.slug.length > 0
  ).map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: tool.status === "live" ? 0.9 : 0.5,
  }));

  return [...staticEntries, ...toolEntries];
}
