import { triggerFilmExitChoreo } from "./useFilmExitChoreo";

// Verifies the film-exit paper-delivery arrival's state machine in
// isolation, with fake timers and an injected rAF/matchMedia stand-in — the
// real browser's rAF/transition timeline doesn't advance reliably in this
// project's automated preview tab (documented limitation), so this is the
// trustworthy way to prove the gate/go class lifecycle and the
// reduced-motion branch. The state machine shape is unchanged from prior
// rounds; only the settle constant (1700ms, matching useFilmExitChoreo.ts's
// SETTLE_MS) moved.

const GATE_CLASS = "rp-filmChoreo";
const GO_CLASS = "rp-filmChoreo--go";

function fakeWindow(reduceMotion: boolean) {
  const rafCallbacks: FrameRequestCallback[] = [];
  let nextId = 1;
  return {
    matchMedia: () => ({ matches: reduceMotion }) as MediaQueryList,
    requestAnimationFrame: (cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return nextId++;
    },
    cancelAnimationFrame: jest.fn(),
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    // Test helper: flush one queued rAF callback.
    flushRaf: () => {
      const cb = rafCallbacks.shift();
      cb?.(0);
    },
  };
}

describe("triggerFilmExitChoreo timing", () => {
  let root: HTMLElement;

  beforeEach(() => {
    jest.useFakeTimers();
    root = document.createElement("html");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("adds the gate class immediately, then the go class after two animation frames", () => {
    const win = fakeWindow(false);
    triggerFilmExitChoreo(root, win);

    expect(root.classList.contains(GATE_CLASS)).toBe(true);
    expect(root.classList.contains(GO_CLASS)).toBe(false);

    win.flushRaf();
    expect(root.classList.contains(GO_CLASS)).toBe(false);

    win.flushRaf();
    expect(root.classList.contains(GO_CLASS)).toBe(true);
  });

  test("removes both classes on its own after the settle window", () => {
    const win = fakeWindow(false);
    triggerFilmExitChoreo(root, win);
    win.flushRaf();
    win.flushRaf();
    expect(root.classList.contains(GO_CLASS)).toBe(true);

    jest.advanceTimersByTime(1699);
    expect(root.classList.contains(GATE_CLASS)).toBe(true);

    jest.advanceTimersByTime(1);
    expect(root.classList.contains(GATE_CLASS)).toBe(false);
    expect(root.classList.contains(GO_CLASS)).toBe(false);
  });

  test("the returned cleanup removes both classes immediately, even mid-sequence", () => {
    const win = fakeWindow(false);
    const cleanup = triggerFilmExitChoreo(root, win);
    win.flushRaf();

    cleanup();
    expect(root.classList.contains(GATE_CLASS)).toBe(false);
    expect(root.classList.contains(GO_CLASS)).toBe(false);

    // The settle timer must not fire after cleanup and throw or re-add
    // anything once it's gone.
    expect(() => jest.advanceTimersByTime(1800)).not.toThrow();
    expect(root.classList.contains(GATE_CLASS)).toBe(false);
  });

  test("reduced motion adds no classes at all and returns a no-op cleanup", () => {
    const win = fakeWindow(true);
    const cleanup = triggerFilmExitChoreo(root, win);

    expect(root.classList.contains(GATE_CLASS)).toBe(false);
    win.flushRaf();
    expect(root.classList.contains(GO_CLASS)).toBe(false);

    expect(() => cleanup()).not.toThrow();
    expect(() => jest.advanceTimersByTime(2000)).not.toThrow();
  });

  test("re-triggering before settle does not stack timers that later fire late", () => {
    const win = fakeWindow(false);
    let cleanup = triggerFilmExitChoreo(root, win);
    win.flushRaf();
    win.flushRaf();
    expect(root.classList.contains(GO_CLASS)).toBe(true);

    jest.advanceTimersByTime(300);
    cleanup(); // caller cancels the in-flight sequence before re-triggering
    cleanup = triggerFilmExitChoreo(root, win);

    expect(root.classList.contains(GATE_CLASS)).toBe(true);
    expect(root.classList.contains(GO_CLASS)).toBe(false);

    win.flushRaf();
    win.flushRaf();
    expect(root.classList.contains(GO_CLASS)).toBe(true);

    jest.advanceTimersByTime(1700);
    expect(root.classList.contains(GATE_CLASS)).toBe(false);
  });
});
