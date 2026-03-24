// src/pages/case-studies/GoodHarvest.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaCard from "../../components/MediaCard";
import RecruiterSkimCard from "../../components/RecruiterSkimCard";
import ResearchInsightsSection from "../../sections/good-harvest/research-insights-section";
 
export default function GoodHarvest() {
  const asset = (p: string) => `${process.env.PUBLIC_URL}${p}`;
  const navigate = useNavigate();
 
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navOffset = 110;
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
 
  const [recruiterMode, setRecruiterMode] = useState<boolean>(() => {
    return sessionStorage.getItem("recruiterMode") === "1";
  });
  useEffect(() => {
    sessionStorage.setItem("recruiterMode", recruiterMode ? "1" : "0");
  }, [recruiterMode]);
 
  const [showCA, setShowCA] = useState<boolean>(() => {
    return sessionStorage.getItem("showCA") === "1";
  });
  useEffect(() => {
    sessionStorage.setItem("showCA", showCA ? "1" : "0");
  }, [showCA]);
 
  useEffect(() => {
    if (!recruiterMode) return;
    const id = window.setTimeout(() => scrollToId("recruiter-summary"), 0);
    return () => window.clearTimeout(id);
  }, [recruiterMode]);
 
  useEffect(() => {
    if (!showCA) return;
    const id = window.setTimeout(() => scrollToId("competitive-analysis"), 0);
    return () => window.clearTimeout(id);
  }, [showCA]);
 
  const screens = useMemo(
    () => ({
      // ── App UI screenshots ──
      // Image 2 (mobile): save as goodharvest-app-mobile.png
      appMobile:   asset("/assets/good-harvest/goodharvest-app-mobile.png"),
      // Image 2 (webpage): save as goodharvest-app-web.png
      appWeb:      asset("/assets/good-harvest/goodharvest-app-web.png"),
      // ── Wireframes + heatmaps ──
      homeWire:    asset("/assets/good-harvest/goodharvest-home-wireframe.png"),
      homeHeat:    asset("/assets/good-harvest/goodharvest-home-heatmap.png"),
      localWire:   asset("/assets/good-harvest/goodharvest-localproduce-wireframe.png"),
      localHeat:   asset("/assets/good-harvest/goodharvest-localproduce-heatmap.png"),
      recipesWire: asset("/assets/good-harvest/goodharvest-recipes-wireframe.png"),
      recipesHeat: asset("/assets/good-harvest/goodharvest-recipes-heatmap.png"),
    }),
    []
  );
 
  const processSteps = [
    { num: "01", label: "Research",   detail: "Interviews, surveys, competitive analysis & journey map" },
    { num: "02", label: "Design",     detail: "Simplify decisions with visual hierarchy" },
    { num: "03", label: "Prototype",  detail: "Test speed & comprehension" },
    { num: "04", label: "Iterate",    detail: "Refine emphasis & reduce hesitation" },
  ];
 
  const features = [
    { icon: "📍", title: "Local Seasonal Produce",
      desc: "Shows what's in season based on the user's location and current month, eliminating guesswork and research time." },
    { icon: "🔍", title: "Variety Comparison",
      desc: "Plain-language differences between similar items (e.g. apple types, lettuce varieties) for quick, confident choices." },
    { icon: "🍳", title: "Simple Recipes",
      desc: "Quick, seasonal meal ideas that integrate seamlessly with available produce — reducing planning time." },
    { icon: "🌱", title: "Organic Guidance",
      desc: "EWG data surfaces which items are highest-priority buys, so users spend wisely on what actually matters." },
    { icon: "📋", title: "Shopping Lists & Exports",
      desc: "Export lists directly to Notion, Google Keep, or Todoist for seamless workflow integration." },
  ];
 
  const impactItems = [
    { stat: "↓ Friction",  detail: "\"Scan → choose → act\" flow validated in testing" },
    { stat: "↓ Overwhelm", detail: "Progressive disclosure keeps choices manageable" },
    { stat: "↑ Adoption",  detail: "Workflow exports fit into habits users already have" },
  ];
 
  const otherProjects = [
    {
      icon: "🛍️",
      title: "E-Commerce Storefront",
      desc: "Accessibility-first storefront with keyboard & screen-reader support across filters, quick view, and a cart drawer.",
      path: "/case-study/ecommerce",
    },
    {
      icon: "👑",
      title: "Reina App",
      desc: "A self-directed concept app designed to reduce stress and add clarity to destination wedding planning.",
      path: "/case-study/reina",
    },
  ];
 
  return (
    <main className="case-study gh-layout" aria-label="Good Harvest UX Case Study">
 
      {/* ══════════════════════════════════════
          HERO — headline left · phone right
      ══════════════════════════════════════ */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX Research &amp; Design · Mobile App · Figma</p>
          <h1>Good Harvest</h1>
          <p className="gh-hero__intro">
            A mobile app that helps users plan meals and build shopping lists
            using produce that is in season in their local area — making
            sustainable eating faster, easier, and more accessible.
          </p>
          <div className="recruiter-cta">
  <span className="recruiter-cta__label">Recruiter?</span>
  <button
    type="button"
    className="recruiter-toggle-link"
    onClick={() => setRecruiterMode((v) => !v)}
    aria-expanded={recruiterMode}
    aria-controls="recruiter-summary"
  >
    {recruiterMode
      ? "Hide quick project breakdown ←"
      : "Click for a quick project breakdown →"}
  </button>
</div>
</div>
 
        {/* Phone mockup */}
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="gh-phone-frame">
            <img
              src={screens.appMobile}
              alt="Good Harvest mobile app showing seasonal produce, nearby markets and recipes"
            />
          </div>
        </div>
      </header>
 
      {/* Meta strip */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "End-to-end UX" },
          { label: "Platform", value: "Mobile App" },
          { label: "Tools",    value: "Figma · Maze" },
          { label: "Scope",    value: "Research → Design → Prototype → Iterate" },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {i < arr.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
        <div className="gh-meta-strip__divider" aria-hidden="true" />
        <div className="gh-meta-strip__item">
          <button type="button" className="recruiter-toggle-link"
            onClick={() => setShowCA((v) => !v)}
            aria-expanded={showCA} aria-controls="competitive-analysis"
            style={{ fontSize: "0.85rem" }}>
            {showCA ? "Hide competitive analysis ←" : "View competitive analysis →"}
          </button>
        </div>
      </div>
 
      {recruiterMode && (
  <div style={{ marginBottom: "2.5rem" }}>
    <RecruiterSkimCard
      title="Good Harvest"
      what="Mobile app for seasonal produce, recipes, and shopping lists — localized by region."
      outcome="A faster 'scan → choose → act' flow validated with prototype testing + heatmaps."
      myRole="End-to-end UX: research, IA, wireframes, prototypes, iteration."
      skills={["Interviews","Surveys","Journey mapping","Competitive analysis","SWOT","Prototyping","Accessibility"]}
      timeframe="Project snapshot"
      onBackToStory={() => scrollToId("full-case-study")}
    />
  </div>
)}
 
      <div id="full-case-study" />
 
      {/* ══════════════════════════════════════
          PROBLEM
      ══════════════════════════════════════ */}
      <section>
        <h2>Problem</h2>
        <p>
          People want to eat more sustainably but struggle to find accurate,
          location-based information about seasonal produce. Comparing
          varieties, choosing organic options, and planning meals takes too
          much time and effort.
        </p>
        <div className="highlight" style={{ marginTop: "1.5rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", textTransform: "uppercase",
            letterSpacing: "0.12em", fontWeight: 700, color: "var(--muted)" }}>
            Design Question
          </p>
          How might we help people quickly plan meals around seasonal produce in their area?
        </div>
      </section>
 
      {/* ══════════════════════════════════════
          PROCESS — 4-step grid
      ══════════════════════════════════════ */}
      <section>
        <h2>Process</h2>
        <div className="gh-process-grid">
          {processSteps.map((step) => (
            <div key={step.num} className="gh-process-card feature">
              <p className="gh-process-num gradient-text">{step.num}</p>
              <h3 style={{ marginTop: "0.5rem", marginBottom: "0.4rem", color: "var(--fg)" }}>{step.label}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{step.detail}</p>
            </div>
          ))}
        </div>
      </section>
 
      {showCA && <div id="competitive-analysis" />}
      <ResearchInsightsSection />
 
      {/* ══════════════════════════════════════
          DESIGN SOLUTIONS
          Features list (left) · web screenshot (right)
      ══════════════════════════════════════ */}
      <section>
        <h2>Design Solutions</h2>
        <p style={{ marginBottom: "2.5rem" }}>
          Each solution maps directly to a pain point surfaced during research.
        </p>
 
        <div className="gh-solutions-split">
          {/* Left: feature list */}
          <div className="gh-features-list">
            {features.map((f) => (
              <div key={f.title} className="gh-feature-row">
                <span className="gh-feature-icon" aria-hidden="true">{f.icon}</span>
                <div>
                  <h3 style={{ color: "var(--olive-2)", margin: "0 0 0.3rem", fontSize: "1.05rem" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
 
          {/* Right: webpage screenshot in browser frame */}
          <div className="gh-solutions__visual">
            <div className="gh-browser-frame">
              {/* Browser chrome dots */}
              <div className="gh-browser-chrome">
                <span /><span /><span />
                <div className="gh-browser-url">goodharvest.app</div>
              </div>
              <div className="gh-browser-body">
                <img
                  src={screens.appWeb}
                  alt="Good Harvest web app — produce discovery, location finder and seasonal recipe features"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════
          VALIDATION — summary strip + galleries
      ══════════════════════════════════════ */}
      <section>
        <h2>Validation</h2>
 
        <div className="gh-validation-strip feature" style={{ marginBottom: "2rem" }}>
          {[
            { label: "Method",  value: "Prototype testing" },
            { label: "Insight", value: "Speed + comprehension confirmed" },
            { label: "Signal",  value: "Heatmaps verified visual hierarchy" },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="gh-vstrip-item">
                <p className="gh-vstrip-label">{item.label}</p>
                <p className="gh-vstrip-value">{item.value}</p>
              </div>
              {i < arr.length - 1 && <div className="gh-vstrip-divider" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>
 
        <div className="gh-gallery-label"><span>Home Screen</span></div>
        <div className="cs-gallery cols-3">
          <MediaCard src={screens.homeWire}  alt="Good Harvest home wireframe showing layout hierarchy" caption="Wireframe: hierarchy + tap targets." />
          <MediaCard src={screens.homeHeat}  alt="Heatmap showing attention on seasonal produce module" caption="Heatmap: produce first — secondary actions clarified." />
          <MediaCard src={screens.localWire} alt="Local produce wireframe showing location-based filtering" caption="Local view: faster decisions." />
        </div>
 
        <div className="gh-gallery-label" style={{ marginTop: "1.5rem" }}><span>Local Produce &amp; Recipes</span></div>
        <div className="cs-gallery cols-3">
          <MediaCard src={screens.localHeat}   alt="Heatmap of local produce view showing focus on primary controls" caption="Heatmap: primary controls found first." />
          <MediaCard src={screens.recipesWire} alt="Recipes wireframe showing seasonal recipe cards" caption="Recipes: quick picks." />
          <MediaCard src={screens.recipesHeat} alt="Heatmap of recipes showing attention on cards and CTA" caption="Heatmap: CTA placement validated." />
        </div>
      </section>
 
      {/* ══════════════════════════════════════
          IMPACT — 3-col stat row
      ══════════════════════════════════════ */}
      <section>
        <h2>Impact</h2>
        <p style={{ marginBottom: "2rem" }}>
          Design solutions directly addressed pain points, creating a streamlined
          experience that made seasonal eating accessible for daily life.
        </p>
        <div className="gh-impact-grid">
          {impactItems.map((item) => (
            <div key={item.stat} className="feature gh-impact-card">
              <p className="gh-impact-stat gradient-text">{item.stat}</p>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ══════════════════════════════════════
          WHAT I LEARNED
      ══════════════════════════════════════ */}
      <section>
        <h2>What I Learned</h2>
        <p>
          This project strengthened my ability to translate research insights into
          usable product features and design for real-world constraints. I learned
          the importance of integration with existing user workflows and the value
          of simplifying complex information into progressive, scannable layers.
        </p>
      </section>
 
      {/* ══════════════════════════════════════
          OTHER PROJECTS — bottom navigation
      ══════════════════════════════════════ */}
      <aside className="gh-other-projects" aria-label="Other projects">
        <div className="gh-other-projects__header">
          <p className="gh-other-projects__eyebrow">More Work</p>
          <h2 style={{ margin: "0.25rem 0 0" }}>Other Projects</h2>
        </div>
 
        <div className="gh-other-projects__grid">
          {otherProjects.map((proj) => (
            <article
              key={proj.path}
              className="project-card gh-proj-card"
              onClick={() => navigate(proj.path)}
              role="button"
              tabIndex={0}
              aria-label={`View ${proj.title} case study`}
              onKeyDown={(e) => e.key === "Enter" && navigate(proj.path)}
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
 
    </main>
  );
}
 