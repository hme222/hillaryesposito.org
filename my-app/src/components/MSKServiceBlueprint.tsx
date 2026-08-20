import React, { useState } from "react";

/**
 * MSK service blueprint — the filing path drawn as actors and lines, not steps.
 *
 * Why this exists alongside MSKWorkflowMap: the workflow map answers "how many
 * steps," which is a process question. A blueprint answers "who is holding the
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

type Node = { label: string; lane: Lane; col: number };

/**
 * The support lane is the tell. Before, the EMR holds the record at the start
 * and the end but not in the middle — the gap in that row is the gap the whole
 * redesign closed. After, the row is unbroken.
 */
const BEFORE: Node[] = [
  { label: "Dashboard queue", lane: "evidence", col: 0 },
  { label: "Open queue", lane: "front", col: 0 },
  { label: "Record in the EMR", lane: "support", col: 0 },
  { label: "Record on screen", lane: "evidence", col: 1 },
  { label: "Find document", lane: "front", col: 1 },
  { label: "Printed page", lane: "evidence", col: 2 },
  { label: "Print the record", lane: "front", col: 2 },
  { label: "Paper in transit", lane: "evidence", col: 3 },
  { label: "Route to imaging", lane: "back", col: 3 },
  { label: "Scan queue", lane: "evidence", col: 4 },
  { label: "Wait for scan", lane: "back", col: 4 },
  { label: "Chart entry", lane: "evidence", col: 5 },
  { label: "Re-check filing", lane: "front", col: 5 },
  { label: "Back in the EMR", lane: "support", col: 5 },
];

const AFTER: Node[] = [
  { label: "Dashboard queue", lane: "evidence", col: 0 },
  { label: "Open queue", lane: "front", col: 0 },
  { label: "Record in the EMR", lane: "support", col: 0 },
  { label: "Record on screen", lane: "evidence", col: 1 },
  { label: "Select document", lane: "front", col: 1 },
  { label: "Ready + role checked", lane: "support", col: 1 },
  { label: "One action", lane: "evidence", col: 2 },
  { label: "Send to EMR", lane: "front", col: 2 },
  { label: "Permission allows it", lane: "support", col: 2 },
  { label: "Chart entry", lane: "evidence", col: 3 },
  { label: "Files in the chart", lane: "support", col: 3 },
  { label: "Queue status", lane: "evidence", col: 4 },
  { label: "Return, status updated", lane: "front", col: 4 },
  { label: "Still in the EMR", lane: "support", col: 4 },
];

const LANES: Array<{ key: Lane; label: string; sub: string }> = [
  { key: "evidence", label: "Evidence", sub: "What exists" },
  { key: "front", label: "Coordinator", sub: "Frontstage" },
  { key: "back", label: "Imaging", sub: "Backstage" },
  { key: "support", label: "EMR + permissions", sub: "Support" },
];

const W = 940;
const PAD_L = 150;
const PAD_R = 18;
const NODE_H = 36;

const LANE_Y: Record<Lane, number> = {
  evidence: 28,
  front: 92,
  back: 172,
  support: 238,
};

const VIS_LINE_Y = 152; // between frontstage and backstage
const H = 300;

function column(index: number, count: number) {
  const usable = W - PAD_L - PAD_R;
  const colW = usable / count;
  return { x: PAD_L + index * colW + 5, w: colW - 10 };
}

export default function MSKServiceBlueprint() {
  const [showAfter, setShowAfter] = useState(false);
  const nodes = showAfter ? AFTER : BEFORE;

  const count = Math.max(...nodes.map((n) => n.col)) + 1;

  // The window where the record is below the line of visibility and the
  // coordinator has no signal. Columns 3 and 4 of the before path.
  const blindFrom = column(3, count);
  const blindTo = column(4, count);

  return (
    <div className="fp-blueprint">
      <div className="fp-blueprint__controls">
        <div className="fp-blueprint__switch" role="group" aria-label="Choose which path the blueprint shows">
          <button
            type="button"
            className={!showAfter ? "is-active" : undefined}
            aria-pressed={!showAfter}
            onClick={() => setShowAfter(false)}
          >
            Before · one handoff
          </button>
          <button
            type="button"
            className={showAfter ? "is-active" : undefined}
            aria-pressed={showAfter}
            onClick={() => setShowAfter(true)}
          >
            After · no handoff
          </button>
        </div>
        <p className="fp-blueprint__status" aria-live="polite">
          {showAfter
            ? "The record never leaves the coordinator's line of sight, and the queue reports back."
            : "For two steps the record sits below the line of visibility, owned by nobody the coordinator can see."}
        </p>
      </div>

      <div className="fp-blueprint__canvas" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="presentation" focusable="false">
          {/* lane labels + rules */}
          {LANES.map((lane) => (
            <g key={lane.key}>
              <text x="0" y={LANE_Y[lane.key] + 15} fontSize="11.5" fill="currentColor" fillOpacity="0.9">
                {lane.label}
              </text>
              <text x="0" y={LANE_Y[lane.key] + 29} fontSize="9" letterSpacing="1.1" fill="currentColor" fillOpacity="0.45">
                {lane.sub.toUpperCase()}
              </text>
              <line
                x1={PAD_L - 10}
                y1={LANE_Y[lane.key] + NODE_H / 2}
                x2={W}
                y2={LANE_Y[lane.key] + NODE_H / 2}
                stroke="currentColor"
                strokeOpacity="0.08"
              />
            </g>
          ))}

          {/* the blind window — the whole point of the drawing */}
          {!showAfter && (
            <g>
              {/* Spans the coordinator's dead time as well as the backstage
                  work: the point is that nothing is happening above the line
                  while something is happening below it. */}
              <rect
                x={blindFrom.x - 5}
                y={LANE_Y.front - 8}
                width={blindTo.x + blindTo.w - blindFrom.x + 10}
                height={LANE_Y.back + NODE_H + 14 - LANE_Y.front + 8}
                fill="var(--coral)"
                fillOpacity="0.07"
              />
              <text
                x={blindFrom.x + 6}
                y={LANE_Y.front + NODE_H / 2 + 4}
                fontSize="10"
                fill="var(--coral)"
                fillOpacity="0.75"
              >
                coordinator is waiting
              </text>
              <text
                x={blindFrom.x}
                y={LANE_Y.back + NODE_H + 26}
                fontSize="10"
                letterSpacing="1.1"
                fill="var(--coral)"
                fillOpacity="0.95"
              >
                NO RETURN SIGNAL — WHICH IS WHY STEP 06 EXISTS
              </text>
            </g>
          )}

          {/* line of visibility */}
          <line
            x1="0"
            y1={VIS_LINE_Y}
            x2={W}
            y2={VIS_LINE_Y}
            stroke="currentColor"
            strokeOpacity="0.5"
            strokeWidth="1.25"
            strokeDasharray="6 4"
          />
          <text x="0" y={VIS_LINE_Y - 6} fontSize="9" letterSpacing="1.2" fill="currentColor" fillOpacity="0.55">
            LINE OF VISIBILITY
          </text>

          {/* nodes, in evidence/action pairs per column */}
          {nodes.map((node, i) => {
            const { x, w } = column(node.col, count);
            const y = LANE_Y[node.lane];
            const isEvidence = node.lane === "evidence";
            // Only the backstage lane is drawn as an exception. The support lane
            // is drawn plainly, so that in the before path its own gap — not a
            // colour — is what reads.
            const isCrossing = node.lane === "back";

            return (
              <g key={`${node.label}-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={NODE_H}
                  rx={3}
                  fill={isEvidence ? "none" : "var(--paper)"}
                  stroke={isCrossing ? "var(--coral)" : "currentColor"}
                  strokeOpacity={isCrossing ? 0.95 : isEvidence ? 0.22 : 0.42}
                  strokeWidth={isCrossing ? 1.75 : 1.25}
                  strokeDasharray={isEvidence ? "3 3" : isCrossing ? "5 4" : undefined}
                />
                <text
                  x={x + w / 2}
                  y={y + NODE_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="currentColor"
                  fillOpacity={isEvidence ? 0.6 : 0.9}
                >
                  {node.label}
                </text>
              </g>
            );
          })}

          {/* The support lane's continuity is the argument, so draw the thread
              through it: unbroken after, broken across the handoff before. */}
          {(() => {
            const support = nodes.filter((n) => n.lane === "support").sort((a, b) => a.col - b.col);
            const y = LANE_Y.support + NODE_H / 2;
            return support.slice(0, -1).map((n, i) => {
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
            });
          })()}

          {/* the handoff arrow: frontstage hands the record across a department line */}
          {!showAfter && (
            <path
              d={`M${column(2, count).x + column(2, count).w / 2},${LANE_Y.front + NODE_H}
                  C${column(2, count).x + column(2, count).w / 2},${LANE_Y.front + NODE_H + 40}
                   ${blindFrom.x + blindFrom.w / 2},${LANE_Y.back - 40}
                   ${blindFrom.x + blindFrom.w / 2},${LANE_Y.back}`}
              fill="none"
              stroke="var(--coral)"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>

      {/* The real text for the drawing. Terse on purpose — the lanes carry it. */}
      <dl className="fp-blueprint__key">
        <div>
          <dt>Coordinator · frontstage</dt>
          <dd>
            {showAfter
              ? "Opens the queue, selects the document, sends it to the chart, and lands back on the queue with the status already updated."
              : "Opens the queue, finds the document, prints it — then has to return later and check whether it was ever filed."}
          </dd>
        </div>
        <div>
          <dt>Imaging · backstage</dt>
          <dd>
            {showAfter
              ? "Not on this path any more. The department that used to receive paper never enters the filing workflow."
              : "Receives the paper and scans it. Doing the work correctly, out of sight, with no way to report back into the queue."}
          </dd>
        </div>
        <div>
          <dt>EMR and permissions · support</dt>
          <dd>
            {showAfter
              ? "Writes the record into the online chart, and exposes the action only when the record is ready and the role allows it."
              : "Holds the record before it is printed and after it is scanned — but not in between, which is where the gap is."}
          </dd>
        </div>
        <div>
          <dt>What changed</dt>
          <dd>
            {showAfter
              ? "One department left the path. The record stays above the line of visibility from open to confirmation."
              : "Six steps, but only one that matters: the moment the record crosses a department line with no signal coming back."}
          </dd>
        </div>
      </dl>
    </div>
  );
}
