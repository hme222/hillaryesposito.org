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
    finding: "The medical warehouse sat far enough back that every resupply run started with a long trip before it started helping anyone.",
    change: "I spearheaded moving the warehouse — $2M of supplies and equipment — inside an active combat zone. Resupply time dropped 85%.",
  },
  {
    n: "02",
    title: "One way of asking",
    finding: "Seven aid stations across three countries each requested and reported in their own format, including alongside other nations' militaries.",
    change: "I wrote and implemented one communication protocol for all of them. Critical resource deployment got 15% more efficient.",
  },
  {
    n: "03",
    title: "Order before it runs out",
    finding: "Ordering reacted to shortages instead of anticipating them, which is expensive and, on the wrong day, dangerous.",
    change: "Weekly and monthly consumption analysis turned ordering into forecasting. Spending fell 60% with no loss of availability.",
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
            <h1 className="rp-h1">Medical logistics, Iraq.</h1>
            <span className="rp-readtime"><b>4 min</b><span>read · deployed 2024</span></span>
            <p className="rp-sub">
              Captain and Medical Logistics Officer, NJ Army National Guard. Deployed with the 44th
              IBCT, I directed the medical supply chain for <b>5,000+ soldiers</b> and $2M in
              supplies across seven aid stations in three countries — and cut resupply time by{" "}
              <b>85%</b>.
            </p>
            <a className="rp-cta" href="#log-moves">See the three moves →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--logistics">
          <div className="fp-artifactLabel"><span>DEPLOYMENT · 2024</span><b>44th IBCT · seven aid stations · three countries</b></div>
          <figure className="fp-logisticsPhoto">
            <img src="/assets/about/army.jpg" alt="Hillary Esposito in uniform during her deployment as a medical logistics officer" />
          </figure>
        </div>
      </header>

      <section className="rp-cinema fp-cinema" id="log-brief" aria-labelledby="log-brief-title">
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
            <p>Medical logistics means making sure medicine and equipment reach the people treating casualties, before they need it. Every inefficiency in that chain is measured in time, and time is the thing a wounded soldier does not have.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="log-moves">
        <div className="rp-wrap">
          <p className="rp-kicker">What I changed</p>
          <h2 className="rp-title">Three moves, three numbers.</h2>
          <p className="rp-lede">No new equipment and no more people. Each one is a change to where something sat, how it was asked for, or when it was ordered.</p>
          <div className="fp-redesigns rp-reveal">
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

      <section className="rp-section rp-override" id="log-constraints">
        <div className="rp-wrap">
          <p className="rp-kicker">What made it hard</p>
          <h2 className="rp-title">The constraints were not negotiable.</h2>
          <p className="rp-lede">Every one of these is the reason a tidier process would not have survived contact.</p>
          <div className="fp-systemCards rp-reveal">
            <article><span>01 · Cold chain</span><h3>48 hours, no exceptions</h3><p>Temperature-controlled supplies spoil. A late delivery is not a late delivery — it is a destroyed one.</p></article>
            <article><span>02 · Multinational</span><h3>Other countries’ militaries</h3><p>Coordination ran across three countries and partner forces, each with their own systems and vocabulary.</p></article>
            <article><span>03 · Active zone</span><h3>The warehouse move itself</h3><p>Relocating $2M of medical supplies is a plan with no rehearsal and no acceptable failure mode.</p></article>
          </div>
          <p className="fp-ownership rp-reveal">
            <b>Why this sits in a design portfolio</b>
            Every move here is service design: follow the whole path a thing takes, find the step that
            should not exist, and change the sequence rather than working harder inside it. The
            difference is only that a slow queue in a hospital costs a morning, and a slow queue here
            costs something else.
          </p>
        </div>
      </section>

      <EvidenceField
        id="log-outcomes"
        kicker="What it added up to"
        title="Measured in time, money, and things that did not happen."
        intro="Directed the medical supply chain for a deployed infantry brigade across seven aid stations in three countries, moved the supply point forward inside an active combat zone, standardized how every station asked for what it needed, and replaced reactive ordering with forecasting."
        disclaimer="Figures as reported in Hillary's service record · no unit positions, routes, or locations are described here"
        metrics={[
          { tag: "Led", n: "85%", label: "reduction in medical resupply time after the warehouse moved forward" },
          { tag: "Led", n: "60%", label: "reduction in spending through weekly and monthly demand forecasting" },
          { tag: "Led", n: "15%", label: "efficiency gain in critical resource deployment from one shared communication protocol" },
        ]}
        route={["Find the step that should not exist", "Move it", "Standardize the ask", "Forecast the rest"]}
      />

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
