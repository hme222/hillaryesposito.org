// src/pages/Home.tsx
import React, { useEffect, useState, useRef, useMemo, lazy, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { useT } from "../app/LanguageContext";
import type { StringKey } from "../i18n/strings";

// Lazy-loaded so three.js stays in its own chunk (only fetched when needed).
const WorkflowKnot = lazy(() => import("../components/WorkflowKnot"));
import KnotErrorBoundary from "../components/KnotErrorBoundary";
import { MedicalCrossIcon } from "../components/LineIcons";

// Static placeholder shown while the three.js chunk loads — mirrors the knot's
// RESOLVED 4-dot row (amber last, connector through) so it never contradicts
// either the tangle or the settled state it hands off to.
function HeroKnotFallback() {
  const xs = [60, 145, 230, 315];
  const y = 175;
  return (
    <div className="hero-knot" aria-hidden="true">
      <svg viewBox="0 0 375 350" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {xs.slice(0, -1).map((x, i) => (
          <line key={i} x1={x} y1={y} x2={xs[i + 1]} y2={y} stroke="#4f6b27" strokeWidth="1.4" opacity="0.4" />
        ))}
        {xs.map((x, i) => (
          <circle key={x} cx={x} cy={y} r={i === 3 ? 9 : 8} fill={i === 3 ? "#b87d35" : "#5a7a2e"} />
        ))}
      </svg>
    </div>
  );
}

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
  <div className="orb-bg" aria-hidden="true">
    <style>{orbStyles}</style>
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(80px)", width:400, height:400, top:-100, left:-100,
      background:"radial-gradient(circle, rgba(128,128,0,.22) 0%, rgba(107,142,35,.14) 50%, transparent 75%)",
      animation:"breathe1 8s ease-in-out 3", pointerEvents:"none", zIndex:0 }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", width:560, height:560, bottom:-160, right:-100,
      background:"radial-gradient(circle, rgba(85,107,47,.11) 0%, rgba(107,142,35,.06) 50%, transparent 75%)",
      animation:"breathe2 11s ease-in-out 3", pointerEvents:"none", zIndex:0 }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(60px)", width:340, height:340, bottom:-100, right:-60,
      background:"radial-gradient(circle, rgba(85,107,47,.18) 0%, rgba(107,142,35,.11) 50%, transparent 75%)",
      animation:"breathe2 11s ease-in-out 3", pointerEvents:"none" }} />
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(90px)", width:320, height:320, top:"50%", left:"50%",
      transform:"translate(-50%,-50%)",
      background:"radial-gradient(circle, rgba(128,128,0,.055) 0%, transparent 70%)",
      animation:"breathe3 14s ease-in-out 3", pointerEvents:"none", zIndex:0 }} />
  </div>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

type Project = {
  title: string; // proper noun — never translated
  subtitleKey: StringKey;
  descKey: StringKey;
  images?: string[];
  imageAltKey?: StringKey;
  icon?: React.ReactNode;
  cover?: string;
  bg: string;
  path?: string;
  comingSoon?: boolean;
  locked?: boolean;
  patentPending?: boolean;
};

// Display copy lives in src/i18n/strings.ts (keyed) so it can translate;
// structural data (assets, routes, gradients) stays here.
const PROJECTS: Project[] = [
  {
    title: "Grove",
    subtitleKey: "home.proj.grove.subtitle",
    descKey: "home.proj.grove.desc",
    images: ["/assets/grove/bouquet.png"],
    imageAltKey: "home.proj.grove.alt",
    bg: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a3a2a 100%)",
    path: "/case-study/grove",
  },
  {
    title: "MSK Cancer Center",
    subtitleKey: "home.proj.msk.subtitle",
    descKey: "home.proj.msk.desc",
    icon: <MedicalCrossIcon />,
    cover: "/assets/msk/mskcc-cover.png",
    imageAltKey: "home.proj.msk.alt",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 50%, #1a2a3a 100%)",
    path: "/case-study/msk",
  },
  {
    title: "Good Harvest",
    subtitleKey: "home.proj.gh.subtitle",
    descKey: "home.proj.gh.desc",
    images: [
      "/assets/good-harvest/goodharvest-home-wireframe.png",
      "/assets/good-harvest/goodharvest-app-mobile.png",
      "/assets/good-harvest/goodharvest-home-heatmap.png",
    ],
    imageAltKey: "home.proj.gh.alt",
    bg: "linear-gradient(135deg, #2e2a1a 0%, #3d3520 50%, #2a2215 100%)",
    path: "/case-study/good-harvest",
  },
  {
    title: "Mobbin",
    subtitleKey: "home.proj.mobbin.subtitle",
    descKey: "home.proj.mobbin.desc",
    images: ["/assets/mobbin/kikoff.png", "/assets/mobbin/polymarket.png", "/assets/mobbin/discover.png"],
    imageAltKey: "home.proj.mobbin.alt",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    path: "/case-study/mobbin",
    locked: true,
  },
];


// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const t = useT();
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

  // The knot is now purely a decorative "complexity → clarity" flourish — the
  // header nav (always visible) is the navigation, so no labels are pinned to it.

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
        aria-label={t("home.heroAria")} style={{ position:"relative", overflow:"hidden" }}>

        <OrbBackground />

        {/* Knot as an IMMERSIVE BACKDROP: the tangle resolves behind the whole
            hero (balls dimmed + masked at top/bottom for readability), while the
            text sits on top. Its nav words are a separate, un-dimmed layer that
            lands in the text-free middle band. */}
        <div className="hero-visual">
          <KnotErrorBoundary fallback={<HeroKnotFallback />}>
            <Suspense fallback={<HeroKnotFallback />}>
              <WorkflowKnot />
            </Suspense>
          </KnotErrorBoundary>

          {!prefersReducedMotion && (
            <button
              type="button"
              className="hero-knot-replay"
              onClick={() => window.dispatchEvent(new CustomEvent("knot:replay"))}
              aria-label={t("home.replayAria")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 4v4h4" />
              </svg>
              {t("home.replay")}
            </button>
          )}
        </div>

        <div className="hero-content hero-content--centered" style={{ position:"relative", zIndex:1 }}>

          {/* Lede clusters at the TOP; the copy sits at the BOTTOM (space-between),
              leaving the middle band for the knot-nav to breathe behind. */}
          <div className="hero-lede">
            {/* Status chip */}
            <motion.div className="home-status-chip" {...stagger(0)}>
              <span className="home-status-dot" aria-hidden="true" />
              {t("home.status")}
            </motion.div>

            <motion.h1 className="hero-title" {...stagger(0.08)}>
              HILLARY ESPOSITO
            </motion.h1>

            {/* Solid ink, sentence case — the H1 above keeps the viewport's one
                gradient treatment; amber stays reserved for the Resume node. */}
            <motion.p className="hero-positioning" {...stagger(0.12)}>
              {t("home.positioning")}
            </motion.p>
          </div>

          {/* Reserved band the knot-nav resolves INTO — keeps the nav row (and
              its words) in clear space between the lede above and the copy
              below, so nothing collides. The balls still animate full-height
              behind everything; only their resting row lands here. */}
          <div className="hero-knot-band" aria-hidden="true" />

          <div className="hero-copy">
            <motion.p className="hero-description" {...stagger(0.16)}>
              {t("home.description")}
            </motion.p>

            <motion.div className="hero-actions" {...stagger(0.24)}>
              <button type="button" className="hero-btn" onClick={scrollToContact}>
                {t("home.getInTouch")}
              </button>
              <button type="button" className="home-secondary-btn"
                onClick={() => navigate("/about")}>
                {t("home.seeApproach")}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CREDENTIALS — single inline strip
      ══════════════════════════════════════════ */}
      <section className="home-credentials-bar" aria-label={t("home.credentialsAria")}>
        <p className="home-credentials-inline">
          {t("home.credentials")}
        </p>
      </section>

      {/* ══════════════════════════════════════════
          2. PROOF — stats that back up the hero claim
      ══════════════════════════════════════════ */}
      <section className="section active home-proof-section" aria-label={t("home.proofAria")}>
        <motion.div
          className="home-proof-grid"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {([
            { value: "13+",  labelKey: "home.stat.years" },
            { value: "21K+", labelKey: "home.stat.clinicians" },
            { value: "85%",  labelKey: "home.stat.resupply" },
            { value: "20%",  labelKey: "home.stat.emr" },
          ] as { value: string; labelKey: StringKey }[]).map((s) => (
            <div key={s.labelKey} className="home-proof-card">
              <p className="home-proof-value gradient-text">{s.value}</p>
              <p className="home-proof-label">{t(s.labelKey)}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="home-role-fit-section" aria-label={t("home.fitAria")}>
        <div className="home-section-header">
          <p className="home-eyebrow">{t("home.fitEyebrow")}</p>
          <h2 className="section-title home-section-title">{t("home.fitTitle")}</h2>
        </div>

        <div className="home-role-fit-grid">
          {([
            ["01", "home.fit.internal.title", "home.fit.internal.desc"],
            ["02", "home.fit.roles.title", "home.fit.roles.desc"],
            ["03", "home.fit.logic.title", "home.fit.logic.desc"],
            ["04", "home.fit.ai.title", "home.fit.ai.desc"],
          ] as [string, StringKey, StringKey][]).map(([num, titleKey, descKey]) => (
            <article key={titleKey} className="home-role-fit-card feature">
              <span className="home-role-fit-card__num" aria-hidden="true">{num}</span>
              <h3 className="home-role-fit-card__title">{t(titleKey)}</h3>
              <p className="home-role-fit-card__desc">{t(descKey)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MINI ABOUT — a face + a short human blurb, linking to /about
      ══════════════════════════════════════════ */}
      <section id="about" className="home-mini-about" aria-label={t("home.about.aria")}>
        <div className="mini-about-photo">
          <img src="/assets/about/headshot.jpg" alt={t("home.about.photoAlt")} loading="lazy" />
        </div>
        <div className="mini-about-text">
          <h2 className="mini-about-eyebrow">{t("home.about.eyebrow")}</h2>
          <p className="mini-about-blurb">{t("home.about.blurb")}</p>
          <Link to="/about" className="mini-about-link">{t("home.about.link")}</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. PROJECTS — numbered cards
      ══════════════════════════════════════════ */}
      <section id="projects" className="section active projects home-projects-section"
        aria-label={t("home.projectsAria")}>

        <motion.div
          className="home-section-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="home-eyebrow">{t("home.eyebrow")}</p>
          <h2 className="section-title home-section-title">{t("home.projectsTitle")}</h2>
        </motion.div>

        <div className="home-projects-list">
          {PROJECTS.map((proj, idx) => {
            const isLocked = proj.locked && !mobbinUnlocked;
            const clickable = !!proj.path && !proj.comingSoon;

            const displayTitle = isLocked ? t("home.proj.ndaTitle") : proj.title;
            const displayDesc = isLocked ? t("home.proj.ndaDesc") : t(proj.descKey);
            const imageAlt = proj.imageAltKey ? t(proj.imageAltKey) : undefined;

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
                      alt={imageAlt || proj.title}
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : proj.images && !isLocked ? (
                    <div className={`home-proj-devices ${proj.images.length > 1 ? "home-proj-devices--multi" : ""}`}>
                      {proj.images.map((src, i) => (
                        <div key={src} className="home-proj-device" style={{ zIndex: proj.images!.length - i }}>
                          {/* Only the first image carries the alt; the rest are decorative duplicates. */}
                          <img src={src} alt={i === 0 ? imageAlt || "" : ""} loading="lazy" />
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
                    <div className="home-proj-icon-display" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <span>{proj.icon || "✦"}</span>
                    </div>
                  )}
                  {proj.comingSoon && <span className="home-proj-badge">{t("home.proj.comingSoon")}</span>}
                  {isLocked && <span className="home-proj-badge">{t("home.proj.passwordBadge")}</span>}
                  {proj.patentPending && <span className="home-proj-badge home-proj-badge--patent">{t("home.proj.patentBadge")}</span>}
                </div>

                {/* ── Text area ── */}
                <div className="home-proj-info">
                  <p className="home-proj-subtitle">{t(proj.subtitleKey)}</p>
                  <h3 className="home-proj-title">{displayTitle}</h3>
                  <p className="home-proj-desc">{displayDesc}</p>
                  {clickable ? (
                    <span className="home-proj-cta">{isLocked ? t("home.proj.unlock") : t("home.proj.view")}</span>
                  ) : (
                    <span className="home-proj-cta home-proj-cta--soon">{t("home.proj.comingSoon")}</span>
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
                    aria-label={isLocked ? t("home.proj.lockedViewAria") : t("home.proj.viewAria", { title: displayTitle })}
                    onMouseMove={handleCardTilt}
                    onMouseLeave={resetCardTilt}>
                    {cardInner}
                  </Link>
                ) : (
                  <div className="home-proj-card-link home-proj-card-link--soon" aria-label={t("home.proj.soonAria", { title: displayTitle })}
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
      <section id="contact" className="section active home-cta-section" aria-label={t("home.contactAria")}>
        <motion.div
          className="about-cta"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="about-cta-card home-cta-card" style={{ textAlign: "center", display: "block" }}>
              <h2 className="about-cta-title" style={{ marginBottom:"1rem" }}>
                {t("home.ctaTitle")}
              </h2>
              <p className="about-cta-content" style={{ color:"var(--muted)", lineHeight:1.8, marginBottom:"1.75rem", maxWidth: "52ch", margin: "0 auto 1.75rem" }}>
                {t("home.ctaBody")}
              </p>

              <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap", marginBottom:"1.5rem" }}>
                <a href={"mailto:" + email} className="hero-btn" style={{ display:"inline-block", fontSize:"0.9rem", padding:"1rem 2rem", textDecoration:"none" }} aria-label={t("home.ctaEmailAria")}>
                  {t("home.ctaEmail")}
                </a>
                <a href="https://cal.com/hillary-e" target="_blank" rel="noopener noreferrer" className="home-secondary-btn" style={{ display:"inline-block", fontSize:"0.9rem", padding:"1rem 2rem", textDecoration:"none" }} aria-label={t("home.ctaCallAria")}>
                  {t("home.ctaCall")}
                </a>
              </div>

              <p style={{ fontSize: "0.85rem", color: "var(--muted)", margin: 0 }}>
                <a href="https://www.linkedin.com/in/hillaryesposito/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", marginRight: "1.25rem" }} aria-label={t("home.linkedinAria")}>
                  LinkedIn
                </a>
                <a href="/assets/Hillary_Esposito_Portfolio_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)", marginRight: "1.25rem" }} aria-label={t("nav.resumeAria")}>
                  {t("home.resumeLink")}
                </a>
                <button type="button" style={{ background:"none", border:"none", cursor:"pointer", padding:0, font:"inherit", color:"var(--muted)" }}
                  onClick={() => navigate("/about")} aria-label={t("home.aboutLink")}>
                  {t("home.aboutLink")}
                </button>
              </p>
          </div>
        </motion.div>

      </section>
 </>
  );
}
