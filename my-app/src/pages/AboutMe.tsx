import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

// ── What I bring ─────────────────────────────────────────────────────────
const AGENDA = [
  {
    icon: "🔬",
    title: "Research-first thinking",
    desc: "I map workflows and interview users before designing anything.",
  },
  {
    icon: "🧩",
    title: "Systems perspective",
    desc: "I think in workflows, not wireframes — people, tools, and processes together.",
  },
  {
    icon: "🤖",
    title: "AI judgment",
    desc: "I know when to use AI, how to evaluate its outputs, and where human judgment leads.",
  },
  {
    icon: "🤝",
    title: "Cross-disciplinary fluency",
    desc: "I translate between clinicians, engineers, and operators so decisions become usable systems.",
  },
];

// ── Story chapters ───────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "army",
    label: "Where My Foundation Was Built",
    icon: "🎖️",
    heading: "The Army taught me process improvement before I had the vocabulary for it.",
    image: "/assets/about/army.jpg",
    paragraphs: [
      "As a commissioned officer in the NJ Army National Guard, I directed medical logistics for 5,000+ soldiers across 7 aid stations in 3 countries. Cut resupply time 85%, reduced spending 60%, and pioneered digital tracking in a deployed environment.",
    ],
    callout: "Process failure in a combat zone isn’t an inconvenience. It’s a casualty risk.",
  },
  {
    id: "msk",
    label: "Where Process Met Design",
    icon: "🏥",
    heading: "Six years at MSK, designing for humans inside the systems I was improving.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "Across four roles, I cut EMR costs 20%, rebuilt certification workflows for 70% efficiency gains, and redesigned onboarding for 21,000+ clinicians. That’s when I realized process improvement and design are the same discipline.",
    ],
    callout: "Clarity isn’t optional when people rely on the system to do their job.",
    articleLink: {
      url: "https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk",
      title: "Hillary Esposito’s Career Path: From the Military to MSK",
      source: "MSK News",
    },
  },
  {
    id: "now",
    label: "Where I Am Now",
    icon: "💻",
    heading: "UX design, process improvement, and AI — unified.",
    image: "/assets/about/now.png",
    paragraphs: [
      "Today I bring both disciplines together through UX and service design, with AI fluency as the edge. I focus on where AI fits into workflows responsibly, in ways frontline staff will actually trust and adopt.",
    ],
    callout: "Design for the humans in the system, and the metrics follow.",
  },
];

export default function About() {
  usePageTitle("About");
  const navigate = useNavigate();
  const lunaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!lunaRef.current) return;
      const movement = Math.sin(window.scrollY * 0.002) * 14;
      lunaRef.current.style.transform = `translateY(${movement}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-page">
      <div className="about-back-row">
        <button
          type="button"
          className="about-back-btn"
          onClick={() => navigate("/")}
          aria-label="Back to main portfolio"
        >
          ← Back to work
        </button>
      </div>

      {/* ═ HERO ═════════════════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">Product Designer × Process Improvement. Veteran.</p>

          <h1 className="about-title">
            I redesign how people and processes work together, in systems where confusion isn’t an option.
          </h1>

          <p className="about-hero-subtext">
            Eight years in healthcare and military systems — bridging UX, process improvement, and AI.
          </p>
        </div>

        <div className="about-hero-photo">
          <img
            src="/assets/about/headshot.jpg"
            alt="Hillary Esposito"
            className="about-headshot"
          />
        </div>
      </section>

      {/* ═ WHAT I BRING ═════════════════════════════════════════════ */}
      <section className="about-agenda" aria-label="What I bring">
        <div className="about-agenda__header">
          <p className="about-agenda__eyebrow">What I bring</p>
          <h2 className="about-growth-title">A perspective shaped by real systems.</h2>
          <p className="about-growth-text" style={{ maxWidth: "68ch" }}>
            My approach comes from working in environments where small breakdowns
            cause real problems.
          </p>
        </div>

        <div className="about-agenda__grid">
          {AGENDA.map((item) => (
            <div key={item.title} className="about-agenda__card feature">
              <span className="about-agenda__icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="about-agenda__title">{item.title}</h3>
              <p className="about-agenda__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═ STORY ════════════════════════════════════════════════════ */}
      <section className="about-story-section" aria-label="My story">
        <div className="about-story-header">
          <p className="about-agenda__eyebrow">My story</p>
          <h2 className="about-growth-title">How I got here.</h2>
        </div>

        <div className="about-story-grid">
          {CHAPTERS.map((chapter) => (
            <article key={chapter.id} className="about-story-card feature">
              <div className="about-story-card__layout">
                {chapter.image && (
                  <div className="about-story-card__image">
                    <img src={chapter.image} alt="" loading="lazy" />
                  </div>
                )}

                <div className="about-story-card__content">
                  <div className="about-story-card__top">
                    <span className="about-story-card__icon" aria-hidden="true">
                      {chapter.icon}
                    </span>
                    <div>
                      <p className="about-story-card__label">{chapter.label}</p>
                      <h3 className="about-story-card__heading">{chapter.heading}</h3>
                    </div>
                  </div>

                  <div className="about-story-card__body">
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="about-story-card__text">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="about-story-card__callout">
                    <p>{chapter.callout}</p>
                  </div>
                </div>
              </div>

              {chapter.articleLink && (
                <a
                  href={chapter.articleLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-story-card__article-link"
                  aria-label={`Read article: ${chapter.articleLink.title}`}
                >
                  <span className="about-story-card__article-icon" aria-hidden="true">
                    📰
                  </span>
                  <span className="about-story-card__article-text">
                    <span className="about-story-card__article-title">
                      {chapter.articleLink.title}
                    </span>
                    <span className="about-story-card__article-source">
                      {chapter.articleLink.source}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ marginLeft: "0.35rem", verticalAlign: "middle" }}>
                        <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ═ HUMAN ════════════════════════════════════════════════════ */}
      <section className="about-life" aria-label="Outside of work">
        <div className="about-life-card feature">
          <h2 className="about-life-title">Outside of work</h2>
          <p className="about-life-intro">
            Running, reading, and Luna the cat — routines that keep me clear and grounded.
          </p>
          <div ref={lunaRef} className="about-luna-deco" aria-hidden="true">
            🐾
          </div>
        </div>
      </section>

      {/* ═ CTA ══════════════════════════════════════════════════════ */}
      <section className="about-cta">
        <div className="about-cta-simple">
          <h2 className="about-cta-title" style={{ marginBottom: "1rem" }}>
            Interested in working together?
          </h2>
          <p className="about-cta-content" style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.75rem" }}>
            I’m open to full-time product design roles, freelance projects, and collaborations — especially in healthcare, government, and enterprise.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className="hero-btn"
              style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
              onClick={() => navigate("/contact")}
            >
              Get in touch
            </button>
            <button
              type="button"
              className="about-back-btn"
              onClick={() => navigate("/")}
              style={{ fontSize: "0.9rem" }}
            >
              ← View my work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}