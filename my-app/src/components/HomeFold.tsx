import React, { useEffect, useRef } from "react";

/**
 * @status: stable
 * @purpose: A closed-by-default section on the Home page: a ruled header row with a title, an optional one-line summary, and a hover/focus hint, built on a native details element. Click, Enter and Space open it; hover and keyboard focus only show the hint, so nothing depends on a mouse. Pick this to keep Home short; for optional evidence inside a case study use EvidenceField, and for a single labelled term use Term. A URL hash listed in hashIds opens it.
 */
export default function HomeFold({ id, title, summary, hint, openLabel, closeLabel, hashIds = [], children }: {
  /** Used for the details element id and the summary label. */
  id: string;
  title: string;
  /** One line that stays visible when closed. */
  summary?: string;
  /** Extra line shown on hover or focus. Decorative: everything in it also appears once opened. */
  hint?: string;
  openLabel: string;
  closeLabel: string;
  /** Hash targets (without #) that should open this fold, such as the section id it sits in. */
  hashIds?: string[];
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  const hashKey = hashIds.join("|");

  useEffect(() => {
    const ids = hashKey ? hashKey.split("|") : [];
    const openForHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ids.includes(hash) && ref.current) ref.current.open = true;
    };
    openForHash();
    window.addEventListener("hashchange", openForHash);
    return () => window.removeEventListener("hashchange", openForHash);
  }, [hashKey]);

  return (
    <details
      ref={ref}
      id={id}
      className="rp-deepDive rp-fold"
      onToggle={() => window.dispatchEvent(new Event("resize"))}
    >
      <summary>
        <span className="rp-deepDive__copy">
          <b className="rp-deepDive__title">{title}</b>
          {summary ? <span className="rp-fold__summary">{summary}</span> : null}
          {hint ? <span className="rp-fold__hint" aria-hidden="true">{hint}</span> : null}
        </span>
        <span className="rp-deepDive__state" aria-hidden="true">
          <span className="rp-deepDive__stateClosed">{openLabel}</span>
          <span className="rp-deepDive__stateOpen">{closeLabel}</span>
        </span>
      </summary>
      <div className="rp-fold__body">{children}</div>
    </details>
  );
}
