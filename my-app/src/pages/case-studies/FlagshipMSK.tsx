import React, { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
import MSKWorkflowMap from "../../components/MSKWorkflowMap";
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

// "The contradiction" told the reader a category, not a fact — you had to
// already know the story for it to mean anything. Every note now states the
// thing itself. Order follows the page: problem, workflow, the decisions inside
// one screen, the three systems those decisions shipped in, then the background
// that made them possible, then what lasted.
const CHAPTERS: CaseStudyChapter[] = [
  { id: "msk-start", label: "Start", note: "Digital records, printed to be filed digitally" },
  { id: "msk-brief", label: "Problem", note: "A digital workflow became a paper ritual" },
  { id: "msk-workflow", label: "Workflow", note: "Four systems became two" },
  { id: "msk-decisions", label: "Decisions", note: "The simple button was not simple" },
  { id: "msk-redesigns", label: "Redesigns", note: "Not one system — three" },
  { id: "msk-systems", label: "Background", note: "Six years on the floor" },
  { id: "msk-outcomes", label: "Outcomes", note: "Evidence that lasted" },
];

// Each role opens the method it gave her. Closed by default: the credentials
// are real and worth finding, but leading with them turns a work story into a
// CV. Details, so it works with no JS and is keyboard-operable for free.
// Each method is attached to the role Hillary actually earned it in, not
// distributed for balance: green belt came out of the coordinator seat, the
// master's was finished during the assistant years, and the research methods
// came with owning training.
const ROLE_METHODS: Record<string, { term: string; body: string }> = {
  "01": {
    term: "Lean Six Sigma — Green Belt certified",
    body: "A method for removing waste from a process. Running a clinic's paperwork is where I learned it, and it is the lens that showed four systems doing the work of two.",
  },
  "02": {
    term: "Master of Health Administration (MHA)",
    body: "Earned while I was preparing what leadership decided from. How hospitals fund, staff, and govern — and why the redesign survived budget talks and leadership changes.",
  },
  "03": {
    term: "Current-state mapping and research methods",
    body: "Owning how staff were taught the system meant documenting what actually happens, not what the policy says. The gap between the two is where the design work lives.",
  },
};

// Which queue row each decision is about, so the artifact highlights the thing
// the sentence is describing rather than a generic row.
const DECISION_ROW = [0, 4, 2, 3];

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

// The text equivalent of the sustainment timeline. Each line states what the
// system survived and that it is still standing — the claim, not just a label.
const SURVIVED = [
  { fact: "EMR filing workflow", what: "Adopted organization-wide, and still in use through two system upgrades" },
  { fact: "Certification dashboard", what: "Became the default compliance tool and stayed it" },
  { fact: "Clinician onboarding", what: "Still in use after three leadership transitions" },
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
  "Choose Send to EMR",
  "It files inside the online chart",
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
            <span className="rp-readtime"><b>6 min</b><span>read · 6 years, 3 roles</span></span>
            <p className="rp-sub">
              Clinicians printed digital records just to file them digitally again. I mapped the real
              workflow, aligned clinical, IT, and operations, and redesigned systems touching{" "}
              <b>21,000+ clinicians and staff</b>.
            </p>
            <a className="rp-cta" href="#msk-workflow">See the workflow →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--msk">
          <div className="fp-artifactLabel"><span>RECREATED ARTIFACT</span><b>Office Coordinator filing queue · no patient data</b></div>
          <div className="fp-dashboardFrame" aria-label="Recreated Office Coordinator filing queue concept">
            <MSKDashboardMockup headingLevel={2} />
          </div>
        </div>
      </header>

      {/* The "Workflow trace · 30-second scan" poster used to sit here. It was a
          whole screen restating the before/after that the workflow map below
          already draws, before the reader had the problem. */}

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
        visual={(active) => (
          <div className="fp-dashboardFrame fp-dashboardFrame--story">
            <MSKDashboardMockup compact activeRow={DECISION_ROW[active] ?? null} />
          </div>
        )}
      />

      {/* The three redesigns used to sit after the six-years background, which
          meant the page spent a section on credibility before it had finished
          saying what was built. They belong here: the queue decisions above are
          one of these three, and the outcome numbers below come from all of
          them. */}
      <section className="rp-section" id="msk-redesigns">
        <div className="rp-wrap">
          <p className="rp-kicker">Three redesigns · what actually changed</p>
          <h2 className="rp-title">Not one system. Three.</h2>
          <p className="rp-lede">The filing queue above is the first of these. The outcome numbers come from all three, and two had a version I got wrong first.</p>
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

      <section className="rp-section rp-override" id="msk-systems">
        <div className="rp-wrap">
          <p className="rp-kicker">Six years · three roles</p>
          <h2 className="rp-title">I learned the system from the floor up.</h2>
          {/* Was one 62-word paragraph with three job definitions folded into
              em-dashes. The progression was the point, so it is drawn as a
              progression. */}
          <ol className="fp-roleRail rp-reveal" aria-label="Three roles at MSK, in order">
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
          <div className="fp-systemCards rp-reveal">
            <article><span>01 · Observe</span><h3>Find the workarounds</h3><p>Shadow real shifts. The sticky notes and personal spreadsheets told the truth the policy map missed.</p></article>
            <article><span>02 · Align</span><h3>Make the failure shared</h3><p>Current-state maps gave four departments one picture to argue with instead of four email threads.</p></article>
            <article><span>03 · Redesign</span><h3>Sequence the next action</h3><p>Move the task to where the decision already happens, then make ownership and exceptions visible.</p></article>
          </div>
          {/* "Service design" appears in this page's hero eyebrow and nowhere
              else on the site. It had a definition here once and I cut it as
              abstract, which left the discipline named and unsupported. This is
              the replacement: the claim is ownership of the whole path, which
              the workflow map above already proves, rather than a description
              of a method. */}
          <p className="fp-ownership rp-reveal">
            <b>What service design means here:</b> I own the whole path a task takes — across four
            systems and three departments that did not report to me — not the screen at the end of
            it. The queue above is one screen. The reason it works is everything behind it.
          </p>
          {/* The credentials that used to sit here as a standalone strip now
              live inside the role that earned each one, one click away. */}
          <div className="fp-mapWrap">
            <Suspense fallback={<div className="fp-mapFallback">Tangled systems → mapped → redesigned → trusted</div>}>
              <MSKSystemMap />
            </Suspense>
            <ol aria-label="Clinical system transformation stages"><li>Tangled systems</li><li>Mapped</li><li>Redesigned</li><li>Trusted by clinicians</li></ol>
          </div>
        </div>
      </section>

      {/* This section had no single job. Under the heading "What the system
          taught me" it ran a sustainment thesis, three sustainment facts, a
          principle about stale data, two general reflections, and an external
          profile link — five different points, so none of them landed.
          One job now: the work outlasted the person who built it, here is the
          evidence, and here is the decision that earned the trust. The two
          reflections went because the Observe/Align/Redesign cards above
          already say both things, in the place where they are demonstrated. */}
      <section className="rp-section">
        <div className="rp-wrap">
          <p className="rp-kicker">What lasted · after the roles ended</p>
          <h2 className="rp-title">Most internal tools die quietly. These did not.</h2>
          <p className="rp-lede">A system upgrade, a compliance review, a new director — these are what usually end an internal tool, whatever anyone thought of it at launch. All three of mine ran straight past them.</p>
          <figure className="fp-sustainmentFig rp-reveal">
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
          {/* The sharpest decision on the page: admitting a limitation in the
              interface rather than designing around it. It belongs here because
              it is why people kept trusting the tool. */}
          <figure className="rp-quoteCard fp-principle rp-reveal">
            <blockquote>Transparency beats pretending.</blockquote>
            <figcaption>
              The certification feed refreshed once a day. Every view carried a “last refreshed”
              timestamp, so stale data looked stale — and nobody made a compliance decision
              thinking the numbers were live. That is the reason it stayed the default tool.
            </figcaption>
          </figure>
          <a className="fp-proofLink" href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk" target="_blank" rel="noopener noreferrer" aria-label="Read Hillary Esposito's career profile in MSK News (opens in new tab)">
            <span>Independent proof · MSK News</span><b className="rp-ext">From the military to Memorial Sloan Kettering</b>
          </a>
        </div>
      </section>

      <EvidenceField
        id="msk-outcomes"
        kicker="Outcomes · attribution kept intact"
        title="The numbers, and who they belong to."
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
