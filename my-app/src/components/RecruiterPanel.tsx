// src/components/RecruiterPanel.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { FileTextIcon, MailIcon, BriefcaseIcon, UserIcon, XIcon } from "./LineIcons";
import AskBirdIcon from "./ask/AskBirdIcon";

/**
 * A slide-out panel with a 90-second project breakdown. It has no trigger of
 * its own - the route dock dropped the floating "Recruiter view" pill, so
 * this just listens for the global `open-recruiter-panel` event and renders
 * the panel. Current dispatchers: the Ask dialog's "The 90-second version"
 * link (components/ask/AskDialog.tsx); any future one (e.g. a hero banner)
 * can dispatch the same event without this component changing.
 */
/**
 * @status: stable
 * @purpose: Recruiter panel (mounted in app/App.tsx) - a modal summarizing selected case studies and contact links. Renders only the panel; it listens for the global `open-recruiter-panel` CustomEvent rather than owning a trigger of its own (the route dock replaced the old floating "Recruiter view" pill with the Ask dialog's "The 90-second version" link).
 */
export default function RecruiterPanel() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [returnFocus, setReturnFocus] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      setReturnFocus((e as CustomEvent<{ returnFocus?: HTMLElement | null }>).detail?.returnFocus ?? null);
      setOpen(true);
    };
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
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      labelledBy="recruiter-panel-title"
      className="recruiter-panel"
      lang="en"
      returnFocus={returnFocus}
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
            <p>At MSK, a clinical workflow I initiated contributed to a larger initiative that cut organization-wide electronic medical record costs 20%. I bring 13+ years in healthcare and medical logistics to product decisions, with service design and research built in.</p>
          </section>

          <section className="recruiter-panel__section">
            <p className="recruiter-panel__label">Selected work</p>
            <ul className="recruiter-panel__projects">
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                  <strong>MSK · A filing queue replaced a four-department paper detour</strong>
                  <span>Mapped across clinical, IT, imaging, and operations; the workflow I initiated contributed to a larger initiative that cut organization-wide electronic medical record costs 20%</span>
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
            <button type="button" className="recruiter-panel__btn"
               onClick={() => {
                 // Close this panel and hand the Ask dialog the same
                 // return-focus target this panel was given - see
                 // AskDialog's symmetric handoff for the "90-second version"
                 // link for why this stays an explicit value rather than
                 // null.
                 setOpen(false);
                 window.dispatchEvent(
                   new CustomEvent("open-ask", { detail: { entry: "recruiter", returnFocus } })
                 );
               }}>
              <AskBirdIcon className="recruiter-panel__btn-icon recruiter-panel__btn-icon--bird" /> Ask a question
            </button>
          </section>

          {/* Visible, selectable address so the mailto never silent-fails. */}
          <p className="recruiter-panel__email">
            or copy: <a href="mailto:espositohillary@gmail.com">espositohillary@gmail.com</a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
