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
  /** Receives the active step index so the artifact can highlight its own row. */
  visual: (activeIndex: number) => ReactNode;
};

/**
 * Interaction-logic section: the artifact stays on screen while the decisions
 * it encodes advance.
 *
 * This was a scroll narrative once before and it broke, so the failure modes
 * are worth naming:
 *
 * 1. The old version pinned the visual beside a step column that was much
 *    taller than it, so past a point the reader had prose with the artifact
 *    gone — and the caption explaining each step lived *inside* the image, so
 *    it left too.
 * 2. It depended on scroll position, an animation-frame tick, and each step
 *    being taller than a detection band. Each was a way to break quietly.
 *
 * What is different here. The steps and the artifact are in the *same* sticky
 * panel, so they cannot separate — if you can see one you can see the other.
 * Every step renders its title, body and decision-log line at all times, so
 * nothing is hidden behind scroll state and nothing is lost to a screen reader,
 * a failed observer, or a printout. The active step is a highlight on content
 * that is already there, not a reveal of content that is not.
 *
 * Position is one division against the track's own rect: how far the track has
 * travelled past the top of the viewport, over the distance it can travel. The
 * track is the only element measured, so there is nothing to fall out of sync
 * with — no per-step height, no detection band a short step can slip through.
 */
export default function DecisionStory({ id, kicker, title, intro, steps, visual }: Props) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // One rect read per scroll event, no rAF and no timer. Deliberate: this ran
    // on rAF first, and rAF is throttled or suspended whenever the tab is
    // backgrounded or occluded, which left the section frozen on whichever step
    // it had when it lost focus. A passive listener reading a single rect is
    // cheap, and setActive below short-circuits unless the index actually
    // changes — so the whole section costs at most four React renders.
    const measure = () => {
      const rect = track.getBoundingClientRect();
      // The runway is however much of the track passes the top of the viewport
      // before its bottom arrives there.
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / runway));
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive((current) => (current === index ? current : index));
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [steps.length]);

  return (
    <section className="rp-decisionStory" id={id} aria-labelledby={`${id}-title`}>
      <div className="rp-wrap">
        <div className="rp-decisionStory__head">
          <p className="rp-kicker">{kicker}</p>
          <h2 id={`${id}-title`} className="rp-title">{title}</h2>
          <p className="rp-lede">{intro}</p>
        </div>

        <div className="rp-decisionStory__track" ref={trackRef}>
          <div className="rp-decisionStory__panel">
            <ol className="rp-decisionStory__steps">
              {steps.map((step, index) => (
                <li key={step.n} className={index === active ? "is-active" : undefined}>
                  <span className="rp-decisionStory__n">{step.n}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <p className="rp-decisionStory__logline">
                      <span>Decision log</span>
                      <b>{step.note}</b>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rp-decisionStory__visual">{visual(active)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
