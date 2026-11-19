import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";
import AboutMe from "./AboutMe";

describe("About page", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });
  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => { root.render(<AboutMe />); });
  });
  afterEach(async () => {
    await act(async () => { root.unmount(); });
    container.remove();
  });

  const shownPhoto = () => Array.from(container.querySelectorAll(".about-stage__frame img")).findIndex((i) => i.classList.contains("is-on"));
  const shownCaption = () => container.querySelector(".about-stage__caption.is-on")?.textContent;
  const hover = async (kind: string) => {
    const el = container.querySelector(`[data-cue="${kind}"]`)!;
    await act(async () => { el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true })); });
  };

  it("keeps the headline as one readable line with the name as a cue", () => {
    const h1 = container.querySelector("h1")!;
    expect(h1.textContent).toBe("Hi, I'm Hillary.");
    expect(h1.querySelector('[data-cue="me"]')?.getAttribute("aria-label")).toBe("Hillary");
  });

  it("names each moving word for assistive tech and hides its letters", () => {
    ["cook", "plant", "luna"].forEach((kind) => {
      const cue = container.querySelector(`[data-cue="${kind}"]`)!;
      expect(cue.getAttribute("aria-label")).toBeTruthy();
      cue.querySelectorAll(".about-stage__ch").forEach((ch) => expect(ch.getAttribute("aria-hidden")).toBe("true"));
    });
  });

  it("shows the matching photo and Hillary's own caption when a word is hovered", async () => {
    await hover("luna");
    expect(shownPhoto()).toBe(1);
    expect(shownCaption()).toBe("Luna, my precious baby.");
    await hover("plant");
    expect(shownCaption()).toBe("Two orchids rescued and brought back to life.");
    await hover("cook");
    expect(shownCaption()).toBe("My prosciutto appetizer: mozzarella, tomato, balsamic glaze and a honey drizzle.");
  });

  it("widens the frame for the landscape race photo so it is never cropped", async () => {
    expect(container.querySelector(".about-stage__frame")!.classList.contains("is-wide")).toBe(false);
    await hover("run");
    expect(shownPhoto()).toBe(3);
    expect(shownCaption()).toBe("10 half marathons, then one full: 26.2.");
    expect(container.querySelector(".about-stage__frame")!.classList.contains("is-wide")).toBe(true);
  });

  it("keeps every caption in the page so the area never changes height, but exposes only the current one", () => {
    const captions = Array.from(container.querySelectorAll(".about-stage__caption"));
    expect(captions).toHaveLength(5);
    expect(captions.filter((c) => c.getAttribute("aria-hidden") !== "true")).toHaveLength(1);
  });

  it("can pause the photo loop and step through photos", async () => {
    const pause = container.querySelector<HTMLButtonElement>('.about-stage__controls button[aria-label*="Pause"]')!;
    await act(async () => { pause.click(); });
    expect(container.querySelector('.about-stage__controls button[aria-label*="Play"]')).not.toBeNull();
    const next = container.querySelector<HTMLButtonElement>('.about-stage__controls button[aria-label="Next photo"]')!;
    await act(async () => { next.click(); });
    expect(shownPhoto()).toBe(1);
  });

  it("replays the name's weight motion on every click and shows the headshot", async () => {
    const name = container.querySelector<HTMLButtonElement>('[data-cue="me"]')!;
    const seen: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      await act(async () => { name.click(); });
      seen.push(name.dataset.settle ?? "");
    }
    // Alternating values restart the CSS animation each time.
    expect(seen).toEqual(["b", "a", "b"]);
    expect(shownPhoto()).toBe(0);
  });

  it("gives the photo controls names, a progress readout for screen readers, and one coral dot", () => {
    const group = container.querySelector(".about-stage__controls")!;
    expect(group.getAttribute("role")).toBe("group");
    expect(group.textContent).toContain("Photo 1 of 5");
    expect(group.querySelectorAll(".about-stage__dots i")).toHaveLength(5);
    expect(group.querySelectorAll(".about-stage__dots i.is-on")).toHaveLength(1);
  });

  it("has only one photo with alt text at a time", () => {
    const withAlt = Array.from(container.querySelectorAll(".about-stage__frame img")).filter((i) => i.getAttribute("alt"));
    expect(withAlt).toHaveLength(1);
  });
});
