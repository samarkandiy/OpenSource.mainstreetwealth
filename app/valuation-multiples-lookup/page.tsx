import { MultiplesLookup } from "@/components/calculators/MultiplesLookup";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["valuation-multiples-lookup"];

export const metadata = buildToolMetadata("valuation-multiples-lookup");

export default function MultiplesLookupPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            Pick the trade and plug in adjusted EBITDA. The table highlights the size band you're in and shows the typical low/mid/high EBITDA multiple we see for comparable transactions.
          </p>
          <ul>
            <li>Multiples are <strong>indicative</strong>, not guarantees. Expect a buyer to work them down for risk.</li>
            <li>Numbers climb with size, recurring revenue, and systems maturity.</li>
            <li>They fall with customer concentration, owner centrality, and swings in LTM.</li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>A trade-specific multiple band with sample size, and the implied enterprise value range.</p>
        </>
      }
    >
      <MultiplesLookup />
    </ToolShell>
  );
}
