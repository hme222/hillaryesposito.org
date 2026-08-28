import React, { useId, useState } from "react";

/**
 * Case-study "show" primitives - the guardrail against telling-not-showing.
 *
 * The design rule (from the panel review vs. the Carmen Elena / Pilgrimz
 * standard): every design decision, edge state, or before/after must be paired
 * with the pixels it produced. That rule is enforced HERE, in the types - a
 * `DecisionCard` and every `StateMatrix` row REQUIRE a `screen`, so a
 * told-not-shown decision won't compile.
 *
 * Accessibility guardrail: every hover interaction has a keyboard + touch +
 * reduced-motion fallback. Hotspot annotations always ALSO render as a plain
 * ordered list, so nothing is hover-only.
 */

export type Shot = {
  /** Image src (required - this is the guardrail: no decision without its pixel). */
  src: string;
  /** Meaningful alt text describing what the screen shows. */
  alt: string;
};

/* ─────────────────────────── BeforeAfter ─────────────────────────── */

/**
 * @status: unused — verify before removing
 * @purpose: Renders a before/after image toggle with tab controls, crossfading between two required shots; not imported anywhere in src/ currently. Part of the unused ShowKit evidence kit — pick this for comparing exactly two images, not for pointing at regions of one (AnnotatedShot) or listing multiple states (StateMatrix). Note: MSKMechanism/LogisticsMechanism independently reimplement a before/after diagram pattern as static SVG rather than using this.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
}: {
  before: Shot;
  after: Shot;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [show, setShow] = useState<"before" | "after">("after");
  const groupId = useId();
  return (
    <figure className="ck-beforeafter">
      <div className="ck-ba__toggle" role="tablist" aria-label="Before and after">
        {(["before", "after"] as const).map((k) => (
          <button
            key={k}
            role="tab"
            id={`${groupId}-${k}`}
            aria-selected={show === k}
            aria-controls={`${groupId}-panel`}
            className={`ck-ba__tab${show === k ? " is-active" : ""}`}
            onClick={() => setShow(k)}
            type="button"
          >
            {k === "before" ? beforeLabel : afterLabel}
          </button>
        ))}
      </div>
      <div className="ck-ba__stage" id={`${groupId}-panel`} role="tabpanel">
        {/* Both mounted; crossfade via opacity (neutralized under reduced-motion). */}
        <img className={`ck-ba__img${show === "before" ? " is-on" : ""}`} src={before.src} alt={before.alt} />
        <img className={`ck-ba__img${show === "after" ? " is-on" : ""}`} src={after.src} alt={after.alt} aria-hidden={show !== "after"} />
      </div>
      {caption && <figcaption className="ck-caption">{caption}</figcaption>}
    </figure>
  );
}

/* ─────────────────────────── AnnotatedShot ────────────────────────── */

/** @purpose Position and text for one hover/focus hotspot annotation on an AnnotatedShot image. */
export type Hotspot = {
  /** Position as a % of the image box. */
  x: number;
  y: number;
  label: string;
  detail: string;
};

/**
 * @status: unused — verify before removing
 * @purpose: Renders an image with numbered hover/focus hotspot pins plus an always-visible ordered-list fallback of the same annotations; not imported anywhere in src/ currently. Part of the unused ShowKit evidence kit alongside BeforeAfter and StateMatrix — pick this specifically for pointing at regions of one image, not for comparing two images (BeforeAfter) or listing states (StateMatrix).
 */
export function AnnotatedShot({
  shot,
  hotspots,
  caption,
}: {
  shot: Shot;
  hotspots: Hotspot[];
  caption?: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <figure className="ck-annotated">
      <div className="ck-annotated__frame">
        <img src={shot.src} alt={shot.alt} className="ck-annotated__img" />
        {hotspots.map((h, i) => (
          <div
            key={i}
            className={`ck-hotspot${active === i ? " is-active" : ""}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <button
              type="button"
              className="ck-hotspot__pin"
              aria-expanded={active === i}
              aria-label={`Annotation ${i + 1}: ${h.label}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((cur) => (cur === i ? null : cur))}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
            >
              {i + 1}
            </button>
            <span className="ck-hotspot__callout" role="tooltip">
              <strong>{h.label}</strong>
              {h.detail}
            </span>
          </div>
        ))}
      </div>
      {/* Always-available fallback: nothing is hover-only. */}
      <ol className="ck-annotated__list">
        {hotspots.map((h, i) => (
          <li key={i}>
            <strong>{h.label}.</strong> {h.detail}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="ck-caption">{caption}</figcaption>}
    </figure>
  );
}

/* ─────────────────────────── DecisionCard ─────────────────────────── */

/**
 * @status: unused — verify before removing
 * @purpose: Renders an AI-suggested-vs-chose reasoning card paired with the shipped screen it produced; not imported anywhere in src/ currently. Deliberately deferred, part of the design-skills/ShowKit loop rather than a case-study narrative — not competing with DecisionStory or GroveDecisionStory, just a different track. Trigger: revisit when that track resumes.
 */
export function DecisionCard({
  ai,
  chose,
  why,
  screen,
}: {
  ai: string;
  chose: string;
  why: string;
  /** REQUIRED - the shipped screen this decision produced. The guardrail. */
  screen: Shot;
}) {
  return (
    <article className="ck-decision">
      <div className="ck-decision__reasoning">
        <p className="ck-decision__row">
          <span className="ck-decision__tag ck-decision__tag--ai">AI suggested</span>
          {ai}
        </p>
        <p className="ck-decision__row">
          <span className="ck-decision__tag ck-decision__tag--me">I chose</span>
          {chose}
        </p>
        <p className="ck-decision__why">{why}</p>
      </div>
      <figure className="ck-decision__shot">
        <img src={screen.src} alt={screen.alt} loading="lazy" />
      </figure>
    </article>
  );
}

/* ─────────────────────────── StateMatrix ──────────────────────────── */

export type StateRow = {
  state: string;
  /** REQUIRED - the screen for this state. Guardrail: no state described-only. */
  screen: Shot;
  note: string;
};

/**
 * @status: unused — verify before removing
 * @purpose: Renders a list of UI states, each paired with its screenshot and a note, so no state is described without its screen; not imported anywhere in src/ currently. Part of the unused ShowKit evidence kit — pick this for enumerating several states, not for a single region callout (AnnotatedShot) or a two-image comparison (BeforeAfter).
 */
export function StateMatrix({ rows }: { rows: StateRow[] }) {
  return (
    <ul className="ck-statematrix">
      {rows.map((r, i) => (
        <li key={i} className="ck-state">
          <figure className="ck-state__shot">
            <img src={r.screen.src} alt={r.screen.alt} loading="lazy" />
          </figure>
          <div className="ck-state__body">
            <p className="ck-state__name">{r.state}</p>
            <p className="ck-state__note">{r.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
