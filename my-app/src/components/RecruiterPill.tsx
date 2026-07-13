// src/components/RecruiterPill.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import { useT } from "../app/LanguageContext";
import { FileTextIcon, MailIcon, BriefcaseIcon, UserIcon, XIcon } from "./LineIcons";

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
              lang="en"
            >
              <header className="recruiter-panel__header">
                <div>
                  <p className="recruiter-panel__eyebrow">90-second tour</p>
                  <h2 id="recruiter-panel-title" className="recruiter-panel__title">
                    Hillary Esposito, UX & Product Designer
                  </h2>
                </div>
                <button
                  type="button"
                  className="recruiter-panel__close"
                  onClick={() => setOpen(false)}
                  aria-label="Close recruiter view"
                >
                  <XIcon />
                </button>
              </header>

              <div className="recruiter-panel__body">
                <section className="recruiter-panel__section recruiter-panel__vitals">
                  <div className="recruiter-panel__vitals-grid">
                    <span>UX/Product Designer</span>
                    <span>Healthcare + internal tools</span>
                    <span>Currently freelancing</span>
                  </div>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">In one line</p>
                  <p>UX/Product Designer for AI-enabled workflows, healthcare systems, and complex data-heavy products.</p>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">Strengths</p>
                  <div className="recruiter-panel__chips">
                    {["Healthcare Systems UX", "Internal Tools", "AI Judgment", "Army\u00a0Veteran"].map((s) => (
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
                        <span>32-user survey reshaped the MVP; AI override log; working prototype ready for moderated testing</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                        <strong>MSK Cancer Center</strong>
                        <span>Dashboard-to-online-EMR workflow redesign; user roles, permissions, workflow states, 20% EMR cost reduction</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/good-harvest")}>
                        <strong>Good Harvest</strong>
                        <span>22-user Maze testing across 3 rounds; redesigned around trust, not discoverability</span>
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
                     rel="noopener noreferrer"
                     aria-label="Download resume (opens in new tab)">
                    <FileTextIcon className="recruiter-panel__btn-icon" /> Download resume
                  </a>
                  <a className="recruiter-panel__btn"
                     href="mailto:espositohillary@gmail.com">
                    <MailIcon className="recruiter-panel__btn-icon" /> Email me
                  </a>
                  <a className="recruiter-panel__btn"
                     href="https://www.linkedin.com/in/hillaryesposito/"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="LinkedIn (opens in new tab)">
                    <BriefcaseIcon className="recruiter-panel__btn-icon" /> LinkedIn
                  </a>
                  <button type="button" className="recruiter-panel__btn"
                     onClick={() => go("/about")}>
                    <UserIcon className="recruiter-panel__btn-icon" /> About me
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
