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
  // Appended in a visually hidden span to links that open a new tab, so the
  // accessible name starts with the visible text (WCAG 2.5.3).
  "a11y.newTab": " (opens in new tab)",

  // ── Global footer + recovery ──
  "footer.eyebrow": "Hillary Esposito · Healthcare Product Designer",
  "footer.statement": "Made by someone who's filed the paperwork.",
  "footer.signoff": "Still here?",
  "footer.signoffLink": "Email me.",
  "footer.siteAria": "Footer navigation",
  "footer.explore": "Explore",
  "footer.connect": "Contact",
  "footer.email": "Email",
  "footer.githubAria": "GitHub profile (opens in new tab)",
  "footer.availability": "Open to healthcare product design roles",
  "footer.madeWith": "Made with:",
  "footer.methods": "Methods:",
  "notFound.eyebrow": "404 · Page not found",
  "notFound.title": "This page wandered off.",
  "notFound.body": "The link may be outdated, but the work is still here. Return to the portfolio or browse the selected work.",
  "notFound.home": "Return home",
  "notFound.work": "See the selected work →",
  // Error boundaries (app-wide and per lazy case study) and the chunk loader.
  "recovery.appTitle": "This page did not load.",
  "recovery.appBody": "Reload it, or return to the selected work. If it keeps failing, email me.",
  "recovery.appReload": "Reload page",
  "recovery.email": "Email me",
  "recovery.caseEyebrow": "Case study recovery",
  "recovery.caseTitle": "{name} did not load.",
  "recovery.caseBody": "The page bundle may have been interrupted. Reload it, or return to selected work.",
  "recovery.caseReload": "Reload case study",
  "recovery.caseLoading": "Loading {name} case study…",

  // ── Nav dock ──
  "nav.ariaPrimary": "Primary navigation",
  "nav.logoAria": "Go to home",
  // Footer still uses these (its own column of links) - separate keys from
  // the dock's below so changing one never silently changes the other.
  "nav.home": "Home",
  "nav.work": "Work",
  "nav.about": "About",
  // The dock's own labels: sentence case, no CSS uppercasing, separate keys
  // from the footer's so changing one never silently changes the other.
  "nav.dockWork": "Work",
  "nav.dockAbout": "About",
  "nav.resume": "Résumé",
  "nav.resumeAria": "View résumé (opens in new tab)",
  "nav.themeToDark": "Switch to dark mode",
  "nav.themeToLight": "Switch to light mode",
  // The language toggle is labelled in the language you'd switch TO,
  // so the "en" entry is deliberately Spanish (and vice versa).
  "nav.langSwitch": "Cambiar a español",
  "nav.settings": "Settings",
  "nav.settingsAria": "Settings: theme and language",

  // ── Home: hero ──
  "home.status": "Open to healthcare product design roles",
  "home.riso.eyebrow": "Healthcare Product Designer · Army veteran, MSK operations and training",
  "home.riso.heroTitle": "I design the workflow before the screen.",
  // "Workflow fluency" named a skill without saying what it covers. The
  // durable claim is scope: the whole path a task takes, not the screen at the
  // end of it — which is what the MSK case study actually demonstrates.
  //
  // Keep the proposal and the later implementation distinct. The prior 20%
  // clause compressed an organization result into Hillary's personal action.
  "home.riso.heroLead":
    "At Memorial Sloan Kettering, I traced a four-department paper detour and proposed the queue that replaced it.",
  // The hero lede above is the one place on Home that explains the paper
  // detour (2026-10-14 review, item 13); the work row and teaser don't repeat it.
  "home.riso.heroProof": "IT and UX built it after I changed roles. The workflows in scope reach 21,000+ clinicians and staff.",
  "home.riso.careerSwitchTitle": "From healthcare operations to product design.",
  "home.riso.careerSwitchBody": "Six years running MSK admin and training workflows, and 13+ years of Army service in medical logistics, before designing for them.",
  "home.riso.openingVisual": "Watch the 5-second opener",
  "home.riso.openingFilmLabel": "Opening visual · five seconds",
  "home.riso.openingFilmSkip": "Skip →",
  "home.riso.primaryWork": "Review the MSK case study",
  "home.riso.workTitle": "Decisions you can inspect",
  "home.riso.groveDesc":
    "A competitive analysis, a five-user test of the original prototype, and a 34-person survey narrowed eleven features to three. The redesign is in progress; the retest comes next.",
  "home.riso.mskDesc":
    "I mapped the detour across four departments and pitched the digital filing workflow that replaced it. Six steps became five, and one department left the loop.",
  "home.riso.logisticsDesc":
    "I planned and tracked a warehouse relocation that took medical resupply from 1–2 months to 1–2 weeks, then built shared order tracking for seven aid stations.",
  "home.riso.uxwomanDesc":
    "I ran six healthcare interviews and one adjacent HR interview; they point to one hypothesis: staff and patients cannot see who owns the next step. No dedicated patient interviews yet; five pretotypes designed, none run. Active, research phase.",
  "home.riso.knowunityDesc":
    "Students say a definition out loud and get their own words quoted back as proof. Selected for the Yummy Labs AI Design Sprint with Knowunity: solo, 2.5 weeks, on their brief and kit. Recall mocked, not shipped.",
  "home.riso.groveAlt": "Grove daily care screen showing one clear plant-care task and overdue plants first",
  "home.riso.mskAlt": "Recreated Memorial Sloan Kettering filing queue, showing patient-portal messages moving from ready-to-send through filed",
  "home.riso.logisticsAlt": "Service mechanism diagram contrasting a rear supply point with the warehouse moved forward, beside resupply time falling from months to weeks",
  "home.riso.uxwomanAlt": "Evidence ledger: 6 healthcare interviews, 1 adjacent HR interview, 0 patient interviews, 5 pretotypes designed, 0 run",
  "home.riso.knowunityAlt": "Two Say It Back mobile prototype states: a voice-recall question, then the pass screen quoting the student's own words back",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "The numbers, with their sources.",
  "home.riso.supportingKicker": "Also documented · Mobbin, 200+ screens per app",
  "home.riso.supportingLink": "Review the Mobbin case study →",
  "home.riso.aboutTitle": "I design for the clinician between patients.",
  "home.riso.contactKicker": "Contact",
  "home.dispatch.eyebrow": "Weekend dispatch · No. 01",
  "home.dispatch.trainAttribution": "Built with MTA Open Data · Independent prototype",
  "home.dispatch.title": "The Trip Home",
  "home.dispatch.question": "Can a rider know, rather than guess, whether the trip home is accessible?",
  "home.dispatch.body":
    "At a New York Public Library (NYPL) hackathon, Jacqueline Gordon and I used MTA and NYC Open Data to build a working prototype that checks subway access by platform and direction, plus nearby curb ramps.",
  "home.dispatch.findingLabel": "What the data exposed",
  "home.dispatch.finding":
    "A trip inherits the risk of every stop it calls at, so eight one-direction platforms put a return-trip hazard on 22,937 of the system's 77,236 scheduled trips.",
  "home.dispatch.role":
    "Jacqueline led accessibility features. I led product strategy, data logic, and AI-assisted coded prototyping.",
  "home.dispatch.ruleLabel": "The product rule",
  "home.dispatch.rule": "Warn, never block.",
  "home.dispatch.ruleBody":
    "Accessibility can be permanent, temporary, or uncertain. The planner explains the risk without hiding the route.",
  "home.dispatch.primary": "Explore the working case study",
  "home.dispatch.devpost": "Read the Devpost entry",
  "home.dispatch.linkedin": "Read the build note on LinkedIn",
  "home.dispatch.photoCaption": "NYPL · Built for NYC AI Hackathon",
  "home.dispatch.photoLink": "Try the accessible transit prototype",
  "home.dispatch.statLabel": "scheduled trips affected",
  "home.dispatch.prototypeLabel": "Prototype study · Not live service",
  "home.dispatch.openJournal": "Open the dispatch",
  "home.dispatch.closeJournal": "Close the dispatch",

  // ── Home: mini about ──
  "home.about.eyebrow": "About",
  "home.about.blurb":
    "Six years in cancer-care operations and training, plus Army medical logistics.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "Clinicians and administrative staff across the workflows in scope",
  "home.stat.logistics": "Medical resupply across seven aid stations",
  "home.stat.groveSource": "Grove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.stat.logisticsSource": "Army service record",
  // Hillary's role in each proof number, above the number (2026-10-15, call 5).
  "home.stat.scaleTag": "Scope",
  "home.stat.logisticsTag": "Led · owner-reported",
  "home.stat.researchTag": "Method",
  "home.trustAria": "Credentials",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA · Lean Six Sigma Green Belt",
  "home.trust.bilingual": "Bilingual EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Selected work",
  "home.proj.grove.subtitle": "Grove · Product design · Research to scope",
  "home.proj.msk.subtitle": "Memorial Sloan Kettering · UX & Product Design",
  "home.proj.logistics.subtitle": "Army medical logistics · Service Design",
  "home.proj.uxwoman.subtitle": "UX Woman · Healthcare research · Research phase",
  "home.proj.knowunity.subtitle": "Knowunity · Design sprint · Interactive mobile prototype",
  "home.proj.grove.title": "Eleven features became three",
  "home.proj.msk.title": "A filing queue replaced a four-department paper detour",
  "home.proj.logistics.title": "Medical resupply went from months to weeks",
  "home.proj.uxwoman.title": "Six healthcare interviews, one hypothesis",
  "home.proj.knowunity.title": "The student’s own words are the proof",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "Redesigning a clinical workflow or a high-stakes internal tool?",
  "contact.note": "Email me",
  "contact.copy": "or copy:",
  "home.linkedinAria": "LinkedIn profile (opens in new tab)",

  // ── Recruiter pill (global trigger only - the panel stays English in Phase 1) ──

  // ── Ask about the work ──
  // A search tool that writes clearly, not a persona: no "AI" badge, no
  // first person for Hillary, every answer with its sources.
  "ask.nav": "Ask",
  "ask.title": "Ask about the work",
  "ask.intro": "Answers come from the résumé and the published pages, each with its source.",
  "ask.startersLabel": "Try one of these",
  "ask.starter1": "What service design work did she do at MSK?",
  "ask.starter2": "How did she use UX as a Training Facilitator?",
  "ask.starter3": "How is this site built?",
  "ask.starter4": "What inspired the look?",
  "ask.inputLabel": "Your question",
  "ask.submit": "Find the answer",
  "ask.thinking": "Finding the passage…",
  "ask.answerLabel": "Answer",
  "ask.sources": "Sources",
  "ask.passagesTitle": "What the portfolio says",
  "ask.notCoveredTitle": "That isn't covered in the portfolio.",
  "ask.notCoveredRelated": "Closest pages",
  "ask.notCoveredEmail": "Ask Hillary directly:",
  "ask.failedTitle": "The question tool didn't load.",
  "ask.failedBody": "Reload the page, or email Hillary:",
  "ask.opensNewTab": "(opens in new tab)",
  "ask.close": "Close",
  "ask.recruiterLink": "Ask a question",
  // Quiet link near the starters - opens the recruiter panel instead of
  // querying the engine, so it must read as a different kind of action.
  // Same text as the hero's own link to the same panel (home.riso.recruiterTourLink)
  // - one name for one destination, said the same way everywhere it's offered.
  "ask.ninetySecondLink": "Open the 90-second tour",
  // Hero, next to "Review the MSK case study" - a second, quieter entry
  // point to the same recruiter panel the Ask dialog's link above opens.
  "home.riso.recruiterTourLink": "Open the 90-second tour",
} as const;

export type StringKey = keyof typeof en;

// Spanish - Phase 1 (home + nav). /* TODO: native-speaker (owner) review */
const es: Partial<Record<StringKey, string>> = {
  // ── App shell ──
  "app.skip": "Saltar al contenido principal",
  "a11y.newTab": " (se abre en una pestaña nueva)",

  // ── Global footer + recovery ──
  "footer.eyebrow": "Hillary Esposito · Diseñadora de productos de salud",
  "footer.statement": "Hecho por alguien que ya llenó el papeleo.",
  "footer.signoff": "¿Sigue aquí?",
  "footer.signoffLink": "Escríbame.",
  "footer.siteAria": "Navegación del pie de página",
  "footer.explore": "Explorar",
  "footer.connect": "Contacto",
  "footer.email": "Correo",
  "footer.githubAria": "Perfil de GitHub (se abre en una pestaña nueva)",
  "footer.availability": "Abierta a roles de diseño de productos de salud",
  "footer.madeWith": "Hecho con:",
  "footer.methods": "Métodos:",
  "notFound.eyebrow": "404 · Página no encontrada",
  "notFound.title": "Esta página se\u00a0desvió.",
  "notFound.body": "Puede que el enlace esté desactualizado, pero el trabajo sigue aquí. Vuelva al portafolio o explore el trabajo seleccionado.",
  "notFound.home": "Volver al inicio",
  "notFound.work": "Ver el trabajo seleccionado →",
  "recovery.appTitle": "Esta página no se cargó.",
  "recovery.appBody": "Vuelva a cargarla o regrese al trabajo seleccionado. Si sigue fallando, escríbame.",
  "recovery.appReload": "Recargar la página",
  "recovery.email": "Escríbame",
  "recovery.caseEyebrow": "Recuperación del estudio de caso",
  "recovery.caseTitle": "{name} no se cargó.",
  "recovery.caseBody": "Es posible que la carga de la página se haya interrumpido. Vuelva a cargarla o regrese al trabajo seleccionado.",
  "recovery.caseReload": "Recargar el estudio de caso",
  "recovery.caseLoading": "Cargando el estudio de caso de {name}…",

  // ── Nav dock ──
  "nav.ariaPrimary": "Navegación principal",
  "nav.logoAria": "Ir al inicio",
  "nav.home": "Inicio",
  "nav.work": "Trabajo",
  "nav.about": "Sobre mí",
  "nav.dockWork": "Trabajo",
  // One Spanish name for "About" across the site - this used to say "Acerca
  // de" while the footer and breadcrumbs said "Sobre mí" for the same page.
  "nav.dockAbout": "Sobre mí",
  "nav.resume": "CV",
  "nav.resumeAria": "Ver CV (se abre en una pestaña nueva)",
  "nav.themeToDark": "Cambiar a modo oscuro",
  "nav.themeToLight": "Cambiar a modo claro",
  "nav.langSwitch": "Switch to English",
  "nav.settings": "Configuración",
  "nav.settingsAria": "Configuración: tema e idioma",

  // ── Home: hero ──
  "home.status": "Abierta a roles de diseño de productos de salud",
  "home.riso.eyebrow": "Diseñadora de productos de salud · Veterana del Ejército, operaciones y capacitación en MSK",
  "home.riso.heroTitle": "Diseño el flujo de trabajo antes que la pantalla.",
  "home.riso.heroLead":
    "En Memorial Sloan Kettering, rastreé un desvío en papel entre cuatro áreas y propuse la cola que lo reemplazó.",
  "home.riso.heroProof": "TI y UX la construyeron después de que cambié de puesto. Los flujos incluidos alcanzan a más de 21,000 clínicos y personal.",
  "home.riso.careerSwitchTitle": "De operaciones de salud a diseño de producto.",
  "home.riso.careerSwitchBody": "Seis años a cargo de flujos administrativos y de capacitación en MSK, y más de 13 años de servicio en el Ejército en logística médica, antes de diseñar para ellos.",
  "home.riso.openingVisual": "Ver la apertura de 5 segundos",
  "home.riso.openingFilmLabel": "Apertura visual · cinco segundos",
  "home.riso.openingFilmSkip": "Saltar →",
  // The panel itself stays English-only (lang="en") - the ES link says so,
  // the same way ask.ninetySecondLink does below.
  "home.riso.recruiterTourLink": "Abrir el recorrido de 90 segundos (en inglés)",
  "home.riso.primaryWork": "Ver el estudio de caso de MSK",
  "home.riso.workTitle": "Decisiones que puede revisar",
  "home.riso.groveDesc":
    "Un análisis competitivo, una prueba con cinco usuarios del prototipo original y una encuesta a 34 personas redujeron once funciones a tres. El rediseño está en curso; la nueva prueba viene después.",
  "home.riso.mskDesc":
    "Mapeé el desvío entre cuatro áreas y propuse el flujo de archivo digital que lo reemplazó. Seis pasos se volvieron cinco, y un área salió del circuito.",
  "home.riso.logisticsDesc":
    "Planifiqué y supervisé una reubicación de almacén que llevó el reabastecimiento médico de 1–2 meses a 1–2 semanas, y luego creé un seguimiento compartido para siete puestos.",
  "home.riso.uxwomanDesc":
    "Hice seis entrevistas de salud y una adyacente de RR. HH.; apuntan a una hipótesis: el personal y los pacientes no ven quién tiene el siguiente paso. Aún sin entrevistas dedicadas con pacientes; cinco pretotipos diseñados, ninguno ejecutado. Activo, fase de investigación.",
  "home.riso.knowunityDesc":
    "Los estudiantes dicen una definición en voz alta y reciben sus propias palabras citadas como prueba. Seleccionada para el Yummy Labs AI Design Sprint con Knowunity: individual, 2.5 semanas, con su brief y su kit. Recuerdo simulado, no publicado.",
  "home.riso.groveAlt": "Pantalla de cuidado diario de Grove con una tarea clara y las plantas atrasadas primero",
  "home.riso.mskAlt": "Cola de archivo recreada de Memorial Sloan Kettering, mostrando mensajes del portal de pacientes desde listos para enviar hasta archivados",
  "home.riso.logisticsAlt": "Diagrama de mecanismo de servicio que contrasta un punto de suministro en la retaguardia con el almacén movido al frente, junto al tiempo de reabastecimiento bajando de meses a semanas",
  "home.riso.uxwomanAlt": "Registro de evidencia: 6 entrevistas de salud, 1 entrevista adyacente de RR. HH., 0 entrevistas con pacientes, 5 pretotipos diseñados, 0 ejecutados",
  "home.riso.knowunityAlt": "Dos estados del prototipo móvil Say It Back: una pregunta de recuerdo por voz y luego la pantalla de acierto que cita las propias palabras del estudiante",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Los números, con sus fuentes.",
  "home.riso.supportingKicker": "También documentado · Mobbin, más de 200 pantallas por app",
  "home.riso.supportingLink": "Ver el estudio de caso de Mobbin →",
  "home.riso.aboutTitle": "Diseño para el personal clínico entre un paciente y otro.",
  "home.riso.contactKicker": "Contacto",
  "home.dispatch.eyebrow": "Despacho de fin de semana · N.º 01",
  "home.dispatch.trainAttribution": "Creado con datos abiertos de MTA · Prototipo independiente",
  "home.dispatch.title": "El viaje de regreso",
  "home.dispatch.question": "¿Puede una persona saber, en lugar de adivinar, si el viaje de regreso es accesible?",
  "home.dispatch.body":
    "En un hackathon de la Biblioteca Pública de Nueva York (NYPL), Jacqueline Gordon y yo usamos datos de MTA y NYC Open Data para crear un prototipo funcional que verifica el acceso al metro por plataforma y dirección, además de las rampas cercanas.",
  "home.dispatch.findingLabel": "Lo que revelaron los datos",
  "home.dispatch.finding":
    "Un viaje hereda el riesgo de cada parada en la que se detiene: ocho andenes accesibles en una sola dirección ponen en riesgo el viaje de regreso de 22,937 de los 77,236 viajes programados del sistema.",
  "home.dispatch.role":
    "Jacqueline dirigió las funciones de accesibilidad. Yo dirigí la estrategia de producto, la lógica de datos y el prototipado en código asistido por IA.",
  "home.dispatch.ruleLabel": "La regla del producto",
  "home.dispatch.rule": "Advertir, nunca bloquear.",
  "home.dispatch.ruleBody":
    "La accesibilidad puede ser permanente, temporal o incierta. El planificador explica el riesgo sin ocultar la ruta.",
  "home.dispatch.primary": "Ver el estudio de caso funcional",
  "home.dispatch.devpost": "Leer la entrada en Devpost",
  "home.dispatch.linkedin": "Leer la nota del proyecto en LinkedIn",
  "home.dispatch.photoCaption": "NYPL · Hackathon Built for NYC AI",
  "home.dispatch.photoLink": "Probar el prototipo de transporte accesible",
  "home.dispatch.statLabel": "viajes programados afectados",
  "home.dispatch.prototypeLabel": "Estudio de prototipo · No es servicio en vivo",
  "home.dispatch.openJournal": "Abrir el despacho",
  "home.dispatch.closeJournal": "Cerrar el despacho",

  // ── Home: mini about ──
  "home.about.eyebrow": "Sobre mí",
  "home.about.blurb":
    "Seis años en operaciones y capacitación oncológica, además de logística médica del Ejército.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: proof stats ──
  "home.stat.research": "Personas encuestadas antes de diseñar nada",
  "home.stat.scale": "Personal clínico y administrativo en los flujos incluidos",
  "home.stat.logistics": "Reabastecimiento médico en siete estaciones de ayuda",
  "home.stat.groveSource": "Investigación de descubrimiento de Grove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.stat.logisticsSource": "Expediente de servicio del Ejército",
  "home.stat.scaleTag": "Alcance",
  "home.stat.logisticsTag": "Dirigí · dato autorreportado",
  "home.stat.researchTag": "Método",
  "home.trustAria": "Credenciales",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA · Green Belt de Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Trabajo seleccionado",
  "home.proj.grove.subtitle": "Grove · Diseño de producto · De la investigación al alcance",
  "home.proj.msk.subtitle": "Memorial Sloan Kettering · Diseño UX y de producto",
  "home.proj.logistics.subtitle": "Logística médica del Ejército · Diseño de servicios",
  "home.proj.uxwoman.subtitle": "UX Woman · Investigación en salud · Fase de investigación",
  "home.proj.knowunity.subtitle": "Knowunity · Sprint de diseño · Prototipo móvil interactivo",
  "home.proj.grove.title": "Once funciones se convirtieron en tres",
  "home.proj.msk.title": "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas",
  // Same wording as the Spanish case-study title. "Tiempo de reabastecimiento
  // médico reducido" left "médico" alone on its own line at 320, 375 and 1280.
  "home.proj.logistics.title": "El reabastecimiento médico pasó de meses a\u00a0semanas",
  "home.proj.uxwoman.title": "Seis entrevistas de salud, una hipótesis",
  "home.proj.knowunity.title": "Las propias palabras del estudiante son la prueba",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "¿Está rediseñando un flujo clínico o una herramienta interna de alto riesgo?",
  "contact.note": "Escríbame",
  "contact.copy": "o copie:",
  "home.linkedinAria": "Perfil de LinkedIn (se abre en una pestaña nueva)",

  // ── Recruiter pill ──

  // ── Ask about the work ──
  "ask.nav": "Preguntar",
  // Must stay a true prefix of "ask.nav" above (WCAG 2.5.3, Label in Name):
  // the nav bird's accessible name is this string, and its visible label is
  // "ask.nav" alone - "Pregunte" (imperative) didn't start with "Preguntar"
  // (infinitive), so a screen-reader user voicing the visible label couldn't
  // match it to the control's name. The English case already passes this -
  // "Ask about the work" starts with "Ask".
  "ask.title": "Preguntar sobre el trabajo",
  "ask.intro": "Las respuestas salen del currículum y de las páginas publicadas, cada una con su fuente.",
  "ask.startersLabel": "Pruebe una de estas",
  "ask.starter1": "¿Qué trabajo de diseño de servicios hizo en MSK?",
  "ask.starter2": "¿Cómo aplicó UX como facilitadora de capacitación?",
  "ask.starter3": "¿Cómo está construido este sitio?",
  "ask.starter4": "¿Qué inspiró el estilo visual?",
  "ask.inputLabel": "Su pregunta",
  "ask.submit": "Buscar la respuesta",
  "ask.thinking": "Buscando el pasaje…",
  "ask.answerLabel": "Respuesta",
  "ask.sources": "Fuentes",
  "ask.passagesTitle": "Lo que dice el portafolio",
  "ask.notCoveredTitle": "Eso no está en el portafolio.",
  "ask.notCoveredRelated": "Páginas más cercanas",
  "ask.notCoveredEmail": "Pregúntele a Hillary directamente:",
  "ask.failedTitle": "La herramienta de preguntas no cargó.",
  "ask.failedBody": "Recargue la página o escríbale a Hillary:",
  "ask.opensNewTab": "(se abre en una pestaña nueva)",
  "ask.close": "Cerrar",
  "ask.recruiterLink": "Hacer una pregunta",
  "ask.ninetySecondLink": "Abrir el recorrido de 90 segundos (en inglés)",
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
