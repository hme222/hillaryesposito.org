import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();

  function close() {
    setMenuOpen(false);
  }

  // Handle anchor clicks — scroll on home, navigate then scroll on subpages
  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    close();
    const isHome =
      location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/index.html";

    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      e.preventDefault();
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const navHeight = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 150);
    }
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
        {imgVisible && (
          <img
            src="/assets/logo-cat.png"
            alt="Hillary Esposito Logo"
            onError={() => setImgVisible(false)}
          />
        )}
        <span className="logo-text">HILLARY</span>
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
        <li className="nav-close-row">
          <button
            type="button"
            className="nav-close-btn"
            aria-label="Close menu"
            onClick={close}
          >
            ✕
          </button>
        </li>

        <li>
          <a
            href="#home"
            className={navClass("home")}
            onClick={(e) => handleAnchorClick(e, "home")}
          >
            HOME
          </a>
        </li>

        <li>
          <a
            href="#projects"
            className={navClass("projects")}
            onClick={(e) => handleAnchorClick(e, "projects")}
          >
            PROJECTS
          </a>
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
          <a
            href="#contact"
            className={navClass("contact")}
            onClick={(e) => handleAnchorClick(e, "contact")}
          >
            CONTACT
          </a>
        </li>

        <li>
          <a
            href="/assets/Hillary-Esposito-Resume.pdf"
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
