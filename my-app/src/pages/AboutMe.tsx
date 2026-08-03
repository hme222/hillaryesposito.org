import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFlagshipReveal from "../hooks/useFlagshipReveal";
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
      "Medical logistics means making sure medicine and equipment reach the people treating casualties, before they need it. Deployed to Iraq with the 44th IBCT — an infantry brigade of several thousand soldiers — I directed that supply chain for 5,000+ soldiers and $2M in supplies across seven aid stations, the front-line clinics where wounded soldiers are treated first, in three countries. Pioneered digital tracking that cut resupply time 85% and reduced spending 60%. In 2020, activated for New Jersey’s COVID-19 response, I reported from the Joint Surgeon’s Office — the medical command for the state’s National Guard — to the Pentagon on state medical operations.",
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
      "La logística médica consiste en lograr que los medicamentos y el equipo lleguen a quienes atienden heridos, antes de que los necesiten. Desplegada en Irak con la 44th IBCT — una brigada de infantería de varios miles de soldados — dirigí esa cadena de suministro para más de 5,000 soldados y $2M en suministros en siete estaciones de ayuda, las clínicas de primera línea donde se atiende primero a los heridos, en tres países. Fui pionera en un sistema de seguimiento digital que redujo el tiempo de reabastecimiento en 85% y el gasto en 60%. En 2020, durante la respuesta de COVID-19 en Nueva Jersey, reporté desde la Oficina del Joint Surgeon al Pentágono sobre operaciones médicas estatales.",
    ],
    callout: "Una falla de proceso en zona de combate no es una molestia. Es un riesgo.",
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

  return (
    <main className="about-page riso-page" lang={isSpanish ? "es" : "en"} ref={rootRef}>
      <nav className="rp-breadcrumb" aria-label={isSpanish ? "Migas de pan" : "Breadcrumb"}>
        <Link to="/?scrollTo=projects">{isSpanish ? "Trabajo" : "Work"}</Link> / <span>{isSpanish ? "Sobre mí" : "About"}</span>
      </nav>

      <nav className="rp-chapters" aria-label={isSpanish ? "Capítulos de la página Sobre mí" : "About page chapters"}>
        <span>{isSpanish ? "Saltar a" : "Jump to"}</span>
        <a href="#about-pattern">{isSpanish ? "Enfoque" : "Approach"}</a>
        <a href="#about-story">{isSpanish ? "Historia" : "Story"}</a>
        <a href="#about-proof">{isSpanish ? "Prueba" : "Proof"}</a>
        <a href="#about-life">{isSpanish ? "Fuera del trabajo" : "Outside work"}</a>
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
              {/* Frames the path as the qualification rather than as a pivot.
                  She did not learn healthcare to design for it — she worked
                  inside the broken workflows first and moved into design to fix
                  them, which is the harder order to come by. */}
              {isSpanish ? "No soy una diseñadora que aprendió sobre salud. Soy alguien de operaciones: más de 13 años dentro de sistemas donde fallar cuesta — operaciones de atención oncológica, logística médica militar — y pasé al diseño para arreglarlos desde adentro. Cambia el contexto; mi pregunta no: ¿qué necesita una persona para avanzar con confianza?" : "I'm not a designer who learned healthcare. I'm an operations person — 13+ years inside systems where failure had a cost, from cancer-care operations to military medical logistics — who moved into design to fix them from the inside. The context changes; my question does not: what does a person need to move forward with confidence?"}
            </p>
          </div>
        </div>
      </header>

      <section id="about-pattern" className="rp-section" aria-labelledby="about-pattern-title">
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
      <section id="about-story" className="rp-section rp-section--alt" aria-labelledby="about-story-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{isSpanish ? "Mi historia" : "My story"}</p>
          <h2 className="rp-title" id="about-story-title">{isSpanish ? "Cómo llegué aquí." : "How I got here."}</h2>

          {chapters.map((chapter, index) => (
            <article className={`rp-split rp-chapter rp-reveal${index % 2 ? " rp-split--flip" : ""}`} key={chapter.id}>
              <div className="rp-split__text">
                <p className="rp-chapter__n">
                  {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  <span>{chapter.label}</span>
                </p>
                <h3 className="rp-subhead">{chapter.heading}</h3>
                {chapter.paragraphs.map((paragraph) => (
                  <p className="rp-chapter__body" key={paragraph}>{paragraph}</p>
                ))}
                <p className="rp-chapter__callout">{chapter.callout}</p>

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
      <section id="about-proof" className="rp-section" aria-labelledby="about-proof-title">
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
      <section id="about-life" className="rp-section rp-section--alt" aria-labelledby="about-life-title">
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
      <section id="about-contact" className="rp-section">
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
