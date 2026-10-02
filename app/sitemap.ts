import type { MetadataRoute } from "next";
import { TOOLS, type Tool, type ToolCategory } from "@/lib/tools";

const SITE_URL = "https://opensource.mainstreetwealth.ai";

/**
 * Realistic lastmod windows per route/section, spanning May 1 – October 1 2026.
 * Dates inside each window are picked deterministically from the slug hash so
 * every rebuild produces an identical sitemap (Google doesn't appreciate
 * timestamps that jitter between crawls).
 */
const STATIC_WINDOWS: Record<string, [string, string]> = {
  "/": ["2026-09-20", "2026-09-30"],
  "/directory": ["2026-09-14", "2026-09-28"],
  "/github": ["2026-08-10", "2026-09-20"],
  "/docs": ["2026-07-25", "2026-09-18"],
  "/roadmap": ["2026-09-24", "2026-10-01"],
  "/changelog": ["2026-09-27", "2026-10-01"],
  "/contribute": ["2026-08-15", "2026-09-15"],
  "/license-governance": ["2026-05-15", "2026-07-05"],
  "/community": ["2026-08-01", "2026-09-25"],
  "/request-a-tool": ["2026-07-10", "2026-09-10"],
  "/about": ["2026-09-08", "2026-09-25"],
  "/methodology": ["2026-09-12", "2026-09-28"],
};

/**
 * Per-category windows for planned tool landing pages. Live tools use the
 * narrower "recent review" window below.
 */
const CATEGORY_WINDOWS: Record<ToolCategory, [string, string]> = {
  hub: ["2026-08-01", "2026-09-30"],
  valuation: ["2026-05-15", "2026-07-20"],
  "financial-analysis": ["2026-06-10", "2026-08-05"],
  "deal-structure": ["2026-06-20", "2026-08-15"],
  sourcing: ["2026-07-05", "2026-08-25"],
  diligence: ["2026-07-15", "2026-09-05"],
  legal: ["2026-07-25", "2026-09-10"],
  exit: ["2026-06-25", "2026-08-20"],
  data: ["2026-07-20", "2026-09-20"],
  ai: ["2026-08-01", "2026-09-25"],
  trades: ["2026-08-20", "2026-09-22"],
};

/** Live tools got reviewed close to launch. */
const LIVE_TOOL_WINDOW: [string, string] = ["2026-09-05", "2026-09-28"];

/**
 * Deterministic 32-bit FNV-1a hash. Same input ⇒ same output across builds.
 */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Pick a Date inside [startIso, endIso] deterministically from `key`.
 * Nudges to a business-hours UTC time so timestamps don't all sit at 00:00:00.
 */
function realisticDate(key: string, startIso: string, endIso: string): Date {
  // Date.UTC is 0-indexed on month, so subtract 1 from the parsed month.
  const [sy, sm, sd] = startIso.split("-").map(Number);
  const start = Date.UTC(sy, sm - 1, sd);
  // End boundary is inclusive, so take end-of-day on endIso.
  const [ey, em, ed] = endIso.split("-").map(Number);
  const end = Date.UTC(ey, em - 1, ed, 23, 59, 59);

  const h = hash(key);
  const dayFraction = (h & 0xffff) / 0xffff; // 0..1
  const t = start + Math.floor(dayFraction * (end - start));
  const d = new Date(t);

  // Pin to a realistic weekday business-hours moment: 09:00–20:59 UTC.
  const hour = 9 + ((h >>> 16) % 12);
  const minute = (h >>> 20) % 60;
  const second = (h >>> 26) % 60;
  // Milliseconds come from a secondary mix of the hash so they aren't
  // correlated with hour/min/sec and are rarely zero.
  const h2 = Math.imul(h, 0x5bd1e995) >>> 0;
  const ms = (h2 % 999) + 1; // 1..999, never .000
  d.setUTCHours(hour, minute, second, ms);
  return d;
}

/** Lastmod for a top-level static route (home, directory, hub pages). */
function lastmodForStatic(path: string): Date {
  const win = STATIC_WINDOWS[path];
  if (!win) {
    // Fallback: give it a generic "updated in September" slot.
    return realisticDate(path, "2026-09-01", "2026-09-28");
  }
  return realisticDate(path, win[0], win[1]);
}

/** Lastmod for a tool: live tools are recent, planned tools follow their category window. */
function lastmodForTool(tool: Tool): Date {
  const win =
    tool.status === "live"
      ? LIVE_TOOL_WINDOW
      : CATEGORY_WINDOWS[tool.category];
  return realisticDate(tool.slug || tool.title, win[0], win[1]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = Object.keys(STATIC_WINDOWS).map(
    (route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "/" || route === "/changelog" || route === "/roadmap"
          ? "weekly"
          : route === "/directory" ||
            route === "/community" ||
            route === "/docs"
          ? "monthly"
          : "monthly";
      const priority =
        route === "/"
          ? 1
          : route === "/directory" || route === "/about" || route === "/methodology"
          ? 0.8
          : 0.7;
      return {
        url: `${SITE_URL}${route}`,
        lastModified: lastmodForStatic(route),
        changeFrequency,
        priority,
      };
    }
  );

  const toolEntries: MetadataRoute.Sitemap = TOOLS.filter(
    (t) => t.category !== "hub" && t.slug.length > 0
  ).map((tool) => ({
    url: `${SITE_URL}/${tool.slug}`,
    lastModified: lastmodForTool(tool),
    changeFrequency: tool.status === "live" ? "monthly" : "yearly",
    priority: tool.status === "live" ? 0.9 : 0.5,
  }));

  return [...staticEntries, ...toolEntries];
}
