import { useEffect, RefObject } from "react";

/**
 * Masked scroll-reveal for case-study section headings. As a targeted element
 * scrolls into view it wipes up from behind a mask (clip-path inset + a slight
 * rise) — the restrained takeaway from T.Ricks-style interaction work, tuned to
 * the "quiet authority" bar.
 *
 * Designed to FAIL SAFE. Content is visible by default; JS only opts elements
 * into the hidden start-state (via the `reveal-ready` flag on the root), an
 * IntersectionObserver reveals them on scroll, and a hard fallback timer reveals
 * everything regardless. So if JS is off, the observer never fires, or motion is
 * reduced, headings are simply shown — they can never be stranded invisible.
 *
 * Scoped to a root ref so it never touches the framer-motion-driven home page.
 */
const SELECTOR = "h2, .gh-section-label, [data-reveal]";
const FAILSAFE_MS = 2500;

export default function useReveal(rootRef: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const els = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR));
    if (!els.length) return;

    els.forEach((el) => el.classList.add("reveal"));
    // Hiding only happens once this flag is set, so a no-JS render stays visible.
    root.classList.add("reveal-ready");

    const reveal = (el: Element) => el.classList.add("is-visible");

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px" }
    );

    els.forEach((el) => {
      // Anything already on screen at mount just shows (no entrance needed).
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) reveal(el);
      else io.observe(el);
    });

    // Hard guarantee: if the observer never delivers, show everything anyway.
    const failsafe = window.setTimeout(() => els.forEach(reveal), FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
      root.classList.remove("reveal-ready");
      els.forEach((el) => el.classList.remove("reveal", "is-visible"));
    };
  }, [rootRef]);
}
