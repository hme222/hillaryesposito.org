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
 * Public routes and approved direct-link recruiter routes get shells. Curated
 * routes remain noindex/nofollow and stay out of the sitemap; the shell removes
 * recruiter-link 404 friction without turning them into search landing pages.
 *
 * ROUTE_META below must stay in step with my-app/src/hooks/usePageTitle.ts.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = process.env.PORTFOLIO_DOCS_DIR
  ? resolve(process.env.PORTFOLIO_DOCS_DIR)
  : join(ROOT, "docs");
const ORIGIN = "https://hillaryesposito.org";

const PUBLIC_ROUTES = [
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
  {
    path: "case-study/logistics",
    title: "Medical Logistics — Army Operations Case Study | Hillary Esposito",
    description:
      "A service design case study: directing medical resupply for 5,000+ soldiers across seven aid stations in three countries, and cutting resupply time by 85%.",
    image: "/assets/about/army.jpg",
  },
];

// Direct-link recruiter routes need real 200 shells for hiring teams and link
// checkers, but remain out of search. They are intentionally excluded from the
// sitemap and receive an explicit noindex/nofollow directive in their shell.
const DIRECT_LINK_ROUTES = [
  {
    path: "curated/healthcare-product-service-designer",
    title: "Healthcare product design: Mid-level Product Designer · Healthcare enterprise and internal tools | Hillary Esposito",
    description:
      "Healthcare product and service design evidence across clinical workflows, care services, internal tools, and medical logistics.",
    image: "/assets/msk/mskcc-map-thumb.jpg",
    robots: "noindex, nofollow",
  },
];

const ROUTES = [...PUBLIC_ROUTES, ...DIRECT_LINK_ROUTES];

const shell = readFileSync(join(DOCS, "index.html"), "utf8");

/** Replace a tag's content attribute, or append the tag if the shell lacks it. */
function setMeta(html, matcher, replacement) {
  return matcher.test(html) ? html.replace(matcher, replacement) : html.replace("</head>", `  ${replacement}\n</head>`);
}

let written = 0;
for (const route of ROUTES) {
  // Trailing slash matches what's actually served: each shell is written to
  // <route>/index.html, a directory GitHub Pages serves at <route>/, not
  // <route>. A canonical/og:url without the slash disagrees with the URL
  // Google's own crawler resolves to, which surfaces as a canonical
  // mismatch in Search Console (confirmed via URL Inspection on
  // case-study/logistics — Google picked the slash version over our
  // declared canonical). Keep this in sync with sitemap.xml.
  const url = `${ORIGIN}/${route.path}/`;
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
  if (route.robots) {
    html = setMeta(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${route.robots}"/>`);
  }

  const dir = join(DOCS, route.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  written += 1;
  console.log(`  prerendered /${route.path}`);
}
console.log(`✅ ${written} route shells written`);

// sitemap.xml previously hand-maintained separately from ROUTES, which is
// exactly how it drifted out of trailing-slash sync with the prerendered
// shells above. Generate it from the same source instead — one place to
// add a route, not two to keep in sync.
const sitemapUrls = [`${ORIGIN}/`, ...PUBLIC_ROUTES.map((route) => `${ORIGIN}/${route.path}/`)];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(DOCS, "sitemap.xml"), sitemap);
console.log(`✅ sitemap.xml regenerated (${sitemapUrls.length} URLs)`);
