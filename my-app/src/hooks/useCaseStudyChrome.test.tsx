import React, { act, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import {
  chromeHeight,
  isCaseStudyPath,
  nextChromeState,
  useCaseStudyChrome,
  ChromeState,
  DOWN_DELTA_PX,
  TUCK_AFTER_PX,
  UP_DELTA_PX,
} from "./useCaseStudyChrome";

const shown: ChromeState = { tucked: false, travel: 0 };
const tucked: ChromeState = { tucked: true, travel: 0 };
const step = (prev: ChromeState, y: number, lastY: number, extra: Partial<{ forced: boolean; jumping: boolean }> = {}) =>
  nextChromeState(prev, { y, lastY, forced: false, jumping: false, ...extra });

describe("nextChromeState", () => {
  it("tucks on a downward scroll past the threshold", () => {
    expect(step(shown, 400, 400 - DOWN_DELTA_PX).tucked).toBe(true);
  });

  it("does not tuck near the top of the page", () => {
    expect(step(shown, TUCK_AFTER_PX, 0).tucked).toBe(false);
    expect(step(tucked, 40, 300).tucked).toBe(false);
  });

  it("ignores sub-threshold downward jitter, but accumulates one gesture", () => {
    const a = step(shown, 402, 400);
    expect(a.tucked).toBe(false);
    const b = step(a, 404, 402);
    expect(b.tucked).toBe(false);
    expect(step(b, 407, 404).tucked).toBe(true);
  });

  it("needs a meaningful upward delta before the dock returns", () => {
    const small = step(tucked, 600 - (UP_DELTA_PX - 1), 600);
    expect(small.tucked).toBe(true);
    const y1 = 600 - (UP_DELTA_PX - 1);
    expect(step(small, y1 - 1, y1).tucked).toBe(false);
    expect(step(tucked, 600 - UP_DELTA_PX, 600).tucked).toBe(false);
  });

  it("resets accumulated travel when the direction flips", () => {
    const up = step(tucked, 595, 600); // -5
    const down = step(up, 598, 595); // flips: +3, not -2
    expect(down.travel).toBe(3);
    expect(down.tucked).toBe(true);
  });

  it("forces the dock to show when focus/menus/tour require it", () => {
    expect(step(tucked, 900, 800, { forced: true }).tucked).toBe(false);
  });

  it("holds the tucked state while a jump settles, even scrolling up", () => {
    expect(step(shown, 300, 2000, { jumping: true }).tucked).toBe(true);
    // forced still wins over a jump
    expect(step(shown, 300, 2000, { jumping: true, forced: true }).tucked).toBe(false);
  });
});

describe("chromeHeight", () => {
  it("is the strip alone when tucked, dock + offset + strip when shown", () => {
    expect(chromeHeight(true, 69, 54)).toBe(54);
    expect(chromeHeight(false, 69, 54)).toBe(69 + 14 + 54);
    expect(chromeHeight(false, 69, 0)).toBe(69);
  });
});

describe("isCaseStudyPath", () => {
  it.each([
    "/case-study/msk",
    "/case-study/grove/",
    "/case-study/mobbin",
    "/case-study/logistics",
    "/case-study/knowunity",
    "/case-study/ux-woman/",
  ])("gates %s on", (path) => expect(isCaseStudyPath(path)).toBe(true));

  it.each(["/", "/about", "/about/", "/case-study/nope", "/nowhere"])("leaves %s alone", (path) =>
    expect(isCaseStudyPath(path)).toBe(false),
  );
});

function Harness({ path, hash = "" }: { path: string; hash?: string }) {
  const ref = useRef<HTMLElement>(null);
  useCaseStudyChrome(ref, path, hash);
  return (
    <>
      <nav ref={ref} className="navbar">
        <a href="/">Home</a>
        <button type="button" aria-expanded="false">Settings</button>
      </nav>
      <div id="main-content">
        <nav className="rp-chapters">
          <a href="#far">Far</a>
        </nav>
        <section id="far">Far section</section>
      </div>
    </>
  );
}

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const mounted: { root: Root; container: HTMLDivElement }[] = [];
function render(ui: React.ReactElement) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  act(() => {
    root.render(ui);
  });
  const entry = { root, container };
  mounted.push(entry);
  return {
    container,
    unmount: () => {
      act(() => root.unmount());
      container.remove();
      mounted.splice(mounted.indexOf(entry), 1);
    },
  };
}

describe("useCaseStudyChrome", () => {
  const root = document.documentElement;
  let matchesReduce = false;
  const setY = (y: number) => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: y });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    matchesReduce = false;
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      cb(0);
      return 0;
    });
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce") ? matchesReduce : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    while (mounted.length) {
      const { root: r, container } = mounted.pop()!;
      act(() => r.unmount());
      container.remove();
    }
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("does nothing off the case-study routes", () => {
    render(<Harness path="/about" />);
    setY(800);
    expect(root.classList.contains("cs-chrome")).toBe(false);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
  });

  it("tucks on scroll down and returns on scroll up, then cleans up on unmount", () => {
    const { unmount } = render(<Harness path="/case-study/msk/" />);
    expect(root.classList.contains("cs-chrome")).toBe(true);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
    setY(300);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(true);
    setY(295);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(true);
    setY(280);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
    unmount();
    expect(root.classList.contains("cs-chrome")).toBe(false);
    expect(root.style.getPropertyValue("--cs-chrome-h")).toBe("");
  });

  it("shows the dock when focus moves into it while tucked", () => {
    const { container } = render(<Harness path="/case-study/grove" />);
    setY(500);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(true);
    act(() => {
      container.querySelector<HTMLAnchorElement>(".navbar a")!.focus();
    });
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
    // Stays shown while focused, even scrolling down.
    setY(700);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
  });

  it("keeps the dock shown while a dock menu is open", () => {
    const { container } = render(<Harness path="/case-study/logistics" />);
    container.querySelector(".navbar button")!.setAttribute("aria-expanded", "true");
    setY(500);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
  });

  it("keeps the dock shown while a modal dialog (the tour) is open", () => {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("open", "");
    document.body.appendChild(dialog);
    render(<Harness path="/case-study/knowunity" />);
    setY(500);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(false);
    dialog.remove();
  });

  it("starts tucked on a deep link so the hash target clears the strip alone", () => {
    render(<Harness path="/case-study/ux-woman" hash="#far" />);
    expect(root.classList.contains("cs-chrome--tucked")).toBe(true);
  });

  it("allows transitions only after first paint, and never under reduced motion", () => {
    const { unmount } = render(<Harness path="/case-study/msk" />);
    expect(root.classList.contains("cs-chrome--animate")).toBe(false);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(root.classList.contains("cs-chrome--animate")).toBe(true);
    unmount();

    matchesReduce = true;
    render(<Harness path="/case-study/msk" />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(root.classList.contains("cs-chrome--animate")).toBe(false);
  });
});
