#!/usr/bin/env node

const path = require("node:path");
const { chromium } = require(
  process.env.CODEX_NODE_MODULES
    ? path.join(process.env.CODEX_NODE_MODULES, "playwright")
    : "/Users/hills_mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const baseUrl = process.env.PORTFOLIO_URL || "http://127.0.0.1:3000";
const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function testBackRestoration(browser, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 520));
  await page.waitForTimeout(80);
  const before = await page.evaluate(() => Math.round(window.scrollY));
  const storedBeforeClick = await page.evaluate(() => Number(sessionStorage.getItem("portfolio-scroll:/")));
  await page.locator('a[href="/case-study/msk"]').first().click();
  await page.waitForSelector("#msk-workflow");
  await page.goBack({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1450);
  const after = await page.evaluate(() => Math.round(window.scrollY));
  await page.close();
  return { width, before, storedBeforeClick, after, difference: Math.abs(before - after), pass: Math.abs(before - after) <= 1020 };
}

async function testLanguageRecovery(browser, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.addInitScript(() => window.localStorage.setItem("lang", "en"));
  await page.goto(`${baseUrl}/case-study/msk`, { waitUntil: "domcontentloaded" });
  await page.locator("#msk-workflow").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 80));
  const languageButtonBox = await page.locator(".lang-btn").boundingBox();
  const languageButtonInViewport = Boolean(
    languageButtonBox &&
    languageButtonBox.x >= 0 &&
    languageButtonBox.y >= 0 &&
    languageButtonBox.x + languageButtonBox.width <= width &&
    languageButtonBox.y + languageButtonBox.height <= 900,
  );
  if (!languageButtonInViewport) {
    await page.getByRole("button", { name: "Open menu" }).click();
  }
  await page.locator(".lang-btn").click();
  await page.waitForSelector('[lang="es"] [data-language-anchor="msk-workflow"]');
  await page.waitForTimeout(120);
  const result = await page.evaluate(() => {
    const target = document.querySelector('[data-language-anchor="msk-workflow"]');
    const active = document.querySelector('.rp-chapters a[aria-current="true"]');
    return {
      language: document.documentElement.lang,
      targetTop: target ? Math.round(target.getBoundingClientRect().top) : null,
      focusInsideTarget: Boolean(target && target.contains(document.activeElement)),
      activeHref: active?.getAttribute("href") || null,
    };
  });
  await page.close();
  return {
    width,
    ...result,
    pass:
      result.language === "es" &&
      result.targetTop !== null &&
      result.targetTop >= -10 &&
      result.targetTop < 260 &&
      result.focusInsideTarget &&
      result.activeHref === "#es-msk-workflow",
  };
}

async function testAboutWayfinding(browser, width) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(`${baseUrl}/about`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.locator('.rp-chapters a[href="#about-proof"]').click();
  await page.waitForTimeout(1350);
  const state = await page.evaluate(() => ({
    activeHref: document.querySelector('.rp-chapters a[aria-current="true"]')?.getAttribute("href") || null,
    proofTop: Math.round(document.querySelector("#about-proof")?.getBoundingClientRect().top || 0),
    referenceLine: Math.min(240, window.innerHeight * 0.3),
  }));
  await page.close();
  return { width, ...state, pass: state.activeHref === "#about-proof" };
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-gpu"],
  });
  try {
    const results = {
      backRestoration: [],
      languageRecovery: [],
      aboutWayfinding: [],
    };
    for (const width of [390, 1440]) {
      results.backRestoration.push(await testBackRestoration(browser, width));
      results.languageRecovery.push(await testLanguageRecovery(browser, width));
      results.aboutWayfinding.push(await testAboutWayfinding(browser, width));
    }
    results.pass = Object.values(results)
      .flat()
      .filter((item) => item && typeof item === "object" && "pass" in item)
      .every((item) => item.pass);
    process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
    if (!results.pass) process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
