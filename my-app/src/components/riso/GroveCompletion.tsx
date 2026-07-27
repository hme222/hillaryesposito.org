import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";

const DISMISSED_KEY = "grove-journal-close-dismissed";

export default function GroveCompletion() {
  const [open, setOpen] = useState(false);
  const [shareMsg, setShareMsg] = useState("");

  const close = useCallback(() => {
    setOpen(false);
    try { window.sessionStorage.setItem(DISMISSED_KEY, "1"); } catch {}
  }, []);

  // User-triggered only ("Open the closing entry") — no auto-open on scroll, so a
  // reader who already finished isn't interrupted by a focus-stealing modal.
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Grove — a case study by Hillary Esposito", url });
        setShareMsg("Thanks for sharing.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
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

  return (
    <>
      <div className="rp-completionTrigger" id="grove-complete">
        <span>Journal entry complete.</span>
        <button type="button" onClick={() => setOpen(true)}>Open the closing entry</button>
      </div>
      <Modal isOpen={open} onClose={close} labelledBy="grove-complete-title" className="rp-completion">
        <div className="rp-completion__arc" aria-hidden="true" />
        <button className="rp-completion__close" type="button" onClick={close} aria-label="Close completion note">×</button>
        <p className="rp-kicker">100% · journal entry complete</p>
        <h2 id="grove-complete-title">You made it through the weeds.</h2>
        <p>Grove is still growing. The judgment underneath it is already doing the useful part.</p>
        <div className="rp-completion__actions">
          <Link to="/case-study/msk" onClick={close}>Next: Memorial Sloan Kettering →</Link>
          <button type="button" onClick={share}>Share this case study</button>
        </div>
        <p className="rp-completion__shareMsg" role="status" aria-live="polite">{shareMsg}</p>
      </Modal>
    </>
  );
}
