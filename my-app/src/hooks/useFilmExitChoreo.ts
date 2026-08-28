import { useCallback, useEffect, useRef } from "react";

// Film-exit paper-delivery arrival (round 4, 2026-08-27). Owner rejected
// round 3's paper-cut clip-path mask outright after watching a generated
// reference video of it ("this has nothing to do with what i need"),
// redirecting to a different mechanism entirely: three independent
// groups — nav, hero header/text, the artifact card — each glides in
// from its own direction (nav from above, hero text from the left, the
// artifact from the right) and settles, borrowing the Weekend Dispatch
// train's ARRIVAL MOTION and PAPER-CRAFT shadow quality without reusing
// its literal subway iconography. See riso-page.css's "film-exit
// paper-delivery arrival (round 4, replaces round 3)" section for the
// full per-group timing trace, easing rationale, and shadow treatment —
// this file only runs the state machine; all the actual motion lives in
// that CSS.
//
// The state machine itself is UNCHANGED in shape from round 3 (and round
// 2 before it): add a gate class, double-rAF to a "go" class so the
// hidden start state actually paints before the target values flip, then
// unconditionally strip both classes after they've settled. Only the
// settle constant moves, to match this round's new (faster than round 3,
// slower than round 2) per-group timing.
//
// Same fail-visible contract as wireRevealObservers/.rp-reveal: the
// hidden pre-arrival state in riso-page.css only switches on under the
// gate class (.rp-filmChoreo), which nothing adds until this function
// runs, and a CSS animation-delay backstop (see riso-page.css) snaps
// everything visible even if the "go" class is never applied. A missing
// or throwing caller costs an animation, never the page.
//
// Real bug found and fixed here (owner-reported 2026-08-27, traced via a
// temporary getAnimations() log in her own browser, since debugging removed):
// the transition/transition-delay used to live on THIS module's gate rule,
// on the same declaration as opacity:0. Since the double-rAF below adds the
// go class only ~16-50ms later — far sooner than the 340-680ms delay — the
// hide transition never got past its own delay phase before the target
// flipped back to visible, so nothing ever actually hid. The transition now
// lives on the .rp-filmChoreo--go rule in riso-page.css instead, so the
// delay only ever gates the reveal, never races a hide that hadn't started.
const GATE_CLASS = "rp-filmChoreo";
const GO_CLASS = "rp-filmChoreo--go";
// The slowest real group (the artifact card) settles at 680ms delay +
// 720ms duration = 1400ms. 1700ms clears that with a real ~300ms margin —
// enough that a rapid re-open or unmount can't land while a transition is
// still mid-flight — while still removing the gate/go classes well
// inside 2s rather than leaving them as dead state on <html>.
const SETTLE_MS = 1700;

type ChoreoWindow = Pick<
  Window,
  "matchMedia" | "requestAnimationFrame" | "cancelAnimationFrame" | "setTimeout" | "clearTimeout"
>;

/**
 * Adds the gate + go classes to `root` (default: <html>) to run the
 * paper-delivery arrival once, then removes them after they've settled.
 * Returns a cleanup function that cancels any pending frame/timer and
 * removes the classes immediately — call it on unmount, and call it again
 * before re-triggering so a rapid re-open can't stack timers.
 *
 * Reduced motion: does nothing. The elements have no hidden state to
 * begin with unless .rp-filmChoreo is present, so skipping the class
 * entirely is equivalent to (and simpler than) adding it and letting the
 * CSS reduced-motion override neutralize it — belt-and-suspenders, since
 * the CSS override exists too in case this check ever races a live
 * preference change.
 */
export function triggerFilmExitChoreo(
  root: HTMLElement = document.documentElement,
  win: ChoreoWindow = window
): () => void {
  const reduceMotion = win.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  if (reduceMotion) return () => {};

  root.classList.add(GATE_CLASS);

  // Double rAF: the hidden (opacity:0, translateX/Y offset) state from the
  // gate class must actually paint before the "go" class flips the target
  // values, or the browser can coalesce both into one frame and skip the
  // transition entirely.
  let raf1 = 0;
  let raf2 = 0;
  raf1 = win.requestAnimationFrame(() => {
    raf2 = win.requestAnimationFrame(() => {
      root.classList.add(GO_CLASS);
    });
  });

  const settleTimer = win.setTimeout(() => {
    root.classList.remove(GATE_CLASS, GO_CLASS);
  }, SETTLE_MS);

  return () => {
    win.cancelAnimationFrame(raf1);
    win.cancelAnimationFrame(raf2);
    win.clearTimeout(settleTimer);
    root.classList.remove(GATE_CLASS, GO_CLASS);
  };
}

/**
 * React entry point: returns a stable callback to pass as
 * HomepageOpeningFilm's onExitStart. Cleans up any pending frame/timer on
 * unmount so a navigation away mid-choreography can't leave classes on
 * <html> for the next page.
 */
export default function useFilmExitChoreo(): () => void {
  const cleanupRef = useRef<() => void>();

  useEffect(() => () => cleanupRef.current?.(), []);

  return useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = triggerFilmExitChoreo();
  }, []);
}
