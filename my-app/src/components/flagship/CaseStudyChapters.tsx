import React, { useEffect, useRef, useState } from "react";
import ReadingProgress from "./ReadingProgress";

export type CaseStudyChapter = {
  id: string;
  label: string;
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
 * @purpose: Renders a sticky, self-highlighting chapter navigation strip for long case-study pages, including Spanish case-study pages.
 */
export default function CaseStudyChapters({
  project,
  chapters,
  ariaLabel,
  jumpLabel = "Jump to",
  leftLabel = "left",
  progress = false,
}: {
  project: string;
  chapters: CaseStudyChapter[];
  ariaLabel?: string;
  jumpLabel?: string;
  /** Word after the phone length cue's percentage ("NN% left"). */
  leftLabel?: string;
  /** Show the "NN% left" length cue at the strip's end below 900px. Pages
      that carry the fixed ReadingProgress rail on desktop turn this on. */
  progress?: boolean;
}) {
  const [active, setActive] = useState<string>("");
  const [atEnd, setAtEnd] = useState(false);
  const activeLockUntil = useRef(0);
  const stripRef = useRef<HTMLElement>(null);
  const jumpTimers = useRef<number[]>([]);
  const removeJumpCancelListeners = useRef<() => void>(() => {});

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
    removeJumpCancelListeners.current();
  }, []);

  const jumpTo = (event: React.MouseEvent<HTMLAnchorElement>, chapter: CaseStudyChapter) => {
    event.preventDefault();
    setActive(chapter.id);
    activeLockUntil.current = Date.now() + 1600;
    jumpTimers.current.forEach((timer) => window.clearTimeout(timer));
    jumpTimers.current = [];
    removeJumpCancelListeners.current();
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

    // Native link activation reports detail === 0 for keyboard and assistive-
    // technology clicks. Move focus promptly for that path so the destination
    // is announced, but never let a later layout-settling retry take focus
    // back after the reader has continued. Pointer activation keeps focus
    // where the browser puts it and uses the same scroll behavior.
    move(event.detail === 0);
    [120, 320, 650, 1100].forEach((delay) => {
      jumpTimers.current.push(window.setTimeout(() => move(), delay));
    });

    // The retries only compensate for images/layout settling. Any newer
    // wheel, touch, pointer, or keyboard input is a stronger expression of
    // intent, so stop correcting the viewport immediately and let active
    // chapter tracking resume.
    const cancelSettling = () => {
      jumpTimers.current.forEach((timer) => window.clearTimeout(timer));
      jumpTimers.current = [];
      activeLockUntil.current = 0;
      removeJumpCancelListeners.current();
    };
    const listenerOptions: AddEventListenerOptions = { capture: true, once: true };
    window.addEventListener("wheel", cancelSettling, listenerOptions);
    window.addEventListener("touchstart", cancelSettling, listenerOptions);
    window.addEventListener("pointerdown", cancelSettling, listenerOptions);
    window.addEventListener("keydown", cancelSettling, listenerOptions);
    removeJumpCancelListeners.current = () => {
      window.removeEventListener("wheel", cancelSettling, true);
      window.removeEventListener("touchstart", cancelSettling, true);
      window.removeEventListener("pointerdown", cancelSettling, true);
      window.removeEventListener("keydown", cancelSettling, true);
      removeJumpCancelListeners.current = () => {};
    };
  };

  // On phones the strip scrolls sideways; keep the current chapter visible in
  // it. Scrolls the strip only, never the page.
  // Back above the first linked chapter there is no active link; return the
  // strip to its start so it reads from the beginning again.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    const link = strip.querySelector<HTMLElement>("a.is-active");
    if (!link) {
      strip.scrollLeft = 0;
      return;
    }
    const left = link.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + link.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollLeft = Math.max(0, left - 16);
    }
  }, [active]);

  // The phone strip fades at its right edge to show it scrolls; the fade goes
  // once the last chapter is fully in view.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const check = () => setAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 2);
    check();
    strip.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      strip.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [chapters]);

  return (
    <nav
      ref={stripRef}
      className={`rp-chapters${atEnd ? " is-at-end" : ""}`}
      aria-label={ariaLabel || `${project} case study chapters`}
    >
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
      {/* Phones and tablets: the fixed rail is hidden there, so the length cue
          rides at the strip's right end instead. Hidden on wide screens. */}
      {progress && <ReadingProgress variant="strip" leftLabel={leftLabel} />}
    </nav>
  );
}
