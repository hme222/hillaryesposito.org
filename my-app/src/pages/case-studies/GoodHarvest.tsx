// src/pages/case-studies/GoodHarvest.tsx
import React, { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MediaCard from "../../components/MediaCard";
import ToolsUsed from "../../components/ToolsUsed";

export default function GoodHarvest() {
  usePageTitle("Good Harvest: Evidence-Based Mobile UX");
  const navigate = useNavigate();

  const screens = useMemo(() => ({
    appMobile:   "/assets/good-harvest/goodharvest-app-mobile.png",
    appWeb:      "/assets/good-harvest/goodharvest-app-web.png",
    homeWire:    "/assets/good-harvest/goodharvest-home-wireframe.png",
    homeHeat:    "/assets/good-harvest/goodharvest-home-heatmap.png",
    localWire:   "/assets/good-harvest/goodharvest-localproduce-wireframe.png",
    localHeat:   "/assets/good-harvest/goodharvest-localproduce-heatmap.png",
    recipesWire: "/assets/good-harvest/goodharvest-recipes-wireframe.png",
    recipesHeat: "/assets/good-harvest/goodharvest-recipes-heatmap.png",
  }), []);

  const otherProjects = [
    { icon: "🌱", title: "Grove", path: "/case-study/grove",
      desc: "A plant care app I designed and built with AI tools, showing judgment about when AI helps and when human thinking leads." },
    { icon: "📱", title: "Mobbin", path: "/case-study/mobbin",
      desc: "Three fintech apps documented for Mobbin's UX pattern library — UX flow documentation and UI pattern curation." },
  ];

  const researchInsightCards = [
    { num: "Finding 01", heading: "Users are motivated",
      body: " 19 of 22 participants say that eating seasonal foods is desirable",
      tag: "Provided research" },
    { num: "Finding 02", heading: "Unclear what's in season locally",
      body: "13 of 22 participants do not know what's in season in their specific area",
      tag: "Provided research" },
    { num: "Finding 03", heading: "Users find seasonal shopping time consuming",
      body: "12 of 22 participants found meal planning around seasonal food takes too much time.",
      tag: "Provided research" },
    { num: "Finding 04", heading: "Produce variety confusion caused decision paralysis",
      body: "When faced with multiple apple or lettuce varieties, 17 of 22 participants either chose randomly or deferred the decision entirely.",
      tag: "Provided research" },
  ];

  const reflections = [
    { label: "What surprised me",
      body: "The provided research pointed to navigation as the friction point. But when I dug into the data, what emerged was a trust problem: users found the information, they just didn't believe it applied to them. That reframed the whole problem from IA to credibility design." },
    { label: "A decision I'd revisit",
      body: "I'd test organic guidance earlier. It was added late in the design process based on survey data, but wasn't validated in the same depth as the core produce flow." },
    { label: "What this shifted in my practice",
      body: "I now build a decision trail doc alongside wireframes, logging every major design choice, what I considered, and why I ruled it out. It makes design reviews sharper and handoff cleaner." },
  ];

  return (
    <main className="case-study gh-layout" aria-label="Good Harvest UX Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Product Design · Mobile App · Figma · Heatmap Testing</p>
          <h1>Good Harvest</h1>
          <p className="gh-hero__intro">
            A mobile app I designed to help health-conscious shoppers make{" "}
            <strong>confident, seasonal food choices</strong>, without the
            20-minute research spiral before every grocery run.
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="gh-phone-frame">
            <img src={screens.appMobile} alt="Good Harvest mobile app showing seasonal produce, nearby markets and recipes" />
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Product Design" },
          { label: "Context",  value: "UX Bootcamp project" },
          { label: "Tools",    value: "Figma · Maze"   },
          { label: "Scope",    value: "Design → Prototype → Test → Iterate" },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {i < arr.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      <section className="cs-overview">
        <p className="cs-section-heading">Overview</p>
        <h2 className="cs-section-title">People want to eat seasonally — the information makes it harder, not easier</h2>
        <p className="cs-overview-text">
          A UX bootcamp project where I took provided research (22 participant interviews and surveys)
          and designed a mobile app from findings through tested prototype. The research revealed that
          shoppers aren't lacking motivation — they're lacking confidence that information applies to
          <em> their</em> location. I designed the solution and validated it with heatmap testing.
        </p>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section>
        <p className="gh-section-label">The challenge</p>
        <h2>People want to eat seasonally.<br />The information makes it hard.</h2>
        <p>
          Health-conscious shoppers aren't lacking motivation; they're lacking decision
          support. Existing tools tell you what's in season globally, but fail to answer
          the question that matters at point of purchase:{" "}
          <em>what's in season here, right now, and what do I do with it?</em>
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Initial assumption</p>
            <p>Users need better access to seasonal produce information. The problem is discoverability.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What research revealed</p>
            <p>Users could find the information. They didn't trust it applied to their location, and had no clear "next step" once they found it.</p>
          </div>
        </div>

        <div className="highlight">
          <p className="gh-design-q-label">Design Question</p>
          How might we help people quickly plan meals around seasonal produce in their area, with enough confidence to act?
        </div>

        <div className="gh-collab-note">
          <p className="gh-collab-label">How I worked</p>
          <p>
            UX bootcamp project. Research data (22 participant interviews and surveys) was provided.
            I synthesized findings, designed the product, built prototypes, and ran heatmap testing.
            Two peer designers reviewed my synthesis and challenged assumptions.
          </p>
        </div>
      </section>

      {/* ── TOOLS & WHY ── */}
      <ToolsUsed
        tools={[
          { icon: "🎨", name: "Figma",
            why: "Primary design + prototyping surface. Auto layout and components let me iterate wireframes into testable flows without rebuilding screens each round." },
          { icon: "🧪", name: "Maze",
            why: "Unmoderated prototype testing with heatmaps. Chose it over in-person sessions because I needed attention data across 22 participants, not just verbal feedback." },
          { icon: "🗂️", name: "FigJam",
            why: "Affinity mapping provided research data and running the competitive SWOT. Kept synthesis visible so decisions trace back to raw evidence." },
        ]}
      />

      {/* ── PROCESS ── */}
      <section>
        <p className="gh-section-label">Process</p>
        <h2>From research to tested prototype in 6 weeks</h2>

        <ol className="reina-flow-list" aria-label="Design process steps">
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">01</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Research synthesis</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Provided research included 3 in-depth interviews and 22 survey responses with health-conscious home cooks aged 25-45.
                I synthesized the data to identify patterns and define design opportunities.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">02</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Evidence-based design decisions</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Every design choice traced back to research. Produce-first IA (heatmap showed 60% of first taps went to produce),
                embedded recipe CTAs (removed navigation friction), and explicit location indicators (addressing trust, not discoverability).
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">03</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Prototype testing with heatmaps</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                22-participant unmoderated testing via Maze across 3 rounds. Heatmaps revealed what users actually tapped vs. what I expected — details in the Testing section below.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">04</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Iterate based on findings</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Three major design shifts between v1 and v2, each traceable to a specific test finding.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── RESEARCH FINDINGS ── */}
      <section>
        <p className="gh-section-label">Research findings</p>
        <h2>What the research revealed</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Four key findings shaped every design decision that followed.
        </p>

        <div className="gh-features-grid">
          {researchInsightCards.map((card) => (
            <div key={card.num} className="feature">
              <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>{card.heading}</h3>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>{card.body}</p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.82rem", color: "var(--olive-2)", fontWeight: 600 }}>{card.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PRODUCT ── */}
      <section>
        <p className="gh-section-label">The product</p>
        <h2>What Good Harvest looks like</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Key screens from wireframe through final prototype, validated with heatmap testing.
        </p>

        <h3 style={{ color: "var(--olive-2)", marginBottom: "0.75rem" }}>Home screen: produce-first hierarchy</h3>
        <div className="cs-gallery cols-3">
          <MediaCard src={screens.homeWire}  alt="Good Harvest home wireframe showing layout hierarchy"          caption="Wireframe: hierarchy + tap targets." />
          <MediaCard src={screens.homeHeat}  alt="Heatmap showing attention on seasonal produce module"           caption="Heatmap: 60% of first taps went to produce." />
          <MediaCard src={screens.appMobile} alt="Good Harvest mobile app showing seasonal produce and recipes"   caption="Final: produce-first, secondary nav below fold." />
        </div>

        <h3 style={{ color: "var(--olive-2)", marginTop: "2rem", marginBottom: "0.75rem" }}>Local produce: location trust solved</h3>
        <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          13/22 participants didn't trust that produce info applied to their area. Made the location indicator tappable and prominent with source attribution.
        </p>
        <div className="cs-gallery cols-2">
          <MediaCard src={screens.localWire} alt="Local produce wireframe showing initial location indicator"     caption="v1: location indicator present but passive." />
          <MediaCard src={screens.localHeat} alt="Local produce heatmap showing attention patterns"               caption="Heatmap: users noticed location in v2 (13/22 mentioned it unprompted)." />
        </div>

        <h3 style={{ color: "var(--olive-2)", marginTop: "2rem", marginBottom: "0.75rem" }}>Recipes: embedded discovery</h3>
        <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          Recipe CTA engagement jumped from 40% to 70% after embedding recipes inline with produce detail instead of a separate tab.
        </p>
        <div className="cs-gallery cols-2">
          <MediaCard src={screens.recipesWire} alt="Recipes wireframe showing embedded recipe discovery"         caption="v2: recipes embedded in produce context." />
          <MediaCard src={screens.recipesHeat} alt="Recipes heatmap showing improved engagement"                  caption="Heatmap: 70% recipe CTA engagement (up from 40%)." />
        </div>
      </section>

      {/* ── TESTING ── */}
      <section>
        <p className="gh-section-label">Testing</p>
        <h2>What heatmaps and task testing showed</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          22 participants across 3 rounds. Each round changed the design.
        </p>

        <div className="gh-validation-strip feature" style={{ marginBottom: "1.5rem" }}>
          {[
            { label: "Participants", value: "22" },
            { label: "Rounds",       value: "3 test cycles" },
            { label: "Method",       value: "Heatmaps + task completion" },
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

        <div className="gh-features-grid">
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Secondary nav relocated</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              Heatmaps showed 70% of first taps went to produce; top nav was ignored.
              Moved secondary actions below the fold and embedded recipe CTAs directly in produce detail.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Location trust solved</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              13 of 22 participants mentioned the location indicator unprompted in v2 (vs. 4 in v1).
              Made it tappable, prominent, and added source attribution.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Variety comparison surfaced</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              Only 3 of 22 users found the hidden compare feature in v1. Surfaced variety differences
              inline on produce detail with a "What's the difference?" prompt. Zero-navigation.
            </p>
          </div>
        </div>
      </section>

      {/* ── KEY DECISIONS ── */}
      <section className="cs-decisions">
        <p className="cs-section-heading">Key decisions</p>
        <h2 className="cs-section-title">Where I landed and why</h2>
        <table className="cs-decisions-table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>Chosen approach</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seasonal indicators</td>
              <td>Explicit text labels + visible legend anchored to confirmed location</td>
              <td>18 of 22 users couldn't interpret color-only indicators. Labels + source attribution addressed the trust gap</td>
            </tr>
            <tr>
              <td>Entry point</td>
              <td>Produce-first home screen; markets as secondary action</td>
              <td>Heatmap showed 60% of first taps went to produce. Users orient around ingredients, not locations</td>
            </tr>
            <tr>
              <td>Recipe discovery</td>
              <td>Recipe-forward flow embedded in produce detail, no navigation required</td>
              <td>Task completion improved when recipes loaded from produce context. Separate tab broke the mental model</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="cs-section-heading">Outcomes</p>
        <h2 className="cs-section-title">What prototype testing suggested</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3/4</p>
            <p className="cs-outcome-label">Users completed core flow unassisted (vs. 1/4 in round one)</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">4 taps</p>
            <p className="cs-outcome-label">Average path to action, down from 7 in v1</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">70%</p>
            <p className="cs-outcome-label">Recipe CTA engagement in v2 vs. 40% in v1</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">22</p>
            <p className="cs-outcome-label">Participants across 3 rounds of testing</p>
          </div>
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          <strong>Honest framing:</strong> These metrics reflect prototype usability testing
          with 22 participants, not post-launch data. The directional signals are encouraging,
          but I'm treating them as hypotheses for a next round, not proven outcomes.
        </p>
      </section>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="cs-section-heading">What I learned</p>
        <h2 className="cs-section-title">The specific ways this project changed how I design</h2>
        <div className="cs-reflections-grid">
          {reflections.map((r) => (
            <div key={r.label} className="cs-reflection-card">
              <h3>{r.label}</h3>
              <p>{r.body}</p>
            </div>
          ))}
          <div className="cs-reflection-card">
            <h3>What I'd explore next</h3>
            <p>
              If the product continued, I'd explore a trust layer on the produce detail screen:
              surfacing the data source behind the seasonality claim to address the location-accuracy
              concern that surfaced in research. I'd also run a longitudinal study on whether
              export integration actually changed shopping behavior over 4+ weeks.
            </p>
          </div>
        </div>
      </section>

      {/* ── OTHER PROJECTS ── */}
      <aside className="gh-other-projects" aria-label="Other projects">
        <div className="gh-other-projects__header">
          <p className="gh-other-projects__eyebrow">More Work</p>
          <h2>Other Projects</h2>
        </div>
        <div className="gh-other-projects__grid">
          {otherProjects.map((proj) => (
            <Link
              key={proj.path}
              to={proj.path}
              className="project-card gh-proj-card"
              aria-label={`View ${proj.title} case study`}
            >
              <div className="project-media">
                <div className="project-icon">{proj.icon}</div>
              </div>
              <div className="project-body">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <span className="gh-proj-cta">View case study →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="gh-back-row">
          <button type="button" className="hero-btn" onClick={() => navigate("/")}>
            ← Back to All Work
          </button>
        </div>
      </aside>

    </main>
  );
}