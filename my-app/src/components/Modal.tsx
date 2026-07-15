import React, { useEffect, useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** id of the element that labels the dialog (aria-labelledby). */
  labelledBy?: string;
  /** class applied to the <dialog> so callers style the panel. */
  className?: string;
  lang?: string;
  children: React.ReactNode;
};

/**
 * Native <dialog> modal — the "best part of Astryx without the dependency".
 * `showModal()` gives, for free and correctly:
 *   - background made inert to pointer + assistive tech (no manual inert bookkeeping)
 *   - focus moved into the dialog on open, and restored to the invoker on close
 *   - Escape handled natively via the `cancel` event
 * We add: backdrop-click to close, and body scroll-lock while open. This replaces
 * focus-trap-react plus hand-rolled Escape / scroll-lock / focus-restore effects.
 */
export default function Modal({
  isOpen,
  onClose,
  labelledBy,
  className,
  lang,
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
    };
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("close", onCloseEv);
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("close", onCloseEv);
    };
  }, [onClose]);

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
