// src/components/Footer.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useT } from "../app/LanguageContext";

export default function Footer() {
  const t = useT();
  const { pathname } = useLocation();
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
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/hme222"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("footer.githubAria")}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div className="site-footer__base">
        <p>© 2026 Hillary Esposito</p>
        <p>{t("footer.availability")}</p>
      </div>
    </footer>
  );
}
