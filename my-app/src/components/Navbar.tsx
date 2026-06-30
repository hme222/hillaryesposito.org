import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [floating, setFloating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  function close() {
    setMenuOpen(false);
  }

  // Same-page section nav, fully independent of the hash router.
  // These are <button>s (no href), so the router never intercepts them.
  // On the home page we scroll directly; from any other route we send the
  // user home with a ?scrollTo param that Home reads on mount.
  function scrollToSection(id: string) {
    close();
    const isHome =
      location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/index.html";

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

  // Track which section is in view on the home page
  useEffect(() => {
    const isHome =
      location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/index.html";
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sections = ["contact", "projects", "home"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
    <nav className={`navbar${floating ? " is-floating" : ""}`} aria-label="Primary navigation">
      <button
        className="logo"
        type="button"
        aria-label="Go to home"
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
          <span className="logo-tagline">UX &times; Process Improvement</span>
        </span>
      </button>

      <button
        ref={hamburgerRef}
        className="hamburger"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
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
            HOME
          </button>
        </li>

        <li>
          <button
            type="button"
            className={navClass("projects")}
            aria-current={activeSection === "projects" || isOnCaseStudy ? "true" : undefined}
            onClick={() => scrollToSection("projects")}
          >
            PROJECTS
          </button>
        </li>

        <li>
          <Link
            to="/about"
            className={`nav-link nav-link--about${location.pathname === "/about" ? " is-active" : ""}`}
            aria-current={location.pathname === "/about" ? "page" : undefined}
            onClick={close}
          >
            ABOUT
          </Link>
        </li>

        <li>
          <button
            type="button"
            className={navClass("contact")}
            onClick={() => scrollToSection("contact")}
          >
            CONTACT
          </button>
        </li>

        <li>
          <a
            href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
            className="nav-link nav-link--resume"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume (opens in new tab)"
            onClick={close}
          >
            RESUME
          </a>
        </li>

        <li>
          <button
            className="theme-btn"
            type="button"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => {
              setDarkMode((d) => !d);
              close();
            }}
          >
            🌓
          </button>
        </li>
      </ul>
    </nav>
  );
}
