import React, { useState } from "react";
import { useLanguage } from "../app/LanguageContext";

const ADDRESS = "espositohillary@gmail.com";

type Outcome = "copied" | "error" | null;

/**
 * @status: stable
 * @purpose: The email address shown as plain, selectable text with a "Copy" button beside it, used in the contact bands on Home and About so a reader without a mail client can paste the address elsewhere. Pick this to offer the address itself; for the mailto action use the regular "Email me" link, and for sharing a page use ShareCaseStudy. The button reports only what happened: copied, or where to select the text by hand.
 */
export default function CopyEmail() {
  const { lang } = useLanguage();
  const es = lang === "es";
  const [outcome, setOutcome] = useState<Outcome>(null);

  const copy = async () => {
    let next: Outcome = "error";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(ADDRESS);
        next = "copied";
      }
    } catch {
      next = "error";
    }
    setOutcome(next);
    window.setTimeout(() => setOutcome(null), 3200);
  };

  return (
    <div className="rp-copyEmail">
      <span className="rp-copyEmail__label">{es ? "Mi correo" : "My email"}</span>
      <code className="rp-copyEmail__address">{ADDRESS}</code>
      <button type="button" className="rp-copyEmail__button" onClick={copy}>
        {es ? "Copiar" : "Copy"}
      </button>
      <span className="rp-copyEmail__status" role="status" aria-live="polite">
        {outcome === "copied"
          ? es ? "Copiado." : "Copied."
          : outcome === "error"
            ? es ? "No se pudo copiar. Seleccione el texto." : "Couldn’t copy. Select the text instead."
            : ""}
      </span>
    </div>
  );
}
