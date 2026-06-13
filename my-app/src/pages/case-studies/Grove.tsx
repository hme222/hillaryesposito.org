// src/pages/case-studies/Grove.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import ToolsUsed from "../../components/ToolsUsed";

const SCREENS = [
  { image: "/assets/grove/bouquet.png", label: "Onboarding / bouquet creation", bg: "#3a3a3a" },
  { image: "/assets/grove/care.png", label: "Daily care tasks", bg: "#f5f0e8" },
  { image: "/assets/grove/Growth.png", label: "Growth journal", bg: "#e8edd9" },
  { image: "/assets/grove/plantpersonality.png", label: "AI-generated plant personality", bg: "#f5f0e8" },
];

const SURVEY_FINDINGS = [
  {
    stat: "74%",
    label: "picked smart care reminders as a top-3 dealbreaker feature",
  },
  {
    stat: "61%",
    label: "need AI plant identification via camera",
  },
  {
    stat: "15+",
    label: "respondents cited 'too many notifications' as an instant-delete trigger",
  },
  {
    stat: "2.4/5",
    label: "average lighting confidence among new owners — the #1 skill gap",
  },
  {
    stat: "9/12",
    label: "new owners raised pet toxicity unprompted",
  },
];

const MVP_FEATURES = [
  { feature: "Smart care reminders", pct: 74, tier: "core" },
  { feature: "AI plant identification (camera)", pct: 61, tier: "core" },
  { feature: "AI photo diagnosis", pct: 45, tier: "core" },
  { feature: "Growth photo journal", pct: 26, tier: "post" },
  { feature: "Community forums", pct: 23, tier: "post" },
  { feature: "Greenhouse encyclopedia", pct: 19, tier: "post" },
  { feature: "Bulk logging", pct: 19, tier: "post" },
  { feature: "Bouquet scanner", pct: 10, tier: "post" },
  { feature: "Verified swapping", pct: 6, tier: "post" },
];

const FLOW_STEPS = [
  { num: "01", title: "Onboard + create bouquet", desc: "User registers, picks plant types, and creates their first bouquet, the core unit of the app." },
  { num: "02", title: "Daily care tasks", desc: "Personalized watering/light/rotation tasks appear each morning based on the bouquet's plants and environment." },
  { num: "03", title: "Journal progress", desc: "Photo journal entries track growth over time, attached to specific bouquets for context." },
  { num: "04", title: "AI-generated plant personality", desc: "When care streaks hit milestones, the app generates a unique plant personality profile — a playful, AI-written character sketch that makes each plant feel personal." },
];

const AI_DECISIONS = [
  {
    area: "AI-generated plant personalities",
    whatAIDid: "AI generates unique personality profiles for each plant when users hit care milestones — playful character sketches that make plants feel like individuals, not inventory items.",
    whyNotManual: "Writing hundreds of unique personality variants by hand isn't scalable. AI generation makes every plant feel personal without a content bottleneck.",
    humanJudgment: "I defined the prompt constraints, tone, and quality bar. AI executes within those guardrails; I curate what ships.",
  },
  {
    area: "Building the full stack with AI coding tools",
    whatAIDid: "Used Claude Code and Cursor to accelerate backend API development, component scaffolding, and debugging, reducing boilerplate time significantly.",
    whyNotManual: "Writing auth flows, CRUD endpoints, and database models from scratch would have tripled the timeline for a solo project. AI let me focus on UX decisions instead of plumbing.",
    humanJudgment: "Every AI-generated code block was reviewed, tested, and refactored. I directed architecture decisions (API structure, data models, auth strategy). AI accelerated execution, not thinking.",
  },
  {
    area: "Emergent Agent platform for deployment",
    whatAIDid: "Used Emergent's AI agent platform for environment provisioning, deployment, and infrastructure. No manual DevOps.",
    whyNotManual: "As a designer building a solo full-stack project, managing servers and CI/CD would've pulled focus from the product. Emergent handled infra so I could stay in the design layer.",
    humanJudgment: "Chose the platform intentionally. It let me ship a working product to test with real users, which is the whole point of this project.",
  },
];

const OTHER_PROJECTS = [
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "End-to-end mobile UX for seasonal produce, validated with heatmaps + 22 testers.",
    path: "/case-study/good-harvest",
  },
  {
    icon: "📱",
    title: "Mobbin",
    desc: "Three fintech apps documented for Mobbin's UX pattern library — UX flow documentation and UI pattern curation.",
    path: "/case-study/mobbin",
  },
];

export default function GroveCaseStudy() {
  usePageTitle("Grove: AI Judgment in Plant Care Design");
  const navigate = useNavigate();

  return (
    <main className="case-study gh-layout" aria-label="Grove AI Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Product Design · AI + Design · Full-Stack App · React · FastAPI</p>
          <h1>Grove</h1>
          <p className="gh-hero__intro">
            Plant parents kill their plants because care advice is generic, conflicting,
            and untrustworthy. I surveyed 31 users, defined an MVP from their data, and
            built a working app — using AI tools throughout to show{" "}
            <strong>where AI accelerates and where human judgment leads.</strong>
          </p>
        </div>
        <div className="gh-hero__visual grove-hero-visual" aria-hidden="true">
          <img
            src="/assets/grove/grove1.png"
            alt=""
            className="grove-hero-screen"
          />
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Product Designer + Developer" },
          { label: "Type",     value: "Full-Stack App" },
          { label: "Timeline", value: "3 weeks, solo" },
          { label: "Stack",    value: "React · FastAPI · MongoDB" },
          { label: "AI Tools", value: "Claude Code · Cursor · Emergent" },
          { label: "Status",   value: "Built, testing next" },
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
        <h2 className="cs-section-title">Research-driven design for a plant care app — with AI as the accelerant</h2>
        <p className="cs-overview-text">
          Grove is a plant care app I designed, researched, and built end-to-end. A 31-respondent
          survey defined the MVP, two data-driven personas shaped every design decision, and a
          moderated testing plan is ready to validate the hypothesis. AI tools accelerated the build —
          and every AI decision is documented with explicit reasoning.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Research:</strong> 31-respondent survey (5/22–6/4/2026) · competitive analysis of 6 plant care apps · moderated testing plan (5–6 participants, ready to run).
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Constraints:</strong> Solo project. 3-week build. Prototype shipped; moderated user testing is next.
        </p>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section>
        <p className="gh-section-label">The challenge</p>
        <h2>Plant parents forget. Then they feel guilty.</h2>
        <p>
          New plant owners kill their plants because care information is generic, conflicting, and
          untrustworthy — and existing apps respond by nagging rather than teaching. Every clause
          of that statement came from the survey data:
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">What users said</p>
            <p>"Advice is too generic — doesn't account for my specific home environment." Most common single frustration across all respondents.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What the data showed</p>
            <p>"Too many notifications" was the #1 instant-delete trigger, cited 15+ times. One respondent: "Plant care should feel peaceful, not stressful."</p>
          </div>
        </div>

        <p style={{ marginTop: "1.5rem" }}>
          A secondary finding sharpened the direction: <strong>the self-reported skill gap is light, not water.</strong>{" "}
          Lighting confidence averaged 2.4/5 among new owners. Respondents asked unprompted for an app that would
          "tell me exactly where to place a plant in my home for the best light." No major competitor addresses this.
        </p>

        <div className="highlight">
          <p className="gh-design-q-label">Design Question</p>
          How might we help plant owners build consistent care habits through
          trustworthy, species-specific guidance — with calm notifications and
          lighting education as the differentiators?
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ── */}
      <section>
        <p className="gh-section-label">The product</p>
        <h2>What Grove looks like</h2>
        <p style={{ maxWidth: 640, marginBottom: "0.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Key screens from the working build: onboarding through your first plant personality.
        </p>

        <div className="grove-screens-grid" aria-label="App screen previews">
          {SCREENS.map((screen) => (
            <div key={screen.label} className="grove-screen-item">
              <div className="grove-phone-frame" style={{ background: screen.bg }}>
                <img
                  src={screen.image}
                  alt={`${screen.label} screen`}
                  className="grove-phone-frame__img"
                  loading="lazy"
                />
              </div>
              <p className="grove-screen-label">{screen.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section>
        <p className="gh-section-label">How it works</p>
        <h2>Four steps from setup to first plant personality</h2>

        <ol className="reina-flow-list" aria-label="Core user flow steps">
          {FLOW_STEPS.map((s) => (
            <li key={s.num} className="reina-flow-row feature">
              <div className="reina-flow-num gradient-text">{s.num}</div>
              <div className="reina-flow-content">
                <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* ── IA diagram ── */}
        <div className="grove-ia-diagram feature" style={{ marginTop: "2rem", padding: "1.5rem", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 1.25rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Core IA decision: bouquets, not individual plants</h3>
          <div className="grove-ia-compare">
            <div className="grove-ia-compare__side grove-ia-compare__side--before">
              <p className="grove-ia-compare__label">Competing apps</p>
              <div className="grove-ia-compare__items">
                {["Pothos", "Snake Plant", "Monstera", "Spider Plant", "Fern", "Peace Lily", "Succulent", "Aloe", "Orchid", "Philodendron", "Jade", "ZZ Plant"].map((p) => (
                  <span key={p} className="grove-ia-chip grove-ia-chip--flat">{p}</span>
                ))}
              </div>
              <p className="grove-ia-compare__verdict">Flat list → decision paralysis</p>
            </div>
            <div className="grove-ia-compare__arrow" aria-hidden="true">→</div>
            <div className="grove-ia-compare__side grove-ia-compare__side--after">
              <p className="grove-ia-compare__label">Grove</p>
              <div className="grove-ia-compare__items">
                {["🪴 Kitchen window", "🌿 Living room shelf", "🌸 Bedroom"].map((b) => (
                  <span key={b} className="grove-ia-chip grove-ia-chip--grouped">{b}</span>
                ))}
              </div>
              <p className="grove-ia-compare__verdict">Grouped by context → focused tasks</p>
            </div>
          </div>
          <p style={{ margin: "1rem 0 0", fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.6 }}>
            Every screen answers one question: "Which bouquet am I looking at?" Tasks, journal
            entries, and care reminders all tie to bouquets. New users see 1 task/day;
            complexity scales with streak length, not all at once.
          </p>
        </div>
      </section>

      {/* ── TOOLS & WHY ── */}
      <ToolsUsed
        tools={[
          { icon: "🤖", name: "Claude Code",
            why: "AI pair programmer for backend API development: auth flows, database models, endpoint logic. I directed architecture; AI accelerated the boilerplate." },
          { icon: "✏️", name: "Cursor",
            why: "AI-assisted frontend scaffolding and debugging. Useful for generating component shells; I refined every component's UX after." },
          { icon: "🚀", name: "Emergent Agent",
            why: "AI-powered deployment platform. Handled infra and environment setup so I could focus entirely on design and product decisions." },
          { icon: "🎨", name: "Figma",
            why: "Wireframing the core flows before writing any code. Even with AI speeding up development, I still designed first." },
        ]}
      />

      {/* ── RESEARCH ── */}
      <section>
        <p className="gh-section-label">Research</p>
        <h2>31 respondents told me what actually matters</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          I ran a 31-respondent survey (5/22–6/4/2026) targeting new-to-experienced plant owners.
          A forced trade-off question — "If Grove could only launch with THREE features, which are
          dealbreakers?" — defined the MVP empirically, not by assumption.
        </p>

        <div className="grove-survey-stats" aria-label="Key survey findings">
          {SURVEY_FINDINGS.map((f) => (
            <div key={f.label} className="grove-survey-stat feature">
              <p className="grove-survey-stat__value gradient-text">{f.stat}</p>
              <p className="grove-survey-stat__label">{f.label}</p>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: "2.5rem", color: "var(--olive-2)" }}>Who I'm designing for</h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          Two personas emerged from the data. The case study focuses on Maya — the largest segment and the hypothesis-critical user.
        </p>
        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Maya — new plant owner (39%)</p>
            <ul className="grove-persona-list">
              <li><strong>Owns:</strong> 1–6 plants</li>
              <li><strong>Goal:</strong> "Just help me keep it alive"</li>
              <li><strong>Skill gap:</strong> Lighting confidence 2.4/5</li>
              <li><strong>Top concern:</strong> Pet toxicity (9/12 raised unprompted)</li>
              <li><strong>Will delete if:</strong> Nagged with notifications</li>
            </ul>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">James — experienced collector (42%)</p>
            <ul className="grove-persona-list">
              <li><strong>Owns:</strong> 6–50+ plants</li>
              <li><strong>Goal:</strong> Track collection without it feeling like work</li>
              <li><strong>Care style:</strong> Intuitive / "vibes-based"</li>
              <li><strong>Needs:</strong> Bulk logging, growth photo journal</li>
              <li><strong>Will delete if:</strong> App feels like "an administrative chore"</li>
            </ul>
          </div>
        </div>

        <h3 style={{ marginTop: "2.5rem", color: "var(--olive-2)" }}>MVP definition — what the data says to build</h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          Forced-rank results. The top 3 define the MVP; everything below is post-launch.
        </p>
        <div className="grove-mvp-list">
          {MVP_FEATURES.map((f) => (
            <div key={f.feature} className={`grove-mvp-row feature ${f.tier === "core" ? "grove-mvp-row--core" : ""}`}>
              <span className="grove-mvp-row__feature">{f.feature}</span>
              <div className="grove-mvp-row__bar-wrap">
                <div className="grove-mvp-row__bar" style={{ width: `${f.pct}%` }} />
              </div>
              <span className="grove-mvp-row__pct">{f.pct}%</span>
            </div>
          ))}
        </div>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">Key self-critique</p>
          The prototype was built breadth-first (community, badges, swaps, bouquets) while the
          survey says the download decision is made on three care features plus trust.
          The differentiators don't matter until the dealbreakers are excellent.
        </div>
      </section>

      {/* ── WHAT THE RESEARCH CHANGED ── */}
      <section>
        <p className="gh-section-label">What the research changed</p>
        <h2>I built community features. The survey said they're not why people download.</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Community forums ranked 6th out of 11 features (23%). Verified swapping ranked 9th (6%).
          The social layer I designed isn't wrong — but it's not the reason anyone installs a plant app.
          Smart reminders, plant ID, and diagnosis are. The research reordered my priorities:
          make the care core excellent first, then layer in community as a retention play.
        </p>

        <div className="gh-features-grid">
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Built but deprioritized</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>Community forums, plant swaps, and badges are in the prototype but are explicitly post-MVP. They'll generate secondary testing data, but the hypothesis doesn't depend on them.</p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Elevated by data</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>Pet toxicity warnings (9/12 new owners raised it unprompted), lighting education (lowest confidence score), and cited sources (top trust signal) — none of which were in the original build scope.</p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Paused entirely</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>The Florist Pro tier (AI-generated care sheets for clients). One florist respondent: "Any generative AI in this will remove any sense of trust." n=2 is too thin to build on, but not too thin to pause on.</p>
          </div>
        </div>
      </section>

      {/* ── AI IN MY PROCESS ── */}
      <section>
        <p className="gh-section-label">AI in my process</p>
        <h2>Where AI helped, where I led, and how I decided</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The point isn't "I used AI"; everyone does. The point is showing judgment:
          knowing when to trust it, when to override it, and when to do the work myself.
        </p>

        <div className="emergent-ai-grid">
          {AI_DECISIONS.map((d) => (
            <div key={d.area} className="emergent-ai-card feature">
              <h3 className="emergent-ai-card__area">{d.area}</h3>

              <div className="emergent-ai-card__row">
                <span className="emergent-ai-card__label emergent-ai-card__label--ai">What AI did</span>
                <p>{d.whatAIDid}</p>
              </div>

              <div className="emergent-ai-card__row">
                <span className="emergent-ai-card__label emergent-ai-card__label--why">Why not manual</span>
                <p>{d.whyNotManual}</p>
              </div>

              <div className="emergent-ai-card__row">
                <span className="emergent-ai-card__label emergent-ai-card__label--human">My judgment</span>
                <p>{d.humanJudgment}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: "2.5rem", marginBottom: "1rem", color: "var(--olive-2)" }}>Decisions where I overrode AI</h3>
        <table className="cs-decisions-table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>AI suggested</th>
              <th>I chose instead</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Reward system</td>
              <td>XP points and leaderboard</td>
              <td>AI-generated plant personalities. Survey confirmed: "administrative chore" = #1 delete trigger</td>
            </tr>
            <tr>
              <td>Home screen</td>
              <td>Task dashboard as primary view</td>
              <td>Photo journal first. Growth narrative is more motivating than a to-do list</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="cs-section-heading">What I shipped</p>
        <h2 className="cs-section-title">Research artifacts + working product</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">31</p>
            <p className="cs-outcome-label">Survey respondents grounding every design decision in data</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">2</p>
            <p className="cs-outcome-label">Data-driven personas with validated needs, frustrations, and dealbreakers</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3</p>
            <p className="cs-outcome-label">AI decisions documented with explicit human override reasoning</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">Shipped</p>
            <p className="cs-outcome-label">Full-stack app (React + FastAPI + MongoDB) ready for moderated testing</p>
          </div>
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          The most useful output wasn't the prototype — it was learning that I built breadth-first
          while users decide on three features. The research reordered my priorities before I spent
          more time building the wrong things.
        </p>
      </section>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="cs-section-heading">What I learned</p>
        <h2 className="cs-section-title">Where this project stands and what it taught me</h2>
        <div className="cs-reflections-grid">
          <div className="cs-reflection-card">
            <h3>Research before conviction</h3>
            <p>
              I built community features, badges, and swaps before surveying users. The survey
              showed those rank 6th–9th in priority. The most useful output of this project was
              learning to validate before investing — the research reordered my roadmap entirely.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>The AI skills gap is a judgment gap</h3>
            <p>
              The differentiator isn't knowing which AI tools exist. It's knowing when to trust
              them and when to override. I rejected AI's suggestion for XP gamification and a
              task-dashboard home screen — both would have contradicted the emotional goal the
              survey validated.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>What's next: moderated testing</h3>
            <p>
              5–6 moderated sessions, one persona per participant: can Maya add a plant
              in under 30 seconds? Can she find the lighting tutorial unaided? Does James's
              bulk logging match his mental model? Pre-registered success criteria so the
              hypothesis can be clearly supported or challenged.
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
          {OTHER_PROJECTS.map((proj) => (
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
