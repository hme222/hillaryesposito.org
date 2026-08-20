import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import MSKFilingReceipt from "./MSKFilingReceipt";
import MobbinIndexLens from "./MobbinIndexLens";

describe("case-study visual echoes", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("returns to the MSK dashboard with status updated in reduced motion", async () => {
    await act(async () => root.render(<MSKFilingReceipt />));
    const button = container.querySelector<HTMLButtonElement>(".fp-proofControl");
    await act(async () => button?.click());

    expect(container.querySelector(".fp-receipt__trace")?.classList.contains("step-4")).toBe(true);
    expect(container.querySelector(".fp-receipt__paper")?.textContent).toMatch(/filed/i);
    expect(container.querySelector(".fp-proofStatus")?.textContent).toMatch(/status updated/i);
  });

  it("adds metadata beside untouched Mobbin captures", async () => {
    await act(async () => root.render(<MobbinIndexLens />));
    const button = container.querySelector<HTMLButtonElement>(".fp-proofControl");
    expect(container.querySelectorAll(".fp-indexLens__phone img")).toHaveLength(3);

    await act(async () => button?.click());

    expect(container.querySelector(".fp-indexLens")?.classList.contains("is-indexed")).toBe(true);
    expect(button?.getAttribute("aria-pressed")).toBe("true");
    expect(container.querySelector(".fp-indexLens__index")?.getAttribute("aria-hidden")).toBe("false");
    expect(container.querySelector(".fp-proofStatus")?.textContent).toMatch(/task labels visible/i);
  });

  it("has no detectable structural accessibility violations", async () => {
    await act(async () => root.render(<><MSKFilingReceipt /><MobbinIndexLens /></>));
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
