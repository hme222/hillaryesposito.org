// src/pages/About.tsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { value: "21K+", label: "Staff impacted at MSK" },
  { value: "5K+",  label: "Soldiers supported" },
  { value: "3",    label: "Bootcamps completed" },
  { value: "3",    label: "Case studies shipped" },
];

const SKILLS = [
  { group: "Research",    items: ["User interviews", "Surveys", "Journey mapping", "Competitive analysis", "SWOT", "Heuristic evaluation"] },
  { group: "Design",      items: ["Wireframing", "Prototyping", "IA", "Interaction design", "Accessibility (WCAG)", "Design systems"] },
  { group: "Tools",       items: ["Figma", "Maze", "FigJam", "Notion", "Google Suite", "Miro"] },
  { group: "Technical",   items: ["HTML / CSS", "TypeScript / React", "Data analytics", "GitHub", "SQL basics"] },
];

const CHAPTERS = [
  {
    id: "msk",
    label: "Where I Discovered UX",
    icon: "🏥",
    accent: "#6b8e23",
    heading: "Healthcare showed me what design can do.",
    paragraphs: [
      "I was introduced to UX while working at Memorial Sloan Kettering Cancer Center, where I supported research and design efforts for internal tools used by 21,000+ staff. Clinicians, administrators, researchers — all navigating life-and-death decisions through digital interfaces.",
      "Seeing how small interface decisions could influence understanding, efficiency, and stress levels sparked my interest in designing systems that prioritize clarity and ease of use. A confusing workflow isn't just frustrating in healthcare; it could mean a missed diagnosis, a delayed treatment, a moment of uncertainty when someone needs absolute clarity.",
      "I redesigned EHR features. I reengineered certification workflows. I guided system rollouts. But more than anything, I learned to design with deep respect for the weight people carry.",
    ],
    callout: "A confusing workflow isn't just frustrating — it could mean a missed diagnosis.",
  },
  {
    id: "army",
    label: "Where the Foundation Was Built",
    icon: "🎖️",
    accent: "#808000",
    heading: "The Army taught me adaptability and systems thinking.",
    paragraphs: [
      "Earlier in my career, I served in the Army National Guard while balancing civilian work. As a logistics officer, I directed systems for 5,000+ deployed soldiers. When you're coordinating supplies across combat zones, there's no room for ambiguity.",
      "That experience strengthened my adaptability, collaboration skills, and comfort working within complex systems. It also shaped how I approach problem-solving — with steadiness and care for the people navigating those systems under pressure.",
      "My deployment gave me a perspective I bring to every project: design for people who are stressed, overwhelmed, and making decisions that truly matter.",
    ],
    callout: "Design for people who are stressed, overwhelmed, and making decisions that truly matter.",
  },
  {
    id: "reina",
    label: "Where I Explored End-to-End",
    icon: "👑",
    accent: "#556b2f",
    heading: "Personal projects taught me to design for emotion.",
    paragraphs: [
      "Outside of professional work, I enjoy building projects that let me explore design problems from end to end. One of those projects, Reina, is a mobile app created to help couples plan destination weddings with less uncertainty.",
      "Not every high-stakes moment happens in a hospital or a combat zone. Sometimes it's a couple trying to balance family expectations, budget constraints, and the dream of a perfect day. The stress is different, but the need for clarity and calm is exactly the same.",
      "Designing for an emotionally charged experience reinforced an important lesson: regardless of context, people benefit from tools that help them feel informed, supported, and capable.",
    ],
    callout: "The stress is different, but the need for clarity and calm is exactly the same.",
  },
];

const HOBBIES = [
  { icon: "🏃‍♀️", title: "Running",  desc: "Miles give me time to think through design problems and decompress from complexity." },
  { icon: "📚",    title: "Reading",  desc: "Books remind me that every story — like every design — needs structure, empathy, and purpose." },
  { icon: "🐱",    title: "Luna",     desc: "My cat Luna keeps me grounded. She's excellent at reminding me when it's time to step away from the screen." },
];

export default function About() {
  const navigate   = useNavigate();
  const lunaRef    = useRef<HTMLDivElement>(null);

  // Subtle scroll-driven float on the luna decoration
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

      {/* ══════════════════════════════════════
          BACK BUTTON
      ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">
            I'm a UX designer driven by curiosity and a desire to help people
            navigate complexity with more clarity and confidence.
          </p>
          <h2 className="about-title">
            I turn complex, high‑pressure systems into experiences that feel
            intuitive, manageable, and human.
          </h2>
        </div>

        {/* Decorative accent block */}
        <div className="about-hero-accent" aria-hidden="true">
          <div className="about-hero-accent__ring" />
          <div className="about-hero-accent__dot" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          STAT STRIP
      ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
          JOURNEY CHAPTERS — visual timeline
      ══════════════════════════════════════ */}
      <section className="about-journey" aria-label="Career journey">
        <div className="about-timeline-rail" aria-hidden="true" />

        <div className="about-chapters">
          {CHAPTERS.map((ch, i) => (
            <div key={ch.id} className={`about-chapter about-chapter--${ch.id}`}>

              {/* Timeline node */}
              <div className="about-chapter__node" aria-hidden="true">
                <div className="about-chapter__icon">{ch.icon}</div>
                <div className="about-chapter__line" />
              </div>

              <div className="about-chapter__body">
                <div className="chapter-marker">
                  <div className="chapter-dot" />
                  <span className="chapter-label">{ch.label}</span>
                </div>

                <h2 className="chapter-heading">{ch.heading}</h2>

                {ch.paragraphs.map((p, j) => (
                  <p key={j} className="chapter-text">{p}</p>
                ))}

                {/* Pull quote callout */}
                <blockquote className="about-pullquote">
                  <p>"{ch.callout}"</p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS — grouped badge grid
      ══════════════════════════════════════ */}
      <section className="about-skills" aria-label="Skills and tools">
        <h2 className="about-growth-title">Skills &amp; tools</h2>
        <p className="about-growth-text" style={{ marginBottom: "2rem" }}>
          Three bootcamps and hands-on project work across healthcare, military
          logistics, and consumer apps built this toolkit.
        </p>

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

      {/* ══════════════════════════════════════
          GROWTH COPY
      ══════════════════════════════════════ */}
      <section className="about-growth">
        <h2 className="about-growth-title">Building technical fluency</h2>
        <p className="about-growth-text">
          After transitioning fully out of the military, I made a deliberate
          decision to focus on strengthening my design and technical foundation.
          I completed three full-time bootcamps in UX design, data analytics,
          and software engineering to better understand how design, data, and
          technology work together.
        </p>
        <p className="about-growth-text">
          This experience helped me become more fluent in collaborating across
          disciplines and more confident working within technical constraints. I
          work at the intersection of UX, service design, and systems
          thinking — with a focus on healthcare, government, and products where
          people are time-pressed or making decisions that shape their lives.
        </p>

        {/* Visual bootcamp timeline */}
        <div className="about-bootcamp-row" aria-label="Bootcamp timeline">
          {[
            { icon: "🎨", label: "UX Design",        sub: "Research → Prototype → Test" },
            { icon: "📊", label: "Data Analytics",   sub: "SQL · Tableau · Python basics" },
            { icon: "💻", label: "Software Eng.",    sub: "HTML · CSS · JS · React" },
          ].map((b, i) => (
            <React.Fragment key={b.label}>
              <div className="about-bootcamp-card feature">
                <span className="about-bootcamp-icon">{b.icon}</span>
                <p className="about-bootcamp-label">{b.label}</p>
                <p className="about-bootcamp-sub">{b.sub}</p>
              </div>
              {i < 2 && (
                <div className="about-bootcamp-arrow" aria-hidden="true">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          LIFE — hobbies card
      ══════════════════════════════════════ */}
      <section className="about-life">
        <div className="about-life-card">
          <h2 className="about-life-title">Life as a veteran</h2>

          <div className="about-life-intro">
            <p>
              After my deployment, I found myself gravitating toward routines
              that bring calm and clarity — the same things I try to design
              into every interface.
            </p>
          </div>

          <div className="about-hobbies">
            {HOBBIES.map((h) => (
              <div key={h.title} className="hobby-card">
                <div className="hobby-icon">{h.icon}</div>
                <h3 className="hobby-title">{h.title}</h3>
                <p className="hobby-desc">{h.desc}</p>
              </div>
            ))}
          </div>

          {/* Luna floating decoration */}
          <div ref={lunaRef} className="about-luna-deco" aria-hidden="true">
            🐾
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="about-cta">
        <div className="about-cta-card">
          <h2 className="about-cta-title">What I'm looking for</h2>

          <div className="about-cta-content">
            <p>
              I'm seeking a junior UX role where I can continue learning,
              contribute thoughtfully to cross-functional teams, and apply my
              skills in research, interaction design, and systems thinking across
              a variety of products and industries.
            </p>
            <p>
              Whether it's improving clinical workflows, streamlining government
              services, or building consumer products that reduce cognitive
              load — I specialize in creating experiences that help people feel
              more capable, more informed, and more at ease.
            </p>
            <p className="about-cta-highlight">
              If you're building something that matters, let's talk.
            </p>
          </div>

          {/* CTA buttons */}
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