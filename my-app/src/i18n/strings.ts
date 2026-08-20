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
  "footer.statement": "Software that's functional, not just pretty.",
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
  "home.riso.eyebrow": "Hillary Esposito · Product Designer",
  "home.riso.heroTitle": "I own the whole path, not just the last screen.",
  // "Workflow fluency" named a skill without saying what it covers. The
  // durable claim is scope: the whole path a task takes, not the screen at the
  // end of it — which is what the MSK case study actually demonstrates.
  "home.riso.heroLead":
    "Six years building software for",
  "home.riso.heroProof": "21,000 clinicians and staff",
  "home.riso.heroClose": "who couldn't afford a wrong guess. Research rigor and AI judgment.",
  "home.riso.workTitle": "Three products, three different problems",
  "home.riso.groveDesc":
    "A plant-care app an AI built in one pass. I am the only designer on it: I surveyed 34 owners, cut eleven features to three, and rebuilt it around the harder problem — teaching the model to show its confidence, cite a source, and admit when it does not know.",
  "home.riso.mskDesc":
    "Six years redesigning clinical workflows where a wrong answer had a cost — a 20% EMR cost cut, and every CPR certification collected 70% ahead of a deadline that was about to slip.",
  "home.riso.mobbinDesc":
    "Three finance apps turned into a searchable reference — the work was the taxonomy and the naming, not the screenshots. 200+ screens per app, an editor's judgment on every one.",
  "home.riso.groveAlt": "Grove's calm, plant-first entry screen — the redesign's first finished screen",
  "home.riso.mskAlt": "A recreated map of Memorial Sloan Kettering's care network across the New York region",
  "home.riso.mobbinAlt": "One of the third-party app screens documented for Mobbin — a finance app welcome screen",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "Every number here has a source",
  "home.riso.aboutTitle": "I design for the person under pressure",
  "home.riso.contactKicker": "Get in touch",
  "home.riso.contactBody":
    "I design the calls a model should not make. If your team needs a product designer who pairs consumer taste with research rigor, let's talk.",
  "home.dispatch.eyebrow": "Weekend dispatch · No. 01 · Civic technology",
  "home.dispatch.title": "The Trip Home",
  "home.dispatch.question": "Can a rider know, rather than guess, whether the trip home is accessible?",
  "home.dispatch.body":
    "At an NYPL hackathon, Jacqueline Gordon and I used MTA and NYC Open Data to build a working prototype that checks subway access by platform and direction, plus nearby curb ramps.",
  "home.dispatch.findingLabel": "What the data exposed",
  "home.dispatch.finding": "Eight one-direction accessibility gaps affected 22,937 of 77,236 scheduled trips.",
  "home.dispatch.role":
    "Jacqueline led accessibility features. I led product strategy, data logic, and AI-assisted coded prototyping.",
  "home.dispatch.ruleLabel": "The product rule",
  "home.dispatch.rule": "Warn, never block.",
  "home.dispatch.ruleBody":
    "Accessibility can be permanent, temporary, or uncertain. The planner explains the risk without hiding the route.",
  "home.dispatch.primary": "Explore the working case study ↗",
  "home.dispatch.devpost": "Review the Devpost entry ↗",
  "home.dispatch.linkedin": "Read the build note on LinkedIn ↗",
  "home.dispatch.photoAlt": "Participants building projects at NYPL's Built for NYC AI hackathon",
  "home.dispatch.photoCaption": "NYPL · Built for NYC AI Hackathon",
  "home.dispatch.photoLink": "Open the accessible transit planning prototype",
  "home.dispatch.statLabel": "scheduled trips affected",
  "home.dispatch.routePlay": "Trace the return trip →",
  "home.dispatch.routeReset": "Made it home ✓ · reset",
  "home.dispatch.routeStatus": "The return route reached home.",
  "home.dispatch.prototypeLabel": "Prototype study · Not live service",
  "home.dispatch.routeOutbound": "Outbound",
  "home.dispatch.routeReturn": "Return home",
  "home.dispatch.routeGaps": "8 direction gaps",
  "home.dispatch.openJournal": "Open the weekend journal",
  "home.dispatch.closeJournal": "Close the weekend journal",

  // ── Home: mini about ──
  "home.about.eyebrow": "A little about me",
  "home.about.blurb":
    "13+ years inside high-stakes systems: military medical logistics, cancer-care operations, internal tools, and AI-assisted product work. On Grove I have been the only designer — research, prioritization, interaction, and the screens. The through-line is who I design for. The person using the system under pressure — the clinician between patients, not the org chart above them. Whether it’s 21,000 clinicians and staff or one new plant owner, the job is the same. Make the software right where a wrong answer costs something.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.patterns": "App screens studied per app, across three finance apps",
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "People relying on systems I redesigned",
  "home.stat.mobbinSource": "Mobbin pattern study",
  "home.stat.groveSource": "Grove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.trustAria": "Credentials",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingual EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Selected work",
  "home.proj.grove.subtitle": "Product Design · AI Judgment",
  "home.proj.msk.subtitle": "UX & Product Design · Healthcare Systems",
  "home.proj.mobbin.subtitle": "Freelance · 200+ screens per app across three finance apps, studied for craft",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "Building a product where the details decide?",
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
  "footer.statement": "Software que funciona, no solo bonito.",
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
  "home.riso.eyebrow": "Hillary Esposito · Diseñadora de Producto",
  "home.riso.heroTitle": "Asumo el recorrido completo, no solo la última pantalla.",
  "home.riso.heroLead":
    "Seis años creando software para",
  "home.riso.heroProof": "21,000 clínicos y personal",
  "home.riso.heroClose": "que no podían permitirse un error. Rigor de investigación y criterio con IA.",
  "home.riso.workTitle": "Tres productos, tres problemas distintos",
  "home.riso.groveDesc":
    "Una app para el cuidado de plantas que una IA creó de una sola vez. Encuesté a 34 propietarios y la reconstruí alrededor del problema más difícil: enseñarle al modelo a mostrar su confianza, citar su fuente y admitir cuando no sabe.",
  "home.riso.mskDesc":
    "Seis años rediseñando flujos clínicos donde un error tenía un costo: 20% menos gasto en EMR y todas las certificaciones de RCP recogidas un 70% antes de un plazo que estaba a punto de aplazarse.",
  "home.riso.mobbinDesc":
    "Tres apps financieras convertidas en una referencia buscable: el trabajo fue la taxonomía y los nombres, no las capturas. Más de 200 pantallas, con criterio de editora en cada una.",
  "home.riso.groveAlt": "La pantalla de inicio de Grove, serena y centrada en las plantas — la primera pantalla terminada del rediseño",
  "home.riso.mskAlt": "Un mapa recreado de la red de atención de Memorial Sloan Kettering en la región de Nueva York",
  "home.riso.mobbinAlt": "Una de más de 200 pantallas de apps de terceros documentadas para Mobbin — la pantalla de bienvenida de una app financiera",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Cada número aquí tiene una fuente",
  "home.riso.aboutTitle": "Diseño para la persona que trabaja bajo presión",
  "home.riso.contactKicker": "Contacto",
  "home.riso.contactBody":
    "Diseño las decisiones que un modelo no debería tomar. Si su equipo necesita una diseñadora de producto que combine criterio de consumo con rigor de investigación, hablemos.",
  "home.dispatch.eyebrow": "Despacho de fin de semana · N.º 01 · Tecnología cívica",
  "home.dispatch.title": "El viaje de regreso",
  "home.dispatch.question": "¿Puede una persona saber, en lugar de adivinar, si el viaje de regreso es accesible?",
  "home.dispatch.body":
    "En un hackathon de NYPL, Jacqueline Gordon y yo usamos datos de MTA y NYC Open Data para crear un prototipo funcional que verifica el acceso al metro por plataforma y dirección, además de las rampas cercanas.",
  "home.dispatch.findingLabel": "Lo que revelaron los datos",
  "home.dispatch.finding": "Ocho brechas de accesibilidad en una sola dirección afectaban 22.937 de 77.236 viajes programados.",
  "home.dispatch.role":
    "Jacqueline dirigió las funciones de accesibilidad. Yo dirigí la estrategia de producto, la lógica de datos y el prototipado en código asistido por IA.",
  "home.dispatch.ruleLabel": "La regla del producto",
  "home.dispatch.rule": "Advertir, nunca bloquear.",
  "home.dispatch.ruleBody":
    "La accesibilidad puede ser permanente, temporal o incierta. El planificador explica el riesgo sin ocultar la ruta.",
  "home.dispatch.primary": "Ver el caso de estudio funcional ↗",
  "home.dispatch.devpost": "Revisar la entrada en Devpost ↗",
  "home.dispatch.linkedin": "Leer la nota del proyecto en LinkedIn ↗",
  "home.dispatch.photoAlt": "Participantes creando proyectos en el hackathon Built for NYC AI de NYPL",
  "home.dispatch.photoCaption": "NYPL · Hackathon Built for NYC AI",
  "home.dispatch.photoLink": "Abrir el prototipo de planificación de transporte accesible",
  "home.dispatch.statLabel": "viajes programados afectados",
  "home.dispatch.routePlay": "Trazar el viaje de regreso →",
  "home.dispatch.routeReset": "Llegó a casa ✓ · reiniciar",
  "home.dispatch.routeStatus": "La ruta de regreso llegó a casa.",
  "home.dispatch.prototypeLabel": "Estudio de prototipo · No es servicio en vivo",
  "home.dispatch.routeOutbound": "Ida",
  "home.dispatch.routeReturn": "Regreso a casa",
  "home.dispatch.routeGaps": "8 brechas por dirección",
  "home.dispatch.openJournal": "Abrir el diario del fin de semana",
  "home.dispatch.closeJournal": "Cerrar el diario del fin de semana",

  // ── Home: mini about ──
  "home.about.eyebrow": "Un poco sobre mí",
  "home.about.blurb":
    "Más de 13 años dentro de sistemas de alto riesgo: logística médica militar, operaciones oncológicas, herramientas internas y trabajo de producto asistido por IA. En Grove he sido la única diseñadora: investigación, priorización, interacción y las pantallas. El hilo común es para quién diseño. La persona que usa el sistema bajo presión — el clínico entre pacientes, no el organigrama por encima. Ya sean 21,000 clínicos y personal o un nuevo dueño de plantas, el trabajo es el mismo. Hacer que el software esté bien donde una respuesta equivocada cuesta algo.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: proof stats ──
  "home.stat.patterns": "Pantallas de apps estudiadas por su oficio y patrones",
  "home.stat.research": "Personas encuestadas antes de diseñar nada",
  "home.stat.scale": "Personas que dependen de sistemas que rediseñé",
  "home.stat.mobbinSource": "Estudio de patrones de Mobbin",
  "home.stat.groveSource": "Investigación de descubrimiento de Grove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.trustAria": "Credenciales",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Trabajo seleccionado",
  "home.proj.grove.subtitle": "Diseño de producto · Criterio con IA",
  "home.proj.msk.subtitle": "Diseño UX y de producto · Sistemas de salud",
  "home.proj.mobbin.subtitle": "Freelance · Más de 200 pantallas de tres apps de finanzas, estudiadas por su oficio",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "¿Está creando un producto donde los detalles deciden?",
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
