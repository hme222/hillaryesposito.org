// src/pages/case-studies/Grove.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import JumpNav from "../../components/JumpNav";
import MoreWork from "../../components/MoreWork";
import Disclosure from "../../components/Disclosure";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { useLanguage } from "../../app/LanguageContext";
import { GROVE_ES } from "../../data/spanishCaseStudies";
import useReveal from "../../hooks/useReveal";
import { StateMatrix } from "../../components/casestudy/ShowKit";
import GroveAppDemo from "../../components/GroveAppDemo";
import { HandIcon, MedicalCrossIcon, PhoneIcon } from "../../components/LineIcons";

const SURVEY_FINDINGS = [
  {
    stat: "74%",
    label: "called smart care reminders a must-have",
  },
  {
    stat: "61%",
    label: "wanted to point a camera at a plant and have the app just tell them what it is",
  },
  {
    stat: "15+",
    label: "said 'too many notifications' would get the app deleted, no hesitation",
  },
  {
    stat: "2.4/5",
    label: "how confident new owners felt about light — their weakest spot, by a mile",
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
    topic: "How the app talks to you",
    ai: "Playful guilt in the plant's voice: “I’m thirsty, why did you forget me?”",
    me: "No guilt, no blame. I wrote rules for the AI that keep it that way.",
    why: "Guilt is the opposite of calm. I tried 20+ versions of that one line before it stopped sounding passive-aggressive.",
  },
  {
    topic: "How often it pings you",
    ai: "A push notification for every plant, every day.",
    me: "One calm summary each morning, one per group of plants. That's it.",
    why: "“Too many notifications” was the #1 reason people said they’d delete the app. 15+ said it before I even asked.",
  },
  {
    topic: "How sure the AI sounds",
    ai: "Show the AI’s plant guess as if it’s always right.",
    me: "Show the AI's confidence, and ask for a second photo when it drops under 80%.",
    why: "Get a poisonous plant wrong next to a pet and that's not a glitch, it's a hazard. Someone has to stay in charge, and it isn't the AI.",
  },
  {
    topic: "How it rewards you",
    ai: "Points and a leaderboard.",
    me: "Your plant earns a personality once you hit a care milestone. That's the whole reward.",
    why: "Paperwork is the #1 reason people stop updating a plant app after week one. A leaderboard is paperwork with extra steps.",
  },
  {
    topic: "What you see first",
    ai: "A to-do list as the home screen.",
    me: "The photo diary, first.",
    why: "Watching a plant grow beats staring at a checklist. The survey backed me up.",
  },
];

const OTHER_PROJECTS = [
  {
    icon: <MedicalCrossIcon />,
    title: "MSK Cancer Center",
    desc: "Six years redesigning clinical workflows, onboarding, and certification systems for 21,000+ clinicians and administrative staff.",
    path: "/case-study/msk",
  },
  {
    icon: <PhoneIcon />,
    title: "Mobbin",
    desc: "200+ screens across three finance apps, documented into searchable, step-by-step references for Mobbin's library.",
    path: "/case-study/mobbin",
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
          <p className="meta">Product Design&nbsp;· AI Product&nbsp;· Full-Stack Prototype</p>
          <h1>Grove</h1>
          <p className="gh-hero__intro">
            <strong>AI built me the wrong app. 32 plant owners told me which one to build instead.</strong>{" "}
            Grove is a plant-care app. An AI tool called Emergent built the whole thing for me, fast —
            packed with features. But when I sat down and tested that first version myself, the way it
            was organized felt off: too much going on, in the wrong order, none of it clear. So I did
            the research I should have done first, and asked 32 plant owners what they actually wanted.
            Turns out: something calmer and simpler. Now I'm rebuilding around that — cutting the
            social features nobody asked for, and teaching the AI to admit when it isn't sure. Because
            when a plant is poisonous to a cat, a wrong guess isn't a suggestion. It's a risk.
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
          { label: "Timeline", value: "Phase 2 of 3" },
          { label: "Status",   value: "Redesign in progress" },
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

      <JumpNav
        label="Jump to Grove case study sections"
        items={[
          { id: "grove-summary", label: "Summary" },
          { id: "grove-research", label: "Research" },
          { id: "grove-flow", label: "Flow" },
          { id: "grove-outcomes", label: "Outcomes" },
        ]}
      />

      <section id="grove-summary" className="cs-skim" aria-labelledby="grove-skim-title">
        <p className="gh-section-label">Read this first</p>
        <h2 id="grove-skim-title" className="cs-section-title">The short version</h2>
        <div className="cs-skim-grid">
          {[
            ["The problem", "Plant advice online is generic and contradictory. People don't trust it. And the apps that do exist nag you until you quit."],
            ["What I did", "All of it, solo: testing the AI's first build, the survey, the plan, the redesign, and the rules that keep the AI honest."],
            ["The big decision", "Earn trust first, before anything else. Calm reminders. Advice that shows its sources. Real help with light. Pet-safety warnings. And a person who can always overrule the AI."],
            ["What I'd test next", "Do new owners find the lighting lesson on their own? Do they notice when the AI is unsure? And do they call the app helpful instead of naggy?"],
          ].map(([k, v]) => (
            <article key={k} className="cs-skim-card"><span>{k}</span><p>{v}</p></article>
          ))}
        </div>
      </section>

      <nav className="cs-evidence-links" aria-label="Grove evidence shortcuts">
        <a href="#grove-research">View research</a>
        <a href="#grove-evolution">View evolution</a>
        <a href="#grove-states">View edge states</a>
        <a href="#grove-screens">View prototype</a>
        <a href="#grove-app-tour">See the app</a>
        <a href="#grove-outcomes">View outcomes</a>
      </nav>

      {/* ── INSIDE THE APP ── */}
      <section id="grove-app-tour" aria-labelledby="grove-app-tour-title">
        <p className="gh-section-label">Inside the app</p>
        <h2 id="grove-app-tour-title" className="cs-section-title">A look at Grove</h2>
        <p style={{ maxWidth: 640, marginBottom: "2rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The working full-stack app (React, FastAPI, MongoDB), playing through itself. Tap any
          section to jump, or pause whenever.
        </p>
        <GroveAppDemo />
      </section>

      {/* ── THE PREMISE ── */}
      <section className="cs-overview">
        <p className="gh-section-label">Where this starts</p>
        <h2 className="cs-section-title">Plant parents forget. Then they feel guilty.</h2>
        <p className="cs-overview-text">
          Most people who buy a plant want one thing: keep it alive. Then they forget to water it, or
          they overwater it, and feel bad either way. I asked 32 plant owners what frustrated them
          most. Top answer: "Advice is too generic, it doesn't account for my specific home."
          The fastest way to lose them, named by 15+ people without prompting: too many notifications.
          One person summed up the whole job in six words: "Plant care should feel peaceful, not stressful."
        </p>
        <p className="cs-overview-text" style={{ marginTop: "1rem" }}>
          <strong>The gap:</strong> the one thing new owners are worst at is light — where to put a
          plant, and why. No major plant app teaches it. People rated their own lighting confidence 2.4
          out of 5, and asked, unprompted, for an app that would "tell me exactly where to place a
          plant." That gap, plus trust, is where Grove wins or it doesn't.
        </p>
        <Disclosure title="Show what I worked from">
          <p className="cs-overview-text">
            <strong>What I worked from:</strong> a 32-person survey, and a testing plan ready to run
            with 5–6 people. Just me, start to finish.
          </p>
        </Disclosure>

        <div className="highlight" style={{ marginTop: "1.5rem" }}>
          <p className="gh-design-q-label">The question I'm answering</p>
          How do I help people take care of their plants regularly, with advice they actually trust
          for their exact plant — using calm reminders and real lighting help as what sets Grove apart?
        </div>
      </section>

      {/* ── RESEARCH ── */}
      <section id="grove-research">
        <p className="gh-section-label">Research</p>
        <h2>I asked 32 plant owners what actually matters</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Before I designed anything, I ran a survey. 32 people, from brand-new owners to serious
          collectors, answered between May 22 and June 19, 2026. The point was simple: test my guesses
          before I trusted them.
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
          Two kinds of people showed up in the answers. I designed around Maya — the bigger group,
          and the one who makes or breaks the whole thing.
        </p>
        <div className="gh-assumption-grid">
          {[
            ["gh-assumption-card--initial", "Maya, new plant owner (39%)", [
              ["Wants", '"Just help me keep it alive"'],
              ["Worst at", "Light — rates herself 2.4/5"],
              ["Biggest worry", "Is this plant poisonous to my pet? (9 of 12 asked on their own)"],
              ["Will delete if", "The app nags her"],
            ]],
            ["gh-assumption-card--finding", "James, experienced collector (42%)", [
              ["Wants", "To track 6–50+ plants without it feeling like work"],
              ["Care style", 'By feel / "vibes-based"'],
              ["Needs", "To log many plants at once, and a photo diary"],
              ["Stops updating if", 'It feels like "paperwork"'],
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
        <p className="gh-section-label">The first version</p>
        <h2>Emergent built social features into the app. The survey said that's not why people download.</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          I asked one hard question: "If Grove could only launch with THREE features, which three
          could you not live without?" The top three got built first. Everything else waits.
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
          <p className="gh-design-q-label">What I got wrong</p>
          I let Emergent build wide before I knew what mattered: forums, badges, plant swaps, the
          works. But the survey says people decide to download based on three care features, plus
          whether they trust the app. The extras don't count for anything until those three basics
          are excellent.
        </div>

        <Disclosure title="Show the rest of the roadmap decisions">
          <p className="cs-overview-text">
            Forums got 23%. Plant-swapping got 6%. Both landed far below the core care features. So
            the social stuff, the badges, and the points I'd already designed stay in the app, just not
            at launch. What the survey pushed up instead was stuff I hadn't even built:
            warnings for plants poisonous to pets (9 of 12 new owners raised it, unprompted),
            lessons on light (their weakest skill), and advice that names its sources (the biggest
            trust signal). I paused the paid Florist tier — only 2 people wanted it. Too few to build a business on.
          </p>
        </Disclosure>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">The quote that stopped me</p>
          "Any generative AI in this will remove any sense of trust."
          <span style={{ display: "block", marginTop: "0.5rem", fontSize: "0.88rem", color: "var(--muted)" }}>
            A florist said this about AI-written care sheets. One sentence, and I shelved a whole
            feature set. When people tell you the AI is costing them trust, you listen.
          </span>
        </div>

        <aside className="pushback-callout pushback-callout--early" aria-labelledby="pushback-heading">
          <div className="pushback-callout__head">
            <span className="pushback-callout__marker" aria-hidden="true"><HandIcon /></span>
            <div>
              <h3 id="pushback-heading" className="pushback-callout__eyebrow">Where I said no to the AI</h3>
              <p className="pushback-callout__sub">Five calls the AI wanted to make. I overruled all five — the research said they'd break trust.</p>
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
        <h2>First the plumbing, then the part people touch every day</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The survey decided what got built first: if people didn't rank it in their top three, it
          waited. I built the technical foundation (React, FastAPI, MongoDB), then the three
          must-haves: calm reminders, plant ID by camera, and the daily care flow. AI coding tools
          handled the repetitive parts, so I could focus on how it feels to use.
        </p>

        <h3 style={{ marginTop: "2.5rem", color: "var(--olive-2)" }}>How you use it, start to first plant personality</h3>
        <ol className="grove-flow-steps" aria-label="User flow from setup to first plant personality">
          <li><span className="grove-flow-steps__n">1</span><span>Open the app</span></li>
          <li><span className="grove-flow-steps__n">2</span><span>Group your plants by where they live (a "bouquet")</span></li>
          <li><span className="grove-flow-steps__n">3</span><span>Get one task a day, from a calm morning summary</span></li>
          <li><span className="grove-flow-steps__n">4</span><span>Add a diary entry with a photo</span></li>
          <li><span className="grove-flow-steps__n">5</span><span>Your plant earns a personality once you keep a streak</span></li>
        </ol>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The real thinking is in the tricky moments below.
        </p>

        <div className="highlight" style={{ marginTop: "2rem" }}>
          <p className="gh-design-q-label">The main design decision: group plants into "bouquets"</p>
          Other apps dump every plant into one long list. Overwhelming — where do you even start? Grove
          groups plants by where they live: the kitchen window, the living-room shelf, the bedroom.
          Every screen answers one question: which group am I looking at? Tasks, diary entries, and
          reminders all attach to a group, and a new user only ever sees one task a day.
        </div>
      </section>

      {/* ── DESIGN EVOLUTION ── */}
      <section id="grove-evolution">
        <p className="gh-section-label">Design evolution</p>
        <h2>What the AI built, and where I'm taking it</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Emergent built the full app, every feature at once. The main care screen opened with a
          social feed and a daily "mission." When I tested it, the whole thing felt cluttered and
          hard to follow — so the survey, and then this redesign, stripped it back to the three things
          people actually said they'd download for.
        </p>

        <div className="grove-evolution">
          <div className="grove-final-panel" aria-label="Emergent prototype care screen">
            <p className="grove-evolution__label">Before · what the AI built</p>
            <div className="grove-phone-frame" style={{ background: "#f5f0e8" }}>
              <img
                src="/assets/grove/care.jpg"
                alt="Emergent prototype care screen leading with a social feed and daily mission"
                className="grove-phone-frame__img"
                loading="lazy"
              />
            </div>
            <p className="grove-evolution__note">The care screen led with a social feed and "today's mission." Forums ranked near the bottom of the survey, at 23%.</p>
          </div>

          <div className="grove-evolution__arrow" aria-hidden="true">→</div>

          <div className="grove-final-panel" aria-label="Grove redesign welcome screen">
            <p className="grove-evolution__label">After · where I'm taking it</p>
            <div className="grove-phone-frame" style={{ background: "#1b2f15" }}>
              <img
                src="/assets/grove/grove1.png"
                alt="Redesigned Grove welcome screen, calm and pared back"
                className="grove-phone-frame__img"
                loading="lazy"
              />
            </div>
            <p className="grove-evolution__note">The social feed moves to "later." The app opens on plant care, not a feed. Calm, not busy — the brief one person handed me for free: "peaceful, not stressful."</p>
          </div>
        </div>
      </section>

      {/* ── EDGE STATES ── */}
      <section id="grove-states">
        <p className="gh-section-label">When things go wrong</p>
        <h2>The tricky moments that decide if people stay</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          When everything goes right, any app looks fine. The real test is the six moments below, like
          the day you forget to water and the app doesn't guilt-trip you. These are what decide whether
          someone keeps Grove or deletes it.
        </p>

        <div className="grove-state-gallery" role="table" aria-label="Grove edge state gallery">
          <div className="grove-state-gallery__row grove-state-gallery__row--head" role="row">
            <span role="columnheader">Moment</span>
            <span role="columnheader">What the app does</span>
            <span role="columnheader">Why</span>
          </div>
          {[
            ["Nothing added yet", "Just one “Add your first plant” button. No empty dashboard.", "Nothing to figure out on the first open."],
            ["AI isn't sure", "Shows its top 3 guesses, how sure it is, and a retake button.", "A guess, not a fake sense of certainty."],
            ["Coming back after a while", "Shows only the plants that need help. No guilt, no pile of missed tasks.", "Coming back should feel fixable, not like a punishment."],
            ["A reward", "A short reveal of your plant's AI personality (still version for anyone who dislikes motion).", "A feeling, not points or a leaderboard."],
            ["A plant that's toxic to pets", "Warns you the moment you add it, names its source, and tells you what to do.", "Safety and trust are both on the line here."],
            ["Too many reminders", "One morning summary per group; only true emergencies interrupt.", "Reminders can never become the reason someone quits."],
          ].map(([state, response, reason]) => (
            <div className="grove-state-gallery__row" role="row" key={state}>
              <span role="cell" className="grove-state-gallery__state">{state}</span>
              <span role="cell">{response}</span>
              <span role="cell">{reason}</span>
            </div>
          ))}
        </div>

        <Disclosure title="Show the four small craft decisions">
          <ul className="grove-persona-list" style={{ maxWidth: 640 }}>
            <li><strong>Color:</strong> green means growing, amber means needs attention. Overdue plants say so in words too, never color alone, so it still works if you can't tell the colors apart.</li>
            <li><strong>One thing at a time:</strong> one decision per screen. The diary and the personality wait until today's care task is done.</li>
            <li><strong>How plants are grouped:</strong> the cards match how people actually remember their plants, by room, not one long list.</li>
            <li><strong>Motion:</strong> the little celebration is short and skippable. People who dislike motion get the same result, minus the animation.</li>
          </ul>
        </Disclosure>
      </section>

      {/* ── PROTOTYPE VS SURVEY ── */}
      <section id="grove-screens">
        <p className="gh-section-label">Reading the first version</p>
        <h2>What the survey said to keep, and what to cut</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          The AI had already built these screens, all at once. The survey told me which ones earned
          their place and which ones didn't.
        </p>
        <StateMatrix
          rows={[
            {
              state: "Adding a plant: keep",
              screen: { src: "/assets/grove/bouquet.jpg", alt: "Emergent prototype add screen: track a plant or a bouquet" },
              note: "Letting you track one plant or a whole group matched how people already think about what they own. Grouping stays. One long list would just overwhelm.",
            },
            {
              state: "Photo diary: keep",
              screen: { src: "/assets/grove/Growth.jpg", alt: "Emergent prototype plant detail with a growth timeline" },
              note: "A plant's photos over time are the reward people said they wanted, more motivating than a to-do list. So the diary goes first.",
            },
            {
              state: "Personality yes, points no",
              screen: { src: "/assets/grove/plantpersonality.jpg", alt: "Emergent prototype profile with plant personality, badges, and streak" },
              note: "The AI “plant personality” stays. The 11 badges and the streak counter are gone. They made care feel like the “paperwork” that's the #1 reason people quit.",
            },
          ]}
        />
      </section>


      {/* ── WHERE IT STANDS ── */}
      <section id="grove-outcomes" className="cs-outcome">
        <p className="gh-section-label">Where it stands</p>
        <h2 className="cs-section-title">What exists so far</h2>
        <div className="cs-outcome-grid">
          {[
            ["0", "plants shown as a sure thing when the AI isn't sure. Below 80%, Grove asks for a second photo"],
            ["1/day", "care task per group, capped on purpose — a reminder should never be the reason you quit"],
            ["5", "AI decisions I overruled and wrote down, each one traced back to a specific survey answer"],
            ["Ready", "A working app (React + FastAPI + MongoDB), with the test plan already written"],
          ].map(([v, l]) => (
            <div key={l} className="cs-outcome-card">
              <p className="cs-outcome-value gradient-text">{v}</p>
              <p className="cs-outcome-label">{l}</p>
            </div>
          ))}
        </div>
        <div className="cs-reflections-grid" style={{ marginTop: "1.5rem" }}>
          <div className="cs-reflection-card">
            <h3>Ask first, build second</h3>
            <p>
              I built forums, badges, and swaps before I asked anyone. They ranked 6th to 9th. Lesson:
              check with real people before you spend the time.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>The real skill is judgment, not AI</h3>
            <p>
              The hard part isn't using AI. It's knowing when to trust it and when to say no. I threw
              out the AI's points system and its to-do-list home screen — both fought the calm the
              survey asked for.
            </p>
          </div>
        </div>
        <p style={{ maxWidth: 640, marginTop: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          <strong>Next: watching real people use it.</strong> 5–6 sessions, questions written down in
          advance. Can Maya add a plant in under 30 seconds and find the lighting lesson on her own?
          Does James's "log many at once" work the way he expects?
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
