// src/pages/case-studies/GoodHarvest.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MediaCard from "../../components/MediaCard";
import RecruiterSkimCard from "../../components/RecruiterSkimCard";
import ResearchInsightsSection from "../../sections/good-harvest/research-insights-section";

const TABS = [
  { num: "01", label: "Research",  sub: "Interviews, surveys, competitive analysis" },
  { num: "02", label: "Design",    sub: "Hierarchy, decision trail, tradeoffs"       },
  { num: "03", label: "Prototype", sub: "Speed & comprehension testing"              },
  { num: "04", label: "Iterate",   sub: "Refine emphasis & reduce hesitation"        },
] as const;

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="gh-section-label">{children}</p>
);

const EvidenceTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="gh-evidence-tag">{children}</span>
);

export default function GoodHarvest() {
  const asset = (p: string) => `${process.env.PUBLIC_URL}${p}`;
  const navigate = useNavigate();

  const [recruiterMode, setRecruiterMode] = useState<boolean>(
    () => sessionStorage.getItem("recruiterMode") === "1"
  );
  useEffect(() => {
    sessionStorage.setItem("recruiterMode", recruiterMode ? "1" : "0");
  }, [recruiterMode]);

  const [showCA, setShowCA] = useState<boolean>(
    () => sessionStorage.getItem("showCA") === "1"
  );
  useEffect(() => {
    sessionStorage.setItem("showCA", showCA ? "1" : "0");
  }, [showCA]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (!recruiterMode) return;
    const id = window.setTimeout(() => scrollToId("recruiter-summary"), 0);
    return () => window.clearTimeout(id);
  }, [recruiterMode]);

  useEffect(() => {
    if (!showCA) return;
    const id = window.setTimeout(() => scrollToId("competitive-analysis"), 0);
    return () => window.clearTimeout(id);
  }, [showCA]);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    window.setTimeout(() => {
      const bar = document.getElementById("gh-process-tabs");
      if (!bar) return;
      const y = bar.getBoundingClientRect().bottom + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
  };

  const screens = useMemo(() => ({
    appMobile:   asset("/assets/good-harvest/goodharvest-app-mobile.png"),
    appWeb:      asset("/assets/good-harvest/goodharvest-app-web.png"),
    homeWire:    asset("/assets/good-harvest/goodharvest-home-wireframe.png"),
    homeHeat:    asset("/assets/good-harvest/goodharvest-home-heatmap.png"),
    localWire:   asset("/assets/good-harvest/goodharvest-localproduce-wireframe.png"),
    localHeat:   asset("/assets/good-harvest/goodharvest-localproduce-heatmap.png"),
    recipesWire: asset("/assets/good-harvest/goodharvest-recipes-wireframe.png"),
    recipesHeat: asset("/assets/good-harvest/goodharvest-recipes-heatmap.png"),
  }), []);

  const features = [
    { icon: "📍", title: "Local Seasonal Produce",  desc: "Shows what's in season based on the user's location and current month, eliminating guesswork and research time." },
    { icon: "🔍", title: "Variety Comparison",       desc: "Plain-language differences between similar items (e.g. apple types, lettuce varieties) for quick, confident choices." },
    { icon: "🍳", title: "Simple Recipes",           desc: "Quick, seasonal meal ideas that integrate seamlessly with available produce — reducing planning time." },
    { icon: "🌱", title: "Organic Guidance",         desc: "EWG data surfaces which items are highest-priority buys, so users spend wisely on what actually matters." },
    { icon: "📋", title: "Shopping Lists & Exports", desc: "Export lists directly to Notion, Google Keep, or Todoist for seamless workflow integration." },
  ];

  const otherProjects = [
    { icon: "🛍️", title: "E-Commerce Storefront", path: "/case-study/ecommerce",
      desc: "Accessibility-first storefront with keyboard & screen-reader support across filters, quick view, and a cart drawer." },
    { icon: "👑",  title: "Reina App",             path: "/case-study/reina",
      desc: "A self-directed concept app designed to reduce stress and add clarity to destination wedding planning." },
  ];

  const researchInsightCards = [
    { num: "Finding 01", heading: "Location trust — not information access — was the real gap",
      body: "[X] of [X] participants abandoned seasonal searches mid-task because they couldn't confirm whether a result applied to their region.",
      tag: "User interviews" },
    { num: "Finding 02", heading: "Produce variety confusion caused decision paralysis",
      body: "When faced with multiple apple or lettuce varieties, [X] of [X] participants either chose randomly or deferred the decision entirely.",
      tag: "Interviews + surveys" },
    { num: "Finding 03", heading: "Users want a clear \"next step,\" not just a list",
      body: "Every participant who mentioned seasonal eating as a goal described the same breakdown: knowing what's in season but not knowing what to make with it.",
      tag: "User interviews" },
    { num: "Finding 04", heading: "Organic decisions are driven by anxiety, not knowledge",
      body: "[X]% of survey respondents said they wished they had clearer guidance on which organic items were actually worth the premium vs. which weren't.",
      tag: "Survey data" },
  ];

  const designDecisions = [
    {
      challenge: "How to surface seasonal indicators",
      context: "Users needed to know instantly whether a produce item was in season locally — and trust that the data was accurate for their region.",
      chosenLabel: "✓ Chosen approach",
      chosenBody: "Explicit text labels + visible legend anchored to the user's confirmed location. Location is editable at any point.",
      chosenWhy: "Color-only indicators failed in wireframe testing — [X] of [X] users didn't know what the colors meant. Labels + source attribution addressed the trust gap directly.",
      ruledOut: "Color-coded tags only — ambiguous without a legend, failed to address the location trust problem. Calendar view — too much cognitive load at point of decision.",
    },
    {
      challenge: "Entry point: market-first vs. produce-first",
      context: "Should users start by finding a nearby market, or browsing what's in season? The order shapes the whole mental model.",
      chosenLabel: "✓ Chosen approach",
      chosenBody: "Produce-first home screen with markets as a secondary action. Seasonal produce leads; market discovery follows.",
      chosenWhy: "Heatmap data showed [X]% of first taps went to the produce section. Users are oriented around ingredients, not locations.",
      ruledOut: "Market-first flow — users without a preferred market hit a dead end before seeing value, producing higher drop-off at onboarding.",
    },
    {
      challenge: "Bridging \"in season\" to \"what to cook\"",
      context: "Research showed the drop-off between knowing what's in season and taking action was the core failure point across competing apps.",
      chosenLabel: "✓ Chosen approach",
      chosenBody: "Recipe-forward flow embedded within the produce detail screen. 3-ingredient recipes load directly from the produce context — no navigation required.",
      chosenWhy: "[X] of [X] participants completed the full \"find produce → choose recipe\" flow without assistance, vs. [X] of [X] in v1 without embedded recipes.",
      ruledOut: "Separate recipe tab — adds navigation friction and breaks context. Users would need to remember what they were looking at.",
    },
  ];

  const testCards = [
    { screen: "Home Screen Hierarchy", method: "Heatmap", n: "[X]",
      stat: "[X]%", statLabel: "of first taps landed on seasonal produce section",
      body: "Heat concentration confirmed produce-first hierarchy. Secondary nav actions were largely missed in v1 — tap targets too small, positioned too high.",
      change: "→ Repositioned secondary actions below fold in v2" },
    { screen: "Local Produce Screen", method: "Task completion", n: "[X]",
      stat: "[X]/[X]", statLabel: "users completed \"find item → add to list\" without help",
      body: "Primary controls were found quickly. The location indicator in the header was noticed and trusted — [X] participants commented on it unprompted.",
      change: "→ No major changes needed — hierarchy validated" },
    { screen: "Recipe CTA Placement", method: "Heatmap", n: "[X]",
      stat: "[X]%", statLabel: "CTA engagement in v2 vs. [X]% in v1",
      body: "Moving the recipe CTA from below the fold to inline with produce details significantly increased engagement.",
      change: "→ Embedded CTA became core pattern across screens" },
  ];

  const impactCards = [
    { metric: "[X]/[X]",  label: "↓ Task friction",  body: "Participants completed the \"find → choose → act\" flow without assistance in final testing, vs. [X] of [X] in round one." },
    { metric: "[X] taps", label: "↓ Path to action", body: "Average taps from app open to adding an item to a shopping list, reduced from [X] in v1. Progressive disclosure kept decisions manageable." },
    { metric: "[X]/[X]",  label: "↑ Workflow fit",   body: "Participants named a supported export tool (Notion, Google Keep, Todoist) when asked how they'd integrate this into their routine." },
  ];

  const reflections = [
    { label: "What surprised me",
      body: "[Replace with a specific moment — e.g., \"I went in expecting navigation to be the friction point. What emerged instead was a trust problem — users found the information, they just didn't believe it applied to them. That reframed the whole problem from IA to credibility design.\"]" },
    { label: "A decision I'd revisit",
      body: "[Replace with something honest — e.g., \"I'd test organic guidance earlier. It was added late in the design process based on survey data, but wasn't validated in the same depth as the core produce flow.\"]" },
    { label: "What this shifted in my practice",
      body: "[Replace with a concrete change — e.g., \"I now build a decision trail doc alongside wireframes — logging every major design choice, what I considered, and why I ruled it out. It makes design reviews sharper and handoff cleaner.\"]" },
  ];

  return (
    <main className="case-study gh-layout" aria-label="Good Harvest UX Case Study">

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">UX Research &amp; Design · Mobile App · Figma</p>
          <h1>Good Harvest</h1>
          <p className="gh-hero__intro">
            A mobile app I designed to help health-conscious shoppers make{" "}
            <strong>confident, seasonal food choices</strong> — without the
            20-minute research spiral before every grocery run.
          </p>
          <div className="recruiter-cta">
            <span className="recruiter-cta__label">Recruiter?</span>
            <button
              type="button"
              className="recruiter-toggle-link"
              onClick={() => setRecruiterMode((v) => !v)}
              aria-expanded={recruiterMode}
              aria-controls="recruiter-summary"
            >
              {recruiterMode ? "Hide quick project breakdown ←" : "Click for a quick project breakdown →"}
            </button>
          </div>
        </div>
        <div className="gh-hero__visual" aria-hidden="true">
          <div className="gh-phone-frame">
            <img src={screens.appMobile} alt="Good Harvest mobile app showing seasonal produce, nearby markets and recipes" />
          </div>
        </div>
      </header>

      {/* ── META STRIP ── */}
      <div className="gh-meta-strip">
        {[
          { label: "Role",     value: "End-to-end UX" },
          { label: "Platform", value: "Mobile App"     },
          { label: "Tools",    value: "Figma · Maze"   },
          { label: "Scope",    value: "Research → Design → Prototype → Iterate" },
        ].map((item, i, arr) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {i < arr.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
        <div className="gh-meta-strip__divider" aria-hidden="true" />
        <div className="gh-meta-strip__item">
          <button
            type="button"
            className="recruiter-toggle-link"
            onClick={() => setShowCA((v) => !v)}
            aria-expanded={showCA}
            aria-controls="competitive-analysis"
          >
            {showCA ? "Hide competitive analysis ←" : "View competitive analysis →"}
          </button>
        </div>
      </div>

      {/* ── RECRUITER CARD ── */}
      {recruiterMode && (
        <div className="gh-recruiter-wrap">
          <RecruiterSkimCard
            title="Good Harvest"
            what="Mobile app for seasonal produce, recipes, and shopping lists — localized by region."
            outcome="A faster 'scan → choose → act' flow validated with prototype testing + heatmaps."
            myRole="End-to-end UX: research, IA, wireframes, prototypes, iteration."
            skills={["Interviews","Surveys","Journey mapping","Competitive analysis","SWOT","Prototyping","Accessibility"]}
            timeframe="Project snapshot"
            onBackToStory={() => scrollToId("full-case-study")}
          />
        </div>
      )}

      <div id="full-case-study" />

      {/* ── PROBLEM (always visible) ── */}
      <section>
        <SectionLabel>Problem</SectionLabel>
        <h2>People want to eat seasonally.<br />The information makes it hard.</h2>
        <p>
          Health-conscious shoppers aren't lacking motivation — they're lacking decision
          support. Existing tools tell you what's in season globally, but fail to answer
          the question that matters at point of purchase:{" "}
          <em>what's in season here, right now, and what do I do with it?</em>
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Initial assumption</p>
            <p>Users need better access to seasonal produce information — the problem is discoverability.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What research revealed</p>
            <p>Users could find the information. They didn't trust it applied to their location — and had no clear "next step" once they found it.</p>
          </div>
        </div>

        <div className="highlight">
          <p className="gh-design-q-label">Design Question</p>
          How might we help people quickly plan meals around seasonal produce in their area — with enough confidence to act?
        </div>
      </section>

      {/* ── PROCESS TAB BAR (sticky) ── */}
      <div id="gh-process-tabs" className="gh-tabs" role="tablist" aria-label="Process steps">
        {TABS.map((tab, i) => (
          <button
            key={tab.num}
            type="button"
            role="tab"
            aria-selected={activeTab === i}
            aria-controls={`gh-panel-${i}`}
            className={`gh-tab-btn${activeTab === i ? " gh-tab-btn--active" : ""}`}
            onClick={() => handleTabClick(i)}
          >
            <span className="gh-tab-num">{tab.num}</span>
            <span className="gh-tab-label">{tab.label}</span>
            <span className="gh-tab-sub">{tab.sub}</span>
          </button>
        ))}
      </div>

      {/* Progress bar — width is dynamic, this single inline style is unavoidable */}
      <div className="gh-tab-progress" aria-hidden="true">
        <div className="gh-tab-progress-fill" style={{ width: `${((activeTab + 1) / TABS.length) * 100}%` }} />
      </div>

      {/* ── PANEL 1: RESEARCH ── */}
      <div id="gh-panel-0" role="tabpanel" className={`gh-panel${activeTab === 0 ? " gh-panel--active" : ""}`}>
        <section>
          <SectionLabel>01 · Research</SectionLabel>
          <h2>What [X] people told me<br />before I opened Figma</h2>

          <div className="gh-stats-row">
            {[
              { num: "[X]",    label: "User interviews" },
              { num: "[X]",    label: "Survey responses" },
              { num: "3",      label: "Competitors analyzed" },
              { num: "[X]wks", label: "Research duration" },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="gh-stat-block">
                  <p className="gh-stat-num gradient-text">{s.num}</p>
                  <p className="gh-stat-label">{s.label}</p>
                </div>
                {i < arr.length - 1 && <div className="gh-stat-divider" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>

          <p>
            Participants were{" "}
            <strong>[describe screener — e.g., "health-conscious home cooks aged 25–45 who grocery shop at least twice per week"]</strong>.
            Recruited through <strong>[channels]</strong>.
          </p>

          <div className="gh-insight-cards">
            {researchInsightCards.map((card) => (
              <div key={card.num} className="gh-insight-card feature">
                <span className="gh-insight-num">{card.num}</span>
                <h3>{card.heading}</h3>
                <p>{card.body}</p>
                <EvidenceTag>{card.tag}</EvidenceTag>
              </div>
            ))}
          </div>

          <div className="gh-user-quote">
            <span className="gh-user-quote__mark" aria-hidden="true">"</span>
            <blockquote className="gh-user-quote__text">
              [Replace with a real verbatim quote — e.g., "I know I want to eat more seasonally
              but I don't even know where to start. What's actually in season right now, in my city?"]
            </blockquote>
            <p className="gh-user-quote__attr">— Interview participant, [Month Year]</p>
          </div>
        </section>

        {showCA && <div id="competitive-analysis" />}
        <ResearchInsightsSection />
      </div>

      {/* ── PANEL 2: DESIGN ── */}
      <div id="gh-panel-1" role="tabpanel" className={`gh-panel${activeTab === 1 ? " gh-panel--active" : ""}`}>
        <section>
          <SectionLabel>02 · Design Decisions</SectionLabel>
          <h2>Not just what I designed —<br />why I designed it this way</h2>
          <p>For each major decision, I considered alternatives. Here's where I landed and why — grounded in what research showed.</p>

          <div className="gh-decision-list">
            {designDecisions.map((d) => (
              <div key={d.challenge} className="gh-decision-item">
                <div className="gh-decision-col gh-decision-col--challenge">
                  <p className="gh-decision-label">Design challenge</p>
                  <h3>{d.challenge}</h3>
                  <p>{d.context}</p>
                </div>
                <div className="gh-decision-col gh-decision-col--chosen">
                  <p className="gh-decision-label">{d.chosenLabel}</p>
                  <p><strong>{d.chosenBody}</strong></p>
                  <p className="gh-decision-why">Why: {d.chosenWhy}</p>
                </div>
                <div className="gh-decision-col gh-decision-col--ruled">
                  <p className="gh-decision-label">✗ Ruled out</p>
                  <p>{d.ruledOut}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="gh-solutions-header">
            <SectionLabel>Design Solutions</SectionLabel>
            <p>Each feature maps directly to a pain point surfaced during research.</p>
          </div>

          <div className="gh-solutions-split">
            <div className="gh-features-list">
              {features.map((f) => (
                <div key={f.title} className="gh-feature-row">
                  <span className="gh-feature-icon" aria-hidden="true">{f.icon}</span>
                  <div>
                    <h3 className="gh-feature-title">{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="gh-solutions__visual">
              <div className="gh-browser-frame">
                <div className="gh-browser-chrome">
                  <span /><span /><span />
                  <div className="gh-browser-url">goodharvest.app</div>
                </div>
                <div className="gh-browser-body">
                  <img src={screens.appWeb} alt="Good Harvest web app — produce discovery, location finder and seasonal recipe features" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── PANEL 3: PROTOTYPE ── */}
      <div id="gh-panel-2" role="tabpanel" className={`gh-panel${activeTab === 2 ? " gh-panel--active" : ""}`}>
        <section>
          <SectionLabel>03 · Validation</SectionLabel>
          <h2>What testing confirmed —<br />and what it changed</h2>

          <div className="gh-validation-strip feature">
            {[
              { label: "Method",  value: "Prototype testing" },
              { label: "Insight", value: "Speed + comprehension confirmed" },
              { label: "Signal",  value: "Heatmaps verified visual hierarchy" },
            ].map((item, i, arr) => (
              <React.Fragment key={item.label}>
                <div className="gh-vstrip-item">
                  <p className="gh-vstrip-label">{item.label}</p>
                  <p className="gh-vstrip-value">{item.value}</p>
                </div>
                {i < arr.length - 1 && <div className="gh-vstrip-divider" aria-hidden="true" />}
              </React.Fragment>
            ))}
          </div>

          <div className="gh-test-cards">
            {testCards.map((tc) => (
              <div key={tc.screen} className="gh-test-card feature">
                <div className="gh-test-card__header">
                  <p className="gh-test-card__screen">{tc.screen}</p>
                  <p className="gh-test-card__method">{tc.method} · n={tc.n}</p>
                </div>
                <div className="gh-test-card__body">
                  <p className="gh-test-card__stat gradient-text">{tc.stat}</p>
                  <p className="gh-test-card__stat-label">{tc.statLabel}</p>
                  <p>{tc.body}</p>
                  <span className="gh-test-card__change">{tc.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="gh-gallery-label"><span>Home Screen</span></div>
          <div className="cs-gallery cols-3">
            <MediaCard src={screens.homeWire}  alt="Good Harvest home wireframe showing layout hierarchy"          caption="Wireframe: hierarchy + tap targets." />
            <MediaCard src={screens.homeHeat}  alt="Heatmap showing attention on seasonal produce module"           caption="Heatmap: produce first — secondary actions clarified." />
            <MediaCard src={screens.localWire} alt="Local produce wireframe showing location-based filtering"       caption="Local view: faster decisions." />
          </div>

          <div className="gh-gallery-label gh-gallery-label--spaced"><span>Local Produce &amp; Recipes</span></div>
          <div className="cs-gallery cols-3">
            <MediaCard src={screens.localHeat}   alt="Heatmap of local produce view showing focus on primary controls" caption="Heatmap: primary controls found first." />
            <MediaCard src={screens.recipesWire} alt="Recipes wireframe showing seasonal recipe cards"                 caption="Recipes: quick picks." />
            <MediaCard src={screens.recipesHeat} alt="Heatmap of recipes showing attention on cards and CTA"           caption="Heatmap: CTA placement validated." />
          </div>
        </section>
      </div>

      {/* ── PANEL 4: ITERATE ── */}
      <div id="gh-panel-3" role="tabpanel" className={`gh-panel${activeTab === 3 ? " gh-panel--active" : ""}`}>
        <section>
          <SectionLabel>Impact</SectionLabel>
          <h2>What prototype testing suggested</h2>

          <div className="gh-impact-grid">
            {impactCards.map((card) => (
              <div key={card.label} className="feature gh-impact-card">
                <p className="gh-impact-stat gradient-text">{card.metric}</p>
                <p className="gh-impact-card__label">{card.label}</p>
                <p>{card.body}</p>
              </div>
            ))}
          </div>

          <div className="gh-impact-caveat highlight">
            <p>
              <strong>Honest framing:</strong>{" "}
              These metrics reflect prototype usability testing with [n] participants, not post-launch data.
              Adoption and retention metrics would require a live product to validate. The directional
              signals are encouraging — but I'm treating them as hypotheses for a next round, not proven outcomes.
            </p>
          </div>
        </section>

        <section>
          <SectionLabel>What I Learned</SectionLabel>
          <h2>The specific ways this project<br />changed how I design</h2>

          <div className="gh-reflection-grid">
            {reflections.map((r) => (
              <div key={r.label} className="gh-reflection-card feature">
                <p className="gh-reflection-label">{r.label}</p>
                <p>{r.body}</p>
              </div>
            ))}
            <div className="gh-reflection-next">
              <p className="gh-reflection-label">What I'd explore next</p>
              <p>
                [Replace with strategic thinking — e.g., "If the product continued, I'd explore a trust
                layer on the produce detail screen: surfacing the data source behind the seasonality
                claim to address the location-accuracy concern that surfaced in research. I'd also run
                a longitudinal study on whether export integration actually changed shopping behavior
                over 4+ weeks."]
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── OTHER PROJECTS ── */}
      <aside className="gh-other-projects" aria-label="Other projects">
        <div className="gh-other-projects__header">
          <p className="gh-other-projects__eyebrow">More Work</p>
          <h2>Other Projects</h2>
        </div>
        <div className="gh-other-projects__grid">
          {otherProjects.map((proj) => (
            <article
              key={proj.path}
              className="project-card gh-proj-card"
              onClick={() => navigate(proj.path)}
              role="button"
              tabIndex={0}
              aria-label={`View ${proj.title} case study`}
              onKeyDown={(e) => e.key === "Enter" && navigate(proj.path)}
            >
              <div className="project-media">
                <div className="project-icon">{proj.icon}</div>
              </div>
              <div className="project-body">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
                <span className="gh-proj-cta">View case study →</span>
              </div>
            </article>
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