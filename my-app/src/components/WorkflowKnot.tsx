import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The Home hero's "complexity → clarity" visual. A tangled graph of nodes +
 * connections plays the resolve once on mount — the knot untangles into an
 * ordered left-to-right blueprint, the final column resolving to amber
 * (complexity → clarity → trust) — then settles and stops. It replays only when
 * the hero is scrolled back into view; intent-driven, never on a timer.
 *
 * Guards: skipped if WebGL is unavailable; prefers-reduced-motion renders the
 * resolved state statically; the loop pauses offscreen / tab-hidden and stops
 * once settled; capped pixel ratio; everything disposed on unmount.
 */
const COLS = 4;
const ROWS = 4;
const N = COLS * ROWS;
const smoothstep = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

const DELAY = 0.6; // held tangled before the resolve begins
const DURATION = 2.8; // resolve
const TAIL = 1.0; // settle before stopping

export default function WorkflowKnot() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = mount.clientWidth || 480;
    let h = mount.clientHeight || 480;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 10.5);

    const group = new THREE.Group();
    group.rotation.x = -0.08;
    scene.add(group);

    // Responsive fit: scale the whole graph to the panel's current aspect so the
    // widest tangled spread always stays in frame — phone, tablet or desktop —
    // and nudge it up to use the space above. Recomputed on every resize.
    const CHAOS_HW = 5.2; // widest tangled extent (x)
    const CHAOS_HH = 3.4; // widest tangled extent (y)
    const fitToPanel = () => {
      const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const halfW = halfH * camera.aspect;
      const margin = 1.01; // another ~2% larger across all views
      const scale = Math.max(
        0.5,
        Math.min(1.05, (halfW * margin) / CHAOS_HW, (halfH * margin) / CHAOS_HH)
      );
      group.scale.setScalar(scale);
      // Nudge up only by a fraction of the leftover vertical room, so a short
      // (mobile) panel doesn't leave a gap below the graph.
      group.position.y = Math.max(0, halfH - CHAOS_HH * scale) * 0.35;
    };
    fitToPanel();

    const xs = [-3.9, -1.3, 1.3, 3.9];
    const ys = [2.4, 0.8, -0.8, -2.4];
    const order: THREE.Vector3[] = [];
    const chaos: THREE.Vector3[] = [];
    const idx = (c: number, r: number) => c * ROWS + r;
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        order.push(new THREE.Vector3(xs[c], ys[r], 0));
        chaos.push(
          new THREE.Vector3(
            (Math.random() * 2 - 1) * 5.2,
            (Math.random() * 2 - 1) * 3.4,
            (Math.random() * 2 - 1) * 3.0
          )
        );
      }
    }

    const edges: [number, number][] = [];
    for (let c = 0; c < COLS - 1; c++) {
      for (let r = 0; r < ROWS; r++) {
        edges.push([idx(c, r), idx(c + 1, r)]);
        if (r < ROWS - 1 && (c + r) % 2 === 0) edges.push([idx(c, r), idx(c + 1, r + 1)]);
        if (r > 0 && (c + r) % 2 === 1) edges.push([idx(c, r), idx(c + 1, r - 1)]);
      }
    }

    const nodeGeo = new THREE.SphereGeometry(0.17, 20, 20);
    const oliveMat = new THREE.MeshStandardMaterial({
      color: 0x6f7c34, metalness: 0.2, roughness: 0.5, emissive: 0x2c3414, emissiveIntensity: 0.35,
    });
    const amberMat = new THREE.MeshStandardMaterial({
      color: 0xb87d35, metalness: 0.25, roughness: 0.45, emissive: 0x5a3a12, emissiveIntensity: 0.4,
    });
    const nodes: THREE.Mesh[] = [];
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const m = new THREE.Mesh(nodeGeo, c === COLS - 1 ? amberMat : oliveMat);
        group.add(m);
        nodes.push(m);
      }
    }

    const edgePositions = new Float32Array(edges.length * 2 * 3);
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x4f6b27, transparent: true, opacity: 0.5 });
    const lines = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(lines);

    scene.add(new THREE.AmbientLight(0x8a7e66, 0.85));
    const key = new THREE.DirectionalLight(0xfff0d8, 1.4);
    key.position.set(-2, 3, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc7d49a, 0.5);
    fill.position.set(3, -2, 2);
    scene.add(fill);

    const tmp = new THREE.Vector3();
    const layout = (pe: number) => {
      for (let i = 0; i < N; i++) {
        tmp.copy(chaos[i]).lerp(order[i], pe);
        nodes[i].position.copy(tmp);
      }
      const pos = edgeGeo.attributes.position as THREE.BufferAttribute;
      for (let e = 0; e < edges.length; e++) {
        const a = nodes[edges[e][0]].position;
        const b = nodes[edges[e][1]].position;
        pos.setXYZ(e * 2, a.x, a.y, a.z);
        pos.setXYZ(e * 2 + 1, b.x, b.y, b.z);
      }
      pos.needsUpdate = true;
    };

    const renderOnce = () => renderer.render(scene, camera);

    let rafId = 0;
    let running = false;
    let inView = true;
    let tabVisible = !document.hidden;
    const clock = new THREE.Clock();
    let startT = 0;

    // Cursor parallax: hovering the knot tilts it gently toward the pointer.
    let hoverActive = false;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let curTiltX = 0;
    let curTiltY = 0;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const loop = () => {
      const t = clock.getElapsedTime();
      if (!startT) startT = t;
      const e = t - startT;
      const pe = smoothstep(clamp01((e - DELAY) / DURATION));
      layout(pe);
      curTiltX = lerp(curTiltX, targetTiltX, 0.12);
      curTiltY = lerp(curTiltY, targetTiltY, 0.12);
      group.rotation.x = -0.08 + curTiltX;
      group.rotation.y = Math.sin(t * 0.2) * 0.2 * (1 - pe) + curTiltY;
      renderOnce();
      // Rest once resolved AND no hover tilt is active or pending — so nothing
      // moves on its own, but hover always re-wakes it (WCAG 2.2.2 friendly).
      const resolved = pe >= 1 && e > DELAY + DURATION + TAIL;
      const tiltSettled =
        !hoverActive && Math.abs(curTiltX) < 0.002 && Math.abs(curTiltY) < 0.002;
      if (resolved && tiltSettled) {
        group.rotation.x = -0.08;
        group.rotation.y = 0;
        curTiltX = 0;
        curTiltY = 0;
        layout(1);
        renderOnce();
        running = false;
        return;
      }
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    if (reduced) {
      layout(1);
      group.rotation.y = 0;
      renderOnce();
    } else {
      layout(0);
      start();
    }

    const io = new IntersectionObserver(
      (entries) => {
        const nowInView = entries[0].isIntersecting;
        if (nowInView && !inView && !reduced) {
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

    // ── Hover parallax (skipped for reduced motion / coarse pointers) ──
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const onPointerMove = (ev: PointerEvent) => {
      if (reduced || coarse) return;
      const rect = mount.getBoundingClientRect();
      const px = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((ev.clientY - rect.top) / rect.height) * 2 - 1;
      const MAX = 0.36;
      targetTiltY = px * MAX;
      targetTiltX = -py * MAX * 0.6;
      hoverActive = true;
      if (tabVisible && inView) start();
    };
    const onPointerLeave = () => {
      hoverActive = false;
      targetTiltX = 0;
      targetTiltY = 0;
      if (tabVisible && inView) start(); // animate back to rest, then settle
    };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    // Replay on demand (fired by the hero's "Replay" button).
    const onReplay = () => {
      if (reduced) return;
      startT = 0;
      layout(0);
      if (tabVisible && inView) start();
    };
    window.addEventListener("knot:replay", onReplay);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("knot:replay", onReplay);
      nodeGeo.dispose();
      oliveMat.dispose();
      amberMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-knot" aria-hidden="true" />;
}
