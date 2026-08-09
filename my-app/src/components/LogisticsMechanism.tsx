import React from "react";

/**
 * The three logistics moves, drawn.
 *
 * These are abstracted schematics, not real military systems, maps, or
 * locations. Nothing here depicts an actual site, route, or unit position —
 * each drawing shows only the *shape* of a change Hillary has already stated
 * publicly (the warehouse move, one shared protocol across seven aid stations
 * in three countries, forecasting from weekly and monthly data). Anything more
 * specific would be both invented and inappropriate to publish.
 *
 * Decorative: the finding and change text sits beside each one, so these are
 * aria-hidden rather than repeating the same sentence to a screen reader.
 */

const INK = "currentColor";

function WarehouseMove() {
  // The supply point sat far from the aid stations it served. Moving it forward
  // shortened every run that followed.
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">BEFORE · SUPPLY POINT FAR BACK</text>
      <circle cx="6" cy="30" r="4" fill="var(--coral)" />
      <text x="14" y="23" fontSize="7" fill={INK} fillOpacity=".55">supply</text>
      <path d="M12,30 H210" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M204,26 l6,4 l-6,4" fill="none" stroke="var(--coral)" strokeWidth="1.5" />
      <text x="214" y="32.5" fontSize="7" fill={INK} fillOpacity=".55">aid</text>

      <text x="0" y="66" fontSize="7.5" letterSpacing="1" fill="var(--green)">AFTER · MOVED FORWARD</text>
      <circle cx="130" cy="86" r="4" fill="var(--green)" />
      <text x="112" y="78" fontSize="7" fill={INK} fillOpacity=".55">supply</text>
      <path d="M136,86 H210" fill="none" stroke="var(--green)" strokeWidth="2" />
      <path d="M204,82 l6,4 l-6,4" fill="none" stroke="var(--green)" strokeWidth="2" />
      <text x="214" y="88.5" fontSize="7" fill={INK} fillOpacity=".55">aid</text>
      <text x="0" y="88.5" fontSize="7" fill="var(--green)">85% less time</text>
    </svg>
  );
}

function OneProtocol() {
  // Seven aid stations across three countries, each previously reporting its
  // own way. One protocol replaced the improvisation.
  const stations = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">BEFORE · SEVEN WAYS OF ASKING</text>
      {stations.map((i) => (
        <g key={`b-${i}`}>
          <circle cx={8 + i * 20} cy="26" r="2.6" fill="none" stroke="var(--coral)" strokeWidth="1.2" />
          <path
            d={`M${8 + i * 20},29 C${8 + i * 20},38 ${120},34 ${150 + (i % 3) * 6},42`}
            fill="none"
            stroke="var(--coral)"
            strokeOpacity=".45"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        </g>
      ))}

      <text x="0" y="66" fontSize="7.5" letterSpacing="1" fill="var(--green)">AFTER · ONE PROTOCOL</text>
      {stations.map((i) => (
        <circle key={`a-${i}`} cx={8 + i * 20} cy="78" r="2.6" fill="var(--green)" />
      ))}
      <path d="M8,78 H128" fill="none" stroke="var(--green)" strokeWidth="2" />
      <text x="152" y="80.5" fontSize="7" fill={INK} fillOpacity=".55">3 countries, one format</text>
    </svg>
  );
}

function Forecasting() {
  // Ordering moved from reacting to a shortage to projecting from weekly and
  // monthly consumption.
  const bars = [24, 34, 20, 40, 28, 44, 30];
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">BEFORE · ORDER WHEN IT RUNS OUT</text>
      <path d="M0,34 H210" fill="none" stroke="var(--coral)" strokeOpacity=".4" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="196" cy="34" r="3.4" fill="var(--coral)" />
      <text x="214" y="36.5" fontSize="7" fill="var(--coral)">stockout</text>

      <text x="0" y="62" fontSize="7.5" letterSpacing="1" fill="var(--green)">AFTER · WEEKLY + MONTHLY DEMAND</text>
      {bars.map((h, i) => (
        <rect key={i} x={4 + i * 15} y={92 - h * 0.6} width="8" height={h * 0.6} rx="1.5"
          fill="var(--green)" fillOpacity={0.35 + (i % 3) * 0.2} />
      ))}
      <path d="M116,74 H170" fill="none" stroke="var(--green)" strokeWidth="2" />
      <path d="M164,70 l6,4 l-6,4" fill="none" stroke="var(--green)" strokeWidth="2" />
      <text x="176" y="76.5" fontSize="7" fill="var(--green)">60% less spend</text>
    </svg>
  );
}

const MAP: Record<string, () => React.ReactElement> = {
  "01": WarehouseMove,
  "02": OneProtocol,
  "03": Forecasting,
};

export default function LogisticsMechanism({ n }: { n: string }) {
  const Diagram = MAP[n];
  if (!Diagram) return null;
  return (
    <div className="fp-mechanism" aria-hidden="true">
      <Diagram />
    </div>
  );
}
