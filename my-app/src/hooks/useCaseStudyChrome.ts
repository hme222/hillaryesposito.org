import { RefObject, useEffect } from "react";

/**
 * "Nav that tucks away while reading" (2026-11-23, Hillary's pick I5-S5) -
 * the reading-mode chrome controller, plus the case-study jump-target rules.
 *
 * On every route, scrolling DOWN past a small threshold tucks the dock pill
 * off the top of the window; a deliberate scroll UP, or reaching the top,
 * brings it back. It never tucks while:
 *   - focus is inside the dock, or a dock menu / modal is open;
 *   - the reader is moving with the keyboard (a Tab press holds it on screen
 *     until the next wheel, touch or pointer input);
 *   - the reader asked for reduced motion (the dock simply stays put).
 *
 * Everything is driven by classes on <html> so the CSS owns the visuals:
 *   - `cs-chrome`           route gate (case-study routes only): jump targets
 *                           read `--cs-chrome-h` for their scroll margin
 *   - `nav-tucked`          dock is off-screen (any route)
 *   - `nav-tuck--animate`   transitions allowed (never under reduced motion,
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

/** Master switch for tuck-on-scroll-down. On since 2026-11-23 (I5-S5). */
export const TUCK_ENABLED = true;

const JUMP_HOLD_MS = 1400; // CaseStudyChapters re-asserts its jump up to 1100ms
const DEEP_LINK_HOLD_MS = 3000; // lazy case-study chunk + its own hash effect

/** Height of a chapter strip that sits across the top of the reading area.
    The current chapter nav (CaseStudyChapters) is fixed beside or below the
    content, never across the top, so it adds nothing; a strip inside the
    dock is already part of the dock's height. */
function inFlowStripHeight(): number {
  const strip = document.querySelector<HTMLElement>(".rp-chapters");
  if (!strip || strip.closest(".navbar")) return 0;
  if (getComputedStyle(strip).position === "fixed") return 0;
  return strip.offsetHeight;
}

function readDockBottom(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--dock-h");
  const n = parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : 69;
}

/**
 * Reveal an exact fragment target when a highlights-first case study has put
 * it inside a native disclosure. The browser still owns scrolling, focus and
 * history; this only changes the nearest enclosing <details>' open state.
 */
export function openHashTargetDisclosure(hash: string): boolean {
  if (!hash || hash === "#") return false;

  let id: string;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    return false;
  }

  const target = id ? document.getElementById(id) : null;
  const disclosure = target?.closest<HTMLDetailsElement>("details:not([open])") ?? null;
  if (!disclosure) return false;

  disclosure.open = true;
  return true;
}

/**
 * Wires the controller to the dock `<nav>` for the current route. The tuck
 * runs on every route; the hash reveal and `cs-chrome` jump-target rules run
 * on the case-study routes only.
 */
export function useCaseStudyChrome(navRef: RefObject<HTMLElement>, pathname: string, hash = ""): void {
  const enabled = isCaseStudyPath(pathname);

  useEffect(() => {
    if (!enabled) return;

    // React Router supplies the initial hash. Navigation events take over for
    // native same-page links and browser Back/forward. Watching child mounts
    // covers a direct arrival whose lazy case-study chunk is not in the DOM on
    // the Navbar's first effect pass.
    let revealedHash = "";
    const reveal = (candidate = window.location.hash || hash) => {
      if (!candidate || candidate === "#" || candidate === revealedHash) return;
      let id: string;
      try {
        id = decodeURIComponent(candidate.slice(1));
      } catch {
        return;
      }
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      openHashTargetDisclosure(candidate);
      revealedHash = candidate;
      // Direct case-study routes mount lazily, after the browser's native
      // fragment pass. Complete the expected arrival for both visible chapter
      // targets and targets inside disclosures, without changing history or
      // keyboard focus. The hash guard prevents later DOM mutations from
      // dragging the reader back to the target.
      window.requestAnimationFrame(() =>
        target?.scrollIntoView?.({ block: "start", behavior: "auto" })
      );
    };
    const onHistoryChange = () => {
      revealedHash = "";
      reveal(window.location.hash);
    };

    reveal();
    const observer = typeof MutationObserver === "function"
      ? new MutationObserver(() => reveal())
      : null;
    observer?.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("hashchange", onHistoryChange);
    window.addEventListener("popstate", onHistoryChange);

    return () => {
      observer?.disconnect();
      window.removeEventListener("hashchange", onHistoryChange);
      window.removeEventListener("popstate", onHistoryChange);
    };
  }, [enabled, pathname, hash]);

  useEffect(() => {
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

    // A Tab press anywhere means the reader is moving by keyboard: keep the
    // dock on screen until they next scroll by wheel, touch or pointer.
    let keyboardHold = false;

    const isForced = () =>
      navFocused ||
      keyboardHold ||
      !!reduceQuery?.matches ||
      !!nav?.querySelector('[aria-expanded="true"]') ||
      !!document.querySelector("dialog[open]");

    const apply = () => {
      if (applied !== state.tucked) {
        root.classList.toggle("nav-tucked", state.tucked);
        applied = state.tucked;
      }
      const stripH = inFlowStripHeight();
      const h = Math.round(chromeHeight(state.tucked, readDockBottom(), stripH));
      if (enabled && h !== appliedHeight) {
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
      if (!TUCK_ENABLED) state = { tucked: false, travel: 0 };
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
      const href = link.getAttribute("href")!;
      let id: string;
      try {
        id = decodeURIComponent(href.slice(1));
      } catch {
        return;
      }
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      // CaseStudyChapters prevents the native jump and updates the URL with
      // history.replaceState, which emits neither hashchange nor popstate.
      // Reveal before it measures and scrolls the destination.
      openHashTargetDisclosure(href);
      const landing = target.getBoundingClientRect().top + window.scrollY - inFlowStripHeight();
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
      root.classList.toggle("nav-tuck--animate", !reduceQuery?.matches);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || keyboardHold) return;
      keyboardHold = true;
      evaluate();
    };
    const onPointerInput = () => {
      if (!keyboardHold) return;
      keyboardHold = false;
      evaluate();
    };
    // Reduced motion turning on mid-visit brings a tucked dock back at once.
    const onReduceChange = () => {
      setAnimate();
      evaluate();
    };

    if (enabled) root.classList.add("cs-chrome");
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
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("wheel", onPointerInput, { passive: true, capture: true });
    window.addEventListener("touchstart", onPointerInput, { passive: true, capture: true });
    window.addEventListener("pointerdown", onPointerInput, true);
    reduceQuery?.addEventListener?.("change", onReduceChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClickCapture, true);
      nav?.removeEventListener("focusin", onFocusIn);
      nav?.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("wheel", onPointerInput, true);
      window.removeEventListener("touchstart", onPointerInput, true);
      window.removeEventListener("pointerdown", onPointerInput, true);
      reduceQuery?.removeEventListener?.("change", onReduceChange);
      observer?.disconnect();
      treeObserver?.disconnect();
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(jumpTimer);
      window.clearTimeout(animateTimer);
      root.classList.remove("cs-chrome", "nav-tucked", "nav-tuck--animate");
      root.style.removeProperty("--cs-chrome-h");
    };
    // `hash` is read only on route entry; a same-page hash change is a click
    // the capture listener already handled.
  }, [enabled, pathname, navRef]);
}
