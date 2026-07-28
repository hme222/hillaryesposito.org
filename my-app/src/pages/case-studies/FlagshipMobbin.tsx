import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import DecisionStory from "../../components/flagship/DecisionStory";
import EvidenceField from "../../components/flagship/EvidenceField";
import ScreenSequence, { ScreenSequenceItem } from "../../components/flagship/ScreenSequence";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { MOBBIN_ES } from "../../data/spanishCaseStudies";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

const CHAPTERS: CaseStudyChapter[] = [
  { id: "mobbin-start", label: "Start", note: "The capture desk" },
  { id: "mobbin-brief", label: "Problem", note: "It has to survive without its author" },
  { id: "mobbin-work", label: "Method", note: "A screenshot is not a flow" },
  { id: "mobbin-apps", label: "Apps", note: "Three trust models" },
  { id: "mobbin-outcomes", label: "Outcomes", note: "200+ screens later" },
];

const APPS: ScreenSequenceItem[] = [
  { name: "Kikoff", category: "Credit building · trust through proof", image: "/assets/mobbin/kikoff.jpg", alt: "Kikoff credit-building interface from the documented flow", summary: "A twelve-screen sign-up earns its length by showing a score, a plan, and proof after each action." },
  { name: "Polymarket", category: "Prediction markets · trust through transparency", image: "/assets/mobbin/polymarket.jpg", alt: "Polymarket prediction-market interface from the documented flow", summary: "Odds, settlement rules, and risk stay visible before someone commits money to an uncertain outcome." },
  { name: "Discover", category: "Banking · trust through familiarity", image: "/assets/mobbin/discover.jpg", alt: "Discover account interface from the documented flow", summary: "The interface leans on known card and account patterns, then makes the fine print easy to find." },
];

const STEPS = [
  { n: "01", title: "Capture the whole task", body: "Walk the app like a real person, including empty states, errors, and the screens that only make sense in sequence.", note: "A flow, not a pile" },
  { n: "02", title: "Cut what will not help", body: "Marketing splashes did not earn the same space as sign-up, payment, account, or recovery flows. Completeness still needs an editor.", note: "Useful beats exhaustive" },
  { n: "03", title: "Name it in Mobbin’s language", body: "A pattern is findable only when the label matches the words another designer will search, not the words I happen to prefer.", note: "Search words are design" },
  { n: "04", title: "Write for someone I will never meet", body: "Each annotation has to explain what the screen does, where it sits, and why the pattern matters without the source app open.", note: "Context must travel" },
];

export default function FlagshipMobbin() {
  usePageTitle("Mobbin — UX Flow Documentation Case Study");
  const { lang } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  if (lang === "es") return <SpanishCaseStudy data={MOBBIN_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--mobbin" lang="en" ref={rootRef}>
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Breadcrumb"><Link to="/">Work</Link> / <span>Mobbin</span></nav>
      <CaseStudyChapters project="Mobbin" chapters={CHAPTERS} />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="mobbin-start">
        <CartoField
          mapSrc="/riso/elevation-04.jpg"
          edition="struct"
          mapZoom={1.12}
          mapPosition="46% 42%"
        />
        <div className="rp-grain" />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">UX flow documentation · pattern curation</span>
            <h1 className="rp-h1">Mobbin.</h1>
            <span className="rp-readtime"><b>5 min</b><span>read · 3 apps, 200+ screens</span></span>
            <p className="rp-sub">
              Anyone can screenshot an app. Mobbin hired me to decide what <b>200+ screens</b> mean
              to a designer who will never meet me—and make every step searchable.
            </p>
            <a className="rp-cta" href="#mobbin-work">Open the capture desk →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--mobbin" aria-label="Three finance app screens documented for Mobbin">
          {APPS.map((app, index) => <div className={`fp-capture fp-capture--${index + 1}`} key={app.name}><img src={app.image} alt={index === 0 ? "Three documented finance app interfaces: Kikoff, Polymarket, and Discover" : ""} /></div>)}
          <div className="fp-artifactLabel"><span>CAPTURE LOG · 04 MONTHS</span><b>3 apps · 200+ screens · one searchable library</b></div>
        </div>
      </header>

      <section className="rp-cinema fp-cinema fp-cinema--mobbin" id="mobbin-brief" aria-labelledby="mobbin-brief-title">
        <div className="rp-cinema__sticky">
          <div className="rp-cinema__wash" aria-hidden="true" />
          <div className="fp-cinemaCore fp-cinemaCore--capture" aria-hidden="true">
            <span>CAPTURE</span><i>→</i><span>MAP</span><i>→</i><span>NAME</span><i>→</i><span>VERIFY</span>
          </div>
          <div className="rp-cinema__artifact rp-cinema__artifact--reminder"><span>First batch</span><b>Messy labels doubled review time.</b></div>
          <div className="rp-cinema__artifact rp-cinema__artifact--safety"><span>Correction</span><b>Learn the library’s vocabulary before capturing.</b></div>
          <div className="rp-cinema__bridge">
            <p className="rp-kicker">The work, before the screenshots</p>
            <h2 id="mobbin-brief-title">A useful reference has to survive without its author.</h2>
            <p>The sequence, label, and note have to make sense to a designer arriving cold. Otherwise it is just a very organized camera roll.</p>
          </div>
        </div>
      </section>

      <section className="rp-section" id="mobbin-work">
        <div className="rp-wrap">
          <p className="rp-kicker">The method · judgment before capture</p>
          <h2 className="rp-title">A screenshot is not a flow.</h2>
          <p className="rp-lede">Over four months, I walked three live finance apps like a real customer, captured each useful state, ordered the steps, and tagged them with Mobbin’s vocabulary.</p>
          <div className="fp-workSplit rp-reveal">
            <article><span>The mechanical part</span><h3>Capture the screen</h3><p>Any tool can do this part.</p></article>
            <article><span>The actual work</span><h3>Decide what travels</h3><p>Which task deserves a full sequence, where the flow begins, what gets cut, and what another designer needs to understand it later.</p></article>
          </div>
          <div className="fp-journalLine"><span>What I got wrong</span><b>My first batch used my vocabulary. Revisions dropped by half after I learned Mobbin’s.</b></div>
        </div>
      </section>

      <DecisionStory
        id="mobbin-decisions"
        kicker="Four calls · one documentation system"
        title="The capture became useful through editing."
        intro="The source app stayed the same. The value came from deciding what to preserve, how to sequence it, and what to call it."
        steps={STEPS}
        visual={<div className="fp-sequence__phone fp-sequence__phone--story"><img src="/assets/mobbin/kikoff.jpg" alt="" /></div>}
      />

      <section className="rp-section" id="mobbin-apps">
        <div className="rp-wrap">
          <p className="rp-kicker">Three apps · three trust models</p>
          <h2 className="rp-title">Same category. Opposite ways to earn confidence.</h2>
          <p className="rp-lede">Putting the apps side by side revealed more than counting screens ever could. A longer flow can feel shorter when every step gives something back.</p>
          <ScreenSequence label="Documented finance app sequence" items={APPS} />

          {/* One entry exactly as delivered. This page sells annotation judgment;
              without a real annotation on it, the claim had nothing under it. */}
          <figure className="fp-annotation rp-reveal">
            <figcaption>
              <span>One entry, as delivered</span>
              <b>Kikoff · credit-score progress, first session</b>
            </figcaption>
            <div className="rp-tags">
              {["Progress indicator", "Trust signal", "Positive reinforcement", "Data visualization", "Onboarding completion"].map((tag) => (
                <b className="rp-tag" key={tag}>{tag}</b>
              ))}
            </div>
            <blockquote>
              “Shows the credit score moving up right after the action that caused it. The timing’s
              deliberate — that jump lands the moment you finish the first credit-building task, so
              cause and effect are obvious. That’s what builds confidence.”
            </blockquote>
          </figure>

          <a
            className="fp-proofLink"
            href="https://mobbin.com/finance"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Mobbin's Finance+ library (opens in new tab)"
          >
            <span>Verify it · Mobbin Finance+</span><b>The library these screens went into →</b>
          </a>
        </div>
      </section>

      <EvidenceField
        id="mobbin-outcomes"
        kicker="Where it landed · contribution, not ownership"
        title="A searchable record of how three finance products work."
        intro="I documented the source apps for Mobbin’s Finance+ reference library. I did not design Kikoff, Polymarket, Discover, or Mobbin."
        disclaimer="Freelance app-capture work · source-product ownership stays with each company"
        metrics={[
          { n: "200+", label: "screens captured, sequenced, annotated, and labeled" },
          { n: "3", label: "live finance apps documented across distinct trust models" },
          { n: "4", label: "months building reusable references for designers" },
        ]}
        route={["Capture the task", "Map the sequence", "Name the pattern", "Make it searchable"]}
      />

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>Need someone who can see the pattern and explain why it matters?</h2>
          <p>Two hundred screens later, I am very good at spotting when “common pattern” actually means “habit nobody questioned.”</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Send me a note →</a>
        </div>
      </section>

      <Link className="rp-next" to="/case-study/grove"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Grove</p><p className="rp-next__tag">AI judgment · plant care · human override</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
