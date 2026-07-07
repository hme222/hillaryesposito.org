// src/app/AppRoutes.tsx
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

function NotFound() {
  return (
    <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "4rem 1.5rem", textAlign: "center" }}>
      <div>
        <p style={{ opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "0.85rem" }}>404</p>
        <h1 style={{ margin: "0.5rem 0 1rem" }}>Page not found</h1>
        <p style={{ opacity: 0.8, marginBottom: "1.5rem" }}>That link didn't lead anywhere. Let's get you back on track.</p>
        <Link to="/" className="btn-outline">Back to home</Link>
      </div>
    </main>
  );
}

import Home from "../pages/Home";
import About from "../pages/AboutMe";

import GoodHarvest from "../pages/case-studies/GoodHarvest";
import Grove from "../pages/case-studies/Grove";
import MSK from "../pages/case-studies/MSK";
import CuratedRolePage from "../pages/curated/CuratedRolePage";
import PasswordGate from "../components/PasswordGate";
import { Navigate } from "react-router-dom";

// Lazy so the NDA'd Mobbin case-study text ships in its own chunk, fetched only
// after the password gate renders its children — not in the always-loaded main
// bundle every visitor downloads.
const Mobbin = lazy(() => import("../pages/case-studies/Mobbin"));

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    // When landing on a section (?scrollTo=...), let the page position itself
    // instead of resetting to the top and fighting that scroll.
    if (new URLSearchParams(search).has("scrollTo")) return;
    window.scrollTo(0, 0);
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
  "/case-study/good-harvest": "Good Harvest case study",
  "/case-study/mobbin": "Mobbin case study",
};
function RouteAnnouncer() {
  const { pathname } = useLocation();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const name = pathname.startsWith("/curated/") ? "Curated role page" : ROUTE_NAMES[pathname] || "Page";
    // Small delay so the live region updates after the route swaps in.
    const id = window.setTimeout(() => setMsg(`${name} loaded`), 150);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return (
    <div aria-live="polite" role="status" className="sr-only">
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
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Navigate to="/?scrollTo=projects" replace />} />
      <Route path="/about" element={<About />} />

      <Route path="/case-study/good-harvest" element={<GoodHarvest />} />
      <Route path="/case-study/grove" element={<Grove />} />
      <Route path="/case-study/mobbin" element={<PasswordGate><Suspense fallback={null}><Mobbin /></Suspense></PasswordGate>} />
      <Route path="/case-study/msk" element={<MSK />} />
      <Route path="/curated/:slug" element={<CuratedRolePage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}
