// src/app/AppRoutes.tsx
import React, { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import RisoHome from "../pages/RisoHome";
import About from "../pages/AboutMe";
import { useLanguage } from "./LanguageContext";

import CuratedRolePage from "../pages/curated/CuratedRolePage";
import FashionCampaignSystem from "../pages/curated/FashionCampaignSystem";
import NotFoundPage from "../pages/NotFoundPage";
import { Navigate } from "react-router-dom";

// All three flagship case studies load on demand. None of them is reachable
// without a click from the home page, so shipping them in the always-loaded
// main bundle only slows down the one view every visitor actually sees.
const FlagshipMobbin = lazy(() => import("../pages/case-studies/FlagshipMobbin"));
const RisoGrove = lazy(() => import("../pages/case-studies/RisoGrove"));
const FlagshipMSK = lazy(() => import("../pages/case-studies/FlagshipMSK"));
const FlagshipLogistics = lazy(() => import("../pages/case-studies/FlagshipLogistics"));
const HiggsfieldABCLab = lazy(() => import("../pages/labs/HiggsfieldABCLab"));

class LazyRouteBoundary extends Component<
  { children: React.ReactNode; name: string },
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
            <h1>{this.props.name} did not load.</h1>
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

// Every lazily-loaded case study gets the same treatment: an error boundary for
// a chunk that fails to arrive, and an announced loading state for the gap
// before it does.
function LazyPage({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <LazyRouteBoundary name={name}>
      <Suspense
        fallback={
          <div className="case-study-loader" role="status" aria-live="polite">
            Loading {name} case study…
          </div>
        }
      >
        {children}
      </Suspense>
    </LazyRouteBoundary>
  );
}

function ScrollToTop() {
  const { pathname, search } = useLocation();
  const isFirstRender = useRef(true);
  const lastPath = useRef(pathname);
  useEffect(() => {
    const params = new URLSearchParams(search);

    // GitHub Pages deep-link restore: 404.html bounces an unknown path to "/"
    // carrying ?p=<path>. This has to run first and bail out — without it the
    // curated pages are unreachable by direct link, which is the only way they
    // are ever opened.
    const restoredPath = params.get("p");
    if (pathname === "/" && restoredPath?.startsWith("/")) {
      const nextSearch = new URLSearchParams(search);
      nextSearch.delete("p");
      const query = nextSearch.toString();
      window.history.replaceState(null, "", `${restoredPath}${query ? `?${query}` : ""}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
      return;
    }

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
    if (pathChanged) window.scrollTo(0, 0);

    // Move focus to the main content region on client-side navigation so keyboard
    // and screen-reader users land on the new page instead of a stale control from
    // the previous view. Skip the initial load so we don't steal focus on arrival.
    if (wasFirstRender || !pathChanged) return;
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [pathname, search]);
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
  "/curated/fashion-campaign-system": "Fashion campaign system",
  "/lab/higgsfield-abc": "Higgsfield A B C private lab",
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
      <Route path="/projects" element={<Navigate to="/?scrollTo=projects" replace />} />
      <Route path="/about" element={<About />} />

      <Route path="/case-study/grove" element={<LazyPage name="Grove"><RisoGrove /></LazyPage>} />
      <Route path="/riso/grove" element={<Navigate to="/case-study/grove" replace />} />
      <Route path="/case-study/mobbin" element={<LazyPage name="Mobbin"><FlagshipMobbin /></LazyPage>} />
      <Route path="/case-study/msk" element={<LazyPage name="MSK"><FlagshipMSK /></LazyPage>} />
      <Route path="/case-study/logistics" element={<LazyPage name="Medical logistics"><FlagshipLogistics /></LazyPage>} />
      <Route path="/curated/fashion-campaign-system" element={<FashionCampaignSystem />} />
      <Route path="/curated/:slug" element={<CuratedRolePage />} />
      <Route path="/lab/higgsfield-abc" element={<LazyPage name="Higgsfield A B C lab"><HiggsfieldABCLab /></LazyPage>} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}
