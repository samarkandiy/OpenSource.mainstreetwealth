import Link from "next/link";
import { HubLockup } from "./Logo";
import { CATEGORIES } from "@/lib/tools";

const COLS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Hub",
    links: [
      { href: "/directory", label: "Directory" },
      { href: "/docs", label: "Docs" },
      { href: "/about", label: "About the team" },
      { href: "/methodology", label: "Methodology" },
      { href: "/roadmap", label: "Roadmap" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "/github", label: "GitHub" },
      { href: "/contribute", label: "Contribute" },
      { href: "/license-governance", label: "License & governance" },
      { href: "/ai/mcp-server", label: "MCP server" },
    ],
  },
  {
    title: "Hub tools",
    links: [
      { href: "/ebitda-calculator", label: "EBITDA calculator" },
      { href: "/sde-calculator", label: "SDE calculator" },
      { href: "/adjusted-ebitda-addbacks", label: "Adjusted EBITDA add-backs" },
      { href: "/valuation-multiples-lookup", label: "Multiples lookup" },
      { href: "/net-proceeds-calculator", label: "Net proceeds" },
      { href: "/exit-readiness-score", label: "Exit readiness" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { href: "https://mainstreetwealth.ai", label: "Main site" },
      { href: "https://di.mainstreetwealth.ai", label: "DealIntel · M&A news" },
      { href: "https://mainstreetwealth.ai/tools", label: "Main-site tools" },
      { href: "https://mainstreetwealth.ai/valuation", label: "Free valuation" },
      { href: "https://mainstreetwealth.ai/knowledgebase", label: "Knowledge base" },
      { href: "https://mainstreetwealth.ai/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-white/60">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <div className="max-w-sm">
            <HubLockup />
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              Open source M&amp;A tools for lower middle-market deals in home services and the trades. Built in the open, maintained by {" "}
              <a className="link-arrow" href="https://mainstreetwealth.ai" rel="noreferrer">
                Main Street Wealth
              </a>
              .
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="pill-mint">100 tools planned</span>
              <span className="pill-violet">Open datasets</span>
              <span className="pill">MIT-ish</span>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink/60">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ink/80 no-underline hover:text-violet-700"
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/70 pt-6 text-xs text-ink/60">
          <span>© {new Date().getFullYear()} Main Street Wealth. All rights reserved.</span>
          <Link href="/license-governance" className="no-underline hover:text-ink">
            License
          </Link>
          <a
            href="https://mainstreetwealth.ai/contact"
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:text-ink"
          >
            Contact
          </a>
          <a
            href="https://mainstreetwealth.ai/privacy"
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:text-ink"
          >
            Privacy
          </a>
          <a
            href="https://mainstreetwealth.ai/terms"
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:text-ink"
          >
            Terms
          </a>
          <span className="ml-auto hidden md:inline">
            Not legal, tax, or financial advice.
          </span>
        </div>

        {/* Category index — crawlable deep-links into the directory */}
        <div className="mt-8 border-t border-line/60 pt-6">
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            Browse by category
          </h5>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/70">
            {CATEGORIES.filter((c) => c.id !== "hub").map((c) => (
              <Link
                key={c.id}
                href={`/directory?category=${c.id}`}
                className="no-underline hover:text-violet-700"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Industries on mainstreetwealth.ai */}
        <div className="mt-6 border-t border-line/60 pt-6">
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            M&amp;A advisory by trade — on mainstreetwealth.ai
          </h5>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/70">
            {[
              { href: "https://mainstreetwealth.ai/industries/hvac", label: "HVAC" },
              { href: "https://mainstreetwealth.ai/industries/plumbing", label: "Plumbing" },
              { href: "https://mainstreetwealth.ai/industries/roofing", label: "Roofing" },
              { href: "https://mainstreetwealth.ai/industries/pest-control", label: "Pest control" },
              { href: "https://mainstreetwealth.ai/industries/landscaping", label: "Landscaping" },
              { href: "https://mainstreetwealth.ai/industries/pool-services", label: "Pool services" },
              { href: "https://mainstreetwealth.ai/industries/other", label: "Electrical & other" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="no-underline hover:text-violet-700"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* All 20 main-site tools — flat crawlable list */}
        <div className="mt-6 border-t border-line/60 pt-6">
          <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/60">
            All free tools on mainstreetwealth.ai
          </h5>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/70">
            {[
              ["/tools/business-valuation-calculator", "Business valuation calculator"],
              ["/tools/buyer-readiness-score", "Buyer readiness score"],
              ["/tools/ebitda-benchmarker", "EBITDA benchmarker"],
              ["/tools/sde-vs-ebitda", "SDE vs. EBITDA"],
              ["/tools/reputation-score", "Reputation score"],
              ["/tools/salary-normalizer", "Salary normalizer"],
              ["/tools/franchise-analyzer", "Franchise analyzer"],
              ["/tools/route-density", "Route density"],
              ["/tools/recurring-revenue", "Recurring revenue"],
              ["/tools/employee-dependency", "Employee dependency"],
              ["/tools/customer-concentration", "Customer concentration"],
              ["/tools/equipment-depreciation", "Equipment depreciation"],
              ["/tools/seasonal-normalizer", "Seasonal normalizer"],
              ["/tools/exit-timeline", "Exit timeline"],
              ["/tools/competitor-acquisitions", "Competitor acquisitions"],
              ["/tools/comparable-sales", "Comparable sales"],
              ["/tools/deal-structure", "Deal structure"],
              ["/tools/non-compete", "Non-compete"],
              ["/tools/tax-estimator", "Tax estimator"],
            ].map(([path, label]) => (
              <a
                key={path}
                href={`https://mainstreetwealth.ai${path}`}
                target="_blank"
                rel="noreferrer"
                className="no-underline hover:text-violet-700"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
