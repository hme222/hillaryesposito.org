import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import CaseMore from "../../components/CaseMore";
import MSKFilingReceipt from "../../components/flagship/MSKFilingReceipt";
import MSKJourney from "../../components/MSKJourney";
import MSKServiceBlueprint from "../../components/MSKServiceBlueprint";
import MSKMechanism from "../../components/MSKMechanism";
import MSKSustainment from "../../components/MSKSustainment";
import ResultLine from "../../components/flagship/ResultLine";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { MSK_ES } from "../../data/spanishCaseStudies";
import { MSK_COPY } from "../../data/mskCaseStudy";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

const MSKSystemMap = lazy(() => import("../../components/MSKSystemMap"));

const CHAPTERS: CaseStudyChapter[] = [
  { id: "msk-start", label: "Start" },
  { id: "msk-brief", label: "Problem" },
  { id: "msk-workflow", label: "What I did" },
  { id: "msk-decisions", label: "Button rules" },
  { id: "msk-redesigns", label: "More fixes" },
  { id: "msk-systems", label: "Background" },
  { id: "msk-outcomes", label: "Results" },
];

const ROLE_METHODS: Record<string, { term: string; body: string }> = {
  "01": {
    term: "Lean Six Sigma Green Belt (Purdue) · Master of Healthcare Administration (Rutgers)",
    body: "I finished both in this job, while running a clinic’s paperwork. The Green Belt is a certificate in improving how work gets done. It’s how I saw one filing task passing through four departments.",
  },
  "02": {
    term: "Writing for the person doing the task",
    body: "No certificate for this one. I rewrote legal language for the people who had to follow it.",
  },
  "03": {
    term: "Training & Facilitation (ATD, the Association for Talent Development) · mapping how work really happens",
    body: "I taught Epic (the medical record software), HIPAA (the patient-privacy law), and the compliance courses. To teach the system well, I wrote down what staff really did, not what the policy said. The gap between the two is where the design work is.",
  },
};

// Claim audit 2026-10-13: Hillary confirmed these four rules are the
// portfolio recreation's design, not part of the button MSK built (IT and UX
// implemented it after she changed roles). The intro says so; keep it that way.
const DECISIONS = [
  { n: "01", title: "Show the button only when the message is ready", body: "So staff don’t open messages that still need a review.", note: "Ready means you can act on it" },
  { n: "02", title: "Show who is allowed to file", body: "Staff who can only view see the status and who has it, not a gray button with no reason.", note: "Who can do what is part of the design" },
  { n: "03", title: "Tell stuck messages apart from new ones", body: "A stuck message gets a reason and a person in charge, so it can’t hide in the pile.", note: "Stuck needs a person" },
  { n: "04", title: "Send people back to the queue", body: "After filing, staff land where they started, with the status updated.", note: "Don’t lose their place" },
];

const ROLES = [
  { n: "01", role: "Office Coordinator", taught: "Where people got stuck" },
  { n: "02", role: "Administrative Assistant", taught: "How to write for the person doing the task" },
  { n: "03", role: "Training Facilitator", taught: "The authority to redesign it" },
];

// The text equivalent of the sustainment timeline: what happened after each
// system shipped, limited to what msk.md supports (see the lanes' comment).
const SURVIVED: { fact: string; what: React.ReactNode }[] = [
  {
    fact: "Filing to the chart",
    what: "Added to the live system. I saw it there while training new employees.",
  },
  { fact: "CPR course rewrite", what: "The whole department certified a month before the original deadline. No extension needed." },
  // "Clinician onboarding — still in use after three leadership transitions"
  // was removed on 2026-08-03. The programme was not clinician onboarding, and
  // the three-transitions claim was attached to that wrong description; nothing
  // has been verified about how long the real program ran.
];

// Restored from the earlier case study. The outcome metrics named certification
// and onboarding but the page no longer said what actually changed in either.
// 2026-10-14: the CPR card leads with the month-early result; the 70% is gone
// from every page (msk.md, review answer 3).
// Each card carries a drawn mechanism (MSKMechanism). The diagrams already show
// the detour and the one hop, the 90/60/30 warnings against expiry, and five
// checklists collapsing into one gated path — so `change` says the thing the
// drawing cannot, and stops narrating the thing it can.
// The EMR filing card was cut 2026-11-17 (repetition cut): it repeated the
// main workflow inside a section titled "two more places".
// Each drawing is labelled as an illustration (synthesis-lens review 2026-11-19).
const REDESIGNS: { n: string; title: React.ReactNode; finding: string; change: string; illustration: string; wrong?: string }[] = [
  {
    n: "02",
    title: "CPR certification",
    finding: "The CPR (cardiopulmonary resuscitation) course was written in technical, legal language, so clinicians weren’t finishing it.",
    change: "I rewrote it in plain language. The whole department certified a month before the original deadline.",
    illustration: "Illustration, not the real text.",
  },
  {
    n: "03",
    title: "Training new office staff",
    finding: "Every new hire got the same course, no matter how much they already knew.",
    change: "I adjusted the one-to-three-week program for each group of new hires, based on who was in the room.",
    illustration: "Illustration, not the real course.",
  },
];

export default function FlagshipMSK() {
  const { lang } = useLanguage();
  usePageTitle("MSK: Clinical Systems Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" }), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={MSK_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--msk" lang="en" ref={rootRef}>
      <RisoDefs />

      <CaseStudyChapters project="Memorial Sloan Kettering" chapters={CHAPTERS} progress />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="msk-start" data-language-anchor="msk-start">
        <CartoField
          mapSrc="/assets/msk/mskcc-map.jpg"
          edition="eucalyptus"
          mapZoom={1.8}
          mapPosition="59% 73%"
          secondaryMapSrc="/riso/elevation-04.jpg"
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <h1 className="rp-h1">Service design project for Memorial <span className="rp-keep">Sloan Kettering</span> Cancer{"\u00a0"}Center</h1>
            <p className="rp-sub">
              As an office coordinator, I mapped how messages from the patient portal, the website patients use to write to their care team, moved through four departments, and I proposed a fix. The messages didn’t save to the patient’s electronic medical record (EMR), the digital chart. So I printed them, and we waited for them to be scanned in. I suggested a Send to EMR button so they would file straight to the record. <b>The hospital’s information technology (IT) and user experience (UX) teams built the real version.</b>
            </p>
            {/* The "Role route" row (her career path) was cut 2026-11-15 at
                Hillary's direction: Lex asked for her role on this project,
                which "What I did." now covers. The role ladder still appears
                lower on the page. */}
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--msk" data-evidence="true">
          {/* The hero picture is now the plain journey of one message, not the
              queue screen (portfolio feedback 2026-11-12: the visual on the right
              was unclear). The recreated queue screen was retired from this page on
              2026-11-15 (Lex: it "looks vibe-codeable"). */}
          <MSKJourney />
        </div>
      </header>

      <ResultLine eyebrow="What changed" text="Six steps became five, and one department dropped out." />

      <div data-evidence="true"><MSKFilingReceipt /></div>

      <section className="rp-section" id="msk-workflow" data-language-anchor="msk-workflow">
        <div className="rp-wrap">
          {/* The "recreated and anonymized" qualifier moved to the figcaption
              below, which already carries it — so the kicker is free to be a
              beat instead of a provenance label. */}
          <h2 className="rp-title">I talked to every team the paper touched.</h2>
          {/* "The Detour" animatic was removed 2026-10-13 at the owner’s direction
              (the deterministic version was rejected at taste review on
              2026-08-31; the generated video was scrapped the same day). */}
          {/* Provenance, said once for the whole page (2026-10-16): the hero’s
              artifact label names the recreation; this note carries the
              "no patient data" boundary and what the evidence can and cannot
              claim (the former "Evidence boundary" aside). */}
          {/* The word-for-word step lists were cut 2026-11-17 (repetition cut):
              both journey pictures already list the six and five steps as text. */}
          <p className="rp-lede rp-reveal">That was four departments: clinical, IT, operations, and health information management (HIM), the team that scans paper into charts. I worked with leadership on the rollout. I walked IT and UX through every decision in a full pitch, so the change was ready to build once it was funded.</p>
          <p className="rp-lede rp-reveal">On screen, the change was one fewer step. Behind the scenes, one whole department no longer had to handle the message.</p>
          <CaseMore label="Where this comes from">
            <div className="rp-note rp-reveal">
              <p>I redrew these pictures from memory of my own notes on how the work was done. They hold no patient data, no exported records, and no copies of the real software’s screens. My counts from watching the work were lost, so I make no claim about how often this happened.</p>
            </div>
          </CaseMore>

        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See who held the message at each step</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section">
          <div className="rp-wrap">
            {/* The step count is the visible change; the handoff is the real one.
                Same evidence as the map above, re-cut by actor instead of by step. */}
            <div className="fp-blueprintIntro rp-reveal">
              <p className="rp-lede">Work above the line is what the coordinator could see. Work below it happened out of sight.</p>
            </div>
            <div data-evidence="true"><MSKServiceBlueprint /></div>
          </div>
        </section>
      </details>

      <div data-evidence="true"><DecisionStory
        id="msk-decisions"
        languageAnchor="msk-decisions"
        title="I set four rules for how the button behaves."
        intro="I wrote these four rules for this portfolio version. They are not MSK’s actual design."
        // Restates the three measures under "What I would have measured" below.
        introNote={MSK_COPY.en.decisions.check}
        steps={DECISIONS}
        showStepNumbers={false}
        visual={() => (
          // The recreated queue screen used to sit here. Lex (2026-11-13) said it
          // "looks vibe-codeable"; Hillary chose the journey picture instead
          // (2026-11-15), opened on the After path the four rules describe.
          <div className="fp-journeyFrame--story"><MSKJourney afterOnly /></div>
        )}
      /></div>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See two more fixes I made at MSK</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section" id="msk-redesigns" data-language-anchor="msk-redesigns">
          <div className="rp-wrap">
            <h2 className="rp-title">I found the same problem in two more places.</h2>
            {/* Was "people couldn't tell what to do next", which only the CPR card
                showed. Now labelled as her reading, true of both (2026-11-19). */}
            <p className="rp-lede">{MSK_COPY.en.redesigns.lede}</p>
            <div className="fp-redesigns rp-reveal" data-evidence="true">
              {REDESIGNS.map((r) => (
                <article key={r.n}>
                  <h3>{r.title}</h3>
                  <MSKMechanism n={r.n} />
                  <p className="fp-redesigns__source">{r.illustration}</p>
                  <p className="fp-redesigns__finding">{r.finding}</p>
                  <p className="fp-redesigns__change">{r.change}</p>
                  {r.wrong && (
                    <p className="fp-redesigns__wrong"><b>What I got wrong</b>{r.wrong}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rp-section rp-override" id="msk-systems" data-language-anchor="msk-systems">
          <div className="rp-wrap">
            <h2 className="rp-title">I did the jobs before I redesigned them.</h2>
            <p className="rp-lede">You don’t spot a problem like this from outside. I had already done three jobs inside it.</p>
            <ol className="fp-roleRail rp-reveal" aria-label="Three roles at MSK, in order" data-evidence="true" style={{ "--rp-reveal-stagger": "0ms" } as React.CSSProperties}>
              {ROLES.map((r) => {
                const method = ROLE_METHODS[r.n];
                return (
                  <li key={r.n}>
                    <b>{r.role}</b>
                    <span className="fp-roleRail__taught">{r.taught}</span>
                    <details className="fp-roleRail__method">
                      <summary>
                        <span className="fp-roleRail__summaryLabel">The method it gave me</span>
                        <span className="fp-roleRail__chev" aria-hidden="true" />
                      </summary>
                      <div>
                        <b>{method.term}</b>
                        <p>{method.body}</p>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ol>
            {/* "Service design" had a definition here once and I cut it as
                abstract, which left the discipline named and unsupported. This is
                the replacement: the claim is ownership of the whole path, which
                the workflow map above already proves, rather than a description
                of a method. */}
            <p className="fp-ownership rp-reveal" style={{ "--rp-reveal-stagger": "90ms" } as React.CSSProperties}>
              <b>My scope:</b> the whole path the message took, across software, departments, who was allowed to do what, and every handoff. Not just one screen.
            </p>
            <div className="fp-mapWrap rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "270ms" } as React.CSSProperties}>
              <Suspense fallback={<div className="fp-mapFallback">One task, four departments → mapped → redesigned → in the live system</div>}>
                <MSKSystemMap />
              </Suspense>
              <ol aria-label="Stages of the change"><li>One task, four departments</li><li>Mapped</li><li>Redesigned</li><li>In the live system</li></ol>
            </div>
          </div>
        </section>
      </details>

      <section className="rp-section" id="msk-sustainment" data-language-anchor="msk-sustainment">
        <div className="rp-wrap">
          <h2 className="rp-title">What happened after I left that role.</h2>
          <p className="rp-lede rp-reveal">IT approved it once funding came in and built it as I pitched it. I don’t know what changed behind the scenes. Later, while training new employees, I saw it in the live system.</p>
          {/* Added 2026-10-22 (portfolio review, UXfolio 2026 ch. 4.3): the
              outcome is owner-reported and no post-launch measurement is
              known, so the page says what would have shown it. Hillary
              confirmed nothing was measured to her knowledge; no result is
              claimed here. */}
          <figure className="fp-sustainmentFig rp-reveal" data-evidence="true">
            <MSKSustainment />
          </figure>
          <CaseMore label="What happened and how I know">
            <div className="rp-note rp-reveal">
              <p className="rp-note__k">What I would have measured</p>
              <p>As far as I know, no one measured it. I would have tracked three things: minutes from a message arriving to it landing in the chart, messages filed to the wrong patient’s chart, and pages printed.</p>
            </div>
            {/* The real text for the drawing above, and the exact claim on each
                lane. Deliberately terse — the timeline is doing the work. */}
            <ul className="fp-survived">
              {SURVIVED.map((s) => (
                <li key={s.fact}><b>{s.fact}</b><span>{s.what}</span></li>
              ))}
            </ul>
            <a className="fp-proofLink" href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk" target="_blank" rel="noopener noreferrer">
              <span>Profile · MSK News</span><b className="rp-ext">From the military to Memorial Sloan Kettering</b><span className="sr-only"> (opens in new tab)</span>
            </a>
          </CaseMore>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="msk-outcomes"
        languageAnchor="msk-outcomes"
        title="What changed, and who gets the credit."
        disclaimer="Details anonymized. I have no record of what time period the 20% covers."
        // The same discipline the certification dashboard used on its own data:
        // say what you are looking at before someone has to work it out. All
        // three read as equal tiles otherwise, and "organization-wide" made the
        // most qualified number sound like the biggest one.
        // Four tiles since 2026-10-14 (msk.md, review answers 3–4): the
        // month-early CPR result leads, and the ~$1M/year sits beside the 20%
        // as a labelled projection, never as measured savings. 2026-11-18
        // (admissions review, answers 7–9): 21,000+ was MSK's whole headcount,
        // not the workflow's reach, so it left; ~2,000 is her own estimate of
        // the new employees she trained; the 20% is printing and scanning costs.
        metrics={[
          { tag: "Led", n: "1 month", label: "early: the whole department certified before the original deadline, with no 4-month extension" },
          { tag: "Trained", n: "~2,000", label: "new employees I trained on Epic, HIPAA, and compliance. My estimate: about one group of 30 a week for two years." },
          { tag: "Initiative result", n: "20%", label: "lower printing and scanning costs, from my review of the numbers with the head of the finance department; not attributed solely to this filing workflow" },
          { tag: "Projection", n: "~$1M/year", label: "projected paper savings in my Process Improvement Fair pitch, not measured savings" },
        ]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I find the workaround. Then I get it built.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/ux-woman"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">UX Woman</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
