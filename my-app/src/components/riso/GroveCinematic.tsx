import React, { useState } from "react";

/**
 * @status: unused — verify before removing
 * @purpose: Toggleable "fan out the real screens" section showing documented Grove product states; not imported anywhere in src/ currently (only referenced from its own test file). Overlaps GroveScreenGallery's job (showing Grove screens) — confirm which one the page should use before building a third.
 */
export default function GroveCinematic() {
  const [fanned, setFanned] = useState(false);

  return (
    <section
      className={`rp-groveStates${fanned ? " is-fanned" : ""}`}
      id="grove-brief"
      data-language-anchor="grove-brief"
      aria-labelledby="grove-states-title"
    >
      <div className="rp-wrap rp-groveStates__layout">
        <div className="rp-groveStates__copy">
          <p className="rp-kicker">The brief, before the screens</p>
          <h2 id="grove-states-title">Care should fit into a life already happening.</h2>
          <p>
            One clear task. A reason you can inspect. And no tiny plant trying to guilt you from a
            lock screen. These are real Grove states already documented in this case study.
          </p>
          <button
            type="button"
            className="rp-groveStates__toggle"
            aria-pressed={fanned}
            onClick={() => setFanned((current) => !current)}
          >
            {fanned ? "Stack the screens" : "Fan out the real screens"}
            <span aria-hidden="true">{fanned ? " ↙" : " ↗"}</span>
          </button>
          <p className="rp-groveStates__status" aria-live="polite">
            {fanned ? "Four documented Grove screens fanned out." : "Four documented Grove screens stacked."}
          </p>
        </div>

        <div className="rp-groveStates__stage">
          <img
            className="rp-groveStates__screen rp-groveStates__screen--collection"
            src="/assets/grove/grove-live-collection.jpg"
            alt="Grove collection screen"
          />
          <img
            className="rp-groveStates__screen rp-groveStates__screen--care"
            src="/assets/grove/grove-live-care.jpg"
            alt="Grove daily care screen"
          />
          <img
            className="rp-groveStates__screen rp-groveStates__screen--journal"
            src="/assets/grove/grove-live-journal.jpg"
            alt="Grove care journal screen"
          />
          <img
            className="rp-groveStates__screen rp-groveStates__screen--welcome"
            src="/assets/grove/grove1.png"
            alt="Grove welcome screen"
          />
          <p className="rp-groveStates__boundary">Real Grove screens · no generated product imagery</p>
        </div>
      </div>
    </section>
  );
}
