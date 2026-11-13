import React, { useEffect, useRef, useState } from "react";

type Mode = "before" | "after";
type IconName = "queue" | "find" | "print" | "carry" | "wait" | "check" | "pick" | "send" | "chart";

type Stop = { icon: IconName; title: string; note: string };

// Steps are the case study's own WORKFLOW_BEFORE / WORKFLOW_AFTER, restated in
// plain words. Nothing here adds a step, a team or a number.
const STOPS: Record<Mode, Stop[]> = {
  before: [
    { icon: "queue", title: "Open the queue", note: "The message is waiting in the portal." },
    { icon: "find", title: "Find the message", note: "Look for the right patient." },
    { icon: "print", title: "Print it", note: "The portal and the chart don’t talk." },
    { icon: "carry", title: "Walk it to HIM", note: "Health information management scans paper into charts." },
    { icon: "wait", title: "Wait for the scan", note: "Nobody can see how far it got." },
    { icon: "check", title: "Check back later", note: "Return to confirm it was filed." },
  ],
  after: [
    { icon: "queue", title: "Open the queue", note: "Same queue, same place." },
    { icon: "pick", title: "Pick the message", note: "It shows when it is ready." },
    { icon: "send", title: "Press Send to EMR", note: "One action replaces the print, the walk and the wait." },
    { icon: "chart", title: "It files to the chart", note: "No paper, no second team." },
    { icon: "check", title: "Come back to status", note: "The queue shows it was filed." },
  ],
};

const STEP_MS = 850;

function Icon({ name }: { name: IconName }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true" focusable="false" className="msk-journey__icon">
      {name === "queue" && (
        <g {...stroke}>
          <rect x="8" y="9" width="32" height="8" rx="3" />
          <rect x="8" y="20" width="32" height="8" rx="3" />
          <rect x="8" y="31" width="32" height="8" rx="3" />
          <circle cx="14" cy="13" r="1.4" fill="currentColor" />
        </g>
      )}
      {name === "find" && (
        <g {...stroke}>
          <rect x="6" y="12" width="26" height="19" rx="3" />
          <path d="m7 14 12 9 12-9" />
          <circle cx="32" cy="29" r="7" fill="var(--paper)" />
          <path d="m37 34 5 5" />
        </g>
      )}
      {name === "print" && (
        <g {...stroke}>
          <rect x="14" y="6" width="20" height="12" rx="2" />
          <rect x="7" y="18" width="34" height="14" rx="4" />
          <rect x="14" y="27" width="20" height="14" rx="2" fill="var(--paper)" />
          <path d="M18 33h12M18 37h8" />
        </g>
      )}
      {name === "carry" && (
        <g {...stroke}>
          <rect x="9" y="8" width="18" height="24" rx="2" />
          <path d="M13 15h10M13 20h10M13 25h6" />
          <path d="M29 36h13m0 0-4-4m4 4-4 4" />
        </g>
      )}
      {name === "wait" && (
        <g {...stroke}>
          <circle cx="24" cy="25" r="15" />
          <path d="M24 16v9l6 4" />
          <path d="M19 6h10" />
        </g>
      )}
      {name === "check" && (
        <g {...stroke}>
          <circle cx="24" cy="24" r="16" />
          <path d="m16 24 6 6 11-12" />
        </g>
      )}
      {name === "pick" && (
        <g {...stroke}>
          <rect x="6" y="10" width="28" height="20" rx="3" />
          <path d="m7 12 13 10 13-10" />
          <path d="m30 28 3 14 4-6 6-3z" fill="var(--paper)" />
        </g>
      )}
      {name === "send" && (
        <g {...stroke}>
          <rect x="5" y="15" width="38" height="18" rx="9" fill="var(--green)" stroke="var(--green)" />
          <path d="M16 24h13m0 0-4-4m4 4-4 4" stroke="var(--paper)" />
        </g>
      )}
      {name === "chart" && (
        <g {...stroke}>
          <path d="M8 14a3 3 0 0 1 3-3h9l4 4h13a3 3 0 0 1 3 3v17a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" />
          <path d="m17 28 5 5 9-10" />
        </g>
      )}
    </svg>
  );
}

function Mascot() {
  return (
    <svg viewBox="0 0 40 32" width="40" height="32" aria-hidden="true" focusable="false" className="msk-journey__mascot">
      <rect x="2" y="3" width="36" height="26" rx="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
      <path d="m4 7 16 11L36 7" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="22" r="1.6" fill="var(--ink)" />
      <circle cx="26" cy="22" r="1.6" fill="var(--ink)" />
      <path d="M17 25.2q3 2.2 6 0" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function prefersReducedMotion(): boolean {
  try {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * @status: stable
 * @purpose: A friendly picture of the MSK filing change for first-time readers: one portal message (a small envelope with a face) travels through the six before steps or the five after steps, each with a plain-word title and icon, with a Before/After switch and a "Walk it through" button that plays one pass only when pressed. Pick this to explain the change at a glance; for actor lanes and handoffs use MSKServiceBlueprint, and for the literal queue screen use MSKDashboardMockup.
 */
export default function MSKJourney() {
  const [mode, setMode] = useState<Mode>("before");
  const [at, setAt] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<number[]>([]);
  const stops = STOPS[mode];

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const choose = (next: Mode) => {
    clear();
    setRunning(false);
    setMode(next);
    setAt(0);
  };

  const walk = () => {
    clear();
    setAt(0);
    if (prefersReducedMotion()) {
      setAt(stops.length - 1);
      return;
    }
    setRunning(true);
    stops.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setAt(i), i * STEP_MS));
    });
    timers.current.push(window.setTimeout(() => setRunning(false), stops.length * STEP_MS));
  };

  return (
    <figure className={`msk-journey msk-journey--${mode}`}>
      <div className="msk-journey__bar">
        <div className="msk-journey__tabs" role="group" aria-label="Which version to show">
          <button type="button" aria-pressed={mode === "before"} onClick={() => choose("before")}>Before</button>
          <button type="button" aria-pressed={mode === "after"} onClick={() => choose("after")}>After</button>
        </div>
        <p className="msk-journey__count">
          <b>{stops.length} steps</b>
          <span>{mode === "before" ? "paper, a walk and a wait" : "one action, no paper"}</span>
        </p>
      </div>

      <ol className="msk-journey__track" style={{ "--n": stops.length } as React.CSSProperties}>
        {stops.map((stop, i) => (
          <li key={`${mode}-${stop.title}`} className={i === at ? "is-here" : i < at ? "is-done" : undefined}>
            <span className="msk-journey__rider" aria-hidden="true">{i === at ? <Mascot /> : null}</span>
            <Icon name={stop.icon} />
            <span className="msk-journey__n" aria-hidden="true">{i + 1}</span>
            <b>{stop.title}</b>
            <span>{stop.note}</span>
          </li>
        ))}
      </ol>

      <div className="msk-journey__foot">
        <button type="button" className="msk-journey__walk" onClick={walk} disabled={running}>
          {running ? "Walking…" : "Walk it through"}
        </button>
        <figcaption>One patient-portal message, drawn as a picture. Illustration, not a screenshot.</figcaption>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{running ? `Step ${at + 1}: ${stops[at].title}` : ""}</p>
    </figure>
  );
}
