// src/components/NavSettingsPopover.tsx
import React, { Dispatch, SetStateAction, useEffect, useId, useRef, useState } from "react";
import { switchLanguageAtCurrentSection, useLanguage, useT } from "../app/LanguageContext";
import { GearIcon } from "./LineIcons";

type NavSettingsPopoverProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

/**
 * @status: stable
 * @purpose: Settings disclosure in the nav dock (components/Navbar.tsx): a gear button that opens a small non-modal popover holding the dark-mode toggle and the language toggle. Escape closes and returns focus to the button; a click outside, or focus moving past the popover's last control, closes it too - it never traps focus the way the recruiter panel's modal does.
 */
export default function NavSettingsPopover({ darkMode, setDarkMode }: NavSettingsPopoverProps) {
  const { lang, setLang } = useLanguage();
  const t = useT();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  function closeAndReturnFocus() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function isInside(target: EventTarget | null): boolean {
    const node = target as Node | null;
    if (!node) return false;
    return Boolean(popoverRef.current?.contains(node) || buttonRef.current?.contains(node));
  }

  // Escape closes and hands focus back to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeAndReturnFocus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // A click anywhere outside the button or the popover closes it - plain
  // disclosure behaviour, not a modal backdrop.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!isInside(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Tabbing (forward or backward) past the popover's own controls and the
  // button closes it too - focus is never trapped inside.
  useEffect(() => {
    if (!open) return;
    const onFocusIn = (e: FocusEvent) => {
      if (!isInside(e.target)) setOpen(false);
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [open]);

  // Opening moves focus to the popover's first control, continuing the tab
  // order naturally from the button that opened it.
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      popoverRef.current?.querySelector<HTMLElement>("button")?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  return (
    <div className="nav-settings">
      <button
        ref={buttonRef}
        type="button"
        className="nav-dock__item nav-dock__item--settings"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={t("nav.settingsAria")}
        title={t("nav.settings")}
        onClick={() => setOpen((o) => !o)}
      >
        <GearIcon className="nav-settings__icon" />
      </button>

      {open && (
        <div
          id={popoverId}
          ref={popoverRef}
          className="nav-settings__popover"
          aria-label={t("nav.settingsAria")}
        >
          <button
            type="button"
            className="nav-settings__toggle"
            onClick={() => setDarkMode((d) => !d)}
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2.2M12 19.8V22M4.22 4.22l1.56 1.56M18.22 18.22l1.56 1.56M2 12h2.2M19.8 12H22M4.22 19.78l1.56-1.56M18.22 5.78l1.56-1.56" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span>{darkMode ? t("nav.themeToLight") : t("nav.themeToDark")}</span>
          </button>

          <button
            type="button"
            className="nav-settings__toggle"
            lang={lang === "en" ? "es" : "en"}
            onClick={() => switchLanguageAtCurrentSection(setLang, lang === "en" ? "es" : "en")}
          >
            <span className="nav-settings__langCode" aria-hidden="true">{t("nav.langCode")}</span>
            <span>{t("nav.langSwitch")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
