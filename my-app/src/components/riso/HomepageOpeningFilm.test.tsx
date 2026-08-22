import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import HomepageOpeningFilm from "./HomepageOpeningFilm";

describe("Homepage opening film", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
  });

  beforeEach(() => {
    window.sessionStorage.clear();
    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: jest.fn(),
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.clearAllTimers();
  });

  afterAll(() => jest.useRealTimers());

  function setPreferences(reduceMotion: boolean, saveData = false) {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: reduceMotion, addEventListener() {}, removeEventListener() {} }),
    });
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData },
    });
  }

  it("fills the opening view once without sound, controls, or looping", async () => {
    setPreferences(false);
    await act(async () => root.render(<HomepageOpeningFilm />));

    const film = container.querySelector<HTMLElement>(".rp-openingFilm");
    const video = film?.querySelector<HTMLVideoElement>("video");
    expect(film?.getAttribute("role")).toBe("dialog");
    expect(video?.autoplay).toBe(true);
    expect(video?.muted).toBe(true);
    expect(video?.loop).toBe(false);
    expect(video?.controls).toBe(false);
    expect(window.sessionStorage.getItem("portfolio-opening-film-seen")).toBe("true");

    await act(async () => video?.dispatchEvent(new Event("ended")));
    expect(film?.classList.contains("is-exiting")).toBe(true);
    act(() => jest.advanceTimersByTime(560));
    expect(container.querySelector(".rp-openingFilm")).toBeNull();
  });

  it("does not replay after it has appeared in the session", async () => {
    setPreferences(false);
    window.sessionStorage.setItem("portfolio-opening-film-seen", "true");
    await act(async () => root.render(<HomepageOpeningFilm />));
    expect(container.querySelector(".rp-openingFilm")).toBeNull();
  });

  it.each([
    [true, false],
    [false, true],
  ])("enters the site directly when reduced motion=%s and save data=%s", async (reduceMotion, saveData) => {
    setPreferences(reduceMotion, saveData);
    await act(async () => root.render(<HomepageOpeningFilm />));
    expect(container.querySelector(".rp-openingFilm")).toBeNull();
  });

  it("allows an immediate skip and releases the page scroll lock", async () => {
    setPreferences(false);
    await act(async () => root.render(<HomepageOpeningFilm />));
    expect(document.documentElement.style.overflow).toBe("hidden");

    await act(async () => container.querySelector<HTMLButtonElement>("button")?.click());
    act(() => jest.advanceTimersByTime(560));

    expect(container.querySelector(".rp-openingFilm")).toBeNull();
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("keeps keyboard focus on Skip and lets Escape reveal the site", async () => {
    setPreferences(false);
    await act(async () => root.render(<HomepageOpeningFilm />));
    const skip = container.querySelector<HTMLButtonElement>(".rp-openingFilm__skip");

    expect(document.activeElement).toBe(skip);
    document.body.focus();
    await act(async () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" })));
    expect(document.activeElement).toBe(skip);

    await act(async () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
    act(() => jest.advanceTimersByTime(560));
    expect(container.querySelector(".rp-openingFilm")).toBeNull();
  });
});
