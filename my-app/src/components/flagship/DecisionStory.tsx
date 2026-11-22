import React, { ReactNode } from "react";

export type DecisionStep = {
  n: string;
  title: string;
  body: string;
  note: string;
};

type Props = {
  id: string;
  languageAnchor?: string;
  kicker?: string;
  title: string;
  /** Optional: a lede that restates the step titles is cut (2026-11-17). */
  intro?: string;
  /** Optional second line under the intro, e.g. how the rules could be checked. */
  introNote?: string;
  steps: DecisionStep[];
  /** Decorative sequence labels can be omitted when the ordered list already
   *  communicates sequence and the page needs a quieter editorial rhythm. */
  showStepNumbers?: boolean;
  /** The artifact. Called with null once, for one visual beside the whole
   *  list (every step reads as current), or with each step's index when
   *  `visualPerStep` is set, so each step carries its own picture. */
  visual: (activeIndex: number | null) => ReactNode;
  /** Render `visual(index)` beside every step instead of one visual beside
   *  the list. Use when each decision has its own screen (Knowunity). */
  visualPerStep?: boolean;
};

/**
 * Interaction-logic section: a short list of decisions, each with the
 * artifact that shows it.
 *
 * History, so it is not rebuilt: this was a sticky panel pinned across a
 * 180vh scroll track, with the active step chosen from scroll position and the
 * visual crossfading to match. Pinned, it left ~1100px of empty column on MSK
 * and ~600px on Knowunity (2026-11-22 audit). Now it is plain stacked
 * content: no sticky, no scroll listener. Either one visual sits beside the
 * whole list, or (`visualPerStep`) each step sits beside its own visual,
 * text and picture in two columns from 900px and stacked below that. Every
 * step always shows its title, body and decision-log line.
 */
/**
 * @status: stable
 * @purpose: Decision narrative for flagship case studies (MSK, Knowunity): a stacked list of decisions with a caller-supplied visual, either one beside the whole list or one beside each step (visualPerStep). Nothing is pinned or scroll-linked. The only decision-story component; reuse it rather than adding a sibling.
 */
export default function DecisionStory({ id, languageAnchor, kicker, title, intro, introNote, steps, showStepNumbers = true, visual, visualPerStep = false }: Props) {
  return (
    <section className={`rp-decisionStory${showStepNumbers ? "" : " rp-decisionStory--quiet"}`} id={id} data-language-anchor={languageAnchor} aria-labelledby={`${id}-title`}>
      <div className="rp-wrap">
        <div className="rp-decisionStory__head">
          {kicker && <p className="rp-kicker">{kicker}</p>}
          <h2 id={`${id}-title`} className="rp-title">{title}</h2>
          {intro && <p className="rp-lede">{intro}</p>}
          {introNote && <p className="rp-lede rp-decisionStory__note">{introNote}</p>}
        </div>

        {visualPerStep ? (
          <ol className="rp-decisionStory__steps rp-decisionStory__steps--paired">
            {steps.map((step, index) => (
              <li key={step.n} className="rp-decisionStory__pair">
                <div className="rp-decisionStory__step">
                  {showStepNumbers && <span className="rp-decisionStory__n">{step.n}</span>}
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <p className="rp-decisionStory__logline">
                      <b>{step.note}</b>
                    </p>
                  </div>
                </div>
                <div className="rp-decisionStory__visual">{visual(index)}</div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="rp-decisionStory__panel">
            <ol className="rp-decisionStory__steps">
              {steps.map((step) => (
                <li key={step.n}>
                  {showStepNumbers && <span className="rp-decisionStory__n">{step.n}</span>}
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <p className="rp-decisionStory__logline">
                      <b>{step.note}</b>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rp-decisionStory__visual">{visual(null)}</div>
          </div>
        )}
      </div>
    </section>
  );
}
