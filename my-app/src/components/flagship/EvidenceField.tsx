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
        <p className="rp-disclaimer">{disclaimer}</p>
        <div className="rp-outcomes rp-reveal">
          {metrics.map((metric) => (
            <div className="rp-stat" key={`${metric.n}-${metric.label}`}>
              <p className="rp-stat__n">{metric.n}</p>
              <p className="rp-stat__l">{metric.label}</p>
            </div>
          ))}
        </div>
        <div className="rp-routeRecap rp-reveal" aria-label="Project decision sequence">
          {route.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && <i aria-hidden="true">→</i>}
              {index === route.length - 1 ? <strong>{item}</strong> : <span>{item}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
