// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="section active hero" aria-label="Home section">
      <div className="hero-content">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          HILLARY ESPOSITO
        </motion.h1>

        <div className="hero-copy">
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            I design for clarity in the moments that matter. Veteran turned UX
            designer with experience in healthcare, government, and high-pressure
            systems. I am driven by curiosity, grounded in service, and focused
            on helping people feel more capable. I turn complex, high-emotion
            workflows into experiences that feel intuitive, calm, and human.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.2, 0.8, 0.2, 1],
            }}
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
