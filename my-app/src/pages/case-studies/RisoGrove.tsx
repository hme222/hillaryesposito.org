import CopyEmail from "../../components/CopyEmail";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter, chapterLabel } from "../../components/flagship/CaseStudyChapters";
import ResultLine from "../../components/flagship/ResultLine";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import PhaseIndicator from "../../components/riso/PhaseIndicator";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { GROVE_ES } from "../../data/spanishCaseStudies";
import CaseMore from "../../components/CaseMore";
import usePageTitle from "../../hooks/usePageTitle";
import { wireRevealObservers } from "../../hooks/useFlagshipReveal";
import "../../styles/riso-page.css";

// FloraGrove's own public waitlist page (the app's public invite target).
// This site never collects emails itself.
const WAITLIST_URL = "https://floragrove.app";

/**
 * FloraGrove — pre-launch page (rebuilt 2026-11-19 at Hillary's direction:
 * "just a pre-launch ... landing page for people to sign up and see prototype
 * video"). A short landing section, then a short research story.
 *
 * Removed on purpose, do not restore without asking her: every mention of the
 * AI app builder that made the first version, the "AI's job / My job" record,
 * "How I built the prototype", the design-system lab and Storybook link, the
 * decision-override table, the guilt-reminder comparison, and the outcome
 * tiles. GroveSystemLab still exists as a component; it just no longer renders
 * here.
 */

// The first entry anchors the landing section for active tracking; the chapter
// strip renders from the second onward.
const CHAPTERS: CaseStudyChapter[] = [
  { id: "grove-start", label: "Pre-launch" },
  { id: "grove-research", label: "First test" },
  { id: "grove-survey", label: "Survey" },
  { id: "grove-decisions", label: "Next" },
];

// Launch-dealbreaker picks ("choose three"), percent of all 37 responses,
// rounded half up. Recomputed 2026-10-19 with the Grove repo's
// docs/research/scripts/survey_stats.py; the Oct 16 responses (R36, R37) lifted the Greenhouse
// into a three-way tie at 22%; the trade-off still lists twelve features.
const MVP_FEATURES = [
  { feature: "Smart care reminders", pct: 76, tier: "core" },
  { feature: "AI plant identification (camera)", pct: 54, tier: "core" },
  { feature: "AI photo diagnosis", pct: 49, tier: "core" },
  { feature: "Growth photo journal", pct: 22, tier: "post" },
  { feature: "Stylized room / light map", pct: 22, tier: "post" },
  { feature: "Greenhouse encyclopedia", pct: 22, tier: "post" },
  { feature: "Community forums", pct: 19, tier: "post" },
  { feature: "Bulk logging", pct: 14, tier: "post" },
  { feature: "Bouquet scanner", pct: 11, tier: "post" },
  { feature: "Verified swapping", pct: 8, tier: "post" },
  { feature: "Wishlist tracker", pct: 3, tier: "post" },
  { feature: "Florist-branded bouquet care pages (QR)", pct: 3, tier: "post" },
];

const CORE_FEATURES = MVP_FEATURES.filter((f) => f.tier === "core");
const LATER_FEATURES = MVP_FEATURES.filter((f) => f.tier !== "core");

const COUNT_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
/** Spelled-out count for running copy; falls back to digits past twelve. */
const countWord = (n: number) => COUNT_WORDS[n] ?? String(n);

const renderRankRow = (f: (typeof MVP_FEATURES)[number]) => (
  <li key={f.feature} className={f.tier === "core" ? "is-core" : undefined}>
    <span className="rp-rank__label">{f.feature}</span>
    <span className="rp-rank__track" aria-hidden="true"><i style={{ width: `${f.pct}%` }} /></span>
    <b className="rp-rank__pct">{f.pct}%</b>
    <span className={`rp-badge rp-badge--tier${f.tier === "core" ? " is-core" : ""}`}>{f.tier === "core" ? "Core" : "Later"}</span>
  </li>
);

// Planned changes for the next prototype, framed as plans, not finished screens.
const DECISIONS = [
  {
    feature: "Reminders",
    why: "Swap the pushy missions and feed for one calm morning summary.",
  },
  {
    feature: "Plant ID by camera",
    why: "Show the top guesses, how sure it is, and its sources, not one answer that might be wrong.",
  },
  {
    feature: "Personality, not points",
    why: "Keep the plant’s personality. Remove scorekeeping that makes care feel like a chore.",
  },
];

/**
 * The FloraGrove demo, clicked through, looping in the landing section.
 * Recorded from the deployed demo (fake "Maya" sample data, no real user).
 * Silent. Autoplay is off for visitors who ask for reduced motion, and everyone
 * gets a visible pause/play button (WCAG 2.2.2). The text beside the frame says
 * what the video shows, since it has no narration or captions.
 */
function GroveDemoLoop() {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);

  useEffect(() => {
    let prefers = false;
    try { prefers = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { /* keep default */ }
    const v = ref.current;
    if (v && !prefers) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => setPlaying(false));
    }
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { void v.play(); } else { v.pause(); }
  };

  return (
    <figure className="rp-demoLoop">
      <div className="rp-device rp-device--video">
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/grove/grove-demo-poster.jpg"
          width={780}
          height={1688}
          aria-label="FloraGrove prototype video: a new plant owner signs up, takes a quiz, adds a spider plant, logs a soil test, and meets Pip, the app’s flowerpot character. Made-up sample data. No sound. Plays on repeat."
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src="/assets/grove/grove-demo.mp4" type="video/mp4" />
        </video>
      </div>
      <button type="button" className="rp-demoLoop__btn" onClick={toggle} aria-pressed={playing}>
        {playing ? "Pause prototype video" : "Play prototype video"}
      </button>
    </figure>
  );
}

export default function RisoGrove() {
  const { lang } = useLanguage();
  usePageTitle("FloraGrove: Pre-Launch Plant-Care App", lang !== "es");

  // Scroll-reveal, shared with the other flagships (hooks/useFlagshipReveal.ts).
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".riso-page");
    if (!root) return;
    return wireRevealObservers(root);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={GROVE_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--grove" lang="en">
      <RisoDefs />

      <CaseStudyChapters project="FloraGrove" chapters={CHAPTERS} progress />

      {/* LANDING: what it is, the prototype video, and the waitlist. */}
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
            <h1 className="rp-h1">Product design and research for{"\u00a0"}FloraGrove, <span className="rp-keep">a pre-launch</span> <span className="rp-keep">plant-care{"\u00a0"}app</span></h1>
            {/* Source order keeps the H1 first; CSS order shows the eyebrow above it on desktop. */}
            <span className="rp-eyebrow">Pre-launch</span>
            {/* What it is: from FloraGrove's own landing page description. */}
            <p className="rp-sub">
              FloraGrove is a plant-care app for new plant owners. It tells you what each plant needs today, from water and light to soil, and why.
              {" "}<b>Pre-launch: nothing here has shipped. FloraGrove is a functional prototype in Phase 2 of 3.</b>
            </p>
            <div className="rp-hero__ctas">
              <a className="rp-cta" href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
                <span className="rp-ext">Join the waitlist</span><span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
            <p className="rp-heroDemoNote">The video uses made-up sample data. It has no sound and loops.</p>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt--fan" data-evidence="true">
          <div className="fp-fan">
            <GroveDemoLoop />
          </div>
        </div>
      </header>

      {/* Said once, here; the survey lede no longer repeats it. Count comes from CORE_FEATURES. */}
      <ResultLine eyebrow="What I found" text={`Twelve features became ${countWord(CORE_FEATURES.length)}.`} />

      {/* STORY 1: the first version did too much. */}
      <section className="rp-section" id="grove-research" data-language-anchor="grove-research">
        <div className="rp-wrap">
          <p className="rp-kicker">{chapterLabel(CHAPTERS, "grove-research")}</p>
          <h2 className="rp-title">The first version tried to do too{" "}much.</h2>
          <p className="rp-lede">
            It opened on a feed and a mission, not on your own plants. From March to May 2026, I tested it with five people. They got stuck right there.
          </p>
          {/* Interview-sourced human line (Better Stories pass, 2026-11-10); source: design-docs/case-study-stories. */}
          <p className="rp-humanLine">I know plants, so I wanted more features. Five users changed that.</p>
          <p className="rp-lede">
            <strong>Limit:</strong> the test sessions showed confusion, but I did not keep notes on each task.
          </p>
        </div>
      </section>

      {/* STORY 2: the survey cut twelve features to three. */}
      <section className="rp-section" id="grove-survey" data-language-anchor="grove-survey">
        <div className="rp-wrap">
          <p className="rp-kicker">{chapterLabel(CHAPTERS, "grove-survey")}</p>
          <h2 className="rp-title">Then 37 people picked what it could not launch{" "}without.</h2>
          <p className="rp-lede">
            From May 22 to October 16, 37 people filled out a survey: 31 plant owners and caretakers, three florists, and three bouquet buyers. Each picked three features.
          </p>
          <h3 className="rp-subhead">The top {countWord(CORE_FEATURES.length)} made the cut</h3>
          <ol className="rp-rank rp-reveal" data-evidence="true">
            {CORE_FEATURES.map(renderRankRow)}
          </ol>
          <p className="rp-lede">
            <strong>Limit:</strong> a survey tells you what people say they want. It set the order for the next build, but it does not prove what people would actually do.
          </p>
        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See the rest of the survey ranking</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section">
          <div className="rp-wrap">
            <h3 className="rp-subhead">The {countWord(LATER_FEATURES.length)} that waited</h3>
            <ol className="rp-rank" start={CORE_FEATURES.length + 1}>
              {LATER_FEATURES.map(renderRankRow)}
            </ol>
          </div>
        </section>
      </details>

      {/* STORY 3: what is planned next, and what is not built yet. */}
      <section className="rp-section rp-section--alt" id="grove-decisions" data-language-anchor="grove-decisions">
        <div className="rp-wrap">
          <p className="rp-kicker">{chapterLabel(CHAPTERS, "grove-decisions")}</p>
          <h2 className="rp-title">The redesign is planned. Next, I test it with people.</h2>
          <PhaseIndicator current={2} total={3} label="Functional prototype · Phase 2 of 3" />
          <p className="rp-lede">These are plans for the next prototype, not finished screens.</p>
          <dl className="rp-decisionRecord rp-decisionRecord--grove rp-reveal" aria-label="FloraGrove’s three planned changes" data-evidence="true">
            {DECISIONS.map((decision) => (
              <div key={decision.feature}>
                <dt>{decision.feature}</dt>
                <dd>{decision.why}</dd>
              </div>
            ))}
          </dl>
          <p className="rp-lede">
            <strong>Not built yet:</strong> the polished redesign, screens for empty or error moments, and a second round of testing.
          </p>
          <CaseMore label="What the phases mean">
            <div className="rp-note">
              <p className="rp-note__k">What the three phases mean</p>
              <p>FloraGrove works, but it isn’t finished. Phase 1: the first app and the survey. Phase 2: the decisions on this page. Phase 3: polished screens, testing with plant owners, and screens for empty or error moments.</p>
            </div>
          </CaseMore>
        </div>
      </section>

      {/* CLOSING: the same email action as every case study, plus the waitlist. */}
      {/* Next case study sits above the closing band, so the band and the footer read as one ending. */}
      <Link className="rp-next" to="/case-study/logistics">
        <div className="rp-next__inner">
          <div>
            <p className="rp-next__eyebrow">Next case study</p>
            <p className="rp-next__title">Medical logistics</p>
          </div>
          <span className="rp-next__arrow" aria-hidden="true">→</span>
        </div>
      </Link>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Want to try FloraGrove when it’s ready?</h2>
          <div className="rp-hero__ctas">
            <a className="rp-cta" href={WAITLIST_URL} target="_blank" rel="noopener noreferrer">
              <span className="rp-ext">Join the waitlist</span><span className="sr-only"> (opens in new tab)</span>
            </a>
            <a className="rp-cta rp-cta--ghost" href="mailto:espositohillary@gmail.com">Email me →</a>
            <CopyEmail compact />
          </div>
        </div>
      </section>

      {/* NEXT CASE STUDY */}

    </main>
  );
}
