// src/pages/Home.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── Orb background ──────────────────────────────────────────────────────────
const orbStyles = `
  @keyframes breathe1 {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.08); opacity: 0.7; }
  }
  @keyframes breathe2 {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.65; }
  }
  @keyframes breathe3 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.5; }
  }
`;

const OrbBackground: React.FC = () => {
  return (
    <>
      <style>{orbStyles}</style>

      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(90px)",
          width: 600,
          height: 600,
          top: -180,
          left: -120,
          background:
            "radial-gradient(circle, rgba(128,128,0,.13) 0%, rgba(107,142,35,.08) 50%, transparent 75%)",
          animation: "breathe1 7s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(90px)",
          width: 560,
          height: 560,
          bottom: -160,
          right: -100,
          background:
            "radial-gradient(circle, rgba(85,107,47,.11) 0%, rgba(107,142,35,.06) 50%, transparent 75%)",
          animation: "breathe2 9s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(90px)",
          width: 320,
          height: 320,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(128,128,0,.055) 0%, transparent 70%)",
          animation: "breathe3 11s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
};

// ─── Reina callouts ──────────────────────────────────────────────────────────
type Callout = { step: number; title: string; description: string };

const CALLOUTS: Callout[] = [
  {
    step: 1,
    title: "Homepage",
    description: "Curated venue discovery with a quick onboarding preview",
  },
  {
    step: 2,
    title: "Preferences form",
    description: "Capture location, budget range, guest count, and must-haves",
  },
  {
    step: 3,
    title: "Swipe gallery",
    description: "Fast visual comparison to build a shortlist confidently",
  },
  {
    step: 4,
    title: "Consultant chat",
    description:
      "Expert guidance to validate fit and answer questions in real time",
  },
  {
    step: 5,
    title: "Visit schedule",
    description:
      "Turn the shortlist into a personalized itinerary for in-person tours",
  },
];

export default function Home() {
  const catRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [showLuna, setShowLuna] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (catRef.current) {
        const movement = Math.sin(window.scrollY * 0.002) * 20;
        catRef.current.style.transform = `translateY(${movement}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const section = contactRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLuna(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!catRef.current) return;

      const rect = catRef.current.getBoundingClientRect();

      const catCenterX = rect.left + rect.width / 2;
      const catCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - catCenterX;
      const deltaY = e.clientY - catCenterY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      catRef.current.style.transform = `translateX(-50%) rotate(${angle * 0.05}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <section
        id="home"
        className="section active hero"
        aria-label="Home section"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <OrbBackground />

        <div
          className="hero-content"
          style={{ position: "relative", zIndex: 1 }}
        >
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
              designer with experience in healthcare, government, and
              high-pressure systems. I am driven by curiosity, grounded in
              service, and focused on helping people feel more capable. I turn
              complex, high-emotion workflows into experiences that feel
              intuitive, calm, and human.
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
              <a href="#contact" className="hero-btn">
                Contact me
              </a>
            </motion.div>
          </div>
        </div>
        {/* ══════════════════════════════════════════
          2. PROJECTS
      ══════════════════════════════════════════ */}
        <section
          id="projects"
          className="section active projects"
          aria-label="Projects section"
        >
          <h2 className="section-title">Projects</h2>

          <div className="projects-grid">
            {/* Good Harvest */}
            <article
              className="project-card"
              onClick={() => navigate("/case-study/good-harvest")}
              role="button"
              tabIndex={0}
              aria-label="View Good Harvest case study"
              onKeyDown={(e) =>
                e.key === "Enter" && navigate("/case-study/good-harvest")
              }
            >
              <div className="project-media">
                <div className="project-icon">🌿</div>
              </div>
              <div className="project-body">
                <h3>Good Harvest</h3>
                <p>
                  A mobile app helping users plan meals around seasonal, local
                  produce — reducing decision friction and making sustainable
                  eating more accessible.
                </p>
              </div>
            </article>

            {/* E-Commerce */}
            <article
              className="project-card"
              onClick={() => navigate("/case-study/ecommerce")}
              role="button"
              tabIndex={0}
              aria-label="View E-Commerce Storefront case study"
              onKeyDown={(e) =>
                e.key === "Enter" && navigate("/case-study/ecommerce")
              }
            >
              <div className="project-media">
                <div className="project-icon">🛍️</div>
              </div>
              <div className="project-body">
                <h3>E-Commerce Storefront</h3>
                <p>
                  An accessibility-first storefront demo with keyboard and
                  screen reader support across discovery filters, quick view,
                  and a cart drawer.
                </p>
              </div>
            </article>
            {/* Reina */}
            <article
              className="project-card"
              onClick={() => navigate("/case-study/reina")}
              role="button"
              tabIndex={0}
              aria-label="View Reina case study"
              onKeyDown={(e) =>
                e.key === "Enter" && navigate("/case-study/reina")
              }
            >
              <div className="project-media">
                <div className="project-icon"> 👑 </div>
              </div>
              <div className="project-body">
                <h3>Reina App </h3>
                <p>
                  A self-directed concept app designed to reduce stress and add
                  clarity to destination wedding planning.
                </p>
              </div>
            </article>
          </div>
        </section>
        <section>
          <div className="about-cta">
            <div className="about-cta-card">
              <h2 className="about-cta-title">What I'm looking for</h2>
              <div className="about-cta-content">
                <p>
                  I'm seeking a junior UX role where I can continue learning,
                  contribute thoughtfully to cross-functional teams, and apply
                  my skills in research, interaction design, and systems
                  thinking across a variety of products and industries.
                </p>
                <p>
                  Whether it's improving clinical workflows, streamlining
                  government services, or building consumer products that reduce
                  cognitive load — I specialize in creating experiences that
                  help people feel more capable, more informed, and more at
                  ease.
                </p>
                <p className="about-cta-highlight">
                  If you're building something that matters, let's talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
          5. CONTACT
      ══════════════════════════════════════════ */}
        <section
          id="contact"
          ref={contactRef}
          className="section active contact-hero"
          aria-label="Contact section"
        >
          <div className="contact-container">
            <div className="contact-info">
              <h1>Let's build something together</h1>
              <p>
                Freelance, full-time, or collaborations. If you're hiring or
                launching, I'd love to chat.
              </p>
            </div>

            <div className="contact-form">
              <form
                autoComplete="off"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();

                  if (catRef.current) {
                    catRef.current.classList.add("tail-wag");

                    setTimeout(() => {
                      catRef.current?.classList.remove("tail-wag");
                    }, 1500);
                  }

                  alert("Thanks — I'll reply soon.");
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input id="contact-name" name="name" type="text" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Floating Luna */}
          <div
            ref={catRef}
            className={`about-luna ${showLuna ? "is-visible" : ""}`}
          >
            <img
              src="/assets/favicon.png"
              alt="Luna, a gray and white cat with orange eyes"
            />
          </div>
        </section>
      </section>
    </>
  );
}
