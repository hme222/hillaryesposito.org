import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import AppErrorBoundary from "./AppErrorBoundary";
import { safeGet, safeSet } from "./safeStorage";
import { LanguageContext } from "./LanguageContext";
import { Lang, translate } from "../i18n/strings";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecruiterPanel from "../components/RecruiterPanel";
import AskDialog from "../components/ask/AskDialog";
import { ASK_ENABLED } from "../components/ask/askEnabled";
import PortfolioAnalytics from "../analytics/PortfolioAnalytics";

import "../styles/App.css";
import "../styles/portfolio-editorial.css";
import "../styles/portfolio-cohesion.css";

export default function App() {
  // Theme preference. Read once, synchronously, into the initializer so the
  // first paint is already in the saved theme - no light→dark flash, and no
  // mount-ordering dependency between a read-effect and a write-effect. Same
  // pattern as `lang` below.
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = safeGet("local", "darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Language preference (Phase 1: home + nav). Read once, synchronously, so
  // the first paint is already in the saved language - no EN→ES flash.
  const [lang, setLang] = useState<Lang>(() =>
    safeGet("local", "lang") === "es" ? "es" : "en"
  );

  // Persist theme preference + apply class globally
  useEffect(() => {
    safeSet("local", "darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Persist language + keep <html lang> in sync (a11y: screen readers switch
  // pronunciation based on the document language).
  useEffect(() => {
    safeSet("local", "lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const languageValue = useMemo(
    () => ({ lang, setLang }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={languageValue}>
      <AppErrorBoundary>
      <Router>
        <>
          <PortfolioAnalytics />
          <a href="#main-content" className="sr-only-focusable">{translate(lang, "app.skip")}</a>

          <div className= "app">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div id="main-content" tabIndex={-1}>
              <AppRoutes />
            </div>
            <Footer />
          </div>

          <RecruiterPanel />
          {/* After RecruiterPanel on purpose: when its "Ask a question" link
              fires, the panel's close effect runs before this dialog opens. */}
          {ASK_ENABLED && <AskDialog />}
        </>
      </Router>
      </AppErrorBoundary>
    </LanguageContext.Provider>
  );
}
