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

const OrbBackground: React.FC = () => (
  <>
    <style>{orbStyles}</style>
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(80px)", width:400, height:400, top:-100, left:-100,
      background:"radial-gradient(circle, rgba(128,128,0,.22) 0%, rgba(107,142,35,.14) 50%, transparent 75%)",
      animation:"breathe1 7s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", width:560, height:560, bottom:-160, right:-100,
      background:"radial-gradient(circle, rgba(85,107,47,.11) 0%, rgba(107,142,35,.06) 50%, transparent 75%)",
      animation:"breathe2 9s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(60px)", width:340, height:340, bottom:-100, right:-60,
      background:"radial-gradient(circle, rgba(85,107,47,.18) 0%, rgba(107,142,35,.11) 50%, transparent 75%)",
      animation:"breathe2 9s ease-in-out infinite", pointerEvents:"none" }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", width:320, height:320, top:"50%", left:"50%",
      transform:"translate(-50%,-50%)",
      background:"radial-gradient(circle, rgba(128,128,0,.055) 0%, transparent 70%)",
      animation:"breathe3 11s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
  </>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXPERTISE = [
  "UX Research", "Interaction Design", "Wireframing", "Prototyping",
  "Information Architecture", "Healthcare UX", "Accessibility (WCAG)",
  "Journey Mapping", "Systems Thinking", "Figma", "Design Systems",
];

const PROJECTS = [
  {
    num: "01",
    icon: "🌿",
    title: "Good Harvest",
    tags: ["Mobile App", "UX Research", "Figma"],
    desc: "A mobile app helping users plan meals around seasonal, local produce — reducing decision friction and making sustainable eating more accessible.",
    path: "/case-study/good-harvest",
  },
  {
    num: "02",
    icon: "🛍️",
    title: "E-Commerce Storefront",
    tags: ["UI Engineering", "Accessibility", "React"],
    desc: "An accessibility-first storefront demo with keyboard and screen reader support across discovery filters, quick view, and a cart drawer.",
    path: "/case-study/ecommerce",
  },
  {
    num: "03",
    icon: "👑",
    title: "Reina App",
    tags: ["Mobile Concept", "Service Design", "End-to-End"],
    desc: "A self-directed concept app designed to reduce stress and add clarity to destination wedding planning.",
    path: "/case-study/reina",
  },
];

const APPROACH = [
  { icon: "🔍", label: "Research first",   desc: "Every project starts with understanding the people who will use it." },
  { icon: "🗺️", label: "Map the system",   desc: "IA and journey maps before any pixels, so structure serves purpose." },
  { icon: "⚡", label: "Iterate fast",      desc: "Low-fi → test → refine. Confidence through cycles, not perfection." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const catRef     = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [showLuna, setShowLuna] = useState(false);
  const navigate = useNavigate();

  // Smooth-scroll helper — no hash change, no router interference
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll float on Luna
  useEffect(() => {
    const onScroll = () => {
      if (!catRef.current) return;
      const movement = Math.sin(window.scrollY * 0.002) * 20;
      catRef.current.style.transform = `translateY(${movement}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse-follow on Luna
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!catRef.current) return;
      const rect = catRef.current.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      catRef.current.style.transform = `translateX(-50%) rotate(${angle * 0.05}deg)`;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Show Luna when contact is visible
  useEffect(() => {
    const section = contactRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowLuna(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] as any },
  });

  return (
    <>
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section id="home" className="section active hero home-hero"
        aria-label="Home section" style={{ position:"relative", overflow:"hidden" }}>

        <OrbBackground />

        <div className="hero-content" style={{ position:"relative", zIndex:1 }}>

          {/* Status chip */}
          <motion.div className="home-status-chip" {...stagger(0)}>
            <span className="home-status-dot" aria-hidden="true" />
            Available for opportunities
          </motion.div>

          <motion.h1 className="hero-title" {...stagger(0.08)}>
            HILLARY ESPOSITO
          </motion.h1>

          <div className="hero-copy">
            <motion.p className="hero-description" {...stagger(0.16)}>
              I design for clarity in the moments that matter. Veteran turned UX
              designer with experience in healthcare, government, and
              high-pressure systems — driven by curiosity, grounded in service,
              focused on helping people feel more capable.
            </motion.p>

            <motion.div className="hero-actions" {...stagger(0.24)}>
              <button type="button" className="hero-btn" onClick={scrollToContact}>
                Get in touch
              </button>
              <button type="button" className="home-secondary-btn"
                onClick={() => navigate("/about")}>
                About me →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EXPERTISE SCROLL STRIP
      ══════════════════════════════════════════ */}
      <div className="home-expertise-strip" aria-label="Areas of expertise">
        <div className="home-expertise-track">
          {/* Duplicated for seamless loop */}
          {[...EXPERTISE, ...EXPERTISE].map((skill, i) => (
            <React.Fragment key={i}>
              <span className="home-expertise-item">{skill}</span>
              <span className="home-expertise-sep" aria-hidden="true">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. APPROACH
      ══════════════════════════════════════════ */}
      <section className="section active home-approach-section" aria-label="Design approach">
        <div className="home-section-header">
          <p className="home-eyebrow">How I work</p>
          <h2 className="section-title home-section-title">Design approach</h2>
        </div>
        <div className="home-approach-grid">
          {APPROACH.map((a) => (
            <div key={a.label} className="home-approach-card feature">
              <span className="home-approach-icon">{a.icon}</span>
              <h3 style={{ color:"var(--fg)", margin:"0.6rem 0 0.4rem", fontSize:"1.05rem" }}>{a.label}</h3>
              <p style={{ color:"var(--muted)", fontSize:"0.95rem", lineHeight:1.65, margin:0 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. PROJECTS — numbered cards
      ══════════════════════════════════════════ */}
      <section id="projects" className="section active projects home-projects-section"
        aria-label="Projects section">

        <div className="home-section-header">
          <p className="home-eyebrow">Selected work</p>
          <h2 className="section-title home-section-title">Projects</h2>
        </div>

        <div className="home-projects-list">
          {PROJECTS.map((proj) => (
            <article
              key={proj.path}
              className="home-project-row"
              onClick={() => navigate(proj.path)}
              role="button"
              tabIndex={0}
              aria-label={`View ${proj.title} case study`}
              onKeyDown={(e) => e.key === "Enter" && navigate(proj.path)}
            >
              {/* Number */}
              <span className="home-proj-num gradient-text" aria-hidden="true">{proj.num}</span>

              {/* Icon chip */}
              <div className="home-proj-icon-wrap">
                <div className="project-icon">{proj.icon}</div>
              </div>

              {/* Copy */}
              <div className="home-proj-copy">
                <div className="home-proj-title-row">
                  <h3 className="home-proj-title">{proj.title}</h3>
                  <div className="home-proj-tags" aria-label="Tags">
                    {proj.tags.map((t) => (
                      <span key={t} className="home-proj-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <p className="home-proj-desc">{proj.desc}</p>
              </div>

              {/* Arrow */}
              <span className="home-proj-arrow" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CTA STRIP
      ══════════════════════════════════════════ */}
      <section className="section active home-cta-section" aria-label="What I'm looking for">
        <div className="about-cta">
          <div className="about-cta-card home-cta-card">
            {/* Left */}
            <div className="home-cta-left">
              <h2 className="about-cta-title" style={{ marginBottom:"1rem" }}>
                What I'm looking for
              </h2>
              <p className="about-cta-content" style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:"1.5rem" }}>
               I’m seeking a role where I can apply research, systems thinking, and interaction design to help people navigate complex, high-stakes scenarios.
              
              </p>
              <p className="about-cta-highlight" style={{ marginBottom:"1.75rem" }}>
                If you're building something that matters, let's talk.
              </p>
              <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                <button type="button" className="hero-btn"
                  style={{ fontSize:"0.9rem", padding:"1rem 2rem" }}
                  onClick={scrollToContact}>
                  Get in touch
                </button>
                <button type="button" className="about-back-btn"
                  onClick={() => navigate("/about")} style={{ fontSize:"0.9rem" }}>
                  Read my story →
                </button>
              </div>
            </div>

            {/* Right: domain chips */}
            <div className="home-cta-right" aria-label="Focus areas">
              {[
                { icon: "🏥", label: "Healthcare UX",       sub: "EHR · Clinical workflows" },
                { icon: "🏛️", label: "Government services",  sub: "Service design · Civic tech" },
                { icon: "📱", label: "Consumer products",    sub: "High-stakes decisions" },
                { icon: "♿", label: "Accessibility",        sub: "WCAG · Inclusive design" },
              ].map((d) => (
                <div key={d.label} className="home-domain-chip feature">
                  <span style={{ fontSize:"1.3rem" }}>{d.icon}</span>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"0.9rem", margin:0, color:"var(--fg)" }}>{d.label}</p>
                    <p style={{ fontSize:"0.78rem", color:"var(--muted)", margin:0 }}>{d.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" ref={contactRef}
        className="section active contact-hero"
        aria-label="Contact section">

        <div className="contact-container">
          <div className="contact-info">
            <h1>Let's build something together</h1>
            <p>
              Freelance, full-time, or collaborations. If you're hiring or
              launching, I'd love to chat.
            </p>
          </div>

          <div className="contact-form">
            <form autoComplete="off" noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (catRef.current) {
                  catRef.current.classList.add("tail-wag");
                  setTimeout(() => catRef.current?.classList.remove("tail-wag"), 1500);
                }
                alert("Thanks — I'll reply soon.");
                (e.target as HTMLFormElement).reset();
              }}>
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

        {/* Floating Luna */}
        <div ref={catRef} className={`about-luna ${showLuna ? "is-visible" : ""}`}>
          <img src="/assets/favicon.png" alt="Luna, a gray and white cat with orange eyes" />
        </div>
      </section>
    </>
  );
}