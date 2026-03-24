import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── 1. The Stats (Immediate validation) ───────────────────────────────────
const STATS = [
  { value: "8+ Years", label: "Improving complex, multi-stakeholder systems" },
  { value: "21K+",     label: "Users/Staff impacted at MSK" },
  { value: "60%",      label: "Waste reduction in critical logistics" },
  { value: "3",         label: "Core disciplines (UX, Software Eng, Data)" },
];

// ── 2. Visual Timeline (Replacing the detailed, bulky list) ─────────────────
const TIMELINE_EVENTS = [
  { year: "Now",         title: "Content & Interaction UX", org: "Mobbin" },
  { year: "2024",        title: "Brigade Logistics (Iraq Deployment)", org: "US Army" },
  { year: "2022 – 2024", title: "UX Research & Testing (EHR Systems)", org: "MSK Cancer Center" },
  // ...Keeping it lean and focused on UX-adjacent impact
];

// ── 3. The Perspective (Bridging your unique story to UX) ──────────────────
const PERSPECTIVES = [
  {
    icon: "⚡",
    title: "High-stakes clarity",
    paragraph: "Healthcare and combat deployments teach you one thing: confusion has consequences. I specialize in designing for overwhelmed users—clinicians navigating EHRs or soldiers coordinating systems. My goal is to reduce cognitive load and find simplicity when clarity matters most.",
  },
  {
    icon: "🧩",
    title: "Systems-first perspective",
    paragraph: "I don't see screens; I see workflows. Eight years spanning military logistics and digital products have trained me to analyze the entire operational pipeline. My approach is to ensure that the interface isn't just intuitive, but that it aligns with the underlying systemic architecture.",
  },
];

// ── 4. The Toolbox (Skills) ──────────────────────────────────────────────
const SKILLS = [
  { group: "UX Research", items: ["Usability testing", "Heuristic evaluation", "Interviewing", "Journey mapping"] },
  { group: "Design",       items: ["Prototyping", "Interaction design", "Design systems", "Microcopy"] },
  { group: "Tools",        items: ["Figma", "FigJam", "Miro", "Notion"] },
];

// ── 5. The Human (Life outside work) ──────────────────────────────────────
const HOBBIES = [
  { icon: "🏃‍♀️", title: "Running", desc: "For perspective. Miles are how I step away and process complex problems." },
  { icon: "📚",  title: "Reading", desc: "For empathy. Reminds me that every design is just a chapter in a user’s story." },
  { icon: "🐱",  title: "Luna",    desc: "For groundedness. The official portfolio QA lead and moral support." },
];

export default function About() {
  const navigate = useNavigate();
  const lunaRef = useRef<HTMLDivElement>(null);

  // Cat paw animation
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
        <button type="button" className="about-back-btn" onClick={() => navigate("/")}>
          ← Back to work
        </button>
      </div>

      {/* ═ HERO ════════════════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">Veteran. Systems Thinker. Currently shaping pattern intelligence at Mobbin.</p>
          <h2 className="about-title">
            I turn complex, high‑pressure systems into experiences that feel
            intuitive, manageable, and human.
          </h2>
        </div>
      </section>

      {/* ═ VISUAL TIMELINE (THE GRAPHIC) ══════════════════════════════ */}
      <section className="about-timeline-section" aria-label="Career Journey">
        <p className="about-agenda__eyebrow">The Journey</p>
        <div className="about-timeline-graphic">
          <div className="timeline-spine" aria-hidden="true" />
          <div className="timeline-events-container">
            {TIMELINE_EVENTS.map((event, i) => (
              <div key={i} className="timeline-event-card">
                <span className="timeline-event-year">{event.year}</span>
                <div className="timeline-event-marker" aria-hidden="true">
                  {i === 0 && <div className="timeline-pulsar" />}
                </div>
                <div className="timeline-event-details">
                  <p className="timeline-event-title">{event.title}</p>
                  <p className="timeline-event-org">{event.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═ THE PERSPECTIVE (YOUR UNIQUE VALUE PROP) ═══════════════════ */}
      <section className="about-agenda" aria-label="A unique design perspective">
        <div className="about-agenda__header">
          <h2 className="about-growth-title">A perspective you don't find often.</h2>
          <p className="about-growth-text">
            My approach to design was forged in environments where ambiguity could cause misses: clinical IT systems and mission logistics.
          </p>
        </div>
        <div className="about-perspective__grid">
          {PERSPECTIVES.map((p) => (
            <div key={p.title} className="perspective-card feature">
              <span className="perspective-icon" aria-hidden="true">{p.icon}</span>
              <h3 className="perspective-title">{p.title}</h3>
              <p className="perspective-text">{p.paragraph}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═ STATS (MOVED BELOW PERSPECTIVE TO VALIDATE) ══════════════════ */}
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

      {/* ═ TOOLS & SKILLS ════════════════════════════════════════════ */}
      <section className="about-skills" aria-label="Toolbox and methods">
        <h2 className="about-growth-title">The Toolbox</h2>
        <div className="about-skills__grid">
          {SKILLS.map((group) => (
            <div key={group.group} className="about-skills__group feature">
              <p className="about-skills__group-label">{group.group}</p>
              <div className="about-skills__badges">
                {group.items.map((skill) => (
                  <span key={skill} className="about-skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═ THE HUMAN (LIFE/HOBBIES) ══════════════════════════════════ */}
      <section className="about-life">
        <div className="about-life-card">
          <h2 className="about-life-title">Beyond the screen</h2>
          <p className="about-life-intro">I'm a believer in routines that foster calm and perspective.</p>
          <div className="about-hobbies">
            {HOBBIES.map((h) => (
              <div key={h.title} className="hobby-card">
                <div className="hobby-icon">{h.icon}</div>
                <h3 className="hobby-title">{h.title}</h3>
                <p className="hobby-desc">{h.desc}</p>
              </div>
            ))}
          </div>
          <div ref={lunaRef} className="about-luna-deco" aria-hidden="true">🐾</div>
        </div>
      </section>

      {/* ═ CTA ══════════════════════════════════════════════════════ */}
      <section className="about-cta">
        <div className="about-cta-card">
          <h2 className="about-cta-title">Looking for something that matters.</h2>
          <div className="about-cta-content">
            <p>
              I’m seeking a role where I can apply research, systems thinking, and interaction design to help people navigate complex, high-stakes scenarios.
            </p>
            <p>
              Whether it’s streamlining clinical workflows, optimizing complex SaaS platforms, or reducing ambiguity in digital products—I specialize in making systems feel effortless.
            </p>
          </div>
          <div className="about-cta-actions">
            <button type="button" className="hero-btn" onClick={() => navigate("/contact")}>Get in touch</button>
            <button type="button" className="about-back-btn about-back-btn--outline" onClick={() => navigate("/")}>← View my work</button>
          </div>
        </div>
      </section>
    </div>
  );
}