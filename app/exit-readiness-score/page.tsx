import { Scorecard, type Dimension } from "@/components/calculators/Scorecard";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["exit-readiness-score"];

export const metadata = buildToolMetadata("exit-readiness-score");

const DIMENSIONS: Dimension[] = [
  {
    id: "financials",
    label: "Financial clarity",
    weight: 25,
    description: "Can a buyer trust the numbers in a week?",
    questions: [
      { id: "f1", label: "Monthly close within 15 days of month-end", hint: "A 45-day close is a buyer red flag." },
      { id: "f2", label: "Reviewed or audited financials for the last three years" },
      { id: "f3", label: "Clean separation between business and personal expenses" },
      { id: "f4", label: "GAAP-adjacent accrual accounting (not pure cash)" },
      { id: "f5", label: "Backup for every material add-back saved and tagged" },
    ],
  },
  {
    id: "people",
    label: "People & systems",
    weight: 20,
    description: "Does the business run without the owner in the field?",
    questions: [
      { id: "p1", label: "Named #2 who can run the day-to-day" },
      { id: "p2", label: "Written SOPs for the core workflows" },
      { id: "p3", label: "Field software of record (ServiceTitan / Jobber / Housecall Pro)" },
      { id: "p4", label: "Tenured, bonded, and licensed technicians across the roster" },
      { id: "p5", label: "Documented hiring and training process" },
    ],
  },
  {
    id: "customers",
    label: "Customer mix",
    weight: 15,
    description: "The quality and diversity of revenue.",
    questions: [
      { id: "c1", label: "Top customer is less than 10% of revenue" },
      { id: "c2", label: "Top-5 is less than 25% of revenue" },
      { id: "c3", label: "Recurring revenue (memberships, maintenance) above 25%" },
      { id: "c4", label: "Online reviews score at or above the trade average" },
    ],
  },
  {
    id: "growth",
    label: "Growth story",
    weight: 15,
    description: "The next buyer wants to see where the next multiple of growth comes from.",
    questions: [
      { id: "g1", label: "Three-year revenue CAGR at or above trade average" },
      { id: "g2", label: "Written, defensible growth plan for the next 24 months" },
      { id: "g3", label: "Pricing has moved with (or above) inflation" },
      { id: "g4", label: "Clear territory or service-line expansion opportunity" },
    ],
  },
  {
    id: "risk",
    label: "Legal, licensing, and risk",
    weight: 15,
    description: "What a buyer's lawyer will ask about.",
    questions: [
      { id: "r1", label: "Licensing is current in every state you operate in" },
      { id: "r2", label: "No active litigation of material size" },
      { id: "r3", label: "Insurance is current and adequate for the trade" },
      { id: "r4", label: "No single-vendor dependencies in equipment or software" },
    ],
  },
  {
    id: "owner",
    label: "Owner dependence",
    weight: 10,
    description: "Short version. For the full picture, see the owner dependence scorecard.",
    questions: [
      { id: "o1", label: "Owner works less than 30 hours per week" },
      { id: "o2", label: "Owner is out of sales and dispatch day-to-day" },
      { id: "o3", label: "Business runs smoothly during owner's 2-week vacation" },
    ],
  },
];

export default function ExitReadinessPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            Answer each item honestly. The score is weighted across six dimensions. A score above 75 usually means you're close to going to market; below 50 means you have real work to do first.
          </p>
          <ul>
            <li>Takes about 5 minutes.</li>
            <li>Score updates as you go.</li>
            <li>Follow up with the <a className="link-arrow" href="/owner-dependence-scorecard">owner dependence scorecard</a>.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>
            A 0–100 readiness score, with per-dimension breakdowns so you can see where to invest the next 12 months.
          </p>
        </>
      }
    >
      <Scorecard
        dimensions={DIMENSIONS}
        summaryLabel="Exit readiness score"
        verdicts={[
          { min: 0, max: 39, label: "Not ready", color: "red", blurb: "Significant work needed. Start with financial clarity and owner dependence." },
          { min: 40, max: 59, label: "Early days", color: "amber", blurb: "The outline is there. Pick the two weakest dimensions and run a pre-sale year." },
          { min: 60, max: 74, label: "Within range", color: "violet", blurb: "A buyer would engage. Tighten the one or two weak dimensions and go to market." },
          { min: 75, max: 100, label: "Sale-ready", color: "mint", blurb: "You're buyer-ready. Pick advisors and start the process." },
        ]}
      />
    </ToolShell>
  );
}
