import React, { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import { useT } from "../../app/LanguageContext";
import "../../styles/higgsfield-abc-lab.css";

type Concept = "A" | "B" | "C";
type CPhase = "shape" | "ready" | "finishing" | "complete";
type Scenario = "load" | "latency" | "consistency" | "unavailable";

const MSK_SOURCE = "/assets/msk/mskcc-map-thumb.jpg";

const CONCEPTS: Array<{ id: Concept; name: string; watch: string }> = [
  { id: "A", name: "The work has weather", watch: "Atmosphere gathers around exact evidence." },
  { id: "B", name: "The page remembers", watch: "One artifact persists across the route." },
  { id: "C", name: "Playground", watch: "Direct light around the unchanged map." },
];

export function canonicalIntentId(x: number, y: number, fidelity: "preview" | "high") {
  const canonicalX = Math.round(Math.max(0, Math.min(100, x)) / 5) * 5;
  const canonicalY = Math.round(Math.max(0, Math.min(100, y)) / 5) * 5;
  const input = `msk-map-v1|paper-shadow-light-camera|${canonicalX}:${canonicalY}|${fidelity}`;
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `MSK-${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}

function Evidence({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <article className={`habc-evidence ${className}`.trim()} aria-label="Exact Memorial Sloan Kettering selected-work row">
      <div className="habc-evidence__copy">
        <p className="habc-evidence__number">01</p>
        <h3>Memorial Sloan Kettering</h3>
        <p className="habc-evidence__subtitle">{t("home.proj.msk.subtitle")}</p>
        <p className="habc-evidence__description">{t("home.riso.mskDesc")}</p>
      </div>
      <div className="habc-evidence__thumb">
        <img src={MSK_SOURCE} alt={t("home.riso.mskAlt")} draggable={false} />
      </div>
      <span className="habc-evidence__arrow" aria-hidden="true">→</span>
    </article>
  );
}

function MiniA({ reduced }: { reduced: boolean }) {
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);

  const reveal = () => {
    setRun((value) => value + 1);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => setPlaying(false), 9000);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, run]);

  return (
    <section className="habc-mini" aria-labelledby="habc-a-title">
      <div className="habc-mini__copy">
        <p className="habc-label">A / 03</p>
        <h2 id="habc-a-title">The work has weather</h2>
        <p>Reveal a raking light and registered paper edge.</p>
      </div>
      <div className={`habc-stage habc-weather ${playing ? "is-playing" : ""} ${reduced ? "is-reduced" : ""}`} key={run}>
        <span className="habc-weather__wash habc-weather__wash--one" aria-hidden="true" />
        <span className="habc-weather__wash habc-weather__wash--two" aria-hidden="true" />
        <span className="habc-weather__shadow" aria-hidden="true" />
        <Evidence />
      </div>
      <div className="habc-actions">
        <button type="button" className="habc-action" onClick={reveal}>
          {run ? "Replay atmosphere" : "Reveal atmosphere"}
        </button>
        <p role="status" aria-live="polite">{playing && !reduced ? "Atmosphere moving around the exact artifact." : run ? "Atmosphere revealed." : "Still preview ready."}</p>
      </div>
    </section>
  );
}

function MiniB({ reduced }: { reduced: boolean }) {
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(false);

  const open = () => {
    setRun((value) => value + 1);
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setTimeout(() => setPlaying(false), 9000);
    return () => window.clearTimeout(timer);
  }, [playing, reduced, run]);

  return (
    <section className="habc-mini" aria-labelledby="habc-b-title">
      <div className="habc-mini__copy">
        <p className="habc-label">B / 03</p>
        <h2 id="habc-b-title">The page remembers</h2>
        <p>Open the project. The map carries your place.</p>
      </div>
      <div className={`habc-stage habc-memory ${playing ? "is-playing" : ""} ${reduced ? "is-reduced" : ""}`} key={run}>
        <div className="habc-memory__index" aria-hidden="true">
          <span>Selected work</span><i /><span>01</span>
        </div>
        <div className="habc-memory__destination" aria-hidden="true">
          <span>Case study · MSK</span><i /><span>Clinical systems</span>
          <strong>Making one operational system visible.</strong>
        </div>
        <Evidence className="habc-memory__evidence" />
      </div>
      <div className="habc-actions">
        <button type="button" className="habc-action" onClick={open}>
          {run ? "Replay transition" : "Open project"}
        </button>
        <p role="status" aria-live="polite">{playing && !reduced ? "The publication is changing around the artifact." : run ? "Case-study context reached with the artifact preserved." : "Homepage context ready."}</p>
      </div>
    </section>
  );
}

function MiniC({ reduced, onFirstLookComplete }: { reduced: boolean; onFirstLookComplete: () => void }) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const finishTimerRef = useRef<number | null>(null);
  const [anchor, setAnchor] = useState({ x: 76, y: 28 });
  const [phase, setPhase] = useState<CPhase>("shape");
  const [fidelity, setFidelity] = useState<"preview" | "high">("high");
  const [receipt, setReceipt] = useState<{ id: string; replayed: boolean } | null>(null);
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [draftChanged, setDraftChanged] = useState(false);

  const moveAnchor = (x: number, y: number) => {
    setAnchor({ x: Math.max(8, Math.min(92, x)), y: Math.max(10, Math.min(90, y)) });
    setPhase((current) => current === "shape" ? "ready" : current);
    if (phase === "finishing" || phase === "complete") setDraftChanged(true);
  };

  const pointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!fieldRef.current || event.buttons !== 1) return;
    const bounds = fieldRef.current.getBoundingClientRect();
    moveAnchor(((event.clientX - bounds.left) / bounds.width) * 100, ((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const finish = () => {
    const id = canonicalIntentId(anchor.x, anchor.y, fidelity);
    const replayed = seenIds.includes(id);
    setPhase("finishing");
    setDraftChanged(false);
    const complete = () => {
      finishTimerRef.current = null;
      setReceipt({ id, replayed });
      setSeenIds((ids) => ids.includes(id) ? ids : [...ids, id]);
      setPhase("complete");
      onFirstLookComplete();
    };
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    if (reduced || fidelity === "preview") complete();
    else finishTimerRef.current = window.setTimeout(complete, 8000);
  };

  const cancel = () => {
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    finishTimerRef.current = null;
    setPhase("ready");
    setReceipt(null);
    setDraftChanged(false);
  };

  const reset = () => {
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    finishTimerRef.current = null;
    setAnchor({ x: 76, y: 28 });
    setPhase("shape");
    setReceipt(null);
    setScenario(null);
    setDraftChanged(false);
  };

  useEffect(() => () => {
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
  }, []);

  const style = useMemo(() => ({ "--anchor-x": `${anchor.x}%`, "--anchor-y": `${anchor.y}%` } as React.CSSProperties), [anchor]);
  const status = phase === "finishing"
    ? "Finishing the atmosphere. The evidence remains available."
    : phase === "complete"
      ? `${receipt?.replayed ? "Same treatment replayed without another run." : "Treatment finished."} Receipt and evaluator recovery checks are available below.`
      : phase === "ready"
        ? "Spatial preview ready to finish."
        : "Move the atmosphere anchor to begin.";

  const canFinish = phase === "ready" || (phase === "complete" && draftChanged);
  const actionLabel = phase === "finishing"
    ? "Cancel finish"
    : phase === "complete" && !draftChanged
      ? "Start over"
      : draftChanged
        ? "Finish next draft"
        : "Finish treatment";
  const actionDisabled = phase === "shape";
  const action = () => {
    if (phase === "finishing") cancel();
    else if (phase === "complete" && !draftChanged) reset();
    else finish();
  };

  return (
    <section className="habc-mini" aria-labelledby="habc-c-title">
      <div className="habc-mini__copy">
        <p className="habc-label">C / 03 · previously rejected · simplified</p>
        <h2 id="habc-c-title">Playground</h2>
        <p>Direct the light. The map and copy never change.</p>
      </div>
      <div
        ref={fieldRef}
        className={`habc-stage habc-intent is-${phase} ${reduced ? "is-reduced" : ""}`}
        style={style}
      >
        <span className="habc-intent__material habc-intent__material--one" aria-hidden="true" />
        <span className="habc-intent__material habc-intent__material--two" aria-hidden="true" />
        <Evidence />
        <button
          type="button"
          className="habc-anchor"
          aria-label={`Atmosphere position ${Math.round(anchor.x)} percent across and ${Math.round(anchor.y)} percent down. Use arrow keys or drag.`}
          onPointerDown={(event) => event.currentTarget.setPointerCapture(event.pointerId)}
          onPointerMove={pointerMove}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 10 : 5;
            if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) event.preventDefault();
            if (event.key === "ArrowLeft") moveAnchor(anchor.x - step, anchor.y);
            if (event.key === "ArrowRight") moveAnchor(anchor.x + step, anchor.y);
            if (event.key === "ArrowUp") moveAnchor(anchor.x, anchor.y - step);
            if (event.key === "ArrowDown") moveAnchor(anchor.x, anchor.y + step);
          }}
        >
          <span aria-hidden="true" />
        </button>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Position {Math.round(anchor.x)} percent across, {Math.round(anchor.y)} percent down.
        </p>
        {draftChanged && <p className="habc-draft">Next draft changed · committed treatment preserved</p>}
      </div>

      <div className="habc-c-controls">
        <details className="habc-step-controls">
          <summary>Use step controls</summary>
          <div role="group" aria-label="Atmosphere position controls">
            <button type="button" onClick={() => moveAnchor(anchor.x - 10, anchor.y)}>Left</button>
            <button type="button" onClick={() => moveAnchor(anchor.x, anchor.y - 10)}>Up</button>
            <button type="button" onClick={() => moveAnchor(anchor.x, anchor.y + 10)}>Down</button>
            <button type="button" onClick={() => moveAnchor(anchor.x + 10, anchor.y)}>Right</button>
          </div>
        </details>
        <fieldset className="habc-fidelity" disabled={phase === "finishing"}>
          <legend>Finish preference</legend>
          <label><input type="radio" name="fidelity" checked={fidelity === "preview"} onChange={() => setFidelity("preview")} /> Preview now</label>
          <label><input type="radio" name="fidelity" checked={fidelity === "high"} onChange={() => setFidelity("high")} /> Highest fidelity · about 8 seconds</label>
          <small>Local simulation · no network or credits</small>
        </fieldset>
        <div className="habc-actions">
          <button type="button" className={`habc-action ${phase === "finishing" || phase === "complete" ? "habc-action--quiet" : ""}`} onClick={action} disabled={actionDisabled || (!canFinish && phase !== "finishing" && phase !== "complete")}>{actionLabel}</button>
          <p role="status" aria-live="polite">{status}</p>
        </div>
      </div>

      {phase === "complete" && receipt && (
        <section className="habc-receipt" aria-labelledby="habc-receipt-title">
          <h3 id="habc-receipt-title" className="sr-only">Treatment receipt</h3>
          <p><span>Protected</span><b>MSK map crop and selected-work words</b></p>
          <p><span>Changed</span><b>Paper, light, shadow, and camera</b></p>
          <p><span>Run</span><b>{receipt.replayed ? "Replayed · no duplicate" : "New treatment"}</b></p>
          <details><summary>Evaluator details</summary><p>Intent {receipt.id} · {fidelity === "high" ? "simulated remote finish" : "local preview"}</p></details>
        </section>
      )}

      {phase === "complete" && (
        <details className="habc-scenarios">
          <summary>Evaluator recovery checks</summary>
          <div className="habc-scenarios__choices">
            {(["load", "latency", "consistency", "unavailable"] as Scenario[]).map((item) => (
              <button type="button" key={item} aria-pressed={scenario === item} onClick={() => setScenario(item)}>{item}</button>
            ))}
          </div>
          {scenario && <ScenarioMessage scenario={scenario} onRetry={() => setScenario(null)} />}
        </details>
      )}
    </section>
  );
}

function ScenarioMessage({ scenario, onRetry }: { scenario: Scenario; onRetry: () => void }) {
  const copy: Record<Scenario, string> = {
    load: "A faster, quieter finish is ready now. The higher-craft finish needs longer.",
    latency: "The local draft still works. The committed atmosphere is taking about 14 seconds.",
    consistency: "The evidence is exact. The surrounding material is settling to the committed version.",
    unavailable: "The remote finish is unavailable. Your local treatment is intact.",
  };
  return <div className="habc-scenario" role="status"><p>{copy[scenario]}</p>{scenario === "unavailable" && <button type="button" onClick={onRetry}>Try finish again</button>}</div>;
}

export default function HiggsfieldABCLab() {
  usePageTitle("Higgsfield A/B/C private lab");
  const [concept, setConcept] = useState<Concept>("A");
  const motionOverrideRef = useRef(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [cComplete, setCComplete] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = (event: MediaQueryListEvent) => {
      if (!motionOverrideRef.current) setReduced(event.matches);
    };
    query.addEventListener?.("change", sync);
    return () => query.removeEventListener?.("change", sync);
  }, []);

  return (
    <main className="riso-page habc-page" lang="en">
      <header className="habc-header">
        <div>
          <p className="habc-label">Private comparison · no generated media</p>
          <h1>One MSK map. Three motion studies.</h1>
        </div>
        <p>Which version makes the redesign easier to recall?</p>
      </header>

      <nav className="habc-index" aria-label="Higgsfield concepts">
        {CONCEPTS.map((item) => (
          <button type="button" key={item.id} className={concept === item.id ? "is-active" : ""} aria-pressed={concept === item.id} onClick={() => setConcept(item.id)}>
            <span>{item.id}</span><b>{item.name}</b><small>{item.watch}</small>
          </button>
        ))}
      </nav>

      <div className="habc-toolbar">
        <p aria-live="polite">Viewing {concept} of 3</p>
        <label><input type="checkbox" checked={reduced} onChange={(event) => { motionOverrideRef.current = true; setReduced(event.target.checked); }} /> Reduced motion</label>
      </div>

      <div className="habc-shared-stage">
        {concept === "A" && <MiniA reduced={reduced} />}
        {concept === "B" && <MiniB reduced={reduced} />}
        {concept === "C" && <MiniC reduced={reduced} onFirstLookComplete={() => setCComplete(true)} />}
      </div>

      <footer className="habc-evaluation">
        <p>Which study keeps the work memorable without competing with it?</p>
        {cComplete && <p className="habc-evaluation__note">C's evaluator scenarios are now available inside its completed state.</p>}
      </footer>
    </main>
  );
}
