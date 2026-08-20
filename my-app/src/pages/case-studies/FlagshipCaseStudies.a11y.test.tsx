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

let mockCuratedSlug = "meta-instagram-product-designer";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props}>{children}</a>
  ),
  Navigate: () => null,
  useLocation: () => ({ pathname: "/", search: "" }),
  useNavigate: () => jest.fn(),
  useParams: () => ({ slug: mockCuratedSlug }),
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
    mockCuratedSlug = "meta-instagram-product-designer";
    window.history.replaceState(null, "", "/");
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

  it("keeps the weekend journal quiet until a keyboard or touch user opens it", async () => {
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

    await act(async () => {
      toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(toggle?.getAttribute("aria-expanded")).toBe("true");
    expect(panel?.hidden).toBe(false);
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

  // The workflow map is MSK's first-scroll artifact now that the poster is gone.
  it("MSK leads with the workflow map as its artifact", async () => {
    await act(async () => {
      root.render(<FlagshipMSK />);
    });

    expect(container.querySelector(".fp-workflowFig")).not.toBeNull();
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

  it("gives Supabase a proof-first recruiter path with role-specific actions", async () => {
    mockCuratedSlug = "supabase-product-designer";
    window.history.replaceState(null, "", "/curated/supabase-product-designer");

    await act(async () => {
      root.render(<CuratedRolePage />);
    });

    expect(container.querySelector("h1")?.textContent).toBe("Supabase");
    expect(container.textContent).toContain("Built a working React prototype");
    expect(container.textContent).toContain("Phase 2 of 3");

    const proof = container.querySelector("#curated-proof");
    const work = container.querySelector("#curated-work");
    const fit = container.querySelector("#curated-fit");
    expect(proof).not.toBeNull();
    expect(work).not.toBeNull();
    expect(fit).not.toBeNull();
    expect(proof!.compareDocumentPosition(work!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(work!.compareDocumentPosition(fit!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    [proof, work, fit].forEach((section) => {
      expect((section as HTMLElement).style.scrollMarginTop).toBe("9.5rem");
    });
    expect(container.textContent).toContain("Numbers in context");
    expect(container.textContent).toContain("11 → 3 features");
    expect(container.textContent).not.toContain("34 → 11 → 3");

    const chapterLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>(".rp-chapters a"),
      (link) => link.textContent,
    );
    expect(chapterLinks).toEqual(["Proof", "Work", "Fit"]);

    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("a"));
    expect(links.find((link) => link.textContent?.includes("Review Grove"))?.getAttribute("href"))
      .toBe("/case-study/grove");
    const resumeLink = links.find((link) => link.textContent?.includes("View Supabase résumé"));
    expect(resumeLink?.getAttribute("href"))
      .toBe("/assets/Hillary_Esposito_Supabase_Product_Designer_Resume.pdf");
    expect(resumeLink?.getAttribute("aria-label"))
      .toBe("View Supabase résumé (PDF, opens in new tab)");
    expect(links.find((link) => link.textContent?.includes("Email Hillary"))?.getAttribute("href"))
      .toBe("mailto:espositohillary@gmail.com");
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content"))
      .toBe("noindex, nofollow, noarchive");

    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  });

  it("keeps existing curated pages on their current fit-first path", async () => {
    await act(async () => {
      root.render(<CuratedRolePage />);
    });

    const fit = container.querySelector("#curated-fit");
    const proof = container.querySelector("#curated-proof");
    expect(fit!.compareDocumentPosition(proof!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(container.textContent).toContain("See the fit");
    expect(container.textContent).toContain("View a case study");
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
    expect(container.textContent).toContain("Four decisions, from AI-built to worth keeping");
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
