import React from "react";
import { MSK_COPY, type MskCopy } from "../../data/mskCaseStudy";

type Copy = MskCopy["receipt"];

// The one-row queue screen that sat beside this copy was retired on
// 2026-11-15: Lex said the recreated queue "looks vibe-codeable", and Hillary
// chose the journey picture (hero, and the After path in "One button, four
// rules") to carry the change instead. This section is now the problem in words.

/**
 * @status: stable
 * @purpose: The MSK case study's problem section on a dark band: a two-line headline and the plain problem paragraph (who it hurt and why it mattered), no artifact; localizable via the `copy` prop; used on the MSK case study page. Pick this for the MSK problem statement — for the picture of the change use MSKJourney, for the literal queue screen use MSKDashboardMockup.
 */
export default function MSKFilingReceipt({ copy = MSK_COPY.en.receipt, kicker }: {
  copy?: Copy;
  /** The chapter's name, shown as the eyebrow above the heading. */
  kicker?: string;
}) {
  return (
    <section className="fp-receipt" id="msk-brief" data-language-anchor="msk-brief" aria-labelledby="msk-receipt-title">
      <div className="rp-wrap fp-receipt__layout fp-receipt__layout--text">
        <div className="fp-receipt__copy">
          {kicker && <p className="rp-kicker">{kicker}</p>}
          <h2 id="msk-receipt-title">
            <span className="fp-receipt__titleLine">{copy.titleLines[0]}</span>{" "}
            <span className="fp-receipt__titleLine">{copy.titleLines[1]}</span>
          </h2>
          <p>{copy.body}</p>
        </div>
      </div>
    </section>
  );
}
