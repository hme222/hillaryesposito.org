#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEX_NODE_MODULES
    ? path.join(process.env.CODEX_NODE_MODULES, "playwright")
    : "/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const buildDir = path.resolve(process.env.PORTFOLIO_BUILD_DIR || path.join(__dirname, "../my-app/build"));
const outputDir = process.env.HEADLINE_VISUAL_AUDIT_DIR || "/tmp/headline-visual-recruiter-audit";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const widths = [390, 1440];

const routes = [
  {
    name: "home",
    route: "/",
    required: [
      "design healthcare products from the workflow out",
      "contributed to a 20% organization-wide",
      "filing queue replaced a four-system workaround",
      "medical resupply time reduced 85%",
      "eleven features became three",
      "espositohillary@gmail.com",
    ],
  },
  {
    name: "msk",
    route: "/case-study/msk",
    required: [
      "filing queue replaced a four-system workaround",
      "service design · process improvement · ux/product",
      "implemented · still in use through two upgrades",
      "contributed to 20% organization-wide emr cost reduction",
    ],
  },
  {
    name: "logistics",
    route: "/case-study/logistics",
    required: [
      "medical resupply time reduced 85%",
      "medical logistics officer · service lead",
      "seven aid stations · three countries",
      "deployed 2024 · 85% shorter resupply time",
    ],
  },
  {
    name: "grove",
    route: "/case-study/grove",
    required: [
      "eleven features became three",
      "sole product designer · end to end",
      "34-person self-report survey",
      "11 features → 3 launch priorities",
      "phase 2 of 3 · functional prototype",
    ],
  },
  {
    name: "healthcare-product",
    route: "/curated/healthcare-product-service-designer",
    required: [
      "healthcare product design",
      "mid-level product designer · healthcare enterprise and internal tools",
      "20%",
      "85%",
      "implemented",
    ],
  },
  {
    name: "healthcare-uxr",
    route: "/curated/healthcare-ux-researcher",
    required: [
      "healthcare ux research + service design",
      "ux researcher / service designer",
      "34-person survey",
      "self-report sample",
      "not formal uxr",
    ],
  },
];

const maskCss = `
  main p { visibility: hidden !important; }
  main .rp-heroProof,
  main .rp-kicker,
  main .rp-status,
  main .rp-stat__n,
  main .rp-stat__l,
  main .rp-stat__source,
  main .rp-work__n,
  main .rp-work__title,
  main .rp-work__sub,
  main .rp-metagrid__k,
  main .rp-metagrid__v { visibility: visible !important; }
`;

async function installBuildRoute(page) {
  const mime = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".mp4": "video/mp4",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  await page.route("**://portfolio.local/**", async (requestRoute) => {
    const pathname = decodeURIComponent(new URL(requestRoute.request().url()).pathname);
    const relative = pathname.replace(/^\/+/, "");
    const requested = path.resolve(buildDir, relative);
    const inside = requested === buildDir || requested.startsWith(`${buildDir}${path.sep}`);
    const file = inside && fs.existsSync(requested) && fs.statSync(requested).isFile()
      ? requested
      : path.join(buildDir, "index.html");
    await requestRoute.fulfill({
      status: 200,
      path: file,
      contentType: mime[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
  });
}

async function inspect(page, routeName, required) {
  return page.evaluate(({ name, claims }) => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
    };
    const normalized = document.body.innerText.replace(/\s+/g, " ").trim().toLowerCase();
    const images = [...document.querySelectorAll("main img")];
    const heroBounds = [...document.querySelectorAll(".rp-clearing, .rp-eyebrow, .rp-h1, .rp-hero__ctas")]
      .filter(visible)
      .map((element) => ({
        selector: element.className,
        rect: element.getBoundingClientRect(),
      }));
    const unresolvedClaims = claims.filter((claim) => !normalized.includes(claim));
    const visibleParagraphs = [...document.querySelectorAll("main p")]
      .filter(visible)
      .map((element) => ({
        classes: element.className,
        text: element.textContent.replace(/\s+/g, " ").trim().slice(0, 120),
      }));
    const allowedParagraph = /(^|\s)(rp-heroProof|rp-kicker|rp-status|rp-stat__n|rp-stat__l|rp-stat__source|rp-work__n|rp-work__title|rp-work__sub|rp-metagrid__k|rp-metagrid__v)(\s|$)/;
    const leakedBodyParagraphs = visibleParagraphs.filter((paragraph) => !allowedParagraph.test(paragraph.classes));
    const openingFilm = document.querySelector(".rp-openingFilm");
    const homeArtifacts = name === "home" ? {
      count: document.querySelectorAll(".rp-work__thumb").length,
      mechanismCount: document.querySelectorAll(".rp-work__thumb--mechanism").length,
      imageSources: [...document.querySelectorAll(".rp-work__thumb img")].map((image) => image.getAttribute("src")),
    } : undefined;

    return {
      name,
      h1: [...document.querySelectorAll("main h1")].filter(visible).map((element) => element.textContent.replace(/\s+/g, " ").trim()),
      unresolvedClaims,
      leakedBodyParagraphs,
      horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      brokenImages: images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.getAttribute("src")),
      clippedHeroElements: heroBounds
        .filter(({ rect }) => rect.left < -1 || rect.right > document.documentElement.clientWidth + 1)
        .map(({ selector, rect }) => ({ selector, left: Math.round(rect.left), right: Math.round(rect.right) })),
      heroEvidenceItems: document.querySelectorAll(".rp-heroEvidence > div").length,
      openingFilmVisibleBeforeAction: Boolean(openingFilm && visible(openingFilm)),
      homeArtifacts,
      visibleTextPreview: normalized.slice(0, 700),
    };
  }, { name: routeName, claims: required });
}

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const results = [];
  try {
    for (const width of widths) {
      for (const item of routes) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
        await installBuildRoute(page);
        await page.addInitScript(() => {
          localStorage.setItem("lang", "en");
          localStorage.setItem("darkMode", "false");
        });
        await page.goto(`http://portfolio.local${item.route}`, { waitUntil: "domcontentloaded" });
        await page.waitForSelector("main h1", { timeout: 30000 });
        await page.addStyleTag({ content: maskCss });
        await page.waitForTimeout(350);
        const result = { width, ...(await inspect(page, item.name, item.required)) };
        results.push(result);
        await page.screenshot({
          path: path.join(outputDir, `${item.name}-${width}-masked.png`),
          fullPage: true,
          timeout: 120000,
        });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  const failures = results.filter((result) =>
    result.unresolvedClaims.length
    || result.leakedBodyParagraphs.length
    || result.horizontalOverflow
    || result.brokenImages.length
    || result.clippedHeroElements.length
    || result.openingFilmVisibleBeforeAction
    || (["msk", "logistics", "grove"].includes(result.name) && result.heroEvidenceItems < 4)
    || (result.name === "home" && (
      result.homeArtifacts.count < 3
      || result.homeArtifacts.mechanismCount < 1
      || result.homeArtifacts.imageSources.includes("/assets/about/army.jpg")
    )),
  );
  const report = { verdict: failures.length ? "FAIL" : "PASS", results, failures };
  fs.writeFileSync(path.join(outputDir, "report.json"), JSON.stringify(report, null, 2));
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
