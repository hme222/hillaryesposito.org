import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../app/LanguageContext";
import CaseStudyChapters, { CaseStudyChapter } from "../../components/flagship/CaseStudyChapters";
import ReadingProgress from "../../components/flagship/ReadingProgress";
import ShareCaseStudy from "../../components/flagship/ShareCaseStudy";
import EvidenceField from "../../components/flagship/EvidenceField";
import ConfidenceMap, { ConfidenceRow } from "../../components/flagship/ConfidenceMap";
import BuildGates from "../../components/flagship/BuildGates";
import CartoField from "../../components/riso/CartoField";
import RisoDefs from "../../components/riso/RisoDefs";
import SpanishCaseStudy from "../../components/SpanishCaseStudy";
import Term from "../../components/Term";
import { UXWOMAN_ES } from "../../data/spanishCaseStudies";
import { UXWOMAN_LEDGER } from "../../data/uxWomanCaseStudy";
import useFlagshipReveal from "../../hooks/useFlagshipReveal";
import usePageTitle from "../../hooks/usePageTitle";
import "../../styles/riso-page.css";
import "../../styles/flagship-case-study.css";
import CopyEmail from "../../components/CopyEmail";

/**
 * UX Woman — healthcare research case study, research phase.
 *
 * Story file: design-docs/case-study-stories/ux-woman.md (what UX Woman is,
 * Hillary's role, and the page's research facts, 2026-10-15).
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
  { id: "uxwoman-start", label: "Start" },
  { id: "uxwoman-problem", label: "Problem" },
  { id: "uxwoman-research", label: "Research" },
  { id: "uxwoman-findings", label: "Findings" },
  { id: "uxwoman-pretotypes", label: "Pretotypes" },
  { id: "uxwoman-next", label: "Next step" },
];

// Levels are the ones each finding's own confidence line already states.
const CONFIDENCE_ROWS: ConfidenceRow[] = [
  { finding: "Work crosses roles and organizations by hand", observed: { level: "Moderate", claim: "that it matters in several workflows" }, limit: { level: "Low", claim: "that it is one shared failure" } },
  { finding: "Information has to fit the case", observed: { level: "Moderate", claim: "as a cross-case observation" } },
  { finding: "Coverage barriers may interrupt care", observed: { level: "Moderate", claim: "that people in several roles see the risk" }, limit: { level: "Low", claim: "on how common it is and on patient experience" } },
  { finding: "People keep the judgment and recovery work", observed: { level: "High", claim: "that human work is present" }, limit: { level: "Low", claim: "that it is an unmet need, or that automation answers it" } },
  { finding: "AI experience varies", observed: { level: "High", claim: "that experience differs" } },
];

// From the project's own decision gate (handoff, 2026-10-21). None has been met:
// the case reconstruction study has been planned, not run.
const BUILD_GATES = [
  { text: "A patient or caregiver describes a recent coverage or paperwork event, and the care problem that followed it.", status: "Not yet shown" },
  { text: "The people who handle that event confirm it from their side of the work.", status: "Not yet shown" },
  { text: "Someone already owns the step, and I can name what a new tool would replace.", status: "Not yet shown" },
  { text: "There is an outcome I can measure safely.", status: "Not yet shown" },
  { text: "Privacy is settled: fictional or authorized de-identified cases only.", status: "Not yet shown" },
];

const FINDINGS: { title: string; body: React.ReactNode; confidence: string }[] = [
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
    confidence: "Moderate that people in several roles see the risk. Low on how common it is and on patient experience.",
  },
  {
    title: "People keep the judgment and recovery work",
    body: "Verifying, escalating, explaining, and reassuring were done by people, and the roles differ.",
    confidence: "High that human work is present. Low that it is an unmet need, or that automation answers it.",
  },
  {
    title: "AI experience varies",
    body: <>One person found <Term def="Artificial intelligence: software that drafts, sorts, or predicts from data.">AI</Term>-assisted drafting easier. Others had little or no AI in the workflow.</>,
    confidence: "High that experience differs. AI is a possible tool for one task, not the shared problem.",
  },
];

const PRETOTYPES = [
  { title: "“What does this status mean?” cards", asks: "Can a member tell a recommendation from an approval, and see their own next step?" },
  { title: "Coverage-in-context navigator", asks: "Does guidance at the moment of one coverage task beat a general insurance library?" },
  { title: "Missing-information handoff receipt", asks: "Does naming the missing item and who owes it reduce ambiguity between roles?" },
  { title: "Letter-of-medical-necessity evidence sheet", asks: "Does a source-and-reviewer checklist help staff prepare or check a letter?" },
  { title: "Human navigator\u00a0session", asks: "When information is confusing or sensitive, does a person solve something self-service doesn't?" },
];

export default function FlagshipUxWoman() {
  const { lang } = useLanguage();
  usePageTitle("UX Woman: Healthcare Research Case Study", lang !== "es");
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
            <h1 className="rp-h1">Six healthcare interviews suggest one hypothesis to{"\u00a0"}test.</h1>
            <span className="rp-eyebrow">UX Woman · Healthcare research · Research phase</span>
            <p className="rp-sub">
              UX Woman is a 7-month, mentor-led UX design accelerator. In six healthcare interviews, staff described unclear ownership of next steps, through different mechanisms. My <b>hypothesis</b>: when care waits on an administrative step, the people involved can’t see who acts next. It is untested, and no patient was interviewed.
            </p>
            <dl className="rp-heroEvidence" aria-label="UX Woman case evidence at a glance">
              <div><dt>Role</dt><dd>Sole researcher · UX Woman UX Design Accelerator · 2026</dd></div>
              <div><dt>My contribution</dt><dd>Interview plans · recruitment screener · synthesis · five pretotype designs</dd></div>
            </dl>
          </div>
        </div>
        <div className="rp-hero__media fp-heroArt fp-heroArt--uxwoman" data-evidence="true">
          <dl className="fp-ledger" aria-label="Evidence to date">
            {UXWOMAN_LEDGER.map((row) => (
              <div key={row.en}><dt>{row.en}</dt><dd>{row.n}</dd></div>
            ))}
          </dl>
          <div className="fp-artifactLabel"><span>Research phase · 2026</span><b>Interviews and tests so far</b></div>
        </div>
      </header>

      <section className="rp-section rp-override" id="uxwoman-problem" data-language-anchor="uxwoman-problem" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">Where this starts</p>
          <h2 className="rp-title">Staff described not knowing who acts next.</h2>
          <p className="rp-lede">When care waits on coverage, paperwork, or a missing document, staff in different roles described unclear ownership of the next step.</p>
          <p className="rp-body">The mechanisms differed: a misrouted message, a utilization-review page, an authorization queue members could not see (secondhand, from a former health-plan employee). No patient was interviewed.</p>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-research" data-language-anchor="uxwoman-research" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What I did</p>
          <h2 className="rp-title">Six healthcare interviews, one per role.</h2>
          <p className="rp-lede">Each interview counts once. Interviews with healthcare professionals and stakeholders.</p>
          <p className="rp-body">Six roles described healthcare workflows. Participants are anonymized, no protected health information was collected, and there is no dedicated patient interview stream.</p>
        </div>
      </section>

      <section className="rp-section" id="uxwoman-findings" data-language-anchor="uxwoman-findings" data-evidence="true">
        <div className="rp-wrap">
          <p className="rp-kicker">What the interviews showed</p>
          <h2 className="rp-title">Three findings, each rated for confidence.</h2>
          <p className="rp-lede">A rating says how directly the accounts support a claim, not how many people said it.</p>
          <ConfidenceMap caption="How strongly the interviews support each finding" rows={CONFIDENCE_ROWS} />
          <ol className="fp-findings rp-reveal">
            {FINDINGS.slice(0, 3).map((finding) => (
              <li key={finding.title}>
                <h3>{finding.title}</h3>
                <p>{finding.body}</p>
                <p className="fp-findings__confidence"><span>Confidence</span> {finding.confidence}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <details className="rp-deepDive">
        <summary>
          <span className="rp-deepDive__copy">
            <b className="rp-deepDive__title">Review all five findings and pretotypes</b>
          </span>
          <span className="rp-deepDive__state" aria-hidden="true">
            <span className="rp-deepDive__stateClosed">Open</span>
            <span className="rp-deepDive__stateOpen">Close</span>
          </span>
        </summary>
        <section className="rp-section" data-evidence="true">
          <div className="rp-wrap">
            <p className="rp-kicker">Participant and secondary-research detail</p>
            <div className="fp-workSplit rp-reveal">
              <article>
                <span>Healthcare · 6</span>
                <h3>Six roles, one per interview</h3>
                <p>Patient financial services, revenue operations, orthopedic physician assistant, utilization-review nurse, psychiatrist, and former health-plan member services. One also spoke from personal experience as a patient.</p>
              </article>
              <article>
                <span>Limits · stated up front</span>
                <h3>No patient interview stream</h3>
                <p>What I know about patients is secondhand, apart from that one account. A seventh, adjacent interview with an <Term def="Human resources: the team that handles hiring, pay, and staff policy.">HR</Term> director covered checking artificial intelligence (AI) sources. It is not healthcare validation. No protected health information (PHI) was collected, and participants are anonymized.</p>
              </article>
            </div>
            <p className="fp-ownership fp-ownership--paper rp-reveal">
              <b>Secondary research</b>
              A scan of AI and information workflows in large hospitals, from federal data briefs and professional surveys. It shows system-level patterns, not what any one hospital needs.
            </p>
            <p className="rp-kicker">Two additional findings</p>
            <ol className="fp-findings rp-reveal" start={4}>
              {FINDINGS.slice(3).map((finding) => (
                <li key={finding.title}>
                  <h3>{finding.title}</h3>
                  <p>{finding.body}</p>
                  <p className="fp-findings__confidence"><span>Confidence</span> {finding.confidence}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="rp-section" id="uxwoman-pretotypes" data-language-anchor="uxwoman-pretotypes" data-evidence="true">
          <div className="rp-wrap">
            <p className="rp-kicker">Cheap tests, designed</p>
            <h2 className="rp-title">Five pretotypes designed. None run.</h2>
            <p className="rp-lede">They are five separate tests, not five features of one product.</p>
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
      </details>

      <div data-evidence="true"><EvidenceField
        id="uxwoman-next"
        languageAnchor="uxwoman-next"
        kicker="Where it stands"
        title="A hypothesis, not a product."
        intro="Research phase. Planned next: reconstruct recent cases, asking each person the same neutral questions, before choosing anything to build. Recruitment waits on protocol and governance review."
        disclaimer="Exploratory, qualitative, self-reported · six healthcare interviews and one adjacent HR interview · no dedicated patient interviews · no pretotype run · the large-hospital scan is secondary research"
        metrics={[
          { tag: "Method", n: "6", label: "healthcare interviews, plus one adjacent HR interview that is not healthcare validation" },
          { tag: "Status", n: "0 of 5", label: "run so far. All five are designed; none has produced evidence yet" },
        ]}
        route={["Recruit by behavior", "Rate confidence", "Reconstruct recent cases", "Then build"]}
      /></div>

      <section className="rp-section" aria-label="What would make me build">
        <div className="rp-wrap">
          <BuildGates
            heading="What would make me build"
            intro="Nothing gets built until one pathway clears all five. The first one to study is outpatient medication access when coverage changes. It is a candidate, not a finding."
            gates={BUILD_GATES}
          />
        </div>
      </section>

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>I check the premise before I build.</h2>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">Email me →</a>
          <CopyEmail />
          <ShareCaseStudy title="UX Woman: a case study by Hillary Esposito" />
        </div>
      </section>

      <Link className="rp-next" to="/case-study/mobbin"><div className="rp-next__inner"><div><p className="rp-next__eyebrow">Next case study</p><p className="rp-next__title">Mobbin</p><p className="rp-next__tag">Supporting documentation · 200+ screens per app</p></div><span className="rp-next__arrow" aria-hidden="true">→</span></div></Link>
    </main>
  );
}
