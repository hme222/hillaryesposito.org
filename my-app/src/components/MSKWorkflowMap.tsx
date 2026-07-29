import React from "react";

/**
 * MSK workflow map — the six-step and five-step paths drawn as a process map.
 *
 * Why a diagram and not a screenshot: the "before" here is a paper-routing
 * procedure, so there is no prior screen to show. Faking one would break the
 * page's own rule that a before/after must pair real artifact against real
 * artifact. Current-state mapping is one of the methods this case study names,
 * and it is what actually existed — so the honest artifact is the map.
 *
 * The point the prose was making is a shape: the old path leaves the EMR lane
 * for three steps and has to come back. Drawn, that detour is visible before
 * anything is read.
 *
 * Decorative-only: every step is already in the adjacent ordered lists, which
 * remain the accessible text. This is aria-hidden so screen readers get the
 * lists once rather than the same sequence twice.
 */

type Step = { label: string; lane: "system" | "paper" };

const BEFORE: Step[] = [
  { label: "Open queue", lane: "system" },
  { label: "Find doc", lane: "system" },
  { label: "Print", lane: "paper" },
  { label: "Route to imaging", lane: "paper" },
  { label: "Wait for scan", lane: "paper" },
  { label: "Re-check filing", lane: "system" },
];

const AFTER: Step[] = [
  { label: "Open queue", lane: "system" },
  { label: "Select doc", lane: "system" },
  { label: "File to chart", lane: "system" },
  { label: "Files in chart", lane: "system" },
  { label: "Status updated", lane: "system" },
];

const W = 880;
const NODE_W = 128; // fits the longest label ("Route to imaging") without crowding
const NODE_H = 44;
const LANE_SYSTEM_Y = 26;
const LANE_PAPER_Y = 104;
const ROW_H = 190;
// The after row has no paper lane, so the canvas stops just below it rather
// than reserving a second full row of empty space.
const H = ROW_H + LANE_SYSTEM_Y + NODE_H + 26;

function Path({ steps, y0, accent }: { steps: Step[]; y0: number; accent: string }) {
  const gap = (W - 40 - NODE_W) / (steps.length - 1);
  const pos = steps.map((s, i) => ({
    ...s,
    x: 20 + i * gap,
    y: y0 + (s.lane === "paper" ? LANE_PAPER_Y : LANE_SYSTEM_Y),
  }));
  return (
    <>
      {pos.slice(0, -1).map((p, i) => {
        const n = pos[i + 1];
        const x1 = p.x + NODE_W;
        const x2 = n.x;
        const y1 = p.y + NODE_H / 2;
        const y2 = n.y + NODE_H / 2;
        const mid = (x1 + x2) / 2;
        return (
          <path
            key={i}
            d={`M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`}
            fill="none"
            stroke={p.lane !== n.lane ? accent : "currentColor"}
            strokeOpacity={p.lane !== n.lane ? 1 : 0.35}
            strokeWidth={p.lane !== n.lane ? 2 : 1.5}
            strokeDasharray={p.lane !== n.lane ? "5 4" : undefined}
          />
        );
      })}
      {pos.map((p, i) => (
        <g key={p.label + i}>
          <rect
            x={p.x}
            y={p.y}
            width={NODE_W}
            height={NODE_H}
            rx={3}
            fill={p.lane === "paper" ? "none" : "var(--paper)"}
            stroke={p.lane === "paper" ? accent : "currentColor"}
            strokeOpacity={p.lane === "paper" ? 1 : 0.45}
            strokeWidth={1.5}
            strokeDasharray={p.lane === "paper" ? "4 3" : undefined}
          />
          <text
            x={p.x + NODE_W / 2}
            y={p.y + NODE_H / 2 + 4}
            textAnchor="middle"
            fontSize="11.5"
            fill="currentColor"
            fillOpacity={0.85}
          >
            {p.label}
          </text>
        </g>
      ))}
    </>
  );
}

export default function MSKWorkflowMap() {
  return (
    <div className="fp-workflowMap" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="presentation" focusable="false">
        {/* lane guides */}
        {[0, ROW_H].map((rowY) => (
          <g key={rowY}>
            <line x1="0" y1={rowY + LANE_SYSTEM_Y + NODE_H + 16} x2={W} y2={rowY + LANE_SYSTEM_Y + NODE_H + 16}
              stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 5" />
          </g>
        ))}

        <text x="0" y="14" fontSize="10" letterSpacing="1.4" fill="var(--coral)">BEFORE · 6 STEPS · LEAVES THE EMR</text>
        <Path steps={BEFORE} y0={0} accent="var(--coral)" />

        <text x="0" y={ROW_H + 14} fontSize="10" letterSpacing="1.4" fill="var(--green)">AFTER · 5 STEPS · NEVER LEAVES THE EMR</text>
        <Path steps={AFTER} y0={ROW_H} accent="var(--green)" />

        <text x={W} y={LANE_PAPER_Y + NODE_H + 14} textAnchor="end" fontSize="10" fill="var(--coral)" fillOpacity="0.9">
          three steps outside the system
        </text>
      </svg>
    </div>
  );
}
