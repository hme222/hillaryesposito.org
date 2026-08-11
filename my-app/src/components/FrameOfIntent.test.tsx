import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import FrameOfIntent from "./FrameOfIntent";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props}>{children}</a>
  ),
}), { virtual: true });

describe("FrameOfIntent", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<FrameOfIntent />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("puts exact MSK evidence, ownership, and the normal route before optional controls", () => {
    const text = container.textContent ?? "";
    expect(text).toContain("Open queue → Find doc → Print → Route to imaging → Wait for scan → Re-check filing");
    expect(text).toContain("Open queue → Select doc → Send to EMR → Files in chart → Status updated");
    expect(text).toContain("Keep the document inside the electronic medical record.");
    expect(text).toContain("Hillary initiated the redesign as a coordinator. It was later implemented within a larger EMR initiative.");
    expect(text).toContain("contains no patient data, and is not an Epic screen");

    const link = container.querySelector<HTMLAnchorElement>('a[href="/case-study/msk"]');
    const range = container.querySelector<HTMLInputElement>('input[type="range"]');
    expect(link).not.toBeNull();
    expect(range).not.toBeNull();
    expect(link!.compareDocumentPosition(range!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("uses one bounded native range for source, comparison, and decision state", () => {
    const range = container.querySelector<HTMLInputElement>('#decision-progress')!;
    expect(range.min).toBe("0");
    expect(range.max).toBe("100");
    expect(range.value).toBe("100");
    expect(range.getAttribute("aria-valuetext")).toBe("Hillary’s decision");

    act(() => {
      range.value = "45";
      range.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(range.value).toBe("45");
    expect(range.getAttribute("aria-valuetext")).toBe("45% toward Hillary’s decision");

    const sourceButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent === "Show source condition"
    )!;
    act(() => sourceButton.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(range.value).toBe("0");
    expect(container.querySelector("[aria-live]")?.textContent).toBe(
      "Source condition shown. Six steps route the document through paper and imaging."
    );
  });

  it("provides four direct-manipulation targets without adding focus stops", () => {
    const nodes = Array.from(container.querySelectorAll<HTMLElement>("[data-frame-node]"));
    expect(nodes).toHaveLength(4);
    nodes.forEach((node) => expect(node.tabIndex).toBe(-1));

    const range = container.querySelector<HTMLInputElement>('#decision-progress')!;
    const node = nodes[0];
    const pointerEvent = (type: string, clientX: number) => {
      const event = new MouseEvent(type, { bubbles: true, clientX });
      Object.defineProperties(event, {
        pointerId: { value: 1 },
      });
      return event;
    };

    act(() => {
      node.dispatchEvent(pointerEvent("pointerdown", 200));
      node.dispatchEvent(pointerEvent("pointermove", 40));
      node.dispatchEvent(pointerEvent("pointerup", 40));
    });
    expect(Number(range.value)).toBeGreaterThanOrEqual(0);
    expect(Number(range.value)).toBeLessThan(100);
  });

  it("keeps exact protected workflow planes rigid inside the stage and changes their progress state", () => {
    const stage = container.querySelector<HTMLElement>(".foi-stage")!;
    const source = stage.querySelector<HTMLElement>('[data-protected-route="source"]')!;
    const decision = stage.querySelector<HTMLElement>('[data-protected-route="decision"]')!;
    const range = container.querySelector<HTMLInputElement>("#decision-progress")!;

    expect(source.textContent).toContain(
      "Open queue → Find doc → Print → Route to imaging → Wait for scan → Re-check filing"
    );
    expect(decision.textContent).toContain(
      "Open queue → Select doc → Send to EMR → Files in chart → Status updated"
    );
    expect(stage.dataset.progressState).toBe("decision");

    act(() => {
      range.value = "35";
      range.dispatchEvent(new Event("input", { bubbles: true }));
    });
    expect(stage.dataset.progressState).toBe("comparing");

    const sourceButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent === "Show source condition"
    )!;
    act(() => sourceButton.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(stage.dataset.progressState).toBe("source");
  });

  it("keeps the Grove production record semantic, truthful, and artifact-linked", () => {
    const details = container.querySelector("details");
    expect(details?.querySelector("summary")?.textContent).toBe("Production run 01 · Grove × Higgsfield");
    expect(details?.textContent).toContain("static first export and clipped portrait attempts");
    expect(details?.textContent).toContain("It does not claim that Higgsfield designed Grove or generated its product evidence.");
    expect(details?.textContent).toContain("It may never rewrite evidence, interface text, metrics, ownership, provenance, or routes.");
    expect(details?.querySelector('a[href="/case-study/grove"]')).not.toBeNull();
    expect(container.querySelector("canvas, video, audio")).toBeNull();
  });
});
