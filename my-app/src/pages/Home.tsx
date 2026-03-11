// src/pages/Home.tsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ─── Reina callouts ──────────────────────────────────────────────────────────
type Callout = { step: number; title: string; description: string };

const CALLOUTS: Callout[] = [
  { step: 1, title: "Homepage",         description: "Curated venue discovery with a quick onboarding preview" },
  { step: 2, title: "Preferences form", description: "Capture location, budget range, guest count, and must-haves" },
  { step: 3, title: "Swipe gallery",    description: "Fast visual comparison to build a shortlist confidently" },
  { step: 4, title: "Consultant chat",  description: "Expert guidance to validate fit and answer questions in real time" },
  { step: 5, title: "Visit schedule",   description: "Turn the shortlist into a personalized itinerary for in-person tours" },
];

export default function Home() {
  const catRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Luna parallax
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

  return (
    <>
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section id="home" className="section active hero" aria-label="Home section">
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
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
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
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <a href="#contact" className="hero-btn">
                Contact me
              </a>
            </motion.div>
          </div>
        </div>

        Floating Luna
        <div ref={catRef} className="about-luna">
          <img
            src="/assets/favicon.png"
            alt="Luna, a gray and white cat with orange eyes"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. PROJECTS
      ══════════════════════════════════════════ */}
      <section id="projects" className="section active projects" aria-label="Projects section">
        <h2 className="section-title">Projects</h2>

        <div className="projects-grid">
          {/* Good Harvest */}
          <article
            className="project-card"
            onClick={() => navigate("/case-study/good-harvest")}
            role="button"
            tabIndex={0}
            aria-label="View Good Harvest case study"
            onKeyDown={(e) => e.key === "Enter" && navigate("/case-study/good-harvest")}
          >
            <div className="project-media">
              <div className="project-icon">🌿</div>
            </div>
            <div className="project-body">
              <h3>Good Harvest</h3>
              <p>
                A mobile app helping users plan meals around seasonal, local produce —
                reducing decision friction and making sustainable eating more accessible.
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
            onKeyDown={(e) => e.key === "Enter" && navigate("/case-study/ecommerce")}
          >
            <div className="project-media">
              <div className="project-icon">🛍️</div>
            </div>
            <div className="project-body">
              <h3>E-Commerce Storefront</h3>
              <p>
                An accessibility-first storefront demo with keyboard and screen reader
                support across discovery filters, quick view, and a cart drawer.
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
            onKeyDown={(e) => e.key === "Enter" && navigate("/case-study/reina")}
          >
            <div className="project-media">
              <div className="project-icon"> 👑 </div>
            </div>
            <div className="project-body">
              <h3>Reina App </h3>
              <p>
                A self-directed concept app designed to reduce stress and add clarity
                to destination wedding planning.
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
                  I'm seeking a junior UX role where I can continue learning, contribute
                  thoughtfully to cross-functional teams, and apply my skills in research,
                  interaction design, and systems thinking across a variety of products
                  and industries.
                </p>
                <p>
                  Whether it's improving clinical workflows, streamlining government
                  services, or building consumer products that reduce cognitive load — I
                  specialize in creating experiences that help people feel more capable,
                  more informed, and more at ease.
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
      <section id="contact" className="section active contact-hero" aria-label="Contact section">
        <div className="contact-container">
          <div className="contact-info">
            <h1>Let's build something together</h1>
            <p>
              Freelance, full-time, or collaborations. If you're hiring or launching,
              I'd love to chat.
            </p>
          </div>

          <div className="contact-form">
            <form
              autoComplete="off"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
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
                <input id="contact-email" name="email" type="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" required rows={6} />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
