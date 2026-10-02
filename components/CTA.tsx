import Link from "next/link";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

/**
 * Call to action to push visitors back to a free valuation on the main site,
 * per the "every tool page should end with a CTA" guidance in the brief.
 */
export function CTA({
  eyebrow = "Get a real number",
  title = "Need a defensible valuation for your business?",
  description = "Share a few financials and we'll walk you through what a buyer would actually pay today, with context on how we got there.",
}: CTAProps) {
  return (
    <section className="relative mt-20 overflow-hidden rounded-3xl border border-line bg-brand-gradient-soft p-8 sm:p-12">
      <div className="absolute inset-0 -z-10 bg-mesh-light opacity-70" />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <div className="section-title-eyebrow">{eyebrow}</div>
          <h3 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">{title}</h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/70">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="https://mainstreetwealth.ai/valuation"
              target="_blank"
              rel="noreferrer"
              className="btn-brand"
            >
              Request a free valuation
            </Link>
            <Link href="/directory" className="btn-secondary">
              Browse all tools
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink/50">
            Not legal, tax, or financial advice. For a specific recommendation, talk to a licensed advisor.
          </p>
        </div>
        <div className="hidden lg:block">
          <ul className="space-y-3">
            {[
              "Honest range, grounded in trade benchmarks",
              "Walk-through of each add-back and multiple",
              "Clear next steps if you decide to go to market",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 rounded-xl border border-line bg-white/80 p-4 text-sm text-ink/80">
                <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-mint-600" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 12l5 5 11-11" />
    </svg>
  );
}
