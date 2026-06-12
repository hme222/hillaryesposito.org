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

const SOCIAL_FEATURES = [
  {
    title: "Share progress",
    desc: "Photo updates tied to bouquets. Celebrate growth together. Sharing a visual milestone keeps the habit alive past the first week.",
    rationale: "Design rationale: tying shares to bouquets keeps context intact. No decontextualised feed posts.",
  },
  {
    title: "Community tips",
    desc: "Ask questions, share advice. A gentle support network for the moments when a leaf turns yellow and you don't know why.",
    rationale: "Design rationale: framed as mutual help, not expert/novice hierarchy. Reduces the anxiety of asking 'dumb questions.'",
  },
  {
    title: "Follow plant parents",
    desc: "See others' journeys. Inspiration without competition. No likes, no follower counts. Just growth timelines.",
    rationale: "Design rationale: deliberately omitted engagement metrics to avoid the comparison spiral that kills casual communities.",
  },
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
    desc: "Three fintech apps catalogued for Mobbin's UX pattern library, documenting trust, risk, and progress patterns.",
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
            Plant parents forget to care for their plants, then feel guilty about it.
            I designed and built Grove to turn inconsistent care into a habit, and
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
        <h2 className="cs-section-title">A real product built to answer a real question about AI</h2>
        <p className="cs-overview-text">
          Grove is a plant care app I designed and built to test a thesis: where does AI accelerate
          design execution, and where does human judgment need to lead? Every AI decision in this
          project is documented: what it suggested, whether I accepted it, and why.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Constraints:</strong> Solo project. 3-week timeline. No user testing yet. Shipped to validate the build; testing is next.
        </p>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section>
        <p className="gh-section-label">The challenge</p>
        <h2>Plant parents forget. Then they feel guilty.</h2>
        <p>
          Every design portfolio says "I'm curious about AI." I wanted to show
          it, not say it. Grove is a real, working product that I designed
          and shipped, using AI tools throughout the process. The case study
          isn't about the app. It's about{" "}
          <strong>how I think about when AI helps and when it doesn't.</strong>
        </p>
        <p>
          Beginner-to-intermediate plant owners who want to keep plants alive but forget care routines.
          People who've killed a succulent and felt guilty about it. They want to do better, but
          care routines are inconsistent. Watering schedules get forgotten,
          light needs are unclear, and there's no feedback loop to reinforce
          good habits. Existing apps either overwhelm with botanical data or
          feel like generic to-do lists.
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">What recruiters ask</p>
            <p>"How do you use AI in your design process?"</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What this project answers</p>
            <p>AI accelerated execution by ~3x, but every design decision (flows, hierarchy, what to build and what to cut) was mine. Here's the evidence.</p>
          </div>
        </div>

        <div className="highlight">
          <p className="gh-design-q-label">Design Question</p>
          How might we help plant owners build consistent care habits, with
          enough delight and feedback to sustain motivation beyond the first
          week?
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

      {/* ── PROCESS ── */}
      <section>
        <p className="gh-section-label">Process</p>
        <h2>How I got from idea to working product in 3 weeks</h2>

        <ol className="reina-flow-list" aria-label="Design process steps">
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">01</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Secondary research on plant care app patterns</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Audited 6 plant care apps to map common patterns and failure points. Found the same two problems everywhere: information overload on day one, and no emotional payoff for consistency.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">02</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>IA + flow mapping</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Defined the bouquet-first information architecture and mapped the core flow (onboard to first plant personality) before touching any tools. This kept scope tight and prevented feature creep.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">03</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Design + build with AI assistance</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Wireframed in Figma, then built with Claude Code and Cursor handling boilerplate while I focused on UX logic and interaction details. AI accelerated the code; I directed every design decision.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">04</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>AI judgment documentation</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Documented every AI decision point: what it suggested, whether I accepted or overrode it, and the reasoning. This is the real deliverable of the project.
              </p>
            </div>
          </li>
        </ol>
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

      {/* ── CORE FLOW ── */}
      <section>
        <p className="gh-section-label">Core flow</p>
        <h2>Four steps from setup to first plant personality</h2>

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
                  New users see 1 task/day. Complexity unlocks with streak length, not all at once.
                  Designed to prevent the "too many reminders" fatigue that kills plant app retention.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── SOCIAL LAYER ── */}
      <section>
        <p className="gh-section-label">Social layer</p>
        <h2>Plant care is solitary. That's why people quit.</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Habit research is clear: motivation sustained in isolation fades fast.
          A community layer isn't a social network; it's an accountability
          structure. Seeing someone else's fiddle-leaf fig thrive keeps you
          coming back to water yours. I designed this as a lightweight layer,
          not a feed. No engagement mechanics. No algorithmic amplification.
          Just plant parents, helping each other not kill things.
        </p>

        <div className="gh-features-grid">
          {SOCIAL_FEATURES.map((feature) => (
            <div key={feature.title} className="feature">
              <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>{feature.title}</h3>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>{feature.desc}</p>
              <p className="grove-feature-rationale">{feature.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI DECISIONS — the heart of this case study ── */}
      <section>
        <p className="gh-section-label">AI in my process</p>
        <h2>Where AI helped, where I led,<br />and how I decided</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The point isn't "I used AI"; everyone does. The point is showing
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

      {/* ── KEY DECISIONS ── */}
      <section className="cs-decisions">
        <p className="cs-section-heading">Key decisions</p>
        <h2 className="cs-section-title">Where I led, not the AI</h2>
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
              <td>Core organizing concept</td>
              <td>Bouquets (plant groups by context), not individual species</td>
              <td>Users think in groups ("my kitchen plants"). Shaped entire IA: tasks, journal, rewards all tie to bouquets</td>
            </tr>
            <tr>
              <td>Care complexity</td>
              <td>Progressive: 1 task/day for new users, complexity scales with streak length</td>
              <td>Prevents the overwhelm that kills retention in care apps. Unlock rotation, light, fertilizer after habit is established</td>
            </tr>
            <tr>
              <td>Reward system</td>
              <td>AI-generated plant personalities at milestones. No points, no leaderboard</td>
              <td>Rejected AI's suggestion for XP and levels. Guilt mechanics contradict the product's emotional goal</td>
            </tr>
            <tr>
              <td>Home screen</td>
              <td>Photo journal as primary view, dashboard secondary</td>
              <td>Overrode AI's default of a task dashboard. Growth narrative is more motivating than a to-do list</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="cs-section-heading">Outcomes</p>
        <h2 className="cs-section-title">What this project produced</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">Shipped</p>
            <p className="cs-outcome-label">Live working app: React + FastAPI + MongoDB</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">4</p>
            <p className="cs-outcome-label">Core screens designed in Figma before a line of code</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3</p>
            <p className="cs-outcome-label">AI decisions documented with explicit human override reasoning</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">2×</p>
            <p className="cs-outcome-label">AI suggestions overridden on UX grounds (XP system, dashboard home)</p>
          </div>
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          Built and shipped in 3 weeks solo. The real deliverable isn't the app. It's documented
          evidence of AI judgment: 3 decisions where I evaluated AI output, accepted 1, overrode 2,
          with reasoning for each.
        </p>
      </section>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="cs-section-heading">What I learned</p>
        <h2 className="cs-section-title">Where this project stands and what it taught me</h2>
        <div className="cs-reflections-grid">
          <div className="cs-reflection-card">
            <h3>The AI skills gap is a judgment gap</h3>
            <p>
              The AI skills gap isn't knowing which tools exist. It's knowing when to use them,
              how to evaluate their outputs critically, and where human judgment leads. Every
              designer will use AI. The differentiator is whether you can tell the difference
              between AI accelerating execution and AI making product decisions for you.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Direction before delegation</h3>
            <p>
              Every AI tool in this project received a clear brief before it produced anything.
              Prompt constraints, quality bars, architecture decisions, and scope limits were
              set by me first. AI executed within guardrails I defined, not the other way around.
              That sequencing matters and it's learnable.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>What's next</h3>
            <p>
              5-user moderated sessions focused on three questions: (1) Is the
              onboarding flow clear enough to complete without help? (2) Do
              daily tasks feel helpful or nagging? (3) Does the AI-generated
              plant personality actually motivate continued care?
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
