import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import GroveCinematic from "./GroveCinematic";

const setMotionPreference = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn().mockImplementation(() => ({
      matches,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe("Grove documented screen states", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    setMotionPreference(false);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("fans out only real screens documented in the Grove case study", async () => {
    await act(async () => root.render(<GroveCinematic />));
    const toggle = container.querySelector<HTMLButtonElement>(".rp-groveStates__toggle");

    expect(toggle?.textContent).toMatch(/fan out the real screens/i);
    expect(container.querySelector(".rp-groveStates")?.classList.contains("is-fanned")).toBe(false);
    expect(container.querySelectorAll<HTMLImageElement>(".rp-groveStates__screen")).toHaveLength(4);
    expect(container.querySelector('[src*="grove-layer-assembly"]')).toBeNull();
    expect(container.querySelector('[src*="grove-riso-texture"]')).toBeNull();

    await act(async () => toggle?.click());

    expect(container.querySelector(".rp-groveStates")?.classList.contains("is-fanned")).toBe(true);
    expect(toggle?.textContent).toMatch(/stack the screens/i);
    expect(toggle?.getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelector(".rp-groveStates__status")?.textContent).toMatch(/four documented Grove screens/i);
  });

  it("has no detectable structural accessibility violations", async () => {
    await act(async () => root.render(<GroveCinematic />));
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
