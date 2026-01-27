// src/pages/case-studies/GoodHarvest.tsx
import React, { useEffect, useMemo, useState } from "react";
import MediaCard from "../../components/MediaCard";
import RecruiterSkimCard from "../../components/RecruiterSkimCard";
import ResearchInsightsSection from "../../sections/good-harvest/research-insights-section";

export default function GoodHarvest() {
  const asset = (p: string) => `${process.env.PUBLIC_URL}${p}`;

  // Smooth scroll helper with fixed-nav offset
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 110; // adjust if your navbar height changes
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Toggle state (session-only)
  const [recruiterMode, setRecruiterMode] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("recruiterMode");
    return saved === "1";
  });

  useEffect(() => {
    sessionStorage.setItem("recruiterMode", recruiterMode ? "1" : "0");
  }, [recruiterMode]);

  // Toggle state for Competitive Analysis (session-only)
  const [showCA, setShowCA] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("showCA");
    return saved === "1";
  });

  useEffect(() => {
    sessionStorage.setItem("showCA", showCA ? "1" : "0");
  }, [showCA]);

  // If recruiter mode turns on, scroll to the recruiter card
  useEffect(() => {
    if (!recruiterMode) return;

    const id = window.setTimeout(() => {
      scrollToId("recruiter-summary");
    }, 0);

    return () => window.clearTimeout(id);
  }, [recruiterMode]);

  // If Competitive Analysis turns on, scroll to it
  useEffect(() => {
    if (!showCA) return;

    const id = window.setTimeout(() => {
      scrollToId("competitive-analysis");
    }, 0);

    return () => window.clearTimeout(id);
  }, [showCA]);

  const screens = useMemo(
    () => ({
      homeWire: asset("/assets/good-harvest/goodharvest-home-wireframe.png"),
      homeHeat: asset("/assets/good-harvest/goodharvest-home-heatmap.png"),
      localWire: asset("/assets/good-harvest/goodharvest-localproduce-wireframe.png"),
      localHeat: asset("/assets/good-harvest/goodharvest-localproduce-heatmap.png"),
      recipesWire: asset("/assets/good-harvest/goodharvest-recipes-wireframe.png"),
      recipesHeat: asset("/assets/good-harvest/goodharvest-recipes-heatmap.png"),
    }),
    []
  );

  return (
    <main className="case-study" aria-label="Good Harvest UX Case Study">
      <header className="cs-header">
        <h1>Good Harvest -  UX Case Study</h1>
        <p className="meta">UX Research & Design · Mobile App · Figma</p>
        <p className="intro">
          Good Harvest is a mobile app that helps users plan meals and build shopping lists using produce that is in season in their local area. The goal is to make sustainable eating faster, easier, and more accessible for everyone.
        </p>

        <p className="recruiter-cta">
          Recruiter?{" "}
          <button
            type="button"
            className="recruiter-toggle-link"
            onClick={() => setRecruiterMode((v) => !v)}
          >
            {recruiterMode ? "Hide quick project breakdown ←" : "Click for a quick project breakdown →"}
          </button>
        </p>
      </header>

      {recruiterMode && (
        <RecruiterSkimCard
          title="Good Harvest"
          what="Mobile app for seasonal produce, recipes, and shopping lists—localized by region."
          outcome="A faster “scan → choose → act” flow validated with prototype testing + heatmaps."
          myRole="End-to-end UX: research, IA, wireframes, prototypes, iteration."
          skills={[
            "Interviews",
            "Surveys",
            "Journey mapping",
            "Competitive analysis",
            "SWOT",
            "Prototyping",
            "Accessibility",
          ]}
          timeframe="Project snapshot"
          onBackToStory={() => scrollToId("full-case-study")}
        />
      )}

      <p className="recruiter-cta">
        Want details?{" "}
        <button
          type="button"
          className="recruiter-toggle-link"
          onClick={() => setShowCA((v) => !v)}
          aria-expanded={showCA}
          aria-controls="competitive-analysis"
        >
          {showCA ? "Hide competitive analysis ←" : "View competitive analysis →"}
        </button>
      </p>

      <div id="full-case-study" />

      <section>
        <h2>Problem</h2>
        <p>
          People want to eat more sustainably but struggle to find accurate, location-based information about seasonal produce. Comparing produce varieties, choosing organic options, and planning meals takes too much time and effort.
        </p>
        <p className="highlight">
          How might we help people quickly plan meals around seasonal produce in their area?
        </p>
      </section>

      <section>
        <h2>My role</h2>
        <ul>
          <li>UX Research + UX Design (end-to-end)</li>
          <li>Information architecture + core flows</li>
          <li>Wireframes + prototypes</li>
          <li>Validation via testing + heatmaps</li>
        </ul>
      </section>

      <section>
        <h2>Process</h2>
        <ol className="process">
          <li>
            <strong>Research →</strong> interviews, surveys, competitive analysis & Strategic Insights, journey map
          </li>
          <li>
            <strong>Design →</strong> simplify decisions with hierarchy
          </li>
          <li>
            <strong>Prototype →</strong> test speed + comprehension
          </li>
          <li>
            <strong>Iterate →</strong> refine emphasis + reduce hesitation
          </li>
        </ol>
      </section>

      {showCA && <div id="competitive-analysis" />}

      <ResearchInsightsSection />

      <section>
        <h2>Design solutions</h2>

        <div className="feature">
          <h3>Local seasonal produce</h3>
          <p>Shows what's in season based on the user's location and current month, eliminating guesswork and research time.</p>
        </div>

        <div className="feature">
          <h3>Variety comparison</h3>
          <p>Explains differences between similar produce items (e.g., types of apples or lettuce) to help users make informed choices. Plain-language differences for quick confidence.</p>
        </div>

        <div className="feature">
          <h3>Simple recipes</h3>
          <p>Provides quick, seasonal meal ideas that integrate seamlessly with available produce, reducing planning time.</p>
        </div>

        <div className="feature">
          <h3>Organic guidance</h3>
          <p>Uses EWG (Environmental Working Group) data to guide organic purchases, helping users prioritize their spending.</p>
        </div>

        <div className="feature">
          <h3>Shopping lists + exports</h3>
          <p> Users can export shopping lists to popular task apps like Notion, Google Keep, or Todoist for seamless workflow integration.</p>
        </div>
      </section>

      <section>
        <h2>Validation (prototype + heatmaps)</h2>
        <p>Prototype testing confirmed speed + comprehension; heatmaps verified hierarchy.</p>

        <h3>Home</h3>
        <div className="cs-gallery cols-3">
          <MediaCard
            src={screens.homeWire}
            alt="Good Harvest home wireframe showing layout hierarchy"
            caption="Wireframe: hierarchy + tap targets."
          />
          <MediaCard
            src={screens.homeHeat}
            alt="Heatmap showing attention on seasonal produce module"
            caption="Heatmap: produce first—secondary actions clarified."
          />
          <MediaCard
            src={screens.localWire}
            alt="Local produce wireframe showing location-based filtering"
            caption="Local view: faster decisions."
          />
        </div>

        <h3>Local + Recipes</h3>
        <div className="cs-gallery cols-3">
          <MediaCard
            src={screens.localHeat}
            alt="Heatmap of local produce view showing focus on primary controls"
            caption="Heatmap: primary controls found first."
          />
          <MediaCard
            src={screens.recipesWire}
            alt="Recipes wireframe showing seasonal recipe cards"
            caption="Recipes: quick picks."
          />
          <MediaCard
            src={screens.recipesHeat}
            alt="Heatmap of recipes showing attention on cards and CTA"
            caption="Heatmap: CTA placement validated."
          />
        </div>
      </section>

      <section>
        <h2>Impact</h2>
        <p>
          The design solutions directly addressed user pain points, creating a streamlined experience that made seasonal eating accessible and practical for daily life.
        </p>
        <ul>
          <li>Reduced decision friction with “scan → choose → act.”</li>
          <li>Lowered overwhelm via progressive disclosure.</li>
          <li>Improved adoption likelihood through workflow exports.</li>
        </ul>
      </section>

      <section>
        <h2>What I learned</h2>
        <p>
          This project strengthened my ability to translate research insights into usable product features and design for real-world constraints. I learned the importance of integration with existing user workflows and the value of simplifying complex information.
        </p>
      </section>
    </main>
  );
}
