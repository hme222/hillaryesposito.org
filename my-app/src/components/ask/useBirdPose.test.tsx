import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import type { AskView } from "./AskDialog";
import { BIRD_HOP_MS, BIRD_TILT_MIN_MS, useBirdPose } from "./useBirdPose";

function Probe({ kind }: { kind: AskView["kind"] }) {
  return <span data-pose={useBirdPose(kind)} />;
}

describe("useBirdPose - one gesture per step", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    container = document.createElement("div");
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    jest.useRealTimers();
  });

  const pose = () => container.querySelector("span")?.getAttribute("data-pose");
  const render = (kind: AskView["kind"]) => act(() => root.render(<Probe kind={kind} />));
  const advance = (ms: number) => act(() => jest.advanceTimersByTime(ms));

  it("rests when idle", () => {
    render("idle");
    advance(0);
    expect(pose()).toBe("rest");
  });

  it("holds the tilt for a visible beat even when the answer is instant, then hops once and rests", () => {
    render("thinking");
    expect(pose()).toBe("tilt");
    render("answered");
    advance(BIRD_TILT_MIN_MS - 1);
    expect(pose()).toBe("tilt");
    advance(1);
    expect(pose()).toBe("hop");
    advance(BIRD_HOP_MS);
    expect(pose()).toBe("rest");
  });

  it("hops for the passages fallback too", () => {
    render("thinking");
    render("passages");
    advance(BIRD_TILT_MIN_MS);
    expect(pose()).toBe("hop");
  });

  it("does not hop when nothing is covered; it settles", () => {
    render("thinking");
    render("not-covered");
    advance(BIRD_TILT_MIN_MS);
    expect(pose()).toBe("rest");
  });

  it("releases straight away after a long wait", () => {
    render("thinking");
    advance(2000);
    render("answered");
    advance(0);
    expect(pose()).toBe("hop");
  });
});
