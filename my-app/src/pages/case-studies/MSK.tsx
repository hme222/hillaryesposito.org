import React, { lazy, Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MoreWork from "../../components/MoreWork";
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
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX & Product Design · Healthcare Systems · Enterprise</p>
          <h1>Memorial Sloan Kettering</h1>
          <p className="gh-hero__intro">
            Six years, three roles. I redesigned clinical workflows, onboarding systems,
            and operational processes for <strong>21,000+ clinicians</strong> at one of the
            world's top cancer centers.
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge msk-hero-badge">
            <span className="msk-hero-badge__stat"><strong>6</strong>Years</span>
            <span className="msk-hero-badge__rule" />
            <span className="msk-hero-badge__stat"><strong>3</strong>Roles</span>
          </div>
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
          I used to align clinicians, IT, and operations around the same problem: the interface reflected
          system architecture, not the clinical task.
        </p>

        <div className="msk-workflow-artifact feature" aria-label="Before and after EMR workflow">
          <div className="msk-workflow-column msk-workflow-column--before">
            <p className="msk-workflow-label">Before</p>
            <h3>14 steps across 3 systems</h3>
            <ol className="msk-workflow-list">
              <li>Search patient in System A</li>
              <li>Copy identifiers manually</li>
              <li>Open System B in a second window</li>
              <li>Re-enter patient context</li>
              <li>Check status in a spreadsheet workaround</li>
              <li>Return to EMR and document action</li>
            </ol>
            <p className="msk-artifact-note">
              Failure mode: clinicians were doing memory work the interface should have handled.
            </p>
          </div>

          <div className="msk-workflow-arrow" aria-hidden="true">→</div>

          <div className="msk-workflow-column msk-workflow-column--after">
            <p className="msk-workflow-label">After</p>
            <h3>6 steps in one view</h3>
            <ol className="msk-workflow-list">
              <li>Search patient once</li>
              <li>Keep patient context persistent</li>
              <li>Show task status in the same view</li>
              <li>Guide the next clinical action</li>
              <li>Confirm completion with timestamp</li>
              <li>Return clinician to the patient queue</li>
            </ol>
            <p className="msk-artifact-note">
              Design decision: align navigation to the clinical task, not the software modules.
            </p>
          </div>
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
            Clinicians spent 14 steps across 3 systems to complete a single clinical task. They toggled between windows,
            re-entered data, and lost context mid-workflow. Cost overruns and staff frustration were symptoms; the root cause
            was navigation built around the software's own architecture.
          </p>
          <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>Finding: The system made clinicians slow.</p>
          <p className="cs-evidence-pair__evidence">
            Shadowing revealed that completing a single clinical task required navigating 3 separate systems,
            re-entering patient data at each transition, and mentally tracking context across windows.
            Clinicians had developed workarounds (sticky notes, personal spreadsheets) to compensate.
          </p>
          <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
            <p className="cs-insight-action__label">What I changed</p>
            <p className="cs-insight-action__text">
              Redesigned the EMR workflow around clinical tasks.
              Consolidated 14 steps across 3 systems into 6 steps in one view. Eliminated redundant data entry.
              Aligned navigation to the patient actions clinicians were trying to complete.
              Clinicians think in patient actions; aligning the IA to that mental model cut navigation time.
            </p>
          </div>
          <p className="cs-body-text" style={{ marginTop: "0.75rem" }}>
            <strong>Before:</strong> 14 steps across 3 systems. <strong>After:</strong> 6 steps in one view,
            navigation aligned to the clinical task flow.
          </p>
          <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>What went wrong: I underestimated change management.</p>
          <p className="cs-evidence-pair__evidence">
            The redesigned EMR workflow was technically better, but the initial rollout had lower adoption than expected.
            Clinicians who had spent years building workarounds for the old system were resistant to relearning.
            I added floor-level training sessions, walking clinicians through the new flow
            on their actual workstations during shift transitions. Adoption improved within two weeks.
          </p>
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
          <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>What went wrong: I designed the onboarding system for the managers instead of the new hires.</p>
          <p className="cs-evidence-pair__evidence">
            The first version of the unified onboarding experience was optimized for manager visibility: tracking dashboards,
            completion rates, compliance reports. But when I tested it with actual new clinicians, they found the interface
            overwhelming. What they needed on day one was a single clear next step. I redesigned the
            new-hire view to show only the current task and a progress indicator. The manager dashboard stayed, but it
            wasn't the primary interface anymore.
          </p>
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
            <p className="cs-outcome-label">Organization-wide EMR cost reduction. I led the workflow redesign that contributed to it.</p>
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
