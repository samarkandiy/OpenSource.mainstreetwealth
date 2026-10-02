import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonTool } from "@/components/ComingSoonTool";
import { TOOLS, TOOL_BY_SLUG } from "@/lib/tools";
import { metadataForTool } from "@/lib/metadata";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return TOOLS.filter((t) => t.slug.startsWith("data/")).map((t) => ({
    slug: t.slug.slice("data/".length),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[`data/${slug}`];
  if (!tool) return {};
  return metadataForTool(tool);
}

export default async function DataToolPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[`data/${slug}`];
  if (!tool) notFound();
  return <ComingSoonTool tool={tool} />;
}
