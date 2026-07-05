import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type KnotNavItem = {
  label: string;
  nodeIndex: number;
  href?: string;
  onActivate?: () => void;
  accent?: boolean;
  noDot?: boolean;
  /** Accessible name override — e.g. to announce a PDF / new-tab destination. */
  ariaLabel?: string;
};

/**
 * The Home hero's "complexity → clarity" visual, doubling as navigation.
 *
 * A tangled graph resolves into an ordered grid once on mount, then rests. Nav
 * labels (passed via `navItems`) are pinned to specific nodes by PROJECTING the
 * node's live 3D world position to 2D screen space every frame — so a label
 * sits exactly on its node and tracks it through the resolve, the cursor
 * parallax, and the focus rotation. Hovering a label rotates the knot toward
 * its node and grows it.
 *
 * Guards: skipped without WebGL; prefers-reduced-motion renders the resolved
 * state statically; the loop pauses offscreen / tab-hidden and stops when idle;
 * everything disposed on unmount.
 */
const NAV = 4; // persistent nav dots (Projects · About · Contact · Resume)
const EXTRA = 26; // disposable tangle that funnels into the nav dots
const N = NAV + EXTRA;
const smoothstep = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

const DELAY = 0.4;
const DURATION = 3.8; // deliberate morph — slow enough to watch the globs travel and merge
const TAIL = 0.5; // gentle settle rather than an abrupt stop

export default function WorkflowKnot({ navItems = [] }: { navItems?: KnotNavItem[] }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  // WebGL unavailable → the labels can't be pinned to projected node positions;
  // CSS (`--static`) lays them out as a plain centered row instead.
  const [glFailed, setGlFailed] = useState(false);
  const labelRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const navRef = useRef<KnotNavItem[]>(navItems);
  navRef.current = navItems;
  const focusRef = useRef<(i: number) => void>(() => {});
  const unfocusRef = useRef<() => void>(() => {});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      setGlFailed(true); // degrade: labels become a static centered row, nav stays usable
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = mount.clientWidth || 720;
    let h = mount.clientHeight || 460;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    const group = new THREE.Group();
    group.rotation.x = -0.06;
    scene.add(group);

    // Resolved targets: the 4 nav dots sit in a row; every extra node funnels
    // into one of them (then fades), so a dense tangle collapses to 4 dots.
    const navXs = [-5.8, -1.95, 1.95, 5.8];
    const order: THREE.Vector3[] = [];
    const chaos: THREE.Vector3[] = [];
    for (let i = 0; i < NAV; i++) order.push(new THREE.Vector3(navXs[i], 0, 0));
    for (let i = 0; i < EXTRA; i++) {
      // converge to the EXACT nav dot so they visibly pile in and merge
      order.push(new THREE.Vector3(navXs[i % NAV], 0, 0));
    }
    for (let i = 0; i < N; i++) {
      chaos.push(
        new THREE.Vector3(
          // Wider + taller starting scatter so the opening tangle reaches across
          // the whole hero (the balls and the resolved row are unchanged — this
          // only sets how expansively the nodes are strewn before they converge).
          (Math.random() * 2 - 1) * 9.3,
          (Math.random() * 2 - 1) * 5.3,
          (Math.random() * 2 - 1) * 3.0
        )
      );
    }
    // Per-glob phase → staggered absorption + size variation (organic merge).
    const phase = Array.from({ length: N }, () => Math.random());

    const CHAOS_HW = 6.4; // wider so the roomier nav row still fits with edge margin
    const CHAOS_HH = 2.7;
    const fitToPanel = () => {
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      // Fit to WIDTH so the 4-dot row stays full-width even when the panel
      // collapses to a thin strip after the animation finishes.
      const scale = Math.max(0.4, Math.min(1.6, (halfW * 0.82) / CHAOS_HW));
      group.scale.setScalar(scale);
      group.position.x = halfW * 0.03; // nudge right so "Projects" isn't hard against the edge
      // Backdrop mode: the canvas fills the whole hero and the resolved row rests
      // in the centred .hero-knot-band (kept text-free between the lede and the
      // copy), so the row sits at the vertical centre.
      group.position.y = 0;
    };
    fitToPanel();

    // Each extra is tethered to its nav dot, with a few cross-links for density.
    const edges: [number, number][] = [];
    for (let i = 0; i < EXTRA; i++) {
      edges.push([NAV + i, i % NAV]);
      if (i % 2 === 0) edges.push([NAV + i, NAV + ((i + 3) % EXTRA)]);
    }

    const nodeGeo = new THREE.SphereGeometry(0.22, 20, 20);
    const oliveMat = new THREE.MeshStandardMaterial({
      color: 0x5a7a2e, metalness: 0.2, roughness: 0.5, emissive: 0x2c3414, emissiveIntensity: 0.35,
    });
    const amberMat = new THREE.MeshStandardMaterial({
      color: 0xb87d35, metalness: 0.25, roughness: 0.45, emissive: 0x5a3a12, emissiveIntensity: 0.4,
    });
    // Shared, fading material for the disposable tangle nodes.
    const extraMat = new THREE.MeshStandardMaterial({
      color: 0x5a7a2e, metalness: 0.2, roughness: 0.55, emissive: 0x2c3414,
      emissiveIntensity: 0.3, transparent: true, opacity: 0.85,
    });
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < N; i++) {
      const mat = i < NAV ? (i === NAV - 1 ? amberMat : oliveMat) : extraMat;
      const m = new THREE.Mesh(nodeGeo, mat);
      group.add(m);
      nodes.push(m);
    }
    const baseMats = nodes.map((n) => n.material as THREE.Material);

    const edgePositions = new Float32Array(edges.length * 2 * 3);
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x4f6b27, transparent: true, opacity: 0.45 });
    const lines = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(lines);

    // Persistent connector through the 4 nav dots — stays after the tangle fades.
    const navEdges: [number, number][] = [[0, 1], [1, 2], [2, 3]];
    const navEdgePositions = new Float32Array(navEdges.length * 2 * 3);
    const navEdgeGeo = new THREE.BufferGeometry();
    navEdgeGeo.setAttribute("position", new THREE.BufferAttribute(navEdgePositions, 3));
    const navEdgeMat = new THREE.LineBasicMaterial({ color: 0x4f6b27, transparent: true, opacity: 0 });
    const navLines = new THREE.LineSegments(navEdgeGeo, navEdgeMat);
    group.add(navLines);

    scene.add(new THREE.AmbientLight(0x8a7e66, 0.85));
    const key = new THREE.DirectionalLight(0xfff0d8, 1.4);
    key.position.set(-2, 3, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc7d49a, 0.5);
    fill.position.set(3, -2, 2);
    scene.add(fill);

    const tmp = new THREE.Vector3();
    const proj = new THREE.Vector3();
    const projTop = new THREE.Vector3();
    let curPe = 0; // latest resolve progress, read by positionLabels
    const layout = (pe: number) => {
      for (let i = 0; i < N; i++) {
        tmp.copy(chaos[i]).lerp(order[i], pe);
        nodes[i].position.copy(tmp);
      }
      // Fade the disposable tangle (extra nodes + all edges) out across the back
      // half, leaving only the four nav dots.
      extraMat.opacity = 0.9; // stays opaque — it shrinks into the dot, not fades
      edgeMat.opacity = 0.45 * (1 - smoothstep(clamp01((pe - 0.3) / 0.6)));
      const pos = edgeGeo.attributes.position as THREE.BufferAttribute;
      for (let e = 0; e < edges.length; e++) {
        const a = nodes[edges[e][0]].position;
        const b = nodes[edges[e][1]].position;
        pos.setXYZ(e * 2, a.x, a.y, a.z);
        pos.setXYZ(e * 2 + 1, b.x, b.y, b.z);
      }
      pos.needsUpdate = true;

      // Nav connector fades IN as the row forms, and stays.
      navEdgeMat.opacity = 0.5 * smoothstep(clamp01((pe - 0.55) / 0.45));
      const npos = navEdgeGeo.attributes.position as THREE.BufferAttribute;
      for (let e = 0; e < navEdges.length; e++) {
        const a = nodes[navEdges[e][0]].position;
        const b = nodes[navEdges[e][1]].position;
        npos.setXYZ(e * 2, a.x, a.y, a.z);
        npos.setXYZ(e * 2 + 1, b.x, b.y, b.z);
      }
      npos.needsUpdate = true;
    };

    // Pin each label just above its node. We measure the nodule's ON-SCREEN
    // radius (project centre + a point one world-radius above it) so the label
    // always clears the top edge no matter how large the resolved ball grows —
    // no more text colliding into an oversized nodule. Labels also reveal
    // sequentially (rise + fade, left-to-right) as their dot settles, so the
    // row reads as a deliberately composed menu rather than four loose balls.
    const positionLabels = () => {
      const items = navRef.current;
      // Tight seat: the word rests ~10px above its sphere so word + ball read
      // as ONE nav object (not a caption floating over a decoration).
      const gap = Math.max(8, h * 0.011);
      for (let k = 0; k < items.length; k++) {
        const el = labelRefs.current[k];
        if (!el) continue;
        const node = nodes[items[k].nodeIndex];
        node.getWorldPosition(proj);
        projTop.copy(proj);
        projTop.y += 0.22 * node.scale.x * group.scale.y; // top of the ball
        proj.project(camera);
        projTop.project(camera);
        const px = (proj.x * 0.5 + 0.5) * w;
        const pyTop = (-projTop.y * 0.5 + 0.5) * h;
        const reveal = smoothstep(clamp01((curPe - (0.5 + k * 0.08)) / 0.22));
        const py = pyTop - gap + (1 - reveal) * 10;
        el.style.opacity = String(reveal);
        // Keep not-yet-revealed labels out of the tab order (visibility:hidden
        // is unfocusable) so keyboard users never land on an invisible link
        // mid-animation.
        el.style.visibility = reveal > 0.02 ? "visible" : "hidden";
        el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -100%)`;
      }
    };

    const renderOnce = () => {
      renderer.render(scene, camera);
      positionLabels();
    };

    // Materials are created once; re-tint them when the site theme toggles. Dark
    // mode lifts the olive to a "matcha" sage and warms the connector so the
    // spheres read on the warm-black ground instead of muddying into it.
    const applyTheme = () => {
      const dark = document.documentElement.classList.contains("dark-mode");
      if (dark) {
        oliveMat.color.set(0x8fa452); oliveMat.emissive.set(0x4a5a28); oliveMat.emissiveIntensity = 0.45;
        extraMat.color.set(0x8fa452); extraMat.emissive.set(0x4a5a28); extraMat.emissiveIntensity = 0.4;
        amberMat.color.set(0xd99a4e); amberMat.emissive.set(0x6e4a1c); amberMat.emissiveIntensity = 0.45;
        edgeMat.color.set(0x8a7a5e); navEdgeMat.color.set(0x8a7a5e);
      } else {
        // Light mode: carry the dark version's lifted "matcha + honey" character
        // onto the cream ground — a livelier sage and a warmer honey, with a bit
        // more emissive glow than the old flat olive.
        oliveMat.color.set(0x7c9a45); oliveMat.emissive.set(0x3d4e1e); oliveMat.emissiveIntensity = 0.42;
        extraMat.color.set(0x7c9a45); extraMat.emissive.set(0x3d4e1e); extraMat.emissiveIntensity = 0.38;
        amberMat.color.set(0xcf9147); amberMat.emissive.set(0x6e4a1c); amberMat.emissiveIntensity = 0.42;
        edgeMat.color.set(0x6a8a3a); navEdgeMat.color.set(0x6a8a3a);
      }
    };
    applyTheme();
    const themeObserver = new MutationObserver(() => { applyTheme(); renderOnce(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let rafId = 0;
    let running = false;
    let inView = true;
    let tabVisible = !document.hidden;
    const clock = new THREE.Clock();
    let startT = 0;

    let hoverActive = false;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let curTiltX = 0;
    let curTiltY = 0;
    let focusedIndex = -1;
    let resolvedOnce = false; // true after first resolve — freezes tilt/parallax and stops replay-on-scroll
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    focusRef.current = (i: number) => {
      if (reduced) return;
      focusedIndex = i;
      if (tabVisible && inView) start();
    };
    unfocusRef.current = () => {
      focusedIndex = -1;
      if (tabVisible && inView) start();
    };

    const loop = () => {
      const t = clock.getElapsedTime();
      if (!startT) startT = t;
      const e = t - startT;
      const pe = smoothstep(clamp01((e - DELAY) / DURATION));
      curPe = pe;
      layout(pe);

      // Once resolved, the group no longer tilts toward a hovered node — the
      // hovered ball still grows in place (target *= 1.3 below), but the row
      // stays put so nav targets never move out from under the cursor.
      if (focusedIndex >= 0 && !resolvedOnce) {
        targetTiltY = -(order[focusedIndex].x / 5.0) * 0.22;
        targetTiltX = (order[focusedIndex].y / 1.8) * 0.1;
      }
      curTiltX = lerp(curTiltX, targetTiltX, 0.12);
      curTiltY = lerp(curTiltY, targetTiltY, 0.12);
      // Ease the base 3D tilt out to flat as the tangle resolves, so the resting
      // nav row is axis-aligned with equal baselines (stillness = quiet authority).
      group.rotation.x = -0.06 * (1 - pe) + curTiltX;
      group.rotation.y = Math.sin(t * 0.2) * 0.18 * (1 - pe) + curTiltY;

      // The tangle MERGES into the nav dots: extras shrink to nothing as they
      // arrive, and each nav dot grows into a bigger ball (mass of the merge).
      // Globs travel in at varied sizes and are absorbed one-by-one (staggered),
      // each swelling its nav dot — so it reads as blobs eating each other.
      const grow = smoothstep(clamp01((pe - 0.45) / 0.5));
      // A damped mid-swell so each nav dot visibly "gulps" as mass arrives, then
      // settles to an exact final size (bounce returns to 1 at grow 0 and 1).
      const bounce = 1 + 0.12 * Math.sin(grow * Math.PI);
      let maxScaleDelta = 0;
      for (let i = 0; i < N; i++) {
        let target;
        if (i < NAV) {
          // Small resting nodes — the knot is a decorative flourish now (no
          // labels pinned to it), so the settled dots stay subtle.
          target = (1 + 0.3 * grow) * bounce;
        } else {
          const size = 0.8 + phase[i] * 0.7; // varied glob sizes
          const start = 0.42 + phase[i] * 0.42; // staggered absorb time
          const a = smoothstep(clamp01((pe - start) / 0.18)); // wide enough that each absorb reads as a visible merge
          target = size * (1 - a);
        }
        if (i === focusedIndex) target *= 1.3;
        const s = lerp(nodes[i].scale.x, target, 0.2);
        nodes[i].scale.setScalar(s);
        if (Math.abs(s - target) > maxScaleDelta) maxScaleDelta = Math.abs(s - target);
        const wantMat = i === focusedIndex ? amberMat : baseMats[i];
        if (nodes[i].material !== wantMat) nodes[i].material = wantMat;
      }

      renderOnce();
      const resolved = pe >= 1 && e > DELAY + DURATION + TAIL;
      const settled =
        !hoverActive &&
        focusedIndex < 0 &&
        Math.abs(curTiltX) < 0.002 &&
        Math.abs(curTiltY) < 0.002 &&
        maxScaleDelta < 0.01;
      if (resolved && settled) {
        group.rotation.x = 0;
        group.rotation.y = 0;
        curTiltX = 0;
        curTiltY = 0;
        resolvedOnce = true;
        layout(1);
        renderOnce();
        window.dispatchEvent(new CustomEvent("knot:resolved"));
        running = false;
        return;
      }
      rafId = requestAnimationFrame(loop);
    };

    function start() {
      if (running || reduced) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    }
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    if (reduced) {
      curPe = 1; // labels fully revealed for the static (reduced-motion) state
      resolvedOnce = true;
      layout(1);
      for (let i = 0; i < N; i++) nodes[i].scale.setScalar(i < NAV ? 1.3 : 0);
      group.rotation.x = 0;
      group.rotation.y = 0;
      renderOnce();
      window.dispatchEvent(new CustomEvent("knot:resolved"));
    } else {
      layout(0);
      start();
    }

    const io = new IntersectionObserver(
      (entries) => {
        const nowInView = entries[0].isIntersecting;
        // Only re-run the full tangle if it hasn't resolved yet. Once resolved,
        // scrolling back to the hero keeps the settled nav row — no re-scatter
        // across the copy every time (the Replay button is the way to see it again).
        if (nowInView && !inView && !reduced && !resolvedOnce) {
          startT = 0;
          layout(0);
        }
        inView = nowInView;
        if (inView && tabVisible) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(mount);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      if (tabVisible && inView) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onResize = () => {
      w = mount.clientWidth || w;
      h = mount.clientHeight || h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      fitToPanel();
      if (!running) renderOnce();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const onPointerMove = (ev: PointerEvent) => {
      if (reduced || coarse || resolvedOnce) return; // no cursor-parallax once the row has settled
      const rect = mount.getBoundingClientRect();
      const px = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((ev.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltY = px * 0.3;
      targetTiltX = -py * 0.3 * 0.6;
      hoverActive = true;
      if (tabVisible && inView) start();
    };
    const onPointerLeave = () => {
      hoverActive = false;
      if (focusedIndex < 0) {
        targetTiltX = 0;
        targetTiltY = 0;
      }
      if (tabVisible && inView) start();
    };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    const onReplay = () => {
      if (reduced) return;
      window.dispatchEvent(new CustomEvent("knot:active"));
      resolvedOnce = false; // let the tangle play (and parallax return) again
      startT = 0;
      layout(0);
      if (tabVisible && inView) start();
    };
    window.addEventListener("knot:replay", onReplay);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("knot:replay", onReplay);
      nodeGeo.dispose();
      oliveMat.dispose();
      amberMat.dispose();
      extraMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      navEdgeGeo.dispose();
      navEdgeMat.dispose();
      renderer.dispose();
      // Release the WebGL context itself, not just its resources — otherwise
      // repeated Home mounts (Home → case study → Home) accumulate contexts and
      // the browser evicts the oldest once it passes its ~16-context cap.
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`hero-knot-stage${glFailed ? " hero-knot-stage--static" : ""}`}>
      <div ref={mountRef} className="hero-knot" aria-hidden="true" />
      {/* Optional pinned nav labels. Empty today (the knot is decorative and the
          header is the nav), so nothing renders — no empty landmark. Kept so the
          component can still be driven as knot-nav if navItems are passed. */}
      {navItems.length > 0 && (
      <nav className="hero-knot-labels" aria-label="Hero shortcuts">
        {navItems.map((item, k) => {
          const handlers = {
            ref: (el: HTMLAnchorElement | HTMLButtonElement | null) => {
              labelRefs.current[k] = el;
            },
            className: `hero-knot-nav__node${item.accent ? " hero-knot-nav__node--accent" : ""}${item.noDot ? " hero-knot-nav__node--nodot" : ""}`,
            onMouseEnter: () => focusRef.current(item.nodeIndex),
            onFocus: () => focusRef.current(item.nodeIndex),
            onMouseLeave: () => unfocusRef.current(),
            onBlur: () => unfocusRef.current(),
          };
          const inner = (
            <>
              <span className="hero-knot-nav__label">{item.label}</span>
              {!item.noDot && <span className="hero-knot-nav__dot" aria-hidden="true" />}
            </>
          );
          return item.href ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel} {...handlers}>
              {inner}
            </a>
          ) : (
            <button key={item.label} type="button" onClick={item.onActivate} {...handlers}>
              {inner}
            </button>
          );
        })}
      </nav>
      )}
    </div>
  );
}
