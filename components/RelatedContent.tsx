import Link from "next/link";
import * as React from "react";
import { mainstreetUrl, type MainstreetLink } from "@/lib/mainstreet";

type RelatedContentProps = {
  title?: string;
  description?: string;
  items: MainstreetLink[];
  columns?: 2 | 3;
};

const INTENT_LABEL: Record<MainstreetLink["intent"], string> = {
  tool: "Tool",
  industry: "Industry",
  "broker-service": "Broker service",
  valuation: "Valuation",
  "sell-side": "Sell-side",
  "buy-side": "Buy-side",
  resource: "Resource",
  roadmap: "Roadmap",
  "case-topic": "Guide",
  team: "About",
  contact: "Contact",
};

export function RelatedContent({
  items,
  title = "More on mainstreetwealth.ai",
  description = "The deeper, trade-specific context on our main site.",
  columns = 3,
}: RelatedContentProps) {
  if (!items.length) return null;
  const cols =
    columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mt-14" aria-labelledby="related-title">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="section-title-eyebrow">Related</div>
          <h2 id="related-title" className="mt-2 text-2xl font-bold text-ink">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm text-ink/65">{description}</p>
          ) : null}
        </div>
        <Link
          href="https://mainstreetwealth.ai/tools"
          target="_blank"
          rel="noreferrer"
          className="link-arrow text-sm"
        >
          See all main-site tools →
        </Link>
      </div>
      <div className={`grid gap-4 ${cols}`}>
        {items.map((item) => (
          <Link
            key={item.path}
            href={mainstreetUrl(item.path)}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-line bg-white p-5 no-underline shadow-card transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-pop"
          >
            <div className="flex items-center gap-2">
              <span className="pill-violet text-[10px] font-semibold uppercase tracking-wider">
                {INTENT_LABEL[item.intent]}
              </span>
              <ExternalIcon className="ml-auto h-3.5 w-3.5 text-ink/40" />
            </div>
            <h3 className="text-sm font-semibold text-ink group-hover:text-violet-700">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-ink/65">{item.summary}</p>
            <span className="mt-auto text-[11px] font-mono text-ink/40">
              mainstreetwealth.ai{item.path}
            </span>
          </Link>
        ))}
      </div>
    </section>
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
