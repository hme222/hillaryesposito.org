import React from "react";
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
 * Each system gets a lane; the coral ticks are the events it survived; the
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

const W = 760;
const LANE_H = 82;
const LINE_X0 = 4;
const LINE_X1 = 566;
const OUTCOME_X = 584;


/**
 * @status: stable
 * @purpose: Decorative SVG of per-system survival lanes marking events each MSK system outlasted, used on the MSK case study page. Purely decorative, not a data visualization others should extend — for an actual before/after comparison use MSKMechanism or MSKServiceBlueprint instead.
 */
export default function MSKSustainment({ copy = MSK_COPY.en.sustainment }: { copy?: MskCopy["sustainment"] }) {
  const LANES = copy.lanes;
  const H = LANE_H * LANES.length;
  return (
    <div className="fp-sustainment" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="presentation" focusable="false">
        {LANES.map((lane, index) => {
          const y = index * LANE_H;
          const lineY = y + 40;
          return (
            <g key={lane.name}>
              <text x={LINE_X0} y={y + 16} fontSize="12" fontWeight="700" fill="currentColor">
                {lane.name}
              </text>

              {/* The run itself. */}
              <line x1={LINE_X0} y1={lineY} x2={LINE_X1} y2={lineY} stroke="var(--green)" strokeWidth="2" />
              <circle cx={LINE_X0 + 3} cy={lineY} r="4.5" fill="var(--green)" />
              <text x={LINE_X0} y={lineY + 19} fontSize="8.5" letterSpacing="0.8" fill="currentColor" fillOpacity="0.5">
                {copy.shipped}
              </text>

              {/* What it survived. */}
              {lane.events.map((event, i) => {
                const x = LINE_X0 + (LINE_X1 - LINE_X0) * event.at;
                return (
                  <g key={`${event.label}-${i}`}>
                    <line x1={x} y1={lineY - 9} x2={x} y2={lineY + 9} stroke="var(--coral)" strokeWidth="2" />
                    <text x={x} y={lineY - 15} fontSize="8.5" textAnchor="middle" fill="var(--coral)">
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
              <text x={OUTCOME_X} y={lineY + 4} fontSize="11.5" fontWeight="700" fill="var(--green)">
                {lane.outcome}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
