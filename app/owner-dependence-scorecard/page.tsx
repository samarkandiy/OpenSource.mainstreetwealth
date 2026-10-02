import { Scorecard, type Dimension } from "@/components/calculators/Scorecard";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["owner-dependence-scorecard"];

export const metadata = buildToolMetadata("owner-dependence-scorecard");

const DIMENSIONS: Dimension[] = [
  {
    id: "sales",
    label: "Sales & customer relationships",
    weight: 25,
    description: "Who the customer calls when something goes wrong.",
    questions: [
      { id: "s1", label: "Top 10 customers know and work with people other than the owner" },
      { id: "s2", label: "Sales process doesn't rely on the owner's personal network" },
      { id: "s3", label: "Named sales lead who closes without the owner" },
      { id: "s4", label: "Written pricing authority rules (not case-by-case by owner)" },
    ],
  },
  {
    id: "ops",
    label: "Operations",
    weight: 25,
    description: "Can the field run for a month without the owner?",
    questions: [
      { id: "o1", label: "Daily huddle happens whether owner is there or not" },
      { id: "o2", label: "Dispatch runs off the field software, not owner's phone" },
      { id: "o3", label: "KPIs reviewed weekly without the owner driving them" },
      { id: "o4", label: "Named ops lead with authority to make calls" },
    ],
  },
  {
    id: "finance",
    label: "Finance & admin",
    weight: 20,
    description: "Who writes the check and reads the P&L.",
    questions: [
      { id: "f1", label: "Controller or outside firm closes the books" },
      { id: "f2", label: "AR is run by someone other than the owner" },
      { id: "f3", label: "Approval limits exist and are honored" },
      { id: "f4", label: "Payroll runs without owner's involvement" },
    ],
  },
  {
    id: "institutional",
    label: "Institutional knowledge",
    weight: 15,
    description: "What lives only in the owner's head.",
    questions: [
      { id: "k1", label: "SOPs documented for all core workflows" },
      { id: "k2", label: "Key supplier and partner relationships co-owned by another leader" },
      { id: "k3", label: "Succession plan written for each key role" },
      { id: "k4", label: "Owner takes two consecutive weeks off every year" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    weight: 15,
    description: "Whose name is on the truck.",
    questions: [
      { id: "b1", label: "Brand name is the business name, not the owner's name" },
      { id: "b2", label: "Online reviews mention the company, not just the owner" },
      { id: "b3", label: "Marketing works without the owner's face" },
    ],
  },
];

export default function OwnerDependencePage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            Owner dependence is the single biggest driver of a discount at exit. The more a buyer thinks the business goes with you, the lower they'll pay. This scorecard shows where you still are the business.
          </p>
          <ul>
            <li>Score each question from "not at all" to "fully."</li>
            <li>Look at the per-dimension bars — those are your workstreams.</li>
            <li>Target 70+ before going to market.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>
            An owner-independence score from 0 to 100, with per-dimension breakdown. Pair with the <a className="link-arrow" href="/succession-planner">succession planner</a> to turn gaps into owners' names.
          </p>
        </>
      }
    >
      <Scorecard
        dimensions={DIMENSIONS}
        summaryLabel="Owner independence"
        verdicts={[
          { min: 0, max: 39, label: "Owner-dependent", color: "red", blurb: "The business goes with you today. Start a 12–18 month pre-sale program." },
          { min: 40, max: 59, label: "Transitioning", color: "amber", blurb: "You've named leaders. Give them real authority and reduce your hours." },
          { min: 60, max: 74, label: "Resilient", color: "violet", blurb: "A short earn-out should cover the transition. Clean up the last gaps." },
          { min: 75, max: 100, label: "Owner-independent", color: "mint", blurb: "Minimal transition risk. You should expect a cleaner process and a better multiple." },
        ]}
      />
    </ToolShell>
  );
}
