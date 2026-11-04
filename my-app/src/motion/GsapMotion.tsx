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
 * visitor prefers reduced motion. Elements that carry `.rp-reveal` are left to
 * the existing reveal hook; this layer animates their children instead.
 */

const COUNT_UP = /^(\d[\d,]*(?:\.\d+)?)(\+|%)?$/;

function countUp(el: HTMLElement) {
  const raw = el.textContent?.trim() ?? "";
  const m = raw.match(COUNT_UP);
  if (!m) return;
  const target = parseFloat(m[1].replace(/,/g, ""));
  if (!Number.isFinite(target) || target < 10) return;
  const decimals = (m[1].split(".")[1] || "").length;
  const suffix = m[2] ?? "";
  const state = { v: 0 };
  el.setAttribute("aria-label", raw);
  gsap.to(state, {
    v: target,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 88%", once: true },
    onUpdate: () => {
      const n = decimals ? state.v.toFixed(decimals) : Math.round(state.v).toLocaleString("en-US");
      el.textContent = `${n}${suffix}`;
    },
    onComplete: () => {
      el.textContent = raw;
    },
  });
}

function build(root: Document) {
  const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
  const enter = (trigger: Element, start = "top 86%") => ({ trigger, start, once: true });

  // Hero: the headline arrives phrase by phrase, then the support text.
  const phrases = q(".rp-h1Phrase");
  if (phrases.length) {
    gsap.from(phrases, { yPercent: 40, opacity: 0.2, duration: 0.9, ease: "power3.out", stagger: 0.14 });
  } else {
    gsap.from(q(".rp-hero .rp-h1, .rp-clearing .rp-h1"), { y: 28, opacity: 0.2, duration: 0.8, ease: "power3.out" });
  }
  gsap.from(q(".rp-heroProof, .rp-sub, .rp-hero__ctas, .rp-readtime"), {
    y: 18, opacity: 0.25, duration: 0.7, ease: "power2.out", stagger: 0.08, delay: 0.25,
  });
  // The portrait settles in and drifts a little slower than the page.
  q(".rp-headshot").forEach((el) => {
    gsap.from(el, { scale: 1.05, duration: 1.2, ease: "power2.out" });
    gsap.to(el, { yPercent: -4, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
  });

  // Section headings rise as they enter.
  q(".rp-title, .rp-section h2").forEach((el) => {
    gsap.from(el, { y: 26, opacity: 0.25, duration: 0.8, ease: "power3.out", scrollTrigger: enter(el) });
  });

  // Home work rows: artifacts drift against the scroll, titles step in.
  q(".rp-work__thumb").forEach((el) => {
    gsap.fromTo(el, { y: 18 }, { y: -18, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  });
  q(".rp-work__title").forEach((el) => {
    gsap.from(el, { x: -22, opacity: 0.3, duration: 0.7, ease: "power3.out", scrollTrigger: enter(el, "top 90%") });
  });

  // Numbers count up once; the final text is restored exactly.
  q(".rp-stat__n, .rp-surveyStats dt").forEach(countUp);

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

  // Confidence map: each level bar fills left to right as the table arrives.
  q(".fp-confidence").forEach((el) => {
    gsap.from(el.querySelectorAll(".fp-confidence__bar i"), { scaleX: 0, transformOrigin: "left center", duration: 0.5, ease: "power2.out", stagger: 0.03, scrollTrigger: enter(el, "top 85%") });
  });

  // Case-study artifacts ease in as they arrive.
  q(".fp-artifactLabel, .fp-dashboardFrame, .rp-device, .fp-heroArt").forEach((el) => {
    gsap.from(el, { y: 36, opacity: 0.3, duration: 0.9, ease: "power3.out", scrollTrigger: enter(el, "top 92%") });
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
