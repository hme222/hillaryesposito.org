import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import HiggsfieldABCLab, { canonicalIntentId } from "./HiggsfieldABCLab";

jest.setTimeout(20000);

jest.mock("../../app/LanguageContext", () => ({
  useT: () => (key: string) => ({
    "home.proj.msk.subtitle": "UX & Product Design · Healthcare Systems",
    "home.riso.mskDesc": "One visual model helped teams see the same operational system.",
    "home.riso.mskAlt": "A recreated map of Memorial Sloan Kettering's care network across the New York region",
  }[key] ?? key),
}));

describe("Higgsfield A/B/C private lab", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    window.history.replaceState(null, "", "/lab/higgsfield-abc");
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.useRealTimers();
    window.history.replaceState(null, "", "/");
  });

  const renderLab = async () => {
    await act(async () => root.render(<HiggsfieldABCLab />));
  };

  const click = async (button: Element | null) => {
    if (!button) throw new Error("Expected button");
    await act(async () => button.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  };

  it("uses a stable canonical intent identity", () => {
    expect(canonicalIntentId(76, 28, "high")).toBe(canonicalIntentId(77, 29, "high"));
    expect(canonicalIntentId(76, 28, "high")).not.toBe(canonicalIntentId(86, 28, "high"));
    expect(canonicalIntentId(76, 28, "high")).not.toBe(canonicalIntentId(76, 28, "preview"));
  });

  it("keeps all concepts on the exact homepage MSK source", async () => {
    await renderLab();
    for (const label of ["The work has weather", "The page remembers", "Playground"]) {
      await click(Array.from(container.querySelectorAll(".habc-index button")).find((button) => button.textContent?.toLowerCase().includes(label.toLowerCase())) ?? null);
      expect(container.querySelector<HTMLImageElement>(".habc-evidence img")?.getAttribute("src"))
        .toBe("/assets/msk/mskcc-map-thumb.jpg");
    }
  });

  it("keeps C scenarios hidden until completion and returns a compact receipt", async () => {
    await renderLab();
    await click(Array.from(container.querySelectorAll(".habc-index button")).find((button) => button.textContent?.includes("Playground")) ?? null);
    expect(container.querySelector(".habc-scenarios")).toBeNull();
    await click(container.querySelector(".habc-step-controls summary"));
    await click(Array.from(container.querySelectorAll(".habc-step-controls button")).find((button) => button.textContent === "Left") ?? null);
    await click(Array.from(container.querySelectorAll("button")).find((button) => button.textContent === "Finish treatment") ?? null);

    expect(container.querySelector(".habc-receipt")?.textContent).toContain("Protected");
    expect(container.querySelector(".habc-receipt")?.textContent).toContain("Changed");
    expect(container.querySelector(".habc-receipt")?.textContent).toContain("New treatment");
    expect(container.querySelector(".habc-scenarios")).not.toBeNull();
  });

  it("replays an identical committed intent without another result identity", async () => {
    await renderLab();
    await click(Array.from(container.querySelectorAll(".habc-index button")).find((button) => button.textContent?.includes("Playground")) ?? null);
    await click(container.querySelector(".habc-step-controls summary"));
    const left = () => Array.from(container.querySelectorAll(".habc-step-controls button")).find((button) => button.textContent === "Left") ?? null;
    const action = () => container.querySelector(".habc-actions .habc-action");
    await click(left());
    await click(action());
    const firstId = container.querySelector(".habc-receipt details")?.textContent?.match(/MSK-[A-F0-9]+/)?.[0];
    await click(action());
    await click(container.querySelector(".habc-step-controls summary"));
    await click(left());
    await click(action());
    expect(container.querySelector(".habc-receipt")?.textContent).toContain("Replayed · no duplicate");
    expect(container.querySelector(".habc-receipt details")?.textContent).toContain(firstId);
  });

  it("cancels a high-fidelity finish without losing the local composition", async () => {
    await renderLab();
    await click(Array.from(container.querySelectorAll(".habc-index button")).find((button) => button.textContent?.includes("Playground")) ?? null);
    await click(container.querySelector(".habc-step-controls summary"));
    await click(Array.from(container.querySelectorAll(".habc-step-controls button")).find((button) => button.textContent === "Right") ?? null);
    const reduced = container.querySelector<HTMLInputElement>(".habc-toolbar input");
    await act(async () => reduced?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    await click(Array.from(container.querySelectorAll("button")).find((button) => button.textContent === "Finish treatment") ?? null);
    expect(container.textContent).toContain("Finishing the atmosphere");
    await click(Array.from(container.querySelectorAll("button")).find((button) => button.textContent === "Cancel finish") ?? null);
    expect(container.textContent).toContain("Spatial preview ready to finish");
    expect(container.querySelector(".habc-evidence img")).not.toBeNull();
  });

  it("marks the lab noindex and has no detectable structural accessibility violations", async () => {
    await renderLab();
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content"))
      .toBe("noindex, nofollow, noarchive");
    jest.useRealTimers();
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations).toEqual([]);
  });

  it("keeps focus on the stable C action through finish, completion, and reset", async () => {
    await renderLab();
    await click(Array.from(container.querySelectorAll(".habc-index button")).find((button) => button.textContent?.includes("Playground")) ?? null);
    await click(container.querySelector(".habc-step-controls summary"));
    await click(Array.from(container.querySelectorAll(".habc-step-controls button")).find((button) => button.textContent === "Down") ?? null);
    const actionButton = container.querySelector<HTMLButtonElement>(".habc-actions .habc-action");
    actionButton?.focus();
    await click(actionButton);
    expect(document.activeElement).toBe(actionButton);
    expect(actionButton?.textContent).toBe("Start over");
    await click(actionButton);
    expect(document.activeElement).toBe(actionButton);
    expect(actionButton?.textContent).toBe("Finish treatment");
  });
});
