import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type LoaderProps = {
  /** Path to the loader image (keep your existing asset path) */
  src?: string;
  /** Visible alt text (your current string) */
  alt?: string;
  /** How long to keep loader before fading out (ms) */
  delayMs?: number;
};

export default function Loader({
  src = "assets/logo-cat.png",
  alt = "Loading animation",
  delayMs = 2200,
}: LoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const img = imgRef.current;
    if (!root || !img) return;

    // Ensure initial state so it doesn't flash
    gsap.set(img, { opacity: 0, scale: 1 });
    gsap.set(root, { opacity: 1 });

    const tl = gsap.timeline({
      onComplete: () => setDone(true), // React removes it (no manual DOM remove)
    });

    tl.to(img, {
      opacity: 1,
      scale: 0.1,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(
        img,
        {
          rotation: 360,
          duration: 2,
          ease: "linear",
          repeat: 1,
          transformOrigin: "center",
        },
        0 // start at the same time as the first tween
      )
      .to(
        root,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        delayMs / 1000 // convert ms → seconds for GSAP timeline position
      );

    return () => {
      tl.kill();
      gsap.killTweensOf(img);
      gsap.killTweensOf(root);
    };
  }, [delayMs]);

  if (done) return null;

  return (
    <div id="loader" ref={rootRef} aria-hidden="true">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="loader-cat"
        aria-hidden="true"
      />
    </div>
  );
}
