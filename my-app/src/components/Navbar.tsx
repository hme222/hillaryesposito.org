import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

// Scrolls to a section anchor on the home page.
// If already on "/", scrolls directly.
// If on a subpage, navigates home first then scrolls.
function useAnchorNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const isHome =
      location.pathname === "/" ||
      location.pathname === "" ||
      location.pathname === "/index.html";

    if (isHome) {
      scroll();
    } else {
      navigate("/");
      setTimeout(scroll, 150);
    }
  };
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToAnchor = useAnchorNav();

  function close() {
    setMenuOpen(false);
  }

  function handleAnchor(id: string) {
    close();
    scrollToAnchor(id);
  }

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

  return (
    <nav className="navbar" aria-label="Primary navigation">
      {/* Logo */}
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

      {/* Hamburger */}
      <button
        className="hamburger"
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-menu"
        onClick={() => setMenuOpen((m) => !m)}
      >
        ☰
      </button>

      {/* Backdrop */}
      {menuOpen && <div className="nav-overlay-backdrop" onClick={close} />}

      <ul
        id="primary-menu"
        className={`nav-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        {/* Close button inside full-screen overlay */}
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
          <button
            type="button"
            className="nav-link"
            onClick={() => handleAnchor("home")}
          >
            HOME
          </button>
        </li>

        <li>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleAnchor("projects")}
          >
            PROJECTS
          </button>
        </li>

        {/* ABOUT now links to the About page route */}
        <li>
          <Link to="/about" className="nav-link nav-link--about" onClick={close}>
            ABOUT
          </Link>
        </li>

        <li>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleAnchor("contact")}
          >
            CONTACT
          </button>
        </li>

        {/* Resume button */}
        <li>
          <a
            href="/assets/Hillary-Esposito-Resume.pdf"
            className="nav-link nav-link--resume"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            RESUME
          </a>
        </li>

        <li>
          <button
            className="theme-btn"
            type="button"
            aria-label="Toggle dark/light theme"
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