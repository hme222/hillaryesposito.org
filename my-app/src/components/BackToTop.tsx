import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { useT } from "../app/LanguageContext";

/**
 * @status: stable
 * @purpose: A small floating glass arrow button that scrolls a case study back to the top. It shows only on /case-study/ pages and only once the reader is within about one screen of the end, so it never competes with the chapter chip while reading. Pick this for a "back to top" at the end of a long page; for moving between chapters use CaseStudyChapters. Honors reduced motion by jumping instead of scrolling smoothly.
 */
export default function BackToTop() {
  const t = useT();
  const { pathname } = useLocation();
  const onCase = pathname.startsWith("/case-study/");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!onCase) {
      setShow(false);
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const left = doc.scrollHeight - (window.scrollY + window.innerHeight);
      setShow(left < window.innerHeight * 0.9 && window.scrollY > window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [onCase, pathname]);

  if (!onCase) return null;

  const goTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      className={`back-to-top${show ? " is-shown" : ""}`}
      onClick={goTop}
      aria-label={t("nav.backToTop")}
      title={t("nav.backToTop")}
      tabIndex={show ? 0 : -1}
      aria-hidden={show ? undefined : true}
    >
      <ArrowUp size={20} strokeWidth={2.4} aria-hidden="true" focusable="false" />
    </button>
  );
}
