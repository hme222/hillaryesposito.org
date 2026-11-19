import React, { useState } from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

/**
 * MSK service blueprint — the filing path drawn as actors and lines, not steps.
 *
 * A step count answers "how many steps," which is a process question. A
 * blueprint answers "who is holding the
 * record, and who can see it" — which is the question that actually explains
 * why the old path failed. Six steps to five is the visible change. One
 * cross-department handoff to none is the real one.
 *
 * Everything here comes from the six-step and five-step paths already
 * documented on this page, plus the four departments named in the hero. No new
 * claim: the lanes are a re-cut of the same evidence, and the "blind window" is
 * the plain consequence of steps 4 and 5 sitting below the line of visibility
 * with no return signal — which is exactly why step 6 had to exist.
 *
 * Decorative-only: every lane is restated in the visible list beneath it, so
 * this is aria-hidden and screen readers get the content once, as text.
 */

type Lane = "evidence" | "front" | "back" | "support";

/** `design` marks a node that is Hillary's portfolio design rule, not something
 *  MSK built (claim audit 2026-10-13; synthesis-lens review 2026-11-19). It gets
 *  a dotted outline and a text tag, so the difference never rests on colour. */
type Node = { lane: Lane; col: number; design?: boolean };

/**
 * The support lane is the tell. Before, the EMR holds the record at the start
 * and the end but not in the middle — the gap in that row is the gap the whole
 * redesign closed. After, the row is unbroken.
 */
const BEFORE: Node[] = [
  { lane: "evidence", col: 0 },
  { lane: "front", col: 0 },
  { lane: "support", col: 0 },
  { lane: "evidence", col: 1 },
  { lane: "front", col: 1 },
  { lane: "evidence", col: 2 },
  { lane: "front", col: 2 },
  { lane: "evidence", col: 3 },
  { lane: "back", col: 3 },
  { lane: "evidence", col: 4 },
  { lane: "back", col: 4 },
  { lane: "evidence", col: 5 },
  { lane: "front", col: 5 },
  { lane: "support", col: 5 },
];

const AFTER: Node[] = [
  { lane: "evidence", col: 0 },
  { lane: "front", col: 0 },
  { lane: "support", col: 0 },
  { lane: "evidence", col: 1 },
  { lane: "front", col: 1 },
  { lane: "support", col: 1, design: true }, // "Ready + role checked"
  { lane: "evidence", col: 2 },
  { lane: "front", col: 2 },
  { lane: "support", col: 2, design: true }, // "Permission allows it"
  { lane: "evidence", col: 3 },
  { lane: "support", col: 3 },
  { lane: "evidence", col: 4 },
  { lane: "front", col: 4 },
  { lane: "support", col: 4 },
];

const LANE_ORDER: Lane[] = ["evidence", "front", "back", "support"];

// Type audit 2026-11-19: labels were 9 to 11.5 units, which rendered at 9.2px on
// a 1440 desktop and 5.9px on a phone, under the site's 13px label floor. Every
// label is now 13 units and long ones wrap to two lines inside taller nodes. The
// canvas never draws narrower than W px (see .fp-blueprint__canvas svg), so on a
// phone the drawing scrolls sideways at full size instead of shrinking.
const W = 940;
const PAD_L = 160;
const PAD_R = 18;
const NODE_H = 46;
const TYPE = 13;
const LINE = 16;

const LANE_Y: Record<Lane, number> = {
  evidence: 30,
  front: 104,
  back: 196,
  support: 290,
};

const VIS_LINE_Y = 175; // between frontstage and backstage
const H = 352;

function column(index: number, count: number) {
  const usable = W - PAD_L - PAD_R;
  const colW = usable / count;
  return { x: PAD_L + index * colW + 5, w: colW - 10 };
}

/** Split a label into at most two lines at the space nearest its middle. */
function wrap(label: string, max: number): string[] {
  if (label.length <= max) return [label];
  const mid = label.length / 2;
  let best = -1;
  for (let i = 0; i < label.length; i += 1) {
    if (label[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  }
  return best < 0 ? [label] : [label.slice(0, best), label.slice(best + 1)];
}

/** Lines of text centred vertically on `cy`. */
function Lines({ lines, x, cy, ...rest }: { lines: string[]; x: number; cy: number } & React.SVGProps<SVGTextElement>) {
  const top = cy - ((lines.length - 1) * LINE) / 2 + 4.5;
  return (
    <text x={x} y={top} fontSize={TYPE} {...rest}>
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : LINE}>{line}</tspan>
      ))}
    </text>
  );
}

/**
 * @status: stable
 * @purpose: Renders the MSK filing path as a toggleable before/after service-blueprint diagram (actor lanes and handoffs), used on the MSK case study page. Pick this for actor-lane handoffs specifically — for a static mechanism diagram use MSKMechanism. Also used on About, cropped to a window of columns with the `columns` prop. Carries its own legend (observed / built by IT and UX / my design, not MSK's), a "Built from" provenance line, and scrolls sideways on phones at full label size.
 */
export default function MSKServiceBlueprint({ copy = MSK_COPY.en.blueprint, columns }: {
  copy?: MskCopy["blueprint"];
  /**
   * Crop to a window of columns (inclusive), keeping the lane labels. About uses
   * [2, 5]: the step before the blind window, the window itself and the step after,
   * drawn larger. Omit for the full drawing.
   */
  columns?: [number, number];
}) {
  const [showAfter, setShowAfter] = useState(false);
  const nodes = showAfter ? AFTER : BEFORE;
  const labels = showAfter ? copy.nodesAfter : copy.nodesBefore;

  const count = Math.max(...nodes.map((n) => n.col)) + 1;

  // Cropped view: slide the node area left so the chosen columns sit beside the
  // lane labels, and shrink the drawing to that width. The view width uses the
  // before path's column width (6 columns) so the Before/After toggle does not
  // resize the drawing.
  const colW = (W - PAD_L - PAD_R) / count;
  const span = columns ? columns[1] - columns[0] + 1 : 0;
  const viewW = columns ? PAD_L + span * ((W - PAD_L - PAD_R) / 6) + PAD_R : W;
  const shiftX = columns ? columns[0] * colW : 0;
  const win = columns ? { transform: `translate(${-shiftX} 0)`, clipPath: "url(#bp-window)" } : {};
  // The window where the record is below the line of visibility and the
  // coordinator has no signal. Columns 3 and 4 of the before path.
  const blindFrom = column(3, count);
  const blindTo = column(4, count);
  const maxChars = Math.floor((colW - 18) / 7);

  return (
    <div className="fp-blueprint">
      <div className="fp-blueprint__controls">
        <div className="fp-blueprint__switch" role="group" aria-label={copy.switchAria}>
          <button
            type="button"
            className={!showAfter ? "is-active" : undefined}
            aria-pressed={!showAfter}
            onClick={() => setShowAfter(false)}
          >
            {copy.beforeBtn}
          </button>
          <button
            type="button"
            className={showAfter ? "is-active" : undefined}
            aria-pressed={showAfter}
            onClick={() => setShowAfter(true)}
          >
            {copy.afterBtn}
          </button>
        </div>
        <p className="fp-blueprint__status" aria-live="polite">
          {showAfter ? copy.statusAfter : copy.statusBefore}
        </p>
      </div>

      {/* Phones: the drawing keeps its full size and scrolls sideways inside
          this labelled, focusable region (arrow keys scroll it). The drawing
          itself stays aria-hidden; the key below says the same thing as text. */}
      <p className="fp-blueprint__swipe" aria-hidden="true">{copy.swipeHint}</p>
      <div className="fp-blueprint__canvas" role="region" aria-label={copy.canvasAria} tabIndex={0}>
        <svg viewBox={`0 0 ${viewW} ${H}`} width="100%" style={{ minWidth: viewW }} role="presentation" focusable="false" aria-hidden="true">
          {columns && (
            <defs>
              <clipPath id="bp-window">
                <rect x={PAD_L - 4 + shiftX} y={0} width={span * colW + 8} height={H} />
              </clipPath>
            </defs>
          )}
          {/* lane labels + rules */}
          {LANE_ORDER.map((lane) => (
            <g key={lane}>
              <Lines lines={wrap(copy.lanes[lane], 20)} x={0} cy={LANE_Y[lane] + 12} fill="currentColor" fillOpacity="0.9" fontWeight="600" />
              <text x="0" y={LANE_Y[lane] + 12 + (wrap(copy.lanes[lane], 20).length + 0.5) * LINE} fontSize={TYPE} fill="currentColor" fillOpacity="0.62">
                {copy.laneSubs[lane]}
              </text>
              <line
                x1={PAD_L - 10}
                y1={LANE_Y[lane] + NODE_H / 2}
                x2={viewW}
                y2={LANE_Y[lane] + NODE_H / 2}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
            </g>
          ))}

          {/* the blind window — the whole point of the drawing */}
          {!showAfter && (
            <g {...win}>
              {/* Spans the coordinator’s dead time as well as the backstage
                  work: the point is that nothing is happening above the line
                  while something is happening below it. Its length was never
                  measured, and the label says so (synthesis-lens review). */}
              <rect
                x={blindFrom.x - 5}
                y={LANE_Y.front - 8}
                width={blindTo.x + blindTo.w - blindFrom.x + 10}
                height={LANE_Y.back + NODE_H + 8 - LANE_Y.front + 8}
                fill="var(--coral)"
                fillOpacity="0.07"
              />
              <Lines
                lines={wrap(copy.waiting, 24)}
                x={blindFrom.x + 6}
                cy={LANE_Y.front + NODE_H / 2}
                fill="var(--coral)"
              />
              <text
                x={blindFrom.x}
                y={LANE_Y.back + NODE_H + 26}
                fontSize={TYPE}
                fill="var(--coral)"
              >
                {copy.noSignal}
              </text>
            </g>
          )}

          {/* line of visibility */}
          <line
            x1="0"
            y1={VIS_LINE_Y}
            x2={viewW}
            y2={VIS_LINE_Y}
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.25"
            strokeDasharray="6 4"
          />
          <text x="0" y={VIS_LINE_Y - 7} fontSize={TYPE} letterSpacing="1" fill="currentColor" fillOpacity="0.7">
            {copy.visibility}
          </text>

          {/* nodes, in evidence/action pairs per column */}
          <g {...win}>
          {nodes.map((node, i) => {
            const { x, w } = column(node.col, count);
            const y = LANE_Y[node.lane];
            const isEvidence = node.lane === "evidence";
            // Only the backstage lane is drawn as an exception. The support lane
            // is drawn plainly, so that in the before path its own gap — not a
            // colour — is what reads.
            const isCrossing = node.lane === "back";
            const isDesign = Boolean(node.design);

            return (
              <g key={`${labels[i]}-${i}`} className={isDesign ? "fp-blueprint__design" : undefined}>
                {isDesign && (
                  <text x={x} y={y - 8} fontSize={TYPE} fontWeight="600" fill="currentColor">
                    {copy.designTag}
                  </text>
                )}
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={NODE_H}
                  rx={3}
                  fill={isEvidence ? "none" : "var(--paper)"}
                  stroke={isCrossing ? "var(--coral)" : "currentColor"}
                  strokeOpacity={isCrossing ? 0.95 : isDesign ? 0.9 : isEvidence ? 0.22 : 0.42}
                  strokeWidth={isCrossing ? 1.75 : isDesign ? 2 : 1.25}
                  strokeLinecap={isDesign ? "round" : undefined}
                  strokeDasharray={isDesign ? "0.1 4.5" : isEvidence ? "3 3" : isCrossing ? "5 4" : undefined}
                />
                <Lines
                  lines={wrap(labels[i], maxChars)}
                  x={x + w / 2}
                  cy={y + NODE_H / 2}
                  textAnchor="middle"
                  fill="currentColor"
                  fillOpacity={isEvidence ? 0.68 : 0.92}
                />
              </g>
            );
          })}
          </g>

          {/* The support lane’s continuity is the argument, so draw the thread
              through it: unbroken after, broken across the handoff before. */}
          {(() => {
            const support = nodes.filter((n) => n.lane === "support").sort((a, b) => a.col - b.col);
            const y = LANE_Y.support + NODE_H / 2;
            return (<g {...win}>{support.slice(0, -1).map((n, i) => {
              const from = column(n.col, count);
              const to = column(support[i + 1].col, count);
              const contiguous = support[i + 1].col - n.col === 1;
              return (
                <line
                  key={`thread-${i}`}
                  x1={from.x + from.w}
                  y1={y}
                  x2={to.x}
                  y2={y}
                  stroke={contiguous ? "var(--green)" : "var(--coral)"}
                  strokeOpacity={contiguous ? 0.75 : 0.55}
                  strokeWidth={contiguous ? 1.75 : 1.25}
                  strokeDasharray={contiguous ? undefined : "3 5"}
                />
              );
            })}</g>);
          })()}

          {/* the handoff arrow: frontstage hands the record across a department line */}
          {!showAfter && (
            <g {...win}><path
              d={`M${column(2, count).x + column(2, count).w / 2},${LANE_Y.front + NODE_H}
                  C${column(2, count).x + column(2, count).w / 2},${LANE_Y.front + NODE_H + 40}
                   ${blindFrom.x + blindFrom.w / 2},${LANE_Y.back - 40}
                   ${blindFrom.x + blindFrom.w / 2},${LANE_Y.back}`}
              fill="none"
              stroke="var(--coral)"
              strokeWidth="2"
            /></g>
          )}
        </svg>
      </div>

      {/* What kind of claim each box is (synthesis-lens review 2026-11-19):
          the After path mixes what IT and UX built with two of my own rules.
          Real text, so the distinction never rests on line style or colour. */}
      <ul className="fp-blueprint__legend" aria-label={copy.legend.aria}>
        <li><span className="fp-blueprint__swatch fp-blueprint__swatch--observed" aria-hidden="true" />{copy.legend.observed}</li>
        <li><span className="fp-blueprint__swatch fp-blueprint__swatch--built" aria-hidden="true" />{copy.legend.built}</li>
        <li><span className="fp-blueprint__swatch fp-blueprint__swatch--design" aria-hidden="true" />{copy.legend.design}</li>
      </ul>
      <p className="fp-blueprint__source">{copy.builtFrom}</p>

      {/* The real text for the drawing. Terse on purpose — the lanes carry it. */}
      <dl className="fp-blueprint__key">
        {([
          ["frontTerm", "frontAfter", "frontBefore"],
          ["backTerm", "backAfter", "backBefore"],
          ["supportTerm", "supportAfter", "supportBefore"],
          ["changedTerm", "changedAfter", "changedBefore"],
        ] as const).map(([term, after, before]) => (
          <div key={term}>
            <dt>{copy.key[term]}</dt>
            <dd>{showAfter ? copy.key[after] : copy.key[before]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
