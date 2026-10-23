import React from "react";
import { MSK_COPY, type MskCopy } from "../data/mskCaseStudy";

type MSKDashboardMockupProps = {
  compact?: boolean;
  /** Use a real heading only when this artifact itself starts a document
   *  section. Most placements already sit under an H2/H3, so the visual title
   *  defaults to paragraph semantics and does not pollute the page outline. */
  headingLevel?: 2 | 3;
  /** Home-card thumbnails are a redundant visual preview inside a link. In
   *  that context the mockup must not expose a second table or focus stop. */
  decorative?: boolean;
  activeRow?: number | null;
  copy?: MskCopy["dashboard"];
  /** Show only these row indices (into `copy.rows`), in this order. Omit to
   *  render every row so FlagshipMSK's decision trace can index the full set.
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
   *  Used on Home and in every MSK case-study placement (2026-10-16). */
  legendDisclosure?: boolean;
  /** Drop the "anonymized concept" eyebrow. The MSK case study shows it once,
   *  on the hero's queue; later placements on the same page skip it. */
  hideEyebrow?: boolean;
  /** Hide the "Rule: ..." conditional-logic callout. It's internal business
   *  logic explaining the action button, not primary evidence — genuinely
   *  optional depth in a 5-second hero scan. Home-hero-only. */
  hideRule?: boolean;
  /** Stable id placed on the `role="table"` wrapper so an external trigger
   *  elsewhere on the page can `aria-controls` it. Home-hero-only — case
   *  studies don't pass this, so they never render a duplicate id. */
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
 * @purpose: Anonymized recreation of the MSK filing work-queue dashboard (masked MRNs, status rows); used on the home hero and MSK case study. Pick this for the literal dashboard-as-artifact — for a step-by-step animated demo of the same workflow use MSKFilingReceipt, for a static mechanism diagram use MSKMechanism.
 */
export default function MSKDashboardMockup({
  compact = false,
  headingLevel,
  decorative = false,
  activeRow = null,
  copy = MSK_COPY.en.dashboard,
  rowIndices,
  condensedHeader = false,
  hideToolbar = false,
  legendDisclosure = false,
  hideEyebrow = false,
  hideRule = false,
  tableId,
  expandControl,
}: MSKDashboardMockupProps) {
  const title = headingLevel
    ? React.createElement(headingLevel === 2 ? "h2" : "h3", { className: "msk-dashboard-mockup__title" }, copy.title)
    : <p className="msk-dashboard-mockup__title">{copy.title}</p>;
  const visibleRows = rowIndices ? rowIndices.map((i) => copy.rows[i]).filter(Boolean) : copy.rows;
  const legendBody = (
    <>
      <span><b>{copy.mrnTerm}</b> — {copy.mrnDef}</span>
      <span><b>{copy.emrTerm}</b> — {copy.emrDef}</span>
    </>
  );

  return (
    <div
      className={`msk-dashboard-mockup${compact ? " msk-dashboard-mockup--compact" : ""}`}
      role={decorative ? undefined : "group"}
      aria-label={decorative ? undefined : copy.groupAria}
      aria-hidden={decorative || undefined}
    >
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
          <p className="msk-dashboard-mockup__eyebrow">{hideEyebrow ? copy.roleView : `${copy.eyebrow} · ${copy.roleView}`}</p>
          <div className="msk-dashboard-mockup__condensedMain">
            {title}
            <span className="msk-dashboard-mockup__timestamp">{copy.queueMeta}</span>
          </div>
        </div>
      ) : (
        <div className="msk-dashboard-mockup__topbar">
          <div>
            {!hideEyebrow && <p className="msk-dashboard-mockup__eyebrow">{copy.eyebrow}</p>}
            {title}
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

      <div
        className="msk-dashboard-mockup__table"
        id={tableId}
        role={decorative ? undefined : "table"}
        aria-label={decorative ? undefined : copy.tableAria}
        tabIndex={decorative ? undefined : 0}
      >
        <div className="msk-dashboard-mockup__row msk-dashboard-mockup__row--head" role={decorative ? undefined : "row"}>
          <span role={decorative ? undefined : "columnheader"}>{copy.columns.patient}</span>
          <span role={decorative ? undefined : "columnheader"}>{copy.columns.document}</span>
          <span role={decorative ? undefined : "columnheader"}>{copy.columns.status}</span>
          <span role={decorative ? undefined : "columnheader"}>{copy.columns.routedTo}</span>
          <span role={decorative ? undefined : "columnheader"}>{copy.columns.action}</span>
        </div>
        {visibleRows.map((row, index) => (
          <div
            className={`msk-dashboard-mockup__row${activeRow === index ? " is-active" : ""}`}
            role={decorative ? undefined : "row"}
            key={row.mrn}
            data-status={row.slug}
          >
            <span role={decorative ? undefined : "cell"} className="msk-dashboard-mockup__mrn">
              {/* The native abbreviation keeps the dotted-underline expansion
                  for pointer users; the plain MRN term is also defined in the
                  visible glossary directly below the table. */}
              <span><abbr title={copy.mrnDef}>{copy.mrnTerm}</abbr> {row.mrn}</span>
              <small>{row.received}</small>
            </span>
            <span role={decorative ? undefined : "cell"}>{row.doc}</span>
            <span role={decorative ? undefined : "cell"}>
              <span className={`msk-dashboard-status msk-dashboard-status--${row.slug}`}>
                {row.status}
              </span>
            </span>
            <span role={decorative ? undefined : "cell"}>{row.routed}</span>
            <span role={decorative ? undefined : "cell"}>
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
            <b>{copy.legendSummary}</b>
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
