import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ToolCard } from "@/components/ToolCard";
import { FEATURED_TOOLS } from "@/lib/tools";

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Page not found."
        description="This page doesn't exist, or it's been renamed. Try one of these."
        crumbs={[{ url: "/", name: "Open source" }]}
      />
      <div className="container-page">
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-brand">
            Back to the hub
          </Link>
          <Link href="/directory" className="btn-secondary">
            Browse all tools
          </Link>
          <Link href="/request-a-tool" className="btn-ghost">
            Request a tool
          </Link>
        </div>
        <h2 className="mt-12 text-xl font-bold text-ink">Popular tools</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </>
  );
}
