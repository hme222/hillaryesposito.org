import React, { ReactNode, useEffect, useRef, useState } from "react";

export type DecisionStep = {
  n: string;
  title: string;
  body: string;
  note: string;
};

type Props = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  steps: DecisionStep[];
  visual: ReactNode;
};

export default function DecisionStory({ id, kicker, title, intro, steps, visual }: Props) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  // Which step is "current" is decided by geometry rather than by whichever
  // element happens to intersect a narrow band most. The band approach depended
  // on each step being comfortably taller than the band: shorten the steps and
  // a step can pass through without ever winning, so its decision-log note never
  // appears. Picking the step nearest a fixed reading line always yields exactly
  // one active step, at any step height.
  useEffect(() => {
    const readingLine = () => window.innerHeight * 0.4;
    const pick = () => {
      const line = readingLine();
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((node, index) => {
        if (!node) return;
        const r = node.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - line);
        if (dist < bestDist) { bestDist = dist; best = index; }
      });
      setActive(best);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => { frame = 0; pick(); });
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="rp-decisionStory" id={id} aria-labelledby={`${id}-title`}>
      <div className="rp-wrap">
        <div className="rp-decisionStory__head">
          <p className="rp-kicker">{kicker}</p>
          <h2 id={`${id}-title`} className="rp-title">{title}</h2>
          <p className="rp-lede">{intro}</p>
        </div>
        <div className="rp-decisionStory__grid">
          <div className="rp-decisionStory__visual" aria-hidden="true">
            {visual}
            <div className="rp-decisionStory__note" key={steps[active].n}>
              <span>{steps[active].n} · decision log</span>
              <b>{steps[active].note}</b>
            </div>
          </div>
          <ol className="rp-decisionStory__steps">
            {steps.map((step, index) => (
              <li
                key={step.n}
                ref={(node) => { refs.current[index] = node; }}
                data-index={index}
                className={active === index ? "is-active" : ""}
              >
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {/* The decision-log note renders visually inside the sticky
                    visual, which is aria-hidden — so this authored line existed
                    for sighted readers only. Repeat it here for everyone else. */}
                <span className="sr-only">Decision log: {step.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
