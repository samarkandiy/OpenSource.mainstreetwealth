// Catalog of pages on the primary mainstreetwealth.ai site.
// Used to drive contextual internal links from the open source hub back to the
// main site, following E-E-A-T and internal-linking best practices.
//
// Tool paths were confirmed live by the Main Street Wealth team. Industry,
// broker, and long-tail SEO paths are mirrored from the main sitemap.

import type { ToolCategory, Trade } from "./tools";

export const MAIN_SITE = "https://mainstreetwealth.ai";

export type MainstreetIntent =
  | "tool"
  | "industry"
  | "broker-service"
  | "valuation"
  | "sell-side"
  | "buy-side"
  | "resource"
  | "roadmap"
  | "case-topic"
  | "team"
  | "contact";

export type MainstreetLink = {
  /** Path relative to mainstreetwealth.ai (no trailing slash). */
  path: string;
  title: string;
  summary: string;
  intent: MainstreetIntent;
  trades?: Trade[];
  /** Loose category tags used to match a hub tool to this link. */
  topics?: string[];
  /** Highest-priority links to show first. */
  priority?: number;
};

export const MAINSTREET_LINKS: MainstreetLink[] = [
  // Core
  {
    path: "/",
    title: "Main Street Wealth",
    summary: "M&A advisory for HVAC, plumbing, roofing, and the trades.",
    intent: "team",
    priority: 3,
  },
  {
    path: "/about",
    title: "About Main Street Wealth",
    summary: "Founder, team, credentials, and track record.",
    intent: "team",
    topics: ["about", "team", "trust"],
    priority: 5,
  },
  {
    path: "/contact",
    title: "Contact the advisory team",
    summary: "Schedule a confidential call with the Main Street Wealth team.",
    intent: "contact",
    topics: ["contact"],
    priority: 2,
  },
  {
    path: "/valuation",
    title: "Request a free business valuation",
    summary: "Get a defensible valuation from an M&A advisor who works your trade.",
    intent: "valuation",
    topics: ["valuation", "lead"],
    priority: 10,
  },
  {
    path: "/sell",
    title: "Sell your home-services business",
    summary: "Full-process sell-side M&A for home-services operators.",
    intent: "sell-side",
    topics: ["sell", "exit", "process"],
    priority: 8,
  },
  {
    path: "/buy",
    title: "Buy a home-services business",
    summary: "Guided buy-side M&A for strategic and financial buyers.",
    intent: "buy-side",
    topics: ["buy", "acquisition"],
    priority: 6,
  },
  {
    path: "/listings",
    title: "Active listings",
    summary: "Current confidential sell-side opportunities in home services.",
    intent: "buy-side",
    topics: ["listings", "pipeline"],
    priority: 5,
  },
  {
    path: "/active-mandates",
    title: "Active buyer mandates",
    summary: "What our strategic and PE buyers are actively looking for.",
    intent: "buy-side",
    topics: ["mandates", "buy-box"],
    priority: 5,
  },
  {
    path: "/buyer-registration",
    title: "Buyer registration",
    summary: "Register as a vetted buyer for home-services acquisitions.",
    intent: "buy-side",
    topics: ["buyer", "pipeline"],
    priority: 3,
  },
  {
    path: "/knowledgebase",
    title: "Knowledge base",
    summary: "In-depth guides on valuation, deal structure, and diligence.",
    intent: "resource",
    topics: ["guides", "education"],
    priority: 7,
  },
  {
    path: "/resources",
    title: "Resources & guides",
    summary: "Free guides, data, and templates for home-services operators.",
    intent: "resource",
    topics: ["guides", "resources"],
    priority: 6,
  },
  {
    path: "/ma-roadmap",
    title: "M&A roadmap",
    summary: "Phases of a home-services M&A transaction, start to close.",
    intent: "roadmap",
    topics: ["process", "roadmap"],
    priority: 5,
  },
  {
    path: "/client-roadmap",
    title: "Client roadmap",
    summary: "The 12-month pre-sale roadmap we walk clients through.",
    intent: "roadmap",
    topics: ["pre-sale", "roadmap", "exit"],
    priority: 5,
  },
  {
    path: "/ma-roadmap/define-ma-strategy",
    title: "Define your M&A strategy",
    summary: "First step of the M&A roadmap: strategy and buy-box.",
    intent: "roadmap",
    topics: ["strategy", "roadmap"],
    priority: 3,
  },

  // Tools hub index
  {
    path: "/tools",
    title: "Free M&A tools on mainstreetwealth.ai",
    summary: "The full set of free Main Street Wealth tools — 20 calculators and checklists.",
    intent: "tool",
    topics: ["tools", "calculator"],
    priority: 10,
  },

  // Live tool pages on the main site (20)
  {
    path: "/tools/business-valuation-calculator",
    title: "Business valuation calculator",
    summary: "Instant business valuation estimate from the main site.",
    intent: "tool",
    topics: ["valuation", "ebitda", "sde", "multiples", "value"],
    priority: 10,
  },
  {
    path: "/tools/buyer-readiness-score",
    title: "Buyer readiness score",
    summary: "Score your business against what buyers actually want.",
    intent: "tool",
    topics: ["exit", "readiness", "buyer", "pre-sale"],
    priority: 9,
  },
  {
    path: "/tools/ebitda-benchmarker",
    title: "EBITDA benchmarker",
    summary: "Benchmark your EBITDA against the trade.",
    intent: "tool",
    topics: ["ebitda", "benchmark", "multiples", "valuation"],
    priority: 9,
  },
  {
    path: "/tools/sde-vs-ebitda",
    title: "SDE vs. EBITDA",
    summary: "Pick the right earnings metric for your deal size.",
    intent: "tool",
    topics: ["sde", "ebitda", "valuation"],
    priority: 9,
  },
  {
    path: "/tools/reputation-score",
    title: "Reputation score",
    summary: "What your online reputation adds (or costs) at exit.",
    intent: "tool",
    topics: ["reputation", "brand", "exit"],
    priority: 6,
  },
  {
    path: "/tools/salary-normalizer",
    title: "Owner salary normalizer",
    summary: "Normalize owner compensation to market before add-back.",
    intent: "tool",
    topics: ["sde", "addbacks", "owner", "compensation", "normalization"],
    priority: 9,
  },
  {
    path: "/tools/franchise-analyzer",
    title: "Franchise analyzer",
    summary: "What a franchise brand adds to (or costs) your valuation.",
    intent: "tool",
    topics: ["franchise", "valuation", "brand"],
    priority: 5,
  },
  {
    path: "/tools/route-density",
    title: "Route density analyzer",
    summary: "Route density and its effect on margins and multiples.",
    intent: "tool",
    trades: ["pest-control", "hvac", "plumbing", "landscaping", "pool"],
    topics: ["route", "density", "operations", "margins"],
    priority: 7,
  },
  {
    path: "/tools/recurring-revenue",
    title: "Recurring revenue analyzer",
    summary: "Measure recurring revenue and the premium it unlocks.",
    intent: "tool",
    topics: ["recurring", "service-agreement", "memberships", "valuation"],
    priority: 9,
  },
  {
    path: "/tools/employee-dependency",
    title: "Employee dependency check",
    summary: "Workforce concentration risk, named and quantified.",
    intent: "tool",
    topics: ["workforce", "retention", "owner-dependence", "key-person"],
    priority: 8,
  },
  {
    path: "/tools/customer-concentration",
    title: "Customer concentration analyzer",
    summary: "80/20 risk check on revenue by customer.",
    intent: "tool",
    topics: ["concentration", "customers", "diligence", "risk"],
    priority: 8,
  },
  {
    path: "/tools/equipment-depreciation",
    title: "Equipment depreciation",
    summary: "Trucks, equipment, and fixed-asset depreciation modeled.",
    intent: "tool",
    topics: ["depreciation", "d&a", "capex", "equipment"],
    priority: 7,
  },
  {
    path: "/tools/seasonal-normalizer",
    title: "Seasonal normalizer",
    summary: "Normalize LTM earnings for seasonality and weather.",
    intent: "tool",
    topics: ["seasonality", "ltm", "normalization"],
    priority: 8,
  },
  {
    path: "/tools/exit-timeline",
    title: "Exit timeline planner",
    summary: "Build a 12–36 month exit timeline with the right workstreams.",
    intent: "tool",
    topics: ["exit", "timeline", "pre-sale", "roadmap"],
    priority: 8,
  },
  {
    path: "/tools/competitor-acquisitions",
    title: "Competitor acquisitions tracker",
    summary: "Who's buying what in your trade.",
    intent: "tool",
    topics: ["comps", "transactions", "buyers", "roll-up"],
    priority: 7,
  },
  {
    path: "/tools/comparable-sales",
    title: "Comparable sales",
    summary: "Comparable transactions, filtered to your trade and size.",
    intent: "tool",
    topics: ["comps", "transactions", "multiples", "valuation"],
    priority: 9,
  },
  {
    path: "/tools/deal-structure",
    title: "Deal structure analyzer",
    summary: "Model structure: cash, rollover, earnout, seller note.",
    intent: "tool",
    topics: ["structure", "rollover", "earnout", "proceeds", "deal"],
    priority: 9,
  },
  {
    path: "/tools/non-compete",
    title: "Non-compete analyzer",
    summary: "Non-compete scope and enforceability check.",
    intent: "tool",
    topics: ["non-compete", "legal", "state", "closing"],
    priority: 7,
  },
  {
    path: "/tools/tax-estimator",
    title: "Transaction tax estimator",
    summary: "Rough-cut tax model on sale proceeds.",
    intent: "tool",
    topics: ["tax", "proceeds", "capital-gains", "structure"],
    priority: 9,
  },

  // Industries (service pages)
  {
    path: "/industries/hvac",
    title: "HVAC M&A advisory",
    summary: "HVAC M&A: valuation, buyers, and process.",
    intent: "industry",
    trades: ["hvac"],
    topics: ["hvac", "trade"],
    priority: 7,
  },
  {
    path: "/industries/plumbing",
    title: "Plumbing M&A advisory",
    summary: "Plumbing M&A: valuation, buyers, and process.",
    intent: "industry",
    trades: ["plumbing"],
    topics: ["plumbing", "trade"],
    priority: 7,
  },
  {
    path: "/industries/roofing",
    title: "Roofing M&A advisory",
    summary: "Roofing M&A: valuation, buyers, and process.",
    intent: "industry",
    trades: ["roofing"],
    topics: ["roofing", "trade"],
    priority: 7,
  },
  {
    path: "/industries/pest-control",
    title: "Pest control M&A advisory",
    summary: "Pest control M&A: valuation, recurring revenue, buyers.",
    intent: "industry",
    trades: ["pest-control"],
    topics: ["pest-control", "trade"],
    priority: 7,
  },
  {
    path: "/industries/landscaping",
    title: "Landscaping M&A advisory",
    summary: "Landscaping M&A: valuation, maintenance mix, buyers.",
    intent: "industry",
    trades: ["landscaping"],
    topics: ["landscaping", "trade"],
    priority: 7,
  },
  {
    path: "/industries/pool-services",
    title: "Pool services M&A advisory",
    summary: "Pool services M&A: valuation, seasonality, buyers.",
    intent: "industry",
    trades: ["pool"],
    topics: ["pool", "trade"],
    priority: 7,
  },
  {
    path: "/industries/other",
    title: "Other home-services M&A",
    summary: "Electrical, garage door, and other trades.",
    intent: "industry",
    trades: ["electrical"],
    topics: ["electrical", "trade"],
    priority: 5,
  },

  // Business-broker landing pages
  {
    path: "/industries/hvac-business-broker",
    title: "HVAC business broker",
    summary: "Full-service HVAC business broker.",
    intent: "broker-service",
    trades: ["hvac"],
    topics: ["hvac", "broker"],
    priority: 6,
  },
  {
    path: "/industries/plumbing-business-broker",
    title: "Plumbing business broker",
    summary: "Full-service plumbing business broker.",
    intent: "broker-service",
    trades: ["plumbing"],
    topics: ["plumbing", "broker"],
    priority: 6,
  },
  {
    path: "/industries/roofing-business-broker",
    title: "Roofing business broker",
    summary: "Full-service roofing business broker.",
    intent: "broker-service",
    trades: ["roofing"],
    topics: ["roofing", "broker"],
    priority: 6,
  },
  {
    path: "/industries/pest-control-business-broker",
    title: "Pest control business broker",
    summary: "Full-service pest control business broker.",
    intent: "broker-service",
    trades: ["pest-control"],
    topics: ["pest-control", "broker"],
    priority: 6,
  },
  {
    path: "/industries/landscaping-business-broker",
    title: "Landscaping business broker",
    summary: "Full-service landscaping business broker.",
    intent: "broker-service",
    trades: ["landscaping"],
    topics: ["landscaping", "broker"],
    priority: 6,
  },
  {
    path: "/industries/pool-services-business-broker",
    title: "Pool services business broker",
    summary: "Full-service pool services business broker.",
    intent: "broker-service",
    trades: ["pool"],
    topics: ["pool", "broker"],
    priority: 6,
  },

  // Long-tail topic SEO pages
  {
    path: "/rollover-equity-when-selling-hvac-business",
    title: "Rollover equity when selling an HVAC business",
    summary: "What rollover is, how it's structured, and when it beats all-cash.",
    intent: "case-topic",
    trades: ["hvac"],
    topics: ["rollover", "structure", "hvac", "pe"],
    priority: 9,
  },
  {
    path: "/roll-up-buyer-for-pest-control-company",
    title: "Roll-up buyers for pest control",
    summary: "Which roll-up buyers are active in pest control.",
    intent: "case-topic",
    trades: ["pest-control"],
    topics: ["buyer", "pest-control", "roll-up", "pe"],
    priority: 7,
  },
  {
    path: "/family-office-buyer-for-plumbing-company",
    title: "Family office buyer for plumbing",
    summary: "How family offices evaluate plumbing acquisitions.",
    intent: "case-topic",
    trades: ["plumbing"],
    topics: ["buyer", "plumbing", "family-office"],
    priority: 7,
  },
  {
    path: "/search-fund-acquisition-of-hvac-company",
    title: "Search fund acquisition of an HVAC company",
    summary: "How search funds structure HVAC acquisitions.",
    intent: "case-topic",
    trades: ["hvac"],
    topics: ["buyer", "hvac", "search-fund"],
    priority: 7,
  },
  {
    path: "/how-to-sell-a-roofing-company-for-70-percent-cash-at-closing",
    title: "Sell a roofing company for 70% cash at closing",
    summary: "The structure that lands most roofing exits in the mid-market.",
    intent: "case-topic",
    trades: ["roofing"],
    topics: ["structure", "roofing", "proceeds", "rollover"],
    priority: 9,
  },
  {
    path: "/take-my-home-services-business-public-via-rto",
    title: "Take a home-services business public via RTO",
    summary: "Public markets exit via reverse takeover.",
    intent: "case-topic",
    topics: ["public", "rto", "structure"],
    priority: 4,
  },
  {
    path: "/electrical-contractor-business-valuation-calculator",
    title: "Electrical contractor valuation calculator",
    summary: "Valuation calculator tuned for electrical contractors.",
    intent: "case-topic",
    trades: ["electrical"],
    topics: ["electrical", "valuation", "ebitda"],
    priority: 8,
  },
  {
    path: "/garage-door-company-acquisition-multiple",
    title: "Garage door company acquisition multiple",
    summary: "Typical multiples for garage door businesses.",
    intent: "case-topic",
    topics: ["multiples", "garage-door"],
    priority: 6,
  },
  {
    path: "/landscaping-business-ebitda-multiple-2026",
    title: "Landscaping EBITDA multiples (2026)",
    summary: "Current landscaping EBITDA multiples with sources.",
    intent: "case-topic",
    trades: ["landscaping"],
    topics: ["multiples", "landscaping", "ebitda"],
    priority: 9,
  },
  {
    path: "/sba-financing-to-buy-a-plumbing-business",
    title: "SBA 7(a) financing for a plumbing acquisition",
    summary: "How SBA 7(a) works for a plumbing acquisition.",
    intent: "case-topic",
    trades: ["plumbing"],
    topics: ["sba", "financing", "plumbing", "buyer"],
    priority: 7,
  },
  {
    path: "/pool-service-company-for-sale-2-million-ebitda",
    title: "Pool service company for sale ($2M EBITDA)",
    summary: "Example of a pool service listing.",
    intent: "case-topic",
    trades: ["pool"],
    topics: ["pool", "listings"],
    priority: 5,
  },
  {
    path: "/sell-pool-service-company-5-million-revenue",
    title: "Sell a pool service company ($5M revenue)",
    summary: "What to expect at $5M revenue in pool services.",
    intent: "case-topic",
    trades: ["pool"],
    topics: ["pool", "sell"],
    priority: 5,
  },
  {
    path: "/how-to-sell-electrical-contractor-business-fast",
    title: "How to sell an electrical contractor fast",
    summary: "Fast-track process for selling an electrical contractor.",
    intent: "case-topic",
    trades: ["electrical"],
    topics: ["electrical", "sell", "fast"],
    priority: 6,
  },
  {
    path: "/exit-strategy-for-roofing-company-owner-retiring",
    title: "Exit strategy for a retiring roofing company owner",
    summary: "Succession-driven exit strategy for roofing.",
    intent: "case-topic",
    trades: ["roofing"],
    topics: ["exit", "roofing", "succession"],
    priority: 7,
  },
  {
    path: "/sell-pest-control-business-without-listing-agreement",
    title: "Sell a pest control business without a listing agreement",
    summary: "Confidential sell-side without a listing agreement.",
    intent: "case-topic",
    trades: ["pest-control"],
    topics: ["pest-control", "confidential", "sell"],
    priority: 5,
  },
  {
    path: "/sell-landscaping-business-confidentially",
    title: "Sell a landscaping business confidentially",
    summary: "Confidential sell-side for landscaping.",
    intent: "case-topic",
    trades: ["landscaping"],
    topics: ["landscaping", "confidential", "sell"],
    priority: 6,
  },
  {
    path: "/sell/electrical-contractor-business-without-a-broker",
    title: "Sell an electrical contractor without a broker",
    summary: "FSBO-style sale guidance for electrical contractors.",
    intent: "case-topic",
    trades: ["electrical"],
    topics: ["electrical", "sell", "diy"],
    priority: 5,
  },
  {
    path: "/ma-advisor-vs-business-broker-for-home-services",
    title: "M&A advisor vs. business broker for home services",
    summary: "When to use an M&A advisor vs. a business broker.",
    intent: "case-topic",
    topics: ["advisor", "broker", "process"],
    priority: 6,
  },
  {
    path: "/confidential-sale-of-home-services-business",
    title: "Confidential sale of a home-services business",
    summary: "How to run a confidential sale process.",
    intent: "case-topic",
    topics: ["confidential", "process", "nda"],
    priority: 8,
  },
  {
    path: "/sell-landscaping-company-to-private-equity",
    title: "Sell a landscaping company to PE",
    summary: "Private-equity-focused sell-side for landscaping.",
    intent: "case-topic",
    trades: ["landscaping"],
    topics: ["landscaping", "pe", "sell"],
    priority: 7,
  },
  {
    path: "/free-resources/sell-side-data-room-checklist",
    title: "Sell-side data room checklist",
    summary: "The complete sell-side data room checklist.",
    intent: "resource",
    topics: ["data-room", "diligence", "qoe", "checklist"],
    priority: 9,
  },
];

/**
 * Direct 1:1 mapping from a hub tool slug to the mainstreetwealth.ai tool
 * that is the closest counterpart on the main site. Used to render a prominent
 * "On mainstreetwealth.ai" callout at the top of each hub tool page.
 */
export const HUB_TO_MAINSTREET_TOOL: Record<string, string[]> = {
  // Hub featured tools → main-site tools
  "ebitda-calculator": [
    "/tools/business-valuation-calculator",
    "/tools/ebitda-benchmarker",
    "/tools/sde-vs-ebitda",
  ],
  "sde-calculator": [
    "/tools/sde-vs-ebitda",
    "/tools/business-valuation-calculator",
    "/tools/salary-normalizer",
  ],
  "adjusted-ebitda-addbacks": [
    "/tools/salary-normalizer",
    "/tools/equipment-depreciation",
    "/tools/seasonal-normalizer",
  ],
  "valuation-multiples-lookup": [
    "/tools/business-valuation-calculator",
    "/tools/ebitda-benchmarker",
    "/tools/comparable-sales",
    "/tools/competitor-acquisitions",
  ],
  "rollover-equity-calculator": [
    "/tools/deal-structure",
    "/tools/business-valuation-calculator",
    "/tools/tax-estimator",
  ],
  "net-proceeds-calculator": [
    "/tools/tax-estimator",
    "/tools/deal-structure",
    "/tools/business-valuation-calculator",
  ],
  "exit-readiness-score": [
    "/tools/buyer-readiness-score",
    "/tools/exit-timeline",
    "/tools/reputation-score",
  ],
  "owner-dependence-scorecard": [
    "/tools/employee-dependency",
    "/tools/buyer-readiness-score",
    "/tools/salary-normalizer",
  ],
  // Hub planned tools → closest main-site tool
  "qoe-checklist": ["/tools/salary-normalizer", "/tools/seasonal-normalizer"],
  "financials-normalizer": ["/tools/seasonal-normalizer", "/tools/salary-normalizer"],
  "recurring-revenue-analyzer": ["/tools/recurring-revenue"],
  "customer-concentration-analyzer": ["/tools/customer-concentration"],
  "churn-cohort-analyzer": ["/tools/recurring-revenue"],
  "job-costing-margin-analyzer": ["/tools/route-density"],
  "technician-productivity-benchmark": ["/tools/route-density", "/tools/ebitda-benchmarker"],
  "seasonality-adjuster": ["/tools/seasonal-normalizer"],
  "debt-like-items-finder": ["/tools/equipment-depreciation"],
  "earnout-simulator": ["/tools/deal-structure"],
  "seller-note-calculator": ["/tools/deal-structure", "/tools/tax-estimator"],
  "asset-vs-stock-sale": ["/tools/deal-structure", "/tools/tax-estimator"],
  "purchase-price-allocation": ["/tools/tax-estimator"],
  "installment-sale-calculator": ["/tools/tax-estimator"],
  "sba-7a-calculator": ["/tools/deal-structure", "/tools/tax-estimator"],
  "pro-forma-cap-table": ["/tools/deal-structure"],
  "distribution-waterfall": ["/tools/deal-structure"],
  "escrow-holdback-calculator": ["/tools/deal-structure"],
  "comparable-transactions": ["/tools/comparable-sales", "/tools/competitor-acquisitions"],
  "dcf-model": ["/tools/business-valuation-calculator"],
  "lbo-model": ["/tools/deal-structure", "/tools/business-valuation-calculator"],
  "rule-of-thumb-valuation": ["/tools/business-valuation-calculator", "/tools/ebitda-benchmarker"],
  "enterprise-to-equity-bridge": ["/tools/business-valuation-calculator", "/tools/deal-structure"],
  "working-capital-peg-calculator": ["/tools/business-valuation-calculator"],
  "owner-dependence-scorecard-planned": ["/tools/employee-dependency"],
  "exit-timeline-planner": ["/tools/exit-timeline"],
  "retirement-gap-calculator": ["/tools/tax-estimator", "/tools/exit-timeline"],
  "value-gap-analyzer": ["/tools/business-valuation-calculator"],
  "succession-planner": ["/tools/exit-timeline", "/tools/buyer-readiness-score"],
  "12-month-pre-sale-checklist": ["/tools/exit-timeline", "/tools/buyer-readiness-score"],
  "tax-planning-checklist": ["/tools/tax-estimator"],
  "non-compete-by-state": ["/tools/non-compete"],
  "workforce-retention-analysis": ["/tools/employee-dependency"],
  "field-software-diligence": ["/tools/route-density"],
  "hvac-toolkit": [
    "/tools/business-valuation-calculator",
    "/tools/route-density",
    "/tools/ebitda-benchmarker",
  ],
  "plumbing-toolkit": [
    "/tools/business-valuation-calculator",
    "/tools/route-density",
    "/tools/recurring-revenue",
  ],
  "roofing-toolkit": [
    "/tools/business-valuation-calculator",
    "/tools/seasonal-normalizer",
    "/tools/customer-concentration",
  ],
  "pest-control-toolkit": [
    "/tools/recurring-revenue",
    "/tools/route-density",
    "/tools/business-valuation-calculator",
  ],
  "landscaping-toolkit": [
    "/tools/seasonal-normalizer",
    "/tools/recurring-revenue",
    "/tools/business-valuation-calculator",
  ],
  "pool-and-electrical-toolkit": [
    "/tools/seasonal-normalizer",
    "/tools/route-density",
    "/tools/business-valuation-calculator",
  ],
};

/**
 * Returns an absolute URL for a mainstreet path.
 */
export function mainstreetUrl(path: string): string {
  return `${MAIN_SITE}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Build a list of contextually relevant mainstreet.ai links for a tool,
 * matching on trade and topic. Returns up to `limit` links.
 */
export function relatedMainstreetLinks(
  opts: {
    category?: ToolCategory;
    trades?: Trade[];
    topics?: string[];
    exclude?: string[];
    intents?: MainstreetIntent[];
    limit?: number;
  }
): MainstreetLink[] {
  const { category, trades = [], topics = [], exclude = [], intents, limit = 6 } = opts;
  const topicSet = new Set(topics.map((t) => t.toLowerCase()));
  const tradeSet = new Set(trades);
  const excludeSet = new Set(exclude);

  const scored = MAINSTREET_LINKS.filter(
    (l) => !excludeSet.has(l.path) && (!intents || intents.includes(l.intent))
  ).map((link) => {
    let score = link.priority ?? 1;
    if (link.trades?.some((t) => tradeSet.has(t))) score += 6;
    if (link.topics?.some((t) => topicSet.has(t.toLowerCase()))) score += 4;
    if (category === "valuation" && link.topics?.includes("valuation")) score += 2;
    if (category === "exit" && link.topics?.includes("exit")) score += 2;
    if (category === "deal-structure" && link.topics?.includes("structure")) score += 2;
    if (category === "diligence" && link.topics?.includes("diligence")) score += 2;
    if (category === "legal" && link.topics?.includes("confidential")) score += 2;
    if (category === "sourcing" && link.intent === "buy-side") score += 2;
    return { link, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.link);
}

/**
 * Grab a specific link by path.
 */
export function mainstreetLink(path: string): MainstreetLink | undefined {
  return MAINSTREET_LINKS.find((l) => l.path === path);
}

/**
 * Return the mainstreet tool counterparts for a hub tool slug.
 */
export function counterpartTools(hubSlug: string): MainstreetLink[] {
  const paths = HUB_TO_MAINSTREET_TOOL[hubSlug] ?? [];
  return paths
    .map((p) => mainstreetLink(p))
    .filter((l): l is MainstreetLink => Boolean(l));
}
