// src/components/GroveAppDemo.tsx
// Auto-playing tour of the Grove app: a device that cycles its screens with a
// synced, numbered chapter index. Auto-plays by default; a play/pause control and
// prefers-reduced-motion support keep it WCAG 2.2.2-safe, and any section can be
// tapped to jump. Progress is driven by one rAF loop (not a CSS keyframe) so the
// fill bar and the screen advance stay in lockstep and pause/resume cleanly.
import React, { useEffect, useRef, useState } from "react";

type Screen = { src: string; label: string; note: string; bg: string };

// Real screens captured from the working Grove app (not mockups).
const SCREENS: Screen[] = [
  {
    src: "/assets/grove/grove-live-collection.jpg",
    label: "Your collection",
    note: "Every plant in one place, grouped by where they live.",
    bg: "#eaf1e0",
  },
  {
    src: "/assets/grove/grove-live-add.jpg",
    label: "Add a plant",
    note: "Track a single plant, or a whole bouquet.",
    bg: "#efe9e1",
  },
  {
    src: "/assets/grove/grove-live-care.jpg",
    label: "Daily care",
    note: "One clear task a day. Overdue plants surface first — no shaming.",
    bg: "#efe9e1",
  },
  {
    src: "/assets/grove/grove-live-journal.jpg",
    label: "Care journal",
    note: "Every watering and note on one timeline — and no guilt for a missed day.",
    bg: "#eef2e6",
  },
  {
    src: "/assets/grove/grove-live-personality.jpg",
    label: "Plant personality",
    note: "An AI personality you earn by caring — not points, not a leaderboard.",
    bg: "#f3efe6",
  },
  {
    src: "/assets/grove/grove-live-greenhouse.jpg",
    label: "Greenhouse",
    note: "A species guide with real care notes, grouped into themed guilds.",
    bg: "#efe9e1",
  },
];

const DURATION = 4400; // ms per screen

export default function GroveAppDemo() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const pausedRef = useRef(false);
  const progressRef = useRef(0);
  const lastRef = useRef<number | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Honour prefers-reduced-motion (and react to live changes).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Single rAF loop drives both the progress fill and the advance, so they never
  // drift and pause/resume is frame-accurate.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = now - lastRef.current;
      lastRef.current = now;
      if (!pausedRef.current) {
        progressRef.current += dt / DURATION;
        if (progressRef.current >= 1) {
          progressRef.current = 0;
          setActive((i) => (i + 1) % SCREENS.length);
        }
      }
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progressRef.current})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lastRef.current = null;
    };
  }, [reduced]);

  const jump = (i: number) => {
    progressRef.current = 0;
    if (fillRef.current) fillRef.current.style.transform = "scaleX(0)";
    setActive(i);
  };

  const playing = !paused && !reduced;

  return (
    <figure className="grove-demo" aria-label="Auto-playing tour of the Grove app">
      <div className="grove-demo__stage">
        <div className="grove-demo__device" style={{ background: SCREENS[active].bg }}>
          {SCREENS.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={i === active ? `Grove app — ${s.label}` : ""}
              aria-hidden={i !== active}
              className="grove-demo__screen"
              style={{ opacity: i === active ? 1 : 0 }}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <figcaption className="grove-demo__chapters">
        <div className="grove-demo__list" role="group" aria-label="Grove app sections">
          {SCREENS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.label}
                type="button"
                aria-current={on ? "true" : undefined}
                className={`grove-demo__chapter ${on ? "is-active" : ""}`}
                onClick={() => jump(i)}
              >
                <span className="grove-demo__index">{String(i + 1).padStart(2, "0")}</span>
                <span className="grove-demo__body">
                  <span className="grove-demo__label">{s.label}</span>
                  {on && <span className="grove-demo__note">{s.note}</span>}
                  {on && !reduced && (
                    <span className="grove-demo__rail" aria-hidden="true">
                      <span ref={fillRef} className="grove-demo__fill" />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grove-demo__controls">
          {!reduced && (
            <button
              type="button"
              className="grove-demo__toggle"
              onClick={() => setPaused((p) => !p)}
            >
              {playing ? <><span aria-hidden="true">❚❚</span> Pause</> : <><span aria-hidden="true">▶</span> Play</>}
            </button>
          )}
          <span className="grove-demo__status">
            {reduced ? "Tap a section" : playing ? "Auto-playing" : "Paused"}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
