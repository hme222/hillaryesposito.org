import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import Footer from "./Footer";

let mockPathname = "/";
const mockNavigate = jest.fn();

jest.mock(
  "react-router-dom",
  () => {
    const ReactLib = require("react");
    return {
      Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) =>
        ReactLib.createElement("a", { href: to, ...props }, children),
      useLocation: () => ({ pathname: mockPathname }),
      useNavigate: () => mockNavigate,
    };
  },
  { virtual: true }
);

jest.mock("../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: "en" }),
  useT: () => (key: string) => key,
}));

describe("Footer", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    mockPathname = "/";
    mockNavigate.mockReset();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("shows the email address as a link with a Copy button, and a résumé PDF link that opens in a new tab", async () => {
    await act(async () => {
      root.render(<Footer />);
    });

    const emails = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href="mailto:espositohillary@gmail.com"]')
    ).map((a) => a.textContent);
    expect(emails).toEqual(["espositohillary@gmail.com"]);
    expect(Array.from(container.querySelectorAll("button")).map((b) => b.textContent)).toContain("Copy");

    const resume = container.querySelector<HTMLAnchorElement>(
      'a[href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"]'
    );
    expect(resume).not.toBeNull();
    expect(resume?.textContent).toBe("nav.resume");
    expect(resume?.getAttribute("target")).toBe("_blank");
    expect(resume?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(resume?.getAttribute("aria-label")).toBe("nav.resumeAria");
  });

  // Production (vercel.json: "trailingSlash": true) serves every route with
  // a trailing slash - both the compact-footer check and the per-route
  // colophon lookup compare against the raw pathname, so a direct load or
  // refresh on a trailing-slash URL used to miss both.
  it("normalises a trailing slash for the compact footer", async () => {
    mockPathname = "/about/";
    await act(async () => {
      root.render(<Footer />);
    });
    const footer = container.querySelector("footer");
    expect(footer?.classList.contains("site-footer--compact")).toBe(true);
  });

  it("shows no per-case credits line", async () => {
    await act(async () => {
      root.render(<Footer />);
    });
    expect(container.querySelector(".site-footer__madeWith")).toBeNull();
  });

  it("has no opening-film replay button", async () => {
    await act(async () => {
      root.render(<Footer />);
    });
    expect(container.querySelector(".rp-openingVisualTrigger")).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
