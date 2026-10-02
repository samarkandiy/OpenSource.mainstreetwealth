import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "License & governance",
  description: "License, governance model, and code of conduct for the Main Street Wealth open source hub.",
  alternates: { canonical: "/license-governance" },
};

export default function LicensePage() {
  return (
    <>
      <PageHeader
        eyebrow="How we run this"
        title="License & governance"
        description="How the project is licensed, who makes decisions, and the rules of engagement."
        crumbs={[{ url: "/", name: "Open source" }, { name: "License & governance" }]}
      />
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <article className="prose-tool">
            <h2>License</h2>
            <p>
              Code in the hub is licensed under the MIT license. Datasets are published under the Open Data Commons Attribution License (ODC-BY). Legal templates (NDAs, LOIs, closing checklists, and the like) are released under Creative Commons CC-BY, with the standard "not legal advice" disclaimer attached.
            </p>
            <ul>
              <li><strong>Code — MIT.</strong> Do what you want. Keep the attribution.</li>
              <li><strong>Datasets — ODC-BY.</strong> Attribute Main Street Wealth and preserve source references.</li>
              <li><strong>Templates — CC-BY.</strong> Edit freely. Not a substitute for a lawyer.</li>
            </ul>

            <h2>Governance</h2>
            <p>
              A small core team at Main Street Wealth maintains the hub. Decisions on new tools, breaking changes, and dataset methodology happen in public, through RFCs on GitHub.
            </p>
            <ul>
              <li>Routine PRs are reviewed and merged by any maintainer.</li>
              <li>Breaking changes or new categories get an RFC with a 7-day comment window.</li>
              <li>Dataset methodology changes require a documented justification and version bump.</li>
            </ul>

            <h2>Code of conduct</h2>
            <p>
              We follow the Contributor Covenant. Be kind, assume good intent, and remember we're all here to help each other close better deals. Harassment, discrimination, or dishonesty will get you removed, no questions asked.
            </p>

            <h2>Trademark</h2>
            <p>
              "Main Street Wealth" and the Main Street Wealth logo are trademarks of Main Street Wealth. You can reference the project and link to it. Don't use the name or mark on a product or service that implies endorsement.
            </p>

            <h2>Disclaimer</h2>
            <p>
              Nothing in the hub is legal, tax, or financial advice. Tools help you think through a deal. They don't replace a licensed advisor. In particular, numbers on valuation, deal structure, and tax pages are for scenario planning only.
            </p>
          </article>
          <aside className="space-y-4">
            <div className="surface-card p-5 text-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                Quick links
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="link-arrow" href="https://opensource.org/licenses/MIT" target="_blank" rel="noreferrer">
                    MIT license
                  </a>
                </li>
                <li>
                  <a className="link-arrow" href="https://opendatacommons.org/licenses/by/" target="_blank" rel="noreferrer">
                    ODC-BY
                  </a>
                </li>
                <li>
                  <a className="link-arrow" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
                    CC-BY 4.0
                  </a>
                </li>
                <li>
                  <a className="link-arrow" href="https://www.contributor-covenant.org/" target="_blank" rel="noreferrer">
                    Contributor Covenant
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
