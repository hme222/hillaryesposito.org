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
// Type audit 2026-11-19: labels were 6.6 to 7.5 units and rendered at 7.2 px on
// a phone. They are now 11.5 units; with the svg capped at 22rem wide (see
// .flagship-page--msk .fp-mechanism svg) that is about 15 px on desktop and
// 12.5 px at 390 px.
const T = 11.5;

/** "BEFORE · LEGAL LANGUAGE" as two lines: the state, then what it means. */
function Heading({ label, y, color }: { label: string; y: number; color: string }) {
  const [state, ...rest] = label.split(" · ");
  return (
    <text x="0" y={y} fontSize={T} fill={color}>
      <tspan x="0" fontWeight="700" letterSpacing="1">{state}</tspan>
      {rest.length > 0 && <tspan x="0" dy="14">{rest.join(" · ")}</tspan>}
    </text>
  );
}

function Certification({ l }: { l: L }) {
  // REPLACED 2026-08-03. This used to draw a 90/60/30-day expiry alerting
  // timeline, which described a certification dashboard that was never built.
  // The actual work was a format change: dense legal prose rewritten into steps
  // a clinician could follow. So the drawing is the shape of that rewrite.
  const before = [38, 45, 52, 59, 66];
  const after = [
    { y: 120, w: 96 },
    { y: 136, w: 78 },
    { y: 152, w: 88 },
  ];
  return (
    <svg viewBox="0 0 260 160" width="100%" role="presentation" focusable="false">
      <Heading label={l.beforeProse} y={12} color="var(--coral)" />
      {before.map((y, i) => (
        <line key={y} x1="0" y1={y} x2={i % 2 === 0 ? 140 : 124} y2={y}
          stroke="var(--coral)" strokeOpacity=".5" strokeWidth="3" />
      ))}
      <text x="150" y="56" fontSize={T} fill="var(--coral)">{l.denseBlock}</text>

      <Heading label={l.afterSteps} y={90} color="var(--green)" />
      {after.map((row, i) => (
        <g key={row.y}>
          <circle cx="3" cy={row.y} r="2.6" fill="var(--green)" />
          <line x1="12" y1={row.y} x2={row.w} y2={row.y} stroke="var(--green)" strokeWidth="3" strokeOpacity=".55" />
          <text x={row.w + 8} y={row.y + 4} fontSize={T} fill={INK} fillOpacity=".7">{`step ${i + 1}`}</text>
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
  // 2026-11-19 (synthesis-lens review): the drawing showed only the Before, with
  // the After as a footnote. It now draws both: one shared course, then a
  // separate path per group. No durations per group are drawn; none are known.
  const groups = ["new to the systems", "some exposure", "already fluent"];
  const beforeY = [44, 62, 80];
  const afterY = [138, 156, 174];
  return (
    <svg viewBox="0 0 260 182" width="100%" role="presentation" focusable="false">
      <Heading label={l.beforeCohort} y={12} color="var(--coral)" />
      {groups.map((g, i) => (
        <g key={`b-${g}`}>
          <circle cx="4" cy={beforeY[i]} r="2.4" fill="var(--coral)" fillOpacity=".75" />
          <text x="11" y={beforeY[i] + 4} fontSize={T} fill={INK} fillOpacity=".7">{g}</text>
          <path d={`M126,${beforeY[i]} C144,${beforeY[i]} 146,62 162,62`} fill="none" stroke="var(--coral)" strokeOpacity=".7" strokeWidth="1.4" />
        </g>
      ))}
      <line x1="162" y1="62" x2="236" y2="62" stroke="var(--coral)" strokeWidth="2" />
      <circle cx="240" cy="62" r="3.2" fill="var(--coral)" />
      <text x="172" y="80" fontSize={T} fill="var(--coral)">{l.sameStandard}</text>

      <Heading label={l.afterCohort} y={106} color="var(--green)" />
      {groups.map((g, i) => (
        <g key={`a-${g}`}>
          <circle cx="4" cy={afterY[i]} r="2.4" fill="var(--green)" />
          <text x="11" y={afterY[i] + 4} fontSize={T} fill={INK} fillOpacity=".7">{g}</text>
          <line x1="126" y1={afterY[i]} x2="232" y2={afterY[i]} stroke="var(--green)" strokeWidth="2" strokeOpacity=".75" />
          <path d={`M227,${afterY[i] - 4} l6,4 l-6,4`} fill="none" stroke="var(--green)" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
}

const MAP: Record<string, (props: { l: L }) => React.ReactElement> = {
  "02": Certification,
  "03": Onboarding,
};

/**
 * @status: stable
 * @purpose: Renders one of two decorative before/after SVG diagrams (certification "02", onboarding "03", each drawing both its Before and its After) illustrating the MSK redesign mechanism, selected by the `n` prop; used on the MSK case study page. Pick this for a static before/after diagram — for actor-lane handoffs use MSKServiceBlueprint, for the interactive 3D version use MSKSystemMap. LogisticsMechanism is the same pattern re-implemented for the logistics case study, not shared — check before adding a third.
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
