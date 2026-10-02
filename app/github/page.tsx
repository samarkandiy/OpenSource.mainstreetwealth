import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import {
  GITHUB_REPO,
  GITHUB_REPO_URL,
  GITHUB_ISSUES_URL,
  GITHUB_DISCUSSIONS_URL,
  GITHUB_OWNER,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "GitHub",
  description:
    "The Main Street Wealth open source hub on GitHub. Clone, run, and self-host. One repo, every tool.",
  alternates: { canonical: "/github" },
};

const DIRS: { path: string; desc: string }[] = [
  { path: "app/", desc: "Next.js App Router pages: hub, directory, every tool page." },
  { path: "components/", desc: "Shared UI and calculator components (EBITDA, SDE, add-backs, rollover, net proceeds, scorecards)." },
  { path: "lib/", desc: "Tool catalog, author profiles, schema.org helpers, and mainstreet.ai cross-link map." },
  { path: "public/", desc: "Logo and static assets." },
  { path: ".kiro/", desc: "Agent hooks and project automation." },
];

const NEXT_UP: { title: string; desc: string }[] = [
  { title: "data/", desc: "Open multiples and benchmark datasets with sources (planned)." },
  { title: "mcp/", desc: "MCP server exposing hub tools and datasets to AI agents (planned)." },
  { title: "evals/", desc: "Benchmarks for AI on M&A tasks (planned)." },
  { title: "templates/", desc: "NDA, LOI, closing checklists (planned)." },
];

export default function GithubPage() {
  return (
    <>
      <PageHeader
        eyebrow="Build with us"
        title="GitHub"
        description="Everything on this hub is open source. One repo, every tool. Clone it, self-host it, break it, improve it, send a PR."
        crumbs={[{ url: "/", name: "Open source" }, { name: "GitHub" }]}
        actions={
          <>
            <Link href={GITHUB_REPO_URL} className="btn-brand" target="_blank" rel="noreferrer">
              View the repo
            </Link>
            <Link href="/contribute" className="btn-secondary">
              Contributor guide
            </Link>
          </>
        }
      />
      <div className="container-page">
        <section className="surface-card flex flex-wrap items-start gap-4 p-5 sm:p-6">
          <div className="flex-none">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
              <GithubIcon className="h-6 w-6" />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-sm font-semibold text-ink">
              {GITHUB_OWNER}/{GITHUB_REPO}
            </div>
            <p className="mt-1 text-sm text-ink/70">
              The complete open source hub: Next.js app, 100-tool catalog, interactive calculators, SEO + EEAT infrastructure, and the mainstreetwealth.ai cross-link layer.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <Link href={GITHUB_REPO_URL} target="_blank" rel="noreferrer" className="link-arrow">
                Source
              </Link>
              <Link href={GITHUB_ISSUES_URL} target="_blank" rel="noreferrer" className="link-arrow">
                Issues
              </Link>
              <Link href={GITHUB_DISCUSSIONS_URL} target="_blank" rel="noreferrer" className="link-arrow">
                Discussions
              </Link>
              <Link href={`${GITHUB_REPO_URL}/pulls`} target="_blank" rel="noreferrer" className="link-arrow">
                Pull requests
              </Link>
              <Link href={`${GITHUB_REPO_URL}/releases`} target="_blank" rel="noreferrer" className="link-arrow">
                Releases
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Clone and run</h2>
          <p className="mt-2 text-ink/70">
            Everything on this hub is a Next.js 15 app. Clone, install, and run.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-2xl border border-line bg-ink p-5 text-sm text-mint-200 shadow-card">
            {`git clone ${GITHUB_REPO_URL}.git
cd ${GITHUB_REPO}
npm install
npm run dev`}
          </pre>
          <p className="mt-3 text-xs text-ink/55">
            Node 20+ required. Then open <span className="code-chip">http://localhost:3000</span>.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">What's in the repo</h2>
          <p className="mt-2 text-ink/70">
            A single Next.js app. Each tool lives in <span className="code-chip">app/&lt;slug&gt;</span>, with shared logic in <span className="code-chip">components/</span> and <span className="code-chip">lib/</span>.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {DIRS.map((d) => (
              <div key={d.path} className="surface-card p-4">
                <div className="font-mono text-sm font-semibold text-ink">{d.path}</div>
                <p className="mt-1 text-sm text-ink/65">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">On the roadmap</h2>
          <p className="mt-2 text-ink/70">
            Modules we're planning as the hub grows beyond the Next.js app.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {NEXT_UP.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-dashed border-line bg-surface-soft p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-ink">{d.title}</span>
                  <span className="pill text-[10px]">Planned</span>
                </div>
                <p className="mt-1 text-sm text-ink/60">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Found a bug or a wrong number?</h3>
            <p className="mt-2 text-sm text-ink/65">
              Please open an issue. We triage weekly and corrections ship in the public changelog.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={GITHUB_ISSUES_URL} target="_blank" rel="noreferrer" className="btn-primary">
                Open an issue
              </Link>
              <Link href="/request-a-tool" className="btn-secondary">
                Request a tool
              </Link>
            </div>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Want to contribute?</h3>
            <p className="mt-2 text-sm text-ink/65">
              Start with the contributor guide. Small, scoped PRs get reviewed within a week.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/contribute" className="btn-primary">
                Contributor guide
              </Link>
              <Link href={`${GITHUB_REPO_URL}/pulls`} target="_blank" rel="noreferrer" className="btn-secondary">
                Open PRs
              </Link>
            </div>
          </div>
        </section>

        <CTA
          eyebrow="Ship it"
          title="Have an idea to add to the hub?"
          description="Open an issue, start a discussion, or send a PR. We review every submission."
        />
      </div>
    </>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}
