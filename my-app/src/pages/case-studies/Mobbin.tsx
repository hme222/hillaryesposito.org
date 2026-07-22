// src/pages/case-studies/Mobbin.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import JumpNav from "../../components/JumpNav";
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
    category: "Finance · Credit building",
    blurb:
      "Documented Kikoff's credit-building sign-up, showing how it turns a complicated money product into a first session that builds confidence.",
    image: "/assets/mobbin/kikoff.jpg",
    alt: "Kikoff app screen showing credit building flow",
  },
  {
    slug: "polymarket",
    name: "Polymarket",
    category: "Prediction markets",
    blurb:
      "Documented how Polymarket shows odds, bets, and how each market is settled without overwhelming first-time users.",
    image: "/assets/mobbin/polymarket.jpg",
    alt: "Polymarket app screen showing prediction market interface",
  },
  {
    slug: "discover",
    name: "Discover",
    category: "Banking · Credit cards",
    blurb:
      "Captured the account and rewards screens: how an old, established bank handles trust, clarity, and telling you the fine print.",
    image: "/assets/mobbin/discover.jpg",
    alt: "Discover app screen showing account and rewards view",
  },
];

const OTHER_PROJECTS = [
  {
    icon: <SproutIcon />,
    title: "Grove",
    desc: "AI + design plant care app. Solo, research to a working prototype.",
    path: "/case-study/grove",
  },
  {
    icon: <MedicalCrossIcon />,
    title: "MSK Cancer Center",
    desc: "Six years redesigning clinical workflows, onboarding, and certification systems for 21,000+ clinicians and administrative staff.",
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
          <p className="meta">App Capture Specialist · Documenting how apps flow, screen by screen</p>
          <h1>Mobbin</h1>
          <p className="gh-hero__intro">
            <strong>Anyone can screenshot an app. Mobbin hired me to decide what 200+ screens mean
            to a designer who'll never meet me.</strong> I documented three finance apps
            (<strong>Kikoff</strong>, <strong>Polymarket</strong>, and <strong>Discover</strong>)
            into searchable, step-by-step references other designers can learn from: what each screen
            is, the order things happen in, and which patterns product teams actually go looking for.
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
          { label: "Timeline", value: "Mar–Jun 2026 · 4 mos" },
          { label: "Output",  value: "3 apps · 200+ screens" },
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
        label="Jump to Mobbin case study sections"
        items={[
          { id: "mobbin-work", label: "Work" },
          { id: "mobbin-apps", label: "Apps" },
          { id: "mobbin-entry", label: "Entry" },
          { id: "mobbin-lesson", label: "Lesson" },
          { id: "mobbin-outcomes", label: "Outcome" },
        ]}
      />

      <section className="cs-skim" aria-labelledby="mobbin-skim-title">
        <p className="gh-section-label">Read this first</p>
        <h2 id="mobbin-skim-title" className="cs-section-title">The short version</h2>
        <div className="cs-skim-grid">
          <article className="cs-skim-card">
            <span>Problem</span>
            <p>Mobbin needed complete, reliable, searchable references for how apps actually work — not a pile of screenshots with no context.</p>
          </article>
          <article className="cs-skim-card">
            <span>My role</span>
            <p>Freelance capture specialist: documenting how each app flows, screen by screen — the steps, the patterns, the whole journey.</p>
          </article>
          <article className="cs-skim-card">
            <span>Key decision</span>
            <p>Capture the whole path a user takes, including the moments things go wrong or a screen is empty, so each entry works as a real reference.</p>
          </article>
          <article className="cs-skim-card">
            <span>Outcome</span>
            <p>200+ screens across three finance apps, each checked for clarity, completeness, and patterns other designers can reuse.</p>
          </article>
        </div>
      </section>

      <nav className="cs-evidence-links" aria-label="Mobbin evidence shortcuts">
        <a href="#mobbin-apps">View documented apps</a>
        <a href="#mobbin-entry">View pattern entry</a>
        <a href="#mobbin-lesson">View product lessons</a>
        <a href="#mobbin-outcomes">View outcome</a>
      </nav>

      <section className="mobbin-artifact-strip" aria-labelledby="mobbin-artifact-title">
        <div className="mobbin-artifact-strip__copy">
          <p className="gh-section-label">Artifact preview</p>
          <h2 id="mobbin-artifact-title">Screenshots became searchable, step-by-step documentation.</h2>
          <p>
            The work wasn't just taking pictures. Each screen had to sit in the right order, carry the right labels so people could find it, and help another designer understand the pattern without opening the app themselves.
          </p>
        </div>
        <div className="mobbin-artifact-strip__flow" aria-label="Mobbin documentation flow">
          {APPS.map((app, index) => (
            <figure key={app.slug} className="mobbin-artifact-strip__shot">
              <img src={app.image} alt="" loading="lazy" />
              <figcaption>
                <span>{index === 0 ? "Capture" : index === 1 ? "Map" : "Curate"}</span>
                {app.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── THE WORK ── */}
      <section id="mobbin-work" className="cs-overview">
        <p className="gh-section-label">The work</p>
        <h2 className="cs-section-title">Documenting a flow is a judgment call, not a screenshot</h2>
        <p className="cs-overview-text">
          Mobbin brought me on as a freelance capture specialist to document three finance apps
          for its reference library. Over four months I captured 200+ screens, put them in order
          as flows, and tagged them with Mobbin's own vocabulary so other designers could actually
          find them. Anyone can grab a screenshot. The hard part is knowing <em>which</em> flows are
          worth documenting, <em>how</em> to organize them so they're findable, and <em>what</em> to
          write so a designer landing cold understands what they're looking at, and why the pattern
          matters.
        </p>

        <div className="gh-assumption-grid" style={{ marginTop: "1.5rem" }}>
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">The mechanical part</p>
            <p>Capturing screens. Any tool can do it.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">The judgment calls</p>
            <p>Deciding what's worth showing, breaking flows into steps that make sense, and writing notes that stay useful to thousands of designers I'll never meet.</p>
          </div>
        </div>

        <Disclosure title="Show how I captured, and what I chose to include">
          <p className="cs-overview-text">
            The method: walk through every flow like a real user on iPhone — including the odd cases
            and the empty screens — capturing each one and noting the order things happen in. Then
            sort them into groups: sign-up flows, the steps that lead to signing up or paying, where
            each feature starts, and how the app responds when you tap. Mobbin's whole value is in
            the sequence, so the judgment call was spotting which screens only make sense as part of
            the full journey. Kikoff's 12-screen sign-up earned a full capture. Discover's marketing
            splash screens didn't make the cut — designers come to Mobbin to solve real design
            problems, and task flows are more reusable than landing pages. The empty and error
            screens were the hardest to reach and the most valuable. The tools stayed simple: the
            live apps themselves, Figma when a pattern needed more explaining than a screenshot could
            carry, and Mobbin's own vocabulary as the rulebook for naming and quality.
          </p>
          <p className="cs-overview-text" style={{ marginTop: "0.75rem" }}>
            Every note was written for a designer landing on it cold, in a situation I can't predict,
            so each one has to explain what the screen does and why it matters. Writing for thousands
            of strangers takes a different standard than writing for a team you already know.
          </p>
        </Disclosure>

      </section>

      {/* ── THREE APPS, ONE TRUST PROBLEM ── */}
      <section id="mobbin-apps" aria-label="The three apps">
        <p className="gh-section-label">Three apps, one trust problem</p>
        <h2>Same goal, three completely different approaches</h2>
        <p style={{ maxWidth: 720, marginBottom: "2rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Each app lives in a different corner of finance:
          building credit, betting on outcomes, and old-school banking. All three ask people to trust
          them with money, and I treated each as a different trust problem. Kikoff earns trust by
          showing proof right away (watch your score change). Polymarket earns it by being transparent
          (show the math behind the odds). Discover earns it by feeling familiar (match what people
          already expect from a physical card). Putting them side by side is what reveals the
          patterns, and knowing what each one was trying to earn is what made the notes worth
          reading.
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
          Polymarket's main screen — live odds, your past bets, and the exact rules for how a bet
          gets settled — went into the library tagged for things like showing the math, spelling out
          the risk, and revealing detail a bit at a time. My note:{" "}
          <em>"Shows the math behind the odds without needing any finance background. The rules for
          winning or losing are visible before you commit. Transparency as a way to build trust."</em>{" "}
          Prediction markets ask people to risk money on an uncertain outcome; where Kikoff builds
          trust by showing results, Polymarket builds it by showing the rules. Same goal, opposite
          approach. Worth studying side by side.
        </p>
        <p style={{ maxWidth: 720, margin: "1rem 0 0", color: "var(--muted)", lineHeight: 1.7 }}>
          The comparison also broke a rule I'd trusted: a longer sign-up doesn't mean more
          friction. Kikoff's 12-screen sign-up should feel long, but it doesn't, because every
          screen gives you something (a score, a plan, a confirmation). Polymarket's 4-screen
          sign-up feels longer because it front-loads legal fine print with nothing in return.
          Counting screens tells you almost nothing.
        </p>
      </section>

      {/* ── ONE ENTRY, UP CLOSE ── */}
      <section id="mobbin-entry">
        <p className="gh-section-label">One entry, up close</p>
        <h2>What goes into a single entry</h2>
        <p style={{ maxWidth: 720, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.7 }}>
          Every screen I filed needed the right labels so it fits Mobbin's system.
          Here's the thinking behind one entry.
        </p>

        <div className="mobbin-example-entry feature" style={{ padding: "1.5rem", borderRadius: "12px" }}>
          <h3 style={{ margin: "0 0 1rem", color: "var(--olive-2)", fontSize: "0.95rem" }}>Kikoff, trust through proof</h3>
          <figure className="mobbin-example-shot">
            <img src="/assets/mobbin/kikoff.jpg" alt="Kikoff credit-building screen from the captured onboarding flow" loading="lazy" />
            <figcaption>A screen from Kikoff's credit-building flow.</figcaption>
          </figure>
          <div className="mobbin-example-grid">
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Screen</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                The credit-score progress screen, right after sign-up, from the "first session → building credit" flow.
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
                "Shows the credit score moving up right after the action that caused it.
                The timing's deliberate — that jump lands the moment you finish the first
                credit-building task, so cause and effect are obvious. That's what builds confidence."
              </p>
            </div>
            <div className="mobbin-example-block">
              <p className="mobbin-example-label">Why this screen matters</p>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
                Most finance apps end sign-up with "you're all set." Kikoff shows you the
                <em> result</em> instead, right away. Trust through proof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE LESSON ── */}
      <section id="mobbin-lesson">
        <p className="gh-section-label">The lesson</p>
        <h2>Naming is harder than designing</h2>
        <p style={{ maxWidth: 720, marginBottom: "1.25rem", color: "var(--muted)", lineHeight: 1.7 }}>
          My first batch had messy, inconsistent labels, and it doubled the review time: I'd
          tagged screens in my own words instead of learning Mobbin's first.
          "Progress indicator" vs. "status display" vs. "achievement" each sends someone to a
          different search, and a screen only gets found if I match the searcher's words, not mine.
          I also over-documented marketing screens at first; people come to the library to
          solve real design problems, not to read landing pages. So I studied Mobbin's vocabulary
          before capturing anything, and put sign-up flows, key task completions, and the
          empty-or-error screens first.
        </p>
        <div className="highlight">
          <p className="gh-design-q-label">The result</p>
          Revisions dropped by half, and the rework on later batches dropped with them. The lesson
          that stuck: name things the way someone would search for them.
        </div>
      </section>

      {/* ── WHERE IT LANDED ── */}
      <section id="mobbin-outcomes" className="cs-outcome">
        <p className="gh-section-label">Where it landed</p>
        <h2 className="cs-section-title">Contributing to Mobbin's Finance+ library</h2>
        <p className="cs-overview-text" style={{ maxWidth: 720 }}>
          Three live finance apps fully documented: 200+ screens captured, annotated, and labeled —
          three different ways of building trust, added to Mobbin's Finance+ library (50+ finance apps).{" "}
          <a href="https://mobbin.com/finance" target="_blank" rel="noopener noreferrer" className="cs-inline-link">View it live →</a>
        </p>
        <Disclosure title="Show what this changed in my product judgment">
          <p className="cs-overview-text">
            What stuck with me: every note I wrote will be read by someone I'll never meet, in
            a situation I can't predict, to solve a problem I don't know about. That constraint —
            be clear for a stranger in a hurry — is the same one good interface writing lives under.
            It changed how I write everything. And studying 200+ screens of real product work builds
            an instinct you can't get from reading about patterns; it sharpened how I judge my own
            design decisions.
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
