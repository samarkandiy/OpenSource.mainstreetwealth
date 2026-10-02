import { AddbackBuilder } from "@/components/calculators/AddbackBuilder";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["adjusted-ebitda-addbacks"];

export const metadata = buildToolMetadata("adjusted-ebitda-addbacks");

export default function AdjustedEbitdaAddbacksPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            Build the add-back schedule a buy-side QoE will actually accept. Each add-back has its own documentation checklist. Check the box when you've got the supporting document saved in the data room.
          </p>
          <ul>
            <li><strong>Owner compensation and perks</strong> are the biggest add-back for most trades.</li>
            <li><strong>Related-party items</strong> get normalized to market, not just removed.</li>
            <li><strong>One-time items</strong> need a dated event, not a trend.</li>
            <li><strong>Non-cash and normalization</strong> adjustments usually require a QoE memo.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>
            Adjusted EBITDA, total add-backs, a per-category subtotal, and a documentation score. A score below 70% usually gets challenged in diligence.
          </p>
        </>
      }
    >
      <AddbackBuilder />
    </ToolShell>
  );
}
