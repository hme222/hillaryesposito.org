import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useT } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import CaseStudyCredential, { CaseStudyCredentialData } from "../../components/flagship/CaseStudyCredential";
import CaseStudyReel, { CaseStudyReelData } from "../../components/flagship/CaseStudyReel";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import ResultLine from "../../components/flagship/ResultLine";
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
  { src: "/assets/knowunity/say-it-back-pass.webp", alt: "Correct-answer screen showing the student’s own definition under “You said”" },
  { src: "/assets/knowunity/say-it-back-recap.webp", alt: "End-of-session summary, “You can say 3 of 4 back without help,” with a Practice what I missed button" },
  { src: "/assets/knowunity/say-it-back-mic-primer.webp", alt: "Panel asking to turn on the mic, with a Type instead option, opened over a chemistry question" },
  { src: "/assets/knowunity/say-it-back-second-miss.webp", alt: "Screen after a second wrong answer: “One more go, then I’ll show you the answer,” with a fill-in-the-blank hint" },
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
  caption: "The listening is faked: it can’t hear or grade real speech yet.",
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
    title: "Show their words back",
    body: "When a student gets it right, Knowie shows what they said. My guess, untested with students: seeing your own words proves you remember them.",
    note: "Proof, not praise",
  },
  {
    n: "02",
    title: "Retry when they’re ready",
    body: "A missed question used to come back by itself at the end. Now the summary offers “Practice what I missed.”",
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
    body: "First miss: a hint. Second: a fill-in-the-blank hint, plus “One more go, then I’ll show you the answer.” Third: the answer.",
    note: "Every miss says what comes next",
  },
];

// Which capture sits beside each decision, by what the screen actually shows:
// 01 the pass card quoting the transcript, 02 the Recap's "Practice what I
// missed", 03 the primer sheet over question one, 04 the second-miss card.
const STEP_FRAME = [0, 1, 2, 3];

export default function FlagshipKnowunity() {
  const { lang } = useLanguage();
  const t = useT();
  usePageTitle("Knowunity: Say It Back Case Study", lang !== "es");
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
            <h1 className="rp-h1">2.5-week design sprint with an edtech startup, run by Yummy{"\u00a0"}Labs</h1>
            <p className="rp-sub">
              In the sprint (a timed design challenge), I worked alone on a real assignment from Knowunity, a study app whose mascot is Knowie. I designed and built a working prototype. <b>It can’t hear or grade real speech yet, and no student has tried it.</b>
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
                alt="Say It Back correct-answer screen: under “You said,” Knowie shows the student’s own definition of formal charge"
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

      <ResultLine
        eyebrow="What I built"
        text="Students explain an idea out loud, and when they get it right, Knowie shows them their own words."
      />

      <section className="rp-section rp-override" id="knowunity-brief" data-language-anchor="knowunity-brief" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Knowunity wanted students to prove they remember.</h2>
          <p className="rp-lede">After studying, a student has seen the material, but hasn’t shown they can remember it on their own. The app’s practice steps check if you can spot or use the right answer. They don’t ask you to explain it. Knowunity wanted a moment where the student feels, “I actually know this now.”</p>
          <CaseMore label="What Knowunity asked for">
            <p className="rp-body">Two goals: more of the students who see the new step start it, and more of those who start it finish.</p>
            <p className="rp-body">Partway through the sprint, Knowunity released its own simple test version (a beta). The assignment said to treat it as one team’s first try and find a stronger version, not copy it.</p>
          </CaseMore>
        </div>
      </section>

      {/* The working prototype comes first, the decisions after (2026-11-13, Lex:
          show the final first, then the journey). */}
      <section className="rp-section" id="knowunity-prototype" data-language-anchor="knowunity-prototype">
        <div className="rp-wrap">
          <h2 className="rp-title">I built a version you can tap through, not slides.</h2>
          <div className="fp-workSplit rp-reveal" data-evidence="true">
            <article><span>Knowunity gave me</span><h3>Their brand and design parts</h3><p>Knowie, the Greed font, their design kit in Figma (a design tool), and access to the live app and the beta.</p></article>
            <article><span>I did</span><h3>The screens, the choices, and the build</h3><p>A Next.js prototype, phone-sized (390px wide), in dark mode. Plus a Storybook, a catalog of its parts, built on their kit. Claude Code, an AI coding tool, wrote most of the code from my written plans.</p></article>
          </div>
          <CaseStudyReel reel={REEL} />
          <div className="rp-hero__ctas">
            <a className="rp-cta" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">
              <span className="rp-ext">Try the working prototype</span><span className="sr-only">{t("a11y.newTab")}</span>
            </a>
            <a className="rp-cta rp-cta--ghost" href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer">
              <span className="rp-ext">Open the parts catalog (Storybook)</span><span className="sr-only">{t("a11y.newTab")}</span>
            </a>
          </div>
          <p className="fp-knowunityMockNote">In the prototype, how long you hold the mic decides the result. On question 2, the first try always “mishears” you, so you can see that screen.</p>
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
            <p className="rp-kicker fp-constraintKicker">Rules that never changed</p>
            <dl className="fp-constraintAnnotations rp-reveal">
              <div><dt>Voice in, text out</dt><dd>The student talks. Knowie only answers in text.</dd></div>
              <div><dt>Push to talk</dt><dd>The student starts and stops the recording, so the app never guesses when they’re done.</dd></div>
              <div><dt>Always a way out</dt><dd>Anything the student has to do has another way through, like typing when they can’t talk right now.</dd></div>
            </dl>
          </div>
        </section>
      </details>

      <div data-evidence="true"><DecisionStory
        id="knowunity-decisions"
        languageAnchor="knowunity-decisions"
        title="I made the student do the proving, not Knowie."
        intro="You can’t force a student to explain out loud. So each of these four changes makes it easier to keep going."
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
        title="Yummy Labs gave me a badge, and Knowunity reviewed it."
        intro="Next: a version that turns real speech into text, in front of students."
        disclaimer="Design-sprint prototype · the listening is faked: it can’t understand speech · not tested with students · not part of the real Knowunity app"
        metrics={[
          { tag: "Build", n: "43", label: "pages in the working prototype, each reached by tapping, not by typing a web address" },
          { tag: "Sprint", n: "2.5", label: "weeks, working alone, on Knowunity’s assignment and design kit" },
        ]}
        aside={<CaseStudyCredential credential={{ ...BADGE, newTabLabel: t("a11y.newTab") }} />}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I build working versions to learn what to test next.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/grove"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">FloraGrove</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
