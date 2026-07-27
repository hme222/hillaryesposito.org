// src/components/RecruiterPill.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useLanguage, useT } from "../app/LanguageContext";
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
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  // Keep the utility out of every opening composition. It appears only after
  // the reader has moved beyond the hero, where it no longer competes with the
  // page's authored hierarchy.
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

  // Escape, scroll-lock, background inertness, and focus restore-to-trigger are
  // all handled natively by <Modal>'s <dialog> - no manual effects needed here.

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        type="button"
        className={`recruiter-pill${scrolled ? "" : " recruiter-pill--unscrolled"}`}
        onClick={() => setOpen(true)}
        aria-label={t("recruiter.pillAria")}
      >
        {/* Panel content stays English in Phase 1 - only the trigger translates. */}
        <span className="recruiter-pill__text">{t("recruiter.pill")}{lang === "es" ? " · EN" : ""}</span>
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        labelledBy="recruiter-panel-title"
        className="recruiter-panel"
        lang="en"
      >
        {/* Panel content stays English in Phase 1 - only the trigger translates. */}
        <div className="recruiter-panel__inner">
              <header className="recruiter-panel__header">
                <div>
                  <p className="recruiter-panel__eyebrow">90-second tour</p>
                  <h2 id="recruiter-panel-title" className="recruiter-panel__title">
                    Hillary Esposito, Product Designer
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
                    <span>Product Designer</span>
                    <span>Trustworthy workflows + consumer products</span>
                    <span>Currently freelancing</span>
                  </div>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">In one line</p>
                  <p>I design products people have to trust, pairing research rigor with AI judgment and consumer craft.</p>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">Strengths</p>
                  <div className="recruiter-panel__chips">
                    {["Product Research", "Workflow Systems", "AI Judgment", "Consumer Craft"].map((s) => (
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
                        <span>Phase-2 functional prototype; core flows ready for moderated testing; social prototype not yet built</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                        <strong>MSK Cancer Center</strong>
                        <span>Dashboard-to-online-EMR workflow redesign; user roles, permissions, workflow states; contributed to a 20% EMR cost reduction</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/mobbin")}>
                        <strong>Mobbin</strong>
                        <span>200+ screens across three finance apps; production-ready flow documentation and consumer pattern curation</span>
                      </button>
                    </li>
                  </ul>
                </section>

                {/* Targeted role pages are intentionally unlisted here. The
                    /curated/:slug routes still resolve, so a tailored page can
                    be shared with a specific recruiter by direct link - but the
                    public panel never reveals who is being targeted. */}

                <section className="recruiter-panel__section recruiter-panel__actions">
                  <a className="recruiter-panel__btn recruiter-panel__btn--primary"
                     href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="View résumé (opens in new tab)">
                    <FileTextIcon className="recruiter-panel__btn-icon" /> View résumé
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

                {/* Visible, selectable address so the mailto never silent-fails. */}
                <p className="recruiter-panel__email">
                  or copy: <a href="mailto:espositohillary@gmail.com">espositohillary@gmail.com</a>
                </p>
              </div>
        </div>
      </Modal>
    </>
  );
}
