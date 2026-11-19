import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import ResultLine from "../../components/flagship/ResultLine";
import MobbinIndexLens from "../../components/flagship/MobbinIndexLens";
import ScreenSequence, { ScreenSequenceItem } from "../../components/flagship/ScreenSequence";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import Term from "../../components/Term";
import { MOBBIN_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

const CHAPTERS: CaseStudyChapter[] = [
  { id: "mobbin-start", label: "Start" },
  { id: "mobbin-brief", label: "Problem" },
  { id: "mobbin-work", label: "The work" },
  { id: "mobbin-decisions", label: "Decisions" },
  { id: "mobbin-apps", label: "Apps" },
  { id: "mobbin-outcomes", label: "Outcomes" },
];

const APPS: ScreenSequenceItem[] = [
  { name: "Kikoff", category: "Credit building · a result after every step", image: "/assets/mobbin/kikoff.jpg", alt: "Kikoff credit-building app screen, one of the screens I captured", summary: "The sign-up is long, but each step pays you back with a score, a plan, or a sign that it worked." },
  { name: "Polymarket", category: "Betting on real events · odds and risk shown first", image: "/assets/mobbin/polymarket.jpg", alt: "Polymarket home screen listing live games, each team with a percentage chance", summary: "Before anyone puts money down, the odds, the rules for how a bet pays out, and the risk stay on screen." },
  { name: "Discover", category: "Banking · familiar screens, easy-to-find fine print", image: "/assets/mobbin/discover.jpg", alt: "Discover welcome screen with a Login button and links to register, contact support, or open an account", summary: "The app looks like the bank and card apps people already know. The fine print is easy to find." },
];

const STEPS = [
  { n: "01", title: "Screenshot the whole task", body: "Use the app like a real person would. Keep the blank screens, the error messages, and the screens that only make sense in order.", note: "In order, not a pile" },
  { n: "02", title: "Cut what won’t help", body: "Marketing welcome screens didn’t get the same space as signing up, paying, managing an account, or getting back into one.", note: "Real tasks in, splash screens out" },
  { n: "03", title: "Use Mobbin’s words", body: "A screen is easy to find only when its label matches what another designer types into search, not the words I happen to like.", note: "Mobbin’s words meant fewer redos" },
  { n: "04", title: "Write for someone I’ll never meet", body: "Each note has to say what the screen does, where it comes in the app, and why it matters, so nobody needs the app open.", note: "Makes sense with the app closed" },
];

// Which documented app sits beside each decision. Index into APPS. The pairing
// is by what each screen actually shows, nothing is claimed beyond that:
// 01 Kikoff's entry screen, the first screen of the walk the step describes.
// 02 Polymarket's live board, a working state with odds up front: the kind of
//    screen that earns its place over a splash.
// 03 Discover's welcome, which labels its flows with the words people already
//    search for (Login, Register, Open an Account).
// 04 Back to Kikoff: the closing step is about the annotation standing alone,
//    so the frame returns to the screen the walk started on.
const STEP_APP = [0, 1, 2, 0];

export default function FlagshipMobbin() {
  const { lang } = useLanguage();
  usePageTitle("Mobbin: App Screen Labeling Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" }), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={MOBBIN_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--mobbin" lang="en" ref={rootRef}>
      <RisoDefs />

      <CaseStudyChapters project="Mobbin" chapters={CHAPTERS} progress />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="mobbin-start" data-language-anchor="mobbin-start">
        <CartoField
          mapSrc="/riso/elevation-04.jpg"
          edition="struct"
          mapZoom={1.12}
          mapPosition="46% 42%"
        />
        <div className="rp-grain" />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <h1 className="rp-h1">Freelance documentation of three finance apps for{"\u00a0"}Mobbin</h1>
            <p className="rp-sub">
              Mobbin is a website where designers look up screenshots of real apps for ideas. As a freelancer, I spent four months on three apps: Kikoff, Polymarket, and Discover. I took screenshots of <b>200+ screens per app</b> and labeled each one by task, like logging in, so designers can find it. I did not design these apps or Mobbin.
            </p>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--mobbin fp-heroArt--fan" role="group" aria-label="Three finance app screens I captured for Mobbin" data-evidence="true">
          <div className="fp-fan">
            {APPS.map((app, index) => <div className={`fp-capture fp-capture--${index + 1}`} key={app.name}><img src={app.image} alt={index === 0 ? "Screens from three finance apps: Kikoff, Polymarket, and Discover" : ""} /></div>)}
          </div>
        </div>
      </header>

      <ResultLine
        eyebrow="What I did"
        text="I took screenshots of 200+ screens per app and labeled each one by task, so designers can find it."
      />

      {/* The "Documentation trace" evidence-poster section was removed on
          2026-08-03, matching Grove and MSK. */}

      <section className="rp-section" id="mobbin-work" data-language-anchor="mobbin-work">
        <div className="rp-wrap">
          <h2 className="rp-title">One screenshot doesn’t show the whole task.</h2>
          <p className="rp-lede">Designers come to Mobbin to see how apps handle a task, like logging in or opening an account.</p>
        </div>
      </section>

      <div data-evidence="true"><DecisionStory
        id="mobbin-decisions"
        languageAnchor="mobbin-decisions"
        title="Choosing what to keep was the work."
        steps={STEPS}
        // All three documented screens are mounted in one fixed-ratio frame and
        // the active step picks which one is visible (see STEP_APP), so the
        // swap is a crossfade with no decode flash and no height change.
        // Inactive frames are hidden from assistive tech; the visible one keeps
        // its app's alt text from APPS.
        visual={(active) => (
          <div className="fp-sequence__phone fp-sequence__phone--story fp-sequence__phone--stack">
            {APPS.map((app, index) => {
              const on = (active === null ? 0 : STEP_APP[active]) === index;
              return <img key={app.name} src={app.image} alt={app.alt} className={on ? "is-on" : undefined} aria-hidden={!on} />;
            })}
          </div>
        )}
      /></div>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See every screen I captured</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <div data-evidence="true"><MobbinIndexLens /></div>
        <section className="rp-section" id="mobbin-apps" data-language-anchor="mobbin-apps">
          <div className="rp-wrap">
            <h2 className="rp-title">Kikoff shows progress. Polymarket shows the risk. Discover feels familiar.</h2>
            <div data-evidence="true"><ScreenSequence label="Screens from three finance apps" items={APPS} /></div>

            <a
              className="fp-proofLink"
              href="https://mobbin.com/finance"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Check it on Mobbin · Finance+</span><b className="rp-ext">The library these screens went into</b><span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </section>
      </details>

      <div data-evidence="true"><EvidenceField
        id="mobbin-outcomes"
        languageAnchor="mobbin-outcomes"
        title="A searchable record of how three finance apps work."
        intro="My screenshots and labels went into Mobbin’s Finance+ library."
        metrics={[]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>After 200+ screens per app, I notice what makes an app feel safe to trust.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/msk"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Memorial Sloan Kettering</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
