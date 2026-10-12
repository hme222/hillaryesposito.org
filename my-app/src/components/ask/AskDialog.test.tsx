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

// Retrieval is stubbed: "covered" questions return one passage, anything with
// "nothing" in it is not covered. No /api in tests, so answers are passages.
const mockEntry = {
  id: "en:test:0",
  lang: "en",
  text: "A passage.",
  source: { type: "page", label: "Test page", url: "/test" },
  batch: 1,
};
jest.mock("../../ask/engine", () => ({
  getIndex: async () => ({}),
  search: (_index: unknown, q: string) =>
    q.includes("nothing") ? { covered: false, hits: [] } : { covered: true, hits: [{ entry: mockEntry }] },
  distinctSources: () => [],
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

  it("hides the starters once there's an answer and keeps focus in the question field", async () => {
    window.fetch = jest.fn(async () => ({ ok: false, json: async () => ({}) })) as unknown as typeof fetch;
    await act(async () => {
      root.render(<AskDialog />);
    });
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-ask", { detail: { entry: "nav" } }));
    });
    const starter = () => container.querySelector<HTMLButtonElement>(".ask-starter");
    expect(starter()).not.toBeNull();

    await act(async () => starter()?.click());

    expect(container.querySelector(".ask-sources")).not.toBeNull();
    expect(starter()).toBeNull();
    expect(container.querySelector("#ask-starters-label")).toBeNull();
    expect(document.activeElement?.id).toBe("ask-question");
  });

  it("keeps the starters when nothing is covered, so another question is one tap away", async () => {
    await act(async () => {
      root.render(<AskDialog />);
    });
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-ask", { detail: { entry: "nav" } }));
    });
    const input = container.querySelector<HTMLInputElement>("#ask-question")!;
    const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    await act(async () => {
      setValue.call(input, "nothing here");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
    await act(async () => {
      input.form?.requestSubmit();
    });

    expect(container.querySelector(".ask-result__title")?.textContent).toBe("ask.notCoveredTitle");
    expect(container.querySelector(".ask-starter")).not.toBeNull();
  });
});
