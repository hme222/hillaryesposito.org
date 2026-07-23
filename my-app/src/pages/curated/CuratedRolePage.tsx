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
      lang="en"
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

      {page.slug === "meta-instagram-product-designer" && (
        <section className="meta-craft-section" aria-labelledby="meta-craft-title">
          <p className="gh-section-label">A quick proof</p>
          <h2 id="meta-craft-title">Consumer craft is mostly knowing what to leave out</h2>
          <p className="cs-section-intro">
            Same screen, two ways to build it. The job isn't adding more — it's earning attention
            without spending someone's calm.
          </p>
          <div className="meta-craft" aria-hidden="true">
            <figure className="meta-craft__col">
              <figcaption className="meta-craft__tag meta-craft__tag--loud">The obvious version</figcaption>
              <div className="meta-craft__screen meta-craft__screen--loud">
                <div className="meta-craft__bar">
                  <span className="meta-craft__logo">grove</span>
                  <span className="meta-craft__badge">3</span>
                </div>
                <div className="meta-craft__promo">🔥 LIMITED — 24:59:12 left</div>
                <div className="meta-craft__card meta-craft__card--loud">
                  <span className="meta-craft__ndot" />
                  <p>Your plant misses you!! Tap now 👉</p>
                  <span className="meta-craft__cta meta-craft__cta--loud">OPEN</span>
                </div>
                <div className="meta-craft__card meta-craft__card--loud">
                  <p>🌱 NEW badges unlocked · streak ×7 🔥</p>
                  <span className="meta-craft__cta meta-craft__cta--loud">CLAIM</span>
                </div>
                <div className="meta-craft__promo meta-craft__promo--alt">▶ Autoplaying · Upgrade to Pro</div>
              </div>
            </figure>
            <span className="meta-craft__vs" aria-hidden="true">vs</span>
            <figure className="meta-craft__col">
              <figcaption className="meta-craft__tag meta-craft__tag--calm">The considered version</figcaption>
              <div className="meta-craft__screen meta-craft__screen--calm">
                <div className="meta-craft__bar">
                  <span className="meta-craft__logo meta-craft__logo--calm">Grove</span>
                </div>
                <div className="meta-craft__hello">Good morning</div>
                <div className="meta-craft__card meta-craft__card--calm">
                  <p>Your Fiddle Leaf could use a little water today.</p>
                  <span className="meta-craft__cta meta-craft__cta--calm">Mark done</span>
                </div>
                <p className="meta-craft__quiet">That's the only thing that needs you.</p>
              </div>
            </figure>
          </div>
        </section>
      )}

      {page.variant === "fashion" && (
        <section className="fashion-artifact-section" aria-labelledby="fashion-artifact-title">
          <p className="gh-section-label">Visual direction exercise</p>
          <h2 id="fashion-artifact-title">A role-matched fashion campaign system</h2>
          <p className="cs-section-intro">
            This speculative system shows the kind of graphic-design proof I would build for this role:
            campaign hierarchy, ecommerce modules, social and email crops, lookbook logic, and a reusable
            visual language that can support collection launches and brand moments.
          </p>

          <div className="fashion-artifact-grid" aria-label="Speculative fashion graphic design artifacts">
            <article className="fashion-artifact fashion-artifact--campaign">
              <p className="fashion-artifact__label">Campaign key visual</p>
              <h3>Drop 01: Sculpted Utility</h3>
              <p>Hero lockup, product mood, and CTA hierarchy for a collection launch.</p>
            </article>
            <article className="fashion-artifact fashion-artifact--editorial">
              <p className="fashion-artifact__label">Lookbook layout</p>
              <h3>Lookbook spread</h3>
              <p>Image-led grid, restrained type scale, and clear product storytelling.</p>
            </article>
            <article className="fashion-artifact fashion-artifact--social">
              <p className="fashion-artifact__label">Ecommerce + social</p>
              <h3>Social + email set</h3>
              <p>Reusable crops and modules for launch, email, product detail, and last-call moments.</p>
            </article>
          </div>

          <Link to="/curated/fashion-campaign-system" className="fashion-artifact-link">
            Open the full campaign system →
          </Link>
        </section>
      )}

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

      {page.keywords.length > 0 && (
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
      )}

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
      </section>

      <section className="curated-footer">
        <div className="curated-footer__copy">
          <p className="gh-section-label">Closing note</p>
          <h2>Where I am strongest</h2>
          <p className="cs-section-intro">{page.closing}</p>
        </div>

        <div className="curated-footer__actions">
          <button type="button" className="hero-btn" onClick={() => navigate("/?scrollTo=projects")}>
            ← Back to projects
          </button>
          <Link to="/about" className="btn-outline">
            About me
          </Link>
        </div>
      </section>
    </main>
  );
}
