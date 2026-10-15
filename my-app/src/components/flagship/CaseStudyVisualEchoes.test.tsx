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

  it("ends in the queue: the same row flips from Ready to send to In the chart", async () => {
    await act(async () => root.render(<MSKFilingReceipt />));
    const rows = () => container.querySelectorAll(".fp-receipt__queue .msk-dashboard-mockup__row:not(.msk-dashboard-mockup__row--head)");
    expect(rows()).toHaveLength(1);
    expect(rows()[0].getAttribute("data-status")).toBe("ready-to-file");
    expect(rows()[0].textContent).toContain("Ready to send");
    const mrnBefore = rows()[0].querySelector(".msk-dashboard-mockup__mrn")?.textContent;

    const button = container.querySelector<HTMLButtonElement>(".fp-proofControl");
    await act(async () => button?.click());

    expect(container.querySelector(".fp-receipt__queue")?.classList.contains("step-4")).toBe(true);
    expect(rows()).toHaveLength(1);
    expect(rows()[0].getAttribute("data-status")).toBe("filed-to-chart");
    expect(rows()[0].textContent).toContain("In the chart");
    expect(rows()[0].querySelector(".msk-dashboard-mockup__mrn")?.textContent).toBe(mrnBefore);
    expect(container.querySelector(".fp-proofStatus")?.textContent).toMatch(/status updated/i);
  });

  it("passes the Spanish queue copy through", async () => {
    const { MSK_COPY } = await import("../../data/mskCaseStudy");
    await act(async () => root.render(<MSKFilingReceipt copy={MSK_COPY.es.receipt} dashboardCopy={MSK_COPY.es.dashboard} />));
    await act(async () => container.querySelector<HTMLButtonElement>(".fp-proofControl")?.click());
    expect(container.querySelector(".fp-receipt__queue")?.textContent).toContain("En la historia");
    expect(container.querySelector(".fp-receipt__queue summary")?.textContent).toContain("Qué significan estos términos");
  });

  it("resolves an in-flight MSK filing sequence when reduced motion turns on", async () => {
    jest.useFakeTimers();
    let changeListener: ((event: MediaQueryListEvent) => void) | undefined;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({
        matches: false,
        addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => {
          changeListener = listener;
        },
        removeEventListener() {},
      }),
    });

    await act(async () => root.render(<MSKFilingReceipt />));
    const button = container.querySelector<HTMLButtonElement>(".fp-proofControl");
    await act(async () => button?.click());
    act(() => jest.advanceTimersByTime(500));
    expect(container.querySelector(".fp-receipt__queue")?.classList.contains("step-1")).toBe(true);

    await act(async () => changeListener?.({ matches: true } as MediaQueryListEvent));
    expect(container.querySelector(".fp-receipt__queue")?.classList.contains("step-4")).toBe(true);
    expect(container.querySelector(".fp-proofStatus")?.textContent).toMatch(/status updated/i);

    act(() => jest.advanceTimersByTime(5000));
    expect(container.querySelector(".fp-receipt__queue")?.classList.contains("step-4")).toBe(true);
    jest.useRealTimers();
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
