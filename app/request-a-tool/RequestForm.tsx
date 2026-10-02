"use client";

import * as React from "react";

type FormState = {
  name: string;
  email: string;
  role: string;
  category: string;
  title: string;
  description: string;
  inputs: string;
  outputs: string;
};

const DEFAULT_STATE: FormState = {
  name: "",
  email: "",
  role: "operator",
  category: "valuation",
  title: "",
  description: "",
  inputs: "",
  outputs: "",
};

export function RequestForm() {
  const [state, setState] = React.useState<FormState>(DEFAULT_STATE);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.email || !state.title || !state.description) {
      setError("Fill in your email, a short title, and a description.");
      return;
    }
    setError(null);
    // In production: POST to /api/request-a-tool. For now, we persist to localStorage
    // so operators can round-trip without a backend.
    try {
      const existing = JSON.parse(localStorage.getItem("tool-requests") ?? "[]");
      existing.push({ ...state, at: new Date().toISOString() });
      localStorage.setItem("tool-requests", JSON.stringify(existing));
    } catch {
      // ignore
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="surface-card p-8 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-mint-100 text-mint-700">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Request received.</h3>
        <p className="mt-2 text-sm text-ink/65">
          We'll be in touch within 48 hours. In the meantime, add your vote to related items on the roadmap.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <a href="/roadmap" className="btn-brand">
            See the roadmap
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setState(DEFAULT_STATE);
            }}
            className="btn-secondary"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="surface-card p-6 sm:p-8" onSubmit={onSubmit}>
      <h2 className="text-xl font-bold text-ink">The request</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            className="input"
            value={state.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" required>
          <input
            className="input"
            type="email"
            value={state.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
        <Field label="You are a">
          <select
            className="input"
            value={state.role}
            onChange={(e) => set("role", e.target.value)}
          >
            <option value="operator">Operator / owner</option>
            <option value="buyer">Buyer / sponsor</option>
            <option value="advisor">M&amp;A advisor</option>
            <option value="builder">Builder / contributor</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Category">
          <select
            className="input"
            value={state.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="valuation">Valuation</option>
            <option value="financial-analysis">Financial analysis & QoE</option>
            <option value="deal-structure">Deal structure & proceeds</option>
            <option value="sourcing">Sourcing & marketing</option>
            <option value="diligence">Due diligence</option>
            <option value="legal">Legal & closing</option>
            <option value="exit">Exit readiness</option>
            <option value="data">Data & benchmarks</option>
            <option value="ai">AI & automation</option>
            <option value="trades">Trade-specific</option>
          </select>
        </Field>
        <Field label="Short title" required className="sm:col-span-2">
          <input
            className="input"
            value={state.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. SBA 10-year amortization calculator"
          />
        </Field>
        <Field label="What problem does it solve?" required className="sm:col-span-2">
          <textarea
            className="input"
            rows={4}
            value={state.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="One or two sentences on who it's for and the decision it supports."
          />
        </Field>
        <Field label="Expected inputs">
          <textarea
            className="input"
            rows={3}
            value={state.inputs}
            onChange={(e) => set("inputs", e.target.value)}
            placeholder="Revenue, EBITDA, debt payoff, broker fee…"
          />
        </Field>
        <Field label="Expected outputs">
          <textarea
            className="input"
            rows={3}
            value={state.outputs}
            onChange={(e) => set("outputs", e.target.value)}
            placeholder="Net proceeds, effective tax rate, waterfall chart…"
          />
        </Field>
      </div>

      {error ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex items-center gap-3">
        <button type="submit" className="btn-brand">
          Submit request
        </button>
        <p className="text-xs text-ink/55">
          We don't share your info. You can also post the request on <a className="link-arrow" href="https://github.com/samarkandiy/OpenSource.mainstreetwealth/discussions" target="_blank" rel="noreferrer">GitHub Discussions</a>.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col ${className ?? ""}`}>
      <span className="label flex items-center gap-1.5">
        {label}
        {required ? <span className="text-violet-600">*</span> : null}
      </span>
      {children}
    </label>
  );
}
