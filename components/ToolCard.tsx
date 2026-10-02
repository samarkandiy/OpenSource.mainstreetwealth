import Link from "next/link";
import { categoryAccent, categoryLabel, stageLabel, type Tool } from "@/lib/tools";

type ToolCardProps = {
  tool: Tool;
  variant?: "default" | "compact";
};

export function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const accent = categoryAccent(tool.category);
  const href = `/${tool.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-5 no-underline shadow-card transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-pop"
    >
      <div>
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
          <span className={`inline-flex items-center gap-1.5 ${accent === "violet" ? "text-violet-700" : "text-mint-800"}`}>
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                accent === "violet" ? "bg-violet-600" : "bg-mint-600"
              }`}
            />
            {categoryLabel(tool.category)}
          </span>
          <span className="text-ink/30">·</span>
          <span className="text-ink/50">#{tool.id}</span>
          {tool.status !== "live" ? (
            <span className="ml-auto rounded-full border border-line bg-surface-soft px-1.5 py-0.5 text-[10px] font-medium text-ink/60">
              {tool.status === "beta" ? "Beta" : "Planned"}
            </span>
          ) : (
            <span className="ml-auto rounded-full border border-mint-200 bg-mint-50 px-1.5 py-0.5 text-[10px] font-medium text-mint-800">
              Live
            </span>
          )}
        </div>

        <h3 className="mt-2.5 text-base font-semibold text-ink group-hover:text-violet-700">
          {tool.title}
        </h3>
        {variant === "default" ? (
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink/65">
            {tool.description}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between text-[11px] text-ink/50">
        <span>{stageLabel(tool.stage)}</span>
        <span className="inline-flex items-center gap-1 font-medium text-violet-700 opacity-0 transition group-hover:opacity-100">
          Open <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 10h10" />
      <path d="M10 5l5 5-5 5" />
    </svg>
  );
}
