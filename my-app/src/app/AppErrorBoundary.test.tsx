import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react";
import AppErrorBoundary from "./AppErrorBoundary";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function Boom(): React.ReactElement {
  throw new Error("render failed");
}

describe("AppErrorBoundary", () => {
  let container: HTMLDivElement;
  let root: Root;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    errorSpy.mockRestore();
    localStorage.clear();
  });

  it("names the fault and offers reload, selected work, and email in English", async () => {
    await act(async () => {
      root.render(<AppErrorBoundary><Boom /></AppErrorBoundary>);
    });
    expect(container.querySelector("h1")?.textContent).toBe("This page did not load.");
    expect(container.querySelector("button")?.textContent).toBe("Reload page");
    expect(container.querySelector('a[href="/?scrollTo=projects"]')).not.toBeNull();
    expect(container.querySelector('a[href^="mailto:"]')).not.toBeNull();
  });

  it("reads the stored language, since it sits above the language provider", async () => {
    localStorage.setItem("lang", "es");
    await act(async () => {
      root.render(<AppErrorBoundary><Boom /></AppErrorBoundary>);
    });
    expect(container.querySelector("h1")?.textContent).toBe("Esta página no se cargó.");
    expect(container.querySelector("main")?.getAttribute("lang")).toBe("es");
  });
});
