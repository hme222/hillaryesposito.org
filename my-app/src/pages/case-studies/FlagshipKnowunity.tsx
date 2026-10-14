import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage, useT } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { KNOWUNITY_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
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

const PROTOTYPE_URL = "https://knowunity-voice-recall.vercel.app/";
const STORYBOOK_URL = "https://6aab3391f5b820296b53b3e5-vmipdkjlqe.chromatic.com/?path=/docs/components-appbar--docs";
const CAPTURE_W = 780;
const CAPTURE_H = 1688;

const CHAPTERS: CaseStudyChapter[] = [
  { id: "knowunity-start", label: "Start", note: "One sprint, solo, on Knowunity’s brief" },
  { id: "knowunity-brief", label: "Problem", note: "Seeing it isn't knowing it" },
  { id: "knowunity-decisions", label: "Decisions", note: "Four decisions, one loop" },
  { id: "knowunity-prototype", label: "Build", note: "43 routes, mocked recall" },
  { id: "knowunity-outcomes", label: "Outcomes", note: "A badge, a review, no students yet" },
];

const FRAMES = [
  { src: "/assets/knowunity/say-it-back-pass.webp", alt: "Pass screen quoting the student's definition back" },
  { src: "/assets/knowunity/say-it-back-recap.webp", alt: "Session recap leading with Practice what I missed" },
  { src: "/assets/knowunity/say-it-back-mic-primer.webp", alt: "Mic permission sheet opening over the first question" },
  { src: "/assets/knowunity/say-it-back-second-miss.webp", alt: "Second-miss card headed One more go, then I'll show you the answer" },
];

const STEPS = [
  {
    n: "01",
    title: "Echo the words back",
    body: "On a clean pass, Knowie quotes the student's own transcript back as the proof. Seeing your own correct explanation is evidence you can retrieve it. Those are also the words you'll use in the exam.",
    note: "Proof, not praise",
  },
  {
    n: "02",
    title: "Offer the misses, don't requeue them",
    body: "A missed term used to come back at the end of the set. Now the run goes straight to the Recap, which leads with “Practice what I missed.” Each row says why the term is there and recommends a drill or a say-it-again.",
    note: "The student chooses the second try",
  },
  {
    n: "03",
    title: "Ask for the mic when it's needed",
    body: "The question comes first. The permission sheet opens over it on the first mic tap, not as a full screen between an intro and question one. The intro screen is gone; every way in lands on question one.",
    note: "No cold OS prompt",
  },
  {
    n: "04",
    title: "Say where you are on the ladder",
    body: "One hint on the first miss, a fill-the-gap hint on the second, the answer on the third. The card's headline says it: “One more go, then I'll show you the answer.” Nothing vanishes without a word.",
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
  usePageTitle("Knowunity — Voice Active Recall Case Study", lang !== "es");
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

      <div className="rp-breadcrumbRow">
        <nav className="rp-breadcrumb" aria-label="Breadcrumb"><Link to="/" className="rp-breadcrumb__name" title="Hillary Esposito">Hillary Esposito</Link> / <Link to="/?scrollTo=projects">Work</Link> / <span>Knowunity</span></nav>
        <button
          type="button"
          className="rp-heroUtility rp-breadcrumbTour"
          onClick={(e) =>
            window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: { returnFocus: e.currentTarget } }))
          }
        >
          Open the 90-second tour
        </button>
      </div>
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
            <span className="rp-eyebrow">Knowunity · Say It Back · design-sprint prototype</span>
            <h1 className="rp-h1">The student's own words are the{" "}proof.</h1>
            <span className="rp-readtime"><b>4 min</b><span>read · 2.5-week sprint, solo</span></span>
            <p className="rp-sub">
              Knowunity is a study app for students. A student says a definition out loud; Knowunity's assistant,
              Knowie, replies in text. On a clean pass it quotes the student's <b>own words</b> back as
              the{"\u00a0"}proof. Solo, 2.5-week Yummy Labs sprint on Knowunity's brief; working prototype on their
              component kit.
            </p>
            <dl className="rp-heroEvidence" aria-label="Knowunity case evidence at a glance">
              <div><dt>Role</dt><dd>Solo entry · Yummy Labs design sprint · Knowunity's brief and kit</dd></div>
              <div><dt>Brief</dt><dd>Voice in, text out · iOS, 390px, dark mode · recall mocked: no speech recognition, hold time decides the result</dd></div>
              <div><dt>My contribution</dt><dd>Flows and decisions · coded prototype · Storybook catalog</dd></div>
              <div><dt>Outcome</dt><dd>Yummy Labs Design Sprint Badge · reviewed by Knowunity · not a shipped feature</dd></div>
            </dl>
            <a className="rp-cta" href="#knowunity-decisions">See the four decisions →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--knowunity" data-evidence="true">
          <div className="fp-sequence__phone fp-sequence__phone--hero">
            <img
              src={FRAMES[0].src}
              alt="Say It Back pass screen: Knowie quotes the student's own definition of formal charge back as the result"
              width={CAPTURE_W}
              height={CAPTURE_H}
              decoding="async"
            />
          </div>
          <div className="fp-artifactLabel"><span>DESIGN SPRINT · 2026</span><b>Working Next.js prototype · 43 routes · recall mocked</b></div>
        </div>
      </header>

      <section className="rp-section rp-override" id="knowunity-brief" data-language-anchor="knowunity-brief" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">Where this starts</p>
          <h2 className="rp-title">Seeing the material is not knowing it.</h2>
          <p className="rp-lede">After revising, a student has seen the material but hasn't proved they can pull it back out. Quizzes test recognition. Nothing makes them say it.</p>
          <p className="rp-body">Knowunity's brief asked for a felt “I actually know this now.” The goals, in words: more students who see the step start it, and more of those who start it finish it.</p>
          <p className="rp-body">Mid-sprint, Knowunity shipped a light beta. The brief said to treat it as one team's first pass and find where the stronger version is, not copy it.</p>
          <p className="rp-kicker fp-constraintKicker">What did not move</p>
          <dl className="fp-constraintAnnotations fp-constraintAnnotations--four rp-reveal">
            <div><dt>Voice in, text out</dt><dd>Knowie never speaks.</dd></div>
            <div><dt>Push to talk</dt><dd>The student starts and stops the recording. No guessing when they're done.</dd></div>
            <div><dt>Never trap the student</dt><dd>Every required action has a way out, including for someone who can't speak right now.</dd></div>
            <div><dt>Judge generously</dt><dd>A false “wrong” costs more here than in multiple choice.</dd></div>
          </dl>
        </div>
      </section>

      <div data-evidence="true"><DecisionStory
        id="knowunity-decisions"
        languageAnchor="knowunity-decisions"
        kicker="Four decisions · one loop"
        title="The student does the proving, not Knowie."
        intro="Echo the words. Offer the misses. Ask for the mic when it's needed. Say where you are."
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
      <div className="rp-wrap fp-knowunityChange">
        <div className="fp-journalLine"><span>What I'd change</span><b>Put a real speech-to-text version in front of students earlier. Recall was mocked the whole way.</b></div>
      </div>

      <section className="rp-section" id="knowunity-prototype" data-language-anchor="knowunity-prototype">
        <div className="rp-wrap">
          <p className="rp-kicker">Mine, on their kit</p>
          <h2 className="rp-title">A working prototype, not a deck.</h2>
          <p className="rp-lede">Every screen is its own route, reached by tapping. Storybook is the component catalog.</p>
          <div className="fp-workSplit rp-reveal" data-evidence="true">
            <article><span>Knowunity supplied</span><h3>The brand and the parts</h3><p>Knowie, the Greed font, their Figma kit, and access to the live app and the beta.</p></article>
            <article><span>I did</span><h3>The flows, the decisions, the code</h3><p>Next.js prototype, 43 routes, 390px dark mode, plus a Storybook catalog built on their kit.</p></article>
          </div>
          <p className="fp-ownership fp-ownership--paper rp-reveal">
            <b>AI in the build</b>
            I designed and directed. Claude Code wrote most of the Next.js and Storybook code from my specs and Knowunity's Figma components.
          </p>
          <div className="rp-hero__ctas">
            <a className="rp-cta" href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" aria-label={t("home.riso.knowunityPrototypeAria")}>
              Try the prototype ↗
            </a>
            <a className="rp-cta rp-cta--ghost" href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the Say It Back Storybook (opens in new tab)">
              Open the Storybook ↗
            </a>
          </div>
          <p className="fp-knowunityMockNote">No speech recognition: how long you hold the mic decides the result. Question 2's first try is scripted to mishear so that state is always seen.</p>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="knowunity-outcomes"
        languageAnchor="knowunity-outcomes"
        kicker="What it added up to"
        title="A badge, a review, and a mock that still needs students."
        intro="Yummy Labs awarded the entry a Design Sprint Badge and Knowunity reviewed the work. Recall is mocked and no students have tested it. Next: a speech-to-text build in front of students."
        disclaimer="Design-sprint prototype · recall is mocked: no speech recognition, hold time decides the result · no student testing · not a shipped Knowunity feature · Knowunity's internal numbers are not published here"
        metrics={[
          { tag: "Build", n: "43", label: "routes in the working prototype, every screen reached by tapping, none by typing a URL" },
          { tag: "Sprint", n: "2.5", label: "weeks, solo, on Knowunity's brief and component kit" },
        ]}
        route={["Meet it where the quiz ends", "Say it back", "See your own words", "Practice what you missed"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I prototype to find the next test.</h2>
          <p>Say It Back shows how I work: build it, say what’s mocked, name the next test.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <ShareCaseStudy title="Knowunity — a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/logistics"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Medical logistics</p><p className="rp-next__tag">Army operations · seven aid stations, three countries</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
