import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { AUTHORS } from "@/lib/authors";
import {
  SITE_URL,
  articleSchema,
  composeGraph,
  personSchema,
} from "@/lib/schema";
import { MAIN_SITE, mainstreetUrl } from "@/lib/mainstreet";

export const metadata: Metadata = {
  title: "About the Main Street Wealth open source team",
  description:
    "Who builds and maintains the Main Street Wealth open source hub: Avaz Bokiev (CTO), Sukhrobjon (Rob) Ismoilov (Founder & Principal), credentials, and track record.",
  alternates: { canonical: "/about" },
};

const avaz = AUTHORS.avaz;
const rob = AUTHORS.rob;

const graph = composeGraph([
  personSchema(avaz),
  personSchema(rob),
  articleSchema({
    headline: "About the Main Street Wealth open source team",
    description:
      "Credentials, track record, and the people behind the Main Street Wealth open source hub.",
    url: `${SITE_URL}/about`,
    author: avaz,
    reviewer: rob,
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
  }),
]);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Meet the team behind the open source hub"
        description="Who builds this, their credentials, and the deal history that informs every calculator and dataset in the hub."
        crumbs={[{ url: "/", name: "Open source" }, { name: "About" }]}
        actions={
          <>
            <Link href={mainstreetUrl("/about")} target="_blank" rel="noreferrer" className="btn-secondary">
              About Main Street Wealth
            </Link>
            <Link href={mainstreetUrl("/valuation")} target="_blank" rel="noreferrer" className="btn-brand">
              Request a free valuation
            </Link>
          </>
        }
      />

      <div className="container-page">
        <section
          aria-label="EEAT credentials"
          className="grid gap-5 rounded-3xl border border-line bg-white p-6 shadow-card sm:grid-cols-4 sm:p-8"
        >
          {[
            { k: "Deals closed", v: "100+", s: "in home services" },
            { k: "Years in M&A", v: "7+", s: "sell- and buy-side" },
            { k: "Trade coverage", v: "7", s: "HVAC through electrical" },
            { k: "Recognition", v: "Axial Top 25", s: "1H 2026 and 2025" },
          ].map((row) => (
            <div key={row.k}>
              <div className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                {row.k}
              </div>
              <div className="mt-1 text-3xl font-bold text-ink">{row.v}</div>
              <div className="text-xs text-ink/55">{row.s}</div>
            </div>
          ))}
        </section>

        <TeamMember author={avaz} highlights={[
          { title: "Open source hub", body: "Designed and maintains the hub at opensource.mainstreetwealth.ai." },
          { title: "Live calculators", body: "Author of the EBITDA, SDE, add-back, and net-proceeds calculators." },
          { title: "Open datasets & AI", body: "Working on the multiples dataset, data API, and the MCP server for M&A agents." },
        ]} />

        <TeamMember author={rob} highlights={[
          { title: "Founder & Principal", body: "Founded Main Street Wealth to specialize in home-services M&A." },
          { title: "Columbia LL.M.", body: "LL.M. in corporate finance, M&A and restructuring from Columbia Law School." },
          { title: "Full-cycle M&A", body: "Represents both buyers and sellers from valuation through post-close integration." },
        ]} />

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-ink">How we built this hub</h2>
          <div className="prose-tool mt-4 max-w-3xl">
            <p>
              The open source hub exists because the lower middle market deserves the same analytical rigor the biggest buyers already have. Every calculator here comes from a real workstream we run with sellers and buyers in home services.
            </p>
            <p>
              Authors publish each tool after it's reviewed by Rob for accuracy and alignment with current market practice. Datasets ship with sample sizes and sources. Changes go through PR, with a public roadmap and changelog. Read our <Link href="/methodology" className="link-arrow">full methodology</Link> for how we build and verify every tool.
            </p>
            <p>
              If you spot something wrong, open an <a href="https://github.com/samarkandiy/OpenSource.mainstreetwealth/issues" target="_blank" rel="noreferrer" className="link-arrow">issue on GitHub</a> or <Link href="/request-a-tool" className="link-arrow">suggest a change</Link>.
            </p>
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-line bg-surface-soft p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-ink">Editorial policy</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/75">
            <li>
              <strong className="text-ink">Author bylines on every tool.</strong>{" "}
              Named author, named reviewer, dated published and dated reviewed. No anonymous content.
            </li>
            <li>
              <strong className="text-ink">Sources, not vibes.</strong>{" "}
              Every number is sourced from announced transactions, public filings, or named benchmarks.
            </li>
            <li>
              <strong className="text-ink">Not legal, tax, or financial advice.</strong>{" "}
              Tools are for scenario planning. For a specific deal, work with a licensed advisor.
            </li>
            <li>
              <strong className="text-ink">Corrections welcome.</strong>{" "}
              Spot an error? File an issue or email the team. Corrections ship in the public changelog.
            </li>
          </ul>
        </section>

        <CTA
          eyebrow="Work with us"
          title="Ready for a confidential conversation?"
          description="A quick call clarifies what a sale would really look like for you — timing, structure, and net proceeds."
        />
      </div>

      <JsonLd data={graph} id="ld-about" />
    </>
  );
}

function TeamMember({
  author,
  highlights,
}: {
  author: typeof AUTHORS.avaz;
  highlights: { title: string; body: string }[];
}) {
  return (
    <section
      id={author.id}
      className="mt-14 grid gap-6 rounded-3xl border border-line bg-white p-6 shadow-card lg:grid-cols-[1fr_1.5fr] lg:p-8"
    >
      <div>
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-xl font-bold text-white"
            style={{ background: author.avatarGradient }}
            aria-hidden="true"
          >
            {author.initials}
          </span>
          <div>
            <h2 className="text-xl font-bold text-ink">{author.name}</h2>
            <p className="text-sm text-ink/60">{author.role}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {author.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer me author"
              className="btn-secondary text-xs"
            >
              {s.label}
            </a>
          ))}
          <Link
            href={author.id === rob.id ? mainstreetUrl("/contact") : "/request-a-tool"}
            target={author.id === rob.id ? "_blank" : undefined}
            rel={author.id === rob.id ? "noreferrer" : undefined}
            className="btn-ghost text-xs"
          >
            {author.id === rob.id ? "Contact" : "Suggest an edit"}
          </Link>
        </div>
      </div>
      <div>
        <p className="text-base leading-relaxed text-ink/80">{author.longBio}</p>
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/55">
            Credentials
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm text-ink/75">
            {author.credentials.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-mint-600" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/55">
            Focus
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {author.focus.map((f) => (
              <span key={f} className="pill">
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-xl border border-line bg-surface-soft p-3">
              <div className="text-xs font-semibold text-ink">{h.title}</div>
              <p className="mt-1 text-xs text-ink/60">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}
