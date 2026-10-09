import React, { useState } from "react";

// Share, then confirm only what actually happened — shared, copied, or a way to
// recover. Cancelling the share sheet says nothing celebratory.
type ShareOutcome = "shared" | "copied" | "error" | null;
// Icon and text are separate so the emoji can be hidden from screen readers —
// this string is announced through an aria-live region.
const SHARE_MESSAGE: Record<Exclude<ShareOutcome, null>, string> = {
  shared: "thanks for sharing.",
  copied: "link copied.",
  error: "Couldn’t copy the link — you can copy it from the address bar.",
};

/**
 * @status: stable
 * @purpose: "Share this case study →" control in the closing contact section of all four case studies (RisoGrove, FlagshipMSK, FlagshipLogistics, FlagshipMobbin). Opens the native share sheet when the browser has one and falls back to copying the current URL, then confirms the real outcome in a polite live region. Styled as the site's ghost CTA (rp-cta rp-cta--ghost) so it is not a third button style. Pick this for sharing the page itself; the hero/closing mailto action stays a plain .rp-cta anchor, and in-page section links stay native anchors.
 */
export default function ShareCaseStudy({ title, icon }: {
  /** Title passed to the native share sheet. */
  title: string;
  /** Optional decorative mark shown beside the confirmation (Grove uses its sprout). */
  icon?: string;
}) {
  const [outcome, setOutcome] = useState<ShareOutcome>(null);
  const share = async () => {
    const url = window.location.href;
    const copyLink = async () => {
      if (!navigator.clipboard?.writeText) return false;
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch {
        return false;
      }
    };

    let next: ShareOutcome;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        next = "shared";
      } else {
        next = (await copyLink()) ? "copied" : "error";
      }
    } catch (err) {
      // Dismissing the share sheet is not a failure — say nothing at all.
      if ((err as Error)?.name === "AbortError") { setOutcome(null); return; }
      // The sheet exists but refused to open, which is the common desktop case.
      // Fall back to the clipboard rather than telling the reader to do it by hand.
      next = (await copyLink()) ? "copied" : "error";
    }
    setOutcome(next);
    window.setTimeout(() => setOutcome(null), 3200);
  };
  return (
    <div className="rp-shareRow">
      <button type="button" className="rp-cta rp-cta--ghost rp-share" onClick={share}>Share this case study →</button>
      <span className={`rp-woohoo${outcome ? " show" : ""}`} aria-live="polite">
        {outcome && outcome !== "error" && icon && (
          <span aria-hidden="true">{icon}</span>
        )}
        {outcome ? SHARE_MESSAGE[outcome] : ""}
      </span>
    </div>
  );
}
