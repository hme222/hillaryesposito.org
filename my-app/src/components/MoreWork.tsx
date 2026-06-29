import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export type MoreWorkProject = {
  icon: string;
  title: string;
  desc: string;
  path: string;
};

type Props = {
  projects: MoreWorkProject[];
  onBack: () => void;
  backLabel?: string;
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * "More Work" footer as a horizontal slider: mouse drag-to-scroll, scroll-snap,
 * and magnetic circular prev/next arrows that appear only when the track
 * overflows. Touch uses native scrolling; keyboard users tab through the cards
 * (focus scrolls them into view). Magnetic pull and smooth scroll are disabled
 * for prefers-reduced-motion. The arrow interaction is the restrained takeaway
 * from T.Ricks — purposeful navigation, not decoration.
 */
export default function MoreWork({ projects, onBack, backLabel = "← Back to All Work" }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    setOverflowing(max > 4);
    setCanPrev(vp.scrollLeft > 4);
    setCanNext(vp.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(vp);
    vp.addEventListener("scroll", update, { passive: true });
    // Window resize is the real-world trigger for the viewport changing width;
    // pair it with the ResizeObserver so arrow visibility stays correct even
    // where RO delivery is throttled.
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      vp.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (dir: number) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.querySelector<HTMLElement>(".gh-proj-card");
    const amount = card ? card.offsetWidth + 24 : vp.clientWidth * 0.8;
    vp.scrollBy({ left: dir * amount, behavior: prefersReduced() ? "auto" : "smooth" });
  };

  // ── Mouse drag-to-scroll (touch keeps native scrolling) ──
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const vp = viewportRef.current;
    if (!vp) return;
    drag.current = { active: true, startX: e.clientX, startLeft: vp.scrollLeft, moved: false };
    vp.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const vp = viewportRef.current;
    if (!vp) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 4) d.moved = true;
    vp.scrollLeft = d.startLeft - dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    const vp = viewportRef.current;
    if (vp && vp.hasPointerCapture(e.pointerId)) vp.releasePointerCapture(e.pointerId);
    drag.current.active = false;
  };
  // Swallow the click that follows a real drag so a card doesn't navigate mid-swipe.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  // ── Magnetic arrow hover (fine pointer only, off for reduced-motion) ──
  const onArrowMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced() || window.matchMedia("(pointer: coarse)").matches) return;
    const b = e.currentTarget;
    const r = b.getBoundingClientRect();
    b.style.setProperty("--mx", `${(e.clientX - (r.left + r.width / 2)) * 0.3}px`);
    b.style.setProperty("--my", `${(e.clientY - (r.top + r.height / 2)) * 0.3}px`);
  };
  const onArrowLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty("--mx", "0px");
    e.currentTarget.style.setProperty("--my", "0px");
  };

  return (
    <aside className="gh-other-projects" aria-label="Other projects">
      <div className="gh-other-projects__header morework-header">
        <div>
          <p className="gh-other-projects__eyebrow">More Work</p>
          <h2>Other Projects</h2>
        </div>

        {overflowing && (
          <div className="morework-arrows">
            <button
              type="button"
              className="morework-arrow"
              aria-label="Scroll to previous projects"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              onMouseMove={onArrowMove}
              onMouseLeave={onArrowLeave}
            >
              <span className="morework-arrow__inner" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className="morework-arrow"
              aria-label="Scroll to next projects"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              onMouseMove={onArrowMove}
              onMouseLeave={onArrowLeave}
            >
              <span className="morework-arrow__inner" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="morework-stage">
        <div
          ref={viewportRef}
          className="morework-viewport"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
        >
          <div className="morework-track">
            {projects.map((proj) => (
              <Link
                key={proj.path}
                to={proj.path}
                className="project-card gh-proj-card morework-card"
                aria-label={`View ${proj.title} case study`}
                draggable={false}
              >
                <div className="project-media">
                  <div className="project-icon">{proj.icon}</div>
                </div>
                <div className="project-body">
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                  <span className="gh-proj-cta">View case study &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Edge fades hint there's more to scroll/drag (decorative, non-blocking). */}
        {canPrev && <div className="morework-fade morework-fade--left" aria-hidden="true" />}
        {canNext && <div className="morework-fade morework-fade--right" aria-hidden="true" />}
      </div>

      <div className="gh-back-row">
        <button type="button" className="hero-btn" onClick={onBack}>
          {backLabel}
        </button>
      </div>
    </aside>
  );
}
