// src/app/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

import GoodHarvest from "../pages/case-studies/GoodHarvest";
import Ecommerce from "../pages/case-studies/Ecommerce";
import Reina from "../pages/case-studies/Reina";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/case-study/good-harvest" element={<GoodHarvest />} />
      <Route path="/case-study/ecommerce" element={<Ecommerce />} />
      <Route path="/case-study/reina" element={<Reina />} />
    </Routes>
  );
}
