// src/sections/good-harvest/research-insights-section.tsx
import React, { useState } from "react";
import { useId } from "react";

type Competitor = {
  name: string;
  whatWorks: string;
  whatsMissing: string;
  href?: string;
};

const competitors: Competitor[] = [
  {
    name: "FoodPrint Seasonal Food Guide",
    whatWorks: "Deep produce education and reminders across 170+ items.",
    whatsMissing: "Location defaults can confuse; calendar contrast can be hard to read.",
    href: "https://www.seasonalfoodguide.org/download-app",
  },
  {
    name: "SeasonEats",
    whatWorks: "Broad coverage (all 50 US states + UK) with quick browsing.",
    whatsMissing: "Seasonality colors lack clarity (no key) and can be ambiguous.",
    href: "https://apps.apple.com/us/app/seasoneats/id1514000104?platform=iphone",
  },
  {
    name: "Harvest",
    whatWorks: "Practical storage tips with offline-friendly browsing.",
    whatsMissing: "Pesticide guidance is vague; accessibility/contrast issues.",
    href: "http://harvest-app.com/",
  },
];

export default function ResearchInsightsSection() {
  const sectionId = useId();
  const [showFullCA, setShowFullCA] = useState(false);

  return (
    <section aria-labelledby={sectionId} className="research">
      <header className="research__header">
        <h2 id={sectionId} className="research__title">
          Research insights
        </h2>
        <p className="research__subtitle">
          Competitive analysis + SWOT helped translate “seasonality info” into decision support for Good Harvest.
        </p>
      </header>

      <div className="research__grid">
        <div className="research__card">
          <h3 className="research__cardTitle">What users needed</h3>
          <ul className="research__list">
            <li>Fast, local seasonality information</li>
            <li>Help navigating confusing produce varieties</li>
            <li>Simple, quick recipes over complex ones</li>
            <li>Consistent organic guidance</li>
            <li>Workflow-friendly habits (many already use task apps)</li>
          </ul>
        </div>

        <div className="research__card">
          <h3 className="research__cardTitle">Why I looked at competitors</h3>
          <p className="research__body">
            To understand how existing seasonal food apps support (or fail) users, I analyzed three direct competitors and ran a SWOT to pinpoint gaps and opportunities for Good Harvest.
          </p>

          <div className="research__callout" role="note" aria-label="Key takeaway">
            <p className="research__calloutTitle">Key takeaway</p>
            <p className="research__calloutBody">
              Many apps provide lots of information, but little decision support. Good Harvest focuses on bridging the drop-off between “what’s in season” and “what should I make?”
            </p>
          </div>
        </div>
      </div>

      <div className="research__block">
        <h3 className="research__blockTitle">Competitive snapshot</h3>
        <p className="research__body">
          I summarized competitor patterns into what works vs. what’s missing, so the insights stay scannable.
        </p>

        <div className="research__toggleBlock">
          <button
            type="button"
            className="recruiter-toggle-link"
            aria-expanded={showFullCA}
            aria-controls="competitive-analysis"
            onClick={() => setShowFullCA((v) => !v)}
          >
            {showFullCA ? "Hide" : "View"} full competitive analysis (PDF)
          </button>
        </div>

        {showFullCA && (
          <div id="competitive-analysis">
            <div className="caTableWrap" role="region" aria-label="Competitive comparison table">
              <table className="caTable">
                <caption className="caTable__caption">
                  Direct competitors and the gaps Good Harvest can address
                </caption>
                <thead className="caTable__head">
                  <tr>
                    <th scope="col" className="caTable__th">App</th>
                    <th scope="col" className="caTable__th">What works</th>
                    <th scope="col" className="caTable__th">What’s missing</th>
                  </tr>
                </thead>
                <tbody className="caTable__body">
                  {competitors.map((c) => (
                    <tr key={c.name} className="caTable__row">
                      <th scope="row" className="caTable__app">
                        {c.href ? (
                          <a className="caTable__link" href={c.href} target="_blank" rel="noreferrer">
                            {c.name}
                          </a>
                        ) : (
                          c.name
                        )}
                      </th>
                      <td className="caTable__td">{c.whatWorks}</td>
                      <td className="caTable__td">{c.whatsMissing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="research__pdf">
              <p className="research__body">
                <a
                  className="research__pdfLink"
                  href="/assets/good-harvest-competitive-analysis.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the full Competitive Analysis + SWOT (PDF)
                </a>
              </p>

              <p className="research__fineprint">
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="research__block">
        <h3 className="research__blockTitle">Opportunities identified</h3>
        <ul className="research__bullets">
          <li><strong>Clarity:</strong> seasonal indicators need explicit legends and plain-language meaning.</li>
          <li><strong>Location relevance:</strong> location-first setup prevents confusing defaults.</li>
          <li><strong>Actionable guidance:</strong> users want “what to do next” (recipes, storage, planning), not only lists.</li>
        </ul>

        <h3 className="research__blockTitle">How this informed Good Harvest</h3>
        <ul className="research__bullets">
          <li>Designed clearer seasonal indicators with a visible key/legend.</li>
          <li>Prioritized a location-first onboarding and editable location controls.</li>
          <li>Built a recipe-forward flow to reduce drop-off from “in season” → “make this.”</li>
        </ul>
      </div>
    </section>
  );
}
