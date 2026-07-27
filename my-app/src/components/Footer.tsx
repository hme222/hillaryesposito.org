// src/components/Footer.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useT } from "../app/LanguageContext";

/**
 * Per-route colophon.
 *
 * A page built with something worth crediting contributes an ethos line and a
 * credits list into the footer's dark base band, rather than stacking a second
 * dark slab above the footer and repeating the copyright. Grove is the only
 * page using it today; the shape exists so others can join the same band.
 */
const COLOPHONS: Record<
  string,
  { ethos: string; credits: Array<{ icon: string; label: string }> }
> = {
  "/case-study/grove": {
    ethos:
      "Calm, not stressful · One task a day · Humans over algorithms · Reduce the overwhelm · Trust, not tricks · What you already own",
    credits: [
      { icon: "🎨", label: "Figma" },
      { icon: "🤖", label: "Emergent" },
      { icon: "⚛️", label: "React" },
      { icon: "⚡", label: "FastAPI" },
      { icon: "🍃", label: "MongoDB" },
      { icon: "🗣️", label: "32 real opinions" },
      { icon: "✋", label: "the word “no”" },
      { icon: "🧘", label: "restraint" },
      { icon: "☕", label: "caffeine" },
    ],
  },
};

export default function Footer() {
  const t = useT();
  const { pathname } = useLocation();
  const colophon = COLOPHONS[pathname];
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
        {colophon && (
          <div className="site-footer__colophon">
            <p className="site-footer__ethos">{colophon.ethos}</p>
            <ul className="site-footer__credits">
              {colophon.credits.map((c) => (
                <li key={c.label}>
                  <span aria-hidden="true">{c.icon}</span> {c.label}
                </li>
              ))}
            </ul>
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
