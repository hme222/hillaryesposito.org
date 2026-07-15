import React, { lazy, Suspense, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import JumpNav from "../../components/JumpNav";
import MoreWork from "../../components/MoreWork";
import Disclosure from "../../components/Disclosure";
import MSKDashboardMockup from "../../components/MSKDashboardMockup";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { useLanguage } from "../../app/LanguageContext";
import { MSK_ES } from "../../data/spanishCaseStudies";
import useReveal from "../../hooks/useReveal";
import { SproutIcon, LeafIcon } from "../../components/LineIcons";

// Lazy-loaded so three.js ships in its own chunk (only fetched on this page).
const MSKSystemMap = lazy(() => import("../../components/MSKSystemMap"));

const OTHER_PROJECTS = [
  {
    icon: <SproutIcon />,
    title: "Grove",
    desc: "AI + design plant care app. Solo, research to a working prototype.",
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
  usePageTitle("MSK: Redesigning Systems for 21,000 Clinicians and Staff");
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  if (lang === "es") {
    return <SpanishCaseStudy data={MSK_ES} />;
  }

  return (
    <main className="case-study gh-layout" aria-label="MSK Case Study" lang="en" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero msk-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX & Product Design&nbsp;· Healthcare Systems&nbsp;· Enterprise</p>
          <h1>Memorial Sloan Kettering</h1>
          <p className="gh-hero__intro">
            <strong>Clinicians were printing digital records just to re-file them digitally.</strong>{" "}
            Six years and three roles later, I'd redesigned the workflows, onboarding, and
            certification systems <strong>21,000+ clinicians and administrative staff</strong> depend
            on, and the fixes outlasted the leadership that approved them.
          </p>
        </div>
        <div className="gh-hero__visual msk-hero-dashboard" aria-hidden="true">
          <MSKDashboardMockup compact />
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "UX & Product Design" },
          { label: "Org",      value: "Memorial Sloan Kettering" },
          { label: "Timeline", value: "6 years, 3 roles" },
          { label: "Scale",    value: "21,000+ clinicians & staff" },
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

      <JumpNav
        label="Jump to MSK case study sections"
        items={[
          { id: "msk-summary", label: "Summary" },
          { id: "msk-artifact", label: "Workflow" },
          { id: "msk-interactions", label: "Interactions" },
          { id: "msk-systems", label: "Systems" },
          { id: "msk-outcomes", label: "Outcomes" },
        ]}
      />

      <section id="msk-summary" className="cs-skim" aria-labelledby="msk-skim-title">
        <p className="gh-section-label">Read this first</p>
        <h2 id="msk-skim-title" className="cs-section-title">The short version</h2>
        <div className="cs-skim-grid">
          {[
            ["Problem", "Clinical teams were forced through fragmented workflows, paper workarounds, and unclear status paths inside high-stakes systems."],
            ["My role", "Mapped frontline workflows, translated clinical needs into system requirements, and aligned operations, IT, and clinical leadership."],
            ["Key decision", "Move the next required action into the dashboard instead of asking staff to leave the workflow, print, send, and wait."],
            ["Outcome", "Led the dashboard-to-EMR workflow redesign inside an initiative that cut EMR costs 20% org-wide, rebuilt the certification workflow, and shipped systems used across workflows impacting 21,000+ clinicians and administrative staff."],
          ].map(([k, v]) => (
            <article key={k} className="cs-skim-card"><span>{k}</span><p>{v}</p></article>
          ))}
        </div>
      </section>

      <nav className="cs-evidence-links" aria-label="MSK evidence shortcuts">
        <a href="#msk-artifact">View before/after workflow</a>
        <a href="#msk-dashboard-title">View dashboard mockup</a>
        <a href="#msk-interactions">View interaction decisions</a>
        <a href="#msk-outcomes">View outcomes</a>
      </nav>

      {/* ── OVERVIEW ── */}
      <section className="cs-overview">
        <p className="gh-section-label">Overview</p>
        <h2 className="cs-section-title">Designing for 21,000 clinicians and staff inside the systems they depend on</h2>
        <p className="cs-overview-text">
          At MSK, I optimized how the place actually ran: mapping workflows, finding where systems
          failed the clinicians using them, and shipping fixes that 21,000+ people relied on daily.
          This was user research before I had the vocabulary for it; the instinct came from the
          Army, where I directed medical logistics for 5,000+ soldiers.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Note:</strong> Internal systems and patient data are confidential, so this case
          study uses recreated workflow artifacts and anonymized examples.
        </p>
      </section>

      {/* ── ANONYMIZED ARTIFACT ── */}
      <section id="msk-artifact" className="msk-artifact-section" aria-labelledby="msk-artifact-title">
        <p className="gh-section-label">Anonymized artifact</p>
        <h2 id="msk-artifact-title">Before and after: EMR workflow redesign</h2>
        <p className="cs-section-intro">
          This is the artifact that aligned clinicians, IT, and operations around the same problem.
        </p>

        <p className="cs-section-intro" style={{ marginTop: "-0.5rem" }}>
          The lane tag on each step shows which system it lived in. The failure mode is spatial:
          <strong> the “before” crosses four systems; the redesign stays in two.</strong>
        </p>
        <div className="msk-workflow-artifact feature" aria-label="Before and after EMR workflow">
          {([
            ["before", "Before", "Print, send, then re-file online",
              [["Open the dashboard", "Dashboard"], ["Find the record that needed filing", "Dashboard"], ["Print the documentation packet", "Paper"], ["Send it to a separate filing site", "Filing site"], ["Wait for the record to be filed back into EMR", "Filing site"], ["Return later to confirm completion", "EMR"]],
              "Failure mode: the workflow turned a digital record into paper, then back into a digital record: four systems for one filing."],
            ["after", "After", "One dashboard button to online EMR",
              [["Open the dashboard", "Dashboard"], ["Select the record", "Dashboard"], ["Click the direct EMR action", "Dashboard"], ["Land in the online EMR filing destination", "EMR"], ["Complete the filing action digitally", "EMR"], ["Return to the dashboard with status updated", "Dashboard"]],
              "Design decision: add the missing bridge between the dashboard and the online EMR destination, so the record never leaves the screen."],
          ] as Array<[string, string, string, Array<[string, string]>, string]>).map(([key, label, title, steps, note], i) => (
            <React.Fragment key={key}>
              {i === 1 && <div className="msk-workflow-arrow" aria-hidden="true">→</div>}
              <div className={`msk-workflow-column msk-workflow-column--${key}`}>
                <p className="msk-workflow-label">{label}</p>
                <h3>{title}</h3>
                <ol className="msk-workflow-list">
                  {steps.map(([s, lane]) => (
                    <li key={s}>
                      <span className="msk-lane" data-lane={lane}>{lane}</span>
                      {s}
                    </li>
                  ))}
                </ol>
                <p className="msk-artifact-note">{note}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD CONCEPT ── */}
      <section className="msk-dashboard-section" aria-labelledby="msk-dashboard-title">
        <p className="gh-section-label">Interface artifact</p>
        <h2 id="msk-dashboard-title">Recreated dashboard concept: the missing EMR action</h2>
        <p className="cs-section-intro">
          The dashboard needed to show status, preserve accountability, and expose the direct EMR
          action only when the record was ready and the user had permission.
        </p>
        <MSKDashboardMockup />
      </section>

      <section id="msk-systems" className="msk-complexity-section" aria-labelledby="msk-complexity-title">
        <p className="gh-section-label">Systems complexity</p>
        <h2 id="msk-complexity-title">The product problem was roles, permissions, and workflow states</h2>
        <p className="cs-section-intro">
          The button looked simple. The product logic was not: who could act, who only needed
          visibility, what status meant, and what could go wrong.
        </p>

        <Disclosure title="Show the roles, permissions, states, and edge cases">
          <div className="msk-complexity-grid">
            {([
              ["User types", "Different users needed different views", ["Frontline staff needed the next filing action.", "Managers needed completion visibility across teams.", "Admins needed exception queues and status follow-up.", "Compliance needed evidence that the action was complete."]],
              ["Permission logic", "Access was part of the interaction design", ["Some users could view status but not complete the action.", "Completion needed to create a reliable audit trail.", "The button had to route to the right EMR destination by context."]],
              ["Workflow states", "Status had to be legible at a glance", ["Not started", "Ready to file", "In progress", "Filed in EMR", "Blocked or needs review"]],
              ["Edge cases", "The hard parts sat outside the happy path", ["Missing or mismatched record data.", "User lacks permission to complete the action.", "Status does not update after filing.", "Downtime or delayed EMR response."]],
            ] as Array<[string, string, string[]]>).map(([label, title, items]) => (
              <article key={label} className="msk-complexity-card feature">
                <p className="msk-complexity-card__label">{label}</p>
                <h3>{title}</h3>
                <ul>{items.map((it) => <li key={it}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
        </Disclosure>
      </section>

      <section id="msk-interactions" className="cs-decisions">
        <p className="gh-section-label">Interaction decisions</p>
        <h2 className="cs-section-title">The product logic behind the “simple” dashboard button</h2>
        <table className="cs-decisions-table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>What changed in the UI</th>
              <th>Why it mattered</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Show the action only when the record was ready", "The direct EMR button appeared in the ready-to-file state only.", "Reduced false starts on records still needing review."],
              ["Make permission limits visible", "Users without action access saw status and ownership, not a disabled mystery button.", "Prevented confusion; managers and compliance kept visibility."],
              ["Separate “blocked” from “not started”", "Blocked records moved to an exception state with a reason and owner.", "Separated normal backlog from work needing intervention."],
              ["Return users to the dashboard with updated status", "After filing, staff returned to the dashboard instead of losing their place.", "Closed the loop; the system felt accountable, not like a one-way link."],
              ["Use plain status labels", "States were named around work: ready to file, in progress, filed, blocked.", "Matched how staff talked and reduced training load."],
            ].map(([a, b, c]) => (
              <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── PHASE 1: ON THE FLOOR ── */}
      <section>
        <p className="gh-section-label">Started on the floor</p>
        <h2>Learning how the work actually flowed</h2>
        <p className="cs-section-intro">
          As Office Coordinator, I embedded with frontline teams, shadowing nurses and clinicians
          during actual shifts and mapping real behavior against documented policy. Where staff
          paused, backtracked, or worked around the system is where the design problems lived.
        </p>
      </section>

      {/* ── PHASE 2: BUILDING THE EVIDENCE ── */}
      <section>
        <p className="gh-section-label">Built the evidence</p>
        <h2>Turning floor observations into evidence leadership could act on</h2>
        <p className="cs-section-intro">
          As Administrative Assistant, watching wasn't enough anymore; the findings had to survive a
          room full of stakeholders. Three methods made that work.
        </p>

        <div className="cs-methods-grid">
          {[
            ["Workflow mapping (current vs. ideal state)", "Documented every step, handoff, and decision point, then mapped the ideal state. Everyone could see where the waste lived."],
            ["Speaking leadership's language", 'MSK\'s leadership trusted Lean Six Sigma, so I framed the work in their terms instead of pitching "design thinking" to a clinical operations team.'],
            ["Cross-functional stakeholder sessions", "Clinical leadership, IT, and frontline staff heard the same data at the same time, so alignment happened in the room, not over months of email."],
          ].map(([name, why]) => (
            <div key={name} className="cs-method-card">
              <p className="cs-method-card__name">{name}</p>
              <p className="cs-method-card__why">{why}</p>
            </div>
          ))}
        </div>

        <Disclosure title="Show the cast in every room">
        <div className="cs-team-grid">
          {[
            ["Clinical leadership", "Physicians and nursing directors setting clinical priorities; workflow data got their buy-in."],
            ["IT / EMR engineering", "Built the changes; I translated clinical needs into technical requirements."],
            ["Frontline staff", "Nurses, technicians, and coordinators using the systems daily: my research participants and validation audience."],
            ["Operations / Compliance", "We co-designed change management plans so new workflows actually got adopted."],
          ].map(([role, desc]) => (
            <div key={role} className="cs-team-card">
              <p className="cs-team-card__role">{role}</p>
              <p className="cs-team-card__desc">{desc}</p>
            </div>
          ))}
        </div>
        </Disclosure>
      </section>

      {/* ── PHASE 3: OWNING THE SYSTEMS ── */}
      <section>
        <p className="gh-section-label">Owned the systems</p>
        <h2>Owning the systems I used to observe</h2>
        <p className="cs-section-intro">
          As Training Specialist, I owned onboarding and certification training across departments
          and co-led the Veteran employee resource network. Observation and evidence became design
          authority: the three redesigns below.
        </p>
      </section>

      {/* ── WHAT THE THREE ROLES BUILT ── */}
      <section>
        <p className="gh-section-label">What the three roles built</p>
        <h2>Three systems that worked on paper but failed the people inside them</h2>
        <p className="cs-section-intro">
          Each redesign follows the same arc: a finding from the floor, the design change, and
          what I got wrong.
        </p>

        <div className="highlight" style={{ marginBottom: "1.5rem" }}>
          <p className="gh-design-q-label">The compromise was a design decision, not a technical one</p>
          During the certification redesign, clinical leadership wanted real-time compliance
          dashboards. IT said the data feed could only refresh daily. I proposed "last refreshed"
          timestamps beside each status, making the daily refresh transparent instead of hiding
          it. Both teams accepted.
        </div>

        {([
          {
            title: "1 · EMR workflow redesign",
            finding: "The system made clinicians slow.",
            evidence: "Shadowing revealed a digital workflow that had become a paper workaround: print the record, send it out for filing, wait for it to reappear in online EMR. Cost overruns and frustration were symptoms; the missing bridge was the root cause.",
            change: "One dashboard button routed staff directly to the online EMR filing destination (the before/after artifact above), putting the next required action where staff were already making the decision.",
            lesson: ["I underestimated change management.", "Early adoption lagged; staff who had spent years on the print-and-send workaround resisted relearning. Floor-level training on their actual workstations during shift transitions fixed it within two weeks."],
          },
          {
            title: "2 · Certification system overhaul",
            finding: "Staff failed certifications because the system only told them after the fact.",
            evidence: "The tracking spreadsheet had no proactive alerts. Staff learned a certification had lapsed when compliance flagged it, by then a disciplinary issue.",
            change: 'A certification dashboard for staff and managers, with reminders at 90, 60, and 30 days before expiration and "last refreshed" timestamps (the compromise above). The old system told you when you\'d failed; the new one tells you what\'s coming.',
          },
          {
            title: "3 · Clinician onboarding redesign",
            finding: "New clinicians reached patients underprepared because onboarding was owned by everyone and no one.",
            evidence: "Onboarding was fragmented across 5+ departments, each with its own checklist. Critical steps like system access and safety protocols sometimes finished weeks after a clinician started seeing patients.",
            change: "One unified path with a single source of truth, sequenced so no one reaches patients without completing safety prerequisites. One system, one standard.",
            lesson: ["I designed the first version for managers instead of new hires.", "Tracking dashboards and compliance reports overwhelmed new clinicians, who needed a single clear next step on day one. I redesigned the new-hire view to show only the current task and a progress indicator; the manager dashboard stayed, but stopped being the primary interface."],
          },
        ] as Array<{ title: string; finding: string; evidence: string; change: string; lesson?: [string, string] }>).map((r) => (
          <div key={r.title} className="cs-evidence-pair">
            <h3 className="cs-feature-heading">{r.title}</h3>
            <p className="cs-evidence-pair__finding" style={{ marginTop: "0.75rem" }}>Finding: {r.finding}</p>
            <p className="cs-evidence-pair__evidence">{r.evidence}</p>
            <div className="cs-insight-action" style={{ marginTop: "0.75rem" }}>
              <p className="cs-insight-action__label">What I changed</p>
              <p className="cs-insight-action__text">{r.change}</p>
            </div>
            {r.lesson && (
              <Disclosure title="Show what went wrong">
                <p className="cs-evidence-pair__finding">What went wrong: {r.lesson[0]}</p>
                <p className="cs-evidence-pair__evidence">{r.lesson[1]}</p>
              </Disclosure>
            )}
          </div>
        ))}
      </section>

      {/* ── SYSTEM MAP: tangled clinical systems → trusted flow ── */}
      <section className="msk-systemmap-section">
        <p className="gh-section-label">The through-line</p>
        <h2>How a tangled clinical system became one clinicians trust</h2>
        <p className="cs-section-intro">
          Every project was the same move: reorganize disconnected systems into a flow the
          21,000+ people inside could actually follow.
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
      <section id="msk-outcomes" className="cs-outcome">
        <p className="gh-section-label">Outcomes</p>
        <h2 className="cs-section-title">Three systems that outlasted the leadership that approved them</h2>
        <div className="cs-outcome-grid">
          {[
            ["20%", "Organization-wide EMR cost reduction. I led the dashboard-to-online-EMR workflow redesign that contributed to it."],
            ["70%", "Efficiency gain in the certification workflows I rebuilt."],
            ["21K+", "Clinicians and administrative staff across the workflows I redesigned"],
            ["3", "Roles across 6 years, each building on the last"],
          ].map(([v, l]) => (
            <div key={l} className="cs-outcome-card">
              <p className="cs-outcome-value gradient-text">{v}</p>
              <p className="cs-outcome-label">{l}</p>
            </div>
          ))}
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          <strong>What happened after launch:</strong> The EMR redesign was adopted org-wide and
          survived two system upgrades, the certification dashboard became the default compliance
          tool, and the onboarding changes outlasted three leadership transitions. Sustainment is
          the real test of whether a design solved the problem.
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
          {[
            ["The design work starts on the floor", "No stakeholder interview surfaced the sticky notes and personal spreadsheets clinicians used to survive the EMR. Shadowing did. The gap between documented process and real behavior is where the design problems live."],
            ["Stakeholder alignment is the hardest design problem", 'The best solution that only one department supports will fail. The "last refreshed" compromise happened because clinical leadership and IT finally heard the same constraint in the same room.'],
            ["Why this work matters now", "The clinical workflows I redesigned are exactly the systems being augmented by AI today. Knowing how 21,000 clinicians and staff actually work, where they build workarounds and lose trust, is the foundation for designing AI tools they'll actually use."],
          ].map(([h, p]) => (
            <div key={h} className="cs-reflection-card"><h3>{h}</h3><p>{p}</p></div>
          ))}
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
                <path d="M3.5 1.5H10.5V8.5M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
