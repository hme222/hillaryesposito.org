import React from "react";
import { useNavigate } from "react-router-dom";

type Callout = {
  step: number;
  title: string;
  description: string;
};

const CALLOUTS: Callout[] = [
  { step: 1, title: "Homepage", description: "Curated top-rated venues + onboarding process" },
  { step: 2, title: "Preferences Form", description: "Location, price, guest count, and extras" },
  { step: 3, title: "Venue Swipe Gallery", description: "Visual-first browsing (Tinder-like interaction)" },
  { step: 4, title: "Live Chat", description: "Access to destination consultants" },
  { step: 5, title: "Visit Schedule", description: "Final itinerary for in-person venue visits" },
];

export default function ReinaSection() {
  const navigate = useNavigate();
  const goToCaseStudy = () => navigate("/case-study/Reina");

  return (
    <section id="reina" className="projects reina">
      <div className="page-width reina__wrap">
        {/* ========== OVERVIEW / HERO ========== */}
        <header className="reina__overview" aria-label="Reina project overview">
          <div className="reina__tag" aria-label="Featured Concept">
            <span aria-hidden="true">👑</span>
            <span>Featured Concept</span>
          </div>

          <div className="reina__overviewTop">
            <h2 className="section-title reina__title">Reina</h2>
          </div>

          <p className="reina__lead">
            Helping couples discover and schedule international wedding venues with confidence.{" "}
            <span className="reina__muted">
              A self-directed concept app designed to reduce stress and add clarity to destination wedding planning.
            </span>
          </p>

          <dl className="reina__stats" aria-label="Reina project stats">
            <div className="reina__stat">
              <dt className="reina__statLabel">Role</dt>
              <dd className="reina__statValue">UX Designer & Researcher</dd>
            </div>
            <div className="reina__stat">
              <dt className="reina__statLabel">Timeline</dt>
              <dd className="reina__statValue">Self-Directed Project</dd>
            </div>
            <div className="reina__stat">
              <dt className="reina__statLabel">Type</dt>
              <dd className="reina__statValue">Mobile App Concept</dd>
            </div>
          </dl>
        </header>

        {/* ========== MAIN: PREVIEW + FLOW ========== */}
        <div className="reina__main" aria-label="Reina preview and core flow">
          <figure className="reina__preview">
            <button
              type="button"
              className="reina__imageWrap"
              onClick={goToCaseStudy}
              aria-label="Open Reina case study"
            >
              <img
                className="reina__image"
                src="/assets/reina-flow.png"
                alt="Reina core user flow wireframes: discovery, preferences, swipe gallery, consultation chat, visitation schedule."
                loading="lazy"
              />
              {/* Keep your badges if you want, but they’re optional now */}
              <span className="reina__badge reina__badge--1" aria-hidden="true">1</span>
              <span className="reina__badge reina__badge--2" aria-hidden="true">2</span>
              <span className="reina__badge reina__badge--3" aria-hidden="true">3</span>
              <span className="reina__badge reina__badge--4" aria-hidden="true">4</span>
              <span className="reina__badge reina__badge--5" aria-hidden="true">5</span>
            </button>

            <figcaption className="reina__caption">
              Reina guides users through selecting preferences, browsing venues, consulting with an expert,
              and receiving a personalized visitation schedule — tailored for destination weddings abroad.
            </figcaption>
          </figure>

          <aside className="reina__flowCard" aria-label="Core user flow">
            <div className="reina__flowHeader">
              <h3 className="reina__asideTitle">🗂️ Core User Flow</h3>
              <p className="reina__asideSubtitle">From venue discovery to scheduled visit</p>
            </div>

            <ol className="reina__list">
              {CALLOUTS.map((c) => (
                <li key={c.step} className="reina__item">
                  <div className="reina__step">{c.step}</div>
                  <div className="reina__text">
                    <div className="reina__itemTitle">{c.title}</div>
                    <div className="reina__itemDesc">{c.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        {/* ========== DESIGNER NOTES (3-UP) ========== */}
        <section className="reina__notes" aria-label="Designer notes">
          <h3 className="reina__notesTitle">🔧 Designer Notes</h3>

          <div className="reina__noteGrid">
            <article className="reina__note">
              <h4 className="reina__miniTitle">🎯 What I Practiced</h4>
              <ul className="reina__bullets">
                <li>Designing end-to-end UX for a multi-touch, service-oriented app</li>
                <li>Creating structured choice without overwhelming users</li>
                <li>Balancing inspiration with utility in a high-emotion domain</li>
              </ul>
            </article>

            <article className="reina__note">
              <h4 className="reina__miniTitle">💭 What I’d Do Next</h4>
              <ul className="reina__bullets">
                <li>Add booking + calendar integration</li>
                <li>Test form length vs. completion rate</li>
                <li>Explore language localization for global use</li>
              </ul>
            </article>

            <article className="reina__note">
              <h4 className="reina__miniTitle">✅ What This Adds to My UX Story</h4>
              <ul className="reina__bullets">
                <li>Showcases visual design & flow thinking</li>
                <li>Diversifies my portfolio beyond enterprise systems</li>
                <li>Reflects initiative + long-term personal interest</li>
                <li>Adds emotional range to my UX brand</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}