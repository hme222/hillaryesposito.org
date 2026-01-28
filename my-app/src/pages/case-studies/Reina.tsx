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
      <h2 className="section-title">Reina</h2>

      {/* Featured intro card (reuses your project card system) */}
      <div
        className="project-card reina__featureCard page-width"
        role="button"
        tabIndex={0}
        onClick={goToCaseStudy}
        onKeyDown={(e) => e.key === "Enter" && goToCaseStudy()}
        aria-label="Go to Reina destination wedding planning case study"
      >
        <div className="project-media" aria-hidden="true">
          <div className="project-icon">👑</div>
        </div>

        <div className="project-body">
          <h3>🌟 Featured Concept</h3>
          <p>
            Helping couples discover and schedule international wedding venues with confidence.{" "}
            <span className="reina__muted">
              A self-directed concept app designed to reduce stress and add clarity to destination wedding planning.
            </span>
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="reina__grid page-width">
        <figure className="reina__figure">
          <div
            className="reina__imageWrap"
            role="button"
            tabIndex={0}
            onClick={goToCaseStudy}
            onKeyDown={(e) => e.key === "Enter" && goToCaseStudy()}
            aria-label="Open Reina case study"
          >
            <img
              className="reina__image"
              src="/assets/reina-flow.png"
              alt="Reina core user flow wireframes: discovery, preferences, swipe gallery, consultation chat, visitation schedule."
              loading="lazy"
            />

            <span className="reina__badge reina__badge--1" aria-hidden="true">
              1
            </span>
            <span className="reina__badge reina__badge--2" aria-hidden="true">
              2
            </span>
            <span className="reina__badge reina__badge--3" aria-hidden="true">
              3
            </span>
            <span className="reina__badge reina__badge--4" aria-hidden="true">
              4
            </span>
            <span className="reina__badge reina__badge--5" aria-hidden="true">
              5
            </span>
          </div>

          <figcaption className="reina__caption">
            Reina guides users through selecting preferences, browsing venues, consulting with an expert, and receiving a
            personalized visitation schedule — all tailored for destination weddings abroad.
          </figcaption>
        </figure>

        <aside className="reina__aside">
          <h3 className="reina__asideTitle">🗂️ Core User Flow</h3>
          <p className="reina__asideSubtitle">From venue discovery to scheduled visit</p>

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

          <div className="reina__commentary">
            <h3 className="reina__asideTitle">🔧 Designer Commentary</h3>

            <div className="reina__cols">
              <div className="reina__col">
                <h4 className="reina__miniTitle">🎯 What I Practiced</h4>
                <ul className="reina__bullets">
                  <li>Designing end-to-end UX for a multi-touch, service-oriented app</li>
                  <li>Creating structured choice without overwhelming users</li>
                  <li>Balancing inspiration with utility in a high-emotion domain</li>
                </ul>
              </div>

              <div className="reina__col">
                <h4 className="reina__miniTitle">💭 What I’d Do Next</h4>
                <ul className="reina__bullets">
                  <li>Add booking + calendar integration</li>
                  <li>Test form length vs. completion rate</li>
                  <li>Explore language localization for global use</li>
                </ul>
              </div>
            </div>

            <div className="reina__value">
              <h4 className="reina__miniTitle">✅ What This Adds to My UX Story</h4>
              <ul className="reina__bullets">
                <li>Showcases visual design & flow thinking</li>
                <li>Diversifies my portfolio beyond enterprise systems</li>
                <li>Reflects initiative + long-term personal interest</li>
                <li>Adds emotional range to my UX brand</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
