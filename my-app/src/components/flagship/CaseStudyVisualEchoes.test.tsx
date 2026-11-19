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

  it("states the problem in words, with no queue screen and no run button", async () => {
    await act(async () => root.render(<MSKFilingReceipt />));
    // Queue screen retired 2026-11-15 (Lex: "looks vibe-codeable"); the journey picture carries the change.
    expect(container.querySelector(".msk-dashboard-mockup")).toBeNull();
    expect(container.querySelector("#msk-receipt-title")?.textContent).toContain("paper");
    expect(container.textContent).toContain("could delay a patient’s care");
    expect(container.querySelector(".fp-proofControl")).toBeNull();
    expect(container.textContent).not.toMatch(/online path/i);
  });

  it("passes the Spanish copy through", async () => {
    const { MSK_COPY } = await import("../../data/mskCaseStudy");
    await act(async () => root.render(<MSKFilingReceipt copy={MSK_COPY.es.receipt} />));
    expect(container.textContent).toContain("terminaban en");
    expect(container.querySelector(".fp-proofControl")).toBeNull();
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
