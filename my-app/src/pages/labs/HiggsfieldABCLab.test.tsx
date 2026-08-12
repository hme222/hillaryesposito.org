import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import HiggsfieldABCLab from "./HiggsfieldABCLab";

jest.setTimeout(20000);

jest.mock("../../app/LanguageContext", () => ({
  useT: () => (key: string) => ({
    "home.proj.msk.subtitle": "UX & Product Design · Healthcare Systems",
    "home.proj.grove.subtitle": "Product Design · AI Judgment",
    "home.proj.mobbin.subtitle": "Freelance · 200+ screens per app across three finance apps, studied for craft",
    "home.riso.mskDesc": "Six years redesigning clinical workflows.",
    "home.riso.groveDesc": "A plant-care app rebuilt around trust.",
    "home.riso.mobbinDesc": "Three finance apps turned into a searchable reference.",
    "home.riso.mskAlt": "MSK care-network map",
    "home.riso.groveAlt": "Grove welcome screen",
    "home.riso.mobbinAlt": "Discover finance app screen",
  }[key] ?? key),
}));

describe("real-context route motion lab", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "matchMedia", { configurable: true, value: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }) });
    Object.defineProperty(window, "requestAnimationFrame", { configurable: true, value: (callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 0) });
    Object.defineProperty(window, "cancelAnimationFrame", { configurable: true, value: (id: number) => window.clearTimeout(id) });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    window.history.replaceState(null, "", "/lab/higgsfield-abc");
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: undefined });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.useRealTimers();
  });

  const renderLab = async () => act(async () => root.render(<HiggsfieldABCLab />));
  const click = async (element: Element | null) => {
    if (!element) throw new Error("Expected element");
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    await act(async () => element.dispatchEvent(event));
    return event;
  };

  it("renders all real adjacent projects with truthful source links", async () => {
    await renderLab();
    const rows = Array.from(container.querySelectorAll<HTMLAnchorElement>(".hrm-row"));
    expect(rows.map((row) => row.getAttribute("href"))).toEqual(["/case-study/msk", "/case-study/grove", "/case-study/mobbin"]);
    expect(rows.map((row) => row.querySelector("img")?.getAttribute("src"))).toEqual([
      "/assets/msk/mskcc-map-thumb.jpg", "/assets/grove/grove1.png", "/assets/mobbin/discover.jpg",
    ]);
  });

  it("keeps native-link behavior when motion enhancement is unavailable", async () => {
    await renderLab();
    const event = await click(container.querySelector('.hrm-row[href="/case-study/grove"]'));
    expect(event.defaultPrevented).toBe(false);
  });

  it("routes immediately through the real URL when native transition support exists", async () => {
    await renderLab();
    const reducedToggle = container.querySelector<HTMLInputElement>('.hrm-motion-control input');
    await act(async () => { reducedToggle?.click(); });
    const finished = Promise.resolve();
    const startViewTransition = jest.fn((update: () => void | Promise<void>) => { void update(); return { finished }; });
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: startViewTransition });
    const event = await click(container.querySelector('.hrm-row[href="/case-study/grove"]'));
    expect(event.defaultPrevented).toBe(true);
    expect(window.location.pathname).toBe("/case-study/grove");
    expect(startViewTransition).toHaveBeenCalledTimes(1);
  });

  it("preserves modified-click and Save Data link semantics", async () => {
    await renderLab();
    const reducedToggle = container.querySelector<HTMLInputElement>('.hrm-motion-control input');
    await act(async () => { reducedToggle?.click(); });
    const startViewTransition = jest.fn();
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: startViewTransition });
    const row = container.querySelector('.hrm-row[href="/case-study/grove"]');
    const modified = new MouseEvent("click", { bubbles: true, cancelable: true, metaKey: true });
    await act(async () => row?.dispatchEvent(modified));
    expect(modified.defaultPrevented).toBe(false);
    Object.defineProperty(navigator, "connection", { configurable: true, value: { saveData: true } });
    const saveDataClick = await click(row);
    expect(saveDataClick.defaultPrevented).toBe(false);
    expect(startViewTransition).not.toHaveBeenCalled();
    Object.defineProperty(navigator, "connection", { configurable: true, value: undefined });
  });

  it("does not intercept the real link for reduced motion", async () => {
    await renderLab();
    const startViewTransition = jest.fn();
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: startViewTransition });
    const event = await click(container.querySelector('.hrm-row[href="/case-study/grove"]'));
    expect(event.defaultPrevented).toBe(false);
    expect(startViewTransition).not.toHaveBeenCalled();
  });

  it("is noindex and has no detectable structural accessibility violations", async () => {
    await renderLab();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, nofollow, noarchive");
    jest.useRealTimers();
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
