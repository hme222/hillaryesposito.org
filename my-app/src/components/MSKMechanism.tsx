import React from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

type L = MskCopy["redesigns"]["mechanismLabels"];

/**
 * The mechanism under each of the MSK redesigns, drawn. The filing diagram
 * ("01") was cut 2026-11-17 with the filing card it sat in.
 *
 * These are diagrams, not screenshots. None of the three shipped systems can be
 * shown as pixels — they were internal MSK tools — and inventing screens would
 * break the page's own labelling discipline. What can be shown honestly is the
 * mechanism each redesign changed, which is the part the prose was describing.
 *
 * Decorative: the finding and change text sits beside each one, so these are
 * aria-hidden rather than repeating the same sentence to a screen reader.
 */

const INK = "currentColor";

function Certification({ l }: { l: L }) {
  // REPLACED 2026-08-03. This used to draw a 90/60/30-day expiry alerting
  // timeline, which described a certification dashboard that was never built.
  // The actual work was a format change: dense legal prose rewritten into steps
  // a clinician could follow. So the drawing is the shape of that rewrite.
  const before = [4, 12, 20, 28, 36, 44];
  const after = [
    { y: 74, w: 96 },
    { y: 84, w: 78 },
    { y: 94, w: 88 },
  ];
  return (
    <svg viewBox="0 0 260 108" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">{l.beforeProse}</text>
      {before.map((y) => (
        <line key={y} x1="0" y1={y + 8} x2={y % 16 === 4 ? 150 : 132} y2={y + 8}
          stroke="var(--coral)" strokeOpacity=".5" strokeWidth="3" />
      ))}
      <text x="160" y="34" fontSize="7.5" fill="var(--coral)" fillOpacity=".9">{l.denseBlock}</text>

      <text x="0" y="66" fontSize="7.5" letterSpacing="1" fill="var(--green)">{l.afterSteps}</text>
      {after.map((row, i) => (
        <g key={row.y}>
          <circle cx="3" cy={row.y} r="2.6" fill="var(--green)" />
          <line x1="12" y1={row.y} x2={row.w} y2={row.y} stroke="var(--green)" strokeWidth="3" strokeOpacity=".55" />
          <text x={row.w + 8} y={row.y + 2.5} fontSize="7" fill={INK} fillOpacity=".5">{`step ${i + 1}`}</text>
        </g>
      ))}
    </svg>
  );
}

function Onboarding({ l }: { l: L }) {
  // REPLACED 2026-08-03. This drew five department checklists collapsing into
  // one path gated on safety prerequisites before patient contact — a clinician
  // onboarding flow that never existed. The real program trained new
  // administrative support staff, and the design problem was the opposite
  // shape: not many paths converging, but one path that had to open up to meet
  // cohorts arriving with very different starting points.
  const starts = [
    { y: 20, label: "new to the systems" },
    { y: 40, label: "some exposure" },
    { y: 60, label: "already fluent" },
  ];
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">{l.beforeCohort}</text>

      {starts.map((s) => (
        <g key={s.y}>
          <circle cx="4" cy={s.y} r="2.4" fill="var(--coral)" fillOpacity=".75" />
          <text x="11" y={s.y + 2.4} fontSize="6.6" fill={INK} fillOpacity=".55">{s.label}</text>
          <path
            d={`M62,${s.y} C104,${s.y} 116,40 158,40`}
            fill="none"
            stroke="var(--green)"
            strokeOpacity=".7"
            strokeWidth="1.4"
          />
        </g>
      ))}

      <line x1="158" y1="40" x2="236" y2="40" stroke="var(--green)" strokeWidth="2" />
      <circle cx="240" cy="40" r="3.2" fill="var(--green)" />
      <text x="236" y="31" fontSize="7.5" textAnchor="end" fill="var(--green)">{l.sameStandard}</text>
      <text x="0" y="88" fontSize="7.5" fill={INK} fillOpacity=".55">
        instruction curated per cohort · 1–3 weeks
      </text>
    </svg>
  );
}

const MAP: Record<string, (props: { l: L }) => React.ReactElement> = {
  "02": Certification,
  "03": Onboarding,
};

/**
 * @status: stable
 * @purpose: Renders one of two decorative before/after SVG diagrams (certification "02", onboarding "03") illustrating the MSK redesign mechanism, selected by the `n` prop; used on the MSK case study page. Pick this for a static before/after diagram — for actor-lane handoffs use MSKServiceBlueprint, for the interactive 3D version use MSKSystemMap. LogisticsMechanism is the same pattern re-implemented for the logistics case study, not shared — check before adding a third.
 */
export default function MSKMechanism({ n, labels = MSK_COPY.en.redesigns.mechanismLabels }: { n: string; labels?: L }) {
  const Diagram = MAP[n];
  if (!Diagram) return null;
  return (
    <div className="fp-mechanism" aria-hidden="true">
      <Diagram l={labels} />
    </div>
  );
}
