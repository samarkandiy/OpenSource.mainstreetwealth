import type { Metadata } from "next";
import { Suspense } from "react";
import { DirectoryClient } from "./DirectoryClient";
import { PageHeader } from "@/components/PageHeader";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Directory of open source M&A tools",
  description:
    "Searchable catalog of every open source tool in the Main Street Wealth hub. Filter by category, trade, and deal stage.",
};

export default function DirectoryPage() {
  const live = TOOLS.filter((t) => t.status === "live").length;
  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Directory"
        description="Every open source tool in the hub, searchable and filtered. Filter by category, trade, and deal stage."
        crumbs={[{ url: "/", name: "Open source" }, { name: "Directory" }]}
        badges={
          <>
            <span className="pill-mint">
              <span className="h-1.5 w-1.5 rounded-full bg-mint-600" />
              {live} live
            </span>
            <span className="pill">{TOOLS.length - live} planned</span>
            <span className="pill">{TOOLS.length} total</span>
          </>
        }
      />
      <div className="container-page">
        <Suspense fallback={<DirectoryFallback />}>
          <DirectoryClient />
        </Suspense>
      </div>
    </>
  );
}

function DirectoryFallback() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-2xl border border-line bg-surface-soft"
        />
      ))}
    </div>
  );
}
