import Link from "next/link";
import * as React from "react";
import { counterpartTools, mainstreetUrl } from "@/lib/mainstreet";

/**
 * Prominent callout at the top of a hub tool page pointing to the matching
 * tool(s) on mainstreetwealth.ai. Keeps the two surfaces tightly linked.
 */
export function MainstreetCounterpart({ hubSlug }: { hubSlug: string }) {
  const items = counterpartTools(hubSlug);
  if (!items.length) return null;

  const primary = items[0];
  const extras = items.slice(1);

  return (
    <aside
      className="mb-8 flex flex-wrap items-start gap-4 rounded-2xl border border-violet-200 bg-violet-50/60 p-4 sm:p-5"
      aria-label="Related tool on mainstreetwealth.ai"
    >
      <div className="flex-none">
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-sm font-bold text-white"
          aria-hidden="true"
        >
          MS
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-800">
            On mainstreetwealth.ai
          </span>
        </div>
        <h2 className="mt-1 text-base font-semibold text-ink sm:text-lg">
          Prefer the hosted version? Try{" "}
          <Link
            href={mainstreetUrl(primary.path)}
            target="_blank"
            rel="noreferrer"
            className="text-violet-800 underline decoration-violet-300 underline-offset-4 hover:text-violet-900"
          >
            {primary.title}
          </Link>
          .
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">
          {primary.summary}
        </p>
        {extras.length ? (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/70">
            <span className="font-semibold text-ink/60">Also useful:</span>
            {extras.map((item, i) => (
              <React.Fragment key={item.path}>
                <Link
                  href={mainstreetUrl(item.path)}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-violet-700 no-underline hover:text-violet-900"
                >
                  {item.title}
                </Link>
                {i < extras.length - 1 ? (
                  <span className="text-ink/30">·</span>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
