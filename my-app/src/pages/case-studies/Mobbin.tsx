// src/pages/case-studies/Mobbin.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MoreWork from "../../components/MoreWork";
import Disclosure from "../../components/Disclosure";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { useLanguage } from "../../app/LanguageContext";
import { MOBBIN_ES } from "../../data/spanishCaseStudies";
import useReveal from "../../hooks/useReveal";
import { PhoneIcon, SproutIcon, MedicalCrossIcon } from "../../components/LineIcons";

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

const OTHER_PROJECTS = [
  {
    icon: <SproutIcon />,
    title: "Grove",
    desc: "AI + design plant care app. Research to working prototype in 3 weeks, solo.",
    path: "/case-study/grove",
  },
  {
    icon: <MedicalCrossIcon />,
    title: "MSK Cancer Center",
    desc: "Six years redesigning clinical workflows, onboarding, and certification systems for 21,000+ clinicians.",
    path: "/case-study/msk",
  },
];

export default function MobbinCaseStudy() {
  usePageTitle("Mobbin: UX Flow Documentation & UI Pattern Curation");
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  if (lang === "es") {
    return <SpanishCaseStudy data={MOBBIN_ES} />;
  }

  return (
    <main className="case-study gh-layout mobbin-cs" aria-label="Mobbin Case Study" lang="en" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">App Capture Specialist | UX Flow Documentation & UI Pattern Curation</p>
          <h1>Mobbin</h1>
          <p className="gh-hero__intro">
            Mobbin · Freelance · Mar 2026 - Jun 2026 · Remote. Documented end-to-end mobile app experiences across three fintech products
            (<strong>Kikoff</strong>, <strong>Polymarket</strong>, and <strong>Discover</strong>)
            for Mobbin's searchable design reference library. Captured screens, organized user flows,
            mapped key interaction sequences, and curated UI patterns used by UX, product, and design teams globally.
          </p>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="reina-hero-badge">
            <span className="reina-hero-crown"><PhoneIcon /></span>
            <span className="reina-hero-badge-label">3 Apps · 200+ Screens</span>
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",    value: "App Capture Specialist" },
          { label: "Client",  value: "Mobbin · Freelance" },
          { label: "Timeline", value: "Mar 2026 - Jun 2026 · 4 mos" },
          { label: "Output",  value: "3 apps · 200+ screens · Full flow capture" },
          { label: "Focus",   value: "UX flow documentation · UI pattern curation" },
          { label: "Location", value: "Remote" },
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

      <nav className="cs-jump-nav" aria-label="Jump to Mobbin case study sections">
        <a href="#mobbin-work">Work</a>
        <a href="#mobbin-apps">Apps</a>
        <a href="#mobbin-entry">Entry</a>
        <a href="#mobbin-lesson">Lesson</a>
        <a href="#mobbin-outcomes">Outcome</a>
      </nav>

      {/* ── THE WORK ── */}
      <section id="mobbin-work" className="cs-overview">
        <p className="gh-section-label">The work</p>
        <h2 className="cs-section-title">Flow documentation is editorial judgment</h2>
        <p className="cs-overview-text">
          Mobbin brought me on as a freelance App Capture Specialist to document three fintech
          apps for its design reference library. Over four months I captured 200+ screens,
          organized them into flows, and tagged everything against Mobbin's taxonomy so other
          designers could actually find the work. Anyone can capture a screen. The challenge is
          knowing <em>which</em> flows are worth documenting, <em>how</em> to structure them so
          they're findable, and <em>what</em> to write so a designer arriving without context
          understands what they're looking at, and why the pattern matters.
        </p>

        <div className="gh-assumption-grid" style={{ marginTop: "1.5rem" }}>
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">The mechanical part</p>
            <p>Capturing screens. Any tool can do it.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">The judgment calls</p>
            <p>Deciding what's worth showing, chunking flows into meaningful sequences, and writing annotations that stay useful to thousands of designers who will never meet me.</p>
          </div>
        </div>

        <Disclosure title="Show my capture method and editorial criteria">
          <p className="cs-overview-text">
            The method: walk every flow as a real user, across iOS, edge cases, and empty states,
            capturing screens and mapping key interaction sequences, then organize onboarding flows,
            conversion paths, feature entry points, and interaction behaviors into a searchable
            structure. Mobbin's value is in sequences, so the judgment call was identifying which
            interactions only make sense in context of the full journey. Kikoff's 12-screen
            onboarding earned a full capture; Discover's marketing interstitials stayed out of the
            batch, because designers search Mobbin to solve interaction problems, and task flows are
            more reusable than landing pages. Empty states and error screens were the hardest to
            reach but the most valuable. The tooling stayed light: the live apps themselves, Figma
            when a pattern needed annotation beyond a screen capture, and Mobbin's own taxonomy as
            the source of truth for conventions and the quality bar.
          </p>
          <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
            Every annotation was written for a designer arriving without context, in a situation I
            can't predict, so each one has to explain what the screen does and why it matters.
            Writing for thousands of designers in contexts I can't predict required a different
            standard than writing for a known team.
          </p>
        </Disclosure>

        <div className="cs-insight-action" style={{ marginTop: "1.5rem" }}>
          <p className="cs-insight-action__label">Role scope</p>
          <ul className="cs-role-scope-list">
            <li>Documented end-to-end mobile app experiences by capturing screens, organizing user flows, and mapping key interaction sequences across real product journeys.</li>
            <li>Curated UI patterns, navigation models, and task flows to support a searchable design reference library used by UX, product, and design teams.</li>
            <li>Analyzed real-world product experiences to identify onboarding flows, conversion paths, feature entry points, interaction behaviors, and reusable interface patterns.</li>
            <li>Reviewed and refined captured flows for clarity, completeness, and accuracy, ensuring each submission was usable as a reliable product design reference.</li>
            <li>Strengthened product judgment by studying how leading apps structure information, guide users, and reduce friction across complex digital experiences.</li>
          </ul>
        </div>
      </section>

      {/* ── THREE APPS, ONE TRUST PROBLEM ── */}
      <section id="mobbin-apps" aria-label="The three apps">
        <p className="gh-section-label">Three apps, one trust problem</p>
        <h2>Same goal, three completely different approaches</h2>
        <p style={{ maxWidth: 720, marginBottom: "2rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Each app sits in a different corner of fintech and financial UX:
          credit building, prediction markets, and legacy banking. All three ask users to trust
          them with money, and I treated each as a different trust problem. Kikoff builds trust
          through immediate proof (show the score change). Polymarket builds trust through
          transparency (show the math behind the odds). Discover builds trust through familiarity
          (match the mental model people already have from physical cards). Comparing their
          approaches side by side is what reveals the pattern system, and understanding the trust
          strategy behind each pattern is what made the annotations useful.
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

        <p style={{ maxWidth: 720, margin: "2rem 0 0", color: "var(--muted)", lineHeight: 1.7 }}>
          Polymarket's core view, the market detail screen showing live odds, position history,
          and resolution criteria, went into the library tagged under data transparency, risk
          disclosure, real-time data, decision support, and progressive disclosure. My annotation:{" "}
          <em>"Surfaces the math behind the odds without requiring financial literacy. Resolution
          criteria visible before any action. The user knows how they'll win or lose before
          committing. Transparency as trust mechanism."</em> Prediction markets ask users to risk
          money on uncertain outcomes; where Kikoff builds trust by showing results, Polymarket
          builds trust by showing the rules. Same goal, opposite approach. Worth studying side by side.
        </p>
        <p style={{ maxWidth: 720, margin: "1rem 0 0", color: "var(--muted)", lineHeight: 1.7 }}>
          The comparison also broke a metric I'd trusted: onboarding length does not equal
          friction. Kikoff's 12-screen onboarding should feel long, but it doesn't, because each
          screen gives the user something (a score, a plan, a confirmation). Polymarket's 4-screen
          onboarding feels longer because it front-loads legal disclosure without reward. Screen
          count is a misleading metric.
        </p>
      </section>

      {/* ── ONE ENTRY, UP CLOSE ── */}
      <section id="mobbin-entry">
        <p className="gh-section-label">One entry, up close</p>
        <h2>Anatomy of a pattern entry</h2>
        <p style={{ maxWidth: 720, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Each screen I catalogued needed structured metadata that fits Mobbin's taxonomy.
          Here's an example of the judgment calls behind a single entry.
        </p>

        <div className="mobbin-example-entry feature" style={{ padding: "1.5rem", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 1rem", color: "var(--olive-2)", fontSize: "0.95rem" }}>Kikoff, trust through proof</h3>
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
      </section>

      {/* ── THE LESSON ── */}
      <section id="mobbin-lesson">
        <p className="gh-section-label">The lesson</p>
        <h2>Naming is harder than designing</h2>
        <Disclosure title="Show the taxonomy lesson and revision story">
          <div className="gh-collab-note">
            <p>
              I worked asynchronously with Mobbin's content team, submitting batches of catalogued
              flows for review against their quality bar and taxonomy standards. Feedback was
              specific: tag accuracy, annotation clarity, flow completeness. My first submission
              batch had tag inconsistencies that doubled the review cycle, because I tagged screens
              based on my own vocabulary instead of aligning with Mobbin's existing taxonomy first.
              "Progress indicator" vs. "status display" vs. "achievement": each maps to a different
              search behavior, and findability depends on matching the searcher's words. I also
              initially over-documented marketing screens; my first Discover submission included
              promotional interstitials and landing screens, and Mobbin's feedback was clear that
              designers come to the library to solve interaction problems. I restructured my process
              to front-load taxonomy review before capturing any screens and shifted to prioritizing
              onboarding flows, key task completions, and edge/empty states. Revision cycles dropped
              by half, and rework on later batches with it. I learned to name patterns by how someone
              would search for them.
            </p>
          </div>
        </Disclosure>
      </section>

      {/* ── WHERE IT LANDED ── */}
      <section id="mobbin-outcomes" className="cs-outcome">
        <p className="gh-section-label">Where it landed</p>
        <h2 className="cs-section-title">Contributing to Mobbin's Finance+ library</h2>
        <p className="cs-overview-text" style={{ maxWidth: 720 }}>
          Three live fintech apps fully catalogued: 200+ screens captured, annotated, and tagged,
          documenting three distinct trust pattern categories for Mobbin's Finance+ library (50+ finance apps).{" "}
          <a href="https://mobbin.com/finance" target="_blank" rel="noopener noreferrer" className="cs-inline-link">View it live →</a>
        </p>
        <Disclosure title="Show what this changed in my product judgment">
          <p className="cs-overview-text">
            What stuck with me: every annotation I wrote will be read by someone I'll never meet, in
            a context I can't predict, to solve a problem I don't know about. That constraint,
            clarity for a stranger in a hurry, is the same one good interface copy lives under. It
            changed how I write everything. And seeing 200+ screens of real product work builds
            pattern recognition you can't get from reading about patterns; it sharpened how I
            evaluate my own design decisions.
          </p>
        </Disclosure>
      </section>

      <div className="cs-inline-cta">
        <p>Interested in this kind of work?</p>
        <a href="mailto:espositohillary@gmail.com" className="hero-btn" style={{ fontSize: "0.9rem", padding: "0.8rem 1.8rem", textDecoration: "none" }}>
          Send me a note
        </a>
      </div>

      {/* ── OTHER PROJECTS ── */}
      <MoreWork projects={OTHER_PROJECTS} onBack={() => navigate("/?scrollTo=projects")} />
    </main>
  );
}
