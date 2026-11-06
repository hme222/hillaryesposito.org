import React, { useMemo } from "react";
import MSKDashboardMockup from "../MSKDashboardMockup";
import { MSK_COPY, type MskCopy } from "../../data/mskCaseStudy";

type Copy = MskCopy["receipt"];
type DashboardCopy = MskCopy["dashboard"];

// Index into `dashboard.rows` (data/mskCaseStudy.ts): row 0 is a patient
// message waiting with "Ready to send". The run/replay button and the
// ready-to-filed animation were removed at the owner's direction, so the
// section now shows that one waiting row.
const READY_INDEX = 0;

/**
 * Copy arrives as a prop so the same interaction runs in both languages.
 * The English default keeps existing callers (and the visual-echo test)
 * working without passing anything.
 */
/**
 * @status: stable
 * @purpose: The MSK case study's opening brief: a headline and one real queue row (via MSKDashboardMockup) showing a patient message "Ready to send"; localizable via the `copy` and `dashboardCopy` props; used on the MSK case study page. Pick this for the one-row brief — for the literal dashboard recreation use MSKDashboardMockup, for a static before/after diagram use MSKMechanism.
 */
export default function MSKFilingReceipt({
  copy = MSK_COPY.en.receipt,
  dashboardCopy = MSK_COPY.en.dashboard,
}: {
  copy?: Copy;
  /** The queue copy in the same language as `copy`. */
  dashboardCopy?: DashboardCopy;
}) {
  // One row: the waiting message.
  const queueCopy = useMemo<DashboardCopy>(
    () => ({ ...dashboardCopy, rows: [dashboardCopy.rows[READY_INDEX]] }),
    [dashboardCopy],
  );

  return (
    <section className="fp-receipt" id="msk-brief" data-language-anchor="msk-brief" aria-labelledby="msk-receipt-title">
      <div className="rp-wrap fp-receipt__layout">
        <div className="fp-receipt__copy">
          <h2 id="msk-receipt-title">
            <span className="fp-receipt__titleLine">{copy.titleLines[0]}</span>{" "}
            <span className="fp-receipt__titleLine">{copy.titleLines[1]}</span>
          </h2>
          <p>{copy.body}</p>
        </div>

        <div className="fp-receipt__queue step-0">
          <MSKDashboardMockup
            compact
            condensedHeader
            hideToolbar
            hideRule
            hideEyebrow
            legendDisclosure
            rowIndices={[0]}
            activeRow={0}
            copy={queueCopy}
          />
          <p className="fp-receipt__stepLine">{copy.ready}</p>
          <p className="fp-receipt__boundary">{copy.boundary}</p>
        </div>
      </div>
    </section>
  );
}
