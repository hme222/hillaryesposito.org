import React from "react";

/**
 * The mechanism under each of the three MSK redesigns, drawn.
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

function Filing() {
  // Before: a detour out of the system. After: one hop.
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">BEFORE</text>
      <rect x="0" y="16" width="62" height="22" rx="2" fill="none" stroke={INK} strokeOpacity=".45" />
      <text x="31" y="30" fontSize="8" textAnchor="middle" fill={INK} fillOpacity=".8">Dashboard</text>
      <path d="M62,27 C80,27 80,52 98,52" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="98" y="41" width="62" height="22" rx="2" fill="none" stroke="var(--coral)" strokeDasharray="4 3" />
      <text x="129" y="55" fontSize="8" textAnchor="middle" fill="var(--coral)">Paper</text>
      <path d="M160,52 C178,52 178,27 196,27" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="196" y="16" width="62" height="22" rx="2" fill="none" stroke={INK} strokeOpacity=".45" />
      <text x="227" y="30" fontSize="8" textAnchor="middle" fill={INK} fillOpacity=".8">Chart</text>

      <text x="0" y="80" fontSize="7.5" letterSpacing="1" fill="var(--green)">AFTER</text>
      <rect x="0" y="86" width="62" height="10" rx="2" fill="none" stroke="var(--green)" />
      <line x1="62" y1="91" x2="196" y2="91" stroke="var(--green)" strokeWidth="1.5" />
      <rect x="196" y="86" width="62" height="10" rx="2" fill="none" stroke="var(--green)" />
    </svg>
  );
}

function Certification() {
  // A timeline: the old system spoke only after expiry; the new one speaks before.
  const marks = [
    { x: 40, label: "90" },
    { x: 100, label: "60" },
    { x: 160, label: "30" },
  ];
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--green)">AFTER · WARNS BEFORE</text>
      <line x1="0" y1="40" x2="230" y2="40" stroke={INK} strokeOpacity=".3" />
      {marks.map((m) => (
        <g key={m.label}>
          <line x1={m.x} y1="32" x2={m.x} y2="48" stroke="var(--green)" strokeWidth="1.5" />
          <text x={m.x} y="26" fontSize="8" textAnchor="middle" fill="var(--green)">{m.label}d</text>
        </g>
      ))}
      <line x1="230" y1="26" x2="230" y2="54" stroke="var(--coral)" strokeWidth="2" />
      <text x="230" y="64" fontSize="7.5" textAnchor="end" fill="var(--coral)">expiry</text>

      <text x="0" y="84" fontSize="7.5" letterSpacing="1" fill="var(--coral)">BEFORE · ONLY AFTER</text>
      <line x1="0" y1="92" x2="230" y2="92" stroke={INK} strokeOpacity=".18" strokeDasharray="3 3" />
      <circle cx="242" cy="92" r="3.5" fill="var(--coral)" />
    </svg>
  );
}

function Onboarding() {
  // Five parallel department tracks collapsing into one sequenced path.
  return (
    <svg viewBox="0 0 260 96" width="100%" role="presentation" focusable="false">
      <text x="0" y="9" fontSize="7.5" letterSpacing="1" fill="var(--coral)">BEFORE · 5 CHECKLISTS</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M0,${18 + i * 9} H96 C120,${18 + i * 9} 120,52 144,52`}
          fill="none"
          stroke="var(--coral)"
          strokeOpacity=".55"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      ))}
      <line x1="144" y1="52" x2="248" y2="52" stroke="var(--green)" strokeWidth="2" />
      <text x="248" y="44" fontSize="7.5" textAnchor="end" fill="var(--green)">one sequenced path</text>
      <text x="0" y="88" fontSize="7.5" fill={INK} fillOpacity=".55">
        safety prerequisites gate patient contact
      </text>
    </svg>
  );
}

const MAP: Record<string, () => React.ReactElement> = {
  "01": Filing,
  "02": Certification,
  "03": Onboarding,
};

export default function MSKMechanism({ n }: { n: string }) {
  const Diagram = MAP[n];
  if (!Diagram) return null;
  return (
    <div className="fp-mechanism" aria-hidden="true">
      <Diagram />
    </div>
  );
}
