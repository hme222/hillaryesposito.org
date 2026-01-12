import React, { Dispatch, SetStateAction, useState } from "react";
import {
  BrowserRouter as Router,
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
            User Experience professional with 8+ years shaping thoughtful
            digital systems where clarity and trust matter most. Experienced in
            navigating ambiguity, aligning stakeholders, and supporting
            data-informed design and training initiatives that drive adoption
            and impact at scale.
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
            onClick={() => navigate("/case-study/hipstirred-photo")}
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
        <p>
          Author: Hillary Esposito
          <p></p>
          <h2> Project Concept </h2>
          This project is a mobile app for both busy foodies
          and people new to seasonal eating, to help them quickly plan a meal or
          make a shopping list based on what produce is in season in their area.
          The app will include seasonality information based on geographic
          region, how long the item is in season (June through October), simple
          recipe ideas based on that food, and some limited health information,
          such as whether a produce item is on the Environmental Working Group’s
          annual Clean Fifteen / Dirty Dozen list for most and least amount of
          pesticide residue on that product.
          <p> </p>
          <h2> Project Statement </h2> How might we
          reduce the time to plan meals around the food that is in season at the
          location we live in, in order to follow a more sustainable diet?
        </p>

        <h2>Challenge</h2>
        <p>
          Key Requirements: Allows users to see what produce items are available in
          their region right now
           Problem: “What’s in season right now in my
          area?” Gives users the ability to understand the difference between
          different varieties of the same produce item. Problem: “I see both red
          beets and golden beets at the farmers’ market, and I want to
          understand if these are cooked the same way, or if one is better than
          the other.” Allows users to see examples of simple recipes that
          include produce items that are currently in season. “Problem: “If
          tomatoes are in season, I want to see recipes that feature this
          ingredient.” Allows users to see whether it’s worth spending extra to
          buy an organic version of the produce item. Problem: “Do potatoes have
          a lot of pesticide residue that can’t be removed by rinsing them off?”
          Gives users basic nutritional information about produce items.
          Problem: “I want to know what the health benefits are, if any, of
          eating cherries.” Gives users the ability to select recipes in-app and
          add the ingredients to a shopping list Problem: “I want to make a
          shopping list so I can make the tomato soup and potato hash recipes I
          found in the app.” Allows users to export recipe data to ToDoist,
          Google Keep, Asana, Notion, or other popular to-do apps Problem: “I
          want to add my shopping list to the apps I’m already using for
          personal task management.” Allows users to skip ahead to see what’s in
          season next month, or what just came out of season — because sometimes
          crops are early or late. Problem: “Asparagus season should be over,
          but I still see lots of it at the market. I want to see some recipe
          ideas for cooking with asparagus.”
        </p>

        <h2>Research & Insights</h2>
        <p>
          We conducted user interviews and usability tests, uncovering pain
          points around feature discoverability and visual overwhelm.


          
        </p>

        <h2>Design Approach</h2>
        <p>
          By prioritizing minimalism and employing progressive disclosure, we
          created a clean interface that reveals advanced options only when
          needed.
        </p>

        <h2>Wireframes & Prototypes</h2>
        <p>
          Early wireframes focused on gesture-based navigation and large
          tappable areas for accessibility.
        </p>

        <h2>User Testing & Feedback</h2>
        <p>
          Iterative usability testing helped refine flows and color contrast to
          ensure the app is usable in various lighting conditions.
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

        <h2>Challenge</h2>
        <p>
          The existing site had a high bounce rate and low checkout completion.
          We needed to create trust and simplify the purchasing process.
        </p>

        <h2>Research & Strategy</h2>
        <p>
          Competitive analysis and heatmaps revealed areas where users hesitated
          or dropped off.
        </p>

        <h2>Design Solutions</h2>
        <p>
          We implemented a clear visual hierarchy, simplified navigation, and
          introduced micro-interactions to keep users engaged.
        </p>

        <h2>Accessibility Considerations</h2>
        <p>
          Ensured all components met WCAG 2.1 AA standards, including color
          contrast, keyboard navigation, and screen reader support.
        </p>

        <h2>Testing & Iteration</h2>
        <p>
          Conducted A/B tests that showed a 15% increase in completed purchases
          after redesign.
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
        <h2>Challenge</h2>
        <p>
          Showcase diverse photography styles while maintaining a cohesive brand
          presence and easy navigation.
        </p>
        <h2>Approach</h2>
        <p>
          Leveraged immersive visuals, smooth animations, and storytelling
          sections to engage visitors.
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
          onClick={() => setMenuOpen(false)}
          aria-label="Go to home section"
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

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
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
              onClick={() => setDarkMode(!darkMode)}
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
        <p>© 2025 Hillary Esposito</p>
      </footer>
    </div>
  );
}
