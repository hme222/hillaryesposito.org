import React from "react";
import { useNavigate, Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const OTHER_PROJECTS = [
  {
    icon: "🌱",
    title: "Grove",
    desc: "AI + design plant care app — research to shipped product in 3 weeks, solo.",
    path: "/case-study/grove",
  },
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "Heatmap testing with 22 users revealed the problem wasn't discoverability — it was trust.",
    path: "/case-study/good-harvest",
  },
];

export default function MSKCaseStudy() {
  usePageTitle("MSK: Redesigning Systems for 21,000 Clinicians");
  const navigate = useNavigate();

  return (
    <main className="case-study gh-layout" aria-label="MSK Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Process Improvement · UX Design · Healthcare · Enterprise</p>
          <h1>Memorial Sloan Kettering</h1>
          <p className="gh-hero__intro">
            Six years, four roles. I redesigned clinical workflows, onboarding systems,
            and operational processes for <strong>21,000+ clinicians</strong> at one of the
            world's top cancer centers — where confusion isn't an inconvenience, it's a patient safety risk.
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge">
            <span className="reina-hero-crown">🏥</span>
            <span className="reina-hero-badge-label">6 Years · 4 Roles</span>
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "Process Improvement → UX Design" },
          { label: "Org",      value: "Memorial Sloan Kettering Cancer Center" },
          { label: "Duration", value: "6 years, 4 roles" },
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
        <p className="cs-section-heading">Overview</p>
        <h2 className="cs-section-title">Process improvement is design — I just didn't call it that yet</h2>
        <p className="cs-overview-text">
          At MSK, I didn't carry the title "designer." But the work was design: mapping workflows,
          identifying where systems failed the people using them, aligning stakeholders across
          clinical and administrative teams, and shipping solutions that 21,000+ users relied on daily.
          This case study documents the process, not the pixels — because the work that matters most
          in healthcare happens before anyone opens Figma.
        </p>
        <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
          <strong>Note:</strong> Internal systems and patient data are confidential. This case study
          focuses on process, methods, and measurable outcomes rather than interface screenshots.
        </p>
      </section>

      {/* ── THE CHALLENGES ── */}
      <section>
        <p className="gh-section-label">The challenges</p>
        <h2>Three systems, three problems, one approach</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Each project started the same way: a system that worked on paper but failed the people inside it.
        </p>

        <div className="gh-features-grid">
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>EMR workflow redesign</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              Clinicians were spending excessive time navigating the electronic medical record system.
              Redundant steps, unclear navigation, and misaligned workflows inflated costs and frustrated staff.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Certification system overhaul</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              The clinical certification process was manual, error-prone, and opaque. Staff didn't know
              where they stood, managers couldn't track compliance, and the system generated more
              administrative work than clinical value.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Clinician onboarding redesign</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              New clinician onboarding was fragmented across departments with no unified experience.
              Critical orientation steps were missed, time-to-productivity was slow, and the experience
              didn't reflect MSK's standard of care.
            </p>
          </div>
        </div>
      </section>

      {/* ── MY PROCESS ── */}
      <section>
        <p className="gh-section-label">My process</p>
        <h2>The same approach across every project</h2>

        <ol className="reina-flow-list" aria-label="Process steps">
          {[
            { num: "01", title: "Map the current state",
              desc: "Shadowed frontline staff, interviewed stakeholders across departments, and documented the actual workflow — not the documented one. The gap between policy and practice was where the problems lived." },
            { num: "02", title: "Identify the failure points",
              desc: "Used Lean Six Sigma methods to isolate where time, effort, and trust were being lost. Root cause analysis, not symptom treatment." },
            { num: "03", title: "Align stakeholders on the problem",
              desc: "Presented findings to clinical leadership, IT, and frontline staff simultaneously. Cross-functional alignment before proposing solutions — because a solution only one team understands is a solution nobody adopts." },
            { num: "04", title: "Design and implement the change",
              desc: "Redesigned workflows, built new processes, and worked with IT to implement system changes. Then measured whether the change actually worked — not whether it was delivered on time." },
          ].map((s) => (
            <li key={s.num} className="reina-flow-row feature">
              <div className="reina-flow-num gradient-text">{s.num}</div>
              <div className="reina-flow-content">
                <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── COLLABORATION ── */}
      <section>
        <p className="gh-section-label">How I worked</p>
        <h2>Cross-functional by necessity</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Healthcare systems don't have a single owner. Every project required alignment across
          teams that don't naturally collaborate.
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Who I worked with</p>
            <ul className="grove-persona-list">
              <li><strong>Clinical leadership:</strong> Physicians, nursing directors, department heads</li>
              <li><strong>IT:</strong> EMR teams, system administrators, developers</li>
              <li><strong>Frontline staff:</strong> Nurses, technicians, administrative coordinators</li>
              <li><strong>Operations:</strong> Process improvement, compliance, training teams</li>
            </ul>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What made it work</p>
            <ul className="grove-persona-list">
              <li><strong>Shared problem framing:</strong> Presenting the same data to every stakeholder group simultaneously</li>
              <li><strong>Bilingual communication:</strong> Translating clinical needs into technical requirements and back</li>
              <li><strong>Visible metrics:</strong> Measurable outcomes that every team could see and verify</li>
              <li><strong>Frontline validation:</strong> Testing changes with the people who use the system daily</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="cs-section-heading">Outcomes</p>
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
            <p className="cs-outcome-label">Roles across 6 years — each building on the last</p>
          </div>
        </div>
      </section>

      {/* ── KEY DECISIONS ── */}
      <section className="cs-decisions">
        <p className="cs-section-heading">Key decisions</p>
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
              <td>The old system told you when you'd failed. The new one tells you what's coming — proactive, not punitive</td>
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
        <p className="cs-section-heading">What I learned</p>
        <h2 className="cs-section-title">Why MSK made me a designer</h2>
        <div className="cs-reflections-grid">
          <div className="cs-reflection-card">
            <h3>Process improvement is user research</h3>
            <p>
              Shadowing clinicians, mapping their actual workflows, identifying where the system
              failed them — that's user research. I was doing design thinking with a different
              vocabulary. The transition to UX wasn't a career change; it was a name change.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Stakeholder alignment is the design constraint</h3>
            <p>
              The best solution that only one department supports will fail. At MSK, I learned
              that the alignment process — getting clinical, IT, and operations to see the same
              problem — is where most projects actually succeed or fail. The design comes after.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Measure what you changed</h3>
            <p>
              Every project at MSK ended with numbers: cost reduction, efficiency gains, users
              impacted. Not because someone asked for metrics, but because measurable change is
              the only way to know if your design actually worked for the people using it.
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
          <span className="about-story-card__article-icon" aria-hidden="true">📰</span>
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
      <aside className="gh-other-projects" aria-label="Other projects">
        <div className="gh-other-projects__header">
          <p className="gh-other-projects__eyebrow">More Work</p>
          <h2>Other Projects</h2>
        </div>
        <div className="gh-other-projects__grid">
          {OTHER_PROJECTS.map((proj) => (
            <Link
              key={proj.path}
              to={proj.path}
              className="project-card gh-proj-card"
              aria-label={`View ${proj.title} case study`}
            >
              <div className="project-media">
                <div className="project-icon">{proj.icon}</div>
              </div>
              <div className="project-body">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <span className="gh-proj-cta">View case study →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="gh-back-row">
          <button type="button" className="hero-btn" onClick={() => navigate("/")}>
            ← Back to All Work
          </button>
        </div>
      </aside>
    </main>
  );
}
