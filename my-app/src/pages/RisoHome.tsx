import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RisoDefs from "../components/riso/RisoDefs";
import CartoField from "../components/riso/CartoField";
import CopyEmail from "../components/CopyEmail";
import HomeFold from "../components/HomeFold";
import MSKDashboardMockup from "../components/MSKDashboardMockup";
import WorkIndex from "../components/WorkIndex";
import PhoneReel from "../components/PhoneReel";
import type { WorkIndexItem } from "../components/WorkIndex";
import { MSK_COPY } from "../data/mskCaseStudy";
import usePageTitle from "../hooks/usePageTitle";
import useFlagshipReveal from "../hooks/useFlagshipReveal";
import { useLanguage, useT } from "../app/LanguageContext";
import type { StringKey } from "../i18n/strings";
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
  path: string;
};

// The case studies, in the order they are read: the lead case first, then
// the ones that show a different kind of evidence.
const WORK: WorkItem[] = [
  { n: "01", titleKey: "home.proj.msk.title", subKey: "home.proj.msk.subtitle", descKey: "home.riso.mskDesc", path: "/case-study/msk" },
  { n: "02", titleKey: "home.proj.grove.title", subKey: "home.proj.grove.subtitle", descKey: "home.riso.groveDesc", path: "/case-study/grove" },
  { n: "03", titleKey: "home.proj.knowunity.title", subKey: "home.proj.knowunity.subtitle", descKey: "home.riso.knowunityDesc", path: "/case-study/knowunity" },
  { n: "04", titleKey: "home.proj.logistics.title", subKey: "home.proj.logistics.subtitle", descKey: "home.riso.logisticsDesc", path: "/case-study/logistics" },
  { n: "05", titleKey: "home.proj.uxwoman.title", subKey: "home.proj.uxwoman.subtitle", descKey: "home.riso.uxwomanDesc", path: "/case-study/ux-woman" },
  { n: "06", titleKey: "home.proj.mobbin.title", subKey: "home.proj.mobbin.subtitle", descKey: "home.riso.mobbinDesc", path: "/case-study/mobbin" },
  { n: "07", titleKey: "home.proj.hackathon.title", subKey: "home.proj.hackathon.subtitle", descKey: "home.riso.hackathonDesc", path: "https://hme222.github.io/MTA_Accessibility_Trip_Planning/" },
];




export default function RisoHome() {
  const t = useT();
  const { lang } = useLanguage();
  usePageTitle(undefined, true, lang);
  const location = useLocation();
  const navigate = useNavigate();
  // One control pauses every teaser reel (WCAG 2.2.2: moving content lasting
  // more than five seconds needs a way to stop it).
  const [reelsPaused, setReelsPaused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  useFlagshipReveal(rootRef);

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





  const WORK_VISUALS: Record<string, React.ReactNode> = {
    "01": (
      <div className="rp-index__shot rp-index__shot--msk">
        <MSKDashboardMockup decorative compact condensedHeader hideToolbar hideRule rowIndices={[0, 2]} copy={MSK_COPY[lang === "es" ? "es" : "en"].dashboard} />
      </div>
    ),
    // Grove and Knowunity are phone products: real phone screenshots at their
    // true 390:844 shape, crossfading slowly. MSK was a desktop work queue, so
    // it stays in its own desktop frame rather than a phone it never ran on.
    "02": (
      <PhoneReel
        paused={reelsPaused}
        label={lang === "es" ? "Pantallas de Grove" : "Grove screens"}
        frames={[
          { src: "/assets/grove/reel/today.webp", name: lang === "es" ? "Hoy" : "Today" },
          { src: "/assets/grove/reel/lesson.webp", name: lang === "es" ? "Lección" : "Lesson" },
          { src: "/assets/grove/reel/first-care.webp", name: lang === "es" ? "Primer cuidado registrado" : "First care logged" },
          { src: "/assets/grove/reel/pip.webp", name: "Pip" },
        ]}
      />
    ),
    "03": (
      <PhoneReel
        paused={reelsPaused}
        label={lang === "es" ? "Pantallas de Say It Back" : "Say It Back screens"}
        frames={[
          { src: "/assets/knowunity/say-it-back-mic-primer.webp", name: lang === "es" ? "Permiso del micrófono" : "Mic permission" },
          { src: "/assets/knowunity/say-it-back-question.webp", name: lang === "es" ? "Pregunta" : "Question" },
          { src: "/assets/knowunity/say-it-back-second-miss.webp", name: lang === "es" ? "Segundo intento" : "Second try" },
          { src: "/assets/knowunity/say-it-back-pass.webp", name: lang === "es" ? "Acierto" : "Pass" },
          { src: "/assets/knowunity/say-it-back-recap.webp", name: lang === "es" ? "Resumen" : "Recap" },
        ]}
      />
    ),
  };
  const WORK_ITEMS: WorkIndexItem[] = WORK.map((work) => ({
    n: work.n, title: t(work.titleKey), sub: t(work.subKey), desc: t(work.descKey), to: work.path, external: work.path.startsWith("http"), visual: WORK_VISUALS[work.n],
  }));

  return (
    <main className="riso-page riso-home" ref={rootRef}>
      <RisoDefs />

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
            {/* Availability rides the eyebrow as its second line instead of a
                separate status row under the proof (density pass, 2026-10-16). */}
            {/* .rp-h1Fit is the container the headline's fit sizing measures
                against (portfolio-cohesion.css) — not .rp-clearing itself,
                which collapses under inline-size containment. */}
            <div className="rp-h1Fit">
              {/* The name is the headline: large, one word per line, then the
                  role. The sr-only comma keeps the accessible name readable. */}
              <h1 className="rp-h1 rp-nameSplash">
                <span className="rp-nameSplash__name">
                  <span className="rp-nameSplash__word">Hillary</span>{" "}
                  <span className="rp-nameSplash__word">Esposito</span>
                </span>
                <span className="sr-only">, </span>
                <span className="rp-nameSplash__role">{t("home.riso.heroTitle")}</span>
              </h1>
            </div>
            <p className="rp-sub rp-heroProof">{t("home.riso.heroLead")}</p>
            <p className="rp-humanLine">{t("home.riso.heroHuman")}</p>
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
          <p className="rp-heroStatus">{t("home.status")}</p>
        </div>
      </header>

      {/* SELECTED WORK */}
      <section className="rp-section" id="projects" aria-labelledby="home-work-title" data-visual="true">
        <div className="rp-wrap">
          <div className="rp-workHead">
            <h2 className="rp-title" id="home-work-title">{t("home.riso.workTitle")}</h2>
            <button type="button" className="rp-reelToggle" aria-pressed={reelsPaused} onClick={() => setReelsPaused((p) => !p)}>
              {reelsPaused ? (lang === "es" ? "Reproducir pantallas" : "Play screens") : (lang === "es" ? "Pausar pantallas" : "Pause screens")}
            </button>
          </div>
          <WorkIndex label={t("home.riso.workTitle")} items={WORK_ITEMS.slice(0, 3)} />
          {/* Supporting work stays one click away behind a plus, in the same
              numbered-row format as the lead three (2026-11-09). */}
          <HomeFold
            id="home-more-work"
            title={t("home.index.more")}
            summary={t("home.index.moreSummary")}
            openLabel=""
            closeLabel=""
          >
            <WorkIndex label={t("home.index.more")} items={WORK_ITEMS.slice(3)} />
          </HomeFold>
        </div>
      </section>

      {/* The recruiter path resolves before secondary journal/about material. */}
      <section className="rp-section rp-section--alt" id="contact" aria-labelledby="home-contact-title">
        <div className="rp-wrap rp-close">
          <h2 id="home-contact-title">{t("home.ctaTitle")}</h2>
          {/* The hiring actions stay adjacent; the address remains visible
              and selectable so a missing mail client never dead-ends. */}
          <div className="rp-hero__ctas">
            <a className="rp-cta" href="mailto:espositohillary@gmail.com">
              {t("contact.note")} →
            </a>
            <a
              className="rp-textLink"
              href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("nav.resumeAria")}
            >
              {lang === "es" ? "Ver CV" : "View résumé"}
            </a>
          </div>
          <CopyEmail />
        </div>
      </section>

      {/* MADE WITH / FOOTER echo handled by global Footer */}
    </main>
  );
}
