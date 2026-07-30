import React, { ReactNode } from "react";

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

/**
 * Interaction-logic section: the artifact, then the decisions it encodes.
 *
 * This used to be a scroll narrative — a sticky visual beside a tall column of
 * steps, with the "current" step driving a decision-log caption inside the
 * image. Two problems, both reported from the page:
 *
 * 1. The image detached from its text. The step column is much taller than the
 *    visual, so past a point the reader has prose with the artifact gone — and
 *    the caption explaining each step lived *inside* the image, so it left too.
 * 2. It depended on scroll position, an animation-frame tick, and each step
 *    being taller than a detection band. Each of those was a way for it to
 *    break quietly, and each of them did.
 *
 * Now the artifact sits with the section's opening claim and each decision
 * carries its own decision-log line. Nothing moves, nothing can decouple, and
 * every step reads on its own — including on a phone, where the sticky version
 * was disabled anyway and the captions were simply lost.
 */
export default function DecisionStory({ id, kicker, title, intro, steps, visual }: Props) {
  return (
    <section className="rp-decisionStory" id={id} aria-labelledby={`${id}-title`}>
      <div className="rp-wrap">
        <div className="rp-decisionStory__top">
          <div className="rp-decisionStory__head">
            <p className="rp-kicker">{kicker}</p>
            <h2 id={`${id}-title`} className="rp-title">{title}</h2>
            <p className="rp-lede">{intro}</p>
          </div>
          <div className="rp-decisionStory__visual">{visual}</div>
        </div>

        <ol className="rp-decisionStory__steps">
          {steps.map((step) => (
            <li key={step.n}>
              <span className="rp-decisionStory__n">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <p className="rp-decisionStory__logline">
                <span>Decision log</span>
                <b>{step.note}</b>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
