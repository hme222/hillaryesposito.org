import React, { lazy, Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MoreWork from "../../components/MoreWork";
import useReveal from "../../hooks/useReveal";

// Lazy-loaded so three.js ships in its own chunk (only fetched on this page).
const MSKSystemMap = lazy(() => import("../../components/MSKSystemMap"));

const OTHER_PROJECTS = [
  {
    icon: "🌱",
    title: "Grove",
    desc: "AI + design plant care app. Research to shipped product in 3 weeks, solo.",
    path: "/case-study/grove",
  },
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "Heatmap testing with 22 users revealed the problem wasn't discoverability; it was trust.",
    path: "/case-study/good-harvest",
  },
];

export default function MSKCaseStudy() {
  usePageTitle("MSK: Redesigning Systems for 21,000 Clinicians");
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  return (
    <main className="case-study gh-layout" aria-label="MSK Case Study" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX & Product Design · Healthcare Systems · Enterprise</p>
          <h1>Memorial Sloan Kettering</h1>
          <p className="gh-hero__intro">
            Six years, three roles. I redesigned clinical workflows, onboarding systems,
            and operational processes for <strong>21,000+ clinicians</strong> at one of the
            world's top cancer centers, where confusion isn't an inconvenience; it's a patient safety risk.
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge">
            <span className="reina-hero-badge-label">6 Years · 3 Roles</span>
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Process Improvement → UX & Product Design" },
          { label: "Org",      value: "Memorial Sloan Kettering Cancer Center" },
          { label: "Duration", value: "6 years, 3 roles" },
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
          At MSK, I optimized internal operations: mapping workflows, identifying where systems failed
          the clinicians using them, aligning stakeholders across clinical and administrative teams,
          and shipping solutions that 21,000+ users relied on daily. This was deep user research before
          I formally had the vocabulary for it. The work that matters most in healthcare happens before
          anyone opens Figma.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Note:</strong> Internal systems and patient data are confidential. This case study
          focuses on process, methods, and measurable outcomes rather than interface screenshots.
        </p>
      </section>

      {/* ── MY ROLE ── */}
      <section>
        <p className="gh-section-label">My role</p>
        <h2>What I personally owned across three roles</h2>
        <p className="cs-section-intro">
          Over six years I held three roles with increasing design responsibility. Here's what I did in each, specifically.
        </p>

        <div className="cs-team-grid">
          <div className="cs-team-card">
            <p className="cs-team-card__role">Role 1: Office Coordinator</p>
            <p className="cs-team-card__desc">
              Coordinated clinical office operations day to day, embedded with frontline teams. This is where I
              learned how the work actually flowed — shadowing nurses and clinicians and mapping real behavior
              against documented policy.
            </p>
          </div>
          <div className="cs-team-card">
            <p className="cs-team-card__role">Role 2: Administrative Assistant</p>
            <p className="cs-team-card__desc">
              Supported operations and analysis across the team, turning frontline observations into documented
              workflows and findings I could bring to clinical leadership.
            </p>
          </div>
          <div className="cs-team-card">
            <p className="cs-team-card__role">Role 3: Training Specialist I</p>
            <p className="cs-team-card__desc">
              Owned onboarding and certification training across departments, redesigning the experience around
              what frontline staff actually needed. Co-led the Veteran employee resource network (ERN) while in
              this role.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGES ── */}
      <section>
        <p className="gh-section-label">The problems</p>
        <h2>Three systems that worked on paper but failed the people inside them</h2>

        <div className="gh-features-grid">
          <div className="feature">
            <h3 className="cs-feature-heading">EMR workflow redesign</h3>
            <p className="cs-body-text">
              Clinicians spent 14 steps across 3 systems to complete a single clinical task. They toggled between windows,
              re-entered data, and lost context mid-workflow. Cost overruns and staff frustration were symptoms; the root cause
              was navigation designed around software architecture, not clinical tasks.
            </p>
          </div>
          <div className="feature">
            <h3 className="cs-feature-heading">Certification system overhaul</h3>
            <p className="cs-body-text">
              The certification process was manual, error-prone, and opaque. Staff didn't know where they stood.
              Managers couldn't track compliance until it was too late. The system generated more administrative work than clinical value.
            </p>
          </div>
          <div className="feature">
            <h3 className="cs-feature-heading">Clinician onboarding redesign</h3>
            <p className="cs-body-text">
              New clinician onboarding was fragmented across 5+ departments. Critical orientation steps were missed,
              time-to-productivity was slow, and the experience didn't reflect MSK's standard of care.
            </p>
          </div>
        </div>
      </section>

      {/* ── SYSTEM MAP: complexity → clarity ── */}
      <section className="msk-systemmap-section">
        <p className="gh-section-label">The through-line</p>
        <h2>Turning tangled systems into clear flow</h2>
        <p className="cs-section-intro">
          Every one of these projects was the same move at heart: take a system that had grown
          tangled and reorganize it into something the people inside it could actually follow.
          Scroll to watch the knot resolve.
        </p>
        <Suspense fallback={<div className="msk-systemmap" />}>
          <MSKSystemMap />
        </Suspense>
      </section>

      {/* ── WHAT I NEEDED TO LEARN ── */}
      <section>
        <p className="gh-section-label">What I needed to learn</p>
        <h2>The questions that drove every project</h2>
        <p className="cs-section-intro">
          Each project started with a gap between what leadership thought was happening and what was actually happening on the floor.
          These are the research questions I used to close that gap.
        </p>

        <div className="cs-research-questions">
          <div className="cs-research-question">Where in the workflow were clinicians losing time, and was it the system's fault or the process's fault?</div>
          <div className="cs-research-question">What did staff actually do vs. what the documented procedure said they should do?</div>
          <div className="cs-research-question">Which handoffs between departments created confusion, rework, or dropped tasks?</div>
          <div className="cs-research-question">What would "good" look like to the people who use this system every day, not just the people who manage it?</div>
        </div>
      </section>

      {/* ── METHODS AND WHY ── */}
      <section>
        <p className="gh-section-label">Methods used and why</p>
        <h2>How I learned what was broken</h2>

        <div className="cs-methods-grid">
          <div className="cs-method-card">
            <p className="cs-method-card__name">Frontline shadowing</p>
            <p className="cs-method-card__why">
              Interviewed and observed nurses, clinicians, and admin staff during actual shifts.
              Not in a conference room — on the floor, watching where they paused, backtracked, or worked around the system.
              This is how I found the gap between documented workflows and real behavior.
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
            <p className="cs-method-card__name">Workflow mapping (current vs. ideal state)</p>
            <p className="cs-method-card__why">
              Documented every step, handoff, and decision point in the actual workflow, then mapped the ideal state.
              The visual comparison was the artifact that aligned stakeholders — everyone could see where the waste lived.
            </p>
          </div>
          <div className="cs-method-card">
            <p className="cs-method-card__name">Cross-functional stakeholder sessions</p>
            <p className="cs-method-card__why">
              Presented findings to clinical leadership, IT, and frontline staff simultaneously, not sequentially.
              When each group heard the same data at the same time, alignment happened in the room instead of over months of email.
            </p>
          </div>
        </div>
      </section>

      {/* ── EVIDENCE THAT SHAPED DECISIONS ── */}
      <section>
        <p className="gh-section-label">Evidence that shaped decisions</p>
        <h2>What I found and what I did about it</h2>
        <p className="cs-section-intro">
          Each finding below came directly from shadowing sessions or workflow analysis. Each led to a specific design change.
        </p>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">Finding: Clinicians weren't slow — the system made them slow.</p>
          <p className="cs-evidence-pair__evidence">
            Shadowing revealed that completing a single clinical task required navigating 3 separate systems,
            re-entering patient data at each transition, and mentally tracking context across windows.
            Clinicians had developed workarounds (sticky notes, personal spreadsheets) to compensate.
          </p>
          <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
            <p className="cs-insight-action__label">What I changed</p>
            <p className="cs-insight-action__text">
              Redesigned the EMR workflow around clinical tasks, not system features.
              Consolidated 14 steps across 3 systems into 6 steps in one view. Eliminated redundant data entry.
              Aligned navigation to how clinicians think: patient actions, not software menus.
            </p>
          </div>
        </div>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">Finding: Staff didn't fail certifications from neglect. They failed because the system only told them after the fact.</p>
          <p className="cs-evidence-pair__evidence">
            The certification tracking spreadsheet had no proactive alerts. Staff learned their certification had
            lapsed when compliance flagged it — by then it was a disciplinary issue, not a planning issue.
            Managers had no dashboard view of upcoming expirations across their teams.
          </p>
          <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
            <p className="cs-insight-action__label">What I changed</p>
            <p className="cs-insight-action__text">
              Designed a certification dashboard showing upcoming deadlines for both staff and managers.
              Shifted the system from punitive (you failed) to preventive (this is coming up).
              Added proactive reminders at 90, 60, and 30 days before expiration.
            </p>
          </div>
        </div>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">Finding: New clinicians reached patients underprepared because onboarding was owned by everyone and no one.</p>
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
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT CHANGED (BEFORE/AFTER) ── */}
      <section>
        <p className="gh-section-label">What changed</p>
        <h2>Before and after: concrete state changes</h2>

        <div className="gh-features-grid">
          <div className="feature">
            <h3 className="cs-feature-heading">EMR workflow</h3>
            <p className="cs-body-text"><strong>Before:</strong> 14 steps across 3 systems. Clinicians toggled between windows, re-entered data, and lost context mid-workflow.</p>
            <p className="cs-body-text" style={{ marginTop: "0.5rem" }}><strong>After:</strong> 6 steps in one view. Navigation aligned to clinical task flow, not software architecture.</p>
          </div>
          <div className="feature">
            <h3 className="cs-feature-heading">Certification tracking</h3>
            <p className="cs-body-text"><strong>Before:</strong> Manual spreadsheet. Staff found out certifications had lapsed after the fact.</p>
            <p className="cs-body-text" style={{ marginTop: "0.5rem" }}><strong>After:</strong> Automated dashboard with proactive reminders at 90/60/30 days. Compliance shifted from punitive to preventive.</p>
          </div>
          <div className="feature">
            <h3 className="cs-feature-heading">Clinician onboarding</h3>
            <p className="cs-body-text"><strong>Before:</strong> Fragmented across 5+ departments. Conflicting instructions, missed safety steps.</p>
            <p className="cs-body-text" style={{ marginTop: "0.5rem" }}><strong>After:</strong> Unified experience with a single source of truth, tracked from day one through full productivity.</p>
          </div>
        </div>
      </section>

      {/* ── COLLABORATION: DESIGNING WITHIN A TEAM ── */}
      <section>
        <p className="gh-section-label">Who I worked with</p>
        <h2>Designing under real constraints with real stakeholders</h2>
        <p className="cs-section-intro">
          Healthcare systems don't have a single owner. Every project required navigating competing priorities
          across teams that don't naturally collaborate.
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
            <p className="cs-team-card__desc">Process improvement and training teams. We co-designed change management plans so new workflows were adopted, not just deployed.</p>
          </div>
        </div>

        <div className="cs-evidence-pair" style={{ marginTop: "1.5rem" }}>
          <p className="cs-evidence-pair__finding">A moment that shows how this worked in practice:</p>
          <p className="cs-evidence-pair__evidence">
            During the certification redesign, clinical leadership wanted real-time compliance dashboards visible to department heads.
            IT said the data feed could only refresh daily due to system architecture constraints.
            I proposed a design that showed "as of [date]" timestamps alongside each status, making the daily refresh transparent
            rather than hiding it. Both teams accepted. The compromise was a design decision, not a technical one.
          </p>
        </div>
      </section>

      {/* ── WHAT WENT WRONG ── */}
      <section>
        <p className="gh-section-label">What went wrong</p>
        <h2>Mistakes I made and what they taught me</h2>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">I designed the onboarding system for managers, not new hires.</p>
          <p className="cs-evidence-pair__evidence">
            The first version of the unified onboarding experience was optimized for manager visibility: tracking dashboards,
            completion rates, compliance reports. But when I tested it with actual new clinicians, they found the interface
            overwhelming. They didn't need a dashboard on day one. They needed a single clear next step. I redesigned the
            new-hire view to show only the current task and a progress indicator. The manager dashboard stayed, but it
            wasn't the primary interface anymore.
          </p>
        </div>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">I underestimated change management on the EMR project.</p>
          <p className="cs-evidence-pair__evidence">
            The redesigned EMR workflow was technically better, but the initial rollout had lower adoption than expected.
            Clinicians who had spent years building workarounds for the old system were resistant to relearning.
            I added floor-level training sessions (not webinars) where I walked clinicians through the new flow
            on their actual workstations during shift transitions. Adoption improved within two weeks.
          </p>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="gh-section-label">Outcomes</p>
        <h2 className="cs-section-title">Measurable results across three systems</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">20%</p>
            <p className="cs-outcome-label">EMR cost reduction through workflow redesign</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">70%</p>
            <p className="cs-outcome-label">Efficiency gains in clinical certification workflows</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">21K+</p>
            <p className="cs-outcome-label">Clinicians impacted by onboarding redesign</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">4</p>
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

      {/* ── KEY DECISIONS ── */}
      <section className="cs-decisions">
        <p className="gh-section-label">Key decisions</p>
        <h2 className="cs-section-title">Judgment calls that shaped outcomes</h2>
        <table className="cs-decisions-table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>Approach</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EMR navigation</td>
              <td>Redesigned around clinical tasks, not system features</td>
              <td>Clinicians think in patient actions, not software menus. Aligning IA to mental models cut navigation time</td>
            </tr>
            <tr>
              <td>Certification tracking</td>
              <td>Built visibility into compliance status for both staff and managers</td>
              <td>The old system told you when you'd failed. The new one tells you what's coming: proactive, not punitive</td>
            </tr>
            <tr>
              <td>Onboarding scope</td>
              <td>Unified cross-department experience instead of per-department patches</td>
              <td>Fragmented onboarding created inconsistent care preparation. One system, one standard</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="gh-section-label">What I learned</p>
        <h2 className="cs-section-title">Why MSK shaped how I design</h2>
        <div className="cs-reflections-grid">
          <div className="cs-reflection-card">
            <h3>The design work starts on the floor, not in Figma</h3>
            <p>
              Shadowing clinicians during actual shifts taught me more about system failures than
              any stakeholder interview. The gap between documented process and real behavior is
              where the design problems live. I bring this to every project now.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Stakeholder alignment is the hardest design problem</h3>
            <p>
              The best solution that only one department supports will fail. Getting clinical, IT,
              and operations to see the same problem in the same room is where most projects
              succeed or fail. The design comes after alignment, not before.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Measure what you changed, not what you shipped</h3>
            <p>
              Every project ended with numbers: cost reduction, efficiency gains, adoption rates.
              Not because someone asked for metrics, but because that's the only way to know if
              your design actually worked for the people using it.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Why this work matters now</h3>
            <p>
              The clinical workflows I redesigned are exactly the systems being augmented by AI today.
              Understanding how 21,000 clinicians actually work — how they build workarounds, where they
              lose trust, what makes them adopt or resist change — is the foundation for designing
              AI-augmented tools they'll actually use.
            </p>
          </div>
        </div>

        <div className="cs-shows-card">
          <p className="cs-shows-card__label">What this shows about my design approach</p>
          <p className="cs-shows-card__text">
            I start with the people inside the system, not the interface around it. I use research methods that
            match the organization's language (Lean Six Sigma at MSK, not "design sprints"). I align stakeholders
            before proposing solutions. I measure whether the change worked for the people using it, not whether
            it was delivered on time. And I design for sustainment — solutions that survive leadership transitions
            and system upgrades, not just launch day.
          </p>
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
