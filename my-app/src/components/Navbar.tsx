// src/components/Navbar.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <nav className="navbar" aria-label="Primary navigation">
      <button
        className="logo"
        onClick={() => {
          setMenuOpen(false);
          navigate("/");
        }}
        aria-label="Go to home"
        type="button"
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

      <button
        className="hamburger"
        onClick={() => setMenuOpen((m) => !m)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        type="button"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)} className="nav-link">
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="nav-link nav-link--about"
          >
            ABOUT
          </Link>
        </li>

        <li>
          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            className="nav-link"
          >
            PROJECTS
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="nav-link"
          >
            CONTACT
          </Link>
        </li>
        <li>
          <button
            className="theme-btn"
            onClick={() => {
              setDarkMode((d) => !d);
              setMenuOpen(false);
            }}
            aria-label="Toggle dark/light theme"
            type="button"
          >
            🌓
          </button>
        </li>
      </ul>
    </nav>
  );
}
