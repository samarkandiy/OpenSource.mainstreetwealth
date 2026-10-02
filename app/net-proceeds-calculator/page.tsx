import { NetProceedsCalculator } from "@/components/calculators/NetProceedsCalculator";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["net-proceeds-calculator"];

export const metadata = buildToolMetadata("net-proceeds-calculator");

export default function NetProceedsPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            Enterprise value and net-to-seller are two different numbers. This tool walks the price down through debt, rollover, fees, and tax to the dollars that actually land in your account.
          </p>
          <ul>
            <li>Model asset vs. stock sale: stock sales usually reduce recapture.</li>
            <li>Separate escrow from net-at-close — that money comes later, if ever.</li>
            <li>Pair with <a className="link-arrow" href="/rollover-equity-calculator">rollover equity</a> for the second-bite story.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>
            A line-by-line waterfall from enterprise value to net cash at close, with the effective tax rate on the gain.
          </p>
        </>
      }
    >
      <NetProceedsCalculator />
    </ToolShell>
  );
}
