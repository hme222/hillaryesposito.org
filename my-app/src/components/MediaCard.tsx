// src/components/MediaCard.tsx
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export type MediaCardProps = {
  src: string;
  alt: string;
  caption: string;
  contain?: boolean;

  // NEW: optional toggle (for Competitive Analysis)
  toggleLabel?: string;
  isToggled?: boolean;
  onToggle?: () => void;
};

export default function MediaCard({
  src,
  alt,
  caption,
  contain = true,
  toggleLabel,
  isToggled,
  onToggle,
}: MediaCardProps) {
  const reduceMotion = useReducedMotion();
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoomed(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomed]);

  return (
    <motion.figure
      className="cs-media"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Whole card clickable — opens in-page full-screen zoom */}
      <button
        type="button"
        className="media-card media-card-link"
        onClick={() => setZoomed(true)}
        aria-label={`Zoom full size: ${alt}`}
      >
        <span className="media-link">
          <img src={src} alt={alt} loading="lazy" className={contain ? "contain" : undefined} />
        </span>

        <figcaption>{caption}</figcaption>

        <span className="cs-actions">
          <span className="cs-link">🔍 Click to zoom</span>

          {toggleLabel && onToggle && (
            <button
              type="button"
              className="cs-toggle-link"
              aria-pressed={!!isToggled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
            >
              {toggleLabel}{isToggled ? " ▾" : " ▸"}
            </button>
          )}
        </span>
      </button>

      {zoomed && (
        <div
          className="reina-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed: ${alt}`}
          onClick={() => setZoomed(false)}
        >
          <button
            type="button"
            className="reina-zoom-close"
            onClick={() => setZoomed(false)}
            aria-label="Close zoomed view"
          >
            ✕
          </button>
          <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </motion.figure>
  );
}
