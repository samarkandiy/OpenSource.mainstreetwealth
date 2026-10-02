import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What we're shipping next in the Main Street Wealth open source hub. Vote on the tools you need.",
  alternates: { canonical: "/roadmap" },
};

const NOW = [
  { title: "EBITDA calculator", status: "live", note: "Live. Add income-tax normalization next." },
  { title: "SDE calculator", status: "live", note: "Live. Multi-owner mode next." },
  { title: "Adjusted EBITDA add-backs", status: "live", note: "Live. CSV export coming." },
  { title: "Multiples lookup", status: "live", note: "Live. Open dataset underneath lands this quarter." },
  { title: "Rollover equity calculator", status: "live", note: "Live. Add preferred and MIP dilution." },
  { title: "Net proceeds calculator", status: "live", note: "Live. State tax tables land next." },
  { title: "Exit readiness score", status: "live", note: "Live. Add trade-specific weightings." },
  { title: "Owner dependence scorecard", status: "live", note: "Live." },
];

const NEXT = [
  { title: "QoE checklist", slug: "/qoe-checklist", votes: 212 },
  { title: "DCF model", slug: "/dcf-model", votes: 184 },
  { title: "LBO model", slug: "/lbo-model", votes: 168 },
  { title: "Working capital peg", slug: "/working-capital-peg-calculator", votes: 141 },
  { title: "SBA 7(a) calculator", slug: "/sba-7a-calculator", votes: 139 },
  { title: "Teaser generator", slug: "/teaser-generator", votes: 128 },
  { title: "Buy-box builder", slug: "/buy-box-builder", votes: 112 },
  { title: "Earnout simulator", slug: "/earnout-simulator", votes: 97 },
];

const LATER = [
  { title: "MCP server", slug: "/ai/mcp-server" },
  { title: "Multiples open dataset", slug: "/data/multiples" },
  { title: "Trade benchmarks", slug: "/data/trade-benchmarks" },
  { title: "PE platform directory", slug: "/pe-platform-directory" },
  { title: "Consolidator tracker", slug: "/data/consolidator-tracker" },
  { title: "AI deal memo generator", slug: "/ai/deal-memo-generator" },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="What's shipping"
        title="Roadmap"
        description="What's live, what's next, and how to influence the order. Vote on tools you want to see sooner."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Roadmap" }]}
        actions={
          <Link href="/request-a-tool" className="btn-brand">
            Request a tool
          </Link>
        }
      />
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-3">
          <Column
            title="Now"
            eyebrow="Live or in flight"
            tone="mint"
          >
            {NOW.map((item) => (
              <li key={item.title} className="flex items-start gap-3 py-3 first:pt-0">
                <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-mint-500 text-white">
                  <CheckIcon className="h-3 w-3" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{item.title}</div>
                  <p className="text-xs text-ink/60">{item.note}</p>
                </div>
              </li>
            ))}
          </Column>

          <Column
            title="Next"
            eyebrow="Up for vote"
            tone="violet"
          >
            {NEXT.map((item) => (
              <li key={item.title} className="flex items-center justify-between gap-3 py-3 first:pt-0">
                <Link
                  href={item.slug}
                  className="text-sm font-semibold text-ink no-underline hover:text-violet-700"
                >
                  {item.title}
                </Link>
                <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2 py-0.5 text-xs font-mono text-ink/70">
                  <ArrowUpIcon className="h-3 w-3" />
                  {item.votes}
                </span>
              </li>
            ))}
          </Column>

          <Column
            title="Later"
            eyebrow="On the list"
            tone="violet"
          >
            {LATER.map((item) => (
              <li key={item.title} className="py-3 first:pt-0">
                <Link
                  href={item.slug}
                  className="text-sm font-semibold text-ink no-underline hover:text-violet-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </Column>
        </div>

        <CTA
          eyebrow="You decide the order"
          title="What should we build next?"
          description="This roadmap is community-driven. Request a tool, upvote others, and we'll re-prioritize weekly."
        />
      </div>
    </>
  );
}

function Column({
  title,
  eyebrow,
  tone,
  children,
}: {
  title: string;
  eyebrow: string;
  tone: "mint" | "violet";
  children: React.ReactNode;
}) {
  const chip = tone === "mint" ? "pill-mint" : "pill-violet";
  return (
    <div className="surface-card p-6">
      <div className="flex items-center gap-2">
        <span className={chip}>{eyebrow}</span>
      </div>
      <h3 className="mt-3 text-xl font-bold text-ink">{title}</h3>
      <ul className="mt-2 divide-y divide-line">{children}</ul>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 10l3 3 7-7" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10 15V5" />
      <path d="M5 10l5-5 5 5" />
    </svg>
  );
}
