// src/app/AppRoutes.tsx
import React, { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import RisoHome from "../pages/RisoHome";
import About from "../pages/AboutMe";
import { useLanguage } from "./LanguageContext";

import RisoGrove from "../pages/case-studies/RisoGrove";
import FlagshipMSK from "../pages/case-studies/FlagshipMSK";
import CuratedRolePage from "../pages/curated/CuratedRolePage";
import FashionCampaignSystem from "../pages/curated/FashionCampaignSystem";
import NotFoundPage from "../pages/NotFoundPage";
import { Navigate } from "react-router-dom";

// Keep the image-heavy Mobbin study in its own chunk instead of adding it to
// the always-loaded main bundle.
const FlagshipMobbin = lazy(() => import("../pages/case-studies/FlagshipMobbin"));

class LazyRouteBoundary extends Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="not-found" role="alert">
          <div className="not-found__number" aria-hidden="true">↻</div>
          <div className="not-found__copy">
            <p className="not-found__eyebrow">Case study recovery</p>
            <h1>Mobbin did not load.</h1>
            <p>The page bundle may have been interrupted. Reload it, or return to selected work.</p>
            <div className="not-found__actions">
              <button
                type="button"
                className="not-found__primary"
                onClick={() => window.location.reload()}
              >
                Reload case study
              </button>
              <a className="not-found__secondary" href="/?scrollTo=projects">
                Browse selected work →
              </a>
            </div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname, search } = useLocation();
  const isFirstRender = useRef(true);
  useEffect(() => {
    const wasFirstRender = isFirstRender.current;
    isFirstRender.current = false;
    // When landing on a section (?scrollTo=...), let the page position itself
    // instead of resetting to the top and fighting that scroll.
    if (new URLSearchParams(search).has("scrollTo")) return;
    window.scrollTo(0, 0);
    // Move focus to the main content region on client-side navigation so keyboard
    // and screen-reader users land on the new page instead of a stale control from
    // the previous view. Skip the initial load so we don't steal focus on arrival.
    if (wasFirstRender) return;
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
    // Effect intentionally keyed on pathname only; `search` is read for the guard
    // but a search-only change (anchor nav) should not reset scroll or focus.
  }, [pathname]);
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
  "/curated/fashion-campaign-system": "Fashion campaign system",
};
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    // Small delay so the route's real H1 is mounted before we announce it.
    const id = window.setTimeout(() => {
      const heading = document.querySelector<HTMLElement>("#main-content h1")?.textContent?.trim();
      const fallback = pathname.startsWith("/curated/") ? "Curated role page" : ROUTE_NAMES[pathname] || "Page";
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
      <Route path="/old-home" element={<Navigate to="/" replace />} />
      <Route path="/projects" element={<Navigate to="/?scrollTo=projects" replace />} />
      <Route path="/about" element={<About />} />

      <Route path="/case-study/grove" element={<RisoGrove />} />
      <Route path="/riso/grove" element={<Navigate to="/case-study/grove" replace />} />
      <Route
        path="/case-study/mobbin"
        element={
          <LazyRouteBoundary>
            <Suspense fallback={<div className="case-study-loader" role="status" aria-live="polite">Loading Mobbin case study…</div>}>
              <FlagshipMobbin />
            </Suspense>
          </LazyRouteBoundary>
        }
      />
      <Route path="/case-study/msk" element={<FlagshipMSK />} />
      <Route path="/curated/fashion-campaign-system" element={<FashionCampaignSystem />} />
      <Route path="/curated/:slug" element={<CuratedRolePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}
