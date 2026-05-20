// src/pages/case-studies/Grove.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ToolsUsed from "../../components/ToolsUsed";

const FLOW_STEPS = [
  { num: "01", title: "Onboard + create bouquet", desc: "User registers, picks plant types, and creates their first bouquet — the core unit of the app." },
  { num: "02", title: "Daily care tasks", desc: "Personalized watering/light/rotation tasks appear each morning based on the bouquet's plants and environment." },
  { num: "03", title: "Journal progress", desc: "Photo journal entries track growth over time, attached to specific bouquets for context." },
  { num: "04", title: "AI-generated bloom", desc: "When care streaks hit milestones, the app generates a unique flower illustration as a reward — blending gamification with delight." },
];

const AI_DECISIONS = [
  {
    area: "AI-generated reward illustrations",
    whatAIDid: "Generative AI creates unique flower visuals when users hit care milestones — each one is different, reinforcing the feeling that their plant journey is personal.",
    whyNotManual: "Hand-illustrating hundreds of reward variants isn't scalable. AI generation makes every milestone feel unique without a design bottleneck.",
    humanJudgment: "I defined the prompt constraints, art style, and quality bar. AI executes within those guardrails — I curate what ships.",
  },
  {
    area: "Building the full stack with AI coding tools",
    whatAIDid: "Used Claude Code and Cursor to accelerate backend API development, component scaffolding, and debugging — reducing boilerplate time significantly.",
    whyNotManual: "Writing auth flows, CRUD endpoints, and database models from scratch would have tripled the timeline for a solo project. AI let me focus on UX decisions instead of plumbing.",
    humanJudgment: "Every AI-generated code block was reviewed, tested, and refactored. I directed architecture decisions — API structure, data models, auth strategy — AI accelerated execution, not thinking.",
  },
  {
    area: "Emergent Agent platform for deployment",
    whatAIDid: "Used Emergent's AI agent platform for environment provisioning, deployment, and infrastructure — no manual DevOps.",
    whyNotManual: "As a designer building a solo full-stack project, managing servers and CI/CD would've pulled focus from the product. Emergent handled infra so I could stay in the design layer.",
    humanJudgment: "Chose the platform intentionally — it let me ship a working product to test with real users, which is the whole point of this project.",
  },
];

const STATUS_ITEMS = [
  { label: "Current status", value: "Built — needs user testing" },
  { label: "What's next", value: "5-user usability test, then iterate" },
  { label: "Open question", value: "Do care reminders drive retention, or do users ignore them after week 1?" },
];

const OTHER_PROJECTS = [
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "End-to-end mobile UX for seasonal produce — validated with heatmaps + 22 testers.",
    path: "/case-study/good-harvest",
  },
  {
    icon: "📱",
    title: "Mobbin",
    desc: "Three fintech apps catalogued for Mobbin's UX pattern library — documenting trust, risk, and progress patterns.",
    path: "/case-study/mobbin",
  },
];

export default function GroveCaseStudy() {
  const navigate = useNavigate();

  return (
    <main className="case-study gh-layout" aria-label="Grove AI Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Product Design · AI + Design · Full-Stack App · React · FastAPI</p>
          <h1>Grove</h1>
          <p className="gh-hero__intro">
            Plant parents forget to care for their plants, then feel guilty about it.
            I designed and built Grove to turn inconsistent care into a habit — and
            used AI tools throughout to show{" "}
            <strong>where AI accelerates and where human judgment leads.</strong>
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge">
            <span className="reina-hero-crown">🌱</span>
            <span className="reina-hero-badge-label">AI + Design</span>
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Product Designer + Developer" },
          { label: "Type",     value: "Full-Stack App" },
          { label: "Stack",    value: "React · FastAPI · MongoDB" },
          { label: "AI Tools", value: "Claude Code · Cursor · Emergent" },
          { label: "Status",   value: "Built — testing next" },
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

      {/* ── TOOLS & WHY ── */}
      <ToolsUsed
        tools={[
          { icon: "🤖", name: "Claude Code",
            why: "AI pair programmer for backend API development — auth flows, database models, endpoint logic. I directed architecture; AI accelerated the boilerplate." },
          { icon: "✏️", name: "Cursor",
            why: "AI-assisted frontend scaffolding and debugging. Useful for generating component shells — I refined every component's UX after." },
          { icon: "🚀", name: "Emergent Agent",
            why: "AI-powered deployment platform. Handled infra and environment setup so I could focus entirely on design and product decisions." },
          { icon: "🎨", name: "Figma",
            why: "Wireframing the core flows before writing any code. Even with AI speeding up development, I still designed first." },
        ]}
      />

      {/* ── THE WHY ── */}
      <section>
        <p className="gh-section-label">The why</p>
        <h2>Why I built this — and what it proves</h2>
        <p>
          Every design portfolio says "I'm curious about AI." I wanted to show
          it, not say it. Grove is a real, working product that I designed
          and shipped — using AI tools throughout the process. The case study
          isn't about the app. It's about{" "}
          <strong>how I think about when AI helps and when it doesn't.</strong>
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">What recruiters ask</p>
            <p>"How do you use AI in your design process?"</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What this project answers</p>
            <p>AI accelerated execution by ~3x, but every design decision — flows, hierarchy, what to build and what to cut — was mine. Here's the evidence.</p>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section>
        <p className="gh-section-label">Problem</p>
        <h2>Plant parents forget. Then they feel guilty.</h2>
        <p>
          People who keep indoor plants want to take good care of them, but
          care routines are inconsistent — watering schedules get forgotten,
          light needs are unclear, and there's no feedback loop to reinforce
          good habits. Existing apps either overwhelm with botanical data or
          feel like generic to-do lists.
        </p>

        <div className="highlight">
          <p className="gh-design-q-label">Design Question</p>
          How might we help plant owners build consistent care habits — with
          enough delight and feedback to sustain motivation beyond the first
          week?
        </div>
      </section>

      {/* ── CORE FLOW ── */}
      <section>
        <p className="gh-section-label">Core flow</p>
        <h2>Four steps from setup to first bloom</h2>

        <div className="gh-validation-strip feature" style={{ marginBottom: "1.5rem" }}>
          {[
            { label: "Screens", value: "4 core steps" },
            { label: "Goal",    value: "Guilt → confidence" },
            { label: "Output",  value: "Daily tasks + growth journal" },
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

        {/* Design artifacts — show the IA and flow thinking */}
        <div className="emergent-artifacts" aria-label="Design artifacts">
          <p className="gh-section-label">Design artifacts</p>
          <h3 style={{ marginTop: "0.5rem", marginBottom: "1rem", color: "var(--olive-2)" }}>Information architecture + flow logic</h3>
          <div className="emergent-ia-flow feature" style={{ padding: "1.5rem", borderRadius: "12px" }}>
            <div className="emergent-ia-row">
              <div className="emergent-ia-block">
                <p className="emergent-ia-label">Core IA decision</p>
                <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  Organized around <strong>bouquets</strong> (plant groups), not individual plants.
                  Every screen answers: "Which bouquet am I looking at?" This eliminated
                  the "wall of plants" problem in competing apps where 15+ individual plants
                  creates decision paralysis.
                </p>
              </div>
              <div className="emergent-ia-block">
                <p className="emergent-ia-label">Task generation logic</p>
                <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                  Daily tasks are generated per-bouquet based on plant type + environment + care history.
                  New users see 1 task/day. Complexity unlocks with streak length — not all at once.
                  Designed to prevent the "too many reminders" fatigue that kills plant app retention.
                </p>
              </div>
            </div>
          </div>

          <div className="emergent-screenshot-placeholder" style={{ marginTop: "1.25rem" }} aria-label="App screenshots available on request">
            <p className="emergent-placeholder-text">
              Full UI screens and interactive prototype available on request — currently in user testing.
            </p>
            <p className="emergent-placeholder-sub">
              <a href="mailto:espositohillary@gmail.com">Reach out for a live walkthrough →</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── AI DECISIONS — the heart of this case study ── */}
      <section>
        <p className="gh-section-label">AI in my process</p>
        <h2>Where AI helped, where I led,<br />and how I decided</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The point isn't "I used AI" — everyone does. The point is showing
          judgment: knowing when to trust it, when to override it, and when to
          do the work myself.
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
      </section>

      {/* ── KEY DESIGN DECISIONS ── */}
      <section>
        <p className="gh-section-label">Design decisions</p>
        <h2>Where I led, not the AI</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          AI accelerated the code. These are the design decisions I made —
          the parts where human judgment shaped the product.
        </p>
        <div className="gh-features-grid">
          {[
            { title: "Bouquet as mental model",
              desc: "Users think in groups (\u201Cmy kitchen plants,\u201D \u201Cmy bedroom plants\u201D), not individual species. I chose \u201Cbouquet\u201D as the core organizing concept \u2014 grouping plants by context, not taxonomy. This shaped the entire IA: every task, journal entry, and reward ties back to a bouquet, not a plant." },
            { title: "Progressive care complexity",
              desc: "New users see one task per day. Complexity scales with streak length — unlocking rotation reminders, light adjustments, and fertilizer timing only after the habit is established. This prevents the overwhelm that kills retention in care apps." },
            { title: "Reward as delight, not gamification",
              desc: "AI-generated bloom illustrations appear at milestones — but there's no points system, no leaderboard, no guilt mechanics. The reward is a unique visual moment tied to your specific plants. I rejected the AI's suggestion to add XP and levels." },
            { title: "Journal over dashboard",
              desc: "Most plant apps lead with a status dashboard. I led with a photo journal — the thing users actually want to revisit. Growth over time is more motivating than today's task list. The dashboard exists, but it's secondary to the narrative view." },
          ].map((block) => (
            <div key={block.title} className="feature">
              <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>{block.title}</h3>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>{block.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATUS + NEXT STEPS ── */}
      <section>
        <p className="gh-section-label">Status</p>
        <h2>Where this project stands</h2>

        <div className="gh-validation-strip feature">
          {STATUS_ITEMS.map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <div className="gh-vstrip-item">
                <p className="gh-vstrip-label">{item.label}</p>
                <p className="gh-vstrip-value">{item.value}</p>
              </div>
              {i < arr.length - 1 && <div className="gh-vstrip-divider" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>

        <div className="gh-reflection-grid" style={{ marginTop: "1.5rem" }}>
          <div className="gh-reflection-card feature">
            <p className="gh-reflection-label">What I've learned so far</p>
            <p>
              AI generated a task dashboard as the default home screen — I overrode
              it with the journal view because growth narrative is more motivating than
              a to-do list. AI suggested XP points and levels for gamification — I
              rejected it because guilt mechanics contradict the product's emotional goal.
              The pattern: AI defaults to conventional solutions. Design judgment means
              knowing when conventional is wrong for your specific users.
            </p>
          </div>
          <div className="gh-reflection-next">
            <p className="gh-reflection-label">Testing plan</p>
            <p>
              5-user moderated sessions focused on three questions: (1) Is the
              onboarding flow clear enough to complete without help? (2) Do
              daily tasks feel helpful or nagging? (3) Does the AI-generated
              bloom reward actually motivate continued care?
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
