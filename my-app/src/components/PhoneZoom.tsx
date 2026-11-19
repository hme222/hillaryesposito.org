import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";

/** Containers whose screen is one picture at a time (the stack crossfades, so the visible one carries `is-on`). */
const STACK = ".fp-sequence__phone";
/** Single pictures, each its own phone or screen. */
const SINGLE = ".fp-fan img, .rp-strip__frame--app img, .fp-indexLens__phone img, .fp-guideScreens img";

const ZOOM_STEPS = [1, 1.5, 2, 3, 4];

type Shown = { src: string; alt: string };

/** The picture a click or key press on `el` should enlarge, or null. */
function pictureFor(el: Element | null): HTMLImageElement | null {
  if (!el) return null;
  // Phones that sit inside a link (the home page's case-study rows) must keep navigating.
  if (el.closest("a[href]")) return null;
  const stack = el.closest(STACK);
  if (stack) return stack.querySelector<HTMLImageElement>("img.is-on") ?? stack.querySelector<HTMLImageElement>("img");
  const img = el.closest("img");
  return img && img.matches(SINGLE) ? img : null;
}

/** Make each zoomable phone reachable by keyboard and named for screen readers. */
function markZoomable(root: ParentNode) {
  root.querySelectorAll<HTMLElement>(`${STACK}, ${SINGLE}`).forEach((el) => {
    if (el.dataset.phoneZoom || el.closest("a[href]")) return;
    el.dataset.phoneZoom = "true";
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    const alt = el instanceof HTMLImageElement ? el.getAttribute("alt") : el.querySelector("img.is-on")?.getAttribute("alt");
    el.setAttribute("aria-label", alt ? `Enlarge screen: ${alt}` : "Enlarge screen");
  });
}

/**
 * @status: stable
 * @purpose: One full-screen picture viewer, mounted once in app/App.tsx, that makes every phone screen on the case-study pages (Mobbin screen sequence and hero fan, the decision-story phones, Knowunity and UX Woman fans, the UX Woman guide screens, Grove's screen strip) click-to-enlarge. The screen opens centered on a solid dark layer that hides the page behind it, with zoom out, zoom in and a Close (X) button; it also zooms with + and -, Ctrl or Cmd plus the wheel, or a double click, and Escape closes it. Phones inside a link (the Home page case-study rows) are left alone so they keep opening the case study, and videos keep their own controls. Built on Modal; pick this for enlarging a screen, not for a content dialog.
 */
export default function PhoneZoom() {
  const [shown, setShown] = useState<Shown | null>(null);
  const [step, setStep] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const invokerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((img: HTMLImageElement, invoker: HTMLElement | null) => {
    invokerRef.current = invoker;
    setStep(0);
    setShown({ src: img.currentSrc || img.src, alt: img.getAttribute("alt") ?? "" });
  }, []);
  const close = useCallback(() => setShown(null), []);

  const zoomIn = () => setStep((s) => Math.min(ZOOM_STEPS.length - 1, s + 1));
  const zoomOut = () => setStep((s) => Math.max(0, s - 1));

  // One listener for every phone, so pages and components need no wiring.
  useEffect(() => {
    markZoomable(document);
    const observer = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach((n) => { if (n instanceof HTMLElement) markZoomable(n); }));
      // A new node may itself be, or sit inside, a phone frame.
      markZoomable(document);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const img = pictureFor(e.target);
      if (!img) return;
      open(img, e.target.closest<HTMLElement>("[data-phone-zoom]"));
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.key !== "Enter" && e.key !== " ") || !(e.target instanceof HTMLElement)) return;
      if (!e.target.dataset.phoneZoom) return;
      const img = pictureFor(e.target);
      if (!img) return;
      e.preventDefault();
      open(img, e.target);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // + / - / 0 while open; Escape is handled by Modal.
  useEffect(() => {
    if (!shown) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") { e.preventDefault(); setStep((s) => Math.min(ZOOM_STEPS.length - 1, s + 1)); }
      else if (e.key === "-" || e.key === "_") { e.preventDefault(); setStep((s) => Math.max(0, s - 1)); }
      else if (e.key === "0") { e.preventDefault(); setStep(0); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shown]);

  // Zoom with Ctrl or Cmd plus the wheel (also a trackpad pinch); a plain wheel scrolls the zoomed picture.
  useEffect(() => {
    const stage = stageRef.current;
    if (!shown || !stage) return undefined;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      setStep((s) => (e.deltaY < 0 ? Math.min(ZOOM_STEPS.length - 1, s + 1) : Math.max(0, s - 1)));
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [shown]);

  const scale = ZOOM_STEPS[step];
  
  return (
    <Modal isOpen={shown !== null} onClose={close} labelledBy="pz-title" className="pz-dialog" returnFocus={invokerRef.current}>
      {shown && (
        <div className="pz">
          <h2 className="sr-only" id="pz-title">{shown.alt ? `Enlarged screen: ${shown.alt}` : "Enlarged screen"}</h2>
          <div className="pz__bar" role="group" aria-label="Zoom">
            <button type="button" onClick={zoomOut} disabled={step === 0} aria-label="Zoom out">−</button>
            <output className="pz__level" aria-live="polite">{Math.round(scale * 100)}%</output>
            <button type="button" onClick={zoomIn} disabled={step === ZOOM_STEPS.length - 1} aria-label="Zoom in">+</button>
            <button type="button" className="pz__close" onClick={close} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="pz__stage" ref={stageRef} tabIndex={0} aria-label="Enlarged screen. Scroll to move around when zoomed in.">
            <img
              src={shown.src}
              alt={shown.alt}
              className="pz__img"
              style={{ ["--pz-scale" as string]: scale }}
              draggable={false}
              onDoubleClick={() => setStep((s) => (s === 0 ? 2 : 0))}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
