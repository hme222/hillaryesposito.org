// src/components/MediaCard.tsx
import React from "react";
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
};

export default function MediaCard({ src, alt, caption, contain = true }: MediaCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className="cs-media"
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {/* Whole card clickable */}
      <a
        className="media-card media-card-link"
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open full size: ${alt}`}
      >
        <span className="media-link">
          <img src={src} alt={alt} loading="lazy" className={contain ? "contain" : undefined} />
        </span>

        <figcaption>{caption}</figcaption>

        <span className="cs-actions">
          <span className="cs-link">Open full size ↗</span>
        </span>
      </a>
    </motion.figure>
  );
}
