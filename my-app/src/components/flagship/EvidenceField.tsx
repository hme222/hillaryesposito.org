import React from "react";

/**
 * `tag` is what Hillary's role in the number was — "Led", "Contributed to",
 * "Scale". Optional, because it only earns its place where attribution differs
 * between the numbers in a set. On MSK it does: the month-early CPR result is
 * hers outright, the 20% is an organization-wide figure she contributed to, and
 * the ~$1M/year is a projection from her pitch. Buried at the end of a label
 * sentence, that distinction was invisible to anyone scanning.
 * Mobbin's three are uniformly hers, so it stays off there.
 */
type Metric = { n: string; label: string; tag?: string };

/**
 * @status: stable
 * @purpose: Renders a labeled row of metric numbers (each with an optional attribution tag) plus an intro and disclaimer; used on the MSK, Mobbin, logistics, and Knowunity case study pages.
 */
export default function EvidenceField({
  id,
  languageAnchor,
  kicker,
  title,
  intro,
  disclaimer,
  metrics,
  route,
}: {
  id: string;
  languageAnchor?: string;
  kicker: string;
  title: string;
  intro: string;
  disclaimer: string;
  metrics: Metric[];
  route: string[];
}) {
  return (
    <section className="rp-section rp-outcomeStage" id={id} data-language-anchor={languageAnchor}>
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
        {/* Two numbers share the row, as Grove's two outcomes do; the default
            three-column grid left a third of it empty. Four (MSK) sit two by
            two, so no tile is left alone on a second row. */}
        <div className={`rp-outcomes rp-reveal${metrics.length === 2 ? " rp-outcomes--two" : metrics.length === 4 ? " rp-outcomes--four" : ""}`}>
          {metrics.map((metric) => (
            <div className="rp-stat" key={`${metric.n}-${metric.label}`}>
              {metric.tag && <p className="rp-stat__tag">{metric.tag}</p>}
              <p className="rp-stat__n">{metric.n}</p>
              <p className="rp-stat__l">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
