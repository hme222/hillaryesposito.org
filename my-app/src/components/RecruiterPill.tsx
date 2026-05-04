// src/components/RecruiterPill.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Persistent floating "Recruiter view" pill that appears on every page.
 * Click → opens a slide-out panel with a 90-second project breakdown.
 *
 * Listens for the global `open-recruiter-panel` event so other components
 * (e.g. the hero banner) can open the same panel.
 */
export default function RecruiterPill() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-recruiter-panel", handler);
    return () => window.removeEventListener("open-recruiter-panel", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        type="button"
        className="recruiter-pill"
        onClick={() => setOpen(true)}
        aria-label="Open recruiter view: 90-second project breakdown"
      >
        <span className="recruiter-pill__text">Recruiter view</span>
      </button>

      {open && (
        <>
          <div className="recruiter-panel-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside
            className="recruiter-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-panel-title"
          >
            <header className="recruiter-panel__header">
              <div>
                <p className="recruiter-panel__eyebrow">90-second tour</p>
                <h2 id="recruiter-panel-title" className="recruiter-panel__title">
                  Hillary Esposito — UX/Design
                </h2>
              </div>
              <button
                type="button"
                className="recruiter-panel__close"
                onClick={() => setOpen(false)}
                aria-label="Close recruiter view"
              >
                ✕
              </button>
            </header>

            <div className="recruiter-panel__body">
              <section className="recruiter-panel__section">
                <p className="recruiter-panel__label">In one line</p>
                <p>Veteran turned UX designer — research-led, accessibility-first, and shipping working code.</p>
              </section>

              <section className="recruiter-panel__section">
                <p className="recruiter-panel__label">Strengths</p>
                <div className="recruiter-panel__chips">
                  {["UX Research", "Accessibility (WCAG)", "End-to-end UX", "Prototyping", "React + TypeScript", "Healthcare UX"].map((s) => (
                    <span key={s} className="recruiter-panel__chip">{s}</span>
                  ))}
                </div>
              </section>

              <section className="recruiter-panel__section">
                <p className="recruiter-panel__label">Selected work</p>
                <ul className="recruiter-panel__projects">
                  <li>
                    <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/good-harvest")}>
                      <strong>Good Harvest</strong>
                      <span>End-to-end mobile UX, validated with heatmaps + 22 testers</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/grove")}>
                      <strong>Grove</strong>
                      <span>AI + design — full-stack plant care app built with Claude Code + Cursor</span>
                    </button>
                  </li>
                </ul>
              </section>

              <section className="recruiter-panel__section recruiter-panel__actions">
                <a className="recruiter-panel__btn recruiter-panel__btn--primary"
                   href="/assets/Hillary-Esposito-Resume.pdf"
                   target="_blank"
                   rel="noopener noreferrer">
                  📄 Download resume
                </a>
                <a className="recruiter-panel__btn"
                   href="mailto:espositohillary@gmail.com">
                  ✉️ Email me
                </a>
              </section>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
