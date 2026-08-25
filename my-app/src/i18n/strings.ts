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
  "footer.eyebrow": "Hillary Esposito · Healthcare Product Designer",
  "footer.statement": "Functional software, carefully made.",
  "footer.siteAria": "Footer navigation",
  "footer.explore": "Explore",
  "footer.connect": "Connect",
  "footer.email": "Email",
  "footer.githubAria": "GitHub profile (opens in new tab)",
  "footer.availability": "Available for healthcare product design opportunities",
  "footer.madeWith": "Made with:",
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
  "home.riso.eyebrow": "Hillary Esposito · Healthcare Product Designer",
  "home.riso.heroTitle": "I design healthcare products from the workflow out.",
  // "Workflow fluency" named a skill without saying what it covers. The
  // durable claim is scope: the whole path a task takes, not the screen at the
  // end of it — which is what the MSK case study actually demonstrates.
  "home.riso.heroLead":
    "At Memorial Sloan Kettering, a workflow I initiated",
  "home.riso.heroProof": "contributed to a 20% organization-wide electronic medical record cost reduction.",
  "home.riso.openingVisual": "View opening visual",
  "home.riso.primaryWork": "Review the MSK workflow",
  "home.riso.heroClose": "",
  "home.riso.workTitle": "Healthcare products, enterprise workflows, and one consumer product",
  "home.riso.groveDesc":
    "34-person survey · eleven features narrowed to three · functional prototype.",
  "home.riso.mskDesc":
    "Four departments · implemented workflow · still used through two system upgrades.",
  "home.riso.logisticsDesc":
    "Seven aid stations · shared tracking · resupply time reduced 85%.",
  "home.riso.mobbinDesc":
    "Three finance apps turned into a searchable reference — the work was the taxonomy and the naming, not the screenshots. 200+ screens per app, an editor's judgment on every one.",
  "home.riso.groveAlt": "Grove daily care screen showing one clear plant-care task and overdue plants first",
  "home.riso.mskAlt": "A recreated map of Memorial Sloan Kettering's care network across the New York region",
  "home.riso.logisticsAlt": "Service mechanism showing shared forecasting across seven aid stations and an 85% reduction in resupply time",
  "home.riso.mobbinAlt": "One of the third-party app screens documented for Mobbin — a finance app welcome screen",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "Every number here has a source",
  "home.riso.supportingKicker": "Supporting practice",
  "home.riso.supportingBody": "For interaction-pattern analysis and production documentation, I also documented 200+ screens per app across three finance products for Mobbin.",
  "home.riso.supportingLink": "Review the Mobbin study →",
  "home.riso.aboutTitle": "I design for the person under pressure",
  "home.riso.contactKicker": "Get in touch",
  "home.riso.contactBody":
    "If your team is redesigning a clinical workflow, care service, or high-stakes internal tool, let's talk.",
  "home.dispatch.eyebrow": "Weekend dispatch · No. 01",
  "home.dispatch.trainAttribution": "Built with MTA Open Data · Independent prototype",
  "home.dispatch.title": "The Trip Home",
  "home.dispatch.question": "Can a rider know, rather than guess, whether the trip home is accessible?",
  "home.dispatch.body":
    "At an NYPL hackathon, Jacqueline Gordon and I used MTA and NYC Open Data to build a working prototype that checks subway access by platform and direction, plus nearby curb ramps.",
  "home.dispatch.findingLabel": "What the data exposed",
  "home.dispatch.finding":
    "A trip inherits the risk of every stop it calls at, so eight one-direction platforms put a return-trip hazard on 22,937 of the system's 77,236 scheduled trips.",
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
    "I bring 13+ years inside cancer-care operations and military medical logistics to healthcare product design. At MSK and in the Army, I learned to spot the workaround after a handoff and the permission that stops the next person. I turn that evidence into clearer workflows, internal tools, and working prototypes.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.patterns": "App screens studied per app, across three finance apps",
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "People across the MSK workflows I helped redesign",
  "home.stat.logistics": "Shorter medical resupply time across seven aid stations",
  "home.stat.mobbinSource": "Mobbin pattern study",
  "home.stat.groveSource": "Grove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.stat.logisticsSource": "Army medical logistics service record",
  "home.trustAria": "Credentials",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingual EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Selected work",
  "home.proj.grove.subtitle": "Grove · Product Design · AI Judgment",
  "home.proj.msk.subtitle": "Memorial Sloan Kettering · UX & Product Design",
  "home.proj.logistics.subtitle": "Army medical logistics · Service Design",
  "home.proj.mobbin.subtitle": "Mobbin · Freelance UX Flow Documentation",
  "home.proj.grove.title": "Eleven features became three",
  "home.proj.msk.title": "A filing queue replaced a four-system workaround",
  "home.proj.logistics.title": "Medical resupply time reduced 85%",
  "home.proj.mobbin.title": "200+ screens per app, searchable by task",

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
  "footer.eyebrow": "Hillary Esposito · Diseñadora de productos de salud",
  "footer.statement": "Software funcional, hecho con cuidado.",
  "footer.siteAria": "Navegación del pie de página",
  "footer.explore": "Explorar",
  "footer.connect": "Contacto",
  "footer.email": "Correo",
  "footer.githubAria": "Perfil de GitHub (se abre en una pestaña nueva)",
  "footer.availability": "Disponible para oportunidades de diseño de productos de salud",
  "footer.madeWith": "Hecho con:",
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
  "home.riso.eyebrow": "Hillary Esposito · Diseñadora de productos de salud",
  "home.riso.heroTitle": "Diseño productos de salud desde el flujo de trabajo.",
  "home.riso.heroLead":
    "En Memorial Sloan Kettering, un flujo de trabajo que inicié",
  "home.riso.heroProof": "contribuyó a una reducción del 20% en los costos del registro médico electrónico de toda la organización.",
  "home.riso.openingVisual": "Ver visual de apertura",
  "home.riso.primaryWork": "Ver el flujo de trabajo de MSK",
  "home.riso.heroClose": "",
  "home.riso.workTitle": "Productos de salud, flujos empresariales y un producto de consumo",
  "home.riso.groveDesc":
    "Encuesta a 34 personas · once funciones reducidas a tres · prototipo funcional.",
  "home.riso.mskDesc":
    "Cuatro departamentos · flujo implementado · vigente tras dos actualizaciones.",
  "home.riso.logisticsDesc":
    "Siete estaciones · seguimiento compartido · tiempo de reabastecimiento un 85% menor.",
  "home.riso.mobbinDesc":
    "Tres apps financieras convertidas en una referencia buscable: el trabajo fue la taxonomía y los nombres, no las capturas. Más de 200 pantallas por app, con criterio de editora en cada una.",
  "home.riso.groveAlt": "Pantalla de cuidado diario de Grove con una tarea clara y las plantas atrasadas primero",
  "home.riso.mskAlt": "Un mapa recreado de la red de atención de Memorial Sloan Kettering en la región de Nueva York",
  "home.riso.logisticsAlt": "Mecanismo de servicio con pronóstico compartido entre siete puestos y una reducción del 85% en el tiempo de reabastecimiento",
  "home.riso.mobbinAlt": "Una de más de 200 pantallas de apps de terceros documentadas para Mobbin — la pantalla de bienvenida de una app financiera",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Cada número aquí tiene una fuente",
  "home.riso.supportingKicker": "Práctica complementaria",
  "home.riso.supportingBody": "Como prueba de análisis de patrones de interacción y documentación de producción, también documenté más de 200 pantallas por app en tres productos financieros para Mobbin.",
  "home.riso.supportingLink": "Ver el estudio de Mobbin →",
  "home.riso.aboutTitle": "Diseño para la persona que trabaja bajo presión",
  "home.riso.contactKicker": "Contacto",
  "home.riso.contactBody":
    "Si su equipo está rediseñando un flujo clínico, un servicio de atención o una herramienta interna de alto riesgo, hablemos.",
  "home.dispatch.eyebrow": "Despacho de fin de semana · N.º 01",
  "home.dispatch.trainAttribution": "Creado con datos abiertos de MTA · Prototipo independiente",
  "home.dispatch.title": "El viaje de regreso",
  "home.dispatch.question": "¿Puede una persona saber, en lugar de adivinar, si el viaje de regreso es accesible?",
  "home.dispatch.body":
    "En un hackathon de NYPL, Jacqueline Gordon y yo usamos datos de MTA y NYC Open Data para crear un prototipo funcional que verifica el acceso al metro por plataforma y dirección, además de las rampas cercanas.",
  "home.dispatch.findingLabel": "Lo que revelaron los datos",
  "home.dispatch.finding":
    "Un viaje hereda el riesgo de cada parada en la que se detiene: ocho andenes accesibles en una sola dirección ponen en riesgo el viaje de regreso de 22.937 de los 77.236 viajes programados del sistema.",
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
    "Aporto más de 13 años en operaciones de atención oncológica y logística médica militar al diseño de productos de salud. En MSK y en el Ejército aprendí a detectar el atajo después de una transferencia y el permiso que detiene a la siguiente persona. Convierto esa evidencia en flujos más claros, herramientas internas y prototipos funcionales.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: proof stats ──
  "home.stat.patterns": "Pantallas documentadas por app, en tres apps financieras",
  "home.stat.research": "Personas encuestadas antes de diseñar nada",
  "home.stat.scale": "Personas en los flujos de MSK que ayudé a rediseñar",
  "home.stat.logistics": "Reabastecimiento médico más rápido en siete estaciones de ayuda",
  "home.stat.mobbinSource": "Estudio de patrones de Mobbin",
  "home.stat.groveSource": "Investigación de descubrimiento de Grove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.stat.logisticsSource": "Expediente de servicio de logística médica del Ejército",
  "home.trustAria": "Credenciales",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Trabajo seleccionado",
  "home.proj.grove.subtitle": "Grove · Diseño de producto · Criterio con IA",
  "home.proj.msk.subtitle": "Memorial Sloan Kettering · Diseño UX y de producto",
  "home.proj.logistics.subtitle": "Logística médica del Ejército · Diseño de servicios",
  "home.proj.mobbin.subtitle": "Mobbin · Documentación freelance de flujos UX",
  "home.proj.grove.title": "Once funciones se convirtieron en tres",
  "home.proj.msk.title": "Una cola de archivo reemplazó un desvío de cuatro sistemas",
  "home.proj.logistics.title": "Tiempo de reabastecimiento médico reducido un 85%",
  "home.proj.mobbin.title": "Más de 200 pantallas por app, buscables por tarea",

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
