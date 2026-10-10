import React, { act } from "react";
import { createRoot, Root } from "react-dom/client";
import Footer from "./Footer";

jest.mock(
  "react-router-dom",
  () => {
    const ReactLib = require("react");
    return {
      Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) =>
        ReactLib.createElement("a", { href: to, ...props }, children),
      useLocation: () => ({ pathname: "/" }),
    };
  },
  { virtual: true }
);

jest.mock("../app/LanguageContext", () => ({
  useLanguage: () => ({ lang: "en" }),
  useT: () => (key: string) => key,
}));

describe("Footer", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeAll(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it("has both the email link and a résumé PDF link that opens in a new tab", async () => {
    await act(async () => {
      root.render(<Footer />);
    });

    const email = container.querySelector<HTMLAnchorElement>('a[href="mailto:espositohillary@gmail.com"]');
    expect(email?.textContent).toBe("footer.email");

    const resume = container.querySelector<HTMLAnchorElement>(
      'a[href="/assets/Hillary_Esposito_Portfolio_Resume.pdf"]'
    );
    expect(resume).not.toBeNull();
    expect(resume?.textContent).toBe("nav.resume");
    expect(resume?.getAttribute("target")).toBe("_blank");
    expect(resume?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(resume?.getAttribute("aria-label")).toBe("nav.resumeAria");
  });
});
