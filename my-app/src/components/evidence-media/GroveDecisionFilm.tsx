import { useEffect, useRef, useState } from "react";

type PlaybackState = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

const SUMMARY =
  "The AI-built Grove prototype made plant care feel busy and guilt-driven. A survey of 34 plant owners narrowed launch to three needs. Hillary rejected guilt-based reminders and chose one calm morning summary. The work is in Phase 2 of 3.";

const PORTRAIT_QUERY = "(max-width: 42rem)";

export default function GroveDecisionFilm() {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState<PlaybackState>("idle");
  const [usePortrait, setUsePortrait] = useState(() =>
    typeof window !== "undefined" && window.matchMedia?.(PORTRAIT_QUERY).matches,
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const query = window.matchMedia?.(PORTRAIT_QUERY);
    if (!query) return;

    const update = () => setUsePortrait(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMounted || !videoRef.current) return;

    videoRef.current.play().catch(() => setState("paused"));
  }, [isMounted]);

  const start = () => {
    setState("loading");
    setIsMounted(true);
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (state === "playing") {
      video.pause();
      return;
    }

    if (state === "ended") video.currentTime = 0;
    video.play().catch(() => setState("paused"));
  };

  const controlLabel = state === "playing"
    ? "Pause Grove decision trace"
    : state === "ended"
      ? "Replay Grove decision trace"
      : "Resume Grove decision trace";

  return (
    <section className="grove-decision-film" aria-labelledby="grove-film-title">
      <div className="grove-decision-film__intro">
        <div>
          <p className="evidence-poster__live-note">Optional motion trace · 7.8 seconds · silent</p>
          <h3 id="grove-film-title">See the decision move from breadth to judgment.</h3>
        </div>
        {!isMounted && (
          <button className="grove-decision-film__control" type="button" onClick={start}>
            Play Grove decision trace · 7.8 sec
          </button>
        )}
      </div>

      {isMounted && (
        <>
          <div className="grove-decision-film__frame">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              poster={`${process.env.PUBLIC_URL}/assets/generated/grove-decision-trace${usePortrait ? "-portrait" : ""}-poster.webp`}
              onPlay={() => setState("playing")}
              onPause={(event) => {
                if (!event.currentTarget.ended) setState("paused");
              }}
              onEnded={() => setState("ended")}
              onError={() => setState("error")}
              aria-describedby="grove-film-summary"
            >
              <source
                media={PORTRAIT_QUERY}
                src={`${process.env.PUBLIC_URL}/assets/generated/grove-decision-trace-portrait.webm`}
                type="video/webm"
              />
              <source
                media={PORTRAIT_QUERY}
                src={`${process.env.PUBLIC_URL}/assets/generated/grove-decision-trace-portrait.mp4`}
                type="video/mp4"
              />
              <source
                src={`${process.env.PUBLIC_URL}/assets/generated/grove-decision-trace.webm`}
                type="video/webm"
              />
              <source
                src={`${process.env.PUBLIC_URL}/assets/generated/grove-decision-trace.mp4`}
                type="video/mp4"
              />
              <track
                default
                kind="captions"
                src={`${process.env.PUBLIC_URL}/assets/generated/grove-decision-trace.vtt`}
                srcLang="en"
                label="English"
              />
              The static Grove decision trace above contains the complete story.
            </video>
          </div>
          <div className="grove-decision-film__controls">
            {state !== "error" && (
              <button className="grove-decision-film__control" type="button" onClick={togglePlayback}>
                {controlLabel}
              </button>
            )}
            <span className="grove-decision-film__status" aria-live="polite">
              {state === "loading" && "Loading motion version"}
              {state === "playing" && "Playing"}
              {state === "paused" && "Paused"}
              {state === "ended" && "Replay available"}
              {state === "error" && "Motion version unavailable. The static trace above is complete."}
            </span>
          </div>
        </>
      )}

      <p id="grove-film-summary" className="grove-decision-film__summary">
        {SUMMARY}
      </p>
      <p className="grove-decision-film__provenance">
        Composed from real Emergent prototype screens and Grove survey findings. No finished redesign
        screen is shown.
      </p>
    </section>
  );
}
