// src/pages/case-studies/Mobbin.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import ToolsUsed from "../../components/ToolsUsed";

const APPS = [
  {
    slug: "kikoff",
    name: "Kikoff",
    category: "Fintech · Credit building",
    blurb:
      "Catalogued the credit-building onboarding flow, surfacing how Kikoff turns a complex financial product into a confidence-building first session.",
    image: "/assets/mobbin/kikoff.png",
    alt: "Kikoff app screen showing credit building flow",
  },
  {
    slug: "polymarket",
    name: "Polymarket",
    category: "Prediction markets",
    blurb:
      "Documented how Polymarket presents probabilistic data (odds, positions, and market resolution) without overwhelming first-time users.",
    image: "/assets/mobbin/polymarket.png",
    alt: "Polymarket app screen showing prediction market interface",
  },
  {
    slug: "discover",
    name: "Discover",
    category: "Banking · Credit cards",
    blurb:
      "Captured the account and rewards experience: patterns that demonstrate how a legacy financial brand handles trust, clarity, and disclosure.",
    image: "/assets/mobbin/discover.png",
    alt: "Discover app screen showing account and rewards view",
  },
];

const WHAT_I_DID = [
  {
    num: "01",
    title: "Audited live app flows",
    desc: "Walked each app end-to-end to identify flows worth documenting. Kikoff's 12-screen onboarding was worth capturing in full; Discover's marketing interstitials were not.",
  },
  {
    num: "02",
    title: "Captured + structured screens",
    desc: "Captured every state in each flow, organized in sequence. Empty states and error screens were the hardest to reach but the most valuable — designers search for those more than happy paths.",
  },
  {
    num: "03",
    title: "Curated pattern annotations",
    desc: "Authored descriptive metadata for search. Stopped describing what I saw and started describing what a designer would be looking for when they needed this pattern.",
  },
  {
    num: "04",
    title: "Quality-checked for consistency",
    desc: "Aligned tagging to Mobbin's taxonomy. Front-loading this after the first review round cut revision cycles by 50%.",
  },
];

const OTHER_PROJECTS = [
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "End-to-end product design for seasonal produce, validated with heatmaps + 22 testers.",
    path: "/case-study/good-harvest",
  },
  {
    icon: "🌱",
    title: "Grove",
    desc: "AI + design plant care app, showing where AI accelerates and where human design judgment leads.",
    path: "/case-study/grove",
  },
];

export default function MobbinCaseStudy() {
  usePageTitle("Mobbin: UX Flow Documentation & UI Pattern Curation");
  const navigate = useNavigate();

  return (
    <main className="case-study gh-layout mobbin-cs" aria-label="Mobbin Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Freelance · UX Flow Documentation · UI Pattern Curation</p>
          <h1>Mobbin</h1>
          <p className="gh-hero__intro">
            Three live apps (<strong>Kikoff</strong>, <strong>Polymarket</strong>, and <strong>Discover</strong>)
            documented for Mobbin's UX pattern library. UX flow documentation and UI
            pattern curation: walking flows, capturing every state, and writing the
            annotations that help designers find and understand each pattern.
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge">
            <span className="reina-hero-crown">📱</span>
            <span className="reina-hero-badge-label">3 Apps Catalogued</span>
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",    value: "App Capture Specialist, Freelance" },
          { label: "Client",  value: "Mobbin" },
          { label: "Timeline", value: "4-week contract" },
          { label: "Output",  value: "3 apps · Full flow capture" },
          { label: "Focus",   value: "UX flow documentation · UI pattern curation" },
          { label: "Status",  value: "Shipped" },
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
        <h2 className="cs-section-title">Documenting UX flows and curating UI patterns at scale</h2>
        <p className="cs-overview-text">
          Freelance App Capture Specialist for Mobbin, documenting UX flows and curating UI
          patterns across live fintech products. The work required walking every flow end-to-end,
          deciding which screens and states were worth capturing, structuring them for findability,
          and writing annotations useful to thousands of designers I would never meet.
        </p>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section>
        <p className="gh-section-label">The challenge</p>
        <h2>Flow documentation isn't screenshots; it's editorial judgment</h2>
        <p style={{ maxWidth: 720, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Anyone can capture a screen. The challenge is knowing <em>which</em> flows
          are worth documenting, <em>how</em> to structure them so they're findable,
          and <em>what</em> to write so a designer arriving without context understands
          what they're looking at, and why the pattern matters.
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">The hard part wasn't</p>
            <p>Capturing screens. That's mechanical. Any tool can do it.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">The hard part was</p>
            <p>Deciding what's worth showing, chunking flows into meaningful sequences, and writing annotations that stay useful to thousands of designers who will never meet me.</p>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section>
        <p className="gh-section-label">Process</p>
        <h2>Four steps, repeated across every app and flow</h2>

        <ol className="reina-flow-list" aria-label="Process steps">
          {WHAT_I_DID.map((s) => (
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

      {/* ── APPS SHOWCASE ── */}
      <section aria-label="The three apps">
        <p className="gh-section-label">Cataloguing scope</p>
        <h2>Three apps, three product categories</h2>
        <p style={{ maxWidth: 720, marginBottom: "2rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Each app sits in a different corner of fintech and financial UX:
          credit building, prediction markets, and legacy banking. Cataloguing
          all three meant building fluency in how each category communicates
          trust, risk, and progress to its users.
        </p>

        <div className="mobbin-phones-row">
          {APPS.map((app) => (
            <article key={app.slug} className="mobbin-phone-card">
              <div className="mobbin-phone-frame">
                <img
                  src={app.image}
                  alt={app.alt}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fallback = img.nextElementSibling as HTMLElement | null;
                    img.style.display = "none";
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="mobbin-phone-placeholder" aria-hidden="true">
                  <span>{app.name}</span>
                </div>
              </div>
              <div className="mobbin-phone-body">
                <p className="mobbin-phone-cat">{app.category}</p>
                <h3 className="mobbin-phone-name">{app.name}</h3>
                <p className="mobbin-phone-blurb">{app.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── DOCUMENTATION EXAMPLE ── */}
      <section>
        <p className="gh-section-label">What the work looks like</p>
        <h2>Anatomy of a pattern entry</h2>
        <p style={{ maxWidth: 720, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Each screen I catalogued needed structured metadata that fits Mobbin's taxonomy.
          Here's an example of the judgment calls behind a single entry.
        </p>

        <div className="mobbin-example-entry feature" style={{ padding: "1.5rem", borderRadius: "12px", marginBottom: "1.5rem" }}>
          <h4 style={{ margin: "0 0 1rem", color: "var(--olive-2)", fontSize: "0.95rem" }}>Example 1: Kikoff — trust through proof</h4>
          <div className="mobbin-example-grid">
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Screen</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                Credit score progress screen (post-onboarding). Screen 8 of 12 in the "First session → credit building" flow.
              </p>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Pattern tags</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.25rem" }}>
                {["Progress indicator", "Trust signal", "Positive reinforcement", "Data visualization", "Onboarding completion"].map((tag) => (
                  <span key={tag} className="home-mag-tool">{tag}</span>
                ))}
              </div>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">My annotation</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, fontStyle: "italic" }}>
                "Shows credit score improvement as a direct result of the action just taken.
                The timing is deliberate: reinforcement appears immediately after the first
                credit-building task, creating a cause-effect loop that builds confidence."
              </p>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Why this screen matters</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                Most fintech onboarding ends with "you're all set." Kikoff shows you the
                <em> result</em>, immediately. Trust through proof.
              </p>
            </div>
          </div>
        </div>

        <div className="mobbin-example-entry feature" style={{ padding: "1.5rem", borderRadius: "12px" }}>
          <h4 style={{ margin: "0 0 1rem", color: "var(--olive-2)", fontSize: "0.95rem" }}>Example 2: Polymarket — trust through transparency</h4>
          <div className="mobbin-example-grid">
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Screen</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                Market detail screen showing live odds, position history, and resolution criteria. Core view in the "Browse → trade" flow.
              </p>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Pattern tags</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.25rem" }}>
                {["Data transparency", "Risk disclosure", "Real-time data", "Decision support", "Progressive disclosure"].map((tag) => (
                  <span key={tag} className="home-mag-tool">{tag}</span>
                ))}
              </div>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">My annotation</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, fontStyle: "italic" }}>
                "Surfaces the math behind the odds without requiring financial literacy. Resolution
                criteria visible before any action — the user knows how they'll win or lose before
                committing. Transparency as trust mechanism."
              </p>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Why this screen matters</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                Prediction markets ask users to risk money on uncertain outcomes. Where Kikoff
                builds trust by showing results, Polymarket builds trust by showing the rules.
                Same goal, opposite approach — worth studying side by side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLABORATION ── */}
      <section>
        <p className="gh-section-label">Collaboration</p>
        <h2>Working inside someone else's system</h2>
        <div className="gh-collab-note">
          <p>
            I worked asynchronously with Mobbin's content team, submitting batches of
            catalogued flows for review against their quality bar and taxonomy standards.
            Feedback was specific: tag accuracy, annotation clarity, flow completeness.
            I adapted my process after the first review round to front-load taxonomy
            alignment before capturing screens, which cut revision cycles in half.
          </p>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <ToolsUsed
        tools={[
          { icon: "📱", name: "Mobbin",
            why: "Source of truth for the contribution pipeline: taxonomy, conventions, and quality bar all live here." },
          { icon: "🎨", name: "Figma",
            why: "Annotated key flows when patterns needed extra context beyond a screen capture." },
          { icon: "🔍", name: "Live apps",
            why: "Walked each product as a real user, across iOS, edge cases, and empty states, to capture flows in context." },
          { icon: "🗂️", name: "Pattern taxonomy",
            why: "Worked within Mobbin's existing component and pattern vocabulary so contributions stayed searchable and consistent." },
        ]}
      />

      {/* ── KEY DECISIONS ── */}
      <section className="cs-decisions">
        <p className="cs-section-heading">Key decisions</p>
        <h2 className="cs-section-title">How I made judgment calls in each app</h2>
        <table className="cs-decisions-table">
          <thead>
            <tr>
              <th>Decision point</th>
              <th>Approach taken</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Which flows to document</td>
              <td>Prioritized onboarding, key task completion, and edge/empty states over marketing screens</td>
              <td>Designers search Mobbin to solve interaction problems; task flows are more reusable than landing pages</td>
            </tr>
            <tr>
              <td>Taxonomy alignment</td>
              <td>Front-loaded taxonomy review before capturing screens; revised after first feedback round</td>
              <td>First submission batch had tag inconsistencies that cut revision cycles in half after realigning early</td>
            </tr>
            <tr>
              <td>Annotation style</td>
              <td>Wrote annotations for a designer arriving without context, explaining what each screen does and why it matters</td>
              <td>Annotations used by thousands of designers in contexts I can't predict; clarity for a stranger in a hurry is the constraint</td>
            </tr>
            <tr>
              <td>App selection framing</td>
              <td>Treated each app as a different "trust problem": Kikoff (proof), Polymarket (transparency), Discover (familiarity)</td>
              <td>Same goal across all three ("trust us with your money"), different approaches. Cross-app analysis reveals the pattern system</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="cs-section-heading">Outcomes</p>
        <h2 className="cs-section-title">What the contract produced</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3</p>
            <p className="cs-outcome-label">Live fintech apps fully catalogued for Mobbin's library</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">200+</p>
            <p className="cs-outcome-label">Screens captured, annotated, and tagged across 3 fintech products</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3</p>
            <p className="cs-outcome-label">Distinct trust pattern categories documented across apps</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">Shipped</p>
            <p className="cs-outcome-label">Contributions live in Mobbin, used by designers globally</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">50%</p>
            <p className="cs-outcome-label">Fewer revision cycles after front-loading taxonomy alignment</p>
          </div>
        </div>
      </section>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="cs-section-heading">What I learned</p>
        <h2 className="cs-section-title">What three apps taught me</h2>
        <div className="cs-reflections-grid">
          <div className="cs-reflection-card">
            <h3>Trust patterns diverge by risk type</h3>
            <p>
              Kikoff builds trust through immediate proof (show the score change).
              Polymarket builds trust through transparency (show the math behind odds).
              Discover builds trust through familiarity (match the mental model people already have from physical cards).
              Same goal ("trust us with your money"), three completely different approaches.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Naming is harder than designing</h3>
            <p>
              Mobbin's taxonomy has specific vocabulary. Tagging a screen as "progress indicator"
              vs. "status display" vs. "achievement" changes how designers find it. I learned to
              name patterns by how someone would search for them, not how I'd describe them.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Onboarding length does not equal friction</h3>
            <p>
              Kikoff's 12-screen onboarding should feel long, but it doesn't, because
              each screen gives the user something (a score, a plan, a confirmation).
              Polymarket's 4-screen onboarding feels longer because it front-loads
              legal disclosure without reward. Screen count is a misleading metric.
            </p>
          </div>
          <div className="cs-reflection-card">
            <h3>Writing for absent strangers</h3>
            <p>
              Every annotation I wrote will be read by someone I'll never meet, in a context
              I can't predict, to solve a problem I don't know about. That constraint,
              clarity for a stranger in a hurry, is the same one good interface copy lives under.
              It changed how I write everything.
            </p>
          </div>
        </div>
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
