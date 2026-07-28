import React, { lazy, Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
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

const DECISIONS = [
  { n: "01", title: "Show the action only when the record is ready", body: "File to chart appears in the ready-to-file state only. Staff stop opening records that still need review.", note: "Ready means actionable" },
  { n: "02", title: "Make permission limits visible", body: "View-only roles see status and ownership, not a disabled mystery button. Access rules become part of the interface.", note: "Permission is product logic" },
  { n: "03", title: "Separate blocked from not started", body: "Exceptions get a reason and an owner. Normal backlog no longer hides work that needs intervention.", note: "Blocked needs an owner" },
  { n: "04", title: "Return people to the queue", body: "After filing, staff land back where they started with the status updated. The workflow closes the loop instead of dropping them elsewhere.", note: "Preserve place and context" },
];

// Restored from the earlier case study. The outcome metrics named certification
// and onboarding but the page no longer said what actually changed in either —
// the "70% efficiency gain" was a number with no mechanism under it.
const REDESIGNS = [
  {
    n: "01",
    title: "EMR filing workflow",
    finding: "A digital record was printed, routed out for filing, then waited to reappear in the online chart.",
    change: "One dashboard action routed staff straight to the filing destination, putting the next required step where the decision was already being made.",
    wrong: "I underestimated change management. Staff who had spent years on the print-and-send workaround resisted relearning it. Floor-level training on their own workstations, during shift transitions, fixed it within two weeks.",
  },
  {
    n: "02",
    title: "Certification tracking",
    finding: "The tracking spreadsheet had no proactive alerts. Staff learned a certification had lapsed when compliance flagged it — by then a disciplinary issue.",
    change: "A dashboard for staff and managers with reminders at 90, 60, and 30 days before expiry, and “last refreshed” timestamps. The old system told you when you had failed; the new one tells you what is coming.",
  },
  {
    n: "03",
    title: "Clinician onboarding",
    finding: "Onboarding was fragmented across five or more departments, each with its own checklist. System access and safety protocols sometimes finished weeks after a clinician started seeing patients.",
    change: "One unified path with a single source of truth, sequenced so no one reaches patients before completing safety prerequisites.",
    wrong: "I designed the first version for managers instead of new hires. Tracking dashboards overwhelmed clinicians who needed one clear next step on day one. The manager view stayed, but stopped being the primary interface.",
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
          mapSrc="/riso/mskcc-map.png"
          edition="eucalyptus"
          mapZoom={1.8}
          mapPosition="59% 73%"
          secondaryMapSrc="/riso/elevation-04.jpg"
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Service design · process improvement · clinical systems</span>
            <h1 className="rp-h1">Memorial Sloan Kettering.</h1>
            <span className="rp-readtime"><b>7 min</b><span>read · six years, three roles</span></span>
            <p className="rp-sub">
              Clinicians were printing digital records just to file them digitally again. I mapped the
              real workflow end to end, aligned clinical, IT, and operations teams, and redesigned
              systems used across work touching <b>21,000+ clinicians and staff</b>.
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
            <p>Every clinical day runs through the EMR — the electronic medical record, the digital chart where a patient’s whole history lives. The button was the visible fix. The real design work was understanding why four systems stood between a clinician and one completed task.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="msk-workflow">
        <div className="rp-wrap">
          <p className="rp-kicker">Primary artifact · recreated and anonymized</p>
          <h2 className="rp-title">Four systems became two.</h2>
          <p className="rp-lede">Counting the steps made the failure visible to clinical leadership, IT, and operations at the same time. No patient information appears here.</p>
          <div className="fp-workflow rp-reveal">
            <article>
              <span className="fp-workflow__label">Before · six steps</span>
              <h3>Print, route, wait, check again</h3>
              <ol>{WORKFLOW_BEFORE.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</li>)}</ol>
              <p>Failure mode: a digital record became paper, then became digital again.</p>
            </article>
            <i aria-hidden="true">→</i>
            <article className="fp-workflow__after">
              <span className="fp-workflow__label">After · five steps</span>
              <h3>File from the queue, return with status</h3>
              <ol>{WORKFLOW_AFTER.map((step, index) => <li key={step}><b>{String(index + 1).padStart(2, "0")}</b>{step}</li>)}</ol>
              <p>Design decision: connect the queue directly to the online chart.</p>
            </article>
          </div>
        </div>
      </section>

      <DecisionStory
        id="msk-decisions"
        kicker="Interaction logic · one state at a time"
        title="The “simple” button carried the whole system."
        intro="Who could act, who needed visibility, what status meant, and how the system recovered all had to be legible before anyone clicked."
        steps={DECISIONS}
        visual={<div className="fp-dashboardFrame fp-dashboardFrame--story"><MSKDashboardMockup compact /></div>}
      />

      <section className="rp-section rp-override" id="msk-systems">
        <div className="rp-wrap">
          <p className="rp-kicker">Six years · three roles</p>
          <h2 className="rp-title">I learned the system from the floor up.</h2>
          <p className="rp-lede">Office Coordinator taught me where people paused. Administrative Assistant taught me how to make evidence survive a stakeholder room. Training Specialist gave me the authority to redesign the system.</p>
          <div className="fp-systemCards rp-reveal">
            <article><span>01 · Observe</span><h3>Find the workarounds</h3><p>Shadow nurses and clinicians during real shifts. The sticky notes and personal spreadsheets told the truth the policy map missed.</p></article>
            <article><span>02 · Align</span><h3>Make the failure shared</h3><p>Current-state maps gave clinical leadership, IT, operations, and compliance one picture to argue with instead of four email threads.</p></article>
            <article><span>03 · Redesign</span><h3>Sequence the next action</h3><p>Move the right task into the place people already make the decision, then make ownership and exceptions visible.</p></article>
          </div>
          <div className="fp-discipline rp-reveal">
            <p className="fp-discipline__lead">
              The work has a name before it has an interface. This is service design and process
              improvement: follow the whole path a task takes through an organization, find the step
              that should not exist, and redesign the sequence instead of decorating the screen at
              the end of it.
            </p>
            <dl>
              <div>
                <dt>Lean Six Sigma</dt>
                <dd>A method for removing waste and variation from a process. It is the lens that showed four systems doing the work of two.</dd>
              </div>
              <div>
                <dt>Master of Health Administration (MHA)</dt>
                <dd>How hospitals fund, staff, and govern the work. It is why the redesign survived budget conversations and leadership changes.</dd>
              </div>
              <div>
                <dt>Current-state mapping</dt>
                <dd>Documenting what actually happens, not what the policy says happens. The gap between those two is where the design work lives.</dd>
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
          <p className="rp-lede">The outcome numbers below come from these. Each one had a mechanism, and two of them had a version I got wrong first.</p>
          <div className="fp-redesigns rp-reveal">
            {REDESIGNS.map((r) => (
              <article key={r.n}>
                <span className="fp-redesigns__n">{r.n}</span>
                <h3>{r.title}</h3>
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
          <p className="rp-lede">
            The EMR redesign was adopted organization-wide and survived two system upgrades. The
            certification dashboard became the default compliance tool. The onboarding changes
            outlasted three leadership transitions. Sustainment is the real test of whether a design
            solved the problem.
          </p>
          <div className="fp-reflections rp-reveal">
            <article><h3>The work starts on the floor</h3><p>No interview surfaced every workaround. Watching the work did.</p></article>
            <article><h3>Alignment is part of the interface</h3><p>The right solution still fails when each department carries a different model of the problem.</p></article>
            <article><h3>Transparency beats pretending</h3><p>When the certification feed could refresh only daily, “last refreshed” timestamps made the limitation visible instead of hiding it.</p></article>
          </div>
          <a className="fp-proofLink" href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk" target="_blank" rel="noopener noreferrer" aria-label="Read Hillary Esposito's career profile in MSK News (opens in new tab)">
            <span>Independent proof · MSK News</span><b>From the military to Memorial Sloan Kettering →</b>
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
