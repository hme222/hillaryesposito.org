// src/components/Navbar.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

// Scrolls to a section anchor on the home page.
// If already on "/", scrolls directly.
// If on a subpage (e.g. a case study), navigates home first then scrolls.
function useAnchorNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (id: string) => {
    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = 80; // keep in sync with your navbar height
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
      // Go home, wait for render, then scroll
      navigate("/");
      setTimeout(scroll, 150);
    }
  };
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const navigate = useNavigate();
  const scrollToAnchor = useAnchorNav();

  function close() {
    setMenuOpen(false);
  }

  function handleAnchor(id: string) {
    close();
    scrollToAnchor(id);
  }

  return (
    <nav className="navbar" aria-label="Primary navigation">
      {/* Logo — always goes home and scrolls to top */}
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
            src="assets/logo-cat.png"
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
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((m) => !m)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        {/* HOME — scroll to #home anchor */}
        <li>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleAnchor("home")}
          >
            HOME
          </button>
        </li>

        {/* PROJECTS — scroll to #projects anchor on home page */}
        <li>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleAnchor("projects")}
          >
            PROJECTS
          </button>
        </li>

        {/* ABOUT — scroll to #about anchor on home page */}
        <li>
          <button
            type="button"
            className="nav-link nav-link--about"
            onClick={() => handleAnchor("about")}
          >
            ABOUT
          </button>
        </li>

        {/* CONTACT — scroll to #contact anchor on home page */}
        <li>
          <button
            type="button"
            className="nav-link"
            onClick={() => handleAnchor("contact")}
          >
            CONTACT
          </button>
        </li>

        {/* Theme toggle */}
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
