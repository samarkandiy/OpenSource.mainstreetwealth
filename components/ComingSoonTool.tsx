import Link from "next/link";
import * as React from "react";
import type { Tool } from "@/lib/tools";
import { CATEGORIES, categoryLabel, toolsInCategory, type ToolCategory } from "@/lib/tools";
import { ToolShell } from "./ToolShell";

type ComingSoonToolProps = {
  tool: Tool;
};

/**
 * Landing page used for every planned tool. Still a real, indexable page:
 * explains what it will do, how to help build it, and what to use in the meantime.
 */
export function ComingSoonTool({ tool }: ComingSoonToolProps) {
  const related = toolsInCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 6);

  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            This tool is on the roadmap. The page here captures the intent so a buyer, seller, or contributor can tell whether it's worth building sooner.
          </p>
          <ul>
            <li>Vote for it on the <a className="link-arrow" href="/roadmap">roadmap</a>.</li>
            <li>Request specific inputs or edge cases via <a className="link-arrow" href="/request-a-tool">request a tool</a>.</li>
            <li>Open a PR on <a className="link-arrow" href="/github">GitHub</a> if you want to build it.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>When shipped, the tool will produce:</p>
          <ul>
            <PlannedOutputs tool={tool} />
          </ul>
        </>
      }
    >
      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill">Planned</span>
          <span className="pill-violet">{categoryLabel(tool.category)}</span>
          <span className="text-xs text-ink/55">#{tool.id} in the catalog</span>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-ink">
          {tool.tagline}
        </h2>
        <p className="mt-3 max-w-3xl text-ink/70">{tool.about}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/roadmap" className="btn-brand">
            Vote on the roadmap
          </Link>
          <Link href="/request-a-tool" className="btn-secondary">
            Shape the design
          </Link>
          <Link href="/github" className="btn-ghost">
            Open a PR
          </Link>
        </div>
      </section>

      {related.length ? (
        <section className="mt-10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Related tools in {categoryLabel(tool.category).toLowerCase()}
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/${r.slug}`}
                className="group flex items-start gap-3 rounded-xl border border-line bg-white p-4 no-underline shadow-card transition hover:border-violet-300 hover:shadow-pop"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-md bg-surface-muted text-[11px] font-semibold text-ink/70">
                  #{r.id}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-ink group-hover:text-violet-700">
                      {r.title}
                    </h4>
                    {r.status === "live" ? (
                      <span className="rounded-full border border-mint-200 bg-mint-50 px-1.5 py-0.5 text-[10px] font-medium text-mint-800">
                        Live
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink/60">{r.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </ToolShell>
  );
}

/**
 * Hand-picked plausible outputs per category so each planned page has a
 * concrete "what you'll get" section instead of generic filler.
 */
function PlannedOutputs({ tool }: { tool: Tool }): React.ReactElement {
  const map: Record<ToolCategory, string[]> = {
    hub: [
      "Clearer path through the hub",
      "Fewer dead ends for new visitors",
    ],
    valuation: [
      "A defensible number with the formula shown",
      "A low / mid / high range",
      "A link out to the comparable multiples",
    ],
    "financial-analysis": [
      "A normalized P&L you can hand a buyer",
      "A sourced analysis with every data point tagged",
      "A short write-up of the findings",
    ],
    "deal-structure": [
      "A side-by-side of structures",
      "The dollars flowing to each party at close and over time",
      "Flags for the structures that trigger meaningful tax or legal consequences",
    ],
    sourcing: [
      "A clearly scoped target or buyer universe",
      "Suggested next steps and templates",
    ],
    diligence: [
      "A checklist that fits your deal size and trade",
      "Red flags to escalate",
      "A completeness signal",
    ],
    legal: [
      "A draft document scoped to M&A, not generic business",
      "Clause-level commentary where it helps",
      "Pointers for the state-by-state nuance",
    ],
    exit: [
      "A score with a per-dimension breakdown",
      "A short list of the two or three workstreams that move the number most",
    ],
    data: [
      "An open dataset with sample size and source for every row",
      "Programmatic access via the data API",
    ],
    ai: [
      "An agent-ready interface (MCP, API, or prompt)",
      "Evals showing where it's strong and where it isn't",
    ],
    trades: [
      "A trade-tuned bundle of calculators and checklists",
      "Benchmarks grounded in the specific trade",
    ],
  };
  const items = map[tool.category];
  return (
    <>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </>
  );
}
