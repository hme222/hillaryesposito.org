#!/usr/bin/env node
/**
 * Render harness for the scored panel (eval/rubric.md).
 *
 * Drives a real Chrome via playwright-core, so critics can judge rendered
 * pixels without the Chrome extension. For each route at 1440 and 390 it:
 *   - screenshots the full page (after scrolling through, so reveals have fired)
 *   - runs axe (wcag2a/aa, 2.1aa) with reduced motion on, so GSAP's starting
 *     opacity never shows up as a false contrast failure
 *   - measures horizontal overflow, orphaned last words in h1-h3, interactive
 *     targets under 44px, banned language in rendered text, console errors
 *
 * Usage (from repo root):
 *   node scripts/axe-primary-audit.cjs [--base http://localhost:3217] [--out <dir>] [--routes /,/about]
 *
 * Safe to run from several agents at once: each run writes to its own folder
 * (tmp/panel-render/<timestamp>-<pid>, printed at the end and linked from
 * tmp/panel-render/latest.txt), and runs take a lock so only one drives Chrome
 * at a time. Running in parallel against a dev server used to clobber a shared
 * folder and time out on cold compiles.
 *
 * Confirm --base serves THIS project first: a 200 from another app on the port
 * has fooled a review before. The script prints each page's <title> and h1.
 * Exit code 1 if any hard-gate measurement fails.
 */
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const { chromium } = require(path.join(root, "node_modules", "playwright-core"));
const axeSrc = fs.readFileSync(path.join(root, "node_modules", "axe-core", "axe.min.js"), "utf8");

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > -1 ? process.argv[i + 1] : d; };
const BASE = arg("base", "http://localhost:3000").replace(/\/$/, "");
const RUNS = path.join(root, "tmp", "panel-render");
const RUN_ID = `${new Date().toISOString().replace(/[:.]/g, "-")}-${process.pid}`;
const OUT = path.resolve(arg("out", path.join(RUNS, RUN_ID)));
const LOCK = path.join(RUNS, ".lock");
const ROUTES = (arg("routes", "") || "/,/about,/case-study/grove,/case-study/mobbin,/case-study/msk,/case-study/logistics,/case-study/knowunity,/case-study/ux-woman")
  .split(",").filter(Boolean);
const WIDTHS = [{ w: 1440, h: 900 }, { w: 390, h: 844 }];
const BANNED = /\b(seamless|leverag\w*|elevat\w*|unlock\w*|cutting-edge|game-changing|functional beta|shipped consumer app|production product)\b/i;
const CHROME = process.env.CHROME_PATH || [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium",
].find((p) => fs.existsSync(p));

function measure() {
  const vis = (e) => e.offsetParent !== null && getComputedStyle(e).visibility !== "hidden";
  const orphans = [];
  document.querySelectorAll("h1,h2,h3").forEach((h) => {
    const t = h.textContent.trim();
    if (!vis(h) || t.split(/\s+/).length < 3) return;
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    let last, n; while ((n = walker.nextNode())) last = n;
    if (!last) return;
    const txt = last.textContent.trimEnd(); const i = txt.lastIndexOf(" ");
    if (i < 0) return;
    const r = document.createRange();
    r.setStart(last, i + 1); r.setEnd(last, txt.length);
    const lw = r.getClientRects()[0];
    r.setStart(last, 0); r.setEnd(last, i);
    const pr = r.getClientRects(); const pl = pr[pr.length - 1];
    if (lw && pl && lw.top > pl.bottom - 2) orphans.push(t.slice(0, 60));
  });
  const small = [];
  document.querySelectorAll("a[href],button,summary,[role=button],input,select").forEach((e) => {
    if (!vis(e)) return;
    const r = e.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    // Targets inside running text are exempt under WCAG 2.5.8 (inline links and
    // inline buttons such as the glossary Term, which also adds its own 44px tap
    // area). A flex item is blockified, so a standalone link is still measured.
    const after = getComputedStyle(e, "::after");
    // An inline-block button whose ::after pseudo-element supplies a 44px hit area
    // (the glossary Term trigger) is exempt as well.
    const pseudo44 = after.content !== "none" && parseFloat(after.height) >= 44 && parseFloat(after.width) >= 44;
    const inline = (["A", "BUTTON"].includes(e.tagName) && getComputedStyle(e).display === "inline") || pseudo44;
    if (!inline && (r.height < 44 || r.width < 44)) {
      small.push(`${(e.textContent || e.getAttribute("aria-label") || e.tagName).trim().slice(0, 28)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  });
  return {
    title: document.title,
    h1: (document.querySelector("h1") || {}).textContent?.trim().slice(0, 80) || null,
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    orphans, smallTargets: small.slice(0, 25), smallTargetCount: small.length,
    text: document.body.innerText,
  };
}

const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return false; } };

// One run at a time: wait (up to 10 min) for another run's lock, ignoring dead ones.
async function takeLock() {
  fs.mkdirSync(RUNS, { recursive: true });
  const deadline = Date.now() + 10 * 60 * 1000;
  for (;;) {
    try { fs.writeFileSync(LOCK, String(process.pid), { flag: "wx" }); return; }
    catch (e) {
      let holder = NaN;
      try { holder = parseInt(fs.readFileSync(LOCK, "utf8"), 10); } catch (e2) { /* released */ }
      if (!alive(holder)) { try { fs.unlinkSync(LOCK); } catch (e3) { /* raced */ } continue; }
      if (Date.now() > deadline) { console.error(`Gave up waiting for the render lock held by pid ${holder}.`); process.exit(2); }
      console.log(`Waiting for another render run (pid ${holder}) to finish...`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}
const releaseLock = () => { try { if (parseInt(fs.readFileSync(LOCK, "utf8"), 10) === process.pid) fs.unlinkSync(LOCK); } catch (e) { /* gone */ } };
process.on("exit", releaseLock);
process.on("SIGINT", () => process.exit(130));
process.on("SIGTERM", () => process.exit(143));

// A dev server compiles routes on first request. Warm every route (up to 90s
// each) before measuring, so a cold compile is never mistaken for a broken page.
async function warm() {
  for (const route of ROUTES) {
    const until = Date.now() + 90000;
    for (;;) {
      try {
        const res = await fetch(BASE + route, { signal: AbortSignal.timeout(15000) });
        if (res.ok) break;
      } catch (e) { /* not up yet */ }
      if (Date.now() > until) { console.error(`${BASE}${route} did not respond. Is the dev server up and serving this project?`); process.exit(2); }
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

(async () => {
  if (!CHROME) { console.error("No Chrome found. Set CHROME_PATH."); process.exit(2); }
  await takeLock();
  await warm();
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, timeout: 60000 });
  const report = []; let failed = false;
  for (const vp of WIDTHS) {
    for (const route of ROUTES) {
      const slug = (route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-")) + `-${vp.w}`;
      const row = { route, width: vp.w };
      // 1) static pass: reduced motion, axe + measurements
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, reducedMotion: "reduce" });
      const page = await ctx.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 120)); });
      try {
        await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForSelector("h1", { timeout: 45000 });
        await page.waitForTimeout(700);
        await page.evaluate(axeSrc);
        const axe = await page.evaluate(async () => {
          const a = await axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa"] });
          return a.violations.map((v) => ({
            id: v.id, impact: v.impact, count: v.nodes.length,
            sample: v.nodes.slice(0, 5).map((n) => ({
              target: n.target.join(" ").slice(0, 90),
              data: n.any[0] && n.any[0].data && n.any[0].data.contrastRatio
                ? `${n.any[0].data.fgColor} on ${n.any[0].data.bgColor} = ${n.any[0].data.contrastRatio}` : undefined,
            })),
          }));
        });
        const m = await page.evaluate(measure);
        const banned = (m.text.match(new RegExp(BANNED, "gi")) || []);
        Object.assign(row, {
          title: m.title, h1: m.h1, overflowX: m.overflowX, orphans: m.orphans,
          smallTargetCount: m.smallTargetCount, smallTargets: m.smallTargets,
          banned, axe, consoleErrors: errors,
        });
        // 2) visual pass: motion on, scroll through so reveals fire, then shoot
        const vctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
        const vpage = await vctx.newPage();
        await vpage.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
        await vpage.waitForSelector("h1", { timeout: 45000 });
        const total = await vpage.evaluate(() => document.documentElement.scrollHeight);
        for (let y = 0; y < total; y += vp.h * 0.7) { await vpage.mouse.wheel(0, vp.h * 0.7); await vpage.waitForTimeout(120); }
        await vpage.evaluate(() => window.scrollTo(0, 0));
        await vpage.waitForTimeout(500);
        await vpage.screenshot({ path: path.join(OUT, `${slug}.png`), fullPage: true });
        await vpage.screenshot({ path: path.join(OUT, `${slug}-fold.png`) });
        // Sticky decision tracks (.rp-decisionStory__track, min-height 180vh) look like
        // 700-1100px blank bands in a full-page PNG, but the panel stays pinned while the
        // visitor scrolls through them. Shoot the viewport at three points inside each
        // track so critics judge what a visitor sees. (The panel measured pinned at the
        // same offset across the whole track on MSK, Mobbin and Knowunity, 2026-11-10.)
        const tracks = await vpage.evaluate(() => [...document.querySelectorAll(".rp-decisionStory__track")].map((t) => {
          const r = t.getBoundingClientRect(); const pn = t.querySelector(".rp-decisionStory__panel");
          return { top: Math.round(r.top + scrollY), h: Math.round(r.height), panelH: pn ? Math.round(pn.getBoundingClientRect().height) : 0 };
        }));
        for (let ti = 0; ti < tracks.length; ti++) {
          const t = tracks[ti];
          for (const [n, f] of [[1, 0.1], [2, 0.5], [3, 0.95]]) {
            await vpage.evaluate((y) => window.scrollTo(0, y), Math.max(0, t.top + (t.h - t.panelH) * f - 120));
            await vpage.waitForTimeout(400);
            await vpage.screenshot({ path: path.join(OUT, `${slug}-sticky${tracks.length > 1 ? ti + 1 : ""}-${n}.png`) });
          }
        }
        await vctx.close();
        const gate = m.overflowX > 0 || m.orphans.length || banned.length || axe.some((v) => v.id === "color-contrast");
        if (gate) failed = true;
      } catch (e) { row.error = String(e).slice(0, 200); failed = true; }
      await ctx.close().catch(() => {});
      report.push(row);
      const flags = [
        row.error && `ERROR ${row.error}`,
        row.overflowX > 0 && `overflowX ${row.overflowX}px`,
        row.orphans && row.orphans.length && `orphans ${row.orphans.length}`,
        row.banned && row.banned.length && `banned ${row.banned.join(",")}`,
        row.axe && row.axe.length && `axe ${row.axe.map((v) => `${v.id}:${v.count}`).join(" ")}`,
        row.smallTargetCount && `targets<44px ${row.smallTargetCount}`,
      ].filter(Boolean);
      console.log(`${String(vp.w).padStart(4)} ${route.padEnd(24)} "${row.title || "?"}" | ${flags.length ? flags.join(" | ") : "clean"}`);
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(RUNS, "latest.txt"), OUT + "\n");
  console.log(`\nScreenshots + report.json: ${OUT}`);
  console.log(failed ? "HARD GATE MEASUREMENT FAILED (see above)" : "Hard-gate measurements pass (overflow, orphans, banned language, contrast).");
  console.log("Not measured here: claim truth, voice, motion feel, dark mode, Spanish routes, keyboard order.");
  process.exit(failed ? 1 : 0);
})();
