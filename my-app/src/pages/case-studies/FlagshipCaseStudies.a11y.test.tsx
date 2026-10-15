import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import FlagshipMSK from "./FlagshipMSK";
import FlagshipMobbin from "./FlagshipMobbin";
import FlagshipLogistics from "./FlagshipLogistics";
import FlagshipKnowunity from "./FlagshipKnowunity";
import FlagshipUxWoman from "./FlagshipUxWoman";
import RisoGrove from "./RisoGrove";
import RisoHome from "../RisoHome";
import About from "../AboutMe";
import NotFoundPage from "../NotFoundPage";
import Footer from "../../components/Footer";
import RecruiterPanel from "../../components/RecruiterPanel";

let mockLang = "en";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props}>{children}</a>
  ),
  Navigate: () => null,
  useLocation: () => ({ pathname: "/", search: "" }),
  useNavigate: () => jest.fn(),
}), { virtual: true });

jest.mock("../../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: mockLang, setLang: jest.fn() }),
  useT: () => (key: string) => key,
}));

jest.mock("../../components/MSKSystemMap", () => () => (
  <div role="img" aria-label="MSK system map visualization" />
));

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

jest.setTimeout(20000);

describe("flagship case-study accessibility", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: ObserverStub,
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({
        matches: false,
        addEventListener() {},
        removeEventListener() {},
      }),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  beforeEach(() => {
    window.sessionStorage.setItem("portfolio-opening-film-seen", "true");
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    mockLang = "en";
    window.history.replaceState(null, "", "/");
  });

  it.each([
    ["MSK", <FlagshipMSK />],
    ["Mobbin", <FlagshipMobbin />],
    ["Medical logistics", <FlagshipLogistics />],
    ["Knowunity", <FlagshipKnowunity />],
    ["UX Woman", <FlagshipUxWoman />],
    ["Grove", <RisoGrove />],
    ["Home", <RisoHome />],
    ["About", <About />],
    ["404 recovery", <NotFoundPage />],
    ["Global footer", <Footer />],
    ["Recruiter panel", <RecruiterPanel />],
  ])("%s has no detectable structural accessibility violations", async (_name, page) => {
    await act(async () => {
      root.render(page);
    });

    const results = await axe.run(container, {
      rules: {
        // jsdom has no layout engine; color contrast is verified separately
        // against the production theme tokens.
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });

  it("keeps the exact MSK workflow evidence with no Detour animatic", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    // The Detour animatic was removed 2026-10-13 (owner direction).
    const exactSteps = container.querySelector(".fp-workflow[data-evidence='true']");
    expect(container.querySelector("[data-testid='msk-the-detour']")).toBeNull();
    expect(container.querySelector(".fp-workflowFilm")).toBeNull();
    expect(exactSteps?.textContent).toContain("Print the portal message");
    expect(exactSteps?.textContent).toContain("Choose Send to EMR");
  });

  it("states the MSK proposal-to-implementation boundary before outcome metrics", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    const hero = container.querySelector("#msk-start");
    expect(hero?.textContent).toContain("user experience (UX) teams built it after I changed roles");
    expect(hero?.textContent).toContain("Office Coordinator → Administrative Assistant → Training Facilitator (retitled Trainer I Specialist)");
    expect(hero?.textContent).toContain("Diagnose · map · validate feasibility · pitch");
    expect(hero?.textContent).not.toContain("20%");
    expect(hero?.textContent).not.toContain("two system upgrades");
    expect(container.textContent).toContain("not attributed solely to this filing workflow");
    // 2026-10-14 review: the 70% is gone, the month-early result leads, and the
    // ~$1M/year is labelled as a projection from the pitch.
    expect(container.textContent).not.toContain("70%");
    expect(container.textContent).toContain("with no 4-month extension");
    expect(container.textContent).toContain("~$1M/year");
    expect(container.textContent).toContain("projected paper savings in my Process Improvement Fair pitch, not measured savings");
    expect(container.querySelectorAll("#msk-outcomes .rp-outcomes--four .rp-stat")).toHaveLength(4);
  });

  it("the breadcrumb row's tour trigger dispatches open-recruiter-panel with returnFocus (EN and ES)", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });
    const handler = jest.fn();
    window.addEventListener("open-recruiter-panel", handler);
    const trigger = container.querySelector<HTMLButtonElement>(".rp-breadcrumbTour");
    expect(trigger?.textContent).toBe("Open the 90-second tour");
    await act(async () => trigger?.click());
    expect(handler).toHaveBeenCalledTimes(1);
    const detail = (handler.mock.calls[0][0] as CustomEvent).detail;
    expect(detail.returnFocus).toBe(trigger);
    window.removeEventListener("open-recruiter-panel", handler);

    // Same control, ES case study (SpanishCaseStudy.tsx) - the string is
    // the translated one, and the breadcrumb's own final crumb uses the
    // short organisation name, not the page's full headline.
    mockLang = "es";
    await act(async () => {
      root.render(<FlagshipMSK />);
    });
    const esTrigger = container.querySelector<HTMLButtonElement>(".rp-breadcrumbTour");
    expect(esTrigger?.textContent).toBe("Abrir el recorrido de 90 segundos (en inglés)");
    const breadcrumb = container.querySelector(".rp-breadcrumb");
    expect(breadcrumb?.textContent).toContain("Memorial Sloan Kettering");
    expect(breadcrumb?.textContent).not.toContain("Una cola de archivo reemplazó");
  });

  it("About's breadcrumb row also carries the tour trigger", async () => {
    await act(async () => {
      root.render(<About />);
    });
    const trigger = container.querySelector<HTMLButtonElement>(".rp-breadcrumbTour");
    expect(trigger?.textContent).toBe("Open the 90-second tour");
    const handler = jest.fn();
    window.addEventListener("open-recruiter-panel", handler);
    await act(async () => trigger?.click());
    expect(handler).toHaveBeenCalledTimes(1);
    window.removeEventListener("open-recruiter-panel", handler);
  });

  it("labels Grove redesign work as testable direction with retest pending", async () => {
    await act(async () => {
      root.render(<RisoGrove />);
    });

    const hero = container.querySelector("#grove-start");
    expect(hero?.textContent).toContain("redesign direction · retest pending");
    expect(container.textContent).toContain("These are not completed redesigns");
    expect(container.querySelectorAll(".rp-decision__tag--new")).toHaveLength(3);
    container.querySelectorAll(".rp-decision__tag--new").forEach((label) => {
      expect(label.textContent).toBe("Next design");
    });
  });

  it("ties each logistics result to its mechanism and owner-reported source", async () => {
    await act(async () => {
      root.render(<FlagshipLogistics />);
    });

    const hero = container.querySelector("#log-start");
    expect(hero?.textContent).toContain("1–2 months to 1–2 weeks");
    expect(hero?.querySelector("h1")?.textContent).toBe("Resupply went from months to\u00a0weeks.");
    expect(hero?.textContent).toContain("85% faster in my service record (owner-reported)");
    expect(container.textContent).toContain("measurement periods and methods are not preserved");
    expect(container.textContent).toContain("Relocation1–2 wk");
    expect(container.textContent).toContain("Order status60%");
    expect(container.textContent).toContain("Protocol15%");
  });

  it("keeps the active homepage shell targets and one work-first hero route intact", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    ["home", "projects", "about", "contact"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
    expect(container.querySelector('a[href="/case-study/msk"].rp-cta')).not.toBeNull();
    expect(container.querySelector(".rp-recruiter-link")).toBeNull();
  });

  it("exposes Grove's working browser prototype from Home without a dead Spanish hash", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    const englishPrototype = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-work__teaser"))
      .find((link) => link.textContent?.includes("working browser prototype"));
    expect(englishPrototype?.getAttribute("href")).toBe("/case-study/grove#grove-prototype");

    mockLang = "es";
    await act(async () => {
      root.render(<RisoHome />);
    });

    const spanishPrototype = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-work__teaser"))
      .find((link) => link.textContent?.includes("prototipo funcional"));
    expect(spanishPrototype?.getAttribute("href")).toBe("/case-study/grove");
  });

  it("opens the Knowunity case study from Home row 05, with a teaser into its four decisions", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    const rows = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-work"));
    expect(rows).toHaveLength(5);

    const row = rows.find((link) => link.getAttribute("href") === "/case-study/knowunity");
    expect(row).toBeDefined();
    expect(row?.getAttribute("target")).toBeNull();
    expect(row?.textContent).toContain("home.riso.knowunityDesc");
    expect(row?.querySelectorAll(".rp-work__thumb--knowunity img")).toHaveLength(2);

    // The teaser stays on the site (2026-10-15, call 3); the external
    // prototype and the Storybook link live in the case study.
    const teaser = container.querySelector<HTMLAnchorElement>('.rp-work__teaser[href="/case-study/knowunity#knowunity-decisions"]');
    expect(teaser?.textContent).toBe("See the four decisions →");
    expect(teaser?.getAttribute("target")).toBeNull();
    expect(container.innerHTML).not.toContain("knowunity-voice-recall.vercel.app");
    expect(container.innerHTML).not.toContain("chromatic.com");
    expect(container.innerHTML).not.toContain("knowunity-voice-recall-o2c9s7oro");
    expect(container.innerHTML).not.toContain("vercel.com/hillary-esposito-s-projects");

    mockLang = "es";
    await act(async () => {
      root.render(<RisoHome />);
    });
    const esTeaser = container.querySelector<HTMLAnchorElement>('.rp-work__teaser[href="/case-study/knowunity#es-knowunity-decisions"]');
    expect(esTeaser?.textContent).toBe("Ver las cuatro decisiones →");
  });

  it("states the Knowunity limits and keeps Knowunity's internal numbers off the page", async () => {
    await act(async () => {
      root.render(<FlagshipKnowunity />);
    });

    expect(container.querySelector("h1")?.textContent).toBe("The student's own words are the\u00a0proof.");
    ["knowunity-start", "knowunity-brief", "knowunity-decisions", "knowunity-prototype", "knowunity-outcomes"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
    expect(container.querySelectorAll(".rp-decisionStory__visual img")).toHaveLength(4);
    expect(container.querySelectorAll(".rp-decisionStory__visual img.is-on")).toHaveLength(1);
    expect(container.querySelectorAll(".rp-outcomes--two .rp-stat")).toHaveLength(2);
    expect(container.textContent).toContain("recall is mocked");
    expect(container.textContent).toContain("no student testing");
    expect(container.textContent).not.toContain("instead of praise");
    ["642,000", "15.2%", "16.6%", "57.2%", "25%", "70%"].forEach((n) => expect(container.textContent).not.toContain(n));

    const storybook = container.querySelector<HTMLAnchorElement>('a[href*="chromatic.com"]');
    expect(storybook?.getAttribute("target")).toBe("_blank");
    expect(storybook?.hasAttribute("aria-label")).toBe(false);
    expect(storybook?.querySelector(".rp-ext")?.textContent).toBe("Open the Storybook");
    expect(container.querySelector(".rp-next")?.getAttribute("href")).toBe("/case-study/logistics");
  });

  it("rebuilds the Spanish MSK study on the English chapters, with Home's four-rules link landing", async () => {
    mockLang = "es";
    await act(async () => {
      root.render(<FlagshipMSK />);
    });
    const chapterLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-chapters a"), (a) => a.textContent);
    expect(chapterLinks).toEqual(["Problema", "Flujo", "Decisiones", "Rediseños", "Contexto", "Resultados"]);
    ["es-msk-start", "es-msk-brief", "es-msk-workflow", "es-msk-decisions", "es-msk-redesigns", "es-msk-systems", "es-msk-sustainment", "es-msk-outcomes"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
    expect(container.querySelector("#es-msk-decisions")?.getAttribute("data-language-anchor")).toBe("msk-decisions");
    expect(container.querySelectorAll("#es-msk-decisions li")).toHaveLength(4);
    const text = container.textContent || "";
    ["portal de pacientes", "un mes antes de la fecha límite original", "proyección", "Me fui antes del lanzamiento. Esto es lo que pasó después.", "clínica, TI, HIM y operaciones"].forEach((phrase) => {
      expect(text).toContain(phrase);
    });
    expect(text).not.toContain("70%");

    await act(async () => {
      root.render(<RisoHome />);
    });
    const teaser = container.querySelector<HTMLAnchorElement>('.rp-work__teaser[href="/case-study/msk#es-msk-decisions"]');
    expect(teaser?.textContent).toBe("Ver por qué un botón necesitó cuatro reglas →");
  });

  it("rebuilds the Spanish Mobbin study on the English chapters", async () => {
    mockLang = "es";
    await act(async () => {
      root.render(<FlagshipMobbin />);
    });
    const chapterLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-chapters a"), (a) => a.textContent);
    expect(chapterLinks).toEqual(["Problema", "Método", "Decisiones", "Apps", "Resultados"]);
    const text = container.textContent || "";
    expect(text).toContain("Mobbin es una biblioteca de capturas de apps");
    expect(text).toContain("Kikoff demuestra, Polymarket transparenta, Discover lo mantiene familiar.");
    ["Remoto", "mar.–jun."].forEach((phrase) => expect(text).not.toContain(phrase));
  });

  it("renders the condensed Spanish Knowunity study", async () => {
    mockLang = "es";
    await act(async () => {
      root.render(<FlagshipKnowunity />);
    });

    expect(container.querySelector("main")?.getAttribute("lang")).toBe("es");
    expect(container.querySelector("h1")?.textContent).toContain("Las propias palabras del estudiante");
    expect(container.querySelector(".rp-breadcrumb")?.textContent).toContain("Knowunity");
    expect(container.querySelector("#es-knowunity-decisions")).not.toBeNull();
    expect(container.textContent).not.toContain("en lugar de elogiarlo");
  });

  it("opens the UX Woman case study from Home row 04", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });
    const row = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-work")).find((link) => link.getAttribute("href") === "/case-study/ux-woman");
    expect(row).toBeDefined();
    expect(row?.textContent).toContain("home.riso.uxwomanDesc");
    expect(row?.querySelectorAll(".fp-ledger > div")).toHaveLength(5);
    const teaser = container.querySelector<HTMLAnchorElement>('.rp-work__teaser[href="/case-study/ux-woman#uxwoman-findings"]');
    expect(teaser?.textContent).toBe("See the five findings →");

    mockLang = "es";
    await act(async () => {
      root.render(<RisoHome />);
    });
    const esTeaser = container.querySelector<HTMLAnchorElement>('.rp-work__teaser[href="/case-study/ux-woman#es-uxwoman-findings"]');
    expect(esTeaser?.textContent).toBe("Ver los cinco hallazgos →");
  });

  it("states the UX Woman limits and never names an interviewee", async () => {
    await act(async () => {
      root.render(<FlagshipUxWoman />);
    });
    expect(container.querySelector("h1")?.textContent).toMatch(/Six healthcare\s+interviews/);
    ["uxwoman-start", "uxwoman-problem", "uxwoman-research", "uxwoman-findings", "uxwoman-pretotypes", "uxwoman-next"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
    expect(container.querySelectorAll(".fp-findings li")).toHaveLength(5);
    expect(container.querySelectorAll(".fp-pretotypes li")).toHaveLength(5);
    const text = container.textContent || "";
    ["No patient interview stream", "not healthcare validation", "hypothesis", "Five pretotypes designed. None run.", "Secondary research", "UserTesting"].forEach((phrase) => {
      expect(text).toContain(phrase);
    });
    ["Mario", "Shawn", "Michaela", "Remy", "Saranya", "Natasha", "Mount Sinai", "leverage", "seamless"].forEach((word) => {
      expect(text).not.toContain(word);
    });
  });

  it("renders the condensed Spanish UX Woman study", async () => {
    mockLang = "es";
    await act(async () => {
      root.render(<FlagshipUxWoman />);
    });
    expect(container.querySelector(".rp-breadcrumb")?.textContent).toContain("UX Woman");
    expect(container.querySelector("#es-uxwoman-findings")).not.toBeNull();
    expect(container.textContent).toContain("No hay un flujo de entrevistas con pacientes");
    expect(container.textContent).toContain("ninguno ejecutado");
  });

  it("sends UX Woman's next-case-study band to Knowunity", async () => {
    await act(async () => {
      root.render(<FlagshipUxWoman />);
    });
    expect(container.querySelector(".rp-next")?.getAttribute("href")).toBe("/case-study/knowunity");
  });

  it("sends Grove's next-case-study band to UX Woman", async () => {
    await act(async () => {
      root.render(<RisoGrove />);
    });
    const next = container.querySelector<HTMLAnchorElement>(".rp-next");
    expect(next?.getAttribute("href")).toBe("/case-study/ux-woman");
    expect(next?.textContent).toContain("UX Woman");
  });

  // The product-led "Draft A" (rotating MSK/Grove/Army showcase) and
  // "Draft B" (scroll-scrubbed photo/artifact handoff) hero experiments were
  // both rejected on live owner review (2026-08-29 — "i don't like draft A
  // or B, just put back my photo next to header"). This asserts the plain
  // hero that replaced them, and guards against either experiment's control
  // surface (the draft pill, the scroll-handoff data attributes) creeping
  // back in without a fresh owner decision.
  it("keeps the homepage hero plain — photo next to the header, no draft controls", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    const hero = container.querySelector<HTMLElement>(".riso-home .rp-hero");
    expect(hero?.dataset.heroDraft).toBeUndefined();
    expect(hero?.dataset.bScrollEnhanced).toBeUndefined();
    expect(container.querySelector(".rp-heroDraftPill")).toBeNull();
    expect(container.querySelector(".home-heroShowcase")).toBeNull();

    const photo = container.querySelector<HTMLImageElement>(".rp-hero .rp-headshot img");
    expect(photo).not.toBeNull();
    expect(photo?.getAttribute("alt")).toBe("Hillary Esposito");
    expect(container.querySelector(".rp-hero .home-heroArtifact")).toBeNull();
    expect(container.querySelector(".rp-hero .msk-dashboard-mockup")).toBeNull();
  });

  it("keeps the weekend dispatch quiet until a keyboard or touch user opens it", async () => {
    window.sessionStorage.setItem("portfolio-opening-film-seen", "true");
    await act(async () => {
      root.render(<RisoHome />);
    });

    const toggle = container.querySelector<HTMLButtonElement>(".rp-dispatch__toggle");
    const panel = container.querySelector<HTMLElement>("#weekend-dispatch-panel");
    expect(toggle).not.toBeNull();
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(panel?.hidden).toBe(true);
    expect(container.querySelector(".rp-dispatch__collage")).toBeNull();
    expect(container.textContent).not.toContain("home.dispatch.finding");
    expect(container.querySelector(".rp-dispatchTrain__scene")?.getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector(".rp-dispatch__masthead .rp-dispatchTrain")).not.toBeNull();
    expect(container.querySelector(".rp-dispatch__masthead .rp-dispatch__cover")).not.toBeNull();
    expect(container.querySelector(".rp-dispatchSection > .rp-dispatchTrain")).toBeNull();
    expect(container.textContent).toContain("home.dispatch.trainAttribution");
    expect(container.querySelector(".rp-dispatchTrain img")).toBeNull();
    const trainVideo = container.querySelector<HTMLVideoElement>(".rp-dispatchTrain__video");
    expect(trainVideo).not.toBeNull();
    expect(trainVideo?.muted).toBe(true);
    expect(trainVideo?.loop).toBe(false);
    expect(trainVideo?.controls).toBe(false);
    expect(trainVideo?.getAttribute("playsinline")).not.toBeNull();
    expect(trainVideo?.getAttribute("aria-hidden")).toBe("true");
    expect(trainVideo?.querySelector("source")?.getAttribute("src")).toBe(
      "/assets/video/weekend-journal-riso-train-v2.mp4",
    );
    const pauseTrain = jest.fn();
    Object.defineProperty(trainVideo, "pause", { configurable: true, value: pauseTrain });
    Object.defineProperty(trainVideo, "currentTime", { configurable: true, value: 3.9 });
    await act(async () => trainVideo?.dispatchEvent(new Event("timeupdate", { bubbles: true })));
    expect(pauseTrain).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll(".rp-dispatchTrain__fallback .rp-dispatchTrain__car")).toHaveLength(4);

    await act(async () => {
      toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(toggle?.getAttribute("aria-expanded")).toBe("true");
    expect(panel?.hidden).toBe(false);
    expect(container.querySelector(".rp-dispatchTrain")?.classList.contains("rp-dispatchTrain--departed")).toBe(true);
    expect(container.textContent).toContain("home.dispatch.finding");
    expect(container.textContent).toContain("home.dispatch.prototypeLabel");
    expect(container.querySelector<HTMLAnchorElement>(".rp-dispatch__collage")?.href).toBe(
      "https://hme222.github.io/MTA_Accessibility_Trip_Planning/",
    );
    expect(container.querySelectorAll(".rp-dispatch__collage img")).toHaveLength(2);
    expect(container.querySelector(".rp-dispatch__route")).toBeNull();

    await act(async () => {
      toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(panel?.hidden).toBe(true);
    expect(container.querySelector(".rp-dispatchTrain")?.classList.contains("rp-dispatchTrain--departed")).toBe(false);
    expect(container.querySelector(".rp-dispatchTrain")?.classList.contains("rp-dispatchTrain--returning")).toBe(true);
  });

  // Direction C (design-state.md, 2026-08-27) put an expandable MSK queue
  // artifact in the homepage hero, replaced 2026-08-28/29 by the Draft A/B
  // experiments above, then dropped entirely on owner rejection — the hero
  // carries no dashboard artifact of any kind now (see the plain-hero test
  // above). This file's own home-work-queue-table (the MSK card further
  // down the homepage, in the work list) keeps its own coverage separately;
  // this test now only guards that the retired hero-specific expand/collapse
  // control doesn't reappear without a fresh owner decision.
  it("does not put an expandable queue artifact back in the homepage hero", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    expect(container.querySelector(".rp-hero .home-heroArtifact__expandToggle")).toBeNull();
    expect(container.querySelector("#home-hero-queue-table")).toBeNull();
    expect(container.querySelector("#home-hero-queue-table-b")).toBeNull();
  });

  // Every flagship carried a first-scroll "decision trace" evidence poster —
  // a compressed restatement of the case study's own argument, shown before the
  // reader had the argument. All three were removed on 2026-08-03 at Hillary's
  // request. Asserted rather than merely absent so they cannot creep back.
  it.each([
    ["Grove", <RisoGrove />],
    ["Mobbin", <FlagshipMobbin />],
    ["MSK", <FlagshipMSK />],
  ])("%s carries no evidence-poster decision trace", async (_name, page) => {
    await act(async () => {
      root.render(page);
    });

    expect(container.querySelectorAll(".evidence-media")).toHaveLength(0);
    expect(container.querySelector(".evidence-media-section")).toBeNull();
    expect(container.textContent).not.toMatch(/decision trace/i);
  });

  // Owner rejected the generated workflow film and the static registered peel,
  // then removed "The Detour" animatic too (2026-10-13). The ordered lists are
  // the workflow evidence on their own.
  it("MSK carries no workflow film, peel, or Detour animatic", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    expect(container.querySelector(".fp-workflowFilm")).toBeNull();
    expect(container.querySelector(".fp-routingPeelFig")).toBeNull();
    expect(container.querySelector("[data-testid='msk-the-detour']")).toBeNull();
    expect(container.querySelector(".fp-workflow[data-evidence='true']")).not.toBeNull();
  });

  it("keeps the MSK hero on the recreated queue without decorative concepts", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    const heroArtifact = container.querySelector<HTMLElement>(".fp-heroArt--msk");
    expect(heroArtifact?.getAttribute("data-evidence")).toBe("true");
    expect(heroArtifact?.querySelector(".msk-dashboard-mockup")).not.toBeNull();
    expect(container.querySelector(".fp-mskHeroPlate__detour")).toBeNull();
    expect(container.querySelector(".fp-mskLens")).toBeNull();
    expect(container.querySelector(".fp-mskLens__controls")).toBeNull();
    expect(container.textContent).toContain("Office Coordinator filing queue · no patient data");
  });


  it("keeps broken routes out of search indexes", async () => {
    await act(async () => {
      root.render(<NotFoundPage />);
    });

    expect(document.title).toBe("Page not found | Hillary Esposito");
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content"))
      .toBe("noindex, nofollow, noarchive");
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href"))
      .toBe("https://hillaryesposito.org");
  });


  it("keeps portfolio proof direct and opens the visual only after an explicit action", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    expect(container.querySelector(".rp-openingFilm")).toBeNull();
    expect(container.querySelector("main h1")).not.toBeNull();
    expect(container.textContent).toContain("Warehouse moved forward · months to weeks");

    // The hero ends on exactly two actions; the opener replay moved to the
    // global footer, which reaches the film through `open-opening-film`.
    const heroActions = container.querySelectorAll(".rp-hero__ctas > a, .rp-hero__ctas > button");
    expect(Array.from(heroActions, (el) => el.textContent)).toEqual([
      "home.riso.primaryWork →",
      "home.riso.recruiterTourLink",
    ]);
    expect(container.querySelector(".rp-hero .rp-openingVisualTrigger")).toBeNull();
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-opening-film", { detail: {} }));
    });

    const opening = container.querySelector<HTMLElement>(".rp-openingFilm");
    const openingVideo = opening?.querySelector<HTMLVideoElement>("video");
    expect(opening?.getAttribute("role")).toBe("dialog");
    expect(opening?.getAttribute("aria-modal")).toBe("true");
    expect(openingVideo?.autoplay).toBe(true);
    expect(openingVideo?.muted).toBe(true);
    expect(openingVideo?.loop).toBe(false);
    expect(openingVideo?.controls).toBe(false);
    expect(container.querySelector(".rp-homeBackdrop")).toBeNull();
    expect(container.querySelector(".rp-layerTeaser")).toBeNull();
    expect(container.querySelector(".carto--painted")).not.toBeNull();
    expect(container.querySelector(".carto__map--paint")).not.toBeNull();

    await act(async () => {
      root.render(<RisoGrove />);
    });
    expect(container.textContent).toContain("Optional artifact set");
    expect(container.textContent).toContain("Inspect all six first-build screens");
    expect(container.textContent).not.toContain("Walk the route");
  });

  it("opens a complete, dismissible recruiter scan path", async () => {
    await act(async () => {
      root.render(<RecruiterPanel />);
    });

    // The panel has no trigger of its own any more - the route dock dropped
    // the floating "Recruiter view" pill, so this fires the same
    // `open-recruiter-panel` CustomEvent the Ask dialog's "90-second
    // version" link dispatches.
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: {} }));
    });

    const dialog = container.querySelector<HTMLDialogElement>(".recruiter-panel");
    expect(dialog?.open).toBe(true);
    expect(dialog?.textContent).toContain("Grove");
    expect(dialog?.textContent).toContain("MSK · A filing queue replaced a four-department paper detour");
    expect(dialog?.textContent).toContain("Medical logistics · Resupply went from months to weeks");

    const projectTitles = Array.from(
      dialog?.querySelectorAll<HTMLButtonElement>(".recruiter-panel__project strong") || [],
      (item) => item.textContent,
    );
    expect(projectTitles).toEqual([
      "MSK · A filing queue replaced a four-department paper detour",
      "UX Woman · Six healthcare interviews, one hypothesis",
      "Medical logistics · Resupply went from months to weeks",
      "Grove · Eleven features became three",
    ]);
    expect(dialog?.textContent).toContain("contributed to a larger initiative that cut organization-wide electronic medical record costs 20%");
    expect(dialog?.textContent?.toLowerCase()).not.toContain(["functional", "beta"].join(" "));
    expect(dialog?.textContent?.toLowerCase()).not.toContain(["shipped", "consumer", "app"].join(" "));

    const close = dialog?.querySelector<HTMLButtonElement>(
      'button[aria-label="Close the 90-second tour"]',
    );
    await act(async () => close?.click());
    expect(dialog?.open).toBe(false);
  });

  it("wraps Tab and Shift+Tab inside the open recruiter panel", async () => {
    await act(async () => {
      root.render(<RecruiterPanel />);
    });
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: {} }));
    });

    const dialog = container.querySelector<HTMLDialogElement>(".recruiter-panel");
    expect(dialog?.open).toBe(true);
    const tabbables = Array.from(
      dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") || [],
    );
    const first = tabbables[0];
    const last = tabbables[tabbables.length - 1];
    expect(first?.getAttribute("aria-label")).toBe("Close the 90-second tour");
    expect(last?.textContent).toBe("espositohillary@gmail.com");

    const press = (target: Element, shiftKey: boolean) => {
      const event = new KeyboardEvent("keydown", { key: "Tab", shiftKey, bubbles: true, cancelable: true });
      target.dispatchEvent(event);
      return event.defaultPrevented;
    };

    // Tab from the last control wraps to the first.
    last.focus();
    expect(document.activeElement).toBe(last);
    expect(press(last, false)).toBe(true);
    expect(document.activeElement).toBe(first);

    // Shift+Tab from the first control wraps to the last.
    expect(press(first, true)).toBe(true);
    expect(document.activeElement).toBe(last);

    // Mid-panel Tab is left to the browser.
    tabbables[1].focus();
    expect(press(tabbables[1], false)).toBe(false);
    expect(document.activeElement).toBe(tabbables[1]);

    // Focus that has fallen to <body> is pulled back in.
    (document.activeElement as HTMLElement).blur();
    expect(document.activeElement).toBe(document.body);
    expect(press(document.body, false)).toBe(true);
    expect(document.activeElement).toBe(first);

    // Nothing is intercepted once the panel is closed.
    await act(async () => first.click());
    expect(dialog?.open).toBe(false);
    last.focus();
    expect(press(last, false)).toBe(false);
  });

  it.each([
    ["MSK", <FlagshipMSK />, "A filing queue replaced a four-department paper\u00a0detour.", "Evidence boundary"],
    ["Grove", <RisoGrove />, "Eleven features became three.", "What this evidence can say"],
    ["Mobbin", <FlagshipMobbin />, "200+ screens per app, searchable by task.", "I did not design"],
  ])("%s leads with an outcome title and visible evidence boundary", async (_name, page, title, boundary) => {
    await act(async () => {
      root.render(page);
    });

    expect(container.querySelector("h1")?.textContent).toBe(title);
    expect(container.textContent).toContain(boundary);
  });

  it("keeps MSK's workflow chapter focused on evidence instead of repeating its process", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    expect(container.textContent).toContain("One map made four departments see the same failure.");
    expect(container.querySelector(".fp-systemCards")).toBeNull();
    expect(container.textContent).toContain("Service-design scope:");
    expect(container.textContent).toContain("Observation counts do not; no prevalence claim is made.");
  });

  it("supports the Mobbin gallery and a direct next-project path", async () => {
    await act(async () => {
      root.render(<FlagshipMobbin />);
    });

    const next = container.querySelector<HTMLButtonElement>(
      'button[aria-label="Show next documented app"]',
    );
    expect(next).not.toBeNull();

    await act(async () => next?.click());
    expect(container.textContent).toContain("02 / 03");
    expect(container.textContent).toContain("Polymarket");
    const nextProject = Array.from(container.querySelectorAll<HTMLAnchorElement>("a")).find(
      (link) => link.textContent?.includes("Next case study") && link.textContent?.includes("Grove"),
    );
    expect(nextProject?.getAttribute("href")).toBe("/case-study/grove");
  });

  it("Grove system lab mounts every tab panel and toggles a real source disclosure", async () => {
    await act(async () => {
      root.render(<RisoGrove />);
    });

    // Every tab's aria-controls must resolve to a mounted panel (no dead refs).
    ["reminder", "confidence", "safety"].forEach((id) => {
      const panel = container.querySelector(`#grove-panel-${id}`);
      expect(panel).not.toBeNull();
      expect(panel?.getAttribute("role")).toBe("tabpanel");
    });

    // The "Check sources" control actually reveals a source panel (not a dead button).
    const sources = container.querySelector<HTMLElement>("#grove-id-sources");
    expect(sources).not.toBeNull();
    expect(sources?.hidden).toBe(true);

    const checkSources = Array.from(container.querySelectorAll("button")).find(
      (button) => button.textContent === "Check sources",
    );
    expect(checkSources).toBeTruthy();
    expect(checkSources?.getAttribute("aria-controls")).toBe("grove-id-sources");
    await act(async () => checkSources?.click());
    expect(sources?.hidden).toBe(false);
  });

  it("keeps Grove prototype detail optional on ordinary visits", async () => {
    await act(async () => {
      root.render(<RisoGrove />);
    });

    const details = container.querySelector<HTMLDetailsElement>("#grove-prototype");
    const heroAction = container.querySelector<HTMLAnchorElement>('a[href="#grove-prototype"]');
    expect(details).not.toBeNull();
    expect(details?.open).toBe(false);
    expect(heroAction?.textContent).toContain("Try the working browser prototype");
  });

  it("opens and focuses Grove's native prototype disclosure from a direct hash", async () => {
    window.history.replaceState(null, "", "/case-study/grove#grove-prototype");
    await act(async () => {
      root.render(<RisoGrove />);
    });
    await act(async () => {
      await new Promise((resolve) => window.setTimeout(resolve, 10));
    });

    const details = container.querySelector<HTMLDetailsElement>("#grove-prototype");
    const summary = details?.querySelector<HTMLElement>("summary");
    expect(details?.open).toBe(true);
    expect(document.activeElement).toBe(summary);
    expect(summary?.textContent).toContain("Prototype on this page · React + TypeScript · Phase 2 of 3");
  });

  it("does not insert a completion modal into the case-study reading path", async () => {
    await act(async () => {
      root.render(<FlagshipMobbin />);
    });

    expect(container.querySelector("dialog")).toBeNull();
    expect(container.textContent).not.toContain("Open the closing entry");
    expect(container.querySelector(".rp-next")).not.toBeNull();
  });

  it.each([
    ["Grove", <RisoGrove />],
    ["MSK", <FlagshipMSK />],
    ["Mobbin", <FlagshipMobbin />],
    ["Knowunity", <FlagshipKnowunity />],
    ["UX Woman", <FlagshipUxWoman />],
    ["About", <About />],
  ])("%s chapter shortcuts resolve to real sections", async (_name, page) => {
    await act(async () => {
      root.render(page);
    });

    const links = Array.from(
      container.querySelectorAll<HTMLAnchorElement>(".rp-chapters a"),
    );
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(container.querySelector(link.getAttribute("href") || "")).not.toBeNull();
    });
  });
});
