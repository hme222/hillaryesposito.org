// src/components/Footer.tsx
import React, { useState } from "react";
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
/**
 * Every entry must be traceable to something the case study itself states.
 * Grove's list is literal build tooling. MSK and Mobbin did not ship from a
 * toolchain worth listing, so theirs credit the methods and materials those
 * pages already claim — never a tool Hillary has not said she used.
 */
const COLOPHONS: Record<string, Array<{ icon: string; label: string }>> = {
  "/case-study/grove": [
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
  "/case-study/msk": [
    { icon: "📋", label: "current-state maps" },
    { icon: "👀", label: "shadowing real shifts" },
    { icon: "📈", label: "Lean Six Sigma" },
    { icon: "🎓", label: "an MHA" },
    { icon: "🗂️", label: "the sticky notes that told the truth" },
    { icon: "🤝", label: "clinical, IT, and operations in one room" },
    { icon: "🏥", label: "six years on the floor" },
    { icon: "☕", label: "caffeine" },
  ],
  "/case-study/mobbin": [
    { icon: "📱", label: "3 live finance apps" },
    { icon: "🖼️", label: "200+ screens" },
    { icon: "🏷️", label: "Mobbin’s vocabulary" },
    { icon: "✂️", label: "an editor, not a camera" },
    { icon: "🗓️", label: "4 months" },
    { icon: "☕", label: "caffeine" },
  ],
};

export default function Footer() {
  const t = useT();
  const { pathname } = useLocation();
  const credits = COLOPHONS[pathname];
  // Auto-moving content needs a way to stop it (WCAG 2.2.2). Hover-pause alone
  // does not serve keyboard or touch, so the banner carries a real control.
  // Reduced-motion users never see it move; the button is harmless there.
  const [paused, setPaused] = useState(false);
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
        {credits && (
          <div className={`site-footer__madeWith${paused ? " is-paused" : ""}`}>
            <p className="site-footer__madeWithLabel">Made with:</p>
            <div className="site-footer__marquee">
              {/* The first copy is the real list. The second exists only so the
                  scroll can loop seamlessly, so it is hidden from the a11y tree
                  rather than announced twice. */}
              <ul className="site-footer__track">
                {credits.map((c) => (
                  <li key={c.label}>
                    <span aria-hidden="true">{c.icon}</span> {c.label}
                  </li>
                ))}
              </ul>
              <ul className="site-footer__track" aria-hidden="true">
                {credits.map((c) => (
                  <li key={`dup-${c.label}`}>
                    <span>{c.icon}</span> {c.label}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              className="site-footer__marqueeToggle"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              {paused ? "Play" : "Pause"}
              <span className="sr-only"> the credits banner</span>
            </button>
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
