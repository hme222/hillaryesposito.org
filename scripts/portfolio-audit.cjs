#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEX_NODE_MODULES
    ? path.join(process.env.CODEX_NODE_MODULES, "playwright")
    : "/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const baseUrl = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const outputDir = process.env.PORTFOLIO_AUDIT_DIR || "/tmp/portfolio-design-review";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const routes = [
  { path: "/", name: "home", indexable: true },
  { path: "/about", name: "about", indexable: true },
  { path: "/case-study/grove", name: "grove", indexable: true },
  { path: "/case-study/msk", name: "msk", indexable: true },
  { path: "/case-study/mobbin", name: "mobbin", indexable: true },
  {
    path: "/curated/indyx-ux-product-designer",
    name: "curated-indyx",
    indexable: false,
  },
  {
    path: "/curated/fashion-campaign-system",
    name: "fashion",
    indexable: false,
  },
  { path: "/not-a-real-route", name: "not-found", indexable: false },
];

const widths = [320, 390, 900, 1440];
const screenshotWidths = new Set([390, 1440]);
const captureFullPage = process.env.PORTFOLIO_FULL_PAGE === "1";
const motionPreference =
  process.env.PORTFOLIO_REDUCED_MOTION === "1" ? "reduce" : "no-preference";
const routeFilter = process.env.PORTFOLIO_ROUTES
  ? new Set(process.env.PORTFOLIO_ROUTES.split(",").map((value) => value.trim()))
  : null;
const activeRoutes = routeFilter
  ? routes.filter((route) => routeFilter.has(route.name) || routeFilter.has(route.path))
  : routes;

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

async function inspectPage(page, expectedIndexable) {
  return page.evaluate((shouldIndex) => {
    const isVisible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const interactive = [
      ...document.querySelectorAll(
        'a[href], button, input, select, textarea, [role="button"]',
      ),
    ].filter(isVisible);

    const ids = [...document.querySelectorAll("[id]")].map(
      (element) => element.id,
    );
    const duplicateIds = [
      ...new Set(ids.filter((id, index) => ids.indexOf(id) !== index)),
    ];

    const smallTargets = interactive
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          label: (
            element.textContent ||
            element.getAttribute("aria-label") ||
            ""
          )
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 80),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
      .filter(({ width, height }) => width < 44 || height < 44);

    const headings = [
      ...document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ]
      .filter(isVisible)
      .map((heading) => ({
        level: Number(heading.tagName.slice(1)),
        text: (heading.textContent || "").replace(/\s+/g, " ").trim(),
      }));

    const headingSkips = [];
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index].level > headings[index - 1].level + 1) {
        headingSkips.push({
          from: headings[index - 1],
          to: headings[index],
        });
      }
    }

    const images = [...document.images];
    const robots =
      document.querySelector('meta[name="robots"]')?.getAttribute("content") ||
      "";
    const noIndex = /(^|,|\s)noindex(,|\s|$)/i.test(robots);
    const navbar = document.querySelector(".navbar");
    const navbarStyle = navbar ? window.getComputedStyle(navbar) : null;
    const navbarRect = navbar?.getBoundingClientRect();
    const runningAnimations = document
      .getAnimations()
      .filter((animation) => animation.playState === "running")
      .map((animation) => {
        const timing = animation.effect?.getComputedTiming();
        return {
          duration:
            typeof timing?.duration === "number" ? timing.duration : null,
          iterations: timing?.iterations ?? null,
        };
      });

    return {
      title: document.title,
      language: document.documentElement.lang,
      mainCount: document.querySelectorAll("main").length,
      h1: [...document.querySelectorAll("h1")]
        .filter(isVisible)
        .map((heading) => heading.textContent.replace(/\s+/g, " ").trim()),
      pageWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      horizontalOverflow:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      brokenImages: images
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
      missingAlt: images
        .filter((image) => !image.hasAttribute("alt"))
        .map((image) => image.currentSrc || image.src),
      duplicateIds,
      headingSkips,
      smallTargetCount: smallTargets.length,
      smallTargets: smallTargets.slice(0, 20),
      interactiveCount: interactive.length,
      robots,
      indexingMismatch: shouldIndex ? noIndex : !noIndex,
      scrollY: Math.round(window.scrollY),
      navbar: navbar
        ? {
            display: navbarStyle?.display,
            visibility: navbarStyle?.visibility,
            opacity: navbarStyle?.opacity,
            transform: navbarStyle?.transform,
            position: navbarStyle?.position,
            rect: navbarRect
              ? {
                  x: Math.round(navbarRect.x),
                  y: Math.round(navbarRect.y),
                  width: Math.round(navbarRect.width),
                  height: Math.round(navbarRect.height),
                }
              : null,
            text: navbar.textContent.replace(/\s+/g, " ").trim(),
          }
        : null,
      runningAnimations,
      bodyPreview: document.body.innerText
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 260),
    };
  }, expectedIndexable);
}

async function inspectKeyboard(page) {
  const stops = [];
  for (let index = 0; index < 18; index += 1) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement)) return null;
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        label: (
          element.textContent ||
          element.getAttribute("aria-label") ||
          ""
        )
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 80),
        visible:
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden",
        focusStyle:
          style.outlineStyle !== "none" ||
          style.boxShadow !== "none" ||
          style.borderColor !== "rgba(0, 0, 0, 0)",
      };
    });
    if (stop) stops.push(stop);
  }

  return {
    stopCount: stops.length,
    invisibleStops: stops.filter((stop) => !stop.visible),
    unstyledStops: stops.filter((stop) => !stop.focusStyle),
    stops,
  };
}

async function run() {
  ensureDirectory(outputDir);
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const results = [];
  try {
    for (const width of widths) {
      for (const route of activeRoutes) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
          deviceScaleFactor: 1,
          reducedMotion: motionPreference,
        });
        const consoleErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => consoleErrors.push(error.message));

        const response = await page.goto(`${baseUrl}${route.path}`, {
          waitUntil: "networkidle",
        });
        await page.waitForTimeout(250);
        await page.evaluate(() => window.scrollTo(0, 0));

        const inspection = await inspectPage(page, route.indexable);

        if (screenshotWidths.has(width)) {
          await page.screenshot({
            path: path.join(
              outputDir,
              `${route.name}-${width}${captureFullPage ? "-full" : ""}.png`,
            ),
            fullPage: captureFullPage,
          });
        }

        const keyboard =
          width === 390 ? await inspectKeyboard(page) : undefined;

        results.push({
          route: route.path,
          name: route.name,
          width,
          status: response?.status() ?? null,
          consoleErrors: [...new Set(consoleErrors)],
          ...inspection,
          keyboard,
        });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  const reportPath = path.join(outputDir, "audit.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const summary = {
    auditedStates: results.length,
    overflow: results.filter((result) => result.horizontalOverflow),
    brokenImages: results.filter((result) => result.brokenImages.length),
    missingAlt: results.filter((result) => result.missingAlt.length),
    duplicateIds: results.filter((result) => result.duplicateIds.length),
    headingSkips: results.filter((result) => result.headingSkips.length),
    indexingMismatch: results.filter((result) => result.indexingMismatch),
    consoleErrors: results.filter((result) => result.consoleErrors.length),
    keyboardInvisible: results.filter(
      (result) => result.keyboard?.invisibleStops.length,
    ),
    keyboardUnstyled: results.filter(
      (result) => result.keyboard?.unstyledStops.length,
    ),
    longRunningAnimations: results.filter((result) =>
      result.runningAnimations.some(
        (animation) =>
          animation.duration === null ||
          animation.duration > 50 ||
          animation.iterations === Infinity,
      ),
    ),
    smallTargetStates: results
      .filter((result) => result.smallTargetCount)
      .map(({ route, width, smallTargetCount, smallTargets }) => ({
        route,
        width,
        smallTargetCount,
        smallTargets,
      })),
  };

  fs.writeFileSync(
    path.join(outputDir, "summary.json"),
    JSON.stringify(summary, null, 2),
  );
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
