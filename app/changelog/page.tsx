import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Release notes for the Main Street Wealth open source hub.",
  alternates: { canonical: "/changelog" },
};

const RELEASES = [
  {
    version: "0.1.0",
    date: "October 2, 2026",
    tag: "Launch",
    highlights: [
      "Hub landing page and filterable directory of 100 tools.",
      "Launched the first eight interactive tools: EBITDA, SDE, add-back builder, multiples lookup, rollover equity, net proceeds, exit readiness, owner dependence.",
      "Published the first version of the brand system and open source identity.",
      "Opened the roadmap for public voting.",
    ],
  },
  {
    version: "0.0.4",
    date: "September 20, 2026",
    tag: "Private beta",
    highlights: [
      "Internal testing of the add-back builder with ten M&A advisors.",
      "First multiples dataset pulled by hand across HVAC, plumbing, and roofing.",
    ],
  },
  {
    version: "0.0.1",
    date: "September 1, 2026",
    tag: "Started",
    highlights: ["Repo created. Scope agreed with the Main Street Wealth team."],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Release notes"
        title="Changelog"
        description="Dated notes on what shipped, what changed, and what's next."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Changelog" }]}
      />
      <div className="container-page">
        <ol className="relative space-y-10 border-l border-line/70 pl-8">
          {RELEASES.map((release) => (
            <li key={release.version} className="relative">
              <span className="absolute -left-[41px] top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">
                ✦
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-mono text-lg font-bold text-ink">v{release.version}</h3>
                <span className="pill">{release.date}</span>
                <span className="pill-violet">{release.tag}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/75">
                {release.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 flex-none rounded-full bg-ink/40" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-xs text-ink/55">
          Subscribe to the <a className="link-arrow" href="https://mainstreetwealth.ai/newsletter">Main Street Wealth newsletter</a> for a monthly digest.
        </p>
      </div>
    </>
  );
}
