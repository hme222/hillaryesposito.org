import React from "react";

type MSKDashboardMockupProps = {
  compact?: boolean;
};

const rows = [
  { record: "Record A-104", team: "Clinic A", status: "Ready to file", owner: "Coordinator", action: "Open EMR" },
  { record: "Record B-218", team: "Clinic B", status: "Needs review", owner: "Manager", action: "Review" },
  { record: "Record C-771", team: "Clinic C", status: "Filed in EMR", owner: "Audit", action: "View log" },
];

export default function MSKDashboardMockup({ compact = false }: MSKDashboardMockupProps) {
  return (
    <div className={`msk-dashboard-mockup${compact ? " msk-dashboard-mockup--compact" : ""}`} aria-label="Anonymized MSK dashboard mockup">
      <div className="msk-dashboard-mockup__topbar">
        <div>
          <p className="msk-dashboard-mockup__eyebrow">Anonymized internal tool concept</p>
          <h3>EMR filing queue</h3>
        </div>
        <span className="msk-dashboard-mockup__timestamp">Updated today · 09:42</span>
      </div>

      <div className="msk-dashboard-mockup__toolbar" aria-hidden="true">
        <span>All records</span>
        <span>Ready to file</span>
        <span>Needs review</span>
      </div>

      <div className="msk-dashboard-mockup__table" role="table" aria-label="Anonymized EMR filing workflow table">
        <div className="msk-dashboard-mockup__row msk-dashboard-mockup__row--head" role="row">
          <span role="columnheader">Record</span>
          <span role="columnheader">Team</span>
          <span role="columnheader">Status</span>
          <span role="columnheader">Owner</span>
          <span role="columnheader">Action</span>
        </div>
        {rows.map((row) => (
          <div className="msk-dashboard-mockup__row" role="row" key={row.record}>
            <span role="cell">{row.record}</span>
            <span role="cell">{row.team}</span>
            <span role="cell">
              <span className={`msk-dashboard-status msk-dashboard-status--${row.status.toLowerCase().replaceAll(" ", "-")}`}>
                {row.status}
              </span>
            </span>
            <span role="cell">{row.owner}</span>
            <span role="cell">
              <span className={row.action === "Open EMR" ? "msk-dashboard-action msk-dashboard-action--primary" : "msk-dashboard-action"}>
                {row.action}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="msk-dashboard-mockup__rule">
        <span>Rule: direct EMR action appears only when the record is ready and the user has filing permission.</span>
      </div>
    </div>
  );
}
