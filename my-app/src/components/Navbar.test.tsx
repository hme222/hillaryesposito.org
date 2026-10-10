import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import Navbar from "./Navbar";

let mockPathname = "/";
const mockNavigate = jest.fn();

// `virtual: true` because this environment's Jest fails to resolve the real
// "react-router-dom" package (pre-existing, reproduces on a clean checkout
// with no code changes - see the same note in AskBirdNav.test.tsx). Link is
// stubbed as a plain anchor, matching FlagshipCaseStudies.a11y.test.tsx's
// precedent.
jest.mock(
  "react-router-dom",
  () => {
    // `require`, not the top-level `React` import: the jest.mock factory is
    // hoisted above imports and may not reference out-of-scope variables.
    const ReactLib = require("react");
    return {
      Link: ReactLib.forwardRef(
        (
          { to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string },
          ref: React.Ref<HTMLAnchorElement>
        ) => ReactLib.createElement("a", { ref, href: to, ...props }, children)
      ),
      useLocation: () => ({ pathname: mockPathname }),
      useNavigate: () => mockNavigate,
    };
  },
  { virtual: true }
);

// Covers NavSettingsPopover's imports too (same absolute module).
jest.mock("../app/LanguageContext", () => ({
  useT: () => (key: string) => key,
  useLanguage: () => ({ lang: "en", setLang: jest.fn() }),
  switchLanguageAtCurrentSection: jest.fn(),
}));

describe("Navbar (printed route dock)", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
  });

  beforeEach(() => {
    mockPathname = "/";
    mockNavigate.mockClear();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  async function render() {
    await act(async () => {
      root.render(<Navbar darkMode={false} setDarkMode={() => {}} />);
    });
  }

  it("renders no hamburger and no off-canvas menu at any width", async () => {
    await render();
    expect(container.querySelector(".hamburger")).toBeNull();
    expect(container.querySelector(".nav-menu")).toBeNull();
    expect(container.querySelector('[aria-label="nav.menuOpen"]')).toBeNull();
  });

  it("renders the dock items in tab order: Home, Work, About, Ask, Settings", async () => {
    await render();
    const items = Array.from(container.querySelectorAll(".nav-dock__items > li"));
    expect(items).toHaveLength(5);
    expect(items[0].querySelector(".nav-dock__item--home")).not.toBeNull();
    expect(items[1].querySelector("button")?.textContent).toBe("nav.dockWork");
    expect(items[2].querySelector("a")?.getAttribute("href")).toBe("/about");
    expect(items[2].querySelector("a")?.textContent).toBe("nav.dockAbout");
    expect(items[3].querySelector(".ask-bird-nav")).not.toBeNull();
    expect(items[4].querySelector(".nav-dock__item--settings")).not.toBeNull();
  });

  it("has no résumé, contact, recruiter, or back-to-top items", async () => {
    await render();
    expect(container.textContent).not.toContain("Résumé");
    expect(container.querySelector(".nav-link--resume")).toBeNull();
    expect(container.querySelector(".nav-recruiter-entry")).toBeNull();
    expect(container.querySelector(".nav-back-to-top-entry")).toBeNull();
  });

  it("hides the printed route marker when nothing is active", async () => {
    mockPathname = "/some-other-route";
    await render();
    const marker = container.querySelector<HTMLElement>(".nav-dock__marker");
    expect(marker?.style.opacity).toBe("0");
  });

  it("shows the marker on the About item when on /about", async () => {
    mockPathname = "/about";
    await render();
    const marker = container.querySelector<HTMLElement>(".nav-dock__marker");
    expect(marker?.style.opacity).toBe("1");
    const aboutLink = container.querySelector('a[href="/about"]');
    expect(aboutLink?.getAttribute("aria-current")).toBe("page");
  });

  it("shows the marker on Work for a case-study route", async () => {
    mockPathname = "/case-study/msk";
    await render();
    const marker = container.querySelector<HTMLElement>(".nav-dock__marker");
    expect(marker?.style.opacity).toBe("1");
    const workButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "nav.dockWork"
    );
    expect(workButton?.getAttribute("aria-current")).toBe("true");
  });

  it("shows the marker on About for a trailing-slash /about/ URL (production serves every route this way)", async () => {
    mockPathname = "/about/";
    await render();
    const marker = container.querySelector<HTMLElement>(".nav-dock__marker");
    expect(marker?.style.opacity).toBe("1");
    const aboutLink = container.querySelector('a[href="/about"]');
    expect(aboutLink?.getAttribute("aria-current")).toBe("page");
  });

  it("Work navigates with ?scrollTo=projects from a non-home route", async () => {
    mockPathname = "/about";
    await render();
    const workButton = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "nav.dockWork"
    );
    await act(async () => workButton?.click());
    expect(mockNavigate).toHaveBeenCalledWith("/?scrollTo=projects");
  });

  it("the Home item navigates to / and has no visible name text", async () => {
    mockPathname = "/about";
    await render();
    const home = container.querySelector<HTMLButtonElement>(".nav-dock__item--home");
    expect(home?.getAttribute("aria-label")).toBe("nav.logoAria");
    expect(home?.textContent?.trim()).toBe("");
    await act(async () => home?.click());
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
