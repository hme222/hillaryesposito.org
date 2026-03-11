// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-social">
        <a
          href="https://www.linkedin.com/in/hillaryesposito/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-btn"
          aria-label="Visit my LinkedIn profile"
        >
          LinkedIn
        </a>
      </div>

      <p>© 2026 Hillary Esposito</p>
    </footer>
  );
}