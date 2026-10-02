import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contribute",
  description: "How to contribute to the Main Street Wealth open source hub. Local setup, review bar, and good-first-issues.",
  alternates: { canonical: "/contribute" },
};

const ISSUES = [
  { tag: "good-first", title: "Add CSV export to the add-back builder", why: "Small, bounded. Nice UX win." },
  { tag: "good-first", title: "Add trade-specific defaults to the EBITDA calc", why: "Config change, no new UI." },
  { tag: "good-first", title: "Fix the SDE calculator's \"single owner\" copy", why: "Documentation only." },
  { tag: "medium", title: "Working capital peg calculator", why: "Core model + table of trailing twelve months." },
  { tag: "medium", title: "DCF model", why: "Explicit + terminal + sensitivity grid." },
  { tag: "spike", title: "Open dataset of HVAC transactions", why: "Collect, verify, and publish with sources." },
];

export default function ContributePage() {
  return (
    <>
      <PageHeader
        eyebrow="Build with us"
        title="Contribute"
        description="This hub is open source. PRs welcome from solo contributors, M&A advisors, and operators."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Contribute" }]}
        actions={
          <>
            <Link href="/github" className="btn-brand">Clone the repo</Link>
            <Link href="https://github.com/mainstreetwealth/open-source/issues" className="btn-secondary" target="_blank" rel="noreferrer">
              Browse issues
            </Link>
          </>
        }
      />
      <div className="container-page">
        <section className="grid gap-6 lg:grid-cols-3">
          <StepCard n={1} title="Pick a scope" body="One tool, one PR. If a change touches shared components, scope it tight and flag it in the PR body." />
          <StepCard n={2} title="Keep the style consistent" body="Match the existing patterns: light theme, brand colors, no over-abstraction. Keep calculator logic in /components/calculators." />
          <StepCard n={3} title="Add docs for the non-obvious" body="If the math is non-trivial, document the formula and sources in the tool's /docs page. We'd rather read your reasoning than reverse-engineer the code." />
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">What we take seriously</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { k: "Correctness", v: "Numbers must match independent calculation. If we can't verify, we won't ship." },
              { k: "Attribution", v: "Datasets ship with sources and sample sizes. Contributors get credit on tool pages and in the changelog." },
              { k: "Readability", v: "Prefer boring, obvious code over clever abstractions. Future maintainers thank you." },
              { k: "No lock-in", v: "Everything should run locally without any Main Street Wealth account. If a tool needs a secret, it should still work without it." },
            ].map((row) => (
              <div key={row.k} className="surface-card p-5">
                <h3 className="text-sm font-semibold text-ink">{row.k}</h3>
                <p className="mt-1 text-sm text-ink/65">{row.v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Open issues</h2>
          <p className="mt-2 text-ink/70">A snapshot. The real list is on GitHub.</p>
          <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {ISSUES.map((issue) => (
              <li key={issue.title} className="flex items-start gap-4 p-5 hover:bg-surface-soft">
                <span className={issue.tag === "good-first" ? "pill-mint" : issue.tag === "medium" ? "pill-violet" : "pill"}>
                  {issue.tag}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{issue.title}</h3>
                  <p className="mt-0.5 text-sm text-ink/65">{issue.why}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <CTA
          eyebrow="Not sure what to pick?"
          title="Drop into #open-source on Discord."
          description="We'll help scope your first PR together. Office hours every Friday."
        />
      </div>
    </>
  );
}

function StepCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="surface-card p-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
        {n}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink/65">{body}</p>
    </div>
  );
}
