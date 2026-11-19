import React from "react";
import "../../styles/result-line.css";

type ResultLineProps = {
  /** Small label above the sentence. */
  eyebrow: string;
  /** The result sentence. Pass it here or as the only child (a plain string). */
  text?: string;
  children?: string;
  /** Optional small attribution line under the sentence. */
  source?: string;
};

/**
 * @status: stable
 * @purpose: One large result sentence under a case-study hero, with a small eyebrow above and an optional source line under it. Each word darkens from the quiet ink to full ink as the sentence scrolls into view, using CSS scroll-driven animation only (no JavaScript); without support, with reduced motion, in print or in forced colors every word is full ink from the start. The sentence is real text in one paragraph, words in plain spans, read normally by screen readers. Pick this for the one sentence a case study is about; for a first-person line inside the hero use the rp-humanLine style, for numbers use EvidenceField, and for a step-by-step narrative use DecisionStory.
 */
export default function ResultLine({ eyebrow, text, children, source }: ResultLineProps) {
  const sentence = (text ?? children ?? "").trim();
  // Split on ordinary spaces only, so existing no-break spaces and word joiners
  // (e.g. "1–⁠2 weeks") keep their pieces inside one span.
  const words = sentence.split(/ +/).filter(Boolean);
  const last = words.length - 1;

  return (
    <section className="rp-section rp-resultLine">
      <div className="rp-wrap">
        <p className="rp-kicker rp-resultLine__eyebrow">{eyebrow}</p>
        <p className="rp-resultLine__text" style={{ "--n": words.length } as React.CSSProperties}>
          {words.map((word, i) => (
            <React.Fragment key={i}>
              {/* A no-break space joins the last two words, so the last line is never one stranded word. */}
              {i === 0 ? null : i === last ? " " : " "}
              <span className="rp-resultLine__word" style={{ "--i": i } as React.CSSProperties}>{word}</span>
            </React.Fragment>
          ))}
        </p>
        {source ? <p className="rp-resultLine__source">{source}</p> : null}
      </div>
    </section>
  );
}
