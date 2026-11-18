import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import EvidenceField from "../../components/flagship/EvidenceField";
import LogisticsMechanism from "../../components/LogisticsMechanism";
import LogisticsMoveMap from "../../components/LogisticsMoveMap";
import OrderStatusBoard from "../../components/flagship/OrderStatusBoard";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { LOGISTICS_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";
import CaseMore from "../../components/CaseMore";

/**
 * Medical logistics, Iraq — the operations case study.
 *
 * Sourced entirely from what Hillary has already published on the About page
 * and from her résumé: 44th Infantry Brigade Combat Team, 5,000+ soldiers, $2M in supplies, seven aid
 * stations in three countries, resupply from 1–2 months to 1–2 weeks (85% in
 * the Officer Evaluation Report, her source for all three), 60% spending reduction,
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
    change: <>Planned and tracked the $2M move forward, in phases from most essential to least, with personnel split so no aid station went unsupplied during the move.</>,
  },
  {
    n: "02",
    title: "One way of asking",
    finding: "Seven stations used different request and reporting formats.",
    change: "Built one shared request protocol and trained each site on how to order and what each order status meant.",
  },
  {
    n: "03",
    title: "Order before it runs out",
    finding: "No one could see order status, so sites over-ordered or ran out.",
    change: "Built shared real-time order status. The failure it was built against: a site “going black,” out of supplies.",
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
              On an Army National Guard deployment to Iraq and two neighboring countries, I was in charge of medical supplies for seven aid stations. When I arrived, getting supplies took 1–2 months. I made the case to move the warehouse closer, then planned and tracked the move. <b>Supplies then took 1–2 weeks, per my Officer Evaluation Report.</b>
            </p>
            {/* Interview-sourced human line (Better Stories pass, 2026-11-10); source: design-docs/case-study-stories. */}
            <p className="rp-humanLine">I was in charge of getting rabies vaccines to three countries. Once, I delivered them myself.</p>
            <dl className="rp-heroEvidence" aria-label="Medical logistics case evidence at a glance">
              <div><dt>Role</dt><dd>Medical logistics officer · relocation and service lead</dd></div>
            </dl>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--logistics" data-evidence="true">
          {/* 2026-11-15: the small move-01 line drawing (it repeats in "three
              moves" below) gave way to a schematic of the whole warehouse move,
              after Lex asked for bigger heroes that explain the story. */}
          <LogisticsMoveMap />
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
          <div className="rp-cinema__artifact rp-cinema__artifact--reminder"><span>Scale</span><b>5,000+ New Jersey soldiers, $2M in supplies, seven aid stations.</b></div>
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
          <p className="rp-lede">I did the heavy lifting alongside my team. Afterward the stations asked to track their own orders.</p>
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
          <OrderStatusBoard />
        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">See what made it hard</b>
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
              <div><dt>Combat zone · $2M in supplies</dt><dd>No rehearsal or acceptable failure.</dd></div>
            </dl>
          </div>
        </section>
      </details>

      <div className="fp-logisticsEvidence" data-evidence="true"><EvidenceField
        id="log-outcomes"
        title="Measured in time, money, and things that did not happen."
        disclaimer="All three come from my Officer Evaluation Report. Measurement periods and methods were not preserved."
        metrics={[
          { tag: "Relocation", n: "1–\u20602\u00a0wk", label: "medical resupply time after the warehouse moved forward, down from 1–2 months · 85% faster" },
          { tag: "Order status", n: "60%", label: "reduction in spending, while maintaining availability, after shared real-time order status stopped over-ordering and stockouts" },
          { tag: "Protocol", n: "15%", label: "critical supplies reached the stations more efficiently after one shared communication protocol" },
        ]}
        leadMetric
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Supply lines and clinic workflows break the same way.</h2>
          <CaseMore label="How this connects to clinic work">
            <p>A supply run began too far from the aid stations. Portal messages took a paper route and lost their chart context. In both, I moved the step that did not belong.</p>
          </CaseMore>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/ux-woman"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">UX Woman</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
