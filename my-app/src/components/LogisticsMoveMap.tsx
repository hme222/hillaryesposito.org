import React, { useState } from "react";
import "../styles/log-map.css";

type Mode = "before" | "after";

// Every fact here is already on the Logistics page: seven aid stations in
// three countries, a $2M warehouse move forward done in phases, and
// resupply (per her Officer Evaluation Report) going from 1–2 months to 1–2 weeks. It is a
// schematic, not a map: no real places, routes or unit positions (same rule as
// OrderStatusBoard), so the shapes and positions are invented on purpose.
const OLD = { x: 46, y: 292 };
const NEW = { x: 330, y: 172 };
const STATIONS = [
  { x: 206, y: 78 }, { x: 266, y: 136 }, { x: 178, y: 158 },
  { x: 404, y: 64 }, { x: 474, y: 142 },
  { x: 262, y: 262 }, { x: 424, y: 268 },
];
const REGIONS = [
  "M150 40 C196 18 268 26 300 52 C318 92 306 150 296 182 C252 196 196 196 156 178 C132 140 128 82 150 40 Z",
  "M312 34 C366 14 446 18 508 42 C528 92 522 162 500 196 C446 210 372 206 318 190 C306 140 304 80 312 34 Z",
  "M176 214 C228 200 330 200 392 206 C450 210 486 226 494 262 C484 300 438 318 372 318 C300 320 222 314 186 298 C168 270 166 236 176 214 Z",
];

/**
 * @status: stable
 * @purpose: The Medical logistics hero picture: a schematic (not a real map) of three country zones and seven aid stations, with a Before/After switch that moves the supply point from far back to forward and shortens every resupply route; the header states the OER-sourced 1–2 months → 1–2 weeks. Pick this to show the whole warehouse move at a glance; for the three small before/after line drawings use LogisticsMechanism, for order status across stations use OrderStatusBoard. `decorative` renders the After map only, with no switch, legend or caption, for the Home work card.
 */
export default function LogisticsMoveMap({ initialMode = "after", decorative = false }: { initialMode?: Mode; decorative?: boolean }) {
  const [mode, setMode] = useState<Mode>(decorative ? "after" : initialMode);
  const at = mode === "after" ? NEW : OLD;
  const label = mode === "after"
    ? "After: the supply point sits forward, among the seven aid stations in three countries. Every resupply route is short. Resupply time, per my Officer Evaluation Report: 1 to 2 weeks."
    : "Before: the supply point sits far behind the seven aid stations in three countries. Every resupply route is long. Resupply time, per my Officer Evaluation Report: 1 to 2 months.";

  return (
    <figure className={`log-map log-map--${mode}${decorative ? " log-map--static" : ""}`} aria-hidden={decorative || undefined}>
      {!decorative && <div className="log-map__bar">
        <div className="log-map__tabs" role="group" aria-label="Which version to show">
          <button type="button" aria-pressed={mode === "before"} onClick={() => setMode("before")}>Before</button>
          <button type="button" aria-pressed={mode === "after"} onClick={() => setMode("after")}>After</button>
        </div>
        <p className="log-map__count">
          <b>{mode === "after" ? "1–2 weeks" : "1–2 months"}</b>
          <span>{mode === "after" ? "to resupply, after the move" : "to resupply, from far back"}</span>
        </p>
      </div>}

      <svg viewBox="0 0 560 340" className="log-map__svg" role={decorative ? undefined : "img"} aria-label={decorative ? undefined : label}>
        {REGIONS.map((d) => <path key={d} d={d} className="log-map__region" />)}

        {STATIONS.map((s) => (
          <line key={`r-${s.x}`} x1={at.x} y1={at.y} x2={s.x} y2={s.y} className="log-map__route" />
        ))}

        {mode === "after" && (
          <g className="log-map__ghost" aria-hidden="true">
            <circle cx={OLD.x} cy={OLD.y} r="11" />
            <path d={`M${OLD.x + 16} ${OLD.y - 8} C 150 270, 230 210, ${NEW.x - 22} ${NEW.y + 10}`} className="log-map__moveLine" />
          </g>
        )}

        {STATIONS.map((s) => (
          <g key={`s-${s.x}`} className="log-map__station" transform={`translate(${s.x} ${s.y})`}>
            <circle r="11" />
            <path d="M-5 0h10M0 -5v10" />
          </g>
        ))}

        <g className="log-map__depot" transform={`translate(${at.x} ${at.y})`}>
          <rect x="-15" y="-13" width="30" height="26" rx="5" />
          <path d="M-8 -2 0 -8 8 -2M-6 -2v9h12v-9" />
        </g>
      </svg>

      {!decorative && <ul className="log-map__legend" aria-hidden="true">
        <li><span className="log-map__key log-map__key--depot" />Supply point</li>
        <li><span className="log-map__key log-map__key--station" />Aid station (7)</li>
        <li><span className="log-map__key log-map__key--region" />Country (3)</li>
      </ul>}
      {!decorative && <figcaption>A schematic, not a map: no real places, routes or unit positions.</figcaption>}
    </figure>
  );
}
