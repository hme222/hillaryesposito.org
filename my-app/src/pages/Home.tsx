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

        {/* Floating Luna */}
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
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. REINA — Featured concept
      ══════════════════════════════════════════ */}
      <section id="reina" className="projects reina" aria-label="Reina project section">
        <div className="page-width reina__wrap">

          <header className="reina__overview" aria-label="Reina project overview">
            <div className="reina__tag" aria-label="Featured Concept">
              <span aria-hidden="true">👑</span>
              <span>Featured Concept</span>
            </div>

            <h1 className="section-title reina__title">Reina</h1>

            <p className="reina__lead">
              Helping couples discover and schedule international wedding venues with
              confidence.{" "}
              <span className="reina__muted">
                A self-directed concept app designed to reduce stress and add clarity
                to destination wedding planning.
              </span>
            </p>

            <div className="reina__summary" aria-label="Problem approach outcome summary">
              <div className="reina__summaryItem">
                <div className="reina__kicker">Problem</div>
                <p className="reina__summaryText">
                  Destination planning is emotionally high-stakes and logistically
                  complex, especially when venues are abroad.
                </p>
              </div>
              <div className="reina__summaryItem">
                <div className="reina__kicker">Approach</div>
                <p className="reina__summaryText">
                  A guided flow that combines preference capture, visual shortlisting,
                  and consultant support to reduce overwhelm.
                </p>
              </div>
              <div className="reina__summaryItem">
                <div className="reina__kicker">Outcome</div>
                <p className="reina__summaryText">
                  A concept experience that turns browsing into a clear shortlist and
                  a scheduled visit plan.
                </p>
              </div>
            </div>

            <dl className="reina__meta" aria-label="Reina project details">
              <div className="reina__metaItem">
                <dt>Role</dt>
                <dd>UX Designer & Researcher</dd>
              </div>
              <div className="reina__metaItem">
                <dt>Timeline</dt>
                <dd>Self-Directed Project</dd>
              </div>
              <div className="reina__metaItem">
                <dt>Type</dt>
                <dd>Mobile App Concept</dd>
              </div>
            </dl>
          </header>

          <figure className="reina__preview">
            <button
              type="button"
              className="reina__imageWrap"
              onClick={() => navigate("/case-study/reina")}
              aria-label="Open Reina case study"
            >
              <img
                className="reina__image"
                src="/assets/reina-flow.png"
                alt="Reina core user flow wireframes: discovery, preferences, swipe gallery, consultation chat, visitation schedule."
                loading="lazy"
              />
            </button>
            <figcaption className="reina__caption">
              Reina guides users through selecting preferences, browsing venues,
              consulting with an expert, and receiving a personalized visitation
              schedule — tailored for destination weddings abroad.
            </figcaption>
          </figure>

          <section className="reina__flow" aria-label="Core user flow">
            <h2 className="reina__sectionTitle">Core user flow</h2>
            <ol className="reina__flowList">
              {CALLOUTS.map((c) => (
                <li key={c.step} className="reina__flowRow">
                  <div className="reina__flowStep">{c.step}</div>
                  <div className="reina__flowBody">
                    <div className="reina__flowTitle">{c.title}</div>
                    <div className="reina__flowDesc">{c.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="reina__notes" aria-label="Design reflections">
            <h2 className="reina__sectionTitle">Design reflections</h2>
            <div className="reina__noteStack">
              <article className="reina__note">
                <h4 className="reina__noteTitle">What I practiced</h4>
                <ul className="reina__bullets">
                  <li>Designing end-to-end UX for a multi-touch, service-oriented app</li>
                  <li>Creating structured choice without overwhelming users</li>
                  <li>Balancing inspiration with utility in a high-emotion domain</li>
                </ul>
              </article>
              <article className="reina__note">
                <h4 className="reina__noteTitle">Next steps</h4>
                <ul className="reina__bullets">
                  <li>Add booking + calendar integration</li>
                  <li>Test form length vs. completion rate</li>
                  <li>Explore language localization for global use</li>
                </ul>
              </article>
              <article className="reina__note">
                <h4 className="reina__noteTitle">Portfolio impact</h4>
                <ul className="reina__bullets">
                  <li>Demonstrates end-to-end flow design and information hierarchy</li>
                  <li>Expands my work into consumer, emotion-driven decision making</li>
                  <li>Shows service + product thinking (expert support integrated into UX)</li>
                  <li>Highlights clarity and structure in complex, high-stakes choices</li>
                </ul>
              </article>
              <article className="reina__note">
                <h4 className="reina__noteTitle">Constraints & assumptions</h4>
                <ul className="reina__bullets">
                  <li>Concept project (no live inventory or vendor integrations)</li>
                  <li>Focused on discovery + scheduling rather than booking/payment</li>
                  <li>Designed for early-stage planners who need clarity fast</li>
                </ul>
              </article>
            </div>
          </section>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" aria-label="About section">
        <div className="about-page">

          <div className="about-hero">
            <div className="about-hero-content">
              <p className="about-intro">
                I'm a UX designer driven by curiosity and a desire to help people
                navigate complexity with more clarity and confidence.
              </p>
              <h2 className="about-title">
                I turn complex, high‑pressure systems into experiences that feel
                intuitive, manageable, and human.
              </h2>
            </div>
          </div>

          <div className="about-journey">
            <div className="about-chapters">

              <div className="about-chapter about-chapter--msk">
                <div className="chapter-marker">
                  <div className="chapter-dot" />
                  <span className="chapter-label">Where I Discovered UX</span>
                </div>
                <h2 className="chapter-heading">Healthcare showed me what design can do.</h2>
                <p className="chapter-text">
                  I was introduced to UX while working at Memorial Sloan Kettering
                  Cancer Center, where I supported research and design efforts for
                  internal tools used by 21,000+ staff. Clinicians, administrators,
                  researchers — all navigating life-and-death decisions through digital
                  interfaces.
                </p>
                <p className="chapter-text">
                  Seeing how small interface decisions could influence understanding,
                  efficiency, and stress levels sparked my interest in designing systems
                  that prioritize clarity and ease of use. A confusing workflow isn't
                  just frustrating in healthcare; it could mean a missed diagnosis, a
                  delayed treatment, a moment of uncertainty when someone needs absolute
                  clarity.
                </p>
                <p className="chapter-text">
                  I redesigned EHR features. I reengineered certification workflows. I
                  guided system rollouts. But more than anything, I learned to design
                  with deep respect for the weight people carry.
                </p>
              </div>

              <div className="about-chapter about-chapter--army">
                <div className="chapter-marker">
                  <div className="chapter-dot" />
                  <span className="chapter-label">Where the Foundation Was Built</span>
                </div>
                <h2 className="chapter-heading">The Army taught me adaptability and systems thinking.</h2>
                <p className="chapter-text">
                  Earlier in my career, I served in the Army National Guard while
                  balancing civilian work. As a logistics officer, I directed systems
                  for 5,000+ deployed soldiers. When you're coordinating supplies
                  across combat zones, there's no room for ambiguity.
                </p>
                <p className="chapter-text">
                  That experience strengthened my adaptability, collaboration skills,
                  and comfort working within complex systems. It also shaped how I
                  approach problem-solving — with steadiness and care for the people
                  navigating those systems under pressure.
                </p>
                <p className="chapter-text">
                  My deployment gave me a perspective I bring to every project: design
                  for people who are stressed, overwhelmed, and making decisions that
                  truly matter.
                </p>
              </div>

              <div className="about-chapter about-chapter--reina">
                <div className="chapter-marker">
                  <div className="chapter-dot" />
                  <span className="chapter-label">Where I Explored End-to-End</span>
                </div>
                <h2 className="chapter-heading">Personal projects taught me to design for emotion.</h2>
                <p className="chapter-text">
                  Outside of professional work, I enjoy building projects that let me
                  explore design problems from end to end. One of those projects, Reina,
                  is a mobile app created to help couples plan destination weddings with
                  less uncertainty.
                </p>
                <p className="chapter-text">
                  Not every high-stakes moment happens in a hospital or a combat zone.
                  Sometimes it's a couple trying to balance family expectations, budget
                  constraints, and the dream of a perfect day. The stress is different,
                  but the need for clarity and calm is exactly the same.
                </p>
                <p className="chapter-text">
                  Designing for an emotionally charged experience reinforced an important
                  lesson: regardless of context, people benefit from tools that help them
                  feel informed, supported, and capable.
                </p>
              </div>

            </div>
          </div>

          <div className="about-growth">
            <h2 className="about-growth-title">Building technical fluency</h2>
            <p className="about-growth-text">
              After transitioning fully out of the military, I made a deliberate decision
              to focus on strengthening my design and technical foundation. I completed
              three full-time bootcamps in UX design, data analytics, and software
              engineering to better understand how design, data, and technology work together.
            </p>
            <p className="about-growth-text">
              This experience helped me become more fluent in collaborating across
              disciplines and more confident working within technical constraints. I work
              at the intersection of UX, service design, and systems thinking — with a
              focus on healthcare, government, and products where people are time-pressed
              or making decisions that shape their lives.
            </p>
          </div>

          <div className="about-life">
            <div className="about-life-card">
              <h2 className="about-life-title">Life as a veteran</h2>
              <div className="about-life-intro">
                <p>
                  After my deployment, I found myself gravitating toward routines that
                  bring calm and clarity — the same things I try to design into every
                  interface.
                </p>
              </div>
              <div className="about-hobbies">
                <div className="hobby-card">
                  <div className="hobby-icon">🏃‍♀️</div>
                  <h3 className="hobby-title">Running</h3>
                  <p className="hobby-desc">
                    Miles give me time to think through design problems and decompress
                    from complexity.
                  </p>
                </div>
                <div className="hobby-card">
                  <div className="hobby-icon">📚</div>
                  <h3 className="hobby-title">Reading</h3>
                  <p className="hobby-desc">
                    Books remind me that every story — like every design — needs
                    structure, empathy, and purpose.
                  </p>
                </div>
                <div className="hobby-card">
                  <div className="hobby-icon">🐱</div>
                  <h3 className="hobby-title">Luna</h3>
                  <p className="hobby-desc">
                    My cat Luna keeps me grounded. She's excellent at reminding me when
                    it's time to step away from the screen.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
