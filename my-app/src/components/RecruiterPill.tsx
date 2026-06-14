// src/components/RecruiterPill.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FocusTrap from "focus-trap-react";

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
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  // Return focus to trigger when panel closes
  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
    }
  }, [open]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="recruiter-pill"
        onClick={() => setOpen(true)}
        aria-label="Open recruiter view: 90-second project breakdown"
      >
        <span className="recruiter-pill__text">Recruiter view</span>
      </button>

      {open && (
        <FocusTrap focusTrapOptions={{ allowOutsideClick: true, escapeDeactivates: false }}>
          <div>
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
                    Hillary Esposito, Product Design
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
                  <p>Product designer with 8 years in healthcare and military operations. Lean Six Sigma rigor applied to UX research. Knows where AI fits in complex workflows.</p>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">Strengths</p>
                  <div className="recruiter-panel__chips">
                    {["Product Design", "UX Research", "Healthcare UX", "Lean Six Sigma", "Systems Thinking", "Accessibility (WCAG)"].map((s) => (
                      <span key={s} className="recruiter-panel__chip">{s}</span>
                    ))}
                  </div>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">Selected work</p>
                  <ul className="recruiter-panel__projects">
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/grove")}>
                        <strong>Grove</strong>
                        <span>End-to-end product design: research, personas, UI, shipped app</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                        <strong>MSK Cancer Center</strong>
                        <span>6 years redesigning workflows for 21,000+ clinicians</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/good-harvest")}>
                        <strong>Good Harvest</strong>
                        <span>Mobile UX validated with heatmap testing, 22 participants</span>
                      </button>
                    </li>
                  </ul>
                </section>

                <section className="recruiter-panel__section recruiter-panel__actions">
                  <a className="recruiter-panel__btn recruiter-panel__btn--primary"
                     href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
                     target="_blank"
                     rel="noopener noreferrer">
                    📄 Download resume
                  </a>
                  <a className="recruiter-panel__btn"
                     href="mailto:espositohillary@gmail.com">
                    ✉️ Email me
                  </a>
                  <button type="button" className="recruiter-panel__btn"
                     onClick={() => go("/about")}>
                    👤 About me
                  </button>
                </section>
              </div>
            </aside>
          </div>
        </FocusTrap>
      )}
    </>
  );
}
