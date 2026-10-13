import React, { useEffect, useRef, useState } from "react";

export type ProgressVariant = "chapters" | "rail" | "numeric" | "strip";

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
 *  - "strip" — the percentage alone, set inline at the end of the phone
 *    chapter strip (CaseStudyChapters), where the fixed rail has no room.
 *    Always visible, so the strip's width never jumps when it appears.
 *
 * aria-hidden throughout: scroll position is not actionable, and announcing a
 * changing percentage on every scroll event would be pure noise. The chapter
 * nav already carries location for assistive tech.
 */
/**
 * @status: stable
 * @purpose: Renders a decorative, aria-hidden reading-progress indicator (chapter rail, fill bar, numeric percentage, or the "strip" percentage set inside the phone chapter strip by CaseStudyChapters) showing how much of a long case-study page remains; used on the MSK/Mobbin/logistics/Grove case study pages. Pick this for continuous scroll position — for a discrete named-phase count (e.g. "Phase 2 of 3") use PhaseIndicator instead.
 */
export default function ReadingProgress({
  variant = "chapters",
  chapterIds = [],
  leftLabel = "left",
}: {
  variant?: ProgressVariant;
  chapterIds?: string[];
  leftLabel?: string;
}) {
  const [read, setRead] = useState(0);
  const [shown, setShown] = useState(false);
  const [ticks, setTicks] = useState<number[]>([]);
  const frame = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Tick positions are absolute document offsets: they do not change while
  // scrolling, only when the layout does. Measuring them per frame meant a
  // forced reflow per chapter on every scroll event for a constant result.
  useEffect(() => {
    const measureTicks = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0 || !chapterIds.length) return;
      setTicks(
        chapterIds
          .map((id) => {
            const el = document.getElementById(id);
            if (!el) return -1;
            return (el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35) / max;
          })
          .filter((v) => v > 0.02 && v < 0.98),
      );
    };
    measureTicks();
    window.addEventListener("resize", measureTicks);
    return () => window.removeEventListener("resize", measureTicks);
  }, [chapterIds]);

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      let max = doc.scrollHeight - window.innerHeight;
      // The strip copy rides inside the sticky chapter strip, which scrolls
      // away with the end of the case-study content, before the footer. Count
      // to that point so the last value a reader can see is "0% left".
      const strip = variant === "strip" ? rootRef.current?.closest<HTMLElement>(".rp-chapters") : null;
      const container = strip?.parentElement;
      if (strip && container) {
        const stickyTop = parseFloat(getComputedStyle(strip).top) || 0;
        const releaseAt =
          container.getBoundingClientRect().bottom + window.scrollY - stickyTop - strip.offsetHeight;
        if (releaseAt > 0) max = Math.min(max, releaseAt);
      }
      setRead(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      // Reveal only once the opening composition is behind the reader — the
      // same rule the other utility controls follow.
      setShown(window.scrollY > window.innerHeight * 0.6);
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
  }, [variant]);

  const left = Math.max(0, Math.round((1 - read) * 100));

  return (
    <div
      ref={rootRef}
      className={`rp-progress rp-progress--${variant}${shown ? " is-shown" : ""}`}
      aria-hidden="true"
    >
      {variant !== "numeric" && variant !== "strip" && (
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
        <span>{leftLabel}</span>
      </p>
    </div>
  );
}
