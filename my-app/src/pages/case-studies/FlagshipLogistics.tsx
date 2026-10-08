import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import EvidenceField from "../../components/flagship/EvidenceField";
import LogisticsMechanism from "../../components/LogisticsMechanism";
import RisoDefs from "../../components/riso/RisoDefs";
import CartoField from "../../components/riso/CartoField";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
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
    change: "Planned and tracked the $2M move forward. Owner-reported resupply time changed from 1–2 months to 1–2 weeks, summarized as 85% shorter.",
  },
  {
    n: "02",
    title: "One way of asking",
    finding: "Seven stations used different request and reporting formats.",
    change: "Built one shared request protocol; the service record reports a 15% efficiency gain in critical-resource deployment.",
  },
  {
    n: "03",
    title: "Order before it runs out",
    finding: "No one could see order status, so sites over-ordered or ran out.",
    change: "Built shared real-time order status; the service record reports 60% lower spending while maintaining availability.",
  },
];

export default function FlagshipLogistics() {
  const { lang } = useLanguage();
  usePageTitle("Medical Logistics — Army Operations Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  // Deep links (e.g. the homepage 85% stat) land on their section.
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
            <h1 className="rp-h1">85% shorter medical resupply time.</h1>
            <span className="rp-readtime"><b>4 min</b><span>read · deployed 2024</span></span>
            <p className="rp-sub">
              I planned and tracked a $2M warehouse relocation serving seven aid stations across three countries.
              The service record reports resupply changing from <b>1–2 months to 1–2 weeks</b>, summarized as 85% shorter.
            </p>
            <dl className="rp-heroEvidence" aria-label="Medical logistics case evidence at a glance">
              <div><dt>Role</dt><dd>Medical logistics officer · relocation and service lead</dd></div>
              <div><dt>System</dt><dd>Seven aid stations · three countries</dd></div>
              <div><dt>My contribution</dt><dd>Plan the move · build shared tracking · train the handoffs</dd></div>
              <div><dt>Outcome</dt><dd>85% shorter after relocation · owner-reported service record</dd></div>
            </dl>
            <a className="rp-cta" href="#log-moves">See the three moves →</a>
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
          <h2 className="rp-title">The constraints were not negotiable.</h2>
          <p className="rp-lede">The future state had to preserve every fixed constraint.</p>
          <dl className="fp-constraintAnnotations rp-reveal" data-evidence="true">
            <div><dt>Cold chain · 48 hours</dt><dd>Late meant unusable.</dd></div>
            <div><dt>Three countries</dt><dd>Different systems and vocabulary.</dd></div>
            <div><dt>Active zone · $2M move</dt><dd>No rehearsal or acceptable failure.</dd></div>
          </dl>
          <p className="fp-ownership rp-reveal">
            <b>Service-design scope</b>
            People, inventory, requests, handoffs, constraints, ownership, and measurable recovery time.
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
          { tag: "Relocation", n: "85%", label: "reported reduction in medical resupply time after the warehouse moved forward" },
          { tag: "Order status", n: "60%", label: "reported reduction in spending after shared real-time order status stopped over-ordering and stockouts" },
          { tag: "Protocol", n: "15%", label: "reported efficiency gain in critical-resource deployment from one shared communication protocol" },
        ]}
        route={["Find the step that should not exist", "Move it", "Standardize the ask", "Make the status visible"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Need someone who has done this where it counted?</h2>
          <p>I have run a supply chain where being wrong had a cost, and redesigned clinical systems where the same was true. The instinct transfers: find the workaround, make it visible, and change the sequence.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Send me a note →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/msk"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Memorial Sloan Kettering</p><p className="rp-next__tag">Clinical systems · six years, three roles</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
