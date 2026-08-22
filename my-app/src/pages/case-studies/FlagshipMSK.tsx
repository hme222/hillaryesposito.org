import React, { lazy, Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import MSKFilingReceipt from "../../components/flagship/MSKFilingReceipt";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
import MSKWorkflowMap from "../../components/MSKWorkflowMap";
import MSKServiceBlueprint from "../../components/MSKServiceBlueprint";
import MSKMechanism from "../../components/MSKMechanism";
import MSKSustainment from "../../components/MSKSustainment";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { MSK_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

const MSKSystemMap = lazy(() => import("../../components/MSKSystemMap"));

const CHAPTERS: CaseStudyChapter[] = [
  { id: "msk-start", label: "Start", note: "Digital records, printed to be filed digitally" },
  { id: "msk-brief", label: "Problem", note: "A digital workflow became a paper ritual" },
  { id: "msk-workflow", label: "Workflow", note: "A filing queue replaced the workaround" },
  { id: "msk-decisions", label: "Decisions", note: "The simple button was not simple" },
  { id: "msk-redesigns", label: "Redesigns", note: "The same failure, in two more places" },
  { id: "msk-systems", label: "Background", note: "Why I could see it" },
  { id: "msk-outcomes", label: "Outcomes", note: "Evidence that lasted" },
];

const ROLE_METHODS: Record<string, { term: string; body: string }> = {
  "01": {
    term: "Lean Six Sigma Green Belt (Purdue) · Master of Healthcare Administration (Rutgers)",
    body: "Both finished in this seat, while I was running a clinic's paperwork. The Green Belt is the lens that showed four systems doing the work of two; the MHA is why the redesign survived budget talks and leadership changes.",
  },
  "02": {
    term: "Writing for the person who has to act",
    body: "No certificate for this one. Turning leadership decisions into clear briefs taught me to write for the person who has to act. The CPR rewrite and the EMR presentation both came from that practice.",
  },
  "03": {
    term: "Training & Facilitation (ATD) · current-state mapping",
    body: "I instructed on Epic, HIPAA, and the compliance modules. Owning how staff were taught the system meant documenting what actually happens, not what the policy says — and the gap between the two is where the design work lives.",
  },
};

// Which queue row each decision is about, so the artifact highlights the thing
// the sentence is describing rather than a generic row.
const DECISION_ROW = [0, 4, 2, 3];

const DECISIONS = [
  { n: "01", title: "Show the action only when the record is ready", body: "Staff stop opening records that still need review.", note: "Ready means actionable" },
  { n: "02", title: "Make permission limits visible", body: "View-only roles see status and ownership, not a disabled mystery button.", note: "Permission is product logic" },
  { n: "03", title: "Separate blocked from not started", body: "Exceptions get a reason and an owner, so the backlog stops hiding them.", note: "Blocked needs an owner" },
  { n: "04", title: "Return people to the queue", body: "Staff land back where they started, status updated.", note: "Preserve place and context" },
];

const ROLES = [
  { n: "01", role: "Office Coordinator", taught: "Where people paused" },
  { n: "02", role: "Administrative Assistant", taught: "How evidence survives a room" },
  { n: "03", role: "Trainer I Specialist", taught: "The authority to redesign it" },
];

// The text equivalent of the sustainment timeline. Each line states what the
// system survived and that it is still standing — the claim, not just a label.
const SURVIVED = [
  { fact: "EMR filing workflow", what: "Adopted organization-wide, and still in use through two system upgrades" },
  { fact: "CPR certification format", what: "A two-month project that closed early — other admins still use the collection method today" },
  // "Clinician onboarding — still in use after three leadership transitions"
  // was removed on 2026-08-03. The programme was not clinician onboarding, and
  // the three-transitions claim was attached to that wrong description; nothing
  // has been verified about how long the real program ran.
];

// Restored from the earlier case study. The outcome metrics named certification
// and onboarding but the page no longer said what actually changed in either —
// the "70% efficiency gain" was a number with no mechanism under it.
// Each card carries a drawn mechanism (MSKMechanism). The diagrams already show
// the detour and the one hop, the 90/60/30 warnings against expiry, and five
// checklists collapsing into one gated path — so `change` says the thing the
// drawing cannot, and stops narrating the thing it can.
const REDESIGNS = [
  {
    n: "01",
    title: "EMR filing workflow",
    finding: "Digital record → paper route → missing chart context.",
    change: "One action where the filing decision already happened.",
    wrong: "I underestimated change management. Workstation training during shift changes fixed adoption in two weeks.",
  },
  {
    n: "02",
    title: "CPR certification",
    finding: "Technical legal copy stalled clinician completion.",
    change: "Plain-language material brought every certification in 70% before the slipping deadline.",
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
  "Find the document",
  "Print the digital record",
  "Route paper to imaging",
  "Wait for it to be scanned",
  "Return later to confirm filing",
];

const WORKFLOW_AFTER = [
  "Open the dashboard queue",
  "Select the document",
  "Choose Send to EMR",
  "It files inside the online chart",
  "Return with status updated",
];

export default function FlagshipMSK() {
  usePageTitle("MSK — Clinical Systems Case Study");
  const { lang } = useLanguage();
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

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>Memorial Sloan Kettering</span>
      </nav>
      <CaseStudyChapters project="Memorial Sloan Kettering" chapters={CHAPTERS} />
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
            <span className="rp-eyebrow">Memorial Sloan Kettering · clinical systems</span>
            <h1 className="rp-h1">A filing queue replaced a four-system workaround.</h1>
            <span className="rp-readtime"><b>6 min</b><span>read · 6 years, 3 roles</span></span>
            <p className="rp-sub">
              I mapped a paper detour across four departments and presented the digital workflow
              implemented two roles later. It supported work touching <b>21,000+ people</b> and
              remains in use through <b>two system upgrades</b>.
            </p>
            <a className="rp-cta" href="#msk-workflow">See the workflow →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--msk" data-evidence="true">
          <div className="fp-artifactLabel"><span>RECREATED ARTIFACT</span><b>Office Coordinator filing queue · no patient data</b></div>
          <div className="fp-dashboardFrame" aria-label="Recreated Office Coordinator filing queue concept">
            <MSKDashboardMockup headingLevel={2} />
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
          <h2 className="rp-title">The filing queue replaced the workaround.</h2>
          <p className="rp-lede">Nobody had written the whole path down. On one page, four departments saw the same failure instead of four versions of it.</p>
          <figure className="fp-workflowFig rp-reveal" data-evidence="true">
            <MSKWorkflowMap />
            <figcaption>Recreated current-state and future-state map · no patient data</figcaption>
          </figure>
          {/* Said once, as a decision. The short "no patient data" labels elsewhere on
              the page are the reminder; this is the reasoning behind them. */}
          <div className="rp-note rp-reveal">
            <p className="rp-note__k">How these artifacts were made</p>
            <p>Rebuilt from my current-state documentation. No patient data, exported records, or vendor interface.</p>
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

          {/* The step count is the visible change; the handoff is the real one.
              Same evidence as the map above, re-cut by actor instead of by step. */}
          <div className="fp-blueprintIntro rp-reveal">
            <p className="rp-kicker">Then I counted the handoffs</p>
            <h3 className="rp-title">One step removed a department.</h3>
            <p className="rp-lede">The measurable change was six steps to five. The service change was removing an invisible handoff.</p>
          </div>
          <div data-evidence="true"><MSKServiceBlueprint /></div>
        </div>
      </section>

      <div data-evidence="true"><DecisionStory
        id="msk-decisions"
        languageAnchor="msk-decisions"
        kicker="The fix looked like one button"
        title="The “simple” button carried the whole system."
        intro="One action replaced the three steps that left the system. Everything that made it safe to press had to be legible before anyone pressed it."
        steps={DECISIONS}
        visual={(active) => (
          <div className="fp-dashboardFrame fp-dashboardFrame--story">
            <MSKDashboardMockup compact activeRow={DECISION_ROW[active] ?? null} />
          </div>
        )}
      /></div>

      <section className="rp-section" id="msk-redesigns" data-language-anchor="msk-decisions">
        <div className="rp-wrap">
          <p className="rp-kicker">Then the same shape turned up again</p>
          <h2 className="rp-title">The same failure, in two more places.</h2>
          <p className="rp-lede">The same pattern appeared in certification and onboarding: the institution’s structure obscured the next action.</p>
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

      <section className="rp-section rp-override" id="msk-systems" data-language-anchor="msk-decisions">
        <div className="rp-wrap">
          <p className="rp-kicker">Why I could see it</p>
          <h2 className="rp-title">I learned the system from the floor up.</h2>
          <p className="rp-lede">You do not spot that pattern from outside a system. I had already sat in three of its seats.</p>
          <ol className="fp-roleRail rp-reveal" aria-label="Three roles at MSK, in order" data-evidence="true">
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
          <div className="fp-systemCards rp-reveal" data-evidence="true">
            <article><span>01 · Observe</span><h3>Find the workaround</h3><p>Real shifts exposed what policy maps missed.</p></article>
            <article><span>02 · Align</span><h3>Share one failure</h3><p>Four departments, one current-state map.</p></article>
            <article><span>03 · Redesign</span><h3>Sequence the action</h3><p>Show ownership, readiness, and exceptions.</p></article>
          </div>
          {/* "Service design" appears in this page's hero eyebrow and nowhere
              else on the site. It had a definition here once and I cut it as
              abstract, which left the discipline named and unsupported. This is
              the replacement: the claim is ownership of the whole path, which
              the workflow map above already proves, rather than a description
              of a method. */}
          <p className="fp-ownership rp-reveal">
            <b>Service-design scope:</b> the full path across systems, departments, permissions, and handoffs—not only the queue screen.
          </p>
          <aside className="rp-note rp-reveal" aria-label="MSK research evidence boundary">
            <span className="rp-note__k">Evidence boundary</span>
            <p>Workflow, departments, decisions, and outcomes survive. Observation counts do not; no prevalence claim is made.</p>
          </aside>
          <div className="fp-mapWrap" data-evidence="true">
            <Suspense fallback={<div className="fp-mapFallback">Tangled systems → mapped → redesigned → trusted</div>}>
              <MSKSystemMap />
            </Suspense>
            <ol aria-label="Clinical system transformation stages"><li>Tangled systems</li><li>Mapped</li><li>Redesigned</li><li>Trusted by clinicians</li></ol>
          </div>
        </div>
      </section>

      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">The real test came later</p>
          <h2 className="rp-title">Most internal tools die quietly. These did not.</h2>
          <p className="rp-lede">Adoption is the launch metric. Sustainment is the service metric.</p>
          <figure className="fp-sustainmentFig rp-reveal" data-evidence="true">
            <MSKSustainment />
            <figcaption>What each system survived, and where it stands now</figcaption>
          </figure>
          {/* The real text for the drawing above, and the exact claim on each
              lane. Deliberately terse — the timeline is doing the work. */}
          <ul className="fp-survived">
            {SURVIVED.map((s) => (
              <li key={s.fact}><b>{s.fact}</b><span>{s.what}</span></li>
            ))}
          </ul>
          <p className="fp-survivedWhy">The work moved from personal workaround to shared system; the plain-language format stayed useful after its project ended.</p>
          <a className="fp-proofLink" href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk" target="_blank" rel="noopener noreferrer" aria-label="Read Hillary Esposito's career profile in MSK News (opens in new tab)">
            <span>Independent proof · MSK News</span><b className="rp-ext">From the military to Memorial Sloan Kettering</b>
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
        intro="I initiated and presented the filing redesign, rewrote clinician certification material, and rebuilt administrative onboarding with the design team."
        disclaimer="Anonymized evidence · organization-wide results are attributed to the initiative"
        // The same discipline the certification dashboard used on its own data:
        // say what you are looking at before someone has to work it out. All
        // three read as equal tiles otherwise, and "organization-wide" made the
        // most qualified number sound like the biggest one.
        metrics={[
          { tag: "Scale", n: "21,000+", label: "clinicians and administrative staff across the workflows I redesigned" },
          { tag: "Contributed to", n: "20%", label: "organization-wide EMR cost reduction, inside a larger initiative" },
          { tag: "Led", n: "70%", label: "ahead of deadline — every CPR certification collected early, on a deadline that was about to be pushed back" },
        ]}
        route={["Observe the real work", "Map the failure", "Align the system", "Ship what lasts"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Designing a system people cannot afford to distrust?</h2>
          <p>I know how to find the workaround, make it visible, and turn it into a product decision a complicated organization can actually ship.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Send me a note →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/mobbin"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Mobbin</p><p className="rp-next__tag">UX flow documentation · 200+ screens</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
