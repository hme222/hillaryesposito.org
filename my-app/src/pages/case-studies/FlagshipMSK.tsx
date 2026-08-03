import React, { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import { EvidenceMediaPoster } from "../../components/evidence-media";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
import MSKWorkflowMap from "../../components/MSKWorkflowMap";
import MSKMechanism from "../../components/MSKMechanism";
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
  { id: "msk-start", label: "Start", note: "The contradiction" },
  { id: "msk-brief", label: "Problem", note: "A digital workflow became a paper ritual" },
  { id: "msk-workflow", label: "Workflow", note: "Four systems became two" },
  { id: "msk-decisions", label: "Decisions", note: "The simple button was not simple" },
  { id: "msk-systems", label: "Systems", note: "Six years on the floor" },
  { id: "msk-outcomes", label: "Outcomes", note: "Evidence that lasted" },
];

// Each body used to restate what the artifact beside it already shows — the
// mockup carries the ready-to-file state, the permission rule, and the row
// statuses in full. The text now says only the part the picture cannot.
const DECISIONS = [
  { n: "01", title: "Show the action only when the record is ready", body: "Staff stop opening records that still need review.", note: "Ready means actionable" },
  { n: "02", title: "Make permission limits visible", body: "View-only roles see status and ownership, not a disabled mystery button.", note: "Permission is product logic" },
  { n: "03", title: "Separate blocked from not started", body: "Exceptions get a reason and an owner, so the backlog stops hiding them.", note: "Blocked needs an owner" },
  { n: "04", title: "Return people to the queue", body: "Staff land back where they started, status updated.", note: "Preserve place and context" },
];

// Six years, three roles. This was a 62-word paragraph with three definitions
// folded into em-dashes; as a rail it reads as the ladder it actually was.
const ROLES = [
  { n: "01", role: "Office Coordinator", taught: "Where people paused" },
  { n: "02", role: "Administrative Assistant", taught: "How evidence survives a room" },
  { n: "03", role: "Training Specialist", taught: "The authority to redesign it" },
];

// The three sustainment facts, as evidence rather than a sentence each.
const SURVIVED = [
  { fact: "Two system upgrades", what: "EMR filing redesign, adopted organization-wide" },
  { fact: "Became the default", what: "Certification compliance dashboard" },
  { fact: "Three leadership transitions", what: "Onboarding changes" },
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
    finding: "A digital record was printed, routed out, then waited to reappear in the chart.",
    change: "One dashboard action, placed where the decision was already being made.",
    wrong: "I underestimated change management. Training on their own workstations, during shift changes, fixed it in two weeks.",
  },
  {
    n: "02",
    title: "Certification tracking",
    finding: "The tracking spreadsheet had no alerts. Staff learned a certification had lapsed when compliance flagged it.",
    change: "The old system told you when you had failed. The new one tells you what is coming.",
  },
  {
    n: "03",
    title: "Clinician onboarding",
    finding: "Onboarding was split across five or more departments, each with its own checklist. Safety protocols sometimes finished weeks after a clinician started seeing patients.",
    change: "One sequenced path, gated on safety.",
    wrong: "I built the first version for managers, not new hires. Clinicians needed one clear next step on day one.",
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
  "Choose File to chart",
  "File inside the online chart",
  "Return with status updated",
];

export default function FlagshipMSK() {
  usePageTitle("MSK — Clinical Systems Case Study");
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  if (lang === "es") return <SpanishCaseStudy data={MSK_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--msk" lang="en" ref={rootRef}>
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>Memorial Sloan Kettering</span>
      </nav>
      <CaseStudyChapters project="Memorial Sloan Kettering" chapters={CHAPTERS} />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="msk-start">
        <CartoField
          mapSrc="/assets/msk/mskcc-map.jpg"
          edition="eucalyptus"
          mapZoom={1.8}
          mapPosition="59% 73%"
          secondaryMapSrc="/riso/elevation-04.jpg"
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Service design · process improvement · clinical systems</span>
            <h1 className="rp-h1">Memorial Sloan Kettering.</h1>
            <span className="rp-readtime"><b>5 min</b><span>read · 6 years, 3 roles</span></span>
            <p className="rp-sub">
              Clinicians printed digital records just to file them digitally again. I mapped the real
              workflow, aligned clinical, IT, and operations, and redesigned systems touching{" "}
              <b>21,000+ clinicians and staff</b>.
            </p>
            <a className="rp-cta" href="#msk-workflow">See the workflow →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--msk">
          <div className="fp-artifactLabel"><span>RECREATED ARTIFACT</span><b>Dashboard concept · no patient data</b></div>
          <div className="fp-dashboardFrame" aria-label="Recreated MSK dashboard concept">
            <MSKDashboardMockup compact headingLevel={2} />
          </div>
        </div>
      </header>

      <section className="rp-section evidence-media-section" aria-labelledby="msk-evidence-title">
        <div className="rp-wrap">
          <div className="evidence-media-section__intro">
            <p className="rp-kicker">Workflow trace · 30-second scan</p>
            <h2 className="rp-title" id="msk-evidence-title">MSK workflow redesign</h2>
          </div>
          <EvidenceMediaPoster project="msk" />
        </div>
      </section>

      <section className="rp-cinema fp-cinema" id="msk-brief" aria-labelledby="msk-brief-title">
        <div className="rp-cinema__sticky">
          <div className="rp-cinema__wash" aria-hidden="true" />
          <div className="fp-cinemaCore fp-cinemaCore--workflow" aria-hidden="true">
            <div><span>BEFORE</span><b>Dashboard → paper → imaging → EMR</b><small>Four systems for one filing.</small></div>
            <i>→</i>
            <div><span>AFTER</span><b>Dashboard → online chart</b><small>The record never leaves the screen.</small></div>
          </div>
          <div className="rp-cinema__artifact rp-cinema__artifact--reminder"><span>Floor observation</span><b>People built workarounds because the official path failed.</b></div>
          <div className="rp-cinema__artifact rp-cinema__artifact--safety"><span>Design constraint</span><b>Roles, permissions, states, and audit trails.</b></div>
          <div className="rp-cinema__bridge">
            <p className="rp-kicker">The problem, before the interface</p>
            <h2 id="msk-brief-title">The digital workflow had become a paper ritual.</h2>
            {/* EMR is used five times on this page and was never defined in
                English — while the Spanish version defines it. Defined here, at
                first real use, rather than assuming the reader already knows. */}
            <p>Every clinical day runs through the EMR — the electronic medical record, the digital chart where a patient’s whole history lives. Four systems stood between a clinician and one finished task.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="msk-workflow">
        <div className="rp-wrap">
          <p className="rp-kicker">Primary artifact · recreated and anonymized</p>
          <h2 className="rp-title">Four systems became two.</h2>
          <p className="rp-lede">Counting the steps made the failure visible to every team at once.</p>
          <figure className="fp-workflowFig rp-reveal">
            <MSKWorkflowMap />
            <figcaption>Recreated current-state and future-state map · no patient data</figcaption>
          </figure>
          {/* These two lists are the text alternative for the aria-hidden map,
              so they stay. What went was the pair of paragraphs under them —
              "failure mode" and "design decision" restated the map's own
              labels ("leaves the EMR" / "never leaves the EMR") in prose. */}
          <div className="fp-workflow rp-reveal">
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

      <DecisionStory
        id="msk-decisions"
        kicker="Interaction logic · one state at a time"
        title="The “simple” button carried the whole system."
        intro="Who could act, what status meant, and how the system recovered had to be legible before anyone clicked."
        steps={DECISIONS}
        visual={<div className="fp-dashboardFrame fp-dashboardFrame--story"><MSKDashboardMockup compact /></div>}
      />

      <section className="rp-section rp-override" id="msk-systems">
        <div className="rp-wrap">
          <p className="rp-kicker">Six years · three roles</p>
          <h2 className="rp-title">I learned the system from the floor up.</h2>
          {/* Was one 62-word paragraph with three job definitions folded into
              em-dashes. The progression was the point, so it is drawn as a
              progression. */}
          <ol className="fp-roleRail rp-reveal" aria-label="Three roles at MSK, in order">
            {ROLES.map((r) => (
              <li key={r.n}>
                <span className="fp-roleRail__n">{r.n}</span>
                <b>{r.role}</b>
                <span className="fp-roleRail__taught">{r.taught}</span>
              </li>
            ))}
          </ol>
          <div className="fp-systemCards rp-reveal">
            <article><span>01 · Observe</span><h3>Find the workarounds</h3><p>Shadow real shifts. The sticky notes and personal spreadsheets told the truth the policy map missed.</p></article>
            <article><span>02 · Align</span><h3>Make the failure shared</h3><p>Current-state maps gave four departments one picture to argue with instead of four email threads.</p></article>
            <article><span>03 · Redesign</span><h3>Sequence the next action</h3><p>Move the task to where the decision already happens, then make ownership and exceptions visible.</p></article>
          </div>
          {/* The lead paragraph that used to sit here defined service design and
              process improvement in the abstract. The three cards above already
              demonstrate it, so only the credentials remain. */}
          <div className="fp-discipline rp-reveal">
            <dl>
              <div>
                <dt>Lean Six Sigma</dt>
                <dd>A method for removing waste from a process. The lens that showed four systems doing the work of two.</dd>
              </div>
              <div>
                <dt>Master of Health Administration (MHA)</dt>
                <dd>How hospitals fund, staff, and govern. Why the redesign survived budget talks and leadership changes.</dd>
              </div>
              <div>
                <dt>Current-state mapping</dt>
                <dd>What actually happens, not what the policy says. The gap between the two is where the design work lives.</dd>
              </div>
            </dl>
          </div>
          <div className="fp-mapWrap">
            <Suspense fallback={<div className="fp-mapFallback">Tangled systems → mapped → redesigned → trusted</div>}>
              <MSKSystemMap />
            </Suspense>
            <ol aria-label="Clinical system transformation stages"><li>Tangled systems</li><li>Mapped</li><li>Redesigned</li><li>Trusted by clinicians</li></ol>
          </div>
        </div>
      </section>

      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">Three redesigns · what actually changed</p>
          <h2 className="rp-title">Not one system. Three.</h2>
          <p className="rp-lede">The outcome numbers come from these three. Two had a version I got wrong first.</p>
          <div className="fp-redesigns rp-reveal">
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

      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">What the system taught me</p>
          <h2 className="rp-title">Sustainment is a design outcome.</h2>
          <p className="rp-lede">Sustainment is the real test of whether a design solved the problem.</p>
          {/* Three sustainment facts that used to run together as one 48-word
              paragraph. As a rail they read as the evidence they are. */}
          <ul className="fp-survived rp-reveal">
            {SURVIVED.map((s) => (
              <li key={s.fact}><b>{s.fact}</b><span>{s.what}</span></li>
            ))}
          </ul>
          {/* This was the third card in a three-card row. It is the sharpest
              principle on the page — a shipped decision about admitting a
              limitation rather than designing around it — so it now carries its
              own weight instead of reading as a footnote. */}
          <figure className="rp-quoteCard fp-principle rp-reveal">
            <blockquote>Transparency beats pretending.</blockquote>
            <figcaption>
              The certification feed refreshed once a day. Every view carried a “last refreshed”
              timestamp, so stale data looked stale — and nobody made a compliance decision
              thinking the numbers were live.
            </figcaption>
          </figure>
          <div className="fp-reflections rp-reveal">
            <article><h3>The work starts on the floor</h3><p>No interview surfaced every workaround. Watching the work did.</p></article>
            <article><h3>Alignment is part of the interface</h3><p>The right solution still fails when each department carries a different model of the problem.</p></article>
          </div>
          <a className="fp-proofLink" href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk" target="_blank" rel="noopener noreferrer" aria-label="Read Hillary Esposito's career profile in MSK News (opens in new tab)">
            <span>Independent proof · MSK News</span><b className="rp-ext">From the military to Memorial Sloan Kettering</b>
          </a>
        </div>
      </section>

      <EvidenceField
        id="msk-outcomes"
        kicker="Outcomes · attribution kept intact"
        title="Systems that survived leadership changes."
        intro="I led the dashboard-to-online-EMR workflow redesign inside a larger initiative, rebuilt certification workflows, and redesigned onboarding across systems used throughout MSK."
        disclaimer="Anonymized evidence · organization-wide results are attributed to the initiative"
        metrics={[
          { n: "21,000+", label: "clinicians and administrative staff across the workflows I redesigned" },
          { n: "20%", label: "organization-wide EMR cost reduction; my workflow redesign contributed to the initiative" },
          { n: "70%", label: "efficiency gain in the certification workflows I rebuilt" },
        ]}
        route={["Observe the real work", "Map the failure", "Align the system", "Ship what lasts"]}
      />

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
