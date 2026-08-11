import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/frame-of-intent.css";

const SOURCE_STEPS = [
  "Open queue",
  "Find doc",
  "Print",
  "Route to imaging",
  "Wait for scan",
  "Re-check filing",
];

const DECISION_STEPS = [
  "Open queue",
  "Select doc",
  "Send to EMR",
  "Files in chart",
  "Status updated",
];

const clampProgress = (value: number) => Math.min(100, Math.max(0, value));

const valueText = (progress: number) => {
  if (progress === 0) return "Source condition";
  if (progress === 100) return "Hillary’s decision";
  return `${progress}% toward Hillary’s decision`;
};

type DragState = {
  pointerId: number;
  startProgress: number;
  startX: number;
  moved: boolean;
};

export default function FrameOfIntent() {
  const [decisionProgress, setDecisionProgress] = useState(100);
  const progress = useRef(100);
  const [announcement, setAnnouncement] = useState(
    "Hillary’s decision shown. Five steps keep the document inside the electronic medical record."
  );
  const drag = useRef<DragState | null>(null);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const updateProgress = (next: number, announceEndpoint = false) => {
    const bounded = clampProgress(next);
    progress.current = bounded;
    setDecisionProgress(bounded);
    if (announceEndpoint && (bounded === 0 || bounded === 100)) {
      setAnnouncement(
        bounded === 0
          ? "Source condition shown. Six steps route the document through paper and imaging."
          : "Hillary’s decision shown. Five steps keep the document inside the electronic medical record."
      );
    }
  };

  const showEndpoint = (next: 0 | 100) => updateProgress(next, true);

  const handleRangeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const requested = Number(event.currentTarget.value);
    const next = prefersReducedMotion() ? (requested < 50 ? 0 : 100) : requested;
    updateProgress(next, next === 0 || next === 100);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture?.(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      startProgress: decisionProgress,
      startX: event.clientX,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;

    const stage = event.currentTarget.closest<HTMLElement>(".foi-stage");
    const railWidth = Math.max(stage?.getBoundingClientRect().width ?? 320, 160);
    const delta = ((event.clientX - active.startX) / railWidth) * 100;
    active.moved = active.moved || Math.abs(event.clientX - active.startX) > 4;
    const next = prefersReducedMotion()
      ? (active.startProgress + delta < 50 ? 0 : 100)
      : active.startProgress + delta;
    updateProgress(next);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;

    if (!active.moved) {
      showEndpoint(progress.current < 50 ? 100 : 0);
    } else if (progress.current === 0 || progress.current === 100) {
      updateProgress(progress.current, true);
    }
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    drag.current = null;
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;
    updateProgress(active.startProgress);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    drag.current = null;
  };

  const progressStyle = {
    "--foi-progress": decisionProgress / 100,
  } as React.CSSProperties;

  return (
    <section className="foi" aria-labelledby="frame-of-intent-title">
      <div className="foi-intro">
        <p className="foi-kicker">FRAME OF INTENT · DECISION FRAME 01</p>
        <h3 id="frame-of-intent-title">A paper detour became an in-system path.</h3>
        <p className="foi-promise">
          Inspect the source condition, Hillary’s decision, and the boundary of her role.
        </p>
      </div>

      <Link className="foi-route-link" to="/case-study/msk">
        Open the MSK case study
      </Link>

      <div className="foi-evidence" aria-label="MSK source and decision evidence">
        <section aria-labelledby="foi-decision-title">
          <p className="foi-state-label" id="foi-decision-title">Hillary’s decision · In-system path</p>
          <p className="foi-decision-label">Decision</p>
          <p className="foi-decision-statement">
            Keep the document inside the electronic medical record.
          </p>
          <p className="foi-route">{DECISION_STEPS.join(" → ")}</p>
        </section>
        <section aria-labelledby="foi-source-title">
          <p className="foi-state-label" id="foi-source-title">Source condition · Paper detour</p>
          <p className="foi-route">{SOURCE_STEPS.join(" → ")}</p>
        </section>
      </div>

      <div className="foi-boundary">
        <p className="foi-state-label">Role and source boundary</p>
        <p>
          Hillary initiated the redesign as a coordinator. It was later implemented within a larger
          EMR initiative. The workflow is recreated, contains no patient data, and is not an Epic screen.
        </p>
      </div>

      <div className="foi-instrument" style={progressStyle}>
        <p className="foi-instruction">
          Move one point or use the range to inspect the change.
        </p>

        <div className="foi-stage" aria-hidden="true">
          <div className="foi-stage__material" />
          <span className="foi-stage__label foi-stage__label--outside">
            Outside frame: raw project complexity
          </span>
          <span className="foi-stage__label foi-stage__label--inside">
            Inside frame: selected decision evidence
          </span>
          {["north-west", "north-east", "south-west", "south-east"].map((corner) => (
            <div
              className={`foi-node foi-node--${corner}`}
              data-frame-node={corner}
              key={corner}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <span />
            </div>
          ))}
        </div>

        <div className="foi-controls">
          <label htmlFor="decision-progress">Inspect the decision</label>
          <div className="foi-range-wrap">
            <span>Source condition</span>
            <input
              id="decision-progress"
              type="range"
              min="0"
              max="100"
              step="5"
              value={decisionProgress}
              aria-valuetext={valueText(decisionProgress)}
              onInput={handleRangeChange}
            />
            <span>Hillary's decision</span>
          </div>
          <div className="foi-endpoints" aria-label="Decision frame endpoints">
            <button type="button" onClick={() => showEndpoint(0)}>Show source condition</button>
            <button type="button" onClick={() => showEndpoint(100)}>Show Hillary's decision</button>
          </div>
          <p className="foi-status" aria-live="polite" aria-atomic="true">{announcement}</p>
        </div>
      </div>

      <details className="foi-production">
        <summary>Production run 01 · Grove × Higgsfield</summary>
        <p className="foi-production__overview">
          The same system governed an AI-assisted production run for Grove. This record shows the
          decisions; the finished artifact stays in its case study.
        </p>
        <dl>
          <div>
            <dt>Intent</dt>
            <dd>Make Grove’s evidence more cinematic.</dd>
          </div>
          <div>
            <dt>Protected</dt>
            <dd>Preserve the exact screens, copy, numbers, product truth, ownership, provenance, and case-study route.</dd>
          </div>
          <div>
            <dt>Routed</dt>
            <dd>Use deterministic composition and encoding in Higgsfield’s environment. Do not generatively alter protected evidence.</dd>
          </div>
          <div>
            <dt>Rejected</dt>
            <dd>The static first export and clipped portrait attempts.</dd>
          </div>
          <div>
            <dt>Accepted</dt>
            <dd>Corrected formats, after frame, layout, accessibility, and provenance checks.</dd>
          </div>
          <div>
            <dt>Result boundary</dt>
            <dd>This run shows a governed production method. It does not claim that Higgsfield designed Grove or generated its product evidence.</dd>
          </div>
        </dl>
        <p className="foi-hard-boundary">
          <strong>Hard generative boundary:</strong> Higgsfield may shape motion, camera, light, texture,
          and composition. It may never rewrite evidence, interface text, metrics, ownership, provenance,
          or routes.
        </p>
        <Link className="foi-grove-link" to="/case-study/grove">Open the Grove case study</Link>
      </details>
    </section>
  );
}
