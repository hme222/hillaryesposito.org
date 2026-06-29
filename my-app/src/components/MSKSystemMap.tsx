import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Scroll-driven 3D system map for the MSK case study. A graph of nodes +
 * connections starts as a tangled cluster and, as the section scrolls into view,
 * reorganizes into a clean left-to-right blueprint — the final column resolving
 * to amber (complexity → clarity → trust). It visualizes the through-line of
 * Hillary's work rather than decorating.
 *
 * Guards: skipped if WebGL is unavailable; prefers-reduced-motion renders the
 * resolved (ordered) state statically; the loop pauses offscreen / tab-hidden;
 * capped pixel ratio; everything disposed on unmount.
 */
const COLS = 4;
const ROWS = 4;
const N = COLS * ROWS;
const smoothstep = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

export default function MSKSystemMap() {
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
    let w = mount.clientWidth || 880;
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

    // ── Node target (ordered blueprint) and chaos positions
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

    // ── Edges: clean left→right flow (tangled while in chaos)
    const edges: [number, number][] = [];
    for (let c = 0; c < COLS - 1; c++) {
      for (let r = 0; r < ROWS; r++) {
        edges.push([idx(c, r), idx(c + 1, r)]);
        if (r < ROWS - 1 && (c + r) % 2 === 0) edges.push([idx(c, r), idx(c + 1, r + 1)]);
        if (r > 0 && (c + r) % 2 === 1) edges.push([idx(c, r), idx(c + 1, r - 1)]);
      }
    }

    // ── Nodes (olive, with the final column amber = the resolved/trusted end)
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

    // ── Edge line segments (positions updated each frame)
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

    const scrollProgress = () => {
      const rect = mount.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Hold the tangle until the map has risen to near the top of the viewport
      // (so it's fully on screen and clearly knotted), then resolve as it
      // continues up and out. This keeps the messy state visible instead of
      // letting it untangle while it's still entering from the bottom.
      const startTop = vh * 0.32; // begin resolving once the top reaches here
      const endTop = -vh * 0.18; // fully resolved by the time it's leaving
      return clamp01((startTop - rect.top) / (startTop - endTop));
    };

    const renderOnce = () => renderer.render(scene, camera);

    let rafId = 0;
    let running = false;
    let inView = true;
    let tabVisible = !document.hidden;
    const clock = new THREE.Clock();

    const loop = () => {
      const t = clock.getElapsedTime();
      const pe = smoothstep(scrollProgress());
      layout(pe);
      // Tumbles while tangled, then settles fully to zero once resolved — the
      // only remaining motion is scroll-driven (user-controlled), so nothing
      // moves on its own when the section is at rest (WCAG 2.2.2).
      group.rotation.y = Math.sin(t * 0.25) * 0.22 * (1 - pe);
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
      layout(1); // resolved blueprint, no motion
      group.rotation.y = 0;
      renderOnce();
    } else {
      layout(0);
      start();
    }

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
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

  return <div ref={mountRef} className="msk-systemmap" aria-hidden="true" />;
}
