import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";

const EXIT_MS = 560;
const FAILSAFE_MS = 6500;

type HomepageOpeningFilmProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
};

export default function HomepageOpeningFilm({ open, onClose, returnFocusRef }: HomepageOpeningFilmProps) {
  const closeTimerRef = useRef<number | undefined>(undefined);
  const failsafeTimerRef = useRef<number | undefined>(undefined);
  const exitingRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const [exiting, setExiting] = useState(false);
  const reduceMotion = typeof window !== "undefined"
    && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);

  const finish = useCallback(() => {
    if (!open || exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    window.clearTimeout(failsafeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
      returnFocusRef.current?.focus({ preventScroll: true });
    }, EXIT_MS);
  }, [onClose, open, returnFocusRef]);

  useEffect(() => {
    if (!open) {
      exitingRef.current = false;
      setExiting(false);
      return;
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
  }, [finish, open]);

  if (!open) return null;

  return (
    <div
      className={`rp-openingFilm${exiting ? " is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Opening visual · five seconds"
    >
      <img
        className="rp-openingFilm__poster"
        src="/assets/video/grove-layer-assembly-poster.jpg"
        alt=""
        aria-hidden="true"
      />
      {!reduceMotion && <video
          className="rp-openingFilm__video"
          src="/assets/video/grove-layer-assembly-seedance25.mp4"
          poster="/assets/video/grove-layer-assembly-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          onEnded={finish}
          onError={finish}
        />}
      <span className="rp-openingFilm__wash" aria-hidden="true" />
      <button ref={skipRef} className="rp-openingFilm__skip" type="button" onClick={finish}>
        Return to portfolio →
      </button>
    </div>
  );
}
