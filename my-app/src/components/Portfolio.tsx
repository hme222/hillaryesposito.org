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

  // Home Component
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
              onClick={() => setMenuOpen(false)}
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  // Projects Component
  function Projects() {
    return (
      <section
        className="section active projects"
        aria-label="Projects section"
      >
        <h2 className="section-title">PROJECTS</h2>
        <div className="projects-grid">
          <div
            className="project-card"
            role="button"
            tabIndex={0}
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/mobile-app");
            }}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate("/case-study/mobile-app")
            }
            aria-label="Go to Good Harvest Mobile App case study"
          >
            <h3>Good Harvest - UX Mobile App</h3>
            <p>
              A mobile app for busy foodies and people new to seasonal eating,
              helping them quickly plan meals or make shopping lists based on
              what produce is in season in their area.
            </p>
          </div>

          <div
            className="project-card"
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
            <p>
              High-conversion design system for modern digital storefronts with
              enhanced user trust and significantly boosted sales metrics.
            </p>
          </div>

          <div
            className="project-card"
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
              sleek UI, increasing visitor engagement and client inquiries.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Contact Component
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
              partnerships. Whether you have a question or just want to say hi,
              feel free to reach out!
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

  // Case Study: Good Harvest Mobile App
  function CaseStudyMobileApp() {
    return (
      <main className="case-study" aria-label="Good Harvest UX Case Study">
        <h1>Good Harvest — UX Case Study</h1>
        <p className="meta">
          Role: UX Researcher & Designer · Tools: Figma, Surveys, Interviews
        </p>

        <section>
          <h2>Overview</h2>
          <p>
            Good Harvest is a mobile app that helps users plan meals and build
            shopping lists using produce that is in season in their local area.
            The goal is to make sustainable eating faster, easier, and more
            accessible for everyone.
          </p>
        </section>

        <section>
          <h2>Problem</h2>
          <p>
            People want to eat more sustainably but struggle to find accurate,
            location-based information about seasonal produce. Comparing produce
            varieties, choosing organic options, and planning meals takes too
            much time and effort.
          </p>

          <p className="highlight">
            How might we help people quickly plan meals around seasonal produce
            in their area?
          </p>
        </section>

        <section>
          <h2>Research</h2>
          <p>
            I conducted comprehensive user research to understand the pain
            points and opportunities:
          </p>
          <ul>
            <li>User surveys & in-depth interviews</li>
            <li>Behavioral analysis and user journey mapping</li>
            <li>Competitive analysis & SWOT assessment</li>
          </ul>

          <p>
            <strong>Key Insights:</strong>
          </p>
          <ul>
            <li>Users want fast, local seasonality information</li>
            <li>Produce varieties are confusing and overwhelming</li>
            <li>People prefer simple, quick recipes over complex ones</li>
            <li>Organic choices feel unclear and inconsistent</li>
            <li>Most users already use task management apps</li>
          </ul>
        </section>

        <section>
          <h2>Design Solutions</h2>

          <div className="feature">
            <h3>Local Seasonal Produce</h3>
            <p>
              Shows what's in season based on the user's location and current
              month, eliminating guesswork and research time.
            </p>
          </div>

          <div className="feature">
            <h3>Produce Variety Comparison</h3>
            <p>
              Explains differences between similar produce items (e.g., types of
              apples or lettuce) to help users make informed choices.
            </p>
          </div>

          <div className="feature">
            <h3>Simple Recipes</h3>
            <p>
              Provides quick, seasonal meal ideas that integrate seamlessly with
              available produce, reducing planning time.
            </p>
          </div>

          <div className="feature">
            <h3>Organic Guidance</h3>
            <p>
              Uses EWG (Environmental Working Group) data to guide organic
              purchases, helping users prioritize their spending.
            </p>
          </div>

          <div className="feature">
            <h3>Shopping List + Exports</h3>
            <p>
              Users can export shopping lists to popular task apps like Notion,
              Google Keep, or Todoist for seamless workflow integration.
            </p>
          </div>
        </section>

        <section>
          <h2>Impact & Results</h2>
          <p>
            The design solutions directly addressed user pain points, creating a
            streamlined experience that made seasonal eating accessible and
            practical for daily life.
          </p>
        </section>

        <section>
          <h2>Takeaways</h2>
          <p>
            This project strengthened my ability to translate research insights
            into usable product features and design for real-world constraints.
            I learned the importance of integration with existing user workflows
            and the value of simplifying complex information.
          </p>
        </section>
      </main>
    );
  }

  // Case Study: E-Commerce Platform
  function CaseStudyEcommerce() {
    return (
      <main className="case-study" aria-label="E-Commerce Platform Case Study">
        <h1>E-Commerce Platform — Case Study</h1>
        <p className="meta">Role: UX/UI Designer · Tools: Figma, Sketch</p>

        <section>
          <h2>Overview</h2>
          <p>
            This project entailed designing a modern e-commerce platform with an
            emphasis on conversion optimization, brand storytelling, and
            accessibility standards.
          </p>
        </section>

        <section>
          <h2>Challenge</h2>
          <p>
            The existing platform had low conversion rates, poor mobile
            experience, and accessibility issues that prevented users from
            completing purchases.
          </p>
        </section>

        <section>
          <h2>Solution</h2>
          <div className="feature">
            <h3>Streamlined Checkout Flow</h3>
            <p>
              Reduced checkout steps from 5 to 3, implementing guest checkout
              and auto-fill capabilities.
            </p>
          </div>

          <div className="feature">
            <h3>Mobile-First Design</h3>
            <p>
              Prioritized mobile experience with touch-friendly interfaces and
              optimized image loading.
            </p>
          </div>

          <div className="feature">
            <h3>Accessibility Compliance</h3>
            <p>
              Implemented WCAG 2.1 AA standards with proper contrast ratios,
              keyboard navigation, and screen reader support.
            </p>
          </div>
        </section>

        <section>
          <h2>Results</h2>
          <p>
            The revamped platform enhanced user trust and significantly boosted
            sales metrics:
          </p>
          <ul>
            <li>40% increase in conversion rate</li>
            <li>60% reduction in cart abandonment</li>
            <li>Enhanced brand perception and customer satisfaction</li>
          </ul>
        </section>
      </main>
    );
  }

  // Case Study: Hipstirred Photo
  function CaseStudyHipstirredPhoto() {
    return (
      <main className="case-study" aria-label="Hipstirred Photo Case Study">
        <h1>Hipstirred Photo — Case Study</h1>
        <p className="meta">Role: UI Designer · Tools: Figma, Adobe Creative Suite</p>

        <section>
          <h2>Overview</h2>
          <p>
            This project highlights a visually rich photography portfolio that
            blends minimal UI with compelling storytelling to showcase creative
            work.
          </p>
        </section>

        <section>
          <h2>Goal</h2>
          <p>
            Create an immersive portfolio experience that puts the photography
            front and center while maintaining intuitive navigation and fast
            load times.
          </p>
        </section>

        <section>
          <h2>Design Approach</h2>
          <div className="feature">
            <h3>Visual Hierarchy</h3>
            <p>
              Used generous whitespace and large imagery to create breathing
              room and focus attention on the photography.
            </p>
          </div>

          <div className="feature">
            <h3>Minimal UI</h3>
            <p>
              Implemented subtle navigation and interface elements that don't
              compete with the visual content.
            </p>
          </div>

          <div className="feature">
            <h3>Performance Optimization</h3>
            <p>
              Optimized image delivery with lazy loading and responsive images
              for fast, smooth browsing.
            </p>
          </div>
        </section>

        <section>
          <h2>Outcome</h2>
          <p>
            Increased visitor engagement and client inquiries through a
            compelling online presence that effectively showcases the
            photographer's unique style and capabilities.
          </p>
        </section>
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
              alt="Hillary Esposito Logo"
              onError={() => setImgVisible(false)}
            />
          )}
          <span className="logo-text">HILLARY</span>
        </button>

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