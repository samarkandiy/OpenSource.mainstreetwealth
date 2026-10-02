"use client";

import * as React from "react";
import { MoneyInput } from "./MoneyInput";
import { PERCENT, USD, formatSigned } from "@/lib/format";

type Inputs = {
  revenue: number;
  netIncome: number;
  interest: number;
  taxes: number;
  depreciation: number;
  amortization: number;
};

const DEFAULTS: Inputs = {
  revenue: 6_400_000,
  netIncome: 620_000,
  interest: 95_000,
  taxes: 155_000,
  depreciation: 140_000,
  amortization: 40_000,
};

export function EbitdaCalculator() {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULTS);

  const ebitda =
    inputs.netIncome +
    inputs.interest +
    inputs.taxes +
    inputs.depreciation +
    inputs.amortization;
  const margin = inputs.revenue > 0 ? ebitda / inputs.revenue : 0;
  const lowMultiple = 4;
  const midMultiple = 5.5;
  const highMultiple = 7;

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Inputs</h2>
        <p className="mt-1 text-sm text-ink/60">
          Pull these straight from the trailing twelve-month P&amp;L.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MoneyInput
            label="Revenue (LTM)"
            value={inputs.revenue}
            onChange={(v) => set("revenue", v)}
            help="Trailing twelve months of revenue."
          />
          <MoneyInput
            label="Net income"
            value={inputs.netIncome}
            onChange={(v) => set("netIncome", v)}
            help="Bottom of the P&L, after taxes."
          />
          <MoneyInput
            label="Interest expense"
            value={inputs.interest}
            onChange={(v) => set("interest", v)}
            help="Interest only. Don't include principal."
          />
          <MoneyInput
            label="Taxes"
            value={inputs.taxes}
            onChange={(v) => set("taxes", v)}
            help="Income taxes. Exclude payroll and sales tax."
          />
          <MoneyInput
            label="Depreciation"
            value={inputs.depreciation}
            onChange={(v) => set("depreciation", v)}
            help="Depreciation of trucks, equipment, buildings."
          />
          <MoneyInput
            label="Amortization"
            value={inputs.amortization}
            onChange={(v) => set("amortization", v)}
            help="Amortization of acquired intangibles, if any."
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setInputs(DEFAULTS)}
            className="btn-ghost text-xs"
          >
            Reset to sample numbers
          </button>
          <button
            type="button"
            onClick={() =>
              setInputs({
                revenue: 0,
                netIncome: 0,
                interest: 0,
                taxes: 0,
                depreciation: 0,
                amortization: 0,
              })
            }
            className="btn-ghost text-xs"
          >
            Clear all
          </button>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="surface-card bg-ink p-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint-400">
            EBITDA
          </div>
          <div className="mt-1 text-4xl font-bold leading-none">
            {USD.format(ebitda)}
          </div>
          <div className="mt-2 text-xs text-white/60">
            Margin: {PERCENT.format(margin)} · Formula: Net Income + Interest + Taxes + D&amp;A
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Build-up
          </h3>
          <dl className="mt-3 divide-y divide-line text-sm">
            {[
              { k: "Net income", v: inputs.netIncome },
              { k: "+ Interest", v: inputs.interest },
              { k: "+ Taxes", v: inputs.taxes },
              { k: "+ Depreciation", v: inputs.depreciation },
              { k: "+ Amortization", v: inputs.amortization },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between py-2">
                <dt className="text-ink/60">{row.k}</dt>
                <dd className="font-mono text-ink">{formatSigned(row.v)}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3">
              <dt className="font-semibold text-ink">= EBITDA</dt>
              <dd className="font-mono text-base font-bold text-ink">
                {USD.format(ebitda)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Rough value range
          </h3>
          <p className="mt-1 text-xs text-ink/55">
            Based on EBITDA multiples typical in home services. Narrow this with the <a href="/valuation-multiples-lookup" className="link-arrow">multiples lookup</a>.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            {[
              { label: "Low", m: lowMultiple },
              { label: "Mid", m: midMultiple },
              { label: "High", m: highMultiple },
            ].map((band) => (
              <div
                key={band.label}
                className={`rounded-xl border p-3 ${
                  band.label === "Mid"
                    ? "border-violet-200 bg-violet-50"
                    : "border-line bg-surface-soft"
                }`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                  {band.label} · {band.m}×
                </div>
                <div className={`mt-0.5 font-bold ${band.label === "Mid" ? "text-violet-800" : "text-ink"}`}>
                  {USD.format(ebitda * band.m)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
