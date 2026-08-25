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
                    Hillary Esposito, Healthcare Product Designer
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
                    <span>Healthcare Product Designer</span>
                    <span>Enterprise workflows · service design · research</span>
                    <span>Currently freelancing</span>
                  </div>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">In one line</p>
                  <p>At MSK, a clinical workflow I initiated contributed to a 20% organization-wide electronic medical record cost reduction. I bring 13+ years in healthcare and medical logistics to product decisions, with service design and research built in.</p>
                </section>

                <section className="recruiter-panel__section">
                  <p className="recruiter-panel__label">Selected work</p>
                  <ul className="recruiter-panel__projects">
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                        <strong>MSK · A filing queue replaced a four-system workaround</strong>
                        <span>Mapped across clinical, IT, imaging, and operations; the workflow I initiated contributed to a 20% organization-wide electronic medical record cost reduction</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/logistics")}>
                        <strong>Medical logistics · Resupply time reduced 85%</strong>
                        <span>Redesigned an end-to-end supply service for 5,000+ soldiers across seven aid stations; shared tracking also reduced spending 60%</span>
                      </button>
                    </li>
                    <li>
                      <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/grove")}>
                        <strong>Grove · Eleven features became three</strong>
                        <span>Functional prototype, Phase 2 of 3; a 34-person self-report survey narrowed the next build from eleven features to three</span>
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
