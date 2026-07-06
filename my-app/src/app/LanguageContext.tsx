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
 * Returns t(key, vars?) — looks the key up in the current-language dictionary
 * and falls back to the English default when the translation is missing.
 */
export function useT() {
  const { lang } = useContext(LanguageContext);
  return useMemo(
    () => (key: StringKey, vars?: Record<string, string>) => translate(lang, key, vars),
    [lang]
  );
}
