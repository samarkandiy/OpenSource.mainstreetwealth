"use client";

import * as React from "react";
import { MoneyInput } from "./MoneyInput";
import { USD, PERCENT, formatSigned } from "@/lib/format";

type AddbackCategory =
  | "owner"
  | "related-party"
  | "one-time"
  | "non-cash"
  | "normalization"
  | "other";

type Addback = {
  id: string;
  category: AddbackCategory;
  label: string;
  amount: number;
  docChecks: Record<string, boolean>;
};

const CATEGORY_LABELS: Record<AddbackCategory, string> = {
  owner: "Owner compensation & perks",
  "related-party": "Related-party / shareholder",
  "one-time": "One-time or non-recurring",
  "non-cash": "Non-cash",
  normalization: "Normalization",
  other: "Other",
};

const CATEGORY_HINTS: Record<AddbackCategory, string[]> = {
  owner: [
    "Owner W-2 wages",
    "Owner payroll taxes & benefits",
    "Owner health insurance / HSA",
    "Owner-only retirement contributions",
    "Vehicle used only by owner",
    "Owner phone / club memberships",
  ],
  "related-party": [
    "Above-market rent to related party",
    "Family on payroll but not working",
    "Owner spouse's travel",
    "Related-party management fees",
  ],
  "one-time": [
    "Legal fees for a one-time dispute",
    "Litigation settlement",
    "Severance from reduction in force",
    "Rebranding / website rebuild",
    "Hurricane / storm cleanup",
    "ERP implementation",
  ],
  "non-cash": [
    "Depreciation (if not already in EBITDA)",
    "Amortization",
    "Stock-based compensation",
    "Impairment of goodwill",
  ],
  normalization: [
    "Below-market owner salary (negative add-back)",
    "Deferred maintenance catch-up",
    "COGS classification correction",
    "Rent to FMV correction",
  ],
  other: ["Other"],
};

const DOC_CHECKLIST: Record<AddbackCategory, string[]> = {
  owner: [
    "W-2 or 1099 for the owner",
    "Payroll register showing comp detail",
    "Benefits ledger showing owner-only costs",
  ],
  "related-party": [
    "Lease or contract to related party",
    "Comparable market rent / rate",
    "Related-party disclosure in financials",
  ],
  "one-time": [
    "Invoice or contract supporting the event",
    "Written explanation of why it's non-recurring",
    "Attribution to a specific GL account and period",
  ],
  "non-cash": [
    "Depreciation schedule",
    "Audit or review workpapers",
  ],
  normalization: [
    "Side-by-side with the normalized number",
    "External benchmark (market rent, market comp)",
    "QoE adjustment memo",
  ],
  other: ["Supporting document", "Rationale memo"],
};

const SEED: Addback[] = [
  { id: cid(), category: "owner", label: "Owner W-2 wages", amount: 185_000, docChecks: {} },
  { id: cid(), category: "owner", label: "Owner health insurance", amount: 22_000, docChecks: {} },
  { id: cid(), category: "related-party", label: "Above-market rent to owner's LLC", amount: 48_000, docChecks: {} },
  { id: cid(), category: "one-time", label: "Legal settlement with ex-employee", amount: 35_000, docChecks: {} },
];

export function AddbackBuilder() {
  const [reportedEbitda, setReportedEbitda] = React.useState(820_000);
  const [addbacks, setAddbacks] = React.useState<Addback[]>(SEED);

  const total = addbacks.reduce((sum, a) => sum + a.amount, 0);
  const adjusted = reportedEbitda + total;

  function updateAddback(id: string, patch: Partial<Addback>) {
    setAddbacks((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function toggleDoc(id: string, key: string) {
    setAddbacks((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, docChecks: { ...a.docChecks, [key]: !a.docChecks[key] } }
          : a
      )
    );
  }

  function removeAddback(id: string) {
    setAddbacks((prev) => prev.filter((a) => a.id !== id));
  }

  function addNew(category: AddbackCategory) {
    setAddbacks((prev) => [
      ...prev,
      {
        id: cid(),
        category,
        label: "",
        amount: 0,
        docChecks: {},
      },
    ]);
  }

  // Documentation score across all add-backs
  const totalDocsRequired = addbacks.reduce(
    (n, a) => n + DOC_CHECKLIST[a.category].length,
    0
  );
  const totalDocsChecked = addbacks.reduce(
    (n, a) => n + DOC_CHECKLIST[a.category].filter((d) => a.docChecks[d]).length,
    0
  );
  const docScore = totalDocsRequired > 0 ? totalDocsChecked / totalDocsRequired : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Starting point</h2>
        <div className="mt-4 max-w-sm">
          <MoneyInput
            label="Reported EBITDA (LTM)"
            value={reportedEbitda}
            onChange={setReportedEbitda}
            help="EBITDA from the P&L, before any adjustments."
          />
        </div>

        <h2 className="mt-8 text-lg font-semibold text-ink">Add-backs</h2>
        <p className="mt-1 text-sm text-ink/60">
          Add one row per adjustment. Each one gets a documentation checklist so a buyer can trace it.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(CATEGORY_LABELS) as AddbackCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => addNew(cat)}
              className="btn-secondary text-xs"
            >
              + {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {addbacks.map((ab, i) => {
            const docs = DOC_CHECKLIST[ab.category];
            const checked = docs.filter((d) => ab.docChecks[d]).length;
            return (
              <div key={ab.id} className="rounded-2xl border border-line bg-surface-soft p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="flex-1 min-w-[200px]">
                    <label className="label flex items-center gap-2">
                      <span className="code-chip">#{i + 1}</span>
                      {CATEGORY_LABELS[ab.category]}
                    </label>
                    <input
                      className="input"
                      list={`hint-${ab.category}`}
                      value={ab.label}
                      onChange={(e) => updateAddback(ab.id, { label: e.target.value })}
                      placeholder="Short description…"
                    />
                    <datalist id={`hint-${ab.category}`}>
                      {CATEGORY_HINTS[ab.category].map((h) => (
                        <option key={h} value={h} />
                      ))}
                    </datalist>
                  </div>
                  <div className="w-full sm:w-48">
                    <MoneyInput
                      label="Amount"
                      value={ab.amount}
                      onChange={(v) => updateAddback(ab.id, { amount: v })}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAddback(ab.id)}
                    className="btn-ghost mt-6 text-xs"
                    aria-label="Remove"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4 border-t border-line pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-ink/55">
                      Documentation
                    </span>
                    <span className="text-xs text-ink/55">
                      {checked}/{docs.length}
                    </span>
                  </div>
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {docs.map((doc) => {
                      const on = !!ab.docChecks[doc];
                      return (
                        <li key={doc}>
                          <label className="flex items-start gap-2 rounded-md px-1 py-1 text-sm text-ink/80 hover:bg-white">
                            <input
                              type="checkbox"
                              checked={on}
                              onChange={() => toggleDoc(ab.id, doc)}
                              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-line text-violet-600 accent-violet-600"
                            />
                            <span className={on ? "line-through text-ink/50" : ""}>{doc}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
          {addbacks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-white p-6 text-center text-sm text-ink/60">
              No add-backs yet. Pick a category above to add your first.
            </div>
          ) : null}
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="surface-card bg-ink p-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint-400">
            Adjusted EBITDA
          </div>
          <div className="mt-1 text-4xl font-bold leading-none">{USD.format(adjusted)}</div>
          <div className="mt-2 text-xs text-white/60">
            Reported {USD.format(reportedEbitda)} + {addbacks.length} add-back
            {addbacks.length === 1 ? "" : "s"} ({USD.format(total)})
          </div>
        </div>

        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
              Documentation score
            </h3>
            <span className="text-xs font-semibold text-ink">
              {PERCENT.format(docScore)}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-brand-gradient transition-all"
              style={{ width: `${docScore * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-ink/55">
            Buyers discount undocumented add-backs or strip them out entirely. Aim for 100%.
          </p>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            By category
          </h3>
          <dl className="mt-3 divide-y divide-line text-sm">
            {(Object.keys(CATEGORY_LABELS) as AddbackCategory[]).map((cat) => {
              const subtotal = addbacks
                .filter((a) => a.category === cat)
                .reduce((s, a) => s + a.amount, 0);
              if (subtotal === 0) return null;
              return (
                <div key={cat} className="flex items-center justify-between py-2">
                  <dt className="text-ink/70">{CATEGORY_LABELS[cat]}</dt>
                  <dd className="font-mono text-ink">{formatSigned(subtotal)}</dd>
                </div>
              );
            })}
            <div className="flex items-center justify-between pt-3">
              <dt className="font-semibold text-ink">Total add-backs</dt>
              <dd className="font-mono text-base font-bold text-ink">{USD.format(total)}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}

function cid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}
