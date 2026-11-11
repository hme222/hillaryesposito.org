import React, { useEffect, useState } from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

/**
 * Sustainment, drawn as survival.
 *
 * The previous treatment was three cards reading "Two system upgrades",
 * "Became the default", "Three leadership transitions". Each was a label, not
 * a claim — a reader had to assemble the point themselves, and the point is
 * the whole reason the section exists.
 *
 * Sustainment is a claim about time: the thing kept running past the events
 * that normally kill an internal tool. That is a shape, so it is drawn as one.
 * Each system gets a lane; the coral ticks are what happened after launch; the
 * line continues past all of them.
 *
 * Decorative — the same three facts sit in the list beside it as real text, so
 * this is aria-hidden rather than read out twice.
 */

type Lane = {
  name: string;
  /** Events survived, as a fraction of the lane's length. */
  events: { at: number; label: string }[];
  outcome: string;
};

// Lane data now lives in data/mskCaseStudy.ts so it can localise.

// Two drawings, not one scaled one. The wide layout is 760 units across, so
// at phone width its 8.5-unit labels rendered at ~4px (motion review
// 2026-10-12). The compact layout is drawn for ~330px: half as wide, bigger
// type, event labels alternating above and below the line so they can't
// collide, and the outcome on its own line under the run.
const WIDE = { W: 760, LANE_H: 82, LINE_X1: 566, nameSize: 12, smallSize: 8.5, outcomeSize: 11.5 };
const COMPACT = { W: 380, LANE_H: 112, LINE_X1: 356, nameSize: 14, smallSize: 12, outcomeSize: 13 };
// About's two-column row: the compact drawing at desktop width, and a still narrower
// one at phone width so its labels stay near 12px on screen (see the type audit,
// 2026-11-10). Selected with the `tight` prop.
const TIGHT_PHONE = { W: 300, LANE_H: 104, LINE_X1: 280, nameSize: 13.5, smallSize: 12.5, outcomeSize: 12.5 };
const LINE_X0 = 4;
const COMPACT_QUERY = "(max-width: 560px)";


/**
 * @status: stable
 * @purpose: Decorative SVG of per-system survival lanes marking events each MSK system outlasted, used on the MSK case study page. Purely decorative, not a data visualization others should extend — for an actual before/after comparison use MSKMechanism or MSKServiceBlueprint instead. Also used on About, with the `tight` prop for a small plate.
 */
export default function MSKSustainment({ copy = MSK_COPY.en.sustainment, tight = false }: {
  copy?: MskCopy["sustainment"];
  /** Use the compact drawing at every width (and a narrower one on phones). For small plates. */
  tight?: boolean;
}) {
  const [narrow, setCompact] = useState(() => (
    typeof window !== "undefined" && (window.matchMedia?.(COMPACT_QUERY).matches ?? false)
  ));
  useEffect(() => {
    const query = window.matchMedia?.(COMPACT_QUERY);
    if (!query) return;
    const onChange = (event: MediaQueryListEvent) => setCompact(event.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);
  const compact = tight || narrow;
  const { W, LANE_H, LINE_X1, nameSize, smallSize, outcomeSize } = tight ? (narrow ? TIGHT_PHONE : COMPACT) : (narrow ? COMPACT : WIDE);
  const LANES = copy.lanes;
  const H = LANE_H * LANES.length;
  return (
    <div className="fp-sustainment" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="presentation" focusable="false">
        {LANES.map((lane, index) => {
          const y = index * LANE_H;
          const lineY = y + (compact ? 46 : 40);
          return (
            <g key={lane.name}>
              <text x={LINE_X0} y={y + 16} fontSize={nameSize} fontWeight="700" fill="currentColor">
                {lane.name}
              </text>

              {/* The run itself. */}
              <line x1={LINE_X0} y1={lineY} x2={LINE_X1} y2={lineY} stroke="var(--green)" strokeWidth="2" />
              <circle cx={LINE_X0 + 3} cy={lineY} r="4.5" fill="var(--green)" />
              <text x={LINE_X0} y={lineY + (compact ? 24 : 19)} fontSize={smallSize} letterSpacing="0.8" fill="currentColor" fillOpacity="0.5">
                {copy.shipped}
              </text>

              {/* What it survived. */}
              {lane.events.map((event, i) => {
                const x = LINE_X0 + (LINE_X1 - LINE_X0) * event.at;
                const below = compact && i % 2 === 1;
                return (
                  <g key={`${event.label}-${i}`}>
                    <line x1={x} y1={lineY - 9} x2={x} y2={lineY + 9} stroke="var(--coral)" strokeWidth="2" />
                    <text x={x} y={below ? lineY + 24 : lineY - 15} fontSize={smallSize} textAnchor="middle" fill="var(--coral)">
                      {event.label}
                    </text>
                  </g>
                );
              })}

              {/* Still going. */}
              <path
                d={`M${LINE_X1},${lineY} l12,0 M${LINE_X1 + 6},${lineY - 4.5} l6,4.5 l-6,4.5`}
                fill="none"
                stroke="var(--green)"
                strokeWidth="2"
              />
              <text
                x={compact ? LINE_X0 : LINE_X1 + 18}
                y={compact ? lineY + 50 : lineY + 4}
                fontSize={outcomeSize}
                fontWeight="700"
                fill="var(--green)"
              >
                {lane.outcome}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
