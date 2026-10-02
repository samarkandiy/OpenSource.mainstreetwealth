"use client";

import * as React from "react";
import { MoneyInput } from "./MoneyInput";
import { USD, PERCENT, formatSigned } from "@/lib/format";

type Structure = "asset" | "stock";

type Inputs = {
  enterpriseValue: number;
  payoffDebt: number;
  cashIncluded: number;      // sellers typically keep cash, but can leave some
  workingCapitalTrueUp: number; // positive = extra to seller
  brokerFee: number;          // dollars
  legalFees: number;
  escrowHeld: number;         // held back
  rolloverEquity: number;     // not paid in cash
  structure: Structure;
  longTermCapGainRate: number; // 0-100
  ordinaryIncomeRate: number;  // 0-100
  stateTaxRate: number;        // 0-100
  taxBasis: number;            // seller's tax basis
  depreciationRecapturePct: number; // 0-100 of gain
};

const DEFAULTS: Inputs = {
  enterpriseValue: 10_000_000,
  payoffDebt: 1_200_000,
  cashIncluded: 0,
  workingCapitalTrueUp: 0,
  brokerFee: 400_000,
  legalFees: 85_000,
  escrowHeld: 500_000,
  rolloverEquity: 1_500_000,
  structure: "asset",
  longTermCapGainRate: 23.8, // 20% LTCG + 3.8% NIIT
  ordinaryIncomeRate: 37,
  stateTaxRate: 5,
  taxBasis: 600_000,
  depreciationRecapturePct: 15, // typically a slice of the gain
};

export function NetProceedsCalculator() {
  const [inputs, setInputs] = React.useState<Inputs>(DEFAULTS);

  function set<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  const grossCash =
    inputs.enterpriseValue -
    inputs.payoffDebt -
    inputs.rolloverEquity -
    inputs.escrowHeld +
    inputs.cashIncluded +
    inputs.workingCapitalTrueUp;

  const fees = inputs.brokerFee + inputs.legalFees;
  const cashBeforeTax = grossCash - fees;

  // Tax model: gain = EV - basis (ignoring rollover for taxed basis in simple model)
  // Portion treated as ordinary income (recapture); the rest as long-term capital gain.
  const taxableGain = Math.max(
    inputs.enterpriseValue - inputs.taxBasis - inputs.rolloverEquity,
    0
  );
  const recapture = taxableGain * (inputs.depreciationRecapturePct / 100);
  const capGainPortion = taxableGain - recapture;

  const federalTax =
    recapture * (inputs.ordinaryIncomeRate / 100) +
    capGainPortion * (inputs.longTermCapGainRate / 100);
  const stateTax = taxableGain * (inputs.stateTaxRate / 100);
  const totalTax = federalTax + stateTax;

  // Stock sale: usually fewer ordinary income consequences, so we lean the recapture lower.
  const stockAdjustment = inputs.structure === "stock" ? -recapture * ((inputs.ordinaryIncomeRate - inputs.longTermCapGainRate) / 100) : 0;
  const taxAdjusted = Math.max(totalTax + stockAdjustment, 0);

  const netProceeds = cashBeforeTax - taxAdjusted;
  const effectiveTaxRate = taxableGain > 0 ? taxAdjusted / taxableGain : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="surface-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">The purchase price waterfall</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <MoneyInput
            label="Enterprise value"
            value={inputs.enterpriseValue}
            onChange={(v) => set("enterpriseValue", v)}
          />
          <MoneyInput
            label="Debt paid off at close"
            value={inputs.payoffDebt}
            onChange={(v) => set("payoffDebt", v)}
            help="Bank loans, equipment finance, debt-like items."
          />
          <MoneyInput
            label="Cash left in business"
            value={inputs.cashIncluded}
            onChange={(v) => set("cashIncluded", v)}
            help="Usually zero. Sellers keep cash in a typical cash-free, debt-free deal."
          />
          <MoneyInput
            label="Working capital true-up"
            value={inputs.workingCapitalTrueUp}
            onChange={(v) => set("workingCapitalTrueUp", v)}
            help="Positive if actual working capital exceeds the peg."
          />
          <MoneyInput
            label="Rollover equity"
            value={inputs.rolloverEquity}
            onChange={(v) => set("rolloverEquity", v)}
            help="Amount reinvested, not paid in cash."
          />
          <MoneyInput
            label="Escrow / holdback"
            value={inputs.escrowHeld}
            onChange={(v) => set("escrowHeld", v)}
            help="Held back for indemnity. Released later if clean."
          />
          <MoneyInput
            label="Broker / banker fee"
            value={inputs.brokerFee}
            onChange={(v) => set("brokerFee", v)}
            help="Usually 2–8% of enterprise value, scaled by deal size."
          />
          <MoneyInput
            label="Legal fees"
            value={inputs.legalFees}
            onChange={(v) => set("legalFees", v)}
            help="Deal counsel. Separate from any transaction tax advisory."
          />
        </div>

        <h2 className="mt-8 text-lg font-semibold text-ink">Tax inputs</h2>
        <p className="mt-1 text-sm text-ink/60">
          Rough federal + state. Confirm with your tax advisor before you commit.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="label">Structure</span>
            <select
              value={inputs.structure}
              onChange={(e) => set("structure", e.target.value as Structure)}
              className="input"
            >
              <option value="asset">Asset sale</option>
              <option value="stock">Stock sale</option>
            </select>
          </label>
          <MoneyInput
            label="Seller's tax basis"
            value={inputs.taxBasis}
            onChange={(v) => set("taxBasis", v)}
            help="Original cost + capital improvements, less prior depreciation."
          />
          <PctInput
            label="Long-term cap gain + NIIT"
            value={inputs.longTermCapGainRate}
            onChange={(v) => set("longTermCapGainRate", v)}
          />
          <PctInput
            label="Ordinary income rate"
            value={inputs.ordinaryIncomeRate}
            onChange={(v) => set("ordinaryIncomeRate", v)}
          />
          <PctInput
            label="State tax rate"
            value={inputs.stateTaxRate}
            onChange={(v) => set("stateTaxRate", v)}
          />
          <PctInput
            label="Recapture as % of gain"
            value={inputs.depreciationRecapturePct}
            onChange={(v) => set("depreciationRecapturePct", v)}
            help="Portion of the gain taxed at ordinary rates. Depends on asset vs. stock."
          />
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
            Net to seller at close
          </div>
          <div className="mt-1 text-4xl font-bold leading-none">{USD.format(netProceeds)}</div>
          <div className="mt-2 text-xs text-white/60">
            {PERCENT.format(netProceeds / Math.max(inputs.enterpriseValue, 1))} of EV ·
            Effective tax on gain: {PERCENT.format(effectiveTaxRate)}
          </div>
        </div>

        <div className="surface-card p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
            Waterfall
          </h3>
          <dl className="mt-3 divide-y divide-line text-sm">
            <WaterfallRow k="Enterprise value" v={inputs.enterpriseValue} bold />
            <WaterfallRow k="− Debt payoff" v={-inputs.payoffDebt} />
            <WaterfallRow k="− Rollover equity" v={-inputs.rolloverEquity} />
            <WaterfallRow k="− Escrow / holdback" v={-inputs.escrowHeld} />
            <WaterfallRow k="+ Cash left in" v={inputs.cashIncluded} />
            <WaterfallRow k="+ WC true-up" v={inputs.workingCapitalTrueUp} />
            <WaterfallRow k="= Gross cash" v={grossCash} bold />
            <WaterfallRow k="− Broker / banker" v={-inputs.brokerFee} />
            <WaterfallRow k="− Legal" v={-inputs.legalFees} />
            <WaterfallRow k="= Pre-tax cash" v={cashBeforeTax} bold />
            <WaterfallRow k="− Federal + state tax" v={-taxAdjusted} />
            <WaterfallRow k="= Net to seller" v={netProceeds} bold emphasize />
          </dl>
        </div>

        <div className="surface-card p-5 text-xs text-ink/60">
          <strong className="font-semibold text-ink">Model, not advice.</strong>{" "}
          This is a rough-cut. State taxes vary a lot. Section 338(h)(10) elections, F reorganizations, and installment sales all change the answer. Talk to a tax advisor before signing.
        </div>
      </aside>
    </div>
  );
}

function PctInput({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  help?: string;
}) {
  return (
    <div>
      <span className="label">{label}</span>
      <div className="relative">
        <input
          inputMode="decimal"
          type="number"
          className="input pr-8"
          value={value}
          step={0.1}
          min={0}
          max={60}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink/50">
          %
        </span>
      </div>
      {help ? <p className="mt-1 text-xs text-ink/55">{help}</p> : null}
    </div>
  );
}

function WaterfallRow({
  k,
  v,
  bold,
  emphasize,
}: {
  k: string;
  v: number;
  bold?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        emphasize
          ? "mt-2 border-t-2 border-ink/80 pt-3 text-ink"
          : bold
          ? "font-semibold text-ink"
          : "text-ink/70"
      }`}
    >
      <dt>{k}</dt>
      <dd className={`font-mono ${emphasize ? "text-base font-bold" : ""}`}>
        {formatSigned(v)}
      </dd>
    </div>
  );
}
