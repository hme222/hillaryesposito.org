import React from "react";

export type Gate = { text: string; status: string };

/**
 * @status: stable
 * @purpose: A numbered list of the conditions a research project has to meet before anything is built, each with its current status written out ("Not yet shown"). Used on the UX Woman case study to show what would have to be true before a pretotype is built. Pick this to state a decision gate honestly; for ratings of findings use ConfidenceMap, and for numbers use EvidenceField. The status is text first; the marker is a second channel.
 */
export default function BuildGates({ heading, intro, gates }: {
  /** Names the list for screen readers and the page. */
  heading: string;
  /** One sentence on what the gates decide. */
  intro: string;
  gates: Gate[];
}) {
  return (
    <div className="fp-gates" data-evidence="true">
      <h3 className="fp-gates__h">{heading}</h3>
      <p className="fp-gates__intro">{intro}</p>
      <ol className="fp-gates__list">
        {gates.map((g) => (
          <li key={g.text}>
            <span className="fp-gates__text">{g.text}</span>
            <span className="fp-gates__status"><span aria-hidden="true" className="fp-gates__mark">○</span>{g.status}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
