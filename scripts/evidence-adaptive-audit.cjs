#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(
  process.env.CODEX_NODE_MODULES
    ? path.join(process.env.CODEX_NODE_MODULES, "playwright")
    : "/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const baseUrl = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const outputDir = process.env.EVIDENCE_AUDIT_DIR || "/tmp/evidence-adaptive-audit";
const chromePath =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const projects = [
  { name: "grove", path: "/case-study/grove", target: "#grove-override" },
  { name: "msk", path: "/case-study/msk", target: "#msk-workflow" },
  { name: "mobbin", path: "/case-study/mobbin", target: "#mobbin-work" },
];

const allModes = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "zoom-200", width: 720, height: 1000 },
  { name: "zoom-400", width: 360, height: 1000 },
  { name: "text-spacing", width: 390, height: 1000, textSpacing: true },
  { name: "forced-colors", width: 390, height: 1000, forcedColors: "active" },
  { name: "reduced-motion", width: 390, height: 1000, reducedMotion: "reduce" },
];
const modeFilter = process.env.EVIDENCE_MODES
  ? new Set(process.env.EVIDENCE_MODES.split(",").map((value) => value.trim()))
  : null;
const projectFilter = process.env.EVIDENCE_PROJECTS
  ? new Set(process.env.EVIDENCE_PROJECTS.split(",").map((value) => value.trim()))
  : null;
const modes = modeFilter ? allModes.filter((mode) => modeFilter.has(mode.name)) : allModes;
const activeProjects = projectFilter
  ? projects.filter((project) => projectFilter.has(project.name))
  : projects;

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

async function inspectPoster(page, expectedTarget) {
  return page.evaluate((target) => {
    const poster = document.querySelector(".evidence-poster");
    const visual = poster;
    const shell = poster?.closest(".evidence-poster-shell");
    const caption = shell?.querySelector(":scope > figcaption");
    const link = caption?.querySelector("a[href]");
    const posterRect = poster?.getBoundingClientRect();
    const linkRect = link?.getBoundingClientRect();
    const visibleText = poster
      ? [...poster.querySelectorAll("h1,h2,h3,h4,p,li,dt,dd,span,strong")].filter(
          (element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return (
              element.textContent.trim() &&
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0
            );
          },
        )
      : [];
    const clippedText = posterRect
      ? visibleText
          .filter((element) => !element.closest("figcaption"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              text: element.textContent.replace(/\s+/g, " ").trim().slice(0, 80),
              top: Math.round(rect.top),
              right: Math.round(rect.right),
              bottom: Math.round(rect.bottom),
              left: Math.round(rect.left),
            };
          })
          .filter(
            (rect) =>
              rect.left < posterRect.left - 1 ||
              rect.right > posterRect.right + 1 ||
              rect.top < posterRect.top - 1 ||
              rect.bottom > posterRect.bottom + 1,
          )
      : [];

    return {
      title: document.querySelector(".evidence-media-section h2")?.textContent.trim() || "",
      pageOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      pageWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      wideElements: [...document.querySelectorAll("body *")]
        .map((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            tag: element.tagName.toLowerCase(),
            className: typeof element.className === "string" ? element.className.slice(0, 120) : "",
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            visible:
              style.display !== "none" &&
              style.visibility !== "hidden" &&
              rect.width > 0 &&
              rect.height > 0,
          };
        })
        .filter(
          (element) =>
            element.visible &&
            (element.left < -1 || element.right > document.documentElement.clientWidth + 1),
        )
        .sort((a, b) => b.width - a.width)
        .slice(0, 12),
      posterPresent: Boolean(poster),
      posterOverflow:
        poster ? poster.scrollWidth > poster.clientWidth + 1 || poster.scrollHeight > poster.clientHeight + 1 : true,
      clippedText,
      visualHidden: visual?.getAttribute("aria-hidden") === "true",
      captionText: caption?.innerText.replace(/\s+/g, " ").trim() || "",
      link: link
        ? {
            href: link.getAttribute("href"),
            targetExists: Boolean(document.querySelector(target)),
            width: Math.round(linkRect.width),
            height: Math.round(linkRect.height),
          }
        : null,
      runningAnimations: (poster?.getAnimations({ subtree: true }) || [])
        .filter((animation) => animation.playState === "running")
        .map((animation) => {
          const timing = animation.effect?.getComputedTiming();
          return { duration: timing?.duration ?? null, iterations: timing?.iterations ?? null };
        }),
    };
  }, expectedTarget);
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
    for (const mode of modes) {
      for (const project of activeProjects) {
        const page = await browser.newPage({
          viewport: { width: mode.width, height: mode.height },
          deviceScaleFactor: 1,
          forcedColors: mode.forcedColors || "none",
          reducedMotion: mode.reducedMotion || "no-preference",
        });
        const errors = [];
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text());
        });
        page.on("pageerror", (error) => errors.push(error.message));

        await page.goto(`${baseUrl}${project.path}`, { waitUntil: "networkidle" });
        if (mode.textSpacing) {
          await page.addStyleTag({
            content: `
              .evidence-media-section * {
                line-height: 1.5 !important;
                letter-spacing: 0.12em !important;
                word-spacing: 0.16em !important;
              }
              .evidence-media-section p {
                margin-block-end: 2em !important;
              }
            `,
          });
        }
        await page.locator(".evidence-media-section").scrollIntoViewIfNeeded();
        await page.waitForTimeout(850);

        const inspection = await inspectPoster(page, project.target);
        const screenshot = path.join(outputDir, `${project.name}-${mode.name}.png`);
        await page.locator(".evidence-media-section").screenshot({ path: screenshot });
        let reflowRecruiter = null;
        if (mode.width <= 480) {
          const fixedDisplay = await page.locator(".recruiter-pill").evaluate(
            (element) => getComputedStyle(element).display,
          );
          const fixedBackDisplay = await page.locator(".back-to-top").evaluate(
            (element) => getComputedStyle(element).display,
          );
          await page.locator(".hamburger").click();
          const entry = page.locator(".nav-recruiter-entry button");
          const entryVisible = await entry.isVisible();
          if (entryVisible) await entry.click();
          const dialog = page.locator(".recruiter-panel");
          reflowRecruiter = {
            fixedHidden: fixedDisplay === "none",
            menuEntryVisible: entryVisible,
            dialogOpened: await dialog.isVisible(),
          };
          if (await dialog.isVisible()) {
            await dialog.locator('button[aria-label="Close recruiter view"]').click();
          }
          await page.locator(".hamburger").click();
          const backEntry = page.locator(".nav-back-to-top-entry button");
          const backEntryVisible = await backEntry.isVisible();
          if (backEntryVisible) await backEntry.click();
          await page.waitForTimeout(mode.reducedMotion === "reduce" ? 100 : 900);
          const returnedToTop = (await page.evaluate(() => window.scrollY)) <= 1;
          reflowRecruiter.fixedBackHidden = fixedBackDisplay === "none";
          reflowRecruiter.backEntryVisible = backEntryVisible;
          reflowRecruiter.returnedToTop = returnedToTop;
        }
        results.push({
          project: project.name,
          mode: mode.name,
          screenshot,
          errors,
          reflowRecruiter,
          ...inspection,
        });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  const failures = results.flatMap((result) => {
    const issues = [];
    if (!result.posterPresent) issues.push("poster missing");
    if (result.pageOverflow) issues.push("page horizontal overflow");
    if (result.posterOverflow) issues.push("poster content overflow");
    if (result.clippedText.length) issues.push(`${result.clippedText.length} clipped text nodes`);
    if (!result.visualHidden) issues.push("visual poster is not hidden from assistive technology");
    if (!result.captionText) issues.push("live accessible caption missing");
    if (!result.link?.targetExists) issues.push("chapter target missing");
    if ((result.link?.height || 0) < 44) issues.push("link target below 44px height");
    if (result.errors.length) issues.push(`${result.errors.length} console errors`);
    if (result.mode === "reduced-motion" && result.runningAnimations.length) {
      issues.push(`${result.runningAnimations.length} animations running with reduced motion`);
    }
    if (result.reflowRecruiter && !result.reflowRecruiter.fixedHidden) {
      issues.push("fixed recruiter shortcut overlays reflow content");
    }
    if (result.reflowRecruiter && !result.reflowRecruiter.menuEntryVisible) {
      issues.push("mobile recruiter entry missing");
    }
    if (result.reflowRecruiter && !result.reflowRecruiter.dialogOpened) {
      issues.push("mobile recruiter entry did not open the dialog");
    }
    if (result.reflowRecruiter && !result.reflowRecruiter.fixedBackHidden) {
      issues.push("fixed back-to-top control overlays reflow content");
    }
    if (result.reflowRecruiter && !result.reflowRecruiter.backEntryVisible) {
      issues.push("mobile back-to-top entry missing");
    }
    if (result.reflowRecruiter && !result.reflowRecruiter.returnedToTop) {
      issues.push("mobile back-to-top entry did not return to the page start");
    }
    return issues.map((issue) => ({ project: result.project, mode: result.mode, issue }));
  });

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    sourceStatus: "Verified runtime evidence",
    results,
    failures,
    passed: failures.length === 0,
  };
  fs.writeFileSync(path.join(outputDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ passed: report.passed, checks: results.length, failures }, null, 2));
  process.exitCode = report.passed ? 0 : 1;
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
