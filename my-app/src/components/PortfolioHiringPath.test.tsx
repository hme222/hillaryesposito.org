import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import RecruiterPanel from "./RecruiterPanel";
import RisoHome from "../pages/RisoHome";

jest.mock("react-router-dom", () => ({
  Link: ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props}>{children}</a>
  ),
  useLocation: () => ({ pathname: "/", search: "", hash: "", state: null }),
  useNavigate: () => jest.fn(),
}), { virtual: true });

jest.mock("../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: "en", setLang: jest.fn() }),
  useT: () => (key: string) => key,
}));

class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("healthcare product designer hiring path", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      value: ObserverStub,
    });
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: () => ({
        matches: false,
        addEventListener() {},
        removeEventListener() {},
      }),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
    });
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  beforeEach(() => {
    window.sessionStorage.setItem("portfolio-opening-film-seen", "true");
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("keeps the tour to three selected cases and links to the full work index", async () => {
    await act(async () => root.render(<RecruiterPanel />));
    await act(async () => {
      window.dispatchEvent(new CustomEvent("open-recruiter-panel", { detail: {} }));
    });

    const dialog = container.querySelector<HTMLDialogElement>(".recruiter-panel")!;
    const labels = Array.from(dialog.querySelectorAll("h3.recruiter-panel__label"));
    const selected = labels.find((label) => label.textContent === "Selected work")?.closest("section")!;

    expect(Array.from(selected.querySelectorAll("strong"), (item) => item.textContent)).toEqual([
      "MSK · A filing queue replaced a four-department paper detour",
      "Grove · Twelve features became three",
      "Knowunity · The student's own words are the proof",
    ]);
    expect(labels.some((label) => label.textContent === "Supporting evidence")).toBe(false);
    expect(selected.textContent).toContain("Five tests and a 37-person survey");
    expect(selected.textContent).toContain("speech recognition remains mocked");
    expect(selected.querySelector(".recruiter-panel__allWork")?.textContent).toContain("See all work");

    const resume = dialog.querySelector<HTMLAnchorElement>('a[href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"]');
    const email = dialog.querySelector<HTMLAnchorElement>('a[href="mailto:espositohillary@gmail.com"]');
    expect(resume?.textContent).toContain("View résumé");
    expect(resume?.getAttribute("target")).toBe("_blank");
    expect(email?.textContent).toContain("Email me");
    expect(selected.getAttribute("aria-labelledby")).toBe("recruiter-panel-selected-title");
  });

  it("keeps Email, résumé, and a selectable address together in Home Contact", async () => {
    await act(async () => root.render(<RisoHome />));

    const workRows = Array.from(
      container.querySelectorAll<HTMLAnchorElement>(".rp-work"),
      (row) => row.getAttribute("href"),
    );
    expect(workRows).toEqual([
      "/case-study/msk",
      "/case-study/grove",
      "/case-study/knowunity",
      "/case-study/logistics",
      "/case-study/ux-woman",
    ]);
    const logistics = container.querySelector<HTMLAnchorElement>('.rp-work[href="/case-study/logistics"]');
    const uxWoman = container.querySelector<HTMLAnchorElement>('.rp-work[href="/case-study/ux-woman"]');
    expect(logistics?.querySelector(".rp-work__n")?.textContent).toContain("Operational delivery");
    expect(uxWoman?.querySelector(".rp-work__n")?.textContent).toContain("Supporting research · active");

    const contact = container.querySelector<HTMLElement>("#contact")!;
    const email = contact.querySelector<HTMLAnchorElement>('a[href="mailto:espositohillary@gmail.com"]');
    const resume = contact.querySelector<HTMLAnchorElement>('a[href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"]');

    expect(email?.textContent).toContain("contact.note");
    expect(resume?.textContent).toContain("View résumé");
    expect(resume?.getAttribute("target")).toBe("_blank");
    expect(resume?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(resume?.getAttribute("aria-label")).toBe("nav.resumeAria");
    expect(contact.textContent).toContain("espositohillary@gmail.com");
  });
});
