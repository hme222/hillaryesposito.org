// src/components/Footer.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useT } from "../app/LanguageContext";

/**
 * @status: stable
 * @purpose: Site-wide footer rendered in app/App.tsx; shows nav links (plus the button that replays the home page opening film), contact links (email, résumé PDF, LinkedIn, GitHub), and a per-route colophon of build tools/methods for case-study pages.
 */
export default function Footer() {
  const t = useT();
  const { pathname } = useLocation();
  // Production (vercel.json: "trailingSlash": true) serves every route with
  // a trailing slash, so a full page load or refresh on e.g. /about lands on
  // /about/ - strip it before comparing, the same idiom Navbar.tsx and
  // usePageTitle.ts already use, or a direct visit never matches either
  // lookup below.
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const hasAuthoredClose =
    normalizedPath === "/" ||
    normalizedPath === "/about" ||
    normalizedPath.startsWith("/case-study/") ||
    normalizedPath.startsWith("/riso/");

  return (
    <footer
      id="site-footer"
      className={`site-footer${hasAuthoredClose ? " site-footer--compact" : ""}`}
    >
      <div className="site-footer__base">
        <div className="site-footer__baseRow">
          <p>© 2026 Hillary Esposito</p>
          <nav className="site-footer__links" aria-label={t("footer.connect")}>
            <a href="mailto:espositohillary@gmail.com">{t("footer.email")}</a>
            <a
              href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("nav.resumeAria")}
            >
              <span className="rp-ext">{t("nav.resume")}</span>
            </a>
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
          </nav>
        </div>
      </div>
    </footer>
  );
}
