import React from "react";

type MSKDashboardMockupProps = {
  compact?: boolean;
};

// Anonymized recreation. MRNs are masked (last 4 only) — the queue is patient-
// anchored, the way a real Health Information Management chart-filing work queue is,
// but no real identifiers or PHI appear.
const rows = [
  { mrn: "••••4821", received: "Received 2h ago", doc: "Signed consent", status: "Ready to file", owner: "HIM tech", action: "File to chart" },
  { mrn: "••••5518", received: "Received 5h ago", doc: "Signed order", status: "Ready to file", owner: "HIM tech", action: "File to chart" },
  { mrn: "••••7305", received: "Received 1d ago", doc: "Outside records", status: "Needs review", owner: "HIM supervisor", action: "Review" },
  { mrn: "••••1043", received: "Received 1d ago", doc: "Path report", status: "Ready to file", owner: "HIM tech", action: "File to chart" },
  { mrn: "••••2960", received: "Received 3d ago", doc: "Discharge summary", status: "Filed to chart", owner: "Compliance", action: "View log" },
];

export default function MSKDashboardMockup({ compact = false }: MSKDashboardMockupProps) {
  return (
    <div className={`msk-dashboard-mockup${compact ? " msk-dashboard-mockup--compact" : ""}`} role="group" aria-label="Anonymized MSK chart-filing work queue mockup">
      <div className="msk-dashboard-mockup__topbar">
        <div>
          <p className="msk-dashboard-mockup__eyebrow">Anonymized internal tool concept</p>
          <h3>Chart filing · work queue</h3>
        </div>
        <span className="msk-dashboard-mockup__timestamp">47 in queue · 09:42</span>
      </div>

      <div className="msk-dashboard-mockup__toolbar" aria-hidden="true">
        <span>All documents</span>
        <span>Ready to file</span>
        <span>Needs review</span>
      </div>

      <div className="msk-dashboard-mockup__table" role="table" aria-label="Anonymized chart-filing work queue">
        <div className="msk-dashboard-mockup__row msk-dashboard-mockup__row--head" role="row">
          <span role="columnheader">MRN</span>
          <span role="columnheader">Document</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Assigned</span>
          <span role="columnheader">Action</span>
        </div>
        {rows.map((row) => (
          <div className="msk-dashboard-mockup__row" role="row" key={row.mrn} data-status={row.status.toLowerCase().replaceAll(" ", "-")}>
            <span role="cell" className="msk-dashboard-mockup__mrn">
              <span>MRN {row.mrn}</span>
              <small>{row.received}</small>
            </span>
            <span role="cell">{row.doc}</span>
            <span role="cell">
              <span className={`msk-dashboard-status msk-dashboard-status--${row.status.toLowerCase().replaceAll(" ", "-")}`}>
                {row.status}
              </span>
            </span>
            <span role="cell">{row.owner}</span>
            <span role="cell">
              <span className={row.action === "File to chart" ? "msk-dashboard-action msk-dashboard-action--primary" : "msk-dashboard-action"}>
                {row.action}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="msk-dashboard-mockup__rule">
        <span>
          Rule: <strong>File to chart</strong> appears only when the document is ready to file and the
          user's role includes chart-filing rights.
        </span>
      </div>
    </div>
  );
}
