import { EbitdaCalculator } from "@/components/calculators/EbitdaCalculator";
import { ToolShell } from "@/components/ToolShell";
import { TOOL_BY_SLUG } from "@/lib/tools";
import { buildToolMetadata } from "@/lib/metadata";

const tool = TOOL_BY_SLUG["ebitda-calculator"];

export const metadata = buildToolMetadata("ebitda-calculator");

export default function EbitdaCalculatorPage() {
  return (
    <ToolShell
      tool={tool}
      howToUse={
        <>
          <p>
            EBITDA is Earnings Before Interest, Taxes, Depreciation, and Amortization. You get there by taking net income from the P&amp;L and adding back the four items above the line.
          </p>
          <ul>
            <li>
              <strong>Use the trailing twelve months.</strong> Not calendar year, not budget. Most buyers price off LTM.
            </li>
            <li>
              <strong>Pull interest and taxes from the P&amp;L.</strong> Don't net anything.
            </li>
            <li>
              <strong>Separate D from A.</strong> Depreciation is for tangible assets; amortization is usually for acquired intangibles.
            </li>
            <li>
              <strong>If you're owner-operated, you probably want SDE.</strong> Add owner compensation back and run the <a href="/sde-calculator" className="link-arrow">SDE calculator</a>.
            </li>
          </ul>
        </>
      }
      outputs={
        <>
          <p>Three outputs:</p>
          <ul>
            <li>Your EBITDA number and the margin it implies on revenue.</li>
            <li>A build-up so a buyer or lender can see how you got there.</li>
            <li>A low / mid / high value range using typical home-services multiples. Narrow it with the <a href="/valuation-multiples-lookup" className="link-arrow">multiples lookup</a> and your actual trade.</li>
          </ul>
          <p>
            The number here is unadjusted. If you've got owner compensation, personal expenses, or one-time items in the P&amp;L, run them through the <a href="/adjusted-ebitda-addbacks" className="link-arrow">adjusted EBITDA tool</a> next.
          </p>
        </>
      }
    >
      <EbitdaCalculator />
    </ToolShell>
  );
}
