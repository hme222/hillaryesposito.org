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

  it("compares all three directions in one ledger and features one first-build artifact", async () => {
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
    expect(decisions.querySelectorAll(".rp-decision")).toHaveLength(1);
    expect(decisions.querySelectorAll(".rp-device img")).toHaveLength(1);
    expect(decisions.textContent).toContain("High-fidelity redesign, edge states, and retest remain unbuilt");
  });
});
