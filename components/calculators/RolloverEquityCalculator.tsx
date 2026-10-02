"use client";

import * as React from "react";
import { MoneyInput } from "./MoneyInput";
import { USD, PERCENT, NUMBER } from "@/lib/format";

type Inputs = {
  enterpriseValue: number;
  rolloverPct: number;    // 0-100
  hold: number;           // years
  ebitdaGrowth: number;   // 0-100 CAGR
  exitMultipleChange: number; // -3 to +3 turns absolute change at exit
  currentMultiple: number;    // current entry multiple
  ebitda: number;             // current adjusted EBITDA
};

const DEFAULTS: Inputs = {
  enterpriseValue: 10_000_000,
  rolloverPct: 20,
  hold: 5,
  ebitdaGrowth: 12,
  exitMultipleChange: 1.0,
  currentMultiple: 7.0,
  ebitda: 1_428_571,
};

export function RolloverEquityCalculator() {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULTS);

  const rolloverDollars = inputs.enterpriseValue * (inputs.rolloverPct / 100);
  const cashAtClose = inputs.enterpriseValue - rolloverDollars;

  // Model: EBITDA compounds at ebitdaGrowth%. Exit multiple shifts by exitMultipleChange turns.
  const exitEbitda = inputs.ebitda * Math.pow(1 + inputs.ebitdaGrowth / 100, inputs.hold);
  const exitMultiple = inputs.currentMultiple + inputs.exitMultipleChange;
  const exitEnterpriseValue = exitEbitda * exitMultiple;
  // Assume rollover equity owns a pro rata slice of the exit (ignoring new money dilution for simplicity).
  const exitProceeds = exitEnterpriseValue * (inputs.rolloverPct / 100);
  const totalProceeds = cashAtClose + exitProceeds;
  const moic = rolloverDollars > 0 ? exitProceeds / rolloverDollars : 0;
  const irr = rolloverDollars > 0 && inputs.hold > 0
    ? Math.pow(exitProceeds / rolloverDollars, 1 / inputs.hold) - 1
    : 0;
  const vsAllCash = totalProceeds - inputs.enterpriseValue;

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Deal at close</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <MoneyInput
            label="Enterprise value at close"
            value={inputs.enterpriseValue}
            onChange={(v) => set("enterpriseValue", v)}
          />
          <Slider
            label="Rollover equity"
            min={0}
            max={50}
            step={1}
            value={inputs.rolloverPct}
            onChange={(v) => set("rolloverPct", v)}
            formatValue={(v) => `${v}%`}
            help="Share of enterprise value retained in the new company."
          />
          <MoneyInput
            label="Current adjusted EBITDA"
            value={inputs.ebitda}
            onChange={(v) => set("ebitda", v)}
          />
          <Slider
            label="Entry multiple"
            min={3}
            max={15}
            step={0.25}
            value={inputs.currentMultiple}
            onChange={(v) => set("currentMultiple", v)}
            formatValue={(v) => `${v.toFixed(2)}×`}
          />
        </div>

        <h2 className="mt-8 text-lg font-semibold text-ink">Second exit assumptions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Slider
            label="Hold period"
            min={2}
            max={10}
            step={1}
            value={inputs.hold}
            onChange={(v) => set("hold", v)}
            formatValue={(v) => `${v} yrs`}
          />
          <Slider
            label="EBITDA growth (CAGR)"
            min={-5}
            max={30}
            step={1}
            value={inputs.ebitdaGrowth}
            onChange={(v) => set("ebitdaGrowth", v)}
            formatValue={(v) => `${v}%`}
          />
          <Slider
            label="Exit multiple change"
            min={-3}
            max={3}
            step={0.25}
            value={inputs.exitMultipleChange}
            onChange={(v) => set("exitMultipleChange", v)}
            formatValue={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)} turn${Math.abs(v) === 1 ? "" : "s"}`}
            help="Positive if the next buyer pays a higher multiple (platform premium)."
          />
          <div className="rounded-xl border border-line bg-surface-soft p-4 text-xs text-ink/70">
            <strong className="font-semibold text-ink">Simplifying assumption.</strong>{" "}
            Rollover owns its full pro-rata at exit (no mid-hold dilution). Add-on debt, management incentive dilution, and preferred structures land in the <a className="link-arrow" href="/distribution-waterfall">distribution waterfall</a>.
          </div>
        </div>

        <div className="mt-5">
          <button type="button" onClick={() => setInputs(DEFAULTS)} className="btn-ghost text-xs">
            Reset to sample numbers
          </button>
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        <div className="surface-card bg-ink p-6 text-white">
          <div className="text-xs font-semibold uppercase tracking-wider text-mint-400">
            Total proceeds (cash + second bite)
          </div>
          <div className="mt-1 text-4xl font-bold leading-none">
            {USD.format(totalProceeds)}
          </div>
          <div className="mt-2 text-xs text-white/70">
            vs. all-cash: {vsAllCash >= 0 ? "+" : ""}
            {USD.format(Math.abs(vsAllCash))} ({vsAllCash >= 0 ? "better" : "worse"})
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Cash flow pattern
          </h3>
          <dl className="mt-3 space-y-2 text-sm">
            <Row k="Cash at close" v={USD.format(cashAtClose)} />
            <Row k="Rollover equity" v={USD.format(rolloverDollars)} dim />
            <Row k="Exit EBITDA (yr {hold})" v={USD.format(exitEbitda)} dim replace={{ hold: inputs.hold }} />
            <Row k="Exit multiple" v={`${exitMultiple.toFixed(2)}×`} dim />
            <Row k="Exit enterprise value" v={USD.format(exitEnterpriseValue)} dim />
            <Row k="Rollover proceeds at exit" v={USD.format(exitProceeds)} />
          </dl>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Returns on the rollover
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="kpi">
              <div className="kpi-label">MOIC</div>
              <div className="kpi-value">{NUMBER.format(moic)}×</div>
            </div>
            <div className="kpi">
              <div className="kpi-label">IRR</div>
              <div className="kpi-value">{PERCENT.format(irr)}</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({
  k,
  v,
  dim,
  replace,
}: {
  k: string;
  v: string;
  dim?: boolean;
  replace?: Record<string, string | number>;
}) {
  let label = k;
  if (replace) {
    for (const [rk, rv] of Object.entries(replace)) {
      label = label.replace(`{${rk}}`, String(rv));
    }
  }
  return (
    <div className={`flex items-center justify-between ${dim ? "text-ink/60" : "font-medium text-ink"}`}>
      <dt>{label}</dt>
      <dd className="font-mono">{v}</dd>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
  help,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue: (v: number) => string;
  help?: string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between">
        <span className="label">{label}</span>
        <span className="text-sm font-semibold text-ink">{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-600"
        aria-label={label}
      />
      {help ? <p className="mt-1 text-xs text-ink/55">{help}</p> : null}
    </div>
  );
}
