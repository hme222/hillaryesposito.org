import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useT } from "../../app/LanguageContext";

const REVEAL_AT_SECONDS = 3.45;

type NetworkNavigator = Navigator & {
  connection?: { saveData?: boolean };
};

function prefersStaticMedia() {
  if (typeof window === "undefined") return true;
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const saveData = (navigator as NetworkNavigator).connection?.saveData ?? false;
  return reduceMotion || saveData;
}

export default function GroveLayerTeaser() {
  const t = useT();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAutoplayedRef = useRef(false);
  const [staticMode, setStaticMode] = useState(prefersStaticMedia);
  const [artifactVisible, setArtifactVisible] = useState(prefersStaticMedia);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  const play = useCallback(async (restart = false) => {
    const video = videoRef.current;
    if (!video || staticMode) return;
    if (restart) {
      video.currentTime = 0;
      setArtifactVisible(false);
      setEnded(false);
    }
    try {
      await video.play();
      setPlaying(true);
    } catch {
      setStaticMode(true);
      setArtifactVisible(true);
      setPlaying(false);
    }
  }, [staticMode]);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      const nextStatic = prefersStaticMedia();
      setStaticMode(nextStatic);
      if (nextStatic) {
        videoRef.current?.pause();
        setPlaying(false);
        setArtifactVisible(true);
      }
    };
    reduceMotion?.addEventListener?.("change", updatePreference);
    return () => reduceMotion?.removeEventListener?.("change", updatePreference);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || staticMode || typeof IntersectionObserver === "undefined") return;

    const startOnce = () => {
      if (hasAutoplayedRef.current) return;
      hasAutoplayedRef.current = true;
      void play();
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
    };
    const checkPosition = () => {
      const rect = frame.getBoundingClientRect();
      const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      if (visible / rect.height >= 0.35) startOnce();
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && entries[0].intersectionRatio >= 0.35) startOnce();
    }, { threshold: [0.35] });

    observer.observe(frame);
    window.addEventListener("scroll", checkPosition, { passive: true });
    const frameRequest = window.requestAnimationFrame(checkPosition);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.cancelAnimationFrame(frameRequest);
    };
  }, [play, staticMode]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      return;
    }
    void play(ended);
  };

  return (
    <section className="rp-section rp-layerTeaser" id="grove-layer-teaser" aria-labelledby="grove-layer-title">
      <div className="rp-wrap rp-layerTeaser__layout">
        <div className="rp-layerTeaser__intro">
          <p className="rp-kicker">{t("home.layerTeaser.kicker")}</p>
          <h2 className="rp-title" id="grove-layer-title">{t("home.layerTeaser.title")}</h2>
          <p className="rp-layerTeaser__body">{t("home.layerTeaser.body")}</p>
          <Link className="rp-layerTeaser__link" to="/case-study/grove">
            {t("home.layerTeaser.link")} <span aria-hidden="true">→</span>
          </Link>
        </div>

        <figure className={`rp-layerTeaser__figure${staticMode ? " is-static" : ""}`}>
          <div className="rp-layerTeaser__frame" ref={frameRef}>
            <img
              className="rp-layerTeaser__poster"
              src="/assets/video/grove-layer-assembly-poster.jpg"
              alt=""
              aria-hidden="true"
            />
            <video
              ref={videoRef}
              className="rp-layerTeaser__video"
              src="/assets/video/grove-layer-assembly-seedance25.mp4"
              poster="/assets/video/grove-layer-assembly-poster.jpg"
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
              onTimeUpdate={(event) => {
                if (event.currentTarget.currentTime >= REVEAL_AT_SECONDS) setArtifactVisible(true);
              }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false);
                setEnded(true);
                setArtifactVisible(true);
              }}
              onError={() => {
                setStaticMode(true);
                setArtifactVisible(true);
                setPlaying(false);
              }}
            />

            <div className={`rp-layerTeaser__evidence${artifactVisible ? " is-visible" : ""}`}>
              <span className="rp-layerTeaser__shadow" aria-hidden="true" />
              <img src="/assets/grove/grove1.png" alt={t("home.riso.groveAlt")} />
            </div>

            {!staticMode && (
              <button
                className="rp-layerTeaser__control"
                type="button"
                onClick={togglePlayback}
                aria-label={playing
                  ? t("home.layerTeaser.pause")
                  : ended
                    ? t("home.layerTeaser.replay")
                    : t("home.layerTeaser.play")}
              >
                <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
                {playing
                  ? t("home.layerTeaser.pause")
                  : ended
                    ? t("home.layerTeaser.replay")
                    : t("home.layerTeaser.play")}
              </button>
            )}
          </div>
          <figcaption>{t("home.layerTeaser.caption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
