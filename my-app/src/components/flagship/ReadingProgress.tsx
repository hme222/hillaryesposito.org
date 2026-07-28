import React, { useEffect, useRef, useState } from "react";

export type ProgressVariant = "chapters" | "rail" | "numeric";

/**
 * How much of this case study is left.
 *
 * These pages are long, and the chapter strip answers "where am I" without ever
 * answering "how much more is there". That question decides whether someone
 * commits to reading or bails, so it is worth answering plainly.
 *
 * Three variants so the treatment can be compared in place:
 *  - "chapters" — the rail with a tick per chapter. Shows remaining AND
 *    structure, which a plain bar cannot. Ticks sit at each section's real
 *    scroll position, so an uneven page reads as uneven rather than being
 *    flattened into equal slices.
 *  - "rail" — fill and percentage, no structure.
 *  - "numeric" — the percentage alone.
 *
 * aria-hidden throughout: scroll position is not actionable, and announcing a
 * changing percentage on every scroll event would be pure noise. The chapter
 * nav already carries location for assistive tech.
 */
export default function ReadingProgress({
  variant = "chapters",
  chapterIds = [],
}: {
  variant?: ProgressVariant;
  chapterIds?: string[];
}) {
  const [read, setRead] = useState(0);
  const [shown, setShown] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);
  const frame = useRef(0);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setRead(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      // Reveal only once the opening composition is behind the reader — the
      // same rule the other utility controls follow.
      setShown(window.scrollY > window.innerHeight * 0.6);
      if (max > 0 && chapterIds.length) {
        setTicks(
          chapterIds
            .map((id) => {
              const el = document.getElementById(id);
              if (!el) return -1;
              return (el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35) / max;
            })
            .filter((v) => v > 0.02 && v < 0.98),
        );
      }
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0;
        measure();
      });
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [chapterIds]);

  const left = Math.max(0, Math.round((1 - read) * 100));

  return (
    <div
      className={`rp-progress rp-progress--${variant}${shown ? " is-shown" : ""}`}
      aria-hidden="true"
    >
      {variant !== "numeric" && (
        <div className="rp-progress__track">
          <div className="rp-progress__fill" style={{ transform: `scaleY(${read})` }} />
          {variant === "chapters" &&
            ticks.map((t) => (
              <span className="rp-progress__tick" key={t} style={{ top: `${t * 100}%` }} />
            ))}
        </div>
      )}
      <p className="rp-progress__label">
        <b>{left}%</b>
        <span>left</span>
      </p>
    </div>
  );
}
