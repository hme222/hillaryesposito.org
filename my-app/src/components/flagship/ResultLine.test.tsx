import React, { act } from "react";
import fs from "fs";
import path from "path";
import { createRoot, Root } from "react-dom/client";
import ResultLine from "./ResultLine";

// Comments removed, so prose about the animation cannot satisfy or trip the checks.
const CSS = fs.readFileSync(path.join(__dirname, "../../styles/result-line.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

/** The stylesheet with the progressive-enhancement block removed: what a browser
 *  without scroll-driven animation, or with reduced motion, applies. */
function baseCss(css: string) {
  const start = css.indexOf("@supports");
  let depth = 0;
  let end = start;
  for (let i = css.indexOf("{", start); i < css.length; i += 1) {
    if (css[i] === "{") depth += 1;
    if (css[i] === "}") depth -= 1;
    if (depth === 0) { end = i + 1; break; }
  }
  return css.slice(0, start) + css.slice(end);
}

describe("ResultLine", () => {
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
    document.head.querySelectorAll("style[data-test]").forEach((node) => node.remove());
  });

  const sentence = "Restocking then took 1–⁠2 weeks, according to my Officer Evaluation Report.";

  it("renders the sentence as real text in one element, one span per word", async () => {
    await act(async () => root.render(<ResultLine eyebrow="What changed" text={sentence} />));
    const texts = container.querySelectorAll(".rp-resultLine__text");
    expect(texts).toHaveLength(1);
    const text = texts[0] as HTMLElement;
    // Real text: the paragraph reads as the sentence (the last two words are joined by a no-break space).
    expect(text.textContent?.replace(/ /g, " ")).toBe(sentence.replace(/ /g, " "));
    const words = Array.from(text.querySelectorAll("span"));
    expect(words.every((w) => w.classList.contains("rp-resultLine__word"))).toBe(true);
    // Words, never letters: "1–2 weeks," stays one span with its joiners.
    expect(words.map((w) => w.textContent)).toEqual([
      "Restocking", "then", "took", "1–⁠2 weeks,", "according", "to", "my", "Officer", "Evaluation", "Report.",
    ]);
    expect(text.style.getPropertyValue("--n")).toBe("10");
    expect(words[3].style.getPropertyValue("--i")).toBe("3");
  });

  it("joins the last two words so the last line is never one word", async () => {
    await act(async () => root.render(<ResultLine eyebrow="What I found">Twelve features became three.</ResultLine>));
    const text = container.querySelector(".rp-resultLine__text")!;
    expect(text.textContent).toBe("Twelve features became three.");
  });

  it("hides nothing from screen readers", async () => {
    await act(async () => root.render(<ResultLine eyebrow="What changed" text={sentence} source="A source." />));
    expect(container.querySelector("[aria-hidden]")).toBeNull();
    expect(container.querySelector("[role]")).toBeNull();
  });

  it("renders the eyebrow, and the source only when given", async () => {
    await act(async () => root.render(<ResultLine eyebrow="Where it stands" text="It is untested." />));
    expect(container.querySelector(".rp-resultLine__eyebrow")?.textContent).toBe("Where it stands");
    expect(container.querySelector(".rp-resultLine__source")).toBeNull();
    await act(async () => root.render(<ResultLine eyebrow="Where it stands" text="It is untested." source="No patient was interviewed." />));
    expect(container.querySelector(".rp-resultLine__source")?.textContent).toBe("No patient was interviewed.");
  });

  it("defaults every word to full ink with no animation, outside the enhancement block", async () => {
    const base = baseCss(CSS);
    expect(base).not.toMatch(/animation:|animation-timeline|view-timeline/);
    // --muted appears in the base only on the source line, never on a word.
    expect(base).not.toMatch(/__word\s*\{[^}]*--muted/);
    const style = document.createElement("style");
    style.setAttribute("data-test", "");
    // jsdom does not resolve custom properties, so each token stands in as a sentinel color.
    style.textContent = base.replace(/var\(--ink\)/g, "rgb(1, 2, 3)").replace(/var\(--muted\)/g, "rgb(9, 9, 9)");
    document.head.appendChild(style);
    await act(async () => root.render(<ResultLine eyebrow="What changed" text={sentence} />));
    const word = container.querySelector(".rp-resultLine__word")!;
    expect(getComputedStyle(word).color).toBe("rgb(1, 2, 3)"); // --ink
  });

  it("starts quiet only inside @supports plus reduced-motion and forced-colors guards", () => {
    const enhancement = CSS.slice(CSS.indexOf("@supports"));
    expect(enhancement).toMatch(/@supports \(animation-timeline: view\(\)\)/);
    expect(enhancement).toMatch(/prefers-reduced-motion: no-preference/);
    expect(enhancement).toMatch(/forced-colors: none/);
    // Only color animates: no size or weight change that would reflow the text.
    const keyframes = CSS.slice(CSS.indexOf("@keyframes"));
    expect(keyframes).not.toMatch(/font|weight|size|transform|width/);
  });
});
