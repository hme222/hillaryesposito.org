import React, { Dispatch, SetStateAction, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
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
            UX Designer who codes modern, accessible web experiences. I design
            and build intuitive, high-performance interfaces with a focus on
            usability, accessibility, and real-world impact.
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
        <h2> Project Overview </h2>
        <p>
          is a mobile app designed for busy food lovers and people new to
          seasonal eating. The app helps users quickly plan meals and create
          shopping lists based on what produce is currently in season in their
          geographic area. The goal is to make sustainable eating easier by
          providing: Regional seasonality information Simple, seasonal recipes
          Basic nutrition and health insights Smart shopping list tools My Role:
          UX Researcher & Designer Tools: Figma, User Surveys, Interviews,
          Competitive Analysis This project is a mobile app for both busy
          foodies and people new to seasonal eating, to help them quickly plan a
          meal or make a shopping list based on what produce is in season in
          their area. The app will include seasonality information based on
          geographic region, how long the item is in season (June through
          October), simple recipe ideas based on that food, and some limited
          health information, such as whether a produce item is on the
          Environmental Working Group’s annual Clean Fifteen / Dirty Dozen list
          for most and least amount of pesticide residue on that product. How
          might we reduce the time to plan meals around the food that is in
          season at the location we live in, in order to follow a more
          sustainable diet?
        </p>

        <h2>The Problem </h2>
        <p>
          Many people want to eat more sustainably, but struggle to plan meals around seasonal produce. Finding accurate, location-based seasonality information, understanding produce varieties, and deciding whether to buy organic can be time-consuming and confusing.
          
          Core User Question

“What’s in season right now in my area?”

Design Challenge

How might we reduce the time it takes to plan meals using seasonal produce, so people can follow a more sustainable diet?
        </p>
        <h2>Research Summary </h2>
        <p>
          To better understand user needs, I conducted:

User surveys

Interviews

Behavioral analysis

Competitive analysis & SWOT

Key Insights

Users want quick answers about what’s in season locally

Many are confused by different produce varieties

People want simple recipe ideas, not complex meal plans

Shoppers want to know when organic purchases actually matter

Most users already use task management apps for shopping lists

These insights shaped the core features of the app.
        </p>
        <h2> Design </h2>
        <p>
          1. See What’s in Season Locally

User Problem:

“What’s in season right now in my area?”

Solution:
The app shows region-specific produce based on the user’s location and current month.
2. Understand Produce Varieties

User Problem:

“I see red beets and golden beets — are they cooked the same way?”

Solution:
Each produce item includes variety comparisons with flavor and cooking notes.
3. Discover Simple Recipes

User Problem:

“If tomatoes are in season, I want recipe ideas that use them.”

Solution:
The app suggests easy, seasonal recipes featuring currently available produce.
4. Make Smarter Organic Choices

User Problem:

“Do potatoes have a lot of pesticide residue?”

Solution:
The app includes Environmental Working Group (EWG) Clean Fifteen / Dirty Dozen info so users can decide when organic is worth the cost.
5. Learn Basic Health Benefits

User Problem:

“What are the health benefits of cherries?”

Solution:
Each produce item includes simple nutritional highlights.

6. Build a Shopping List

User Problem:

“I want to make a list for the recipes I found.”

Solution:
Users can add ingredients directly to an in-app shopping list.
7. Export to Existing Apps

User Problem:

“I already use Notion / ToDoist / Google Keep.”

Solution:
Users can export their lists to popular productivity tools.

8. View Upcoming or Past Seasons

User Problem:

“Asparagus should be out of season, but I still see it.”

Solution:
Users can view past and upcoming seasonal produce to account for early or late harvests.

Final Problem Statement

How might we help people quickly plan meals around seasonal produce in their local area, so sustainable eating feels simple and accessible?

        </p>
        <h2> Build </h2>
        <p>
          The final product received positive feedback for its ease of use and
          engaging UI, increasing user retention by 25%.
        </p>
        <h2> Results</h2>
        <p>
          The final product received positive feedback for its ease of use and
          engaging UI, increasing user retention by 25%.
        </p>
        <h2> Takeaways</h2>
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
