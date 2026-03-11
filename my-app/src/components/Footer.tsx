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
          className="social-icon"
          aria-label="Visit my LinkedIn profile"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M20.45 20.45h-3.55v-5.6c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.7H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06s.92-2.06 2.06-2.06 2.06.92 2.06 2.06-.92 2.06-2.06 2.06zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
        </a>

        <a
          href="https://github.com/hme222"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Visit my GitHub"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.6.1.82-.26.82-.58v-2.03c-3.26.7-3.95-1.57-3.95-1.57-.55-1.39-1.35-1.76-1.35-1.76-1.1-.76.08-.75.08-.75 1.22.08 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.53 1 .1-.79.42-1.32.76-1.62-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.23-3.16-.12-.3-.53-1.53.12-3.2 0 0 1-.32 3.3 1.2a11.46 11.46 0 016 0c2.3-1.52 3.3-1.2 3.3-1.2.65 1.67.24 2.9.12 3.2.76.83 1.23 1.88 1.23 3.16 0 4.51-2.74 5.49-5.35 5.78.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.57A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
      </div>

      <p>© 2026 Hillary Esposito</p>
    </footer>
  );
}