// src/pages/Home.tsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 2. Hero Title Animation (Clip-path)
      const heroH1 = root.querySelector(".hero-title");
      if (heroH1) {
        gsap.fromTo(
          heroH1,
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

      // 3. Fade-in Text Animation
      const fadeEls = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".fade-text"));
      fadeEls.forEach((el, i) => {
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
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="section active hero" aria-label="Home section">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-title"
        >
          HILLARY ESPOSITO
        </motion.h1>

        <motion.p
          className="hero-description fade-text"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        >
          UX Designer who codes modern, accessible web experiences. I design and build intuitive, high-performance interfaces with a focus on usability, accessibility, and real-world impact.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <Link to="/contact" className="hero-btn">
            Contact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
