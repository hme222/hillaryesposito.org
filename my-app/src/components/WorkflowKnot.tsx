import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Auto-resolving sibling of MSKSystemMap, tuned to sit behind the About hero as
 * an ambient backdrop. A tangled graph of nodes + connections plays the
 * complexity → clarity resolve once on mount (the literal illustration of
 * "turning complex workflows into trusted products"), then settles into a slow
 * idle drift. The final column resolves to amber — clarity / trust.
 *
 * Guards mirror MSKSystemMap: skipped if WebGL is unavailable; prefers-reduced-
 * motion renders the resolved state statically; the loop pauses offscreen /
 * tab-hidden; capped pixel ratio; everything disposed on unmount.
 */
const COLS = 4;
const ROWS = 4;
const N = COLS * ROWS;
const smoothstep = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const DELAY = 0.7; // seconds held tangled before the resolve begins
const DURATION = 3.0; // seconds for the resolve

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
    let w = mount.clientWidth || 560;
    let h = mount.clientHeight || 460;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(w, h, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const group = new THREE.Group();
    group.rotation.x = -0.08;
    scene.add(group);

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
      color: 0xc0852f, metalness: 0.25, roughness: 0.45, emissive: 0x5a3a12, emissiveIntensity: 0.4,
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
    let startT = 0; // set on first run so the resolve begins when first in view

    const loop = () => {
      const t = clock.getElapsedTime();
      if (!startT) startT = t;
      const raw = clamp01((t - startT - DELAY) / DURATION);
      const pe = smoothstep(raw);
      layout(pe);
      // Tumbles while tangled, settles to face front as it orders; keeps a very
      // slow idle drift once resolved so the hero never feels frozen.
      group.rotation.y = Math.sin(t * 0.2) * 0.2 * (1 - pe * 0.7);
      renderOnce();
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
        // Re-entering the hero (e.g. scrolling back to the top) replays the
        // resolve from the tangle — intent-driven, not on a timer. Reduced-
        // motion is left in its resolved state and never re-tangled.
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
      if (!running) renderOnce();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
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
