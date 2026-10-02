"use client";

import * as React from "react";
import { PERCENT } from "@/lib/format";

export type Dimension = {
  id: string;
  label: string;
  weight: number; // relative weight
  questions: Question[];
  description?: string;
};

export type Question = {
  id: string;
  label: string;
  hint?: string;
  /** Each answer is a 0–4 score. */
  options?: string[];
};

export const DEFAULT_OPTIONS = [
  "Not at all",
  "A little",
  "Somewhat",
  "Mostly",
  "Fully",
];

type ScorecardProps = {
  dimensions: Dimension[];
  summaryLabel?: string;
  verdicts: { min: number; max: number; label: string; color: "mint" | "amber" | "violet" | "red"; blurb: string }[];
};

export function Scorecard({ dimensions, summaryLabel = "Overall score", verdicts }: ScorecardProps) {
  const [answers, setAnswers] = React.useState<Record<string, number>>({});

  function set(qid: string, value: number) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  const dimResults = dimensions.map((dim) => {
    const answered = dim.questions.filter((q) => answers[q.id] !== undefined);
    const total = dim.questions.length * 4;
    const sum = dim.questions.reduce((s, q) => s + (answers[q.id] ?? 0), 0);
    const pct = total > 0 ? sum / total : 0;
    return { ...dim, pct, answered: answered.length };
  });

  const weightTotal = dimensions.reduce((s, d) => s + d.weight, 0);
  const weightedScore =
    weightTotal > 0
      ? dimResults.reduce((s, d) => s + d.pct * d.weight, 0) / weightTotal
      : 0;
  const scaled = Math.round(weightedScore * 100);
  const verdict = verdicts.find((v) => scaled >= v.min && scaled <= v.max) ?? verdicts[0];

  const colorMap = {
    mint: { bar: "bg-mint-500", chip: "pill-mint", text: "text-mint-800" },
    amber: { bar: "bg-amber-500", chip: "pill", text: "text-amber-700" },
    violet: { bar: "bg-violet-500", chip: "pill-violet", text: "text-violet-700" },
    red: { bar: "bg-red-500", chip: "pill", text: "text-red-700" },
  }[verdict?.color ?? "mint"];

  const totalQuestions = dimensions.reduce((s, d) => s + d.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const completeness = answeredQuestions / totalQuestions;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <section className="space-y-5">
        {dimensions.map((dim) => (
          <div key={dim.id} className="surface-card p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{dim.label}</h2>
              <span className="text-xs text-ink/50">
                Weight {Math.round((dim.weight / weightTotal) * 100)}%
              </span>
            </div>
            {dim.description ? (
              <p className="mt-1 text-sm text-ink/60">{dim.description}</p>
            ) : null}

            <ul className="mt-4 flex flex-col gap-4">
              {dim.questions.map((q) => {
                const options = q.options ?? DEFAULT_OPTIONS;
                const value = answers[q.id];
                return (
                  <li key={q.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-ink">{q.label}</p>
                        {q.hint ? <p className="text-xs text-ink/55">{q.hint}</p> : null}
                      </div>
                      {value !== undefined ? (
                        <span className="pill text-xs">{value}/4</span>
                      ) : null}
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-1.5">
                      {options.map((opt, i) => {
                        const active = value === i;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => set(q.id, i)}
                            className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                              active
                                ? "border-violet-500 bg-violet-50 text-violet-800 shadow-ring"
                                : "border-line bg-white text-ink/65 hover:border-violet-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className={`surface-card p-6 ${verdict?.color === "mint" ? "bg-ink text-white" : "bg-ink text-white"}`}>
          <div className="text-xs font-semibold uppercase tracking-wider text-mint-400">
            {summaryLabel}
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-5xl font-bold leading-none">{scaled}</span>
            <span className="text-base text-white/60">/ 100</span>
          </div>
          <div className="mt-3">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${verdict?.color === "mint" ? "bg-mint-500/20 text-mint-200" : "bg-white/10 text-white"}`}>
              {verdict?.label}
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/70">{verdict?.blurb}</p>
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Completeness</span>
              <span>{PERCENT.format(completeness)}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-gradient"
                style={{ width: `${completeness * 100}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-white/50">
              {answeredQuestions}/{totalQuestions} questions answered
            </p>
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            By dimension
          </h3>
          <ul className="mt-3 space-y-3 text-sm">
            {dimResults.map((d) => (
              <li key={d.id}>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-ink">{d.label}</span>
                  <span className="text-xs text-ink/55">{Math.round(d.pct * 100)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={`h-full rounded-full ${colorMap.bar}`}
                    style={{ width: `${d.pct * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-5 text-xs text-ink/70">
          <strong className="font-semibold text-ink">What to do with this.</strong>{" "}
          Use the per-dimension bars to find the shortest path to a higher score. Each weak dimension translates to a specific pre-sale workstream.
        </div>
      </aside>
    </div>
  );
}
