import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";

interface PortfolioProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export function Portfolio({ darkMode, setDarkMode }: PortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const navigate = useNavigate();

  // Components for sections
  function Home() {
    return (
      <section className="section active hero" aria-label="Home section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="hero-title"
          >
            HILLARY ESPOSITO
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            UX Designer who codes modern, accessible web experiences. 

            I design and build intuitive, high-performance interfaces with a focus on usability, accessibility, and real-world impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/contact"
              className="hero-btn"
              aria-label="Contact Me button"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  function Projects() {
    return (
      <section
        className="section active projects"
        aria-label="Projects section"
      >
        <h2 className="section-title">PROJECTS</h2>
        <div className="projects-grid">
          <div
            className="project-card project"
            role="button"
            tabIndex={0}
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/mobile-app");
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/case-study/mobile-app")
            }
            aria-label="Go to Mobile UX App case study"
          >
            <h3>Good Harvest- UX Mobile App</h3>
            <p>
              This project is a mobile app for both busy foodies and people new
              to seasonal eating, to help them quickly plan a meal or make a
              shopping list based on what produce is in season in their area.
            </p>
          </div>

          <div
            className="project-card project"
            role="button"
            tabIndex={0}
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/ecommerce");
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/case-study/ecommerce")
            }
            aria-label="Go to E-Commerce Platform case study"
          >
            <h3>E-Commerce Platform</h3>
            <p>High-conversion design system for modern digital storefronts.</p>
          </div>
          <div
            className="project-card project"
            role="button"
            tabIndex={0}
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/hipstirred-photo");
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/case-study/hipstirred-photo")
            }
            aria-label="Go to Hipstirred Photo case study"
          >
            <h3>Hipstirred Photo</h3>
            <p>
              Creative photography portfolio with immersive storytelling and
              sleek UI.
            </p>
          </div>
        </div>
      </section>
    );
  }

  function Contact() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      alert("Thank you for your message! I will get back to you soon.");
      e.currentTarget.reset();
    }

    return (
      <section
        className="section active contact-hero"
        aria-label="Contact section"
      >
        <div className="contact-container">
          <div className="contact-info">
            <h1>Let's Work Together</h1>
            <p>
              Open to collaborations, freelance projects, and creative
              partnerships.
            </p>
          </div>

          <div className="contact-form">
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" required />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  function CaseStudyMobileApp() {
    return (
      <main className="case-study" aria-label="Mobile UX App Case Study">
        <h1>Good Harvest App — UX Case Study</h1>
        <p>Author: Hillary Esposito</p>
        <h2> Project Concept </h2>
        <p>
          This project is a mobile app for both busy foodies and people new to
          seasonal eating, to help them quickly plan a meal or make a shopping
          list based on what produce is in season in their area.
        </p>

        <h2>Challenge</h2>
        <p>
          Key Requirements: Allows users to see what produce items are available in
          their region right now. Problem: “What’s in season right now in my
          area?”
        </p>

        <h2>Research & Insights</h2>
        <p>
          We conducted user interviews and usability tests, uncovering pain
          points around feature discoverability and visual overwhelm.
        </p>

        <h2>Outcome</h2>
        <p>
          The final product received positive feedback for its ease of use and
          engaging UI, increasing user retention by 25%.
        </p>
      </main>
    );
  }

  function CaseStudyEcommerce() {
    return (
      <main className="case-study" aria-label="E-Commerce Platform Case Study">
        <h1>E-Commerce Platform — Case Study</h1>
        <p>
          This project entailed designing a modern e-commerce platform with an
          emphasis on conversion, brand storytelling, and accessibility.
        </p>

        <h2>Results</h2>
        <p>
          The revamped platform enhanced user trust and significantly boosted
          sales metrics.
        </p>
      </main>
    );
  }

  function CaseStudyHipstirredPhoto() {
    return (
      <main className="case-study" aria-label="Hipstirred Photo Case Study">
        <h1>Hipstirred Photo — Case Study</h1>
        <p>
          This project highlights a visually rich photography portfolio that
          blends minimal UI with storytelling.
        </p>
        <h2>Outcome</h2>
        <p>
          Increased visitor engagement and client inquiries through a compelling
          online presence.
        </p>
      </main>
    );
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <button
          className="logo"
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
          aria-label="Go to home"
        >
          {imgVisible && (
            <img
              src="assets/logo-cat.png"
              alt="Logo"
              onError={() => setImgVisible(false)}
            />
          )}
          <span className="logo-text">HILLARY</span>
        </button>

        {/* PRO-TIP: Toggle Icon based on menuOpen state */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="nav-link"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="nav-link"
            >
              PROJECTS
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="nav-link"
            >
              CONTACT
            </Link>
          </li>
          <li>
            <button
              className="theme-btn"
              onClick={() => {
                setDarkMode(!darkMode);
                setMenuOpen(false);
              }}
              aria-label="Toggle dark/light theme"
            >
              🌓
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-study/mobile-app" element={<CaseStudyMobileApp />} />
        <Route path="/case-study/ecommerce" element={<CaseStudyEcommerce />} />
        <Route
          path="/case-study/hipstirred-photo"
          element={<CaseStudyHipstirredPhoto />}
        />
      </Routes>

      <footer>
        <p>© 2026 Hillary Esposito</p>
      </footer>
    </div>
  );
}