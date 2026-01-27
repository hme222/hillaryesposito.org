import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type CustomCursorProps = {
  /** Optional: hide cursor on touch devices (recommended) */
  hideOnTouch?: boolean;
};

export default function CustomCursor({ hideOnTouch = true }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Optionally disable on touch devices (prevents weird behavior on mobile)
    if (hideOnTouch && window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    // Start off-screen so it doesn't flash at 0,0
    cursor.style.left = "-100px";
    cursor.style.top = "-100px";

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        duration: 0.2,
        left: e.clientX,
        top: e.clientY,
        ease: "power3.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      gsap.killTweensOf(cursor);
    };
  }, [hideOnTouch]);

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      aria-hidden="true"
      style={{ position: "fixed", pointerEvents: "none", zIndex: 9999 }}
    />
  );
}
