import React, { useCallback, useEffect, useRef, useState } from "react";

type PlaybackState = "poster" | "playing" | "paused" | "complete";

const TIMELINE_MS = 8000;
const FALLBACK_MS = 8250;

function getReducedMotionPreference() {
  return typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * A route-scoped, deterministic animatic for the MSK workflow chapter.
 * The film surface is decorative: the exact ordered workflow immediately
 * after it remains the semantic evidence and complete text alternative.
 *
 * @status: stable
 * @purpose: Eight-second deterministic animatic ("The Detour") for the MSK workflow chapter (pages/case-studies/FlagshipMSK.tsx), with poster, play, pause, resume and replay controls and a reduced-motion path that shows the completed frame immediately. Decorative only — the exact ordered workflow rendered after it stays the semantic evidence. Pick this for the one timed film moment; for a static decorative before/after preview of the same workflow use MSKRegisteredRoutingPeel, for the semantic step diagram use MSKWorkflowMap, and for the scroll-driven 3D moment use MSKSystemMap.
 */
export default function MSKTheDetour() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getReducedMotionPreference);
  const [playback, setPlayback] = useState<PlaybackState>(() => (
    getReducedMotionPreference() ? "complete" : "poster"
  ));
  const [runKey, setRunKey] = useState(0);
  const timerRef = useRef<number | null>(null);
  const sentinelRef = useRef<HTMLSpanElement | null>(null);
  const startedAtRef = useRef(0);
  const elapsedRef = useRef(0);

  const clearFallback = useCallback(() => {
    if (timerRef.current === null) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const finishPlayback = useCallback(() => {
    clearFallback();
    elapsedRef.current = TIMELINE_MS;
    setPlayback("complete");
  }, [clearFallback]);

  const scheduleFallback = useCallback((elapsed: number) => {
    clearFallback();
    timerRef.current = window.setTimeout(
      finishPlayback,
      Math.max(0, FALLBACK_MS - elapsed),
    );
  }, [clearFallback, finishPlayback]);

  const playFromStart = useCallback(() => {
    if (prefersReducedMotion) return;
    clearFallback();
    elapsedRef.current = 0;
    startedAtRef.current = performance.now();
    setRunKey((key) => key + 1);
    setPlayback("playing");
    scheduleFallback(0);
  }, [clearFallback, prefersReducedMotion, scheduleFallback]);

  const pausePlayback = useCallback(() => {
    if (playback !== "playing") return;
    elapsedRef.current = Math.min(
      TIMELINE_MS,
      elapsedRef.current + performance.now() - startedAtRef.current,
    );
    clearFallback();
    setPlayback("paused");
  }, [clearFallback, playback]);

  const resumePlayback = useCallback(() => {
    if (prefersReducedMotion || playback !== "paused") return;
    startedAtRef.current = performance.now();
    setPlayback("playing");
    scheduleFallback(elapsedRef.current);
  }, [playback, prefersReducedMotion, scheduleFallback]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
      if (!event.matches) return;
      clearFallback();
      elapsedRef.current = TIMELINE_MS;
      setPlayback("complete");
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [clearFallback]);

  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden && playback === "playing") pausePlayback();
    };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => document.removeEventListener("visibilitychange", pauseWhenHidden);
  }, [pausePlayback, playback]);

  useEffect(() => clearFallback, [clearFallback]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;
    const handleCancel = () => {
      if (playback === "playing") finishPlayback();
    };
    sentinel.addEventListener("animationcancel", handleCancel);
    return () => sentinel.removeEventListener("animationcancel", handleCancel);
  }, [finishPlayback, playback, runKey]);

  const status = prefersReducedMotion
    ? "Resolved still shown because reduced motion is on."
    : playback === "poster"
      ? "The Detour is ready to play."
      : playback === "playing"
        ? "The Detour is playing."
        : playback === "paused"
          ? "The Detour is paused."
          : "The Detour is complete.";

  return (
    <div className="fp-detour" data-playback={playback} data-testid="msk-the-detour">
      <div
        className={`fp-detour__stage is-${playback}${prefersReducedMotion ? " is-reduced" : ""}`}
        key={runKey}
        aria-hidden="true"
      >
        <span className="fp-detour__matte" />
        <span className="fp-detour__rakingBeam" />

        <div className="fp-detour__queue fp-detour__queue--ready">
          <span className="fp-detour__queueRule" />
          <span className="fp-detour__status">Ready to send</span>
          <span className="fp-detour__action">Send to EMR</span>
        </div>

        <span className="fp-detour__recordPaper">
          <i />
          <i />
          <i />
        </span>

        <span className="fp-detour__printPressure">
          <i />
          <i />
          <i />
        </span>

        <span className="fp-detour__handoffShutter fp-detour__handoffShutter--one" />
        <span className="fp-detour__handoffShutter fp-detour__handoffShutter--two" />
        <span className="fp-detour__scanBeam" />

        <div className="fp-detour__queue fp-detour__queue--filed">
          <span className="fp-detour__queueRule" />
          <span className="fp-detour__status">Filed · status updated</span>
        </div>

        <span className="fp-detour__posterTitle">The Detour</span>
        <span className="fp-detour__endTitle">
          <strong>The “simple” button<br />carried the whole system.</strong>
        </span>
        <span
          ref={sentinelRef}
          className="fp-detour__sentinel"
          onAnimationEnd={(event) => {
            if (event.animationName === "fp-detour-sentinel" && playback === "playing") {
              finishPlayback();
            }
          }}
        />
      </div>

      <div className="fp-detour__controls">
        <span className="fp-detour__folio">The Detour · 8 seconds · no sound</span>
        {!prefersReducedMotion && playback === "poster" && (
          <button type="button" onClick={playFromStart} aria-label="Play The Detour, an eight-second sequence">
            Play sequence
          </button>
        )}
        {!prefersReducedMotion && playback === "playing" && (
          <>
            <button type="button" onClick={pausePlayback} aria-pressed="true" aria-label="Pause The Detour">
              Pause
            </button>
            <button type="button" onClick={playFromStart} aria-label="Replay The Detour from the beginning">
              Replay
            </button>
          </>
        )}
        {!prefersReducedMotion && playback === "paused" && (
          <>
            <button type="button" onClick={resumePlayback} aria-pressed="false" aria-label="Resume The Detour">
              Resume
            </button>
            <button type="button" onClick={playFromStart} aria-label="Replay The Detour from the beginning">
              Replay
            </button>
          </>
        )}
        {!prefersReducedMotion && playback === "complete" && (
          <button type="button" onClick={playFromStart} aria-label="Replay The Detour from the beginning">
            Replay
          </button>
        )}
        <span className="sr-only" role="status" aria-live="polite">{status}</span>
      </div>
    </div>
  );
}
