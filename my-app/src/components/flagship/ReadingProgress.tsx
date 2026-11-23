import { useEffect, useState } from "react";

/**
 * How much of this case study is left.
 *
 * These pages are long, and the chapter nav answers "where am I" without ever
 * answering "how much more is there". That question decides whether someone
 * commits to reading or bails, so it is worth answering plainly.
 *
 * The right-edge rail that used to show this was removed on 2026-11-23 (pick
 * I6-S4, "one chip for every width"): the number now lives only in the
 * CaseStudyChapters chip, which reads it from useReadingLeft below.
 */
/**
 * @status: stable
 * @purpose: Reading-position hook only (useReadingLeft): the whole percent of a long case-study page still unread, rAF-throttled, which the CaseStudyChapters chip shows as "NN% left". No visible component of its own since the right-edge rail was removed; for a discrete named-phase count (e.g. "Phase 2 of 3") use PhaseIndicator instead.
 */
export function useReadingLeft(): number {
  const [read, setRead] = useState(0);
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setRead(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return Math.max(0, Math.round((1 - read) * 100));
}
