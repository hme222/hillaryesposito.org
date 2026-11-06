import React from "react";

/**
 * @status: stable
 * @purpose: A quiet "Read more" link that opens the supporting words of a case-study section, built on a native details element, so a section shows only its headline and visual until a reader asks for more. Pick this for explanatory prose, notes and caveats inside a case study; for a whole closed section use the rp-deepDive pattern, for Home's closed rows use HomeFold, and for the figures behind a claim use EvidenceField. Nothing important is only inside it: the headline and visual already carry the claim.
 */
export default function CaseMore({ label = "Read more", closeLabel = "Show less", children }: {
  /** Summary text while closed. */
  label?: string;
  /** Summary text while open. */
  closeLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <details className="rp-more">
      <summary>
        <span className="rp-more__closed">{label}</span>
        <span className="rp-more__open">{closeLabel}</span>
      </summary>
      <div className="rp-more__body">{children}</div>
    </details>
  );
}
