import React from "react";
import { useNavigate } from "react-router-dom";

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
};

type SpanishCaseStudyProps = {
  data: SpanishCaseStudyData;
};

export default function SpanishCaseStudy({ data }: SpanishCaseStudyProps) {
  const navigate = useNavigate();

  return (
    <main className="case-study gh-layout" aria-label={`${data.title} estudio de caso`} lang="es">
      <header className="gh-hero">
        <div className="gh-hero__copy">
          <p className="meta">{data.meta}</p>
          <h1>{data.title}</h1>
          <p className="gh-hero__intro">{data.intro}</p>
          <p className="spanish-case-note">
            Resumen en español. La versión completa del estudio de caso está disponible en inglés.
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
