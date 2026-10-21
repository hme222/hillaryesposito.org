import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import Term, { glossTerms } from "./Term";

describe("Term", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
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

  const render = async (node: React.ReactNode) => {
    await act(async () => root.render(node));
    const trigger = container.querySelector<HTMLButtonElement>(".term__trigger");
    const tip = container.querySelector<HTMLElement>(".term__tip");
    return { trigger: trigger!, tip: tip! };
  };

  it("exposes the definition as the trigger's description without opening it", async () => {
    const { trigger, tip } = await render(<p>Built by <Term def="Information technology.">IT</Term>.</p>);
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.textContent).toBe("IT");
    expect(trigger.getAttribute("aria-describedby")).toBe(tip.id);
    expect(tip.getAttribute("role")).toBe("tooltip");
    expect(tip.textContent).toBe("Information technology.");
    expect(tip.dataset.open).toBe("false");
  });

  it("opens on keyboard focus and closes on Escape", async () => {
    const { trigger, tip } = await render(<Term def="Electronic medical record.">EMR</Term>);
    await act(async () => trigger.focus());
    expect(tip.dataset.open).toBe("true");
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(tip.dataset.open).toBe("false");
  });

  it("toggles on tap or click, and closes on a tap elsewhere", async () => {
    const { trigger, tip } = await render(<Term def="Health information management.">HIM</Term>);
    await act(async () => trigger.click());
    expect(tip.dataset.open).toBe("true");
    await act(async () => {
      document.body.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    });
    // jsdom treats any focus as keyboard focus, so blur first to isolate the pin.
    await act(async () => trigger.blur());
    expect(tip.dataset.open).toBe("false");
  });

  it("glosses only the first occurrence of each term in a string", async () => {
    await act(async () => {
      root.render(<p>{glossTerms("IT and UX built it. IT stayed.", { IT: "Information technology.", UX: "User experience." })}</p>);
    });
    const triggers = Array.from(container.querySelectorAll(".term__trigger"), (el) => el.textContent);
    expect(triggers).toEqual(["IT", "UX"]);
    const visible = container.cloneNode(true) as HTMLElement;
    visible.querySelectorAll(".term__tip").forEach((tip) => tip.remove());
    expect(visible.textContent).toBe("IT and UX built it. IT stayed.");
  });

  it("does not match a term inside a longer word", async () => {
    await act(async () => {
      root.render(<p>{glossTerms("Bilingual EN/ES", { IT: "Information technology." })}</p>);
    });
    expect(container.querySelector(".term__trigger")).toBeNull();
  });
});

describe("Term tabStop", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
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

  it("keeps a term in the Tab order by default and out of it when tabStop is false", async () => {
    await act(async () => root.render(<p><Term def="One.">A</Term> <Term def="Two." tabStop={false}>B</Term></p>));
    const [first, second] = Array.from(container.querySelectorAll<HTMLButtonElement>(".term__trigger"));
    expect(first.hasAttribute("tabindex")).toBe(false);
    expect(second.getAttribute("tabindex")).toBe("-1");
    expect(second.getAttribute("aria-describedby")).toBeTruthy();
  });

  it("passes tabStop through glossTerms", async () => {
    await act(async () => root.render(<p>{glossTerms("Built by IT.", { IT: "Information technology." }, { tabStop: false })}</p>));
    expect(container.querySelector(".term__trigger")!.getAttribute("tabindex")).toBe("-1");
  });
});
