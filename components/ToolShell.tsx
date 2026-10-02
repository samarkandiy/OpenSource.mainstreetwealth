import Link from "next/link";
import * as React from "react";
import type { Tool } from "@/lib/tools";
import {
  categoryLabel,
  stageLabel,
  tradeLabel,
  toolsInCategory,
} from "@/lib/tools";
import { CTA } from "./CTA";
import { PageHeader } from "./PageHeader";
import { AuthorByline } from "./AuthorByline";
import { MainstreetCounterpart } from "./MainstreetCounterpart";
import { MethodologyNote } from "./MethodologyNote";
import { FaqSection } from "./FaqSection";
import { RelatedContent } from "./RelatedContent";
import { TrustSignals } from "./TrustSignals";
import { JsonLd } from "./JsonLd";
import {
  SITE_URL,
  articleSchema,
  composeGraph,
  faqSchema,
  personSchema,
  softwareApplicationSchema,
} from "@/lib/schema";
import { authorsForTool } from "@/lib/authors";
import { toolSeo } from "@/lib/toolSeo";
import {
  counterpartTools,
  mainstreetUrl,
  relatedMainstreetLinks,
} from "@/lib/mainstreet";

type ToolShellProps = {
  tool: Tool;
  /** The interactive calculator or main body. */
  children: React.ReactNode;
  /** Optional short "How to use" narrative. */
  howToUse?: React.ReactNode;
  /** Optional short "What this returns" explanation. */
  outputs?: React.ReactNode;
};

/**
 * Common shell for every tool landing page. Carries the EEAT + SEO layer:
 * breadcrumbs, byline, methodology, FAQ, cross-links, trust signals, and
 * JSON-LD structured data for SoftwareApplication, Article, Person, and FAQPage.
 */
export function ToolShell({ tool, children, howToUse, outputs }: ToolShellProps) {
  const seo = toolSeo(tool.slug);
  const { author, reviewer } = authorsForTool([
    ...tool.keywords,
    tool.category,
    tool.slug,
  ]);
  const pageUrl = `${SITE_URL}/${tool.slug}`;
  const statusLabel =
    tool.status === "live" ? "Live" : tool.status === "beta" ? "Beta" : "Planned";

  // Related mainstreet links. We exclude the counterpart tools (already shown
  // in the top callout) so the "Related" grid isn't repetitive.
  const counterparts = counterpartTools(tool.slug);
  const relatedLinks = relatedMainstreetLinks({
    category: tool.category,
    trades: tool.trades,
    topics: tool.keywords,
    exclude: counterparts.map((c) => c.path),
    limit: 6,
  });

  // Related hub tools in the same category.
  const relatedHubTools = toolsInCategory(tool.category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 4);

  // JSON-LD @graph for the tool page.
  const graph: object[] = [personSchema(author)];
  if (reviewer.id !== author.id) graph.push(personSchema(reviewer));

  if (tool.interactive && tool.status === "live") {
    graph.push(
      softwareApplicationSchema({
        name: `${tool.title} · Main Street Wealth`,
        description: seo?.metaDescription ?? tool.about,
        url: pageUrl,
        author,
        reviewer,
        datePublished: seo?.publishedOn,
        dateModified: seo?.reviewedOn,
      })
    );
  } else {
    graph.push(
      articleSchema({
        headline: tool.title,
        description: seo?.metaDescription ?? tool.about,
        url: pageUrl,
        author,
        reviewer,
        datePublished: seo?.publishedOn,
        dateModified: seo?.reviewedOn,
      })
    );
  }

  if (seo?.faq?.length) graph.push(faqSchema(seo.faq));

  return (
    <>
      <PageHeader
        eyebrow={categoryLabel(tool.category)}
        title={tool.title}
        description={tool.about}
        crumbs={[
          { name: "Open source", url: "/" },
          { name: "Directory", url: "/directory" },
          { name: tool.title },
        ]}
        badges={
          <>
            <span className={tool.status === "live" ? "pill-mint" : "pill"}>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  tool.status === "live" ? "bg-mint-600" : "bg-ink/40"
                }`}
              />
              {statusLabel}
            </span>
            <span className="pill-violet">{stageLabel(tool.stage)}</span>
            {tool.trades?.map((trade) =>
              trade === "all-trades" ? null : (
                <span key={trade} className="pill">
                  {tradeLabel(trade)}
                </span>
              )
            )}
            {tool.advisoryDisclaimer ? (
              <span className="pill">Not legal, tax, or financial advice</span>
            ) : null}
          </>
        }
        belowTitle={
          <AuthorByline
            author={author}
            reviewer={reviewer}
            publishedOn={seo?.publishedOn}
            reviewedOn={seo?.reviewedOn}
          />
        }
      />

      <div className="container-page">
        <article>
          <MainstreetCounterpart hubSlug={tool.slug} />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              {children}

              {howToUse ? (
                <section className="prose-tool mt-14" aria-labelledby="how-to-use-title">
                  <h2 id="how-to-use-title">How to use it</h2>
                  {howToUse}
                </section>
              ) : null}
              {outputs ? (
                <section className="prose-tool mt-10" aria-labelledby="outputs-title">
                  <h2 id="outputs-title">What it returns</h2>
                  {outputs}
                </section>
              ) : null}

              {seo?.methodology ? (
                <MethodologyNote html={seo.methodology} sources={seo.sources} />
              ) : null}

              {seo?.seeAlso?.length ? (
                <section className="mt-10 rounded-2xl border border-line bg-surface-soft p-5 sm:p-6">
                  <h3 className="text-sm font-semibold text-ink">
                    See also on mainstreetwealth.ai
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink/75">
                    {seo.seeAlso.map((s) => (
                      <li key={s.path}>
                        <Link
                          href={mainstreetUrl(s.path)}
                          target="_blank"
                          rel="noreferrer"
                          className="link-arrow"
                        >
                          {s.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {tool.advisoryDisclaimer ? (
                <aside
                  className="mt-10 rounded-2xl border border-line bg-surface-soft p-5 text-sm text-ink/70"
                  aria-label="Advisory disclaimer"
                >
                  <strong className="font-semibold text-ink">A note on this tool.</strong>{" "}
                  Numbers coming out of this calculator are for scenario planning, not legal, tax, or financial advice. Before you act on a specific deal, talk to a licensed M&amp;A advisor, CPA, and attorney. For a confidential conversation,{" "}
                  <Link
                    href={mainstreetUrl("/contact")}
                    target="_blank"
                    rel="noreferrer"
                    className="link-arrow"
                  >
                    get in touch with Main Street Wealth
                  </Link>
                  .
                </aside>
              ) : null}

              {seo?.faq?.length ? (
                <FaqSection items={seo.faq} omitSchema />
              ) : null}

              {relatedLinks.length ? (
                <RelatedContent items={relatedLinks} />
              ) : null}

              {relatedHubTools.length ? (
                <section className="mt-14">
                  <div className="section-title-eyebrow">Keep going</div>
                  <h2 className="mt-2 text-2xl font-bold text-ink">
                    More tools in {categoryLabel(tool.category).toLowerCase()}
                  </h2>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {relatedHubTools.map((t) => (
                      <Link
                        key={t.id}
                        href={`/${t.slug}`}
                        className="group flex items-start gap-3 rounded-xl border border-line bg-white p-4 no-underline shadow-card transition hover:border-violet-300 hover:shadow-pop"
                      >
                        <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-surface-muted text-[11px] font-semibold text-ink/70">
                          #{t.id}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-ink group-hover:text-violet-700">
                              {t.title}
                            </h3>
                            {t.status === "live" ? (
                              <span className="rounded-full border border-mint-200 bg-mint-50 px-1.5 py-0.5 text-[10px] font-medium text-mint-800">
                                Live
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-ink/60">
                            {t.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-col gap-4">
                <div className="surface-card p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Tool details
                  </h4>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-ink/55">Category</dt>
                      <dd className="text-right text-ink">{categoryLabel(tool.category)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-ink/55">Deal stage</dt>
                      <dd className="text-right text-ink">{stageLabel(tool.stage)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-ink/55">Status</dt>
                      <dd className="text-right text-ink">{statusLabel}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-ink/55">ID</dt>
                      <dd className="text-right font-mono text-ink">#{tool.id}</dd>
                    </div>
                  </dl>
                </div>

                <div className="surface-card p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Author
                  </h4>
                  <div className="mt-3 flex items-start gap-3">
                    <span
                      className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-bold text-white"
                      style={{ background: author.avatarGradient }}
                      aria-hidden="true"
                    >
                      {author.initials}
                    </span>
                    <div className="min-w-0 text-sm">
                      <Link
                        href={author.url}
                        className="font-semibold text-ink no-underline hover:text-violet-700"
                      >
                        {author.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-ink/60">{author.role}</p>
                      <p className="mt-2 text-xs leading-relaxed text-ink/70">
                        {author.shortBio}
                      </p>
                      {author.socials.length ? (
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                          {author.socials.map((s) => (
                            <a
                              key={s.href}
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              className="link-arrow"
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {reviewer.id !== author.id ? (
                    <div className="mt-4 border-t border-line pt-4 text-xs text-ink/70">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-ink/50">
                        Reviewed by
                      </span>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ background: reviewer.avatarGradient }}
                          aria-hidden="true"
                        >
                          {reviewer.initials}
                        </span>
                        <Link
                          href={reviewer.url}
                          className="font-medium text-ink no-underline hover:text-violet-700"
                        >
                          {reviewer.name}
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>

                <TrustSignals />

                <div className="surface-card p-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink/60">
                    Help build it
                  </h4>
                  <p className="mt-2 text-xs text-ink/60">
                    Everything lives on GitHub. PRs welcome.
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    <Link href="/github" className="btn-secondary justify-center text-xs">
                      View on GitHub
                    </Link>
                    <Link href="/request-a-tool" className="btn-ghost justify-center text-xs">
                      Request a change
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <CTA />
        </article>

        <JsonLd data={composeGraph(graph)} id={`ld-${tool.slug || "root"}`} />
      </div>
    </>
  );
}
