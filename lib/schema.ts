// JSON-LD builders used across the site.
// Follow schema.org vocabulary and Google's structured data guidelines.

import type { Author } from "./authors";

export const SITE_URL = "https://opensource.mainstreetwealth.ai";
export const MAIN_SITE_URL = "https://mainstreetwealth.ai";
export const GITHUB_OWNER = "samarkandiy";
export const GITHUB_REPO = "OpenSource.mainstreetwealth";
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;
export const GITHUB_ISSUES_URL = `${GITHUB_REPO_URL}/issues`;
export const GITHUB_DISCUSSIONS_URL = `${GITHUB_REPO_URL}/discussions`;
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_OWNER}`;
export const ORG_ID = `${MAIN_SITE_URL}#organization`;
export const WEBSITE_ID = `${SITE_URL}#website`;

/**
 * The publishing organization. Used site-wide via @graph.
 */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Main Street Wealth",
    legalName: "Main Street Wealth",
    url: MAIN_SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
      width: 1024,
      height: 180,
    },
    sameAs: [
      "https://www.linkedin.com/company/mainstreetwealth",
      GITHUB_REPO_URL,
      "https://di.mainstreetwealth.ai",
    ],
    description:
      "M&A advisory and business brokerage focused on home services and the trades: HVAC, plumbing, roofing, landscaping, pool, pest, and electrical.",
    knowsAbout: [
      "Mergers and acquisitions",
      "Business valuation",
      "Quality of earnings",
      "Rollover equity",
      "Home services",
      "HVAC",
      "Plumbing",
      "Roofing",
      "Pest control",
      "Landscaping",
      "Pool services",
      "Electrical contracting",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${MAIN_SITE_URL}/contact`,
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    award: ["Axial Top 25 Firm — 1H 2026", "Axial Top 25 Firm — 2025"],
  };
}

/**
 * The open source hub as a WebSite.
 */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Main Street Wealth · Open Source",
    description:
      "100 open source M&A tools, open datasets, and AI tooling for lower middle-market deals in home services.",
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/directory?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Person schema from an Author.
 */
export function personSchema(author: Author) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}${author.url}`,
    name: author.name,
    jobTitle: author.role,
    description: author.shortBio,
    url: `${SITE_URL}${author.url}`,
    knowsAbout: author.focus,
    sameAs: author.socials.map((s) => s.href),
    worksFor: { "@id": ORG_ID },
  };
}

export type BreadcrumbItem = { name: string; url?: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}` } : {}),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function softwareApplicationSchema(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
  author: Author;
  reviewer?: Author;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: opts.category ?? "FinanceApplication",
    operatingSystem: "Any (web)",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@id": ORG_ID },
    creator: { "@id": `${SITE_URL}${opts.author.url}` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.reviewer
      ? {
          review: {
            "@type": "Review",
            author: { "@id": `${SITE_URL}${opts.reviewer.url}` },
            reviewBody:
              "Reviewed for accuracy and alignment with current home-services M&A practice.",
          },
        }
      : {}),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  author: Author;
  reviewer?: Author;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    author: { "@id": `${SITE_URL}${opts.author.url}` },
    ...(opts.reviewer ? { reviewedBy: { "@id": `${SITE_URL}${opts.reviewer.url}` } } : {}),
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

/**
 * Compose multiple schemas into one JSON-LD @graph document.
 * Returns the stringified JSON ready for a <script> tag.
 */
export function composeGraph(nodes: object[]): string {
  const graph = {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
  // Minified. We don't want whitespace making every byte count on static pages.
  return JSON.stringify(graph);
}
