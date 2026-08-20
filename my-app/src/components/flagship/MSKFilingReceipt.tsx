import React, { useEffect, useRef, useState } from "react";

const STEPS = ["Queue opened", "Role confirmed", "Filed to the online chart", "Returned with status updated"];

export default function MSKFilingReceipt() {
  const [step, setStep] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const runFiling = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setStep(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(4);
      setHasRun(true);
      return;
    }

    STEPS.forEach((_, index) => {
      timers.current.push(window.setTimeout(() => {
        setStep(index + 1);
        if (index === STEPS.length - 1) setHasRun(true);
      }, 280 + index * 720));
    });
  };

  return (
    <section className="fp-receipt" id="msk-brief" data-language-anchor="msk-brief" aria-labelledby="msk-receipt-title">
      <div className="rp-wrap fp-receipt__layout">
        <div className="fp-receipt__copy">
          <p className="rp-kicker">It started with a workaround</p>
          <h2 id="msk-receipt-title">The digital workflow had become a paper ritual.</h2>
          <p>
            Every clinical day runs through the EMR—the electronic medical record where a patient’s
            history lives. The online queue kept the filing on screen and returned with its status updated.
          </p>
          <button type="button" className="fp-proofControl" onClick={runFiling}>
            {hasRun ? "Replay the online path" : "Run the online path"} <span aria-hidden="true">→</span>
          </button>
          <p className="fp-proofStatus" aria-live="polite">
            {step === 0 ? "Ready to file." : STEPS[step - 1]}
          </p>
        </div>

        <div className={`fp-receipt__trace step-${step}`} aria-hidden="true">
          <div className="fp-receipt__rail"><span /></div>
          <div className="fp-receipt__token">F</div>
          {[
            ["01", "Queue", "Worklist ready"],
            ["02", "File action", "Role confirmed"],
            ["03", "Online chart", "Filed"],
            ["04", "Return", "Status updated"],
          ].map(([number, label, value], index) => (
            <div className={`fp-receipt__node${step > index ? " is-complete" : ""}`} key={number}>
              <span>{number}</span><b>{label}</b><small>{value}</small>
            </div>
          ))}
          <div className={`fp-receipt__paper${step === 4 ? " is-visible" : ""}`}>
            <span>QUEUE STATUS</span>
            <b>FILED</b>
            <small>Returned to dashboard · status updated</small>
          </div>
          <p className="fp-receipt__boundary">Recreated interaction · no patient data</p>
        </div>
      </div>
    </section>
  );
}
