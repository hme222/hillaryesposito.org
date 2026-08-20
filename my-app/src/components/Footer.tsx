// src/components/Footer.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage, useT } from "../app/LanguageContext";

/**
 * Per-route colophon.
 *
 * A page built with something worth crediting contributes a credits list into
 * the footer's dark base band, rather than stacking a second dark slab above
 * the footer and repeating the copyright.
 *
 * Every entry must be traceable to something the case study itself states.
 * Grove's list is literal build tooling. MSK and Mobbin did not ship from a
 * toolchain worth listing, so theirs credit the methods and materials those
 * pages already claim — never a tool Hillary has not said she used.
 *
 * Labels carry a Spanish variant because these pages render inside the
 * bilingual shell. Product names stay untranslated; the human entries — which
 * are the funny ones, and therefore the ones worth a Spanish reader seeing —
 * do not.
 */
type Credit = { label: string; es?: string };

const COLOPHONS: Record<string, Credit[]> = {
  "/case-study/grove": [
    { label: "Figma" },
    { label: "Emergent" },
    { label: "React" },
    { label: "34 survey responses", es: "34 respuestas de encuesta" },
    { label: "human override", es: "decisión humana" },
  ],
  // The named disciplines lead. This page's own eyebrow claims service design
  // and process improvement, and the body claims stakeholder alignment, change
  // management, and workflow redesign — so the colophon says them in the words
  // a search for that work actually uses, without adding a claim the case
  // study does not already make.
  "/case-study/msk": [
    { label: "service design", es: "diseño de servicios" },
    { label: "current-state mapping", es: "mapeo del estado actual" },
    { label: "workflow redesign", es: "rediseño de flujos de trabajo" },
    { label: "change management", es: "gestión del cambio" },
  ],
  "/case-study/logistics": [
    { label: "medical supply chain", es: "cadena de suministro médico" },
    { label: "cold-chain control", es: "control de cadena de frío" },
    { label: "seven aid stations", es: "siete estaciones de ayuda" },
    { label: "demand analysis", es: "análisis de demanda" },
  ],
  "/case-study/mobbin": [
    { label: "three finance apps", es: "tres apps de finanzas" },
    { label: "200+ screens per app", es: "200+ pantallas por app" },
    { label: "Mobbin taxonomy", es: "taxonomía de Mobbin" },
    { label: "four-month contract", es: "contrato de cuatro meses" },
  ],
};

export default function Footer() {
  const t = useT();
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const credits = COLOPHONS[pathname];
  const hasAuthoredClose =
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/case-study/") ||
    pathname.startsWith("/riso/") ||
    pathname.startsWith("/curated/");

  return (
    <footer
      id="site-footer"
      className={`site-footer${hasAuthoredClose ? " site-footer--compact" : ""}`}
    >
      <div className="site-footer__grid">
        <div className="site-footer__lead">
          <p className="site-footer__eyebrow">{t("footer.eyebrow")}</p>
          <p className="site-footer__statement">{t("footer.statement")}</p>
        </div>

        <nav className="site-footer__column" aria-label={t("footer.siteAria")}>
          <p className="site-footer__label">{t("footer.explore")}</p>
          <Link to="/">{t("nav.home")}</Link>
          <Link to="/?scrollTo=projects">{t("nav.work")}</Link>
          <Link to="/about">{t("nav.about")}</Link>
        </nav>

        <div className="site-footer__column">
          <p className="site-footer__label">{t("footer.connect")}</p>
          <a href="mailto:espositohillary@gmail.com">{t("footer.email")}</a>
          <a
            href="https://www.linkedin.com/in/hillaryesposito/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("home.linkedinAria")}
          >
            <span className="rp-ext">LinkedIn</span>
          </a>
          <a
            href="https://github.com/hme222"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("footer.githubAria")}
          >
            <span className="rp-ext">GitHub</span>
          </a>
        </div>
      </div>

      <div className="site-footer__base">
        {credits && (
          <div className="site-footer__madeWith">
            <p className="site-footer__madeWithLabel">{t("footer.madeWith")}</p>
            <div className="site-footer__credits">
              <ul className="site-footer__creditList">
                {credits.map((c) => (
                  <li key={c.label}>
                    {lang === "es" && c.es ? c.es : c.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="site-footer__baseRow">
          <p>© 2026 Hillary Esposito</p>
          <p>{t("footer.availability")}</p>
        </div>
      </div>
    </footer>
  );
}
