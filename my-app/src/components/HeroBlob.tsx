import React, { useMemo } from "react";
import * as blobs2 from "blobs/v2";

/**
 * A single organic blob that refines the soft gradient field behind the hero
 * title. Purely decorative and behind the content z-index — it never gates or
 * delays text visibility. The shape is an SVG path (generated once via the
 * `blobs` package); the gentle drift is a CSS animation that freezes for users
 * who prefer reduced motion. No canvas/WebGL.
 */
export default function HeroBlob() {
  // Generated once. Fixed seed so the shape is intentional and stable, not
  // re-randomised on every render.
  const path = useMemo(
    () =>
      blobs2.svgPath({
        seed: "hillary-hero",
        extraPoints: 6,
        randomness: 5,
        size: 600,
      }),
    []
  );

  return (
    <div className="hero-blob" aria-hidden="true">
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <defs>
          <radialGradient id="hero-blob-gradient" cx="40%" cy="35%" r="75%">
            <stop offset="0%" stopColor="rgba(124, 140, 60, 0.30)" />
            <stop offset="55%" stopColor="rgba(90, 122, 46, 0.15)" />
            <stop offset="100%" stopColor="rgba(90, 122, 46, 0)" />
          </radialGradient>
        </defs>
        <path d={path} fill="url(#hero-blob-gradient)" />
      </svg>
    </div>
  );
}
