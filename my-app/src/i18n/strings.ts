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
  "footer.eyebrow": "Hillary Esposito · Healthcare Product & Service Designer",
  "footer.statement": "Functional software, carefully made.",
  "footer.siteAria": "Footer navigation",
  "footer.explore": "Explore",
  "footer.connect": "Connect",
  "footer.email": "Email",
  "footer.githubAria": "GitHub profile (opens in new tab)",
  "footer.availability": "Available for healthcare product and service design opportunities",
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
  "home.riso.eyebrow": "Hillary Esposito · Healthcare Product & Service Designer",
  "home.riso.heroTitle": "I design healthcare services from the workflow out.",
  // "Workflow fluency" named a skill without saying what it covers. The
  // durable claim is scope: the whole path a task takes, not the screen at the
  // end of it — which is what the MSK case study actually demonstrates.
  "home.riso.heroLead":
    "At Memorial Sloan Kettering, a workflow I initiated",
  "home.riso.heroProof": "contributed to a 20% organization-wide electronic medical record cost reduction.",
  "home.riso.heroClose": "I bring 13+ years in healthcare and medical logistics to product, service, and research decisions.",
  "home.riso.workTitle": "Healthcare systems, service operations, and one consumer product",
  "home.riso.groveDesc":
    "A plant-care app an AI built in one pass. I am the only designer on it: I surveyed 34 owners, cut eleven features to three, and rebuilt it around the harder problem — teaching the model to show its confidence, cite a source, and admit when it does not know.",
  "home.riso.mskDesc":
    "Six years improving clinical workflows where a wrong answer had a cost. One workflow I initiated later contributed to a 20% organization-wide electronic medical record cost reduction; revised CPR materials brought every certification in 70% before a slipping deadline.",
  "home.riso.logisticsDesc":
    "An end-to-end medical supply service for 5,000+ soldiers across seven aid stations. Shared digital tracking cut resupply time 85% and spending 60% while cold chain, security, and casualty risk stayed non-negotiable.",
  "home.riso.mobbinDesc":
    "Three finance apps turned into a searchable reference — the work was the taxonomy and the naming, not the screenshots. 200+ screens per app, an editor's judgment on every one.",
  "home.riso.groveAlt": "Grove's calm, plant-first entry screen — the redesign's first finished screen",
  "home.riso.mskAlt": "A recreated map of Memorial Sloan Kettering's care network across the New York region",
  "home.riso.logisticsAlt": "Hillary Esposito in uniform during her deployment as a medical logistics officer",
  "home.riso.mobbinAlt": "One of the third-party app screens documented for Mobbin — a finance app welcome screen",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "Every number here has a source",
  "home.riso.supportingKicker": "Supporting practice",
  "home.riso.supportingBody": "For interaction-pattern analysis and production documentation, I also documented 200+ screens per app across three finance products for Mobbin.",
  "home.riso.supportingLink": "Review the Mobbin study →",
  "home.layerTeaser.kicker": "Grove material study",
  "home.layerTeaser.title": "The atmosphere moves. The evidence does not.",
  "home.layerTeaser.body":
    "Paper, vellum, and botanical fragments assemble around one real Grove screen. The film can change. The interface cannot.",
  "home.layerTeaser.link": "See the decisions behind the screen",
  "home.layerTeaser.pause": "Pause material study",
  "home.layerTeaser.replay": "Replay material study",
  "home.layerTeaser.play": "Play material study",
  "home.layerTeaser.caption": "Generated atmosphere · authentic Grove interface · silent · 5 seconds",
  "home.riso.aboutTitle": "I design for the person under pressure",
  "home.riso.contactKicker": "Get in touch",
  "home.riso.contactBody":
    "If your team is redesigning a clinical workflow, care service, or high-stakes internal tool, let's talk.",
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
    "I spent 13+ years in cancer-care operations and military medical logistics before moving into product design. At MSK and in the Army, I learned to spot the workaround after a handoff and the permission that stops the next person. I use that experience to design healthcare workflows and working prototypes.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.patterns": "App screens studied per app, across three finance apps",
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "People across the MSK workflows I helped redesign",
  "home.stat.logistics": "Faster medical resupply across seven aid stations",
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
  "home.proj.logistics.title": "Medical resupply, 85% faster",
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
  "footer.eyebrow": "Hillary Esposito · Diseñadora de productos y servicios de salud",
  "footer.statement": "Software funcional, hecho con cuidado.",
  "footer.siteAria": "Navegación del pie de página",
  "footer.explore": "Explorar",
  "footer.connect": "Contacto",
  "footer.email": "Correo",
  "footer.githubAria": "Perfil de GitHub (se abre en una pestaña nueva)",
  "footer.availability": "Disponible para oportunidades de diseño de productos y servicios de salud",
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
  "home.riso.eyebrow": "Hillary Esposito · Diseñadora de productos y servicios de salud",
  "home.riso.heroTitle": "Diseño servicios de salud desde el flujo de trabajo.",
  "home.riso.heroLead":
    "En Memorial Sloan Kettering, un flujo de trabajo que inicié",
  "home.riso.heroProof": "contribuyó a una reducción del 20% en los costos del registro médico electrónico de toda la organización.",
  "home.riso.heroClose": "Aporto más de 13 años en salud y logística médica a decisiones de producto, servicio e investigación.",
  "home.riso.workTitle": "Sistemas de salud, operaciones de servicio y un producto de consumo",
  "home.riso.groveDesc":
    "Una app para el cuidado de plantas que una IA creó de una sola vez. Encuesté a 34 propietarios y la reconstruí alrededor del problema más difícil: enseñarle al modelo a mostrar su confianza, citar su fuente y admitir cuando no sabe.",
  "home.riso.mskDesc":
    "Seis años mejorando flujos clínicos donde un error tenía un costo. Un flujo que inicié contribuyó más tarde a una reducción del 20% en los costos del registro médico electrónico de toda la organización; los materiales revisados de RCP permitieron reunir todas las certificaciones un 70% antes de un plazo que se estaba retrasando.",
  "home.riso.logisticsDesc":
    "Un servicio integral de suministros médicos para más de 5,000 soldados en siete estaciones de ayuda. El seguimiento digital compartido redujo el tiempo de reabastecimiento un 85% y el gasto un 60%, mientras la cadena de frío, la seguridad y el riesgo de bajas seguían siendo innegociables.",
  "home.riso.mobbinDesc":
    "Tres apps financieras convertidas en una referencia buscable: el trabajo fue la taxonomía y los nombres, no las capturas. Más de 200 pantallas por app, con criterio de editora en cada una.",
  "home.riso.groveAlt": "La pantalla de inicio de Grove, serena y centrada en las plantas — la primera pantalla terminada del rediseño",
  "home.riso.mskAlt": "Un mapa recreado de la red de atención de Memorial Sloan Kettering en la región de Nueva York",
  "home.riso.logisticsAlt": "Hillary Esposito de uniforme durante su despliegue como oficial de logística médica",
  "home.riso.mobbinAlt": "Una de más de 200 pantallas de apps de terceros documentadas para Mobbin — la pantalla de bienvenida de una app financiera",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Cada número aquí tiene una fuente",
  "home.riso.supportingKicker": "Práctica complementaria",
  "home.riso.supportingBody": "Como prueba de análisis de patrones de interacción y documentación de producción, también documenté más de 200 pantallas por app en tres productos financieros para Mobbin.",
  "home.riso.supportingLink": "Ver el estudio de Mobbin →",
  "home.layerTeaser.kicker": "Estudio material de Grove",
  "home.layerTeaser.title": "La atmósfera se mueve. La evidencia no.",
  "home.layerTeaser.body":
    "Papel, vitela y fragmentos botánicos se ensamblan alrededor de una pantalla real de Grove. La película puede cambiar. La interfaz no.",
  "home.layerTeaser.link": "Ver las decisiones detrás de la pantalla",
  "home.layerTeaser.pause": "Pausar el estudio material",
  "home.layerTeaser.replay": "Repetir el estudio material",
  "home.layerTeaser.play": "Reproducir el estudio material",
  "home.layerTeaser.caption": "Atmósfera generada · interfaz auténtica de Grove · sin sonido · 5 segundos",
  "home.riso.aboutTitle": "Diseño para la persona que trabaja bajo presión",
  "home.riso.contactKicker": "Contacto",
  "home.riso.contactBody":
    "Si su equipo está rediseñando un flujo clínico, un servicio de atención o una herramienta interna de alto riesgo, hablemos.",
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
    "Pasé más de 13 años en operaciones de atención oncológica y logística médica militar antes de dedicarme al diseño de producto. En MSK y en el Ejército aprendí a detectar el atajo después de una transferencia y el permiso que detiene a la siguiente persona. Uso esa experiencia para diseñar flujos de salud y prototipos funcionales.",
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
  "home.proj.logistics.title": "Reabastecimiento médico, un 85% más rápido",
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
