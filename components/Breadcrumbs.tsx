import Link from "next/link";
import * as React from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, composeGraph, type BreadcrumbItem } from "@/lib/schema";

type Crumb = BreadcrumbItem;

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-ink/55"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((c, i) => (
            <li key={`${c.name}-${i}`} className="flex items-center gap-1.5">
              {c.url ? (
                <Link href={c.url} className="no-underline hover:text-ink">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink/80">
                  {c.name}
                </span>
              )}
              {i < items.length - 1 ? (
                <span aria-hidden="true" className="text-ink/30">
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={composeGraph([breadcrumbSchema(items)])} />
    </>
  );
}
