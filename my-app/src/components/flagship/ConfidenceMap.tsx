import React from "react";

export type ConfidenceLevel = "High" | "Moderate" | "Low";

export type ConfidenceRow = {
  /** The finding, in a few words. */
  finding: string;
  /** What the interviews do support, with its stated level. */
  observed: { level: ConfidenceLevel; claim: string };
  /** What they do not support, when the page states a level for it. */
  limit?: { level: ConfidenceLevel; claim: string };
};

const SEGMENTS: Record<ConfidenceLevel, number> = { High: 3, Moderate: 2, Low: 1 };

function Level({ level, claim }: { level: ConfidenceLevel; claim: string }) {
  return (
    <div className="fp-confidence__cell">
      {/* The bar is a second channel. The level word and the claim carry the meaning. */}
      <span className="fp-confidence__bar" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= SEGMENTS[level] ? "is-on" : ""} />
        ))}
      </span>
      <span className="fp-confidence__text">
        <b>{level}</b> {claim}
      </span>
    </div>
  );
}

/**
 * @status: stable
 * @purpose: Matrix of research findings against the confidence the evidence supports, one row per finding, with the level written out and a three-step bar as a second channel. Pick this to show how strong each finding is at a glance on a research case study (UX Woman). The levels come from the page's own ratings; do not add a level the copy does not state. Not for scores or survey results; use EvidenceField for numbers.
 */
export default function ConfidenceMap({ caption, rows }: {
  /** What the table shows, read by screen readers and shown above it. */
  caption: string;
  rows: ConfidenceRow[];
}) {
  return (
    <div className="fp-confidence" data-evidence="true">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Finding</th>
            <th scope="col">What the interviews support</th>
            <th scope="col">What they do not show</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.finding}>
              <th scope="row">{r.finding}</th>
              <td data-label="What the interviews support"><Level level={r.observed.level} claim={r.observed.claim} /></td>
              <td data-label="What they do not show">
                {r.limit ? <Level level={r.limit.level} claim={r.limit.claim} /> : <span className="fp-confidence__none">No level stated</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
