import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import GroveCinematic from "../../components/riso/GroveCinematic";
import GroveDecisionStory from "../../components/riso/GroveDecisionStory";
import GroveScreenGallery from "../../components/riso/GroveScreenGallery";
import GroveSystemLab from "../../components/riso/GroveSystemLab";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { GROVE_ES } from "../../data/spanishCaseStudies";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";

/**
 * Grove — case study in the Risograph Cartography system.
 * Structure follows the Carmen Elena / Pilgrimz arc: hero-plate hook →
 * concise problem → evidence → decisions → interactive trust specimens →
 * truthful current state → conversational CTA.
 */

// Grove now shares the flagship chapter component with MSK and Mobbin rather
// than hand-rolling its own nav, so it gets sticky wayfinding and current-
// chapter highlighting for free. The first entry anchors the hero for active
// tracking; the component itself renders from the second onward.
const CHAPTERS: CaseStudyChapter[] = [
  { id: "grove-start", label: "Start", note: "A decision log, not a demo" },
  { id: "grove-brief", label: "Problem", note: "Care should fit a life already happening" },
  { id: "grove-research", label: "Research", note: "32 real opinions" },
  // "Redesign" used to point here, at the gallery of what the AI built — the
  // opposite of what the label promised. The gallery is now labelled for what
  // it is, and the decisions section finally has an anchor of its own.
  { id: "grove-redesign", label: "What AI built", note: "The first version, screen by screen" },
  { id: "grove-decisions", label: "Decisions", note: "Three features, one call each" },
  { id: "grove-override", label: "Human override", note: "Five calls" },
  { id: "grove-system", label: "System", note: "The decisions underneath" },
  { id: "grove-outcomes", label: "Outcomes", note: "No invented numbers" },
];

const LEGS = [
  {
    n: "01",
    mission: "An AI tool built the whole app",
    detail:
      "Emergent — the AI tool I used to generate the first build — made Grove in one pass: a social feed, badges, daily “missions,” forums, plant swaps. Wide, fast, and packed.",
    impact: "Feature-complete, focus-empty",
  },
  {
    n: "02",
    mission: "A 5-user test showed the map was wrong",
    detail:
      "People opened it and stalled. The care screen led with a feed and a mission — not their plants. Overloaded, and the priorities were backwards.",
    impact: "Cluttered, unclear",
  },
  {
    n: "03",
    mission: "A 32-person survey found the three that matter",
    detail:
      "I asked what actually earns a plant app a spot on the phone: calm reminders, plant ID by camera, real help with light. Forums ranked near the bottom, at 23%.",
    impact: "3 must-haves, not 30",
  },
  {
    n: "04",
    mission: "Redesign around trust",
    detail:
      "Keep only what earns trust: reminders that never nag, an AI that shows its sources, pet-safety warnings, and a person who can always overrule it. Calm, not busy.",
    impact: "Phase 2 of 3",
    now: true,
  },
];

// Recovered from the earlier version of this case study. The page claimed a
// 32-person survey and never once reported what those 32 people said.
const SURVEY_FINDINGS = [
  { stat: "74%", label: "called smart care reminders a must-have" },
  { stat: "61%", label: "wanted to point a camera at a plant and have the app just tell them what it is" },
  { stat: "15+", label: "said “too many notifications” would get the app deleted, no hesitation" },
  { stat: "2.4/5", label: "how confident new owners felt about light — their weakest spot, by a mile" },
];

// Share of respondents who wanted each feature. Deliberately no ordinal ranks:
// eleven features were tested and nine are charted here, so "6th of 11" is true
// to the dataset but does not match the bars on screen. That exact mismatch was
// corrected once already (commit add85eb) — cite shares, never positions.
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

const OUTCOMES = [
  { n: "32", l: "plant owners surveyed before any screen changed" },
  { n: "3", l: "features that earn the download; everything else waits" },
  { n: "5", l: "AI calls I overruled to keep Grove trustworthy" },
];

const SCREENS = [
  { src: "grove-live-collection.jpg", cap: "Your collection", bg: "#f5f0ea" },
  { src: "grove-live-add.jpg", cap: "Add a plant", bg: "#31302e" },
  { src: "grove-live-care.jpg", cap: "Daily care", bg: "#f5f0ea" },
  { src: "grove-live-journal.jpg", cap: "Care journal", bg: "#f5f0ea" },
  { src: "grove-live-personality.jpg", cap: "Plant personality", bg: "#f5f0ea" },
  { src: "grove-live-greenhouse.jpg", cap: "Greenhouse", bg: "#f5f0ea" },
];

// Emergent evidence paired with the redesign decision. These are deliberately
// framed as directions, not unsupported finished-screen claims.
const DECISIONS = [
  {
    feature: "Reminders",
    old: "grove-live-care.jpg",
    oldAlt: "The care screen Emergent built, leading with a daily mission and a feed",
    oldBg: "#f5f0ea",
    why: "Emergent led with a daily “mission” and a feed. The redesign is one calm morning summary — never a nag.",
  },
  {
    feature: "Plant ID by camera",
    old: "grove-live-add.jpg",
    oldAlt: "The add-plant screen Emergent built, giving a single confident identification",
    oldBg: "#31302e",
    why: "The AI guessed with false confidence. The redesign shows its top guesses, how sure it is, and its sources — a guess, not a verdict.",
  },
  {
    feature: "Personality, not points",
    old: "grove-live-personality.jpg",
    oldAlt: "The personality screen Emergent built, with badges, streaks, and a leaderboard",
    oldBg: "#f5f0ea",
    why: "Badges, streaks, and a leaderboard turned care into paperwork. The redesign keeps the plant’s AI personality and drops the rest.",
  },
];

// The five calls I overruled the AI on — progressive-disclosure accordion.
const OVERRIDES = [
  { topic: "Reminder tone", ai: "Guilt and urgency — “your plant misses you.”", me: "One calm morning summary.", why: "Notifications are the #1 reason people delete a plant app." },
  { topic: "Gamification", ai: "Badges, streaks, and a leaderboard.", me: "An AI plant personality you earn — a feeling, not points.", why: "Care that feels like paperwork is the top reason people quit." },
  { topic: "Plant ID confidence", ai: "One confident answer, every time.", me: "Top guesses, how sure it is, and its sources.", why: "False certainty is the fastest way to lose trust." },
  { topic: "Pet safety", ai: "Generic care tips.", me: "Toxic-to-pets warnings the moment you add a plant, with sources.", why: "New owners raised it unprompted, before I ever asked. When a plant can hurt a cat, a wrong guess isn’t a suggestion — it’s a risk." },
  { topic: "Notification frequency", ai: "Nudge whenever engagement dips.", me: "One summary per group; only true emergencies interrupt.", why: "A reminder can never become the reason someone leaves." },
];

// Share, then confirm only what actually happened — shared, copied, or a way to
// recover. Cancelling the share sheet says nothing celebratory.
type ShareOutcome = "shared" | "copied" | "error" | null;
// Icon and text are separate so the emoji can be hidden from screen readers —
// this string is announced through an aria-live region.
const SHARE_MESSAGE: Record<Exclude<ShareOutcome, null>, { icon?: string; text: string }> = {
  shared: { icon: "🌱", text: "woohoo — thanks for sharing!" },
  copied: { icon: "🌱", text: "link copied — thanks!" },
  error: { text: "Couldn’t copy the link — you can copy it from the address bar." },
};
function ThanksShare() {
  const [outcome, setOutcome] = useState<ShareOutcome>(null);
  const share = async () => {
    const url = window.location.href;
    const copyLink = async () => {
      if (!navigator.clipboard?.writeText) return false;
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch {
        return false;
      }
    };

    let next: ShareOutcome;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Grove — a case study by Hillary Esposito", url });
        next = "shared";
      } else {
        next = (await copyLink()) ? "copied" : "error";
      }
    } catch (err) {
      // Dismissing the share sheet is not a failure — say nothing at all.
      if ((err as Error)?.name === "AbortError") { setOutcome(null); return; }
      // The sheet exists but refused to open, which is the common desktop case.
      // Fall back to the clipboard rather than telling the reader to do it by hand.
      next = (await copyLink()) ? "copied" : "error";
    }
    setOutcome(next);
    window.setTimeout(() => setOutcome(null), 3200);
  };
  return (
    <div className="rp-shareRow">
      <button type="button" className="rp-share" onClick={share}>Share this case study →</button>
      <span className={`rp-woohoo${outcome ? " show" : ""}`} aria-live="polite">
        {outcome && SHARE_MESSAGE[outcome].icon && (
          <span aria-hidden="true">{SHARE_MESSAGE[outcome].icon}</span>
        )}
        {outcome ? SHARE_MESSAGE[outcome].text : ""}
      </span>
    </div>
  );
}

export default function RisoGrove() {
  usePageTitle("Grove — AI Judgment Case Study");
  const { lang } = useLanguage();

  // Scroll-reveal — fade/rise sections in as they enter view (Carmen-style motion).
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".riso-page .rp-reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));

    // Route legs: highlight + wiggle the pin as each crosses the viewport centre.
    // Fires once per leg. Toggling meant the wiggle replayed every time someone
    // scrolled back up to re-find their place — a repeated attention-grab at
    // exactly the moment attention has already been lost.
    const legs = Array.from(document.querySelectorAll<HTMLElement>(".riso-page .rp-leg"));
    const legIo = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-active");
          legIo.unobserve(e.target);
        }),
      { rootMargin: "-42% 0px -42% 0px" }
    );
    legs.forEach((el) => legIo.observe(el));

    return () => {
      io.disconnect();
      legIo.disconnect();
    };
  }, []);

  // Scroll-linked hand-drawn underline — draws as the quote rises into view,
  // reverses on scroll-up, redraws on the way back down.
  useEffect(() => {
    const path = document.querySelector<SVGPathElement>(".riso-page .rp-underline path");
    const quote = document.querySelector<HTMLElement>(".riso-page .rp-quote");
    if (!path || !quote) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      return;
    }
    const onScroll = () => {
      const r = quote.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.66; // starts a bit later — as your eye reaches it
      const end = vh * 0.44; // fully drawn near centre
      const p = Math.max(0, Math.min(1, (start - r.top) / (start - end)));
      path.style.strokeDashoffset = String(1 - p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={GROVE_ES} />;

  return (
    <main className="riso-page" lang="en">
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>Grove</span>
      </nav>

      <CaseStudyChapters project="Grove" chapters={CHAPTERS} />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      {/* HERO */}
      <header className="rp-hero" id="grove-start">
        <CartoField
          mapSrc="/riso/elevation-02.jpg"
          edition="pine"
          mapZoom={1.15}
          mapPosition="60% 42%"
          secondaryMapSrc="/riso/elevation-03.jpg"
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Product design · AI judgment</span>
            <h1 className="rp-h1">Grove.</h1>
            <span className="rp-readtime">
              <b>5 min</b>
              <span>read · a decision log, not a demo</span>
            </span>
            <p className="rp-sub">
              An AI built this plant-care app in one pass — every feature, all at once. I tested it,
              asked 32 owners what actually mattered, and now I’m rebuilding around <b>trust</b>. (Phase 2 of 3.)
            </p>
            <a className="rp-cta" href="#grove-research">
              See the rebuild →
            </a>
          </div>
        </div>
        <div className="rp-hero__media">
          <div className="rp-device">
            <img src="/assets/grove/grove1.png" alt="Grove mobile welcome screen" />
          </div>
          <div className="rp-heroNote rp-heroNote--reminder" aria-hidden="true">
            <span>GROVE JOURNAL · DAY 12</span>
            <b>Your Fiddle Leaf could use a little water.</b>
          </div>
        </div>
      </header>

      <GroveCinematic />

      {/* PROBLEM */}
      <section className="rp-section" id="grove-research">
        <div className="rp-wrap">
          <div className="rp-split rp-reveal">
            <div className="rp-split__text">
              <p className="rp-kicker">Where this starts</p>
              <h2 className="rp-title">Plant parents forget. Then they feel guilty.</h2>
              <p className="rp-lede">
                Most people who buy a plant want one thing: keep it alive. They forget to water, or
                overwater, and either way they feel bad. Grove’s job was never more features — it was to
                make plant care feel <b>calm, not stressful</b>, and trustworthy where a wrong answer has
                a cost (a plant that’s toxic to a cat isn’t a suggestion — it’s a risk).
              </p>
            </div>
            <div className="rp-split__media">
              <div className="rp-device">
                <img src="/assets/grove/grove-live-care.jpg" alt="Grove daily care — one clear task a day, overdue plants surface first, no shaming" />
              </div>
            </div>
          </div>

          <h3 className="rp-subhead">What those 32 people actually said</h3>
          <p className="rp-lede">
            Brand-new owners through serious collectors, answered between 22 May and 19 June 2026.
          </p>
          <dl className="rp-surveyStats rp-reveal">
            {SURVEY_FINDINGS.map((f) => (
              <div key={f.stat}>
                <dt>{f.stat}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>

          <h3 className="rp-subhead">What they wanted, and what waited</h3>
          <p className="rp-lede">
            Nine of the eleven features I tested, by share of people who wanted them. The top three
            became the core. Everything under it — including the forums and swaps sitting in the
            first build — waited.
          </p>
          <ol className="rp-rank rp-reveal">
            {MVP_FEATURES.map((f) => (
              <li key={f.feature} className={f.tier === "core" ? "is-core" : undefined}>
                <span className="rp-rank__label">{f.feature}</span>
                <span className="rp-rank__track" aria-hidden="true"><i style={{ width: `${f.pct}%` }} /></span>
                <b className="rp-rank__pct">{f.pct}%</b>
                <span className="rp-rank__tier">{f.tier === "core" ? "Core" : "Later"}</span>
              </li>
            ))}
          </ol>

          <figure className="rp-quoteCard rp-reveal">
            <blockquote>“Any generative AI in this will remove any sense of trust.”</blockquote>
            <figcaption>
              A florist, about AI-written care sheets. One sentence, and I shelved a whole feature
              set. When people tell you the AI is costing them trust, you listen.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* THE REBUILD */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <p className="rp-kicker">The rebuild</p>
          <h2 className="rp-title">Four decisions, from AI-built to trustworthy.</h2>
          <ol className="rp-route rp-reveal">
            {LEGS.map((leg) => (
              <li className={`rp-leg${leg.now ? " rp-leg--now" : ""}`} key={leg.n}>
                <span className="rp-leg__pin">{leg.n}</span>
                <div>
                  <p className="rp-leg__mission">{leg.mission}</p>
                  <p className="rp-leg__detail">{leg.detail}</p>
                  <span className="rp-leg__impact">{leg.impact}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ONE SYSTEM, EVERY SCREEN */}
      <section className="rp-section" id="grove-redesign">
        <div className="rp-wrap">
          <p className="rp-kicker">The first version · what Emergent built</p>
          <h2 className="rp-title">Everything the AI built, screen by screen.</h2>
          <p className="rp-lede">One AI pass produced all of this. Move through the screens — <b>this is what I’m redesigning from</b>, not the finished product.</p>
          <GroveScreenGallery screens={SCREENS} />
        </div>
      </section>

      {/* THE REDESIGN — Emergent → focused, evidence-backed direction */}
      <section className="rp-section" id="grove-decisions">
        <div className="rp-wrap">
          <p className="rp-kicker">The redesign · what changes and why</p>
          <h2 className="rp-title">Three features, one decision each.</h2>
          <span className="rp-inprogress">In progress · Phase 2 of 3</span>
          <p className="rp-lede" style={{ marginTop: "1.1rem" }}>
            Here’s each must-have feature: the screen Emergent built, and what the redesign does instead.
          </p>
          {DECISIONS.map((d) => (
            <div className="rp-decision rp-reveal" key={d.feature}>
              <p className="rp-decision__feature">{d.feature}</p>
              <div className="rp-decision__pair">
                <div className="rp-decision__col">
                  <span className="rp-decision__tag rp-decision__tag--old">Emergent built</span>
                  <div className="rp-device" style={{ background: d.oldBg }}>
                    <img src={`/assets/grove/${d.old}`} alt={d.oldAlt} loading="lazy" />
                  </div>
                </div>
                <div className="rp-decision__col rp-decision__col--dir">
                  <span className="rp-decision__tag rp-decision__tag--new">The decision</span>
                  <p className="rp-decision__dirText">{d.why}</p>
                </div>
              </div>
            </div>
          ))}
          <p className="rp-note" style={{ marginTop: "clamp(2rem, 5vw, 3.5rem)" }}>
            <span className="rp-note__k">What remains</span>
            Every screen shown above is the real Emergent build I’m redesigning from. The direction
            is decided and traced to the survey; I’m building the high-fidelity redesign screens now,
            and the social layer isn’t built yet. That’s the honest state of Phase 2 of 3.
          </p>
        </div>
      </section>

      <GroveDecisionStory />

      {/* FULL-BLEED PULL QUOTE */}
      <section className="rp-quote">
        <blockquote className="rp-reveal">
          Plant care should feel{" "}
          <span className="rp-underline">
            peaceful
            <svg viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M4,13 C50,4 96,18 150,10 C208,3 252,16 296,7" />
            </svg>
          </span>
          , not stressful.
        </blockquote>
        <cite>— one plant owner, unprompted, in the survey</cite>
      </section>

      {/* AI DECISION DEEP-DIVE */}
      <section className="rp-section rp-override" id="grove-override">
        <div className="rp-wrap">
          <p className="rp-kicker">Where I said no to the AI</p>
          <h2 className="rp-title">Reminders that never nag.</h2>
          <p className="rp-lede">
            The AI wanted urgency — guilt, streaks, “your plant is counting on you.” I said no.
            Reminders should help, not guilt.
          </p>
          <div className="rp-pushback rp-reveal">
            <div className="rp-notif rp-notif--ai">
              <p className="rp-notif__tag">What the AI wanted</p>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · now</span><p className="rp-notif__msg">I’m thirsty. Why did you forget me?</p></div>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 2h ago</span><p className="rp-notif__msg">Your Pothos is struggling. Don’t let it down.</p></div>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 5h ago</span><p className="rp-notif__msg">3 plants are counting on you today.</p></div>
            </div>
            <div className="rp-pushback__vs" aria-hidden="true">instead ↓</div>
            <div className="rp-notif rp-notif--me">
              <p className="rp-notif__tag">What I’m designing instead</p>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 8:00 AM</span><p className="rp-notif__msg">Good morning. One thing today — your Fiddle Leaf could use a little water.</p></div>
            </div>
          </div>

          <h3 className="rp-subhead">All five calls, in full</h3>
          <div className="rp-accordion rp-reveal">
            {OVERRIDES.map((o, i) => (
              <details className="rp-acc" key={o.topic}>
                <summary><span className="rp-acc__num">{String(i + 1).padStart(2, "0")}</span> {o.topic}</summary>
                <div className="rp-acc__body">
                  <p className="rp-acc__line rp-acc__ai"><b>AI wanted</b>{o.ai}</p>
                  <p className="rp-acc__line rp-acc__me"><b>I chose</b>{o.me}</p>
                  <p className="rp-acc__why">{o.why}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDATION / SYSTEM — locked principles + to-document slots */}
      <section className="rp-section" id="grove-system">
        <div className="rp-wrap">
          <p className="rp-phase">Foundation <span>· the system</span></p>
          <h2 className="rp-title" style={{ marginTop: ".4rem" }}>The system underneath.</h2>
          <p className="rp-lede">The decisions that hold Grove together — its palette, type, principles, and three interactive trust specimens. Click a token to copy it.</p>
          <GroveSystemLab />
          <h3 className="rp-subhead">Type scale</h3>
          <div className="rp-typescale">
            <div className="rp-type">
              <span className="rp-type__label">Display · Archivo 800</span>
              <span style={{ fontSize: "2.1rem", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1 }}>Calm, not stressful</span>
            </div>
            <div className="rp-type">
              <span className="rp-type__label">Body · Archivo 400</span>
              <span style={{ fontSize: "1rem", color: "var(--ink-2)" }}>One clear task a day, from a calm morning summary — never a pile of guilt.</span>
            </div>
            <div className="rp-type">
              <span className="rp-type__label">Label · Space Mono</span>
              <span style={{ fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".78rem" }}>Healthy · due · overdue</span>
            </div>
          </div>

          <h3 className="rp-subhead">Decision log</h3>
          <div className="rp-code" role="img" aria-label="A decision-log entry: the AI proposed urgency and guilt; the human override was one calm morning summary.">
            <div className="rp-code__bar">
              <span className="rp-code__dot" style={{ background: "#ef8a7a" }} />
              <span className="rp-code__dot" style={{ background: "#e6c07a" }} />
              <span className="rp-code__dot" style={{ background: "#9ccb7a" }} />
              <span className="rp-code__name">decision-log.json</span>
            </div>
            <pre>
{"{\n  "}<span className="k">"decision"</span>{": "}<span className="s">"reminders.tone"</span>{",\n  "}<span className="k">"ai_proposed"</span>{": "}<span className="s">"urgency + guilt"</span>{",\n  "}<span className="k">"human_override"</span>{": "}<span className="s">"one calm morning summary"</span>{",\n  "}<span className="k">"rationale"</span>{": "}<span className="s">"guilt-based reminders drive uninstalls"</span>{",\n  "}<span className="k">"overruled"</span>{": "}<span className="b">true</span>{"\n}"}
            </pre>
          </div>

          <h3 className="rp-subhead">Locked principles</h3>
          <div className="rp-foundation rp-reveal">
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">One task a day</p><p className="rp-fcard__d">A new user only ever sees one decision per screen.</p></div>
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">Grouped by where they live</p><p className="rp-fcard__d">Plants grouped by room, never one long overwhelming list.</p></div>
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">The AI can always be overruled</p><p className="rp-fcard__d">A person has the final call on every automated decision.</p></div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="rp-section rp-outcomeStage" id="grove-outcomes">
        <div className="rp-wrap">
          <p className="rp-kicker">Where it stands</p>
          <h2 className="rp-title">Judgment, not just screens.</h2>
          <p className="rp-lede">
            What exists so far isn’t a prettier app — it’s a more honest first version, a clear
            hypothesis to test with real people, and a decision log showing where AI accelerates the
            work and where a human has to overrule it.
          </p>
          <p className="rp-disclaimer">No invented numbers · Grove is a live prototype, Phase 2 of 3</p>
          <div className="rp-outcomes rp-reveal">
            {OUTCOMES.map((o) => (
              <div className="rp-stat" key={o.n}>
                <p className="rp-stat__n">{o.n}</p>
                <p className="rp-stat__l">{o.l}</p>
              </div>
            ))}
          </div>
          <div className="rp-routeRecap rp-reveal" aria-label="AI versus judgment, in one line">
            <span>AI: fast, wide, confident</span>
            <i aria-hidden="true">→</i>
            <span>Me: narrow, calm, accountable</span>
            <i aria-hidden="true">→</i>
            <span>3 features kept, 5 calls overruled</span>
            <i aria-hidden="true">→</i>
            <strong>That’s Grove</strong>
          </div>
          <div className="rp-note rp-reveal">
            <p className="rp-note__k">What the three phases mean</p>
            <p>
              Phase 1 was the first AI-built version and the 32-person survey this redesigns from.
              Phase 2 is the decisions on this page. Phase 3 is finishing the high-fidelity care and
              plant-ID screens, testing them with owners, and documenting the edge states. Social
              discovery stays out until the core care loop earns trust.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Building a product people have to trust?</h2>
          <p>
            The difference isn’t using AI — it’s knowing when to trust it and when to say no. That’s
            the work I want to do more of.
          </p>
          {/* Same action and wording as MSK and Mobbin — the three studies form
              a loop, so the closing move should not change between them. */}
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Send me a note →</a>
          <ThanksShare />
        </div>
      </section>

      {/* NEXT CASE STUDY */}
      <Link className="rp-next" to="/case-study/msk">
        <div className="rp-next__inner">
          <div>
            <p className="rp-next__eyebrow">Next case study</p>
            <p className="rp-next__title">Memorial Sloan Kettering</p>
            <p className="rp-next__tag">UX · healthcare systems · 21,000 clinicians and staff</p>
          </div>
          <span className="rp-next__arrow" aria-hidden="true">→</span>
        </div>
      </Link>

    </main>
  );
}
