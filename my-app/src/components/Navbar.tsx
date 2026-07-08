import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage, useT } from "../app/LanguageContext";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [floating, setFloating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const isHome =
    location.pathname === "/" ||
    location.pathname === "" ||
    location.pathname === "/index.html";

  function close() {
    setMenuOpen(false);
  }

  // Same-page section nav, fully independent of the hash router.
  // These are <button>s (no href), so the router never intercepts them.
  // On the home page we scroll directly; from any other route we send the
  // user home with a ?scrollTo param that Home reads on mount.
  function scrollToSection(id: string) {
    close();
    if (!isHome) {
      navigate("/?scrollTo=" + id);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  // Track which section is in view on the home page. Sections can be taller than
  // the viewport, so an IntersectionObserver threshold is unreliable (30% of a
  // tall section is never visible at once) — instead pick the last section whose
  // top has scrolled above a reference line ~a third down the viewport.
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const ids = ["home", "about", "projects", "contact"];
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    close();
  }, [location.pathname]);

  // Condense into a centred floating island once scrolled past the top.
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: Escape to close (restoring focus to the toggle), move focus
  // into the menu on open, and trap Tab within it while it's open.
  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const focusables = menu
      ? Array.from(
          menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        )
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isOnCaseStudy = location.pathname.startsWith("/case-study");

  function navClass(section: string) {
    if (section === "projects" && isOnCaseStudy) return "nav-link is-active";
    if (activeSection === section) return "nav-link is-active";
    return "nav-link";
  }

  return (
    <nav className={`navbar${floating ? " is-floating" : ""}`} aria-label={t("nav.ariaPrimary")}>
      <button
        className="logo"
        type="button"
        aria-label={t("nav.logoAria")}
        onClick={() => {
          close();
          navigate("/");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <svg className="logo-mark" width="23" height="23" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M5 13.5 Q15.5 30 27.5 13 Q24 17 19 18.6 Q12 20.4 5 13.5 Z" fill="currentColor" />
          <circle className="lm-accent" cx="15.5" cy="10.2" r="3.1" />
        </svg>
        <span className="logo-divider" aria-hidden="true" />
        <span className="logo-textblock">
          <span className="logo-text">Hillary Esposito</span>
          <span className="logo-tagline">{t("nav.tagline")}</span>
        </span>
      </button>

      <button
        ref={hamburgerRef}
        className="hamburger"
        type="button"
        aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
        aria-expanded={menuOpen}
        aria-controls="primary-menu"
        onClick={() => setMenuOpen((m) => !m)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul
        ref={menuRef}
        id="primary-menu"
        className={`nav-menu ${menuOpen ? "open" : ""}`}
      >
        <li>
          <button
            type="button"
            className={navClass("home")}
            aria-current={activeSection === "home" ? "true" : undefined}
            onClick={() => scrollToSection("home")}
          >
            {t("nav.home")}
          </button>
        </li>

        <li>
          <Link
            to="/about"
            className={`nav-link nav-link--about${location.pathname === "/about" || activeSection === "about" ? " is-active" : ""}`}
            aria-current={location.pathname === "/about" ? "page" : activeSection === "about" ? "true" : undefined}
            onClick={close}
          >
            {t("nav.about")}
          </Link>
        </li>

        <li>
          <button
            type="button"
            className={navClass("projects")}
            aria-current={activeSection === "projects" || isOnCaseStudy ? "true" : undefined}
            onClick={() => scrollToSection("projects")}
          >
            {t("nav.projects")}
          </button>
        </li>

        <li>
          <button
            type="button"
            className={navClass("contact")}
            aria-current={activeSection === "contact" ? "true" : undefined}
            onClick={() => scrollToSection("contact")}
          >
            {t("nav.contact")}
          </button>
        </li>

        <li>
          <a
            href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
            className="nav-link nav-link--resume"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.resumeAria")}
            onClick={close}
          >
            {t("nav.resume")}
          </a>
        </li>

        <li>
          <button
            className="theme-btn"
            type="button"
            aria-label={darkMode ? t("nav.themeToLight") : t("nav.themeToDark")}
            onClick={() => {
              setDarkMode((d) => !d);
              close();
            }}
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2.2M12 19.8V22M4.22 4.22l1.56 1.56M18.22 18.22l1.56 1.56M2 12h2.2M19.8 12H22M4.22 19.78l1.56-1.56M18.22 5.78l1.56-1.56" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </li>

        <li>
          {/* Language toggle — shows the language you'd switch TO. The label
              (and lang attr) are in that target language so screen readers
              pronounce it correctly. */}
          <button
            className="theme-btn lang-btn"
            type="button"
            lang={lang === "en" ? "es" : "en"}
            aria-label={t("nav.langSwitch")}
            onClick={() => {
              setLang((l) => (l === "en" ? "es" : "en"));
              close();
            }}
          >
            {t("nav.langCode")}
          </button>
        </li>
      </ul>
    </nav>
  );
}
