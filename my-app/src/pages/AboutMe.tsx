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
    capEn: "Luna, my precious baby.",
    capEs: "Luna, mi bebé preciosa.",
  },
  {
    src: "/assets/about/orchid.jpg",
    width: 825,
    height: 1100,
    altEn: "Pink orchids with orange centers in sunlight, a living room behind them.",
    altEs: "Orquídeas rosadas con el centro naranja, a la luz del sol, con una sala al fondo.",
    capEn: "Two orchids from the dumpster area, back to life.",
    capEs: "Dos orquídeas de la zona de la basura, de vuelta a la vida.",
  },
  {
    src: "/assets/about/race.jpg",
    width: 1050,
    height: 787,
    altEn: "Hillary in a race bib, standing on a block between giant white 2, 6 and 2 numbers, one arm raised.",
    altEs: "Hillary con su dorsal, de pie sobre un bloque entre unos enormes números blancos 2, 6 y 2, con un brazo en alto.",
    capEn: "10 half marathons, then one full: 26.2.",
    capEs: "10 medios maratones y luego uno completo: 26.2.",
  },
  {
    src: "/assets/about/cooking.jpg",
    width: 618,
    height: 1100,
    altEn: "A floral plate of crispy prosciutto cups, each holding a cherry tomato and a mozzarella ball, drizzled with balsamic glaze and honey, beside a cutting board of halved tomatoes.",
    altEs: "Un plato floreado con canastitas crujientes de prosciutto, cada una con un tomate cherry y una bolita de mozzarella, con glaseado balsámico y miel, junto a una tabla con tomates partidos.",
    capEn: "My prosciutto appetizer: mozzarella, tomato, balsamic glaze and a honey drizzle.",
    capEs: "Mi aperitivo de prosciutto: mozzarella, tomate, glaseado balsámico y un toque de miel.",
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

  // A word in the bio that brings its photo to the top of the stack. Hover and
  // focus hold the loop while they last; a tap or click stops it, so the photo
  // the visitor chose stays put.
  // Called as cue(...), not <Cue>: a component defined in render would remount
  // on every photo change and drop keyboard focus.
  const cue = (target: number, children: React.ReactNode) => (
    <button
      type="button"
      className={`about-stage__cue${index === target ? " is-showing" : ""}`}
      aria-controls="about-photos"
      aria-describedby="about-cue-hint"
      onMouseEnter={() => { setIndex(target); setHovering(true); }}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => { setIndex(target); setHovering(true); }}
      onBlur={() => setHovering(false)}
      onClick={() => { setIndex(target); setPlaying(false); }}
    >
      {children}
    </button>
  );

  return (
    <main className="about-page about-stage riso-page" lang={isSpanish ? "es" : "en"}>
      <div className="about-stage__text">
        {/* Opening line is Hillary's own (2026-11-17). Body uses only facts from
            design-docs/case-study-stories/about-me.md, in her words. Spanish is a draft.
            Underlined words are cues: hover, focus or tap one and the print stack
            brings that photo to the top. */}
        <h1 className="about-stage__hook">
          {t("Hi, I'm ", "Hola, soy ")}
          {cue(0, "Hillary")}.
        </h1>
        {isSpanish ? (
          <p>
            Disfruto la {cue(4, "comida casera")}, las {cue(2, "plantas en flor")} y los mimos con mi gata, {cue(1, "Luna")}.
          </p>
        ) : (
          <p>
            I enjoy {cue(4, "home-cooked meals")}, {cue(2, "blooming plants")} and cuddles with my cat, {cue(1, "Luna")}.
          </p>
        )}
        {/* Hillary picked options 8 + 10 combined (2026-11-17). "A few rescues"
            because Luna plus two orchids is three. Spanish is a draft. */}
        {isSpanish ? (
          <p>
            Mi casa en Nueva York son 80 plantas y algunos rescates: {cue(1, "Luna")} y {cue(2, "dos orquídeas")} que encontré junto a la basura. Cuando no estoy en casa con ellos, estoy {cue(3, "corriendo")}. He hecho 10 medios maratones y uno completo.
          </p>
        ) : (
          <p>
            Home in New York is 80 plants and a few rescues: {cue(1, "Luna")}, and {cue(2, "two orchids")} I found by the trash. When I'm not home with them, I'm {cue(3, "running")}. I've done 10 half marathons and one full.
          </p>
        )}
        <span id="about-cue-hint" hidden>{t("Shows a photo", "Muestra una foto")}</span>
      </div>

      <section
        id="about-photos"
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
        {/* A stack of prints: the current photo on top, the others tucked
            behind at a tilt. Clicking the top print deals the next one; the
            arrow buttons below do the same for keyboard and screen readers. */}
        <div className="about-stage__frame about-stage__stack">
          {SLIDES.map((s, i) => {
            const depth = (i - index + count) % count;
            return (
              <figure
                key={s.src}
                className={`about-stage__print about-stage__print--d${depth}`}
                style={{ aspectRatio: `${s.width} / ${s.height}` }}
                aria-hidden={depth === 0 ? undefined : true}
                onClick={depth === 0 ? () => go(1) : undefined}
              >
                <img
                  src={s.src}
                  width={s.width}
                  height={s.height}
                  alt={depth === 0 ? t(s.altEn, s.altEs) : ""}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </figure>
            );
          })}
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
