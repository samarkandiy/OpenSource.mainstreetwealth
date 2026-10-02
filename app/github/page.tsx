import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "GitHub",
  description:
    "The Main Street Wealth open source GitHub organization. Install, clone, and self-host every tool.",
  alternates: { canonical: "/github" },
};

const REPOS = [
  { name: "mainstreetwealth/open-source", desc: "This hub. Next.js app, tools, and docs." },
  { name: "mainstreetwealth/calculators", desc: "Calculator components, shared across the hub." },
  { name: "mainstreetwealth/data", desc: "Open datasets: multiples, benchmarks, public comps." },
  { name: "mainstreetwealth/mcp", desc: "MCP server exposing M&A tools to AI agents." },
  { name: "mainstreetwealth/templates", desc: "Legal templates, LOIs, NDAs, closing checklists." },
  { name: "mainstreetwealth/evals", desc: "Benchmarks for AI on M&A tasks." },
];

export default function GithubPage() {
  return (
    <>
      <PageHeader
        eyebrow="Build with us"
        title="GitHub"
        description="Everything on this hub is open source. Clone it, self-host it, break it, improve it, send a PR."
        crumbs={[{ url: "/", name: "Open source" }, { name: "GitHub" }]}
        actions={
          <>
            <Link
              href="https://github.com/mainstreetwealth"
              className="btn-brand"
              target="_blank"
              rel="noreferrer"
            >
              Visit the GitHub org
            </Link>
            <Link href="/contribute" className="btn-secondary">
              Contributor guide
            </Link>
          </>
        }
      />
      <div className="container-page">
        <section>
          <h2 className="text-2xl font-bold text-ink">Clone and run</h2>
          <p className="mt-2 text-ink/70">
            Everything on this hub is a Next.js app. Clone, install, and run.
          </p>
          <pre className="mt-5 overflow-x-auto rounded-2xl border border-line bg-ink p-5 text-sm text-mint-200 shadow-card">
            {`git clone https://github.com/mainstreetwealth/open-source.git
cd open-source
npm install
npm run dev`}
          </pre>
          <p className="mt-3 text-xs text-ink/55">
            Node 20+ required. The repo also ships with a Docker Compose file for the dataset services.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-ink">Repositories</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {REPOS.map((repo) => (
              <Link
                key={repo.name}
                href={`https://github.com/${repo.name}`}
                target="_blank"
                rel="noreferrer"
                className="surface-card flex items-start gap-3 p-5 no-underline transition hover:border-violet-300 hover:shadow-pop"
              >
                <div className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-ink text-white">
                  <GithubIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-mono text-sm font-semibold text-ink">{repo.name}</h3>
                  <p className="mt-1 text-sm text-ink/65">{repo.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Install the MCP server</h3>
            <p className="mt-2 text-sm text-ink/65">
              Expose the open datasets and calculators to any MCP-compatible AI client.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-sunken p-4 text-sm">
              {`npx -y @mainstreetwealth/mcp@latest`}
            </pre>
          </div>
          <div className="surface-card p-6">
            <h3 className="text-lg font-semibold text-ink">Use the data API</h3>
            <p className="mt-2 text-sm text-ink/65">
              Fetch multiples, benchmarks, and comps straight from your terminal.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-sunken p-4 text-sm">
              {`curl https://opensource.mainstreetwealth.ai/api/multiples?trade=hvac`}
            </pre>
          </div>
        </section>

        <CTA
          eyebrow="Ship it"
          title="Found something to improve?"
          description="Open an issue or a PR on the hub repo. Small, scoped PRs get reviewed within a week."
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
