import React from "react";

/**
 * Risograph duotone filters. Each edition maps image luminance to two inks
 * (shadow → highlight). Assets stay neutral/grayscale; these ink them, so a
 * company "edition" is a one-word swap — this is the brand-mirror mechanism.
 *
 * Mount <RisoDefs /> ONCE near the app root so every page can reference the
 * filters via `filter: url(#riso-<edition>)`.
 */

type RGB = [number, number, number];
// shadow → (optional mid) → highlight. A `mid` makes it a TRITONE so the ink
// colour actually lives in the midtones (green reads) instead of only faintly
// tinting the paper. `highlight` keeps a slight tint = the "paper feel".
// `table` overrides with explicit R/G/B ramps for full control (e.g. the 4-stop
// struct ramp that holds bold lines black and only sends fine lines to green).
type Edition = { shadow: RGB; mid?: RGB; highlight: RGB; table?: { r: string; g: string; b: string } };

export const RISO_EDITIONS: Record<string, Edition> = {
  // LOCKED base — pine tritone: dark ink lines, real green midtones, bone paper
  // with a slight green tint. Reads green + keeps the paper feel.
  pine: { shadow: [28, 36, 26], mid: [61, 107, 63], highlight: [238, 240, 228] },
  eucalyptus: { shadow: [47, 79, 69], highlight: [240, 243, 241] }, // muted grey-green (reads flat)
  // struct — for architectural/elevation assets that mix structure + botanical:
  // dark half → black, upper-mid (fine growth) → green, top → eucalyptus paper.
  // Black structure, green growth, from one asset. No overlay.
  struct: {
    shadow: [0, 0, 0],
    highlight: [0, 0, 0],
    table: { r: "0.055 0.075 0.275 0.910", g: "0.063 0.086 0.545 0.925", b: "0.043 0.055 0.243 0.890" },
  },
  olive: { shadow: [38, 48, 26], highlight: [247, 245, 240] }, // original warm olive (too yellow)
  meta: { shadow: [10, 22, 62], mid: [0, 100, 224], highlight: [238, 242, 251] }, // Meta · Instagram
  mdv: { shadow: [20, 16, 15], mid: [138, 31, 61], highlight: [239, 231, 221] }, // Manière De Voir
};

const n = (v: number) => (v / 255).toFixed(3);
const ramp = (a: number, b?: number, c?: number) =>
  c !== undefined && b !== undefined ? `${n(a)} ${n(b)} ${n(c)}` : `${n(a)} ${n(b ?? a)}`;

function Duotone({ id, shadow, mid, highlight, table }: { id: string } & Edition) {
  return (
    <filter id={id} colorInterpolationFilters="sRGB">
      {/* desaturate first so colored source (e.g. green linework) inks consistently */}
      <feColorMatrix
        type="matrix"
        values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
      />
      <feComponentTransfer>
        <feFuncR type="table" tableValues={table ? table.r : ramp(shadow[0], mid?.[0] ?? highlight[0], mid ? highlight[0] : undefined)} />
        <feFuncG type="table" tableValues={table ? table.g : ramp(shadow[1], mid?.[1] ?? highlight[1], mid ? highlight[1] : undefined)} />
        <feFuncB type="table" tableValues={table ? table.b : ramp(shadow[2], mid?.[2] ?? highlight[2], mid ? highlight[2] : undefined)} />
      </feComponentTransfer>
    </filter>
  );
}

export default function RisoDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {Object.entries(RISO_EDITIONS).map(([key, ed]) => (
          <Duotone key={key} id={`riso-${key}`} shadow={ed.shadow} mid={ed.mid} highlight={ed.highlight} table={ed.table} />
        ))}
      </defs>
    </svg>
  );
}
