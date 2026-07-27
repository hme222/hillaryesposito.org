import { curatedPages } from "../data/curatedPages";

/**
 * Contrast regression coverage for the Riso accent system.
 *
 * jsdom has no layout engine, so the axe suite disables `color-contrast`.
 * These pure-math checks guard the tokens that render color text or filled
 * controls: every tailored-page accent (which re-inks `--coral`) and the
 * global fixed controls (recruiter pill + nav accent). If a future accent or
 * control color drops below WCAG AA for normal text, this fails.
 *
 * Theme paper + on-* foregrounds are the values defined in riso-page.css.
 */

const LIGHT_PAPER = "#e8ece3";
const DARK_PAPER = "#14150e";
const WHITE = "#ffffff"; // light-mode --on-coral
const DARK_INK = "#14150e"; // dark-mode --on-coral
const AA_NORMAL = 4.5;

function relLuminance(hex: string): number {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const chan = (i: number) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(0) + 0.7152 * chan(2) + 0.0722 * chan(4);
}

function contrast(a: string, b: string): number {
  const l1 = relLuminance(a);
  const l2 = relLuminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

describe("Riso accent contrast (WCAG AA, normal text)", () => {
  const tailored = Object.values(curatedPages).filter((p) => p.accent);

  it.each(tailored.map((p) => [p.company, p]))(
    "%s light accent passes as text on light paper and behind white",
    (_company, page) => {
      const accent = (page as { accent: string }).accent;
      expect(contrast(accent, LIGHT_PAPER)).toBeGreaterThanOrEqual(AA_NORMAL);
      expect(contrast(WHITE, accent)).toBeGreaterThanOrEqual(AA_NORMAL);
    },
  );

  it.each(tailored.map((p) => [p.company, p]))(
    "%s dark accent passes as text on dark paper and behind dark ink",
    (_company, page) => {
      const accentDark =
        (page as { accentDark?: string }).accentDark ?? "#ff8c82"; // default dark coral
      expect(contrast(accentDark, DARK_PAPER)).toBeGreaterThanOrEqual(AA_NORMAL);
      expect(contrast(DARK_INK, accentDark)).toBeGreaterThanOrEqual(AA_NORMAL);
    },
  );

  it("global recruiter pill keeps white text over its fixed coral", () => {
    // .recruiter-pill { background: #bd3828; color: #fff } — both themes
    expect(contrast(WHITE, "#bd3828")).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("nav link accent text passes on the nav surface in both themes", () => {
    // --nav-accent text sits on the themed nav surface
    expect(contrast("#bd3828", LIGHT_PAPER)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrast("#ff8c82", DARK_PAPER)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("resume-hover fill keeps its --nav-accent-ink readable in both themes", () => {
    // light: white on #bd3828 ; dark: #14150e on #ff8c82
    expect(contrast(WHITE, "#bd3828")).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrast(DARK_INK, "#ff8c82")).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it("green control text (--on-green) passes on the themed green", () => {
    // light green #3d6b3f + white ; dark green #7cb069 + dark ink
    expect(contrast(WHITE, "#3d6b3f")).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrast(DARK_INK, "#7cb069")).toBeGreaterThanOrEqual(AA_NORMAL);
  });
});

/**
 * .rp-override panels are pinned dark in BOTH themes, so anything inside them
 * must use fixed colors. Inheriting a themed var here is the exact bug that put
 * Mobbin's taxonomy labels at 2.46:1 in light mode — --coral darkened with the
 * theme while the background stayed dark. These guard the fixed values.
 */
describe("Flagship override-panel accents (fixed, both themes)", () => {
  const OVERRIDE_GREEN = "#17321b"; // .rp-override default
  const OVERRIDE_MOBBIN = "#262925"; // .flagship-page--mobbin .rp-override
  const OVERRIDE_CORAL = "#ff8171"; // .rp-override kicker + label accent
  const OVERRIDE_SAGE = "#a9d28f"; // .rp-override numeric/system accent
  const OVERRIDE_INK = "#f4f1e6"; // .rp-override body ink

  it.each([
    ["default green", OVERRIDE_GREEN],
    ["mobbin", OVERRIDE_MOBBIN],
  ])("%s panel keeps its coral label readable", (_name, bg) => {
    expect(contrast(OVERRIDE_CORAL, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
  });

  it.each([
    ["default green", OVERRIDE_GREEN],
    ["mobbin", OVERRIDE_MOBBIN],
  ])("%s panel keeps its sage accent and body ink readable", (_name, bg) => {
    expect(contrast(OVERRIDE_SAGE, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
    expect(contrast(OVERRIDE_INK, bg)).toBeGreaterThanOrEqual(AA_NORMAL);
  });
});
