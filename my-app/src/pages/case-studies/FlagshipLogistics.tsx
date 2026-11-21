import CopyEmail from "../../components/CopyEmail";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import EvidenceField from "../../components/flagship/EvidenceField";
import ResultLine from "../../components/flagship/ResultLine";
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
  { id: "log-moves", label: "What I did" },
  { id: "log-constraints", label: "Limits" },
  { id: "log-outcomes", label: "Outcomes" },
];

const MOVES: { n: string; title: string; finding: string; change: React.ReactNode }[] = [
  {
    n: "01",
    title: "Moved the warehouse closer",
    finding: "Every supply delivery started too far from the aid stations.",
    change: <>I planned and tracked the move of $2M in supplies. We moved the most essential supplies first, and I split the team so every aid station kept getting supplies during the move.</>,
  },
  {
    n: "02",
    title: "Gave every station one way to order",
    finding: "Each of the seven stations ordered and reported in its own format.",
    change: "I built one shared way to order and taught each station how to use it and what each order status meant.",
  },
  {
    n: "03",
    title: "Let every station track its orders",
    finding: "No one could see where an order was, so stations ordered too much or ran out.",
    change: "I built an online tracker that showed every station its orders as their status changed. Its job was to stop a station from “going black,” or running out of supplies.",
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
            <h1 className="rp-h1">Service design for U.S.{"\u00a0"}Army <span className="rp-keep">medical supply</span>, cutting resupply from months to{"\u00a0"}weeks</h1>
            <p className="rp-sub">
              On an Army National Guard deployment to Iraq and two neighboring countries, I was in charge of medical supplies for seven aid stations, where wounded soldiers are treated first. When I arrived, restocking them took 1–2 months. I made the case to move our warehouse closer, then planned and tracked the move.
            </p>
            {/* Interview-sourced human line (Better Stories pass, 2026-11-10); source: design-docs/case-study-stories. */}
            <p className="rp-humanLine">I was in charge of getting rabies vaccines to three countries. Once, I delivered them myself.</p>
            <dl className="rp-heroEvidence" aria-label="My role at a glance">
              <div><dt>Role</dt><dd>Medical logistics officer · led the warehouse move and station restocking</dd></div>
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

      {/* The result sentence lives only here (cut from the hero, 2026-11-19); 1–2 is kept together the way the stat tile does it. */}
      <ResultLine
        eyebrow="What changed"
        text={"Restocking then took 1–⁠2 weeks, according to my Officer Evaluation Report."}
        source="My Officer Evaluation Report is the Army’s written review of my work."
      />

      <section className="rp-cinema fp-cinema" id="log-brief" aria-labelledby="log-brief-title" data-evidence="true">
        <div className="rp-cinema__sticky">
          <div className="rp-cinema__wash" aria-hidden="true" />
          <div className="fp-cinemaCore fp-cinemaCore--workflow">
            <div><span>MY JOB</span><b>Get medicine and equipment to each station before it is needed</b><small>Not after someone asks.</small></div>
            <i aria-hidden="true">→</i>
            <div><span>THE RISK</span><b>An aid station runs out</b></div>
          </div>
          <div className="rp-cinema__artifact rp-cinema__artifact--reminder"><span>Size</span><b>5,000+ New Jersey soldiers, $2M in supplies, seven aid stations.</b></div>
          <div className="rp-cinema__artifact rp-cinema__artifact--safety"><span>Deadline</span><b>Vaccines had to stay cold and arrive within 48 hours.</b></div>
          <div className="rp-cinema__bridge">
            <h2 id="log-brief-title">A late delivery put wounded soldiers at{"\u00a0"}risk.</h2>
            <p>No station could wait 1–2 months for supplies.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="log-moves" data-evidence="true">
        <div className="rp-wrap">
          <h2 className="rp-title">I moved the warehouse. Then I fixed how stations ordered.</h2>
          <p className="rp-lede">I did the physical work of the move with my team. After that, the stations asked to track their own orders.</p>
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
            <h2 className="rp-title">Three limits I had to work within.</h2>
            <dl className="fp-constraintAnnotations rp-reveal" data-evidence="true">
              <div><dt>Cold vaccines · 48 hours</dt><dd>If they arrived late, they couldn’t be used.</dd></div>
              <div><dt>Three countries</dt><dd>Each had its own systems and its own words for things.</dd></div>
              <div><dt>Combat zone · $2M in supplies</dt><dd>No practice run, and no room for mistakes.</dd></div>
            </dl>
          </div>
        </section>
      </details>

      <div className="fp-logisticsEvidence" data-evidence="true"><EvidenceField
        id="log-outcomes"
        title="Supplies arrived faster and cost less."
        disclaimer="All three numbers come from my Officer Evaluation Report. Records of how and over what time they were measured were not kept."
        metrics={[
          { tag: "Warehouse move", n: "1–\u20602\u00a0wk", label: "to restock medical supplies after the warehouse moved closer, down from 1–2 months · about 85% faster, my estimate" },
          { tag: "Order tracker", n: "60%", label: "less spending, with supplies still on hand, once stations could see their orders and stopped ordering too much or running out" },
          { tag: "Shared process", n: "15%", label: "more efficient delivery of critical supplies after we set up one shared way to communicate. My estimate." },
        ]}
        leadMetric
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Army supply lines and clinic paperwork break the same way.</h2>
          <CaseMore label="How this connects to clinic work">
            <p>In the Army, supply deliveries started too far from the aid stations. At the hospital, patient messages were printed and scanned before they reached the medical chart. In both jobs, I moved the step that was in the wrong place.</p>
          </CaseMore>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <CopyEmail compact />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/mobbin"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Mobbin</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
