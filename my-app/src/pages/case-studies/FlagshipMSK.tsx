import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import CaseMore from "../../components/CaseMore";
import MSKFilingReceipt from "../../components/flagship/MSKFilingReceipt";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
import MSKServiceBlueprint from "../../components/MSKServiceBlueprint";
import MSKMechanism from "../../components/MSKMechanism";
import MSKSustainment from "../../components/MSKSustainment";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import Term from "../../components/Term";
import { MSK_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";
import CopyEmail from "../../components/CopyEmail";

const MSKSystemMap = lazy(() => import("../../components/MSKSystemMap"));

const CHAPTERS: CaseStudyChapter[] = [
  { id: "msk-start", label: "Start" },
  { id: "msk-brief", label: "Problem" },
  { id: "msk-workflow", label: "Workflow" },
  { id: "msk-decisions", label: "Decisions" },
  { id: "msk-redesigns", label: "Redesigns" },
  { id: "msk-systems", label: "Context" },
  { id: "msk-outcomes", label: "Outcomes" },
];

const ROLE_METHODS: Record<string, { term: string; body: string }> = {
  "01": {
    term: "Lean Six Sigma Green Belt (Purdue) · Master of Healthcare Administration (Rutgers)",
    body: "Both finished in this seat, while I was running a clinic’s paperwork. The Green Belt, a process-improvement certification, is the lens that showed one filing task crossing four departments.",
  },
  "02": {
    term: "Writing for the person who has to act",
    body: "No certificate for this one. Technical, legal copy kept clinicians from finishing CPR certification. I rewrote it for the person who has to act, and the department certified a month before the original deadline.",
  },
  "03": {
    term: "Training & Facilitation (ATD) · current-state mapping",
    body: "I instructed on Epic (the record software), HIPAA (the patient-privacy law), and the compliance modules. Owning how staff were taught the system meant documenting what actually happens, not what the policy says, and the gap between the two is where the design work lives.",
  },
};

// Which queue row each decision is about, so the artifact highlights the thing
// the sentence is describing rather than a generic row.
const DECISION_ROW = [0, 4, 2, 3];

// Claim audit 2026-10-13: Hillary confirmed these four rules are the
// portfolio recreation's design, not part of the button MSK built (IT and UX
// implemented it after she changed roles). The intro says so; keep it that way.
const DECISIONS = [
  { n: "01", title: "Show the action only when the record is ready", body: "Staff stop opening records that still need review.", note: "Ready means actionable" },
  { n: "02", title: "Make permission limits visible", body: "View-only roles see status and ownership, not a disabled mystery button.", note: "Permission is product logic" },
  { n: "03", title: "Separate blocked from not started", body: "Exceptions get a reason and an owner, so the backlog stops hiding them.", note: "Blocked needs an owner" },
  { n: "04", title: "Return people to the queue", body: "Staff land back where they started, status updated.", note: "Preserve place and context" },
];

const ROLES = [
  { n: "01", role: "Office Coordinator", taught: "Where people paused" },
  { n: "02", role: "Administrative Assistant", taught: "How to brief people who have to act" },
  { n: "03", role: "Training Facilitator", taught: "The authority to redesign it" },
];

// The text equivalent of the sustainment timeline: what happened after each
// system shipped, limited to what msk.md supports (see the lanes' comment).
const SURVIVED: { fact: string; what: React.ReactNode }[] = [
  {
    fact: "EMR filing workflow",
    what: "Added to the production system; I saw it while training new employees",
  },
  { fact: "CPR certification format", what: "Department compliant a month before the original deadline, no extension needed" },
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
const REDESIGNS: { n: string; title: React.ReactNode; finding: string; change: string; wrong?: string }[] = [
  {
    n: "01",
    title: <><Term def="Electronic medical record: the patient’s chart.">EMR</Term> filing workflow</>,
    finding: "Portal message → paper route → missing chart context.",
    change: "One action where the filing decision already happened.",
    wrong: "I misjudged how small it would look to IT. They deprioritized it as not worth the effort, and I had to keep raising it to get it built.",
  },
  {
    n: "02",
    title: "CPR certification",
    finding: "Technical, legal copy kept clinicians from finishing CPR (cardiopulmonary resuscitation) certification.",
    change: "The whole department certified a month before the original deadline, with no 4-month extension.",
  },
  {
    n: "03",
    title: "Administrative onboarding",
    finding: "One course ignored radically different starting skills.",
    change: "Cohort-specific instruction adapted a one-to-three-week program to the people in the room.",
  },
];

const WORKFLOW_BEFORE = [
  "Open the dashboard queue",
  "Find the message",
  "Print the portal message",
  "Route the paper to HIM (health information management)",
  "Wait for it to be scanned",
  "Return later to confirm filing",
];

const WORKFLOW_AFTER = [
  "Open the dashboard queue",
  "Select the message",
  "Choose Send to EMR",
  "It files to the patient’s chart",
  "Return with status updated",
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
            <h1 className="rp-h1">One queue. Four teams.</h1>
            <span className="rp-eyebrow">Memorial Sloan Kettering · Clinical systems · six years, three roles</span>
            <p className="rp-sub">
              I mapped a paper detour across four departments and pitched a digital filing workflow. <b>Information technology (IT) and user experience (UX) teams built it after I changed roles.</b>
            </p>
            {/* Interview-sourced human line (Better Stories pass, 2026-11-10); source: design-docs/case-study-stories. */}
            <p className="rp-humanLine">I printed the notes myself. Then we waited.</p>
            <dl className="rp-heroEvidence rp-heroEvidence--workflow" aria-label="MSK case evidence at a glance">
              {/* Two rows since 2026-10-16: contribution, implementation, and
                  evidence restated the sub above and the provenance note below. */}
              <div><dt>Role route</dt><dd>Office Coordinator → Administrative Assistant → Training Facilitator (retitled Trainer I Specialist)</dd></div>
            </dl>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--msk" data-evidence="true">
          <div className="fp-artifactLabel"><span>Recreated artifact</span><b>Office Coordinator filing queue</b></div>
          <div className="fp-dashboardFrame" role="group" aria-label="Recreated Office Coordinator filing queue concept">
            {/* Three rows tell the story (waiting, needs review, filed); the full queue made this hero 1,000px tall. */}
            <MSKDashboardMockup compact legendDisclosure rowIndices={[0, 2, 4]} />
          </div>
        </div>
      </header>

      <div data-evidence="true"><MSKFilingReceipt /></div>

      <section className="rp-section" id="msk-workflow" data-language-anchor="msk-workflow">
        <div className="rp-wrap">
          {/* The "recreated and anonymized" qualifier moved to the figcaption
              below, which already carries it — so the kicker is free to be a
              beat instead of a provenance label. */}
          <h2 className="rp-title">One map exposed the shared failure.</h2>
          {/* "The Detour" animatic was removed 2026-10-13 at the owner’s direction
              (the deterministic version was rejected at taste review on
              2026-08-31; the generated video was scrapped the same day). */}
          {/* Provenance, said once for the whole page (2026-10-16): the hero’s
              artifact label names the recreation; this note carries the
              "no patient data" boundary and what the evidence can and cannot
              claim (the former "Evidence boundary" aside). */}
          {/* These two lists are the text alternative for the aria-hidden map,
              so they stay. What went was the pair of paragraphs under them —
              "failure mode" and "design decision" restated the map’s own
              labels ("leaves the EMR" / "never leaves the EMR") in prose. */}
          <div className="fp-workflow rp-reveal" data-evidence="true">
            <article>
              <span className="fp-workflow__label">Before · six steps</span>
              <h3>Print, route, wait, check again</h3>
              <ol>{WORKFLOW_BEFORE.map((step, index) => <li key={step}><b>{index + 1}</b>{step}</li>)}</ol>
            </article>
            <i aria-hidden="true">→</i>
            <article className="fp-workflow__after">
              <span className="fp-workflow__label">After · five steps</span>
              <h3>File from the queue, return with status</h3>
              <ol>{WORKFLOW_AFTER.map((step, index) => <li key={step}><b>{index + 1}</b>{step}</li>)}</ol>
            </article>
          </div>
          <CaseMore label="How I made these screens">
            <div className="rp-note rp-reveal">
              <p className="rp-note__k">How I made these screens</p>
              <p>Rebuilt from memory of my current-state documentation. No patient data, exported records, or vendor interface. Observation counts didn’t survive, so I make no claim about how often this happened.</p>
            </div>
          </CaseMore>

        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">Inspect the complete service blueprint</b>
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
              <h3 className="rp-title">Six steps became five. One department left the loop.</h3>
              <p className="rp-lede">The visible change is one fewer step. The service change is one fewer department touching the record. Frontstage is work the coordinator can see; backstage happens out of sight, below the line of visibility.</p>
            </div>
            <div data-evidence="true"><MSKServiceBlueprint /></div>
          </div>
        </section>
      </details>

      <div data-evidence="true"><DecisionStory
        id="msk-decisions"
        languageAnchor="msk-decisions"
        title="One button, four rules."
        intro="One action replaced the three steps that left the system. These four rules are my portfolio design for making it safe to press, not MSK’s specification."
        steps={DECISIONS}
        showStepNumbers={false}
        visual={(active) => (
          <div className="fp-dashboardFrame fp-dashboardFrame--story">
            <MSKDashboardMockup compact hideEyebrow legendDisclosure activeRow={active === null ? null : DECISION_ROW[active] ?? null} />
          </div>
        )}
      /></div>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See the related MSK workflow redesigns</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section" id="msk-redesigns" data-language-anchor="msk-redesigns">
          <div className="rp-wrap">
            <h2 className="rp-title">The same failure, in two more places.</h2>
            <p className="rp-lede">Certification and onboarding had the same problem: the next action was buried.</p>
            <div className="fp-redesigns rp-reveal" data-evidence="true">
              {REDESIGNS.map((r) => (
                <article key={r.n}>
                  <h3>{r.title}</h3>
                  <MSKMechanism n={r.n} />
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
            <p className="rp-lede">You do not spot that pattern from outside a system. I had already sat in three of its seats.</p>
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
            {/* "Service design" appears in this page’s hero eyebrow and nowhere
                else on the site. It had a definition here once and I cut it as
                abstract, which left the discipline named and unsupported. This is
                the replacement: the claim is ownership of the whole path, which
                the workflow map above already proves, rather than a description
                of a method. */}
            <p className="fp-ownership rp-reveal" style={{ "--rp-reveal-stagger": "90ms" } as React.CSSProperties}>
              <b>Service-design scope:</b> the full path across systems, departments, permissions, and handoffs, not only the queue screen.
            </p>
            <div className="fp-mapWrap rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "270ms" } as React.CSSProperties}>
              <Suspense fallback={<div className="fp-mapFallback">Four departments, one task → mapped → redesigned → in production</div>}>
                <MSKSystemMap />
              </Suspense>
              <ol aria-label="Stages of the change"><li>Four departments, one task</li><li>Mapped</li><li>Redesigned</li><li>In production</li></ol>
            </div>
          </div>
        </section>
      </details>

      <section className="rp-section" id="msk-sustainment" data-language-anchor="msk-sustainment">
        <div className="rp-wrap">
          <h2 className="rp-title">I changed roles before launch. Here’s what happened next.</h2>
          {/* Added 2026-10-22 (portfolio review, UXfolio 2026 ch. 4.3): the
              outcome is owner-reported and no post-launch measurement is
              known, so the page says what would have shown it. Hillary
              confirmed nothing was measured to her knowledge; no result is
              claimed here. */}
          <figure className="fp-sustainmentFig rp-reveal" data-evidence="true">
            <MSKSustainment />
            <figcaption>What happened after each one shipped</figcaption>
          </figure>
          <CaseMore label="What happened and how I know">
            <div className="rp-note rp-reveal">
              <p className="rp-note__k">What I would have measured</p>
              <p>No one measured it that I know of. I would have tracked minutes from a message arriving to it sitting in the chart, messages filed to the wrong chart, and pages printed.</p>
            </div>
            {/* The real text for the drawing above, and the exact claim on each
                lane. Deliberately terse — the timeline is doing the work. */}
            <ul className="fp-survived">
              {SURVIVED.map((s) => (
                <li key={s.fact}><b>{s.fact}</b><span>{s.what}</span></li>
              ))}
            </ul>
            <a className="fp-proofLink" href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk" target="_blank" rel="noopener noreferrer">
              <span>Independent proof · MSK News</span><b className="rp-ext">From the military to Memorial Sloan Kettering</b><span className="sr-only"> (opens in new tab)</span>
            </a>
          </CaseMore>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="msk-outcomes"
        languageAnchor="msk-outcomes"
        title="The numbers."
        intro="Each tag says whose result it is."
        disclaimer="Anonymized, owner-reported. The original period and cost definition for the 20% were not preserved."
        // The same discipline the certification dashboard used on its own data:
        // say what you are looking at before someone has to work it out. All
        // three read as equal tiles otherwise, and "organization-wide" made the
        // most qualified number sound like the biggest one.
        // Four tiles since 2026-10-14 (msk.md, review answers 3–4): the
        // month-early CPR result leads, and the ~$1M/year sits beside the 20%
        // and 21,000+ as a labelled projection, never as measured savings.
        metrics={[
          { tag: "Led", n: "1 month", label: "early: the whole department certified before the original deadline, with no 4-month extension" },
          { tag: "Scope", n: "21,000+", label: "clinicians and administrative staff across the workflows in scope, not queue adoption" },
          { tag: "Initiative result", n: "20%", label: "organization-wide EMR cost reduction; not attributed solely to this filing workflow" },
          { tag: "Projection", n: "~$1M/year", label: "projected paper savings in my Process Improvement Fair pitch, not measured savings" },
        ]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I find the workaround. Then I get it built.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <CopyEmail />
          <ShareCaseStudy title="MSK: a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/grove"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Grove</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
