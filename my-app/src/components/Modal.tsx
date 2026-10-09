import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** id of the element that labels the dialog (aria-labelledby). */
  labelledBy?: string;
  /** class applied to the <dialog> so callers style the panel. */
  className?: string;
  lang?: string;
  /** Focus target on close when the invoker is gone (e.g. inside a closed menu). */
  returnFocus?: HTMLElement | null;
  children: React.ReactNode;
};

/**
 * Native <dialog> modal - the "best part of Astryx without the dependency".
 * `showModal()` gives, for free and correctly:
 *   - background made inert to pointer + assistive tech (no manual inert bookkeeping)
 *   - focus moved into the dialog on open, and restored to the invoker on close
 *   - Escape handled natively via the `cancel` event
 * We add: backdrop-click to close, body scroll-lock while open, and Tab wrap.
 * `showModal()` makes the page inert but does not wrap sequential focus: measured
 * in Chrome, Tab from the last control lands on <body> (browser chrome in a real
 * window) before coming back around. The keydown handler below closes that loop.
 * This replaces focus-trap-react plus hand-rolled Escape / scroll-lock /
 * focus-restore effects.
 */

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "summary",
  "iframe",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
  "[tabindex]",
].join(",");

function isVisible(el: HTMLElement): boolean {
  // `closest` includes the element itself.
  if (el.closest("[hidden],[inert]")) return false;
  if (typeof el.checkVisibility === "function") {
    return el.checkVisibility({ visibilityProperty: true });
  }
  const style = getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}

/** Tabbable descendants, computed at keydown time so late-rendered or
 *  newly disabled controls are always accounted for. */
function getTabbables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.matches(":disabled") && el.tabIndex >= 0 && isVisible(el),
  );
}
/**
 * @status: stable
 * @purpose: Reusable native `<dialog>`-based modal wrapper (focus trap, Escape-to-close, backdrop-click-to-close, body scroll-lock) used by the recruiter panel (components/RecruiterPill.tsx).
 */
export default function Modal({
  isOpen,
  onClose,
  labelledBy,
  className,
  lang,
  returnFocus,
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // Drive the native dialog from React state.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (isOpen && !dlg.open) {
      dlg.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dlg.open) {
      dlg.close();
    }
  }, [isOpen]);

  // Native Escape (`cancel`) → notify parent; on any `close`, restore scroll.
  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onCancel = (e: Event) => {
      e.preventDefault(); // let React own the open state; don't double-close
      onClose();
    };
    const onCloseEv = () => {
      document.body.style.overflow = "";
      returnFocus?.focus();
    };
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("close", onCloseEv);
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("close", onCloseEv);
    };
  }, [onClose, returnFocus]);

  // Wrap Tab / Shift+Tab at the edges so focus never leaves the open dialog.
  // Listened on the document (capture) rather than the <dialog> so it still
  // catches a Tab pressed while focus sits on <body> after a click on
  // non-focusable panel content.
  useEffect(() => {
    if (!isOpen) return;
    const dlg = ref.current;
    if (!dlg) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || e.defaultPrevented || !dlg.open) return;
      const tabbables = getTabbables(dlg);
      if (!tabbables.length) {
        e.preventDefault();
        return;
      }
      const first = tabbables[0];
      const last = tabbables[tabbables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = !!active && active !== dlg && dlg.contains(active);
      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen]);

  // A click that lands on the dialog element itself is a click on the ::backdrop
  // (content sits in child elements), so it closes.
  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === ref.current) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      lang={lang}
      onClick={handleClick}
      onCancel={() => {
        /* handled in effect; keep prop for React types */
      }}
    >
      {children}
    </dialog>
  );
}
