import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import { LanguageContext } from "./LanguageContext";
import { Lang, translate } from "../i18n/strings";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecruiterPill from "../components/RecruiterPill";
import BackToTop from "../components/BackToTop";

import "../styles/index.css";
import "../styles/App.css";
import "../styles/comparison-table.css";
import "../styles/casestudy-show.css";

export default function App() {
  // Theme preference. Read once, synchronously, into the initializer so the
  // first paint is already in the saved theme — no light→dark flash, and no
  // mount-ordering dependency between a read-effect and a write-effect. Same
  // pattern as `lang` below.
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("darkMode") === "true"
  );

  // Language preference (Phase 1: home + nav). Read once, synchronously, so
  // the first paint is already in the saved language — no EN→ES flash.
  const [lang, setLang] = useState<Lang>(() =>
    localStorage.getItem("lang") === "es" ? "es" : "en"
  );

  // Persist theme preference + apply class globally
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Persist language + keep <html lang> in sync (a11y: screen readers switch
  // pronunciation based on the document language).
  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const languageValue = useMemo(
    () => ({ lang, setLang }),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={languageValue}>
      <Router>
        <>
          <a href="#main-content" className="sr-only-focusable">{translate(lang, "app.skip")}</a>

          <div className= "app">
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div id="main-content" tabIndex={-1}>
              <AppRoutes />
            </div>
            <Footer />
          </div>

          <RecruiterPill />
          <BackToTop />
          <CustomCursor />
        </>
      </Router>
    </LanguageContext.Provider>
  );
}
