import React, { useEffect, useRef, useState } from "react";

export type PhoneReelFrame = {
  src: string;
  /** Short name of the screen, read once by screen readers through the reel's label. */
  name: string;
};

/**
 * @status: stable
 * @purpose: Real phone screenshots inside a phone frame that slowly crossfade from one screen to the next, used for the case-study teasers on Home. It runs only while on screen, never runs under reduced motion (it shows the first screen), and has a separate Pause control rendered by the caller beside it. Pick this for a short tour of real phone screens; for a single static phone in a case hero use the rp-device frame, and for a step-through the reader controls use the case study's own sequence.
 */
export default function PhoneReel({ frames, label, paused = false, intervalMs = 3600 }: {
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

  return (
    <div className="rp-phoneReel" ref={ref} role="img" aria-label={`${label}: ${frames.map((f) => f.name).join(", ")}`}>
      <div className="rp-phoneReel__screen">
        {frames.map((frame, i) => (
          <img
            key={frame.src}
            src={frame.src}
            alt=""
            width={780}
            height={1688}
            loading="lazy"
            decoding="async"
            className={i === index ? "is-on" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
