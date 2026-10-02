import Link from "next/link";
import * as React from "react";
import { MAIN_SITE } from "@/lib/mainstreet";

/**
 * Compact trust-signal panel shown in the ToolShell sidebar.
 * EEAT: tells visitors (and search engines) who's behind the content.
 */
export function TrustSignals() {
  return (
    <div className="surface-card p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
        Who maintains this
      </h4>
      <p className="mt-2 text-sm text-ink/70">
        Built and maintained by{" "}
        <Link href={MAIN_SITE} target="_blank" rel="noreferrer" className="link-arrow">
          Main Street Wealth
        </Link>
        , a specialized M&amp;A advisory for home services and the trades.
      </p>
      <ul className="mt-4 space-y-2 text-sm text-ink/75">
        {[
          "Axial Top 25 Firm — 1H 2026 and 2025",
          "100+ deals closed in the trades",
          "7+ years in home-services M&A",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-mint-600" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-2 border-t border-line pt-4">
        <Link
          href={`${MAIN_SITE}/valuation`}
          target="_blank"
          rel="noreferrer"
          className="btn-brand justify-center"
        >
          Request a free valuation
        </Link>
        <Link
          href="/about"
          className="btn-ghost justify-center text-xs"
        >
          Meet the team
        </Link>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}
