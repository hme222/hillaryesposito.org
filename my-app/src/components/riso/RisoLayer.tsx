import React from "react";

export type RisoEdition = "pine" | "eucalyptus" | "struct" | "olive" | "meta" | "mdv";

/**
 * Decorative riso map/collage layer. Sits BEHIND content (aria-hidden), inks a
 * neutral asset via a duotone filter, blends multiply onto the bone paper, and
 * carries the grain. Never put readable text directly on this — use <Clearing>.
 */
export default function RisoLayer({
  src,
  edition = "pine",
  opacity = 1,
  position = "center",
  grain = true,
  className = "",
}: {
  src: string;
  edition?: RisoEdition;
  opacity?: number;
  position?: string;
  grain?: boolean;
  className?: string;
}) {
  return (
    <div className={`riso-layer ${className}`} aria-hidden="true" role="presentation">
      <img
        className="riso-layer__img"
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ filter: `url(#riso-${edition})`, opacity, objectPosition: position }}
      />
      {grain && <span className="riso-grain" />}
    </div>
  );
}
