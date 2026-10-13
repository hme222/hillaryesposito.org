import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import AppRoutes from "./AppRoutes";

// Renders only the route under test: Route returns its element when its path
// matches, so this exercises the real lazy import and LazyPage boundary.
const mockPath = "/case-study/knowunity";

jest.mock(
  "react-router-dom",
  () => {
    const ReactLib = require("react");
    return {
      Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) =>
        ReactLib.createElement("a", { href: to, ...props }, children),
      Navigate: () => null,
      Routes: ({ children }: { children?: React.ReactNode }) => ReactLib.createElement(ReactLib.Fragment, null, children),
      Route: ({ path, element }: { path: string; element: React.ReactNode }) => (path === mockPath ? element : null),
      useLocation: () => ({ pathname: mockPath, search: "", hash: "", key: "k" }),
      useNavigationType: () => "PUSH",
      useNavigate: () => jest.fn(),
    };
  },
  { virtual: true }
);

jest.mock("./LanguageContext", () => ({
  useLanguage: () => ({ lang: "en", setLang: jest.fn() }),
  useT: () => (key: string) => key,
  switchLanguageAtCurrentSection: jest.fn(),
}));

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("AppRoutes", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "IntersectionObserver", { configurable: true, value: ObserverStub });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
    jest.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  });

  it("renders the Knowunity case study at /case-study/knowunity", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => {
      root.render(<AppRoutes />);
    });
    for (let i = 0; i < 20 && !container.querySelector("h1"); i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 25));
      });
    }
    expect(container.querySelector("h1")?.textContent).toContain("own words are the");
    expect(container.querySelector(".flagship-page--knowunity")).not.toBeNull();
    act(() => root.unmount());
    container.remove();
  });
});
