import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import AskBirdNav from "./AskBirdNav";

let mockPathname = "/";

// `virtual: true` because this environment's Jest/jest-resolve fails to
// resolve the real "react-router-dom" package from this file's directory
// (pre-existing, reproduces on a clean checkout with no code changes at all -
// confirmed via `git stash` before this fix landed). The same symptom never
// surfaces elsewhere because every other suite that touches the router
// mocks it the same virtual way (see FlagshipCaseStudies.a11y.test.tsx).
jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: mockPathname }),
}), { virtual: true });

jest.mock("../../app/LanguageContext", () => ({
  useT: () => (key: string) => key,
}));

describe("AskBirdNav", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  function setReducedMotion(reduceMotion: boolean) {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: reduceMotion, addEventListener() {}, removeEventListener() {} }),
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
    setReducedMotion(false);
    mockPathname = "/";
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  function button() {
    return container.querySelector<HTMLButtonElement>(".ask-bird-nav");
  }

  it("exposes the accessible name 'Ask about the work' via aria-label", async () => {
    await act(async () => root.render(<AskBirdNav />));
    // useT is mocked to the identity function, so the key itself stands in
    // for the EN string "Ask about the work" / ES "Preguntar sobre el trabajo".
    expect(button()?.getAttribute("aria-label")).toBe("ask.title");
    expect(button()?.getAttribute("title")).toBe("ask.title");
  });

  it("dispatches open-ask with entry 'nav' and the button as returnFocus on click", async () => {
    await act(async () => root.render(<AskBirdNav />));
    const handler = jest.fn();
    window.addEventListener("open-ask", handler);
    await act(async () => button()?.click());
    expect(handler).toHaveBeenCalledTimes(1);
    const detail = (handler.mock.calls[0][0] as CustomEvent).detail;
    expect(detail.entry).toBe("nav");
    expect(detail.returnFocus).toBe(button());
    window.removeEventListener("open-ask", handler);
  });

  it("hops once on a client-side route change, then settles", async () => {
    await act(async () => root.render(<AskBirdNav />));
    expect(button()?.classList.contains("is-hopping")).toBe(false);

    mockPathname = "/about";
    await act(async () => root.render(<AskBirdNav />));
    expect(button()?.classList.contains("is-hopping")).toBe(true);

    act(() => jest.advanceTimersByTime(450));
    expect(button()?.classList.contains("is-hopping")).toBe(false);
  });

  it("does not hop on the very first page load", async () => {
    mockPathname = "/case-study/msk";
    await act(async () => root.render(<AskBirdNav />));
    expect(button()?.classList.contains("is-hopping")).toBe(false);
  });

  // React's onMouseEnter/onMouseLeave are synthesized from native
  // "mouseover"/"mouseout" (which bubble, unlike mouseenter/mouseleave) via
  // the delegated listener on the root container - dispatch those directly,
  // the same events RTL's fireEvent.mouseOver/mouseOut would dispatch.
  it("tilts on hover and focus, settling on leave/blur", async () => {
    await act(async () => root.render(<AskBirdNav />));
    const el = button();
    await act(async () => {
      el?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, relatedTarget: null }));
    });
    expect(el?.classList.contains("is-tilted")).toBe(true);

    await act(async () => {
      el?.dispatchEvent(new MouseEvent("mouseout", { bubbles: true, relatedTarget: null }));
    });
    expect(el?.classList.contains("is-tilted")).toBe(false);

    await act(async () => {
      el?.focus();
    });
    expect(el?.classList.contains("is-tilted")).toBe(true);

    await act(async () => {
      el?.blur();
    });
    expect(el?.classList.contains("is-tilted")).toBe(false);
  });

  it("reduced motion: no hop and no tilt classes ever applied", async () => {
    setReducedMotion(true);
    await act(async () => root.render(<AskBirdNav />));
    const el = button();

    await act(async () => {
      el?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, relatedTarget: null }));
    });
    expect(el?.classList.contains("is-tilted")).toBe(false);

    mockPathname = "/projects";
    await act(async () => root.render(<AskBirdNav />));
    expect(el?.classList.contains("is-hopping")).toBe(false);
    act(() => jest.advanceTimersByTime(450));
    expect(el?.classList.contains("is-hopping")).toBe(false);
  });
});
