import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import FlagshipMSK from "./FlagshipMSK";
import FlagshipMobbin from "./FlagshipMobbin";
import FlagshipLogistics from "./FlagshipLogistics";
import RisoGrove from "./RisoGrove";
import RisoHome from "../RisoHome";
import About from "../AboutMe";
import NotFoundPage from "../NotFoundPage";
import Footer from "../../components/Footer";
import RecruiterPill from "../../components/RecruiterPill";

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
    ["Grove", <RisoGrove />],
    ["Home", <RisoHome />],
    ["About", <About />],
    ["404 recovery", <NotFoundPage />],
    ["Global footer", <Footer />],
    ["Recruiter entry point", <RecruiterPill />],
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

  it("keeps the MSK teaser decorative while exact workflow evidence remains adjacent", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    const detour = container.querySelector("[data-testid='msk-the-detour']");
    const exactSteps = container.querySelector(".fp-workflow[data-evidence='true']");

    expect(detour).not.toBeNull();
    expect(detour?.querySelector(".fp-detour__stage")?.getAttribute("aria-hidden")).toBe("true");
    expect(detour?.textContent).toContain("Ready to send");
    expect(detour?.textContent).toContain("Send to EMR");
    expect(detour?.textContent).toContain("Filed · status updated");
    expect(detour?.textContent).toContain("The “simple” button");
    expect(detour?.textContent).not.toContain("Office Coordinator filing queue");
    expect(detour?.textContent).not.toContain("Signed consent");
    expect(container.querySelector(".fp-workflowFilm")).toBeNull();
    expect(container.querySelector(".fp-workflowFilm video")).toBeNull();
    expect(exactSteps?.textContent).toContain("Print the digital record");
    expect(exactSteps?.textContent).toContain("Choose Send to EMR");
  });

  it("states the MSK proposal-to-implementation boundary before outcome metrics", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    const hero = container.querySelector("#msk-start");
    expect(hero?.textContent).toContain("IT and UX implemented it after I changed roles");
    expect(hero?.textContent).toContain("Diagnose · map · validate feasibility · pitch");
    expect(hero?.textContent).not.toContain("20%");
    expect(hero?.textContent).not.toContain("two system upgrades");
    expect(container.textContent).toContain("not attributed solely to this filing workflow");
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
      expect(label.textContent).toBe("Direction to test");
    });
  });

  it("ties each logistics result to its mechanism and owner-reported source", async () => {
    await act(async () => {
      root.render(<FlagshipLogistics />);
    });

    const hero = container.querySelector("#log-start");
    expect(hero?.textContent).toContain("1–2 months to 1–2 weeks");
    expect(hero?.textContent).toContain("owner-reported service record");
    expect(container.textContent).toContain("measurement periods and methods are not preserved");
    expect(container.textContent).toContain("Relocation85%");
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

  it("adds Knowunity as an equal evidence row using the public prototype alias", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    const rows = Array.from(container.querySelectorAll<HTMLAnchorElement>(".rp-work"));
    expect(rows).toHaveLength(4);

    const prototype = rows.find((link) => link.href === "https://knowunity-voice-recall.vercel.app/");
    expect(prototype?.getAttribute("target")).toBe("_blank");
    expect(prototype?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(prototype?.getAttribute("aria-label")).toBe("home.riso.knowunityPrototypeAria");
    expect(prototype?.textContent).toContain("home.riso.knowunityDesc");
    expect(prototype?.querySelectorAll(".rp-work__thumb--knowunity img")).toHaveLength(2);

    const system = container.querySelector<HTMLAnchorElement>(
      '.rp-work__teaser[href*="chromatic.com/?path=/docs/components-appbar--docs"]',
    );
    expect(system?.getAttribute("target")).toBe("_blank");
    expect(system?.getAttribute("aria-label")).toBe("home.riso.knowunitySystemAria");
    expect(container.innerHTML).not.toContain("knowunity-voice-recall-o2c9s7oro");
    expect(container.innerHTML).not.toContain("vercel.com/hillary-esposito-s-projects");
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

  it("keeps the weekend journal quiet until a keyboard or touch user opens it", async () => {
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
      "/assets/video/weekend-journal-riso-train-v1.mp4",
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

  // Owner rejected both the generated workflow film and static registered peel,
  // then approved the no-credit, user-controlled "The Detour" animatic. The
  // ordered lists remain the evidence; the stage is only a visual hook.
  it("MSK uses the user-controlled Detour animatic without generated media", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    expect(container.querySelector(".fp-workflowFilm")).toBeNull();
    expect(container.querySelector(".fp-routingPeelFig")).toBeNull();
    expect(container.querySelector("[data-testid='msk-the-detour']")).not.toBeNull();
    expect(container.querySelector("[data-testid='msk-the-detour'] video")).toBeNull();
    expect(container.querySelector("button[aria-label^='Play The Detour']")).not.toBeNull();
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
    expect(container.textContent).toContain("Warehouse moved forward · 85% shorter resupply time");

    const openingTrigger = container.querySelector<HTMLButtonElement>(".rp-openingVisualTrigger");
    await act(async () => openingTrigger?.click());

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
    expect(container.textContent).toContain("Inspect all six authentic first-build screens");
    expect(container.textContent).not.toContain("Walk the route");
  });

  it("opens a complete, dismissible recruiter scan path", async () => {
    await act(async () => {
      root.render(<RecruiterPill />);
    });

    const trigger = container.querySelector<HTMLButtonElement>(".recruiter-pill");
    expect(trigger).not.toBeNull();
    await act(async () => trigger?.click());

    const dialog = container.querySelector<HTMLDialogElement>(".recruiter-panel");
    expect(dialog?.open).toBe(true);
    expect(dialog?.textContent).toContain("Grove");
    expect(dialog?.textContent).toContain("MSK · A filing queue replaced a four-department paper detour");
    expect(dialog?.textContent).toContain("Medical logistics · Resupply time reduced 85%");

    const projectTitles = Array.from(
      dialog?.querySelectorAll<HTMLButtonElement>(".recruiter-panel__project strong") || [],
      (item) => item.textContent,
    );
    expect(projectTitles).toEqual([
      "MSK · A filing queue replaced a four-department paper detour",
      "Medical logistics · Resupply time reduced 85%",
      "Grove · Eleven features became three",
    ]);
    expect(dialog?.textContent).toContain("contributed to a larger initiative that cut organization-wide electronic medical record costs 20%");
    expect(dialog?.textContent?.toLowerCase()).not.toContain(["functional", "beta"].join(" "));
    expect(dialog?.textContent?.toLowerCase()).not.toContain(["shipped", "consumer", "app"].join(" "));

    const close = dialog?.querySelector<HTMLButtonElement>(
      'button[aria-label="Close recruiter view"]',
    );
    await act(async () => close?.click());
    expect(dialog?.open).toBe(false);
  });

  it("wraps Tab and Shift+Tab inside the open recruiter panel", async () => {
    await act(async () => {
      root.render(<RecruiterPill />);
    });
    const trigger = container.querySelector<HTMLButtonElement>(".recruiter-pill");
    await act(async () => trigger?.click());

    const dialog = container.querySelector<HTMLDialogElement>(".recruiter-panel");
    expect(dialog?.open).toBe(true);
    const tabbables = Array.from(
      dialog?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") || [],
    );
    const first = tabbables[0];
    const last = tabbables[tabbables.length - 1];
    expect(first?.getAttribute("aria-label")).toBe("Close recruiter view");
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
