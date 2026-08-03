import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import FlagshipMSK from "./FlagshipMSK";
import FlagshipMobbin from "./FlagshipMobbin";
import RisoGrove from "./RisoGrove";
import RisoHome from "../RisoHome";
import About from "../AboutMe";
import NotFoundPage from "../NotFoundPage";
import CuratedRolePage from "../curated/CuratedRolePage";
import FashionCampaignSystem from "../curated/FashionCampaignSystem";
import Footer from "../../components/Footer";
import RecruiterPill from "../../components/RecruiterPill";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props}>{children}</a>
  ),
  Navigate: () => null,
  useLocation: () => ({ pathname: "/", search: "" }),
  useNavigate: () => jest.fn(),
  useParams: () => ({ slug: "meta-instagram-product-designer" }),
}), { virtual: true });

jest.mock("../../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: "en" }),
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
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it.each([
    ["MSK", <FlagshipMSK />],
    ["Mobbin", <FlagshipMobbin />],
    ["Grove", <RisoGrove />],
    ["Home", <RisoHome />],
    ["About", <About />],
    ["404 recovery", <NotFoundPage />],
    ["Curated role", <CuratedRolePage />],
    ["Fashion campaign", <FashionCampaignSystem />],
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

  it("keeps the active homepage shell targets and mobile recruiter shortcut intact", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    ["home", "projects", "about", "contact"].forEach((id) => {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
    expect(container.querySelector(".rp-recruiter-link")).not.toBeNull();
  });

  it.each([
    [
      "Grove",
      <RisoGrove />,
      "Grove decision trace",
      "Functional prototype · Phase 2 of 3",
      "one calm morning summary",
      "#grove-override",
    ],
    [
      "Mobbin",
      <FlagshipMobbin />,
      "Mobbin flow documentation",
      "Hillary documented the flows",
      "A screenshot is not a flow",
      "#mobbin-work",
    ],
  ])(
    "%s includes one accessible first-scroll evidence poster",
    async (_name, page, heading, qualifier, decision, href) => {
      await act(async () => {
        root.render(page);
      });

      expect(container.querySelectorAll(".evidence-media")).toHaveLength(1);
      const section = container.querySelector<HTMLElement>(".evidence-media-section");
      expect(section).not.toBeNull();
      const labelledBy = section?.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();
      expect(container.querySelector(`#${labelledBy}`)?.textContent).toContain(heading);
      expect(section?.textContent?.toLowerCase()).toContain(String(qualifier).toLowerCase());
      expect(section?.textContent?.toLowerCase()).toContain(String(decision).toLowerCase());
      expect(section?.querySelector(`a[href="${href}"]`)).not.toBeNull();

      const sourceImages = Array.from(section?.querySelectorAll("img") || []);
      sourceImages.forEach((image) => expect(image.getAttribute("alt")).toBe(""));
    },
  );

  // MSK is deliberately the exception. Its poster restated the before/after
  // that the workflow map draws further down, a full screen before the reader
  // had the problem, so it was removed. Asserted rather than merely absent so
  // the removal cannot be undone by accident.
  it("MSK carries no evidence poster — the workflow map is the artifact", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    expect(container.querySelectorAll(".evidence-media")).toHaveLength(0);
    expect(container.querySelector(".evidence-media-section")).toBeNull();
    expect(container.querySelector(".fp-workflowFig")).not.toBeNull();
  });

  it("keeps Grove motion optional, truthful, and controllable", async () => {
    const play = jest
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);
    const pause = jest
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => undefined);

    await act(async () => {
      root.render(<RisoGrove />);
    });

    const film = container.querySelector<HTMLElement>(".grove-decision-film");
    expect(film).not.toBeNull();
    expect(film?.querySelector("video")).toBeNull();
    expect(film?.textContent).toContain("A survey of 34 plant owners");
    expect(film?.textContent).toContain("No finished redesign screen is shown");

    const start = film?.querySelector<HTMLButtonElement>("button");
    expect(start?.textContent).toContain("Play Grove decision trace · 7.8 sec");
    await act(async () => start?.click());

    const video = film?.querySelector<HTMLVideoElement>("video");
    expect(play).toHaveBeenCalledTimes(1);
    expect(video?.autoplay).toBe(false);
    expect(video?.loop).toBe(false);
    expect(video?.controls).toBe(true);
    expect(video?.preload).toBe("metadata");
    expect(video?.querySelectorAll("source")).toHaveLength(4);
    expect(video?.querySelectorAll('source[media="(max-width: 42rem)"]')).toHaveLength(2);
    expect(video?.querySelector('track[kind="captions"][default]')).not.toBeNull();

    await act(async () => video?.dispatchEvent(new Event("play", { bubbles: true })));
    let control = film?.querySelector<HTMLButtonElement>(".grove-decision-film__controls button");
    expect(control?.textContent).toContain("Pause Grove decision trace");
    await act(async () => control?.click());
    expect(pause).toHaveBeenCalledTimes(1);

    await act(async () => video?.dispatchEvent(new Event("pause", { bubbles: true })));
    expect(film?.querySelector(".grove-decision-film__status")?.textContent).toBe("Paused");

    await act(async () => video?.dispatchEvent(new Event("ended", { bubbles: true })));
    control = film?.querySelector<HTMLButtonElement>(".grove-decision-film__controls button");
    expect(control?.textContent).toContain("Replay Grove decision trace");
    await act(async () => control?.click());
    expect(play).toHaveBeenCalledTimes(2);

    await act(async () => video?.dispatchEvent(new Event("error", { bubbles: true })));
    expect(film?.textContent).toContain("Motion version unavailable");

    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    expect(results.violations).toEqual([]);

    play.mockRestore();
    pause.mockRestore();
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

  it("keeps painted cartography editorial rather than navigational", async () => {
    await act(async () => {
      root.render(<RisoHome />);
    });

    const field = container.querySelector<HTMLElement>(".carto--painted");
    expect(field).not.toBeNull();
    expect(field?.querySelector(".carto__map--paint")).not.toBeNull();
    expect(field?.querySelector(".carto__compass")).toBeNull();
    expect(field?.querySelector(".carto__scale")).toBeNull();
    expect(field?.querySelector(".carto__grid")).toBeNull();
    expect(field?.querySelector(".carto__routeline")).toBeNull();
    expect(field?.querySelector(".carto__pin")).toBeNull();

    await act(async () => {
      root.render(<RisoGrove />);
    });
    expect(container.textContent).toContain("The rebuild");
    expect(container.textContent).toContain("Four decisions, from AI-built to trustworthy");
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
    expect(dialog?.textContent).toContain("MSK Cancer Center");
    expect(dialog?.textContent).toContain("Mobbin");

    const close = dialog?.querySelector<HTMLButtonElement>(
      'button[aria-label="Close recruiter view"]',
    );
    await act(async () => close?.click());
    expect(dialog?.open).toBe(false);
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
    ["Curated role", <CuratedRolePage />],
    ["Fashion campaign", <FashionCampaignSystem />],
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
