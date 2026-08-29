import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFlagshipReveal from "../hooks/useFlagshipReveal";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage } from "../app/LanguageContext";
import { NewsIcon } from "../components/LineIcons";
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
  callout: string;
  caseLink?: { path: string; title: string; source: string };
  articleLink?: { url: string; title: string; source: string };
};

const CHAPTERS: AboutChapter[] = [
  {
    id: "now",
    label: "What I Do Now",
    heading: "Designing for the person who has to act on it.",
    paragraphs: [
      "My latest contract mapped and tagged 200+ screens across three finance apps so thousands of designers could find and reuse complete mobile flows.",
      "It sharpened how I compare patterns at scale, document to a strict taxonomy, and examine how products earn belief.",
      "AI accelerates research and prototyping. The judgment and authorship stay mine.",
    ],
    callout: "AI moves the work faster. The calls stay mine.",
  },
  {
    id: "msk",
    label: "Where I Built My Practice",
    heading: "Six years at MSK, optimizing internal operations and designing for 21,000+ clinicians and staff.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "I initiated an EMR workflow redesign that contributed within a 20% organization-wide cost reduction and survived two system upgrades.",
      "I also rebuilt CPR certification and administrative onboarding across Epic, HIPAA, and compliance. Operational observation, feedback, and workflow analysis were already the practice—even before I had formal UX vocabulary for it.",
    ],
    callout: "Systems fail at the point where a real person has to use them.",
    articleLink: {
      url: "https://www.mskcc.org/news/hillary-esposito-s-career-path-military-msk",
      title: "Hillary Esposito’s Career Path: From the Military to MSK",
      source: "MSK News",
    },
  },
  {
    id: "army",
    label: "Where My Foundation Was Built",
    heading: "Captain and Medical Logistics Officer, NJ Army National Guard.",
    image: "/assets/about/army.jpg",
    // Numbers live in the facts ledger below, once — the prose used to
    // restate every figure (5,000+, seven, 85%, 60%) a second time in the
    // same breath. Cut here, not duplicated there.
    paragraphs: [
      "In Iraq, I directed medical supply across aid stations in three countries, working inside a strict 48-hour cold-chain constraint.",
      "Shared tracking sharply cut both resupply time and spending. In 2020, I reported New Jersey National Guard medical operations to the Pentagon during the COVID-19 response.",
    ],
    facts: [
      { value: "5,000+", label: "soldiers served" },
      { value: "$2M", label: "medical supply" },
      { value: "7", label: "aid stations" },
      { value: "85%", label: "shorter resupply" },
      { value: "60%", label: "lower spending" },
    ],
    callout: "Process failure in a combat zone isn’t an inconvenience. It’s a casualty risk.",
    caseLink: { path: "/case-study/logistics", title: "Medical logistics, Iraq", source: "Read the case study" },
  },
];

const CHAPTERS_ES: AboutChapter[] = [
  {
    id: "now",
    label: "Lo que hago ahora",
    heading: "Diseñar para la persona que tiene que actuar.",
    paragraphs: [
      "Mi contrato más reciente mapeó y etiquetó más de 200 pantallas de tres apps financieras para que miles de diseñadores pudieran reutilizar flujos móviles completos.",
      "Afinó cómo comparo patrones a escala, documento con una taxonomía estricta y evalúo cómo un producto gana credibilidad.",
      "La IA acelera la investigación y los prototipos. El juicio y la autoría siguen siendo míos.",
    ],
    callout: "La IA acelera el trabajo. Las decisiones siguen siendo mías.",
  },
  {
    id: "msk",
    label: "Donde construí mi práctica",
    heading: "Seis años en MSK, optimizando operaciones internas y diseñando para 21,000+ clínicos y personal.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "Inicié un rediseño de flujo EMR que contribuyó dentro de una reducción organizacional del 20% en costos y sobrevivió dos actualizaciones del sistema.",
      "También reconstruí la certificación de RCP y la incorporación administrativa en Epic, HIPAA y cumplimiento. La observación operativa, los comentarios y el análisis de flujos ya eran la práctica, aun antes de tener vocabulario formal de UX.",
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
    label: "Donde construí mi base",
    heading: "Capitana y Oficial de Logística Médica, NJ Army National Guard.",
    image: "/assets/about/army.jpg",
    paragraphs: [
      "En Irak, dirigí el suministro médico en estaciones de ayuda de tres países, bajo una estricta restricción de cadena de frío de 48 horas.",
      "El seguimiento compartido redujo notablemente el tiempo de reabastecimiento y el gasto. En 2020, reporté al Pentágono las operaciones médicas de la Guardia Nacional de Nueva Jersey durante la respuesta a COVID-19.",
    ],
    facts: [
      { value: "5,000+", label: "soldados atendidos" },
      { value: "$2M", label: "suministro médico" },
      { value: "7", label: "estaciones de ayuda" },
      { value: "85%", label: "menos tiempo" },
      { value: "60%", label: "menos gasto" },
    ],
    callout: "Una falla de proceso en zona de combate no es una molestia. Es un riesgo.",
    caseLink: { path: "/case-study/logistics", title: "Logística médica, Irak", source: "Ver el caso de estudio" },
  },
];

export default function About() {
  usePageTitle("About");
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const isSpanish = lang === "es";
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
      <nav className="rp-breadcrumb" aria-label={isSpanish ? "Migas de pan" : "Breadcrumb"}>
        <Link to="/?scrollTo=projects">{isSpanish ? "Trabajo" : "Work"}</Link> / <span>{isSpanish ? "Sobre mí" : "About"}</span>
      </nav>

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
              {isSpanish ? "Diseño productos de salud donde cada transferencia importa." : "I design healthcare products where every handoff matters."}
            </h1>
            <p className="rp-sub">
              {isSpanish ? "Aporto más de 13 años en operaciones de atención oncológica y logística médica militar al diseño de productos de salud. Convierto esa experiencia en flujos clínicos más claros, herramientas internas y servicios integrales que ayudan a las personas a actuar correctamente cuando una falla tiene un costo." : "I bring 13+ years in cancer-care operations and military medical logistics to healthcare product design. I turn that experience into clearer clinical workflows, internal tools, and end-to-end services that help people act correctly when failure has a cost."}
            </p>
          </div>
        </div>
      </header>

      <section id="about-pattern" data-language-anchor="about-pattern" className="rp-section" aria-labelledby="about-pattern-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{isSpanish ? "Mi patrón" : "My pattern"}</p>
          <h2 className="rp-title" id="about-pattern-title">
            {isSpanish ? "Entro en sistemas complejos y encuentro dónde se rompe la confianza." : "I enter complex systems and find where trust breaks."}
          </h2>
          {/* Rewritten from a four-step observe/map/design/measure list. That was
              generic process language, and it restated MSK's Observe/Align/Redesign
              without MSK's evidence under it. These are the judgment calls rather
              than the stages — things that are true of this practice specifically. */}
          <ol className="rp-list rp-patternList rp-reveal">
            <li>{isSpanish ? "Busco primero el atajo. La nota adhesiva, la hoja de cálculo personal, el paso que todos se saltan. Ahí vive el proceso real, y nunca está en el documento del proceso." : "I look for the workaround first. The sticky note, the personal spreadsheet, the step everyone skips. That is where the real process lives, and it is never in the process document."}</li>
            <li>{isSpanish ? "Averiguo quién paga cuando falla. Un clínico entre pacientes, un soldado esperando reabastecimiento, alguien cuya planta murió. El costo decide cuánta certeza le debe el diseño." : "I find out who pays when it breaks. A clinician between patients, a soldier waiting on resupply, someone whose plant died. The cost decides how much certainty the design owes them."}</li>
            <li>{isSpanish ? "Hago que la falla sea compartida antes de mejorarla. Cuatro áreas con cuatro versiones del problema rechazarán la misma solución de cuatro maneras." : "I make the failure shared before I make it better. Four departments carrying four models of the problem will reject the same solution four different ways."}</li>
            <li>{isSpanish ? "Compruebo si sobrevive sin mí. Si necesita que yo lo explique para funcionar, no está terminado." : "I check whether it survives without me. If it needs me there to explain it, it is not finished."}</li>
          </ol>
        </div>
      </section>

      {/* ═ STORY ════════════════════════════════════════════════════ */}
      <section id="about-story" data-language-anchor="about-story" className="rp-section rp-section--alt" aria-labelledby="about-story-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{isSpanish ? "Mi historia" : "My story"}</p>
          <h2 className="rp-title" id="about-story-title">{isSpanish ? "Cómo llegué aquí." : "How I got here."}</h2>

          {chapters.map((chapter, index) => (
            <article className={`rp-split rp-chapter rp-reveal${index % 2 ? " rp-split--flip" : ""}${chapter.image ? "" : " rp-split--noMedia"}`} key={chapter.id}>
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
                <p className="rp-chapter__callout">{chapter.callout}</p>

                {chapter.caseLink && (
                  <Link to={chapter.caseLink.path} className="rp-chapter__proof">
                    <span aria-hidden="true"><NewsIcon /></span>
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
                    aria-label={`${isSpanish ? "Leer artículo" : "Read article"}: ${chapter.articleLink.title} (${isSpanish ? "se abre en una pestaña nueva" : "opens in a new tab"})`}
                  >
                    <span aria-hidden="true"><NewsIcon /></span>
                    <span>
                      <b lang={isSpanish ? "en" : undefined}>{chapter.articleLink.title}</b>
                      <small className="rp-ext">{chapter.articleLink.source}</small>
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
          <p className="rp-lede">
            {isSpanish ? "Rutinas que me mantienen clara y con los pies en la tierra." : "Routines that keep me clear and grounded."}
          </p>
          {/* Currently reading, stated as currently reading. This is the honest
              home for it: crediting it on the MSK colophon would claim a book
              started in 2026 shaped work done years earlier. */}
          <p className="rp-nowReading">
            <span>{isSpanish ? "Leyendo ahora" : "Reading now"}</span>
            <b>
              {isSpanish
                ? "Pensar en sistemas, de Donella Meadows — el texto de referencia sobre por qué los sistemas se resisten a los arreglos evidentes."
                : "Thinking in Systems, Donella Meadows — the standard text on why systems resist the obvious fix."}
            </b>
          </p>
        </div>
      </section>

      {/* ═ CTA ══════════════════════════════════════════════════════ */}
      <section id="about-contact" data-language-anchor="about-contact" className="rp-section">
        <div className="rp-wrap rp-close">
          <h2>{isSpanish ? "¿Le interesa trabajar conmigo?" : "Interested in working together?"}</h2>
          <p>
            {isSpanish ? "Abierta a roles de UX y diseño de producto en salud, organizaciones con misión y entornos operativamente complejos. También abierta a freelance y colaboraciones." : "Open to UX and product design roles in healthcare, mission-driven organizations, and operationally complex environments. Also open to freelance and collaborations."}
          </p>
          <div className="rp-hero__ctas">
            <button type="button" className="rp-cta" onClick={() => navigate("/?scrollTo=contact")}>
              {isSpanish ? "Contácteme" : "Get in touch"} →
            </button>
            <button type="button" className="rp-cta rp-cta--ghost" onClick={() => navigate("/?scrollTo=projects")}>
              ← {isSpanish ? "Volver al trabajo" : "Back to work"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
