import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RisoDefs from "../components/riso/RisoDefs";
import CartoField from "../components/riso/CartoField";
import { CLIENT_FEEDBACK, CLIENT_FEEDBACK_ES } from "../data/clientFeedback";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage, useT } from "../app/LanguageContext";
import type { StringKey } from "../i18n/strings";
import "../styles/riso.css";
import "../styles/riso-page.css";

/**
 * Home — the portfolio index in the Risograph Cartography system.
 * Left-aligned, Archivo + Space Mono, coral spot ink, eucalyptus paper.
 * Replaces the old centered particle-backdrop hero.
 */

const WORK = [
  {
    n: "01",
    title: "Memorial Sloan Kettering",
    subKey: "home.proj.msk.subtitle",
    descKey: "home.riso.mskDesc",
    path: "/case-study/msk",
    img: "/assets/msk/mskcc-map.png",
    imgAltKey: "home.riso.mskAlt",
  },
  {
    n: "02",
    title: "Grove",
    subKey: "home.proj.grove.subtitle",
    descKey: "home.riso.groveDesc",
    path: "/case-study/grove",
    img: "/assets/grove/grove1.png",
    imgAltKey: "home.riso.groveAlt",
    tagKey: "home.riso.groveTag",
  },
  {
    n: "03",
    title: "Mobbin",
    subKey: "home.proj.mobbin.subtitle",
    descKey: "home.riso.mobbinDesc",
    path: "/case-study/mobbin",
    img: "/assets/mobbin/discover.jpg",
    imgAltKey: "home.riso.mobbinAlt",
  },
] satisfies Array<{
  n: string;
  title: string;
  subKey: StringKey;
  descKey: StringKey;
  path: string;
  img: string;
  imgAltKey: StringKey;
  tagKey?: StringKey;
}>;

const STATS = [
  { n: "200+", labelKey: "home.stat.patterns", sourceKey: "home.stat.mobbinSource" },
  { n: "32", labelKey: "home.stat.research", sourceKey: "home.stat.groveSource" },
  { n: "21,000+", labelKey: "home.stat.scale", sourceKey: "home.stat.mskSource" },
] satisfies Array<{ n: string; labelKey: StringKey; sourceKey: StringKey }>;

export default function RisoHome() {
  usePageTitle();
  const t = useT();
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Preserve global shell deep-links such as /?scrollTo=projects when the
  // reader returns from a case study or uses the footer. The Riso homepage is
  // layout-stable, but the second pass catches the font swap before cleaning
  // the URL so the destination never lands under the sticky navigation.
  useEffect(() => {
    const target = new URLSearchParams(location.search).get("scrollTo");
    if (!target) return;

    const move = () => {
      document.getElementById(target)?.scrollIntoView({ behavior: "auto", block: "start" });
    };
    const timers = [0, 160].map((delay) => window.setTimeout(move, delay));
    timers.push(window.setTimeout(() => navigate("/", { replace: true }), 220));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [location.search, navigate]);

  const toContact = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("contact")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="riso-page riso-home">
      <RisoDefs />

      {/* HERO */}
      <header className="rp-hero" id="home">
        <CartoField
          mapSrc="/riso/painted-cartography-01.jpg"
          edition="paint"
          mapZoom={1.03}
          mapPosition="58% 48%"
          mapOpacity={0.9}
        />
        <div className="rp-hero__content">
          <div className="rp-clearing">
            <span className="rp-eyebrow">{t("home.riso.eyebrow")}</span>
            <h1 className="rp-h1">{t("home.riso.heroTitle")}</h1>
            <p className="rp-sub">
              {t("home.riso.heroLead")} <b>{t("home.riso.heroProof")}</b>{" "}
              {t("home.riso.heroClose")}
            </p>
            <p className="rp-status">{t("home.status")}</p>
            <div className="rp-hero__ctas">
              <button type="button" className="rp-cta" onClick={toContact}>{t("home.getInTouch")} →</button>
              <Link className="rp-cta rp-cta--ghost" to="/about">{t("home.seeApproach")}</Link>
              <button
                type="button"
                className="rp-recruiter-link"
                onClick={() => window.dispatchEvent(new CustomEvent("open-recruiter-panel"))}
              >
                {t("recruiter.pill")}{lang === "es" ? " · EN" : ""} · {t("recruiter.seconds")} →
              </button>
            </div>
          </div>
        </div>
        <div className="rp-hero__media">
          <div className="rp-headshot">
            <img src="/assets/about/headshot.jpg" alt="Hillary Esposito" />
          </div>
        </div>
      </header>

      {/* CREDENTIAL STRIP — recovered from the previous design. The standing
          decision is that Lean Six Sigma, the MHA, and military service belong
          on the homepage rather than buried in About; the rebuild had dropped
          them from every public page. MSK/Mobbin/Grove are deliberately not
          repeated here — they are the work list directly below. */}
      <ul className="rp-trustStrip" aria-label={t("home.trustAria")}>
        {(["home.trust.credentials", "home.trust.army", "home.trust.bilingual"] as StringKey[]).map((key) => (
          <li key={key}>{t(key)}</li>
        ))}
      </ul>

      {/* PROOF */}
      <section className="rp-section rp-section--alt" aria-labelledby="home-proof-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{t("home.riso.proofKicker")}</p>
          <h2 className="rp-title" id="home-proof-title">{t("home.riso.proofTitle")}</h2>
          <div className="rp-outcomes">
            {STATS.map((s) => (
              <div className="rp-stat" key={s.n}>
                <p className="rp-stat__n">{s.n}</p>
                <p className="rp-stat__l">{t(s.labelKey)}</p>
                <p className="rp-stat__source">{t(s.sourceKey)}</p>
              </div>
            ))}
          </div>

          {/* The numbers are self-reported; this is the one voice on the site
              that isn't Hillary's, so it belongs with the proof rather than
              three pages deep on About. */}
          {(lang === "es" ? CLIENT_FEEDBACK_ES : CLIENT_FEEDBACK).map((f) => (
            <figure className="rp-testimonial" key={f.name}>
              <blockquote>“{f.quote}”</blockquote>
              <figcaption>
                <b>{f.name}</b>
                <span>{f.role}</span>
                <span>{f.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="rp-section" id="projects" aria-labelledby="home-work-title">
        <div className="rp-wrap">
          <p className="rp-kicker">{t("home.eyebrow")}</p>
          <h2 className="rp-title" id="home-work-title">{t("home.riso.workTitle")}</h2>
          <div className="rp-worklist">
            {WORK.map((w) => (
              <Link className="rp-work" to={w.path} key={w.title}>
                <div>
                  <p className="rp-work__n">
                    {w.n}
                    {w.tagKey && <span className="rp-work__tag">{t(w.tagKey)}</span>}
                  </p>
                  <p className="rp-work__title">{w.title}</p>
                  <p className="rp-work__sub">{t(w.subKey)}</p>
                  <p className="rp-work__desc">{t(w.descKey)}</p>
                </div>
                <div className="rp-work__thumb">
                  <img src={w.img} alt={t(w.imgAltKey)} loading="lazy" />
                </div>
                <span className="rp-work__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MINI ABOUT */}
      <section className="rp-section" id="about" aria-labelledby="home-about-title">
        <div className="rp-wrap">
          <div className="rp-aboutBlock">
            <p className="rp-kicker">{t("home.about.eyebrow")}</p>
            <h2 className="rp-title" id="home-about-title">{t("home.riso.aboutTitle")}</h2>
            <p className="rp-lede">
              {t("home.about.blurb")}
            </p>
            <Link className="rp-cta rp-cta--ghost" to="/about" style={{ marginTop: "1.4rem" }}>{t("home.about.link")}</Link>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="rp-section rp-section--alt" id="contact" aria-labelledby="home-contact-title">
        <div className="rp-wrap rp-close">
          <p className="rp-kicker">{t("home.riso.contactKicker")}</p>
          <h2 id="home-contact-title">{t("home.ctaTitle")}</h2>
          <p>{t("home.riso.contactBody")}</p>
          <a className="rp-cta" href="mailto:espositohillary@gmail.com" aria-label={t("home.ctaEmailAria")}>
            espositohillary@gmail.com →
          </a>
        </div>
      </section>

      {/* MADE WITH / FOOTER echo handled by global Footer */}
    </main>
  );
}
