import React, { useCallback, useEffect, useRef, useState } from "react";

const SESSION_KEY = "portfolio-opening-film-seen";
const EXIT_MS = 560;
const FAILSAFE_MS = 6500;

type NetworkNavigator = Navigator & {
  connection?: { saveData?: boolean };
};

function prefersDirectEntry() {
  if (typeof window === "undefined") return true;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const saveData = (navigator as NetworkNavigator).connection?.saveData ?? false;
  return reduceMotion || saveData;
}

function shouldShowOpening() {
  if (prefersDirectEntry()) return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== "true";
  } catch {
    return true;
  }
}

export default function HomepageOpeningFilm() {
  const closeTimerRef = useRef<number | undefined>(undefined);
  const failsafeTimerRef = useRef<number | undefined>(undefined);
  const exitingRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(shouldShowOpening);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    if (!visible || exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    window.clearTimeout(failsafeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setVisible(false), EXIT_MS);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Storage is optional; the film still gets one safe attempt this load.
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    failsafeTimerRef.current = window.setTimeout(finish, FAILSAFE_MS);
    skipRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(failsafeTimerRef.current);
    };
  }, [finish, visible]);

  if (!visible) return null;

  return (
    <div
      className={`rp-openingFilm${exiting ? " is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Opening film · five seconds"
    >
      <img
        className="rp-openingFilm__poster"
        src="/assets/video/grove-layer-assembly-poster.jpg"
        alt=""
        aria-hidden="true"
      />
      <video
        className="rp-openingFilm__video"
        src="/assets/video/grove-layer-assembly-seedance25.mp4"
        poster="/assets/video/grove-layer-assembly-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        aria-hidden="true"
        onEnded={finish}
        onError={finish}
      />
      <span className="rp-openingFilm__wash" aria-hidden="true" />
      <button ref={skipRef} className="rp-openingFilm__skip" type="button" onClick={finish}>
        Skip intro →
      </button>
    </div>
  );
}
