import React, { useState } from "react";

const CAPTURES = [
  { name: "Kikoff", src: "/assets/mobbin/kikoff.jpg", tag: "Entry · credit building" },
  { name: "Polymarket", src: "/assets/mobbin/polymarket.jpg", tag: "Browse · live markets" },
  { name: "Discover", src: "/assets/mobbin/discover.jpg", tag: "Entry · account access" },
];

export default function MobbinIndexLens() {
  const [indexed, setIndexed] = useState(false);

  return (
    <section className={`fp-indexLens${indexed ? " is-indexed" : ""}`} id="mobbin-brief" data-language-anchor="mobbin-brief" aria-labelledby="mobbin-index-title">
      <div className="rp-wrap fp-indexLens__layout">
        <div className="fp-indexLens__copy">
          <p className="rp-kicker">A capture has to be findable later</p>
          <h2 id="mobbin-index-title">Name the task, not just the app.</h2>
          <p>
            Mobbin users search for a task—sign in, browse, open an account—not for a screenshot
            number. I kept each source capture untouched, then named the task beside it using the
            library’s vocabulary.
          </p>
          <button
            type="button"
            className="fp-proofControl"
            aria-pressed={indexed}
            onClick={() => setIndexed((current) => !current)}
          >
            {indexed ? "Hide the task labels" : "Show the task labels"} <span aria-hidden="true">↗</span>
          </button>
          <p className="fp-proofStatus" aria-live="polite">
            {indexed ? "Task labels visible beside three untouched source captures." : "Three raw source captures."}
          </p>
        </div>

        <div className="fp-indexLens__desk">
          <div className="fp-indexLens__rule" aria-hidden="true" />
          {CAPTURES.map((capture) => (
            <figure className="fp-indexLens__capture" key={capture.name}>
              <div className="fp-indexLens__phone">
                <img src={capture.src} alt={`${capture.name} interface documented for Mobbin`} />
              </div>
            </figure>
          ))}
          <div className="fp-indexLens__index" aria-hidden={!indexed}>
            {CAPTURES.map((capture, index) => (
              <div key={capture.name}>
                <span>{String(index + 1).padStart(2, "0")} · {capture.name}</span>
                <b>{capture.tag}</b>
              </div>
            ))}
          </div>
          <p className="fp-indexLens__boundary">Source interfaces documented, not designed, by Hillary</p>
        </div>
      </div>
    </section>
  );
}
