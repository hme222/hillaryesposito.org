import React from "react";
import { Link } from "react-router-dom";

export type WorkIndexItem = {
  /** Stable key for the row and its description id, such as "01". Not displayed. */
  n: string;
  title: string;
  /** One line: the organization and the kind of work. */
  sub: string;
  /** What the case study shows. Appears on hover or focus, and is read by screen readers as the link's description. */
  desc: string;
  to: string;
  /** Opens off-site in a new tab (a plain link instead of a route). */
  external?: boolean;
  /** Optional picture shown to the right of the row. Decorative: the row's title already names the case. */
  visual?: React.ReactNode;
};

/**
 * @status: stable
 * @purpose: An index of case studies on Home: one row per case with its title, one-line context and an optional framed picture, and a longer description that appears on hover or keyboard focus. Pick this for a compact list that opens whole case studies; for evidence inside a case use EvidenceField, and for a closed section use HomeFold. Every row is a real link, so nothing depends on hover. Rows carry no numbers or arrows (the cases are not a sequence); only an off-site row keeps its ↗.
 */
export default function WorkIndex({ items, label, total }: {
  /** Names the list for screen readers. */
  label: string;
  /** Shown above the list, such as "Five case studies". Omit for a continuation list. */
  total?: string;
  items: WorkIndexItem[];
}) {
  return (
    <div className="rp-index">
      {total ? <p className="rp-index__total">{total}</p> : null}
      <ul className="rp-index__list" aria-label={label}>
        {items.map((item) => (
          <li key={item.n}>
            {item.external ? (
              <a className="rp-index__row" href={item.to} target="_blank" rel="noopener noreferrer" aria-describedby={`work-index-${item.n}-desc`}>
              <span className="rp-index__main">
                <b className="rp-index__title">{item.title}</b>
                <span className="rp-index__sub">{item.sub}</span>
                <span className="rp-index__desc" id={`work-index-${item.n}-desc`}>{item.desc}</span>
              </span>
              {item.visual ? <span className="rp-index__visual" aria-hidden="true">{item.visual}</span> : null}
              {/* The only arrow left: it says "leaves this site", not "go". */}
              <span className="rp-index__arrow" aria-hidden="true">↗</span><span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : (
                        <Link className={`rp-index__row${item.visual ? " rp-index__row--visual" : ""}`} to={item.to} aria-describedby={`work-index-${item.n}-desc`}>
              <span className="rp-index__main">
                <b className="rp-index__title">{item.title}</b>
                <span className="rp-index__sub">{item.sub}</span>
                <span className="rp-index__desc" id={`work-index-${item.n}-desc`}>{item.desc}</span>
              </span>
              {item.visual ? <span className="rp-index__visual" aria-hidden="true">{item.visual}</span> : null}
            </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
