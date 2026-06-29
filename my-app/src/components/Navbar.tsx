import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();

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

  const isOnCaseStudy = location.pathname.startsWith("/case-study");

  function navClass(section: string) {
    if (section === "projects" && isOnCaseStudy) return "nav-link is-active";
    if (activeSection === section) return "nav-link is-active";
    return "nav-link";
  }

  return (
    <nav className="navbar" aria-label="Primary navigation">
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
        <svg className="logo-mark" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
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
        className="hamburger"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-menu"
        onClick={() => setMenuOpen((m) => !m)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && <div className="nav-overlay-backdrop" aria-hidden="true" onClick={close} />}

      <ul
        id="primary-menu"
        className={`nav-menu ${menuOpen ? "open" : ""}`}
      >
        <li>
          <button
            type="button"
            className={navClass("home")}
            onClick={() => scrollToSection("home")}
          >
            HOME
          </button>
        </li>

        <li>
          <button
            type="button"
            className={navClass("projects")}
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
