import { RefObject, useEffect } from "react";

const REVEAL_THRESHOLD = 0.12;
const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";
// The failsafe used to be a fixed CSS animation-delay counted from page
// mount, which meant any reader who spent longer than the delay reading an
// earlier section before scrolling would see every below-the-fold block
// already snapped visible — the intended fade-in never played. The fix:
// arm the failsafe from scroll *proximity*, not from mount. This second,
// much wider IntersectionObserver band fires once a block is actually
// approaching the viewport; only then does a short countdown start.
const APPROACH_ROOT_MARGIN = "0px 0px 40% 0px";
const APPROACH_FAILSAFE_MS = 2200;

/**
 * Wires up scroll-reveal for every `.rp-reveal` element under `root`: the
 * real reveal-on-intersection observer, plus a proximity-armed failsafe.
 * Shared by useFlagshipReveal and by Grove's and CuratedRolePage's own
 * inline observer effects so the fix applies identically everywhere
 * `.rp-reveal` is used. Returns a cleanup function.
 */
export function wireRevealObservers(root: HTMLElement): () => void {
  // Opt this subtree into the hidden-until-revealed state. Without the
  // class the content is simply visible, so a missing/broken observer
  // costs an animation rather than the page (see riso-page.css).
  root.classList.add("js-reveal");

  const elements = Array.from(root.querySelectorAll<HTMLElement>(".rp-reveal"));
  if (elements.length === 0) return () => {};

  if (typeof IntersectionObserver === "undefined") {
    elements.forEach((element) => element.classList.add("is-in"));
    return () => {};
  }

  const timers = new Map<HTMLElement, number>();
  const reveal = (element: HTMLElement) => {
    if (element.classList.contains("is-in")) return;
    element.classList.add("is-in");
    const timer = timers.get(element);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timers.delete(element);
    }
  };

  let revealObserver: IntersectionObserver | undefined;
  let approachObserver: IntersectionObserver | undefined;

  try {
    // The real trigger: fires once a block is genuinely in view.
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: REVEAL_THRESHOLD, rootMargin: REVEAL_ROOT_MARGIN }
    );

    // Backstop against "the real observer never fires for this specific
    // element" (a callback throw, an engine quirk on one target) — armed
    // only once the element enters this much wider band, so it can never
    // fire for content a reader simply hasn't scrolled to yet. That's what
    // makes it a failure backstop rather than a disguised mount timer.
    approachObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (!entry.isIntersecting || timers.has(element)) return;
          const timer = window.setTimeout(() => reveal(element), APPROACH_FAILSAFE_MS);
          timers.set(element, timer);
          approachObserver?.unobserve(element);
        });
      },
      { rootMargin: APPROACH_ROOT_MARGIN }
    );

    elements.forEach((element) => {
      revealObserver?.observe(element);
      approachObserver?.observe(element);
    });
  } catch {
    // Observer construction itself failed — fail toward visible rather
    // than leaving the subtree stuck hidden.
    elements.forEach((element) => element.classList.add("is-in"));
    revealObserver?.disconnect();
    approachObserver?.disconnect();
    return () => {};
  }

  return () => {
    revealObserver?.disconnect();
    approachObserver?.disconnect();
    timers.forEach((timer) => window.clearTimeout(timer));
    timers.clear();
  };
}

export default function useFlagshipReveal(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return wireRevealObservers(root);
  }, [rootRef]);
}
