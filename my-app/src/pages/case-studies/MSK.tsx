import React, { lazy, Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MoreWork from "../../components/MoreWork";
import Disclosure from "../../components/Disclosure";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
import useReveal from "../../hooks/useReveal";
import { SproutIcon, LeafIcon } from "../../components/LineIcons";

// Lazy-loaded so three.js ships in its own chunk (only fetched on this page).
const MSKSystemMap = lazy(() => import("../../components/MSKSystemMap"));

const OTHER_PROJECTS = [
  {
    icon: <SproutIcon />,
    title: "Grove",
    desc: "AI + design plant care app. Research to working prototype in 3 weeks, solo.",
    path: "/case-study/grove",
  },
  {
    icon: <LeafIcon />,
    title: "Good Harvest",
    desc: "Heatmap testing with 22 users found a trust problem: people located the seasonal info but didn't believe it applied to them.",
    path: "/case-study/good-harvest",
  },
];

export default function MSKCaseStudy() {
  usePageTitle("MSK: Redesigning Systems for 21,000 Clinicians");
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <main className="case-study gh-layout" aria-label="MSK Case Study" lang="en" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero msk-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX & Product Design · Healthcare Systems · Enterprise</p>
          <h1>Memorial Sloan Kettering</h1>
          <p className="gh-hero__intro">
            Six years, three roles. I redesigned clinical workflows, onboarding systems,
            and operational processes for <strong>21,000+ clinicians</strong> at one of the
            world's top cancer centers.
          </p>
        </div>
        <div className="gh-hero__visual msk-hero-dashboard" aria-hidden="true">
          <MSKDashboardMockup compact />
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Healthcare Systems → UX & Product Design" },
          { label: "Org",      value: "Memorial Sloan Kettering Cancer Center" },
          { label: "Timeline", value: "6 years, 3 roles" },
          { label: "Scale",    value: "21,000+ clinicians" },
          { label: "Methods",  value: "Lean Six Sigma · Workflow Redesign · Stakeholder Alignment" },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {i < arr.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      <section className="cs-overview">
        <p className="gh-section-label">Overview</p>
        <h2 className="cs-section-title">Designing for 21,000 clinicians inside the systems they depend on</h2>
        <p className="cs-overview-text">
          At MSK, I optimized how the place actually ran. I mapped workflows, found where systems failed
          the clinicians using them, aligned clinical and administrative stakeholders, and shipped fixes
          that 21,000+ people relied on daily. This was user research before I formally had the
          vocabulary for it. The instinct came from the Army, where I had directed medical logistics for
          5,000+ soldiers, systems whose failures showed up as readiness problems. In healthcare, the
          design work often starts before Figma: mapping real work, identifying failure points, and
          deciding what the interface must make easier.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          This case study reads in the order it happened: three roles, each building on the last,
          from coordinating a clinical office to redesigning the systems the whole organization ran on.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Note:</strong> Internal systems and patient data are confidential. This case study
          uses recreated workflow artifacts and anonymized examples rather than interface screenshots.
        </p>
      </section>

      {/* ── ANONYMIZED ARTIFACT ── */}
      <section className="msk-artifact-section" aria-labelledby="msk-artifact-title">
        <p className="gh-section-label">Anonymized artifact</p>
        <h2 id="msk-artifact-title">Before and after: EMR workflow redesign</h2>
        <p className="cs-section-intro">
          Recreated with patient, department, and system details removed. This is the type of artifact
          I used to align clinicians, IT, and operations around the same problem: the workflow required
          staff to print and send records out for filing even though the final destination was online EMR.
        </p>

        <div className="msk-workflow-artifact feature" aria-label="Before and after EMR workflow">
          <div className="msk-workflow-column msk-workflow-column--before">
            <p className="msk-workflow-label">Before</p>
            <h3>Print, send, then re-file online</h3>
            <ol className="msk-workflow-list">
              <li>Open the dashboard</li>
              <li>Find the record that needed filing</li>
              <li>Print the documentation packet</li>
              <li>Send it to a separate filing site</li>
              <li>Wait for the record to be filed back into EMR</li>
              <li>Return later to confirm completion</li>
            </ol>
            <p className="msk-artifact-note">
              Failure mode: the workflow turned a digital record into paper, then back into a digital record.
            </p>
          </div>

          <div className="msk-workflow-arrow" aria-hidden="true">→</div>

          <div className="msk-workflow-column msk-workflow-column--after">
            <p className="msk-workflow-label">After</p>
            <h3>One dashboard button to online EMR</h3>
            <ol className="msk-workflow-list">
              <li>Open the dashboard</li>
              <li>Select the record</li>
              <li>Click the direct EMR action</li>
              <li>Land in the online EMR filing destination</li>
              <li>Complete the filing action digitally</li>
              <li>Return to the dashboard with status updated</li>
            </ol>
            <p className="msk-artifact-note">
              Design decision: add the missing bridge between the dashboard and the online EMR destination.
            </p>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD CONCEPT ── */}
      <section className="msk-dashboard-section" aria-labelledby="msk-dashboard-title">
        <p className="gh-section-label">Interface artifact</p>
        <h2 id="msk-dashboard-title">Recreated dashboard concept: the missing EMR action</h2>
        <p className="cs-section-intro">
          The core UI decision was not decorative. The dashboard needed to show status, preserve
          accountability, and expose the direct EMR action only when the record was ready and the
          user had permission to complete it.
        </p>
        <MSKDashboardMockup />
      </section>

      <section className="msk-complexity-section" aria-labelledby="msk-complexity-title">
        <p className="gh-section-label">Systems complexity</p>
        <h2 id="msk-complexity-title">The product problem was roles, permissions, and workflow states</h2>
        <p className="cs-section-intro">
          The dashboard button looked simple, but the surrounding product logic was not. The design had
          to account for who could act, who only needed visibility, what status meant, and what could go
          wrong if the wrong person saw or changed the wrong thing.
        </p>

        <div className="msk-complexity-grid">
          <article className="msk-complexity-card feature">
            <p className="msk-complexity-card__label">User types</p>
            <h3>Different users needed different views</h3>
            <ul>
              <li>Frontline staff needed the next filing action.</li>
              <li>Managers needed completion visibility across teams.</li>
              <li>Admins needed exception queues and status follow-up.</li>
              <li>IT/EMR teams needed clear requirements and constraints.</li>
              <li>Compliance needed evidence that the action was complete.</li>
            </ul>
          </article>

          <article className="msk-complexity-card feature">
            <p className="msk-complexity-card__label">Permission logic</p>
            <h3>Access was part of the interaction design</h3>
            <ul>
              <li>Some users could view status but not complete the filing action.</li>
              <li>Some users needed team-level visibility without patient-level noise.</li>
              <li>Completion needed to create a reliable audit trail.</li>
              <li>The button had to route to the right EMR destination based on context.</li>
            </ul>
          </article>

          <article className="msk-complexity-card feature">
            <p className="msk-complexity-card__label">Workflow states</p>
            <h3>Status had to be legible at a glance</h3>
            <ul>
              <li>Not started</li>
              <li>Ready to file</li>
              <li>In progress</li>
              <li>Filed in EMR</li>
              <li>Blocked or needs review</li>
            </ul>
          </article>

          <article className="msk-complexity-card feature">
            <p className="msk-complexity-card__label">Edge cases</p>
            <h3>The hard parts sat outside the happy path</h3>
            <ul>
              <li>Missing or mismatched record data.</li>
              <li>User lacks permission to complete the action.</li>
              <li>Status does not update after filing.</li>
              <li>Record needs manual review before completion.</li>
              <li>Downtime or delayed EMR response.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* ── ROLE 1: OFFICE COORDINATOR ── */}
      <section>
        <p className="gh-section-label">Role 1 · Office Coordinator</p>
        <h2>On the floor, learning how the work actually flowed</h2>
        <p className="cs-section-intro">
          I coordinated clinical office operations day to day, embedded with frontline teams. This is where I
          learned how the work actually flowed, shadowing nurses and clinicians and mapping real behavior
          against documented policy.
        </p>

        <div className="cs-methods-grid">
          <div className="cs-method-card">
            <p className="cs-method-card__name">The method this role taught me: frontline shadowing</p>
            <p className="cs-method-card__why">
              Interviewed and observed nurses, clinicians, and admin staff during actual shifts,
              on the floor, watching where they paused, backtracked, or worked around the system.
              This is how I found the gap between documented workflows and real behavior.
            </p>
          </div>
        </div>

        <p className="cs-section-intro" style={{ marginTop: "1.5rem" }}>
          Every project that followed started with a gap between what leadership thought was happening and what
          was actually happening on the floor. These are the research questions I carried onto the floor to close that gap.
        </p>

        <div className="cs-research-questions">
          <div className="cs-research-question">Where in the workflow were clinicians losing time, and was it the system's fault or the process's fault?</div>
          <div className="cs-research-question">What did staff actually do vs. what the documented procedure said they should do?</div>
          <div className="cs-research-question">Which handoffs between departments created confusion, rework, or dropped tasks?</div>
          <div className="cs-research-question">What would "good" look like to the people who use this system every day?</div>
        </div>
      </section>

      {/* ── ROLE 2: ADMINISTRATIVE ASSISTANT ── */}
      <section>
        <p className="gh-section-label">Role 2 · Administrative Assistant</p>
        <h2>Turning floor observations into evidence leadership could act on</h2>
        <p className="cs-section-intro">
          I supported operations and analysis across the team, turning frontline observations into documented
          workflows and findings I could bring to clinical leadership. Watching wasn't enough anymore;
          the findings had to survive a room full of stakeholders. These are the methods that made that work.
        </p>

        <div className="cs-methods-grid">
          <div className="cs-method-card">
            <p className="cs-method-card__name">Workflow mapping (current vs. ideal state)</p>
            <p className="cs-method-card__why">
              Documented every step, handoff, and decision point in the actual workflow, then mapped the ideal state.
              The visual comparison was the artifact that aligned stakeholders: everyone could see where the waste lived.
            </p>
          </div>
          <div className="cs-method-card">
            <p className="cs-method-card__name">Lean Six Sigma (DMAIC)</p>
            <p className="cs-method-card__why">
              Used Define-Measure-Analyze-Improve-Control to structure each project. Why DMAIC over other frameworks:
              MSK's leadership trusted Lean Six Sigma methodology. Speaking their language got buy-in faster than proposing
              "design thinking" to a clinical operations team.
            </p>
          </div>
          <div className="cs-method-card">
            <p className="cs-method-card__name">Cross-functional stakeholder sessions</p>
            <p className="cs-method-card__why">
              Presented findings to clinical leadership, IT, and frontline staff simultaneously.
              When each group heard the same data at the same time, alignment happened in the room instead of over months of email.
            </p>
          </div>
        </div>

        <p className="cs-section-intro" style={{ marginTop: "1.5rem" }}>
          Healthcare systems don't have a single owner. Every project required navigating competing priorities
          across teams that don't naturally collaborate. This was the cast in every room:
        </p>

        <div className="cs-team-grid">
          <div className="cs-team-card">
            <p className="cs-team-card__role">Clinical leadership</p>
            <p className="cs-team-card__desc">Physicians and nursing directors who set clinical priorities. I presented workflow data to get buy-in for changes that affected patient-facing processes.</p>
          </div>
          <div className="cs-team-card">
            <p className="cs-team-card__role">IT / EMR engineering</p>
            <p className="cs-team-card__desc">System administrators and developers who built the changes. I translated clinical needs into technical requirements and validated implementations with frontline staff.</p>
          </div>
          <div className="cs-team-card">
            <p className="cs-team-card__role">Frontline staff</p>
            <p className="cs-team-card__desc">Nurses, technicians, and coordinators who used the systems daily. They were my primary research participants and my validation audience before anything shipped.</p>
          </div>
          <div className="cs-team-card">
            <p className="cs-team-card__role">Operations / Compliance</p>
            <p className="cs-team-card__desc">Process improvement and training teams. We co-designed change management plans so new workflows actually got adopted.</p>
          </div>
        </div>
      </section>

      {/* ── ROLE 3: TRAINING SPECIALIST I ── */}
      <section>
        <p className="gh-section-label">Role 3 · Training Specialist I</p>
        <h2>Owning the systems I used to observe</h2>
        <p className="cs-section-intro">
          I owned onboarding and certification training across departments, redesigning the experience around
          what frontline staff actually needed. Co-led the Veteran employee resource network (ERN) while in
          this role. This is where the observation and the evidence from the first two roles became design
          authority: the workflow, certification, and onboarding redesigns below.
        </p>
      </section>

      {/* ── THE TIMESTAMP COMPROMISE ── */}
      <section>
        <p className="gh-section-label">A moment that shows how this worked in practice</p>
        <h2>The compromise was a design decision, not a technical one</h2>
        <div className="highlight">
          During the certification redesign, clinical leadership wanted real-time compliance dashboards visible to department heads.
          IT said the data feed could only refresh daily due to system architecture constraints.
          I proposed a design that showed "as of [date]" timestamps alongside each status, making the daily refresh transparent
          rather than hiding it. Both teams accepted. The compromise was a design decision, not a technical one.
        </div>
      </section>

      {/* ── WHAT THE THREE ROLES BUILT ── */}
      <section>
        <p className="gh-section-label">What the three roles built</p>
        <h2>Three systems that worked on paper but failed the people inside them</h2>
        <p className="cs-section-intro">
          Each redesign below follows the same arc the roles taught me: a finding from shadowing or workflow
          analysis, the design change it led to, what shifted, and what I got wrong along the way.
        </p>

        {/* — EMR workflow redesign — */}
        <div className="cs-evidence-pair">
          <h3 className="cs-feature-heading">1 · EMR workflow redesign</h3>
          <p className="cs-body-text">
            Staff were printing documentation from a dashboard and sending it to a separate site to be filed,
            even though the destination was ultimately online EMR. Cost overruns and staff frustration were
            symptoms; the root cause was a missing digital bridge between the dashboard and the place the record
            needed to live.
          </p>
          <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>Finding: The system made clinicians slow.</p>
          <p className="cs-evidence-pair__evidence">
            Shadowing revealed that a digital workflow had become a paper workaround. Staff printed records,
            sent them out for filing, and then waited for the same information to appear in online EMR.
            The system added handoffs because there was no direct action from the dashboard.
          </p>
          <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
            <p className="cs-insight-action__label">What I changed</p>
            <p className="cs-insight-action__text">
              Added a dashboard button that sent staff directly to the online EMR filing destination.
              The redesign removed the print-and-send workaround, reduced handoffs, and kept the work in the
              digital system where it belonged. The key interaction decision was simple: put the next required
              action at the point where staff were already making the decision.
            </p>
          </div>
          <p className="cs-body-text" style={{ marginTop: "0.75rem" }}>
            <strong>Before:</strong> Print from the dashboard, send to a separate filing site, wait for the record
            to return to EMR. <strong>After:</strong> one dashboard action routed staff directly to online EMR.
          </p>
          <Disclosure title="Show rollout lesson">
            <p className="cs-evidence-pair__finding">What went wrong: I underestimated change management.</p>
            <p className="cs-evidence-pair__evidence">
              The redesigned EMR workflow was technically better, but the initial rollout had lower adoption than expected.
              Staff who had spent years relying on the print-and-send workaround were resistant to relearning.
              I added floor-level training sessions, walking clinicians through the new flow
              on their actual workstations during shift transitions. Adoption improved within two weeks.
            </p>
          </Disclosure>
        </div>

        {/* — Certification system overhaul — */}
        <div className="cs-evidence-pair">
          <h3 className="cs-feature-heading">2 · Certification system overhaul</h3>
          <p className="cs-body-text">
            The certification process was manual, error-prone, and opaque. Staff didn't know where they stood.
            Managers couldn't track compliance until it was too late. The system generated more administrative work than clinical value.
          </p>
          <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>Finding: Staff failed certifications because the system only told them after the fact.</p>
          <p className="cs-evidence-pair__evidence">
            The certification tracking spreadsheet had no proactive alerts. Staff learned their certification had
            lapsed when compliance flagged it. By then it had already become a disciplinary issue.
            Managers had no dashboard view of upcoming expirations across their teams.
          </p>
          <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
            <p className="cs-insight-action__label">What I changed</p>
            <p className="cs-insight-action__text">
              Designed a certification dashboard showing upcoming deadlines for both staff and managers.
              Shifted the system from punitive (you failed) to preventive (this is coming up).
              Added proactive reminders at 90, 60, and 30 days before expiration.
              The old system told you when you'd failed; the new one tells you what's coming.
            </p>
          </div>
          <p className="cs-body-text" style={{ marginTop: "0.75rem" }}>
            <strong>Before:</strong> Manual spreadsheet; staff found out certifications had lapsed after the fact.{" "}
            <strong>After:</strong> Automated dashboard with proactive reminders at 90/60/30 days. Compliance
            shifted from punitive to preventive, with "as of [date]" timestamps making the daily data refresh
            transparent (the compromise described above).
          </p>
        </div>

        {/* — Clinician onboarding redesign — */}
        <div className="cs-evidence-pair">
          <h3 className="cs-feature-heading">3 · Clinician onboarding redesign</h3>
          <p className="cs-body-text">
            New clinician onboarding was fragmented across 5+ departments. Critical orientation steps were missed,
            time-to-productivity was slow, and the experience didn't reflect MSK's standard of care.
          </p>
          <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>Finding: New clinicians reached patients underprepared because onboarding was owned by everyone and no one.</p>
          <p className="cs-evidence-pair__evidence">
            Onboarding was fragmented across 5+ departments, each with their own checklist.
            New hires received conflicting instructions. Critical steps (system access, safety protocols, department-specific
            procedures) were sometimes completed weeks after the clinician started seeing patients.
          </p>
          <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
            <p className="cs-insight-action__label">What I changed</p>
            <p className="cs-insight-action__text">
              Designed a unified onboarding experience with a single source of truth across all departments.
              Every new clinician follows the same path, tracked from day one through full productivity.
              Critical steps are sequenced so no one reaches patients without completing safety prerequisites.
              A unified cross-department experience instead of per-department patches: fragmented onboarding
              created inconsistent care preparation. One system, one standard.
            </p>
          </div>
          <p className="cs-body-text" style={{ marginTop: "0.75rem" }}>
            <strong>Before:</strong> Fragmented across 5+ departments; conflicting instructions, missed safety steps.{" "}
            <strong>After:</strong> Unified experience with a single source of truth, tracked from day one through full productivity.
          </p>
          <Disclosure title="Show onboarding iteration">
            <p className="cs-evidence-pair__finding">What went wrong: I designed the onboarding system for the managers instead of the new hires.</p>
            <p className="cs-evidence-pair__evidence">
              The first version of the unified onboarding experience was optimized for manager visibility: tracking dashboards,
              completion rates, compliance reports. But when I tested it with actual new clinicians, they found the interface
              overwhelming. What they needed on day one was a single clear next step. I redesigned the
              new-hire view to show only the current task and a progress indicator. The manager dashboard stayed, but it
              wasn't the primary interface anymore.
            </p>
          </Disclosure>
        </div>
      </section>

      {/* ── SYSTEM MAP: tangled clinical systems → trusted flow ── */}
      <section className="msk-systemmap-section">
        <p className="gh-section-label">The through-line</p>
        <h2>How a tangled clinical system became one clinicians trust</h2>
        <p className="cs-section-intro">
          Every project here was the same move: take disconnected EMR, certification, and
          onboarding systems and reorganize them into a flow the 21,000+ people inside could
          actually follow. Scroll: the knot below maps that path, stage by stage.
        </p>
        <Suspense fallback={<div className="msk-systemmap" />}>
          <MSKSystemMap />
        </Suspense>
        <ol className="msk-systemmap-stages" aria-label="Workflow stages, left to right">
          <li>Tangled systems</li>
          <li>Mapped (DMAIC)</li>
          <li>Redesigned</li>
          <li className="msk-systemmap-stages__end">Trusted by clinicians</li>
        </ol>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="gh-section-label">Outcomes</p>
        <h2 className="cs-section-title">Measurable results across three systems</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">20%</p>
            <p className="cs-outcome-label">Organization-wide EMR cost reduction. I led the dashboard-to-online-EMR workflow redesign that contributed to it.</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">70%</p>
            <p className="cs-outcome-label">Efficiency gain in the certification workflows I rebuilt.</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">21K+</p>
            <p className="cs-outcome-label">Clinicians across the workflows I redesigned</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3</p>
            <p className="cs-outcome-label">Roles across 6 years, each building on the last</p>
          </div>
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          <strong>What happened after launch:</strong> These weren't one-time deliverables. The EMR workflow redesign
          was adopted org-wide and maintained through two system upgrades. The certification dashboard became
          the default compliance tool across departments. Onboarding changes survived three leadership transitions.
          Sustainment is the real test of whether a design actually solved the problem.
        </p>
      </section>

      <div className="cs-inline-cta">
        <p>Interested in this kind of work?</p>
        <a href="mailto:espositohillary@gmail.com" className="hero-btn" style={{ fontSize: "0.9rem", padding: "0.8rem 1.8rem", textDecoration: "none" }}>
          Send me a note
        </a>
      </div>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="gh-section-label">What I learned</p>
        <h2 className="cs-section-title">Why MSK shaped how I design</h2>
        <div className="cs-reflections-grid">
          <div className="cs-reflection-card">
            <h3>The design work starts on the floor</h3>
            <p>
              No stakeholder interview surfaced the sticky notes and personal spreadsheets clinicians
              used to survive the EMR. Shadowing during actual shifts did. The gap between documented
              process and real behavior is where the design problems live, and I bring that to every
              project now.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Stakeholder alignment is the hardest design problem</h3>
            <p>
              The best solution that only one department supports will fail. The "as of [date]"
              timestamp compromise happened because clinical leadership and IT were finally in the
              same room hearing the same constraint. The design comes after the alignment.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Measure what actually changed</h3>
            <p>
              Every project ended with numbers: cost reduction, efficiency gains, adoption rates.
              That's the only way to know whether the design worked for the people using it.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Why this work matters now</h3>
            <p>
              The clinical workflows I redesigned are exactly the systems being augmented by AI today.
              Understanding how 21,000 clinicians actually work (how they build workarounds, where they
              lose trust, what makes them adopt or resist change) is the foundation for designing
              AI-augmented tools they'll actually use.
            </p>
          </div>
        </div>

      </section>

      {/* ── PRESS ── */}
      <section>
        <p className="gh-section-label">Press</p>
        <h2>Featured in MSK News</h2>
        <a
          href="https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk"
          target="_blank"
          rel="noopener noreferrer"
          className="about-story-card__article-link"
          style={{ maxWidth: 480 }}
          aria-label="Read article: Hillary Esposito's Career Path"
        >
          <span className="about-story-card__article-text">
            <span className="about-story-card__article-title">
              Hillary Esposito's Career Path: From the Military to MSK
            </span>
            <span className="about-story-card__article-source">
              MSK News
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ marginLeft: "0.35rem", verticalAlign: "middle" }}>
                <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </span>
        </a>
      </section>

      {/* ── OTHER PROJECTS ── */}
      <MoreWork projects={OTHER_PROJECTS} onBack={() => navigate("/?scrollTo=projects")} />
    </main>
  );
}
