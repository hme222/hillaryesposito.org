// src/components/RecruiterPill.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import { useT } from "../app/LanguageContext";

/**
 * Persistent floating "Recruiter view" pill that appears on every page.
 * Click → opens a slide-out panel with a 90-second project breakdown.
 *
 * Listens for the global `open-recruiter-panel` event so other components
 * (e.g. the hero banner) can open the same panel.
 */
export default function RecruiterPill() {
  const navigate = useNavigate();
  const t = useT();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // On small screens the fixed pill lands on top of the hero copy, so it stays
  // hidden until the user scrolls (CSS gates the hiding to ≤768px — desktop
  // keeps its always-on position).
  const [scrolled, setScrolled] = useState(() => window.scrollY > 120);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Return focus to the trigger only on an actual open→close transition —
  // never on initial mount (which would steal focus/scroll to the pill on load).
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!open && wasOpen.current) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
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
        className={`recruiter-pill${scrolled ? "" : " recruiter-pill--unscrolled"}`}
        onClick={() => setOpen(true)}
        aria-label={t("recruiter.pillAria")}
      >
        {/* Panel content stays English in Phase 1 — only the trigger translates. */}
        <span className="recruiter-pill__text">{t("recruiter.pill")}</span>
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
                    Hillary Esposito, UX/Product Designer
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
                <section className="recruiter-panel__section recruiter-panel__vitals">
                  <div className="recruiter-panel__vitals-grid">
                    <span>13+ years leadership</span>
                    <span>MHA, Rutgers</span>
                    <span>Remote &amp; hybrid</span>
                    <span>Currently freelancing</span>
                  </div>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">In one line</p>
                  <p>UX/Product Designer turning complex healthcare, enterprise, and AI workflows into trusted digital products. 21K+ clinicians impacted at MSK. Army veteran.</p>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">Strengths</p>
                  <div className="recruiter-panel__chips">
                    {["UX & Product Design", "Service Design", "Healthcare Systems", "Process Improvement", "Lean Six Sigma", "AI-Augmented Workflows", "Bilingual EN/ES"].map((s) => (
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
                        <span>End-to-end product design: 32-user survey, AI judgment, working prototype</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                        <strong>MSK Cancer Center</strong>
                        <span>Led the workflow redesign behind a 20% EMR cost reduction, 70% efficiency gain, 21K+ clinicians</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/good-harvest")}>
                        <strong>Good Harvest</strong>
                        <span>Heatmap-validated mobile UX, 22 participants, 3 test rounds</span>
                      </button>
                    </li>
                  </ul>
                </section>

                {/* Targeted role pages are intentionally unlisted here. The
                    /curated/:slug routes still resolve, so a tailored page can
                    be shared with a specific recruiter by direct link — but the
                    public panel never reveals who is being targeted. */}

                <section className="recruiter-panel__section recruiter-panel__actions">
                  <a className="recruiter-panel__btn recruiter-panel__btn--primary"
                     href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
                     target="_blank"
                     rel="noopener noreferrer">
                    <span aria-hidden="true">📄</span> Download resume
                  </a>
                  <a className="recruiter-panel__btn"
                     href="mailto:espositohillary@gmail.com">
                    <span aria-hidden="true">✉️</span> Email me
                  </a>
                  <a className="recruiter-panel__btn"
                     href="https://www.linkedin.com/in/hillaryesposito/"
                     target="_blank"
                     rel="noopener noreferrer">
                    <span aria-hidden="true">💼</span> LinkedIn
                  </a>
                  <button type="button" className="recruiter-panel__btn"
                     onClick={() => go("/about")}>
                    <span aria-hidden="true">👤</span> About me
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
