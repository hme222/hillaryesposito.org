// src/pages/case-studies/ReinaSection.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolsUsed from "../../components/ToolsUsed";

type Callout = {
  step: number;
  title: string;
  description: string;
};

const CALLOUTS: Callout[] = [
  { step: 1, title: "Homepage",         description: "Curated venue discovery with a quick onboarding preview" },
  { step: 2, title: "Preferences form", description: "Capture location, budget range, guest count, and must-haves" },
  { step: 3, title: "Swipe gallery",    description: "Fast visual comparison to build a shortlist confidently" },
  { step: 4, title: "Consultant chat",  description: "Expert guidance to validate fit and answer questions in real time" },
  { step: 5, title: "Visit schedule",   description: "Turn the shortlist into a personalized itinerary for in-person tours" },
];

// ─── Other projects shown at the bottom of THIS page ───
const OTHER_PROJECTS = [
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "A mobile app helping users plan meals around seasonal, local produce — reducing decision friction and making sustainable eating more accessible.",
    path: "/case-study/good-harvest",
  },
  {
    icon: "🛍️",
    title: "E-Commerce Storefront",
    desc: "An accessibility-first storefront demo with keyboard and screen reader support across discovery filters, quick view, and a cart drawer.",
    path: "/case-study/ecommerce",
  },
];

export default function ReinaSection() {
  const navigate = useNavigate();
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!zoomSrc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomSrc(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomSrc]);

  return (
    <main className="case-study gh-layout" aria-label="Reina UX Case Study">

      {/* ══════════════════════════════════════
          HERO — headline left · crown badge right
      ══════════════════════════════════════ */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX Design · Mobile App Concept · Figma</p>
          <h1>Reina</h1>
          <p className="gh-hero__intro">
            Helping couples discover and schedule international wedding venues
            with confidence — a self-directed concept app designed to reduce
            stress and add clarity to destination wedding planning.
          </p>
        </div>

        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge">
            <span className="reina-hero-crown">👑</span>
            <span className="reina-hero-badge-label">Featured Concept</span>
          </div>
        </div>
      </header>

      {/* Meta strip */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "UX Designer & Researcher" },
          { label: "Type",     value: "Mobile App Concept" },
          { label: "Timeline", value: "Self-Directed Project" },
          { label: "Domain",   value: "Destination Wedding Planning" },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {i < arr.length - 1 && (
              <div className="gh-meta-strip__divider" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ══════════════════════════════════════
          TOOLS & WHY
      ══════════════════════════════════════ */}
      <ToolsUsed
        tools={[
          { icon: "🎨", name: "Figma",
            why: "Wireframing + interactive flow prototyping. Components let the 5 core screens share a consistent hierarchy so the flow felt like one experience, not five." },
          { icon: "🗂️", name: "FigJam",
            why: "Sketching the user journey and emotional arc before any screen design — destination planning is high-stress, so mapping emotional beats came first." },
          { icon: "📚", name: "Secondary research",
            why: "Industry reports on destination weddings + competitor teardowns to ground a self-directed concept in real pain points, not assumptions." },
        ]}
      />

      {/* ══════════════════════════════════════
          OVERVIEW — Problem / Approach / Outcome
      ══════════════════════════════════════ */}
      <section>
        <h2>Overview</h2>
        <div className="gh-process-grid reina-summary-grid">
          {[
            {
              num: "01", label: "Problem",
              detail: "Destination planning is emotionally high-stakes and logistically complex, especially when venues are abroad.",
            },
            {
              num: "02", label: "Approach",
              detail: "A guided flow combining preference capture, visual shortlisting, and consultant support to reduce overwhelm.",
            },
            {
              num: "03", label: "Outcome",
              detail: "A concept experience that turns browsing into a clear shortlist and a scheduled, personalized visit plan.",
            },
          ].map((step) => (
            <div key={step.num} className="gh-process-card feature">
              <p className="gh-process-num gradient-text">{step.num}</p>
              <h3 style={{ marginTop: "0.5rem", marginBottom: "0.4rem", color: "var(--fg)" }}>{step.label}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FLOW WIREFRAMES — browser frame image
      ══════════════════════════════════════ */}
      <section>
        <h2>Core User Flow</h2>
        <p style={{ marginBottom: "1.5rem" }}>
          Five screens that take a couple from overwhelmed browsing to a
          confident, scheduled set of venue visits.
        </p>

        <div className="gh-browser-frame reina-flow-frame">
          <div className="gh-browser-chrome">
            <span /><span /><span />
            <div className="gh-browser-url">reina.app · flow wireframes</div>
          </div>
          <div className="reina-flow-body">
            <button
              type="button"
              className="reina-flow-img-btn"
              onClick={() => setZoomSrc("/assets/reina-flow.png")}
              aria-label="Zoom in on Reina core user flow wireframes"
            >
              <img
                src="/assets/reina-flow.png"
                alt="Reina core user flow wireframes: discovery, preferences, swipe gallery, consultation chat, visitation schedule."
                loading="lazy"
              />
              <span className="reina-zoom-hint" aria-hidden="true">🔍 Click to zoom</span>
            </button>
          </div>
        </div>

        <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.7, marginTop: "1rem" }}>
          Reina guides users through selecting preferences, browsing venues,
          consulting with an expert, and receiving a personalized visitation
          schedule — tailored for destination weddings abroad.
        </p>
      </section>

      {/* ══════════════════════════════════════
          NUMBERED FLOW STEPS
      ══════════════════════════════════════ */}
      <section>
        <h2>Flow Breakdown</h2>

        <div className="gh-validation-strip feature" style={{ marginBottom: "2rem" }}>
          {[
            { label: "Screens", value: "5 core steps" },
            { label: "Goal",    value: "Overwhelm → confidence" },
            { label: "Output",  value: "Personalized visit schedule" },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="gh-vstrip-item">
                <p className="gh-vstrip-label">{item.label}</p>
                <p className="gh-vstrip-value">{item.value}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="gh-vstrip-divider" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>

        <ol className="reina-flow-list" aria-label="Core user flow steps">
          {CALLOUTS.map((c) => (
            <li key={c.step} className="reina-flow-row feature">
              <div className="reina-flow-num gradient-text">{String(c.step).padStart(2, "0")}</div>
              <div className="reina-flow-content">
                <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>
                  {c.title}
                </h3>
                <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                  {c.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ══════════════════════════════════════
          DESIGN REFLECTIONS — 2-col grid
      ══════════════════════════════════════ */}
      <section>
        <h2>Design Reflections</h2>
        <div className="gh-features-grid">
          {[
            {
              title: "What I practiced",
              items: [
                "Designing end-to-end UX for a multi-touch, service-oriented app",
                "Creating structured choice without overwhelming users",
                "Balancing inspiration with utility in a high-emotion domain",
              ],
            },
            {
              title: "Next steps",
              items: [
                "Add booking + calendar integration",
                "Test form length vs. completion rate",
                "Explore language localization for global use",
              ],
            },
            {
              title: "Portfolio impact",
              items: [
                "Demonstrates end-to-end flow design and information hierarchy",
                "Expands my work into consumer, emotion-driven decision making",
                "Shows service + product thinking with expert support integrated into UX",
                "Highlights clarity and structure in complex, high-stakes choices",
              ],
            },
          ].map((block) => (
            <div key={block.title} className="feature">
              <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>
                {block.title}
              </h3>
              <ul className="case-study" style={{ marginLeft: "1.25rem", marginBottom: 0 }}>
                {block.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}

          {/* Constraints — spans full width */}
          <div className="feature" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>
              Constraints &amp; assumptions
            </h3>
            <ul className="case-study" style={{ marginLeft: "1.25rem", marginBottom: 0 }}>
              <li>Concept project — no live inventory or vendor integrations</li>
              <li>Focused on discovery + scheduling rather than booking/payment</li>
              <li>Designed for early-stage planners who need clarity fast</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          OTHER PROJECTS — outside all content
      ══════════════════════════════════════ */}
      <aside className="gh-other-projects" aria-label="Other projects">
        <div className="gh-other-projects__header">
          <p className="gh-other-projects__eyebrow">More Work</p>
          <h2 style={{ margin: "0.25rem 0 0" }}>Other Projects</h2>
        </div>

        <div className="gh-other-projects__grid">
          {OTHER_PROJECTS.map((proj) => (
            <article
              key={proj.path}
              className="project-card gh-proj-card"
              onClick={() => navigate(proj.path)}
              role="button"
              tabIndex={0}
              aria-label={`View ${proj.title} case study`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(proj.path)}
            >
              <div className="project-media">
                <div className="project-icon">{proj.icon}</div>
              </div>
              <div className="project-body">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <span className="gh-proj-cta">View case study →</span>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button
            type="button"
            className="hero-btn"
            onClick={() => navigate("/")}
            style={{ fontSize: "0.85rem", padding: "0.9rem 2rem", letterSpacing: "1.5px" }}
          >
            ← Back to All Work
          </button>
        </div>
      </aside>

      {zoomSrc && (
        <div
          className="reina-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed wireframe view"
          onClick={() => setZoomSrc(null)}
        >
          <button
            type="button"
            className="reina-zoom-close"
            onClick={() => setZoomSrc(null)}
            aria-label="Close zoomed view"
          >
            ✕
          </button>
          <img src={zoomSrc} alt="Zoomed Reina wireframes" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

    </main>
  );
}