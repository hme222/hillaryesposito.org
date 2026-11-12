import React, { useCallback, useEffect, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage } from "../app/LanguageContext";
import "../styles/riso-page.css";

// One screen, no scroll: Hillary's own words on one side, her photos looping on
// the other. Every line of copy is a fact or phrase she gave
// (design-docs/case-study-stories/about-me.md). The race is not named on purpose.
// The earlier long About (pattern, MSK/Army story, proof, contact) is in git history.

type Slide = {
  src: string;
  width: number;
  height: number;
  altEn: string;
  altEs: string;
  capEn: string;
  capEs: string;
};

const SLIDES: Slide[] = [
  {
    src: "/assets/about/headshot.jpg",
    width: 900,
    height: 900,
    altEn: "Hillary Esposito",
    altEs: "Hillary Esposito",
    capEn: "Hillary Esposito.",
    capEs: "Hillary Esposito.",
  },
  {
    src: "/assets/about/luna.jpg",
    width: 825,
    height: 1100,
    altEn: "Luna, a tuxedo cat in a green pom-pom hat, pink harness and red jacket, in a clear backpack carrier with her paws over the edge.",
    altEs: "Luna, una gata blanquinegra con gorro verde de pompón, arnés rosa y chaqueta roja, dentro de una mochila transparente, con las patas sobre el borde.",
    capEn: "Luna.",
    capEs: "Luna.",
  },
  {
    src: "/assets/about/orchid.jpg",
    width: 825,
    height: 1100,
    altEn: "Pink orchids with orange centers in sunlight, a living room behind them.",
    altEs: "Orquídeas rosadas con el centro naranja, a la luz del sol, con una sala al fondo.",
    capEn: "The urban jungle at home.",
    capEs: "La selva urbana en casa.",
  },
];

const SLIDE_MS = 5000;

function prefersReducedMotion(): boolean {
  try {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export default function About() {
  const { lang } = useLanguage();
  const isSpanish = lang === "es";
  usePageTitle(isSpanish ? "Sobre mí" : "About");

  const [index, setIndex] = useState(0);
  // Motion-sensitive visitors start paused (WCAG 2.2.2); everyone can pause.
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovering, setHovering] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  const count = SLIDES.length;
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    if (!playing || hovering || focusInside) return undefined;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [playing, hovering, focusInside, count]);

  const t = (en: string, es: string) => (isSpanish ? es : en);
  const slide = SLIDES[index];

  return (
    <main className="about-page about-stage riso-page" lang={isSpanish ? "es" : "en"}>
      <div className="about-stage__text">
        <h1 className="about-stage__hook">
          {t(
            "I'm curious about people, and they keep surprising me.",
            "Siento curiosidad por la gente, y no deja de sorprenderme."
          )}
        </h1>
        <p>
          {t(
            "Every time I think I know what someone will do, something different happens. So I people watch, read, and watch movies and shows, collecting other ways of seeing things.",
            "Cada vez que creo saber qué va a hacer alguien, pasa algo distinto. Así que observo a la gente, leo y veo películas y series, para recoger otras formas de ver las cosas."
          )}
        </p>
        <p>
          {t(
            "It's also why I do UX: people and systems, and the messy middle where they meet.",
            "Por eso me dedico a UX: personas y sistemas, y el terreno desordenado donde se encuentran."
          )}
        </p>
        <p>
          {t(
            "Home is New York, 80 plants, and Luna, my precious baby. We attempt walks, she hops back into her backpack, and no one bats an eyelash. In this city, that counts as a quiet day.",
            "Mi casa es Nueva York, 80 plantas y Luna, mi bebé preciosa. Intentamos pasear, ella vuelve a saltar a su mochila y nadie se inmuta. En esta ciudad, eso cuenta como un día tranquilo."
          )}
        </p>
      </div>

      <section
        className="about-stage__show"
        aria-roledescription="carousel"
        aria-label={t("Photos of Hillary", "Fotos de Hillary")}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setFocusInside(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusInside(false);
        }}
      >
        <div className="about-stage__frame">
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              width={s.width}
              height={s.height}
              alt={i === index ? t(s.altEn, s.altEs) : ""}
              aria-hidden={i === index ? undefined : true}
              className={i === index ? "is-active" : undefined}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
        <div className="about-stage__bar">
          <p className="about-stage__caption" aria-live={playing ? "off" : "polite"}>
            {t(slide.capEn, slide.capEs)}
          </p>
          <div className="about-stage__controls">
            <button type="button" onClick={() => go(-1)} aria-label={t("Previous photo", "Foto anterior")}>
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? t("Pause photo loop", "Pausar el ciclo de fotos") : t("Play photo loop", "Reproducir el ciclo de fotos")}
            >
              <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t("Next photo", "Foto siguiente")}>
              <span aria-hidden="true">→</span>
            </button>
            <span className="about-stage__count" aria-hidden="true">
              {index + 1} / {count}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
