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
    <main className="case-study gh-layout curated-page" aria-label={`${page.company} tailored portfolio page`} ref={rootRef}>
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
            <span className="curated-hero-badge__eyebrow">Review-ready</span>
            <strong>Approved proof only</strong>
            <span className="curated-hero-badge__rule" />
            <span>Tailored for a real live role</span>
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
        <p className="gh-section-label">Tailored intro</p>
        <h2 className="cs-section-title">Why this page exists</h2>
        {page.intro.map((paragraph) => (
          <p key={paragraph} className="cs-overview-text">
            {paragraph}
          </p>
        ))}
      </section>

      <section>
        <p className="gh-section-label">Proof to feature</p>
        <h2>What should hit first</h2>
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
        <p className="gh-section-label">Case study order</p>
        <h2>How to curate the page</h2>
        <ol className="curated-sequence">
          {page.caseStudyOrder.map((item) => (
            <li key={item.title} className="curated-sequence__item">
              <h3>{item.title}</h3>
              <p>{item.reason}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="curated-two-column">
        <div>
          <p className="gh-section-label">Why this role fits</p>
          <h2>What a hiring team should notice</h2>
          <ul className="curated-list">
            {page.whyFit.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="highlight curated-highlight">
          <p className="curated-highlight__label">Hiring-manager note</p>
          <p>{page.hiringManagerNote}</p>
        </aside>
      </section>

      <section>
        <p className="gh-section-label">Relevant experience</p>
        <h2>How the story should be framed</h2>
        {page.relevantExperience.map((paragraph) => (
          <p key={paragraph} className="cs-section-intro">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="curated-two-column">
        <div>
          <p className="gh-section-label">Keywords</p>
          <h2>Language worth echoing naturally</h2>
          <div className="curated-chip-cloud">
            {page.keywords.map((keyword) => (
              <span key={keyword} className="curated-chip">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="curated-outreach">
          <p className="gh-section-label">Outreach line</p>
          <h2>Message starter</h2>
          <p className="curated-outreach__quote">{page.outreachLine}</p>
        </div>
      </section>

      <section>
        <p className="gh-section-label">Cautions</p>
        <h2>What not to overstate</h2>
        <ul className="curated-list curated-list--compact">
          {page.cautions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="curated-recommendation">
          <strong>Recommendation:</strong> {page.recommendation}
        </p>
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
          <p className="gh-section-label">Use this page as a draft</p>
          <h2>Review, tighten, then publish selectively</h2>
          <p className="cs-section-intro">
            This page is designed to make the fit legible fast while staying honest about scope and evidence.
            It should feel intentional, specific, and easy to adjust before it becomes public.
          </p>
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
