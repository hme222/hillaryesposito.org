import React from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

type MSKDashboardMockupProps = {
  compact?: boolean;
  headingLevel?: 2 | 3;
  activeRow?: number | null;
  copy?: MskCopy["dashboard"];
  /** Show only these row indices (into `copy.rows`), in this order. Omit to
   *  render every row — the case-study and curated-page views still need the
   *  full set (FlagshipMSK's decision trace indexes into it by position).
   *  Used by the Home hero to show one representative row per status instead
   *  of all five, without touching the shared row data. */
  rowIndices?: number[];
  /** Fold the "anonymized concept" eyebrow and the "whose seat" role chip into
   *  one plain caption line instead of a caption + a separate pill badge.
   *  Home-hero-only density cut; default keeps the existing two-part header. */
  condensedHeader?: boolean;
  /** Hide the decorative filter-tab row. It's already `aria-hidden` (no real
   *  filtering happens in this static mockup), so hiding it costs no
   *  information for screen-reader users and only removes a visual chunk for
   *  sighted ones. Home-hero-only; case studies keep it for texture. */
  hideToolbar?: boolean;
  /** Render the MRN/EMR glossary as a closed-by-default native disclosure
   *  instead of an always-visible block — same information, opt-in depth.
   *  Home-hero-only; the full case-study view keeps it always open since a
   *  reader there has already committed to the deep read. */
  legendDisclosure?: boolean;
  /** Hide the "Rule: ..." conditional-logic callout. It's internal business
   *  logic explaining the action button, not primary evidence — genuinely
   *  optional depth in a 5-second hero scan. Home-hero-only. */
  hideRule?: boolean;
  /** Stable id placed on the `role="table"` wrapper so an external trigger
   *  elsewhere on the page can `aria-controls` it. Home-hero-only — case
   *  studies and curated pages don't pass this, so they never render a
   *  duplicate id. */
  tableId?: string;
  /** Optional control rendered as the last element inside the card, still
   *  inside `.msk-dashboard-mockup` so it inherits the same mobile
   *  `scale(.74)` transform as everything else in the card rather than
   *  rendering at a mismatched full size next to a shrunk card. Home hero
   *  uses this to compose its "View the full queue" expand/collapse trigger
   *  onto the shared component without forking it. */
  expandControl?: React.ReactNode;
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

/**
 * @status: stable
 * @purpose: Anonymized recreation of the MSK filing work-queue dashboard (masked MRNs, status rows); used on the home hero, the MSK case study, and curated role pages. Pick this for the literal dashboard-as-artifact — for a step-by-step animated demo of the same workflow use MSKFilingReceipt, for a static mechanism diagram use MSKMechanism.
 */
export default function MSKDashboardMockup({
  compact = false,
  headingLevel = 3,
  activeRow = null,
  copy = MSK_COPY.en.dashboard,
  rowIndices,
  condensedHeader = false,
  hideToolbar = false,
  legendDisclosure = false,
  hideRule = false,
  tableId,
  expandControl,
}: MSKDashboardMockupProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const visibleRows = rowIndices ? rowIndices.map((i) => copy.rows[i]).filter(Boolean) : copy.rows;
  const legendBody = (
    <>
      <span><b>{copy.mrnTerm}</b> — {copy.mrnDef}</span>
      <span><b>{copy.emrTerm}</b> — {copy.emrDef}</span>
    </>
  );

  return (
    <div className={`msk-dashboard-mockup${compact ? " msk-dashboard-mockup--compact" : ""}`} role="group" aria-label={copy.groupAria}>
      {/* The role used to ride along on the eyebrow, which pushed that line to
          two wrapped rows above the heading and made the whole header read as
          clutter. It is a chip now — same information, one line each.
          `condensedHeader` folds the eyebrow + chip into one plain caption for
          the hero, where a second badge-shaped element reads as one chunk too
          many next to the floating annotation card. */}
      {condensedHeader ? (
        // Full-width caption row, then title + timestamp share the row below.
        // Two side-by-side columns (as the standard topbar below uses) left
        // the combined "concept · whose seat" caption squeezed into half the
        // card's width, so it wrapped ugly. Stacking gives the caption the
        // whole width it needs and still reads as one header, not two.
        <div className="msk-dashboard-mockup__topbar msk-dashboard-mockup__topbar--condensed">
          <p className="msk-dashboard-mockup__eyebrow">{copy.eyebrow} · {copy.roleView}</p>
          <div className="msk-dashboard-mockup__condensedMain">
            <Heading>{copy.title}</Heading>
            <span className="msk-dashboard-mockup__timestamp">{copy.queueMeta}</span>
          </div>
        </div>
      ) : (
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
      )}

      {!hideToolbar && (
        <div className="msk-dashboard-mockup__toolbar" aria-hidden="true">
          {copy.toolbar.map((filter) => <span key={filter}>{filter}</span>)}
        </div>
      )}

      <div className="msk-dashboard-mockup__table" id={tableId} role="table" aria-label={copy.tableAria} tabIndex={0}>
        <div className="msk-dashboard-mockup__row msk-dashboard-mockup__row--head" role="row">
          <span role="columnheader">{copy.columns.patient}</span>
          <span role="columnheader">{copy.columns.document}</span>
          <span role="columnheader">{copy.columns.status}</span>
          <span role="columnheader">{copy.columns.routedTo}</span>
          <span role="columnheader">{copy.columns.action}</span>
        </div>
        {visibleRows.map((row, index) => (
          <div
            className={`msk-dashboard-mockup__row${activeRow === index ? " is-active" : ""}`}
            role="row"
            key={row.mrn}
            data-status={row.slug}
          >
            <span role="cell" className="msk-dashboard-mockup__mrn">
              {/* `title` alone is an unreliable accessible-name source: it is
                  opt-in/inconsistent across screen readers, invisible on
                  touch, and unreachable by keyboard focus. `aria-label` is
                  read every time, by every AT, regardless of verbosity
                  settings — kept alongside `title` rather than replacing it,
                  so the dotted-underline hover affordance for sighted mouse
                  users is unchanged. (accessibility-reviewer, 2026-08-27) */}
              <span><abbr title={copy.mrnDef} aria-label={`${copy.mrnTerm}, ${copy.mrnDef}`}>{copy.mrnTerm}</abbr> {row.mrn}</span>
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
          never worked in a hospital. In the hero, this becomes optional depth
          behind a native disclosure rather than always-on text competing with
          the table for attention — same definitions, opened on request. */}
      {legendDisclosure ? (
        <details className="msk-dashboard-mockup__legend msk-dashboard-mockup__legend--details">
          <summary>
            <span>{copy.mrnTerm} · {copy.emrTerm}</span>
            <b>What these terms mean</b>
          </summary>
          <div className="msk-dashboard-mockup__legendBody">{legendBody}</div>
        </details>
      ) : (
        <div className="msk-dashboard-mockup__legend">{legendBody}</div>
      )}

      {!hideRule && (
        <div className="msk-dashboard-mockup__rule">
          <span>
            {copy.ruleLabel} <strong>{copy.ruleAction}</strong> {copy.rule}
          </span>
        </div>
      )}

      {expandControl}
    </div>
  );
}
