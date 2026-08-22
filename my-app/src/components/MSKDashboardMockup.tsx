import React from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

type MSKDashboardMockupProps = {
  compact?: boolean;
  headingLevel?: 2 | 3;
  activeRow?: number | null;
  copy?: MskCopy["dashboard"];
};

// Anonymized recreation. MRNs are masked (last 4 only) — the queue is patient-
// anchored, the way a real chart-filing work queue is, but no real identifiers
// or PHI appear.
//
// Whose screen this is matters. Hillary sat in the Office Coordinator seat, so
// this is that seat: her own queue of patient documents waiting to go into the
// chart, with one button that sends the document to the EMR. It is not a
// clinician's chart view — a clinician reads charts, they do not file into
// them, and framing it that way described a job nobody in this story had.
//
// `slug` is explicit rather than derived from the label so the status colors
// stay bound to meaning, not to wording.
// Row data now lives in data/mskCaseStudy.ts so it can localise.

export default function MSKDashboardMockup({ compact = false, headingLevel = 3, activeRow = null, copy = MSK_COPY.en.dashboard }: MSKDashboardMockupProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={`msk-dashboard-mockup${compact ? " msk-dashboard-mockup--compact" : ""}`} role="group" aria-label={copy.groupAria}>
      {/* The role used to ride along on the eyebrow, which pushed that line to
          two wrapped rows above the heading and made the whole header read as
          clutter. It is a chip now — same information, one line each. */}
      <div className="msk-dashboard-mockup__topbar">
        <div>
          <p className="msk-dashboard-mockup__eyebrow">{copy.eyebrow}</p>
          <Heading>{copy.title}</Heading>
        </div>
        <span className="msk-dashboard-mockup__meta">
          <span className="msk-dashboard-mockup__role">{copy.roleView}</span>
          <span className="msk-dashboard-mockup__timestamp">{copy.queueMeta}</span>
        </span>
      </div>

      <div className="msk-dashboard-mockup__toolbar" aria-hidden="true">
        {copy.toolbar.map((filter) => <span key={filter}>{filter}</span>)}
      </div>

      <div className="msk-dashboard-mockup__table" role="table" aria-label={copy.tableAria} tabIndex={0}>
        <div className="msk-dashboard-mockup__row msk-dashboard-mockup__row--head" role="row">
          <span role="columnheader">{copy.columns.patient}</span>
          <span role="columnheader">{copy.columns.document}</span>
          <span role="columnheader">{copy.columns.status}</span>
          <span role="columnheader">{copy.columns.routedTo}</span>
          <span role="columnheader">{copy.columns.action}</span>
        </div>
        {copy.rows.map((row, index) => (
          <div
            className={`msk-dashboard-mockup__row${activeRow === index ? " is-active" : ""}`}
            role="row"
            key={row.mrn}
            data-status={row.slug}
          >
            <span role="cell" className="msk-dashboard-mockup__mrn">
              <span>MRN {row.mrn}</span>
              <small>{row.received}</small>
            </span>
            <span role="cell">{row.doc}</span>
            <span role="cell">
              <span className={`msk-dashboard-status msk-dashboard-status--${row.slug}`}>
                {row.status}
              </span>
            </span>
            <span role="cell">{row.routed}</span>
            <span role="cell">
              <span className={row.slug === "ready-to-file" ? "msk-dashboard-action msk-dashboard-action--primary" : "msk-dashboard-action"}>
                {row.action}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* The queue uses the shorthand the real screen used. Spelling it out here
          keeps the artifact authentic while staying readable to anyone who has
          never worked in a hospital. */}
      <div className="msk-dashboard-mockup__legend">
        <span><b>{copy.mrnTerm}</b> — {copy.mrnDef}</span>
        <span><b>{copy.emrTerm}</b> — {copy.emrDef}</span>
      </div>

      <div className="msk-dashboard-mockup__rule">
        <span>
          {copy.ruleLabel} <strong>{copy.ruleAction}</strong> {copy.rule}
        </span>
      </div>
    </div>
  );
}
