import React, { useState } from "react";

type View = "after" | "before";

// Seven stations is the number the case study already states. The rows are
// generic on purpose: no site names, countries, routes or unit positions.
const STATIONS = [1, 2, 3, 4, 5, 6, 7];

const AFTER_STATUS: string[] = ["Received", "In transit", "Approved", "Requested", "In transit", "Received", "Running low: order now"];
const BEFORE_STATUS: string[] = ["Status not visible", "Status not visible", "Status not visible", "Status not visible", "Status not visible", "Status not visible", "Out of supply, found late"];

/**
 * @status: stable
 * @purpose: A recreated order-status board with a Before and After switch, used on the Medical logistics case study to make "everyone could see order status" concrete. Seven generic stations, no names, places, routes or unit positions, and labelled as recreated with no real data. Pick this for the logistics status change; for the filing queue use MSKDashboardMockup, and for the three small before/after schematics use LogisticsMechanism.
 */
export default function OrderStatusBoard() {
  const [view, setView] = useState<View>("after");
  const statuses = view === "after" ? AFTER_STATUS : BEFORE_STATUS;
  const alert = (s: string) => s.startsWith("Running low") || s.startsWith("Out of supply");

  return (
    <div className="fp-statusBoard" data-evidence="true">
      <div className="fp-statusBoard__head">
        <p className="fp-statusBoard__note">Recreated to explain the idea. Not the original system, and no real data.</p>
        <div className="fp-statusBoard__switch" role="group" aria-label="Order status view">
          <button type="button" aria-pressed={view === "before"} onClick={() => setView("before")}>Before: no one sees status</button>
          <button type="button" aria-pressed={view === "after"} onClick={() => setView("after")}>After: shared status</button>
        </div>
      </div>
      <table>
        <caption className="sr-only">Seven stations and the status of each station's order, {view === "after" ? "after" : "before"} the shared order status</caption>
        <thead>
          <tr><th scope="col">Station</th><th scope="col">Order status</th></tr>
        </thead>
        <tbody>
          {STATIONS.map((n, i) => (
            <tr key={n} className={alert(statuses[i]) ? "is-alert" : ""}>
              <th scope="row">Station {n}</th>
              <td>
                <span className="fp-statusBoard__mark" aria-hidden="true">{alert(statuses[i]) ? "!" : "·"}</span>
                {statuses[i]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fp-statusBoard__read" aria-live="polite">
        {view === "after"
          ? "Every station uses one request format, and a station that is running low shows before it runs out."
          : "Seven ways of asking, and nobody could see an order. A station found out it was out of supply when it was already out."}
      </p>
    </div>
  );
}
