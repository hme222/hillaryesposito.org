import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage } from "../app/LanguageContext";
import { MobbinIcon, NewsIcon } from "../components/LineIcons";

// ── Story chapters ───────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: "now",
    label: "What I Do Now",
    heading: "Designing for trust in complex, regulated products.",
    image: "/assets/about/now.jpg",
    paragraphs: [
      "Right now I'm freelancing. My most recent contract was a deep study of three fintech products, where I documented more than 200 screens of end-to-end mobile flows, then annotated and tagged each one so thousands of designers could actually find and reuse them. It sharpened three things: reading interaction patterns at scale across financial UX, structuring documentation to a strict taxonomy and quality bar, and seeing how different products solve the same trust problem in very different ways. AI is part of how I work now, but it stays a tool. I use it to move faster on research and prototyping, then make the calls myself.",
    ],
    callout: "AI moves the work faster. The calls stay mine.",
  },
  {
    id: "msk",
    label: "Where I Built My Practice",
    heading: "Six years at MSK, optimizing internal operations and designing for 21,000+ clinicians.",
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

const CLIENT_FEEDBACK = [
  {
    quote:
      "Hillary was timely, communicative, and diligent in ensuring that every screen and interaction was captured to a high standard.",
    name: "Lynette Yap",
    role: "Content and Community @ Mobbin",
    context: "Client recommendation, freelance UX flow documentation project",
  },
];

const CHAPTERS_ES = [
  {
    id: "now",
    label: "Lo que hago ahora",
    heading: "Diseño para generar confianza en productos complejos y regulados.",
    image: "/assets/about/now.jpg",
    paragraphs: [
      "Ahora trabajo freelance. Mi contrato más reciente fue un estudio profundo de tres productos fintech, donde documenté más de 200 pantallas de flujos móviles de principio a fin, y luego anoté y etiqueté cada una para que miles de diseñadores pudieran encontrarlas y reutilizarlas.",
    ],
    callout: "La IA acelera el trabajo. Las decisiones siguen siendo mías.",
  },
  {
    id: "msk",
    label: "Donde construí mi práctica",
    heading: "Seis años en MSK, optimizando operaciones internas y diseñando para 21,000+ clínicos.",
    image: "/assets/about/msk.jpg",
    paragraphs: [
      "Lideré el rediseño de un flujo EMR detrás de una reducción organizacional de 20% en costos, reconstruí flujos de certificación para una mejora de 70% y rediseñé onboarding usando feedback del personal.",
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

const CLIENT_FEEDBACK_ES = [
  {
    quote:
      "Hillary fue puntual, comunicativa y diligente para asegurar que cada pantalla e interacción se capturara con un estándar alto.",
    name: "Lynette Yap",
    role: "Content and Community @ Mobbin",
    context: "Recomendación de cliente, proyecto freelance de documentación de flujos UX",
  },
];

export default function About() {
  usePageTitle("About");
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const lunaRef = useRef<HTMLDivElement>(null);
  const isSpanish = lang === "es";
  const chapters = isSpanish ? CHAPTERS_ES : CHAPTERS;
  const feedback = isSpanish ? CLIENT_FEEDBACK_ES : CLIENT_FEEDBACK;

  useEffect(() => {
    const handleScroll = () => {
      if (!lunaRef.current) return;
      const movement = Math.sin(window.scrollY * 0.002) * 14;
      lunaRef.current.style.transform = `translateY(${movement}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="about-page" lang={isSpanish ? "es" : "en"}>
      <div className="about-back-row">
        <button
          type="button"
          className="about-back-btn"
          onClick={() => navigate("/?scrollTo=projects")}
          aria-label={isSpanish ? "Volver al portafolio principal" : "Back to main portfolio"}
        >
          ← {isSpanish ? "Volver a proyectos" : "Back to projects"}
        </button>
      </div>

      {/* ═ HERO ═════════════════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-intro">
            {isSpanish ? "Diseñadora UX y de producto para sistemas de salud y herramientas internas, con perspectiva de veterana del Ejército." : "UX & Product Designer for healthcare systems and internal tools, with Army\u00a0Veteran perspective."}
          </p>

          <h1 className="about-title">
            {isSpanish ? "Diseño herramientas confiables para flujos complejos de salud e internos." : "I design trusted tools for complex healthcare and internal workflows."}
          </h1>

          <p className="about-hero-subtext">
            {isSpanish ? "13+ años dentro de sistemas de salud y militares de alto riesgo, ahora enfocada en herramientas internas, flujos por rol y diseño de producto asistido por IA." : "13+ years inside high-stakes healthcare and military systems, now focused on internal tools, role-based workflows, and AI-assisted product design."}
          </p>
        </div>

        <div className="about-hero-photo">
          <img
            src="/assets/about/headshot.jpg"
            alt="Hillary Esposito"
            className="about-headshot"
          />
        </div>
      </section>

      <section className="about-pattern-section" aria-label={isSpanish ? "Mi patrón de trabajo" : "My working pattern"}>
        <div className="about-pattern-card feature">
          <p className="about-agenda__eyebrow">{isSpanish ? "Mi patrón" : "My pattern"}</p>
          <h2 className="about-growth-title">
            {isSpanish ? "Entro en sistemas complejos y encuentro dónde se rompe la confianza." : "I enter complex systems and find where trust breaks."}
          </h2>
          <ol className="about-pattern-list">
            <li>{isSpanish ? "Observo cómo el trabajo ocurre realmente, no solo cómo el proceso dice que debería ocurrir." : "I observe how the work actually happens, not just how the process says it should happen."}</li>
            <li>{isSpanish ? "Mapeo los puntos donde personas, permisos, datos y herramientas dejan de coincidir." : "I map where people, permissions, data, and tools stop matching each other."}</li>
            <li>{isSpanish ? "Diseño el siguiente paso claro: la acción, estado o flujo que reduce la fricción." : "I design the clearer next step: the action, status, or flow that reduces friction."}</li>
            <li>{isSpanish ? "Mido si el cambio se sostiene cuando personas reales tienen que usarlo bajo presión." : "I measure whether the change holds when real people have to use it under pressure."}</li>
          </ol>
        </div>
      </section>

      {/* ═ STORY ════════════════════════════════════════════════════ */}
      <section className="about-story-section" aria-label={isSpanish ? "Mi historia" : "My story"}>
        <div className="about-story-header">
          <p className="about-agenda__eyebrow">{isSpanish ? "Mi historia" : "My story"}</p>
          <h2 className="about-growth-title">{isSpanish ? "Cómo llegué aquí." : "How I got here."}</h2>
        </div>

        <div className="about-story-grid">
          {chapters.map((chapter) => (
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
                  aria-label={`${isSpanish ? "Leer artículo" : "Read article"}: ${chapter.articleLink.title}`}
                >
                  <span className="about-story-card__article-icon" aria-hidden="true">
                    <NewsIcon />
                  </span>
                  <span className="about-story-card__article-text">
                    <span className="about-story-card__article-title">
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
          <div ref={lunaRef} className="about-luna-deco">
            <img src="/assets/about/luna.jpg" alt={isSpanish ? "Luna, una gata gris y blanca con ojos naranjas" : "Luna, a gray and white cat with orange eyes"} />
          </div>
        </div>
      </section>

      <section className="about-feedback-section" aria-label={isSpanish ? "Comentarios de clientes" : "Client feedback"}>
        <div className="about-story-header">
          <p className="about-agenda__eyebrow">{isSpanish ? "Feedback de clientes" : "Client feedback"}</p>
          <h2 className="about-growth-title">{isSpanish ? "Cómo los clientes describen trabajar conmigo." : "How clients describe working with me."}</h2>
        </div>

        <div className="about-feedback-grid">
          {feedback.map((item) => (
            <figure key={item.name} className="about-feedback-card feature">
              <div className="about-feedback-card__icon about-feedback-card__icon--mobbin" aria-hidden="true">
                <MobbinIcon />
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
      <section className="about-cta">
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
              ← {isSpanish ? "Volver a proyectos" : "Back to projects"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
