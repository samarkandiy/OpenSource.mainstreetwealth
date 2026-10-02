import { SdeCalculator } from "@/components/calculators/SdeCalculator";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["sde-calculator"];

export const metadata = buildToolMetadata("sde-calculator");

export default function SdeCalculatorPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            SDE is the number buyers use for owner-operated businesses — usually under about $2M in EBITDA. It takes EBITDA and adds back the pay and perks the current owner takes out, since a new owner would set those at a different level.
          </p>
          <ul>
            <li>
              <strong>Only add back one owner's compensation.</strong> If there are two active owners, keep the second as a replacement expense.
            </li>
            <li>
              <strong>Document every personal expense add-back.</strong> If you can't tie it to a bank statement or receipt, don't add it back.
            </li>
            <li>
              <strong>One-time items get add-backs; one-time trends don't.</strong> A legal settlement is one-time. A spike in advertising isn't.
            </li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>SDE, the margin it implies on revenue, and a value range using typical small-deal SDE multiples. Multiples usually land between 2× and 3.5× — larger, cleaner, more systems-driven businesses sit higher in the band.</p>
          <p>
            If adjusted EBITDA is north of ~$2M, flip to the <a href="/ebitda-calculator" className="link-arrow">EBITDA calculator</a> instead. Buyers at that size price on EBITDA, not SDE.
          </p>
        </>
      }
    >
      <SdeCalculator />
    </ToolShell>
  );
}
