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
  "nav.langCode": "ES",
  "nav.settings": "Settings",
  "nav.settingsAria": "Settings: theme and language",

  // ── Home: hero ──
  "home.status": "Open to healthcare product design roles",
  "home.seeApproach": "See my approach →",
  "home.riso.eyebrow": "Healthcare Product Designer · 13+ years in healthcare operations",
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
  "home.riso.careerSwitchBody": "I spent 13+ years running the workflows I now design: MSK admin and training roles, and Army medical logistics.",
  "home.riso.openingVisual": "Watch the 5-second opener",
  "home.riso.openingFilmLabel": "Opening visual · five seconds",
  "home.riso.openingFilmSkip": "Skip →",
  "home.riso.primaryWork": "Review the MSK case study",
  "home.riso.heroClose": "",
  "home.riso.queueExpand": "View the full queue · 5 items",
  "home.riso.queueCollapse": "Show fewer",
  "home.riso.workTitle": "Decisions you can inspect",
  "home.riso.groveDesc":
    "A competitive analysis, a five-user test of the original prototype, and a 34-person survey narrowed eleven features to three. The redesign is in progress; the retest comes next.",
  "home.riso.mskDesc":
    "I mapped the detour across four departments and pitched the digital filing workflow that replaced it. Six steps became five, and one department left the loop.",
  "home.riso.logisticsDesc":
    "I planned and tracked a warehouse relocation that shortened medical resupply time by 85%, then built shared order tracking for seven aid stations.",
  "home.riso.knowunityDesc":
    "Students say a definition out loud and get their own words quoted back as proof. Selected for a Yummy Labs design sprint with Knowunity: solo, 2.5 weeks, on their brief and kit. Recall mocked, not shipped.",
  "home.riso.mobbinDesc":
    "Three finance apps turned into a searchable reference — the work was the taxonomy and the naming, not the screenshots. 200+ screens per app, an editor's judgment on every one.",
  "home.riso.groveAlt": "Grove daily care screen showing one clear plant-care task and overdue plants first",
  "home.riso.mskAlt": "Recreated Memorial Sloan Kettering filing queue, showing patient-portal messages moving from ready-to-send through filed",
  "home.riso.logisticsAlt": "Service mechanism diagram contrasting a rear supply point with the warehouse moved forward, beside an 85% reduction in resupply time",
  "home.riso.knowunityAlt": "Two Say It Back mobile prototype states: a voice-recall question, then the pass screen quoting the student's own words back",
  "home.riso.knowunityPrototypeAria": "Try the Say It Back interactive prototype (opens in new tab)",
  "home.riso.mobbinAlt": "One of the third-party app screens documented for Mobbin — a finance app welcome screen",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "The numbers, with their sources.",
  "home.riso.supportingKicker": "Also documented · Mobbin, 200+ screens per app",
  "home.riso.supportingBody": "For interaction-pattern analysis and production documentation, I also documented 200+ screens per app across three finance products for Mobbin.",
  "home.riso.supportingLink": "Review the Mobbin case study →",
  "home.riso.aboutTitle": "I design for the clinician between patients.",
  "home.riso.contactKicker": "Contact",
  "home.riso.contactBody":
    "If your team is redesigning a clinical workflow, care service, or high-stakes internal tool, let's talk.",
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
  "home.dispatch.primary": "Explore the working case study ↗",
  "home.dispatch.devpost": "Read the Devpost entry ↗",
  "home.dispatch.linkedin": "Read the build note on LinkedIn ↗",
  "home.dispatch.photoAlt": "Participants building projects at NYPL's Built for NYC AI hackathon",
  "home.dispatch.photoCaption": "NYPL · Built for NYC AI Hackathon",
  "home.dispatch.photoLink": "Try the accessible transit prototype",
  "home.dispatch.statLabel": "scheduled trips affected",
  "home.dispatch.routePlay": "Trace the return trip →",
  "home.dispatch.routeReset": "Made it home ✓ · reset",
  "home.dispatch.routeStatus": "The return route reached home.",
  "home.dispatch.prototypeLabel": "Prototype study · Not live service",
  "home.dispatch.routeOutbound": "Outbound",
  "home.dispatch.routeReturn": "Return home",
  "home.dispatch.routeGaps": "8 direction gaps",
  "home.dispatch.openJournal": "Open the dispatch",
  "home.dispatch.closeJournal": "Close the dispatch",

  // ── Home: mini about ──
  "home.about.eyebrow": "About",
  "home.about.blurb":
    "13+ years in cancer-care operations and military medical logistics.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.patterns": "App screens studied per app, across three finance apps",
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "Clinicians and administrative staff across the workflows in scope",
  "home.stat.logistics": "Shorter medical resupply time across seven aid stations",
  "home.stat.mobbinSource": "Mobbin pattern study",
  "home.stat.groveSource": "Grove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.stat.logisticsSource": "Army service record · owner-reported",
  "home.trustAria": "Credentials",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA · Lean Six Sigma Green Belt",
  "home.trust.bilingual": "Bilingual EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Selected work",
  "home.proj.grove.subtitle": "Grove · Product design · Research to scope",
  "home.proj.msk.subtitle": "Memorial Sloan Kettering · UX & Product Design",
  "home.proj.logistics.subtitle": "Army medical logistics · Service Design",
  "home.proj.knowunity.subtitle": "Knowunity · Design sprint · Interactive mobile prototype",
  "home.proj.mobbin.subtitle": "Mobbin · Freelance UX Flow Documentation",
  "home.proj.grove.title": "Eleven features became three",
  "home.proj.msk.title": "A filing queue replaced a four-department paper detour",
  "home.proj.logistics.title": "85% shorter medical resupply time",
  "home.proj.knowunity.title": "The student’s own words are the proof",
  "home.proj.mobbin.title": "200+ screens per app, searchable by task",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "Redesigning a clinical workflow or a high-stakes internal tool?",
  "contact.note": "Email me",
  "contact.copy": "or copy:",
  "home.linkedinAria": "LinkedIn profile (opens in new tab)",

  // ── Recruiter pill (global trigger only - the panel stays English in Phase 1) ──
  "recruiter.pill": "90-second tour",
  "recruiter.pillAria": "Open the 90-second tour",
  "recruiter.seconds": "90 sec",

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
  "notFound.title": "Esta página se desvió.",
  "notFound.body": "Puede que el enlace esté desactualizado, pero el trabajo sigue aquí. Vuelva al portafolio o explore el trabajo seleccionado.",
  "notFound.home": "Volver al inicio",
  "notFound.work": "Ver el trabajo seleccionado →",

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
  "nav.langCode": "EN",
  "nav.settings": "Configuración",
  "nav.settingsAria": "Configuración: tema e idioma",

  // ── Home: hero ──
  "home.status": "Abierta a roles de diseño de productos de salud",
  "home.seeApproach": "Conozca mi enfoque →",
  "home.riso.eyebrow": "Diseñadora de productos de salud · más de 13 años en operaciones de salud",
  "home.riso.heroTitle": "Diseño el flujo de trabajo antes que la pantalla.",
  "home.riso.heroLead":
    "En Memorial Sloan Kettering, rastreé un desvío en papel entre cuatro áreas y propuse la cola que lo reemplazó.",
  "home.riso.heroProof": "TI y UX la construyeron después de que cambié de puesto. Los flujos incluidos alcanzan a más de 21,000 clínicos y personal.",
  "home.riso.careerSwitchTitle": "De operaciones de salud a diseño de producto.",
  "home.riso.careerSwitchBody": "Pasé más de 13 años dirigiendo los flujos que ahora diseño: puestos administrativos y de capacitación en MSK, y logística médica del Ejército.",
  "home.riso.openingVisual": "Ver la apertura de 5 segundos",
  "home.riso.openingFilmLabel": "Apertura visual · cinco segundos",
  "home.riso.openingFilmSkip": "Saltar →",
  // The panel itself stays English-only (lang="en") - the ES link says so,
  // the same way ask.ninetySecondLink does below.
  "home.riso.recruiterTourLink": "Abrir el recorrido de 90 segundos (en inglés)",
  "home.riso.primaryWork": "Ver el estudio de caso de MSK",
  "home.riso.heroClose": "",
  "home.riso.queueExpand": "Ver la cola completa · 5 elementos",
  "home.riso.queueCollapse": "Mostrar menos",
  "home.riso.workTitle": "Decisiones que puede revisar",
  "home.riso.groveDesc":
    "Un análisis competitivo, una prueba con cinco usuarios del prototipo original y una encuesta a 34 personas redujeron once funciones a tres. El rediseño está en curso; la nueva prueba viene después.",
  "home.riso.mskDesc":
    "Mapeé el desvío entre cuatro áreas y propuse el flujo de archivo digital que lo reemplazó. Seis pasos se volvieron cinco, y un área salió del circuito.",
  "home.riso.logisticsDesc":
    "Planifiqué y supervisé una reubicación de almacén que redujo un 85% el tiempo de reabastecimiento médico, y luego creé un seguimiento compartido para siete puestos.",
  "home.riso.knowunityDesc":
    "Los estudiantes dicen una definición en voz alta y reciben sus propias palabras citadas como prueba. Seleccionada para un sprint de diseño de Yummy Labs con Knowunity: individual, 2.5 semanas, con su brief y su kit. Recuerdo simulado, no publicado.",
  "home.riso.mobbinDesc":
    "Tres apps financieras convertidas en una referencia buscable: el trabajo fue la taxonomía y los nombres, no las capturas. Más de 200 pantallas por app, con criterio de editora en cada una.",
  "home.riso.groveAlt": "Pantalla de cuidado diario de Grove con una tarea clara y las plantas atrasadas primero",
  "home.riso.mskAlt": "Cola de archivo recreada de Memorial Sloan Kettering, mostrando mensajes del portal de pacientes desde listos para enviar hasta archivados",
  "home.riso.logisticsAlt": "Diagrama de mecanismo de servicio que contrasta un punto de suministro en la retaguardia con el almacén movido al frente, junto a una reducción del 85% en el tiempo de reabastecimiento",
  "home.riso.knowunityAlt": "Dos estados del prototipo móvil Say It Back: una pregunta de recuerdo por voz y luego la pantalla de acierto que cita las propias palabras del estudiante",
  "home.riso.knowunityPrototypeAria": "Probar el prototipo interactivo Say It Back (se abre en una pestaña nueva)",
  "home.riso.mobbinAlt": "Una de más de 200 pantallas de apps de terceros documentadas para Mobbin — la pantalla de bienvenida de una app financiera",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Los números, con sus fuentes.",
  "home.riso.supportingKicker": "También documentado · Mobbin, más de 200 pantallas por app",
  "home.riso.supportingBody": "Como prueba de análisis de patrones de interacción y documentación de producción, también documenté más de 200 pantallas por app en tres productos financieros para Mobbin.",
  "home.riso.supportingLink": "Ver el estudio de caso de Mobbin →",
  "home.riso.aboutTitle": "Diseño para el personal clínico entre un paciente y otro.",
  "home.riso.contactKicker": "Contacto",
  "home.riso.contactBody":
    "Si su equipo está rediseñando un flujo clínico, un servicio de atención o una herramienta interna de alto riesgo, hablemos.",
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
  "home.dispatch.primary": "Ver el estudio de caso funcional ↗",
  "home.dispatch.devpost": "Leer la entrada en Devpost ↗",
  "home.dispatch.linkedin": "Leer la nota del proyecto en LinkedIn ↗",
  "home.dispatch.photoAlt": "Participantes creando proyectos en el hackathon Built for NYC AI de NYPL",
  "home.dispatch.photoCaption": "NYPL · Hackathon Built for NYC AI",
  "home.dispatch.photoLink": "Probar el prototipo de transporte accesible",
  "home.dispatch.statLabel": "viajes programados afectados",
  "home.dispatch.routePlay": "Trazar el viaje de regreso →",
  "home.dispatch.routeReset": "Llegó a casa ✓ · reiniciar",
  "home.dispatch.routeStatus": "La ruta de regreso llegó a casa.",
  "home.dispatch.prototypeLabel": "Estudio de prototipo · No es servicio en vivo",
  "home.dispatch.routeOutbound": "Ida",
  "home.dispatch.routeReturn": "Regreso a casa",
  "home.dispatch.routeGaps": "8 brechas por dirección",
  "home.dispatch.openJournal": "Abrir el despacho",
  "home.dispatch.closeJournal": "Cerrar el despacho",

  // ── Home: mini about ──
  "home.about.eyebrow": "Sobre mí",
  "home.about.blurb":
    "Más de 13 años en operaciones de atención oncológica y logística médica militar.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: proof stats ──
  "home.stat.patterns": "Pantallas documentadas por app, en tres apps financieras",
  "home.stat.research": "Personas encuestadas antes de diseñar nada",
  "home.stat.scale": "Personal clínico y administrativo en los flujos incluidos",
  "home.stat.logistics": "Reabastecimiento médico más rápido en siete estaciones de ayuda",
  "home.stat.mobbinSource": "Estudio de patrones de Mobbin",
  "home.stat.groveSource": "Investigación de descubrimiento de Grove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.stat.logisticsSource": "Expediente de servicio del Ejército · dato autorreportado",
  "home.trustAria": "Credenciales",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA · Green Belt de Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Trabajo seleccionado",
  "home.proj.grove.subtitle": "Grove · Diseño de producto · De la investigación al alcance",
  "home.proj.msk.subtitle": "Memorial Sloan Kettering · Diseño UX y de producto",
  "home.proj.logistics.subtitle": "Logística médica del Ejército · Diseño de servicios",
  "home.proj.knowunity.subtitle": "Knowunity · Sprint de diseño · Prototipo móvil interactivo",
  "home.proj.mobbin.subtitle": "Mobbin · Documentación freelance de flujos UX",
  "home.proj.grove.title": "Once funciones se convirtieron en tres",
  "home.proj.msk.title": "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas",
  // Same wording as the Spanish case-study title. "Tiempo de reabastecimiento
  // médico reducido" left "médico" alone on its own line at 320, 375 and 1280.
  "home.proj.logistics.title": "El reabastecimiento médico tardó un\u00a085%\u00a0menos",
  "home.proj.knowunity.title": "Las propias palabras del estudiante son la prueba",
  "home.proj.mobbin.title": "Más de 200 pantallas por app, buscables por tarea",

  // ── Home: contact / CTA ──
  "home.ctaTitle": "¿Está rediseñando un flujo clínico o una herramienta interna de alto riesgo?",
  "contact.note": "Escríbame",
  "contact.copy": "o copie:",
  "home.linkedinAria": "Perfil de LinkedIn (se abre en una pestaña nueva)",

  // ── Recruiter pill ──
  "recruiter.pill": "Recorrido de 90 segundos",
  "recruiter.pillAria": "Abrir el recorrido de 90 segundos (en inglés)",
  "recruiter.seconds": "90 seg",

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
