import React from "react";

type Metric = { n: string; label: string };

export default function EvidenceField({
  id,
  kicker,
  title,
  intro,
  disclaimer,
  metrics,
  route,
}: {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  disclaimer: string;
  metrics: Metric[];
  route: string[];
}) {
  return (
    <section className="rp-section rp-outcomeStage" id={id}>
      <div className="rp-wrap">
        <p className="rp-kicker">{kicker}</p>
        <h2 className="rp-title">{title}</h2>
        <p className="rp-lede">{intro}</p>
        {/* The route used to be the last thing on the page — a four-step method
            recap standing as the takeaway. A repeatable process is the least
            durable thing a designer can sell right now; the numbers and the
            judgment behind them are the point. So the sequence runs above the
            outcomes as a short orientation line, and the evidence closes. */}
        <p className="rp-routeRecap rp-routeRecap--lede" aria-label="How the work ran">
          {route.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && <i aria-hidden="true">→</i>}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </p>
        <p className="rp-disclaimer">{disclaimer}</p>
        <div className="rp-outcomes rp-reveal">
          {metrics.map((metric) => (
            <div className="rp-stat" key={`${metric.n}-${metric.label}`}>
              <p className="rp-stat__n">{metric.n}</p>
              <p className="rp-stat__l">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
