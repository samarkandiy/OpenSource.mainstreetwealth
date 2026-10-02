import type { Metadata } from "next";
import { TOOL_BY_SLUG, type Tool } from "./tools";
import { toolSeo } from "./toolSeo";
import { authorsForTool } from "./authors";
import { SITE_URL } from "./schema";

/**
 * Build full Next.js metadata for a tool page.
 * Includes canonical, Open Graph, Twitter card, author array, and keywords.
 */
export function buildToolMetadata(slug: string): Metadata {
  const tool = TOOL_BY_SLUG[slug];
  if (!tool) return {};
  return metadataForTool(tool);
}

export function metadataForTool(tool: Tool): Metadata {
  const seo = toolSeo(tool.slug);
  const { author } = authorsForTool([...tool.keywords, tool.category, tool.slug]);
  const description = seo?.metaDescription ?? tool.description;
  const canonicalPath = `/${tool.slug}`;
  const url = `${SITE_URL}${canonicalPath}`;

  return {
    title: tool.title,
    description,
    alternates: { canonical: canonicalPath },
    keywords: [
      ...tool.keywords,
      tool.category,
      ...(tool.trades ?? []).filter((t) => t !== "all-trades"),
      "Main Street Wealth",
      "home services M&A",
    ],
    authors: [
      { name: author.name, url: `${SITE_URL}${author.url}` },
      { name: "Main Street Wealth", url: "https://mainstreetwealth.ai" },
    ],
    openGraph: {
      type: "article",
      title: tool.title,
      description,
      url,
      siteName: "Main Street Wealth Open Source",
      locale: "en_US",
      ...(seo?.publishedOn ? { publishedTime: seo.publishedOn } : {}),
      ...(seo?.reviewedOn ? { modifiedTime: seo.reviewedOn } : {}),
      authors: [author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description,
      creator: "@MainStreetWlth",
    },
  };
}
