// src/app/AppRoutes.tsx
import React, { useEffect } from "react";
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
import Mobbin from "../pages/case-studies/Mobbin";
import MSK from "../pages/case-studies/MSK";
import PasswordGate from "../components/PasswordGate";
import { Navigate } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRoutes() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Navigate to="/#projects" replace />} />
      <Route path="/about" element={<About />} />

      <Route path="/case-study/good-harvest" element={<GoodHarvest />} />
      <Route path="/case-study/grove" element={<Grove />} />
      <Route path="/case-study/mobbin" element={<PasswordGate><Mobbin /></PasswordGate>} />
      <Route path="/case-study/msk" element={<MSK />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}
