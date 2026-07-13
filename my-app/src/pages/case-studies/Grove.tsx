// src/pages/case-studies/Grove.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MoreWork from "../../components/MoreWork";
import Disclosure from "../../components/Disclosure";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { useLanguage } from "../../app/LanguageContext";
import { GROVE_ES } from "../../data/spanishCaseStudies";
import useReveal from "../../hooks/useReveal";
import { HandIcon, MedicalCrossIcon, LeafIcon } from "../../components/LineIcons";

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

// The sharpest overrides, surfaced as a scannable callout above the full table.
const PUSHBACK = [
  {
    topic: "Personality tone",
    ai: "Playful, anthropomorphized guilt: “I’m thirsty, why did you forget me?”",
    me: "Encouraging tone only; prompt guardrails reject blame and neglect language.",
    why: "Guilt contradicts the calm experience users asked for. I tested 20+ generations before locking the template.",
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
    why: "Feeling like an “administrative chore” was the #1 reason people stop updating a plant app after the first week.",
  },
  {
    topic: "Home screen",
    ai: "A task dashboard as the primary view.",
    me: "The photo journal first.",
    why: "Growth over time is more motivating than a to-do list. The survey backed the journal as the emotional payoff.",
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
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  if (lang === "es") {
    return <SpanishCaseStudy data={GROVE_ES} />;
  }

  return (
    <main className="case-study gh-layout" aria-label="Grove AI Case Study" lang="en" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Product Design · AI Product · Full-Stack Prototype</p>
          <h1>Grove</h1>
          <p className="gh-hero__intro">
            Plant parents kill their plants because the care advice they find doesn't
            hold up. I surveyed 32 users, defined the MVP from their data, and am
            redesigning a working Emergent prototype, documenting{" "}
            <strong>where AI accelerates and where human judgment leads.</strong>
          </p>
        </div>
        <div className="gh-hero__visual grove-hero-visual" aria-hidden="true">
          <div className="grove-phone-frame grove-phone-frame--hero" style={{ background: "#1b2f15" }}>
            <img
              src="/assets/grove/grove1.png"
              alt=""
              className="grove-phone-frame__img grove-phone-frame__img--welcome"
            />
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Product Designer (solo)" },
          { label: "Type",     value: "Full-Stack App" },
          { label: "Timeline", value: "3 weeks so far" },
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

      <nav className="cs-jump-nav" aria-label="Jump to Grove case study sections">
        <a href="#grove-summary">Summary</a>
        <a href="#grove-research">Research</a>
        <a href="#grove-flow">Flow</a>
        <a href="#grove-outcomes">Outcomes</a>
      </nav>

      <section id="grove-summary" className="cs-skim" aria-labelledby="grove-skim-title">
        <p className="gh-section-label">Read this first</p>
        <h2 id="grove-skim-title" className="cs-section-title">The short version</h2>
        <div className="cs-skim-grid">
          {[
            ["Problem", "Plant care advice is generic, conflicting, and often untrusted, while existing apps overcorrect with stressful reminders."],
            ["My role", "Solo product designer and builder: survey synthesis, MVP definition, IA, UI, AI guardrails, and working prototype iteration."],
            ["Key decision", "Prioritize trust: calm reminders, source-backed care, light education, pet safety, and human override of AI output."],
            ["What I’d test next", "Whether new plant owners find the lighting tutorial, understand AI confidence, and describe the app as helpful instead of nagging."],
          ].map(([k, v]) => (
            <article key={k} className="cs-skim-card"><span>{k}</span><p>{v}</p></article>
          ))}
        </div>
      </section>

      <nav className="cs-evidence-links" aria-label="Grove evidence shortcuts">
        <a href="#grove-research">View research</a>
        <a href="#grove-evolution">View before/final</a>
        <a href="#grove-states">View edge states</a>
        <a href="#grove-outcomes">View outcomes</a>
      </nav>

      {/* ── THE PREMISE ── */}
      <section className="cs-overview">
        <p className="gh-section-label">The premise</p>
        <h2 className="cs-section-title">Plant parents forget. Then they feel guilty.</h2>
        <p className="cs-overview-text">
          Grove is a plant care app I researched and am redesigning from a working Emergent
          prototype. The survey's most common frustration: "Advice is too generic, doesn't account
          for my specific home environment." Its #1 instant-delete trigger, cited by 15+
          respondents: "too many notifications." One respondent put the whole brief in a sentence:
          "Plant care should feel peaceful, not stressful."
        </p>
        <Disclosure title="Show research inputs and the finding that changed the direction">
          <p className="cs-overview-text">
            <strong>Inputs:</strong> 32-respondent survey, moderated testing plan ready to run
            (5–6 participants). Solo project.
          </p>
          <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
            <strong>The skill gap is light, not water.</strong> Lighting confidence averaged 2.4/5
            among new owners, and respondents asked unprompted for an app to "tell me exactly where
            to place a plant." No major competitor addresses this.
          </p>
        </Disclosure>

        <div className="highlight" style={{ marginTop: "1.5rem" }}>
          <p className="gh-design-q-label">Design Question</p>
          How might we help plant owners build consistent care habits through
          trustworthy, species-specific guidance, with calm notifications and
          lighting education as the differentiators?
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section id="grove-research">
        <p className="gh-section-label">Research</p>
        <h2>32 respondents told me what actually matters</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          A 32-respondent survey (May 22–June 19, 2026) of new-to-experienced plant owners
          tested my assumptions before I designed anything.
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
          Two personas emerged. The design centers on Maya, the largest segment and the hypothesis-critical user.
        </p>
        <div className="gh-assumption-grid">
          {[
            ["gh-assumption-card--initial", "Maya, new plant owner (39%)", [
              ["Goal", '"Just help me keep it alive"'],
              ["Skill gap", "Lighting confidence 2.4/5"],
              ["Top concern", "Pet toxicity (9/12 raised unprompted)"],
              ["Will delete if", "Nagged with notifications"],
            ]],
            ["gh-assumption-card--finding", "James, experienced collector (42%)", [
              ["Goal", "Track 6–50+ plants without it feeling like work"],
              ["Care style", 'Intuitive / "vibes-based"'],
              ["Needs", "Bulk logging, growth photo journal"],
              ["Will delete if", 'App feels like "an administrative chore"'],
            ]],
          ].map(([cls, name, rows]) => (
            <div key={name as string} className={`gh-assumption-card ${cls}`}>
              <p className="gh-assumption-label">{name}</p>
              <ul className="grove-persona-list">
                {(rows as string[][]).map(([k, v]) => <li key={k}><strong>{k}:</strong> {v}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── MVP DEFINITION ── */}
      <section>
        <p className="gh-section-label">MVP definition</p>
        <h2>I built community features. The survey said they're not why people download.</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          One forced trade-off question defined the MVP: "If Grove could only launch with THREE
          features, which are dealbreakers?" The top 3 made the cut; everything below is post-launch.
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

        <Disclosure title="Show secondary roadmap decisions">
          <p className="cs-overview-text">
            Community forums ranked 6th of 11 features (23%); verified swapping ranked 9th (6%).
            The social layer, badges, and XP I had already designed stay in the prototype as
            post-MVP. The survey elevated what wasn't in the build scope instead: pet toxicity
            warnings (9/12 new owners raised it unprompted), lighting education (the lowest
            confidence score), and cited sources (the top trust signal). The Florist Pro tier is
            paused; n=2 is too thin to build on.
          </p>
        </Disclosure>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">AI trust signal from research</p>
          "Any generative AI in this will remove any sense of trust."
          <span style={{ display: "block", marginTop: "0.5rem", fontSize: "0.88rem", color: "var(--muted)" }}>
            Florist respondent, on AI-generated care sheets. This one quote paused an entire
            feature tier. When users tell you AI erodes their trust, you stop and listen.
          </span>
        </div>

        <aside className="pushback-callout pushback-callout--early" aria-labelledby="pushback-heading">
          <div className="pushback-callout__head">
            <span className="pushback-callout__marker" aria-hidden="true"><HandIcon /></span>
            <div>
              <h3 id="pushback-heading" className="pushback-callout__eyebrow">Where I pushed back</h3>
              <p className="pushback-callout__sub">Five AI suggestions I overruled because the research said they would break trust.</p>
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
      </section>

      {/* ── BUILD ── */}
      <section id="grove-flow">
        <p className="gh-section-label">Build</p>
        <h2>Core architecture, then the core care loop</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The survey set the build order: if users didn't rank it in the top 3, it waited.
          I built the React + FastAPI + MongoDB core, then the three dealbreaker features:
          smart reminders, plant ID via camera, and the daily care flow. AI coding tools
          handled boilerplate; I focused on interaction design.
        </p>

        <h3 style={{ marginTop: "2.5rem", color: "var(--olive-2)" }}>User flow: setup to first plant personality</h3>
        <ol className="grove-flow-steps" aria-label="User flow from setup to first plant personality">
          <li><span className="grove-flow-steps__n">1</span><span>Open the app</span></li>
          <li><span className="grove-flow-steps__n">2</span><span>Create a bouquet, named by its location</span></li>
          <li><span className="grove-flow-steps__n">3</span><span>Daily care from a morning digest, one task a day</span></li>
          <li><span className="grove-flow-steps__n">4</span><span>Add a journal entry with a photo</span></li>
          <li><span className="grove-flow-steps__n">5</span><span>Plant personality unlocks at the streak milestone</span></li>
        </ol>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The product thinking lives in the edge states below.
        </p>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">Core IA decision: group plants into bouquets</p>
          Competing apps show every plant in one flat list, which reads as decision paralysis.
          Grove groups plants into bouquets by location (kitchen window, living room shelf,
          bedroom), so every screen answers one question: which bouquet am I looking at?
          Tasks, journal entries, and reminders all tie to bouquets, and new users see 1 task/day.
        </div>
      </section>

      {/* ── DESIGN EVOLUTION ── */}
      <section id="grove-evolution">
        <p className="gh-section-label">Design evolution</p>
        <h2>From task board to calm care queue</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The early layout treated plant care like an admin checklist. The final version turns the
          same logic into one calm daily queue with one clear next action.
        </p>

        <div className="grove-evolution">
          <div className="grove-wireframe-panel" aria-label="Early Grove wireframe concept">
            <p className="grove-evolution__label">Before · task-board wireframe</p>
            <div className="grove-wireframe-screen">
              <span className="grove-wireframe-pill" />
              <span className="grove-wireframe-title" />
              {[0, 1, 2].map((i) => <div key={i} className="grove-wireframe-row"><span /><span /></div>)}
              <div className="grove-wireframe-grid"><span /><span /><span /><span /></div>
            </div>
            <p className="grove-evolution__note">Problem: everything competed for attention, so the interface felt like another chore.</p>
          </div>

          <div className="grove-evolution__arrow" aria-hidden="true">→</div>

          <div className="grove-final-panel" aria-label="Final Grove care screen">
            <p className="grove-evolution__label">After · care queue</p>
            <div className="grove-phone-frame" style={{ background: "#f5f0e8" }}>
              <img
                src="/assets/grove/care.png"
                alt="Final Grove care queue screen"
                className="grove-phone-frame__img"
                loading="lazy"
              />
            </div>
            <p className="grove-evolution__note">Decision: lead with what needs attention today, then hide secondary features until the care task is complete.</p>
          </div>
        </div>
      </section>

      {/* ── EDGE STATES ── */}
      <section id="grove-states">
        <p className="gh-section-label">Edge states</p>
        <h2>Edge states, guardrails, and the reward loop</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The happy path is the easy part. These six states, including a skipped day with no guilt
          nag, decide whether someone keeps the app or uninstalls it.
        </p>

        <div className="grove-state-gallery" role="table" aria-label="Grove edge state gallery">
          <div className="grove-state-gallery__row grove-state-gallery__row--head" role="row">
            <span role="columnheader">State</span>
            <span role="columnheader">UI response</span>
            <span role="columnheader">Product reason</span>
          </div>
          {[
            ["Empty", "Single “Add your first plant” action. No empty dashboard.", "Reduces cognitive load on first open."],
            ["Low AI confidence", "Top 3 matches, confidence scores, and retake option.", "AI is a suggestion, not a source of false certainty."],
            ["Returning after absence", "At-risk plants only. No guilt copy or missed-task backlog.", "Re-entry should feel recoverable, not punitive."],
            ["Reward", "Brief reveal of AI plant personality, with reduced-motion fallback.", "Emotional reward over XP or leaderboards."],
            ["Pet toxicity", "Warning at add time with source attribution and next steps.", "Safety-critical trust moment."],
            ["Notification cap", "Morning digest by bouquet; urgent issues can bypass.", "Reminders cannot become the uninstall trigger."],
          ].map(([state, response, reason]) => (
            <div className="grove-state-gallery__row" role="row" key={state}>
              <span role="cell" className="grove-state-gallery__state">{state}</span>
              <span role="cell">{response}</span>
              <span role="cell">{reason}</span>
            </div>
          ))}
        </div>

        <Disclosure title="Show the four visual craft decisions">
          <ul className="grove-persona-list" style={{ maxWidth: 640 }}>
            <li><strong>Color:</strong> green means growth, amber means attention; overdue states pair text with color so status is never color-only.</li>
            <li><strong>Hierarchy:</strong> one decision per screen; journaling and personality wait until today's care task is done.</li>
            <li><strong>Components:</strong> bouquet cards mirror how people remember where plants live, not a flat inventory list.</li>
            <li><strong>Motion:</strong> celebration is short and optional; reduced-motion users get the same state change without animation.</li>
          </ul>
        </Disclosure>
      </section>

      {/* Screen showcase removed while the app is mid-redesign; re-add when new screens are ready. */}

      {/* ── WHERE IT STANDS ── */}
      <section id="grove-outcomes" className="cs-outcome">
        <p className="gh-section-label">Where it stands</p>
        <h2 className="cs-section-title">Research artifacts + working product</h2>
        <div className="cs-outcome-grid">
          {[
            ["32", "Survey respondents grounding every design decision in data"],
            ["2", "Personas built from the survey data: needs, frustrations, and dealbreakers"],
            ["5", "AI decisions documented with explicit human override reasoning"],
            ["In progress", "Full-stack app (React + FastAPI + MongoDB) ready for moderated testing"],
          ].map(([v, l]) => (
            <div key={l} className="cs-outcome-card">
              <p className="cs-outcome-value gradient-text">{v}</p>
              <p className="cs-outcome-label">{l}</p>
            </div>
          ))}
        </div>
        <div className="cs-reflections-grid" style={{ marginTop: "1.5rem" }}>
          <div className="cs-reflection-card">
            <h3>Research before conviction</h3>
            <p>
              I built community features, badges, and swaps before surveying users; they rank
              6th–9th in priority. Validate before investing.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>The AI skills gap is a judgment gap</h3>
            <p>
              The differentiator is knowing when to trust AI and when to override it. I rejected
              AI's XP gamification and task-dashboard home screen; both contradicted the emotional
              goal the survey validated.
            </p>
          </div>
        </div>
        <p style={{ maxWidth: 640, marginTop: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          <strong>Next: moderated testing.</strong> 5–6 sessions with pre-registered success
          criteria. Can Maya add a plant in under 30 seconds and find the lighting tutorial
          unaided? Does James's bulk logging match his mental model?
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
