import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

// ── What I bring ─────────────────────────────────────────────────────────
const AGENDA = [
  {
    icon: "01",
    title: "Process improvement",
    desc: "Lean Six Sigma expertise with documented 20-85% gains in cost, efficiency, and cycle time.",
  },
  {
    icon: "02",
    title: "Human-centered design",
    desc: "Rigorous technical foundation across design, data, and technology, grounded in research and usability.",
  },
  {
    icon: "03",
    title: "Healthcare fluency",
    desc: "Master of Health Administration (MHA) and six years inside clinical operations at MSK.",
  },
  {
    icon: "04",
    title: "AI judgment, not AI hype",
    desc: "Everyone uses AI now. The skill is knowing when to trust it and when to override it. On Grove I rejected five of its suggestions — and documented why.",
  },
];

// ── Story chapters ───────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "now",
    label: "What I Do Now",
    icon: "💻",
    heading: "Designing for trust in complex, regulated products.",
    image: "/assets/about/now.png",
    paragraphs: [
      "Right now I'm freelancing. My most recent contract was a deep study of three fintech products, where I documented more than 200 screens of end-to-end mobile flows, then annotated and tagged each one so thousands of designers could actually find and reuse them. It sharpened three things: reading interaction patterns at scale across financial UX, structuring documentation to a strict taxonomy and quality bar, and seeing how different products solve the same trust problem in very different ways. AI is part of how I work now, but it stays a tool. I use it to move faster on research and prototyping, then make the calls myself.",
    ],
    callout: "Design for the humans in the system, and the metrics follow.",
  },
  {
    id: "msk",
    label: "Where I Built My Practice",
    icon: "🏥",
    heading: "Six years at MSK, optimizing internal operations and designing for 21,000+ clinicians.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "I led an EMR process redesign that cut costs 20% organization-wide, rebuilt certification workflows for a 70% efficiency gain, and redesigned onboarding using staff feedback. This was deep user research before I formally had the vocabulary for it.",
    ],
    callout: "Systems don’t fail in flowcharts. They fail at the point where a real person has to use them.",
    articleLink: {
      url: "https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk",
      title: "Hillary Esposito’s Career Path: From the Military to MSK",
      source: "MSK News",
    },
  },
  {
    id: "army",
    label: "Where My Foundation Was Built",
    icon: "🎖️",
    heading: "Captain and Medical Logistics Officer, NJ Army National Guard.",
    image: "/assets/about/army.jpg",
    paragraphs: [
      "Deployed to Iraq with the 44th IBCT, I directed medical logistics for 5,000+ soldiers and $2M in supplies across seven aid stations in three countries. Pioneered digital tracking that cut resupply time 85% and reduced spending 60%. In 2020, activated for New Jersey’s COVID-19 response, reporting state medical operations directly to the Joint Surgeon’s office.",
    ],
    callout: "Process failure in a combat zone isn’t an inconvenience. It’s a casualty risk.",
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
          onClick={() => navigate("/?scrollTo=projects")}
          aria-label="Back to main portfolio"
        >
          ← Back to work
        </button>
      </div>

      {/* ═ HERO ═════════════════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">UX/Product Designer. Healthcare & Enterprise Systems. Army Veteran.</p>

          <h1 className="about-title">
            Turning complex healthcare and enterprise workflows into trusted digital products.
          </h1>

          <p className="about-hero-subtext">
            13+ years of leadership across process improvement, clinical systems, military operations, and UX research. I’ve spent my career at the intersection where systems fail: the point where a real person has to use them.
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
          <h2 className="about-growth-title">What I bring to the table.</h2>
          <p className="about-growth-text" style={{ maxWidth: "68ch" }}>
            My core philosophy: design for the humans in the system, and the metrics follow.
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
            Running, reading, and Luna the cat. Routines that keep me clear and grounded.
          </p>
          <div ref={lunaRef} className="about-luna-deco">
            <img src="/assets/favicon.png" alt="Luna, a gray and white cat with orange eyes" />
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
            Open to UX, product design, and service design roles in healthcare, mission-driven organizations, and operationally complex environments. Also open to freelance and collaborations.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className="hero-btn"
              style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
              onClick={() => navigate("/?scrollTo=contact")}
            >
              Get in touch
            </button>
            <button
              type="button"
              className="about-back-btn"
              onClick={() => navigate("/?scrollTo=projects")}
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