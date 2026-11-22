import CopyEmail from "../../components/CopyEmail";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import CaseStudyReel, { CaseStudyReelData } from "../../components/flagship/CaseStudyReel";
import EvidenceField from "../../components/flagship/EvidenceField";
import ResultLine from "../../components/flagship/ResultLine";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { UXWOMAN_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";
import CaseMore from "../../components/CaseMore";

/**
 * UX Woman — healthcare research case study (rewritten 2026-11-09 from the
 * midterm deck, "A Guide For A Medicaid Letter: Two Hypotheses", 22 slides).
 *
 * Every fact on this page is on a slide: 6 interviews with clinic and insurer
 * staff, 0 patient interviews, 6 public sources; six themes (two added after
 * an AI cross-check); the 475,000+ projection (NY Department of Health, "at
 * least") and the 18,164 observed count (Arkansas, 2018), labeled as different
 * measures; two hypotheses; the MVP 1 guide screens; two planned tests; three
 * versions, each gated by a test. Hillary's direction (2026-11-09): drop the
 * adjacent HR interview and the five pretotypes. Interviewees appear by role
 * only. Spanish lives in spanishCaseStudies.ts (UXWOMAN_ES) and carries the
 * same facts.
 */

const CHAPTERS: CaseStudyChapter[] = [
  { id: "uxwoman-start", label: "Start" },
  { id: "uxwoman-problem", label: "Problem" },
  { id: "uxwoman-research", label: "Interviews" },
  { id: "uxwoman-findings", label: "Ideas to test" },
  { id: "uxwoman-guide", label: "Guide" },
  { id: "uxwoman-next", label: "Next step" },
];

const THEMES: { title: string; line: string; crossCheck?: boolean }[] = [
  { title: "No clear owner", line: "Staff can't see who has a request or where it is." },
  { title: "Life gets in the way", line: "Housing, transportation and caregivers can change the plan." },
  { title: "Following up by hand", line: "Staff follow up by phone, by fax and through many clicks." },
  { title: "AI helps, a human checks", line: "Staff still check what the AI tool makes." },
  { title: "Proving the treatment is needed", line: "Insurers say no based on the paperwork.", crossCheck: true },
  { title: "Insurer rules are unclear", line: "Rules change from insurer to insurer, and the reasons are hard to find.", crossCheck: true },
];

const READER_NEEDS = ["Where things stand", "What is missing", "Who acts next", "The due date", "A person to call", "What counts as proof"];

const GUIDE_SCREENS = [
  { src: "/assets/uxwoman/guide-1.webp", cap: "Start screen", alt: "Start screen of the guide, marked Design Concept. Heading: Understand the Medicaid work requirement. It asks what you need, with three choices: See if it may apply to me, Dates, and I got a letter. A Talk to a person button sits at the bottom." },
  { src: "/assets/uxwoman/guide-2.webp", cap: "Question 1 of 4: does the rule apply to you?", alt: "Question 1 of 4, marked Design Concept: Do you have Medicaid in New York? Four choices: Yes, I have it now; Not yet, I plan to apply; No; I do not know. A Continue button sits at the bottom." },
  { src: "/assets/uxwoman/guide-3.webp", cap: "Your renewal date", alt: "Your renewal date screen, marked Design Concept. It says the rule starts Jan 1, 2027, and your own date decides. Below is a date field and a highlighted note: on or before Feb 1, 2027, not needed at that renewal." },
];

// Midterm presentation: 12:58, 1440 x 900, narrated, with her webcam in the
// corner. Captions are generated from the audio and need Hillary's proofread.
const MIDTERM: CaseStudyReelData = {
  src: "/assets/uxwoman/midterm-presentation.mp4",
  poster: "/assets/uxwoman/midterm-poster.jpg",
  captionsSrc: "/assets/uxwoman/midterm-captions-en.vtt",
  width: 1440,
  height: 900,
  kicker: "The midterm",
  label: "UX Woman midterm presentation video, about 13 minutes, with my narration",
  caption: "About 13 minutes, with my narration and captions.",
  transcriptSummary: "What the presentation covers",
  transcript: [
    "A letter with a deadline and no clear next step",
    "From insurance pre-approvals to a letter I can test",
    "Six themes from six interviews",
    "Coverage can be lost to a missed response",
    "What already exists",
    "A guide that starts from the letter in your hand",
    "The letter, phase by phase",
    "A few ideas that shaped the MVPs",
    "Six areas, and get help on every screen",
    "Clinic and hospital staff journey",
    "Three versions, each gated by a test",
    "Who might pay",
    "From a letter to a next step",
  ],
  transcriptNote: "These are the slide titles, in order.",
};

export default function FlagshipUxWoman() {
  const { lang } = useLanguage();
  usePageTitle("UX Woman: Healthcare Research Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" }), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={UXWOMAN_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--uxwoman" lang="en" ref={rootRef}>
      <RisoDefs />

      <CaseStudyChapters project="UX Woman" chapters={CHAPTERS} progress />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="uxwoman-start" data-language-anchor="uxwoman-start">
        <CartoField
          mapSrc="/riso/elevation-04.jpg"
          edition="olive"
          mapZoom={1.1}
          mapPosition="50% 46%"
        />
        <div className="rp-grain" />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <h1 className="rp-h1">Healthcare research based on changing Medicaid{"\u00a0"}requirements</h1>
            <p className="rp-sub">
              In UX Woman, a 7-month user experience (UX) design program, I interviewed six people who work at clinics and insurance companies. Then I designed a guide to one sample letter from New York Medicaid, the public health insurance program, about its new work requirement.
            </p>
            <dl className="rp-heroEvidence" aria-label="UX Woman project at a glance">
              <div><dt>Role</dt><dd>Solo researcher and designer · 2026</dd></div>
            </dl>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--uxwoman fp-heroArt--fan" data-evidence="true">
          {/* R5 (2026-11-16): the shared phone fan, kept at the guide's own
              452:800 shape. Minimalism pass (2026-11-17): the five-number
              ledger, the "I made" list and the pull quote left the hero; the
              sub-line already states the limits. Side screens repeat in the
              guide section below, so they are hidden from screen readers. */}
          <div className="fp-fan fp-fan--guide">
            <div className="fp-capture fp-capture--2">
              <img src={GUIDE_SCREENS[0].src} alt={GUIDE_SCREENS[0].alt} width={450} height={800} decoding="async" />
            </div>
            <div className="fp-capture fp-capture--1" aria-hidden="true">
              <img src={GUIDE_SCREENS[1].src} alt="" width={452} height={800} decoding="async" />
            </div>
            <div className="fp-capture fp-capture--3" aria-hidden="true">
              <img src={GUIDE_SCREENS[2].src} alt="" width={452} height={800} decoding="async" />
            </div>
          </div>
        </div>
      </header>

      {/* "It is untested" and "no patient was interviewed" are the hero sub-line's own words. */}
      <ResultLine
        eyebrow="Where it stands"
        text="I designed a guide that starts from the letter in your hand. It is untested."
        source="No patient was interviewed."
      />

      <section className="rp-section" id="uxwoman-midterm" aria-labelledby="uxwoman-midterm-title">
        <div className="rp-wrap">
          <h2 className="rp-title" id="uxwoman-midterm-title">I recorded my midterm presentation.</h2>
          <CaseStudyReel reel={MIDTERM} />
        </div>
      </section>

      <section className="rp-section" id="uxwoman-problem" data-language-anchor="uxwoman-problem" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Miss the reply, and you can lose coverage.</h2>
          <p className="rp-lede">The letter tells people about a new rule: some must show work hours or income, or show they don't have to.</p>
          <dl className="fp-letterStats rp-reveal">
            <div>
              <dt>Forecast, New York</dt>
              <dd><b>475,000+</b> people could lose coverage, the New York Department of Health estimates. It says “at least” that many.</dd>
            </div>
            <div>
              <dt>Already happened, Arkansas 2018</dt>
              <dd><b>18,164</b> people lost coverage under a work requirement</dd>
            </div>
          </dl>
          <p className="fp-letterStats__note">Public data. One number is a forecast and one is a real count, so they don't compare directly.</p>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-research" data-language-anchor="uxwoman-research" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Six themes came out of the interviews.</h2>
          {/* Hillary's own line linking the themes to the guide (2026-11-16, R7). */}
          <p className="rp-lede">While learning about denials and prior authorizations (when insurance has to approve care first), I saw that some Medicaid rule changes could leave patients without coverage within the next year. I want to help the staff who guide patients through those changes.</p>
          {/* Interview-sourced human line (Better Stories pass, 2026-11-10); moved here from the hero 2026-11-17. */}
          <p className="rp-humanLine">A hospital leader told me: AI (artificial intelligence) helps hospitals prepare, and insurers deny.</p>
          <ol className="fp-themes rp-reveal">
            {THEMES.map((theme) => (
              <li key={theme.title}>
                <h3>{theme.title}</h3>
                <p>{theme.line}</p>
                {theme.crossCheck ? <span className="fp-themes__tag">Added after a second check with AI</span> : null}
              </li>
            ))}
          </ol>
          <CaseMore label="Who I interviewed, and what I did not hear">
            <p>UX Woman is a mentor-led UX design accelerator. For each interview, I grouped my notes by topic on one board. I also used six public sources. Nobody is named, and I collected no private health information.</p>
            <p>I mapped a patient's path step by step. I built it from the public rules and one sample letter, not from patients, so the feelings and chances to help on it are guesses. My map of clinic staff work blends several roles. Two of the people behind it work outside New York.</p>
          </CaseMore>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-findings" data-language-anchor="uxwoman-findings" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">I made two testable guesses.</h2>
          <div className="fp-hypotheses rp-reveal">
            <article>
              <span>Guess 1 · about the letter</span>
              <p>The public sample letter leaves out, hides or muddles at least one thing a reader needs.</p>
              <b>Test: check the letter against the list below</b>
            </article>
            <article>
              <span>Guess 2 · about the reader</span>
              <p>People who read it can't tell what applies to them, by when, or what counts as proof.</p>
              <b>Test: ask readers questions about it</b>
            </article>
          </div>
          <h3 className="fp-readerNeeds__title">Six things a reader needs to know</h3>
          <ul className="fp-readerNeeds" aria-label="Six things a reader needs to know">
            {READER_NEEDS.map((need) => <li key={need}>{need}</li>)}
          </ul>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-guide" data-language-anchor="uxwoman-guide" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">The guide I made.</h2>
          <div className="fp-guideScreens rp-reveal">
            {GUIDE_SCREENS.map((screen) => (
              <figure key={screen.src}>
                <img src={screen.src} alt={screen.alt} width={452} height={800} loading="lazy" decoding="async" />
                <figcaption>{screen.cap}</figcaption>
              </figure>
            ))}
          </div>
          <p className="fp-guideScreens__note">Design concept, not an official notice.</p>
          <CaseMore label="How the guide splits into two paths">
            <p>One question picks the path: is there a date on the letter? If yes, the guide shows what the letter asks, then a checklist with a button that adds the deadline to your calendar. If no, it shows where to find the date and how to reach a person. Every screen has a button to talk to a person.</p>
            <figure className="fp-guideWireframes">
              <img src="/assets/uxwoman/wireframes-branches.webp" alt="Four rough screens in two paths, each marked Design concept, not an official notice. Date found: What your letter asks, then Your checklist, with Add deadline to my calendar and Print the checklist buttons. No date: No date? Here's what to do, then Help from a person. Phone numbers are placeholders." width={1800} height={861} loading="lazy" decoding="async" />
              <figcaption>Rough screen sketches (wireframes): date found, or no date</figcaption>
            </figure>
            <p>My second idea is a status sheet for clinic staff. It shows who has each open request, what is missing and who acts next. It answers one question: is the next step mine?</p>
          </CaseMore>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="uxwoman-next"
        languageAnchor="uxwoman-next"
        title="Built, not yet tested."
        metrics={[
          { tag: "Test 1", n: "Letter check", label: "Score the sample letter on the six things a reader needs to know. Guess 1 holds if at least one is missing or unclear." },
          { tag: "Test 2", n: "Reader questions", label: "Adults ages 19 to 64 answer four questions about the letter, then say what else they needed. I'll set the passing score before the test runs." },
        ]}
        route={["Version 1: built, not tested", "Version 2: only if the tests find gaps", "Version 3: only if the state approves a way to offer it"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>From a letter to a next step.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <CopyEmail compact />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/knowunity"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Knowunity</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
