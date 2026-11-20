import React, { useEffect, useId, useRef, useState } from "react";
import { useReadingLeft } from "./ReadingProgress";
import { openHashTargetDisclosure } from "../../hooks/useCaseStudyChrome";

export type CaseStudyChapter = {
  id: string;
  label: string;
};

/**
 * Chapter wayfinding for the long case studies.
 *
 * Fixed and self-highlighting on purpose. These pages run long enough that a
 * reader whose attention breaks has no way to recover their place, and a nav
 * that only says where you *can* go — never where you *are* — leaves them to
 * re-scan the page to reorient.
 *
 * One <nav>, two layouts, chosen by CSS (riso-page.css, "chapter nav"):
 *  - Wide screens (room left of the content column): a fixed column of plain
 *    links under the site's dock pill, the current chapter marked.
 *  - Everything narrower: a floating bottom chip — previous, the current
 *    chapter (a toggle that opens the full list as a sheet), next. The sheet
 *    IS the same link list the column shows, so there is one set of links.
 *
 * Active tracking uses the reference-line approach from Navbar rather than an
 * IntersectionObserver threshold: sections here are routinely taller than the
 * viewport, so "30% visible" never becomes true for the tall ones.
 */
/**
 * @status: stable
 * @purpose: Renders the self-highlighting chapter navigation for long case-study pages (English and Spanish): a fixed left column of chapter links on wide screens, and a floating previous / current-chapter / next chip with a chapter sheet on narrower ones.
 */
export default function CaseStudyChapters({
  project,
  chapters,
  ariaLabel,
  jumpLabel = "In this case study",
  leftLabel = "left",
  ofLabel = "of",
  prevLabel = "Previous chapter",
  nextLabel = "Next chapter",
  progress = true,
}: {
  project: string;
  chapters: CaseStudyChapter[];
  ariaLabel?: string;
  jumpLabel?: string;
  /** Word after the chip's percentage ("NN% left"). */
  leftLabel?: string;
  /** Word in the chip's position line ("3 of 6"). */
  ofLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  /** Show the "NN% left" length cue in the chip. */
  progress?: boolean;
}) {
  const [active, setActive] = useState<string>("");
  // Opening composition still on screen: the column would sit over the hero.
  const [shown, setShown] = useState(false);
  // The footer is in view: get out of its way.
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const left = useReadingLeft();
  const listId = useId();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeLockUntil = useRef(0);
  const jumpTimers = useRef<number[]>([]);
  const removeJumpCancelListeners = useRef<() => void>(() => {});

  // The first chapter is the page's opening (hero); the links start after it.
  const linked = chapters.slice(1);
  const index = linked.findIndex((chapter) => chapter.id === active);
  const current = index >= 0 ? linked[index] : null;
  const prev = index > 0 ? linked[index - 1] : null;
  const next = index + 1 < linked.length ? linked[index + 1] : null;

  useEffect(() => {
    const ids = chapters.map((chapter) => chapter.id);
    const update = () => {
      const hero = ids[0] ? document.getElementById(ids[0]) : null;
      // Same 24vh line the column's top sits on.
      setShown(!hero || hero.getBoundingClientRect().bottom <= window.innerHeight * 0.24);
      const container = navRef.current?.parentElement;
      setPast(!!container && container.getBoundingClientRect().bottom < window.innerHeight - 8);
      if (Date.now() < activeLockUntil.current) return;
      const line = Math.min(240, window.innerHeight * 0.3);
      let currentId = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        // A chapter inside a closed <details> is not on screen: older engines
        // give it no box (0x0 at top 0, which would win the scan on arrival),
        // newer ones a collapsed box at the summary. Skip both.
        if (!el || el.getClientRects().length === 0 || el.closest("details:not([open])")) continue;
        if (el.getBoundingClientRect().top <= line) currentId = id;
      }
      setActive(currentId);
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

  // The sheet closes on Escape (focus back to its toggle) and on a press
  // anywhere outside the nav.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  useEffect(() => () => {
    jumpTimers.current.forEach((timer) => window.clearTimeout(timer));
    removeJumpCancelListeners.current();
  }, []);

  /** Jump to a chapter. `focusHeading` moves focus to its heading so the
      destination is announced (keyboard / assistive-technology link use). */
  const jumpTo = (chapter: CaseStudyChapter, focusHeading: boolean) => {
    setActive(chapter.id);
    activeLockUntil.current = Date.now() + 1600;
    jumpTimers.current.forEach((timer) => window.clearTimeout(timer));
    jumpTimers.current = [];
    removeJumpCancelListeners.current();
    // A chapter can sit inside a closed disclosure (Mobbin's index lens).
    // Links get this from useCaseStudyChrome's click capture; previous / next
    // are buttons, so open it here for every path.
    openHashTargetDisclosure(`#${chapter.id}`);
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

    move(focusHeading);
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

  // Native link activation reports detail === 0 for keyboard and assistive-
  // technology clicks. Move focus promptly for that path so the destination
  // is announced, but never let a later layout-settling retry take focus back
  // after the reader has continued. Pointer activation keeps focus where the
  // browser puts it.
  const onLink = (event: React.MouseEvent<HTMLAnchorElement>, chapter: CaseStudyChapter) => {
    event.preventDefault();
    setOpen(false);
    jumpTo(chapter, event.detail === 0);
  };

  // Previous / next keep focus on the button so the reader can keep stepping;
  // a polite live region names where they landed instead.
  const step = (chapter: CaseStudyChapter | null) => {
    if (!chapter) return;
    setOpen(false);
    jumpTo(chapter, false);
    setAnnounce(chapter.label);
  };

  const positionLine = current ? `${index + 1} ${ofLabel} ${linked.length}` : "";

  return (
    <nav
      ref={navRef}
      className={`rp-chapters${shown ? " is-shown" : ""}${past ? " is-past" : ""}${open ? " is-open" : ""}`}
      aria-label={ariaLabel || `${project} case study chapters`}
    >
      <p className="rp-chapters__label">{jumpLabel}</p>

      <div className="rp-chapters__chip">
        <button
          type="button"
          className="rp-chapters__step"
          aria-label={prevLabel}
          aria-disabled={prev ? undefined : "true"}
          onClick={() => step(prev)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          ref={toggleRef}
          type="button"
          className="rp-chapters__toggle"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
        >
          <b>{current ? current.label : jumpLabel}</b>{" "}
          <small>
            {positionLine}
            {progress && (
              <span className="rp-chapters__left" aria-hidden="true">
                {positionLine ? " · " : ""}
                {left}% {leftLabel}
              </span>
            )}
          </small>
        </button>
        <button
          type="button"
          className="rp-chapters__step"
          aria-label={nextLabel}
          aria-disabled={next ? undefined : "true"}
          onClick={() => step(next)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <ol className="rp-chapters__list" id={listId}>
        {linked.map((chapter) => (
          <li key={chapter.id}>
            <a
              href={`#${chapter.id}`}
              onClick={(event) => onLink(event, chapter)}
              className={active === chapter.id ? "is-active" : undefined}
              aria-current={active === chapter.id ? "true" : undefined}
            >
              {chapter.label}
            </a>
          </li>
        ))}
      </ol>

      <span className="rp-chapters__status sr-only" role="status" aria-live="polite">
        {announce}
      </span>
    </nav>
  );
}
