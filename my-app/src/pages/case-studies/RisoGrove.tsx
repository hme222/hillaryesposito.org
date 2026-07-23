import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RisoDefs from "../../components/riso/RisoDefs";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";

/**
 * Grove — case study in the Risograph Cartography system.
 * Structure follows the Carmen Elena / Pilgrimz arc: hero-plate hook →
 * concise problem → phased "route" (each leg = mission + detail + impact) →
 * before/after → benefit-driven outcomes → conversational CTA.
 * Lives at /riso/grove (the live /case-study/grove is untouched).
 */

const LEGS = [
  {
    n: "01",
    mission: "An AI tool built the whole app",
    detail:
      "Emergent generated Grove in one pass — every feature at once: a social feed, badges, daily “missions,” forums, plant swaps. Wide, fast, and packed.",
    impact: "Feature-complete, focus-empty",
  },
  {
    n: "02",
    mission: "A 5-user test showed the map was wrong",
    detail:
      "People opened it and stalled. The care screen led with a social feed and a mission, not their plants. Overloaded, unclear — the information architecture was off.",
    impact: "Cluttered, unclear",
  },
  {
    n: "03",
    mission: "A 32-person survey found the three that matter",
    detail:
      "I asked what actually earns a plant app a spot on the phone. The answer was small: calm reminders, plant ID by camera, real help with light. Forums ranked near the bottom (23%).",
    impact: "3 must-haves, not 30",
  },
  {
    n: "04",
    mission: "Redesign around trust",
    detail:
      "Strip it back to what earns trust: reminders that never nag, AI that shows its sources, pet-safety warnings, and a person who can always overrule the AI. Calm, not busy.",
    impact: "Phase 2 of 3",
    now: true,
  },
];

const OUTCOMES = [
  { n: "32", l: "plant owners surveyed before I redesigned a single screen" },
  { n: "3", l: "features that actually earn the download — everything else waits" },
  { n: "5", l: "calls the AI wanted to make that I overruled to keep trust" },
];

const SCREENS = [
  { src: "grove-live-collection.jpg", cap: "Your collection", bg: "#f5f0ea" },
  { src: "grove-live-add.jpg", cap: "Add a plant", bg: "#31302e" },
  { src: "grove-live-care.jpg", cap: "Daily care", bg: "#f5f0ea" },
  { src: "grove-live-journal.jpg", cap: "Care journal", bg: "#f5f0ea" },
  { src: "grove-live-personality.jpg", cap: "Plant personality", bg: "#f5f0ea" },
  { src: "grove-live-greenhouse.jpg", cap: "Greenhouse", bg: "#f5f0ea" },
];

// Emergent → redesign, per must-have feature. The "after" is a placeholder
// (dashed slot) — drop the redesigned screen in once it exists.
const DECISIONS = [
  {
    feature: "Reminders",
    old: "grove-live-care.jpg",
    oldBg: "#f5f0ea",
    why: "Emergent led with a daily “mission” and a feed. The redesign makes it one calm morning summary — never a nag, never guilt.",
    hint: "Your redesigned care screen",
  },
  {
    feature: "Plant ID by camera",
    old: "grove-live-add.jpg",
    oldBg: "#31302e",
    why: "The AI identified plants with false confidence. The redesign shows its top guesses, how sure it is, and its sources — a guess, not a verdict.",
    hint: "Your redesigned ID screen",
  },
  {
    feature: "Personality, not points",
    old: "grove-live-personality.jpg",
    oldBg: "#f5f0ea",
    why: "Badges, streaks, and a leaderboard made care feel like paperwork. The redesign keeps the AI plant personality and cuts the rest.",
    hint: "Your redesigned profile screen",
  },
];

// On-theme scroll progress — a route you walk, coral pin descending.
function RouteProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, Math.round((h.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="rp-progress" aria-hidden="true">
      <span className="rp-progress__cap">Route</span>
      <div className="rp-progress__track">
        <div className="rp-progress__fill" style={{ height: `${pct}%` }} />
        <div className="rp-progress__pin" style={{ top: `${pct}%` }} />
      </div>
      <span className="rp-progress__pct">{pct}%</span>
    </div>
  );
}

// Live component (Carmen-style): click a token to copy its hex.
function Swatches() {
  // Grove's own semantic palette — the colours that carry meaning in the app.
  const tokens = [
    { name: "Healthy green", hex: "#3A6B2E", use: "Actions · a thriving plant" },
    { name: "Due amber", hex: "#C68A2E", use: "Needs attention soon" },
    { name: "Overdue rose", hex: "#BC5A78", use: "Overdue — flagged, never shaming" },
    { name: "Calm cream", hex: "#F5F0EA", use: "The surface everything rests on" },
  ];
  const [copied, setCopied] = useState<number | null>(null);
  const copy = (hex: string, i: number) => {
    navigator.clipboard?.writeText(hex).catch(() => {});
    setCopied(i);
    window.setTimeout(() => setCopied((c) => (c === i ? null : c)), 1400);
  };
  return (
    <div className="rp-swatches">
      {tokens.map((t, i) => (
        <button
          type="button"
          className={`rp-swatch${copied === i ? " is-copied" : ""}`}
          key={t.hex}
          onClick={() => copy(t.hex, i)}
          title="Click to copy"
        >
          <span className="rp-swatch__chip" style={{ background: t.hex }} />
          <span className="rp-swatch__meta">
            <span className="rp-swatch__name">{t.name}</span>
            <span className="rp-swatch__hex">{copied === i ? "Copied ✓" : t.hex}</span>
            <span className="rp-swatch__use">{t.use}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

// The five calls I overruled the AI on — progressive-disclosure accordion.
const OVERRIDES = [
  { topic: "Reminder tone", ai: "Guilt and urgency — “your plant misses you.”", me: "One calm morning summary.", why: "Too many notifications is the #1 reason people delete a plant app." },
  { topic: "Gamification", ai: "Badges, streaks, and a leaderboard.", me: "An AI plant personality you earn — a feeling, not points.", why: "Care that feels like paperwork is the #1 reason people quit." },
  { topic: "Plant ID confidence", ai: "One confident answer, every time.", me: "Top guesses, how sure it is, and its sources.", why: "False certainty is how an AI loses trust the fastest." },
  { topic: "Pet safety", ai: "Generic care tips.", me: "Toxic-to-pets warnings the moment you add a plant, with sources.", why: "When a plant can hurt a cat, a wrong guess isn’t a suggestion — it’s a risk." },
  { topic: "Notification frequency", ai: "Nudge whenever engagement dips.", me: "One summary per group; only true emergencies interrupt.", why: "A reminder can never become the reason someone leaves." },
];

const MARQUEE = [
  "Calm, not stressful",
  "One task a day",
  "Humans over algorithms",
  "Reduce the overwhelm",
  "Trust, not tricks",
  "What you already own",
];

// Share + a little "woohoo" celebration.
function ThanksShare() {
  const [woohoo, setWoohoo] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: "Grove — a case study by Hillary Esposito", url });
      else await navigator.clipboard?.writeText(url);
    } catch {
      /* user dismissed the share sheet — still celebrate the intent */
    }
    setWoohoo(true);
    window.setTimeout(() => setWoohoo(false), 2600);
  };
  return (
    <div className="rp-shareRow">
      <button type="button" className="rp-share" onClick={share}>Share this case study →</button>
      <span className={`rp-woohoo${woohoo ? " show" : ""}`} aria-live="polite">🌱 woohoo — thanks for sharing!</span>
    </div>
  );
}

export default function RisoGrove() {
  usePageTitle("Grove — Risograph Cartography");

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
    const legs = Array.from(document.querySelectorAll<HTMLElement>(".riso-page .rp-leg"));
    const legIo = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-active", e.isIntersecting)),
      { rootMargin: "-42% 0px -42% 0px" }
    );
    legs.forEach((el) => legIo.observe(el));

    return () => {
      io.disconnect();
      legIo.disconnect();
    };
  }, []);

  return (
    <main className="riso-page">
      <RisoDefs />
      <RouteProgress />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>Grove</span>
      </nav>

      {/* HERO */}
      <header className="rp-hero">
        <div className="rp-grain" />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Product design · AI judgment</span>
            <h1 className="rp-h1">Grove.</h1>
            <span className="rp-readtime"><b>4 min</b>&nbsp;read · a decision log, not a demo</span>
            <p className="rp-sub">
              A plant-care app an AI built in one pass. I tested it, surveyed 32 owners, and I’m
              rebuilding it around the one thing that keeps people: <b>trust</b>. (Phase 2 of 3.)
            </p>
            <Link className="rp-cta" to="/?scrollTo=contact">
              Walk the route →
            </Link>
            <div className="rp-tags">
              {["UX Design", "Product Design", "AI Judgment", "User Research", "Prototyping"].map((t) => (
                <span className="rp-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="rp-hero__media">
          <div className="rp-device">
            <img src="/assets/grove/grove-live-collection.jpg" alt="Grove — your plant collection, grouped by where they live" />
          </div>
          <div className="rp-rail">
            <span>PLANT CARE · AI</span>
            <span>SOLO DESIGNER</span>
            <span>32 SURVEYED</span>
            <span className="mark">◆ PHASE 2/3</span>
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section className="rp-section">
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
        </div>
      </section>

      {/* THE ROUTE */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <p className="rp-kicker">The route</p>
          <h2 className="rp-title">Four legs, from AI-built to trustworthy</h2>
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
      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">The first version · what Emergent built</p>
          <h2 className="rp-title">Everything the AI built, screen by screen</h2>
          <p className="rp-lede">One AI pass produced all of this — packed with features. Hover any screen. <b>This is what I’m redesigning from</b>, not the finished product; the survey decided what earns a place and what gets cut.</p>
          <div className="rp-strip rp-reveal">
            {SCREENS.map((s) => (
              <div className="rp-strip__item" key={s.src}>
                <div className="rp-strip__frame" style={{ background: s.bg }}>
                  <img src={`/assets/grove/${s.src}`} alt={`Grove — ${s.cap}`} loading="lazy" />
                </div>
                <p className="rp-strip__cap">{s.cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE REDESIGN — Emergent → redesign, with placeholders */}
      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">The redesign · what changes and why</p>
          <h2 className="rp-title">From what the AI built to what earns trust</h2>
          <span className="rp-inprogress">In progress · Phase 2 of 3</span>
          <p className="rp-lede" style={{ marginTop: "1.1rem" }}>
            The survey picked three features to build around. Here’s each one — what Emergent built,
            and where I’m taking it. The redesign screens drop in as I finish them.
          </p>
          {DECISIONS.map((d) => (
            <div className="rp-decision rp-reveal" key={d.feature}>
              <p className="rp-decision__feature">{d.feature}</p>
              <p className="rp-decision__why">{d.why}</p>
              <div className="rp-decision__pair">
                <div className="rp-decision__col">
                  <span className="rp-decision__tag rp-decision__tag--old">Emergent built</span>
                  <div className="rp-device" style={{ background: d.oldBg }}>
                    <img src={`/assets/grove/${d.old}`} alt={`Emergent ${d.feature} screen`} loading="lazy" />
                  </div>
                </div>
                <div className="rp-ba__arrow" aria-hidden="true">→</div>
                <div className="rp-decision__col">
                  <span className="rp-decision__tag rp-decision__tag--new">Where I’m taking it</span>
                  <div className="rp-placeholder">
                    <span className="rp-placeholder__icon" aria-hidden="true">▢</span>
                    <span className="rp-placeholder__label">Redesign — coming</span>
                    <span className="rp-placeholder__hint">{d.hint}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">What the AI built · where I took it</p>
          <h2 className="rp-title">The care screen stopped leading with a feed</h2>
          <div className="rp-ba rp-reveal">
            <div className="rp-ba__panel">
              <span className="rp-ba__label">Before · what the AI built</span>
              <div className="rp-ba__frame" style={{ background: "#f5f0ea" }}>
                <img src="/assets/grove/grove-live-care.jpg" alt="Emergent care screen — led with a daily mission and feed, not the plants" />
              </div>
              <p className="rp-ba__note">Opened on a social feed and “today’s mission.” Forums ranked near the bottom of the survey, at 23%.</p>
            </div>
            <div className="rp-ba__arrow" aria-hidden="true">→</div>
            <div className="rp-ba__panel">
              <span className="rp-ba__label">After · where I’m taking it</span>
              <div className="rp-ba__frame" style={{ background: "#1b2f15" }}>
                <img src="/assets/grove/grove1.png" alt="Redesigned Grove welcome screen — calm and pared back" />
              </div>
              <p className="rp-ba__note">Opens on plant care, not a feed. The brief one owner handed me for free: “peaceful, not stressful.”</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI DECISION DEEP-DIVE */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <p className="rp-kicker">Where I said no to the AI</p>
          <h2 className="rp-title">Reminders that never nag</h2>
          <p className="rp-lede">
            The AI wanted urgency — guilt, streaks, “your plant is counting on you.” I overruled it.
            A reminder can never become the reason someone quits.
          </p>
          <div className="rp-pushback rp-reveal">
            <div className="rp-notif rp-notif--ai">
              <p className="rp-notif__tag">What the AI wanted</p>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · now</span><p className="rp-notif__msg">I’m thirsty. Why did you forget me?</p></div>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 2h ago</span><p className="rp-notif__msg">Your Pothos is struggling. Don’t let it down.</p></div>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 5h ago</span><p className="rp-notif__msg">3 plants are counting on you today.</p></div>
            </div>
            <div className="rp-pushback__vs" aria-hidden="true">vs</div>
            <div className="rp-notif rp-notif--me">
              <p className="rp-notif__tag">What I’m designing instead</p>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 8:00 AM</span><p className="rp-notif__msg">Good morning. One thing today — your Fiddle Leaf could use a little water.</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDATION / SYSTEM — locked principles + to-document slots */}
      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-phase">Foundation <span>· the system</span></p>
          <h2 className="rp-title" style={{ marginTop: ".4rem" }}>The system underneath</h2>
          <p className="rp-lede">The decisions that hold Grove together — its palette, its type, its principles, and what I’ll document as the redesign settles. Click a token to copy it.</p>
          <Swatches />
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
          <div className="rp-foundation rp-reveal">
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">One task a day</p><p className="rp-fcard__d">A new user only ever sees one decision per screen.</p></div>
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">Grouped by where they live</p><p className="rp-fcard__d">Plants grouped by room, never one long overwhelming list.</p></div>
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">The AI can always be overruled</p><p className="rp-fcard__d">A person has the final call on every automated decision.</p></div>
            <div className="rp-fcard rp-fcard--todo"><p className="rp-fcard__k">To document</p><p className="rp-fcard__t">Color &amp; type tokens</p><p className="rp-fcard__d">Add the palette and type scale once the redesign locks.</p></div>
            <div className="rp-fcard rp-fcard--todo"><p className="rp-fcard__k">To document</p><p className="rp-fcard__t">Edge states</p><p className="rp-fcard__d">Empty, unsure-AI, coming-back, pet-toxic, too-many-reminders.</p></div>
            <div className="rp-fcard rp-fcard--todo"><p className="rp-fcard__k">To test</p><p className="rp-fcard__t">Moderated round 2</p><p className="rp-fcard__d">Re-test the redesign with real owners; log what breaks.</p></div>
          </div>
        </div>
      </section>

      {/* PHASE 3 — SOCIAL DISCOVERY (moving visual, in progress) */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <p className="rp-phase">What’s next <span>· social discovery</span></p>
          <h2 className="rp-title" style={{ marginTop: ".4rem" }}>Social discovery — once the basics are trusted</h2>
          <span className="rp-inprogress">Future direction · not before launch</span>
          <p className="rp-lede" style={{ marginTop: "1.1rem" }}>
            The social features Emergent built — forums, plant swaps — come back only after the core
            earns trust. When they do, this is where the moving prototype lives.
          </p>
          <div className="rp-placeholder rp-placeholder--wide rp-reveal">
            <span className="rp-placeholder__icon" aria-hidden="true">▢</span>
            <span className="rp-placeholder__label">Grove prototype — coming</span>
            <span className="rp-placeholder__hint">
              A short moving prototype of the social feed lives here once it’s built — recorded from
              Grove, never a stand-in.
            </span>
          </div>
          <div className="rp-features rp-reveal">
            <div className="rp-feature"><p className="rp-feature__n">01</p><p className="rp-feature__t">A feed built around places</p><p className="rp-feature__d">Discovery through where plants actually thrive — a windowsill, a shady corner — not a follower count.</p></div>
            <div className="rp-feature"><p className="rp-feature__n">02</p><p className="rp-feature__t">Light micro-feedback</p><p className="rp-feature__d">Quick, low-pressure tags instead of likes: “thriving,” “needs light,” “toxic to pets.”</p></div>
            <div className="rp-feature"><p className="rp-feature__n">03</p><p className="rp-feature__t">Shareable care cards</p><p className="rp-feature__d">A plant’s progress worth sending to a friend — outbound sharing, never a vanity metric.</p></div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="rp-section rp-section--alt">
        <div className="rp-wrap">
          <p className="rp-kicker">Where it stands</p>
          <h2 className="rp-title">Judgment, not just screens</h2>
          <p className="rp-lede">
            What exists so far isn’t a prettier app — it’s a more honest first version, a clear
            hypothesis to test with real people, and a decision log showing where AI accelerates the
            work and where a human has to overrule it.
          </p>
          <p className="rp-disclaimer">No invented numbers · Grove is a live prototype, phase 2 of 3</p>
          <div className="rp-outcomes rp-reveal">
            {OUTCOMES.map((o) => (
              <div className="rp-stat" key={o.n}>
                <p className="rp-stat__n">{o.n}</p>
                <p className="rp-stat__l">{o.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOVING BANNER */}
      <div className="rp-marquee" aria-hidden="true">
        <div className="rp-marquee__track">
          {[...MARQUEE, ...MARQUEE].map((p, i) => (
            <span className="rp-marquee__item" key={i}>{p}</span>
          ))}
        </div>
      </div>

      {/* CLOSING CTA */}
      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Building a product people have to trust?</h2>
          <p>
            The difference isn’t using AI — it’s knowing when to trust it and when to say no. That’s
            the work I want to do more of.
          </p>
          <Link className="rp-cta" to="/?scrollTo=contact">
            Let’s talk →
          </Link>
        </div>
      </section>

      {/* THANKS FOR READING */}
      <section className="rp-section rp-thanks rp-section--alt">
        <div className="rp-wrap rp-reveal">
          <p className="rp-kicker">Thanks for reading</p>
          <h2 className="rp-title">That’s Grove — so far.</h2>
          <p className="rp-lede">Calm over clever, humans over algorithms. If that’s your kind of product, I’d love to talk.</p>
          <ThanksShare />
        </div>
      </section>

      {/* NEXT CASE STUDY */}
      <Link className="rp-next" to="/case-study/msk">
        <div className="rp-next__inner">
          <div>
            <p className="rp-next__eyebrow">Next case study</p>
            <p className="rp-next__title">Memorial Sloan Kettering</p>
            <p className="rp-next__tag">UX · healthcare systems · 21,000 clinicians</p>
          </div>
          <span className="rp-next__arrow" aria-hidden="true">→</span>
        </div>
      </Link>

      {/* MADE WITH */}
      <footer className="rp-madewith">
        <div className="rp-madewith__inner">
          <p className="rp-madewith__k">Made with</p>
          <div className="rp-madewith__list">
            <span>Figma</span><span>Emergent</span><span>React</span><span>FastAPI</span><span>MongoDB</span>
            <span>32 real opinions</span><span>the word “no”</span><span>restraint</span><span>caffeine</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
