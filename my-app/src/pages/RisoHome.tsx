import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RisoDefs from "../components/riso/RisoDefs";
import CartoField from "../components/riso/CartoField";
import PhaseIndicator from "../components/riso/PhaseIndicator";
import HomepageOpeningFilm from "../components/riso/HomepageOpeningFilm";
import LogisticsMechanism from "../components/LogisticsMechanism";
import MSKDashboardMockup from "../components/MSKDashboardMockup";
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
    titleKey: "home.proj.msk.title",
    subKey: "home.proj.msk.subtitle",
    descKey: "home.riso.mskDesc",
    path: "/case-study/msk",
    img: "/assets/msk/mskcc-map-thumb.jpg",
    imgAltKey: "home.riso.mskAlt",
    visual: "image",
  },
  {
    n: "02",
    titleKey: "home.proj.logistics.title",
    subKey: "home.proj.logistics.subtitle",
    descKey: "home.riso.logisticsDesc",
    path: "/case-study/logistics",
    imgAltKey: "home.riso.logisticsAlt",
    visual: "logistics",
  },
  {
    n: "03",
    titleKey: "home.proj.grove.title",
    subKey: "home.proj.grove.subtitle",
    descKey: "home.riso.groveDesc",
    path: "/case-study/grove",
    img: "/assets/grove/grove-live-care.jpg",
    imgAltKey: "home.riso.groveAlt",
    visual: "image",
    tagKey: "home.riso.groveTag",
  },
] satisfies Array<{
  n: string;
  titleKey: StringKey;
  subKey: StringKey;
  descKey: StringKey;
  path: string;
  img?: string;
  imgAltKey: StringKey;
  visual: "image" | "logistics";
  tagKey?: StringKey;
}>;

const STATS = [
  { n: "21,000+", labelKey: "home.stat.scale", sourceKey: "home.stat.mskSource" },
  { n: "85%", labelKey: "home.stat.logistics", sourceKey: "home.stat.logisticsSource" },
  { n: "34", labelKey: "home.stat.research", sourceKey: "home.stat.groveSource" },
] satisfies Array<{ n: string; labelKey: StringKey; sourceKey: StringKey }>;

const DISPATCH_TRAIN_HOLD_SECONDS = 3.8;

export default function RisoHome() {
  usePageTitle();
  const t = useT();
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [dispatchTrainDeparted, setDispatchTrainDeparted] = useState(false);
  const [openingFilmOpen, setOpeningFilmOpen] = useState(false);
  const openingFilmTriggerRef = useRef<HTMLButtonElement>(null);
  const [dispatchTrainReturning, setDispatchTrainReturning] = useState(false);
  const dispatchSectionRef = useRef<HTMLElement>(null);
  const dispatchTrainRef = useRef<HTMLDivElement>(null);
  const dispatchTrainVideoRef = useRef<HTMLVideoElement>(null);
  const dispatchTrainReturnTimerRef = useRef<number | undefined>(undefined);

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

  useEffect(() => {
    const section = dispatchSectionRef.current;
    const trainField = dispatchTrainRef.current;
    const vehicle = trainField?.querySelector<HTMLElement>(".rp-dispatchTrain__vehicle");
    const video = dispatchTrainVideoRef.current;
    const masthead = section?.querySelector<HTMLElement>(".rp-dispatch__masthead");
    if (!section || !trainField || !vehicle || !masthead) return;

    section.dataset.trainEnhanced = "true";
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let videoStarted = false;

    const placeTrain = () => {
      frame = 0;
      if (motionPreference.matches) {
        if (videoStarted) video?.pause();
        section.dataset.trainDelivered = "true";
        return;
      }

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const fieldTop = trainField.getBoundingClientRect().top;
      const startLine = viewportHeight * 0.92;
      const travelWindow = viewportHeight * 0.5;
      const progress = Math.min(1, Math.max(0, (startLine - fieldTop) / travelWindow));
      const startX = -vehicle.offsetWidth - 32;
      const mastheadRect = masthead.getBoundingClientRect();
      const fieldRect = trainField.getBoundingClientRect();
      const parkedX = Math.max(0, mastheadRect.left - fieldRect.left);
      const x = startX + (parkedX - startX) * progress;

      trainField.style.setProperty("--rp-train-x", `${x}px`);
      section.dataset.trainDelivered = progress >= 0.9 ? "true" : "false";

      if (video && vehicle.offsetWidth > 0 && progress >= 0.08 && !videoStarted) {
        videoStarted = true;
        try {
          const playback = video.play();
          playback?.catch(() => {
            trainField.dataset.videoReady = "false";
          });
        } catch {
          trainField.dataset.videoReady = "false";
        }
      }
    };

    const schedulePlacement = () => {
      if (!frame) frame = window.requestAnimationFrame(placeTrain);
    };

    placeTrain();
    window.addEventListener("scroll", schedulePlacement, { passive: true });
    window.addEventListener("resize", schedulePlacement, { passive: true });
    motionPreference.addEventListener?.("change", schedulePlacement);

    return () => {
      window.removeEventListener("scroll", schedulePlacement);
      window.removeEventListener("resize", schedulePlacement);
      motionPreference.removeEventListener?.("change", schedulePlacement);
      if (frame) window.cancelAnimationFrame(frame);
      delete section.dataset.trainEnhanced;
      delete section.dataset.trainDelivered;
    };
  }, []);

  useEffect(() => () => window.clearTimeout(dispatchTrainReturnTimerRef.current), []);

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
      <HomepageOpeningFilm
        open={openingFilmOpen}
        onClose={() => setOpeningFilmOpen(false)}
        returnFocusRef={openingFilmTriggerRef}
      />

      {/* HERO */}
      <header className="rp-hero" id="home" data-visual="true">
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
            <p className="rp-sub rp-heroProof">
              {t("home.riso.heroLead")} <b>{t("home.riso.heroProof")}</b>
            </p>
            <p className="rp-status">{t("home.status")}</p>
            <div className="rp-hero__ctas">
              <Link className="rp-cta" to="/case-study/msk">{t("home.riso.primaryWork")} →</Link>
              <button type="button" className="rp-cta rp-cta--ghost" onClick={toContact}>{t("home.getInTouch")}</button>
              <button
                ref={openingFilmTriggerRef}
                type="button"
                className="rp-heroUtility rp-openingVisualTrigger"
                onClick={() => setOpeningFilmOpen(true)}
              >
                {t("home.riso.openingVisual")}
              </button>
            </div>
          </div>
        </div>
        <div className="rp-hero__media">
          <div className="home-heroProofStack" data-evidence="true">
            <figure className="home-heroArtifact">
              <div className="home-heroArtifact__label">
                <span>Implemented healthcare workflow</span>
                <b>One filing queue replaced a four-system workaround.</b>
              </div>
              <div className="home-heroArtifact__frame">
                <MSKDashboardMockup compact headingLevel={2} />
              </div>
              <figcaption>Recreated Office Coordinator queue · no patient data</figcaption>
            </figure>
            <div className="rp-headshot rp-headshot--supporting">
              <img src="/assets/about/headshot.jpg" alt="Hillary Esposito" />
            </div>
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
      <section className="rp-section rp-section--alt" aria-labelledby="home-proof-title" data-visual="true">
        <div className="rp-wrap">
          <p className="rp-kicker">{t("home.riso.proofKicker")}</p>
          <h2 className="rp-title" id="home-proof-title">{t("home.riso.proofTitle")}</h2>
          <div className="rp-outcomes" data-evidence="true">
            {STATS.map((s) => (
              <div className="rp-stat" key={s.n}>
                <p className="rp-stat__n">{s.n}</p>
                <p className="rp-stat__l">{t(s.labelKey)}</p>
                <p className="rp-stat__source">{t(s.sourceKey)}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="rp-section" id="projects" aria-labelledby="home-work-title" data-visual="true">
        <div className="rp-wrap">
          <p className="rp-kicker">{t("home.eyebrow")}</p>
          <h2 className="rp-title" id="home-work-title">{t("home.riso.workTitle")}</h2>
          <div className="rp-worklist" data-evidence="true">
            {WORK.map((w) => (
              <Link className="rp-work" to={w.path} key={w.path}>
                <div>
                  <p className="rp-work__n">
                    {w.n}
                    {w.tagKey && <PhaseIndicator current={2} label={t(w.tagKey)} compact />}
                  </p>
                  <p className="rp-work__title">{t(w.titleKey)}</p>
                  <p className="rp-work__sub">{t(w.subKey)}</p>
                </div>
                {w.visual === "logistics" ? (
                  <figure className="rp-work__thumb rp-work__thumb--mechanism" aria-label={t(w.imgAltKey)}>
                    <LogisticsMechanism n="03" />
                    <figcaption>{lang === "es" ? "Siete puestos · pronóstico compartido · 85% menos tiempo" : "Seven aid stations · shared forecast · 85% shorter resupply time"}</figcaption>
                  </figure>
                ) : (
                  <div className="rp-work__thumb">
                    <img src={w.img} alt={t(w.imgAltKey)} loading="eager" decoding="async" />
                  </div>
                )}
                <span className="rp-work__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
          <p className="rp-supportingLink">
            <span>{t("home.riso.supportingKicker")}</span>
            <Link to="/case-study/mobbin">{t("home.riso.supportingLink")}</Link>
          </p>
        </div>
      </section>

      {/* The recruiter path resolves before secondary journal/about material. */}
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

      {/* WEEKEND DISPATCH: a current-practice signal, deliberately outside the
          three flagship rows. The story and evidence are complete at rest; the
          route drawing is decorative context and the event photograph is provenance. */}
      <section
        className="rp-section rp-dispatchSection"
        id="dispatch"
        aria-labelledby="home-dispatch-title"
        ref={dispatchSectionRef}
      >
        <div className="rp-wrap">
          <article className={`rp-dispatch${dispatchOpen ? " rp-dispatch--open" : ""}`}>
            <div className="rp-dispatch__masthead">
              <div
                className={`rp-dispatchTrain${dispatchTrainDeparted ? " rp-dispatchTrain--departed" : ""}${dispatchTrainReturning ? " rp-dispatchTrain--returning" : ""}`}
                ref={dispatchTrainRef}
              >
                <div className="rp-dispatchTrain__scene" aria-hidden="true">
                  <span className="rp-dispatchTrain__rail rp-dispatchTrain__rail--upper" />
                  <span className="rp-dispatchTrain__rail rp-dispatchTrain__rail--lower" />
                  <div className="rp-dispatchTrain__vehicle">
                    <video
                      className="rp-dispatchTrain__video"
                      ref={dispatchTrainVideoRef}
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      onCanPlay={(event) => {
                        event.currentTarget.closest<HTMLElement>(".rp-dispatchTrain")?.setAttribute("data-video-ready", "true");
                      }}
                      onError={(event) => {
                        event.currentTarget.closest<HTMLElement>(".rp-dispatchTrain")?.setAttribute("data-video-ready", "false");
                      }}
                      onTimeUpdate={(event) => {
                        if (event.currentTarget.currentTime >= DISPATCH_TRAIN_HOLD_SECONDS) {
                          event.currentTarget.pause();
                        }
                      }}
                    >
                      <source src="/assets/video/weekend-journal-riso-train-v1.mp4" type="video/mp4" />
                    </video>
                    <div className="rp-dispatchTrain__fallback">
                      {[0, 1, 2, 3].map((car) => (
                        <div
                          className={`rp-dispatchTrain__car${car === 1 || car === 2 ? " rp-dispatchTrain__car--desktopOnly" : ""}`}
                          key={car}
                        >
                          <span className="rp-dispatchTrain__windowBand">
                            <i /><i /><i />
                          </span>
                          <span className="rp-dispatchTrain__doors" />
                          <span className="rp-dispatchTrain__ink rp-dispatchTrain__ink--blue" />
                          <span className="rp-dispatchTrain__ink rp-dispatchTrain__ink--orange" />
                        </div>
                      ))}
                    </div>
                    <span className="rp-dispatchTrain__placard">{t("home.dispatch.eyebrow")}</span>
                  </div>
                </div>
              </div>
              <div className="rp-dispatch__cover">
                <div>
                  <p className="rp-kicker rp-dispatch__issueLabel">{t("home.dispatch.eyebrow")}</p>
                  <h2 className="rp-dispatch__title" id="home-dispatch-title">{t("home.dispatch.title")}</h2>
                  <p className="rp-dispatch__question">{t("home.dispatch.question")}</p>
                </div>
                <button
                  type="button"
                  className="rp-dispatch__toggle"
                  aria-expanded={dispatchOpen}
                  aria-controls="weekend-dispatch-panel"
                  onClick={() => {
                    if (!dispatchOpen) {
                      window.clearTimeout(dispatchTrainReturnTimerRef.current);
                      setDispatchTrainReturning(false);
                      if (dispatchTrainVideoRef.current?.offsetWidth) {
                        dispatchTrainVideoRef.current.pause();
                      }
                      setDispatchTrainDeparted(true);
                    } else {
                      setDispatchTrainDeparted(false);
                      setDispatchTrainReturning(true);
                      window.clearTimeout(dispatchTrainReturnTimerRef.current);
                      dispatchTrainReturnTimerRef.current = window.setTimeout(() => {
                        setDispatchTrainReturning(false);
                      }, 520);
                    }
                    setDispatchOpen((current) => !current);
                  }}
                >
                  <span aria-hidden="true">+</span>
                  {t(dispatchOpen ? "home.dispatch.closeJournal" : "home.dispatch.openJournal")}
                </button>
              </div>
              <p className="rp-dispatchTrain__attribution">{t("home.dispatch.trainAttribution")}</p>
            </div>

            <div
              className="rp-dispatch__reveal"
              id="weekend-dispatch-panel"
              hidden={!dispatchOpen}
            >
              {dispatchOpen && <div className="rp-dispatch__grid">
              <div className="rp-dispatch__story">
                <p className="rp-dispatch__body">{t("home.dispatch.body")}</p>

                <div className="rp-dispatch__finding">
                  <p className="rp-dispatch__label">{t("home.dispatch.findingLabel")}</p>
                  <div>
                    <p className="rp-dispatch__findingStat">
                      <strong>22,937</strong>
                      <span>{t("home.dispatch.statLabel")}</span>
                    </p>
                    <p>{t("home.dispatch.finding")}</p>
                  </div>
                </div>

                <p className="rp-dispatch__role">{t("home.dispatch.role")}</p>

                <blockquote className="rp-dispatch__rule">
                  <p className="rp-dispatch__label">{t("home.dispatch.ruleLabel")}</p>
                  <p className="rp-dispatch__ruleText">{t("home.dispatch.rule")}</p>
                  <p>{t("home.dispatch.ruleBody")}</p>
                </blockquote>

                <div className="rp-dispatch__actions">
                  <a
                    className="rp-cta"
                    href="https://hme222.github.io/MTA_Accessibility_Trip_Planning/"
                  >
                    {t("home.dispatch.primary")}
                  </a>
                  <div className="rp-dispatch__sources" aria-label={lang === "es" ? "Fuentes del proyecto" : "Project sources"}>
                    <a href="https://devpost.com/software/nyc-accessible-transit-planning">
                      {t("home.dispatch.devpost")}
                    </a>
                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7495219168997322752/">
                      {t("home.dispatch.linkedin")}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rp-dispatch__visual">
                <a
                  className="rp-dispatch__collage"
                  href="https://hme222.github.io/MTA_Accessibility_Trip_Planning/"
                  aria-label={t("home.dispatch.photoLink")}
                >
                  <figure>
                    <div className="rp-dispatch__collageField">
                      <img
                        className="rp-dispatch__eventPhoto"
                        src="/assets/journal/nypl-built-for-nyc.jpg"
                        alt=""
                        width="800"
                        height="450"
                        loading="lazy"
                      />
                      <img
                        className="rp-dispatch__interfaceFragment"
                        src="/assets/journal/mta-accessible-transit-landing.png"
                        alt=""
                        width="1440"
                        height="900"
                        loading="lazy"
                      />
                      <span className="rp-dispatch__wash rp-dispatch__wash--blue" aria-hidden="true" />
                      <span className="rp-dispatch__wash rp-dispatch__wash--orange" aria-hidden="true" />
                      <span className="rp-dispatch__registration" aria-hidden="true">08 / 77,236</span>
                    </div>
                    <figcaption>
                      <span>{t("home.dispatch.photoCaption")}</span>
                      <span>{t("home.dispatch.prototypeLabel")}</span>
                    </figcaption>
                  </figure>
                </a>
              </div>
              </div>}
            </div>
          </article>
        </div>
      </section>

      {/* MINI ABOUT */}
      <section className="rp-section" id="about" aria-labelledby="home-about-title">
        <div className="rp-wrap">
          <div className="rp-aboutBlock">
            <p className="rp-kicker">{t("home.about.eyebrow")}</p>
            <h2 className="rp-title" id="home-about-title">{t("home.riso.aboutTitle")}</h2>
            <Link className="rp-cta rp-cta--ghost" to="/about" style={{ marginTop: "1.4rem" }}>{t("home.about.link")}</Link>
          </div>
        </div>
      </section>

      {/* MADE WITH / FOOTER echo handled by global Footer */}
    </main>
  );
}
