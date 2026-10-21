import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import CaseStudyChapters from "./CaseStudyChapters";

describe("CaseStudyChapters focus behavior", () => {
  let container: HTMLDivElement;
  let root: Root;
  const scrollIntoView = jest.fn();

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: scrollIntoView,
    });
  });

  beforeEach(() => {
    jest.useFakeTimers();
    scrollIntoView.mockClear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => {
      root.render(
        <>
          <CaseStudyChapters
            project="Test project"
            chapters={[
              { id: "test-start", label: "Start" },
              { id: "test-decisions", label: "Decisions" },
            ]}
          />
          <section id="test-start"><h1>Start</h1></section>
          <section id="test-decisions"><h2>Decision heading</h2></section>
          <button type="button">Continue reading</button>
        </>,
      );
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    window.history.replaceState(null, "", "/");
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("focuses a keyboard destination promptly once and never steals focus back", () => {
    const chapterLink = container.querySelector<HTMLAnchorElement>('.rp-chapters a[href="#test-decisions"]');
    const heading = container.querySelector<HTMLElement>("#test-decisions h2");
    const nextControl = container.querySelector<HTMLButtonElement>("button");
    const focus = jest.spyOn(heading as HTMLElement, "focus");

    act(() => {
      chapterLink?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 0 }));
    });

    expect(document.activeElement).toBe(heading);
    expect(focus).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe("#test-decisions");

    nextControl?.focus();
    act(() => jest.advanceTimersByTime(1200));

    expect(document.activeElement).toBe(nextControl);
    expect(focus).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenCalledTimes(5);
  });

  it("never moves destination focus after pointer activation", () => {
    const chapterLink = container.querySelector<HTMLAnchorElement>('.rp-chapters a[href="#test-decisions"]');
    const heading = container.querySelector<HTMLElement>("#test-decisions h2");
    const nextControl = container.querySelector<HTMLButtonElement>("button");
    const focus = jest.spyOn(heading as HTMLElement, "focus");

    chapterLink?.focus();
    act(() => {
      chapterLink?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1 }));
    });
    nextControl?.focus();
    act(() => jest.advanceTimersByTime(1200));

    expect(document.activeElement).toBe(nextControl);
    expect(focus).not.toHaveBeenCalled();
    expect(scrollIntoView).toHaveBeenCalledTimes(5);
  });

  it("cancels layout-settling retries after newer user viewport input", () => {
    const chapterLink = container.querySelector<HTMLAnchorElement>('.rp-chapters a[href="#test-decisions"]');

    act(() => {
      chapterLink?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 0 }));
    });
    expect(scrollIntoView).toHaveBeenCalledTimes(1);

    act(() => {
      window.dispatchEvent(new WheelEvent("wheel", { bubbles: true }));
      jest.advanceTimersByTime(1200);
    });

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });
});
