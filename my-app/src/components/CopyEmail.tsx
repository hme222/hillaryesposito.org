import React, { useState } from "react";
import { useLanguage } from "../app/LanguageContext";
import type { Lang } from "../i18n/strings";

const ADDRESS = "espositohillary@gmail.com";

type Outcome = "copied" | "error" | null;

/**
 * @status: stable
 * @purpose: The email address shown as plain, selectable text with a "Copy" button beside it, used wherever the address shows (contact bands, every case-study close, the footer, the recruiter panel, the Ask dialog and the error screen) so a reader without a mail client can paste the address elsewhere. Pick this to offer the address itself; for the mailto action use the regular "Email me" link, and for sharing a page use ShareCaseStudy. The button reports only what happened: copied, or where to select the text by hand.
 */
export default function CopyEmail({ compact = false, lang: langOverride }: {
  /** Drops the "My email" label, for tight spots such as the footer. */
  compact?: boolean;
  /** For places outside the language provider, such as the error screen. */
  lang?: Lang;
}) {
  const { lang: contextLang } = useLanguage();
  const es = (langOverride ?? contextLang) === "es";
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
    <div className={`rp-copyEmail${compact ? " rp-copyEmail--compact" : ""}`}>
      {compact ? null : <span className="rp-copyEmail__label">{es ? "Mi correo" : "My email"}</span>}
      {compact ? (
        <a className="rp-copyEmail__address" href={`mailto:${ADDRESS}`}>{ADDRESS}</a>
      ) : (
        <code className="rp-copyEmail__address">{ADDRESS}</code>
      )}
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
