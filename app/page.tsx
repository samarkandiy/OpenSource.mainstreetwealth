import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, FEATURED_TOOLS, TOOLS, toolsInCategory } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { CTA } from "@/components/CTA";
import { LogoMark } from "@/components/Logo";
import { AUTHORS } from "@/lib/authors";
import { mainstreetLink, mainstreetUrl } from "@/lib/mainstreet";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, composeGraph, articleSchema } from "@/lib/schema";

const PUBLISHED = "2026-10-02";

export const metadata: Metadata = {
  title: "Open source M&A tools for home services",
  description:
    "The Main Street Wealth open source hub: 100 free M&A tools, calculators, and open datasets for lower middle-market deals in HVAC, plumbing, roofing, pest control, landscaping, pool, and electrical.",
  alternates: { canonical: "/" },
};

const graph = composeGraph([
  articleSchema({
    headline: "Open source M&A tools for home services",
    description:
      "The Main Street Wealth open source hub: 100 free M&A tools and open datasets for home-services operators.",
    url: SITE_URL,
    author: AUTHORS.avaz,
    reviewer: AUTHORS.rob,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
  }),
]);

export default function HomePage() {
  const liveCount = TOOLS.filter((t) => t.status === "live").length;
  const plannedCount = TOOLS.length - liveCount;

  return (
    <>
      <Hero liveCount={liveCount} plannedCount={plannedCount} />
      <TrustBar />
      <MainstreetToolsSection />
      <CategoriesSection />
      <FeaturedSection />
      <TradesSection />
      <OpenDataSection />
      <TeamSection />
      <ContributeSection />
      <div className="container-page">
        <CTA />
      </div>
      <JsonLd data={graph} id="ld-home" />
    </>
  );
}

function Hero({ liveCount, plannedCount }: { liveCount: number; plannedCount: number }) {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div className="absolute inset-0 -z-10 bg-mesh-light" />
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <div className="pill-violet mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
              100 tools · open source · maintained by Main Street Wealth
            </div>
            <h1 className="text-display-md text-balance sm:text-display-lg">
              Open source{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-brand-gradient bg-clip-text text-transparent">
                  M&amp;A tools
                </span>
                <span className="absolute inset-x-0 bottom-1 h-3 bg-mint-200/60" aria-hidden="true" />
              </span>{" "}
              for home services.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">
              Valuation calculators, QoE checklists, deal-structure models, diligence packs, and AI agents. Built for lower middle-market deals in HVAC, plumbing, roofing, pest, landscaping, pool, and electrical. Pairs with the{" "}
              <a
                href={mainstreetUrl("/tools")}
                target="_blank"
                rel="noreferrer"
                className="link-arrow"
              >
                20 live tools on mainstreetwealth.ai
              </a>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/directory" className="btn-brand">
                Browse every tool
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/ebitda-calculator" className="btn-secondary">
                Start with EBITDA
              </Link>
              <a
                href={mainstreetUrl("/valuation")}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                Or get a free valuation
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink/50">Hub live</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">
                  {liveCount}
                  <span className="text-base font-medium text-ink/50">/{TOOLS.length}</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink/50">Main-site tools</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">20</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink/50">Trades</dt>
                <dd className="mt-1 text-2xl font-bold text-ink">7</dd>
              </div>
            </dl>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-pop">
        <div className="absolute inset-0 bg-brand-gradient-soft opacity-70" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="pill-violet">EBITDA calculator</div>
            <LogoMark className="h-7 w-7 opacity-80" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { k: "Revenue (LTM)", v: "$6.4M" },
              { k: "Net income", v: "$620k" },
              { k: "D&A", v: "$180k" },
              { k: "Interest", v: "$95k" },
              { k: "Taxes", v: "$155k" },
              { k: "Owner comp add-back", v: "$220k" },
            ].map((row) => (
              <div key={row.k} className="rounded-xl border border-line bg-white/80 p-3">
                <div className="text-[10px] font-medium uppercase tracking-wider text-ink/50">
                  {row.k}
                </div>
                <div className="mt-0.5 text-sm font-semibold text-ink">{row.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-ink p-4 text-white shadow-pop">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-mint-400">
                  Adjusted EBITDA
                </div>
                <div className="text-3xl font-bold leading-tight">$1,270,000</div>
                <div className="mt-1 text-xs text-white/60">
                  Margin: 19.8% · Multiple 6.5× → $8.3M range
                </div>
              </div>
              <div className="hidden h-14 w-14 flex-none items-center justify-center rounded-xl bg-brand-gradient sm:flex">
                <ChartIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-4 hidden rotate-[-4deg] rounded-xl border border-line bg-white p-3 shadow-pop sm:block">
        <div className="pill-mint mb-2">Live</div>
        <div className="text-xs font-semibold text-ink">Exit readiness: 72</div>
        <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full bg-surface-muted">
          <div className="h-full w-[72%] rounded-full bg-brand-gradient" />
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  return (
    <section
      className="border-y border-line/70 bg-white/60 py-6"
      aria-label="Trust and credentials"
    >
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-ink/60">
          <span className="font-semibold uppercase tracking-wider text-ink/70">
            Published by Main Street Wealth
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <TrustItem label="Axial Top 25 Firm" value="1H 2026 & 2025" />
            <TrustItem label="Deals closed" value="100+" />
            <TrustItem label="In-trade experience" value="7+ years" />
            <TrustItem label="Reviewed by" value="J.D., Columbia LL.M." />
          </div>
          <a
            href={mainstreetUrl("/about")}
            target="_blank"
            rel="noreferrer"
            className="link-arrow"
          >
            About the firm →
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-ink/50">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </span>
  );
}

function MainstreetToolsSection() {
  const tools = [
    "/tools/business-valuation-calculator",
    "/tools/ebitda-benchmarker",
    "/tools/sde-vs-ebitda",
    "/tools/salary-normalizer",
    "/tools/recurring-revenue",
    "/tools/customer-concentration",
    "/tools/employee-dependency",
    "/tools/seasonal-normalizer",
    "/tools/deal-structure",
    "/tools/tax-estimator",
    "/tools/buyer-readiness-score",
    "/tools/exit-timeline",
    "/tools/reputation-score",
    "/tools/comparable-sales",
    "/tools/competitor-acquisitions",
    "/tools/non-compete",
    "/tools/equipment-depreciation",
    "/tools/route-density",
    "/tools/franchise-analyzer",
  ]
    .map((p) => mainstreetLink(p))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="On mainstreetwealth.ai"
          title="20 tools on the main site, free."
          description="Instant valuation, benchmarks, deal-structure modeling, and more. Pairs with the open source hub."
          action={
            <a
              href={mainstreetUrl("/tools")}
              target="_blank"
              rel="noreferrer"
              className="link-arrow"
            >
              All free tools on mainstreetwealth.ai →
            </a>
          }
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <a
              key={t.path}
              href={mainstreetUrl(t.path)}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-3 rounded-xl border border-line bg-white p-4 no-underline shadow-card transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-pop"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-violet-100 text-violet-700">
                <WrenchIcon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink group-hover:text-violet-700">
                    {t.title}
                  </h3>
                  <ExternalIcon className="h-3 w-3 flex-none text-ink/40" />
                </div>
                <p className="mt-0.5 text-xs text-ink/60">{t.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const nonHub = CATEGORIES.filter((c) => c.id !== "hub");
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="The catalog"
          title="Ten categories, one hub."
          description="Every category maps to a stage of the deal. Pick your spot and dig in."
          action={
            <Link href="/directory" className="link-arrow">
              Open the full directory →
            </Link>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {nonHub.map((cat) => {
            const toolCount = toolsInCategory(cat.id).length;
            const accentDot =
              cat.accent === "violet" ? "bg-violet-500" : "bg-mint-500";
            return (
              <Link
                key={cat.id}
                href={`/directory?category=${cat.id}`}
                className="group surface-card flex flex-col p-6 no-underline transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-pop"
              >
                <div className="flex items-center justify-between">
                  <span className="code-chip">{cat.letter}.</span>
                  <span className="text-xs font-medium text-ink/50">
                    {toolCount} tool{toolCount === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className={`inline-block h-2 w-2 rounded-full ${accentDot}`} />
                  <h3 className="text-lg font-semibold text-ink group-hover:text-violet-700">
                    {cat.label}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{cat.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {toolsInCategory(cat.id)
                    .slice(0, 3)
                    .map((tool) => (
                      <span key={tool.id} className="pill">
                        {tool.title}
                      </span>
                    ))}
                  {toolCount > 3 ? (
                    <span className="pill">+{toolCount - 3} more</span>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Where to start"
          title="Start here."
          description="Quick to adopt, searched often, and the fastest path to a defensible valuation."
          action={
            <Link href="/directory?status=live" className="link-arrow">
              See all live tools →
            </Link>
          }
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TradesSection() {
  const trades: {
    label: string;
    hubHref: string;
    industryHref: string;
    brokerHref: string;
    blurb: string;
  }[] = [
    {
      label: "HVAC",
      hubHref: "/hvac-toolkit",
      industryHref: "/industries/hvac",
      brokerHref: "/industries/hvac-business-broker",
      blurb: "Rollover-friendly, PE-active. HVAC multiples compound with recurring maintenance plans.",
    },
    {
      label: "Plumbing",
      hubHref: "/plumbing-toolkit",
      industryHref: "/industries/plumbing",
      brokerHref: "/industries/plumbing-business-broker",
      blurb: "SBA-financeable at the bottom; family offices and PE roll-ups at the top.",
    },
    {
      label: "Roofing",
      hubHref: "/roofing-toolkit",
      industryHref: "/industries/roofing",
      brokerHref: "/industries/roofing-business-broker",
      blurb: "Storm cycles and insurance mix drive add-back schedules and multiples.",
    },
    {
      label: "Pest control",
      hubHref: "/pest-control-toolkit",
      industryHref: "/industries/pest-control",
      brokerHref: "/industries/pest-control-business-broker",
      blurb: "Highest recurring-revenue mix in the trades. Attracts premium multiples.",
    },
    {
      label: "Landscaping",
      hubHref: "/landscaping-toolkit",
      industryHref: "/industries/landscaping",
      brokerHref: "/industries/landscaping-business-broker",
      blurb: "Maintenance vs. design-build mix changes multiple and buyer universe.",
    },
    {
      label: "Pool services",
      hubHref: "/pool-and-electrical-toolkit",
      industryHref: "/industries/pool-services",
      brokerHref: "/industries/pool-services-business-broker",
      blurb: "Seasonal, membership-driven. Route density and geography do the heavy lifting.",
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="By trade"
          title="Tools, benchmarks, and advisory by trade."
          description="Each trade has its own economics. Jump to the hub toolkit or straight to the advisory page on mainstreetwealth.ai."
          action={
            <a
              href={mainstreetUrl("/industries/other")}
              target="_blank"
              rel="noreferrer"
              className="link-arrow"
            >
              Electrical, garage door, and other →
            </a>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((t) => (
            <article
              key={t.label}
              className="surface-card p-5"
              aria-labelledby={`trade-${t.label}`}
            >
              <h3
                id={`trade-${t.label}`}
                className="text-base font-semibold text-ink"
              >
                {t.label}
              </h3>
              <p className="mt-1 text-sm text-ink/65">{t.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                <Link
                  href={t.hubHref}
                  className="link-arrow"
                >
                  Hub toolkit
                </Link>
                <a
                  href={mainstreetUrl(t.industryHref)}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow"
                >
                  M&amp;A advisory
                </a>
                <a
                  href={mainstreetUrl(t.brokerHref)}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow"
                >
                  Business broker
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OpenDataSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ink p-8 text-white sm:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-gradient opacity-30 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-mint-400">
                Open datasets
              </div>
              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Multiples, benchmarks, and comps you can actually cite.
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                Open data by trade and size, with sample sizes and sources. Pulled by hand first, then kept honest with community PRs. Cross-checked against the main-site{" "}
                <a
                  href={mainstreetUrl("/tools/comparable-sales")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-mint-400 underline underline-offset-4 hover:text-mint-300"
                >
                  comparable sales
                </a>{" "}
                and{" "}
                <a
                  href={mainstreetUrl("/tools/competitor-acquisitions")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-mint-400 underline underline-offset-4 hover:text-mint-300"
                >
                  competitor acquisitions
                </a>{" "}
                tools.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/data/multiples" className="btn bg-white text-ink hover:bg-mint-50">
                  Multiples dataset
                </Link>
                <Link href="/data/trade-benchmarks" className="btn-ghost text-white hover:bg-white/10 hover:text-white">
                  Trade benchmarks
                </Link>
                <Link href="/ai/mcp-server" className="btn-ghost text-white hover:bg-white/10 hover:text-white">
                  MCP server
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "HVAC median", v: "5.6×" },
                { k: "Plumbing", v: "5.1×" },
                { k: "Roofing", v: "4.4×" },
                { k: "Pest control", v: "7.2×" },
                { k: "Landscaping", v: "5.3×" },
                { k: "Pool", v: "4.9×" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                    {row.k}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-white">{row.v}</div>
                  <div className="text-[11px] text-white/50">LTM EBITDA</div>
                </div>
              ))}
            </div>
          </div>
          <p className="relative mt-6 text-[11px] text-white/40">
            Illustrative figures. Full dataset ships with sample size and source for every row.
          </p>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const avaz = AUTHORS.avaz;
  const rob = AUTHORS.rob;
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Who maintains this"
          title="Named authors. Named reviewers. Dated reviews."
          description="Every tool here ships with a byline and a review date. Here's who's behind it."
          action={
            <Link href="/about" className="link-arrow">
              Full team & credentials →
            </Link>
          }
        />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[avaz, rob].map((person) => (
            <article
              key={person.id}
              className="surface-card flex items-start gap-5 p-6"
            >
              <span
                className="inline-flex h-14 w-14 flex-none items-center justify-center rounded-2xl text-xl font-bold text-white"
                style={{ background: person.avatarGradient }}
                aria-hidden="true"
              >
                {person.initials}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-ink">{person.name}</h3>
                <p className="text-sm text-ink/60">{person.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {person.shortBio}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <Link href={person.url} className="link-arrow">
                    Profile
                  </Link>
                  {person.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer me author"
                      className="link-arrow"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContributeSection() {
  const steps = [
    {
      title: "Pick a good-first-issue",
      body: "Each tool page lists what's needed. Start with the ones tagged for new contributors.",
      href: "/contribute",
    },
    {
      title: "Open a PR against the hub",
      body: "One tool, one PR. Keep the scope small. We'll review within a week.",
      href: "/github",
    },
    {
      title: "Ship it with your name on it",
      body: "Contributors are credited on the tool page, in the changelog, and in the data license.",
      href: "/changelog",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Build in the open"
          title="Contribute a tool, dataset, or benchmark."
          description="This hub is built in the open. Everything from calculators to the AI tooling takes PRs."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Link
              key={step.title}
              href={step.href}
              className="surface-card flex flex-col gap-3 p-6 no-underline transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-pop"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
              <p className="text-sm text-ink/65">{step.body}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-violet-700">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <div className="section-title-eyebrow">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-bold text-ink sm:text-display-sm">{title}</h2>
        {description ? <p className="mt-3 text-ink/65">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 10h10" />
      <path d="M10 5l5 5-5 5" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 20h16" />
      <path d="M6 16V9" />
      <path d="M10 16V5" />
      <path d="M14 16v-6" />
      <path d="M18 16v-3" />
    </svg>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 1 1 5 5l-9.8 9.8-5-5 9.8-9.8z" />
      <path d="M12.5 8.5l3 3" />
    </svg>
  );
}

function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 4h4v4" />
      <path d="M16 4l-7 7" />
      <path d="M14 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </svg>
  );
}
