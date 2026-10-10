import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import AskDialog from "./AskDialog";

const mockNavigate = jest.fn();
const mockSendPortfolioEvent = jest.fn();

jest.mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }), { virtual: true });

jest.mock("../../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: "en" }),
  useT: () => (key: string) => key,
}));

jest.mock("../../analytics/PortfolioAnalytics", () => ({
  sendPortfolioEvent: (...args: unknown[]) => mockSendPortfolioEvent(...args),
}));

describe("AskDialog - the recruiter panel handoff", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  beforeEach(() => {
    mockNavigate.mockClear();
    mockSendPortfolioEvent.mockClear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function dialog() {
    return container.querySelector<HTMLDialogElement>(".ask-dialog");
  }
  function ninetySecondLink() {
    return container.querySelector<HTMLButtonElement>(".ask-ninety-link");
  }

  it("renders a quiet link near the starters, distinct from the starter buttons", async () => {
    await act(async () => {
      root.render(<AskDialog />);
    });
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-ask", { detail: { entry: "nav" } }));
    });

    expect(dialog()?.open).toBe(true);
    const link = ninetySecondLink();
    expect(link).not.toBeNull();
    expect(link?.textContent).toBe("ask.ninetySecondLink");
    expect(link?.classList.contains("ask-starter")).toBe(false);
  });

  it("closes the Ask dialog and opens the recruiter panel when clicked", async () => {
    await act(async () => {
      root.render(<AskDialog />);
    });
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-ask", { detail: { entry: "nav" } }));
    });
    expect(dialog()?.open).toBe(true);

    const handler = jest.fn();
    window.addEventListener("open-recruiter-panel", handler);
    await act(async () => ninetySecondLink()?.click());
    window.removeEventListener("open-recruiter-panel", handler);

    expect(dialog()?.open).toBe(false);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
