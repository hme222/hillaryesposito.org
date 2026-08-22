import React, { useEffect, useRef, useState } from "react";
import { MSK_COPY, type MskCopy } from "../../data/mskCaseStudy";

type Copy = MskCopy["receipt"];

/**
 * Copy arrives as a prop so the same interaction runs in both languages.
 * The English default keeps existing callers (and the visual-echo test)
 * working without passing anything.
 */
export default function MSKFilingReceipt({ copy = MSK_COPY.en.receipt }: { copy?: Copy }) {
  const [step, setStep] = useState(0);
  const [hasRun, setHasRun] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  // A language switch mid-animation would leave the status line describing a
  // step from the other locale, so reset when the copy changes.
  useEffect(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setStep(0);
    setHasRun(false);
  }, [copy]);

  const runFiling = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setStep(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(4);
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
          <p className="rp-kicker">{copy.kicker}</p>
          <h2 id="msk-receipt-title">{copy.title}</h2>
          <p>{copy.body}</p>
          <button type="button" className="fp-proofControl" onClick={runFiling}>
            {hasRun ? copy.replay : copy.run} <span aria-hidden="true">→</span>
          </button>
          <p className="fp-proofStatus" aria-live="polite">
            {step === 0 ? copy.ready : copy.steps[step - 1]}
          </p>
        </div>

        <div className={`fp-receipt__trace step-${step}`} aria-hidden="true">
          <div className="fp-receipt__rail"><span /></div>
          <div className="fp-receipt__token">F</div>
          {copy.nodes.map((node, index) => (
            <div className={`fp-receipt__node${step > index ? " is-complete" : ""}`} key={node.n}>
              <span>{node.n}</span><b>{node.label}</b><small>{node.value}</small>
            </div>
          ))}
          <div className={`fp-receipt__paper${step === 4 ? " is-visible" : ""}`}>
            <span>{copy.paperLabel}</span>
            <b>{copy.paperValue}</b>
            <small>{copy.paperNote}</small>
          </div>
          <p className="fp-receipt__boundary">{copy.boundary}</p>
        </div>
      </div>
    </section>
  );
}
