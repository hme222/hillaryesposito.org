import React, { useEffect, useRef, useState } from "react";

export type PhoneReelFrame = {
  src: string;
  /** Short name of the screen, read once by screen readers through the reel's label. */
  name: string;
};

/**
 * @status: stable
 * @purpose: Real phone screenshots inside a phone frame that slowly crossfade from one screen to the next, used for the case-study teasers on Home. It runs only while on screen, never runs under reduced motion (it shows the first screen), and has a separate Pause control rendered by the caller beside it. With `pair`, it draws two tilted phones at their true tall shape: the current screen in front, the previous one behind (decorative). Pick this for a short tour of real phone screens; for a single static phone in a case hero use the rp-device frame, and for a step-through the reader controls use the case study's own sequence.
 */
export default function PhoneReel({ frames, label, paused = false, intervalMs = 3600, aspect, pair = false }: {
  /** CSS aspect-ratio for screens that are not 390:844 (e.g. "452 / 800"). */
  aspect?: string;
  /** Two phones, tilted, bleeding off the frame (Home work list, 2026-11-23):
      the current screen in front, the previous screen behind it. */
  pair?: boolean;
  frames: PhoneReelFrame[];
  /** Names what the screens are, for screen readers. */
  label: string;
  paused?: boolean;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (paused || !inView || reduce || frames.length < 2) return undefined;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % frames.length), intervalMs);
    return () => window.clearInterval(id);
  }, [paused, inView, frames.length, intervalMs]);

  const reelLabel = `${label}: ${frames.map((f) => f.name).join(", ")}`;
  const screen = (on: number) => (
    <div className="rp-phoneReel__screen" style={aspect ? { aspectRatio: aspect } : undefined}>
      {frames.map((frame, i) => (
        <img
          key={frame.src}
          src={frame.src}
          alt=""
          width={780}
          height={1688}
          loading="lazy"
          decoding="async"
          className={i === on ? "is-on" : undefined}
        />
      ))}
    </div>
  );

  if (pair) {
    // One labelled image for the pair; the phone behind is a decorative echo.
    const previous = (index - 1 + frames.length) % frames.length;
    return (
      <div className="rp-phonePair" ref={ref} role="img" aria-label={reelLabel} style={aspect ? ({ "--phone-ar": aspect } as React.CSSProperties) : undefined}>
        <div className="rp-phoneReel rp-phoneReel--back" aria-hidden="true">{screen(previous)}</div>
        <div className="rp-phoneReel rp-phoneReel--front">{screen(index)}</div>
      </div>
    );
  }

  return (
    <div className="rp-phoneReel" ref={ref} role="img" aria-label={reelLabel}>
      {screen(index)}
    </div>
  );
}
