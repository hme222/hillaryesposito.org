#!/usr/bin/env node
/**
 * Static shells for the public routes.
 *
 * GitHub Pages has no server-side routing, so /case-study/msk was resolving to
 * 404.html — served with a real HTTP 404 and a <title>Redirecting...</title>.
 * People never noticed, because the SPA bounce puts them on the right page. But
 * crawlers and link scrapers do not run JavaScript, so:
 *
 *   - the sitemap advertised five URLs and four of them returned 404
 *   - every case-study link shared with a recruiter produced no preview card
 *
 * Writing <route>/index.html turns each into a real 200 with its own metadata,
 * and the SPA takes over from there exactly as before.
 *
 * Only public routes get a shell. /curated/* is deliberately excluded: those
 * pages are direct-link-only and carry noindex, so giving them a crawlable
 * 200 would publish exactly what they are meant to keep private.
 *
 * ROUTE_META below must stay in step with my-app/src/hooks/usePageTitle.ts.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");
const ORIGIN = "https://hillaryesposito.org";

const ROUTES = [
  {
    path: "about",
    title: "About | Hillary Esposito",
    description:
      "About Hillary Esposito: a product designer combining research rigor, systems thinking, consumer craft, and responsible AI judgment.",
    image: "/assets/about/now.jpg",
  },
  {
    path: "case-study/grove",
    title: "Grove — Risograph Cartography | Hillary Esposito",
    description:
      "How Hillary redesigned Grove, a functional plant-care prototype, through discovery research, calmer interaction design, and explicit AI judgment.",
    image: "/assets/grove/grove1.png",
  },
  {
    path: "case-study/msk",
    title: "MSK — Clinical Systems Case Study | Hillary Esposito",
    description:
      "A healthcare systems case study: designing clearer operational workflows for more than 21,000 people at Memorial Sloan Kettering.",
    image: "/assets/msk/mskcc-map.png",
  },
  {
    path: "case-study/mobbin",
    title: "Mobbin — UX Flow Documentation Case Study | Hillary Esposito",
    description:
      "A pattern study documenting more than 200 consumer app screens to understand onboarding, discovery, trust, and interaction craft.",
    image: "/assets/mobbin/discover.jpg",
  },
];

const shell = readFileSync(join(DOCS, "index.html"), "utf8");

/** Replace a tag's content attribute, or append the tag if the shell lacks it. */
function setMeta(html, matcher, replacement) {
  return matcher.test(html) ? html.replace(matcher, replacement) : html.replace("</head>", `  ${replacement}\n</head>`);
}

let written = 0;
for (const route of ROUTES) {
  const url = `${ORIGIN}/${route.path}`;
  let html = shell;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
  html = setMeta(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${route.description}"/>`);
  html = setMeta(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${route.title}"/>`);
  html = setMeta(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${route.description}"/>`);
  html = setMeta(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${ORIGIN}${route.image}"/>`);
  html = setMeta(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}"/>`);
  html = setMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${route.title}"/>`);
  html = setMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${route.description}"/>`);
  html = setMeta(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${ORIGIN}${route.image}"/>`);
  html = setMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}"/>`);

  const dir = join(DOCS, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written += 1;
  console.log(`  prerendered /${route.path}`);
}
console.log(`✅ ${written} route shells written`);
