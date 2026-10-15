import React from "react";

export type CaseStudyCredentialData = {
  src: string;
  /** Intrinsic pixel size of the asset, so the frame reserves its space. */
  width: number;
  height: number;
  /** Reads the badge's visible text; the skill tags are left out. */
  alt: string;
  /** One line naming the badge, the program, and the date. */
  caption: string;
  /** Visible link text, e.g. "Verify on LinkedIn". */
  linkLabel: string;
  href: string;
  /** Screen-reader suffix for the new-tab link, e.g. " (opens in new tab)". */
  newTabLabel: string;
};

/**
 * A small framed credential image with a caption and one external
 * verification link. Kept thumbnail-sized on purpose: it backs a claim in the
 * copy beside it and should not out-weigh the outcome numbers.
 *
 * @status: stable
 * @purpose: Thumbnail-sized credential badge (lazy-loaded image in a thin plate, a one-line caption, and a "Verify on LinkedIn"-style external proof link) that backs an outcome claim; sits beside EvidenceField's tiles via its `aside` slot on the Knowunity case study, and inside the Spanish outcomes section. For a full-width linked press piece use the MSK page's fp-proofLink card instead; for a video use CaseStudyReel.
 */
export default function CaseStudyCredential({ credential }: { credential: CaseStudyCredentialData }) {
  return (
    <figure className="rp-credential">
      <div className="rp-credential__plate">
        <img
          className="rp-credential__img"
          src={credential.src}
          width={credential.width}
          height={credential.height}
          alt={credential.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="rp-credential__caption">{credential.caption}</figcaption>
      <a className="rp-credential__link" href={credential.href} target="_blank" rel="noopener noreferrer">
        <span className="rp-ext">{credential.linkLabel}</span>
        <span className="sr-only">{credential.newTabLabel}</span>
      </a>
    </figure>
  );
}
