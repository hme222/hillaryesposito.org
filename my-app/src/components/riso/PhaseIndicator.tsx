import React from "react";

/**
 * Phase indicator — a determinate Progress Indicator.
 *
 * "Phase 2 of 3" was written out in prose in eight places: the Grove hero, its
 * decisions section, its outcome disclaimer, the Home work tag, and the Spanish
 * data. Repeating a status in words on every surface is what a visual cue is
 * for, and it reads as hedging by the fourth time.
 *
 * The segments are the cue; the text stays for anyone who needs it and for
 * assistive tech. This is deliberately NOT a live region — the value never
 * changes while a reader is on the page.
 */
/**
 * @status: stable
 * @purpose: Renders a determinate segmented progress indicator (e.g. "Phase 2 of 3") with a full-text accessible label; used on the home page and the Grove case study page. Pick this for a discrete, named-phase count — for continuous reading position through a long page use ReadingProgress instead.
 */
export default function PhaseIndicator({
  current,
  total = 3,
  label,
  compact = false,
}: {
  current: number;
  total?: number;
  /** Full text equivalent, e.g. "Phase 2 of 3". Also the accessible name. */
  label: string;
  /** Segments only, for tight slots like a work-list tag. */
  compact?: boolean;
}) {
  return (
    <span className={`rp-phase${compact ? " rp-phase--compact" : ""}`}>
      <span className="rp-phase__track" role="img" aria-label={label}>
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`rp-phase__seg${i < current ? " is-done" : ""}`} />
        ))}
      </span>
      {!compact && <span className="rp-phase__label" aria-hidden="true">{label}</span>}
    </span>
  );
}
