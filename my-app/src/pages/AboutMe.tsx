import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFlagshipReveal from "../hooks/useFlagshipReveal";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage } from "../app/LanguageContext";
import { Newspaper } from "lucide-react";
import CartoField from "../components/riso/CartoField";
import CaseStudyChapters, { CaseStudyChapter } from "../components/flagship/CaseStudyChapters";
import { CLIENT_FEEDBACK, CLIENT_FEEDBACK_ES } from "../data/clientFeedback";
import "../styles/riso.css";
import "../styles/riso-page.css";

// ── Story chapters ───────────────────────────────────────────────────────
type AboutChapter = {
  id: string;
  label: string;
  heading: string;
  image?: string;
  paragraphs: string[];
  facts?: Array<{ value: string; label: string }>;
  callout?: string;
  caseLink?: { path: string; title: string; source: string };
  articleLink?: { url: string; title: string; source: string };
};

const CHAPTERS: AboutChapter[] = [
  {
    id: "msk",
    label: "MSK",
    heading: "Six years at MSK in three roles.",
    image: "/assets/about/msk.jpg",
    // First uses on this page, so each short form is spelled out once
    // (2026-10-14 review, item 12).
    paragraphs: [
      "I started the electronic medical record (EMR) filing redesign; it was one part of an organization-wide effort that cut EMR costs 20%. Information technology (IT) and user experience (UX) teams built it after I changed roles.",
      "I also rebuilt CPR (cardiopulmonary resuscitation) certification and administrative onboarding across Epic (the record software), HIPAA (the patient-privacy law), and compliance.",
    ],
    callout: "Systems fail where a real person has to use them.",
    articleLink: {
      url: "https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk",
      title: "Hillary Esposito’s Career Path: From the Military to MSK",
      source: "MSK News",
    },
  },
  {
    id: "army",
    label: "Army",
    heading: "Captain and Medical Logistics Officer, NJ Army National Guard.",
    image: "/assets/about/army.jpg",
    // Numbers live in the facts ledger below, once — the prose used to
    // restate every figure (5,000+, seven, 1–2 weeks, 60%) a second time in the
    // same breath. Cut here, not duplicated there.
    paragraphs: [
      "In Iraq I ran medical supply for aid stations in three countries under a 48-hour cold-chain limit. In 2020 I reported the New Jersey National Guard's COVID-19 medical operations to the Pentagon.",
    ],
    facts: [
      { value: "5,000+", label: "soldiers served" },
      { value: "$2M", label: "in medical supply" },
      { value: "7", label: "aid stations" },
      { value: "1–2 wk", label: "medical resupply, down from 1–2 months" },
      { value: "60%", label: "lower spending" },
    ],
    caseLink: { path: "/case-study/logistics", title: "Medical logistics, Iraq", source: "Review the case study" },
  },
];

const CHAPTERS_ES: AboutChapter[] = [
  {
    id: "msk",
    label: "MSK",
    heading: "Seis años en MSK en tres puestos.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "Inicié el rediseño del archivo en el expediente médico electrónico (EMR); fue una parte de un esfuerzo de toda la organización que redujo un 20% los costos del EMR. Los equipos de tecnología de la información (TI) y de experiencia de usuario (UX) lo construyeron después de que cambié de puesto.",
      "También reconstruí la certificación de RCP (reanimación cardiopulmonar) y la incorporación administrativa en Epic (el software del expediente), HIPAA (la ley de privacidad del paciente) y cumplimiento.",
    ],
    callout: "Los sistemas fallan donde una persona real tiene que usarlos.",
    articleLink: {
      url: "https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk",
      title: "Hillary Esposito’s Career Path: From the Military to MSK",
      source: "MSK News",
    },
  },
  {
    id: "army",
    label: "Ejército",
    heading: "Capitana y Oficial de Logística Médica, NJ Army National Guard.",
    image: "/assets/about/army.jpg",
    paragraphs: [
      "En Irak dirigí el suministro médico para estaciones de ayuda en tres países bajo un límite de cadena de frío de 48 horas. En 2020 reporté al Pentágono las operaciones médicas de la Guardia Nacional de Nueva Jersey durante la COVID-19.",
    ],
    facts: [
      { value: "5,000+", label: "soldados atendidos" },
      { value: "$2M", label: "en suministro médico" },
      { value: "7", label: "estaciones de ayuda" },
      { value: "1–2 sem.", label: "de reabastecimiento médico, antes 1–2 meses" },
      { value: "60%", label: "menos gasto" },
    ],
    caseLink: { path: "/case-study/logistics", title: "Logística médica, Irak", source: "Ver el estudio de caso" },
  },
];

// One proof link per "My pattern" item, in list order. Spanish case studies
// render through SpanishCaseStudy, whose anchors carry an `es-` prefix; the
// Spanish MSK study has its own sustainment section since 2026-10-14.
const PATTERN_PROOF = [
  { en: "See the workaround →", es: "Ver el desvío →", path: "/case-study/msk#msk-brief", pathEs: "/case-study/msk#es-msk-brief" },
  { en: "See the casualty risk →", es: "Ver el riesgo de bajas →", path: "/case-study/logistics#log-brief", pathEs: "/case-study/logistics#es-log-brief" },
  { en: "See the one map →", es: "Ver el mapa →", path: "/case-study/msk#msk-workflow", pathEs: "/case-study/msk#es-msk-workflow" },
  { en: "See what lasted →", es: "Ver lo que perduró →", path: "/case-study/msk#msk-sustainment", pathEs: "/case-study/msk#es-msk-sustainment" },
];

export default function About() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const isSpanish = lang === "es";
  usePageTitle(isSpanish ? "Sobre mí" : "About");
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);
  const chapters = isSpanish ? CHAPTERS_ES : CHAPTERS;
  const feedback = isSpanish ? CLIENT_FEEDBACK_ES : CLIENT_FEEDBACK;
  const pageChapters: CaseStudyChapter[] = [
    { id: "about-start", label: isSpanish ? "Inicio" : "Start" },
    { id: "about-pattern", label: isSpanish ? "Enfoque" : "Approach" },
    { id: "about-story", label: isSpanish ? "Historia" : "Story" },
    { id: "about-proof", label: isSpanish ? "Prueba" : "Proof" },
    { id: "about-life", label: isSpanish ? "Fuera del trabajo" : "Outside work" },
    { id: "about-contact", label: isSpanish ? "Contacto" : "Contact" },
  ];

  return (
    <main className="about-page riso-page" lang={isSpanish ? "es" : "en"} ref={rootRef}>
      <div className="rp-breadcrumbRow">
        <nav className="rp-breadcrumb" aria-label={isSpanish ? "Migas de pan" : "Breadcrumb"}>
          <Link to="/" className="rp-breadcrumb__name" title="Hillary Esposito">Hillary Esposito</Link> / <Link to="/?scrollTo=projects">{isSpanish ? "Trabajo" : "Work"}</Link> / <span>{isSpanish ? "Sobre mí" : "About"}</span>
        </nav>
        <button
          type="button"
          className="rp-heroUtility rp-breadcrumbTour"
          onClick={(e) =>
            window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: { returnFocus: e.currentTarget } }))
          }
        >
          {isSpanish ? "Abrir el recorrido de 90 segundos (en inglés)" : "Open the 90-second tour"}
        </button>
      </div>

      <CaseStudyChapters
        project={isSpanish ? "Sobre mí" : "About"}
        chapters={pageChapters}
        ariaLabel={isSpanish ? "Capítulos de la página Sobre mí" : "About page chapters"}
        jumpLabel={isSpanish ? "Saltar a" : "Jump to"}
      />

      {/* ═ HERO — profile masthead (portrait-led, warm; distinct from Home) ═ */}
      <header className="rp-hero about-hero-profile" id="about-start" data-language-anchor="about-start">
        <CartoField
          mapSrc="/riso/elevation-01.jpg"
          edition="eucalyptus"
          mapZoom={1.15}
          mapPosition="55% 40%"
          mapOpacity={0.42}
        />
        <div className="rp-hero__media">
          <figure className="about-hero__portrait">
            <div className="rp-headshot">
              <img src="/assets/about/headshot.jpg" alt="Hillary Esposito" />
            </div>
            <figcaption className="about-hero__caption">
              {isSpanish ? "Hillary Esposito · Diseñadora de productos de salud · Nueva York" : "Hillary Esposito · Healthcare Product Designer · New York"}
            </figcaption>
          </figure>
        </div>
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">{isSpanish ? "Sobre mí" : "About"}</span>
            <h1 className="rp-h1">
              {isSpanish ? "Diseño productos de salud donde cada transferencia\u00a0importa." : "I design healthcare products where every handoff\u00a0matters."}
            </h1>
            <p className="rp-sub">
              {isSpanish ? "Seis años en operaciones de atención oncológica y más de 13 años de servicio en el Ejército, ahora en diseño de productos de salud: flujos clínicos y herramientas internas para el momento en que un paso equivocado tiene un costo." : "Six years in cancer-care operations and 13+ years of Army service, now in healthcare product design: clinical workflows and internal tools for the moment a wrong step has a cost."}
            </p>
          </div>
        </div>
      </header>

      <section id="about-pattern" data-language-anchor="about-pattern" className="rp-section" aria-labelledby="about-pattern-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{isSpanish ? "Mi patrón" : "My pattern"}</p>
          <h2 className="rp-title" id="about-pattern-title">
            {isSpanish ? "Busco primero el atajo." : "I look for the workaround first."}
          </h2>
          {/* Rewritten from a four-step observe/map/design/measure list. That was
              generic process language, and it restated MSK's Observe/Align/Redesign
              without MSK's evidence under it. These are the judgment calls rather
              than the stages — things that are true of this practice specifically. */}
          <ol className="rp-list rp-patternList rp-reveal">
            <li>
              {isSpanish ? "La nota adhesiva, la hoja de cálculo personal, el paso que todos se saltan. Ahí vive el proceso real, y nunca está en el documento del proceso." : "The sticky note, the personal spreadsheet, the step everyone skips. That is where the real process lives, and it is never in the process document."}
              <Link to={isSpanish ? PATTERN_PROOF[0].pathEs : PATTERN_PROOF[0].path} className="rp-chapter__proof rp-chapter__proof--inline">
                <b>{isSpanish ? PATTERN_PROOF[0].es : PATTERN_PROOF[0].en}</b>
              </Link>
            </li>
            <li>
              {isSpanish ? "Averiguo quién paga cuando falla. Un clínico entre pacientes, un soldado esperando reabastecimiento, alguien cuya planta murió. El costo decide cuánta certeza le debe el diseño." : "I find out who pays when it breaks. A clinician between patients, a soldier waiting on resupply, someone whose plant died. The cost decides how much certainty the design owes them."}
              <Link to={isSpanish ? PATTERN_PROOF[1].pathEs : PATTERN_PROOF[1].path} className="rp-chapter__proof rp-chapter__proof--inline">
                <b>{isSpanish ? PATTERN_PROOF[1].es : PATTERN_PROOF[1].en}</b>
              </Link>
            </li>
            <li>
              {isSpanish ? "Hago que la falla sea compartida antes de mejorarla. Cuatro áreas con cuatro versiones del problema rechazarán la misma solución de cuatro maneras." : "I make the failure shared before I make it better. Four departments carrying four models of the problem will reject the same solution four different ways."}
              <Link to={isSpanish ? PATTERN_PROOF[2].pathEs : PATTERN_PROOF[2].path} className="rp-chapter__proof rp-chapter__proof--inline">
                <b>{isSpanish ? PATTERN_PROOF[2].es : PATTERN_PROOF[2].en}</b>
              </Link>
            </li>
            <li>
              {isSpanish ? "Compruebo si sobrevive sin mí. Si necesita que yo lo explique para funcionar, no está terminado." : "I check whether it survives without me. If it needs me there to explain it, it is not finished."}
              <Link to={isSpanish ? PATTERN_PROOF[3].pathEs : PATTERN_PROOF[3].path} className="rp-chapter__proof rp-chapter__proof--inline">
                <b>{isSpanish ? PATTERN_PROOF[3].es : PATTERN_PROOF[3].en}</b>
              </Link>
            </li>
          </ol>
          {/* The one line kept from the cut "What I Do Now" story (2026-10-13):
              it closes the pattern rather than opening a chapter of its own. */}
          <p className="rp-chapter__callout rp-patternCallout">
            {isSpanish ? "La IA acelera el trabajo. Las decisiones siguen siendo mías." : "AI moves the work faster. The calls stay mine."}
          </p>
        </div>
      </section>

      {/* ═ STORY ════════════════════════════════════════════════════ */}
      <section id="about-story" data-language-anchor="about-story" className="rp-section rp-section--alt" aria-labelledby="about-story-title">
        <div className="rp-wrap">
          {/* The "How I got here." H2 was cut (2026-10-13); the kicker stays the
              section's heading so the story's h3s still sit under an h2. */}
          <h2 className="rp-kicker" id="about-story-title">{isSpanish ? "Antes del diseño: MSK y el Ejército." : "Before design: MSK and the Army."}</h2>

          {chapters.map((chapter, index) => (
            <article className={`rp-split rp-chapter rp-reveal${index % 2 ? "" : " rp-split--flip"}${chapter.image ? "" : " rp-split--noMedia"}`} key={chapter.id}>
              <div className="rp-split__text">
                <p className="rp-chapter__n">
                  {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  <span>{chapter.label}</span>
                </p>
                <h3 className="rp-subhead">{chapter.heading}</h3>
                {chapter.paragraphs.map((paragraph) => (
                  <p className="rp-chapter__body" key={paragraph}>{paragraph}</p>
                ))}
                {chapter.facts && (
                  <dl className="about-evidenceLedger" aria-label={isSpanish ? "Impacto de un vistazo" : "Impact at a glance"} data-evidence="true">
                    {chapter.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.value}</dt>
                        <dd>{fact.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {chapter.callout && <p className="rp-chapter__callout">{chapter.callout}</p>}

                {chapter.caseLink && (
                  <Link to={chapter.caseLink.path} className="rp-chapter__proof">
                    <span aria-hidden="true"><Newspaper size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" /></span>
                    <span>
                      <b>{chapter.caseLink.title}</b>
                      <small>{chapter.caseLink.source}</small>
                    </span>
                  </Link>
                )}

                {chapter.articleLink && (
                  <a
                    href={chapter.articleLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rp-chapter__proof"
                  >
                    <span aria-hidden="true"><Newspaper size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" /></span>
                    <span>
                      <b lang={isSpanish ? "en" : undefined} className="rp-ext">{chapter.articleLink.title}</b>
                      <small>{chapter.articleLink.source}</small>
                      <span className="sr-only">{isSpanish ? " (se abre en una pestaña nueva)" : " (opens in new tab)"}</span>
                    </span>
                  </a>
                )}
              </div>

              {chapter.image && (
                <div className="rp-split__media">
                  <div className="rp-chapter__plate">
                    <img src={chapter.image} alt="" loading="lazy" />
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ═ PROOF — the one voice here that is not hers ══════════════ */}
      <section id="about-proof" data-language-anchor="about-proof" className="rp-section" aria-labelledby="about-proof-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{isSpanish ? "Feedback de clientes" : "Client feedback"}</p>
          <h2 className="rp-title" id="about-proof-title">
            {isSpanish ? "Cómo los clientes describen trabajar conmigo." : "How clients describe working with me."}
          </h2>
          {feedback.map((item) => (
            <figure className="rp-testimonial rp-reveal" key={item.name}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <b>{item.name}</b>
                <span>{item.role}</span>
                <span>{item.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═ HUMAN ════════════════════════════════════════════════════ */}
      <section id="about-life" data-language-anchor="about-life" className="rp-section rp-section--alt" aria-labelledby="about-life-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{isSpanish ? "Fuera del trabajo" : "Outside of work"}</p>
          <h2 className="rp-title" id="about-life-title">
            {isSpanish ? "Correr, leer y Luna la gata." : "Running, reading, and Luna the cat."}
          </h2>
          {/* Currently reading, stated as currently reading. This is the honest
              home for it: crediting it on the MSK colophon would claim a book
              started in 2026 shaped work done years earlier. */}
          <p className="rp-nowReading">
            <span>{isSpanish ? "Leyendo ahora" : "Reading now"}</span>
            <b>
              {isSpanish ? "Pensar en sistemas, de Donella Meadows." : "Thinking in Systems, Donella Meadows."}
            </b>
          </p>
        </div>
      </section>

      {/* ═ CTA ══════════════════════════════════════════════════════ */}
      <section id="about-contact" data-language-anchor="about-contact" className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>{isSpanish ? "¿Busca a alguien para diseño de productos de salud?" : "Hiring for healthcare product design?"}</h2>
          <p>
            {isSpanish ? "Abierta a roles de diseño de productos de salud, y a trabajo freelance." : "Open to healthcare product design roles, and to freelance work."}
          </p>
          <div className="rp-hero__ctas">
            <a className="rp-cta" href="mailto:espositohillary@gmail.com">
              {isSpanish ? "Escríbame" : "Email me"} →
            </a>
            <button type="button" className="rp-cta rp-cta--ghost" onClick={() => navigate("/?scrollTo=projects")}>
              ← {isSpanish ? "Volver al trabajo" : "Back to work"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
