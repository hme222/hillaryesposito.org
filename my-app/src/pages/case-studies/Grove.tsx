// src/pages/case-studies/Grove.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import ToolsUsed from "../../components/ToolsUsed";
import MoreWork from "../../components/MoreWork";
import useReveal from "../../hooks/useReveal";
import { TerminalIcon, PencilIcon, LaunchIcon, FrameIcon, HandIcon, MedicalCrossIcon, LeafIcon } from "../../components/LineIcons";

const SCREENS = [
  { image: "/assets/grove/bouquet.png", label: "Onboarding / bouquet creation", bg: "#3a3a3a",
    designNote: "Location-first setup. Users name their bouquet by where it lives (\"Kitchen window\"), because the survey showed people think in spaces: the kitchen window, the living room shelf." },
  { image: "/assets/grove/care.png", label: "Daily care tasks", bg: "#f5f0e8",
    designNote: "One morning digest covers every plant. High-contrast status indicators because this is the one screen users check daily. Task count grows with the care streak, so adding plants doesn't add noise." },
  { image: "/assets/grove/Growth.png", label: "Growth journal", bg: "#e8edd9",
    designNote: "Photo-first layout. The journal is the emotional payoff. Growth over time is more motivating than a task checklist. Chose this as the home screen over a dashboard based on survey data." },
  { image: "/assets/grove/plantpersonality.png", label: "AI-generated plant personality", bg: "#f5f0e8",
    designNote: "The reward for consistent care. Personality unlocks at streak milestones. The tone stays encouraging: every profile runs through prompt guardrails before display." },
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
    label: "average lighting confidence among new owners, the #1 skill gap",
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

const AI_DECISIONS = [
  {
    area: "AI-generated plant personalities",
    whatAIDid: "AI generates unique personality profiles for each plant when users hit care milestones: playful character sketches that make each plant feel like an individual.",
    whyNotManual: "Writing hundreds of unique personality variants by hand isn't scalable. AI generation makes every plant feel personal without a content bottleneck.",
    humanJudgment: "I defined the prompt constraints, tone, and quality bar. Early outputs included anthropomorphized guilt-tripping ('I'm so thirsty, why did you forget me?') that contradicted the calm tone survey respondents valued. I rewrote prompt guardrails to enforce encouragement over guilt, filtered outputs that referenced neglect or blame, and tested 20+ generations before locking the prompt template.",
  },
  {
    area: "Building the full stack with AI coding tools",
    whatAIDid: "Used Claude Code and Cursor to accelerate backend API development, component scaffolding, and debugging, reducing boilerplate time significantly.",
    whyNotManual: "Writing auth flows, CRUD endpoints, and database models from scratch would have tripled the timeline for a solo project. AI let me focus on UX decisions instead of plumbing.",
    humanJudgment: "Every AI-generated code block was reviewed, tested, and refactored. I directed the architecture decisions: API structure, data models, auth strategy. AI accelerated the execution.",
  },
  {
    area: "Emergent Agent platform for deployment",
    whatAIDid: "Used Emergent's AI agent platform for environment provisioning, deployment, and infrastructure. No manual DevOps.",
    whyNotManual: "As a designer building a solo full-stack project, managing servers and CI/CD would've pulled focus from the product. Emergent handled infra so I could stay in the design layer.",
    humanJudgment: "Chose the platform intentionally. It let me ship a working product to test with real users, which is the whole point of this project.",
  },
];

// The sharpest overrides, surfaced as a scannable callout above the full table.
const PUSHBACK = [
  {
    topic: "Personality tone",
    ai: "Playful, anthropomorphized guilt: “I’m thirsty, why did you forget me?”",
    me: "Encouraging tone only; prompt guardrails reject blame and neglect language.",
    why: "Guilt directly contradicts the calm experience users told me they wanted. I tested 20+ generations before locking the template.",
  },
  {
    topic: "Notification frequency",
    ai: "Daily push notifications for every plant.",
    me: "A single morning digest per bouquet.",
    why: "“Too many notifications” was the #1 instant-delete trigger in the survey; 15+ respondents named it unprompted.",
  },
  {
    topic: "Plant ID confidence",
    ai: "Show the AI identification as definitive.",
    me: "Surface a confidence score and a “verify with a photo” prompt below 80%.",
    why: "Misidentifying a toxic plant near a pet is a safety risk, not a UX inconvenience. The human stays in the loop.",
  },
  {
    topic: "Reward system",
    ai: "XP points and a leaderboard.",
    me: "AI-generated plant personalities unlocked at care milestones.",
    why: "The survey was blunt: an app that feels like an “administrative chore” is the #1 reason people delete it.",
  },
  {
    topic: "Home screen",
    ai: "A task dashboard as the primary view.",
    me: "The photo journal first.",
    why: "Growth over time is more motivating than a to-do list. The survey data backed the journal as the emotional payoff.",
  },
];

const OTHER_PROJECTS = [
  {
    icon: <MedicalCrossIcon />,
    title: "MSK Cancer Center",
    desc: "Six years redesigning clinical workflows, onboarding, and certification systems for 21,000+ clinicians.",
    path: "/case-study/msk",
  },
  {
    icon: <LeafIcon />,
    title: "Good Harvest",
    desc: "Heatmap testing with 22 users found a trust problem: people located the seasonal info but didn't believe it applied to them.",
    path: "/case-study/good-harvest",
  },
];

export default function GroveCaseStudy() {
  usePageTitle("Grove: AI Judgment in Plant Care Design");
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <main className="case-study gh-layout" aria-label="Grove AI Case Study" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Product Design · AI + Design · Full-Stack App · React · FastAPI</p>
          <h1>Grove</h1>
          <p className="gh-hero__intro">
            Plant parents kill their plants because the care advice they find doesn't
            hold up. I surveyed 32 users, defined an MVP from their data, and
            am building a working app, using AI tools throughout to show{" "}
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
          { label: "Role",     value: "Product Designer (solo)" },
          { label: "Type",     value: "Full-Stack App" },
          { label: "Timeline", value: "3 weeks so far, solo" },
          { label: "Stack",    value: "React · FastAPI · MongoDB" },
          { label: "AI Tools", value: "Claude Code · Cursor · Emergent" },
          { label: "Status",   value: "In progress, testing next" },
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

      {/* ── THE PREMISE ── */}
      <section className="cs-overview">
        <p className="gh-section-label">The premise</p>
        <h2 className="cs-section-title">Plant parents forget. Then they feel guilty.</h2>
        <p className="cs-overview-text">
          Grove is a plant care app I designed, researched, and built end-to-end in a 3-week solo
          sprint, so this case study reads the way the project ran: as a build log. New plant owners
          kill their plants because care information is generic, conflicting, and untrustworthy, and
          existing apps respond by nagging rather than teaching. Every clause of that statement came
          from the survey data. A 32-respondent survey defined the MVP, two data-driven personas
          shaped every design decision, and a moderated testing plan is ready to validate the
          hypothesis. AI tools accelerated the build, and every AI decision is documented below with
          explicit reasoning.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Research:</strong> 32-respondent survey (5/22–6/19/2026) · moderated testing plan (5–6 participants, ready to run).
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Constraints:</strong> Solo project. 3-week build. Prototype shipped; moderated user testing is next.
        </p>

        <div className="gh-assumption-grid" style={{ marginTop: "1.5rem" }}>
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">What users said</p>
            <p>"Advice is too generic, doesn't account for my specific home environment." Most common single frustration across all respondents.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What the data showed</p>
            <p>"Too many notifications" was the #1 instant-delete trigger, 15+ respondents cited it. One respondent: "Plant care should feel peaceful, not stressful."</p>
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
          trustworthy, species-specific guidance, with calm notifications and
          lighting education as the differentiators?
        </div>
      </section>

      {/* ── LOG: WEEK 1 — RESEARCH ── */}
      <section>
        <p className="gh-section-label">Log · Week 1 · Research</p>
        <h2>32 respondents told me what actually matters</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Week 1 was survey design, distribution, and analysis. I ran a 32-respondent survey
          (5/22–6/19/2026) targeting new-to-experienced plant owners. I had assumptions about
          what plant owners need; before designing anything, I needed to test them:
        </p>

        <div className="cs-research-questions">
          <div className="cs-research-question">What actually causes plant deaths: lack of knowledge, lack of motivation, or lack of tools?</div>
          <div className="cs-research-question">Which features would make someone download a plant care app vs. delete it?</div>
          <div className="cs-research-question">Where does AI create genuine value in plant care, and where does it erode trust?</div>
          <div className="cs-research-question">What does "calm" look like in an app category dominated by notification spam?</div>
        </div>

        <div className="grove-survey-stats" aria-label="Key survey findings" style={{ marginTop: "1.5rem" }}>
          {SURVEY_FINDINGS.map((f) => (
            <div key={f.label} className="grove-survey-stat feature">
              <p className="grove-survey-stat__value gradient-text">{f.stat}</p>
              <p className="grove-survey-stat__label">{f.label}</p>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: "2.5rem", color: "var(--olive-2)" }}>Who I'm designing for</h3>
        <p style={{ color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          Two personas emerged from the data. The case study focuses on Maya, the largest segment and the hypothesis-critical user.
        </p>
        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Maya, new plant owner (39%)</p>
            <ul className="grove-persona-list">
              <li><strong>Owns:</strong> 1–6 plants</li>
              <li><strong>Goal:</strong> "Just help me keep it alive"</li>
              <li><strong>Skill gap:</strong> Lighting confidence 2.4/5</li>
              <li><strong>Top concern:</strong> Pet toxicity (9/12 raised unprompted)</li>
              <li><strong>Will delete if:</strong> Nagged with notifications</li>
            </ul>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">James, experienced collector (42%)</p>
            <ul className="grove-persona-list">
              <li><strong>Owns:</strong> 6–50+ plants</li>
              <li><strong>Goal:</strong> Track collection without it feeling like work</li>
              <li><strong>Care style:</strong> Intuitive / "vibes-based"</li>
              <li><strong>Needs:</strong> Bulk logging, growth photo journal</li>
              <li><strong>Will delete if:</strong> App feels like "an administrative chore"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── LOG: WEEK 1 — MVP DEFINITION ── */}
      <section>
        <p className="gh-section-label">Log · Week 1 · MVP definition</p>
        <h2>I built community features. The survey said they're not why people download.</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          A forced trade-off question, "If Grove could only launch with THREE features, which are
          dealbreakers?", let the responses define the MVP. Forced-rank results below: the top 3
          define the MVP; everything below is post-launch.
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

        <p style={{ maxWidth: 640, margin: "2rem 0 1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Community forums ranked 6th out of 11 features (23%). Verified swapping ranked 9th (6%).
          The social layer I designed isn't why anyone installs a plant app.
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
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>Pet toxicity warnings (9/12 new owners raised it unprompted), lighting education (lowest confidence score), and cited sources (top trust signal). None of these were in the original build scope.</p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Paused entirely</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>The Florist Pro tier (AI-generated care sheets for clients). n=2 is too thin to build on, but not too thin to pause on.</p>
          </div>
        </div>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">AI trust signal from research</p>
          "Any generative AI in this will remove any sense of trust."
          <span style={{ display: "block", marginTop: "0.5rem", fontSize: "0.88rem", color: "var(--muted)" }}>
            Florist respondent, on AI-generated care sheets. This single quote paused an entire feature tier. When your users explicitly tell you AI erodes their trust, the responsible design decision is to stop and listen, not ship and iterate.
          </span>
        </div>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">What got cut</p>
          Community forums, plant swapping, achievement badges, the Florist Pro tier, and a
          gamification layer with XP points. None of these were in the top 3 survey features.
          The hardest cut was community forums (ranked 5th at 23%), but building retention
          features before the core care loop is excellent would have been building in the wrong order.
        </div>
      </section>

      {/* ── LOG: WEEKS 1–2 — BUILD ── */}
      <section>
        <p className="gh-section-label">Log · Weeks 1–2 · Build</p>
        <h2>Core architecture, then the core care loop</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Shipping a full-stack app solo in 3 weeks meant making hard prioritization calls every day.
          The survey data made those calls easier: if users didn't rank it in the top 3, it waited.
          Week 1 also covered core architecture: I set up the React + FastAPI + MongoDB stack and
          built auth and the bouquet data model; every architecture decision followed the MVP
          features the survey identified.
          Week 2 was smart reminders, plant ID via camera, and the daily care task flow — the three
          features users said they'd download for. I built them before touching anything else.
          AI coding tools (Claude Code, Cursor) handled boilerplate so I could focus on interaction design.
        </p>

        <ToolsUsed
          tools={[
            { icon: <TerminalIcon />, name: "Claude Code",
              why: "AI pair programmer for backend API development: auth flows, database models, endpoint logic. I directed architecture; AI accelerated the boilerplate." },
            { icon: <PencilIcon />, name: "Cursor",
              why: "AI-assisted frontend scaffolding and debugging. Useful for generating component shells; I refined every component's UX after." },
            { icon: <LaunchIcon />, name: "Emergent Agent",
              why: "AI-powered deployment platform. Handled infra and environment setup so I could focus entirely on design and product decisions." },
            { icon: <FrameIcon />, name: "Figma",
              why: "Wireframing the core flows before writing any code. Even with AI speeding up development, I still designed first." },
          ]}
        />

        <h3 style={{ marginTop: "2.5rem", color: "var(--olive-2)" }}>User flow: setup to first plant personality</h3>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The happy path is four steps. But the product thinking lives in the branches: what happens when a user skips a day, hasn't added any plants yet, or returns after a week away.
        </p>

        {/* ── Visual flow diagram ── */}
        <div className="grove-flow-diagram feature" aria-label="User flow diagram">
          <div className="grove-flow-track">
            {/* Happy path */}
            <div className="grove-flow-node grove-flow-node--start">
              <span className="grove-flow-node__icon" aria-hidden="true">1</span>
              <span className="grove-flow-node__label">Open app</span>
            </div>
            <div className="grove-flow-arrow" aria-hidden="true" />

            <div className="grove-flow-node">
              <span className="grove-flow-node__icon" aria-hidden="true">2</span>
              <span className="grove-flow-node__label">Create bouquet</span>
              <span className="grove-flow-node__sub">Name by location, add plants</span>
            </div>
            <div className="grove-flow-arrow" aria-hidden="true" />

            <div className="grove-flow-node">
              <span className="grove-flow-node__icon" aria-hidden="true">3</span>
              <span className="grove-flow-node__label">Daily care</span>
              <span className="grove-flow-node__sub">Morning digest, 1 task/day</span>
            </div>
            <div className="grove-flow-arrow" aria-hidden="true" />

            <div className="grove-flow-node">
              <span className="grove-flow-node__icon" aria-hidden="true">4</span>
              <span className="grove-flow-node__label">Journal entry</span>
              <span className="grove-flow-node__sub">Photo + note, tied to bouquet</span>
            </div>
            <div className="grove-flow-arrow" aria-hidden="true" />

            <div className="grove-flow-node grove-flow-node--end">
              <span className="grove-flow-node__icon" aria-hidden="true">5</span>
              <span className="grove-flow-node__label">Personality unlock</span>
              <span className="grove-flow-node__sub">Streak milestone reward</span>
            </div>
          </div>

          {/* Branch points */}
          <div className="grove-flow-branches">
            <div className="grove-flow-branch feature">
              <p className="grove-flow-branch__trigger">Branch: No plants yet</p>
              <p className="grove-flow-branch__response">Empty state shows a single prompt: "Add your first plant." No dashboard, no tasks, no cognitive load. The app earns complexity as the user earns streaks.</p>
            </div>
            <div className="grove-flow-branch feature">
              <p className="grove-flow-branch__trigger">Branch: Skipped a day</p>
              <p className="grove-flow-branch__response">No guilt notification. The streak pauses and waits. Re-entry shows "Welcome back" with today's single task. The survey was clear: shame-based reminders are the #1 uninstall trigger.</p>
            </div>
            <div className="grove-flow-branch feature">
              <p className="grove-flow-branch__trigger">Branch: Returned after a week</p>
              <p className="grove-flow-branch__response">Triage mode: surfaces only at-risk plants (yellowing, overdue watering). Skips the journal and personality features until the user re-establishes a streak.</p>
            </div>
          </div>
        </div>

        {/* ── IA diagram ── */}
        <div className="grove-ia-diagram feature" style={{ marginTop: "2rem", padding: "1.5rem", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 1.25rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Core IA decision: group plants into bouquets</h3>
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
            complexity grows as the streak does.
          </p>
        </div>
      </section>

      {/* ── LOG: WEEK 3 — PERSONALITY SYSTEM + POLISH ── */}
      <section>
        <p className="gh-section-label">Log · Week 3 · Personality system + polish</p>
        <h2>Edge states, guardrails, and the reward loop</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Week 3 was AI-generated plant personalities, prompt guardrails, the photo journal, and edge
          state handling. Deployed via Emergent. Community features (forums, swaps, badges) were
          intentionally deferred; the survey ranked them 5th-9th. The happy path is the easy part.
          These are the states that determine whether someone keeps using the app or uninstalls it.
        </p>

        <div className="grove-states-grid">
          <div className="grove-state-card feature">
            <div className="grove-state-card__header">
              <span className="grove-state-card__badge">Empty state</span>
              <h3 className="grove-state-card__title">First open, no plants</h3>
            </div>
            <p className="grove-state-card__desc">
              Single action: "Add your first plant." No dashboard, no empty cards, no feature tour. The app has nothing to show yet, so it doesn't pretend to. One button, one path forward. Complexity unlocks as the user earns it.
            </p>
            <p className="grove-state-card__rationale">
              <strong>Why:</strong> Survey respondents cited "overwhelming on first open" as a pain point in competing apps. Grove's empty state is intentionally minimal.
            </p>
          </div>

          <div className="grove-state-card feature">
            <div className="grove-state-card__header">
              <span className="grove-state-card__badge">Error state</span>
              <h3 className="grove-state-card__title">Plant ID confidence too low</h3>
            </div>
            <p className="grove-state-card__desc">
              When AI identification confidence falls below 80%, Grove shows the top 3 possibilities with confidence scores and asks "Does this look right?" with a retake option. Never presents a low-confidence result as definitive.
            </p>
            <p className="grove-state-card__rationale">
              <strong>Why:</strong> The design treats AI as a suggestion, shows its uncertainty, and keeps the human in the loop. 9 of 12 new owners raised pet toxicity unprompted.
            </p>
          </div>

          <div className="grove-state-card feature">
            <div className="grove-state-card__header">
              <span className="grove-state-card__badge">Re-engagement</span>
              <h3 className="grove-state-card__title">Returning after absence</h3>
            </div>
            <p className="grove-state-card__desc">
              "Welcome back" with only at-risk plants surfaced. No guilt, no streak-reset punishment, no backlog of missed tasks. One clear action: "Here's what needs attention today." Journal and personality features stay hidden until a new streak starts.
            </p>
            <p className="grove-state-card__rationale">
              <strong>Why:</strong> 15+ survey respondents said shame-based reminders trigger uninstalls. Re-entry is designed to feel like a fresh start.
            </p>
          </div>

          <div className="grove-state-card feature">
            <div className="grove-state-card__header">
              <span className="grove-state-card__badge">Reward state</span>
              <h3 className="grove-state-card__title">Streak milestone reached</h3>
            </div>
            <p className="grove-state-card__desc">
              Brief celebration animation (under 2 seconds), then the AI-generated plant personality card appears. The reveal itself is the reward. Animation respects prefers-reduced-motion.
            </p>
            <p className="grove-state-card__rationale">
              <strong>Why:</strong> The survey rejected XP/leaderboard gamification, so the reward here is emotional: a personality reveal. Motion is purposeful and short.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE PRODUCT TODAY ── */}
      <section>
        <p className="gh-section-label">The product today</p>
        <h2>What Grove looks like</h2>
        <p style={{ maxWidth: 640, marginBottom: "0.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Key screens from the working build: onboarding through your first plant personality.
        </p>

        <div className="grove-screens-grid grove-screens-grid--annotated" aria-label="App screen previews with design rationale">
          {SCREENS.map((screen) => (
            <div key={screen.label} className="grove-screen-item grove-screen-item--annotated">
              <div className="grove-phone-frame" style={{ background: screen.bg }}>
                <img
                  src={screen.image}
                  alt={`${screen.label} screen`}
                  className="grove-phone-frame__img"
                  loading="lazy"
                />
              </div>
              <p className="grove-screen-label">{screen.label}</p>
              {screen.designNote && (
                <p className="grove-screen-note">{screen.designNote}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── THE AI-JUDGMENT LOG ── */}
      <section>
        <p className="gh-section-label">The AI-judgment log</p>
        <h2>Where AI helped, where I led, and how I decided</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Everyone uses AI now. What this section shows is judgment:
          knowing when to trust it, when to override it, and when to do the work myself.
          These calls happened all through the sprint; they're collected here as their own log.
        </p>

        {/* ── "Where I pushed back" callout — the scannable highlight ── */}
        <aside className="pushback-callout" aria-labelledby="pushback-heading">
          <div className="pushback-callout__head">
            <span className="pushback-callout__marker" aria-hidden="true"><HandIcon /></span>
            <div>
              <h3 id="pushback-heading" className="pushback-callout__eyebrow">Where I pushed back</h3>
              <p className="pushback-callout__sub">Five moments I overruled the AI, and why.</p>
            </div>
          </div>
          <ul className="pushback-list">
            {PUSHBACK.map((p) => (
              <li key={p.topic} className="pushback-item">
                <p className="pushback-item__topic">{p.topic}</p>
                <p className="pushback-item__said">
                  <span className="pushback-tag pushback-tag--ai">AI said</span>{p.ai}
                </p>
                <p className="pushback-item__chose">
                  <span className="pushback-tag pushback-tag--me">I chose</span>{p.me}
                </p>
                <p className="pushback-item__why">{p.why}</p>
              </li>
            ))}
          </ul>
        </aside>

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

      {/* ── WHERE IT STANDS ── */}
      <section className="cs-outcome">
        <p className="gh-section-label">Where it stands</p>
        <h2 className="cs-section-title">Research artifacts + working product</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">32</p>
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
            <p className="cs-outcome-value gradient-text">In progress</p>
            <p className="cs-outcome-label">Full-stack app (React + FastAPI + MongoDB) ready for moderated testing</p>
          </div>
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          The most useful output was learning that I built breadth-first
          while users decide on three features. The research reordered my priorities before I spent
          more time building the wrong things.
        </p>

        <div className="cs-reflections-grid" style={{ marginTop: "1.5rem" }}>
          <div className="cs-reflection-card">
            <h3>Research before conviction</h3>
            <p>
              I built community features, badges, and swaps before surveying users. The survey
              showed those rank 6th–9th in priority. The most useful output of this project was
              learning to validate before investing. The research reordered my roadmap entirely.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>The AI skills gap is a judgment gap</h3>
            <p>
              The differentiator is knowing when to trust AI and when to override it.
              I rejected AI's suggestion for XP gamification and a
              task-dashboard home screen. Both would have contradicted the emotional goal the
              survey validated.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S NEXT ── */}
      <section>
        <p className="gh-section-label">Log · Next entry</p>
        <h2>What's next: moderated testing</h2>
        <p style={{ maxWidth: 640, color: "var(--muted)", lineHeight: 1.65 }}>
          5–6 moderated sessions, one persona per participant: can Maya add a plant
          in under 30 seconds? Can she find the lighting tutorial unaided? Does James's
          bulk logging match his mental model? Pre-registered success criteria so the
          hypothesis can be clearly supported or challenged.
        </p>
      </section>

      <div className="cs-inline-cta">
        <p>Interested in this kind of work?</p>
        <a href="mailto:espositohillary@gmail.com" className="hero-btn" style={{ fontSize: "0.9rem", padding: "0.8rem 1.8rem", textDecoration: "none" }}>
          Send me a note
        </a>
      </div>

      {/* ── OTHER PROJECTS ── */}
      <MoreWork projects={OTHER_PROJECTS} onBack={() => navigate("/?scrollTo=projects")} />
    </main>
  );
}
