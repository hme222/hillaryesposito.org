import React, { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    n: "01",
    title: "Lead with the plants",
    body: "The first screen stops asking for engagement and shows the collection by room. The product begins with what someone already cares about.",
    note: "Collection before community",
  },
  {
    n: "02",
    title: "One task, not a red badge economy",
    body: "Today’s care becomes a short summary. Overdue is visible, but the interface never turns forgetting into a character flaw.",
    note: "Calm reminder · no streak",
  },
  {
    n: "03",
    title: "Show the guess",
    body: "Plant ID names its top matches, confidence, and sources. If the model is unsure, Grove says so before someone acts on it.",
    note: "78% is not 100%",
  },
  {
    n: "04",
    title: "Let a person overrule it",
    body: "Pet safety, care frequency, and plant identity all keep a correction path. Automation helps; it does not get promoted to authority.",
    note: "Human call · logged",
  },
];

export default function GroveDecisionStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setActive(index);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.6] }
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rp-decisionStory" aria-labelledby="grove-decisions-title">
      <div className="rp-wrap">
        <div className="rp-decisionStory__head">
          <p className="rp-kicker">Four calls · one screen at a time</p>
          <h2 id="grove-decisions-title" className="rp-title">The redesign is a sequence of judgment calls.</h2>
          <p className="rp-lede">The screen stays put. The reason changes. That is the system doing its actual job.</p>
        </div>
        <div className="rp-decisionStory__grid">
          <div className="rp-decisionStory__visual" aria-hidden="true">
            <div className="rp-device">
              <img src="/assets/grove/grove-live-care.jpg" alt="" />
            </div>
            <div className="rp-decisionStory__note" key={STEPS[active].n}>
              <span>{STEPS[active].n} · decision log</span>
              <b>{STEPS[active].note}</b>
            </div>
          </div>
          <ol className="rp-decisionStory__steps">
            {STEPS.map((step, index) => (
              <li
                key={step.n}
                ref={(node) => { refs.current[index] = node; }}
                data-index={index}
                className={active === index ? "is-active" : ""}
              >
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
