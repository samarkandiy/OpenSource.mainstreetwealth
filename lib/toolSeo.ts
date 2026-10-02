// Per-tool SEO + EEAT payload for featured calculators.
// Each entry adds a methodology write-up, FAQ (surfaced as FAQPage schema),
// contextual mainstreetwealth.ai cross-links, and sourcing notes.

import type { FaqItem } from "./schema";

export type Source = {
  label: string;
  href: string;
  publisher: string;
};

export type ToolSeo = {
  /** Short tagline reused as meta description if provided. */
  metaDescription?: string;
  /** The methodology section, rendered as HTML paragraphs/lists. */
  methodology: string;
  /** FAQ shown on the page and emitted as FAQPage JSON-LD. */
  faq: FaqItem[];
  /** Links to mainstreetwealth.ai pages worth linking in text. */
  seeAlso?: { path: string; text: string }[];
  /** External authoritative citations shown in a "Sources" footer. */
  sources?: Source[];
  /** Date the content was last reviewed by the principal. */
  reviewedOn?: string;
  /** Date the content was first published. */
  publishedOn?: string;
};

const PUBLISHED = "2026-10-02";
const REVIEWED = "2026-10-02";

export const TOOL_SEO: Record<string, ToolSeo> = {
  "ebitda-calculator": {
    metaDescription:
      "Free EBITDA calculator for home-services businesses. Compute EBITDA, margin, and a defensible value range from your trailing twelve months.",
    methodology: `
      <p>EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. The calculator takes net income from the trailing twelve months and adds the four items above the line.</p>
      <p>We use trailing twelve months because that's what the overwhelming majority of lower middle-market buyers and lenders price on. Fiscal-year or budget-year numbers rarely survive diligence.</p>
      <p>The implied value range uses three EBITDA multiples (4×, 5.5×, 7×) that bracket the typical range in home services. For a sharper read, use the <a href="/valuation-multiples-lookup">multiples lookup</a>, or benchmark your EBITDA margin on <a href="https://mainstreetwealth.ai/tools/ebitda-benchmarker" target="_blank" rel="noreferrer">the EBITDA benchmarker</a>.</p>
      <p>If a single owner takes meaningful compensation out of the business, EBITDA understates the real earnings power. Use <a href="/sde-calculator">SDE</a> for owner-operated deals (see <a href="https://mainstreetwealth.ai/tools/sde-vs-ebitda" target="_blank" rel="noreferrer">SDE vs. EBITDA</a>), and <a href="/adjusted-ebitda-addbacks">adjusted EBITDA</a> for anything larger.</p>
    `,
    faq: [
      {
        question: "What's the difference between EBITDA and adjusted EBITDA?",
        answer:
          "EBITDA is net income plus interest, taxes, depreciation, and amortization. Adjusted EBITDA layers on normalizations (owner compensation, related-party rent, one-time items) that buyers accept once documented. Buyers price on adjusted EBITDA.",
      },
      {
        question: "Which multiple should I use for my business?",
        answer:
          "Multiples depend on trade, size, recurring revenue, and owner dependence. Use the multiples lookup for a trade-and-size indicative band, then narrow it with the Main Street Wealth business valuation calculator or request a free valuation from an advisor.",
      },
      {
        question: "Is EBITDA the same as cash flow?",
        answer:
          "No. EBITDA excludes working capital changes and capital expenditures. For a home-services business with trucks, inventory, and WIP, free cash flow can run 10–30% below EBITDA depending on capex and growth.",
      },
      {
        question: "How many years of financials do buyers want to see?",
        answer:
          "Three full years plus the trailing twelve months is standard. Reviewed or audited financials get stronger multiples than compiled or cash-basis books.",
      },
    ],
    seeAlso: [
      { path: "/tools/business-valuation-calculator", text: "the business valuation calculator" },
      { path: "/tools/ebitda-benchmarker", text: "EBITDA benchmarker" },
      { path: "/tools/sde-vs-ebitda", text: "SDE vs. EBITDA explainer" },
      { path: "/industries/hvac", text: "HVAC M&A overview" },
      { path: "/rollover-equity-when-selling-hvac-business", text: "rollover equity when selling an HVAC business" },
    ],
    sources: [
      {
        label: "IRS Publication 946 — depreciation guidance",
        href: "https://www.irs.gov/publications/p946",
        publisher: "Internal Revenue Service",
      },
      {
        label: "Axial — M&A activity in home services",
        href: "https://www.axial.net/",
        publisher: "Axial Networks",
      },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "sde-calculator": {
    metaDescription:
      "Compute seller's discretionary earnings (SDE) for an owner-operated home-services business, including defensible add-backs.",
    methodology: `
      <p>SDE is Seller's Discretionary Earnings — the number buyers use to price owner-operated businesses, usually under about $2M in EBITDA. It takes EBITDA and adds back the compensation and perks the current owner takes out, since a new owner would set those at a different level.</p>
      <p>We add back one owner's full compensation (W-2 wages plus payroll taxes and benefits), documented personal expenses in the P&amp;L, and one-time items. Second owners stay as replacement cost. For a cleaner replacement-cost comp number, run it through <a href="https://mainstreetwealth.ai/tools/salary-normalizer" target="_blank" rel="noreferrer">the salary normalizer</a>.</p>
      <p>The implied value range uses 2×, 2.75×, and 3.5× SDE — the typical band for owner-operated home-services businesses. For a side-by-side breakdown of SDE vs. EBITDA, see <a href="https://mainstreetwealth.ai/tools/sde-vs-ebitda" target="_blank" rel="noreferrer">SDE vs. EBITDA on mainstreetwealth.ai</a>. For non-owner-operated deals, flip to the <a href="/ebitda-calculator">EBITDA calculator</a>.</p>
    `,
    faq: [
      {
        question: "When should I use SDE instead of EBITDA?",
        answer:
          "Use SDE when a single owner is actively running the business and takes meaningful compensation. SDE is the dominant metric for small-deal transactions under about $2M of adjusted EBITDA.",
      },
      {
        question: "Can I add back two owners' salaries?",
        answer:
          "Only one owner's salary gets added back. The second owner becomes a replacement cost, since a buyer would need to hire for that role. Use the salary normalizer to size the replacement comp accurately.",
      },
      {
        question: "What personal expenses can I add back?",
        answer:
          "Expenses that run through the P&L but aren't actually for the business — vehicles not used for jobs, personal cell phones, club memberships. Every add-back needs a document trail; use the add-back builder for a defensible schedule.",
      },
      {
        question: "What SDE multiple should I expect?",
        answer:
          "Owner-operated home-services businesses typically trade on 2–3.5× SDE. Multiples climb with recurring revenue, documented systems, and lower owner dependence.",
      },
    ],
    seeAlso: [
      { path: "/tools/sde-vs-ebitda", text: "SDE vs. EBITDA" },
      { path: "/tools/business-valuation-calculator", text: "business valuation calculator" },
      { path: "/tools/salary-normalizer", text: "owner salary normalizer" },
      { path: "/industries/pool-services", text: "pool services M&A" },
      { path: "/industries/other", text: "electrical and other trades" },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "adjusted-ebitda-addbacks": {
    metaDescription:
      "Build a defensible adjusted-EBITDA add-back schedule with a documentation checklist for each adjustment.",
    methodology: `
      <p>Buyers accept adjustments to reported EBITDA when the adjustment is both economically real and well-documented. The add-back builder categorizes adjustments into owner, related-party, one-time, non-cash, and normalization buckets and attaches a documentation checklist to each.</p>
      <p>A documentation score shows what share of the required documents have been collected. Expect buyer-side quality-of-earnings (QoE) teams to challenge or remove any add-back scoring under 100%.</p>
      <p>Three main-site tools pair well here: the <a href="https://mainstreetwealth.ai/tools/salary-normalizer" target="_blank" rel="noreferrer">salary normalizer</a> for owner comp, the <a href="https://mainstreetwealth.ai/tools/equipment-depreciation" target="_blank" rel="noreferrer">equipment depreciation model</a> for D&amp;A add-backs, and the <a href="https://mainstreetwealth.ai/tools/seasonal-normalizer" target="_blank" rel="noreferrer">seasonal normalizer</a> for LTM normalization. For the full sell-side package, use the <a href="https://mainstreetwealth.ai/free-resources/sell-side-data-room-checklist" target="_blank" rel="noreferrer">sell-side data room checklist</a>.</p>
    `,
    faq: [
      {
        question: "What's a 'good' adjusted EBITDA margin?",
        answer:
          "For home services, adjusted EBITDA margins typically run 10–20% of revenue. Over 20% without clear structural reasons will attract diligence scrutiny; under 10% signals pricing or productivity issues.",
      },
      {
        question: "What add-backs do buyers routinely reject?",
        answer:
          "Unsupported owner personal expenses, 'growth investment' add-backs for marketing, and compensation changes that aren't backed by a payroll register. Also: anything that keeps recurring year after year.",
      },
      {
        question: "How do I document an add-back?",
        answer:
          "Attach the source document (payroll register, invoice, lease), a written explanation of why it won't recur, and a tie-out to a specific GL account and period.",
      },
      {
        question: "Should I include stock-based compensation as an add-back?",
        answer:
          "Only for larger businesses with real stock-based plans. Most lower middle-market home-services deals have none; where it exists, treat it as a non-cash add-back with clear plan documentation.",
      },
    ],
    seeAlso: [
      { path: "/tools/salary-normalizer", text: "owner salary normalizer" },
      { path: "/tools/equipment-depreciation", text: "equipment depreciation" },
      { path: "/tools/seasonal-normalizer", text: "seasonal normalizer" },
      { path: "/free-resources/sell-side-data-room-checklist", text: "sell-side data room checklist" },
      { path: "/confidential-sale-of-home-services-business", text: "running a confidential sale" },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "valuation-multiples-lookup": {
    metaDescription:
      "Typical EBITDA multiples by trade and size for home-services businesses, with sample sizes and sources.",
    methodology: `
      <p>Multiples ship in low, mid, and high bands across four size tiers (sub-$500K, $500K–$1M, $1M–$3M, and $3M+ of adjusted EBITDA). Numbers are curated from announced transactions in home services, with sample sizes shown per band.</p>
      <p>These are indicative, not guarantees. Add a premium for recurring revenue above 40% (quantify it with the <a href="https://mainstreetwealth.ai/tools/recurring-revenue" target="_blank" rel="noreferrer">recurring revenue analyzer</a>), documented systems, and tenure. Discount for customer concentration above 15% (check it with the <a href="https://mainstreetwealth.ai/tools/customer-concentration" target="_blank" rel="noreferrer">customer concentration analyzer</a>), owner centrality, and swings in the trailing twelve months.</p>
      <p>Cross-check your number with <a href="https://mainstreetwealth.ai/tools/comparable-sales" target="_blank" rel="noreferrer">comparable sales</a> and <a href="https://mainstreetwealth.ai/tools/competitor-acquisitions" target="_blank" rel="noreferrer">competitor acquisitions</a>. For trade-specific worked examples, see <a href="https://mainstreetwealth.ai/landscaping-business-ebitda-multiple-2026" target="_blank" rel="noreferrer">landscaping multiples (2026)</a> and <a href="https://mainstreetwealth.ai/garage-door-company-acquisition-multiple" target="_blank" rel="noreferrer">garage door acquisition multiples</a>.</p>
    `,
    faq: [
      {
        question: "Why are HVAC and pest control multiples different?",
        answer:
          "Pest control is more recurring, which buyers reward. HVAC is partially recurring via maintenance plans, partially project-based. Trade mix changes buyer appetite and multiple.",
      },
      {
        question: "Does my location matter?",
        answer:
          "Yes. Dense metros with scarce operators often price above the national band. Rural and declining markets tend to trade below. Our advisors factor geography into every valuation.",
      },
      {
        question: "Are these revenue or EBITDA multiples?",
        answer:
          "These are EBITDA multiples on adjusted EBITDA. For small, owner-operated businesses, SDE multiples (2–3.5×) are the right lens — see the SDE calculator and the SDE vs. EBITDA explainer on mainstreetwealth.ai.",
      },
      {
        question: "How often is the dataset refreshed?",
        answer:
          "The underlying open dataset refreshes quarterly as new transactions close and get verified against public filings and advisor confirmations.",
      },
    ],
    seeAlso: [
      { path: "/tools/business-valuation-calculator", text: "business valuation calculator" },
      { path: "/tools/ebitda-benchmarker", text: "EBITDA benchmarker" },
      { path: "/tools/comparable-sales", text: "comparable sales" },
      { path: "/tools/competitor-acquisitions", text: "competitor acquisitions" },
      { path: "/landscaping-business-ebitda-multiple-2026", text: "landscaping multiples (2026)" },
      { path: "/garage-door-company-acquisition-multiple", text: "garage door acquisition multiples" },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "rollover-equity-calculator": {
    metaDescription:
      "Model rollover equity: cash at close, retained equity, and the second-exit outcome. Compare to an all-cash deal.",
    methodology: `
      <p>Rollover equity is the share of the deal reinvested in the buyer's new company. The model takes an enterprise value and a rollover percentage, then projects a second exit on an EBITDA that compounds at the growth rate you set, times an exit multiple that reflects the platform premium.</p>
      <p>For simplicity, this version assumes the rollover owns its full pro-rata at exit — no mid-hold dilution from add-on debt, management incentive plans, or preferred structures. For a richer walk-through of structure trade-offs, use the <a href="https://mainstreetwealth.ai/tools/deal-structure" target="_blank" rel="noreferrer">deal structure analyzer</a>. Layer in tax with the <a href="https://mainstreetwealth.ai/tools/tax-estimator" target="_blank" rel="noreferrer">tax estimator</a>.</p>
      <p>In home services, the two-bites math typically breaks even against an all-cash deal around 4–5× MOIC on the rolled piece. See <a href="https://mainstreetwealth.ai/rollover-equity-when-selling-hvac-business" target="_blank" rel="noreferrer">rollover equity in HVAC</a> and <a href="https://mainstreetwealth.ai/how-to-sell-a-roofing-company-for-70-percent-cash-at-closing" target="_blank" rel="noreferrer">70% cash at closing in roofing</a> for worked examples.</p>
    `,
    faq: [
      {
        question: "How much rollover do buyers typically ask for?",
        answer:
          "In the lower middle market, 10–30% is standard. More than 40% is unusual outside of structured deals where the seller is staying in a significant leadership role.",
      },
      {
        question: "Is rollover equity taxable at close?",
        answer:
          "In most structures, properly executed rollover is tax-deferred — you only owe taxes on the cash portion at close. The rolled piece gets taxed on the second exit. Talk to a tax advisor to confirm the structure fits your situation.",
      },
      {
        question: "What return should I expect on the rolled piece?",
        answer:
          "PE sponsors target 3–5× MOIC on a platform over a 4–6 year hold. Operators who stay engaged and hit growth plans can land in that same band on the rolled piece, though results vary.",
      },
      {
        question: "Can I negotiate the rollover percentage?",
        answer:
          "Yes. Buyer and seller both have strong views here. Buyers push for more rollover to align incentives; sellers want more cash at close. The right number depends on your post-close role and conviction in the growth plan.",
      },
    ],
    seeAlso: [
      { path: "/tools/deal-structure", text: "deal structure analyzer" },
      { path: "/tools/tax-estimator", text: "tax estimator" },
      { path: "/tools/business-valuation-calculator", text: "business valuation calculator" },
      { path: "/rollover-equity-when-selling-hvac-business", text: "rollover equity when selling an HVAC business" },
      { path: "/how-to-sell-a-roofing-company-for-70-percent-cash-at-closing", text: "70% cash at closing in roofing" },
      { path: "/search-fund-acquisition-of-hvac-company", text: "search fund HVAC acquisitions" },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "net-proceeds-calculator": {
    metaDescription:
      "Model net cash to the seller: enterprise value through debt payoff, rollover, fees, and tax to the dollar that lands in your account.",
    methodology: `
      <p>Enterprise value and net-to-seller are very different numbers. The waterfall walks EV down through debt payoff, rollover, escrow, working capital true-ups, and transaction fees, then applies a simplified federal and state tax calculation on the gain.</p>
      <p>Depreciation recapture is treated at ordinary income rates; the balance of the gain gets long-term capital gain plus NIIT. Asset sales typically see more recapture than stock sales, which the structure toggle approximates. For a richer deal-structure walk-through, use the <a href="https://mainstreetwealth.ai/tools/deal-structure" target="_blank" rel="noreferrer">deal structure analyzer</a>. For a focused tax view, use the <a href="https://mainstreetwealth.ai/tools/tax-estimator" target="_blank" rel="noreferrer">tax estimator</a>.</p>
      <p>This model is for scenario planning. 338(h)(10) elections, F reorganizations, installment sales, and state nuance change the answer materially. For a specific deal, pair this with <a href="https://mainstreetwealth.ai/sba-financing-to-buy-a-plumbing-business" target="_blank" rel="noreferrer">SBA financing considerations</a> and a licensed tax advisor.</p>
    `,
    faq: [
      {
        question: "Why is my net so much less than enterprise value?",
        answer:
          "Three big leaks: debt payoff, broker/legal/advisor fees (typically 3–10% of EV), and federal plus state tax on the gain. For a cash-free, debt-free deal with a 25% effective tax rate, net lands in the 60–70% range of EV.",
      },
      {
        question: "Should I prefer an asset sale or a stock sale?",
        answer:
          "Buyers usually prefer asset sales (step-up in basis, better tax); sellers often prefer stock sales (lower recapture, less consent risk). The deal structure usually reflects a negotiated split of that gap.",
      },
      {
        question: "How is my tax basis computed?",
        answer:
          "Original cost plus capital improvements, less accumulated depreciation. For most owner-operated home-services businesses, basis is low — most of the proceeds end up as capital gain.",
      },
      {
        question: "What's a typical broker fee?",
        answer:
          "Scaled by deal size. Small deals (under $5M EV) usually see 8–10%; mid-market deals ($10–50M) see 3–6%. Full-service M&A advisory for home services typically runs 3–5% at the sizes we cover.",
      },
    ],
    seeAlso: [
      { path: "/tools/tax-estimator", text: "tax estimator" },
      { path: "/tools/deal-structure", text: "deal structure analyzer" },
      { path: "/tools/business-valuation-calculator", text: "business valuation calculator" },
      { path: "/sba-financing-to-buy-a-plumbing-business", text: "SBA financing for buyers" },
      { path: "/how-to-sell-a-roofing-company-for-70-percent-cash-at-closing", text: "70% cash at closing in roofing" },
      { path: "/take-my-home-services-business-public-via-rto", text: "public markets exits via RTO" },
    ],
    sources: [
      {
        label: "IRS Topic No. 409 — capital gains and losses",
        href: "https://www.irs.gov/taxtopics/tc409",
        publisher: "Internal Revenue Service",
      },
      {
        label: "SBA 7(a) loan program",
        href: "https://www.sba.gov/funding-programs/loans/7a-loans",
        publisher: "U.S. Small Business Administration",
      },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "exit-readiness-score": {
    metaDescription:
      "Score your business across six dimensions to see how sale-ready you are. Weighted, with a per-dimension breakdown.",
    methodology: `
      <p>The score weights six dimensions: financial clarity (25%), people and systems (20%), customer mix (15%), growth story (15%), legal/licensing/risk (15%), and owner dependence (10%). Each item is scored 0–4, and the per-dimension percentages feed a weighted overall score on a 100-point scale.</p>
      <p>Weights were set based on what buyer-side teams actually walk through first in diligence for home-services deals. Financial clarity drives trust early; owner dependence drives the biggest discount late. For a deeper look at owner dependence, use the <a href="/owner-dependence-scorecard">owner dependence scorecard</a>, and cross-check with the main-site <a href="https://mainstreetwealth.ai/tools/buyer-readiness-score" target="_blank" rel="noreferrer">buyer readiness score</a>.</p>
      <p>For the pre-sale window, pair this with the <a href="https://mainstreetwealth.ai/tools/exit-timeline" target="_blank" rel="noreferrer">exit timeline planner</a>, the <a href="https://mainstreetwealth.ai/tools/reputation-score" target="_blank" rel="noreferrer">reputation score</a>, and the <a href="https://mainstreetwealth.ai/client-roadmap" target="_blank" rel="noreferrer">client roadmap</a>.</p>
    `,
    faq: [
      {
        question: "What score should I target before going to market?",
        answer:
          "75+ usually means a cleaner process and a tighter range. 60–74 is workable; expect some back-and-forth and a wider range. Below 60, we usually recommend a 6–12 month pre-sale program first.",
      },
      {
        question: "Which dimension drives the biggest discount?",
        answer:
          "Owner dependence, by a wide margin. A buyer paying a trade multiple needs confidence the business keeps running without the owner. Financial clarity is a close second — if the books aren't trusted, no multiple is defensible.",
      },
      {
        question: "How long does it take to move the score meaningfully?",
        answer:
          "12 months is the standard pre-sale window. Financial clarity items (clean monthly close, documented add-backs) move fastest; people and systems take longest.",
      },
      {
        question: "Does this replace a formal readiness assessment?",
        answer:
          "No. This is a self-check. A formal assessment with a Main Street Wealth advisor includes trade-specific weighting, interviews, and a written plan. Request one via the free valuation.",
      },
    ],
    seeAlso: [
      { path: "/tools/buyer-readiness-score", text: "buyer readiness score" },
      { path: "/tools/exit-timeline", text: "exit timeline planner" },
      { path: "/tools/reputation-score", text: "reputation score" },
      { path: "/client-roadmap", text: "the 12-month client roadmap" },
      { path: "/exit-strategy-for-roofing-company-owner-retiring", text: "exit strategy for a retiring roofing owner" },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },

  "owner-dependence-scorecard": {
    metaDescription:
      "Score how dependent your home-services business is on you across sales, operations, finance, institutional knowledge, and brand.",
    methodology: `
      <p>The scorecard weights five dimensions: sales and customer relationships (25%), operations (25%), finance and admin (20%), institutional knowledge (15%), and brand (15%). Each item scores 0–4; percentages feed a weighted independence score on a 100-point scale.</p>
      <p>Weights reflect what buyer-side diligence actually probes. Sales and operations are first checks (will the business keep selling and running after you leave?); institutional knowledge and brand drive long-tail risk the buyer prices in with holdback or an earn-out. Combine with the main-site <a href="https://mainstreetwealth.ai/tools/employee-dependency" target="_blank" rel="noreferrer">employee dependency check</a> and <a href="https://mainstreetwealth.ai/tools/buyer-readiness-score" target="_blank" rel="noreferrer">buyer readiness score</a>.</p>
      <p>The gap between your score and 100 is a direct discount buyers will try to apply. The <a href="https://mainstreetwealth.ai/client-roadmap" target="_blank" rel="noreferrer">client roadmap</a> turns the gap into named workstreams.</p>
    `,
    faq: [
      {
        question: "What score drives the smallest discount?",
        answer:
          "75+ usually produces a transition arrangement that reads as cooperation, not dependence. Below 50, buyers typically ask for extended earnouts, large holdbacks, or multi-year consulting agreements.",
      },
      {
        question: "Can I move the score in 12 months?",
        answer:
          "Yes, with discipline. The fastest moves: name a #2 with authority, systemize dispatch into field software, document the top 10 customer relationships with a named account owner that isn't you.",
      },
      {
        question: "Do I need to be fully out of the business?",
        answer:
          "No. Buyers want to know the business runs without you, and that you'll stay for a transition. The point isn't absence; it's that the business doesn't need you.",
      },
      {
        question: "Does owner dependence affect multiple more than EBITDA size?",
        answer:
          "At the margin, yes. A $1M EBITDA business with low owner dependence often prices above a $1.5M EBITDA business that's clearly going with the owner.",
      },
    ],
    seeAlso: [
      { path: "/tools/employee-dependency", text: "employee dependency check" },
      { path: "/tools/buyer-readiness-score", text: "buyer readiness score" },
      { path: "/tools/salary-normalizer", text: "owner salary normalizer" },
      { path: "/client-roadmap", text: "the 12-month client roadmap" },
      { path: "/ma-advisor-vs-business-broker-for-home-services", text: "advisor vs. broker for home services" },
    ],
    publishedOn: PUBLISHED,
    reviewedOn: REVIEWED,
  },
};

export function toolSeo(slug: string): ToolSeo | undefined {
  return TOOL_SEO[slug];
}
