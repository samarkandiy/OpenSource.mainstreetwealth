// Author profiles for E-E-A-T.
// Every tool page in the hub carries at least an author and a reviewer.
// Keep this file as the single source of truth so bylines, JSON-LD Person
// schemas, and the /about page stay in sync.

export type Author = {
  id: string;
  name: string;
  role: string;
  shortBio: string;
  longBio: string;
  credentials: string[];
  focus: string[];
  initials: string;
  avatarGradient: string;
  url: string;
  socials: { label: string; href: string }[];
  /** Expert topics they can author or review. */
  expertise: string[];
};

export const AUTHORS: Record<string, Author> = {
  avaz: {
    id: "avaz-bokiev",
    name: "Avaz Bokiev",
    role: "Partner & CTO, Main Street Wealth",
    shortBio:
      "Partner and CTO at Main Street Wealth. Leads the firm's technology, product, and open source work.",
    longBio:
      "Avaz Bokiev is Partner and Chief Technology Officer at Main Street Wealth. He leads the firm's technology initiatives — building the tools, calculators, and data platforms that streamline the M&A process for home-services operators. Avaz designed and maintains the open source hub at opensource.mainstreetwealth.ai, including the valuation calculators and the quality-of-earnings tooling. His focus is practical, operator-facing software that gives sellers the same analytical rigor the biggest buyers already have.",
    credentials: [
      "Partner & CTO, Main Street Wealth",
      "Lead engineer on the Main Street Wealth open source hub",
      "Author of the hub's EBITDA, SDE, add-back, and net-proceeds calculators",
    ],
    focus: [
      "Financial calculators and valuation modeling",
      "Open data for M&A benchmarks",
      "AI tooling and MCP for M&A agents",
    ],
    initials: "AB",
    avatarGradient:
      "linear-gradient(135deg, #7d2cfb 0%, #8947fc 50%, #02d5bb 100%)",
    url: "/about#avaz-bokiev",
    socials: [
      { label: "GitHub", href: "https://github.com/samarkandiy/OpenSource.mainstreetwealth" },
    ],
    expertise: [
      "ebitda",
      "sde",
      "addbacks",
      "multiples",
      "proceeds",
      "rollover",
      "exit",
      "owner-dependence",
      "data",
      "ai",
      "all",
    ],
  },
  rob: {
    id: "rob-ismoilov",
    name: "Sukhrobjon (Rob) Ismoilov",
    role: "Founder & Principal, Main Street Wealth",
    shortBio:
      "Founder and Principal of Main Street Wealth. J.D., Columbia LL.M. in Corporate Finance, M&A and Restructuring.",
    longBio:
      "Rob Ismoilov is the Founder and Principal of Main Street Wealth, a specialized M&A advisory and business brokerage focused on the home-services sector — HVAC, plumbing, roofing, landscaping, pool, pest, and the trades. Rob holds a Juris Doctor from the University of World Economy and Diplomacy and a Columbia Law School LL.M. in corporate finance, M&A and restructuring. He has represented both buyers and sellers on the full cycle: valuation and preparation, negotiation, due diligence, closing, and post-acquisition integration.",
    credentials: [
      "Founder & Principal, Main Street Wealth",
      "J.D., University of World Economy and Diplomacy",
      "LL.M., Columbia Law School (Corporate Finance, M&A, Restructuring)",
      "Recognized by Axial — Top 25 Firm, 1H 2026 and 2025",
      "100+ deals closed in home services",
    ],
    focus: [
      "Sell-side M&A for home-services operators",
      "Deal structure, rollover equity, and proceeds planning",
      "Buyer selection and competitive processes",
    ],
    initials: "RI",
    avatarGradient:
      "linear-gradient(135deg, #140036 0%, #3b2585 60%, #7d2cfb 100%)",
    url: "/about#rob-ismoilov",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/mainstreetwealth" },
    ],
    expertise: [
      "valuation",
      "deal-structure",
      "legal",
      "exit",
      "diligence",
      "sourcing",
      "rollover",
      "proceeds",
      "all",
    ],
  },
};

/** The default author for the open source hub is Avaz (CTO). */
export const DEFAULT_AUTHOR: Author = AUTHORS.avaz;

/** The default expert reviewer for financial / legal content is Rob (Principal). */
export const DEFAULT_REVIEWER: Author = AUTHORS.rob;

export function authorsForTool(
  topics: string[]
): { author: Author; reviewer: Author } {
  const t = topics.map((x) => x.toLowerCase());
  const avazRelevant = t.some((topic) => AUTHORS.avaz.expertise.includes(topic));
  const robRelevant = t.some((topic) => AUTHORS.rob.expertise.includes(topic));
  if (robRelevant && !avazRelevant) {
    return { author: AUTHORS.rob, reviewer: AUTHORS.avaz };
  }
  return { author: AUTHORS.avaz, reviewer: AUTHORS.rob };
}
