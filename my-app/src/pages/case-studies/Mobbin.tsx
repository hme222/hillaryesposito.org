// src/pages/case-studies/Mobbin.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ToolsUsed from "../../components/ToolsUsed";

const APPS = [
  {
    slug: "kikoff",
    name: "Kikoff",
    category: "Fintech · Credit building",
    blurb:
      "Catalogued the credit-building onboarding flow — surfacing how Kikoff turns a complex financial product into a confidence-building first session.",
    image: "/assets/mobbin/kikoff.png",
    alt: "Kikoff app screen — credit building flow",
  },
  {
    slug: "polymarket",
    name: "Polymarket",
    category: "Prediction markets",
    blurb:
      "Documented how Polymarket presents probabilistic data — odds, positions, and market resolution — without overwhelming first-time users.",
    image: "/assets/mobbin/polymarket.png",
    alt: "Polymarket app screen — prediction market interface",
  },
  {
    slug: "discover",
    name: "Discover",
    category: "Banking · Credit cards",
    blurb:
      "Captured the account and rewards experience — patterns that demonstrate how a legacy financial brand handles trust, clarity, and disclosure.",
    image: "/assets/mobbin/discover.png",
    alt: "Discover app screen — account and rewards view",
  },
];

const WHAT_I_DID = [
  {
    num: "01",
    title: "Audited live app flows",
    desc: "Walked through each app end-to-end, identifying the flows worth cataloguing — onboarding, key tasks, edge states, and empty states.",
  },
  {
    num: "02",
    title: "Captured + structured screens",
    desc: "Methodically captured every state in each flow, organized them in sequence, and tagged each screen with patterns, components, and UI elements.",
  },
  {
    num: "03",
    title: "Wrote pattern annotations",
    desc: "Authored the descriptive metadata that lets designers search the library — short, consistent annotations that explain what each screen does and why.",
  },
  {
    num: "04",
    title: "Quality-checked for consistency",
    desc: "Reviewed against Mobbin's taxonomy and style guide so the contributions slot cleanly into the broader library and stay searchable.",
  },
];

const OTHER_PROJECTS = [
  {
    icon: "🌿",
    title: "Good Harvest",
    desc: "End-to-end mobile UX for seasonal produce — validated with heatmaps + 22 testers.",
    path: "/case-study/good-harvest",
  },
  {
    icon: "🌱",
    title: "Grove",
    desc: "AI + design plant care app — designed and built solo with AI tooling.",
    path: "/case-study/grove",
  },
];

export default function MobbinCaseStudy() {
  const navigate = useNavigate();

  return (
    <main className="case-study gh-layout mobbin-cs" aria-label="Mobbin Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Contract · UX Cataloguing · Pattern Documentation</p>
          <h1>Mobbin</h1>
          <p className="gh-hero__intro">
            Three live apps — <strong>Kikoff</strong>, <strong>Polymarket</strong>, and <strong>Discover</strong> —
            catalogued for Mobbin's UX pattern library. The work behind the library
            designers use every day: walking flows, capturing every state, and
            documenting the patterns that make each product feel the way it does.
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
          { label: "Role",    value: "Freelance UX Designer" },
          { label: "Client",  value: "Mobbin" },
          { label: "Output",  value: "3 apps · Full flow capture" },
          { label: "Focus",   value: "Pattern documentation" },
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

      {/* ── THE 3 PHONES ── */}
      <section aria-label="The three apps">
        <p className="gh-section-label">The work</p>
        <h2>Three apps, three product categories</h2>
        <p style={{ maxWidth: 720, marginBottom: "2rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Each app sits in a different corner of fintech and financial UX —
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

      {/* ── TOOLS ── */}
      <ToolsUsed
        tools={[
          { icon: "📱", name: "Mobbin",
            why: "Source of truth for the contribution pipeline — taxonomy, conventions, and quality bar all live here." },
          { icon: "🎨", name: "Figma",
            why: "Annotated key flows when patterns needed extra context beyond a screen capture." },
          { icon: "🔍", name: "Live apps",
            why: "Walked each product as a real user — across iOS, edge cases, and empty states — to capture flows in context." },
          { icon: "🗂️", name: "Pattern taxonomy",
            why: "Worked within Mobbin's existing component and pattern vocabulary so contributions stayed searchable and consistent." },
        ]}
      />

      {/* ── WHY THIS WORK MATTERS ── */}
      <section>
        <p className="gh-section-label">The why</p>
        <h2>Why cataloguing UX is design work</h2>
        <p>
          Mobbin is a reference library used by thousands of designers — when a
          pattern is documented well, someone's design decision tomorrow lands
          faster. Doing this work well requires the same instincts as designing
          a product: knowing what's worth showing, what to label, and how a
          stranger will read the structure later.
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Surface view</p>
            <p>"It's just screenshots of other apps."</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What the work actually is</p>
            <p>Reading three live products closely enough to identify which flows are worth documenting, structure them clearly, and write annotations that future designers can search and trust.</p>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section>
        <p className="gh-section-label">Process</p>
        <h2>How I worked through each app</h2>

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

      {/* ── WHAT I TOOK AWAY ── */}
      <section>
        <p className="gh-section-label">Takeaways</p>
        <h2>What three apps taught me</h2>
        <div className="gh-features-grid">
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>Pattern fluency</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
              Reading three different fintech products at this depth surfaced
              the patterns each category leans on — and the places where
              category conventions break in interesting ways.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>Disciplined documentation</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
              Working inside an existing taxonomy sharpened how I name things,
              chunk flows, and write annotations that stay legible to a designer
              who arrives without context.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>Trust-signal vocabulary</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
              All three apps handle high-stakes financial decisions. Watching
              how each one signals safety, confirms intent, and discloses risk
              built a vocabulary I now reach for in my own work.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.75rem" }}>Designer empathy at scale</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>
              Every entry is read by someone trying to solve a problem fast.
              That constraint — clarity for a stranger in a hurry — is the same
              one good interface copy lives under.
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
