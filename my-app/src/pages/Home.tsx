// src/pages/Home.tsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

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
  @media (prefers-reduced-motion: reduce) {
    [style*="breathe1"], [style*="breathe2"], [style*="breathe3"] { animation: none !important; }
  }
`;

const OrbBackground: React.FC = () => (
  <div aria-hidden="true">
    <style>{orbStyles}</style>
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(80px)", width:400, height:400, top:-100, left:-100,
      background:"radial-gradient(circle, rgba(128,128,0,.22) 0%, rgba(107,142,35,.14) 50%, transparent 75%)",
      animation:"breathe1 8s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", width:560, height:560, bottom:-160, right:-100,
      background:"radial-gradient(circle, rgba(85,107,47,.11) 0%, rgba(107,142,35,.06) 50%, transparent 75%)",
      animation:"breathe2 11s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(60px)", width:340, height:340, bottom:-100, right:-60,
      background:"radial-gradient(circle, rgba(85,107,47,.18) 0%, rgba(107,142,35,.11) 50%, transparent 75%)",
      animation:"breathe2 11s ease-in-out infinite", pointerEvents:"none" }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", width:320, height:320, top:"50%", left:"50%",
      transform:"translate(-50%,-50%)",
      background:"radial-gradient(circle, rgba(128,128,0,.055) 0%, transparent 70%)",
      animation:"breathe3 14s ease-in-out infinite", pointerEvents:"none", zIndex:0 }} />
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  images?: string[];
  imageAlt?: string;
  icon?: string;
  bg: string;
  path?: string;
  comingSoon?: boolean;
  locked?: boolean;
  patentPending?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Grove",
    subtitle: "Product Design · AI Judgment",
    desc: "31-user survey reshaped the MVP. AI accelerated the build — research led every decision.",
    images: ["/assets/grove/grove1.png"],
    imageAlt: "Grove plant care app",
    bg: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a3a2a 100%)",
    path: "/case-study/grove",
  },
  {
    title: "Good Harvest",
    subtitle: "Product Design · UX Research",
    desc: "Heatmap testing with 22 users revealed the problem wasn't discoverability — it was trust.",
    images: [
      "/assets/good-harvest/goodharvest-home-wireframe.png",
      "/assets/good-harvest/goodharvest-app-mobile.png",
      "/assets/good-harvest/goodharvest-home-heatmap.png",
    ],
    imageAlt: "Good Harvest wireframe, final design, and heatmap testing",
    bg: "linear-gradient(135deg, #2e2a1a 0%, #3d3520 50%, #2a2215 100%)",
    path: "/case-study/good-harvest",
  },
  {
    title: "Mobbin",
    subtitle: "Freelance · UX Flow Documentation",
    desc: "Three fintech apps documented for Mobbin's UX pattern library. Flow capture and UI pattern curation at scale.",
    images: ["/assets/mobbin/kikoff.png", "/assets/mobbin/polymarket.png", "/assets/mobbin/discover.png"],
    imageAlt: "Fintech app screens catalogued for UX pattern library",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    path: "/case-study/mobbin",
    locked: true,
  },
  {
    title: "Hera",
    subtitle: "Product Design · Brand Strategy",
    desc: "Premium headband line from concept to product. Same process, different medium.",
    images: ["/assets/hera/hera_1.jpg"],
    imageAlt: "Hera premium headband product",
    bg: "linear-gradient(135deg, #2e1a2e 0%, #3d2040 50%, #2a1535 100%)",
    comingSoon: true,
    patentPending: true,
    },
];

const APPROACH = [
  { icon: "🔬", label: "Research-first thinking",     desc: "I map workflows and interview users before designing anything." },
  { icon: "🧩", label: "Systems perspective",          desc: "I think in workflows, not wireframes — people, tools, and processes together." },
  { icon: "🤖", label: "AI judgment",                  desc: "I know when to use AI, how to evaluate its outputs, and where human judgment leads." },
  { icon: "🤝", label: "Cross-disciplinary fluency",   desc: "I translate between clinicians, engineers, and operators so decisions become usable systems." },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const catRef     = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const [showLuna, setShowLuna] = useState(false);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  usePageTitle();

  const mobbinUnlocked = useMemo(() => sessionStorage.getItem("mobbin-unlocked") === "true", []);

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

  // (Mouse-follow removed — Luna sits in the corner now, scroll bob is enough)


  // contact 
  const [copied, setCopied] = useState(false);
const email = "espositohillary@gmail.com";

function handleCopy() {
  navigator.clipboard.writeText(email);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
}

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

  const stagger = (delay: number) => prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, delay, ease: [0.2, 0.8, 0.2, 1] as any },
      };

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

          <motion.p className="hero-role-label" {...stagger(0.10)}>
            Product Designer
          </motion.p>

          <motion.p className="hero-positioning hero-positioning-gradient" {...stagger(0.12)}>
            I redesign how people and processes work together.
          </motion.p>

          <div className="hero-copy">
            <motion.p className="hero-description" {...stagger(0.16)}>
              Eight years in healthcare and military systems — bridging UX, process improvement, and AI.
            </motion.p>

            <motion.div className="hero-actions" {...stagger(0.24)}>
              <button type="button" className="hero-btn" onClick={scrollToContact}>
                Get in touch
              </button>
              <button type="button" className="home-secondary-btn"
                onClick={() => navigate("/about")}>
                See my approach →
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CREDENTIALS — single inline strip
      ══════════════════════════════════════════ */}
      <section className="home-credentials-bar" aria-label="Professional credentials">
        <p className="home-credentials-inline">
          Lean Six Sigma Green Belt · MHA, Rutgers · UX Certified · Army Veteran · Bilingual EN/ES
        </p>
      </section>

      {/* ══════════════════════════════════════════
          2. PROOF — stats that back up the hero claim
      ══════════════════════════════════════════ */}
      <section className="section active home-proof-section" aria-label="Experience highlights">
        <motion.div
          className="home-proof-grid"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {[
            { value: "8+",  label: "Years redesigning complex systems" },
            { value: "21K+", label: "Clinicians impacted, MSK Cancer Center" },
            { value: "85%",  label: "Faster resupply, NJ Army National Guard" },
            { value: "70%",  label: "Recipe CTA engagement after redesign" },
          ].map((s) => (
            <div key={s.label} className="home-proof-card">
              <p className="home-proof-value gradient-text">{s.value}</p>
              <p className="home-proof-label">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          3. PROJECTS — numbered cards
      ══════════════════════════════════════════ */}
      <section id="projects" className="section active projects home-projects-section"
        aria-label="Projects section">

        <motion.div
          className="home-section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="home-eyebrow">Selected work</p>
          <h2 className="section-title home-section-title">Projects</h2>
        </motion.div>

        <div className="home-projects-list">
          {PROJECTS.map((proj, idx) => {
            const isLocked = proj.locked && !mobbinUnlocked;
            const clickable = !!proj.path && !proj.comingSoon;

            const displayTitle = isLocked ? "NDA Project" : proj.title;
            const displayDesc = isLocked
              ? "Three fintech apps documented at production quality. Password required to view."
              : proj.desc;

            const cardVariants = {
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: idx * 0.1, ease: [0.2, 0.8, 0.2, 1] } },
            };

            const cardInner = (
              <div className="home-proj-card-inner">
                {/* ── Image area ── */}
                <div className="home-proj-preview" style={{ background: proj.bg }}>
                  {proj.images && !isLocked ? (
                    <div className={`home-proj-devices ${proj.images.length > 1 ? "home-proj-devices--multi" : ""}`}>
                      {proj.images.map((src, i) => (
                        <div key={src} className="home-proj-device" style={{ zIndex: proj.images!.length - i }}>
                          <img src={src} alt="" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  ) : isLocked ? (
                    <div className="home-proj-icon-display">
                      <span>🔒</span>
                    </div>
                  ) : (
                    <div className="home-proj-icon-display">
                      <span>{proj.icon || "✦"}</span>
                    </div>
                  )}
                  {proj.comingSoon && <span className="home-proj-badge">Coming soon</span>}
                  {isLocked && <span className="home-proj-badge">Password protected</span>}
                  {proj.patentPending && <span className="home-proj-badge home-proj-badge--patent">Patent Pending</span>}
                </div>

                {/* ── Text area ── */}
                <div className="home-proj-info">
                  <p className="home-proj-subtitle">{proj.subtitle}</p>
                  <h3 className="home-proj-title">{displayTitle}</h3>
                  <p className="home-proj-desc">{displayDesc}</p>
                  {clickable ? (
                    <span className="home-proj-cta">{isLocked ? "Unlock case study →" : "View case study →"}</span>
                  ) : (
                    <span className="home-proj-cta home-proj-cta--soon">Coming soon</span>
                  )}
                </div>
              </div>
            );

            return (
              <motion.div
                key={proj.title}
                variants={cardVariants}
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {clickable ? (
                  <Link to={proj.path!} className="home-proj-card-link" aria-label={`View ${proj.title} case study`}>
                    {cardInner}
                  </Link>
                ) : (
                  <div className="home-proj-card-link home-proj-card-link--soon" aria-label={`${proj.title}, coming soon`}>
                    {cardInner}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          APPROACH — how I work
      ══════════════════════════════════════════ */}
      <section className="home-approach-section" aria-label="How I work">
        <div className="home-approach-grid">
          {APPROACH.map((a) => (
            <div key={a.label} className="home-approach-card feature">
              <span className="home-approach-icon" aria-hidden="true">{a.icon}</span>
              <h3 className="home-approach-label">{a.label}</h3>
              <p className="home-approach-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CTA + CONTACT (merged)
      ══════════════════════════════════════════ */}
      <section id="contact" ref={contactRef} className="section active home-cta-section" aria-label="Contact section">
        <motion.div
          className="about-cta"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="about-cta-card home-cta-card">
            {/* Left */}
            <div className="home-cta-left">
              <h2 className="about-cta-title" style={{ marginBottom:"1rem" }}>
                What I’m looking for
              </h2>
              <p className="about-cta-content" style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:"1.75rem" }}>
                I bring research, systems thinking, and process improvement to products where clarity directly impacts outcomes. If you’re building for healthcare, government, or enterprise — let’s talk.
              </p>

              <div className="contact-email-block" style={{ marginTop: 0, marginBottom: "1.25rem" }}>
                <a href={"mailto:" + email} className="contact-email-link" aria-label="Send email">
                  {email}
                </a>
                <button onClick={handleCopy} className="contact-copy-btn" aria-label="Copy email address">
                  {copied ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="contact-links-row" style={{ marginBottom: "1.25rem" }}>
                <a href="https://www.linkedin.com/in/hillaryesposito/" target="_blank" rel="noopener noreferrer" className="contact-link-btn">
                  LinkedIn →
                </a>
                <a href="/assets/Hillary_Esposito_Portfolio_Resume.pdf" target="_blank" rel="noopener noreferrer" className="contact-link-btn">
                  Resume →
                </a>
              </div>

              <button type="button" className="about-back-btn"
                onClick={() => navigate("/about")} style={{ fontSize:"0.9rem" }}>
                Read my story →
              </button>
            </div>

            {/* Right: domain chips */}
            <div className="home-cta-right" aria-label="Focus areas">
              {[
                { icon: "🏥", label: "Healthcare systems",        sub: "EHR · Clinical workflows · Operational transformation" },
                { icon: "🏛️", label: "Government services",       sub: "Civic tech · Service design · USDS" },
                { icon: "🏢", label: "Enterprise tools",          sub: "Internal platforms · Complex workflows" },
                { icon: "⚡", label: "Operational transformation", sub: "Process improvement · Workflow optimization" },
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
        </motion.div>

        {/* Floating Luna */}
        <div ref={catRef} className={`about-luna ${showLuna ? "is-visible" : ""}`}>
          <img src="/assets/favicon.png" alt="Luna, a gray and white cat with orange eyes" />
        </div>
      </section>
 </>
  ); 
}