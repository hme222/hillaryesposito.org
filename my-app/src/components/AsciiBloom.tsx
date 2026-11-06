import React, { useCallback, useEffect, useRef } from "react";

const RAMP = " .:-=+*oO#@";
const CELL_W = 7;
const CELL_H = 12;
const ROWS = 30;
const GROW_MS = 3600;

type Bloom = { x: number; h: number; lean: number; r: number; start: number };

// Three stems of different height; positions are fractions of the width.
const BLOOMS: Bloom[] = [
  { x: 0.5, h: 0.8, lean: 0.02, r: 0.13, start: 0.5 },
  { x: 0.3, h: 0.58, lean: -0.1, r: 0.1, start: 0.62 },
  { x: 0.7, h: 0.5, lean: 0.12, r: 0.095, start: 0.72 },
];

const ease = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - c, 3);
};

function cssColor(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Paints the flowers as ordinary shapes into g, in real pixels (w by h), at growth progress p from 0 to 1. */
function paint(g: CanvasRenderingContext2D, w: number, h: number, p: number, stem: string, petal: string) {
  const baseY = h * 0.98;
  g.lineCap = "round";
  BLOOMS.forEach((b) => {
    const topX = w * (b.x + b.lean);
    const topY = baseY - h * b.h;
    const s = ease(p / 0.55);
    const pointAt = (u: number): [number, number] => {
      const bend = Math.sin(u * Math.PI) * w * b.lean * -0.8;
      return [w * b.x + (topX - w * b.x) * u + bend, baseY - (baseY - topY) * u];
    };
    g.strokeStyle = stem;
    g.lineWidth = Math.max(3, w * 0.012);
    g.beginPath();
    for (let i = 0; i <= 24; i++) {
      const [x, y] = pointAt((i / 24) * s);
      if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
    }
    g.stroke();
    // Two leaves per stem, unfurling as the stem passes them.
    [0.3, 0.5].forEach((at, k) => {
      const le = ease((s - at) / 0.3);
      if (le <= 0) return;
      const [x, y] = pointAt(at);
      const dir = k % 2 === 0 ? -1 : 1;
      g.save();
      g.translate(x, y);
      g.rotate(dir * 0.9);
      g.fillStyle = stem;
      g.beginPath();
      g.ellipse(dir * w * 0.05 * le, 0, w * 0.06 * le, w * 0.017 * le + 0.01, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    });
    // Head: six petals open from a closed bud.
    const o = ease((p - b.start) / 0.35);
    const rad = w * b.r * (0.25 + 0.75 * o);
    g.save();
    g.translate(topX, topY);
    for (let i = 0; i < 6; i++) {
      g.save();
      g.rotate((i / 6) * Math.PI * 2 + 0.3);
      // Outer half-transparent petal, solid core: gives the glyph ramp a falloff.
      g.fillStyle = petal;
      g.globalAlpha = 0.5;
      g.beginPath();
      g.ellipse(rad * 0.5, 0, rad * 0.5, rad * (0.07 + 0.1 * o), 0, 0, Math.PI * 2);
      g.fill();
      g.globalAlpha = 1;
      g.beginPath();
      g.ellipse(rad * 0.4, 0, rad * 0.32, rad * (0.04 + 0.06 * o), 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
    g.fillStyle = stem;
    g.beginPath();
    g.arc(0, 0, Math.max(2, rad * 0.1), 0, Math.PI * 2);
    g.fill();
    g.restore();
  });
}

/**
 * @status: stable
 * @purpose: A small flower drawn in text characters that grows once when scrolled into view and replays on a button press. Pick this for one decorative moment where a plant is the subject (Grove); it draws a single finished frame when the visitor prefers reduced motion. For a photo use a figure with a credit, and for evidence use EvidenceField.
 */
export default function AsciiBloom({ label, replayLabel, caption }: {
  /** Describes the picture for screen readers. */
  label: string;
  /** Text of the replay button. */
  replayLabel: string;
  caption?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const startedRef = useRef(false);

  const draw = useCallback((p: number) => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const cols = Math.max(24, Math.floor(wrap.clientWidth / CELL_W));
    const W = cols * CELL_W;
    const H = ROWS * CELL_H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    }
    const stem = cssColor("--green", "green");
    const petal = cssColor("--coral", "red");
    // One pixel per character cell: the shapes are painted at cell scale, then read back as glyphs.
    const off = document.createElement("canvas");
    off.width = cols;
    off.height = ROWS;
    const og = off.getContext("2d", { willReadFrequently: true });
    const ctx = canvas.getContext("2d");
    if (!og || !ctx) return;
    og.scale(1 / CELL_W, 1 / CELL_H);
    paint(og, W, H, p, stem, petal);
    const data = og.getImageData(0, 0, cols, ROWS).data;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.font = `700 ${CELL_H - 1}px ui-monospace, Menlo, Consolas, monospace`;
    ctx.textBaseline = "top";
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const a = data[i + 3] / 255;
        if (a < 0.12) continue;
        ctx.fillStyle = `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`;
        ctx.fillText(RAMP[Math.min(RAMP.length - 1, Math.floor(a * (RAMP.length - 1) + 0.5))], x * CELL_W, y * CELL_H);
      }
    }
  }, []);

  const play = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      draw(1);
      return;
    }
    const t0 = performance.now();
    let last = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / GROW_MS);
      if (now - last > 33 || p === 1) {
        draw(p);
        last = now;
      }
      if (p < 1) frameRef.current = requestAnimationFrame(step);
    };
    frameRef.current = requestAnimationFrame(step);
  }, [draw]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      play();
    };
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && run(), { threshold: 0.4 });
      io.observe(wrap);
    } else {
      run();
    }
    const onResize = () => startedRef.current && draw(1);
    window.addEventListener("resize", onResize);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [play, draw]);

  return (
    <figure className="rp-bloom rp-reveal" data-evidence="true">
      <div className="rp-bloom__stage" ref={wrapRef}>
        <canvas ref={canvasRef} role="img" aria-label={label} />
      </div>
      <figcaption>
        {caption ? <span>{caption} </span> : null}
        <button type="button" className="rp-bloom__replay" onClick={play}>{replayLabel}</button>
      </figcaption>
    </figure>
  );
}
