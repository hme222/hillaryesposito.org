import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import RisoGrove from "./RisoGrove";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props}>{children}</a>
  ),
}), { virtual: true });

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Grove recruiter-scan structure", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "IntersectionObserver", { configurable: true, value: ObserverStub });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
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

  it("compares all three directions in one ledger and shows no first-build screens", async () => {
    await act(async () => {
      root.render(<RisoGrove />);
    });

    const decisions = container.querySelector<HTMLElement>("#grove-decisions")!;
    const ledger = decisions.querySelector(".rp-decisionRecord");

    expect(Array.from(ledger?.querySelectorAll("dt") ?? []).map((item) => item.textContent)).toEqual([
      "Reminders",
      "Plant ID by camera",
      "Personality, not points",
    ]);
    expect(ledger?.textContent).toContain("one calm morning summary");
    expect(ledger?.textContent).toContain("confidence, and sources");
    expect(ledger?.textContent).toContain("remove scorekeeping");
    expect(decisions.querySelectorAll(".rp-decision")).toHaveLength(0);
    expect(decisions.querySelectorAll("img")).toHaveLength(0);
    expect(container.querySelectorAll('img[src*="grove-live"], img[src*="grove1"]')).toHaveLength(0);
    // The hero loops the demo video instead; it has a visible pause control.
    const demo = container.querySelector<HTMLVideoElement>("#grove-start video[loop]");
    expect(demo).not.toBeNull();
    expect(demo?.muted).toBe(true);
    expect(container.querySelector("#grove-start .rp-demoLoop__btn")).not.toBeNull();
    expect(decisions.textContent).toContain("Still unbuilt: high-fidelity redesign, edge states, and retest");
  });
});
