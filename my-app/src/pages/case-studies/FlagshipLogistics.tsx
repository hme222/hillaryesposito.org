import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import EvidenceField from "../../components/flagship/EvidenceField";
import LogisticsMechanism from "../../components/LogisticsMechanism";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

/**
 * Medical logistics, Iraq — the operations case study.
 *
 * Sourced entirely from what Hillary has already published on the About page
 * and from her résumé: 44th IBCT, 5,000+ soldiers, $2M in supplies, seven aid
 * stations in three countries, 85% resupply reduction, 60% spending reduction,
 * a 15% efficiency gain from one communication protocol, cold chain inside 48
 * hours. Nothing is added beyond that.
 *
 * Deliberately absent: unit positions, site locations, routes, dates beyond the
 * deployment year, and anything resembling a real system screen. The diagrams
 * are abstracted shapes of a change, not depictions of military infrastructure.
 */

const CHAPTERS: CaseStudyChapter[] = [
  { id: "log-start", label: "Start", note: "Supply for 5,000+ soldiers" },
  { id: "log-brief", label: "Problem", note: "A late delivery is a casualty risk" },
  { id: "log-moves", label: "Moves", note: "Three changes, three numbers" },
  { id: "log-constraints", label: "Constraints", note: "Cold chain, 48 hours" },
  { id: "log-outcomes", label: "Outcomes", note: "What it cost to be wrong" },
];

const MOVES = [
  {
    n: "01",
    title: "Move the supply point forward",
    finding: "Every resupply run began too far from the aid stations.",
    change: "Moved the $2M supply point forward. Resupply time fell 85%.",
  },
  {
    n: "02",
    title: "One way of asking",
    finding: "Seven stations used different request and reporting formats.",
    change: "One shared protocol made critical-resource deployment 15% more efficient.",
  },
  {
    n: "03",
    title: "Order before it runs out",
    finding: "Ordering reacted to shortages instead of anticipating them.",
    change: "Weekly and monthly forecasting cut spending 60% without reducing availability.",
  },
];

export default function FlagshipLogistics() {
  usePageTitle("Medical Logistics — Army Operations Case Study");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  return (
    <main className="riso-page flagship-page flagship-page--logistics" lang="en" ref={rootRef}>
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Work</Link> / <span>Medical logistics</span>
      </nav>
      <CaseStudyChapters project="Medical logistics" chapters={CHAPTERS} />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="log-start">
        <CartoField
          mapSrc="/riso/elevation-02.jpg"
          edition="struct"
          mapZoom={1.2}
          mapPosition="50% 46%"
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">Operations · supply chain · service design under pressure</span>
            <h1 className="rp-h1">Medical resupply time reduced 85%, where running out is a casualty risk.</h1>
            <span className="rp-readtime"><b>4 min</b><span>read · deployed 2024</span></span>
            <p className="rp-sub">
              I directed $2M in medical supply across seven aid stations and three countries for
              <b> 5,000+ soldiers</b>. The redesigned service cut resupply time <b>85%</b>.
            </p>
            <a className="rp-cta" href="#log-moves">See the three moves →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--logistics" data-evidence="true">
          <div className="fp-artifactLabel"><span>DEPLOYMENT · 2024</span><b>44th IBCT · seven aid stations · three countries</b></div>
          <figure className="fp-logisticsPhoto">
            <img src="/assets/about/army.jpg" alt="Hillary Esposito in uniform during her deployment as a medical logistics officer" />
          </figure>
        </div>
      </header>

      <section className="rp-cinema fp-cinema" id="log-brief" aria-labelledby="log-brief-title" data-evidence="true">
        <div className="rp-cinema__sticky">
          <div className="rp-cinema__wash" aria-hidden="true" />
          <div className="fp-cinemaCore fp-cinemaCore--workflow" aria-hidden="true">
            <div><span>THE JOB</span><b>Medicine and equipment, before it is needed</b><small>Not after someone asks.</small></div>
            <i>→</i>
            <div><span>THE STAKE</span><b>An aid station that runs out</b><small>Where wounded soldiers are treated first.</small></div>
          </div>
          <div className="rp-cinema__artifact rp-cinema__artifact--reminder"><span>Scale</span><b>5,000+ soldiers, $2M in supplies, seven aid stations.</b></div>
          <div className="rp-cinema__artifact rp-cinema__artifact--safety"><span>Constraint</span><b>Cold chain deliveries inside 48 hours.</b></div>
          <div className="rp-cinema__bridge">
            <p className="rp-kicker">Why the process mattered</p>
            <h2 id="log-brief-title">Process failure in a combat zone isn’t an inconvenience. It’s a casualty risk.</h2>
            <p>Every delay spent the one resource a casualty could not recover: time.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="log-moves" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What I changed</p>
          <h2 className="rp-title">Three moves, three numbers.</h2>
          <p className="rp-lede">No new equipment or people: change location, request, and timing.</p>
          <div className="fp-redesigns rp-reveal" data-evidence="true">
            {MOVES.map((m) => (
              <article key={m.n}>
                <span className="fp-redesigns__n">{m.n}</span>
                <h3>{m.title}</h3>
                <LogisticsMechanism n={m.n} />
                <p className="fp-redesigns__finding">{m.finding}</p>
                <p className="fp-redesigns__change">{m.change}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rp-section rp-override" id="log-constraints" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What made it hard</p>
          <h2 className="rp-title">The constraints were not negotiable.</h2>
          <p className="rp-lede">The future state had to preserve every fixed constraint.</p>
          <div className="fp-systemCards rp-reveal" data-evidence="true">
            <article><span>01 · Cold chain</span><h3>Inside 48 hours</h3><p>Late meant unusable.</p></article>
            <article><span>02 · Multinational</span><h3>Three countries</h3><p>Different systems and vocabulary.</p></article>
            <article><span>03 · Active zone</span><h3>$2M warehouse move</h3><p>No rehearsal or acceptable failure.</p></article>
          </div>
          <p className="fp-ownership rp-reveal">
            <b>Service-design scope</b>
            People, inventory, requests, handoffs, constraints, ownership, and measurable recovery time.
          </p>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="log-outcomes"
        kicker="What it added up to"
        title="Measured in time, money, and things that did not happen."
        intro="Moved the supply point, standardized the request, and replaced reactive ordering with forecasting."
        disclaimer="Figures as reported in Hillary's service record · no unit positions, routes, or locations are described here"
        metrics={[
          { tag: "Led", n: "85%", label: "reduction in medical resupply time after the warehouse moved forward" },
          { tag: "Led", n: "60%", label: "reduction in spending through weekly and monthly demand forecasting" },
          { tag: "Led", n: "15%", label: "efficiency gain in critical resource deployment from one shared communication protocol" },
        ]}
        route={["Find the step that should not exist", "Move it", "Standardize the ask", "Forecast the rest"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Need someone who has done this where it counted?</h2>
          <p>I have run a supply chain where being wrong had a cost, and redesigned clinical systems where the same was true. The instinct transfers: find the workaround, make it visible, and change the sequence.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Send me a note →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/msk"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Memorial Sloan Kettering</p><p className="rp-next__tag">Clinical systems · six years, three roles</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
