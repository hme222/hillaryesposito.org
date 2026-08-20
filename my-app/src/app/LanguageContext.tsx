// src/app/LanguageContext.tsx
//
// Language context for the lightweight custom i18n. The App root owns the
// `lang` state (persisted to localStorage) and provides it here; components
// read it via useLanguage() or, for strings, useT().

import React, { createContext, useContext, useMemo } from "react";
import { Lang, StringKey, translate } from "../i18n/strings";

type LanguageContextValue = {
  lang: Lang;
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
};

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
});

/** Current language + setter (for the nav toggle). */
export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Switch languages without making a reader reconstruct their place.
 * Case-study sections in both languages expose the same semantic anchor even
 * when the Spanish version is intentionally shorter.
 */
export function switchLanguageAtCurrentSection(
  setLang: React.Dispatch<React.SetStateAction<Lang>>,
  next: Lang,
) {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-language-anchor]"));
  const referenceLine = window.innerHeight * 0.35;
  const current = sections.reduce<HTMLElement | null>((match, section) => {
    return section.getBoundingClientRect().top <= referenceLine ? section : match;
  }, sections[0] || null);
  const anchor = current?.dataset.languageAnchor;

  setLang(next);
  if (!anchor) return;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(`[data-language-anchor="${anchor}"]`);
      if (!target) return;
      const heading = target.matches("h1, h2")
        ? target
        : target.querySelector<HTMLElement>("h1, h2");
      target.scrollIntoView({ block: "start" });
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Returns t(key, vars?) - looks the key up in the current-language dictionary
 * and falls back to the English default when the translation is missing.
 */
export function useT() {
  const { lang } = useContext(LanguageContext);
  return useMemo(
    () => (key: StringKey, vars?: Record<string, string>) => translate(lang, key, vars),
    [lang]
  );
}
