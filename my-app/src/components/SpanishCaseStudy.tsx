import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../app/LanguageContext";
import usePageTitle from "../hooks/usePageTitle";
import CartoField from "./riso/CartoField";
import RisoDefs from "./riso/RisoDefs";
import "../styles/riso.css";
import "../styles/riso-page.css";

export type SpanishCaseStudyData = {
  title: string;
  meta: string;
  intro: string;
  stats: { label: string; value: string }[];
  sections: {
    eyebrow: string;
    title: string;
    body: string[];
    bullets?: string[];
  }[];
  /** Links to the other case studies, for case-to-case navigation (parity with the English MoreWork). */
  otherProjects?: { title: string; desc: string; path: string }[];
};

type SpanishCaseStudyProps = {
  data: SpanishCaseStudyData;
};

const projectArt = (title: string) => {
  if (/memorial|msk/i.test(title)) return { mapSrc: "/riso/mskcc-map.png", edition: "struct" as const };
  if (/mobbin/i.test(title)) return { mapSrc: "/riso/elevation-03.jpg", edition: "eucalyptus" as const };
  return { mapSrc: "/riso/elevation-04.jpg", edition: "olive" as const };
};

export default function SpanishCaseStudy({ data }: SpanishCaseStudyProps) {
  const navigate = useNavigate();
  const { setLang } = useLanguage();
  const art = projectArt(data.title);
  usePageTitle(`${data.title} — estudio de caso`);

  const readInEnglish = () => {
    setLang("en");
    window.scrollTo(0, 0);
  };

  return (
    <main className="riso-page spanish-riso-case" aria-label={`${data.title}, estudio de caso`} lang="es">
      <RisoDefs />

      <nav className="rp-breadcrumb" aria-label="Migas de pan">
        <Link to="/?scrollTo=projects">Trabajo</Link> / <span>{data.title}</span>
      </nav>

      <nav className="rp-chapters" aria-label="Capítulos del estudio de caso">
        <span aria-hidden="true">Ir a</span>
        {data.sections.map((section, index) => (
          <a key={section.title} href={`#es-capitulo-${index + 1}`}>{section.eyebrow}</a>
        ))}
      </nav>

      <header className="rp-hero">
        <CartoField
          mapSrc={art.mapSrc}
          edition={art.edition}
          mapZoom={1.08}
          mapPosition="55% 42%"
          mapOpacity={0.82}
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">{data.meta}</span>
            <h1 className="rp-h1">{data.title}</h1>
            <p className="rp-sub">{data.intro}</p>
            <p className="rp-language-note rp-language-note--inline">
              Esta es una versión condensada. El estudio completo está disponible en inglés.
            </p>
            <button type="button" className="rp-cta" onClick={readInEnglish}>
              Leer el estudio completo en inglés →
            </button>
          </div>
        </div>
      </header>

      <section className="rp-section" aria-label="Datos clave" style={{ paddingBottom: 0 }}>
        <div className="rp-wrap">
          <div className="rp-metagrid">
            {data.stats.map((item) => (
              <div key={item.label}>
                <p className="rp-metagrid__k">{item.label}</p>
                <p className="rp-metagrid__v">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {data.sections.map((section, index) => (
        <section
          id={`es-capitulo-${index + 1}`}
          className={`rp-section${index % 2 ? " rp-section--alt" : ""}`}
          key={section.title}
        >
          <div className="rp-wrap">
            <p className="rp-kicker">{section.eyebrow}</p>
            <h2 className="rp-title">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="rp-lede">{paragraph}</p>
            ))}
            {section.bullets && (
              <ul className="rp-list">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </div>
        </section>
      ))}

      {data.otherProjects && data.otherProjects.length > 0 && (
        <section className="rp-section rp-section--alt" aria-labelledby="otros-proyectos">
          <div className="rp-wrap">
            <p className="rp-kicker">Más trabajo</p>
            <h2 className="rp-title" id="otros-proyectos">Otros proyectos</h2>
            <div className="rp-worklist">
              {data.otherProjects.map((project) => (
                <Link key={project.path} to={project.path} className="rp-work">
                  <div>
                    <p className="rp-work__title" style={{ fontSize: "1.3rem" }}>{project.title}</p>
                    <p className="rp-work__desc">{project.desc}</p>
                  </div>
                  <span className="rp-work__arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="rp-section">
        <div className="rp-wrap rp-close">
          <p className="rp-kicker">Hablemos</p>
          <h2>¿Quiere hablar sobre este tipo de trabajo?</h2>
          <p>Puedo explicar el proceso, las decisiones y lo que aprendí con más detalle.</p>
          <div className="rp-hero__ctas">
            <a href="mailto:espositohillary@gmail.com" className="rp-cta">Escríbame →</a>
            <button type="button" className="rp-cta rp-cta--ghost" onClick={() => navigate("/?scrollTo=projects")}>
              ← Volver a proyectos
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
