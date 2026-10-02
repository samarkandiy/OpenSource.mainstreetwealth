"use client";

import * as React from "react";
import { safeNumber } from "@/lib/format";

type MoneyInputProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  help?: string;
  placeholder?: string;
  min?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  id?: string;
};

/**
 * Numeric input with a leading currency prefix (defaults to $) and a help line.
 * Accepts raw string input and parses it, so the user can paste "$6,400,000".
 */
export function MoneyInput({
  label,
  value,
  onChange,
  help,
  placeholder,
  min,
  step,
  prefix = "$",
  suffix,
  id,
}: MoneyInputProps) {
  const [raw, setRaw] = React.useState<string>(formatValue(value));
  const [focused, setFocused] = React.useState(false);
  const autoId = React.useId();
  const inputId = id ?? autoId;

  // Keep local state in sync when parent changes value (e.g. preset applied)
  React.useEffect(() => {
    if (!focused) setRaw(formatValue(value));
  }, [value, focused]);

  return (
    <div>
      <label htmlFor={inputId} className="label">
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-ink/50">
            {prefix}
          </span>
        ) : null}
        <input
          id={inputId}
          inputMode="decimal"
          type="text"
          className={`input ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`}
          value={raw}
          placeholder={placeholder ?? "0"}
          onFocus={() => {
            setFocused(true);
            setRaw(value ? String(value) : "");
          }}
          onBlur={() => {
            setFocused(false);
            const parsed = safeNumber(raw);
            const clamped = typeof min === "number" ? Math.max(parsed, min) : parsed;
            onChange(clamped);
            setRaw(formatValue(clamped));
          }}
          onChange={(e) => {
            const v = e.target.value;
            setRaw(v);
            onChange(safeNumber(v));
          }}
          step={step}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-ink/50">
            {suffix}
          </span>
        ) : null}
      </div>
      {help ? <p className="mt-1 text-xs text-ink/55">{help}</p> : null}
    </div>
  );
}

function formatValue(value: number): string {
  if (!value) return "";
  return new Intl.NumberFormat("en-US").format(value);
}
