import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import PortfolioAnalytics from "./PortfolioAnalytics";

describe("portfolio analytics", () => {
  let container: HTMLDivElement;
  let root: Root;
  let gtag: jest.Mock;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(async () => {
    window.history.replaceState(null, "", "/");
    gtag = jest.fn();
    window.gtag = gtag;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => root.render(<PortfolioAnalytics />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    delete window.gtag;
  });

  function clickLink(href: string, location = "test-location") {
    const wrapper = document.createElement("section");
    wrapper.dataset.analyticsLocation = location;
    const link = document.createElement("a");
    link.href = href;
    link.addEventListener("click", (event) => event.preventDefault());
    const label = document.createElement("span");
    label.textContent = "Open";
    link.appendChild(label);
    wrapper.appendChild(link);
    document.body.appendChild(wrapper);
    label.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
    wrapper.remove();
  }

  it("tracks a general resume without sending the filename or link text", () => {
    clickLink("/assets/Hillary_Esposito_Portfolio_Resume.pdf", "navigation");

    expect(gtag).toHaveBeenCalledWith("event", "resume_open", {
      event_category: "job_search",
      link_location: "navigation",
      resume_variant: "general",
    });
  });

  it("tracks email contact without sending the email address", () => {
    clickLink("mailto:espositohillary@gmail.com", "contact");

    expect(gtag).toHaveBeenCalledWith("event", "contact_click", {
      event_category: "job_search",
      link_location: "contact",
      contact_method: "email",
    });
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("espositohillary@gmail.com");
  });

  it("tracks the portfolio LinkedIn profile as supporting intent", () => {
    clickLink("https://www.linkedin.com/in/hillaryesposito/", "footer");

    expect(gtag).toHaveBeenCalledWith("event", "linkedin_click", {
      event_category: "job_search",
      link_location: "footer",
      destination: "profile",
    });
  });

  it("tracks internal case-study navigation with the destination slug", () => {
    clickLink("/case-study/msk#msk-workflow", "selected-work");

    expect(gtag).toHaveBeenCalledWith("event", "case_study_open", {
      event_category: "job_search",
      link_location: "selected-work",
      case_study: "msk",
    });
  });

  it("ignores unrelated links and non-primary clicks", () => {
    clickLink("/about");
    const link = document.createElement("a");
    link.href = "/case-study/grove";
    link.addEventListener("click", (event) => event.preventDefault());
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, button: 1 }));
    link.remove();

    expect(gtag).not.toHaveBeenCalled();
  });
});
