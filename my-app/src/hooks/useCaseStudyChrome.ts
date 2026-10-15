import { RefObject, useEffect } from "react";

/**
 * "Nav hides, chapters stay" - the reading-mode chrome controller for the
 * case-study routes.
 *
 * On a case study the dock pill plus the sticky chapter strip stacked to
 * ~135px of chrome while reading. Here, scrolling DOWN past a small threshold
 * tucks the dock off the top and the chapter strip pins to `top: 0` as the
 * only bar; a deliberate scroll UP brings the dock back with the strip
 * beneath it. Back near the top, the normal dock shows.
 *
 * Everything is driven by classes on <html> so the CSS owns the visuals:
 *   - `cs-chrome`           route gate (case-study routes only)
 *   - `cs-chrome--tucked`   dock is off-screen, strip at top: 0
 *   - `cs-chrome--animate`  transitions allowed (never under reduced motion,
 *                           and never on the first frame, so a deep link
 *                           doesn't play a slide on arrival)
 * and one custom property, `--cs-chrome-h`: the height of whatever top chrome
 * is showing right now. Every jump target's `scroll-margin-top` reads it, so
 * a chapter link, hero CTA, deep link or language switch lands its heading
 * below the bar that's actually there.
 *
 * The dock is never `aria-hidden` and never `visibility: hidden` - it stays in
 * the tab order, and focus inside it forces it back on screen (JS here, plus a
 * `:focus-within` rule in CSS as a belt-and-braces fallback).
 */

const CASE_STUDY_PATHS = new Set([
  "/case-study/msk",
  "/case-study/grove",
  "/case-study/mobbin",
  "/case-study/logistics",
  "/case-study/knowunity",
  "/case-study/ux-woman",
]);

/** Route gate. Production serves every route with a trailing slash. */
export function isCaseStudyPath(pathname: string): boolean {
  return CASE_STUDY_PATHS.has(pathname.replace(/\/+$/, ""));
}

/** Below this scroll position the dock always shows. The chapter strip sits
    right under the breadcrumb, so it is already stuck well before this. */
export const TUCK_AFTER_PX = 120;
/** Downward travel (accumulated) before the dock tucks. */
export const DOWN_DELTA_PX = 6;
/** Upward travel (accumulated) before the dock comes back - big enough that
    trackpad jitter or a momentum bounce doesn't flash it. */
export const UP_DELTA_PX = 10;
/** Gap between the strip's bottom edge and a landed heading. */
const STRIP_SHOWN_OFFSET_PX = 14; // matches `.rp-chapters { top: calc(var(--dock-h) + 14px) }`

export type ChromeState = {
  tucked: boolean;
  /** Signed travel since the last direction change (+down, -up). */
  travel: number;
};

export type ChromeInput = {
  y: number;
  lastY: number;
  /** Focus in the dock, a dock menu open, or a modal (the tour) open. */
  forced: boolean;
  /** A programmatic/anchor jump is settling - hold the tucked state. */
  jumping: boolean;
};

/**
 * Pure state step: given the previous state and one scroll sample, decide
 * whether the dock is tucked. Kept separate from the DOM so it is unit-tested
 * directly.
 */
export function nextChromeState(prev: ChromeState, input: ChromeInput): ChromeState {
  const { y, lastY, forced, jumping } = input;
  if (forced) return { tucked: false, travel: 0 };
  if (jumping) return { tucked: true, travel: 0 };
  if (y <= TUCK_AFTER_PX) return { tucked: false, travel: 0 };

  const delta = y - lastY;
  if (delta === 0) return prev;
  // Reset the accumulator on a direction change so the thresholds measure one
  // continuous gesture, not a net over the whole page.
  const sameDirection = (delta > 0) === (prev.travel > 0) || prev.travel === 0;
  const travel = sameDirection ? prev.travel + delta : delta;

  if (!prev.tucked && travel >= DOWN_DELTA_PX) return { tucked: true, travel: 0 };
  if (prev.tucked && travel <= -UP_DELTA_PX) return { tucked: false, travel: 0 };
  return { tucked: prev.tucked, travel };
}

/** Height of the chrome a landed heading has to clear. */
export function chromeHeight(tucked: boolean, dockBottom: number, stripHeight: number): number {
  if (!stripHeight) return tucked ? 0 : dockBottom;
  return tucked ? stripHeight : dockBottom + STRIP_SHOWN_OFFSET_PX + stripHeight;
}

const JUMP_HOLD_MS = 1400; // CaseStudyChapters re-asserts its jump up to 1100ms
const DEEP_LINK_HOLD_MS = 3000; // lazy case-study chunk + its own hash effect

function readDockBottom(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--dock-h");
  const n = parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 69;
}

/**
 * Wires the controller to the dock `<nav>` for the current route. No-op (and
 * fully cleaned up) off the case-study routes, so Home/About/404 are untouched.
 */
export function useCaseStudyChrome(navRef: RefObject<HTMLElement>, pathname: string, hash = ""): void {
  const enabled = isCaseStudyPath(pathname);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    const nav = navRef.current;
    const reduceQuery = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

    let state: ChromeState = { tucked: false, travel: 0 };
    let lastY = window.scrollY;
    let navFocused = !!nav && nav.contains(document.activeElement);
    let jumpUntil = 0;
    let frame = 0;
    let jumpTimer = 0;
    let animateTimer = 0;
    let applied: boolean | null = null;
    let appliedHeight = -1;

    const isForced = () =>
      navFocused ||
      !!nav?.querySelector('[aria-expanded="true"]') ||
      !!document.querySelector("dialog[open]");

    const apply = () => {
      if (applied !== state.tucked) {
        root.classList.toggle("cs-chrome--tucked", state.tucked);
        applied = state.tucked;
      }
      const strip = document.querySelector<HTMLElement>(".rp-chapters");
      const h = Math.round(chromeHeight(state.tucked, readDockBottom(), strip?.offsetHeight ?? 0));
      if (h !== appliedHeight) {
        root.style.setProperty("--cs-chrome-h", `${h}px`);
        appliedHeight = h;
      }
    };

    const evaluate = () => {
      const y = window.scrollY;
      state = nextChromeState(state, {
        y,
        lastY,
        forced: isForced(),
        jumping: Date.now() < jumpUntil,
      });
      lastY = y;
      apply();
    };

    const holdTucked = (ms: number) => {
      jumpUntil = Date.now() + ms;
      window.clearTimeout(jumpTimer);
      // When the hold lapses, re-run the normal rules once (e.g. the jump
      // landed near the top, or a deep-link target never appeared).
      jumpTimer = window.setTimeout(evaluate, ms + 16);
      evaluate();
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        evaluate();
      });
    };

    // In-page jumps (chapter strip, hero CTAs, any `#id` link): tuck BEFORE the
    // browser/handler scrolls, so the target's scroll-margin already reads the
    // tucked chrome height. Capture phase runs ahead of CaseStudyChapters'
    // own click handler and ahead of the native anchor scroll.
    const onClickCapture = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!link || (nav && nav.contains(link))) return;
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      const strip = document.querySelector<HTMLElement>(".rp-chapters");
      const landing = target.getBoundingClientRect().top + window.scrollY - (strip?.offsetHeight ?? 0);
      if (landing <= TUCK_AFTER_PX) return;
      navFocused = false;
      holdTucked(JUMP_HOLD_MS);
    };

    const onFocusIn = () => {
      navFocused = true;
      evaluate();
    };
    const onFocusOut = (event: FocusEvent) => {
      navFocused = !!nav && nav.contains(event.relatedTarget as Node | null);
      evaluate();
    };

    // A dock menu opening (aria-expanded) or a <dialog> (the 90-second tour)
    // opening/closing re-evaluates the forced state.
    const observer = typeof MutationObserver === "function"
      ? new MutationObserver(() => evaluate())
      : null;
    observer?.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-expanded", "open"],
    });

    // The strip's height changes with language, wrapping and breakpoints.
    const resizeObserver = typeof ResizeObserver === "function"
      ? new ResizeObserver(() => apply())
      : null;
    let observedStrip: Element | null = null;
    const watchStrip = () => {
      const strip = document.querySelector(".rp-chapters");
      if (strip === observedStrip) return;
      if (observedStrip) resizeObserver?.unobserve(observedStrip);
      if (strip) resizeObserver?.observe(strip);
      observedStrip = strip;
      apply();
    };
    const treeObserver = typeof MutationObserver === "function"
      ? new MutationObserver(watchStrip)
      : null;
    const main = document.getElementById("main-content") || document.body;
    treeObserver?.observe(main, { childList: true, subtree: true });

    const setAnimate = () => {
      root.classList.toggle("cs-chrome--animate", !reduceQuery?.matches);
    };

    root.classList.add("cs-chrome");
    watchStrip();
    if (hash.length > 1) {
      // Arriving on a deep link (e.g. from Home): the page's own hash effect
      // scrolls down once the lazy chunk mounts. Start tucked so that scroll
      // lands below the strip alone.
      holdTucked(DEEP_LINK_HOLD_MS);
    } else {
      evaluate();
    }
    // Allow transitions only after the initial state has painted.
    animateTimer = window.setTimeout(setAnimate, 50);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onClickCapture, true);
    nav?.addEventListener("focusin", onFocusIn);
    nav?.addEventListener("focusout", onFocusOut);
    reduceQuery?.addEventListener?.("change", setAnimate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClickCapture, true);
      nav?.removeEventListener("focusin", onFocusIn);
      nav?.removeEventListener("focusout", onFocusOut);
      reduceQuery?.removeEventListener?.("change", setAnimate);
      observer?.disconnect();
      treeObserver?.disconnect();
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(jumpTimer);
      window.clearTimeout(animateTimer);
      root.classList.remove("cs-chrome", "cs-chrome--tucked", "cs-chrome--animate");
      root.style.removeProperty("--cs-chrome-h");
    };
    // `hash` is read only on route entry; a same-page hash change is a click
    // the capture listener already handled.
  }, [enabled, pathname, navRef]);
}
