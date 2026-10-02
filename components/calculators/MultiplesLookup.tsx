"use client";

import * as React from "react";
import { MoneyInput } from "./MoneyInput";
import { USD } from "@/lib/format";

type Trade =
  | "hvac"
  | "plumbing"
  | "roofing"
  | "pest-control"
  | "landscaping"
  | "pool"
  | "electrical";

type SizeBand = "sub-500k" | "500k-1m" | "1m-3m" | "3m-plus";

type Multiple = { low: number; mid: number; high: number; n: number };

type Row = Record<SizeBand, Multiple>;

// Illustrative numbers. Replace with the open dataset when live.
// Sample sizes (n) are the number of transactions behind each band.
const MULTIPLES: Record<Trade, Row> = {
  hvac: {
    "sub-500k": { low: 2.0, mid: 2.75, high: 3.5, n: 48 },
    "500k-1m": { low: 3.5, mid: 4.75, high: 6.0, n: 61 },
    "1m-3m": { low: 5.0, mid: 6.25, high: 7.5, n: 73 },
    "3m-plus": { low: 7.0, mid: 8.5, high: 10.5, n: 29 },
  },
  plumbing: {
    "sub-500k": { low: 2.0, mid: 2.5, high: 3.25, n: 37 },
    "500k-1m": { low: 3.5, mid: 4.25, high: 5.25, n: 44 },
    "1m-3m": { low: 4.5, mid: 5.5, high: 7.0, n: 51 },
    "3m-plus": { low: 6.5, mid: 7.75, high: 9.5, n: 18 },
  },
  roofing: {
    "sub-500k": { low: 1.75, mid: 2.25, high: 3.0, n: 42 },
    "500k-1m": { low: 2.75, mid: 3.5, high: 4.5, n: 55 },
    "1m-3m": { low: 3.75, mid: 4.75, high: 6.0, n: 48 },
    "3m-plus": { low: 5.5, mid: 6.5, high: 8.0, n: 22 },
  },
  "pest-control": {
    "sub-500k": { low: 3.0, mid: 3.75, high: 4.5, n: 24 },
    "500k-1m": { low: 4.5, mid: 5.5, high: 6.5, n: 32 },
    "1m-3m": { low: 6.0, mid: 7.25, high: 8.75, n: 41 },
    "3m-plus": { low: 8.0, mid: 9.5, high: 12.0, n: 15 },
  },
  landscaping: {
    "sub-500k": { low: 2.0, mid: 2.5, high: 3.0, n: 29 },
    "500k-1m": { low: 3.25, mid: 4.0, high: 5.0, n: 38 },
    "1m-3m": { low: 4.5, mid: 5.5, high: 6.75, n: 46 },
    "3m-plus": { low: 6.0, mid: 7.0, high: 8.5, n: 14 },
  },
  pool: {
    "sub-500k": { low: 2.0, mid: 2.5, high: 3.25, n: 19 },
    "500k-1m": { low: 3.25, mid: 4.0, high: 5.0, n: 26 },
    "1m-3m": { low: 4.0, mid: 5.0, high: 6.25, n: 31 },
    "3m-plus": { low: 5.5, mid: 6.5, high: 8.0, n: 11 },
  },
  electrical: {
    "sub-500k": { low: 2.25, mid: 3.0, high: 3.75, n: 21 },
    "500k-1m": { low: 3.5, mid: 4.5, high: 5.75, n: 30 },
    "1m-3m": { low: 5.0, mid: 6.0, high: 7.25, n: 38 },
    "3m-plus": { low: 6.75, mid: 8.0, high: 10.0, n: 13 },
  },
};

const TRADE_LABEL: Record<Trade, string> = {
  hvac: "HVAC",
  plumbing: "Plumbing",
  roofing: "Roofing",
  "pest-control": "Pest control",
  landscaping: "Landscaping",
  pool: "Pool",
  electrical: "Electrical",
};

const BAND_LABEL: Record<SizeBand, string> = {
  "sub-500k": "< $500k EBITDA",
  "500k-1m": "$500k – $1M",
  "1m-3m": "$1M – $3M",
  "3m-plus": "$3M+",
};

function bandFromEbitda(ebitda: number): SizeBand {
  if (ebitda < 500_000) return "sub-500k";
  if (ebitda < 1_000_000) return "500k-1m";
  if (ebitda < 3_000_000) return "1m-3m";
  return "3m-plus";
}

export function MultiplesLookup() {
  const [trade, setTrade] = React.useState<Trade>("hvac");
  const [ebitda, setEbitda] = React.useState(1_270_000);

  const band = bandFromEbitda(ebitda);
  const m = MULTIPLES[trade][band];
  const bands = (Object.keys(BAND_LABEL) as SizeBand[]).map((b) => ({
    band: b,
    label: BAND_LABEL[b],
    m: MULTIPLES[trade][b],
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Pick a trade and size</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="label">Trade</span>
            <select
              value={trade}
              onChange={(e) => setTrade(e.target.value as Trade)}
              className="input"
            >
              {(Object.keys(TRADE_LABEL) as Trade[]).map((t) => (
                <option key={t} value={t}>
                  {TRADE_LABEL[t]}
                </option>
              ))}
            </select>
          </label>
          <MoneyInput
            label="Adjusted EBITDA (LTM)"
            value={ebitda}
            onChange={setEbitda}
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-muted text-xs uppercase tracking-wider text-ink/60">
                <th className="px-3 py-2 text-left font-semibold">Band</th>
                <th className="px-3 py-2 text-right font-semibold">Low</th>
                <th className="px-3 py-2 text-right font-semibold">Mid</th>
                <th className="px-3 py-2 text-right font-semibold">High</th>
                <th className="px-3 py-2 text-right font-semibold">n</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {bands.map((row) => {
                const active = row.band === band;
                return (
                  <tr
                    key={row.band}
                    className={active ? "bg-violet-50/60" : "hover:bg-surface-soft"}
                  >
                    <td className="px-3 py-2.5 font-medium text-ink">
                      <span className="flex items-center gap-2">
                        {active ? (
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                        ) : null}
                        {row.label}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-ink/80">
                      {row.m.low.toFixed(1)}×
                    </td>
                    <td className={`px-3 py-2.5 text-right font-mono ${active ? "font-bold text-violet-800" : "text-ink"}`}>
                      {row.m.mid.toFixed(1)}×
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-ink/80">
                      {row.m.high.toFixed(1)}×
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-xs text-ink/55">
                      {row.m.n}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink/55">
          Illustrative. Full open dataset (with sources) ships at <a className="link-arrow" href="/data/multiples">/data/multiples</a>.
        </p>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="surface-card bg-ink p-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint-400">
            Implied enterprise value range
          </div>
          <div className="mt-1 text-xs text-white/60">
            {TRADE_LABEL[trade]} · {BAND_LABEL[band]} · {m.n} comps
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "Low", v: ebitda * m.low, m: m.low },
              { k: "Mid", v: ebitda * m.mid, m: m.mid },
              { k: "High", v: ebitda * m.high, m: m.high },
            ].map((cell) => (
              <div
                key={cell.k}
                className={`rounded-xl p-3 ${
                  cell.k === "Mid"
                    ? "bg-brand-gradient text-white"
                    : "bg-white/5 text-white/90"
                }`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider">
                  {cell.k} · {cell.m.toFixed(1)}×
                </div>
                <div className="mt-0.5 text-lg font-bold">{USD.format(cell.v)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-5 text-sm text-ink/70">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Caveats
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• Multiples are on <strong>adjusted</strong> EBITDA, not reported.</li>
            <li>• Add a premium for recurring revenue above ~40%.</li>
            <li>• Discount for customer concentration above ~15% in one account.</li>
            <li>• Discount if the owner is still central to the business. See the <a className="link-arrow" href="/owner-dependence-scorecard">owner dependence scorecard</a>.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
