// Full catalog of the Main Street Wealth Open Source hub.
// Every entry maps 1:1 to a slug under /open-source/*.
// See requirements.txt for the source list.

export type ToolCategory =
  | "hub"
  | "valuation"
  | "financial-analysis"
  | "deal-structure"
  | "sourcing"
  | "diligence"
  | "legal"
  | "exit"
  | "data"
  | "ai"
  | "trades";

export type DealStage =
  | "pre-sale"
  | "sourcing"
  | "diligence"
  | "structuring"
  | "closing"
  | "post-close"
  | "any";

export type Trade =
  | "hvac"
  | "plumbing"
  | "roofing"
  | "pest-control"
  | "landscaping"
  | "pool"
  | "electrical"
  | "all-trades";

export type ToolStatus = "live" | "beta" | "planned";

export type Tool = {
  /** Numeric id from the requirements list. */
  id: number;
  /** URL slug relative to the hub root. */
  slug: string;
  /** Short page title. */
  title: string;
  /** Longer H1 / card tagline. */
  tagline: string;
  /** One-sentence description shown on cards. */
  description: string;
  /** Full description for the tool landing page. */
  about: string;
  category: ToolCategory;
  stage: DealStage;
  trades: Trade[];
  status: ToolStatus;
  /** Keywords used for the directory search. */
  keywords: string[];
  /** Pages where interactive calculators or scorecards are implemented in the hub. */
  interactive?: boolean;
  /** Legal/tax/financial advice disclaimer should be shown. */
  advisoryDisclaimer?: boolean;
};

export const CATEGORIES: {
  id: ToolCategory;
  letter: string;
  label: string;
  description: string;
  accent: string;
}[] = [
  {
    id: "hub",
    letter: "A",
    label: "Hub & community",
    description: "Entry points, the GitHub org, docs, roadmap, and ways to contribute.",
    accent: "violet",
  },
  {
    id: "valuation",
    letter: "B",
    label: "Valuation",
    description: "Calculators and models to size a business and defend a number.",
    accent: "violet",
  },
  {
    id: "financial-analysis",
    letter: "C",
    label: "Financial analysis & QoE",
    description: "Normalize the financials, prove the earnings, and stress the quality.",
    accent: "mint",
  },
  {
    id: "deal-structure",
    letter: "D",
    label: "Deal structure & proceeds",
    description: "Model earnouts, seller notes, waterfalls, and net-of-everything proceeds.",
    accent: "violet",
  },
  {
    id: "sourcing",
    letter: "E",
    label: "Sourcing & marketing",
    description: "Build the buy-box, run outreach, and manage the pipeline.",
    accent: "mint",
  },
  {
    id: "diligence",
    letter: "F",
    label: "Due diligence",
    description: "Request lists, data rooms, red-flag scanners, and operational checks.",
    accent: "violet",
  },
  {
    id: "legal",
    letter: "G",
    label: "Legal & closing",
    description: "NDAs, LOIs, disclosure schedules, and state-by-state references.",
    accent: "violet",
  },
  {
    id: "exit",
    letter: "H",
    label: "Exit readiness",
    description: "For owners: score the gap, plan the pre-sale year, and plan the proceeds.",
    accent: "mint",
  },
  {
    id: "data",
    letter: "I",
    label: "Data & benchmarks",
    description: "Open datasets, APIs, and dashboards covering multiples and trade KPIs.",
    accent: "mint",
  },
  {
    id: "ai",
    letter: "J",
    label: "AI & automation",
    description: "Prompt libraries, extraction pipelines, evals, and an MCP server for agents.",
    accent: "violet",
  },
  {
    id: "trades",
    letter: "K",
    label: "Trade-specific toolkits",
    description: "HVAC, plumbing, roofing, pest, landscaping, pool, and electrical bundles.",
    accent: "mint",
  },
];

export const TRADES: { id: Trade; label: string }[] = [
  { id: "all-trades", label: "All trades" },
  { id: "hvac", label: "HVAC" },
  { id: "plumbing", label: "Plumbing" },
  { id: "roofing", label: "Roofing" },
  { id: "pest-control", label: "Pest control" },
  { id: "landscaping", label: "Landscaping" },
  { id: "pool", label: "Pool" },
  { id: "electrical", label: "Electrical" },
];

export const STAGES: { id: DealStage; label: string }[] = [
  { id: "any", label: "Any stage" },
  { id: "pre-sale", label: "Pre-sale" },
  { id: "sourcing", label: "Sourcing" },
  { id: "diligence", label: "Diligence" },
  { id: "structuring", label: "Structuring" },
  { id: "closing", label: "Closing" },
  { id: "post-close", label: "Post-close" },
];

// Shortcut for building catalog rows. "all" trades + any stage are the defaults.
function t(
  id: number,
  slug: string,
  title: string,
  tagline: string,
  description: string,
  category: ToolCategory,
  extras: Partial<Tool> = {}
): Tool {
  return {
    id,
    slug,
    title,
    tagline,
    description,
    about: extras.about ?? description,
    category,
    stage: extras.stage ?? "any",
    trades: extras.trades ?? ["all-trades"],
    status: extras.status ?? "planned",
    keywords: extras.keywords ?? [],
    interactive: extras.interactive,
    advisoryDisclaimer: extras.advisoryDisclaimer,
  };
}

export const TOOLS: Tool[] = [
  // A. Hub and community
  t(1, "", "Hub landing page", "The full open source tool index",
    "The entry point. One hub that lists every tool and shows the first ten to use.",
    "hub", { status: "live", keywords: ["hub", "index", "landing"] }),
  t(2, "directory", "Directory", "Filter by category, trade, and deal stage",
    "Searchable catalog of every tool in the hub with filters for category, trade, and deal stage.",
    "hub", { status: "live", keywords: ["directory", "filter", "search"] }),
  t(3, "github", "GitHub", "Install, source code, and issues",
    "The GitHub org, install instructions, and quick-start for self-hosting any of the tools.",
    "hub", { status: "live", keywords: ["github", "install", "source"] }),
  t(4, "docs", "Documentation", "Guides, references, and how-tos",
    "Documentation home for every tool, dataset, and API in the hub.",
    "hub", { status: "live", keywords: ["docs", "guides", "reference"] }),
  t(5, "roadmap", "Roadmap", "What's shipping next, with voting",
    "Public roadmap showing what we're building next and how to upvote the tools you need.",
    "hub", { status: "live", keywords: ["roadmap", "voting"] }),
  t(6, "changelog", "Changelog", "Release notes across the hub",
    "Dated release notes for every tool, dataset, and API in the hub.",
    "hub", { status: "live", keywords: ["changelog", "releases"] }),
  t(7, "contribute", "Contribute", "Good-first-issues and contributor guide",
    "How to contribute. Local setup, our style, review bar, and a list of good-first-issues.",
    "hub", { status: "live", keywords: ["contribute", "contributor", "oss"] }),
  t(8, "license-governance", "License & governance", "Licensing, governance, code of conduct",
    "Licensing, governance model, decision log, and code of conduct for the hub.",
    "hub", { status: "live", keywords: ["license", "governance", "coc"] }),
  t(9, "community", "Community", "Discord, Slack, and discussions",
    "Where to find the community: Discord, Slack, GitHub Discussions, and office hours.",
    "hub", { status: "live", keywords: ["community", "slack", "discord"] }),
  t(10, "request-a-tool", "Request a tool", "Tell us what to build next",
    "Request a tool, dataset, or feature. We review and prioritize weekly.",
    "hub", { status: "live", keywords: ["request", "feedback"] }),

  // B. Valuation
  t(11, "ebitda-calculator", "EBITDA calculator", "Compute EBITDA from a P&L",
    "Reconstruct EBITDA from net income by adding back interest, taxes, depreciation, and amortization.",
    "valuation", {
      status: "live",
      interactive: true,
      stage: "pre-sale",
      advisoryDisclaimer: true,
      keywords: ["ebitda", "valuation", "p&l", "earnings"],
    }),
  t(12, "sde-calculator", "SDE calculator", "Seller's discretionary earnings",
    "Compute seller's discretionary earnings for owner-operated businesses, including an owner's compensation add-back.",
    "valuation", {
      status: "live",
      interactive: true,
      stage: "pre-sale",
      advisoryDisclaimer: true,
      keywords: ["sde", "seller's discretionary earnings", "main street"],
    }),
  t(13, "adjusted-ebitda-addbacks", "Adjusted EBITDA add-backs", "Document every add-back",
    "Build a defensible add-back schedule with a documentation checklist for each adjustment.",
    "valuation", {
      status: "live",
      interactive: true,
      stage: "pre-sale",
      advisoryDisclaimer: true,
      keywords: ["add-back", "adjustments", "quality of earnings"],
    }),
  t(14, "valuation-multiples-lookup", "Valuation multiples lookup", "Multiples by trade and size",
    "Look up typical EBITDA multiples by trade and revenue band, with the sample size and the source.",
    "valuation", {
      status: "live",
      interactive: true,
      stage: "pre-sale",
      advisoryDisclaimer: true,
      keywords: ["multiples", "comps", "benchmarks"],
    }),
  t(15, "dcf-model", "DCF model", "Discounted cash flow",
    "Open-source DCF with explicit, residual, and terminal periods. Export the model to Excel.",
    "valuation", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["dcf", "cash flow"] }),
  t(16, "lbo-model", "LBO model", "Buyer-side returns",
    "Levered buyout model with sources and uses, debt schedule, and MOIC/IRR output.",
    "valuation", { stage: "structuring", advisoryDisclaimer: true, keywords: ["lbo", "irr", "moic"] }),
  t(17, "comparable-transactions", "Comparable transactions", "Transaction comps analyzer",
    "Analyze comparable deals by trade, revenue, EBITDA, and geography.",
    "valuation", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["comps", "transactions"] }),
  t(18, "valuation-monte-carlo", "Monte Carlo valuation", "Value range simulator",
    "Simulate a value range for the business with Monte Carlo over revenue growth, margin, and multiple.",
    "valuation", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["monte carlo", "range"] }),
  t(19, "rule-of-thumb-valuation", "Rule-of-thumb valuation", "Revenue and per-tech heuristics",
    "Quick heuristics: multiples of revenue and value per technician, by trade.",
    "valuation", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["heuristic", "rule of thumb"] }),
  t(20, "enterprise-to-equity-bridge", "Enterprise to equity bridge", "From EV to seller equity",
    "Walk from enterprise value to equity value: debt, cash, working capital, and transaction fees.",
    "valuation", { stage: "structuring", advisoryDisclaimer: true, keywords: ["bridge", "equity"] }),
  t(21, "working-capital-peg-calculator", "Working capital peg", "Set the target net working capital",
    "Pick a defensible working capital peg from a trailing twelve-month average or seasonality-adjusted window.",
    "valuation", { stage: "structuring", advisoryDisclaimer: true, keywords: ["working capital", "peg"] }),
  t(22, "rollover-equity-calculator", "Rollover equity calculator", "Model the second bite of the apple",
    "Model rollover equity: cash at close, retained equity, and the second-exit outcome.",
    "valuation", {
      status: "live",
      interactive: true,
      stage: "structuring",
      advisoryDisclaimer: true,
      keywords: ["rollover", "second bite", "equity"],
    }),

  // C. Financial analysis and QoE
  t(23, "qoe-checklist", "QoE checklist", "Quality of earnings reality check",
    "A buy-side quality of earnings checklist tuned to home-service businesses.",
    "financial-analysis", { stage: "diligence", keywords: ["qoe", "quality of earnings"] }),
  t(24, "financials-normalizer", "Financials normalizer", "Clean the P&L into a standard chart",
    "Normalize a messy P&L into a standard chart of accounts so you can benchmark it against the trade.",
    "financial-analysis", { stage: "diligence", keywords: ["normalize", "p&l"] }),
  t(25, "quickbooks-xero-parser", "QuickBooks & Xero parser", "Pull the data without a login",
    "Parse QuickBooks and Xero exports into a canonical structure for diligence.",
    "financial-analysis", { stage: "diligence", keywords: ["quickbooks", "xero", "parser"] }),
  t(26, "recurring-revenue-analyzer", "Recurring revenue analyzer", "Service agreements and maintenance plans",
    "Break down recurring revenue from service agreements, maintenance plans, and memberships.",
    "financial-analysis", { stage: "diligence", keywords: ["recurring", "service agreement"] }),
  t(27, "customer-concentration-analyzer", "Customer concentration", "The 80/20 risk check",
    "Measure revenue concentration by customer, channel, and contract type.",
    "financial-analysis", { stage: "diligence", keywords: ["concentration", "customers"] }),
  t(28, "churn-cohort-analyzer", "Churn & cohort analyzer", "Membership retention over time",
    "Cohort-based churn and retention analysis for recurring plans.",
    "financial-analysis", { stage: "diligence", keywords: ["churn", "cohort", "retention"] }),
  t(29, "job-costing-margin-analyzer", "Job-costing margin", "Gross margin by job type",
    "Analyze gross margin by job type, crew, and service line.",
    "financial-analysis", { stage: "diligence", keywords: ["margin", "job costing"] }),
  t(30, "technician-productivity-benchmark", "Technician productivity", "Revenue and billable hours per tech",
    "Benchmark revenue per technician and billable hours against the trade.",
    "financial-analysis", { stage: "diligence", keywords: ["productivity", "technician"] }),
  t(31, "seasonality-adjuster", "Seasonality adjuster", "LTM normalization",
    "Adjust last-twelve-month earnings for seasonality and weather-driven swings.",
    "financial-analysis", { stage: "diligence", keywords: ["seasonality", "ltm"] }),
  t(32, "debt-like-items-finder", "Debt-like items finder", "What's really debt",
    "Flag debt-like items in the P&L and balance sheet so they come off the purchase price.",
    "financial-analysis", { stage: "diligence", keywords: ["debt-like", "balance sheet"] }),

  // D. Deal structure and proceeds
  t(33, "earnout-simulator", "Earnout simulator", "Model the earnout upside and risk",
    "Simulate earnout outcomes across revenue, EBITDA, and milestone structures.",
    "deal-structure", { stage: "structuring", advisoryDisclaimer: true, keywords: ["earnout"] }),
  t(34, "seller-note-calculator", "Seller note calculator", "Amortize the seller note",
    "Model a seller note with interest rate, amortization, and standstill terms.",
    "deal-structure", { stage: "structuring", advisoryDisclaimer: true, keywords: ["seller note"] }),
  t(35, "net-proceeds-calculator", "Net proceeds calculator", "After tax, after fees",
    "What the seller actually keeps after taxes, broker fees, legal, and payoffs.",
    "deal-structure", {
      status: "live",
      interactive: true,
      stage: "structuring",
      advisoryDisclaimer: true,
      keywords: ["proceeds", "taxes", "after fees"],
    }),
  t(36, "asset-vs-stock-sale", "Asset vs. stock sale", "Pick the structure",
    "Compare an asset sale and a stock sale on tax, liability, and consent risk.",
    "deal-structure", { stage: "structuring", advisoryDisclaimer: true, keywords: ["asset sale", "stock sale"] }),
  t(37, "purchase-price-allocation", "Purchase price allocation", "Form 8594 builder",
    "Allocate the purchase price across tangible, intangible, and goodwill in line with Form 8594.",
    "deal-structure", { stage: "closing", advisoryDisclaimer: true, keywords: ["ppa", "8594"] }),
  t(38, "installment-sale-calculator", "Installment sale", "Spread the gain",
    "Model an installment sale and the tax deferral it creates.",
    "deal-structure", { stage: "closing", advisoryDisclaimer: true, keywords: ["installment", "tax"] }),
  t(39, "sba-7a-calculator", "SBA 7(a) calculator", "Buyer financing",
    "SBA 7(a) buyer financing calculator with equity injection, standby, and life-of-loan interest.",
    "deal-structure", { stage: "structuring", advisoryDisclaimer: true, keywords: ["sba", "7a"] }),
  t(40, "pro-forma-cap-table", "Pro forma cap table", "Rollover + new money",
    "Pro forma cap table combining rollover equity, management incentive, and the buyer's new money.",
    "deal-structure", { stage: "structuring", advisoryDisclaimer: true, keywords: ["cap table"] }),
  t(41, "distribution-waterfall", "Distribution waterfall", "LP/GP returns at exit",
    "Model LP/GP distributions with preferred return, catch-up, and carry.",
    "deal-structure", { stage: "post-close", advisoryDisclaimer: true, keywords: ["waterfall", "carry"] }),
  t(42, "escrow-holdback-calculator", "Escrow & holdback", "Protect against surprises",
    "Size escrow and indemnity holdback based on deal risk and QoE findings.",
    "deal-structure", { stage: "closing", advisoryDisclaimer: true, keywords: ["escrow", "holdback"] }),

  // E. Sourcing and marketing
  t(43, "buy-box-builder", "Buy-box builder", "Define what you'll buy",
    "Build a buy-box with trade, geography, revenue, EBITDA, and operator profile.",
    "sourcing", { stage: "sourcing", keywords: ["buy-box", "thesis"] }),
  t(44, "buyer-matcher", "Buyer matcher", "Sellers to buyers",
    "Match sellers to buyers whose stated criteria they actually fit.",
    "sourcing", { stage: "sourcing", keywords: ["buyer", "match"] }),
  t(45, "target-screener", "Target screener", "Build the acquisition target list",
    "Screen targets by trade, geography, revenue estimate, and digital signals.",
    "sourcing", { stage: "sourcing", keywords: ["screener", "targets"] }),
  t(46, "teaser-generator", "Teaser generator", "The blind one-pager",
    "Generate a sell-side teaser from a short intake form.",
    "sourcing", { stage: "sourcing", keywords: ["teaser"] }),
  t(47, "cim-template", "CIM template", "Confidential information memorandum",
    "A full confidential information memorandum template tuned for home-service businesses.",
    "sourcing", { stage: "sourcing", keywords: ["cim"] }),
  t(48, "outreach-sequences", "Outreach sequences", "Email templates that work",
    "Opt-in outreach sequences for buyers and sellers, with reply rate benchmarks.",
    "sourcing", { stage: "sourcing", keywords: ["email", "outreach"] }),
  t(49, "pe-platform-directory", "PE platform directory", "Open dataset of roll-ups",
    "Open directory of PE-backed roll-up platforms by trade, geography, and stage.",
    "sourcing", { stage: "sourcing", keywords: ["platforms", "pe"] }),
  t(50, "add-on-tracker", "Add-on tracker", "Who's buying what",
    "Track announced add-on acquisitions by platform, trade, and quarter.",
    "sourcing", { stage: "sourcing", keywords: ["add-on", "tracker"] }),
  t(51, "deal-pipeline-crm", "Deal pipeline CRM", "Self-hostable",
    "A self-hostable CRM template for sell-side and buy-side pipelines.",
    "sourcing", { stage: "sourcing", keywords: ["crm", "pipeline"] }),
  t(52, "market-map-generator", "Market map generator", "The map, generated",
    "Generate a market map by trade, geography, and revenue band.",
    "sourcing", { stage: "sourcing", keywords: ["market map"] }),

  // F. Due diligence
  t(53, "dd-request-list-generator", "DD request list", "The request list, generated",
    "Generate a due diligence request list scoped to the deal size and trade.",
    "diligence", { stage: "diligence", keywords: ["dd", "request list"] }),
  t(54, "data-room-structure", "Data room structure", "The folder tree",
    "A standardized data room folder structure for sell-side teams.",
    "diligence", { stage: "diligence", keywords: ["data room"] }),
  t(55, "data-room-completeness-checker", "Data room completeness", "What's missing",
    "Scan a data room and flag missing documents from the request list.",
    "diligence", { stage: "diligence", keywords: ["data room", "completeness"] }),
  t(56, "contract-red-flag-scanner", "Contract red-flag scanner", "The clauses that kill deals",
    "Scan contracts for change-of-control, exclusivity, and other deal-killing clauses.",
    "diligence", { stage: "diligence", advisoryDisclaimer: true, keywords: ["contract", "red flag"] }),
  t(57, "service-agreement-extractor", "Service agreement extractor", "From PDFs to a table",
    "Extract key terms from service agreements into a structured table.",
    "diligence", { stage: "diligence", keywords: ["service agreement"] }),
  t(58, "state-licensing-checklist", "State licensing checklist", "By state and trade",
    "State-by-state contractor licensing requirements with renewal dates.",
    "diligence", { stage: "diligence", advisoryDisclaimer: true, keywords: ["licensing", "state"] }),
  t(59, "insurance-risk-checklist", "Insurance & risk checklist", "What coverage you need",
    "The insurance and risk checklist for home-service acquisitions.",
    "diligence", { stage: "diligence", advisoryDisclaimer: true, keywords: ["insurance", "risk"] }),
  t(60, "workforce-retention-analysis", "Workforce retention", "Keep the techs",
    "Analyze workforce retention risk, including stay bonuses and non-competes.",
    "diligence", { stage: "diligence", keywords: ["retention", "workforce"] }),
  t(61, "field-software-diligence", "Field software diligence", "ServiceTitan, Jobber, Housecall Pro",
    "Audit field service software data for ServiceTitan, Jobber, and Housecall Pro.",
    "diligence", { stage: "diligence", keywords: ["servicetitan", "jobber", "housecall"] }),
  t(62, "safety-environmental-checklist", "Safety & environmental", "OSHA and EPA basics",
    "Safety and environmental due diligence checklist with OSHA and EPA references.",
    "diligence", { stage: "diligence", advisoryDisclaimer: true, keywords: ["safety", "osha", "epa"] }),

  // G. Legal and closing
  t(63, "nda-generator", "NDA generator", "Mutual and one-way",
    "Generate a mutual or one-way NDA tailored to M&A diligence.",
    "legal", { stage: "sourcing", advisoryDisclaimer: true, keywords: ["nda"] }),
  t(64, "loi-generator", "LOI generator", "The letter of intent",
    "Generate a letter of intent with price, structure, exclusivity, and conditions precedent.",
    "legal", { stage: "structuring", advisoryDisclaimer: true, keywords: ["loi"] }),
  t(65, "loi-comparison-tool", "LOI comparison", "Side-by-side bids",
    "Compare multiple letters of intent side-by-side on price, structure, and risk.",
    "legal", { stage: "structuring", advisoryDisclaimer: true, keywords: ["loi", "compare"] }),
  t(66, "term-sheet-summarizer", "Term sheet summarizer", "In plain English",
    "Summarize a term sheet in plain English with the terms that matter.",
    "legal", { stage: "structuring", advisoryDisclaimer: true, keywords: ["term sheet"] }),
  t(67, "disclosure-schedule-builder", "Disclosure schedule", "What the APA requires",
    "Build the disclosure schedule to the APA, section by section.",
    "legal", { stage: "closing", advisoryDisclaimer: true, keywords: ["disclosure", "apa"] }),
  t(68, "non-compete-by-state", "Non-compete by state", "Enforceability map",
    "Non-compete enforceability by state, with the current legal thresholds.",
    "legal", { stage: "closing", advisoryDisclaimer: true, keywords: ["non-compete", "state"] }),
  t(69, "closing-checklist", "Closing checklist", "The day-of list",
    "The closing checklist, from signature pages to funds flow.",
    "legal", { stage: "closing", advisoryDisclaimer: true, keywords: ["closing"] }),
  t(70, "transition-agreement-templates", "Transition agreements", "Consulting and employment",
    "Transition services, consulting, and employment agreement templates for sellers staying on.",
    "legal", { stage: "post-close", advisoryDisclaimer: true, keywords: ["transition", "tsa"] }),

  // H. Exit readiness
  t(71, "exit-readiness-score", "Exit readiness score", "Are you sale-ready?",
    "Score the business across financials, people, systems, and growth to see how sale-ready it is.",
    "exit", {
      status: "live",
      interactive: true,
      stage: "pre-sale",
      advisoryDisclaimer: true,
      keywords: ["exit", "readiness"],
    }),
  t(72, "owner-dependence-scorecard", "Owner dependence", "How dependent is this on you?",
    "Score owner dependence across sales, operations, finance, and relationships.",
    "exit", {
      status: "live",
      interactive: true,
      stage: "pre-sale",
      advisoryDisclaimer: true,
      keywords: ["owner dependence", "key person"],
    }),
  t(73, "value-gap-analyzer", "Value gap analyzer", "What you want vs. what you'd get",
    "Compare the value you need at exit with what the business would fetch today.",
    "exit", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["value gap"] }),
  t(74, "succession-planner", "Succession planner", "Who runs the business next",
    "Plan management succession across the key functions before you sell.",
    "exit", { stage: "pre-sale", keywords: ["succession"] }),
  t(75, "retirement-gap-calculator", "Retirement gap calculator", "What you'll need, after exit",
    "Compare the net proceeds from a sale with the retirement income you'll need.",
    "exit", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["retirement"] }),
  t(76, "exit-timeline-planner", "Exit timeline planner", "The 12 to 36 month plan",
    "Lay out a 12-to-36 month exit timeline with the right workstreams in the right order.",
    "exit", { stage: "pre-sale", keywords: ["timeline"] }),
  t(77, "12-month-pre-sale-checklist", "12-month pre-sale checklist", "What to clean up, quarter by quarter",
    "The 12-month pre-sale checklist, broken down by quarter.",
    "exit", { stage: "pre-sale", keywords: ["pre-sale", "checklist"] }),
  t(78, "tax-planning-checklist", "Tax planning checklist", "Before you sign the LOI",
    "Pre-sale tax planning checklist, built with the input of M&A tax advisors.",
    "exit", { stage: "pre-sale", advisoryDisclaimer: true, keywords: ["tax", "planning"] }),

  // I. Data and benchmarks
  t(79, "data/multiples", "Open multiples dataset", "Multiples, with sources",
    "Open dataset of EBITDA and revenue multiples by trade and size, with sources.",
    "data", { keywords: ["multiples", "data"] }),
  t(80, "data/trade-benchmarks", "Trade benchmarks", "KPIs by trade",
    "Open benchmarks for the KPIs that matter in each trade: billable rate, call close, parts margin, average ticket.",
    "data", { keywords: ["benchmarks", "kpis"] }),
  t(81, "data/public-comps", "Public comps", "Tracker of listed home-service names",
    "Public company comparables for home services, updated quarterly.",
    "data", { keywords: ["public", "comps"] }),
  t(82, "data/consolidator-tracker", "Consolidator tracker", "Who's rolling up what",
    "Track consolidators by trade, platform, and pace of add-ons.",
    "data", { keywords: ["consolidator", "tracker"] }),
  t(83, "data/market-trends-dashboard", "Market trends", "Deal flow and multiples over time",
    "A dashboard of deal flow, multiples, and announced transactions in the trades.",
    "data", { keywords: ["trends", "dashboard"] }),
  t(84, "data/state-density-map", "State density map", "Where the businesses are",
    "Density map of home-service businesses by state and trade.",
    "data", { keywords: ["map", "state"] }),
  t(85, "data/api", "Data API", "Programmatic access",
    "Programmatic access to the open datasets with rate limits and auth.",
    "data", { keywords: ["api"] }),
  t(86, "data/glossary", "M&A glossary", "Machine-readable",
    "A machine-readable M&A glossary with definitions and references, ready to feed to agents.",
    "data", { keywords: ["glossary"] }),

  // J. AI and automation
  t(87, "ai/prompt-library", "Prompt library", "Prompts that work for M&A tasks",
    "A versioned library of prompts for M&A tasks: teaser drafting, CIM, Q&A, deal memo.",
    "ai", { keywords: ["prompts", "library"] }),
  t(88, "ai/cim-drafter", "CIM drafter", "Draft a CIM from a data room",
    "Draft a confidential information memorandum from a data room.",
    "ai", { keywords: ["cim", "drafter"] }),
  t(89, "ai/financials-summarizer", "Financials summarizer", "P&L to narrative",
    "Summarize a P&L and balance sheet into a diligence narrative.",
    "ai", { keywords: ["financials", "summary"] }),
  t(90, "ai/mcp-server", "MCP server", "M&A tools for AI agents",
    "A Model Context Protocol server exposing the open datasets and tools to AI agents.",
    "ai", { keywords: ["mcp", "agents"] }),
  t(91, "ai/document-extraction-pipeline", "Document extraction", "Diligence docs to structured data",
    "Pipeline to extract structured data from diligence documents.",
    "ai", { keywords: ["extraction", "ocr"] }),
  t(92, "ai/deal-memo-generator", "Deal memo generator", "The IC memo, drafted",
    "Draft an investment committee deal memo from a data room and model outputs.",
    "ai", { keywords: ["deal memo", "ic"] }),
  t(93, "ai/evals", "Agent evals", "Benchmarks for M&A tasks",
    "Open benchmarks and evals for AI agents on M&A tasks.",
    "ai", { keywords: ["eval", "benchmark"] }),
  t(94, "ai/agent-skills", "Agent skills", "Composable skills for M&A agents",
    "Composable skills and workflows for M&A agents, with examples.",
    "ai", { keywords: ["skills", "agent"] }),

  // K. Trade-specific toolkits
  t(95, "hvac-toolkit", "HVAC toolkit", "Everything for an HVAC deal",
    "The HVAC-specific bundle: benchmarks, add-back checklist, licensing map, and trade-tuned templates.",
    "trades", { trades: ["hvac"], keywords: ["hvac"] }),
  t(96, "plumbing-toolkit", "Plumbing toolkit", "Everything for a plumbing deal",
    "The plumbing-specific bundle: benchmarks, add-back checklist, licensing map, and trade-tuned templates.",
    "trades", { trades: ["plumbing"], keywords: ["plumbing"] }),
  t(97, "roofing-toolkit", "Roofing toolkit", "Everything for a roofing deal",
    "The roofing-specific bundle, with storm-related revenue and insurance-work considerations baked in.",
    "trades", { trades: ["roofing"], keywords: ["roofing"] }),
  t(98, "pest-control-toolkit", "Pest control toolkit", "Everything for a pest control deal",
    "The pest-control bundle, with recurring revenue analysis and route density baked in.",
    "trades", { trades: ["pest-control"], keywords: ["pest control"] }),
  t(99, "landscaping-toolkit", "Landscaping toolkit", "Everything for a landscaping deal",
    "The landscaping bundle, with maintenance vs. design-build mix and seasonal workforce built in.",
    "trades", { trades: ["landscaping"], keywords: ["landscaping"] }),
  t(100, "pool-and-electrical-toolkit", "Pool & electrical toolkit", "Pool, spa, and electrical bundles",
    "The pool, spa, and electrical trade bundle. Each has its own permitting and seasonality profile.",
    "trades", { trades: ["pool", "electrical"], keywords: ["pool", "electrical", "spa"] }),
];

// ---------- Helpers ----------

export const TOOL_BY_SLUG: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((tool) => [tool.slug, tool])
);

/** Tools you'd put on the hub landing as "start here". */
export const FEATURED_SLUGS = [
  "ebitda-calculator",
  "sde-calculator",
  "adjusted-ebitda-addbacks",
  "valuation-multiples-lookup",
  "rollover-equity-calculator",
  "net-proceeds-calculator",
  "exit-readiness-score",
  "owner-dependence-scorecard",
] as const;

export const FEATURED_TOOLS = FEATURED_SLUGS.map((slug) => TOOL_BY_SLUG[slug]).filter(Boolean);

export function toolsInCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function categoryLabel(category: ToolCategory): string {
  return CATEGORIES.find((c) => c.id === category)?.label ?? category;
}

export function categoryAccent(category: ToolCategory): "violet" | "mint" {
  const match = CATEGORIES.find((c) => c.id === category);
  return (match?.accent as "violet" | "mint") ?? "violet";
}

export function stageLabel(stage: DealStage): string {
  return STAGES.find((s) => s.id === stage)?.label ?? stage;
}

export function tradeLabel(trade: Trade): string {
  return TRADES.find((t) => t.id === trade)?.label ?? trade;
}

/**
 * Non-hub, non-featured tool slugs that will be rendered through the dynamic
 * [...slug] fallback route (as proper landing pages).
 */
export const FALLBACK_TOOLS = TOOLS.filter(
  (t) => t.category !== "hub" && !FEATURED_SLUGS.includes(t.slug as typeof FEATURED_SLUGS[number])
);
