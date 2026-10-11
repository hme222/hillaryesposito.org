import React, { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage, useT } from "../app/LanguageContext";
import AskBirdNav from "./ask/AskBirdNav";
import NavSettingsPopover from "./NavSettingsPopover";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

type ActiveKey = "home" | "work" | "about" | null;

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
  const homeRef = useRef<HTMLAnchorElement>(null);
  const workRef = useRef<HTMLAnchorElement>(null);
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

  // Same-page section nav. Home and Work are real `<Link>`s now (so a
  // right-click/open-in-new-tab, or landing on the page without JS, still
  // gets somewhere real) - their own onClick handlers call this directly and
  // preventDefault when already on the home page, bypassing the router for
  // the scroll. From any OTHER route, the Link's own navigation runs
  // instead, sending the user home with a ?scrollTo param that Home reads
  // on mount.
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
  // Home gets the marker too, when the home page is scrolled to its own top
  // section - it's a real nav state (the user is "at Home"), not just the
  // logo/wordmark it used to be treated as.
  const homeActive = !workActive && !aboutActive && isHome && activeSection === "home";
  const activeKey: ActiveKey = workActive ? "work" : aboutActive ? "about" : homeActive ? "home" : null;

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
  // Re-run every time the marker's visibility flips, not just once on mount:
  // the mount-only version left `settled` true forever after the first
  // paint, so any LATER hide-then-reappear (leaving every tracked section,
  // e.g. on /ask, then coming back) replayed the same stretch-from-stale-
  // geometry bug the mount guard was meant to prevent. Hiding resets
  // `settled` to false immediately (the marker is invisible - nothing to
  // see animate); the next time it becomes visible, that commit's geometry
  // paints with `settled` already false (no transition - see the CSS
  // `:not([data-settled])` rule), and only once that's painted does this
  // effect flip `settled` back to true, one commit later, with nothing left
  // for the attribute flip itself to animate. A continuous slide (visible
  // the whole time, just a new x/width target) never hits this branch, so
  // slides between items keep animating exactly as before.
  useEffect(() => {
    if (!marker.visible) {
      setSettled(false);
      return;
    }
    // One real animation frame, not a plain synchronous flip: a passive
    // effect calling `setSettled(true)` directly can land close enough
    // behind the layout effect's own geometry commit (sub-millisecond,
    // confirmed live via instrumented traces) that the browser never gets
    // a distinct style recalc/paint at `settled=false` to lock in
    // "transition: none" for - the geometry and the settled flip end up
    // read together as one change, animating anyway. Waiting a real
    // `requestAnimationFrame` guarantees at least one paint happens at the
    // new geometry while still unsettled before this flips it back on.
    const id = window.requestAnimationFrame(() => setSettled(true));
    return () => window.cancelAnimationFrame(id);
  }, [marker.visible]);

  // Holds whatever `recalc` the effect below most recently created, so the
  // mount-only webfont-ready subscription (further down) can always call
  // the CURRENT one instead of a stale closure bound to whichever
  // `activeKey` happened to be active when fonts finished loading.
  const recalcRef = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const track = trackRef.current;
    const target =
      activeKey === "work" ? workRef.current
      : activeKey === "about" ? aboutRef.current
      : activeKey === "home" ? homeRef.current
      : null;

    const recalc = () => {
      if (!track || !target) {
        setMarker((m) => (m.visible ? { ...m, visible: false } : m));
        return;
      }
      const trackRect = track.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      setMarker({ x: targetRect.left - trackRect.left, width: targetRect.width, visible: true });
    };

    recalcRef.current = recalc;
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
    // Depend on `lang` (a primitive), not `t` - `t` is a function, and its
    // identity only has to stay stable across renders by convention (it
    // does in the real LanguageContext, memoized on `lang`), not by
    // contract. Keying off the primitive avoids ever re-running this effect
    // every render if that memoization assumption is wrong.
  }, [activeKey, lang]);

  // Labels re-measure once webfonts finish loading - the dock mounts before
  // "Switzer"/the label font is guaranteed ready, so the very first
  // measurement can be a system-font width. Mount-only (`[]`), not part of
  // the effect above: `document.fonts.ready` is a promise that resolves
  // ONCE, early in the page's life, but calling `.then()` on an
  // ALREADY-resolved promise still queues its callback as a fresh microtask
  // every time - subscribing inside the per-`activeKey` effect above meant
  // every later nav change (not just the first) re-queued one of these,
  // landing a beat after that change's own `settled` had already flipped
  // back to true and firing a redundant `setMarker` call while the marker
  // was legitimately settled - which is to say, with a real transition
  // active - reigniting exactly the stretch this file exists to prevent.
  // Confirmed live via instrumented traces: every `activeKey` change was
  // producing a second, late `recalc()` call whose own `settled` read back
  // `true`, immediately after the correct first call's `false`.
  useEffect(() => {
    document.fonts?.ready.then(() => recalcRef.current()).catch(() => {});
  }, []);

  // Publish the pill's own real bottom edge (distance from the viewport top,
  // not `.navbar`'s own box) as a CSS custom property, so sticky secondary
  // nav (the case-study `.rp-chapters` strip) can derive its offset from one
  // shared value instead of a hard-coded px guess that silently drifts
  // whenever the pill's padding changes at a breakpoint (riso-page.css reads
  // `--dock-h`). Deliberately the PILL's own rect, not `.navbar`'s: `.navbar`
  // reserves extra flow height below the pill (its own bottom padding, same
  // as its top) that the pill itself doesn't occupy - measuring the navbar
  // instead counted that empty padding as part of the "dock", pushing the
  // chapters strip noticeably further down than the intended ~12-14px past
  // the pill's actual visible edge. Same resize/font-ready triggers as the
  // marker's own remeasure above, since both react to the same layout
  // changes.
  useLayoutEffect(() => {
    const publishDockHeight = () => {
      const bottom = document.querySelector(".nav-dock__pill")?.getBoundingClientRect().bottom;
      if (bottom) document.documentElement.style.setProperty("--dock-h", `${bottom}px`);
    };
    publishDockHeight();
    window.addEventListener("resize", publishDockHeight);
    document.fonts?.ready.then(publishDockHeight).catch(() => {});
    return () => window.removeEventListener("resize", publishDockHeight);
  }, []);

  return (
    <nav ref={dockRef} className="navbar nav-dock" aria-label={t("nav.ariaPrimary")}>
      <div className="nav-dock__pill">
        <div className="nav-dock__track" ref={trackRef}>
          <ul className="nav-dock__items">
            <li>
              <Link
                ref={homeRef}
                to="/"
                className="nav-dock__item nav-dock__item--home"
                aria-label={t("nav.logoAria")}
                title="Hillary Esposito"
                aria-current={homeActive ? "page" : undefined}
                onClick={(e) => {
                  // Already home: a normal Link click would still push the
                  // same route onto history, but it does nothing for the one
                  // thing clicking the home mark while already home should
                  // do - scroll back to the top. Handle that ourselves and
                  // skip the router; from anywhere else, let the Link
                  // navigate normally.
                  if (isHome) {
                    e.preventDefault();
                    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
                  }
                }}
              >
                <svg className="logo-mark" width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M5 13.5 Q15.5 30 27.5 13 Q24 17 19 18.6 Q12 20.4 5 13.5 Z" fill="currentColor" />
                  <circle className="lm-accent" cx="15.5" cy="10.2" r="3.1" />
                </svg>
              </Link>
            </li>

            <li>
              <Link
                ref={workRef}
                to="/?scrollTo=projects"
                className="nav-dock__item"
                aria-current={workActive ? "true" : undefined}
                onClick={(e) => {
                  // Already home: scroll directly instead of letting the
                  // Link round-trip through a URL param the home page has
                  // to read back out on mount.
                  if (isHome) {
                    e.preventDefault();
                    scrollToSection("projects");
                  }
                }}
              >
                {t("nav.dockWork")}
              </Link>
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
