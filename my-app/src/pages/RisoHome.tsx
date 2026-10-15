import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RisoDefs from "../components/riso/RisoDefs";
import CartoField from "../components/riso/CartoField";
import PhaseIndicator from "../components/riso/PhaseIndicator";
import HomepageOpeningFilm from "../components/riso/HomepageOpeningFilm";
import LogisticsMechanism from "../components/LogisticsMechanism";
import MSKDashboardMockup from "../components/MSKDashboardMockup";
import { glossTerms } from "../components/Term";
import { UXWOMAN_LEDGER } from "../data/uxWomanCaseStudy";
import { MSK_COPY } from "../data/mskCaseStudy";
import usePageTitle from "../hooks/usePageTitle";
import useFlagshipReveal from "../hooks/useFlagshipReveal";
import useFilmExitChoreo from "../hooks/useFilmExitChoreo";
import { useLanguage, useT } from "../app/LanguageContext";
import type { StringKey } from "../i18n/strings";
import "../styles/riso.css";
import "../styles/riso-page.css";

/**
 * Home — the portfolio index in the Risograph Cartography system.
 * Left-aligned, Archivo + Space Mono, coral spot ink, eucalyptus paper.
 * Replaces the old centered particle-backdrop hero.
 */

type WorkItem = {
  n: string;
  titleKey: StringKey;
  subKey: StringKey;
  descKey: StringKey;
  path?: string;
  externalHref?: string;
  externalAriaKey?: StringKey;
  img?: string;
  imgSecondary?: string;
  imgAltKey: StringKey;
  visual: "image" | "logistics" | "msk" | "knowunity" | "uxwoman";
  tagKey?: StringKey;
  teaserPath?: string;
  teaserPathEs?: string;
  teaserExternalHref?: string;
  teaserEn?: string;
  teaserEs?: string;
};

const WORK: WorkItem[] = [
  {
    n: "01",
    titleKey: "home.proj.msk.title",
    subKey: "home.proj.msk.subtitle",
    descKey: "home.riso.mskDesc",
    path: "/case-study/msk",
    imgAltKey: "home.riso.mskAlt",
    // Was a pin-drop map of MSK's regional locations — geography, not the
    // product. Swapped for the same filing-queue artifact the hero and case
    // study use, so the work list shows what was actually designed.
    visual: "msk",
    teaserPath: "/case-study/msk#msk-decisions",
    // The condensed Spanish study has the same four rules under its own id.
    teaserPathEs: "/case-study/msk#es-msk-decisions",
    teaserEn: "See why one button needed four rules →",
    teaserEs: "Ver por qué un botón necesitó cuatro reglas →",
  },
  {
    n: "02",
    titleKey: "home.proj.uxwoman.title",
    subKey: "home.proj.uxwoman.subtitle",
    descKey: "home.riso.uxwomanDesc",
    path: "/case-study/ux-woman",
    imgAltKey: "home.riso.uxwomanAlt",
    visual: "uxwoman",
    teaserPath: "/case-study/ux-woman#uxwoman-findings",
    teaserPathEs: "/case-study/ux-woman#es-uxwoman-findings",
    teaserEn: "See the five findings →",
    teaserEs: "Ver los cinco hallazgos →",
  },
  {
    n: "03",
    titleKey: "home.proj.logistics.title",
    subKey: "home.proj.logistics.subtitle",
    descKey: "home.riso.logisticsDesc",
    path: "/case-study/logistics",
    imgAltKey: "home.riso.logisticsAlt",
    visual: "logistics",
    // Same wording as the Logistics hero's own CTA; the Spanish anchor is the
    // condensed Spanish study's id for the same section (SpanishCaseStudy
    // prefixes every anchor with "es-").
    teaserPath: "/case-study/logistics#log-moves",
    teaserPathEs: "/case-study/logistics#es-log-moves",
    teaserEn: "See the three moves →",
    teaserEs: "Ver los tres cambios →",
  },
  {
    n: "04",
    titleKey: "home.proj.grove.title",
    subKey: "home.proj.grove.subtitle",
    descKey: "home.riso.groveDesc",
    path: "/case-study/grove",
    img: "/assets/grove/grove-live-care.jpg",
    imgAltKey: "home.riso.groveAlt",
    visual: "image",
    tagKey: "home.riso.groveTag",
    teaserPath: "/case-study/grove#grove-prototype",
    teaserPathEs: "/case-study/grove",
    teaserEn: "Try the working browser prototype →",
    teaserEs: "Ver el prototipo funcional en el navegador →",
  },
  {
    n: "05",
    titleKey: "home.proj.knowunity.title",
    subKey: "home.proj.knowunity.subtitle",
    descKey: "home.riso.knowunityDesc",
    // The row opens the case study, like rows 01–03; the live prototype is the
    // teaser, and the Storybook link lives in the case study's Build section.
    path: "/case-study/knowunity",
    img: "/assets/knowunity/say-it-back-question.webp",
    imgSecondary: "/assets/knowunity/say-it-back-pass.webp",
    imgAltKey: "home.riso.knowunityAlt",
    visual: "knowunity",
    teaserExternalHref: "https://knowunity-voice-recall.vercel.app/",
    teaserEn: "Try the prototype",
    teaserEs: "Probar el prototipo",
  },
];

// Each source links to the section that carries the number's scope and limits.
const STATS = [
  { n: "21,000+", labelKey: "home.stat.scale", sourceKey: "home.stat.mskSource", path: "/case-study/msk", anchor: "msk-outcomes" },
  { n: "1–2\u00a0mo →\u00a01–2\u00a0wk", nEs: "1–2\u00a0meses →\u00a01–2\u00a0sem.", labelKey: "home.stat.logistics", sourceKey: "home.stat.logisticsSource", path: "/case-study/logistics", anchor: "log-outcomes" },
  { n: "34", labelKey: "home.stat.research", sourceKey: "home.stat.groveSource", path: "/case-study/grove", anchor: "grove-research" },
] satisfies Array<{ n: string; nEs?: string; labelKey: StringKey; sourceKey: StringKey; path: string; anchor: string }>;

// Home's glossary: each short form gets one tap/hover definition, at its first
// appearance (2026-10-14 review, item 12). NYPL is spelled out in the dispatch
// body instead, so it needs none.
const GLOSSARY = {
  en: {
    IT: "Information technology: the team that owns the hospital's systems.",
    UX: "User experience: the team that designs how a system works for the people using it.",
    MHA: "Master of Healthcare Administration, a graduate degree in running health systems.",
    "Lean Six Sigma": "Lean Six Sigma Green Belt, a process-improvement certification.",
    MTA: "Metropolitan Transportation Authority, New York's transit agency.",
  },
  es: {
    TI: "Tecnología de la información: el equipo a cargo de los sistemas del hospital.",
    UX: "Experiencia de usuario: el equipo que diseña cómo funciona un sistema para quienes lo usan.",
    MHA: "Maestría en Administración de Salud, un posgrado en gestión de sistemas de salud.",
    "Lean Six Sigma": "Green Belt de Lean Six Sigma, una certificación de mejora de procesos.",
    MTA: "Autoridad Metropolitana de Transporte, la agencia de transporte de Nueva York.",
  },
} as const;

// The headline's real phrases. Each is set no-wrap so a line can only break
// between them (CLAUDE.md: never a stranded word, break at a phrase). If the
// translated title stops matching, it renders as plain text instead.
const HERO_PHRASES = {
  en: ["I design", "the workflow", "before the screen."],
  es: ["Diseño", "el flujo de trabajo", "antes que la pantalla."],
} as const;

function heroTitle(title: string, phrases: readonly string[]): React.ReactNode {
  if (title !== phrases.join(" ")) return title;
  return phrases.map((phrase, index) => (
    <React.Fragment key={phrase}>
      {index > 0 && " "}
      <span className="rp-h1Phrase">{phrase}</span>
    </React.Fragment>
  ));
}

const DISPATCH_TRAIN_HOLD_SECONDS = 3.8;

const OPENING_FILM_SEEN_KEY = "portfolio:opening-film-seen";

export default function RisoHome() {
  const t = useT();
  const { lang } = useLanguage();
  usePageTitle(undefined, true, lang);
  const location = useLocation();
  const navigate = useNavigate();
  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [dispatchTrainDeparted, setDispatchTrainDeparted] = useState(false);
  // Plays once per browser tab on a plain homepage visit (owner decision
  // 2026-10-09, reversing the 2026-08-24 button-only rule). Never for reduced
  // motion, never over a deep link to a homepage section, never on a refresh
  // or return in the same tab. The footer's "Watch" button still replays it.
  const [openingFilmOpen, setOpeningFilmOpen] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
      if (window.location.hash || new URLSearchParams(window.location.search).has("scrollTo")) return false;
      if (window.sessionStorage.getItem(OPENING_FILM_SEEN_KEY)) return false;
      window.sessionStorage.setItem(OPENING_FILM_SEEN_KEY, "1");
      return true;
    } catch {
      return false;
    }
  });
  // The replay trigger lives in the global footer, not on this page. It
  // dispatches `open-opening-film` (same pattern as `open-recruiter-panel`)
  // with itself as `returnFocus`; from another route it navigates here with
  // `state.openOpeningFilm` instead, and focus is left at the page top.
  const openingFilmTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [dispatchTrainReturning, setDispatchTrainReturning] = useState(false);
  const dispatchSectionRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);
  const triggerFilmExitChoreo = useFilmExitChoreo();
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

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ returnFocus?: HTMLButtonElement | null }>).detail;
      openingFilmTriggerRef.current = detail?.returnFocus ?? null;
      setOpeningFilmOpen(true);
    };
    window.addEventListener("open-opening-film", handler);
    return () => window.removeEventListener("open-opening-film", handler);
  }, []);

  useEffect(() => {
    if (!(location.state as { openOpeningFilm?: boolean } | null)?.openOpeningFilm) return;
    openingFilmTriggerRef.current = null;
    setOpeningFilmOpen(true);
    navigate(`${location.pathname}${location.search}${location.hash}`, { replace: true, state: null });
  }, [location.state, location.pathname, location.search, location.hash, navigate]);

  const glossary: Record<string, string> = GLOSSARY[lang === "es" ? "es" : "en"];

  const renderWorkContents = (work: WorkItem) => (
    <>
      <div>
        <p className="rp-work__n">
          {work.n}
          {work.tagKey && <PhaseIndicator current={2} label={t(work.tagKey)} />}
        </p>
        <p className="rp-work__title">{t(work.titleKey)}</p>
        <p className="rp-work__sub">{t(work.subKey)}</p>
        <p className="rp-work__desc">{t(work.descKey)}</p>
      </div>
      {work.visual === "logistics" ? (
        <figure className="rp-work__thumb rp-work__thumb--mechanism" aria-label={t(work.imgAltKey)}>
          <LogisticsMechanism n="01" />
          <figcaption>{lang === "es" ? "Almacén movido al frente · de meses a semanas" : "Warehouse moved forward · months to weeks"}</figcaption>
        </figure>
      ) : work.visual === "msk" ? (
        <figure className="rp-work__thumb rp-work__thumb--dashboard" aria-label={t(work.imgAltKey)}>
          <div className="rp-work__thumb--dashboard__frame">
            <MSKDashboardMockup compact condensedHeader hideToolbar hideRule rowIndices={[0, 2]} tableId="home-work-queue-table" copy={MSK_COPY[lang === "es" ? "es" : "en"].dashboard} />
          </div>
          <figcaption>{lang === "es" ? "Cola de archivo · cuatro áreas a una" : "Filing queue · four departments to one"}</figcaption>
        </figure>
      ) : work.visual === "knowunity" ? (
        <figure className="rp-work__thumb rp-work__thumb--knowunity" aria-label={t(work.imgAltKey)}>
          <div className="rp-work__thumb--knowunity__flow" aria-hidden="true">
            <img src={work.img} alt="" width={780} height={1688} loading="lazy" decoding="async" />
            <img src={work.imgSecondary} alt="" width={780} height={1688} loading="lazy" decoding="async" />
          </div>
          <figcaption>{lang === "es" ? "Pregunta → acierto · recuerdo simulado" : "Prompt → pass · mocked recall"}</figcaption>
        </figure>
      ) : work.visual === "uxwoman" ? (
        <figure className="rp-work__thumb rp-work__thumb--ledger" aria-label={t(work.imgAltKey)}>
          <dl className="fp-ledger" aria-hidden="true">
            {UXWOMAN_LEDGER.map((row) => (
              <div key={row.en}><dt>{lang === "es" ? row.es : row.en}</dt><dd>{row.n}</dd></div>
            ))}
          </dl>
          <figcaption>{lang === "es" ? "Evidencia hasta hoy · solo entrevistas y diseños" : "Evidence to date · interviews and designs only"}</figcaption>
        </figure>
      ) : (
        <div className="rp-work__thumb rp-work__thumb--contain">
          <img src={work.img} alt={t(work.imgAltKey)} loading="eager" decoding="async" />
        </div>
      )}
    </>
  );

  return (
    <main className="riso-page riso-home" ref={rootRef}>
      <RisoDefs />
      <HomepageOpeningFilm
        open={openingFilmOpen}
        onClose={() => setOpeningFilmOpen(false)}
        onExitStart={triggerFilmExitChoreo}
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
            <span className="rp-eyebrow"><span className="rp-eyebrow__text">{t("home.riso.eyebrow").replace(" · ", "\u00a0· ")}</span></span>
            {/* .rp-h1Fit is the container the headline's fit sizing measures
                against (portfolio-cohesion.css) — not .rp-clearing itself,
                which collapses under inline-size containment. */}
            <div className="rp-h1Fit">
              <h1 className="rp-h1">{heroTitle(t("home.riso.heroTitle"), HERO_PHRASES[lang === "es" ? "es" : "en"])}</h1>
            </div>
            <p className="rp-sub rp-heroProof">
              {t("home.riso.heroLead")} <b>{glossTerms(t("home.riso.heroProof"), glossary)}</b>
            </p>
            <p className="rp-status">{t("home.status")}</p>
            <div className="rp-hero__ctas">
              <Link className="rp-cta home-heroDesktopPrimary" to="/case-study/msk">{t("home.riso.primaryWork")} →</Link>
              {/* A second, quieter entry point to the recruiter panel, visible
                  without going through Ask first (the Ask dialog keeps its
                  own link to the same panel - see AskDialog.tsx). Same text,
                  same destination, named once in strings.ts. The hero ends
                  on exactly these two actions; the 5-second opener replay
                  lives in the footer's Explore column (Footer.tsx) and
                  reaches the film through the `open-opening-film` event. */}
              <button
                type="button"
                className="rp-heroUtility rp-recruiterTourTrigger"
                onClick={(e) => {
                  window.dispatchEvent(
                    new CustomEvent("open-recruiter-panel", { detail: { returnFocus: e.currentTarget } })
                  );
                }}
              >
                {t("home.riso.recruiterTourLink")}
              </button>
            </div>
            {/* Career-switch context, directly under the actions: quiet, in the
                site's existing note style, never a banner (2026-10-14, item 15). */}
            <aside className="rp-note rp-careerNote" aria-labelledby="home-career-switch">
              <p className="rp-note__k" id="home-career-switch">{t("home.riso.careerSwitchTitle")}</p>
              <p>{t("home.riso.careerSwitchBody")}</p>
            </aside>
          </div>
        </div>
        {/* Simple hero media: photo next to the header text. The dashboard
            artifact, rotating showcase, and scroll-handoff experiments
            (2026-08-28/29) were all rejected on live review — this is the
            plain version, not a fallback state. A same-day sibling commit
            (260aa25) still had the pre-rejection dashboard markup here
            (queueExpanded, HERO_QUEUE_PREVIEW_ROW_INDICES, the expand
            toggle) — dropped during rebase, superseded by the owner's
            explicit "just put back my photo next to header." */}
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
          <li key={key}>{glossTerms(t(key), glossary)}</li>
        ))}
      </ul>

      {/* PROOF */}
      <section className="rp-section rp-section--alt" aria-labelledby="home-proof-title" data-visual="true">
        <div className="rp-wrap">
          <p className="rp-kicker">{t("home.riso.proofKicker")}</p>
          <h2 className="rp-title" id="home-proof-title">{t("home.riso.proofTitle")}</h2>
          <div className="rp-outcomes rp-reveal" data-evidence="true">
            {STATS.map((s) => (
              <div className="rp-stat" key={s.n}>
                <p className="rp-stat__n">{lang === "es" && s.nEs ? s.nEs : s.n}</p>
                <p className="rp-stat__l">{t(s.labelKey)}</p>
                <Link
                  className="rp-stat__source"
                  to={`${s.path}#${lang === "es" ? "es-" : ""}${s.anchor}`}
                >
                  {t(s.sourceKey)}<span aria-hidden="true"> →</span>
                </Link>
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
          <div className="rp-worklist rp-reveal" data-evidence="true">
            {WORK.map((w) => (
              <React.Fragment key={w.path ?? w.externalHref}>
                {w.externalHref ? (
                  <a
                    className="rp-work"
                    href={w.externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={w.externalAriaKey ? t(w.externalAriaKey) : undefined}
                  >
                    {renderWorkContents(w)}
                  </a>
                ) : (
                  <Link className="rp-work" to={w.path ?? "/"}>
                    {renderWorkContents(w)}
                  </Link>
                )}
                {/* Project-specific hooks surface one high-value decision or
                    working proof point without turning it into a fourth work
                    row. Spanish prototype links stay on the condensed Spanish
                    case study because the full interaction lab is English. */}
                {w.teaserExternalHref ? (
                  <a
                    className="rp-work__teaser"
                    href={w.teaserExternalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="rp-ext">{lang === "es" ? w.teaserEs : w.teaserEn}</span>
                    <span className="sr-only">{t("a11y.newTab")}</span>
                  </a>
                ) : w.teaserPath ? (
                  <Link
                    className="rp-work__teaser"
                    to={lang === "es" && w.teaserPathEs ? w.teaserPathEs : w.teaserPath}
                  >
                    {lang === "es" ? w.teaserEs : w.teaserEn}
                  </Link>
                ) : null}
              </React.Fragment>
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
          {/* One label for the contact action site-wide; the address stays
              visible and selectable so a missing mail client never dead-ends. */}
          <a className="rp-cta" href="mailto:espositohillary@gmail.com">
            {t("contact.note")} →
          </a>
          <p>{t("contact.copy")} espositohillary@gmail.com</p>
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
                      <source src="/assets/video/weekend-journal-riso-train-v2.mp4" type="video/mp4" />
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
            </div>
            <p className="rp-dispatchTrain__attribution">{glossTerms(t("home.dispatch.trainAttribution"), glossary)}</p>

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
                    <span className="rp-ext">{t("home.dispatch.primary")}</span>
                  </a>
                  <div className="rp-dispatch__sources" aria-label={lang === "es" ? "Fuentes del proyecto" : "Project sources"}>
                    <a href="https://devpost.com/software/nyc-accessible-transit-planning">
                      <span className="rp-ext">{t("home.dispatch.devpost")}</span>
                    </a>
                    <a href="https://www.linkedin.com/feed/update/urn:li:activity:7495219168997322752/">
                      <span className="rp-ext">{t("home.dispatch.linkedin")}</span>
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
          <div className="rp-aboutBlock rp-reveal">
            <p className="rp-kicker">{t("home.about.eyebrow")}</p>
            <h2 className="rp-title" id="home-about-title">{t("home.riso.aboutTitle")}</h2>
            <p className="rp-sub">{t("home.about.blurb")}</p>
            <Link className="rp-cta rp-cta--ghost" to="/about" style={{ marginTop: "1.4rem" }}>{t("home.about.link")}</Link>
          </div>
        </div>
      </section>

      {/* MADE WITH / FOOTER echo handled by global Footer */}
    </main>
  );
}
