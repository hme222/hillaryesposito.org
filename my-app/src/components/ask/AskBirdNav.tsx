import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useT } from "../../app/LanguageContext";
import AskBirdIcon from "./AskBirdIcon";
import "../../styles/ask.css";

const LABEL_SEEN_KEY = "portfolio:ask-label-seen";
const LABEL_SHOW_DELAY_MS = 600;
const LABEL_VISIBLE_MS = 6000;
const HOP_MS = 450;

function hasSeenLabel(): boolean {
  try {
    return window.localStorage.getItem(LABEL_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markLabelSeen(): void {
  try {
    window.localStorage.setItem(LABEL_SEEN_KEY, "1");
  } catch {
    /* storage blocked (private mode, quota) - nothing more to do */
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * @status: stable
 * @purpose: Standalone "Ask about the work" nav control - a 24px paper bird perched on a short coral route line, rendered beside the hamburger in components/Navbar.tsx (desktop and the mobile top bar; the plain-text "Ask about the work" item stays inside the mobile menu list separately). Hops once along the route on client-side route change, tilts its head on hover/focus, and shows a first-visit-only "Ask" label (localStorage `portfolio:ask-label-seen`) that fades in then out or hides the moment the dialog opens. Dispatches the same `open-ask` CustomEvent the rest of the feature uses; all motion is skipped under prefers-reduced-motion.
 */
export default function AskBirdNav() {
  const t = useT();
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const hopTimeoutRef = useRef<number | undefined>(undefined);
  const showTimeoutRef = useRef<number | undefined>(undefined);
  const hideTimeoutRef = useRef<number | undefined>(undefined);

  const [hopping, setHopping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);
  const [labelMounted, setLabelMounted] = useState(false);

  // First-visit label: show once, ~600ms after mount, then hide ~6s later -
  // or immediately the first time the dialog opens, whichever comes first.
  // Never shown again once `portfolio:ask-label-seen` is set. Timing is the
  // same under reduced motion; only the CSS fade is removed there (ask.css).
  useEffect(() => {
    if (hasSeenLabel()) return;
    setLabelMounted(true);
    showTimeoutRef.current = window.setTimeout(() => {
      setLabelVisible(true);
      hideTimeoutRef.current = window.setTimeout(() => {
        setLabelVisible(false);
        markLabelSeen();
      }, LABEL_VISIBLE_MS);
    }, LABEL_SHOW_DELAY_MS);

    return () => {
      window.clearTimeout(showTimeoutRef.current);
      window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Any open of the dialog (this button, the mobile menu item, or the
  // recruiter panel) dismisses the first-visit label immediately and marks
  // it seen, so it never reappears on a later visit.
  useEffect(() => {
    const onOpen = () => {
      window.clearTimeout(showTimeoutRef.current);
      window.clearTimeout(hideTimeoutRef.current);
      setLabelVisible(false);
      markLabelSeen();
    };
    window.addEventListener("open-ask", onOpen);
    return () => window.removeEventListener("open-ask", onOpen);
  }, []);

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
      className={`ask-bird-nav${hopping ? " is-hopping" : ""}${tilted ? " is-tilted" : ""}`}
      aria-label={askLabel}
      title={askLabel}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("open-ask", { detail: { entry: "nav" } }));
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <span className="ask-bird-nav__route" aria-hidden="true">
        <span className="ask-bird-nav__dot" />
        <span className="ask-bird-nav__line" />
      </span>
      <AskBirdIcon className="ask-bird-nav__bird" />
      {labelMounted && (
        <span className={`ask-bird-nav__label${labelVisible ? " is-visible" : ""}`} aria-hidden="true">
          {t("ask.nav")}
        </span>
      )}
    </button>
  );
}
