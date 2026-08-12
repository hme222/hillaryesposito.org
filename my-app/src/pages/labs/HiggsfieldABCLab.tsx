import React, { PointerEvent, useEffect, useRef, useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import { useT } from "../../app/LanguageContext";
import type { StringKey } from "../../i18n/strings";
import "../../styles/higgsfield-abc-lab.css";

type ProjectId = "msk" | "grove" | "mobbin";
type Project = {
  id: ProjectId; n: string; title: string; path: string; img: string;
  subKey: StringKey; descKey: StringKey; altKey: StringKey;
};

const PROJECTS: Project[] = [
  {
    id: "msk", n: "01", title: "Memorial Sloan Kettering", path: "/case-study/msk",
    img: "/assets/msk/mskcc-map-thumb.jpg", subKey: "home.proj.msk.subtitle", descKey: "home.riso.mskDesc", altKey: "home.riso.mskAlt",
  },
  {
    id: "grove", n: "02", title: "Grove", path: "/case-study/grove",
    img: "/assets/grove/grove1.png", subKey: "home.proj.grove.subtitle", descKey: "home.riso.groveDesc", altKey: "home.riso.groveAlt",
  },
  {
    id: "mobbin", n: "03", title: "Mobbin", path: "/case-study/mobbin",
    img: "/assets/mobbin/discover.jpg", subKey: "home.proj.mobbin.subtitle", descKey: "home.riso.mobbinDesc", altKey: "home.riso.mobbinAlt",
  },
];

type ViewTransition = { finished: Promise<void>; skipTransition?: () => void };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => ViewTransition;
};

const DESTINATION_ARTIFACT: Partial<Record<ProjectId, string>> = {
  grove: "#grove-start .rp-hero__media img",
  mobbin: "#mobbin-start .fp-capture--3 img",
};
const RETURN_KEY = "portfolio-motion-return";

function routeTo(project: Project) {
  window.history.pushState({ motionSource: "selected-work", project: project.id }, "", project.path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

async function registerTruthfulDestination(project: Project, transitionName: string) {
  const selector = DESTINATION_ARTIFACT[project.id];
  if (!selector) return false;
  const deadline = performance.now() + 180;
  while (performance.now() < deadline) {
    const target = document.querySelector<HTMLElement>(selector);
    const heading = document.querySelector("#main-content h1");
    if (target && heading) {
      target.style.viewTransitionName = transitionName;
      return true;
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  return false;
}

function IntentRow({ project, reduced }: { project: Project; reduced: boolean }) {
  const t = useT();
  const rowRef = useRef<HTMLAnchorElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const intentTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);

  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reduced || !rowRef.current || event.pointerType === "touch") return;
    const bounds = rowRef.current.getBoundingClientRect();
    const x = Math.max(-10, Math.min(10, (((event.clientX - bounds.left) / bounds.width) - .5) * 20));
    const y = Math.max(-8, Math.min(8, (((event.clientY - bounds.top) / bounds.height) - .5) * 16));
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rowRef.current?.style.setProperty("--intent-bias-x", `${x}px`);
      rowRef.current?.style.setProperty("--intent-bias-y", `${y}px`);
    });
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (intentTimerRef.current) window.clearTimeout(intentTimerRef.current);
  }, []);

  return (
    <a
      ref={rowRef}
      href={project.path}
      className={`hrm-row ${active ? "is-intent" : ""}`}
      onPointerEnter={() => { intentTimerRef.current = window.setTimeout(() => setActive(true), 80); }}
      onPointerMove={move}
      onPointerLeave={() => { if (intentTimerRef.current) window.clearTimeout(intentTimerRef.current); setActive(false); }}
      onPointerDown={(event) => { if (event.pointerType === "touch") setActive(true); }}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={(event) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        const startViewTransition = (document as ViewTransitionDocument).startViewTransition;
        if (reduced || connection?.saveData || !startViewTransition || !DESTINATION_ARTIFACT[project.id]) return;
        event.preventDefault();
        const transitionName = `project-${project.id}`;
        thumbRef.current?.style.setProperty("view-transition-name", transitionName);
        sessionStorage.setItem(RETURN_KEY, JSON.stringify({ id: project.id, y: window.scrollY }));
        try {
          let transition: ViewTransition | undefined;
          transition = startViewTransition.call(document, async () => {
            routeTo(project);
            const registered = await registerTruthfulDestination(project, transitionName);
            if (!registered) transition?.skipTransition?.();
          });
          transition.finished.finally(() => {
            document.querySelectorAll<HTMLElement>(`[style*="view-transition-name: ${transitionName}"]`).forEach((element) => element.style.removeProperty("view-transition-name"));
          });
        } catch {
          thumbRef.current?.style.removeProperty("view-transition-name");
          routeTo(project);
        }
      }}
    >
      <span className="hrm-row__field" aria-hidden="true" />
      <div className="hrm-row__copy">
        <p className="hrm-row__number">{project.n}</p>
        <h2>{project.title}</h2>
        <p className="hrm-row__subtitle">{t(project.subKey)}</p>
        <p className="hrm-row__description">{t(project.descKey)}</p>
      </div>
      <div ref={thumbRef} className="hrm-row__thumb"><img src={project.img} alt={t(project.altKey)} /></div>
      <span className="hrm-row__arrow" aria-hidden="true">→</span>
    </a>
  );
}

export default function HiggsfieldABCLab() {
  usePageTitle("Real-context portfolio motion lab");
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(RETURN_KEY);
    if (!saved) return;
    sessionStorage.removeItem(RETURN_KEY);
    try {
      const { id, y } = JSON.parse(saved) as { id?: ProjectId; y?: number };
      if (!id) return;
      requestAnimationFrame(() => {
        window.scrollTo(0, typeof y === "number" ? y : 0);
        document.querySelector<HTMLAnchorElement>(`.hrm-row[href="/case-study/${id}"]`)?.focus({ preventScroll: true });
      });
    } catch {
      // A malformed restoration hint should never interfere with the page.
    }
  }, []);

  return (
    <main className={`riso-page hrm-page ${reduced ? "is-reduced" : ""}`} lang="en">
      <header className="hrm-header"><p>Selected work</p><h1>Three products, three different problems</h1></header>
      <div className="hrm-motion-control"><label><input type="checkbox" checked={reduced} onChange={(event) => setReduced(event.target.checked)} /> Reduced motion</label></div>
      <section className="hrm-work" aria-label="Selected projects">
        <div className="hrm-worklist">{PROJECTS.map((project) => <IntentRow key={project.id} project={project} reduced={reduced} />)}</div>
      </section>
    </main>
  );
}
