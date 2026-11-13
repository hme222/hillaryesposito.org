import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import EvidenceField from "../../components/flagship/EvidenceField";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { UXWOMAN_ES } from "../../data/spanishCaseStudies";
import { UXWOMAN_LEDGER } from "../../data/uxWomanCaseStudy";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";
import CopyEmail from "../../components/CopyEmail";
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
  { id: "uxwoman-research", label: "Research" },
  { id: "uxwoman-findings", label: "Hypotheses" },
  { id: "uxwoman-guide", label: "Guide" },
  { id: "uxwoman-next", label: "Next step" },
];

const THEMES: { title: string; line: string; crossCheck?: boolean }[] = [
  { title: "Who owns it?", line: "No one sees where a request sits." },
  { title: "Real-life barriers", line: "Housing, transport and caregivers change the plan." },
  { title: "Chasing by hand", line: "Phone, fax, many clicks." },
  { title: "AI helps, a human checks", line: "Staff check what the AI produces." },
  { title: "Proving the treatment is needed", line: "Denials turn on paperwork.", crossCheck: true },
  { title: "Insurer rules are unclear", line: "Rules differ; reasons are hidden.", crossCheck: true },
];

const READER_NEEDS = ["Where it stands", "What is missing", "Who acts next", "The date", "A person to call", "What counts as proof"];

const GUIDE_SCREENS = [
  { src: "/assets/uxwoman/guide-1.webp", cap: "Home", alt: "Guide home screen: Understand the Medicaid work requirement. Options: see if it may apply to me, dates, I got a letter. A Talk to a person button." },
  { src: "/assets/uxwoman/guide-2.webp", cap: "Does it apply? Question 1 of 4", alt: "Question 1 of 4: Do you have Medicaid in New York? Options: yes, not yet, no, I do not know." },
  { src: "/assets/uxwoman/guide-3.webp", cap: "Your renewal date", alt: "Your renewal date: starts Jan 1, 2027, and your own date decides. A date field and a note that a renewal on or before Feb 1, 2027 does not need it." },
];

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
            <h1 className="rp-h1">A letter with a deadline and no clear next{"\u00a0"}step.</h1>
            <p className="rp-sub">
              I turned six interviews with clinic and insurer staff into a guide for one New York Medicaid letter. <b>It is untested, and no patient was interviewed.</b>
            </p>
            {/* Interview-sourced human line (Better Stories pass, 2026-11-10); source: design-docs/case-study-stories. */}
            <p className="rp-humanLine">A hospital leader told me: AI helps hospitals prepare, and insurers deny.</p>
            <dl className="rp-heroEvidence" aria-label="UX Woman case evidence at a glance">
              <div><dt>Role</dt><dd>Sole researcher and designer · UX Woman UX Design Accelerator · 2026</dd></div>
              <div><dt>I made</dt><dd>Affinity map · persona · journey maps · user flows · wireframes · hi-fi prototype</dd></div>
            </dl>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--uxwoman" data-evidence="true">
          <dl className="fp-ledger" aria-label="Evidence to date">
            {UXWOMAN_LEDGER.map((row) => (
              <div key={row.en}><dt>{row.en}</dt><dd>{row.n}</dd></div>
            ))}
          </dl>
        </div>
      </header>

      <section className="rp-section" id="uxwoman-problem" data-language-anchor="uxwoman-problem" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Coverage can be lost to a missed response.</h2>
          <dl className="fp-letterStats rp-reveal">
            <div>
              <dt>Projected, New York</dt>
              <dd><b>475,000+</b> could lose coverage, per the New York Department of Health (“at least”)</dd>
            </div>
            <div>
              <dt>Already seen, Arkansas 2018</dt>
              <dd><b>18,164</b> lost coverage under a work requirement</dd>
            </div>
          </dl>
          <p className="fp-letterStats__note">Public data. A projection and an observed count are different measures.</p>
          <CaseMore label="The question I took to the letter">
            <p className="rp-lede">Does the letter say what applies, by when, what to do, and what counts as proof?</p>
          </CaseMore>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-research" data-language-anchor="uxwoman-research" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Six interviews, six themes.</h2>
          <ol className="fp-themes rp-reveal">
            {THEMES.map((theme) => (
              <li key={theme.title}>
                <h3>{theme.title}</h3>
                <p>{theme.line}</p>
                {theme.crossCheck ? <span className="fp-themes__tag">Added after an AI cross-check</span> : null}
              </li>
            ))}
          </ol>
          <CaseMore label="Who I interviewed, and what I did not hear">
            <p>UX Woman is a 7-month, mentor-led UX design accelerator. Six interviews with clinic and insurer staff, one affinity board per interview, plus six publicly available sources. No patient was interviewed. Participants are anonymized and no protected health information was collected.</p>
            <p>The patient journey map was built from public rule text and one sample notice, so its feelings and opportunities are hypotheses. The clinic staff journey map is a composite of roles; two of the people behind it work outside New York.</p>
          </CaseMore>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-findings" data-language-anchor="uxwoman-findings" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Two hypotheses about one letter.</h2>
          <div className="fp-hypotheses rp-reveal">
            <article>
              <span>Hypothesis 1 · the letter</span>
              <p>The public sample leaves out, buries or blurs at least one thing a reader needs.</p>
              <b>Test: audit the letter</b>
            </article>
            <article>
              <span>Hypothesis 2 · the reader</span>
              <p>Readers cannot say what applies, by when, or what counts as proof.</p>
              <b>Test: readers answer</b>
            </article>
          </div>
          <h3 className="fp-readerNeeds__title">Six things a reader needs</h3>
          <ul className="fp-readerNeeds" aria-label="Six things a reader needs">
            {READER_NEEDS.map((need) => <li key={need}>{need}</li>)}
          </ul>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-guide" data-language-anchor="uxwoman-guide" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">A guide that starts from the letter in your hand.</h2>
          <div className="fp-guideScreens rp-reveal">
            {GUIDE_SCREENS.map((screen) => (
              <figure key={screen.src}>
                <img src={screen.src} alt={screen.alt} width={452} height={800} loading="lazy" decoding="async" />
                <figcaption>{screen.cap}</figcaption>
              </figure>
            ))}
          </div>
          <p className="fp-guideScreens__note">Design concept, not an official notice. Built, not yet tested with readers.</p>
          <CaseMore label="How the guide branches">
            <p>One question sets the path: is there a date on the letter? With a date, the guide shows what the letter asks and a checklist you can add to your calendar. Without one, it shows where to find the date and how to reach a person. Every screen has a talk-to-a-person bar.</p>
            <figure className="fp-guideWireframes">
              <img src="/assets/uxwoman/wireframes-branches.webp" alt="Wireframes of the two branches. Date found: what your letter asks, then your checklist. No date: what to do, then help from a person." width={1800} height={861} loading="lazy" decoding="async" />
              <figcaption>Wireframes: date found, or no date</figcaption>
            </figure>
            <p>A second concept is a status sheet for clinic staff. It shows who owns each open request, what is missing and who acts next, and asks one question: is the next action mine?</p>
          </CaseMore>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="uxwoman-next"
        languageAnchor="uxwoman-next"
        title="Built, not yet tested."
        intro="Two tests come next: an audit of the letter, then readers answering questions about it."
        disclaimer="Six interviews with clinic and insurer staff · no patient interviews · journey maps built from public rule text and one sample notice · nothing tested with readers yet"
        metrics={[
          { tag: "Test 1", n: "Audit", label: "Rate the sample letter on the six things a reader needs. Holds if at least one is absent or ambiguous." },
          { tag: "Test 2", n: "Readers", label: "Adults 19 to 64 answer four questions about the letter, then say what else they needed. Pass bar to be set before it runs." },
        ]}
        route={["v1: built, untested", "v2: only if tests find gaps", "v3: only if a state-approved route allows it"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>From a letter to a next step.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <CopyEmail />
          <ShareCaseStudy title="UX Woman: a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/mobbin"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Mobbin</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
