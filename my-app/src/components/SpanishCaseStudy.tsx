import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../app/LanguageContext";

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

export default function SpanishCaseStudy({ data }: SpanishCaseStudyProps) {
  const navigate = useNavigate();
  const { setLang } = useLanguage();

  const readInEnglish = () => {
    setLang("en");
    window.scrollTo(0, 0);
  };

  return (
    <main className="case-study gh-layout" aria-label={`${data.title} estudio de caso`} lang="es">
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">{data.meta}</p>
          <h1>{data.title}</h1>
          <p className="gh-hero__intro">{data.intro}</p>
          <p className="spanish-case-note">
            Esta es una versión condensada.{" "}
            <button type="button" className="spanish-case-note__link" onClick={readInEnglish}>
              Leer el estudio de caso completo en inglés →
            </button>
          </p>
        </div>
      </header>

      <div className="gh-meta-strip">
        {data.stats.map((item, index) => (
          <React.Fragment key={item.label}>
            <div className="gh-meta-strip__item">
              <span className="gh-meta-strip__label">{item.label}</span>
              <span className="gh-meta-strip__value">{item.value}</span>
            </div>
            {index < data.stats.length - 1 && <div className="gh-meta-strip__divider" aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>

      {data.sections.map((section) => (
        <section key={section.title}>
          <p className="gh-section-label">{section.eyebrow}</p>
          <h2 className="cs-section-title">{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="cs-overview-text">
              {paragraph}
            </p>
          ))}
          {section.bullets && (
            <ul className="cs-role-scope-list spanish-case-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {data.otherProjects && data.otherProjects.length > 0 && (
        <section className="spanish-more-work" aria-label="Otros proyectos">
          <p className="gh-section-label">Más trabajo</p>
          <h2 className="cs-section-title">Otros proyectos</h2>
          <div className="spanish-more-work__grid">
            {data.otherProjects.map((proj) => (
              <Link key={proj.path} to={proj.path} className="spanish-more-work__card">
                <strong>{proj.title}</strong>
                <span>{proj.desc}</span>
                <span className="spanish-more-work__cta" aria-hidden="true">Ver estudio de caso →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="cs-inline-cta">
        <p>¿Quiere hablar sobre este tipo de trabajo?</p>
        <a href="mailto:espositohillary@gmail.com" className="hero-btn" style={{ fontSize: "0.9rem", padding: "0.8rem 1.8rem", textDecoration: "none" }}>
          Escríbame
        </a>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button type="button" className="about-back-btn" onClick={() => navigate("/?scrollTo=projects")}>
          ← Volver a proyectos
        </button>
      </div>
    </main>
  );
}
