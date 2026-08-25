#!/usr/bin/env node
/**
 * Fail a release when a public route shell loads a different executable build
 * than the root page. Route metadata may differ; JS and CSS fingerprints may not.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const ROUTES = [
  "about",
  "case-study/grove",
  "case-study/msk",
  "case-study/mobbin",
  "case-study/logistics",
];

function assets(html) {
  return [...html.matchAll(/(?:src|href)="\/static\/(?:js|css)\/([^"?]+)"/g)]
    .map((match) => match[1])
    .sort();
}

const rootAssets = assets(readFileSync(join(DOCS, "index.html"), "utf8"));
if (rootAssets.length < 2) {
  throw new Error(`Root shell has an incomplete executable fingerprint: ${rootAssets.join(", ") || "none"}`);
}

let failures = 0;
for (const route of ROUTES) {
  const routeAssets = assets(readFileSync(join(DOCS, route, "index.html"), "utf8"));
  if (JSON.stringify(routeAssets) !== JSON.stringify(rootAssets)) {
    failures += 1;
    console.error(`FAIL /${route}`);
    console.error(`  root:  ${rootAssets.join(", ")}`);
    console.error(`  route: ${routeAssets.join(", ") || "none"}`);
  } else {
    console.log(`PASS /${route} · ${routeAssets.join(" · ")}`);
  }
}

if (failures) {
  console.error(`\n❌ ${failures} public route shell${failures === 1 ? "" : "s"} load a stale build.`);
  process.exit(1);
}

console.log(`\n✅ ${ROUTES.length}/${ROUTES.length} public route shells match the root build.`);

