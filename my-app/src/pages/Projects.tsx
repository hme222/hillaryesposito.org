// src/pages/Projects.tsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // 4. Projects Animation
      gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".project-card")).forEach((el, i) => {
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
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="section active projects" aria-label="Projects section">
      <h2 className="section-title">PROJECTS</h2>

      <div className="projects-grid">
        <div
          className="project-card project"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/case-study/good-harvest")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/case-study/good-harvest")}
          aria-label="Go to Good Harvest case study"
        >
          <div className="project-media" aria-hidden="true">
            <div className="project-icon">🥕</div>
          </div>
          <div className="project-body">
            <h3>Good Harvest</h3>
            <p>Seasonal meals + lists, by location.</p>
          </div>
        </div>

        <div
          className="project-card project"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/case-study/ecommerce")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/case-study/ecommerce")}
          aria-label="Go to E-Commerce Platform case study"
        >
          <div className="project-media" aria-hidden="true">
            <div className="project-icon">🛍️</div>
          </div>
          <div className="project-body">
            <h3>E-Commerce Platform</h3>
            <p>Checkout + design system refresh.</p>
          </div>
        </div>

        <div
          className="project-card project"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/case-study/hipstirred-photo")}
          onKeyDown={(e) => e.key === "Enter" && navigate("/case-study/hipstirred-photo")}
          aria-label="Go to Hipstirred Photo case study"
        >
          <div className="project-media" aria-hidden="true">
            <div className="project-icon">📷</div>
          </div>
          <div className="project-body">
            <h3>Hipstirred Photo</h3>
            <p>Story-led portfolio in motion.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
