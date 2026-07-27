import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

type Props = {
  project: string;
  completionLabel: string;
  title: string;
  body: string;
  nextLabel: string;
  nextPath: string;
};

export default function CaseStudyCompletion({
  project,
  completionLabel,
  title,
  body,
  nextLabel,
  nextPath,
}: Props) {
  const [open, setOpen] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const storageKey = `${project.toLowerCase().replace(/\s+/g, "-")}-case-study-complete`;

  const close = useCallback(() => {
    setOpen(false);
    try { window.sessionStorage.setItem(storageKey, "1"); } catch {}
  }, [storageKey]);

  // The closing entry is user-triggered only ("Open the closing entry"). A reader
  // who has already reached the end shouldn't have a modal open itself and steal
  // their focus, so there is no auto-open on scroll.

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: `${project} — a case study by Hillary Esposito`, url: window.location.href });
        setShareMsg("Thanks for sharing.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareMsg("Link copied to your clipboard.");
      } else {
        setShareMsg("Couldn’t open share — copy the link from your address bar.");
      }
    } catch (err) {
      // User dismissed the share sheet — don't claim it was shared.
      if ((err as Error)?.name === "AbortError") { setShareMsg(""); return; }
      setShareMsg("Couldn’t open share — copy the link from your address bar.");
    }
  };

  const id = `${project.toLowerCase().replace(/\s+/g, "-")}-complete-title`;

  return (
    <>
      <div className="rp-completionTrigger" id={`${project.toLowerCase()}-complete`}>
        <span>{completionLabel}</span>
        <button type="button" onClick={() => setOpen(true)}>Open the closing entry</button>
      </div>
      <Modal isOpen={open} onClose={close} labelledBy={id} className="rp-completion">
        <div className="rp-completion__arc" aria-hidden="true" />
        <button className="rp-completion__close" type="button" onClick={close} aria-label="Close completion entry">×</button>
        <p className="rp-kicker">100% · {completionLabel}</p>
        <h2 id={id}>{title}</h2>
        <p>{body}</p>
        <div className="rp-completion__actions">
          <Link to={nextPath} onClick={close}>Next: {nextLabel} →</Link>
          <button type="button" onClick={share}>Share this case study</button>
        </div>
        <p className="rp-completion__shareMsg" role="status" aria-live="polite">{shareMsg}</p>
      </Modal>
    </>
  );
}
