import React, { useCallback, useEffect, useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { useLanguage } from "../app/LanguageContext";
import "../styles/riso-page.css";

// Hillary's own words on a glass column over the site's painted collage, her photos
// looping beside it (stacked on a phone). Every line of copy is a fact or phrase she gave
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
    capEn: "Two orchids rescued and brought back to life.",
    capEs: "Dos orquídeas rescatadas y devueltas a la vida.",
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

/** Small line icons for the photo controls (stroke follows the text color). */
const Icon = ({ d, fill = false }: { d: string; fill?: boolean }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"
    fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/** Splits a cue word into letters so each can move on its own. The button carries
 *  the full word as its name, so the letters are hidden from assistive tech. */
const letters = (text: string) =>
  Array.from(text).map((ch, i) => (
    <span key={i} className="about-stage__ch" style={{ "--i": i } as React.CSSProperties} aria-hidden="true">{ch}</span>
  ));

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
  const cue = (target: number, text: string, kind: "cook" | "plant" | "luna" | "run" | "me") => (
    <button
      type="button"
      data-cue={kind}
      className={`about-stage__cue${index === target ? " is-showing" : ""}`}
      aria-label={text}
      aria-controls="about-photos"
      aria-describedby="about-cue-hint"
      onMouseEnter={() => { setIndex(target); setHovering(true); }}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => { setIndex(target); setHovering(true); }}
      onBlur={() => setHovering(false)}
      onClick={(e) => {
        setIndex(target);
        setPlaying(false);
        // The name replays the Home page's name motion: the weight settles from light to extra-bold.
        if (kind === "me") {
          const el = e.currentTarget;
          // Alternate between two identical keyframe sets so every click starts the animation over.
          el.dataset.settle = el.dataset.settle === "b" ? "a" : "b";
        }
      }}
    >
      {kind === "me" ? text : letters(text)}
    </button>
  );

  return (
    <main
      className="about-page about-stage riso-page"
      lang={isSpanish ? "es" : "en"}
      style={{ "--about-collage": 'url("/riso/painted-cartography-01.jpg")' } as React.CSSProperties}
    >
      <div className="about-stage__text">
        {/* Opening line is Hillary's own (2026-11-17). Body uses only facts from
            design-docs/case-study-stories/about-me.md, in her words. Spanish is a draft.
            Underlined words are cues: hover, focus or tap one and the print stack
            brings that photo to the top. */}
        <h1 className="about-stage__hook">
          {t("Hi, I'm ", "Hola, soy ").trim().split(" ").map((w, i) => (
            <React.Fragment key={w}>
              <span className="about-stage__word" style={{ "--i": i } as React.CSSProperties}>{w}</span>{" "}
            </React.Fragment>
          ))}
          {cue(0, "Hillary", "me")}.
        </h1>
        {isSpanish ? (
          <p>
            Disfruto la {cue(4, "comida casera", "cook")}, las {cue(2, "plantas en flor", "plant")} y los mimos con mi gata, {cue(1, "Luna", "luna")}.
          </p>
        ) : (
          <p>
            I enjoy {cue(4, "home-cooked meals", "cook")}, {cue(2, "blooming plants", "plant")} and cuddles with my cat, {cue(1, "Luna", "luna")}.
          </p>
        )}
        {/* The "Home in New York" line (80 plants, rescues, the orchids) was removed
            at Hillary's request (2026-11-19). Spanish is a draft. */}
        {isSpanish ? (
          <p>
            Cuando no estoy en casa, estoy {cue(3, "corriendo", "run")}. He hecho 10 medios maratones y uno completo.
          </p>
        ) : (
          <p>
            When I'm not home, I'm {cue(3, "running", "run")}. I've done 10 half marathons and one full.
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
        {/* One outlined frame. Photos crossfade; the landscape race photo makes the frame
            wider so none of it (the 26.2 sign, Hillary) is cropped. Clicking the photo
            deals the next one; the arrow buttons below do the same for keyboard users. */}
        <div className="about-stage__well">
        <div className="about-stage__mat">
        <div
          className={`about-stage__frame${slide.width > slide.height ? " is-wide" : ""}`}
          onClick={() => go(1)}
        >
          {SLIDES.map((s, i) => (
            <img
              key={s.src}
              className={i === index ? "is-on" : undefined}
              src={s.src}
              width={s.width}
              height={s.height}
              alt={i === index ? t(s.altEn, s.altEs) : ""}
              aria-hidden={i === index ? undefined : true}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
        </div>
        </div>
        <div className="about-stage__bar">
          {/* Every caption sits in the same grid cell and only the current one shows, so the
              area is always as tall as the longest caption and nothing around it moves. */}
          <div className="about-stage__captions" aria-live={playing ? "off" : "polite"}>
            {SLIDES.map((s, i) => (
              <p key={s.src} className={`about-stage__caption${i === index ? " is-on" : ""}`} aria-hidden={i === index ? undefined : true}>
                {t(s.capEn, s.capEs)}
              </p>
            ))}
          </div>
          <div className="about-stage__controls" role="group" aria-label={t("Photo controls", "Controles de fotos")}>
            <button
              type="button"
              className="about-stage__play"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? t("Pause photo loop", "Pausar el ciclo de fotos") : t("Play photo loop", "Reproducir el ciclo de fotos")}
            >
              {playing ? <Icon fill d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z" /> : <Icon fill d="M8 5.2v13.6L19 12z" />}
            </button>
            <span className="about-stage__rule" aria-hidden="true" />
            <button type="button" className="about-stage__step" onClick={() => go(-1)} aria-label={t("Previous photo", "Foto anterior")}>
              <Icon d="M14.5 5.5L8 12l6.5 6.5" />
            </button>
            <span className="about-stage__dots" aria-hidden="true">
              {SLIDES.map((s, i) => <i key={s.src} className={i === index ? "is-on" : undefined} />)}
            </span>
            <button type="button" className="about-stage__step" onClick={() => go(1)} aria-label={t("Next photo", "Foto siguiente")}>
              <Icon d="M9.5 5.5L16 12l-6.5 6.5" />
            </button>
            <span className="sr-only">{t(`Photo ${index + 1} of ${count}`, `Foto ${index + 1} de ${count}`)}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
