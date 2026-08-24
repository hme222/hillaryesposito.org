import React, { act, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import HomepageOpeningFilm from "./HomepageOpeningFilm";

function Harness({ initialOpen = false }: { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button ref={triggerRef} type="button" onClick={() => setOpen(true)}>View opening visual</button>
      <HomepageOpeningFilm open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} />
    </>
  );
}

describe("Homepage opening film", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    jest.useFakeTimers();
  });

  beforeEach(() => {
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

  function setReducedMotion(reduceMotion: boolean) {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: reduceMotion, addEventListener() {}, removeEventListener() {} }),
    });
  }

  it("enters the portfolio directly and opens only after the named action", async () => {
    setReducedMotion(false);
    await act(async () => root.render(<Harness />));
    expect(container.querySelector(".rp-openingFilm")).toBeNull();

    await act(async () => container.querySelector<HTMLButtonElement>("button")?.click());
    const film = container.querySelector<HTMLElement>(".rp-openingFilm");
    const video = film?.querySelector<HTMLVideoElement>("video");
    expect(film?.getAttribute("role")).toBe("dialog");
    expect(video?.autoplay).toBe(true);
    expect(video?.muted).toBe(true);
    expect(video?.loop).toBe(false);
    expect(video?.controls).toBe(false);
  });

  it("returns focus and page scroll after the film ends", async () => {
    setReducedMotion(false);
    await act(async () => root.render(<Harness initialOpen />));
    const trigger = container.querySelector<HTMLButtonElement>("button");
    const video = container.querySelector<HTMLVideoElement>("video");
    expect(document.documentElement.style.overflow).toBe("hidden");

    await act(async () => video?.dispatchEvent(new Event("ended")));
    act(() => jest.advanceTimersByTime(560));

    expect(container.querySelector(".rp-openingFilm")).toBeNull();
    expect(document.documentElement.style.overflow).toBe("");
    expect(document.activeElement).toBe(trigger);
  });

  it("keeps keyboard focus on the return action and lets Escape close", async () => {
    setReducedMotion(false);
    await act(async () => root.render(<Harness initialOpen />));
    const close = container.querySelector<HTMLButtonElement>(".rp-openingFilm__skip");
    expect(document.activeElement).toBe(close);

    document.body.focus();
    await act(async () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" })));
    expect(document.activeElement).toBe(close);

    await act(async () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
    act(() => jest.advanceTimersByTime(560));
    expect(container.querySelector(".rp-openingFilm")).toBeNull();
  });

  it("shows the static visual instead of motion when reduced motion is requested", async () => {
    setReducedMotion(true);
    await act(async () => root.render(<Harness initialOpen />));
    expect(container.querySelector(".rp-openingFilm__poster")).not.toBeNull();
    expect(container.querySelector("video")).toBeNull();
  });
});
