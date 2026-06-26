import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type LoaderProps = {
  /** Path to the loader image (keep your existing asset path) */
  src?: string;
  /** Visible alt text (your current string) */
  alt?: string;
  /** How long to hold the overlay before fading out (ms) */
  holdMs?: number;
};

/**
 * Brief branded intro overlay. It sits ON TOP of fully-rendered content
 * (content is always in the DOM behind it) and removes itself quickly:
 *
 *   - capped total duration: ~120ms hold + ~300ms fade = ~420ms
 *   - a safety timeout force-removes it no matter what, so it can never
 *     get stuck if the animation is interrupted (e.g. StrictMode remount)
 *   - prefers-reduced-motion: skipped entirely, content shows immediately
 */
export default function Loader({
  src = "/assets/logo-cat.png",
  alt = "",
  holdMs = 120,
}: LoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reduced motion: no intro at all — content is already behind this overlay.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDone(true);
      return;
    }

    const root = rootRef.current;
    if (!root) {
      setDone(true);
      return;
    }

    // Hard safety net: regardless of what happens to the tween, the overlay
    // is gone shortly after the expected end. It can never gate content.
    const safety = window.setTimeout(() => setDone(true), holdMs + 450);

    const tween = gsap.fromTo(
      root,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.3,
        delay: holdMs / 1000,
        ease: "power2.out",
        onComplete: () => setDone(true),
      }
    );

    return () => {
      window.clearTimeout(safety);
      tween.kill();
    };
  }, [holdMs]);

  if (done) return null;

  return (
    <div id="loader" ref={rootRef} aria-hidden="true">
      <img src={src} alt={alt} className="loader-cat" aria-hidden="true" />
    </div>
  );
}
