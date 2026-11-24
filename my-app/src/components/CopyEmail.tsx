import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "../app/LanguageContext";
import type { Lang } from "../i18n/strings";

const ADDRESS = "espositohillary@gmail.com";

type Outcome = "copied" | "error" | null;

/**
 * @status: stable
 * @purpose: The email address shown as plain, selectable text with an icon-only copy button beside it (a tooltip names it), used wherever the address shows (contact bands, every case-study close, the footer, the recruiter panel, the Ask dialog and the error screen) so a reader without a mail client can paste the address elsewhere. Pick this to offer the address itself; for the mailto action use the regular "Email me" link, and for sharing a page use ShareCaseStudy. On success the icon turns into a check mark and the tooltip says "Copied"; if copying fails, a line beside it says to select the text by hand.
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
      {/* The result shows on the button: a check mark replaces the copy icon
          and the tooltip says "Copied" for a few seconds. The status line stays for screen
          readers, and only shows on screen when copying fails. */}
      <button
        type="button"
        className={`rp-copyEmail__button${outcome === "copied" ? " is-copied" : ""}`}
        onClick={copy}
        aria-label={outcome === "copied" ? (es ? "Correo copiado" : "Email copied") : (es ? "Copiar correo" : "Copy email address")}
        data-tip={outcome === "copied" ? (es ? "Copiado" : "Copied") : (es ? "Copiar correo" : "Copy email")}
      >
        {outcome === "copied" ? (
          <Check size="1.1em" strokeWidth={2.4} aria-hidden="true" focusable="false" />
        ) : (
          <Copy size="1.1em" strokeWidth={2} aria-hidden="true" focusable="false" />
        )}
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
