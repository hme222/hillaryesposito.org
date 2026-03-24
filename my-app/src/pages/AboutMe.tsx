import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Stats ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "8+", label: "Years improving complex systems" },
  { value: "21K+", label: "Users impacted at MSK" },
  { value: "25%", label: "Improvement in task completion" },
  { value: "60%", label: "Reduction in logistics waste" },
];

// ── What I bring ─────────────────────────────────────────────────────────
const AGENDA = [
  {
    icon: "🔬",
    title: "Research-first thinking",
    desc: "I don’t start with screens. I start with how the system actually works—and where people struggle. Interviews, workflows, and edge cases come before anything visual.",
  },
  {
    icon: "🧩",
    title: "Systems perspective",
    desc: "I think in workflows, not screens. I focus on how tools, people, and processes connect—not just the interface layer.",
  },
  {
    icon: "⚡",
    title: "Clarity under pressure",
    desc: "I’ve worked in environments where confusion leads to delays or mistakes. I design to remove that so people can move with confidence.",
  },
  {
    icon: "🤝",
    title: "Cross-disciplinary fluency",
    desc: "I work comfortably with clinicians, engineers, and operators. I focus on making sure decisions translate into something usable.",
  },
];

// ── Story chapters ───────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "mobbin",
    label: "Where I Am Now",
    icon: "💻",
    heading: "Currently studying what makes interfaces actually work.",
    paragraphs: [
      "I’m currently working as a UX content designer at Mobbin, analyzing mobile UI patterns and breaking down what makes interfaces intuitive—or confusing.",
      "I study user flows, contribute to pattern libraries, and focus on how microcopy supports clarity. It’s detail-oriented work, but those small moments are often what shape the overall experience.",
    ],
    callout: "Most usability issues aren’t big—they’re small moments that add up.",
  },
  {
    id: "msk",
    label: "Where I Learned UX",
    icon: "🏥",
    heading: "Healthcare showed me what clarity really means.",
    paragraphs: [
      "I spent four years at Memorial Sloan Kettering working on internal tools used by 21,000+ staff—clinicians, administrators, and researchers.",
      "I led UX research and testing, redesigned workflows, and worked on EHR-related systems. We improved task completion by 25%, but more importantly, we made systems easier to understand for people doing complex work every day.",
      "The biggest takeaway: in healthcare, confusing systems slow people down when they can’t afford it.",
    ],
    callout: "Clarity isn’t optional when people rely on the system to do their job.",
  },
  {
    id: "army",
    label: "Where My Foundation Was Built",
    icon: "🎖️",
    heading: "The Army taught me how systems break—and how to fix them.",
    paragraphs: [
      "While working in healthcare, I was also serving in the Army National Guard. In 2024, I deployed to Iraq as a logistics officer, managing supply systems for over 5,000 soldiers.",
      "We improved coordination by 15% and reduced waste by 60%. But the bigger lesson was operational: when systems aren’t clear, people feel it immediately.",
      "That experience shapes how I approach design—I prioritize clarity, structure, and reliability over everything else.",
    ],
    callout: "Good systems remove friction before it becomes a problem.",
  },
];

// ── Skills ───────────────────────────────────────────────────────────────
const SKILLS = [
  {
    group: "Research",
    items: ["Usability testing", "Heuristic evaluation", "Interviewing", "Journey mapping"],
  },
  {
    group: "Design",
    items: ["Prototyping", "Interaction design", "Design systems", "Microcopy"],
  },
  {
    group: "Tools",
    items: ["Figma", "FigJam", "Miro", "Notion"],
  },
  {
    group: "Technical",
    items: ["HTML / CSS", "React", "SQL basics", "Accessibility"],
  },
];

// ── Beyond work ──────────────────────────────────────────────────────────
const HOBBIES = [
  {
    icon: "🏃‍♀️",
    title: "Running",
    desc: "Running is where I process problems I couldn’t solve at my desk.",
  },
  {
    icon: "📚",
    title: "Reading",
    desc: "Reading keeps me grounded—every system is someone else’s experience.",
  },
  {
    icon: "🐱",
    title: "Luna",
    desc: "My cat and unofficial QA partner. She’s good at reminding me when to step away.",
  },
];

export default function About() {
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
          <p className="about-intro">UX Designer. Systems thinker. Veteran.</p>

          <h2 className="about-title">
            I design systems for people who don’t have time to figure things out.
          </h2>

          <p className="about-hero-subtext">
            I’ve spent 8+ years working inside healthcare systems, military logistics,
            and digital products—where clarity matters and confusion slows people down.
          </p>
        </div>

        <div className="about-hero-accent" aria-hidden="true">
          <div className="about-hero-accent__ring" />
          <div className="about-hero-accent__dot" />
        </div>
      </section>

      {/* ═ STATS ════════════════════════════════════════════════════ */}
      <section className="about-stats" aria-label="Key numbers">
        <div className="about-stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="about-stat-card feature">
              <p className="about-stat-value gradient-text">{s.value}</p>
              <p className="about-stat-label">{s.label}</p>
            </div>
          ))}
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
            </article>
          ))}
        </div>
      </section>

      {/* ═ SKILLS ═══════════════════════════════════════════════════ */}
      <section className="about-skills" aria-label="Toolbox and methods">
        <div className="about-skills__header">
          <p className="about-agenda__eyebrow">Toolbox</p>
          <h2 className="about-growth-title">Methods I rely on.</h2>
        </div>

        <div className="about-skills__grid">
          {SKILLS.map((group) => (
            <div key={group.group} className="about-skills__group feature">
              <p className="about-skills__group-label">{group.group}</p>
              <div className="about-skills__badges">
                {group.items.map((skill) => (
                  <span key={skill} className="about-skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═ HUMAN ════════════════════════════════════════════════════ */}
      <section className="about-life" aria-label="Outside of work">
        <div className="about-life-card feature">
          <h2 className="about-life-title">Outside of work</h2>
          <p className="about-life-intro">
            I try to keep routines that help me stay clear, focused, and grounded.
          </p>

          <div className="about-hobbies">
            {HOBBIES.map((hobby) => (
              <div key={hobby.title} className="hobby-card">
                <div className="hobby-icon" aria-hidden="true">
                  {hobby.icon}
                </div>
                <h3 className="hobby-title">{hobby.title}</h3>
                <p className="hobby-desc">{hobby.desc}</p>
              </div>
            ))}
          </div>

          <div ref={lunaRef} className="about-luna-deco" aria-hidden="true">
            🐾
          </div>
        </div>
      </section>

      {/* ═ CTA ══════════════════════════════════════════════════════ */}
      <section className="about-cta">
        <div className="about-cta-card">
          <h2 className="about-cta-title">Looking for work that matters.</h2>

          <div className="about-cta-content">
            <p>
              I’m looking for a UX or systems-focused role where I can help make
              complex tools easier to use.
            </p>
            <p>
              Whether it’s healthcare, SaaS, or internal platforms, I’m interested
              in problems where clarity, structure, and usability actually make a
              difference.
            </p>
          </div>

          <div className="about-cta-actions">
            <button
              type="button"
              className="hero-btn"
              onClick={() => navigate("/contact")}
            >
              Get in touch
            </button>

            <button
              type="button"
              className="about-back-btn about-back-btn--outline"
              onClick={() => navigate("/")}
            >
              ← View my work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}