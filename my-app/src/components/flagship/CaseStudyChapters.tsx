import React, { useEffect, useRef, useState } from "react";

export type CaseStudyChapter = {
  id: string;
  label: string;
  note?: string;
};

/**
 * Chapter wayfinding for the long case studies.
 *
 * Sticky and self-highlighting on purpose. These pages run long enough that a
 * reader whose attention breaks has no way to recover their place, and a nav
 * that only says where you *can* go — never where you *are* — leaves them to
 * re-scan the page to reorient.
 *
 * Active tracking uses the reference-line approach from Navbar rather than an
 * IntersectionObserver threshold: sections here are routinely taller than the
 * viewport, so "30% visible" never becomes true for the tall ones.
 */
/**
 * @status: stable
 * @purpose: Renders a sticky, self-highlighting chapter navigation strip for long case-study pages, used across the case-study, curated, and Spanish case-study pages.
 */
export default function CaseStudyChapters({
  project,
  chapters,
  ariaLabel,
  jumpLabel = "Jump to",
}: {
  project: string;
  chapters: CaseStudyChapter[];
  ariaLabel?: string;
  jumpLabel?: string;
}) {
  const [active, setActive] = useState<string>("");
  const activeLockUntil = useRef(0);
  const jumpTimers = useRef<number[]>([]);

  useEffect(() => {
    const ids = chapters.map((chapter) => chapter.id);
    const update = () => {
      if (Date.now() < activeLockUntil.current) return;
      const line = Math.min(240, window.innerHeight * 0.3);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    // rAF-throttled: this reads getBoundingClientRect per chapter, and the raw
    // scroll event fires far more often than the browser can paint.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chapters]);

  useEffect(() => () => {
    jumpTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const jumpTo = (event: React.MouseEvent<HTMLAnchorElement>, chapter: CaseStudyChapter) => {
    event.preventDefault();
    setActive(chapter.id);
    activeLockUntil.current = Date.now() + 1600;
    jumpTimers.current.forEach((timer) => window.clearTimeout(timer));
    const expectedPath = window.location.pathname;
    window.history.replaceState(window.history.state, "", `${expectedPath}${window.location.search}#${chapter.id}`);
    const move = (focus = false) => {
      if (window.location.pathname !== expectedPath) return;
      const target = document.getElementById(chapter.id);
      if (!target) return;
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start", behavior: "auto" });
      document.documentElement.style.scrollBehavior = previous;
      if (focus) {
        const heading = target.matches("h1, h2") ? target : target.querySelector<HTMLElement>("h1, h2");
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
      }
    };
    [0, 120, 320, 650, 1100].forEach((delay, index, delays) => {
      jumpTimers.current.push(window.setTimeout(() => move(index === delays.length - 1), delay));
    });
  };

  const current = chapters.find((chapter) => chapter.id === active);

  return (
    <nav className="rp-chapters" aria-label={ariaLabel || `${project} case study chapters`}>
      <span>{jumpLabel}</span>
      {chapters.slice(1).map((chapter) => (
        <a
          href={`#${chapter.id}`}
          key={chapter.id}
          onClick={(event) => jumpTo(event, chapter)}
          className={active === chapter.id ? "is-active" : undefined}
          aria-current={active === chapter.id ? "true" : undefined}
        >
          {chapter.label}
        </a>
      ))}
      {/* The authored note for wherever you currently are. Shown for the active
          chapter only: attaching one to every link would turn a scan strip into
          a wall. Hidden from assistive tech because it changes on every scroll —
          announcing it repeatedly would be noise, and `aria-current` plus the
          link text already say where you are. */}
      {current?.note && (
        <em className="rp-chapters__note" aria-hidden="true">
          {current.note}
        </em>
      )}
    </nav>
  );
}
