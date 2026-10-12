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
  const [pose, setPose] = useState<BirdPose>("rest");
  const tiltStartRef = useRef(0);

  useEffect(() => {
    if (kind === "thinking") {
      tiltStartRef.current = Date.now();
      setPose("tilt");
      return;
    }
    const timers: number[] = [];
    const hold = Math.max(0, BIRD_TILT_MIN_MS - (Date.now() - tiltStartRef.current));
    timers.push(
      window.setTimeout(() => {
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

  return pose;
}
