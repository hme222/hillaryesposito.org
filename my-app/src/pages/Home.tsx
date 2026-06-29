// src/pages/Home.tsx
import React, { useEffect, useRef, useMemo, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

// Lazy-loaded so three.js stays in its own chunk (only fetched when needed).
const WorkflowKnot = lazy(() => import("../components/WorkflowKnot"));

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
  cover?: string;
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
    desc: "Research to working prototype in 3 weeks, solo. 32-user survey reshaped the MVP. AI accelerated the build. Testing next.",
    images: ["/assets/grove/grove1.png"],
    imageAlt: "Grove plant care app",
    bg: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a3a2a 100%)",
    path: "/case-study/grove",
  },
  {
    title: "MSK Cancer Center",
    subtitle: "UX & Product Design · Healthcare Systems",
    desc: "Six years, three roles. Redesigned clinical workflows, onboarding, and EMR systems for 21,000+ clinicians at one of the world's top cancer centers.",
    icon: "🏥",
    cover: "/assets/msk/mskcc-cover.png",
    imageAlt: "Memorial Sloan Kettering Cancer Center",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 50%, #1a2a3a 100%)",
    path: "/case-study/msk",
  },
  {
    title: "Good Harvest",
    subtitle: "Product Design · UX Research",
    desc: "Heatmap testing with 22 users revealed the problem wasn't discoverability; it was trust.",
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
    subtitle: "Freelance · UX Flow Documentation · Pattern Curation",
    desc: "Documented end-to-end mobile experiences across three fintech apps for Mobbin's design reference library. 200+ screens captured, annotated, and tagged.",
    images: ["/assets/mobbin/kikoff.png", "/assets/mobbin/polymarket.png", "/assets/mobbin/discover.png"],
    imageAlt: "Fintech app screens catalogued for UX pattern library",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    path: "/case-study/mobbin",
    locked: true,
  },
];


// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const contactRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  usePageTitle();

  const mobbinUnlocked = useMemo(() => sessionStorage.getItem("mobbin-unlocked") === "true", []);

  // Handle scrollTo query param from cross-route navigation (e.g. a case study
  // → "Projects"). The page is still laying out (fonts, images, framer-motion)
  // when we mount, so a single scroll lands short. We re-scroll across a few
  // delays — recomputing the target each time to catch late layout shifts —
  // then clean the URL. setTimeout is used (not rAF) so it still fires when the
  // tab is backgrounded/throttled.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get("scrollTo");
    if (!scrollTarget) return;

    const navHeight = 80;
    const scrollToEl = () => {
      const el = document.getElementById(scrollTarget);
      if (!el) return;
      const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight);
      window.scrollTo({ top: y, behavior: "auto" });
    };

    const timers = [0, 80, 200, 400].map((d) => window.setTimeout(scrollToEl, d));
    // Clean the URL after the last reposition. Pathname is unchanged, so
    // ScrollToTop won't re-fire.
    timers.push(window.setTimeout(() => navigate("/", { replace: true }), 460));

    return () => timers.forEach((t) => clearTimeout(t));
  }, [location.search, navigate]);

  // Smooth-scroll helper — no hash change, no router interference
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const email = "espositohillary@gmail.com";

  // Subtle cursor-driven 3D tilt on project cards (the site's one "3D touch").
  // Disabled for reduced-motion and touch; resets on leave.
  const TILT_MAX = 6; // degrees
  const handleCardTilt = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${px * TILT_MAX}deg`);
    el.style.setProperty("--rx", `${-py * TILT_MAX}deg`);
  };
  const resetCardTilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

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

        <div className="hero-content hero-content--split" style={{ position:"relative", zIndex:1 }}>

          <div className="hero-text">

          {/* Status chip */}
          <motion.div className="home-status-chip" {...stagger(0)}>
            <span className="home-status-dot" aria-hidden="true" />
            Available for opportunities
          </motion.div>

          <motion.h1 className="hero-title" {...stagger(0.08)}>
            HILLARY ESPOSITO
          </motion.h1>

          <motion.p className="hero-positioning hero-positioning-gradient" {...stagger(0.12)}>
            Turning complex healthcare and enterprise workflows into trusted digital products.
          </motion.p>

          <div className="hero-copy">
            <motion.p className="hero-description" {...stagger(0.16)}>
              UX/Product Designer. 13+ years of leadership across process improvement, clinical systems, military operations, and UX research. Army veteran.
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
          </div>{/* /hero-text */}

          <div className="hero-visual">
            <Suspense fallback={null}>
              <WorkflowKnot />
            </Suspense>
            {!prefersReducedMotion && (
              <button
                type="button"
                className="hero-knot-replay"
                onClick={() => window.dispatchEvent(new CustomEvent("knot:replay"))}
                aria-label="Replay the animation"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7" />
                  <path d="M3 4v4h4" />
                </svg>
                Replay
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CREDENTIALS — single inline strip
      ══════════════════════════════════════════ */}
      <section className="home-credentials-bar" aria-label="Professional credentials">
        <p className="home-credentials-inline">
          Army Captain · Lean Six Sigma Green Belt · MHA, Rutgers · Bilingual EN/ES
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
            { value: "13+",  label: "Years of leadership across healthcare, military, and UX" },
            { value: "21K+", label: "Clinicians impacted, MSK Cancer Center" },
            { value: "85%",  label: "Faster resupply, NJ Army National Guard" },
            { value: "20%",  label: "EMR cost reduction, MSK Cancer Center" },
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
                  {proj.cover && !isLocked ? (
                    <img
                      className="home-proj-cover"
                      src={proj.cover}
                      alt={proj.imageAlt || proj.title}
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : proj.images && !isLocked ? (
                    <div className={`home-proj-devices ${proj.images.length > 1 ? "home-proj-devices--multi" : ""}`}>
                      {proj.images.map((src, i) => (
                        <div key={src} className="home-proj-device" style={{ zIndex: proj.images!.length - i }}>
                          <img src={src} alt={proj.imageAlt || ""} loading="lazy" />
                        </div>
                      ))}
                    </div>
                  ) : isLocked ? (
                    <div className="home-proj-icon-display home-proj-icon-display--lock" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="5" y="10.5" width="14" height="9.5" rx="2.6" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M8.2 10.5V7.6a3.8 3.8 0 0 1 7.6 0v2.9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <circle cx="12" cy="14.4" r="1.3" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M12 15.7v1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
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
                  <Link to={proj.path!}
                    className={`home-proj-card-link${isLocked ? " home-proj-card-link--locked" : ""}`}
                    aria-label={`View ${proj.title} case study`}
                    onMouseMove={handleCardTilt}
                    onMouseLeave={resetCardTilt}>
                    {cardInner}
                  </Link>
                ) : (
                  <div className="home-proj-card-link home-proj-card-link--soon" aria-label={`${proj.title}, coming soon`}
                    onMouseMove={handleCardTilt}
                    onMouseLeave={resetCardTilt}>
                    {cardInner}
                  </div>
                )}
              </motion.div>
            );
          })}
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
          <div className="about-cta-card home-cta-card" style={{ textAlign: "center", display: "block" }}>
              <h2 className="about-cta-title" style={{ marginBottom:"1rem" }}>
                Let’s talk about your product
              </h2>
              <p className="about-cta-content" style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:"1.75rem", maxWidth: "52ch", margin: "0 auto 1.75rem" }}>
                I turn complex workflows into tools people trust. If your team needs a UX/product designer with deep healthcare, enterprise, or operations experience, let’s talk.
              </p>

              <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"1.5rem" }}>
                <a href={"mailto:" + email} className="hero-btn" style={{ display:"inline-block", fontSize:"0.9rem", padding:"1rem 2rem", textDecoration:"none" }} aria-label="Send me a note">
                  Send me a note
                </a>
                <a href="https://cal.com/hillary-e" target="_blank" rel="noopener noreferrer" className="home-secondary-btn" style={{ display:"inline-block", fontSize:"0.9rem", padding:"1rem 2rem", textDecoration:"none" }} aria-label="Book a call (opens in new tab)">
                  Book a call →
                </a>
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0 }}>
                <a href="https://www.linkedin.com/in/hillaryesposito/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", marginRight: "1.25rem" }} aria-label="LinkedIn profile (opens in new tab)">
                  LinkedIn
                </a>
                <a href="/assets/Hillary_Esposito_Portfolio_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", marginRight: "1.25rem" }} aria-label="Download resume (opens in new tab)">
                  Resume
                </a>
                <button type="button" style={{ background:"none", border:"none", cursor:"pointer", padding:0, font:"inherit", color:"var(--muted)" }}
                  onClick={() => navigate("/about")} aria-label="About me">
                  About me
                </button>
              </p>
          </div>
        </motion.div>

      </section>
 </>
  );
}