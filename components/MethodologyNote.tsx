import * as React from "react";
import type { Source } from "@/lib/toolSeo";

type MethodologyNoteProps = {
  /** HTML string (controlled authoring). Rendered inside .prose-tool styling. */
  html: string;
  sources?: Source[];
};

/**
 * Methodology + sources section for every tool.
 * EEAT-focused: readers (and crawlers) can see how we arrived at the numbers.
 */
export function MethodologyNote({ html, sources }: MethodologyNoteProps) {
  return (
    <section className="mt-14" aria-labelledby="methodology-title">
      <div className="section-title-eyebrow">Methodology</div>
      <h2 id="methodology-title" className="mt-2 text-2xl font-bold text-ink">
        How this tool works
      </h2>
      <div
        className="prose-tool mt-4"
        // Authored HTML, not user-supplied; see lib/toolSeo.ts.
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {sources && sources.length ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface-soft p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Sources
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {sources.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow"
                >
                  {s.label}
                </a>
                <span className="text-ink/55"> · {s.publisher}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
