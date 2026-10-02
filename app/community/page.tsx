import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community",
  description:
    "DealIntel, GitHub Discussions, and office hours for the Main Street Wealth open source community.",
  alternates: { canonical: "/community" },
};

const CHANNELS: {
  name: string;
  desc: string;
  cta: string;
  href: string;
  badge?: string;
}[] = [
  {
    name: "DealIntel",
    desc:
      "Community-ranked M&A news terminal for the lower middle market. Deal facts from public announcements and reader submissions, with RSS and a JSON API.",
    cta: "Open DealIntel",
    href: "https://di.mainstreetwealth.ai/",
    badge: "Sibling site",
  },
  {
    name: "GitHub Discussions",
    desc: "Longer-form threads on roadmap, data methodology, and feature design.",
    cta: "Open on GitHub",
    href: "https://github.com/samarkandiy/OpenSource.mainstreetwealth/discussions",
  },
  {
    name: "Office hours",
    desc: "Live, every Friday at 11am PT. Bring a deal or a bug.",
    cta: "Add to calendar",
    href: "https://mainstreetwealth.ai/office-hours",
  },
  {
    name: "Direct line",
    desc:
      "Have a confidential question about a specific deal? Reach the advisory team directly.",
    cta: "Contact Main Street Wealth",
    href: "https://mainstreetwealth.ai/contact",
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Community"
        description="Operators, buyers, sellers, advisors, and builders. We're better together."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Community" }]}
      />
      <div className="container-page">
        <div className="grid gap-5 sm:grid-cols-2">
          {CHANNELS.map((ch) => (
            <div
              key={ch.name}
              className="surface-card flex flex-col justify-between gap-4 p-6"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink">{ch.name}</h3>
                  {ch.badge ? (
                    <span className="pill-violet text-[10px]">{ch.badge}</span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-ink/65">{ch.desc}</p>
              </div>
              <Link
                href={ch.href}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary w-fit"
              >
                {ch.cta}
              </Link>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">What people use the community for</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              {
                k: "Sellers",
                v: "Ask what a defensible value looks like. Get feedback on an add-back before a buyer sees it.",
              },
              {
                k: "Buyers & sponsors",
                v: "Share buy-boxes, swap targets, pressure-test an LBO model, and track announced deals on DealIntel.",
              },
              {
                k: "Advisors & builders",
                v: "Debate methodology, suggest datasets, and ship PRs.",
              },
            ].map((row) => (
              <div key={row.k} className="surface-card p-6">
                <h3 className="text-sm font-semibold text-ink">{row.k}</h3>
                <p className="mt-1 text-sm text-ink/65">{row.v}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
