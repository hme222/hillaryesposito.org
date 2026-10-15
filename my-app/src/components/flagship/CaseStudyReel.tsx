import React, { useId } from "react";

export type CaseStudyReelData = {
  src: string;
  poster: string;
  /** Short visible label above the frame. */
  kicker: string;
  /** Accessible name for the video. */
  label: string;
  /** Visible caption under the frame — say what is mocked here. */
  caption: string;
  /** Summary line of the text-alternative disclosure. */
  transcriptSummary: string;
  /** The reel's on-screen lines, in order. */
  transcript: string[];
  /** Closing note under the lines, e.g. "Music only; no narration." */
  transcriptNote: string;
};

/**
 * Plays only when the visitor presses play: no autoplay, no loop, nothing
 * fetched until then (preload="none"), so reduced-motion preferences are
 * respected by default. The reel has a music bed and no speech, so the
 * on-screen lines in the disclosure are its text alternative and no
 * captions track is needed.
 *
 * @status: stable
 * @purpose: User-started case-study video (native controls, poster, never autoplays) in a 16:9 plate with a visible caption and a details disclosure listing the reel's on-screen lines; used on the Knowunity case study, English and Spanish. The Home dispatch train and HomepageOpeningFilm are decorative/scripted videos, not this.
 */
export default function CaseStudyReel({ reel }: { reel: CaseStudyReelData }) {
  const captionId = useId();
  return (
    <figure className="rp-reel">
      <p className="rp-reel__kicker">{reel.kicker}</p>
      <div className="rp-reel__plate">
        <video
          className="rp-reel__video"
          controls
          preload="none"
          playsInline
          poster={reel.poster}
          width={1280}
          height={720}
          aria-label={reel.label}
          aria-describedby={captionId}
        >
          <source src={reel.src} type="video/mp4" />
        </video>
      </div>
      <figcaption className="rp-reel__caption" id={captionId}>{reel.caption}</figcaption>
      <details className="rp-acc rp-reel__transcript">
        <summary>{reel.transcriptSummary}</summary>
        <div className="rp-acc__body">
          <ol className="rp-reel__lines">
            {reel.transcript.map((line) => <li key={line}>{line}</li>)}
          </ol>
          <p className="rp-reel__note">{reel.transcriptNote}</p>
        </div>
      </details>
    </figure>
  );
}
