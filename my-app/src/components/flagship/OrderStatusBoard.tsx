import React, { useState } from "react";

type View = "after" | "before";

// Seven stations is the number the case study already states. The rows are
// generic on purpose: no site names, countries, routes or unit positions.
const STATIONS = [1, 2, 3, 4, 5, 6, 7];

type Copy = {
  after: string[]; before: string[]; note: string; group: string; beforeBtn: string; afterBtn: string;
  caption: (after: boolean) => string; station: string; colStation: string; colStatus: string;
  readAfter: string; readBefore: string; lowPrefix: string; outPrefix: string;
};

const COPY: Record<"en" | "es", Copy> = {
  en: {
    after: ["Received", "In transit", "Approved", "Requested", "In transit", "Received", "Running low: order now"],
    before: ["Status not visible", "Status not visible", "Status not visible", "Status not visible", "Status not visible", "Status not visible", "Out of supply, found late"],
    note: "Recreated to explain the idea. Not the original system, and no real data.",
    group: "Order status view",
    beforeBtn: "Before: no one sees status",
    afterBtn: "After: shared status",
    caption: (after) => `Seven stations and the status of each station’s order, ${after ? "after" : "before"} the shared order status`,
    station: "Station", colStation: "Station", colStatus: "Order status",
    readAfter: "Every station uses one request format, and a station that is running low shows before it runs out.",
    readBefore: "Seven ways of asking, and nobody could see an order. A station found out it was out of supply when it was already out.",
    lowPrefix: "Running low", outPrefix: "Out of supply",
  },
  es: {
    after: ["Recibido", "En tránsito", "Aprobado", "Solicitado", "En tránsito", "Recibido", "Quedan pocas existencias: pedir ahora"],
    before: ["Estado no visible", "Estado no visible", "Estado no visible", "Estado no visible", "Estado no visible", "Estado no visible", "Sin existencias, descubierto tarde"],
    note: "Recreado para explicar la idea. No es el sistema original y no hay datos reales.",
    group: "Vista del estado de pedidos",
    beforeBtn: "Antes: nadie ve el estado",
    afterBtn: "Después: estado compartido",
    caption: (after) => `Siete estaciones y el estado del pedido de cada una, ${after ? "después" : "antes"} del estado de pedidos compartido`,
    station: "Estación", colStation: "Estación", colStatus: "Estado del pedido",
    readAfter: "Todas las estaciones usan un solo formato de pedido, y una estación con pocas existencias se ve antes de quedarse sin ellas.",
    readBefore: "Siete maneras de pedir, y nadie podía ver un pedido. Una estación se enteraba de que no tenía existencias cuando ya no las tenía.",
    lowPrefix: "Quedan pocas", outPrefix: "Sin existencias",
  },
};

/**
 * @status: stable
 * @purpose: A recreated order-status board with a Before and After switch, used on the Medical logistics case study to make "everyone could see order status" concrete. Seven generic stations, no names, places, routes or unit positions, and labelled as recreated with no real data. Pick this for the logistics status change; for the filing queue use MSKDashboardMockup, and for the three small before/after schematics use LogisticsMechanism. Also used on About (English and Spanish, via the `lang` prop).
 */
export default function OrderStatusBoard({ lang = "en" }: { lang?: "en" | "es" }) {
  const c = COPY[lang];
  const [view, setView] = useState<View>("after");
  const statuses = view === "after" ? c.after : c.before;
  const alert = (s: string) => s.startsWith(c.lowPrefix) || s.startsWith(c.outPrefix);

  return (
    <div className="fp-statusBoard" data-evidence="true">
      <div className="fp-statusBoard__head">
        <p className="fp-statusBoard__note">{c.note}</p>
        <div className="fp-statusBoard__switch" role="group" aria-label={c.group}>
          <button type="button" aria-pressed={view === "before"} onClick={() => setView("before")}>{c.beforeBtn}</button>
          <button type="button" aria-pressed={view === "after"} onClick={() => setView("after")}>{c.afterBtn}</button>
        </div>
      </div>
      <table>
        <caption className="sr-only">{c.caption(view === "after")}</caption>
        <thead>
          <tr><th scope="col">{c.colStation}</th><th scope="col">{c.colStatus}</th></tr>
        </thead>
        <tbody>
          {STATIONS.map((n, i) => (
            <tr key={n} className={alert(statuses[i]) ? "is-alert" : ""}>
              <th scope="row">{c.station} {n}</th>
              <td>
                <span className="fp-statusBoard__mark" aria-hidden="true">{alert(statuses[i]) ? "!" : "·"}</span>
                {statuses[i]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fp-statusBoard__read" aria-live="polite">
        {view === "after" ? c.readAfter : c.readBefore}
      </p>
    </div>
  );
}
