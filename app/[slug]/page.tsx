import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoonTool } from "@/components/ComingSoonTool";
import { TOOLS, TOOL_BY_SLUG } from "@/lib/tools";
import { metadataForTool } from "@/lib/metadata";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return TOOLS.filter(
    (t) =>
      t.slug.length > 0 &&
      !t.slug.includes("/") &&
      t.category !== "hub" &&
      t.status !== "live"
  ).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[slug];
  if (!tool) return {};
  return metadataForTool(tool);
}

export default async function DynamicToolPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const tool = TOOL_BY_SLUG[slug];
  if (!tool || tool.category === "hub") notFound();
  return <ComingSoonTool tool={tool} />;
}
