#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEX_NODE_MODULES
    ? path.join(process.env.CODEX_NODE_MODULES, "playwright")
    : "/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const buildDir = path.resolve(
  process.env.PORTFOLIO_BUILD_DIR || path.join(__dirname, "../my-app/build"),
);
const outputPath = process.env.VISUAL_EVIDENCE_REPORT || "/tmp/visual-evidence-audit.json";
const chromePath =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const routes = [
  ["home", "/"],
  ["msk", "/case-study/msk"],
  ["logistics", "/case-study/logistics"],
  ["grove", "/case-study/grove"],
  ["healthcare-product", "/curated/healthcare-product-service-designer"],
  ["healthcare-uxr", "/curated/healthcare-ux-researcher"],
];
const routeFilter = process.env.VISUAL_EVIDENCE_ROUTES
  ? new Set(process.env.VISUAL_EVIDENCE_ROUTES.split(",").map((value) => value.trim()))
  : null;
const activeRoutes = routeFilter ? routes.filter(([name]) => routeFilter.has(name)) : routes;
const widths = [390, 1440];

async function installBuildRoute(page) {
  const mime = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  await page.route("**://portfolio.local/**", async (route) => {
    const pathname = decodeURIComponent(new URL(route.request().url()).pathname);
    const relative = pathname.replace(/^\/+/, "");
    const requested = path.resolve(buildDir, relative);
    const inside = requested === buildDir || requested.startsWith(`${buildDir}${path.sep}`);
    const file = inside && fs.existsSync(requested) && fs.statSync(requested).isFile()
      ? requested
      : path.join(buildDir, "index.html");
    await route.fulfill({
      status: 200,
      path: file,
      contentType: mime[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
  });
}

async function inspect(page, routeName) {
  return page.evaluate((name) => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && box.width > 2 && box.height > 2;
    };
    const words = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’+%–—-]*/gu) || []).length;
    const main = document.querySelector("main");
    const contact = document.querySelector("#contact, #curated-close");
    const bodyText = main?.innerText || "";
    const bodyCopy = main
      ? [...main.querySelectorAll("p, li, dd, figcaption, blockquote")]
          .filter((element) => visible(element))
          .filter((element) => !element.closest("nav, [hidden], .rp-next"))
      : [];
    const beforeContactText = bodyCopy
      .filter((element) => !contact || Boolean(element.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING))
      .map((element) => element.textContent || "")
      .join(" ");

    const selectors = [
      "figure",
      "[data-evidence='true']",
      "[data-visual='true']",
      "img:not([alt=''])",
      "video",
      "canvas",
      ".rp-work__thumb",
      ".rp-outcomes",
      ".fp-evidence",
      ".fp-artifact",
      "[class*='Mechanism']",
      "[class*='mechanism']",
      "[class*='Workflow']",
      "[class*='workflow']",
      "[class*='Blueprint']",
      "[class*='blueprint']",
      "[class*='Dashboard']",
      "[class*='dashboard']",
      "[class*='gallery']",
      "[class*='specimen']",
    ].join(",");
    const candidates = [...document.querySelectorAll(selectors)].filter(visible);
    const evidence = candidates.filter((element, index) =>
      !candidates.some((parent, parentIndex) => parentIndex !== index && parent.contains(element)),
    );
    const coverageEnd = name === "home" && contact
      ? contact.getBoundingClientRect().top + scrollY
      : document.documentElement.scrollHeight;
    const intervals = evidence
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return [Math.max(0, rect.top + scrollY), Math.min(coverageEnd, rect.bottom + scrollY)];
      })
      .filter(([start, end]) => end > start)
      .sort((a, b) => a[0] - b[0]);
    const merged = [];
    for (const interval of intervals) {
      const last = merged[merged.length - 1];
      if (!last || interval[0] > last[1]) merged.push([...interval]);
      else last[1] = Math.max(last[1], interval[1]);
    }
    const evidenceHeight = merged.reduce((sum, [start, end]) => sum + end - start, 0);
    const pageHeight = coverageEnd;
    const paragraphs = [...document.querySelectorAll("main p")]
      .filter(visible)
      .map((paragraph) => ({
        words: words(paragraph.innerText),
        text: paragraph.innerText.replace(/\s+/g, " ").trim().slice(0, 180),
      }));

    return {
      route: name,
      words: words(bodyText),
      wordsBeforeContact: words(beforeContactText),
      evidenceUnits: evidence.length,
      evidenceCoverage: Math.round((evidenceHeight / pageHeight) * 1000) / 10,
      pageHeight,
      longParagraphs: paragraphs.filter((paragraph) => paragraph.words > 45),
      maxParagraphWords: Math.max(0, ...paragraphs.map((paragraph) => paragraph.words)),
      semanticFigures: document.querySelectorAll("main figure").length,
      informativeImages: [...document.querySelectorAll("main img")].filter((image) => image.getAttribute("alt")?.trim()).length,
      workImages: name === "home" ? [...document.querySelectorAll(".rp-work__thumb img")].map((image) => {
        const style = getComputedStyle(image);
        return {
          src: image.getAttribute("src"),
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          opacity: style.opacity,
          visibility: style.visibility,
          display: style.display,
          filter: style.filter,
        };
      }) : undefined,
      tailGeometry: name === "grove" ? [...document.querySelectorAll("#grove-outcomes, #grove-outcomes ~ section, .rp-next, footer")].map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          selector: element.id ? `#${element.id}` : `.${element.className}`,
          top: Math.round(rect.top + scrollY),
          bottom: Math.round(rect.bottom + scrollY),
          height: Math.round(rect.height),
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
        };
      }) : undefined,
    };
  }, routeName);
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const results = [];
  try {
    for (const width of widths) {
      for (const [name, route] of activeRoutes) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
        await installBuildRoute(page);
        await page.addInitScript(() => {
          localStorage.setItem("lang", "en");
          localStorage.setItem("darkMode", "false");
        });
        await page.goto(`http://portfolio.local${route}`, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("main h1", { timeout: 30000 });
        await page.waitForTimeout(500);
        results.push({ width, ...(await inspect(page, name)) });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  const failures = results.flatMap((result) => {
    const issues = [];
    const minimumCoverage = result.route === "home" ? 65 : 60;
    if (result.words === 0) issues.push("route content did not mount");
    if (result.evidenceCoverage < minimumCoverage) issues.push(`evidence coverage ${result.evidenceCoverage}% < ${minimumCoverage}%`);
    if (result.maxParagraphWords > 45) issues.push(`paragraph ${result.maxParagraphWords} words > 45`);
    if (result.route === "home" && result.wordsBeforeContact > 140) issues.push(`Home words before Contact ${result.wordsBeforeContact} > 140`);
    if (result.route === "home" && result.workImages?.some((image) => image.naturalWidth === 0)) issues.push("Home work image failed to load");
    return issues.map((issue) => ({ route: result.route, width: result.width, issue }));
  });
  const report = { verdict: failures.length ? "FAIL" : "PASS", results, failures };
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  process.stdout.write(`${JSON.stringify({ verdict: report.verdict, auditedStates: results.length, failures }, null, 2)}\n`);
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
