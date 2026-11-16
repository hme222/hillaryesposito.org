import React from "react";
import { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import LogisticsMoveMap from "./LogisticsMoveMap";

describe("LogisticsMoveMap", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });
  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("opens on After and switches to Before, keeping only facts the page states", async () => {
    await act(async () => root.render(<LogisticsMoveMap />));
    const svg = container.querySelector("svg");
    expect(container.querySelector(".log-map--after")).not.toBeNull();
    expect(container.querySelectorAll(".log-map__station")).toHaveLength(7);
    expect(container.querySelectorAll(".log-map__region")).toHaveLength(3);
    expect(container.textContent).toContain("1–2 weeks");
    expect(svg?.getAttribute("aria-label")).toContain("1 to 2 weeks");
    expect(container.textContent).toContain("not a map");

    const before = container.querySelector<HTMLButtonElement>(".log-map__tabs button");
    await act(async () => before?.click());
    expect(before?.getAttribute("aria-pressed")).toBe("true");
    expect(container.textContent).toContain("1–2 months");
    expect(container.querySelector(".log-map__ghost")).toBeNull();
  });

  it("has no detectable structural accessibility violations", async () => {
    await act(async () => root.render(<LogisticsMoveMap />));
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
