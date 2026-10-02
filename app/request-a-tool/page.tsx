import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RequestForm } from "./RequestForm";

export const metadata: Metadata = {
  title: "Request a tool",
  description: "Tell us what to build next in the Main Street Wealth open source hub. We review and prioritize weekly.",
  alternates: { canonical: "/request-a-tool" },
};

export default function RequestToolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tell us what to build"
        title="Request a tool"
        description="If something's missing, say so. We review every request weekly and either add it to the roadmap or explain why not."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Request a tool" }]}
      />
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <RequestForm />
          <aside className="space-y-5">
            <div className="surface-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                What makes a great request
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/70">
                <li>• A specific job to be done, not a vague ask.</li>
                <li>• Who it's for (seller, buyer, advisor, operator).</li>
                <li>• A rough sketch of inputs and outputs.</li>
                <li>• An example or two.</li>
              </ul>
            </div>
            <div className="surface-card p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                What happens next
              </h3>
              <ol className="mt-3 space-y-2 text-sm text-ink/70">
                <li>1. We confirm receipt within 48 hours.</li>
                <li>2. If it fits the scope, it lands on the roadmap for voting.</li>
                <li>3. If not, we'll tell you why — and often suggest where else to look.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
