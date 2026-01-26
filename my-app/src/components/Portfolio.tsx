import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

interface PortfolioProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

const reveal = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1 },
};

type MediaCardProps = {
  src: string;
  alt: string;
  caption: string;
  contain?: boolean;
};

function MediaCard({ src, alt, caption, contain = true }: MediaCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className="cs-media"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }
      }
    >
      {/* Whole card clickable */}
      <a
        className="media-card media-card-link"
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full size: ${alt}`}
      >
        <span className="media-link">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={contain ? "contain" : undefined}
          />
        </span>

        <figcaption>{caption}</figcaption>

        <span className="cs-actions">
          <span className="cs-link">Open full size ↗</span>
        </span>
      </a>
    </motion.figure>
  );
}

function RecruiterSkimCard({
  title,
  what,
  outcome,
  myRole,
  skills,
  timeframe,
  onBackToStory,
}: {
  title: string;
  what: string;
  outcome: string;
  myRole: string;
  skills: string[];
  timeframe?: string;
  onBackToStory: () => void;
}) {
  return (
    <aside id="recruiter-summary" className="cs-skim" aria-label={`${title} recruiter quick skim`}>
      <div className="cs-skim-head">
        <h2 className="cs-skim-title">Recruiter quick-skim</h2>
        {timeframe ? <p className="cs-skim-meta">{timeframe}</p> : null}
      </div>

      <div className="cs-skim-grid">
        <div className="cs-skim-block">
          <h3>What</h3>
          <p>{what}</p>
        </div>

        <div className="cs-skim-block">
          <h3>Outcome</h3>
          <p>{outcome}</p>
        </div>

        <div className="cs-skim-block">
          <h3>My role</h3>
          <p>{myRole}</p>
        </div>

        <div className="cs-skim-block">
          <h3>Skills</h3>
          <ul className="cs-skim-tags" aria-label="Skills used">
            {skills.map((s) => (
              <li key={s} className="cs-tag">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Micro-link (fixed) */}
      <p className="cs-micro">
        <button type="button" className="cs-micro-link" onClick={onBackToStory}>
          Back to full story ↑
        </button>
      </p>
    </aside>
  );
}

export function Portfolio({ darkMode, setDarkMode }: PortfolioProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgVisible, setImgVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const asset = (p: string) => `${process.env.PUBLIC_URL}${p}`;

  // Smooth scroll helper with fixed-nav offset
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navOffset = 110; // adjust if your navbar height changes
    const y = el.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  function Home() {
    return (
      <section className="section active hero" aria-label="Home section">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="hero-title"
          >
            HILLARY ESPOSITO
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          >
            UX Designer who codes modern, accessible web experiences. I design and build intuitive, high-performance interfaces with a focus on usability, accessibility, and real-world impact.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <Link to="/contact" className="hero-btn" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  function Projects() {
    return (
      <section className="section active projects" aria-label="Projects section">
        <h2 className="section-title">PROJECTS</h2>

        <div className="projects-grid">
          <div
            className="project-card project"
            role="button"
            tabIndex={0}
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/good-harvest");
            }}
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
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/ecommerce");
            }}
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
            onClick={() => {
              setMenuOpen(false);
              navigate("/case-study/hipstirred-photo");
            }}
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

  function Contact() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      alert("Thanks—I'll reply soon.");
      e.currentTarget.reset();
    }

    return (
      <section className="section active contact-hero" aria-label="Contact section">
        <div className="contact-container">
          <div className="contact-info">
            <h1>Let’s build something</h1>
            <p>Freelance, full-time, or collaborations. If you’re hiring or launching, I’d love to chat.</p>
          </div>

          <div className="contact-form">
            <form autoComplete="off" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={6} />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  function CaseStudyGoodHarvest() {
    // Toggle state (session-only)
    const [recruiterMode, setRecruiterMode] = useState<boolean>(() => {
      const saved = sessionStorage.getItem("recruiterMode");
      return saved === "1";
    });

    useEffect(() => {
      sessionStorage.setItem("recruiterMode", recruiterMode ? "1" : "0");
    }, [recruiterMode]);

    // If recruiter mode turns on, scroll to the recruiter card
    useEffect(() => {
  if (!recruiterMode) return;

  const id = window.setTimeout(() => {
    scrollToId("recruiter-summary");
  }, 0);

  return () => window.clearTimeout(id);
}, [recruiterMode]);



    const screens = useMemo(
      () => ({
        homeWire: asset("/assets/good-harvest/goodharvest-home-wireframe.png"),
        homeHeat: asset("/assets/good-harvest/goodharvest-home-heatmap.png"),
        localWire: asset("/assets/good-harvest/goodharvest-localproduce-wireframe.png"),
        localHeat: asset("/assets/good-harvest/goodharvest-localproduce-heatmap.png"),
        recipesWire: asset("/assets/good-harvest/goodharvest-recipes-wireframe.png"),
        recipesHeat: asset("/assets/good-harvest/goodharvest-recipes-heatmap.png"),
      }),
      []
    );

    return (
      <main className="case-study" aria-label="Good Harvest UX Case Study">
        <header className="cs-header">
          <h1>Good Harvest -  UX Case Study</h1>
          <p className="meta">UX Research & Design · Mobile App · Figma</p>
          <p className="intro">
            Good Harvest is a mobile app that helps users plan meals and build shopping lists using produce that is in season in their local area. The goal is to make sustainable eating faster, easier, and more accessible for everyone.
          </p>

          {/* Recruiter CTA line (visible to everyone) */}
          <p className="recruiter-cta">
            Recruiter?{" "}
            <button
              type="button"
              className="recruiter-toggle-link"
              onClick={() => setRecruiterMode((v) => !v)}
            >
              {recruiterMode ? "Hide quick project breakdown ←" : "Click for a quick project breakdown →"}
            </button>
          </p>
        </header>

        {/* Recruiter card (only if toggled on) */}
        {recruiterMode && (
          <RecruiterSkimCard
            title="Good Harvest"
            what="Mobile app for seasonal produce, recipes, and shopping lists—localized by region."
            outcome="A faster “scan → choose → act” flow validated with prototype testing + heatmaps."
            myRole="End-to-end UX: research, IA, wireframes, prototypes, iteration."
            skills={[
              "Interviews",
              "Surveys",
              "Journey mapping",
              "Competitive analysis",
              "SWOT",
              "Prototyping",
              "Accessibility",
            ]}
            timeframe="Project snapshot"
            onBackToStory={() => scrollToId("full-case-study")}
          />
        )}

        {/* Full case study anchor for micro-link */}
        <div id="full-case-study" />

        <section>
          <h2>Problem</h2>
          <p>
            People want to eat more sustainably but struggle to find accurate, location-based information about seasonal produce. Comparing produce varieties, choosing organic options, and planning meals takes too much time and effort.
          </p>
          <p className="highlight">
            How might we help people quickly plan meals around seasonal produce in their area?
          </p>
        </section>

        <section>
          <h2>My role</h2>
          <ul>
            <li>UX Research + UX Design (end-to-end)</li>
            <li>Information architecture + core flows</li>
            <li>Wireframes + prototypes</li>
            <li>Validation via testing + heatmaps</li>
          </ul>
        </section>

        <section>
          <h2>Process</h2>
          <ol className="process">
            <li>
              <strong>Research →</strong> interviews, surveys, competitor/SWOT, journey map
            </li>
            <li>
              <strong>Design →</strong> simplify decisions with hierarchy
            </li>
            <li>
              <strong>Prototype →</strong> test speed + comprehension
            </li>
            <li>
              <strong>Iterate →</strong> refine emphasis + reduce hesitation
            </li>
          </ol>
        </section>

        <section>
          <h2>Research insights</h2>
          <ul>
            <li>Users want fast, local seasonality information.</li>
            <li>Produce varieties are confusing and overwhelming.</li>
            <li>Users prefer simple, quick recipes over complex ones</li>
            <li>Organic guidance feels inconsistent.</li>
            <li>Most users already use task management apps.</li>
          </ul>
          <p className="note">
            Competitive analysis + SWOT showed a gap: lots of info, little decision support. Journey mapping showed drop-off
            between “what’s in season” and “what do I make?” → informed a recipe-forward flow.
          </p>
        </section>

        <section>
          <h2>Design solutions</h2>

          <div className="feature">
            <h3>Local seasonal produce</h3>
            <p>Shows what's in season based on the user's location and current month, eliminating guesswork and research time.</p>
          </div>

          <div className="feature">
            <h3>Variety comparison</h3>
            <p>Explains differences between similar produce items (e.g., types of apples or lettuce) to help users make informed choices. Plain-language differences for quick confidence.</p>
          </div>

          <div className="feature">
            <h3>Simple recipes</h3>
            <p>Provides quick, seasonal meal ideas that integrate seamlessly with available produce, reducing planning time.</p>
          </div>

          <div className="feature">
            <h3>Organic guidance</h3>
            <p>Uses EWG (Environmental Working Group) data to guide organic purchases, helping users prioritize their spending.</p>
          </div>

          <div className="feature">
            <h3>Shopping lists + exports</h3>
            <p> Users can export shopping lists to popular task apps like Notion, Google Keep, or Todoist for seamless workflow integration.</p>
          </div>
        </section>

        <section>
          <h2>Validation (prototype + heatmaps)</h2>
          <p>Prototype testing confirmed speed + comprehension; heatmaps verified hierarchy.</p>

          <h3>Home</h3>
          <div className="cs-gallery cols-3">
            <MediaCard
              src={screens.homeWire}
              alt="Good Harvest home wireframe showing layout hierarchy"
              caption="Wireframe: hierarchy + tap targets."
            />
            <MediaCard
              src={screens.homeHeat}
              alt="Heatmap showing attention on seasonal produce module"
              caption="Heatmap: produce first—secondary actions clarified."
            />
            <MediaCard
              src={screens.localWire}
              alt="Local produce wireframe showing location-based filtering"
              caption="Local view: faster decisions."
            />
          </div>

          <h3>Local + Recipes</h3>
          <div className="cs-gallery cols-3">
            <MediaCard
              src={screens.localHeat}
              alt="Heatmap of local produce view showing focus on primary controls"
              caption="Heatmap: primary controls found first."
            />
            <MediaCard
              src={screens.recipesWire}
              alt="Recipes wireframe showing seasonal recipe cards"
              caption="Recipes: quick picks."
            />
            <MediaCard
              src={screens.recipesHeat}
              alt="Heatmap of recipes showing attention on cards and CTA"
              caption="Heatmap: CTA placement validated."
            />
          </div>
        </section>

        <section>
          <h2>Impact</h2>
          <p>
            The design solutions directly addressed user pain points, creating a streamlined experience that made seasonal eating accessible and practical for daily life.
          </p>
          <ul>
            <li>Reduced decision friction with “scan → choose → act.”</li>
            <li>Lowered overwhelm via progressive disclosure.</li>
            <li>Improved adoption likelihood through workflow exports.</li>
          </ul>
        </section>

        <section>
          <h2>What I learned</h2>
          <p>
            This project strengthened my ability to translate research insights into usable product features and design for real-world constraints. I learned the importance of integration with existing user workflows and the value of simplifying complex information.
          </p>
        </section>
      </main>
    );
  }

  function CaseStudyEcommerce() {
    return (
      <main className="case-study" aria-label="E-Commerce Platform Case Study">
        <header className="cs-header">
          <h1>E-Commerce Platform</h1>
          <p className="meta">UX/UI Design · Figma</p>
          <p className="intro">Checkout + design system refresh.</p>
        </header>
      </main>
    );
  }

  function CaseStudyHipstirredPhoto() {
    return (
      <main className="case-study" aria-label="Hipstirred Photo Case Study">
        <header className="cs-header">
          <h1>Hipstirred Photo</h1>
          <p className="meta">UI Design · Motion + Storytelling</p>
          <p className="intro">A story-led portfolio designed for immersion and speed.</p>
        </header>
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
          type="button"
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
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)} className="nav-link">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="nav-link">
              PROJECTS
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="nav-link">
              CONTACT
            </Link>
          </li>
          <li>
            <button
              className="theme-btn"
              onClick={() => {
                setDarkMode((d) => !d);
                setMenuOpen(false);
              }}
              aria-label="Toggle dark/light theme"
              type="button"
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

        <Route path="/case-study/good-harvest" element={<CaseStudyGoodHarvest />} />
        <Route path="/case-study/ecommerce" element={<CaseStudyEcommerce />} />
        <Route path="/case-study/hipstirred-photo" element={<CaseStudyHipstirredPhoto />} />
      </Routes>

      <footer>
        <p>© 2026 Hillary Esposito</p>
      </footer>
    </div>
  );
}
