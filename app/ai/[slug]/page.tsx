import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonTool } from "@/components/ComingSoonTool";
import { TOOLS, TOOL_BY_SLUG } from "@/lib/tools";
import { metadataForTool } from "@/lib/metadata";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return TOOLS.filter((t) => t.slug.startsWith("ai/")).map((t) => ({
    slug: t.slug.slice("ai/".length),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[`ai/${slug}`];
  if (!tool) return {};
  return metadataForTool(tool);
}

export default async function AiToolPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[`ai/${slug}`];
  if (!tool) notFound();
  return <ComingSoonTool tool={tool} />;
}
