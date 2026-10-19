import { readFileSync } from "fs";
import path from "path";

describe("mobile case-study orientation", () => {
  const css = readFileSync(path.join(process.cwd(), "src/styles/riso-page.css"), "utf8");

  it("keeps the title and orientation content before the hero artifact", () => {
    expect(css).toMatch(
      /\.flagship-page \.rp-hero__media\s*\{\s*order:\s*2;/,
    );
    expect(css).not.toMatch(
      /\.flagship-page \.rp-hero__media\s*\{[^}]*order:\s*-1;/,
    );
  });

  it("puts the H1 at the top of the mobile orientation plate", () => {
    expect(css).toMatch(
      /\.flagship-page \.rp-h1\s*\{\s*order:\s*1;\s*margin-top:\s*0;/,
    );
  });

  it("uses the orientation-first layout on short landscape phones too", () => {
    expect(css).toContain(
      "@media (max-width: 760px), (orientation: landscape) and (max-width: 900px) and (max-height: 500px)",
    );
  });
});
