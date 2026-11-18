import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useT } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import CaseStudyCredential, { CaseStudyCredentialData } from "../../components/flagship/CaseStudyCredential";
import CaseStudyReel, { CaseStudyReelData } from "../../components/flagship/CaseStudyReel";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import CaseMore from "../../components/CaseMore";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { KNOWUNITY_BADGE_ASSET } from "../../data/knowunityBadge";
import { KNOWUNITY_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

/**
 * Knowunity — Say It Back, the design-sprint case study.
 *
 * Source of truth: design-docs/case-study-stories/knowunity.md (the interview
 * master file) and, for each mechanism, ~/Desktop/Knowunity/docs/code-history.md
 * and current-state.md. Every step below traces to one of them.
 *
 * Deliberately absent: Knowunity's internal usage numbers and the brief's
 * activation/completion targets (owner decision 2026-10-13: goals in words
 * only), any claim of student testing, and any claim of real speech
 * recognition. Recall is mocked; the page says so wherever a result appears.
 *
 * Captures are 780×1688 (@2x of a 390×844 viewport) from the owner's local
 * prototype, 2026-10-13.
 */

const PROTOTYPE_URL = "https://knowunity-voice-recall-eight.vercel.app/";
const STORYBOOK_URL = "https://6aab3391f5b820296b53b3e5-vmipdkjlqe.chromatic.com/?path=/docs/components-appbar--docs";
const CAPTURE_W = 780;
const CAPTURE_H = 1688;

const CHAPTERS: CaseStudyChapter[] = [
  { id: "knowunity-start", label: "Start" },
  { id: "knowunity-brief", label: "Problem" },
  { id: "knowunity-prototype", label: "Build" },
  { id: "knowunity-decisions", label: "Decisions" },
  { id: "knowunity-outcomes", label: "Outcomes" },
];

const FRAMES = [
  { src: "/assets/knowunity/say-it-back-pass.webp", alt: "Pass screen quoting the student’s definition back" },
  { src: "/assets/knowunity/say-it-back-recap.webp", alt: "Session recap leading with Practice what I missed" },
  { src: "/assets/knowunity/say-it-back-mic-primer.webp", alt: "Mic permission sheet opening over the first question" },
  { src: "/assets/knowunity/say-it-back-second-miss.webp", alt: "Second-miss card headed One more go, then I’ll show you the answer" },
];

// The sizzle reel: 1280×720, 52s, H.264 with a music bed and no narration,
// so the on-screen lines below are its full text alternative.
const REEL_SRC = "/assets/knowunity/say-it-back-sizzle-720.mp4";
const REEL_POSTER = "/assets/knowunity/say-it-back-sizzle-poster.jpg";
const REEL_CAPTIONS = "/assets/knowunity/say-it-back-sizzle-captions-en.vtt";

const REEL: CaseStudyReelData = {
  src: REEL_SRC,
  poster: REEL_POSTER,
  captionsSrc: REEL_CAPTIONS,
  kicker: "The 52-second reel",
  label: "Say It Back, the 52-second reel",
  caption: "The prototype on Knowunity’s kit. Recall is mocked: no real speech recognition.",
  transcriptSummary: "What the reel shows",
  transcript: [
    "Knowie points the way in",
    "Explain it in your own words",
    "Talk it through. Knowie listens.",
    "Check what it heard. Say how sure you are.",
    "Their own words are the proof",
    "Two kinds of wrong. Two kinds of help. (Mic missed it / Half right)",
    "See what stuck",
    "Then win back the misses",
    "End card: Say It Back: Explain it. Prove it stuck.",
  ],
  transcriptNote: "Music only; no narration.",
};

const BADGE: Omit<CaseStudyCredentialData, "newTabLabel"> = {
  ...KNOWUNITY_BADGE_ASSET,
  alt: "Yummy Labs badge: Hillary Esposito, AI Design Sprinter, completed the Yummy Labs AI Design Sprint in partnership with Knowunity, September 2026.",
  caption: "AI Design Sprinter badge · Yummy Labs AI Design Sprint, in partnership with Knowunity · Sept 2026",
  linkLabel: "Verify on LinkedIn",
};

const STEPS = [
  {
    n: "01",
    title: "Echo the words back",
    body: "When a student gets it right, Knowie shows what they said. My guess, untested with students: seeing your own words proves you remember them.",
    note: "Proof, not praise",
  },
  {
    n: "02",
    title: "Retry when ready",
    body: "A missed word used to come back at the end on its own. Now the summary starts with “Practice what I missed,” and the student picks when.",
    note: "The student chooses the second try",
  },
  {
    n: "03",
    title: "Ask for the mic when it’s needed",
    body: "The first question shows up right away, with no intro screen. The app asks to use the microphone only when the student taps it.",
    note: "No surprise permission pop-up",
  },
  {
    n: "04",
    title: "Say what happens after each miss",
    body: "One miss gets a hint, and two get a fill-in-the-blank hint. On the third miss, Knowie says it will show the answer, then shows it.",
    note: "Judge generously, out loud",
  },
];

// Which capture sits beside each decision, by what the screen actually shows:
// 01 the pass card quoting the transcript, 02 the Recap's "Practice what I
// missed", 03 the primer sheet over question one, 04 the second-miss card.
const STEP_FRAME = [0, 1, 2, 3];

export default function FlagshipKnowunity() {
  const { lang } = useLanguage();
  const t = useT();
  usePageTitle("Knowunity: Voice Active Recall Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" }), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={KNOWUNITY_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--knowunity" lang="en" ref={rootRef}>
      <RisoDefs />

      <CaseStudyChapters project="Knowunity" chapters={CHAPTERS} progress />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="knowunity-start" data-language-anchor="knowunity-start">
        <CartoField
          mapSrc="/riso/elevation-03.jpg"
          edition="struct"
          mapZoom={1.14}
          mapPosition="52% 44%"
        />
        <div className="rp-grain" />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <h1 className="rp-h1">Their own words are the proof.</h1>
            <p className="rp-sub">
              In a 2.5-week design sprint run by Yummy Labs, I worked alone on a real brief from Knowunity, a study app. I designed and built a prototype where a student explains an idea out loud, and Knowie, the app’s mascot, shows their own words back when they get it right. <b>It doesn’t hear or grade real speech yet, and no student has tried it.</b>
            </p>
            <div className="rp-hero__ctas">
              <a className="rp-cta" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">
                Try the working prototype <span aria-hidden="true">↗</span><span className="sr-only">{t("a11y.newTab")}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--knowunity fp-heroArt--fan" data-evidence="true">
          {/* R5 (2026-11-16): the shared phone fan. The pass screen is the
              centre; the recap and second-miss screens flank it and repeat in
              the decisions below, so they are hidden from screen readers. */}
          <div className="fp-fan">
            <div className="fp-capture fp-capture--2">
              <img
                src={FRAMES[0].src}
                alt="Say It Back pass screen: Knowie quotes the student’s own definition of formal charge back as the result"
                width={CAPTURE_W}
                height={CAPTURE_H}
                decoding="async"
              />
            </div>
            <div className="fp-capture fp-capture--1" aria-hidden="true">
              <img src={FRAMES[1].src} alt="" width={CAPTURE_W} height={CAPTURE_H} decoding="async" />
            </div>
            <div className="fp-capture fp-capture--3" aria-hidden="true">
              <img src={FRAMES[3].src} alt="" width={CAPTURE_W} height={CAPTURE_H} decoding="async" />
            </div>
          </div>
        </div>
      </header>

      <section className="rp-section rp-override" id="knowunity-brief" data-language-anchor="knowunity-brief" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Seeing the material is not knowing it.</h2>
          <p className="rp-lede">After studying, a student has seen the material, but hasn’t shown they can remember it on their own. Quizzes check whether you recognize an answer, and nothing asks you to say it. Knowunity wanted a moment where the student feels, “I actually know this now.”</p>
          <CaseMore label="What the brief asked for">
            <p className="rp-body">The goals, in words: more students who see the step start it, and more of those who start it finish it.</p>
            <p className="rp-body">Mid-sprint, Knowunity shipped a light beta. The brief said to treat it as one team’s first pass and find where the stronger version is, not copy it.</p>
          </CaseMore>
        </div>
      </section>

      {/* The working prototype comes first, the decisions after (2026-11-13, Lex:
          show the final first, then the journey). */}
      <section className="rp-section" id="knowunity-prototype" data-language-anchor="knowunity-prototype">
        <div className="rp-wrap">
          <h2 className="rp-title">A working prototype, not a deck.</h2>
          <div className="fp-workSplit rp-reveal" data-evidence="true">
            <article><span>Knowunity supplied</span><h3>The brand and the parts</h3><p>Knowie, the Greed font, their Figma kit, and access to the live app and the beta.</p></article>
            <article><span>I did</span><h3>The flows, the decisions, the direction</h3><p>Next.js prototype, 43 routes, 390px dark mode, plus a Storybook catalog built on their kit. Claude Code wrote most of the code from my specs.</p></article>
          </div>
          <CaseStudyReel reel={REEL} />
          <div className="rp-hero__ctas">
            <a className="rp-cta" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">
              <span className="rp-ext">Try the working prototype</span><span className="sr-only">{t("a11y.newTab")}</span>
            </a>
            <a className="rp-cta rp-cta--ghost" href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer">
              <span className="rp-ext">Open the Storybook</span><span className="sr-only">{t("a11y.newTab")}</span>
            </a>
          </div>
          <p className="fp-knowunityMockNote">How long you hold the mic decides the result. Question 2's first try is scripted to mishear so that state is always seen.</p>
        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See how I built it</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section">
          <div className="rp-wrap">
            <p className="rp-kicker fp-constraintKicker">What did not move</p>
            <dl className="fp-constraintAnnotations rp-reveal">
              <div><dt>Voice in, text out</dt><dd>Knowie never speaks.</dd></div>
              <div><dt>Push to talk</dt><dd>The student starts and stops the recording. No guessing when they’re done.</dd></div>
              <div><dt>Never trap the student</dt><dd>Every required action has a way out, including for someone who can’t speak right now.</dd></div>
            </dl>
          </div>
        </section>
      </details>

      <div data-evidence="true"><DecisionStory
        id="knowunity-decisions"
        languageAnchor="knowunity-decisions"
        title="The student does the proving, not Knowie."
        intro="Nobody can make a student explain out loud, so each of these four changes makes it easier to keep going."
        steps={STEPS}
        // Same stacked crossfade as Mobbin: every capture is mounted in one
        // fixed-ratio frame and the active step turns one on, so the swap has
        // no decode flash and no height change. Inactive frames are hidden
        // from assistive tech.
        visual={(active) => (
          <div className="fp-sequence__phone fp-sequence__phone--story fp-sequence__phone--stack">
            {FRAMES.map((frame, index) => {
              const on = (active === null ? 0 : STEP_FRAME[active]) === index;
              return (
                <img
                  key={frame.src}
                  src={frame.src}
                  alt={frame.alt}
                  width={CAPTURE_W}
                  height={CAPTURE_H}
                  loading="lazy"
                  decoding="async"
                  className={on ? "is-on" : undefined}
                  aria-hidden={!on}
                />
              );
            })}
          </div>
        )}
      /></div>


      <div data-evidence="true"><EvidenceField
        id="knowunity-outcomes"
        languageAnchor="knowunity-outcomes"
        title="A badge, a review, and a mock that still needs students."
        intro="Yummy Labs awarded the entry its AI Design Sprinter badge and Knowunity reviewed the work. Next: a speech-to-text build in front of students."
        disclaimer="Design-sprint prototype · recall is mocked: no speech recognition · no student testing · not a shipped Knowunity feature"
        metrics={[
          { tag: "Build", n: "43", label: "routes in the working prototype, every screen reached by tapping, none by typing a URL" },
          { tag: "Sprint", n: "2.5", label: "weeks, solo, on Knowunity’s brief and component kit" },
        ]}
        aside={<CaseStudyCredential credential={{ ...BADGE, newTabLabel: t("a11y.newTab") }} />}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I prototype to find the next test.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/logistics"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Medical logistics</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
