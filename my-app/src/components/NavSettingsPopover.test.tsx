import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import NavSettingsPopover from "./NavSettingsPopover";

const mockSetLang = jest.fn();
const mockSwitchLanguage = jest.fn();

jest.mock("../app/LanguageContext", () => ({
  useT: () => (key: string) => key,
  useLanguage: () => ({ lang: "en", setLang: mockSetLang }),
  switchLanguageAtCurrentSection: (...args: unknown[]) => mockSwitchLanguage(...args),
}));

describe("NavSettingsPopover", () => {
  let container: HTMLDivElement;
  let root: Root;
  let setDarkMode: jest.Mock;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    mockSetLang.mockClear();
    mockSwitchLanguage.mockClear();
    setDarkMode = jest.fn();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  function button() {
    return container.querySelector<HTMLButtonElement>(".nav-dock__item--settings");
  }
  function popover() {
    return container.querySelector<HTMLDivElement>(".nav-settings__popover");
  }

  async function render() {
    await act(async () => {
      root.render(<NavSettingsPopover darkMode={false} setDarkMode={setDarkMode} />);
    });
  }

  // Opening moves focus to the popover's first control one animation frame
  // later (see the component's own comment) - flush that frame for real
  // rather than asserting mid-flight.
  async function open() {
    await act(async () => {
      button()?.click();
    });
    // The focus-move effect is a passive effect that itself schedules an
    // animation frame, so flushing a single frame immediately can race it.
    // Two real frames with a microtask flush between them is enough slack.
    await act(async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    });
    await act(async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    });
  }

  it("is closed by default with aria-expanded false and no popover in the DOM", async () => {
    await render();
    expect(button()?.getAttribute("aria-expanded")).toBe("false");
    expect(popover()).toBeNull();
  });

  it("opens on click, moves focus to the first control, and toggles closed on a second click", async () => {
    await render();
    await open();
    expect(button()?.getAttribute("aria-expanded")).toBe("true");
    expect(popover()).not.toBeNull();
    expect(document.activeElement).toBe(popover()?.querySelector("button"));

    await act(async () => button()?.click());
    expect(button()?.getAttribute("aria-expanded")).toBe("false");
    expect(popover()).toBeNull();
  });

  it("Escape closes it and returns focus to the settings button", async () => {
    await render();
    await open();
    expect(popover()).not.toBeNull();

    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(popover()).toBeNull();
    expect(document.activeElement).toBe(button());
  });

  it("a click outside the popover and the button closes it", async () => {
    await render();
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    await open();
    expect(popover()).not.toBeNull();

    // jsdom has no PointerEvent constructor; a MouseEvent typed "pointerdown"
    // still dispatches to the component's "pointerdown" listener.
    await act(async () => {
      outside.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    });
    expect(popover()).toBeNull();
    outside.remove();
  });

  it("a click inside the popover does not close it", async () => {
    await render();
    await open();
    const toggle = popover()?.querySelectorAll("button")[1];
    await act(async () => {
      toggle?.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    });
    expect(popover()).not.toBeNull();
  });

  it("focus moving past the popover's last control closes it (Tab out)", async () => {
    await render();
    await open();
    const outside = document.createElement("button");
    document.body.appendChild(outside);

    await act(async () => outside.focus());
    expect(popover()).toBeNull();
    outside.remove();
  });

  it("the dark-mode toggle calls setDarkMode and the language toggle switches language", async () => {
    await render();
    await open();
    // Clicking a toggle inside the popover doesn't close it - only Escape,
    // outside click, or tabbing out does - so both controls stay reachable
    // from the same open popover.
    const toggles = popover()?.querySelectorAll("button") || [];
    await act(async () => (toggles[0] as HTMLButtonElement)?.click());
    expect(setDarkMode).toHaveBeenCalledTimes(1);
    expect(popover()).not.toBeNull();

    const toggles2 = popover()?.querySelectorAll("button") || [];
    await act(async () => (toggles2[1] as HTMLButtonElement)?.click());
    expect(mockSwitchLanguage).toHaveBeenCalledWith(mockSetLang, "es");
  });
});
