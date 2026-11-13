import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import EvidenceField from "../../components/flagship/EvidenceField";
import LogisticsMechanism from "../../components/LogisticsMechanism";
import OrderStatusBoard from "../../components/flagship/OrderStatusBoard";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import Term from "../../components/Term";
import { LOGISTICS_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";
import CopyEmail from "../../components/CopyEmail";
import CaseMore from "../../components/CaseMore";

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
    change: "Built one shared request protocol and trained each site on how to order and what each order status meant; the service record reports a 15% efficiency gain in getting critical supplies to the stations. How it was measured is not preserved.",
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
  usePageTitle("Medical Logistics: Army Operations Case Study", lang !== "es");
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
            <h1 className="rp-h1">Resupply went from months to{"\u00a0"}weeks.</h1>
            <p className="rp-sub">
              I planned and tracked a warehouse move for seven aid stations in three countries.
            </p>
            {/* Interview-sourced human line (Better Stories pass, 2026-11-10); source: design-docs/case-study-stories. */}
            <p className="rp-humanLine">I was in charge of getting rabies vaccines to three countries. Once, I delivered them myself.</p>
            <dl className="rp-heroEvidence" aria-label="Medical logistics case evidence at a glance">
              <div><dt>Result</dt><dd>Resupply went from <b>1–2 months to 1–2 weeks</b> · $2M warehouse move</dd></div>
              <div><dt>Role</dt><dd>Medical logistics officer · relocation and service lead</dd></div>
            </dl>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--logistics" data-evidence="true">
          {/* The hero shows the mechanism (the same drawing the "three moves"
              section uses below). The portrait was removed at the owner’s
              request, 2026-11-04. */}
          <div className="fp-logisticsHeroMechanism">
            <LogisticsMechanism n="01" />
          </div>
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
            <h2 id="log-brief-title">A late delivery is a casualty{"\u00a0"}risk.</h2>
            <p>An aid station is where wounded soldiers are treated first.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="log-moves" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">Move the warehouse. Then fix the handoffs.</h2>
          <div className="fp-redesigns fp-redesigns--logistics rp-reveal" data-evidence="true">
            {MOVES.map((m) => (
              <article key={m.n}>
                <span className="fp-redesigns__n">{m.n}</span>
                <h3>{m.title}</h3>
                <p className="fp-redesigns__finding">{m.finding}</p>
                <p className="fp-redesigns__change">{m.change}</p>
              </article>
            ))}
          </div>
          <OrderStatusBoard />
          <CaseMore label="Why the move came first">
            <p className="rp-lede">The physical move removed the largest delay. A shared request and visible order status kept it from returning.</p>
          </CaseMore>
        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See what made it hard and what I changed</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section rp-override" id="log-constraints" data-evidence="true">
          <div className="rp-wrap">
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
            <div className="fp-redesigns fp-redesigns--logistics rp-reveal" data-evidence="true">
              {MOVES.map((m) => (
                <article key={m.n}>
                  <span className="fp-redesigns__n">{m.n}</span>
                  <h3>{m.title}</h3>
                  <LogisticsMechanism n={m.n} />
                </article>
              ))}
            </div>
          </div>
        </section>
      </details>

      <div className="fp-logisticsEvidence" data-evidence="true"><EvidenceField
        id="log-outcomes"
        title="Measured in time, money, and things that did not happen."
        intro="Owner-reported figures from my service record."
        disclaimer="Measurement periods and methods are not preserved. No unit positions, routes, or locations are described here."
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
          <CaseMore label="How this connects to clinic work">
            <p>A supply run began too far from the aid stations. Portal messages took a paper route and lost their chart context. In both, I moved the step that did not belong.</p>
          </CaseMore>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <CopyEmail />
          <ShareCaseStudy title="Medical logistics: a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/ux-woman"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">UX Woman</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
