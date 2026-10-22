// src/app/AppRoutes.tsx
import React, { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";

import RisoHome from "../pages/RisoHome";
import About from "../pages/AboutMe";
import { useLanguage } from "./LanguageContext";
import { safeGet, safeSet } from "./safeStorage";
import { translate, type Lang } from "../i18n/strings";

import NotFoundPage from "../pages/NotFoundPage";
import { Navigate } from "react-router-dom";

// All three flagship case studies load on demand. None of them is reachable
// without a click from the home page, so shipping them in the always-loaded
// main bundle only slows down the one view every visitor actually sees.
const FlagshipMobbin = lazy(() => import("../pages/case-studies/FlagshipMobbin"));
const RisoGrove = lazy(() => import("../pages/case-studies/RisoGrove"));
const FlagshipMSK = lazy(() => import("../pages/case-studies/FlagshipMSK"));
const FlagshipLogistics = lazy(() => import("../pages/case-studies/FlagshipLogistics"));
const FlagshipKnowunity = lazy(() => import("../pages/case-studies/FlagshipKnowunity"));
const FlagshipUxWoman = lazy(() => import("../pages/case-studies/FlagshipUxWoman"));

class LazyRouteBoundary extends Component<
  { children: React.ReactNode; name: string; lang: Lang },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      const { lang, name } = this.props;
      return (
        <main className="not-found" role="alert">
          <div className="not-found__number" aria-hidden="true">↻</div>
          <div className="not-found__copy">
            <p className="not-found__eyebrow">{translate(lang, "recovery.caseEyebrow")}</p>
            <h1>{translate(lang, "recovery.caseTitle", { name })}</h1>
            <p>{translate(lang, "recovery.caseBody")}</p>
            <div className="not-found__actions">
              <button
                type="button"
                className="not-found__primary"
                onClick={() => window.location.reload()}
              >
                {translate(lang, "recovery.caseReload")}
              </button>
              <a className="not-found__secondary" href="/?scrollTo=projects">
                {translate(lang, "notFound.work")}
              </a>
            </div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

// Every lazily-loaded case study gets the same treatment: an error boundary for
// a chunk that fails to arrive, and an announced loading state for the gap
// before it does. `nameEs` covers the one case-study name that translates.
function LazyPage({ name, nameEs, children }: { name: string; nameEs?: string; children: React.ReactNode }) {
  const { lang } = useLanguage();
  const label = lang === "es" && nameEs ? nameEs : name;
  return (
    <LazyRouteBoundary name={label} lang={lang}>
      <Suspense
        fallback={
          <div className="case-study-loader" role="status" aria-live="polite">
            <p className="case-study-loader__label">{translate(lang, "recovery.caseLoading", { name: label })}</p>
            {/* A hero-shaped skeleton instead of a lone sentence, so the
                page holds its layout and the footer does not jump when the
                chunk lands (portfolio review 2026-10-22, UXfolio ch. 2.3). */}
            <span className="case-study-loader__bar case-study-loader__bar--title" aria-hidden="true" />
            <span className="case-study-loader__bar case-study-loader__bar--title case-study-loader__bar--short" aria-hidden="true" />
            <span className="case-study-loader__bar" aria-hidden="true" />
            <span className="case-study-loader__bar case-study-loader__bar--short" aria-hidden="true" />
          </div>
        }
      >
        {children}
      </Suspense>
    </LazyRouteBoundary>
  );
}

export function ScrollToTop() {
  const location = useLocation();
  const { pathname, search, key } = location;
  const navigationType = useNavigationType();
  const isFirstRender = useRef(true);
  const lastPath = useRef(pathname);
  const restoringPop = useRef(false);
  // Capture the destination's saved position during render. The new route's
  // scroll listener can otherwise observe the browser's interim top position
  // before the POP restoration effect runs and overwrite the value we need.
  const savedScrollAtRender = Number(safeGet("session", `portfolio-scroll:${pathname}`) || 0);
  // A reload or a discarded tab coming back is the first render of this
  // history entry with the same path. scrollRestoration is manual, so put the
  // reader back where they were unless a hash or ?scrollTo= asks for a section.
  // Decided once, on the very first render, so a later re-render can't flip it
  // and cancel the restore loop through the effect cleanup.
  const firstRenderRestore = useRef<boolean | null>(null);
  if (firstRenderRestore.current === null) {
    firstRenderRestore.current =
      !location.hash && !new URLSearchParams(search).has("scrollTo") && savedScrollAtRender > 0;
  }
  const restoreOnFirstRender = isFirstRender.current && firstRenderRestore.current;
  if ((navigationType === "POP" && lastPath.current !== pathname) || restoreOnFirstRender) {
    restoringPop.current = true;
  }

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    const remember = () => {
      if (restoringPop.current || window.location.pathname !== pathname) return;
      safeSet("session", `portfolio-scroll:${pathname}`, String(window.scrollY));
    };
    window.addEventListener("scroll", remember, { passive: true });
    return () => {
      window.removeEventListener("scroll", remember);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const params = new URLSearchParams(search);

    const wasFirstRender = isFirstRender.current;
    // A search-only change (anchor nav) is not a route change and must not
    // reset scroll or steal focus. The effect has to observe `search` for the
    // restore above, so the guard is explicit rather than a dependency array.
    const pathChanged = lastPath.current !== pathname;
    isFirstRender.current = false;
    lastPath.current = pathname;

    // When landing on a section (?scrollTo=...), let the page position itself
    // instead of resetting to the top and fighting that scroll.
    if (params.has("scrollTo")) return;
    if ((pathChanged && navigationType === "POP") || (wasFirstRender && firstRenderRestore.current)) {
      const saved = savedScrollAtRender;
      // Images and lazy case-study bundles can grow the document after the
      // first paint. Keep restoring the same history entry until the requested
      // position is reachable or the layout has had ample time to settle.
      let attempts = 0;
      let restoreTimer = 0;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      const finish = () => {
        root.style.scrollBehavior = previousScrollBehavior;
        restoringPop.current = false;
      };
      const restore = () => {
        window.scrollTo({ top: saved, left: 0, behavior: "auto" });
        attempts += 1;
        if (attempts < 14) {
          restoreTimer = window.setTimeout(restore, 100);
        } else {
          finish();
        }
      };
      restore();
      return () => {
        window.clearTimeout(restoreTimer);
        finish();
      };
    }
    if (pathChanged) {
      restoringPop.current = false;
      window.scrollTo(0, 0);
    }

    // Move focus to the main content region on client-side navigation so keyboard
    // and screen-reader users land on the new page instead of a stale control from
    // the previous view. Skip the initial load so we don't steal focus on arrival.
    if (wasFirstRender || !pathChanged) return;
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [key, navigationType, pathname, savedScrollAtRender, search]);
  return null;
}

// Announces page changes to screen readers (SPA navigation otherwise gives no
// audible cue that the view changed).
const ROUTE_NAMES: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/case-study/msk": "MSK case study",
  "/case-study/grove": "Grove case study",
  "/case-study/mobbin": "Mobbin case study",
  "/case-study/logistics": "Medical logistics case study",
  "/case-study/knowunity": "Knowunity case study",
  "/case-study/ux-woman": "UX Woman case study",
};
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    // Small delay so the route's real H1 is mounted before we announce it.
    const id = window.setTimeout(() => {
      const heading = document.querySelector<HTMLElement>("#main-content h1")?.textContent?.trim();
      const fallback = ROUTE_NAMES[pathname] || "Page";
      setMsg(lang === "es" ? `${heading || fallback} cargada` : `${heading || fallback} loaded`);
    }, 150);
    return () => window.clearTimeout(id);
  }, [lang, pathname]);
  return (
    <div aria-live="polite" role="status" className="sr-only" lang={lang}>
      {msg}
    </div>
  );
}

export default function AppRoutes() {
  return (
    <>
    <ScrollToTop />
    <RouteAnnouncer />
    <Routes>
      <Route path="/" element={<RisoHome />} />
      <Route path="/projects" element={<Navigate to="/?scrollTo=projects" replace />} />
      <Route path="/about" element={<About />} />

      <Route path="/case-study/grove" element={<LazyPage name="Grove"><RisoGrove /></LazyPage>} />
      <Route path="/riso/grove" element={<Navigate to="/case-study/grove" replace />} />
      <Route path="/case-study/mobbin" element={<LazyPage name="Mobbin"><FlagshipMobbin /></LazyPage>} />
      <Route path="/case-study/msk" element={<LazyPage name="MSK"><FlagshipMSK /></LazyPage>} />
      <Route path="/case-study/logistics" element={<LazyPage name="Medical logistics" nameEs="Logística médica"><FlagshipLogistics /></LazyPage>} />
      <Route path="/case-study/knowunity" element={<LazyPage name="Knowunity"><FlagshipKnowunity /></LazyPage>} />
      <Route path="/case-study/ux-woman" element={<LazyPage name="UX Woman"><FlagshipUxWoman /></LazyPage>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}
