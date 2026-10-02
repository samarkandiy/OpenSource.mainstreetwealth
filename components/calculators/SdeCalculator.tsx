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
  ownerComp: number;
  ownerPayroll: number;
  personalExpenses: number;
  oneTime: number;
};

const DEFAULTS: Inputs = {
  revenue: 1_850_000,
  netIncome: 175_000,
  interest: 28_000,
  taxes: 42_000,
  depreciation: 45_000,
  amortization: 0,
  ownerComp: 125_000,
  ownerPayroll: 24_000,
  personalExpenses: 18_000,
  oneTime: 12_000,
};

export function SdeCalculator() {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULTS);
  const ebitda =
    inputs.netIncome +
    inputs.interest +
    inputs.taxes +
    inputs.depreciation +
    inputs.amortization;
  const addbacks =
    inputs.ownerComp + inputs.ownerPayroll + inputs.personalExpenses + inputs.oneTime;
  const sde = ebitda + addbacks;
  const margin = inputs.revenue > 0 ? sde / inputs.revenue : 0;

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">P&amp;L inputs</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MoneyInput
            label="Revenue (LTM)"
            value={inputs.revenue}
            onChange={(v) => set("revenue", v)}
          />
          <MoneyInput
            label="Net income"
            value={inputs.netIncome}
            onChange={(v) => set("netIncome", v)}
          />
          <MoneyInput
            label="Interest"
            value={inputs.interest}
            onChange={(v) => set("interest", v)}
          />
          <MoneyInput
            label="Taxes"
            value={inputs.taxes}
            onChange={(v) => set("taxes", v)}
          />
          <MoneyInput
            label="Depreciation"
            value={inputs.depreciation}
            onChange={(v) => set("depreciation", v)}
          />
          <MoneyInput
            label="Amortization"
            value={inputs.amortization}
            onChange={(v) => set("amortization", v)}
          />
        </div>

        <h2 className="mt-8 text-lg font-semibold text-ink">Owner add-backs</h2>
        <p className="mt-1 text-sm text-ink/60">
          SDE is EBITDA plus the compensation and perks that go away in a sale.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MoneyInput
            label="Owner compensation (W-2)"
            value={inputs.ownerComp}
            onChange={(v) => set("ownerComp", v)}
            help="Only one owner's full comp. Buyers assume a market-rate replacement cost."
          />
          <MoneyInput
            label="Owner payroll taxes & benefits"
            value={inputs.ownerPayroll}
            onChange={(v) => set("ownerPayroll", v)}
            help="Payroll taxes, health insurance, retirement match for the owner only."
          />
          <MoneyInput
            label="Personal expenses in the P&L"
            value={inputs.personalExpenses}
            onChange={(v) => set("personalExpenses", v)}
            help="Vehicles, phones, travel that aren't actually for the business. Keep this clean and documented."
          />
          <MoneyInput
            label="One-time items"
            value={inputs.oneTime}
            onChange={(v) => set("oneTime", v)}
            help="Legal, settlements, severance that won't recur. Document each one."
          />
        </div>

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setInputs(DEFAULTS)}
            className="btn-ghost text-xs"
          >
            Reset to sample numbers
          </button>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="surface-card bg-ink p-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint-400">
            SDE
          </div>
          <div className="mt-1 text-4xl font-bold leading-none">{USD.format(sde)}</div>
          <div className="mt-2 text-xs text-white/60">
            Margin: {PERCENT.format(margin)} · EBITDA {USD.format(ebitda)} + Add-backs{" "}
            {USD.format(addbacks)}
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Build-up
          </h3>
          <dl className="mt-3 divide-y divide-line text-sm">
            {[
              { k: "Net income", v: inputs.netIncome },
              { k: "+ Interest, Taxes, D&A", v: inputs.interest + inputs.taxes + inputs.depreciation + inputs.amortization },
              { k: "= EBITDA", v: ebitda, bold: true },
              { k: "+ Owner comp", v: inputs.ownerComp },
              { k: "+ Payroll taxes & benefits", v: inputs.ownerPayroll },
              { k: "+ Personal expenses", v: inputs.personalExpenses },
              { k: "+ One-time", v: inputs.oneTime },
            ].map((row) => (
              <div
                key={row.k}
                className={`flex items-center justify-between py-2 ${
                  row.bold ? "font-semibold text-ink" : ""
                }`}
              >
                <dt className={row.bold ? "" : "text-ink/60"}>{row.k}</dt>
                <dd className="font-mono text-ink">{formatSigned(row.v)}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3">
              <dt className="font-semibold text-ink">= SDE</dt>
              <dd className="font-mono text-base font-bold text-ink">{USD.format(sde)}</dd>
            </div>
          </dl>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Typical SDE multiples
          </h3>
          <p className="mt-1 text-xs text-ink/55">
            Smaller, owner-run businesses tend to trade on 2–3.5× SDE.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            {[
              { label: "Low", m: 2.0 },
              { label: "Mid", m: 2.75 },
              { label: "High", m: 3.5 },
            ].map((band) => (
              <div
                key={band.label}
                className={`rounded-xl border p-3 ${
                  band.label === "Mid"
                    ? "border-mint-200 bg-mint-50"
                    : "border-line bg-surface-soft"
                }`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-ink/50">
                  {band.label} · {band.m}×
                </div>
                <div className={`mt-0.5 font-bold ${band.label === "Mid" ? "text-mint-800" : "text-ink"}`}>
                  {USD.format(sde * band.m)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
