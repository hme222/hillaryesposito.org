// src/i18n/strings.ts
//
// Lightweight i18n dictionaries - no library, no runtime cost beyond a lookup.
// PHASE 1: home page + global nav only. Everything else (About, case studies)
// intentionally has no `es` entry and falls back to the English default, so an
// untranslated key never renders blank.
//
// NOTE FOR OWNER REVIEW: all Spanish strings below are marked for native-
// speaker proofread. Aim was natural, Latin-American-neutral professional
// Spanish - see the EN → ES table in the handoff notes.

export type Lang = "en" | "es";

// English is the source of truth: every key exists here, and its value is the
// fallback for any language that hasn't translated it yet.
const en = {
  // ── App shell ──
  "app.skip": "Skip to main content",
  "app.backToTop": "Back to top",

  // ── Global footer + recovery ──
  "footer.eyebrow": "Hillary Esposito · Product Designer",
  "footer.statement": "Research rigor for products people have to trust.",
  "footer.siteAria": "Footer navigation",
  "footer.explore": "Explore",
  "footer.connect": "Connect",
  "footer.email": "Email",
  "footer.githubAria": "GitHub profile (opens in new tab)",
  "footer.availability": "Available for select product design opportunities",
  "footer.madeWith": "Made with:",
  "footer.marqueePlay": "Play",
  "footer.marqueePause": "Pause",
  "footer.marqueeAria": " the credits banner",
  "notFound.eyebrow": "Wrong turn · useful recovery",
  "notFound.title": "This page wandered off.",
  "notFound.body": "The link may be outdated, but the work is still here. Return to the portfolio or browse the selected work.",
  "notFound.home": "Return home",
  "notFound.work": "Browse selected work →",

  // ── Navbar ──
  "nav.ariaPrimary": "Primary navigation",
  "nav.logoAria": "Go to home",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "nav.home": "HOME",
  "nav.work": "WORK",
  "nav.about": "ABOUT",
  "nav.contact": "CONTACT",
  // Accented and sentence-case in the source; the nav uppercases it in CSS.
  // Unaccented "RESUME" reads as the verb to a screen reader.
  "nav.resume": "Résumé",
  "nav.resumeAria": "View résumé (opens in new tab)",
  "nav.themeToDark": "Switch to dark mode",
  "nav.themeToLight": "Switch to light mode",
  // The language toggle is labelled in the language you'd switch TO,
  // so the "en" entry is deliberately Spanish (and vice versa).
  "nav.langSwitch": "Cambiar a español",
  "nav.langCode": "ES",

  // ── Home: hero ──
  "home.status": "Available for opportunities",
  "home.getInTouch": "Get in touch",
  "home.seeApproach": "See my approach →",
  "home.riso.eyebrow": "Hillary Esposito · product designer",
  "home.riso.heroTitle": "Products people have to trust.",
  "home.riso.heroLead":
    "Research rigor, AI judgment, and consumer craft — shaped by six years building software for",
  "home.riso.heroProof": "21,000 clinicians and staff",
  "home.riso.heroClose": "who couldn't afford a wrong guess.",
  "home.riso.workTitle": "Three products, three ways trust gets earned",
  "home.riso.groveDesc":
    "A plant-care app an AI built in one pass. I tested it, surveyed 32 owners, and I'm rebuilding it around the one thing that keeps people: trust.",
  "home.riso.mskDesc":
    "Six years redesigning clinical workflows where a wrong answer had a cost — a 20% EMR cost cut and a 70% certification-workflow gain.",
  "home.riso.mobbinDesc":
    "Documented 200+ screens across three finance apps — pattern fluency and taste for how the best consumer products actually behave.",
  "home.riso.groveAlt": "Grove's calm, plant-first entry screen — the redesign's first finished screen",
  "home.riso.mskAlt": "A recreated map of Memorial Sloan Kettering's care network across the New York region",
  "home.riso.mobbinAlt": "One of 200+ third-party app screens documented for Mobbin — a finance app welcome screen",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "Every number here has a source",
  "home.riso.aboutTitle": "I design for the person under pressure",
  "home.riso.contactKicker": "Get in touch",
  "home.riso.contactBody":
    "The difference isn't using AI — it's knowing when to trust it and when to say no. If your team needs a product designer who pairs consumer taste with research rigor, let's talk.",

  // ── Home: mini about ──
  "home.about.eyebrow": "A little about me",
  "home.about.blurb":
    "13+ years inside high-stakes systems: military medical logistics, cancer-care operations, internal tools, and AI-assisted product work. The through-line across all of it: I design for the person using the system under pressure, the clinician between patients, not the org chart above them. Whether it’s 21,000 clinicians and staff or one new plant owner, the job is the same: make the software trustworthy where a wrong answer costs something.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.patterns": "App screens studied for craft & patterns",
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "People relying on systems I redesigned",
  "home.stat.mobbinSource": "Mobbin pattern study",
  "home.stat.groveSource": "Grove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.trustAria": "Trust and credibility signals",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingual EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Selected work",
  "home.proj.grove.subtitle": "Product Design · AI Judgment",
  "home.proj.msk.subtitle": "UX & Product Design · Healthcare Systems",
  "home.proj.mobbin.subtitle": "Freelance · 200+ consumer app screens, studied for craft",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "Building a product people have to trust?",
  "home.ctaEmailAria": "Send me a note",
  "home.linkedinAria": "LinkedIn profile (opens in new tab)",

  // ── Recruiter pill (global trigger only - the panel stays English in Phase 1) ──
  "recruiter.pill": "Recruiter view",
  "recruiter.pillAria": "Open recruiter view: 90-second tour",
  "recruiter.seconds": "90 sec",
} as const;

export type StringKey = keyof typeof en;

// Spanish - Phase 1 (home + nav). /* TODO: native-speaker (owner) review */
const es: Partial<Record<StringKey, string>> = {
  // ── App shell ──
  "app.skip": "Saltar al contenido principal",
  "app.backToTop": "Volver arriba",

  // ── Global footer + recovery ──
  "footer.eyebrow": "Hillary Esposito · Diseñadora de Producto",
  "footer.statement": "Rigor de investigación para productos en los que la gente debe confiar.",
  "footer.siteAria": "Navegación del pie de página",
  "footer.explore": "Explorar",
  "footer.connect": "Contacto",
  "footer.email": "Correo",
  "footer.githubAria": "Perfil de GitHub (se abre en una pestaña nueva)",
  "footer.availability": "Disponible para oportunidades selectas de diseño de producto",
  "footer.madeWith": "Hecho con:",
  "footer.marqueePlay": "Reproducir",
  "footer.marqueePause": "Pausar",
  "footer.marqueeAria": " el carrusel de créditos",
  "notFound.eyebrow": "Ruta equivocada · recuperación útil",
  "notFound.title": "Esta página se desvió.",
  "notFound.body": "Puede que el enlace esté desactualizado, pero el trabajo sigue aquí. Vuelva al portafolio o explore el trabajo seleccionado.",
  "notFound.home": "Volver al inicio",
  "notFound.work": "Ver trabajo seleccionado →",

  // ── Navbar ──
  "nav.ariaPrimary": "Navegación principal",
  "nav.logoAria": "Ir al inicio",
  "nav.menuOpen": "Abrir menú",
  "nav.menuClose": "Cerrar menú",
  "nav.home": "INICIO",
  "nav.work": "TRABAJO",
  "nav.about": "SOBRE MÍ",
  "nav.contact": "CONTACTO",
  "nav.resume": "CV",
  "nav.resumeAria": "Ver CV (se abre en una pestaña nueva)",
  "nav.themeToDark": "Cambiar a modo oscuro",
  "nav.themeToLight": "Cambiar a modo claro",
  "nav.langSwitch": "Switch to English",
  "nav.langCode": "EN",

  // ── Home: hero ──
  "home.status": "Disponible para nuevas oportunidades",
  "home.getInTouch": "Contácteme",
  "home.seeApproach": "Conozca mi enfoque →",
  "home.riso.eyebrow": "Hillary Esposito · diseñadora de producto",
  "home.riso.heroTitle": "Productos en los que la gente tiene que confiar.",
  "home.riso.heroLead":
    "Rigor de investigación, criterio con IA y oficio de producto de consumo, forjados durante seis años creando software para",
  "home.riso.heroProof": "21,000 clínicos y personal",
  "home.riso.heroClose": "que no podían permitirse un error.",
  "home.riso.workTitle": "Tres productos, tres formas de ganarse la confianza",
  "home.riso.groveDesc":
    "Una app para el cuidado de plantas que una IA creó de una sola vez. La probé, encuesté a 32 propietarios y la estoy reconstruyendo alrededor de lo que hace que la gente se quede: la confianza.",
  "home.riso.mskDesc":
    "Seis años rediseñando flujos clínicos donde un error tenía un costo: 20% menos gasto en EMR y 70% de mejora en el flujo de certificación.",
  "home.riso.mobbinDesc":
    "Documenté más de 200 pantallas de tres apps financieras: fluidez de patrones y criterio sobre cómo se comportan los mejores productos de consumo.",
  "home.riso.groveAlt": "La pantalla de inicio de Grove, serena y centrada en las plantas — la primera pantalla terminada del rediseño",
  "home.riso.mskAlt": "Un mapa recreado de la red de atención de Memorial Sloan Kettering en la región de Nueva York",
  "home.riso.mobbinAlt": "Una de más de 200 pantallas de apps de terceros documentadas para Mobbin — la pantalla de bienvenida de una app financiera",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Cada número aquí tiene una fuente",
  "home.riso.aboutTitle": "Diseño para la persona que trabaja bajo presión",
  "home.riso.contactKicker": "Contacto",
  "home.riso.contactBody":
    "La diferencia no está en usar IA, sino en saber cuándo confiar en ella y cuándo decir que no. Si su equipo necesita una diseñadora de producto que combine criterio de consumo con rigor de investigación, hablemos.",

  // ── Home: mini about ──
  "home.about.eyebrow": "Un poco sobre mí",
  "home.about.blurb":
    "Más de 13 años dentro de sistemas de alto riesgo: logística médica militar, operaciones oncológicas, herramientas internas y trabajo de producto asistido por IA. El hilo común: diseño para la persona que usa el sistema bajo presión, el clínico entre pacientes, no el organigrama por encima. Ya sean 21,000 clínicos y personal o un nuevo dueño de plantas, el trabajo es el mismo: hacer que el software sea confiable donde una respuesta equivocada cuesta algo.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: proof stats ──
  "home.stat.patterns": "Pantallas de apps estudiadas por su oficio y patrones",
  "home.stat.research": "Personas encuestadas antes de diseñar nada",
  "home.stat.scale": "Personas que dependen de sistemas que rediseñé",
  "home.stat.mobbinSource": "Estudio de patrones de Mobbin",
  "home.stat.groveSource": "Investigación de descubrimiento de Grove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.trustAria": "Señales de confianza y credibilidad",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Trabajo seleccionado",
  "home.proj.grove.subtitle": "Diseño de producto · Criterio con IA",
  "home.proj.msk.subtitle": "Diseño UX y de producto · Sistemas de salud",
  "home.proj.mobbin.subtitle": "Freelance · Más de 200 pantallas de apps de consumo, estudiadas por su oficio",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "¿Está creando un producto en el que la gente tiene que confiar?",
  "home.ctaEmailAria": "Envíeme un correo",
  "home.linkedinAria": "Perfil de LinkedIn (se abre en una pestaña nueva)",

  // ── Recruiter pill ──
  "recruiter.pill": "Vista para reclutadores",
  "recruiter.pillAria": "Abrir la vista para reclutadores: resumen de proyectos en 90 segundos",
  "recruiter.seconds": "90 seg",
};

export const STRINGS: { en: typeof en; es: Partial<Record<StringKey, string>> } = { en, es };

/**
 * Resolve a key in the given language, falling back to English when the
 * translation is missing (so untranslated pages never render blank strings).
 * Supports simple `{name}` interpolation for the few dynamic labels.
 */
export function translate(lang: Lang, key: StringKey, vars?: Record<string, string>): string {
  const table: Partial<Record<StringKey, string>> = STRINGS[lang];
  let out: string = table[key] ?? en[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.split(`{${k}}`).join(v);
    }
  }
  return out;
}
