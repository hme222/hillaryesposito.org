import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import EvidenceField from "../../components/flagship/EvidenceField";
import LogisticsMechanism from "../../components/LogisticsMechanism";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import Term from "../../components/Term";
import { LOGISTICS_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

/**
 * Medical logistics, Iraq — the operations case study.
 *
 * Sourced entirely from what Hillary has already published on the About page
 * and from her résumé: 44th Infantry Brigade Combat Team, 5,000+ soldiers, $2M in supplies, seven aid
 * stations in three countries, resupply from 1–2 months to 1–2 weeks (85% in
 * the service record), 60% spending reduction,
 * a 15% efficiency gain from one communication protocol, cold chain inside 48
 * hours. Nothing is added beyond that. The one-sentence additions to the move
 * cards (2026-10-14) come only from design-docs/case-study-stories/logistics.md.
 * Since 2026-10-15 the page leads with the 1–2 months → 1–2 weeks range the
 * record supports; the 85% is a small attributed line (same file).
 *
 * Deliberately absent: unit positions, site locations, routes, dates beyond the
 * deployment year, and anything resembling a real system screen. The diagrams
 * are abstracted shapes of a change, not depictions of military infrastructure.
 */

const CHAPTERS: CaseStudyChapter[] = [
  { id: "log-start", label: "Start" },
  { id: "log-brief", label: "Problem" },
  { id: "log-moves", label: "Moves" },
  { id: "log-constraints", label: "Constraints" },
  { id: "log-outcomes", label: "Outcomes" },
];

const MOVES: { n: string; title: string; finding: string; change: React.ReactNode }[] = [
  {
    n: "01",
    title: "Move the supply point forward",
    finding: "Every resupply run began too far from the aid stations.",
    change: <>Planned and tracked the $2M move forward, in phases from most essential to least, with personnel split so no aid station went unsupplied during the move. <Term def="My own record, not independently measured.">Owner-reported</Term> resupply time changed from 1–2 months to 1–2 weeks.</>,
  },
  {
    n: "02",
    title: "One way of asking",
    finding: "Seven stations used different request and reporting formats.",
    change: "Built one shared request protocol and trained each site on how to order and what each order status meant; the service record reports that critical supplies reached the stations 15% more efficiently.",
  },
  {
    n: "03",
    title: "Order before it runs out",
    finding: "No one could see order status, so sites over-ordered or ran out.",
    change: "Built shared real-time order status; the service record reports 60% lower spending while maintaining availability. The failure it was built against: a site “going black,” out of supplies.",
  },
];

export default function FlagshipLogistics() {
  const { lang } = useLanguage();
  usePageTitle("Medical Logistics — Army Operations Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  // Deep links (e.g. the homepage resupply stat) land on their section.
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" }), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={LOGISTICS_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--logistics" lang="en" ref={rootRef}>
      <RisoDefs />

      <div className="rp-breadcrumbRow">
        <nav className="rp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="rp-breadcrumb__name" title="Hillary Esposito">Hillary Esposito</Link> / <Link to="/?scrollTo=projects">Work</Link> / <span>Medical logistics</span>
        </nav>
      </div>
      <CaseStudyChapters project="Medical logistics" chapters={CHAPTERS} progress />
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
            <span className="rp-eyebrow">Army medical logistics · Iraq · service design</span>
            <h1 className="rp-h1">Resupply went from months to{"\u00a0"}weeks.</h1>
            <span className="rp-readtime"><b>4 min</b><span>read · deployed 2024</span></span>
            <p className="rp-sub">
              I planned and tracked a $2M warehouse relocation serving seven aid stations across three countries.
              Resupply went from <b>1–2 months to 1–2 weeks</b>.
            </p>
            <dl className="rp-heroEvidence" aria-label="Medical logistics case evidence at a glance">
              <div><dt>Role</dt><dd>Medical logistics officer · relocation and service lead</dd></div>
              <div><dt>My contribution</dt><dd>Plan the move · one request protocol · shared order status</dd></div>
              <div><dt>Outcome</dt><dd>85% faster in my service record (owner-reported)</dd></div>
            </dl>
            {/* The tour sits beside the hero action, not in the breadcrumb row,
                which pushed the H1 down on phones (2026-10-16). */}
            <div className="rp-hero__ctas rp-hero__ctas--tour">
              <a className="rp-cta" href="#log-moves">See the three moves →</a>
              <button
                type="button"
                className="rp-heroUtility rp-heroTour"
                onClick={(e) =>
                  window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: { returnFocus: e.currentTarget } }))
                }
              >
                Open the 90-second tour
              </button>
            </div>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--logistics" data-evidence="true">
          {/* The hero used to be just a label chip floating over a single
              photo — thin next to MSK's full dashboard artifact next door.
              This mechanism (the same drawing the "three moves" section
              uses below) gives the header an actual system to show, not
              only a portrait. */}
          <div className="fp-logisticsHeroMechanism">
            <LogisticsMechanism n="01" />
          </div>
          <div className="fp-artifactLabel"><span>DEPLOYMENT · 2024</span><b>44th Infantry Brigade Combat Team · seven aid stations · three countries</b></div>
          <figure className="fp-logisticsPhoto">
            <img src="/assets/about/army.jpg" alt="Hillary Esposito in uniform during her deployment as a medical logistics officer" />
          </figure>
        </div>
      </header>

      <section className="rp-cinema fp-cinema" id="log-brief" aria-labelledby="log-brief-title" data-evidence="true">
        <div className="rp-cinema__sticky">
          <div className="rp-cinema__wash" aria-hidden="true" />
          <div className="fp-cinemaCore fp-cinemaCore--workflow">
            <div><span>THE JOB</span><b>Medicine and equipment, before it is needed</b><small>Not after someone asks.</small></div>
            <i aria-hidden="true">→</i>
            <div><span>THE STAKE</span><b>An aid station that runs out</b></div>
          </div>
          <div className="rp-cinema__artifact rp-cinema__artifact--reminder"><span>Scale</span><b>5,000+ soldiers, $2M in supplies, seven aid stations.</b></div>
          <div className="rp-cinema__artifact rp-cinema__artifact--safety"><span>Constraint</span><b>Cold chain deliveries inside 48 hours.</b></div>
          <div className="rp-cinema__bridge">
            <p className="rp-kicker">Why speed mattered</p>
            <h2 id="log-brief-title">A late delivery is a casualty{"\u00a0"}risk.</h2>
            <p>An aid station is where wounded soldiers are treated first.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="log-moves" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What I changed</p>
          <h2 className="rp-title">Move the warehouse. Then fix the handoffs.</h2>
          <p className="rp-lede">The physical move removed the largest delay. A shared request and visible order status kept it from returning.</p>
          <div className="fp-redesigns fp-redesigns--logistics rp-reveal" data-evidence="true">
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
          <h2 className="rp-title">Three constraints that did not move.</h2>
          <dl className="fp-constraintAnnotations rp-reveal" data-evidence="true">
            <div><dt>Cold chain · 48 hours</dt><dd>Late meant unusable.</dd></div>
            <div><dt>Three countries</dt><dd>Different systems and vocabulary.</dd></div>
            <div><dt>Active zone · $2M move</dt><dd>No rehearsal or acceptable failure.</dd></div>
          </dl>
          <p className="fp-ownership rp-reveal">
            <b>Service-design scope</b>
            People, inventory, requests, and handoffs, and how long recovery took.
          </p>
        </div>
      </section>

      <div className="fp-logisticsEvidence" data-evidence="true"><EvidenceField
        id="log-outcomes"
        kicker="What it added up to"
        title="Measured in time, money, and things that did not happen."
        intro="Moved the supply point, standardized the request, and made order status visible."
        disclaimer="Owner-reported figures from Hillary's service record · measurement periods and methods are not preserved · no unit positions, routes, or locations are described here"
        metrics={[
          { tag: "Relocation", n: "1–\u20602\u00a0wk", label: "reported medical resupply time after the warehouse moved forward, down from 1–2 months · 85% faster in my service record" },
          { tag: "Order status", n: "60%", label: "reported reduction in spending after shared real-time order status stopped over-ordering and stockouts" },
          { tag: "Protocol", n: "15%", label: "reported: critical supplies reached the stations more efficiently after one shared communication protocol" },
        ]}
        route={["Find the step that should not exist", "Move it", "Standardize the ask", "Make the status visible"]}
        leadMetric
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Supply lines and clinic workflows break the same way.</h2>
          <p>In both, I found the step that should not exist and changed the sequence.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <ShareCaseStudy title="Medical logistics — a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/msk"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Memorial Sloan Kettering</p><p className="rp-next__tag">Clinical systems · 21,000+ clinicians and staff</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
