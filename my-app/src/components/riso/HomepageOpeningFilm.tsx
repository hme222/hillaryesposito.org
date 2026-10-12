import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useT } from "../../app/LanguageContext";

// Matches the .rp-openingFilm overlay's own fade in riso-page.css (40ms
// delay + 260ms duration = clears at 300ms), plus a small buffer before
// unmounting — shortened from 560ms alongside that overlay fade (owner-
// reported 2026-08-27: the trickle-down choreo underneath was finishing
// while still hidden behind a slower-clearing overlay; see that file's
// comment for the full timing trace).
const EXIT_MS = 340;
// Two guards instead of one 6.5s timer counted from mount (motion review
// 2026-10-12: on a cold phone visit the 11.7 MB HEVC file never started
// before that timer fired, so visitors got a 7s still and no film).
// START_GUARD_MS closes the overlay if playback hasn't begun; once it has,
// the clip gets its own remaining length plus PLAY_GRACE_MS.
const START_GUARD_MS = 2500;
const PLAY_GRACE_MS = 1000;
const PLAY_FALLBACK_MS = 6000;
// H.264 with the moov atom up front, so playback starts mid-download and
// every browser can decode it. The film is soft paper texture: 540p was
// indistinguishable from the 1080p original at 1440 wide. Phones get 272p.
const FILM_SRC = "/assets/video/grove-layer-assembly-540.mp4";
const FILM_SRC_PHONE = "/assets/video/grove-layer-assembly-272.mp4";
const PHONE_QUERY = "(max-width: 760px)";

type HomepageOpeningFilmProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  // Fires the instant the exit sequence begins (before the EXIT_MS fade
  // completes) so the page underneath can start its own trickle-down
  // entrance in step with the film's own dissolve, instead of only after
  // onClose unmounts it. Optional — a caller that doesn't pass it just
  // gets the plain crossfade, unchanged.
  onExitStart?: () => void;
};

/**
 * @status: stable
 * @purpose: Full-screen opening film overlay shown on the home page (pages/RisoHome.tsx), with a timed/skippable exit crossfade and focus restored to the trigger on close.
 */
export default function HomepageOpeningFilm({ open, onClose, returnFocusRef, onExitStart }: HomepageOpeningFilmProps) {
  const closeTimerRef = useRef<number | undefined>(undefined);
  const failsafeTimerRef = useRef<number | undefined>(undefined);
  const t = useT();
  const [filmSrc] = useState(() => (
    typeof window !== "undefined" && window.matchMedia?.(PHONE_QUERY).matches ? FILM_SRC_PHONE : FILM_SRC
  ));
  const exitingRef = useRef(false);
  const skipRef = useRef<HTMLButtonElement | null>(null);
  const filmRef = useRef<HTMLDivElement | null>(null);
  const inertedRef = useRef<HTMLElement[]>([]);
  const releaseInert = useCallback(() => {
    inertedRef.current.forEach((element) => { element.inert = false; });
    inertedRef.current = [];
  }, []);
  const [exiting, setExiting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(() => (
    typeof window !== "undefined"
      && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  ));

  // Only a keyboard exit (Escape, or Enter/Space on Skip) should land with a
  // visible ring. When the film ends on its own, the visitor hasn't touched
  // anything yet, and a ring on the trigger reads as a stray selection.
  const finish = useCallback((byKeyboard = false) => {
    if (!open || exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    onExitStart?.();
    window.clearTimeout(failsafeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
      // The trigger is still inert until React re-renders; release it first or
      // focus falls to <body>.
      releaseInert();
      returnFocusRef.current?.focus({ preventScroll: true, focusVisible: byKeyboard } as FocusOptions);
    }, EXIT_MS);
  }, [onClose, onExitStart, open, releaseInert, returnFocusRef]);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!query) return;

    const handleChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
      if (event.matches && open) finish();
    };

    query.addEventListener?.("change", handleChange);
    return () => query.removeEventListener?.("change", handleChange);
  }, [finish, open]);

  useEffect(() => {
    if (!open) {
      exitingRef.current = false;
      setExiting(false);
      return;
    }

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // aria-modal is only a hint: screen-reader browse mode could still reach
    // the hero and nav behind the film. Make everything outside the film's
    // own branch inert while it plays, and undo exactly what we set.
    const inerted = inertedRef.current;
    for (let node: HTMLElement | null = filmRef.current; node && node !== document.body; node = node.parentElement) {
      const parent: HTMLElement | null = node.parentElement;
      if (!parent) break;
      for (const sibling of Array.from(parent.children)) {
        if (sibling !== node && sibling instanceof HTMLElement && !sibling.inert) {
          sibling.inert = true;
          inerted.push(sibling);
        }
      }
    }
    failsafeTimerRef.current = window.setTimeout(() => finish(), START_GUARD_MS);
    skipRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish(true);
      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      releaseInert();
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(failsafeTimerRef.current);
    };
  }, [finish, open, releaseInert]);

  if (!open) return null;

  return (
    <div
      ref={filmRef}
      className={`rp-openingFilm${exiting ? " is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t("home.riso.openingFilmLabel")}
    >
      <img
        className="rp-openingFilm__poster"
        src="/assets/video/grove-layer-assembly-poster.jpg"
        alt=""
        aria-hidden="true"
      />
      {!reduceMotion && <video
          className="rp-openingFilm__video"
          src={filmSrc}
          poster="/assets/video/grove-layer-assembly-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={(event) => {
            const video = event.currentTarget;
            const remaining = Number.isFinite(video.duration)
              ? (video.duration - video.currentTime) * 1000 + PLAY_GRACE_MS
              : PLAY_FALLBACK_MS;
            window.clearTimeout(failsafeTimerRef.current);
            failsafeTimerRef.current = window.setTimeout(() => finish(), remaining);
          }}
          onEnded={() => finish()}
          onError={() => finish()}
        />}
      <span className="rp-openingFilm__wash" aria-hidden="true" />
      <button ref={skipRef} className="rp-openingFilm__skip" type="button" onClick={(event) => finish(event.detail === 0)}>
        {t("home.riso.openingFilmSkip")}
      </button>
    </div>
  );
}
