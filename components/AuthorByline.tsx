import Link from "next/link";
import * as React from "react";
import type { Author } from "@/lib/authors";

type AuthorBylineProps = {
  author: Author;
  reviewer?: Author;
  publishedOn?: string;
  reviewedOn?: string;
  compact?: boolean;
};

/**
 * EEAT byline for tool pages. Shows the author and (where relevant) the
 * expert reviewer, plus publish and review dates with proper <time> elements.
 */
export function AuthorByline({
  author,
  reviewer,
  publishedOn,
  reviewedOn,
  compact,
}: AuthorBylineProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${
        compact ? "text-xs" : "text-sm"
      } text-ink/70`}
    >
      <AuthorChip author={author} role="Written by" compact={compact} />
      {reviewer && reviewer.id !== author.id ? (
        <AuthorChip author={reviewer} role="Reviewed by" compact={compact} />
      ) : null}
      {publishedOn || reviewedOn ? (
        <div className="flex items-center gap-x-3 gap-y-1 text-xs text-ink/55">
          {publishedOn ? (
            <span>
              Published{" "}
              <time dateTime={publishedOn}>{formatDate(publishedOn)}</time>
            </span>
          ) : null}
          {reviewedOn ? (
            <span>
              Reviewed{" "}
              <time dateTime={reviewedOn}>{formatDate(reviewedOn)}</time>
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function AuthorChip({
  author,
  role,
  compact,
}: {
  author: Author;
  role: string;
  compact?: boolean;
}) {
  const size = compact ? "h-6 w-6 text-[10px]" : "h-8 w-8 text-xs";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center justify-center rounded-full font-bold text-white ${size}`}
        style={{ background: author.avatarGradient }}
        aria-hidden="true"
      >
        {author.initials}
      </span>
      <div className="leading-tight">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-ink/50">
          {role}
        </div>
        <div>
          <Link
            href={author.url}
            className="font-medium text-ink no-underline hover:text-violet-700"
          >
            {author.name}
          </Link>
          <span className="hidden text-ink/55 sm:inline">
            {" "}
            · {author.role.split(",")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return iso;
  }
}
