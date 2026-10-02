import * as React from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { BreadcrumbItem } from "@/lib/schema";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Pass BreadcrumbItem[]; emits visual breadcrumbs + JSON-LD. */
  crumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badges?: React.ReactNode;
  /** Below the H1, append arbitrary content (e.g. author byline). */
  belowTitle?: React.ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  actions,
  badges,
  belowTitle,
}: PageHeaderProps) {
  return (
    <section className="relative pt-10 pb-8 sm:pt-14 sm:pb-10">
      <div className="container-page">
        {crumbs?.length ? <Breadcrumbs items={crumbs} /> : null}
        {eyebrow ? <div className="section-title-eyebrow mb-3">{eyebrow}</div> : null}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-display-md text-balance sm:text-display-lg">{title}</h1>
            {description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
                {description}
              </p>
            ) : null}
            {badges ? <div className="mt-5 flex flex-wrap gap-2">{badges}</div> : null}
            {belowTitle ? <div className="mt-6">{belowTitle}</div> : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
