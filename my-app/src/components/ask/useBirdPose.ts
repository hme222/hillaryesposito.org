import { useEffect, useRef, useState } from "react";
import type { AskView } from "./AskDialog";

export type BirdPose = "rest" | "tilt" | "hop";

export const BIRD_TILT_MIN_MS = 600;
export const BIRD_HOP_MS = 450;

/**
 * The dialog bird's one gesture per step, never a loop: tilt while thinking
 * (held long enough to see, even when retrieval is instant), one hop when an
 * answer lands, settle otherwise. Only the bird waits; the answer itself
 * renders at once.
 */
export function useBirdPose(kind: AskView["kind"]): BirdPose {
  return useBirdState(kind).pose;
}

/**
 * The pose plus the step the bird has visually settled on. The dialog swaps
 * the bird's image (idle vs. not-covered) from `settledKind`, not the live
 * view, so the image changes on the same clock as the gesture: before, a
 * not-covered result swapped the image in at ~90ms while the thinking tilt
 * was still held until 600ms (motion review 2026-10-12).
 */
export function useBirdState(kind: AskView["kind"]): { pose: BirdPose; settledKind: AskView["kind"] } {
  const [pose, setPose] = useState<BirdPose>("rest");
  const [settledKind, setSettledKind] = useState<AskView["kind"]>(kind);
  const tiltStartRef = useRef(0);

  useEffect(() => {
    if (kind === "thinking") {
      tiltStartRef.current = Date.now();
      setPose("tilt");
      setSettledKind(kind);
      return;
    }
    const timers: number[] = [];
    const hold = Math.max(0, BIRD_TILT_MIN_MS - (Date.now() - tiltStartRef.current));
    timers.push(
      window.setTimeout(() => {
        setSettledKind(kind);
        if (kind === "answered" || kind === "passages") {
          setPose("hop");
          timers.push(window.setTimeout(() => setPose("rest"), BIRD_HOP_MS));
        } else {
          setPose("rest");
        }
      }, hold),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [kind]);

  return { pose, settledKind };
}
