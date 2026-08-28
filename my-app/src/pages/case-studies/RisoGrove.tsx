import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import GroveScreenGallery from "../../components/riso/GroveScreenGallery";
import GroveSystemLab from "../../components/riso/GroveSystemLab";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import PhaseIndicator from "../../components/riso/PhaseIndicator";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { GROVE_ES } from "../../data/spanishCaseStudies";
import usePageTitle from "../../hooks/usePageTitle";
import { wireRevealObservers } from "../../hooks/useFlagshipReveal";
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
  { id: "grove-start", label: "Start", note: "One designer, end to end" },
  { id: "grove-research", label: "Research", note: "34 real opinions" },
  { id: "grove-decisions", label: "Decisions", note: "Three features, one call each" },
  { id: "grove-override", label: "Product calls", note: "Evidence, risk, next test" },
  { id: "grove-outcomes", label: "Outcomes", note: "No invented numbers" },
];

const SURVEY_FINDINGS = [
  { stat: "74%", label: "picked smart care reminders as a launch dealbreaker — 25 of 34, the clear top answer" },
  { stat: "56%", label: "wanted to point a camera at a plant and have the app just tell them what it is" },
  { stat: "11", label: "of 34 named notification volume, unprompted, as what would make them delete it — the most-cited reason by far" },
  { stat: "2.4", label: "out of 5: how confident new owners felt about light (n=16). Experienced owners rated themselves 3.3" },
];

const MVP_FEATURES = [
  { feature: "Smart care reminders", pct: 74, tier: "core" },
  { feature: "AI plant identification (camera)", pct: 56, tier: "core" },
  { feature: "AI photo diagnosis", pct: 50, tier: "core" },
  { feature: "Growth photo journal", pct: 24, tier: "post" },
  { feature: "Stylized room / light map", pct: 24, tier: "post" },
  { feature: "Greenhouse encyclopedia", pct: 21, tier: "post" },
  { feature: "Community forums", pct: 18, tier: "post" },
  { feature: "Bulk logging", pct: 15, tier: "post" },
  { feature: "Bouquet scanner", pct: 9, tier: "post" },
  { feature: "Verified swapping", pct: 9, tier: "post" },
  { feature: "Wishlist tracker", pct: 3, tier: "post" },
];

const OUTCOMES = [
  { n: "34", l: "plant owners surveyed before any screen changed" },
  { n: "3", l: "features that earn the download; everything else waits" },
  { n: "5", l: "product calls made explicit, including one care-logic mistake" },
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
    oldAlt: "First-build care screen leading with a daily mission and a feed",
    oldBg: "#f5f0ea",
    why: "Replace mission-and-feed urgency with one calm morning summary.",
  },
  {
    feature: "Plant ID by camera",
    old: "grove-live-add.jpg",
    oldAlt: "First-build add-plant screen giving a single confident identification",
    oldBg: "#31302e",
    why: "Show top guesses, confidence, and sources—not one false verdict.",
  },
  {
    feature: "Personality, not points",
    old: "grove-live-personality.jpg",
    // "leaderboard" removed 2026-08-03 for the same reason as "forums" — no
    // occurrence anywhere in the Grove repo's history. Badges and streaks are
    // real (203 and 56 references in grove-frontend), so the point stands
    // without the invented third item.
    oldAlt: "First-build personality screen with badges and streaks",
    oldBg: "#f5f0ea",
    why: "Keep plant personality; remove scorekeeping that turns care into paperwork.",
  },
];

// Decisions from the first build, with one correction still being designed.
const OVERRIDES: Array<{ topic: string; ai: string; me: string; why: string; next?: boolean }> = [
  { topic: "Reminder tone", ai: "Guilt and urgency: “your plant misses you.”", me: "One calm morning summary.", why: "Notifications are the #1 reason people delete a plant app." },
  { topic: "Gamification", ai: "Badges and streaks.", me: "An AI plant personality you earn: a feeling, not points.", why: "Care that feels like paperwork is the top reason people quit. A streak also rewards watering every day, while overwatering is the most common way people kill houseplants. The optimal play would kill the subject of the product. The honest cost: calm should show lower 7-day engagement than streaks would. I’d take that trade if 90-day retention holds. If it doesn’t, the mechanic was doing work I underestimated, and I’d rather find that out than assume it." },
  { topic: "Plant ID confidence", ai: "One confident answer, every time.", me: "Top guesses, how sure it is, and its sources.", why: "False certainty is the fastest way to lose trust." },
  { topic: "Pet safety", ai: "Generic care tips.", me: "Toxic-to-pets warnings the moment you add a plant, with sources.", why: "New owners raised it unprompted, before I ever asked. When a plant can hurt a cat, a wrong guess isn’t a suggestion. It’s a risk." },
  { topic: "Notification frequency", ai: "Nudge whenever engagement dips.", me: "One summary per group; only true emergencies interrupt.", why: "A reminder can never become the reason someone leaves." },
  { topic: "Watering schedule", next: true, ai: "A fixed calendar, with every plant on its own repeating interval and days overdue.", me: "The reminder asks you to check, not to water: “Fiddle Leaf: check the top inch.” Two taps: watered, or not yet.", why: "Overwatering kills more houseplants than neglect, and a fixed interval is exactly how it happens. My own care guide already says “water when the top inch is dry.” The reminder engine never caught up to it. Asking you to check makes the reminder correct, makes seasonality free, and turns “smart care reminders” from a label into a mechanism. This is the one I got wrong in the same direction as the first build: I corrected its tone five times and never once its logic." },
];

// Share, then confirm only what actually happened — shared, copied, or a way to
// recover. Cancelling the share sheet says nothing celebratory.
type ShareOutcome = "shared" | "copied" | "error" | null;
// Icon and text are separate so the emoji can be hidden from screen readers —
// this string is announced through an aria-live region.
const SHARE_MESSAGE: Record<Exclude<ShareOutcome, null>, { icon?: string; text: string }> = {
  shared: { icon: "🌱", text: "thanks for sharing." },
  copied: { icon: "🌱", text: "link copied." },
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
  usePageTitle("Grove — Research-to-Scope Case Study");
  const { lang } = useLanguage();

  // Let a direct chapter URL land after the lazy route and global route-focus
  // work have committed. Same-page chapter links already use native anchors;
  // this closes the cold-load case used for owner review and shared links.
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Scroll-reveal — fade/rise sections in as they enter view (Carmen-style
  // motion). Shared with useFlagshipReveal/CuratedRolePage so the reveal +
  // proximity-armed failsafe logic (and any future fix to it) lives in one
  // place — see hooks/useFlagshipReveal.ts.
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".riso-page");
    if (!root) return;
    return wireRevealObservers(root);
  }, []);

  // Route legs: highlight + wiggle the pin as each crosses the viewport centre.
  // Fires once per leg. Toggling meant the wiggle replayed every time someone
  // scrolled back up to re-find their place — a repeated attention-grab at
  // exactly the moment attention has already been lost.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
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
    return () => legIo.disconnect();
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
    const draw = () => {
      const r = quote.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.66; // starts a bit later — as your eye reaches it
      const end = vh * 0.44; // fully drawn near centre
      const p = Math.max(0, Math.min(1, (start - r.top) / (start - end)));
      path.style.strokeDashoffset = String(1 - p);
    };

    // Reads layout (getBoundingClientRect) and then writes style on the same
    // element. Left on the raw scroll event that is a read/write cycle per
    // event; batching into one frame keeps it to a single layout pass.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        draw();
      });
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={GROVE_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--grove" lang="en">
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>Grove</span>
      </nav>

      <CaseStudyChapters project="Grove" chapters={CHAPTERS} />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      {/* HERO */}
      <header className="rp-hero" id="grove-start" data-language-anchor="grove-start">
        <CartoField
          mapSrc="/riso/elevation-02.jpg"
          edition="pine"
          mapZoom={1.15}
          mapPosition="60% 42%"
          secondaryMapSrc="/riso/elevation-03.jpg"
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Grove · sole designer · functional prototype</span>
            <h1 className="rp-h1">Eleven features became three.</h1>
            <span className="rp-readtime">
              <b>5 min</b>
              <span>read · one designer, end to end</span>
            </span>
            <p className="rp-sub">
              A 5-user moderated test showed people got lost; a 34-person survey then narrowed eleven features to three.
              I am the sole designer; <b>Phase 2 is in progress</b>.
            </p>
            <dl className="rp-heroEvidence" aria-label="Grove case evidence at a glance">
              <div><dt>Role</dt><dd>Sole product designer · end to end</dd></div>
              <div><dt>Method</dt><dd>5-user moderated test → 34-person survey</dd></div>
              <div><dt>Decision</dt><dd>11 features → 3 launch priorities</dd></div>
              <div><dt>State</dt><dd>Phase 2 of 3 · functional prototype</dd></div>
            </dl>
            <a className="rp-cta" href="#grove-research">
              See the rebuild →
            </a>
          </div>
        </div>
        <div className="rp-hero__media" data-evidence="true">
          <div className="rp-device">
            <img src="/assets/grove/grove1.png" alt="Grove mobile welcome screen" />
          </div>
          <div className="rp-heroNote rp-heroNote--reminder" aria-hidden="true">
            <span>GROVE JOURNAL · DAY 12</span>
            <b>Your Fiddle Leaf could use a little water.</b>
          </div>
        </div>
      </header>

      {/* PROBLEM */}
      <section className="rp-section" id="grove-research" data-language-anchor="grove-research">
        <div className="rp-wrap">
          <div className="rp-split rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "0ms" } as React.CSSProperties}>
            <div className="rp-split__text">
              <p className="rp-kicker">Where this starts</p>
              <h2 className="rp-title">Plant parents forget. Then they feel guilty.</h2>
              <p className="rp-lede">The job: one calm next action, with visible uncertainty when a wrong answer can cause harm.</p>
            </div>
            <div className="rp-split__media">
              <div className="rp-device rp-device--app">
                <img src="/assets/grove/grove-live-care.jpg" alt="Grove daily care — one clear task a day, overdue plants surface first, no shaming" />
              </div>
            </div>
          </div>

          <h3 className="rp-subhead">A moderated test found the confusion first</h3>
          <p className="rp-lede">March–May 2026, 5 users: people stalled when care led with a feed and a mission, not their plants. Five people were enough to see something was wrong, not enough to say what to build instead — that's what the survey went on to answer.</p>

          <h3 className="rp-subhead">What those 34 people actually said</h3>
          <p className="rp-lede">34 owners · May 22–July 8, 2026 · choose three launch dealbreakers.</p>
          <dl className="rp-surveyStats rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "90ms" } as React.CSSProperties}>
            {SURVEY_FINDINGS.map((f) => (
              <div key={f.stat}>
                <dt>{f.stat}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>

          <aside className="rp-note rp-reveal" aria-label="Grove research evidence boundary" style={{ "--rp-reveal-stagger": "180ms" } as React.CSSProperties}>
            <span className="rp-note__k">What this evidence can say</span>
            <p>Self-report prioritized the next build; it does not prove behavior or demand. The moderated test that came before it (March–May 2026) showed people were confused, not what to build instead — its task records aren't preserved, so no broader claim is made from either study.</p>
          </aside>

          <h3 className="rp-subhead">What they wanted, and what waited</h3>
          <p className="rp-lede">The top three entered the core. Eight features waited.</p>
          <ol className="rp-rank rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "270ms" } as React.CSSProperties}>
            {MVP_FEATURES.map((f) => (
              <li key={f.feature} className={f.tier === "core" ? "is-core" : undefined}>
                <span className="rp-rank__label">{f.feature}</span>
                <span className="rp-rank__track" aria-hidden="true"><i style={{ width: `${f.pct}%` }} /></span>
                <b className="rp-rank__pct">{f.pct}%</b>
                <span className={`rp-badge rp-badge--tier${f.tier === "core" ? " is-core" : ""}`}>{f.tier === "core" ? "Core" : "Later"}</span>
              </li>
            ))}
          </ol>

          <figure className="rp-quoteCard rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "360ms" } as React.CSSProperties}>
            <blockquote>“Any generative AI in this will remove any sense of trust.”</blockquote>
            <figcaption>
              Florist · unprompted. I removed AI-written care sheets from scope.
            </figcaption>
          </figure>
        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span>Optional artifact set</span>
          <b>Inspect all six authentic first-build screens</b>
        </summary>
        <section className="rp-section" data-language-anchor="grove-decisions">
          <div className="rp-wrap">
            <p className="rp-kicker">The first working version</p>
            <h2 className="rp-title">The complete first build, screen by screen.</h2>
            <p className="rp-lede">Authentic prototype screens—not finished redesigns.</p>
            <div data-evidence="true"><GroveScreenGallery screens={SCREENS} /></div>
          </div>
        </section>
      </details>

      {/* THE REDESIGN — Emergent → focused, evidence-backed direction */}
      <section className="rp-section" id="grove-decisions" data-language-anchor="grove-decisions">
        <div className="rp-wrap">
          <p className="rp-kicker">The redesign · what changes and why</p>
          <h2 className="rp-title">Three features, one decision each.</h2>
          <PhaseIndicator current={2} label="In progress · Phase 2 of 3" />
          <p className="rp-lede" style={{ marginTop: "1.1rem" }}>One existing screen. One evidence-backed change.</p>
          {DECISIONS.map((d) => (
            <div className="rp-decision rp-reveal" key={d.feature} data-evidence="true">
              <p className="rp-decision__feature">{d.feature}</p>
              <div className="rp-decision__pair">
                <div className="rp-decision__col">
                  <span className="rp-decision__tag rp-decision__tag--old">First build</span>
                  <div className="rp-device rp-device--app" style={{ background: d.oldBg }}>
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
            Authentic first-build screens. High-fidelity redesign and social layer remain unbuilt. Phase 2 of 3.
          </p>
        </div>
      </section>

      {/* AI DECISION DEEP-DIVE */}
      <section className="rp-section rp-override" id="grove-override" data-language-anchor="grove-override">
        <div className="rp-wrap">
          <p className="rp-kicker">How the evidence changed the build</p>
          <h2 className="rp-title">Reminders that protect the care task.</h2>
          <p className="rp-lede">Remove guilt. Preserve one useful next action.</p>
          <div className="rp-pushback rp-reveal" data-evidence="true">
            <div className="rp-notif rp-notif--ai">
              <p className="rp-notif__tag">First build</p>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · now</span><p className="rp-notif__msg">I’m thirsty. Why did you forget me?</p></div>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 2h ago</span><p className="rp-notif__msg">Your Pothos is struggling. Don’t let it down.</p></div>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 5h ago</span><p className="rp-notif__msg">3 plants are counting on you today.</p></div>
            </div>
            <div className="rp-pushback__vs" aria-hidden="true">instead ↓</div>
            <div className="rp-notif rp-notif--me">
              <p className="rp-notif__tag">Next design</p>
              <div className="rp-notif__card"><span className="rp-notif__app">Grove · 8:00 AM</span><p className="rp-notif__msg">Good morning. One thing today: check the top inch of your Fiddle Leaf.</p></div>
            </div>
          </div>

          <h3 className="rp-subhead">The trust decision</h3>
          <p className="rp-lede">
            A florist, unprompted: “Any generative AI in this will remove any sense of trust.”
            She wasn't alone—4 of 34 said they'd trust no AI feature in the app at all, and 19 of 34
            said explaining why the AI made a call is what would earn their trust. Plant ID carried
            that risk directly, so instead of one confident answer, it shows top guesses, how sure it
            is, and its sources. False certainty is the fastest way to lose trust.
          </p>

          <h3 className="rp-subhead">All six calls, in full</h3>
          <div className="rp-accordion rp-reveal" data-evidence="true">
            {OVERRIDES.map((o, i) => (
              <details className="rp-acc" key={o.topic}>
                <summary>
                  <span className="rp-acc__num">{String(i + 1).padStart(2, "0")}</span> {o.topic}
                  {o.next && <span className="rp-acc__next">designing now</span>}
                </summary>
                <div className="rp-acc__body">
                  <p className="rp-acc__line rp-acc__ai"><b>First build</b>{o.ai}</p>
                  <p className="rp-acc__line rp-acc__me"><b>{o.next ? "Next design" : "Decision"}</b>{o.me}</p>
                  <p className="rp-acc__why">{o.why}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The specimen library is valuable to a design-systems reviewer, but it
          is secondary to the research-to-decision story. Keep it inspectable
          without charging every recruiter the full scroll cost. */}
      <details className="rp-deepDive rp-deepDive--system">
        <summary>
          <span>Optional system detail</span>
          <b>Inspect the tokens, components, and interaction specimens</b>
        </summary>
        <section className="rp-section" data-language-anchor="grove-override">
          <div className="rp-wrap">
          <p className="rp-phase">Foundation <span>· the system</span></p>
          <h2 className="rp-title" style={{ marginTop: ".4rem" }}>The system underneath.</h2>
          <p className="rp-lede">Palette, type, principles, and three interactive specimens.</p>
          <div data-evidence="true"><GroveSystemLab /></div>
          <h3 className="rp-subhead">Type scale</h3>
          <div className="rp-typescale" data-evidence="true">
            <div className="rp-type">
              <span className="rp-type__label">Display · Archivo 800</span>
              <span style={{ fontSize: "2.1rem", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 1 }}>Calm, not stressful</span>
            </div>
            <div className="rp-type">
              <span className="rp-type__label">Body · Archivo 400</span>
              <span style={{ fontSize: "1rem", color: "var(--ink-2)" }}>One clear task a day. A calm morning summary, never a pile of guilt.</span>
            </div>
            <div className="rp-type">
              <span className="rp-type__label">Label · Space Mono</span>
              <span style={{ fontFamily: "var(--mono)", textTransform: "uppercase", letterSpacing: ".14em", fontSize: ".78rem" }}>Healthy · due · overdue</span>
            </div>
          </div>

          <h3 className="rp-subhead">The decision record</h3>
          <dl className="rp-decisionRecord" data-evidence="true">
            <div><dt>First build</dt><dd>Water on a fixed calendar.</dd></div>
            <div><dt>What broke</dt><dd>The interface rewarded overwatering.</dd></div>
            <div><dt>Next design</dt><dd>Check the top inch. Then log watered or not yet.</dd></div>
            <div><dt>Next test</dt><dd>Plant health and 90-day retention, not reminder taps.</dd></div>
          </dl>

          <h3 className="rp-subhead">Locked principles</h3>
          <div className="rp-foundation rp-reveal" data-evidence="true">
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">One task a day</p><p className="rp-fcard__d">A new user only ever sees one decision per screen.</p></div>
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">Grouped by where they live</p><p className="rp-fcard__d">Plants grouped by room, never one long overwhelming list.</p></div>
            <div className="rp-fcard"><p className="rp-fcard__k">Principle · locked</p><p className="rp-fcard__t">Automated advice stays reviewable</p><p className="rp-fcard__d">A person has the final call on every uncertain recommendation.</p></div>
          </div>
          </div>
        </section>
      </details>

      {/* OUTCOMES */}
      <section className="rp-section rp-outcomeStage" id="grove-outcomes" data-language-anchor="grove-outcomes">
        <div className="rp-wrap">
          <p className="rp-kicker">Where it stands</p>
          <h2 className="rp-title">A focused prototype with an honest next test.</h2>
          <p className="rp-lede">Phase 2 is a testable hypothesis plus an explicit decision record.</p>
          <p className="rp-bridge">
            <span>Why a plant app</span>
            Confidence, provenance, and review states make uncertainty actionable. Plants are the low-stakes practice ground.
          </p>
          <p className="rp-disclaimer">No invented numbers · Grove is a functional prototype, Phase 2 of 3</p>
          <div className="rp-outcomes rp-reveal" data-evidence="true">
            {OUTCOMES.map((o) => (
              <div className="rp-stat" key={o.n}>
                <p className="rp-stat__n">{o.n}</p>
                <p className="rp-stat__l">{o.l}</p>
              </div>
            ))}
          </div>
          <p className="rp-routeVerdict rp-reveal" data-evidence="true">
            <b>I got the care logic wrong before I got the interface right.</b>
            The next prototype tests whether a check-first reminder protects the plant without costing long-term use.
          </p>
          <div className="rp-note rp-reveal">
            <p className="rp-note__k">What the three phases mean</p>
            <p>1: first build + survey. 2: decisions shown here. 3: high-fidelity screens, owner testing, and edge states.</p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Building a product people have to trust?</h2>
          <p>
            I want to keep designing products that make uncertainty visible and reviewable.
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
