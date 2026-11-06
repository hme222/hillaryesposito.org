import React from "react";
import { Link } from "react-router-dom";

export type WorkIndexItem = {
  /** Display number, such as "01". */
  n: string;
  title: string;
  /** One line: the organization and the kind of work. */
  sub: string;
  /** What the case study shows. Appears on hover or focus, and is read by screen readers as the link's description. */
  desc: string;
  to: string;
  /** Optional picture shown to the right of the row. Decorative: the row's title already names the case. */
  visual?: React.ReactNode;
};

/**
 * @status: stable
 * @purpose: A numbered index of case studies on Home: one row per case with its number, title and one-line context, a coral arrow, and a longer description that appears on hover or keyboard focus. Pick this for a compact list that opens whole case studies; for evidence inside a case use EvidenceField, and for a closed section use HomeFold. Every row is a real link, so nothing depends on hover.
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
      <ol className="rp-index__list" aria-label={label}>
        {items.map((item) => (
          <li key={item.n}>
            <Link className={`rp-index__row${item.visual ? " rp-index__row--visual" : ""}`} to={item.to} aria-describedby={`work-index-${item.n}-desc`}>
              <span className="rp-index__n" aria-hidden="true">{item.n}</span>
              <span className="rp-index__main">
                <b className="rp-index__title">{item.title}</b>
                <span className="rp-index__sub">{item.sub}</span>
                <span className="rp-index__desc" id={`work-index-${item.n}-desc`}>{item.desc}</span>
              </span>
              {item.visual ? <span className="rp-index__visual" aria-hidden="true">{item.visual}</span> : null}
              <span className="rp-index__arrow" aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
