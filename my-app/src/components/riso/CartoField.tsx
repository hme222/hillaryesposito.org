import React, { useEffect, useRef } from "react";

/**
 * CartoField — painted cartographic collage.
 *
 * Real map/elevation assets remain the source material, but they are treated
 * like print fragments rather than a navigation interface: cropped plates,
 * offset inks, photographic memory, washes, and hand-drawn marks. The older
 * instrument language (graticules, compass, scale, coordinates and route pins)
 * is intentionally absent from the painted variant.
 *
 * Purely decorative → aria-hidden.
 */

export type CartoFieldProps = {
  /** A REAL map/elevation asset to ink as the canvas. This is the whole point. */
  mapSrc: string;
  /** Riso edition (duotone filter id suffix) applied to `mapSrc`. */
  edition?: "pine" | "struct" | "meta" | "mdv" | "olive" | "eucalyptus" | "paint";
  /** How much of the frame the map fills — "cover" (bleed) or "contain". */
  mapFit?: "cover" | "contain";
  /** CSS background-position for the map, e.g. "42% 58%" to center a locale. */
  mapPosition?: string;
  /** Zoom multiplier (>1 crops in). Overrides `mapFit` sizing when set. */
  mapZoom?: number;
  /** Map layer opacity (0–1). Lower it to let type/route lead → editorial. */
  mapOpacity?: number;
  /** Optional second plate used as a contrasting collage fragment. */
  secondaryMapSrc?: string;
  /** Optional photographic memory layer. */
  photoSrc?: string;
};

export default function CartoField({
  mapSrc,
  edition = "pine",
  mapFit = "cover",
  mapPosition = "center",
  mapZoom,
  mapOpacity,
  secondaryMapSrc,
  photoSrc,
}: CartoFieldProps) {
  const secondPlate = secondaryMapSrc ?? mapSrc;
  const fieldRef = useRef<HTMLDivElement | null>(null);

  // Subtle cursor reaction: a soft light bloom tracks the pointer over the
  // painted collage (a non-text visual area), like light moving over paper.
  // Disabled for touch and reduced-motion users. Pure CSS-var updates, no
  // re-renders; the bloom itself fades in only on hover (see .carto__cursorGlow).
  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Track at the document level: the field is a background layer sitting behind
    // the hero content, so listening on the field itself would rarely fire. We
    // light the bloom whenever the pointer is anywhere over the field's box.
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = field.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom;
        field.classList.toggle("is-cursor", inside);
        if (!inside) return;
        field.style.setProperty("--carto-mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        field.style.setProperty("--carto-my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
      field.classList.remove("is-cursor");
    };
  }, []);

  return (
    <div ref={fieldRef} className={`carto carto--painted carto--${edition}`} aria-hidden="true">
      <div className="carto__paperWash" />
      {edition !== "paint" && (
        <div
          className="carto__paintPlate"
          style={{ backgroundImage: "url(/riso/painted-cartography-01.jpg)" }}
        />
      )}
      <div
        className={`carto__map carto__map--base carto__map--${mapFit} carto__map--${edition}`}
        style={{
          backgroundImage: `url(${mapSrc})`,
          backgroundPosition: mapPosition,
          ...(mapZoom ? { backgroundSize: `${mapZoom * 100}%` } : null),
          ...(mapOpacity != null ? { opacity: mapOpacity } : null),
        }}
      />

      {edition !== "paint" && (
        <>
          <div
            className="carto__fragment carto__fragment--vertical"
            style={{ backgroundImage: `url(${secondPlate})` }}
          />
          <div
            className="carto__fragment carto__fragment--window"
            style={{ backgroundImage: `url(${mapSrc})` }}
          />
        </>
      )}
      {photoSrc && (
        <div
          className="carto__fragment carto__fragment--photo"
          style={{ backgroundImage: `url(${photoSrc})` }}
        />
      )}

      {edition !== "paint" && <div className="carto__ink carto__ink--pine" />}
      {edition !== "paint" && <div className="carto__ink carto__ink--coral" />}
      <div className="carto__halftone" />
      <div className="carto__grain" />
      <div className="carto__cursorGlow" />

    </div>
  );
}
