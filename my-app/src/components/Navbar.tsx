import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage, useT } from "../app/LanguageContext";
import AskBirdNav from "./ask/AskBirdNav";
import NavSettingsPopover from "./NavSettingsPopover";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

type ActiveKey = "work" | "about" | null;

// Candidate section ids for the home-page scroll tracker below. This is a
// set, not an order - see the effect's comment for why the walk order is
// derived live from the DOM instead of trusted from this list.
const SECTION_IDS = ["home", "projects", "about", "contact"];

/**
 * @status: stable
 * @purpose: Printed route dock - the site's primary navigation (rendered in app/App.tsx): a sticky, transparent full-width `<nav>` (reserving the same flow height the old full-width bar did) holding one visible, top-centre, detached pill cluster (Home mark, Work, About, the Ask bird, and a Settings disclosure for theme/language) with a sliding "printed route marker" behind whichever item is active. Same layout on desktop and phone - no hamburger, no off-canvas menu. Handles same-page section scrolling and case-study/About active-state tracking; Settings owns the dark-mode and language toggles that used to sit loose in the old full-width bar.
 */
export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const t = useT();
  const { lang } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();
  const dockRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLButtonElement>(null);
  const aboutRef = useRef<HTMLAnchorElement>(null);
  // Production (vercel.json: "trailingSlash": true) serves every route with
  // a trailing slash, so a full page load or refresh on /about lands on
  // /about/ - strip it before comparing, the same idiom usePageTitle.ts
  // already uses, or a direct visit never lit up the About item or its
  // aria-current (caught live via Playwright against the built/served site,
  // not assumed).
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
  const isHome =
    normalizedPath === "/" ||
    normalizedPath === "" ||
    normalizedPath === "/index.html";

  // Same-page section nav, fully independent of the hash router.
  // These are <button>s (no href), so the router never intercepts them.
  // On the home page we scroll directly; from any other route we send the
  // user home with a ?scrollTo param that Home reads on mount.
  function scrollToSection(id: string) {
    if (!isHome) {
      navigate("/?scrollTo=" + id);
      return;
    }

    const el = document.getElementById(id);
    if (!el) return;
    // Measured live rather than a fixed constant: the dock is a compact
    // floating pill whose height can change slightly across breakpoints
    // (touch-target padding on phone), unlike the old full-width bar.
    const navHeight = dockRef.current?.getBoundingClientRect().height ?? 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 12;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  }

  // Track which section is in view on the home page. Sections can be taller than
  // the viewport, so an IntersectionObserver threshold is unreliable (30% of a
  // tall section is never visible at once) - instead pick the last section whose
  // top has scrolled above a reference line ~a third down the viewport.
  //
  // "Last" means last in actual DOM order, not last in this list: on the home
  // page #contact sits before #about (RisoHome.tsx), so a hard-coded
  // ["home","projects","about","contact"] walk order would re-overwrite
  // `current` back to "contact" every time both it and #about were above the
  // line, and About would never win. Sort the candidates by their live
  // document position on every measurement instead of trusting source order,
  // so a future section reorder can't reintroduce the same bug silently.
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const measure = () => {
      const line = window.innerHeight * 0.35;
      const sections = SECTION_IDS
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      let current = "home";
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActiveSection(current);
    };

    // getBoundingClientRect() forces a synchronous layout, and this reads four
    // elements. Running that on every raw scroll event means four forced
    // reflows per event on the page's longest scroll. Coalesce to one read per
    // animation frame, the same guard ReadingProgress uses.
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  const isOnCaseStudy = normalizedPath.startsWith("/case-study");
  const workActive = activeSection === "projects" || isOnCaseStudy;
  const aboutActive = !workActive && (normalizedPath === "/about" || activeSection === "about");
  const activeKey: ActiveKey = workActive ? "work" : aboutActive ? "about" : null;

  // The printed route marker: a flat ink pill that slides behind whichever
  // item is active, measured against the track it sits in rather than
  // hard-coded, so it tracks real layout (font load, language length
  // changes, breakpoint changes) instead of an assumed width.
  const [marker, setMarker] = useState<{ x: number; width: number; visible: boolean }>({
    x: 0,
    width: 0,
    visible: false,
  });
  // Geometry-only for the very first measurement; CSS keys its transition
  // off `data-settled`. Flipping that attribute true in the SAME commit as
  // the first real geometry wouldn't work - the transition that applies to
  // a style change is the one in effect at the new computed style, so if
  // data-settled already said "true" by the time x/width changed, the
  // marker would still animate in from the home mark once. Flipping it a
  // commit later, once geometry is already stable and nothing else is
  // changing, means the attribute toggle itself has nothing to animate.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    setSettled(true);
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const target = activeKey === "work" ? workRef.current : activeKey === "about" ? aboutRef.current : null;

    const recalc = () => {
      if (!track || !target) {
        setMarker((m) => (m.visible ? { ...m, visible: false } : m));
        return;
      }
      const trackRect = track.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setMarker({ x: targetRect.left - trackRect.left, width: targetRect.width, visible: true });
    };

    recalc();
    window.addEventListener("resize", recalc);
    // Labels re-measure once webfonts finish loading - the dock mounts
    // before "Switzer"/the label font is guaranteed ready, so the very
    // first measurement can be a system-font width.
    document.fonts?.ready.then(recalc).catch(() => {});
    return () => window.removeEventListener("resize", recalc);
    // Depend on `lang` (a primitive), not `t` - `t` is a function, and its
    // identity only has to stay stable across renders by convention (it
    // does in the real LanguageContext, memoized on `lang`), not by
    // contract. Keying off the primitive avoids ever re-running this effect
    // every render if that memoization assumption is wrong.
  }, [activeKey, lang]);

  return (
    <nav ref={dockRef} className="navbar nav-dock" aria-label={t("nav.ariaPrimary")}>
      <div className="nav-dock__pill">
        <div className="nav-dock__track" ref={trackRef}>
          <ul className="nav-dock__items">
            <li>
              <button
                type="button"
                className="nav-dock__item nav-dock__item--home"
                aria-label={t("nav.logoAria")}
                title="Hillary Esposito"
                onClick={() => {
                  navigate("/");
                  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
                }}
              >
                <svg className="logo-mark" width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M5 13.5 Q15.5 30 27.5 13 Q24 17 19 18.6 Q12 20.4 5 13.5 Z" fill="currentColor" />
                  <circle className="lm-accent" cx="15.5" cy="10.2" r="3.1" />
                </svg>
              </button>
            </li>

            <li>
              <button
                ref={workRef}
                type="button"
                className="nav-dock__item"
                aria-current={workActive ? "true" : undefined}
                onClick={() => scrollToSection("projects")}
              >
                {t("nav.dockWork")}
              </button>
            </li>

            <li>
              <Link
                ref={aboutRef}
                to="/about"
                className="nav-dock__item"
                aria-current={normalizedPath === "/about" ? "page" : aboutActive ? "true" : undefined}
              >
                {t("nav.dockAbout")}
              </Link>
            </li>

            <li>
              <AskBirdNav />
            </li>

            <li>
              <NavSettingsPopover darkMode={darkMode} setDarkMode={setDarkMode} />
            </li>
          </ul>

          <span
            className="nav-dock__marker"
            aria-hidden="true"
            data-settled={settled || undefined}
            style={{
              transform: `translateX(${marker.x}px)`,
              width: `${marker.width}px`,
              opacity: marker.visible ? 1 : 0,
            }}
          />
        </div>
      </div>
    </nav>
  );
}
