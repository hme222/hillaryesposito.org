import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import axe from "axe-core";
import CopyEmail from "./CopyEmail";

const ADDRESS = "espositohillary@gmail.com";
const mockLang: { current: "en" | "es" } = { current: "en" };

jest.mock("../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: mockLang.current }),
}));

type Clipboard = { writeText?: (text: string) => Promise<void> } | undefined;

function setClipboard(clipboard: Clipboard) {
  Object.defineProperty(navigator, "clipboard", { value: clipboard, configurable: true });
}

describe("CopyEmail", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    jest.useFakeTimers();
    mockLang.current = "en";
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    jest.useRealTimers();
    setClipboard(undefined);
  });

  const render = (props: React.ComponentProps<typeof CopyEmail> = {}) =>
    act(() => root.render(<CopyEmail {...props} />));
  const button = () => container.querySelector("button") as HTMLButtonElement;
  const status = () => container.querySelector('[role="status"]') as HTMLElement;

  // ---- default state -------------------------------------------------------

  it("shows the label, the address as selectable text, and an icon-only copy button", () => {
    render();
    expect(container.textContent).toContain("My email");
    const address = container.querySelector(".rp-copyEmail__address") as HTMLElement;
    expect(address.tagName).toBe("CODE");
    expect(address.textContent).toBe(ADDRESS);
    expect(button().getAttribute("aria-label")).toBe("Copy email address");
    expect(button().textContent).toBe("");
    expect(button().classList.contains("is-copied")).toBe(false);
  });

  it("is a native button, so Enter and Space work without extra handlers", () => {
    render();
    expect(button().tagName).toBe("BUTTON");
    expect(button().getAttribute("type")).toBe("button");
    expect(button().getAttribute("tabindex")).toBeNull();
    expect(button().disabled).toBe(false);
  });

  it("keeps the icon decorative so the button name comes from its label", () => {
    render();
    const icon = button().querySelector("svg") as SVGElement;
    expect(icon.getAttribute("aria-hidden")).toBe("true");
    expect(icon.getAttribute("focusable")).toBe("false");
  });

  // ---- variants and language ----------------------------------------------

  it("compact drops the label and turns the address into a mailto link", () => {
    render({ compact: true });
    expect(container.textContent).not.toContain("My email");
    const link = container.querySelector("a.rp-copyEmail__address") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe(`mailto:${ADDRESS}`);
    expect(container.querySelector("code")).toBeNull();
    expect(container.querySelector(".rp-copyEmail--compact")).not.toBeNull();
  });

  it("uses Spanish copy when the language is Spanish", () => {
    mockLang.current = "es";
    render();
    expect(container.textContent).toContain("Mi correo");
    expect(button().getAttribute("aria-label")).toBe("Copiar correo");
  });

  it("lets the lang prop override the language provider", () => {
    mockLang.current = "en";
    render({ lang: "es" });
    expect(button().getAttribute("aria-label")).toBe("Copiar correo");
  });

  // ---- copied state --------------------------------------------------------

  it("copies the address, shows Copied, announces it, then resets after 3.2 seconds", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    render();

    await act(async () => {
      button().click();
    });

    expect(writeText).toHaveBeenCalledWith(ADDRESS);
    expect(button().getAttribute("aria-label")).toBe("Email copied");
    expect(button().classList.contains("is-copied")).toBe(true);
    expect(status().textContent).toBe("Email copied.");
    expect(status().classList.contains("sr-only")).toBe(true);   // announced, not shown a second time

    act(() => {
      jest.advanceTimersByTime(3199);
    });
    expect(button().getAttribute("aria-label")).toBe("Email copied");
    act(() => {
      jest.advanceTimersByTime(2);
    });
    expect(button().getAttribute("aria-label")).toBe("Copy email address");
    expect(status().textContent).toBe("");
  });

  it("announces the copied state in Spanish", async () => {
    mockLang.current = "es";
    setClipboard({ writeText: jest.fn().mockResolvedValue(undefined) });
    render();
    await act(async () => {
      button().click();
    });
    expect(button().getAttribute("aria-label")).toBe("Correo copiado");
    expect(status().textContent).toBe("Correo copiado.");
  });

  // ---- failure state -------------------------------------------------------

  it("tells the visitor to select the text when the clipboard is unavailable", async () => {
    setClipboard(undefined);
    render();
    await act(async () => {
      button().click();
    });
    expect(status().textContent).toBe("Couldn’t copy. Select the text instead.");
    expect(status().classList.contains("sr-only")).toBe(false);   // a failure must be visible, not only announced
    expect(button().getAttribute("aria-label")).toBe("Copy email address");
    expect(button().textContent).toBe("");
    expect(button().classList.contains("is-copied")).toBe(false);
  });

  it("treats a rejected clipboard write as a failure", async () => {
    setClipboard({ writeText: jest.fn().mockRejectedValue(new Error("denied")) });
    render();
    await act(async () => {
      button().click();
    });
    expect(status().textContent).toContain("Couldn’t copy");
    expect(status().classList.contains("sr-only")).toBe(false);
  });

  it("shows the failure message in Spanish and clears it after 3.2 seconds", async () => {
    mockLang.current = "es";
    setClipboard(undefined);
    render();
    await act(async () => {
      button().click();
    });
    expect(status().textContent).toBe("No se pudo copiar. Seleccione el texto.");
    act(() => {
      jest.advanceTimersByTime(3300);
    });
    expect(status().textContent).toBe("");
  });

  // ---- live region ---------------------------------------------------------

  it("keeps a polite live region in the DOM from the start so the first result is announced", () => {
    render();
    expect(status()).not.toBeNull();
    expect(status().getAttribute("aria-live")).toBe("polite");
    expect(status().textContent).toBe("");
  });

  // ---- axe -----------------------------------------------------------------
  // jsdom loads no stylesheet, so colour contrast is checked separately (see the component QA doc).

  it.each([
    ["default", {}],
    ["compact", { compact: true }],
  ])("has no axe violations in the %s variant", async (_name, props) => {
    jest.useRealTimers();
    render(props as React.ComponentProps<typeof CopyEmail>);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
