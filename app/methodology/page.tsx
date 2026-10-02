import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { AUTHORS } from "@/lib/authors";
import { SITE_URL, articleSchema, composeGraph } from "@/lib/schema";
import { mainstreetUrl } from "@/lib/mainstreet";

export const metadata: Metadata = {
  title: "Methodology — how we build and verify our open source M&A tools",
  description:
    "How we build, source, and verify every calculator and dataset in the Main Street Wealth open source hub. Named authors, named reviewers, dated reviews, public sources.",
  alternates: { canonical: "/methodology" },
};

const graph = composeGraph([
  articleSchema({
    headline: "How Main Street Wealth builds and verifies open source M&A tools",
    description:
      "Our methodology for every calculator and dataset in the hub.",
    url: `${SITE_URL}/methodology`,
    author: AUTHORS.avaz,
    reviewer: AUTHORS.rob,
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
  }),
]);

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="How we build this"
        title="Methodology"
        description="Every calculator on this hub ships with a named author, a named reviewer, dated reviews, and public sources. Here's how that works end-to-end."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Methodology" }]}
      />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <article className="prose-tool max-w-none">
            <h2>Who writes and reviews each tool</h2>
            <p>
              Each tool page lists its author and reviewer by name. The author drafts the model and the write-up; the reviewer — usually our Principal — reads the model, checks the output against known deals, and signs off before publication.
            </p>
            <ul>
              <li>
                <strong>Author:</strong>{" "}
                <Link href="/about#avaz-bokiev" className="link-arrow">
                  Avaz Bokiev
                </Link>{" "}
                (CTO) authors most of the calculators and the data tooling.
              </li>
              <li>
                <strong>Reviewer:</strong>{" "}
                <Link href="/about#rob-ismoilov" className="link-arrow">
                  Sukhrobjon (Rob) Ismoilov
                </Link>{" "}
                (Founder & Principal, J.D., Columbia LL.M.) reviews for accuracy and current market practice.
              </li>
            </ul>

            <h2>How we source numbers</h2>
            <p>
              Multiples and benchmarks are curated from three sources, in order of weight:
            </p>
            <ol>
              <li>Announced transactions with disclosed terms, cross-checked against public filings.</li>
              <li>Advisor confirmations: deals we or our network closed, with the operator's permission to anonymize and publish.</li>
              <li>Public datasets and research we cite in the sources section of each tool.</li>
            </ol>
            <p>
              Every band ships with a sample size (<span className="code-chip">n</span>) so you can see how confident the number is. Numbers in the sub-500K EBITDA band move more; numbers in the $3M+ band have smaller samples but tighter ranges.
            </p>

            <h2>How we handle tax, legal, and advice-adjacent content</h2>
            <p>
              Tools in valuation, tax, and legal get an "advisory disclaimer" badge. Those tools are explicitly for scenario planning, not advice. For specifics on a deal, we always recommend a licensed advisor — a CPA for tax, an M&amp;A lawyer for legal, and the{" "}
              <Link href={mainstreetUrl("/valuation")} target="_blank" rel="noreferrer" className="link-arrow">
                Main Street Wealth advisory team
              </Link>{" "}
              for deal structure and buyer selection.
            </p>

            <h2>Review cadence</h2>
            <p>
              Each tool page carries a "published" and a "reviewed" date. Tools get re-reviewed at least annually, and whenever major market conditions change (e.g., a tax-rate change, a shift in Fed policy, or a visible movement in trade multiples).
            </p>

            <h2>Corrections</h2>
            <p>
              If a number is wrong, we fix it. Corrections ship in the public{" "}
              <Link href="/changelog" className="link-arrow">
                changelog
              </Link>
              . Report a correction via the{" "}
              <a
                href="https://github.com/samarkandiy/main-street-wealth/issues"
                target="_blank"
                rel="noreferrer"
                className="link-arrow"
              >
                GitHub issue tracker
              </a>{" "}
              or by{" "}
              <Link href="/request-a-tool" className="link-arrow">
                sending us a note
              </Link>
              .
            </p>

            <h2>Open source and open data</h2>
            <p>
              Code is MIT. Datasets are Open Data Commons Attribution. Legal templates are CC-BY. See the{" "}
              <Link href="/license-governance" className="link-arrow">
                license and governance
              </Link>{" "}
              page for the full detail.
            </p>

            <h2>Standards we follow</h2>
            <ul>
              <li>Google Search Essentials and the Search Quality Rater Guidelines, especially the Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) framework.</li>
              <li>Schema.org vocabulary for structured data (SoftwareApplication, Article, FAQPage, BreadcrumbList, Person, Organization).</li>
              <li>Web Content Accessibility Guidelines (WCAG) 2.2 AA where practical — semantic HTML, visible focus, color contrast, and keyboard support.</li>
            </ul>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="surface-card p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                On this page
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="#who-writes" className="link-arrow">Authors & reviewers</a></li>
                <li><a href="#sourcing" className="link-arrow">How we source</a></li>
                <li><a href="#advice" className="link-arrow">Legal, tax, advice</a></li>
                <li><a href="#cadence" className="link-arrow">Review cadence</a></li>
                <li><a href="#corrections" className="link-arrow">Corrections</a></li>
                <li><a href="#open" className="link-arrow">Open source</a></li>
              </ul>
            </div>
            <div className="mt-4 surface-card p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                Shortcuts
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/about" className="link-arrow">Meet the team</Link></li>
                <li><Link href="/license-governance" className="link-arrow">License & governance</Link></li>
                <li><Link href="/changelog" className="link-arrow">Changelog</Link></li>
                <li><Link href="/github" className="link-arrow">GitHub</Link></li>
              </ul>
            </div>
          </aside>
        </div>

        <CTA />
      </div>

      <JsonLd data={graph} id="ld-methodology" />
    </>
  );
}
