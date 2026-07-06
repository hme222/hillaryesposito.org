import React, { useMemo, useRef } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import useReveal from "../../hooks/useReveal";
import { curatedPages } from "../../data/curatedPages";

export default function CuratedRolePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  const page = useMemo(() => (slug ? curatedPages[slug] : undefined), [slug]);
  usePageTitle(page ? `${page.company}: ${page.role}` : "Curated portfolio page");

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <main
      className={`case-study gh-layout curated-page curated-page--${page.variant}`}
      aria-label={`${page.company} tailored portfolio page`}
      ref={rootRef}
    >
      <header className="gh-hero curated-hero">
        <div className="gh-hero__copy">
          <p className="meta">{page.eyebrow}</p>
          <h1>{page.company}</h1>
          <p className="curated-hero__role">{page.role}</p>
          <p className="gh-hero__intro">{page.headline}</p>
          <p className="curated-hero__subhead">{page.subhead}</p>
        </div>

        <div className="gh-hero__visual curated-hero__visual" aria-hidden="true">
          <div className="curated-hero-badge">
            <span className="curated-hero-badge__eyebrow">{page.badgeLabel}</span>
            <strong>{page.role}</strong>
            <span className="curated-hero-badge__rule" />
            <span>{page.company}</span>
          </div>
        </div>
      </header>

      <div className="gh-meta-strip">
        {page.meta.map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {index < page.meta.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>

      <section className="cs-overview">
        <p className="gh-section-label">Overview</p>
        <h2 className="cs-section-title">Why this work fits my background</h2>
        {page.intro.map((paragraph) => (
          <p key={paragraph} className="cs-overview-text">
            {paragraph}
          </p>
        ))}
      </section>

      <section>
        <p className="gh-section-label">Selected proof</p>
        <h2>Relevant results</h2>
        <div className="curated-proof-grid">
          {page.proofPoints.map((point) => (
            <article key={point.stat + point.detail} className="curated-proof-card">
              <p className="curated-proof-card__stat">{point.stat}</p>
              <p className="curated-proof-card__detail">{point.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <p className="gh-section-label">Featured work</p>
        <h2>What to review</h2>
        <ol className="curated-sequence">
          {page.featuredWork.map((item) => (
            <li key={item.title} className="curated-sequence__item">
              <h3>{item.title}</h3>
              <p>{item.reason}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="curated-two-column">
        <div>
          <p className="gh-section-label">Strengths</p>
          <h2>What this work shows</h2>
          <ul className="curated-list">
            {page.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="highlight curated-highlight">
          <p className="curated-highlight__label">A note for hiring teams</p>
          <p>{page.hiringManagerNote}</p>
        </aside>
      </section>

      <section>
        <p className="gh-section-label">Relevant experience</p>
        <h2>Experience behind the work</h2>
        {page.relevantExperience.map((paragraph) => (
          <p key={paragraph} className="cs-section-intro">
            {paragraph}
          </p>
        ))}
      </section>

      <section>
        <div>
          <p className="gh-section-label">Relevant themes</p>
          <h2>Topics reflected in this work</h2>
          <div className="curated-chip-cloud">
            {page.keywords.map((keyword) => (
              <span key={keyword} className="curated-chip">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="curated-links-wrap">
        <div className="curated-links-group">
          <p className="gh-section-label">Supporting work</p>
          <h2>Case studies to pair with this page</h2>
          <div className="curated-link-grid">
            {page.supportLinks.map((item) => (
              <Link key={item.path} to={item.path} className="curated-link-card">
                <span className="curated-link-card__icon">{item.icon}</span>
                <span className="curated-link-card__body">
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="curated-links-group">
          <p className="gh-section-label">Other tailored pages</p>
          <h2>Related role narratives</h2>
          <div className="curated-link-grid">
            {page.relatedLinks.map((item) => (
              <Link key={item.path} to={item.path} className="curated-link-card">
                <span className="curated-link-card__icon">{item.icon}</span>
                <span className="curated-link-card__body">
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="curated-footer">
        <div className="curated-footer__copy">
          <p className="gh-section-label">Closing note</p>
          <h2>Where I am strongest</h2>
          <p className="cs-section-intro">{page.closing}</p>
        </div>

        <div className="curated-footer__actions">
          <button type="button" className="hero-btn" onClick={() => navigate("/?scrollTo=projects")}>
            Back to portfolio
          </button>
          <Link to="/about" className="btn-outline">
            About Hillary
          </Link>
        </div>
      </section>
    </main>
  );
}
