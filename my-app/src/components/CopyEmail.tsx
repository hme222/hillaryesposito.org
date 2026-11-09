import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "../app/LanguageContext";
import type { Lang } from "../i18n/strings";

const ADDRESS = "espositohillary@gmail.com";

type Outcome = "copied" | "error" | null;

/**
 * @status: stable
 * @purpose: The email address shown as plain, selectable text with a "Copy" button beside it, used wherever the address shows (contact bands, every case-study close, the footer, the recruiter panel, the Ask dialog and the error screen) so a reader without a mail client can paste the address elsewhere. Pick this to offer the address itself; for the mailto action use the regular "Email me" link, and for sharing a page use ShareCaseStudy. On success the button itself turns into a check mark and "Copied"; if copying fails, a line beside it says to select the text by hand.
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
      {/* The result shows inside the button: a check mark and "Copied" replace
          the copy icon for a few seconds. The status line stays for screen
          readers, and only shows on screen when copying fails. */}
      <button
        type="button"
        className={`rp-copyEmail__button${outcome === "copied" ? " is-copied" : ""}`}
        onClick={copy}
      >
        {outcome === "copied" ? (
          <Check size="1em" strokeWidth={2.4} aria-hidden="true" focusable="false" />
        ) : (
          <Copy size="1em" strokeWidth={2} aria-hidden="true" focusable="false" />
        )}
        <span>{outcome === "copied" ? (es ? "Copiado" : "Copied") : (es ? "Copiar" : "Copy")}</span>
      </button>
      <span className={`rp-copyEmail__status${outcome === "error" ? "" : " sr-only"}`} role="status" aria-live="polite">
        {outcome === "copied"
          ? es ? "Correo copiado." : "Email copied."
          : outcome === "error"
            ? es ? "No se pudo copiar. Seleccione el texto." : "Couldn’t copy. Select the text instead."
            : ""}
      </span>
    </div>
  );
}
