import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { HashRouter as Router } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import Loader from "../components/Loader";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/index.css";
import "../styles/App.css";
import "../styles/comparison-table.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference once
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

    // Persist theme preference + apply class globally
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <>
        <Loader />

        <div className= "app">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <AppRoutes />
          <Footer />
        </div>

        <CustomCursor />
      </>
    </Router>
  );
}
