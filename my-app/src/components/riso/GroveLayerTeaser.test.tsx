import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import GroveLayerTeaser from "./GroveLayerTeaser";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>{children}</a>
  ),
}), { virtual: true });

jest.mock("../../app/LanguageContext", () => ({
  useT: () => (key: string) => ({
    "home.layerTeaser.kicker": "Grove material study",
    "home.layerTeaser.title": "The atmosphere moves. The evidence does not.",
    "home.layerTeaser.body": "A generated paper study resolves around one real Grove screen.",
    "home.layerTeaser.link": "See the decisions behind the screen",
    "home.layerTeaser.pause": "Pause material study",
    "home.layerTeaser.replay": "Replay material study",
    "home.layerTeaser.play": "Play material study",
    "home.layerTeaser.caption": "Generated atmosphere; authentic Grove interface.",
    "home.riso.groveAlt": "Grove welcome screen",
  }[key] ?? key),
}));

describe("Grove layer teaser", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
    });
    Object.defineProperty(navigator, "connection", { configurable: true, value: undefined });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("shows the complete protected-evidence state without motion", async () => {
    await act(async () => root.render(<GroveLayerTeaser />));
    expect(container.querySelector(".rp-layerTeaser__figure")?.classList.contains("is-static")).toBe(true);
    expect(container.querySelector(".rp-layerTeaser__evidence")?.classList.contains("is-visible")).toBe(true);
    expect(container.querySelector(".rp-layerTeaser__control")).toBeNull();
    expect(container.querySelector<HTMLImageElement>('.rp-layerTeaser__evidence img')?.src).toContain("/assets/grove/grove1.png");
    expect(container.querySelector<HTMLAnchorElement>('a[href="/case-study/grove"]')).not.toBeNull();
  });

  it("has no detectable structural accessibility violations", async () => {
    await act(async () => root.render(<GroveLayerTeaser />));
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations).toEqual([]);
  });
});
