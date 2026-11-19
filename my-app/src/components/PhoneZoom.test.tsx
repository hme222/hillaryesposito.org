import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot, Root } from "react-dom/client";
import PhoneZoom from "./PhoneZoom";

function Page() {
  return (
    <>
      <div className="fp-sequence__phone fp-sequence__phone--stack" id="stack">
        <img src="/a.webp" alt="First app" className="is-on" />
        <img src="/b.webp" alt="Second app" />
      </div>
      <div className="fp-fan">
        <img src="/fan.webp" alt="" id="fan" />
      </div>
      <a href="/x"><div className="fp-fan"><img src="/linked.webp" alt="" id="linked" /></div></a>
      <PhoneZoom />
    </>
  );
}

describe("PhoneZoom", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    HTMLDialogElement.prototype.showModal = function showModal() { this.setAttribute("open", ""); };
    HTMLDialogElement.prototype.close = function close() { this.removeAttribute("open"); this.dispatchEvent(new Event("close")); };
  });

  beforeEach(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => { root.render(<Page />); });
  });
  afterEach(async () => {
    await act(async () => { root.unmount(); });
    container.remove();
  });

  const dialog = () => document.querySelector<HTMLDialogElement>("dialog.pz-dialog")!;

  it("makes phones keyboard-reachable buttons, except phones inside a link", () => {
    const stack = document.getElementById("stack")!;
    expect(stack.getAttribute("role")).toBe("button");
    expect(stack.tabIndex).toBe(0);
    expect(document.getElementById("fan")!.getAttribute("role")).toBe("button");
    expect(document.getElementById("linked")!.getAttribute("role")).toBeNull();
  });

  it("opens the visible screen of a stack, then zooms in and out, and closes with the X", async () => {
    await act(async () => { document.getElementById("stack")!.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(dialog().hasAttribute("open")).toBe(true);
    expect(dialog().querySelector("img")!.getAttribute("src")).toMatch(/\/a\.webp$/);
    expect(dialog().querySelector(".pz__level")!.textContent).toBe("100%");

    const zoomIn = dialog().querySelector<HTMLButtonElement>('button[aria-label="Zoom in"]')!;
    const zoomOut = dialog().querySelector<HTMLButtonElement>('button[aria-label="Zoom out"]')!;
    expect(zoomOut.disabled).toBe(true);
    await act(async () => { zoomIn.click(); });
    expect(dialog().querySelector(".pz__level")!.textContent).toBe("150%");
    await act(async () => { zoomOut.click(); });
    expect(dialog().querySelector(".pz__level")!.textContent).toBe("100%");

    await act(async () => { dialog().querySelector<HTMLButtonElement>('button[aria-label="Close"]')!.click(); });
    expect(dialog().hasAttribute("open")).toBe(false);
  });

  it("opens a fan phone with Enter and does nothing for a phone inside a link", async () => {
    await act(async () => { document.getElementById("linked")!.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    expect(dialog()?.hasAttribute("open") ?? false).toBe(false);
    await act(async () => { document.getElementById("fan")!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })); });
    expect(dialog().hasAttribute("open")).toBe(true);
    expect(dialog().querySelector("img")!.getAttribute("src")).toMatch(/\/fan\.webp$/);
  });
});
