import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import { ScrollToTop } from "./AppRoutes";

let mockLocation = { pathname: "/", search: "", hash: "", key: "first" };

jest.mock(
  "react-router-dom",
  () => {
    const ReactLib = require("react");
    const passthrough = ({ children }: { children?: React.ReactNode }) =>
      ReactLib.createElement(ReactLib.Fragment, null, children);
    return {
      Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) =>
        ReactLib.createElement("a", { href: to, ...props }, children),
      NavLink: ({ to, children, ...props }: { to: string; children: React.ReactNode }) =>
        ReactLib.createElement("a", { href: to, ...props }, children),
      Navigate: () => null,
      Routes: passthrough,
      Route: () => null,
      useLocation: () => mockLocation,
      useNavigationType: () => "POP",
      useNavigate: () => jest.fn(),
      useParams: () => ({}),
      useSearchParams: () => [new URLSearchParams(), jest.fn()],
    };
  },
  { virtual: true }
);

let container: HTMLDivElement;
let root: Root;
const visit = (path: string) => {
  const url = new URL(path, "https://example.test");
  mockLocation = { pathname: url.pathname, search: url.search, hash: url.hash, key: "first" };
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(<ScrollToTop />);
  });
};

describe("ScrollToTop reading-position restore", () => {
  let scrollTo: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    window.sessionStorage.clear();
    scrollTo = jest.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    scrollTo.mockRestore();
    jest.useRealTimers();
  });

  const restoredTops = () =>
    scrollTo.mock.calls
      .map(([arg]) => (typeof arg === "object" && arg ? (arg as ScrollToOptions).top : undefined))
      .filter((top) => top !== undefined);

  it("puts a reloaded page back at the saved position", () => {
    window.sessionStorage.setItem("portfolio-scroll:/case-study/msk", "5000");
    visit("/case-study/msk");
    expect(restoredTops()).toContain(5000);
  });

  it("lets a hash deep link win over the saved position", () => {
    window.sessionStorage.setItem("portfolio-scroll:/case-study/msk", "5000");
    visit("/case-study/msk#msk-outcomes");
    expect(restoredTops()).not.toContain(5000);
  });

  it("does not restore when ?scrollTo= asks for a section", () => {
    window.sessionStorage.setItem("portfolio-scroll:/", "1800");
    visit("/?scrollTo=projects");
    expect(restoredTops()).not.toContain(1800);
  });

  it("starts a first visit with nothing saved at the top without forcing a scroll", () => {
    visit("/case-study/msk");
    expect(restoredTops()).toEqual([]);
  });
});
