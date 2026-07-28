import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage } from "../app/LanguageContext";
import { NewsIcon } from "../components/LineIcons";
import CartoField from "../components/riso/CartoField";
import { CLIENT_FEEDBACK, CLIENT_FEEDBACK_ES } from "../data/clientFeedback";
import "../styles/riso.css";
import "../styles/riso-page.css";

// ── Story chapters ───────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "now",
    label: "What I Do Now",
    heading: "Designing for trust in complex, regulated products.",
    image: "/assets/about/now.jpg",
    paragraphs: [
      "Right now I'm freelancing. My most recent contract was a deep study of three finance apps, where I documented more than 200 screens of end-to-end mobile flows, then annotated and tagged each one so thousands of designers could actually find and reuse them.",
      "It sharpened three things: reading interaction patterns at scale across financial UX, structuring documentation to a strict taxonomy and quality bar, and seeing how different products solve the same trust problem in very different ways.",
      "AI is part of how I work now, but it stays a tool. I use it to move faster on research and prototyping, then make the calls myself.",
    ],
    callout: "AI moves the work faster. The calls stay mine.",
  },
  {
    id: "msk",
    label: "Where I Built My Practice",
    heading: "Six years at MSK, optimizing internal operations and designing for 21,000+ clinicians and staff.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "I led the EMR workflow redesign behind a 20% organization-wide cost reduction, rebuilt certification workflows for a 70% efficiency gain, and redesigned onboarding using staff feedback. This was deep user research before I formally had the vocabulary for it.",
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
    paragraphs: [
      "Deployed to Iraq with the 44th IBCT, I directed medical logistics for 5,000+ soldiers and $2M in supplies across seven aid stations in three countries. Pioneered digital tracking that cut resupply time 85% and reduced spending 60%. In 2020, activated for New Jersey’s COVID-19 response, I reported from the Joint Surgeon’s Office to the Pentagon on state medical operations.",
    ],
    callout: "Process failure in a combat zone isn’t an inconvenience. It’s a casualty risk.",
  },
];

const CHAPTERS_ES = [
  {
    id: "now",
    label: "Lo que hago ahora",
    heading: "Diseño para generar confianza en productos complejos y regulados.",
    image: "/assets/about/now.jpg",
    paragraphs: [
      "Ahora trabajo freelance. Mi contrato más reciente fue un estudio profundo de tres apps de finanzas, donde documenté más de 200 pantallas de flujos móviles de principio a fin, y luego anoté y etiqueté cada una para que miles de diseñadores pudieran encontrarlas y reutilizarlas.",
      "Afinó tres cosas: leer patrones de interacción a escala en UX financiera, estructurar documentación con una taxonomía y un estándar de calidad estrictos, y ver cómo productos distintos resuelven el mismo problema de confianza de maneras muy distintas.",
      "La IA es parte de cómo trabajo ahora, pero sigue siendo una herramienta. La uso para avanzar más rápido en investigación y prototipos, y las decisiones las tomo yo.",
    ],
    callout: "La IA acelera el trabajo. Las decisiones siguen siendo mías.",
  },
  {
    id: "msk",
    label: "Donde construí mi práctica",
    heading: "Seis años en MSK, optimizando operaciones internas y diseñando para 21,000+ clínicos y personal.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "Lideré el rediseño de un flujo EMR detrás de una reducción organizacional de 20% en costos, reconstruí flujos de certificación para una mejora de 70% y rediseñé onboarding usando feedback del personal. Esto fue investigación de usuarios en profundidad antes de que yo tuviera el vocabulario formal para llamarlo así.",
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
      "Desplegada en Irak con la 44th IBCT, dirigí logística médica para más de 5,000 soldados y $2M en suministros en siete estaciones de ayuda en tres países. Fui pionera en un sistema de seguimiento digital que redujo el tiempo de reabastecimiento en 85% y el gasto en 60%. En 2020, durante la respuesta de COVID-19 en Nueva Jersey, reporté desde la Oficina del Joint Surgeon al Pentágono sobre operaciones médicas estatales.",
    ],
    callout: "Una falla de proceso en zona de combate no es una molestia. Es un riesgo.",
  },
];

export default function About() {
  usePageTitle("About");
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const isSpanish = lang === "es";
  const chapters = isSpanish ? CHAPTERS_ES : CHAPTERS;
  const feedback = isSpanish ? CLIENT_FEEDBACK_ES : CLIENT_FEEDBACK;

  return (
    <main className="about-page riso-page" lang={isSpanish ? "es" : "en"}>
      <nav className="rp-breadcrumb" aria-label={isSpanish ? "Migas de pan" : "Breadcrumb"}>
        <Link to="/?scrollTo=projects">{isSpanish ? "Trabajo" : "Work"}</Link> / <span>{isSpanish ? "Sobre mí" : "About"}</span>
      </nav>

      <nav className="rp-chapters" aria-label={isSpanish ? "Capítulos de la página Sobre mí" : "About page chapters"}>
        <span>{isSpanish ? "Saltar a" : "Jump to"}</span>
        <a href="#about-pattern">{isSpanish ? "Enfoque" : "Approach"}</a>
        <a href="#about-story">{isSpanish ? "Historia" : "Story"}</a>
        <a href="#about-proof">{isSpanish ? "Prueba" : "Proof"}</a>
        <a href="#about-contact">{isSpanish ? "Contacto" : "Contact"}</a>
      </nav>

      {/* ═ HERO — profile masthead (portrait-led, warm; distinct from Home) ═ */}
      <header className="rp-hero about-hero-profile">
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
              {isSpanish ? "Hillary Esposito · Diseñadora de producto · Nueva York" : "Hillary Esposito · Product Designer · New York"}
            </figcaption>
          </figure>
        </div>
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">{isSpanish ? "Sobre mí" : "About"}</span>
            <h1 className="rp-h1">
              {isSpanish ? "Diseño productos donde los detalles deciden si la gente confía en ellos." : "I design products where the details decide whether people trust them."}
            </h1>
            <p className="rp-sub">
              {isSpanish ? "Más de 13 años en sistemas de alto riesgo — operaciones de atención oncológica, logística médica militar y una app de consumo creada con IA. Cambia el contexto; mi pregunta no: ¿qué necesita una persona para avanzar con confianza?" : "13+ years in high-stakes systems — cancer-care operations, military medical logistics, and an AI-built consumer app. The context changes; my question does not: what does a person need to move forward with confidence?"}
            </p>
          </div>
        </div>
      </header>

      <section id="about-pattern" className="about-pattern-section" aria-label={isSpanish ? "Mi patrón de trabajo" : "My working pattern"}>
        <div className="about-pattern-card feature">
          <p className="about-agenda__eyebrow">{isSpanish ? "Mi patrón" : "My pattern"}</p>
          <h2 className="about-growth-title">
            {isSpanish ? "Entro en sistemas complejos y encuentro dónde se rompe la confianza." : "I enter complex systems and find where trust breaks."}
          </h2>
          {/* Rewritten from a four-step observe/map/design/measure list. That was
              generic process language, and it restated MSK's Observe/Align/Redesign
              without MSK's evidence under it. These are the judgment calls rather
              than the stages — things that are true of this practice specifically. */}
          <ol className="about-pattern-list">
            <li>{isSpanish ? "Busco primero el atajo. La nota adhesiva, la hoja de cálculo personal, el paso que todos se saltan. Ahí vive el proceso real, y nunca está en el documento del proceso." : "I look for the workaround first. The sticky note, the personal spreadsheet, the step everyone skips. That is where the real process lives, and it is never in the process document."}</li>
            <li>{isSpanish ? "Averiguo quién paga cuando falla. Un clínico entre pacientes, un soldado esperando reabastecimiento, alguien cuya planta murió. El costo decide cuánta certeza le debe el diseño." : "I find out who pays when it breaks. A clinician between patients, a soldier waiting on resupply, someone whose plant died. The cost decides how much certainty the design owes them."}</li>
            <li>{isSpanish ? "Hago que la falla sea compartida antes de mejorarla. Cuatro áreas con cuatro versiones del problema rechazarán la misma solución de cuatro maneras." : "I make the failure shared before I make it better. Four departments carrying four models of the problem will reject the same solution four different ways."}</li>
            <li>{isSpanish ? "Compruebo si sobrevive sin mí. Si necesita que yo lo explique para funcionar, no está terminado." : "I check whether it survives without me. If it needs me there to explain it, it is not finished."}</li>
          </ol>
        </div>
      </section>

      {/* ═ STORY ════════════════════════════════════════════════════ */}
      <section id="about-story" className="about-story-section" aria-label={isSpanish ? "Mi historia" : "My story"}>
        <div className="about-story-header">
          <p className="about-agenda__eyebrow">{isSpanish ? "Mi historia" : "My story"}</p>
          <h2 className="about-growth-title">{isSpanish ? "Cómo llegué aquí." : "How I got here."}</h2>
        </div>

        <div className="about-story-grid">
          {chapters.map((chapter, index) => (
            <article key={chapter.id} className="about-story-card feature">
              <div className="about-story-card__layout">
                {chapter.image && (
                  <div className="about-story-card__image">
                    <img src={chapter.image} alt="" loading="lazy" />
                  </div>
                )}

                <div className="about-story-card__content">
                  <div className="about-story-card__top">
                    <div>
                      <span className="about-story-card__index" aria-hidden="true">{String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}</span>
                      <p className="about-story-card__label">{chapter.label}</p>
                      <h3 className="about-story-card__heading">{chapter.heading}</h3>
                    </div>
                  </div>

                  <div className="about-story-card__body">
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="about-story-card__text">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="about-story-card__callout">
                    <p>{chapter.callout}</p>
                  </div>
                </div>
              </div>

              {chapter.articleLink && (
                <a
                  href={chapter.articleLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-story-card__article-link"
                  aria-label={`${isSpanish ? "Leer artículo" : "Read article"}: ${chapter.articleLink.title} (${isSpanish ? "se abre en una pestaña nueva" : "opens in a new tab"})`}
                >
                  <span className="about-story-card__article-icon" aria-hidden="true">
                    <NewsIcon />
                  </span>
                  <span className="about-story-card__article-text">
                    <span className="about-story-card__article-title" lang={isSpanish ? "en" : undefined}>
                      {chapter.articleLink.title}
                    </span>
                    <span className="about-story-card__article-source">
                      {chapter.articleLink.source}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ marginLeft: "0.35rem", verticalAlign: "middle" }}>
                        <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ═ HUMAN ════════════════════════════════════════════════════ */}
      <section className="about-life" aria-label={isSpanish ? "Fuera del trabajo" : "Outside of work"}>
        <div className="about-life-card feature">
          <h2 className="about-life-title">{isSpanish ? "Fuera del trabajo" : "Outside of work"}</h2>
          <p className="about-life-intro">
            {isSpanish ? "Correr, leer y Luna la gata. Rutinas que me mantienen clara y con los pies en la tierra." : "Running, reading, and Luna the cat. Routines that keep me clear and grounded."}
          </p>
        </div>
      </section>

      <section id="about-proof" className="about-feedback-section" aria-label={isSpanish ? "Comentarios de clientes" : "Client feedback"}>
        <div className="about-story-header">
          <p className="about-agenda__eyebrow">{isSpanish ? "Feedback de clientes" : "Client feedback"}</p>
          <h2 className="about-growth-title">{isSpanish ? "Cómo los clientes describen trabajar conmigo." : "How clients describe working with me."}</h2>
        </div>

        <div className="about-feedback-grid">
          {feedback.map((item) => (
            <figure key={item.name} className="about-feedback-card feature">
              <div className="about-feedback-card__icon about-feedback-card__icon--mobbin" aria-hidden="true">
                <img src="/assets/mobbin/mobbin-logo.png" alt="Mobbin" className="about-feedback-card__logo" />
              </div>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
                <span>{item.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═ CTA ══════════════════════════════════════════════════════ */}
      <section id="about-contact" className="about-cta">
        <div className="about-cta-simple">
          <h2 className="about-cta-title" style={{ marginBottom: "1rem" }}>
            {isSpanish ? "¿Le interesa trabajar conmigo?" : "Interested in working together?"}
          </h2>
          <p className="about-cta-content" style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.75rem" }}>
            {isSpanish ? "Abierta a roles de UX y diseño de producto en salud, organizaciones con misión y entornos operativamente complejos. También abierta a freelance y colaboraciones." : "Open to UX and product design roles in healthcare, mission-driven organizations, and operationally complex environments. Also open to freelance and collaborations."}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className="hero-btn"
              style={{ fontSize: "0.9rem", padding: "1rem 2rem" }}
              onClick={() => navigate("/?scrollTo=contact")}
            >
              {isSpanish ? "Contácteme" : "Get in touch"}
            </button>
            <button
              type="button"
              className="about-back-btn"
              onClick={() => navigate("/?scrollTo=projects")}
              style={{ fontSize: "0.9rem" }}
            >
              ← {isSpanish ? "Volver al trabajo" : "Back to work"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
