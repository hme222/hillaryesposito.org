import { useEffect } from "react";

type PortfolioEventName =
  | "resume_open"
  | "contact_click"
  | "linkedin_click"
  | "case_study_open";

type PortfolioEvent = {
  name: PortfolioEventName;
  parameters: Record<string, string>;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: PortfolioEventName,
      parameters: Record<string, string>,
    ) => void;
  }
}

const ANALYTICS_CATEGORY = "job_search";

function linkLocation(link: HTMLAnchorElement): string {
  const explicitLocation = link.closest<HTMLElement>("[data-analytics-location]")
    ?.dataset.analyticsLocation;
  if (explicitLocation) return explicitLocation;

  const sectionId = link.closest<HTMLElement>("section[id]")?.id;
  if (sectionId) return sectionId;

  if (link.closest("nav")) return "navigation";
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  if (link.closest("main, #main-content")) return "main";
  return "other";
}

function resumeVariant(pathname: string): string {
  const filename = decodeURIComponent(pathname.split("/").pop() ?? "").toLowerCase();
  if (filename.includes("healthcare")) return "healthcare";
  if (filename.includes("portfolio_resume")) return "general";
  return "role_tailored";
}

export function classifyPortfolioLink(link: HTMLAnchorElement): PortfolioEvent | null {
  const href = link.getAttribute("href");
  if (!href) return null;

  let url: URL;
  try {
    url = new URL(href, window.location.href);
  } catch {
    return null;
  }

  const commonParameters = {
    event_category: ANALYTICS_CATEGORY,
    link_location: linkLocation(link),
  };

  if (url.protocol === "mailto:") {
    return {
      name: "contact_click",
      parameters: {
        ...commonParameters,
        contact_method: "email",
      },
    };
  }

  const normalizedPath = url.pathname.toLowerCase();
  if (normalizedPath.endsWith(".pdf") && normalizedPath.includes("resume")) {
    return {
      name: "resume_open",
      parameters: {
        ...commonParameters,
        resume_variant: resumeVariant(url.pathname),
      },
    };
  }

  const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
  if (hostname === "linkedin.com" && normalizedPath.startsWith("/in/hillaryesposito")) {
    return {
      name: "linkedin_click",
      parameters: {
        ...commonParameters,
        destination: "profile",
      },
    };
  }

  if (url.origin === window.location.origin) {
    const caseStudyMatch = normalizedPath.match(/^\/case-study\/([^/]+)\/?$/);
    if (caseStudyMatch) {
      return {
        name: "case_study_open",
        parameters: {
          ...commonParameters,
          case_study: caseStudyMatch[1],
        },
      };
    }
  }

  return null;
}

export function sendPortfolioEvent(event: PortfolioEvent): void {
  window.gtag?.("event", event.name, event.parameters);
}

export default function PortfolioAnalytics() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return;

      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const portfolioEvent = classifyPortfolioLink(link);
      if (portfolioEvent) sendPortfolioEvent(portfolioEvent);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
