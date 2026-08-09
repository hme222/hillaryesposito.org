import React from "react";

type MSKDashboardMockupProps = {
  compact?: boolean;
  headingLevel?: 2 | 3;
  activeRow?: number | null;
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
const rows = [
  { mrn: "••••4821", received: "Received 2h ago", doc: "Signed consent", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
  { mrn: "••••5518", received: "Received 5h ago", doc: "Signed order", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
  { mrn: "••••7305", received: "Received 1d ago", doc: "Outside records", status: "Needs review", slug: "needs-review", routed: "Supervisor", action: "Review" },
  { mrn: "••••1043", received: "Received 1d ago", doc: "Path report", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
  { mrn: "••••2960", received: "Received 3d ago", doc: "Discharge summary", status: "In the chart", slug: "filed-to-chart", routed: "Complete", action: "View log" },
];

export default function MSKDashboardMockup({ compact = false, headingLevel = 3, activeRow = null }: MSKDashboardMockupProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className={`msk-dashboard-mockup${compact ? " msk-dashboard-mockup--compact" : ""}`} role="group" aria-label="Anonymized Office Coordinator filing queue mockup">
      {/* The role used to ride along on the eyebrow, which pushed that line to
          two wrapped rows above the heading and made the whole header read as
          clutter. It is a chip now — same information, one line each. */}
      <div className="msk-dashboard-mockup__topbar">
        <div>
          <p className="msk-dashboard-mockup__eyebrow">Anonymized internal tool concept</p>
          <Heading>My filing queue</Heading>
        </div>
        <span className="msk-dashboard-mockup__meta">
          <span className="msk-dashboard-mockup__role">Office Coordinator view</span>
          <span className="msk-dashboard-mockup__timestamp">47 in queue · 09:42</span>
        </span>
      </div>

      <div className="msk-dashboard-mockup__toolbar" aria-hidden="true">
        <span>All patients</span>
        <span>Ready to send</span>
        <span>Needs review</span>
      </div>

      <div className="msk-dashboard-mockup__table" role="table" aria-label="Anonymized patient document filing queue">
        <div className="msk-dashboard-mockup__row msk-dashboard-mockup__row--head" role="row">
          <span role="columnheader">Patient</span>
          <span role="columnheader">Document</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Routed to</span>
          <span role="columnheader">Action</span>
        </div>
        {rows.map((row, index) => (
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
              <span className={row.action === "Send to EMR" ? "msk-dashboard-action msk-dashboard-action--primary" : "msk-dashboard-action"}>
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
        <span><b>MRN</b> — medical record number, the ID for one patient’s chart. Masked to the last four digits.</span>
        <span><b>EMR</b> — electronic medical record, the digital chart where a patient’s whole history lives.</span>
      </div>

      <div className="msk-dashboard-mockup__rule">
        <span>
          Rule: <strong>Send to EMR</strong> appears only when the document is ready and the
          coordinator's role includes filing rights.
        </span>
      </div>
    </div>
  );
}
