"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CATEGORIES,
  STAGES,
  TRADES,
  TOOLS,
  type DealStage,
  type ToolCategory,
  type Trade,
} from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";

type Status = "all" | "live" | "planned";

export function DirectoryClient() {
  const router = useRouter();
  const params = useSearchParams();

  const initialCategory = (params.get("category") as ToolCategory | null) ?? "all";
  const initialTrade = (params.get("trade") as Trade | null) ?? "all-trades";
  const initialStage = (params.get("stage") as DealStage | null) ?? "any";
  const initialStatus = (params.get("status") as Status | null) ?? "all";
  const initialQuery = params.get("q") ?? "";

  const [query, setQuery] = React.useState(initialQuery);
  const [category, setCategory] = React.useState<ToolCategory | "all">(initialCategory);
  const [trade, setTrade] = React.useState<Trade>(initialTrade);
  const [stage, setStage] = React.useState<DealStage>(initialStage);
  const [status, setStatus] = React.useState<Status>(initialStatus);

  // Keep URL in sync with filters so views are shareable
  React.useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set("q", query);
    if (category !== "all") next.set("category", category);
    if (trade !== "all-trades") next.set("trade", trade);
    if (stage !== "any") next.set("stage", stage);
    if (status !== "all") next.set("status", status);
    const qs = next.toString();
    router.replace(qs ? `/directory?${qs}` : "/directory", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, trade, stage, status]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      if (tool.category === "hub") return false;
      if (category !== "all" && tool.category !== category) return false;
      if (trade !== "all-trades" && !tool.trades.includes(trade) && !tool.trades.includes("all-trades"))
        return false;
      if (stage !== "any" && tool.stage !== stage && tool.stage !== "any") return false;
      if (status === "live" && tool.status !== "live") return false;
      if (status === "planned" && tool.status === "live") return false;
      if (!q) return true;
      const hay = [
        tool.title,
        tool.tagline,
        tool.description,
        tool.about,
        tool.slug,
        tool.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, category, trade, stage, status]);

  const grouped = React.useMemo(() => {
    const map = new Map<ToolCategory, typeof filtered>();
    for (const tool of filtered) {
      const list = map.get(tool.category) ?? [];
      list.push(tool);
      map.set(tool.category, list);
    }
    return Array.from(map.entries()).sort((a, b) => {
      const indexA = CATEGORIES.findIndex((c) => c.id === a[0]);
      const indexB = CATEGORIES.findIndex((c) => c.id === b[0]);
      return indexA - indexB;
    });
  }, [filtered]);

  function reset() {
    setQuery("");
    setCategory("all");
    setTrade("all-trades");
    setStage("any");
    setStatus("all");
  }

  const hasFilters =
    query || category !== "all" || trade !== "all-trades" || stage !== "any" || status !== "all";

  return (
    <div>
      <div className="surface-card mb-8 p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, keywords, or trades…"
              className="input pl-9"
              aria-label="Search tools"
            />
          </div>
          <FilterSelect
            label="Category"
            value={category}
            onChange={(v) => setCategory(v as ToolCategory | "all")}
            options={[
              { value: "all", label: "All categories" },
              ...CATEGORIES.filter((c) => c.id !== "hub").map((c) => ({ value: c.id, label: c.label })),
            ]}
          />
          <FilterSelect
            label="Trade"
            value={trade}
            onChange={(v) => setTrade(v as Trade)}
            options={TRADES.map((t) => ({ value: t.id, label: t.label }))}
          />
          <FilterSelect
            label="Deal stage"
            value={stage}
            onChange={(v) => setStage(v as DealStage)}
            options={STAGES.map((s) => ({ value: s.id, label: s.label }))}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={(v) => setStatus(v as Status)}
            options={[
              { value: "all", label: "All" },
              { value: "live", label: "Live" },
              { value: "planned", label: "Planned" },
            ]}
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs text-ink/60">
          <span>
            {filtered.length} tool{filtered.length === 1 ? "" : "s"} match
          </span>
          {hasFilters ? (
            <button type="button" onClick={reset} className="link-arrow text-xs">
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={query} onReset={reset} />
      ) : (
        <div className="space-y-10">
          {grouped.map(([cat, items]) => {
            const meta = CATEGORIES.find((c) => c.id === cat);
            return (
              <section key={cat}>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="section-title-eyebrow">{meta?.letter}. {meta?.label}</div>
                    <p className="mt-1 text-sm text-ink/60">{meta?.description}</p>
                  </div>
                  <span className="text-xs text-ink/50">
                    {items.length} tool{items.length === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col">
      <span className="label">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input appearance-none bg-[length:0.65rem_0.65rem] bg-[right_0.65rem_center] bg-no-repeat pr-9"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23140036' fill-opacity='0.5'%3E%3Cpath d='M5.5 7.5L10 12l4.5-4.5' stroke='%23140036' stroke-opacity='0.5' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ query, onReset }: { query: string; onReset: () => void }) {
  return (
    <div className="surface-card flex flex-col items-center gap-3 p-10 text-center">
      <div className="rounded-full bg-surface-muted p-3">
        <SearchIcon className="h-5 w-5 text-ink/50" />
      </div>
      <h3 className="text-lg font-semibold text-ink">
        No tools match {query ? <span className="font-mono">"{query}"</span> : "your filters"}
      </h3>
      <p className="max-w-md text-sm text-ink/60">
        Try broadening the filters, or request the tool and we'll put it on the roadmap.
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={onReset} className="btn-secondary">
          Reset filters
        </button>
        <a href="/request-a-tool" className="btn-primary">
          Request a tool
        </a>
      </div>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
