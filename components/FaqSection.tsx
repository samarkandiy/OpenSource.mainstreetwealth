import * as React from "react";
import { JsonLd } from "./JsonLd";
import { composeGraph, faqSchema, type FaqItem } from "@/lib/schema";

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
  description?: string;
  /** Suppress JSON-LD emission when the surrounding page is already emitting it. */
  omitSchema?: boolean;
};

/**
 * Accessible FAQ list using <details>/<summary> for native expand/collapse.
 * Emits FAQPage structured data unless the host page already does so.
 */
export function FaqSection({
  items,
  title = "Frequently asked questions",
  description,
  omitSchema,
}: FaqSectionProps) {
  if (!items.length) return null;
  return (
    <section className="mt-16" aria-labelledby="faq-title">
      <div className="mb-6 max-w-2xl">
        <div className="section-title-eyebrow">FAQ</div>
        <h2 id="faq-title" className="mt-2 text-2xl font-bold text-ink">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm text-ink/70">{description}</p>
        ) : null}
      </div>
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        {items.map((item, i) => (
          <details
            key={i}
            className="group px-5 py-4 open:bg-surface-soft/60 sm:px-6"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink marker:hidden">
              <span>{item.question}</span>
              <ChevronIcon className="h-4 w-4 flex-none text-ink/40 transition group-open:rotate-180" />
            </summary>
            <div className="mt-3 text-sm leading-relaxed text-ink/75">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
      {!omitSchema ? <JsonLd data={composeGraph([faqSchema(items)])} /> : null}
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 7l5 5 5-5" />
    </svg>
  );
}
