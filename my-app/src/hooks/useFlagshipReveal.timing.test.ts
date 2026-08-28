import { wireRevealObservers } from "./useFlagshipReveal";

// Verifies the 2026-08-27 timing fix in isolation, with a controllable fake
// IntersectionObserver + Jest fake timers. The real browser's IO/rAF
// timelines don't fire reliably in this project's automated preview tab
// (documented limitation), so this is the trustworthy way to prove the
// failsafe is armed by scroll proximity, not by a fixed timer from mount.

type Entry = { isIntersecting: boolean; target: Element };
type IOCallback = (entries: Entry[]) => void;

class FakeObserver {
  static instances: FakeObserver[] = [];
  callback: IOCallback;
  observed: Element[] = [];
  constructor(callback: IOCallback, _options?: IntersectionObserverInit) {
    this.callback = callback;
    FakeObserver.instances.push(this);
  }
  observe(el: Element) {
    this.observed.push(el);
  }
  unobserve(el: Element) {
    this.observed = this.observed.filter((o) => o !== el);
  }
  disconnect() {
    this.observed = [];
  }
  // Test helper: simulate the browser calling back for `el`.
  fire(el: Element, isIntersecting: boolean) {
    this.callback([{ isIntersecting, target: el }]);
  }
}

describe("wireRevealObservers timing", () => {
  let originalIO: typeof IntersectionObserver | undefined;

  beforeEach(() => {
    jest.useFakeTimers();
    FakeObserver.instances = [];
    originalIO = (global as any).IntersectionObserver;
    (global as any).IntersectionObserver = FakeObserver as any;
  });

  afterEach(() => {
    (global as any).IntersectionObserver = originalIO;
    jest.useRealTimers();
  });

  function setup() {
    const root = document.createElement("div");
    const block = document.createElement("div");
    block.className = "rp-reveal";
    root.appendChild(block);
    document.body.appendChild(root);
    const cleanup = wireRevealObservers(root);
    const [revealObserver, approachObserver] = FakeObserver.instances;
    return { root, block, revealObserver, approachObserver, cleanup };
  }

  test("a block far from the viewport stays hidden no matter how long since mount (the reported bug)", () => {
    const { block } = setup();
    // Simulates a reader dwelling on an earlier section for a long time
    // before ever scrolling near this block — neither observer has fired
    // for it. The old CSS animation-delay failsafe would have snapped this
    // visible at 2s regardless. It must not.
    jest.advanceTimersByTime(8000);
    expect(block.classList.contains("is-in")).toBe(false);
  });

  test("a real intersection reveals immediately, no failsafe delay involved", () => {
    const { block, revealObserver } = setup();
    revealObserver.fire(block, true);
    expect(block.classList.contains("is-in")).toBe(true);
  });

  test("the failsafe is armed by approach, not by mount", () => {
    const { block, approachObserver } = setup();
    // Time passes with no approach yet — still hidden, however long.
    jest.advanceTimersByTime(6000);
    expect(block.classList.contains("is-in")).toBe(false);

    // Now the block enters the wide "approaching" band (the real observer
    // never fires for it — simulating the specific failure the failsafe
    // exists for).
    approachObserver.fire(block, true);

    // Just under the failsafe window: still hidden.
    jest.advanceTimersByTime(2100);
    expect(block.classList.contains("is-in")).toBe(false);

    // Past the failsafe window: revealed.
    jest.advanceTimersByTime(200);
    expect(block.classList.contains("is-in")).toBe(true);
  });

  test("a real intersection arriving after approach cancels the failsafe timer cleanly", () => {
    const { block, approachObserver, revealObserver } = setup();
    approachObserver.fire(block, true);
    jest.advanceTimersByTime(500);
    revealObserver.fire(block, true);
    expect(block.classList.contains("is-in")).toBe(true);
    expect(() => jest.advanceTimersByTime(5000)).not.toThrow();
  });

  test("no IntersectionObserver support reveals everything immediately (fail-visible)", () => {
    (global as any).IntersectionObserver = undefined;
    const root = document.createElement("div");
    const block = document.createElement("div");
    block.className = "rp-reveal";
    root.appendChild(block);
    document.body.appendChild(root);
    wireRevealObservers(root);
    expect(block.classList.contains("is-in")).toBe(true);
  });

  test("a throwing IntersectionObserver constructor reveals everything immediately (fail-visible)", () => {
    (global as any).IntersectionObserver = class {
      constructor() {
        throw new Error("boom");
      }
    };
    const root = document.createElement("div");
    const block = document.createElement("div");
    block.className = "rp-reveal";
    root.appendChild(block);
    document.body.appendChild(root);
    wireRevealObservers(root);
    expect(block.classList.contains("is-in")).toBe(true);
  });
});
