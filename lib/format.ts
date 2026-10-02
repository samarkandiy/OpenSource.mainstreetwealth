export const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const USD_CENTS = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const PERCENT = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

export const NUMBER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

/** Format a number as a signed currency string, e.g. "-$12,500" or "+$7,200". */
export function formatSigned(value: number): string {
  if (!Number.isFinite(value) || value === 0) return USD.format(0);
  const sign = value > 0 ? "+" : "-";
  return `${sign}${USD.format(Math.abs(value))}`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

export function safeNumber(input: string | number): number {
  if (typeof input === "number") return Number.isFinite(input) ? input : 0;
  const parsed = Number(input.replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}
