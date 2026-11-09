import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * One motion layer for every route. It waits for the page's real heading (lazy
 * routes mount late), then adds scroll-linked motion to elements that already
 * exist. It never hides content outright (opacity starts at .25, not 0) so a
 * missed scroll event leaves the page readable, and it does nothing when the
 * visitor prefers reduced motion. Elements inside `.rp-reveal` are left to the
 * reveal hook, so nothing gets two entrances (panel review, 2026-11-09).
 * Numbers never count up: an evidence-led page must never show a wrong figure,
 * even for a second mid-animation.
 */

function build(root: Document) {
  const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
  const enter = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

  // Hero: the name's own weight animation (CSS) is its one entrance; the
  // support text follows quickly. Case heroes move the headline a little.
  const notInReveal = (el: HTMLElement) => !el.closest(".rp-reveal");
  if (!q(".rp-nameSplash__word").length) {
    gsap.from(q(".rp-hero .rp-h1, .rp-clearing .rp-h1"), { y: 14, opacity: 0.25, duration: 0.5, ease: "expo.out" });
  }
  gsap.from(q(".rp-heroProof, .rp-sub, .rp-hero__ctas, .rp-readtime"), {
    y: 12, opacity: 0.25, duration: 0.5, ease: "expo.out", stagger: 0.06, delay: 0.1,
  });
  // The portrait drifts a little slower than the page. GSAP owns its transform;
  // the CSS hover lift that fought it was removed.
  q(".rp-headshot").forEach((el) => {
    gsap.to(el, { yPercent: -4, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
  });

  // Section headings rise as they enter.
  q(".rp-title, .rp-section h2").filter(notInReveal).forEach((el) => {
    gsap.from(el, { y: 14, opacity: 0.25, duration: 0.5, ease: "expo.out", scrollTrigger: enter(el) });
  });

  // Home work rows: artifacts drift against the scroll, titles step in.
  q(".rp-work__thumb").forEach((el) => {
    gsap.fromTo(el, { y: 18 }, { y: -18, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  });
  q(".rp-work__title").forEach((el) => {
    gsap.from(el, { x: -22, opacity: 0.3, duration: 0.7, ease: "power3.out", scrollTrigger: enter(el, "top 90%") });
  });

  // Grove: the twelve bars fill in, then the nine that waited settle back.
  const bars = q(".rp-rank__track i");
  if (bars.length) {
    const list = bars[0].closest(".rp-rank") ?? bars[0];
    gsap.from(bars, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power3.out", stagger: 0.07, scrollTrigger: enter(list, "top 80%") });
    const later = q(".rp-rank li:not(.is-core)");
    if (later.length) {
      gsap.to(later, { opacity: 0.55, duration: 0.8, delay: 1.1, ease: "power1.out", scrollTrigger: enter(list, "top 80%") });
    }
  }

  // Build gates: each condition steps in.
  q(".fp-gates").forEach((el) => {
    gsap.from(el.querySelectorAll("li"), { y: 14, opacity: 0.3, duration: 0.5, ease: "power2.out", stagger: 0.08, scrollTrigger: enter(el, "top 85%") });
  });

  // Order status board: rows step in when the board arrives.
  q(".fp-statusBoard").forEach((el) => {
    gsap.from(el.querySelectorAll("tbody tr"), { y: 12, opacity: 0.3, duration: 0.5, ease: "power2.out", stagger: 0.06, scrollTrigger: enter(el, "top 85%") });
  });

  // Confidence map: each level bar fills left to right as the table arrives.
  q(".fp-confidence").forEach((el) => {
    gsap.from(el.querySelectorAll(".fp-confidence__bar i"), { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: "power2.out", stagger: 0.03, scrollTrigger: enter(el, "top 85%") });
  });

  // Case-study artifacts ease in as they arrive.
  q(".fp-artifactLabel, .fp-dashboardFrame, .rp-device, .fp-heroArt").filter(notInReveal).forEach((el) => {
    gsap.from(el, { y: 16, opacity: 0.3, duration: 0.5, ease: "expo.out", scrollTrigger: enter(el, "top 92%") });
  });
}

export default function GsapMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mm = gsap.matchMedia();
    let started = false;
    let timer = 0;
    let tries = 0;

    // A hash that points inside a closed <details> (a deep link from Home or the
    // chapter strip) opens it first, so the link does not depend on the browser
    // doing it. Runs for every visitor, including reduced motion.
    const openHashTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      const box = target?.closest("details") ?? (target instanceof HTMLDetailsElement ? target : null);
      if (box && !box.open) {
        box.open = true;
        target?.scrollIntoView({ block: "start" });
      }
    };

    const start = () => {
      tries += 1;
      const ready = document.querySelector("#main-content h1") && !document.querySelector(".case-study-loader");
      if (!ready) {
        if (tries < 50) timer = window.setTimeout(start, 120);
        return;
      }
      started = true;
      openHashTarget();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        build(document);
        // Images and lazy sections change layout after first paint.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const late = window.setTimeout(refresh, 900);
        return () => {
          window.removeEventListener("load", refresh);
          window.clearTimeout(late);
        };
      });
    };
    timer = window.setTimeout(start, 120);

    return () => {
      window.clearTimeout(timer);
      if (started) mm.revert();
      else mm.kill();
    };
  }, [pathname]);

  return null;
}
