import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import EvidenceField from "../../components/flagship/EvidenceField";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import { UXWOMAN_ES } from "../../data/spanishCaseStudies";
import { UXWOMAN_LEDGER } from "../../data/uxWomanCaseStudy";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso.css";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";

/**
 * UX Woman — healthcare research case study, research phase.
 *
 * Source of truth: the UX Woman research folder (overall interview patterns
 * 2026-10-13, five pretotypes 2026-10-11, large-hospital AI gap scan
 * 2026-09-24). Interviewees appear by role only; names stay out of the repo.
 *
 * Deliberately absent: any outcome, time saving, or patient claim. There is no
 * patient interview stream, no pretotype has been run, and the HR interview is
 * adjacent evidence, not healthcare validation. The page says so wherever a
 * finding appears. Spanish lives in spanishCaseStudies.ts (UXWOMAN_ES) and
 * must carry the same facts.
 */

const CHAPTERS: CaseStudyChapter[] = [
  { id: "uxwoman-start", label: "Start", note: "Research phase, active" },
  { id: "uxwoman-problem", label: "Problem", note: "Who owns the next step?" },
  { id: "uxwoman-research", label: "Research", note: "Six healthcare interviews" },
  { id: "uxwoman-findings", label: "Findings", note: "Five signals, rated" },
  { id: "uxwoman-pretotypes", label: "Pretotypes", note: "Five designed, none run" },
  { id: "uxwoman-next", label: "Next step", note: "Real cases before building" },
];

const FINDINGS = [
  {
    title: "Work crosses roles and organizations by hand",
    body: "Messages reached the wrong role. Clinical teams were paged. Clinic, pharmacy, and insurer called each other again.",
    confidence: "Moderate that it matters in several workflows. Low that it is one shared failure.",
  },
  {
    title: "Information has to fit the case",
    body: "Staff reconciled records, payer criteria, and templates for one patient at a time.",
    confidence: "Moderate as a cross-case observation.",
  },
  {
    title: "Coverage barriers may interrupt care",
    body: "Surgery readiness, discharge, and medication access came up. Staff and a former health-plan employee reported these; no patient outcome was observed.",
    confidence: "Moderate that stakeholders see the risk. Low on how common it is and on patient experience.",
  },
  {
    title: "People keep the judgment and recovery work",
    body: "Verifying, escalating, explaining, and reassuring were done by people, and the roles differ.",
    confidence: "High that human work is present. Low that it is an unmet need, or that automation answers it.",
  },
  {
    title: "AI experience varies",
    body: "One person found AI-assisted drafting easier. Others had little or no AI in the workflow.",
    confidence: "High that experience differs. AI is a possible tool for one task, not the shared problem.",
  },
];

const PRETOTYPES = [
  { title: "“What does this status mean?” cards", asks: "Can a member tell a recommendation from an approval, and see their own next step?" },
  { title: "Coverage-in-context navigator", asks: "Does guidance at the moment of one coverage task help more than a general insurance library?" },
  { title: "Missing-information handoff receipt", asks: "Does naming the missing item and who owes it reduce ambiguity between roles?" },
  { title: "Letter-of-medical-necessity evidence sheet", asks: "Does a source-and-reviewer checklist help staff prepare or check a letter?" },
  { title: "Human navigator session", asks: "When information is confusing or sensitive, does a person solve something self-service doesn't?" },
];

export default function FlagshipUxWoman() {
  const { lang } = useLanguage();
  usePageTitle("UX Woman — Healthcare Research Case Study", lang !== "es");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;
    const timer = window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" }), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (lang === "es") return <SpanishCaseStudy data={UXWOMAN_ES} />;

  return (
    <main className="riso-page flagship-page flagship-page--uxwoman" lang="en" ref={rootRef}>
      <RisoDefs />

      <div className="rp-breadcrumbRow">
        <nav className="rp-breadcrumb" aria-label="Breadcrumb"><Link to="/" className="rp-breadcrumb__name" title="Hillary Esposito">Hillary Esposito</Link> / <Link to="/?scrollTo=projects">Work</Link> / <span>UX Woman</span></nav>
        <button
          type="button"
          className="rp-heroUtility rp-breadcrumbTour"
          onClick={(e) =>
            window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: { returnFocus: e.currentTarget } }))
          }
        >
          Open the 90-second tour
        </button>
      </div>
      <CaseStudyChapters project="UX Woman" chapters={CHAPTERS} progress />
      <ReadingProgress chapterIds={CHAPTERS.map((c) => c.id)} />

      <header className="rp-hero fp-hero" id="uxwoman-start" data-language-anchor="uxwoman-start">
        <CartoField
          mapSrc="/riso/elevation-04.jpg"
          edition="olive"
          mapZoom={1.1}
          mapPosition="50% 46%"
        />
        <div className="rp-grain" />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">UX Woman · Healthcare research · Active, research phase</span>
            <h1 className="rp-h1">Who owns the next{" "}step? Six healthcare{" "}interviews, one{" "}hypothesis.</h1>
            <span className="rp-readtime"><b>4 min</b><span>read · nothing built or tested yet</span></span>
            <p className="rp-sub">
              In six healthcare interviews, staff described care waiting while no one could see who owned the next
              step. I'm treating that as a <b>hypothesis</b>. The evidence does not yet show one shared problem, so the
              next step is reconstructing real cases before building anything.
            </p>
            <dl className="rp-heroEvidence" aria-label="UX Woman case evidence at a glance">
              <div><dt>Evidence</dt><dd>Six healthcare interviews · one adjacent HR interview · no dedicated patient interviews</dd></div>
              <div><dt>My contribution</dt><dd>Interview plans · recruiting by behavior · synthesis · five pretotype designs</dd></div>
              <div><dt>Status</dt><dd>Active · research phase · five pretotypes designed, none run</dd></div>
              <div><dt>Next</dt><dd>Reconstruct real cases, then decide what to build</dd></div>
            </dl>
            <a className="rp-cta" href="#uxwoman-findings">See the five findings →</a>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--uxwoman" data-evidence="true">
          <dl className="fp-ledger" aria-label="Evidence to date">
            {UXWOMAN_LEDGER.map((row) => (
              <div key={row.en}><dt>{row.en}</dt><dd>{row.n}</dd></div>
            ))}
          </dl>
          <div className="fp-artifactLabel"><span>RESEARCH PHASE · 2026</span><b>Evidence to date: interviews and pretotype designs only</b></div>
        </div>
      </header>

      <section className="rp-section rp-override" id="uxwoman-problem" data-language-anchor="uxwoman-problem" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">Where this starts</p>
          <h2 className="rp-title">Staff and patients cannot see who acts next.</h2>
          <p className="rp-lede">When care waits on coverage, paperwork, or a missing document, people in different roles described not knowing who owned the next step.</p>
          <p className="rp-body">That signal recurs, but the mechanisms differ: a misrouted message, a utilization-review page, an authorization queue no one can see. It is a hypothesis to test, not a validated need.</p>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-research" data-language-anchor="uxwoman-research" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What I did</p>
          <h2 className="rp-title">Six healthcare interviews, recruited by what people do.</h2>
          <p className="rp-lede">I recruited by behavior, not job title. Each interview counts once. Study sessions run on UserTesting.</p>
          <div className="fp-workSplit rp-reveal">
            <article>
              <span>Healthcare · 6</span>
              <h3>Six roles, one per interview</h3>
              <p>Patient financial services, revenue operations, orthopedic physician assistant, utilization-review nurse, psychiatrist, and former health-plan member services. One also spoke from personal experience as a patient.</p>
            </article>
            <article>
              <span>Limits · stated up front</span>
              <h3>No patient interview stream</h3>
              <p>What I know about patients is secondhand, apart from that one account. A seventh, adjacent interview with an HR director covered checking AI sources. It is not healthcare validation. No PHI was collected, and participants are anonymized.</p>
            </article>
          </div>
          <p className="fp-ownership fp-ownership--paper rp-reveal">
            <b>Secondary research</b>
            A scan of AI and information workflows in large hospitals, from federal data briefs and professional surveys. It shows system-level patterns, not what any one hospital needs.
          </p>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-findings" data-language-anchor="uxwoman-findings" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What the interviews showed</p>
          <h2 className="rp-title">Five signals, each rated for confidence.</h2>
          <p className="rp-lede">A rating says how directly the accounts support a claim, not how many people said it. All of it is exploratory and self-reported.</p>
          <ol className="fp-findings rp-reveal">
            {FINDINGS.map((finding) => (
              <li key={finding.title}>
                <h3>{finding.title}</h3>
                <p>{finding.body}</p>
                <p className="fp-findings__confidence"><span>Confidence</span> {finding.confidence}</p>
              </li>
            ))}
          </ol>
          <div className="fp-journalLine"><span>What I can't claim</span><b>One shared problem, how common any issue is, or that handoffs cause the delays.</b></div>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-pretotypes" data-language-anchor="uxwoman-pretotypes" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">Cheap tests, designed</p>
          <h2 className="rp-title">Five pretotypes designed. None run.</h2>
          <p className="rp-lede">Each tries to disprove its own premise. They are five separate tests, not five features of one product.</p>
          <ol className="fp-pretotypes rp-reveal">
            {PRETOTYPES.map((item, index) => (
              <li key={item.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.asks}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="fp-pretotypeNote">Each has a stop condition. If it adds paperwork without changing a next action, it stops.</p>
        </div>
      </section>

      <div data-evidence="true"><EvidenceField
        id="uxwoman-next"
        languageAnchor="uxwoman-next"
        kicker="Where it stands"
        title="A hypothesis, not a product."
        intro="Active, research phase. Next I reconstruct recent real cases, asking each person the same neutral questions, before choosing anything to build."
        disclaimer="Exploratory, qualitative, self-reported · six healthcare interviews and one adjacent HR interview · no dedicated patient interviews · no pretotype run · the large-hospital scan is secondary research"
        metrics={[
          { tag: "Interviews", n: "6", label: "healthcare interviews, plus one adjacent HR interview that is not healthcare validation" },
          { tag: "Pretotypes", n: "0 of 5", label: "run so far. All five are designed; none has produced evidence yet" },
        ]}
        route={["Recruit by behavior", "Rate confidence", "Reconstruct real cases", "Then build"]}
      /></div>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I check the premise before I build.</h2>
          <p>UX Woman shows how I work: say what the evidence supports, rate it, and name the next test.</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <ShareCaseStudy title="UX Woman — a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/knowunity"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Knowunity</p><p className="rp-next__tag">Design sprint · mocked voice recall, not shipped</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
