import React, { useEffect, useMemo, useRef, useState } from "react";
import MSKDashboardMockup from "../MSKDashboardMockup";
import { MSK_COPY, type MskCopy } from "../../data/mskCaseStudy";

type Copy = MskCopy["receipt"];
type DashboardCopy = MskCopy["dashboard"];

// Indices into `dashboard.rows` (data/mskCaseStudy.ts): row 0 is a patient
// message waiting with "Ready to send"; row 4 is the queue's filed state,
// "In the chart". The demo files row 0, so the filed row borrows row 4's
// status, route, and action but keeps row 0's patient and message. Otherwise
// the masked MRN would change mid-demo and read as a different patient.
const READY_INDEX = 0;
const FILED_INDEX = 4;

/**
 * Copy arrives as a prop so the same interaction runs in both languages.
 * The English default keeps existing callers (and the visual-echo test)
 * working without passing anything.
 */
/**
 * @status: stable
 * @purpose: Animated, step-by-step "filing receipt" interaction demonstrating the MSK filing workflow, ending in one real queue row (via MSKDashboardMockup) that flips from "Ready to send" to "In the chart"; localizable via the `copy` and `dashboardCopy` props; used on the MSK case study page. Pick this for an animated walkthrough — for the literal dashboard recreation use MSKDashboardMockup, for a static before/after diagram use MSKMechanism.
 */
export default function MSKFilingReceipt({
  copy = MSK_COPY.en.receipt,
  dashboardCopy = MSK_COPY.en.dashboard,
}: {
  copy?: Copy;
  /** The queue copy in the same language as `copy`. */
  dashboardCopy?: DashboardCopy;
}) {
  const [step, setStep] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches || timers.current.length === 0) return;
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      setStep(copy.steps.length);
      setHasRun(true);
    };

    query.addEventListener?.("change", handleChange);
    return () => query.removeEventListener?.("change", handleChange);
  }, [copy.steps.length]);

  // A language switch mid-animation would leave the status line describing a
  // step from the other locale, so reset when the copy changes.
  useEffect(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setStep(0);
    setHasRun(false);
  }, [copy]);

  // Two rows: the waiting message, then the same message once filed.
  const queueCopy = useMemo<DashboardCopy>(() => {
    const ready = dashboardCopy.rows[READY_INDEX];
    const filed = dashboardCopy.rows[FILED_INDEX];
    return {
      ...dashboardCopy,
      rows: [ready, { ...ready, status: filed.status, slug: filed.slug, routed: filed.routed, action: filed.action }],
    };
  }, [dashboardCopy]);
  const isFiled = step === copy.steps.length;

  const runFiling = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setStep(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(copy.steps.length);
      setHasRun(true);
      return;
    }

    copy.steps.forEach((_, index) => {
      timers.current.push(window.setTimeout(() => {
        setStep(index + 1);
        if (index === copy.steps.length - 1) setHasRun(true);
      }, 280 + index * 720));
    });
  };

  return (
    <section className="fp-receipt" id="msk-brief" data-language-anchor="msk-brief" aria-labelledby="msk-receipt-title">
      <div className="rp-wrap fp-receipt__layout">
        <div className="fp-receipt__copy">
          <h2 id="msk-receipt-title">
            <span className="fp-receipt__titleLine">{copy.titleLines[0]}</span>{" "}
            <span className="fp-receipt__titleLine">{copy.titleLines[1]}</span>
          </h2>
          <p>{copy.body}</p>
          <button type="button" className="fp-proofControl" onClick={runFiling}>
            {hasRun ? copy.replay : copy.run} <span aria-hidden="true">→</span>
          </button>
          <p className="fp-proofStatus" aria-live="polite">
            {step === 0 ? copy.ready : copy.steps[step - 1]}
          </p>
        </div>

        {/* The demo ends where the real work ended: the same queue row, now
            filed (2026-10-15, call 5). The table stays readable to assistive
            tech; the polite status line above announces each step. */}
        <div className={`fp-receipt__queue step-${step}${isFiled ? " is-filed" : ""}`}>
          <MSKDashboardMockup
            compact
            condensedHeader
            hideToolbar
            hideRule
            hideEyebrow
            legendDisclosure
            rowIndices={[isFiled ? 1 : 0]}
            activeRow={0}
            copy={queueCopy}
          />
          <p className="fp-receipt__stepLine" aria-hidden="true">
            {step === 0 ? copy.ready : copy.steps[step - 1]}
          </p>
          <p className="fp-receipt__boundary">{copy.boundary}</p>
        </div>
      </div>
    </section>
  );
}
