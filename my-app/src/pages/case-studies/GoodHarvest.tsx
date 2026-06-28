// src/pages/case-studies/GoodHarvest.tsx
import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";
import MediaCard from "../../components/MediaCard";
import ToolsUsed from "../../components/ToolsUsed";
import MoreWork from "../../components/MoreWork";
import useReveal from "../../hooks/useReveal";

export default function GoodHarvest() {
  usePageTitle("Good Harvest: Evidence-Based Mobile UX");
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement>(null);
  useReveal(rootRef);

  const screens = useMemo(() => ({
    appMobile:   "/assets/good-harvest/goodharvest-app-mobile.png",
    appWeb:      "/assets/good-harvest/goodharvest-app-web.png",
    homeWire:    "/assets/good-harvest/goodharvest-home-wireframe.png",
    homeHeat:    "/assets/good-harvest/goodharvest-home-heatmap.png",
    localWire:   "/assets/good-harvest/goodharvest-localproduce-wireframe.png",
    localHeat:   "/assets/good-harvest/goodharvest-localproduce-heatmap.png",
    recipesWire: "/assets/good-harvest/goodharvest-recipes-wireframe.png",
    recipesHeat: "/assets/good-harvest/goodharvest-recipes-heatmap.png",
  }), []);

  const otherProjects = [
    { icon: "🌱", title: "Grove", path: "/case-study/grove",
      desc: "AI + design plant care app. Research to shipped product in 3 weeks, solo." },
    { icon: "🏥", title: "MSK Cancer Center", path: "/case-study/msk",
      desc: "Six years redesigning clinical workflows, onboarding, and certification systems for 21,000+ clinicians." },
  ];

  const researchInsightCards = [
    { num: "Finding 01", heading: "Users are motivated",
      body: "19 of 22 participants say that eating seasonal foods is desirable",
      tag: "Provided research" },
    { num: "Finding 02", heading: "Unclear what's in season locally",
      body: "13 of 22 participants do not know what's in season in their specific area",
      tag: "Provided research" },
    { num: "Finding 03", heading: "Users find seasonal shopping time consuming",
      body: "12 of 22 participants found meal planning around seasonal food takes too much time.",
      tag: "Provided research" },
    { num: "Finding 04", heading: "Produce variety confusion caused decision paralysis",
      body: "When faced with multiple apple or lettuce varieties, 17 of 22 participants either chose randomly or deferred the decision entirely.",
      tag: "Provided research" },
  ];

  const reflections = [
    { label: "What surprised me",
      body: "The provided research pointed to navigation as the friction point. But when I dug into the data, what emerged was a trust problem: users found the information, they just didn't believe it applied to them. That reframed the whole problem from IA to credibility design." },
    { label: "A decision I'd revisit",
      body: "I'd test organic guidance earlier. It was added late in the design process based on survey data, but wasn't validated in the same depth as the core produce flow." },
    { label: "What this shifted in my practice",
      body: "I now build a decision trail doc alongside wireframes, logging every major design choice, what I considered, and why I ruled it out. It makes design reviews sharper and handoff cleaner." },
  ];

  return (
    <main className="case-study gh-layout" aria-label="Good Harvest UX Case Study" ref={rootRef}>

      {/* ── HERO ── */}
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">Product Design · Mobile App · Figma · Heatmap Testing</p>
          <h1>Good Harvest</h1>
          <p className="gh-hero__intro">
            A mobile app I designed to help health-conscious shoppers make{" "}
            <strong>confident, seasonal food choices</strong>, without the
            20-minute research spiral before every grocery run.
          </p>
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
          { label: "Role",     value: "Product Design" },
          { label: "Context",  value: "Independent project" },
          { label: "Tools",    value: "Figma · Maze"   },
          { label: "Scope",    value: "Design → Prototype → Test → Iterate" },
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
        <h2 className="cs-section-title">People want to eat seasonally. The information makes it harder, not easier</h2>
        <p className="cs-overview-text">
          An independent project where I took provided research (22 participant interviews and surveys)
          and designed a mobile app from findings through tested prototype. The research revealed that
          shoppers aren't lacking motivation; they're lacking confidence that information applies to
          <em> their</em> location. I designed the solution and validated it with heatmap testing.
        </p>
      </section>

      {/* ── THE CHALLENGE ── */}
      <section>
        <p className="gh-section-label">The challenge</p>
        <h2>People want to eat seasonally.<br />The information makes it hard.</h2>
        <p>
          Health-conscious shoppers aren't lacking motivation; they're lacking decision
          support. Existing tools tell you what's in season globally, but fail to answer
          the question that matters at point of purchase:{" "}
          <em>what's in season here, right now, and what do I do with it?</em>
        </p>

        <div className="gh-assumption-grid">
          <div className="gh-assumption-card gh-assumption-card--initial">
            <p className="gh-assumption-label">Initial assumption</p>
            <p>Users need better access to seasonal produce information. The problem is discoverability.</p>
          </div>
          <div className="gh-assumption-card gh-assumption-card--finding">
            <p className="gh-assumption-label">What research revealed</p>
            <p>Users could find the information. They didn't trust it applied to their location, and had no clear "next step" once they found it.</p>
          </div>
        </div>

        <div className="highlight">
          <p className="gh-design-q-label">Design Question</p>
          How might we help people quickly plan meals around seasonal produce in their area, with enough confidence to act?
        </div>

        <div className="gh-collab-note">
          <p className="gh-collab-label">Research provenance</p>
          <p>
            <strong>Inherited:</strong> 22 participant interviews and surveys (conducted by bootcamp research team, recruitment via convenience sample).
            I synthesized these findings into personas and design principles.<br />
            <strong>Generated:</strong> 22-participant unmoderated heatmap testing across 3 rounds (I designed the test plan, wrote tasks, recruited participants via Maze panel, and analyzed results).
            Two peer designers reviewed my synthesis and challenged assumptions.
          </p>
        </div>
      </section>

      {/* ── WHAT I NEEDED TO LEARN ── */}
      <section>
        <p className="gh-section-label">What I needed to learn</p>
        <h2>Research questions before designing anything</h2>
        <p className="cs-section-intro">
          I had provided research from 22 participants. Before designing, I needed to understand what was actually
          blocking people from acting on seasonal food information.
        </p>

        <div className="cs-research-questions__grid">
          <div className="cs-research-question">
            <p className="cs-research-question__q">Is the problem discoverability or trust?</p>
            <p className="cs-research-question__why">The provided research said users couldn't find seasonal info. But I suspected they found it and didn't believe it applied to them. Different root cause, different solution.</p>
          </div>
          <div className="cs-research-question">
            <p className="cs-research-question__q">What does "confidence to act" look like at point of purchase?</p>
            <p className="cs-research-question__why">Knowing what's in season is useless if people still hesitate at the grocery store. I needed to understand what breaks the last-mile decision.</p>
          </div>
          <div className="cs-research-question">
            <p className="cs-research-question__q">Where do users look first on a food app screen, and what do they ignore?</p>
            <p className="cs-research-question__why">Heatmap testing would show me actual attention patterns, not self-reported preferences. This was my primary validation method.</p>
          </div>
          <div className="cs-research-question">
            <p className="cs-research-question__q">Can heatmap testing validate hypotheses from inherited research?</p>
            <p className="cs-research-question__why">I was working with someone else's data. I needed to confirm their findings held before designing on top of them.</p>
          </div>
        </div>
      </section>

      {/* ── TOOLS & WHY ── */}
      <ToolsUsed
        tools={[
          { icon: "🎨", name: "Figma",
            why: "Primary design + prototyping surface. Auto layout and components let me iterate wireframes into testable flows without rebuilding screens each round." },
          { icon: "🧪", name: "Maze",
            why: "Unmoderated prototype testing with heatmaps. Chose it over in-person sessions because I needed attention data across 22 participants, not just verbal feedback." },
          { icon: "🗂️", name: "FigJam",
            why: "Affinity mapping provided research data and running the competitive SWOT. Kept synthesis visible so decisions trace back to raw evidence." },
        ]}
      />

      {/* ── PROCESS ── */}
      <section>
        <p className="gh-section-label">Process</p>
        <h2>From research to tested prototype in 6 weeks</h2>

        <ol className="reina-flow-list" aria-label="Design process steps">
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">01</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Research synthesis</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Provided research included 3 in-depth interviews and 22 survey responses with health-conscious home cooks aged 25-45.
                I synthesized the data to identify patterns and define design opportunities.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">02</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Evidence-based design decisions</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Every design choice traced back to research. Produce-first IA (heatmap showed 70% of first taps went to produce),
                embedded recipe CTAs (removed navigation friction), and explicit location indicators (addressing trust, not discoverability).
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">03</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Prototype testing with heatmaps</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                22-participant unmoderated testing via Maze across 3 rounds. Heatmaps revealed what users actually tapped vs. what I expected. Details in the Testing section below.
              </p>
            </div>
          </li>
          <li className="reina-flow-row feature">
            <div className="reina-flow-num gradient-text">04</div>
            <div className="reina-flow-content">
              <h3 style={{ margin: "0 0 0.35rem", color: "var(--olive-2)", fontSize: "1.05rem" }}>Iterate based on findings</h3>
              <p style={{ margin: 0, fontSize: "0.97rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Three major design shifts between v1 and v2, each traceable to a specific test finding.
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* ── RESEARCH FINDINGS ── */}
      <section>
        <p className="gh-section-label">Research findings</p>
        <h2>What the research revealed</h2>
        <div className="gh-collab-note" style={{ marginBottom: "1.5rem" }}>
          <p className="gh-collab-label">What I inherited</p>
          <p>
            Research data (22 participant interviews and surveys) was provided as part of the bootcamp.
            Four key findings from that data shaped every design decision that followed.
          </p>
        </div>

        <div className="gh-features-grid">
          {researchInsightCards.map((card) => (
            <div key={card.num} className="feature">
              <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>{card.heading}</h3>
              <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>{card.body}</p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.82rem", color: "var(--olive-2)", fontWeight: 600 }}>{card.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PRODUCT ── */}
      <section>
        <p className="gh-section-label">The product</p>
        <h2>What Good Harvest looks like</h2>
        <p style={{ maxWidth: 640, marginBottom: "1.5rem", color: "var(--muted)", lineHeight: 1.65 }}>
          Key screens from wireframe through final prototype, validated with heatmap testing.
        </p>

        <h3 style={{ color: "var(--olive-2)", marginBottom: "0.75rem" }}>Home screen: produce-first hierarchy</h3>
        <div className="cs-gallery cols-3">
          <MediaCard src={screens.homeWire}  alt="Good Harvest home wireframe showing layout hierarchy"          caption="Wireframe: hierarchy + tap targets." />
          <MediaCard src={screens.homeHeat}  alt="Heatmap showing attention on seasonal produce module"           caption="Heatmap: 70% of first taps went to produce." />
          <MediaCard src={screens.appMobile} alt="Good Harvest mobile app showing seasonal produce and recipes"   caption="Final: produce-first, secondary nav below fold." />
        </div>

        <h3 style={{ color: "var(--olive-2)", marginTop: "2rem", marginBottom: "0.75rem" }}>Local produce: location trust solved</h3>
        <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          13/22 participants didn't trust that produce info applied to their area. Made the location indicator tappable and prominent with source attribution.
        </p>
        <div className="cs-gallery cols-2">
          <MediaCard src={screens.localWire} alt="Local produce wireframe showing initial location indicator"     caption="v1: location indicator present but passive." />
          <MediaCard src={screens.localHeat} alt="Local produce heatmap showing attention patterns"               caption="Heatmap: users noticed location in v2 (13/22 mentioned it unprompted)." />
        </div>

        <h3 style={{ color: "var(--olive-2)", marginTop: "2rem", marginBottom: "0.75rem" }}>Recipes: embedded discovery</h3>
        <p style={{ fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "1rem" }}>
          Recipe CTA engagement jumped from 40% to 70% after embedding recipes inline with produce detail instead of a separate tab.
        </p>
        <div className="cs-gallery cols-2">
          <MediaCard src={screens.recipesWire} alt="Recipes wireframe showing embedded recipe discovery"         caption="v2: recipes embedded in produce context." />
          <MediaCard src={screens.recipesHeat} alt="Recipes heatmap showing improved engagement"                  caption="Heatmap: 70% recipe CTA engagement (up from 40%)." />
        </div>
      </section>

      {/* ── TESTING ── */}
      <section>
        <p className="gh-section-label">Testing</p>
        <h2>What heatmaps and task testing showed</h2>
        <div className="gh-collab-note" style={{ marginBottom: "1.5rem" }}>
          <p className="gh-collab-label">What I generated</p>
          <p>
            Given provided research, I focused effort where it had the most design leverage: prototype testing.
            I designed and ran 3 rounds of heatmap testing with 22 participants, producing new actionable data that reshaped the product.
          </p>
        </div>

        <div className="gh-validation-strip feature" style={{ marginBottom: "1.5rem" }}>
          {[
            { label: "Participants", value: "22" },
            { label: "Rounds",       value: "3 test cycles" },
            { label: "Method",       value: "Heatmaps + task completion" },
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

        <div className="gh-features-grid">
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Secondary nav relocated</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              Heatmaps showed 70% of first taps went to produce; top nav was ignored.
              Moved secondary actions below the fold and embedded recipe CTAs directly in produce detail.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Location trust solved</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              13 of 22 participants mentioned the location indicator unprompted in v2 (vs. 4 in v1).
              Made it tappable, prominent, and added source attribution.
            </p>
          </div>
          <div className="feature">
            <h3 style={{ color: "var(--olive-2)", marginTop: 0, marginBottom: "0.6rem" }}>Variety comparison surfaced</h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--muted)", lineHeight: 1.65 }}>
              Only 3 of 22 users found the hidden compare feature in v1. Surfaced variety differences
              inline on produce detail with a "What's the difference?" prompt. Zero-navigation.
            </p>
          </div>
        </div>
      </section>

      {/* ── KEY DECISIONS ── */}
      <section className="cs-decisions">
        <p className="gh-section-label">Key decisions</p>
        <h2 className="cs-section-title">Where I landed and why</h2>
        <table className="cs-decisions-table">
          <thead>
            <tr>
              <th>Decision</th>
              <th>Chosen approach</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seasonal indicators</td>
              <td>Explicit text labels + visible legend anchored to confirmed location</td>
              <td>18 of 22 users couldn't interpret color-only indicators. Labels + source attribution addressed the trust gap</td>
            </tr>
            <tr>
              <td>Entry point</td>
              <td>Produce-first home screen; markets as secondary action</td>
              <td>Heatmap showed 70% of first taps went to produce. Users orient around ingredients, not locations</td>
            </tr>
            <tr>
              <td>Recipe discovery</td>
              <td>Recipe-forward flow embedded in produce detail, no navigation required</td>
              <td>Task completion improved when recipes loaded from produce context. Separate tab broke the mental model</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="cs-outcome">
        <p className="gh-section-label">Outcomes</p>
        <h2 className="cs-section-title">What prototype testing suggested</h2>
        <div className="cs-outcome-grid">
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">3/4</p>
            <p className="cs-outcome-label">Users completed core flow unassisted (vs. 1/4 in round one)</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">4 taps</p>
            <p className="cs-outcome-label">Average path to action, down from 7 in v1</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">70%</p>
            <p className="cs-outcome-label">Recipe CTA engagement in v2 vs. 40% in v1</p>
          </div>
          <div className="cs-outcome-card">
            <p className="cs-outcome-value gradient-text">22</p>
            <p className="cs-outcome-label">Participants across 3 rounds of testing</p>
          </div>
        </div>
        <p className="cs-overview-text" style={{ marginTop: "1.5rem", maxWidth: 640 }}>
          <em>Note: Prototype usability metrics (22 participants), not post-launch data. Directional signals treated as hypotheses for a next round.</em>
        </p>
      </section>

      <div className="cs-inline-cta">
        <p>Interested in this kind of work?</p>
        <a href="mailto:espositohillary@gmail.com" className="hero-btn" style={{ fontSize: "0.9rem", padding: "0.8rem 1.8rem", textDecoration: "none" }}>
          Send me a note
        </a>
      </div>

      {/* ── WHAT WENT WRONG ── */}
      <section>
        <p className="gh-section-label">What went wrong</p>
        <h2>Mistakes I made and what they taught me</h2>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">I designed for discoverability when the real problem was trust.</p>
          <p className="cs-evidence-pair__evidence">
            My first wireframes focused on making seasonal produce easier to find — bigger cards, clearer categories,
            prominent search. But heatmap testing showed users were already finding the content. They just didn't
            believe the seasonality claims applied to their specific location. I had to redesign the produce detail
            screen around credibility signals (data sources, location specificity) instead of navigation patterns.
          </p>
        </div>

        <div className="cs-evidence-pair">
          <p className="cs-evidence-pair__finding">I treated inherited research as validated truth instead of testing it myself.</p>
          <p className="cs-evidence-pair__evidence">
            The provided research from 22 participants said users wanted "easier access to seasonal information."
            I designed two rounds of wireframes based on that framing before my own heatmap testing revealed a
            different story. I should have run a validation round earlier, before committing to a direction built
            on someone else's interpretation.
          </p>
        </div>
      </section>

      {/* ── WHAT I LEARNED ── */}
      <section className="cs-reflections">
        <p className="gh-section-label">What I learned</p>
        <h2 className="cs-section-title">The specific ways this project changed how I design</h2>
        <div className="cs-reflections-grid">
          {reflections.map((r) => (
            <div key={r.label} className="cs-reflection-card">
              <h3>{r.label}</h3>
              <p>{r.body}</p>
            </div>
          ))}
          <div className="cs-reflection-card">
            <h3>What I'd explore next</h3>
            <p>
              If the product continued, I'd explore a trust layer on the produce detail screen:
              surfacing the data source behind the seasonality claim to address the location-accuracy
              concern that surfaced in research. I'd also run a longitudinal study on whether
              export integration actually changed shopping behavior over 4+ weeks.
            </p>
          </div>
        </div>

        <div className="cs-shows-card">
          <p className="cs-shows-card__label">What this shows about my design approach</p>
          <p className="cs-shows-card__text">
            I don't treat research as a phase that ends. In this project, heatmap testing after
            the initial design round changed core decisions — the seasonal produce screen needed
            a completely different visual hierarchy than what I'd designed first. I test with real
            users, read what they actually do (not what they say), and redesign based on evidence.
            That cycle — design, test, learn, redesign — is how I work on every project.
          </p>
        </div>
      </section>

      {/* ── OTHER PROJECTS ── */}
      <MoreWork projects={otherProjects} onBack={() => navigate("/?scrollTo=projects")} />

    </main>
  );
}