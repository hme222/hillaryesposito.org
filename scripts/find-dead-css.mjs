#!/usr/bin/env node
/**
 * Dead-selector analysis for a stylesheet.
 *
 * Deliberately biased toward KEEPING rules. A false positive here deletes live
 * styling and is only visible by eye, so every ambiguity resolves to "used":
 *
 *  - a class counts as used if its name appears anywhere in the source corpus,
 *    including inside another stylesheet, an HTML file, or a JS string
 *  - classes built dynamically (`carto--${edition}`) are covered by harvesting
 *    literal prefixes that sit immediately before a `${` and keeping anything
 *    starting with one
 *  - state/global classes applied at runtime are always kept
 *
 * A rule is dead only when at least one of its class tokens can never exist,
 * since a descendant selector needs every token present to match.
 *
 * Usage: node scripts/find-dead-css.mjs <css> [--apply]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const target = process.argv[2];
const apply = process.argv.includes("--apply");
if (!target) { console.error("usage: find-dead-css.mjs <css> [--apply]"); process.exit(1); }

const ROOT = "my-app/src";
const EXTRA = ["my-app/public/index.html", "my-app/public/404.html"];

// Runtime-applied or framework classes that may never appear as a literal.
const ALWAYS_KEEP = new Set([
  "dark-mode", "app", "is-active", "is-in", "is-shown", "is-open", "is-paused",
  "is-floating", "is-cursor", "sr-only", "sr-only-focusable", "active", "show",
]);

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if ([".tsx", ".ts", ".js", ".jsx", ".html", ".css"].includes(extname(p))) out.push(p);
  }
  return out;
}

const files = [...walk(ROOT), ...EXTRA].filter((f) => !f.endsWith(target.split("/").pop()));
const corpus = files.map((f) => readFileSync(f, "utf8")).join("\n");

// Literal prefixes that precede a template interpolation, e.g. `carto--${x}`
// or `fp-capture--${i}`. Anything starting with one of these is kept.
const dynamicPrefixes = new Set();
for (const m of corpus.matchAll(/([A-Za-z0-9_-]+)\$\{/g)) {
  if (m[1].length >= 3) dynamicPrefixes.add(m[1]);
}

const css = readFileSync(target, "utf8");
const usedCache = new Map();
function classIsUsed(name) {
  if (usedCache.has(name)) return usedCache.get(name);
  let used = ALWAYS_KEEP.has(name) || corpus.includes(name);
  if (!used) for (const p of dynamicPrefixes) { if (name.startsWith(p)) { used = true; break; } }
  usedCache.set(name, used);
  return used;
}

/** Split top-level, brace-aware, keeping @-blocks whole for recursion. */
function splitRules(text) {
  const out = [];
  let depth = 0, start = 0, inComment = false;
  for (let i = 0; i < text.length; i++) {
    if (!inComment && text[i] === "/" && text[i + 1] === "*") { inComment = true; i++; continue; }
    if (inComment) { if (text[i] === "*" && text[i + 1] === "/") { inComment = false; i++; } continue; }
    if (text[i] === "{") depth++;
    else if (text[i] === "}") { depth--; if (depth === 0) { out.push(text.slice(start, i + 1)); start = i + 1; } }
  }
  if (start < text.length) out.push(text.slice(start));
  return out;
}

let removed = 0, kept = 0;
const deadNames = [];

function processBlock(block) {
  const brace = block.indexOf("{");
  if (brace === -1) return block;
  const prelude = block.slice(0, brace);
  const selector = prelude.replace(/\/\*[\s\S]*?\*\//g, "").trim();

  // Recurse into at-rules that contain nested rules.
  if (/^@(media|supports|layer|container)/.test(selector)) {
    const inner = block.slice(brace + 1, block.lastIndexOf("}"));
    const rebuilt = splitRules(inner).map(processBlock).join("");
    if (!rebuilt.trim()) return "";                    // whole block died
    return `${prelude}{${rebuilt}\n}\n`;
  }
  // Never touch these.
  if (/^@(keyframes|font-face|import|charset|page|property)/.test(selector) || !selector) { kept++; return block; }

  // Every comma-separated selector that still has a chance of matching.
  const parts = selector.split(",").map((s) => s.trim()).filter(Boolean);
  const live = parts.filter((part) => {
    const classes = [...part.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g)].map((m) => m[1]);
    if (!classes.length) return true;                  // element/:root/etc — keep
    const dead = classes.filter((c) => !classIsUsed(c));
    if (dead.length) { deadNames.push(...dead); return false; }
    return true;
  });

  if (!live.length) { removed++; return ""; }
  kept++;
  return live.length === parts.length ? block : `${live.join(",\n")} ${block.slice(brace)}`;
}

const rebuilt = splitRules(css).map(processBlock).join("");

console.log(`${target}`);
console.log(`  rules kept:    ${kept}`);
console.log(`  rules removed: ${removed}`);
console.log(`  bytes: ${css.length} -> ${rebuilt.length} (${Math.round((1 - rebuilt.length / css.length) * 100)}% smaller)`);
console.log(`  distinct dead classes: ${new Set(deadNames).size}`);
if (!apply) {
  console.log(`  sample: ${[...new Set(deadNames)].slice(0, 12).join(", ")}`);
  console.log("  (dry run — pass --apply to write)");
} else {
  writeFileSync(target, rebuilt);
  console.log("  WRITTEN");
}
