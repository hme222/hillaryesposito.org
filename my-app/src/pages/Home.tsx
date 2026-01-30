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
            duration: 1.5,
            ease: "power3.out",
            delay: 2.2, // slightly quicker to feel more inviting
          }
        );
      }

      const fadeEls = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll(".fade-text")
      );
      fadeEls.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24, // a touch softer
          duration: 0.9,
          delay: i * 0.15,
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
    <section
      ref={rootRef}
      className="section active hero"
      aria-label="Home section"
    >
      <div className="hero-content">
        {/* Optional: a small eyebrow line for warmth */}
        <motion.p
          className="hero-eyebrow fade-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          UX Designer • Front-End Builder
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="hero-title"
        >
          HILLARY ESPOSITO
        </motion.h1>

        {/* Constrain width + split into readable blocks */}
        <div className="hero-copy">
          <motion.p
            className="hero-description fade-text"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            Designing digital experiences that help people breathe easier and make
            meaningful decisions with confidence—through modern, accessible
            interfaces.
          </motion.p>

          <motion.p
            className="hero-description fade-text"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            I’m a UX designer and front-end builder creating intuitive,
            high-performance web experiences grounded in usability, accessibility,
            and real-world impact. My work spans healthcare, government, wellness,
            and other spaces where people navigate important choices. With a calm,
            human-centered approach shaped by complex systems—and a background as
            a U.S. Army veteran—I help teams make complexity feel manageable and
            decisions feel clearer.
          </motion.p>
        </div>

        <motion.div
          className="hero-actions fade-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Link to="/contact" className="hero-btn">
            Contact
          </Link>

          {/* Optional secondary CTA (small change, big “welcome” energy) */}
          <Link to="/work" className="hero-btn hero-btn--secondary">
            View work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
