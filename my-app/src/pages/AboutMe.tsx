// src/pages/About.tsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ── Stats aligned with resume numbers ──────────────────────────────────────
const STATS = [
  { value: "8+",   label: "Years improving complex systems" },
  { value: "21K+", label: "Staff impacted at MSK" },
  { value: "25%",  label: "Task completion improvement" },
  { value: "60%",  label: "Waste reduction in logistics" },
];

// ── Skills aligned exactly with resume ─────────────────────────────────────
const SKILLS = [
  {
    group: "UX Research",
    items: ["User interviews", "Surveys", "Journey mapping", "Competitive analysis", "Usability testing", "Heuristic evaluation"],
  },
  {
    group: "Design",
    items: ["Wireframing", "Prototyping", "Interaction design", "IA", "Accessibility (WCAG)", "Visual hierarchy"],
  },
  {
    group: "Tools",
    items: ["Figma", "FigJam", "Miro", "Notion"],
  },
  {
    group: "Technical",
    items: ["HTML / CSS", "React", "SQL basics", "Design systems", "Microcopy"],
  },
];

// ── Career timeline (chronological, most recent first) ─────────────────────
const TIMELINE = [
  {
    year: "2026 – Now",
    role: "Freelance Content Designer (UX)",
    org:  "Mobbin",
    type: "current",
    bullets: [
      "Analyzing mobile UI patterns to identify best practices in usability, visual hierarchy, and interaction design",
      "Synthesizing user flows to inform interface decisions and contributing to pattern libraries",
      "Collaborating with designers to align microcopy with visual design and support design system consistency",
    ],
  },
  {
    year: "2024",
    role: "Brigade Medical Supply Officer",
    org:  "NJ Army National Guard · Iraq",
    type: "military",
    bullets: [
      "Directed logistical systems for 5,000+ soldiers in mission-critical environments",
      "Improved coordination by 15% and reduced waste by 60%",
      "Maintained clarity and precision across technical and non-technical teams under pressure",
    ],
  },
  {
    year: "2022 – 2024",
    role: "Trainer I Specialist (UX)",
    org:  "Memorial Sloan Kettering Cancer Center",
    type: "healthcare",
    bullets: [
      "Led UX research and testing for internal tools used by 21,000+ staff",
      "Reduced cognitive load and improved task completion by 25%",
      "Designed and validated EHR features and certification workflows",
    ],
  },
  {
    year: "2020 – 2022",
    role: "Administrative Assistant",
    org:  "Memorial Sloan Kettering Cancer Center",
    type: "healthcare",
    bullets: [
      "Reengineered certification workflows, improving speed and reducing errors",
      "Contributed UX input to a SharePoint system rollout affecting thousands of staff",
    ],
  },
];

const TIMELINE_TYPE_ICONS: Record<string, string> = {
  current:    "💻",
  military:   "🎖️",
  healthcare: "🏥",
};

// ── Story chapters aligned with resume ─────────────────────────────────────
const CHAPTERS = [
  {
    id:      "mobbin",
    label:   "Where I Am Now",
    icon:    "💻",
    heading: "Currently building pattern intelligence at Mobbin.",
    paragraphs: [
      "I'm currently working as a Freelance Content Designer (UX) at Mobbin, where I analyze mobile UI patterns to identify best practices in usability, visual hierarchy, and interaction design. It's work that sits at the intersection of research and craft.",
      "I synthesize user flows, contribute to pattern libraries, and collaborate with designers to ensure microcopy aligns with visual design. Every day I'm sharpening my eye for what makes an interface feel effortless — and what makes it fall apart.",
    ],
    callout: "Pattern libraries and microcopy — the unsexy details that make the difference between confusion and clarity.",
  },
  {
    id:      "msk",
    label:   "Where I Discovered UX",
    icon:    "🏥",
    heading: "Healthcare showed me what design can do.",
    paragraphs: [
      "I spent four years at Memorial Sloan Kettering Cancer Center, first supporting administrative workflows, then leading UX research and testing for internal tools used by 21,000+ staff — clinicians, administrators, and researchers navigating life-and-death decisions through digital interfaces.",
      "I redesigned EHR features, reengineered certification workflows, and guided system rollouts. Those efforts improved task completion by 25%. But the more lasting lesson was this: a confusing workflow isn't just frustrating in healthcare. It could mean a missed diagnosis, a delayed treatment, a moment of uncertainty when someone needs absolute clarity.",
    ],
    callout: "A confusing workflow in healthcare isn't just frustrating — it could mean a missed diagnosis.",
  },
  {
    id:      "army",
    label:   "Where the Foundation Was Built",
    icon:    "🎖️",
    heading: "The Army taught me systems thinking under pressure.",
    paragraphs: [
      "While working at MSK, I was also serving in the Army National Guard. In 2024, I deployed to Iraq as a logistics officer, directing supply systems for 5,000+ soldiers in mission-critical environments. We improved coordination by 15% and reduced waste by 60%.",
      "When you're coordinating supplies across combat zones, there's no room for ambiguity. That experience shaped how I approach every design problem: with steadiness, a bias toward clarity, and genuine care for the people who have to use the system under pressure.",
    ],
    callout: "Design for people who are stressed, overwhelmed, and making decisions that truly matter.",
  },
];

const HOBBIES = [
  { icon: "🏃‍♀️", title: "Running",  desc: "Miles give me time to think through design problems and decompress from complexity." },
  { icon: "📚",    title: "Reading",  desc: "Books remind me that every story — like every design — needs structure, empathy, and purpose." },
  { icon: "🐱",    title: "Luna",     desc: "My cat keeps me grounded. She's excellent at reminding me when it's time to step away from the screen." },
];

// ── What I bring (agenda) ──────────────────────────────────────────────────
const AGENDA = [
  {
    icon: "🔬",
    title: "Research-first thinking",
    desc:  "I don't pick up Figma until I understand the user and the system. Interviews, journey maps, and heuristic reviews before any pixels.",
  },
  {
    icon: "🧩",
    title: "Systems perspective",
    desc:  "Eight years across healthcare, military logistics, and digital products taught me to see the whole workflow — not just the screen in front of me.",
  },
  {
    icon: "⚡",
    title: "High-stakes clarity",
    desc:  "My background is in environments where confusion has real consequences. I design for stressed, overwhelmed users who can't afford to be confused.",
  },
  {
    icon: "🤝",
    title: "Cross-disciplinary fluency",
    desc:  "I can talk to clinicians, engineers, and executives. Three bootcamps (UX, data analytics, software engineering) gave me the vocabulary.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function About() {
  const navigate = useNavigate();
  const lunaRef  = useRef<HTMLDivElement>(null);

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

      {/* ── Back button ── */}
      <div className="about-back-row">
        <button type="button" className="about-back-btn"
          onClick={() => navigate("/")} aria-label="Back to main portfolio">
          ← Back to work
        </button>
      </div>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">
            UX designer with 8+ years improving complex systems across healthcare,
            government, and digital products. U.S. Army Veteran. Currently at Mobbin.
          </p>
          <h2 className="about-title">
            I turn complex, high‑pressure systems into experiences that feel
            intuitive, manageable, and human.
          </h2>
        </div>
        <div className="about-hero-accent" aria-hidden="true">
          <div className="about-hero-accent__ring" />
          <div className="about-hero-accent__dot" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS
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
          AGENDA — what I bring
          Common in UX portfolios as a quick
          "why hire me" scan section
      ══════════════════════════════════════ */}
      <section className="about-agenda" aria-label="What I bring">
        <div className="about-agenda__header">
          <p className="about-agenda__eyebrow">What I bring</p>
          <h2 className="about-growth-title" style={{ marginBottom: "0.5rem" }}>
            A perspective you don't find often.
          </h2>
          <p className="about-growth-text" style={{ marginBottom: 0, maxWidth: "68ch" }}>
            Most UX designers come from product or agency backgrounds. I came
            from healthcare IT and a combat deployment. That shapes everything
            about how I approach design problems.
          </p>
        </div>
        <div className="about-agenda__grid">
          {AGENDA.map((a) => (
            <div key={a.title} className="about-agenda__card feature">
              <span className="about-agenda__icon" aria-hidden="true">{a.icon}</span>
              <h3 className="about-agenda__title">{a.title}</h3>
              <p className="about-agenda__desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CAREER TIMELINE
      ══════════════════════════════════════ */}
      <section className="about-timeline-section" aria-label="Career timeline">
        <p className="about-agenda__eyebrow">Career timeline</p>
        <h2 className="about-growth-title" style={{ marginBottom: "2rem" }}>
          The path here.
        </h2>

        <div className="about-career-timeline">
          {TIMELINE.map((item, i) => (
            <div key={item.role} className="about-career-item">

              {/* Left: year + connector */}
              <div className="about-career-item__left" aria-hidden="true">
                <span className="about-career-item__year">{item.year}</span>
                <div className="about-career-item__dot" />
                {i < TIMELINE.length - 1 && (
                  <div className="about-career-item__connector" />
                )}
              </div>

              {/* Right: card */}
              <div className={`about-career-item__card feature about-career-item__card--${item.type}`}>
                <div className="about-career-item__header">
                  <span className="about-career-item__type-icon" aria-hidden="true">
                    {TIMELINE_TYPE_ICONS[item.type]}
                  </span>
                  <div>
                    <p className="about-career-item__role">{item.role}</p>
                    <p className="about-career-item__org">{item.org}</p>
                  </div>
                  {item.type === "current" && (
                    <span className="about-career-item__badge">Now</span>
                  )}
                </div>
                <ul className="about-career-item__bullets">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STORY CHAPTERS
      ══════════════════════════════════════ */}
      <section className="about-journey" aria-label="Career story">
        <div className="about-timeline-rail" aria-hidden="true" />
        <div className="about-chapters">
          {CHAPTERS.map((ch) => (
            <div key={ch.id} className={`about-chapter about-chapter--${ch.id}`}>
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
                <blockquote className="about-pullquote">
                  <p>"{ch.callout}"</p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section className="about-skills" aria-label="Skills and tools">
        <h2 className="about-growth-title">Skills &amp; tools</h2>
        <p className="about-growth-text" style={{ marginBottom: "2rem" }}>
          Built across healthcare IT, military logistics, and three full-time
          bootcamps in UX design, data analytics, and software engineering.
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
          EDUCATION — added from resume
      ══════════════════════════════════════ */}
      <section className="about-growth">
        <h2 className="about-growth-title">Education &amp; certifications</h2>
        <div className="about-edu-grid">
          {[
            { icon: "🎓", title: "Master of Healthcare Administration", sub: "Rutgers University" },
            { icon: "🎓", title: "B.S. Public Health",                  sub: "Rutgers University" },
            { icon: "🎖️", title: "Associate of Science",               sub: "Valley Forge Military College" },
            { icon: "📜", title: "Google UX Design Certificate",        sub: "Google" },
            { icon: "📜", title: "Lean Six Sigma Green Belt",           sub: "Purdue University" },
            { icon: "💻", title: "UX · Data Analytics · Software Eng.", sub: "Noble Desktop Bootcamps" },
          ].map((e) => (
            <div key={e.title} className="about-edu-card feature">
              <span className="about-edu-icon" aria-hidden="true">{e.icon}</span>
              <div>
                <p className="about-edu-title">{e.title}</p>
                <p className="about-edu-sub">{e.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          LIFE
      ══════════════════════════════════════ */}
      <section className="about-life">
        <div className="about-life-card">
          <h2 className="about-life-title">Life outside of work</h2>
          <div className="about-life-intro">
            <p>
              After deployment, I gravitated toward routines that bring calm and
              clarity — the same qualities I try to build into every interface.
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
          <div ref={lunaRef} className="about-luna-deco" aria-hidden="true">🐾</div>
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
              I'm seeking a UX role — junior or mid-level — where I can continue
              learning, contribute to cross-functional teams, and apply research,
              interaction design, and systems thinking across healthcare,
              government, or high-stakes consumer products.
            </p>
            <p>
              Whether it's improving clinical workflows, streamlining government
              services, or building products that reduce cognitive load — I
              specialize in creating experiences that help people feel more
              capable, more informed, and more at ease.
            </p>
            <p className="about-cta-highlight">
              If you're building something that matters, let's talk.
            </p>
          </div>
          <div className="about-cta-actions">
            <button type="button" className="hero-btn"
              onClick={() => navigate("/contact")}>
              Get in touch
            </button>
            <button type="button" className="about-back-btn about-back-btn--outline"
              onClick={() => navigate("/")}>
              ← View my work
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}