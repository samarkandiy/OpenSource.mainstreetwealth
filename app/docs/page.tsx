import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CATEGORIES, toolsInCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Documentation for every tool, dataset, and API in the Main Street Wealth open source hub.",
  alternates: { canonical: "/docs" },
};

const SECTIONS = [
  {
    title: "Getting started",
    items: [
      { label: "Install the hub locally", href: "/github" },
      { label: "Pick your first tool", href: "/directory" },
      { label: "Use the data API", href: "/data/api" },
      { label: "Set up the MCP server", href: "/ai/mcp-server" },
    ],
  },
  {
    title: "Concepts",
    items: [
      { label: "EBITDA vs. SDE", href: "/sde-calculator" },
      { label: "Add-backs, documented", href: "/adjusted-ebitda-addbacks" },
      { label: "Rollover and the second bite", href: "/rollover-equity-calculator" },
      { label: "The glossary", href: "/data/glossary" },
    ],
  },
  {
    title: "References",
    items: [
      { label: "Multiples dataset", href: "/data/multiples" },
      { label: "Trade benchmarks", href: "/data/trade-benchmarks" },
      { label: "Public comps", href: "/data/public-comps" },
      { label: "State licensing map", href: "/state-licensing-checklist" },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reference"
        title="Documentation"
        description="Guides, references, and how-tos for every tool and dataset in the hub."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Docs" }]}
      />
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-3">
          {SECTIONS.map((s) => (
            <div key={s.title} className="surface-card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                {s.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {s.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm font-medium text-ink no-underline hover:text-violet-700">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-2xl font-bold text-ink">All tools by category</h2>
        <p className="mt-2 text-ink/65">
          A full index. For a filterable view, use the <Link href="/directory" className="link-arrow">directory</Link>.
        </p>
        <div className="mt-6 space-y-10">
          {CATEGORIES.filter((c) => c.id !== "hub").map((cat) => {
            const items = toolsInCategory(cat.id);
            return (
              <section key={cat.id}>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="section-title-eyebrow">
                      {cat.letter}. {cat.label}
                    </div>
                    <p className="mt-1 text-sm text-ink/60">{cat.description}</p>
                  </div>
                  <span className="text-xs text-ink/50">{items.length} tools</span>
                </div>
                <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <li key={tool.id} className="flex items-baseline justify-between gap-3 border-b border-line/60 py-1.5">
                      <Link href={`/${tool.slug}`} className="text-sm font-medium text-ink no-underline hover:text-violet-700">
                        {tool.title}
                      </Link>
                      <span className="font-mono text-[11px] text-ink/40">#{tool.id}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
