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

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.index);
      if (Number.isFinite(index)) setActive(index);
    }, { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.6] });
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
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
