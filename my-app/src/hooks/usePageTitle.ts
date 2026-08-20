import { useEffect } from "react";

const BASE = "Hillary Esposito";
const DEFAULT_TITLE = `${BASE} | Healthcare Product & Service Designer`;
const DEFAULT_DESCRIPTION =
  "Healthcare product and service designer with 13+ years in cancer-care operations and medical logistics; initiated a clinical workflow that contributed to a 20% organization-wide EMR cost reduction.";
const ORIGIN = "https://hillaryesposito.org";

const ROUTE_META: Array<{ match: RegExp; description: string; image: string }> = [
  {
    match: /\/case-study\/grove$/,
    description:
      "How Hillary redesigned Grove, a functional plant-care prototype, through discovery research, calmer interaction design, and explicit AI judgment.",
    image: "/assets/grove/grove1.png",
  },
  {
    match: /\/case-study\/msk$/,
    description:
      "How a paper-to-digital workflow initiated at Memorial Sloan Kettering later contributed inside a larger initiative that reduced organization-wide EMR costs by 20%.",
    image: "/assets/msk/mskcc-map.jpg",
  },
  {
    match: /\/case-study\/mobbin$/,
    description:
      "A pattern study documenting more than 200 screens across three finance apps to understand onboarding, discovery, trust, and interaction craft.",
    image: "/assets/mobbin/discover.jpg",
  },
  {
    match: /\/about$/,
    description:
      "About Hillary Esposito: a healthcare product and service designer combining clinical workflow knowledge, service systems, research rigor, and responsible AI judgment.",
    image: "/assets/about/now.jpg",
  },
];

function setMeta(selector: string, attribute: "name" | "property", value: string, content: string) {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attribute, value);
    document.head.appendChild(node);
  }
  node.content = content;
}

export default function usePageTitle(page?: string) {
  useEffect(() => {
    const title = page ? `${page} | ${BASE}` : DEFAULT_TITLE;
    const path = window.location.pathname.replace(/\/+$/, "") || "/";
    const routeMeta = ROUTE_META.find((item) => item.match.test(path));
    const description = routeMeta?.description ?? DEFAULT_DESCRIPTION;
    const image = `${ORIGIN}${routeMeta?.image ?? "/riso/painted-cartography-01.jpg"}`;
    const isNotFound = page === "Page not found";
    const canonical = isNotFound
      ? ORIGIN
      : `${ORIGIN}${path === "/" ? "" : path}`;
    const isPrivateRoute = path.startsWith("/curated/") || path.startsWith("/lab/");

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      isPrivateRoute || isNotFound
        ? "noindex, nofollow, noarchive"
        : "index, follow",
    );

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [page]);
}
