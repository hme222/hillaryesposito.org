import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useT } from "../../app/LanguageContext";
import AskBirdIcon from "./AskBirdIcon";
import "../../styles/ask.css";

const HOP_MS = 450;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * @status: stable
 * @purpose: "Ask" item in the nav dock (components/Navbar.tsx) - a 22px paper bird beside the visible word "Ask". Hops once along the route on client-side route change, tilts its head on hover/focus. Dispatches the `open-ask` CustomEvent the rest of the feature uses, passing the button itself as `returnFocus` so Escape (from the dialog, or from the recruiter panel's "Ask a question" handoff) returns focus here instead of <body>. All motion is skipped under prefers-reduced-motion.
 */
export default function AskBirdNav() {
  const t = useT();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const hopTimeoutRef = useRef<number | undefined>(undefined);

  const [hopping, setHopping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // One short hop along the route on client-side navigation - never on the
  // first page load (prevPathRef already holds the starting pathname).
  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;
    if (prefersReducedMotion()) return;
    setHopping(true);
    window.clearTimeout(hopTimeoutRef.current);
    hopTimeoutRef.current = window.setTimeout(() => setHopping(false), HOP_MS);
  }, [location.pathname]);

  useEffect(() => () => window.clearTimeout(hopTimeoutRef.current), []);

  const tilted = !prefersReducedMotion() && (hovered || focused);
  const askLabel = t("ask.title");

  return (
    <button
      type="button"
      className={`nav-dock__item ask-bird-nav${hopping ? " is-hopping" : ""}${tilted ? " is-tilted" : ""}`}
      aria-label={askLabel}
      title={askLabel}
      onClick={(e) => {
        window.dispatchEvent(
          new CustomEvent("open-ask", { detail: { entry: "nav", returnFocus: e.currentTarget } })
        );
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <AskBirdIcon className="ask-bird-nav__bird" />
      {/* The dock's other items (Work, About, Settings) all carry a visible
          sentence-case label, so this one does too - "Ask" stays a prefix of
          the fuller aria-label above, keeping the visible label contained in
          the accessible name. */}
      <span className="ask-bird-nav__text">{t("ask.nav")}</span>
    </button>
  );
}
