import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
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
import "../../styles/riso.css";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

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
    body: "Both finished in this seat, while I was running a clinic's paperwork. The Green Belt, a process-improvement certification, is the lens that showed one filing task crossing four departments.",
  },
  "02": {
    term: "Writing for the person who has to act",
    body: "No certificate for this one. Turning leadership decisions into clear briefs taught me to write for the person who has to act. The CPR rewrite and the EMR presentation both came from that practice.",
  },
  "03": {
    term: "Training & Facilitation (ATD) · current-state mapping",
    body: "I instructed on Epic (the record software), HIPAA (the patient-privacy law), and the compliance modules. Owning how staff were taught the system meant documenting what actually happens, not what the policy says — and the gap between the two is where the design work lives.",
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
    what: <><Term def="My own record, not independently measured.">Owner-reported</Term> as adopted organization-wide</>,
  },
  { fact: "CPR certification format", what: "Department compliant a month before the original deadline — no extension needed" },
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

/**
 * A decorative threshold, not another product interface. The exact action is
 * HTML and reuses the queue's existing visual class; the surrounding signals
 * only build anticipation for the complete, accessible decision story below.
 */
function MSKButtonThreshold() {
  const [isVisible, setIsVisible] = useState(false);
  const thresholdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = thresholdRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setIsVisible(true);
      observer.disconnect();
    }, { threshold: 0.42 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="msk-button-teaser"
      className={`fp-buttonThreshold${isVisible ? " is-visible" : ""}`}
      ref={thresholdRef}
      data-testid="msk-button-threshold"
    >
      <div className="fp-buttonThreshold__scene" aria-hidden="true">
        <span className="fp-buttonThreshold__folio">Readiness · permission · exception owner · return state</span>
        <span className="fp-buttonThreshold__registration">
          <i className="fp-buttonThreshold__impression fp-buttonThreshold__impression--01" />
          <i className="fp-buttonThreshold__impression fp-buttonThreshold__impression--02" />
          <i className="fp-buttonThreshold__impression fp-buttonThreshold__impression--03" />
          <i className="fp-buttonThreshold__impression fp-buttonThreshold__impression--04" />
        </span>
        <span className="fp-buttonThreshold__socket">
          <b className="msk-dashboard-action msk-dashboard-action--primary">Send to EMR</b>
        </span>
        <span className="fp-buttonThreshold__handoff" />
      </div>
    </div>
  );
}

export default function FlagshipMSK() {
  const { lang } = useLanguage();
  usePageTitle("MSK — Clinical Systems Case Study", lang !== "es");
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

      <div className="rp-breadcrumbRow">
        <nav className="rp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="rp-breadcrumb__name" title="Hillary Esposito">Hillary Esposito</Link> / <Link to="/?scrollTo=projects">Work</Link> / <span>Memorial Sloan Kettering</span>
        </nav>
      </div>
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
            <span className="rp-eyebrow">Memorial Sloan Kettering · clinical systems</span>
            <span className="rp-readtime"><b>6 min</b><span>read · 6 years, 3 roles</span></span>
            <p className="rp-sub">
              I diagnosed and mapped a paper detour across four departments, checked feasibility,
              and pitched a digital filing workflow. <b>Information technology (IT) and user experience (UX) teams built it after I changed roles.</b>
            </p>
            <dl className="rp-heroEvidence rp-heroEvidence--workflow" aria-label="MSK case evidence at a glance">
              {/* Two rows since 2026-10-16: contribution, implementation, and
                  evidence restated the sub above and the provenance note below. */}
              <div><dt>Role route</dt><dd>Office Coordinator → Administrative Assistant → Training Facilitator (retitled Trainer I Specialist)</dd></div>
              <div><dt>Design thread</dt><dd>Service design → process improvement → UX/product</dd></div>
            </dl>
            {/* The tour sits beside the hero action, not in the breadcrumb row,
                which pushed the H1 down on phones (2026-10-16). */}
            <div className="rp-hero__ctas rp-hero__ctas--tour">
              <a className="rp-cta" href="#msk-workflow">See the workflow →</a>
              <button
                type="button"
                className="rp-heroUtility rp-heroTour"
                onClick={(e) =>
                  window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: { returnFocus: e.currentTarget } }))
                }
              >
                Open the 90-second tour
              </button>
            </div>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--msk" data-evidence="true">
          <div className="fp-artifactLabel"><span>RECREATED ARTIFACT</span><b>Office Coordinator filing queue</b></div>
          <div className="fp-dashboardFrame" aria-label="Recreated Office Coordinator filing queue concept">
            <MSKDashboardMockup headingLevel={2} legendDisclosure />
          </div>
        </div>
      </header>

      <div data-evidence="true"><MSKFilingReceipt /></div>

      <section className="rp-section" id="msk-workflow" data-language-anchor="msk-workflow">
        <div className="rp-wrap">
          {/* The "recreated and anonymized" qualifier moved to the figcaption
              below, which already carries it — so the kicker is free to be a
              beat instead of a provenance label. */}
          <p className="rp-kicker">So I counted the steps</p>
          <h2 className="rp-title">One map made four departments see the same failure.</h2>
          {/* "The Detour" animatic was removed 2026-10-13 at the owner's direction
              (the deterministic version was rejected at taste review on
              2026-08-31; the generated video was scrapped the same day). */}
          {/* Provenance, said once for the whole page (2026-10-16): the hero's
              artifact label names the recreation; this note carries the
              "no patient data" boundary and what the evidence can and cannot
              claim (the former "Evidence boundary" aside). */}
          <div className="rp-note rp-reveal">
            <p className="rp-note__k">How these artifacts were made</p>
            <p>Rebuilt from memory of my current-state documentation. No patient data, exported records, or vendor interface. The workflow, departments, decisions, and outcomes survive; observation counts don’t, so no prevalence claim is made.</p>
          </div>
          {/* These two lists are the text alternative for the aria-hidden map,
              so they stay. What went was the pair of paragraphs under them —
              "failure mode" and "design decision" restated the map's own
              labels ("leaves the EMR" / "never leaves the EMR") in prose. */}
          <div className="fp-workflow rp-reveal" data-evidence="true">
            <article>
              <span className="fp-workflow__label">Before · six steps</span>
              <h3>Print, route, wait, check again</h3>
              <ol>{WORKFLOW_BEFORE.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</li>)}</ol>
            </article>
            <i aria-hidden="true">→</i>
            <article className="fp-workflow__after">
              <span className="fp-workflow__label">After · five steps</span>
              <h3>File from the queue, return with status</h3>
              <ol>{WORKFLOW_AFTER.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</li>)}</ol>
            </article>
          </div>

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
              <p className="rp-kicker">Then I counted the handoffs</p>
              <h3 className="rp-title">Six steps became five. One department left the loop.</h3>
              <p className="rp-lede">The visible change is one fewer step. The service change is one fewer department touching the record. Frontstage is work the coordinator can see; backstage happens out of sight, below the line of visibility.</p>
            </div>
            <div data-evidence="true"><MSKServiceBlueprint /></div>
          </div>
        </section>
      </details>

      <MSKButtonThreshold />

      <div data-evidence="true"><DecisionStory
        id="msk-decisions"
        languageAnchor="msk-decisions"
        kicker="The fix looked like one button"
        title="One button, four rules."
        intro="One action replaced the three steps that left the system. IT and UX built the real one after I changed roles; the four rules below are how this recreation makes it safe to press. My portfolio design, not MSK's specification."
        steps={DECISIONS}
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
            <p className="rp-kicker">Then it turned up twice more</p>
            <h2 className="rp-title">The same failure, in two more places.</h2>
            <p className="rp-lede">Certification and onboarding had the same problem: the next action was buried.</p>
            <div className="fp-redesigns rp-reveal" data-evidence="true">
              {REDESIGNS.map((r) => (
                <article key={r.n}>
                  <span className="fp-redesigns__n">{r.n}</span>
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
            <p className="rp-kicker">Why I could see it</p>
            <h2 className="rp-title">I did the jobs before I redesigned them.</h2>
            <p className="rp-lede">You do not spot that pattern from outside a system. I had already sat in three of its seats.</p>
            <ol className="fp-roleRail rp-reveal" aria-label="Three roles at MSK, in order" data-evidence="true" style={{ "--rp-reveal-stagger": "0ms" } as React.CSSProperties}>
              {ROLES.map((r) => {
                const method = ROLE_METHODS[r.n];
                return (
                  <li key={r.n}>
                    <span className="fp-roleRail__n">{r.n}</span>
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
            {/* "Service design" appears in this page's hero eyebrow and nowhere
                else on the site. It had a definition here once and I cut it as
                abstract, which left the discipline named and unsupported. This is
                the replacement: the claim is ownership of the whole path, which
                the workflow map above already proves, rather than a description
                of a method. */}
            <p className="fp-ownership rp-reveal" style={{ "--rp-reveal-stagger": "90ms" } as React.CSSProperties}>
              <b>Service-design scope:</b> the full path across systems, departments, permissions, and handoffs—not only the queue screen.
            </p>
            <div className="fp-mapWrap rp-reveal" data-evidence="true" style={{ "--rp-reveal-stagger": "270ms" } as React.CSSProperties}>
              <Suspense fallback={<div className="fp-mapFallback">Four departments, one task → mapped → redesigned → adopted</div>}>
                <MSKSystemMap />
              </Suspense>
              <ol aria-label="Clinical system transformation stages"><li>Four departments, one task</li><li>Mapped</li><li>Redesigned</li><li>Adopted organization-wide</li></ol>
            </div>
          </div>
        </section>
      </details>

      <section className="rp-section" id="msk-sustainment" data-language-anchor="msk-sustainment">
        <div className="rp-wrap">
          <p className="rp-kicker">The real test came later</p>
          <h2 className="rp-title">I left before launch. Here’s what happened next.</h2>
          <p className="rp-lede">I handed the workflow to IT and UX, who built it. It was adopted organization-wide (owner-reported: my own record, not independently measured).</p>
          {/* Added 2026-10-22 (portfolio review, UXfolio 2026 ch. 4.3): the
              outcome is owner-reported and no post-launch measurement is
              known, so the page says what would have shown it. Hillary
              confirmed nothing was measured to her knowledge; no result is
              claimed here. */}
          <div className="rp-note rp-reveal">
            <p className="rp-note__k">What I would have measured</p>
            <p>No one measured it that I know of. I would have tracked minutes from a message arriving to it sitting in the chart, messages filed to the wrong chart, and pages printed.</p>
          </div>
          <figure className="fp-sustainmentFig rp-reveal" data-evidence="true">
            <MSKSustainment />
            <figcaption>What happened after each one shipped</figcaption>
          </figure>
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
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="msk-outcomes"
        languageAnchor="msk-outcomes"
        // "attribution kept intact" moved off the kicker — the `disclaimer`
        // prop below already states it, in its own dedicated line.
        kicker="What it added up to"
        title="The numbers, and who they belong to."
        intro="The tag above each number says whose result it is."
        disclaimer="Anonymized evidence · owner-reported outcomes · the 20% figure belongs to a larger organization-wide initiative, not the filing queue alone; original period and cost definition are not preserved · the ~$1M/year is a projection from my pitch, not measured savings"
        // The same discipline the certification dashboard used on its own data:
        // say what you are looking at before someone has to work it out. All
        // three read as equal tiles otherwise, and "organization-wide" made the
        // most qualified number sound like the biggest one.
        // Four tiles since 2026-10-14 (msk.md, review answers 3–4): the
        // month-early CPR result leads, and the ~$1M/year sits beside the 20%
        // and 21,000+ as a labelled projection, never as measured savings.
        metrics={[
          { tag: "Led", n: "1 month", label: "early: the whole department certified before the original deadline, with no 4-month extension" },
          { tag: "Scope", n: "21,000+", label: "clinicians and administrative staff across the workflows in scope — not queue adoption" },
          { tag: "Initiative result", n: "20%", label: "organization-wide EMR cost reduction; not attributed solely to this filing workflow" },
          { tag: "Projection", n: "~$1M/year", label: "projected paper savings in my Process Improvement Fair pitch, not measured savings" },
        ]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I find the workaround. Then I get it built.</h2>
          <p>I map it so every department sees the same failure, then turn it into a decision the organization will build.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <ShareCaseStudy title="MSK — a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/grove"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Grove</p><p className="rp-next__tag">Plant-care prototype · Phase 2 of 3</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
