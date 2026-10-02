import { RolloverEquityCalculator } from "@/components/calculators/RolloverEquityCalculator";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["rollover-equity-calculator"];

export const metadata = buildToolMetadata("rollover-equity-calculator");

export default function RolloverEquityPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            Rollover equity is the share of the deal you keep in the new company. The pitch is simple: smaller first bite, bigger second bite. This tool lets you pressure-test the second bite.
          </p>
          <ul>
            <li>Pick the enterprise value, how much you'd roll, and today's EBITDA and multiple.</li>
            <li>Dial in the growth rate and multiple change you believe for the hold.</li>
            <li>Compare the all-cash deal to cash-plus-rollover.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>
            Cash at close, the implied exit value, and the proceeds on your rolled piece. Plus MOIC and IRR on the rollover alone.
          </p>
        </>
      }
    >
      <RolloverEquityCalculator />
    </ToolShell>
  );
}
