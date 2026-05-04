// src/app/AppRoutes.tsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

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
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import About from "../pages/AboutMe";

import GoodHarvest from "../pages/case-studies/GoodHarvest";
import Emergent from "../pages/case-studies/Emergent";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/case-study/good-harvest" element={<GoodHarvest />} />
      <Route path="/case-study/grove" element={<Emergent />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
