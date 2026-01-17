import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { HashRouter as Router } from "react-router-dom";
import { Portfolio } from "./components/Portfolio";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference
    const saved = localStorage.getItem("darkMode");
    if (saved) setDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Loader Animation
    if (document.querySelector(".loader-cat")) {
      gsap.to(".loader-cat", {
        opacity: 1,
        scale: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.to(".loader-cat", {
        rotation: 360,
        duration: 2,
        ease: "linear",
        repeat: 1,
        transformOrigin: "center",
      });

      gsap.to("#loader", {
        opacity: 0,
        delay: 2.2,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          const loader = document.getElementById("loader");
          if (loader) loader.remove();
        },
      });
    }

    // Hero Title Animation
    if (document.querySelector(".hero h1")) {
      gsap.fromTo(
        ".hero h1",
        { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power3.out",
          delay: 2.5,
        }
      );
    }

    // Fade-in Text Animation
    gsap.utils.toArray<HTMLElement>(".fade-text").forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: i * 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    });

    // Projects Animation
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 60,
        duration: 1,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    // Smooth Custom Cursor
    const cursor = document.getElementById("custom-cursor");
    if (cursor) {
      cursor.style.left = "-100px";
      cursor.style.top = "-100px";

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          duration: 0.2,
          left: e.clientX,
          top: e.clientY,
          ease: "power3.out",
        });
      };

      document.addEventListener("mousemove", moveCursor);
      return () => {
        document.removeEventListener("mousemove", moveCursor);
      };
    }
  }, []);

  return (
    <Router>
      <>
        {/* Loader
        <div id="loader" aria-hidden="true">
          <img
            src="assets/logo-cat.png"
            alt="Loading animation"
            className="loader-cat"
            aria-hidden="true"
          />
        </div> */}

        <div className={`app ${darkMode ? "dark-mode" : ""}`}>
          <Portfolio darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* Custom Cursor */}
        <div
          id="custom-cursor"
          aria-hidden="true"
          style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
        />
      </>
    </Router>
  );
}

export default App;
