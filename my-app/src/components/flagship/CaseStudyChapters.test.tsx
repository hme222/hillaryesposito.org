import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import CaseStudyChapters, { isOverDarkSurface } from "./CaseStudyChapters";

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

  it("steps to the next chapter from the chip without moving focus, and announces it", () => {
    const prev = container.querySelector<HTMLButtonElement>('button[aria-label="Previous chapter"]');
    const next = container.querySelector<HTMLButtonElement>('button[aria-label="Next chapter"]');
    // Above the first linked chapter there is nothing to go back to.
    expect(prev?.getAttribute("aria-disabled")).toBe("true");
    expect(next?.getAttribute("aria-disabled")).toBeNull();

    next?.focus();
    act(() => {
      next?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 0 }));
    });

    expect(window.location.hash).toBe("#test-decisions");
    expect(document.activeElement).toBe(next);
    expect(container.querySelector('.rp-chapters a[aria-current="true"]')?.textContent).toBe("Decisions");
    expect(container.querySelector('[role="status"]')?.textContent).toBe("Decisions");
    expect(container.querySelector(".rp-chapters__toggle")?.textContent).toContain("1 of 1");
    // Last chapter: next is disabled now and does nothing.
    expect(next?.getAttribute("aria-disabled")).toBe("true");
    act(() => {
      next?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it("opens the chapter sheet from the chip, closes it on Escape, and returns focus", () => {
    const toggle = container.querySelector<HTMLButtonElement>(".rp-chapters__toggle");
    const nav = container.querySelector(".rp-chapters");
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(toggle?.getAttribute("aria-controls")).toBe(container.querySelector(".rp-chapters__list")?.id);

    act(() => toggle?.click());
    expect(toggle?.getAttribute("aria-expanded")).toBe("true");
    expect(nav?.classList.contains("is-open")).toBe(true);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("closes the sheet when a chapter is picked from it", () => {
    const toggle = container.querySelector<HTMLButtonElement>(".rp-chapters__toggle");
    act(() => toggle?.click());
    const chapterLink = container.querySelector<HTMLAnchorElement>('.rp-chapters a[href="#test-decisions"]');
    act(() => {
      chapterLink?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, detail: 1 }));
    });
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(window.location.hash).toBe("#test-decisions");
  });

  it("localizes the chip's position line and step labels", () => {
    act(() => {
      root.render(
        <>
          <CaseStudyChapters
            project="Prueba"
            chapters={[
              { id: "test-start", label: "Inicio" },
              { id: "test-decisions", label: "Decisiones" },
            ]}
            ofLabel="de"
            leftLabel="restante"
            prevLabel="Capítulo anterior"
            nextLabel="Capítulo siguiente"
          />
          <section id="test-start"><h1>Inicio</h1></section>
          <section id="test-decisions"><h2>Decisiones</h2></section>
        </>,
      );
    });
    const next = container.querySelector<HTMLButtonElement>('button[aria-label="Capítulo siguiente"]');
    expect(container.querySelector('button[aria-label="Capítulo anterior"]')).not.toBeNull();
    act(() => next?.click());
    const toggle = container.querySelector(".rp-chapters__toggle");
    expect(toggle?.textContent).toContain("1 de 1");
    expect(toggle?.textContent).toContain("restante");
  });
});

// The dark-stage test under the column. elementsFromPoint is stubbed with the
// paint stack the browser would return, so no layout is mocked.
describe("isOverDarkSurface", () => {
  const original = document.elementsFromPoint;
  const stack = (...els: Element[]) => {
    document.elementsFromPoint = () => els;
  };
  const el = (html: string) => {
    const wrap = document.createElement("div");
    wrap.innerHTML = html;
    document.body.appendChild(wrap);
    return wrap;
  };
  afterEach(() => {
    document.elementsFromPoint = original;
    document.body.innerHTML = "";
  });

  it("is dark over a dark stage, skipping the nav itself", () => {
    const page = el('<nav id="n"><a>Link</a></nav><section class="rp-override"><div class="rp-wrap"></div></section>');
    const nav = page.querySelector("#n");
    stack(nav!.firstElementChild!, nav!, page.querySelector(".rp-wrap")!, page.querySelector(".rp-override")!, document.body);
    expect(isOverDarkSurface(0, 0, nav)).toBe(true);
  });

  it("counts a stage's own dark wash layer as dark", () => {
    const page = el('<section class="rp-cinema"><div class="wash" style="background-color: rgb(16, 33, 21)"></div></section>');
    stack(page.querySelector(".wash")!, page.querySelector(".rp-cinema")!);
    expect(isOverDarkSurface(0, 0, null)).toBe(true);
  });

  it("is not dark over a light card sitting on a stage", () => {
    const page = el('<section class="rp-outcomeStage"><div class="card" style="background-color: rgb(244, 241, 230)"></div></section>');
    stack(page.querySelector(".card")!, page.querySelector(".rp-outcomeStage")!);
    expect(isOverDarkSurface(0, 0, null)).toBe(false);
  });

  it("is not dark over the page paper, even when the paper is dark (dark mode)", () => {
    const page = el('<main style="background-color: rgb(23, 24, 17)"><p>Text</p></main>');
    stack(page.querySelector("p")!, page.querySelector("main")!, document.body);
    expect(isOverDarkSurface(0, 0, null)).toBe(false);
  });
});
