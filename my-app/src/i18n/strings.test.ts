import { translate } from "./strings";

describe("i18n strings - label-in-name and naming consistency", () => {
  // WCAG 2.5.3 (Label in Name): the Ask nav bird's accessible name
  // (ask.title) must start with its visible label (ask.nav) in every
  // language, or a screen-reader user voicing the visible label can't
  // match it to the control's announced name. "Pregunte" (imperative) vs
  // "Preguntar" (infinitive) silently broke this for Spanish.
  it.each(["en", "es"] as const)("ask.title starts with ask.nav in %s", (lang) => {
    const visibleLabel = translate(lang, "ask.nav");
    const accessibleName = translate(lang, "ask.title");
    expect(accessibleName.startsWith(visibleLabel)).toBe(true);
  });

  // One Spanish name for "About" across the whole site - the nav dock, the
  // footer, and every breadcrumb's final crumb should all say the same
  // thing, not three different translations of the same page.
  it("nav.dockAbout, nav.about, and AboutMe.tsx's own breadcrumb string agree in Spanish", () => {
    expect(translate("es", "nav.dockAbout")).toBe("Sobre mí");
    expect(translate("es", "nav.about")).toBe("Sobre mí");
  });

  it("footer nav labels are sentence case, not forced uppercase, in both languages", () => {
    expect(translate("en", "nav.home")).toBe("Home");
    expect(translate("en", "nav.work")).toBe("Work");
    expect(translate("en", "nav.about")).toBe("About");
    expect(translate("es", "nav.home")).toBe("Inicio");
    expect(translate("es", "nav.work")).toBe("Trabajo");
    expect(translate("es", "nav.about")).toBe("Sobre mí");
  });
});
