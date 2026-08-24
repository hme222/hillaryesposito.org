#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEX_NODE_MODULES
    ? path.join(process.env.CODEX_NODE_MODULES, "playwright")
    : "/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const root = path.resolve(__dirname, "..");
const buildDir = path.resolve(process.env.PORTFOLIO_BUILD_DIR || path.join(root, "my-app/build"));
const axeSource = fs.readFileSync(path.join(root, "my-app/node_modules/axe-core/axe.min.js"), "utf8");
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputPath = process.env.AXE_REPORT || "/tmp/axe-primary-audit.json";
const routes = [
  ["home", "/"],
  ["msk", "/case-study/msk"],
  ["logistics", "/case-study/logistics"],
  ["grove", "/case-study/grove"],
  ["healthcare-product", "/curated/healthcare-product-service-designer"],
  ["healthcare-uxr", "/curated/healthcare-ux-researcher"],
];

async function installBuildRoute(page) {
  const mime = {
    ".css": "text/css; charset=utf-8", ".html": "text/html; charset=utf-8",
    ".jpeg": "image/jpeg", ".jpg": "image/jpeg", ".js": "text/javascript; charset=utf-8",
    ".png": "image/png", ".svg": "image/svg+xml", ".webp": "image/webp",
  };
  await page.route("**://portfolio.local/**", async (route) => {
    const pathname = decodeURIComponent(new URL(route.request().url()).pathname);
    const requested = path.resolve(buildDir, pathname.replace(/^\/+/, ""));
    const inside = requested === buildDir || requested.startsWith(`${buildDir}${path.sep}`);
    const file = inside && fs.existsSync(requested) && fs.statSync(requested).isFile()
      ? requested
      : path.join(buildDir, "index.html");
    await route.fulfill({ status: 200, path: file, contentType: mime[path.extname(file)] || "application/octet-stream" });
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true, executablePath: chromePath, args: ["--no-sandbox", "--disable-gpu"] });
  const results = [];
  try {
    for (const width of [390, 1440]) {
      for (const [name, route] of routes) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
        await installBuildRoute(page);
        await page.addInitScript(() => {
          localStorage.setItem("lang", "en");
          localStorage.setItem("darkMode", "false");
        });
        await page.goto(`http://portfolio.local${route}`, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("main h1", { timeout: 30000 });
        await page.addScriptTag({ content: axeSource });
        const audit = await page.evaluate(async () => window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] },
          resultTypes: ["violations"],
        }));
        results.push({
          route: name,
          width,
          violations: audit.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            help: violation.help,
            nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
          })),
        });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  const violations = results.flatMap((result) => result.violations.map((violation) => ({ route: result.route, width: result.width, ...violation })));
  const report = { auditedStates: results.length, violationCount: violations.length, violations, results };
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  process.stdout.write(`${JSON.stringify({ auditedStates: report.auditedStates, violationCount: report.violationCount, violations }, null, 2)}\n`);
  if (violations.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
