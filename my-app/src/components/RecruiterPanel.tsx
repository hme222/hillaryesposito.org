// src/components/RecruiterPanel.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { FileText, Mail, Briefcase, User, X } from "lucide-react";
import AskBirdIcon from "./ask/AskBirdIcon";
import { ASK_ENABLED } from "./ask/askEnabled";

/**
 * A slide-out panel with a 90-second project breakdown. It has no trigger of
 * its own - the route dock dropped the floating "Recruiter view" pill, so
 * this just listens for the global `open-recruiter-panel` event and renders
 * the panel. Current dispatchers, all the same "Open the 90-second tour"
 * text and event shape: the Ask dialog's own link
 * (components/ask/AskDialog.tsx), the home hero's quiet utility link
 * (pages/RisoHome.tsx), and the breadcrumb row on every case-study page,
 * the Spanish case-study component, and About - any future one can
 * dispatch the same event without this component changing.
 */
/**
 * @status: stable
 * @purpose: Recruiter panel (mounted in app/App.tsx) - a modal summarizing selected case studies and contact links. Renders only the panel; it listens for the global `open-recruiter-panel` CustomEvent rather than owning a trigger of its own (the route dock replaced the old floating "Recruiter view" pill with the Ask dialog's "Open the 90-second tour" link).
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
      focusLabelOnOpen
    >
      {/* Panel content stays English in Phase 1 - only the trigger translates. */}
      <div className="recruiter-panel__inner">
        <header className="recruiter-panel__header">
          <div>
            <p className="recruiter-panel__eyebrow">90-second tour</p>
            {/* Explicit break at the real phrase boundary (name, then role) -
                CLAUDE.md bans a headline that wraps into an orphaned single
                word on its own line, which plain wrapping did here at both
                1440 and 390 (the panel is a fixed-width slide-out, so its
                content column is roughly the same measure at every
                viewport). The CSS clamp on `.recruiter-panel__title` keeps
                "Healthcare Product Designer" itself on one line at the
                panel's narrowest width instead of this break accidentally
                creating its own second, three-line wrap. */}
            <h2 id="recruiter-panel-title" className="recruiter-panel__title" tabIndex={-1}>
              Hillary Esposito,<br />Healthcare Product Designer
            </h2>
          </div>
          <button
            type="button"
            className="recruiter-panel__close"
            onClick={() => setOpen(false)}
            aria-label="Close the 90-second tour"
          >
            <X size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" />
          </button>
        </header>

        <div className="recruiter-panel__body">
          <section className="recruiter-panel__section recruiter-panel__vitals">
            <div className="recruiter-panel__vitals-grid">
              <span>Enterprise workflows · service design · research</span>
              <span>Currently freelancing</span>
            </div>
          </section>

          <section className="recruiter-panel__section recruiter-panel__intro" aria-labelledby="recruiter-panel-intro-title">
            <h3 className="recruiter-panel__label" id="recruiter-panel-intro-title">In one line</h3>
            <p>I turn complex healthcare workflows into testable product decisions. That judgment comes from six years at MSK and 13+ years of Army service.</p>
          </section>

          {/* Résumé and email are the two hiring actions. Keeping only this
              pair before the work makes the first project visible in the
              initial mobile viewport; broader exploration follows the work. */}
          <section className="recruiter-panel__section recruiter-panel__primaryActionsSection" aria-label="Hiring actions">
            <div className="recruiter-panel__primaryActions">
              <a className="recruiter-panel__btn recruiter-panel__btn--primary"
                 href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="View résumé (opens in new tab)">
                <FileText className="recruiter-panel__btn-icon" size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" /> View résumé
              </a>
              <a className="recruiter-panel__btn"
                 href="mailto:espositohillary@gmail.com">
                <Mail className="recruiter-panel__btn-icon" size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" /> Email me
              </a>
            </div>
            {/* Visible, selectable address so the mailto never silent-fails. */}
            <p className="recruiter-panel__email">
              or copy: <a href="mailto:espositohillary@gmail.com">espositohillary@gmail.com</a>
            </p>
          </section>

          <section className="recruiter-panel__section" aria-labelledby="recruiter-panel-selected-title">
            <h3 className="recruiter-panel__label" id="recruiter-panel-selected-title">Selected work</h3>
            <ul className="recruiter-panel__projects">
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/msk")}>
                  <strong>MSK · A filing queue replaced a four-department paper detour</strong>
                  <span className="recruiter-panel__project-proof">Mapped the workflow across clinical, IT, document imaging, and operations.</span>
                  <span className="recruiter-panel__project-status">I initiated the workflow. MSK’s IT and UX teams implemented it later; the 20% result belongs to the larger initiative.</span>
                </button>
              </li>
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/grove")}>
                  <strong>Grove · Twelve features became three</strong>
                  <span className="recruiter-panel__project-proof">An exploratory 5-user test and 37-person self-report survey narrowed the next build from twelve features to three.</span>
                  <span className="recruiter-panel__project-status">Functional prototype, Phase 2 of 3. Retest pending.</span>
                </button>
              </li>
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/knowunity")}>
                  <strong>Knowunity · The student's own words are the proof</strong>
                  <span className="recruiter-panel__project-proof">Solo 2.5-week design sprint with a coded prototype and Storybook catalog, reviewed by Knowunity.</span>
                  <span className="recruiter-panel__project-status">Built from Knowunity’s brief and component kit. No student testing; not shipped.</span>
                </button>
              </li>
            </ul>
          </section>

          <section className="recruiter-panel__section" aria-labelledby="recruiter-panel-supporting-title">
            <h3 className="recruiter-panel__label" id="recruiter-panel-supporting-title">Supporting evidence</h3>
            <ul className="recruiter-panel__projects">
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/logistics")}>
                  <strong>Operational delivery · Medical logistics · Resupply went from months to weeks</strong>
                  <span className="recruiter-panel__project-proof">Redesigned an end-to-end supply service for 5,000+ soldiers across seven aid stations; shared tracking also reduced spending 60%.</span>
                  <span className="recruiter-panel__project-status">Owner-reported outcomes; original measurement periods and methods are not preserved.</span>
                </button>
              </li>
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/ux-woman")}>
                  <strong>UX Woman · Six healthcare interviews, one hypothesis</strong>
                  <span className="recruiter-panel__project-proof">Six roles surfaced one repeated gap: staff and patients cannot see who owns the next step.</span>
                  <span className="recruiter-panel__project-status">Working hypothesis. Five pretotypes designed; none run.</span>
                </button>
              </li>
              <li>
                <button type="button" className="recruiter-panel__project" onClick={() => go("/case-study/mobbin")}>
                  <strong>Mobbin · 200+ screens per app, searchable by task</strong>
                  <span className="recruiter-panel__project-proof">Captured, sequenced, annotated, and labeled Kikoff, Polymarket, and Discover during a four-month contract.</span>
                  <span className="recruiter-panel__project-status">Documentation and taxonomy work. I did not design the source products.</span>
                </button>
              </li>
            </ul>
          </section>

          <section className="recruiter-panel__section recruiter-panel__actions recruiter-panel__actions--secondary" aria-labelledby="recruiter-panel-more-title">
            <h3 className="recruiter-panel__label" id="recruiter-panel-more-title">More ways to explore</h3>
            <a className="recruiter-panel__btn"
               href="https://www.linkedin.com/in/hillaryesposito/"
               target="_blank"
               rel="noopener noreferrer"
               aria-label="LinkedIn (opens in new tab)">
              <Briefcase className="recruiter-panel__btn-icon" size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" /> LinkedIn
            </a>
            <button type="button" className="recruiter-panel__btn"
               onClick={() => go("/about")}>
              <User className="recruiter-panel__btn-icon" size="1em" strokeWidth={1.6} aria-hidden="true" focusable="false" /> About me
            </button>
            {ASK_ENABLED && <button type="button" className="recruiter-panel__btn"
               onClick={() => {
                 // Close this panel and hand the Ask dialog the same
                 // return-focus target this panel was given - see
                 // AskDialog's symmetric handoff for the "Open the 90-second tour"
                 // link for why this stays an explicit value rather than
                 // null.
                 setOpen(false);
                 window.dispatchEvent(
                   new CustomEvent("open-ask", { detail: { entry: "recruiter", returnFocus } })
                 );
               }}>
              <AskBirdIcon className="recruiter-panel__btn-icon recruiter-panel__btn-icon--bird" /> Ask a question
            </button>}
          </section>
        </div>
      </div>
    </Modal>
  );
}
