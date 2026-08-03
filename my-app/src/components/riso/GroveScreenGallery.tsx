import React, { useRef, useState } from "react";

type Screen = {
  src: string;
  cap: string;
  bg: string;
};

export default function GroveScreenGallery({ screens }: { screens: Screen[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(screens.length - 1, index));
    const strip = stripRef.current;
    const item = stripRef.current?.children.item(next) as HTMLElement | null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (strip && item) {
      strip.scrollTo({ left: item.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    }
    setCurrent(next);
  };

  const syncCurrent = () => {
    const strip = stripRef.current;
    if (!strip || strip.children.length === 0) return;
    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;

    Array.from(strip.children).forEach((child, index) => {
      const item = child as HTMLElement;
      const distance = Math.abs(strip.scrollLeft - item.offsetLeft);
      if (distance < shortest) {
        shortest = distance;
        nearest = index;
      }
    });
    setCurrent(nearest);
  };

  return (
    <div className="rp-gallery rp-reveal">
      <div
        className="rp-strip"
        ref={stripRef}
        onScroll={syncCurrent}
        aria-label="Original Grove product screens"
      >
        {screens.map((screen) => (
          <figure className="rp-strip__item" key={screen.src}>
            <div className="rp-strip__frame rp-strip__frame--app" style={{ background: screen.bg }}>
              <img
                src={`/assets/grove/${screen.src}`}
                alt={`Grove — ${screen.cap}`}
                loading="lazy"
              />
            </div>
            <figcaption className="rp-strip__cap">{screen.cap}</figcaption>
          </figure>
        ))}
      </div>

      <div className="rp-gallery__controls" aria-label="Screen gallery controls">
        <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0}>
          ← <span>Previous</span>
        </button>
        <p aria-live="polite">
          <b>{String(current + 1).padStart(2, "0")}</b> / {String(screens.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={current === screens.length - 1}
        >
          <span>Next</span> →
        </button>
      </div>
    </div>
  );
}
