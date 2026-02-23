import React from "react";
import { useNavigate } from "react-router-dom";

type Callout = {
  step: number;
  title: string;
  description: string;
};

const CALLOUTS: Callout[] = [
  { step: 1, title: "Homepage", description: "Curated venue discovery with a quick onboarding preview" },
  { step: 2, title: "Preferences form", description: "Capture location, budget range, guest count, and must-haves" },
  { step: 3, title: "Swipe gallery", description: "Fast visual comparison to build a shortlist confidently" },
  { step: 4, title: "Consultant chat", description: "Expert guidance to validate fit and answer questions in real time" },
  { step: 5, title: "Visit schedule", description: "Turn the shortlist into a personalized itinerary for in-person tours" },
];

export default function ReinaSection() {
  const navigate = useNavigate();
  const goToCaseStudy = () => navigate("/case-study/Reina");

  return (
    <section id="reina" className="projects reina">
      <div className="page-width reina__wrap">
        <header className="reina__overview" aria-label="Reina project overview">
          <div className="reina__tag" aria-label="Featured Concept">
            <span aria-hidden="true">👑</span>
            <span>Featured Concept</span>
          </div>

          <h1 className="section-title reina__title">Reina</h1>

          <p className="reina__lead">
            Helping couples discover and schedule international wedding venues with confidence.{" "}
            <span className="reina__muted">
              A self-directed concept app designed to reduce stress and add clarity to destination wedding planning.
            </span>
          </p>

          {/* NEW: professional framing */}
          <div className="reina__summary" aria-label="Problem approach outcome summary">
            <div className="reina__summaryItem">
              <div className="reina__kicker">Problem</div>
              <p className="reina__summaryText">
                Destination planning is emotionally high-stakes and logistically complex, especially when venues are abroad.
              </p>
            </div>

            <div className="reina__summaryItem">
              <div className="reina__kicker">Approach</div>
              <p className="reina__summaryText">
                A guided flow that combines preference capture, visual shortlisting, and consultant support to reduce overwhelm.
              </p>
            </div>

            <div className="reina__summaryItem">
              <div className="reina__kicker">Outcome</div>
              <p className="reina__summaryText">
                A concept experience that turns browsing into a clear shortlist and a scheduled visit plan.
              </p>
            </div>
          </div>

          <dl className="reina__meta" aria-label="Reina project details">
            <div className="reina__metaItem">
              <dt>Role</dt>
              <dd>UX Designer & Researcher</dd>
            </div>
            <div className="reina__metaItem">
              <dt>Timeline</dt>
              <dd>Self-Directed Project</dd>
            </div>
            <div className="reina__metaItem">
              <dt>Type</dt>
              <dd>Mobile App Concept</dd>
            </div>
          </dl>
        </header>

        <figure className="reina__preview">
          <button type="button" className="reina__imageWrap" onClick={goToCaseStudy} aria-label="Open Reina case study">
            <img
              className="reina__image"
              src="/assets/reina-flow.png"
              alt="Reina core user flow wireframes: discovery, preferences, swipe gallery, consultation chat, visitation schedule."
              loading="lazy"
            />
          </button>

          <figcaption className="reina__caption">
            Reina guides users through selecting preferences, browsing venues, consulting with an expert, and receiving a
            personalized visitation schedule — tailored for destination weddings abroad.
          </figcaption>
        </figure>

        <section className="reina__flow" aria-label="Core user flow">
          <h2 className="reina__sectionTitle">Core user flow</h2>
          <ol className="reina__flowList">
            {CALLOUTS.map((c) => (
              <li key={c.step} className="reina__flowRow">
                <div className="reina__flowStep">{c.step}</div>
                <div className="reina__flowBody">
                  <div className="reina__flowTitle">{c.title}</div>
                  <div className="reina__flowDesc">{c.description}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="reina__notes" aria-label="Design reflections">
          <h2 className="reina__sectionTitle">Design reflections</h2>

          <div className="reina__noteStack">
            <article className="reina__note">
              <h4 className="reina__noteTitle">What I practiced</h4>
              <ul className="reina__bullets">
                <li>Designing end-to-end UX for a multi-touch, service-oriented app</li>
                <li>Creating structured choice without overwhelming users</li>
                <li>Balancing inspiration with utility in a high-emotion domain</li>
              </ul>
            </article>

            <article className="reina__note">
              <h4 className="reina__noteTitle">Next steps</h4>
              <ul className="reina__bullets">
                <li>Add booking + calendar integration</li>
                <li>Test form length vs. completion rate</li>
                <li>Explore language localization for global use</li>
              </ul>
            </article>

            <article className="reina__note">
              <h4 className="reina__noteTitle">Portfolio impact</h4>
              <ul className="reina__bullets">
                <li>Demonstrates end-to-end flow design and information hierarchy</li>
                <li>Expands my work into consumer, emotion-driven decision making</li>
                <li>Shows service + product thinking (expert support integrated into UX)</li>
                <li>Highlights clarity and structure in complex, high-stakes choices</li>
              </ul>
            </article>

            <article className="reina__note">
              <h4 className="reina__noteTitle">Constraints & assumptions</h4>
              <ul className="reina__bullets">
                <li>Concept project (no live inventory or vendor integrations)</li>
                <li>Focused on discovery + scheduling rather than booking/payment</li>
                <li>Designed for early-stage planners who need clarity fast</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}