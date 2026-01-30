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
      const heroH1 = root.querySelector(".hero-title");
      if (heroH1) {
        gsap.fromTo(
          heroH1,
          { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }

      const fadeEls = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".fade-text")
      );

      fadeEls.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 18,
          duration: 0.8,
          delay: 0.15 + i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section active hero" aria-label="Home section">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-title"
        >
          HILLARY ESPOSITO
        </motion.h1>

        <div className="hero-copy">
          <motion.p
            className="hero-description fade-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Designing digital experiences that help people breathe easier and make
            meaningful decisions with confidence—through modern, accessible interfaces.
          </motion.p>

          <motion.div
            className="hero-actions fade-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Link to="/contact" className="hero-btn">
              Contact me
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
