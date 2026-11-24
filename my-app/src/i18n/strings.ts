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
  "footer.eyebrow": "Hillary Esposito · UX Designer & Researcher",
  "footer.statement": "Healthcare design that does the paperwork.",
  "footer.signoff": "Still here?",
  "footer.signoffLink": "Email me.",
  "footer.siteAria": "Footer navigation",
  "footer.explore": "Explore",
  "footer.connect": "Contact",
  "footer.email": "Email",
  "footer.githubAria": "GitHub profile (opens in new tab)",
  "footer.availability": "Open to UX, product design and research roles in healthcare and consumer products",
  "notFound.eyebrow": "404 · Page not found",
  "notFound.title": "This page wandered off.",
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
  "nav.resumeAria": "View résumé (PDF, opens in new tab)",
  "nav.backToTop": "Back to top",
  "nav.themeToDark": "Switch to dark mode",
  "nav.themeToLight": "Switch to light mode",
  // The language toggle is labelled in the language you'd switch TO,
  // so the "en" entry is deliberately Spanish (and vice versa).
  "nav.langSwitch": "Cambiar a español",
  "nav.settings": "Settings",
  "nav.settingsAria": "Settings: theme and language",

  // ── Home: hero ──
  "home.status": "Open to work",
  // Hero is about Hillary, not a project (portfolio feedback, 2026-11-12):
  // what she is and where she works, with no case-study detail.
  "home.riso.heroTitle": "UX designer and researcher for\u00a0healthcare and internal\u00a0tools.",
  "home.riso.heroLead":
    "I spent six years in operations at a cancer center and 13+ years in the Army. I also design consumer apps, and I’m bilingual in English and Spanish.",
  "home.riso.primaryWork": "Review the MSK case study",
  "home.riso.workTitle": "Selected work.",
  "home.riso.workLinkSuffix": "case study",
  "home.riso.groveDesc":
    "The first version had too many features for new plant owners, so I watched five people use it and surveyed 37. Twelve features became three.",
  "home.riso.mskDesc":
    "Staff printed patients’ online messages just to scan them into the medical record. I mapped that detour across four departments and pitched a digital fix to hospital leaders and the tech team, who built it after I changed roles. Six steps became five.",
  "home.riso.logisticsDesc":
    "I planned and tracked a warehouse move that cut the wait for medical supplies from 1–2 months to 1–2 weeks. Then I set up shared order tracking.",
  "home.riso.uxwomanDesc":
    "I interviewed six clinic and insurance staff, and they pointed me to one public New York Medicaid (public health insurance) letter. I built a guide that starts from that letter in your hand. Nobody has tested it yet, and I didn’t interview any patients.",
  "home.riso.knowunityDesc":
    "Students explain a term out loud, and the app quotes their own words back to show they know it. I was selected for the sprint and worked alone from Knowunity’s brief and design kit. The voice check is faked in the prototype and never shipped.",
  "home.riso.groveAlt": "FloraGrove daily care screen showing one clear plant-care task and overdue plants first",
  "home.riso.mskAlt": "Recreated Memorial Sloan Kettering filing queue, showing patient-portal messages moving from ready-to-send through filed",
  "home.riso.logisticsAlt": "Service mechanism diagram contrasting a rear supply point with the warehouse moved forward, beside resupply time falling from months to weeks",
  "home.riso.uxwomanAlt": "Evidence ledger: 6 healthcare interviews, 1 adjacent HR interview, 0 patient interviews, 5 pretotypes designed, 0 run",
  "home.riso.knowunityAlt": "Two Say It Back mobile prototype states: a voice-recall question, then the pass screen quoting the student’s own words back",
  "home.riso.groveTag": "Active · Phase 2 of 3",
  "home.riso.proofKicker": "The proof",
  "home.riso.proofTitle": "The numbers, with their sources.",
  "home.fold.open": "Open",
  "home.fold.close": "Close",
  "home.index.more": "More work",
  "home.riso.supportingKicker": "Also documented · Mobbin, three finance apps",
  "home.riso.supportingLink": "Review the Mobbin case study →",
  "home.riso.contactKicker": "Contact",
  "home.dispatch.eyebrow": "Hackathon project",
  "home.dispatch.trainAttribution": "Built with public MTA data · Hackathon prototype",
  "home.dispatch.title": "The Trip Home",
  "home.dispatch.question": "Can a rider know, rather than guess, whether the trip home is accessible?",
  "home.dispatch.body":
    "A hackathon project at the New York Public Library, built with Jacqueline Gordon. Using public data from the MTA and New York City, we built a working prototype that shows whether a subway trip is accessible, by platform and direction, plus nearby curb ramps.",
  "home.dispatch.findingLabel": "What we found",
  "home.dispatch.finding":
    "Eight platforms are accessible in one direction only. Because a trip is only as accessible as its stops, the return trip is at risk on 22,937 of the system’s 77,236 scheduled trips.",
  "home.dispatch.role":
    "Jacqueline led the accessibility features. I led the product plan and the data logic, and built the prototype with AI help.",
  "home.dispatch.ruleLabel": "How it behaves",
  "home.dispatch.rule": "Warn, never block.",
  "home.dispatch.ruleBody":
    "A stop can be accessible always, only sometimes, or unknown. The planner explains the risk and still shows the route.",
  "home.dispatch.primary": "Try the prototype",
  "home.dispatch.devpost": "See the hackathon entry on Devpost",
  "home.dispatch.linkedin": "Read the LinkedIn post",
  "home.dispatch.photoCaption": "NYPL · Built for NYC AI Hackathon",
  "home.dispatch.photoLink": "Try the accessible transit prototype",
  "home.dispatch.statLabel": "trips at risk on the way back",
  "home.dispatch.prototypeLabel": "Hackathon prototype · Not a live service",
  "home.dispatch.openJournal": "Read the project",
  "home.dispatch.closeJournal": "Close the project",

  // ── Home: mini about ──
  "home.about.eyebrow": "About",
  "home.about.blurb":
    "In 2020 I reported the New Jersey National Guard’s COVID-19 medical operations to the Pentagon.",
  "home.about.link": "More about me →",

  // ── Home: proof stats ──
  "home.stat.research": "People surveyed before the redesign",
  "home.stat.scale": "Clinicians and administrative staff across the workflows in scope",
  "home.stat.logistics": "Medical resupply across seven aid stations",
  "home.stat.groveSource": "FloraGrove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.stat.logisticsSource": "Officer Evaluation Report",
  // Hillary's role in each proof number, above the number (2026-10-15, call 5).
  "home.stat.scaleTag": "Scope",
  "home.stat.logisticsTag": "Led",
  "home.stat.researchTag": "Method",
  "home.trustAria": "Credentials",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA · Lean Six Sigma Green Belt",
  "home.trust.bilingual": "Bilingual EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Selected work",
  "home.proj.grove.subtitle": "Pre-launch prototype · Phase 2 of 3",
  "home.proj.msk.subtitle": "Office coordinator, patient portal messages",
  "home.proj.logistics.subtitle": "U.S. Army · Seven aid stations",
  "home.proj.uxwoman.subtitle": "UX Woman accelerator · New York",
  "home.proj.knowunity.subtitle": "Knowunity · Yummy Labs AI Design Sprint",
  "home.proj.grove.title": "Product design and research for FloraGrove, a pre-\u2060launch plant-care\u00a0app",
  "home.proj.msk.title": "Service design project for Memorial Sloan Kettering Cancer\u00a0Center",
  "home.proj.logistics.title": "Service design for U.S.\u00a0Army medical supply, cutting resupply from months to\u00a0weeks",
  "home.proj.uxwoman.title": "Healthcare research based on changing Medicaid requirements",
  "home.proj.mobbin.title": "Freelance documentation of three finance apps for\u00a0Mobbin",
  "home.proj.mobbin.subtitle": "Kikoff, Polymarket, Discover",
  "home.riso.mobbinDesc": "I captured, ordered and labeled each app’s screens so designers can search them by task. I did not design these products.",
  "home.proj.hackathon.title": "A transit planner that shows whether the trip home is accessible",
  "home.proj.hackathon.subtitle": "New York Public Library hackathon · with Jacqueline Gordon",
  "home.riso.hackathonDesc": "Using public data from New York’s subway system, we found eight platforms that are accessible in one direction only. That puts the trip back at risk on 22,937 of 77,236 scheduled trips. Jacqueline led the accessibility features; I led the product plan and data logic.",
  "home.proj.knowunity.title": "2.5-week design sprint with an edtech startup, run by Yummy\u00a0Labs",

  // ── Home: contact / CTA ──
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
  "ask.notCoveredTitle": "That isn’t covered in the portfolio.",
  "ask.notCoveredRelated": "Closest pages",
  "ask.notCoveredEmail": "Ask Hillary directly:",
  "ask.failedTitle": "The question tool didn’t load.",
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
  "footer.eyebrow": "Hillary Esposito · Diseñadora UX e investigadora",
  "footer.statement": "Hecho por alguien que ya llenó el papeleo.",
  "footer.signoff": "¿Sigue aquí?",
  "footer.signoffLink": "Escríbame.",
  "footer.siteAria": "Navegación del pie de página",
  "footer.explore": "Explorar",
  "footer.connect": "Contacto",
  "footer.email": "Correo",
  "footer.githubAria": "Perfil de GitHub (se abre en una pestaña nueva)",
  "footer.availability": "Abierta a roles de UX, diseño de producto e investigación en salud y productos de consumo",
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
  "nav.resumeAria": "Ver CV (PDF, se abre en una pestaña nueva)",
  "nav.backToTop": "Volver arriba",
  "nav.themeToDark": "Cambiar a modo oscuro",
  "nav.themeToLight": "Cambiar a modo claro",
  "nav.langSwitch": "Switch to English",
  "nav.settings": "Ajustes",
  "nav.settingsAria": "Ajustes: tema e idioma",

  // ── Home: hero ──
  "home.status": "Disponible para trabajar",
  "home.riso.heroTitle": "Diseñadora UX e investigadora para herramientas\u00a0de\u00a0salud y de uso\u00a0interno.",
  "home.riso.heroLead":
    "Pasé seis años en operaciones en un centro oncológico y más de 13 en el Ejército. También diseño apps de consumo, y soy bilingüe en inglés y español.",
  // The panel itself stays English-only (lang="en") - the ES link says so,
  // the same way ask.ninetySecondLink does below.
  "home.riso.recruiterTourLink": "Abrir el recorrido de 90 segundos (en inglés)",
  "home.riso.primaryWork": "Ver el estudio de caso de MSK",
  "home.riso.workTitle": "Trabajo seleccionado.",
  "home.riso.workLinkSuffix": "estudio de caso",
  "home.riso.groveDesc":
    "La primera versión tenía demasiadas funciones para quienes empiezan con las plantas, así que vi a cinco personas usarla y encuesté a 37. Doce funciones se volvieron tres.",
  "home.riso.mskDesc":
    "El personal imprimía los mensajes en línea de los pacientes solo para escanearlos a la historia clínica. Mapeé ese desvío en cuatro áreas y propuse una solución digital a la dirección del hospital y al equipo de tecnología, que la construyeron después de que cambié de puesto. Seis pasos se volvieron cinco.",
  "home.riso.logisticsDesc":
    "Planifiqué y seguí el traslado de un almacén que redujo la espera de suministros médicos de 1–2 meses a 1–2 semanas. Luego armé un seguimiento compartido de pedidos.",
  "home.riso.uxwomanDesc":
    "Entrevisté a seis personas de clínicas y aseguradoras, y me señalaron una carta pública de Medicaid de Nueva York (el seguro médico público). Construí una guía que empieza por esa carta que tiene en la mano. Nadie la ha probado todavía, y no entrevisté a ningún paciente.",
  "home.riso.knowunityDesc":
    "Los estudiantes explican un término en voz alta, y la app les cita sus propias palabras para mostrar que lo saben. Me seleccionaron para el sprint y trabajé sola con el encargo y el kit de diseño de Knowunity. La revisión por voz está simulada en el prototipo y nunca se lanzó.",
  "home.riso.groveAlt": "Pantalla de cuidado diario de FloraGrove con una tarea clara y las plantas atrasadas primero",
  "home.riso.mskAlt": "Cola de archivo recreada de Memorial Sloan Kettering, mostrando mensajes del portal de pacientes desde listos para enviar hasta archivados",
  "home.riso.logisticsAlt": "Diagrama de mecanismo de servicio que contrasta un punto de suministro en la retaguardia con el almacén movido al frente, junto al tiempo de reabastecimiento bajando de meses a semanas",
  "home.riso.uxwomanAlt": "Registro de evidencia: 6 entrevistas de salud, 1 entrevista adyacente de RR. HH., 0 entrevistas con pacientes, 5 pretotipos diseñados, 0 ejecutados",
  "home.riso.knowunityAlt": "Dos estados del prototipo móvil Say It Back: una pregunta de recuerdo por voz y luego la pantalla de acierto que cita las propias palabras del estudiante",
  "home.riso.groveTag": "Activo · Fase 2 de 3",
  "home.riso.proofKicker": "La evidencia",
  "home.riso.proofTitle": "Los números, con sus fuentes.",
  "home.fold.open": "Abrir",
  "home.fold.close": "Cerrar",
  "home.index.more": "Más trabajo",
  "home.riso.supportingKicker": "También documentado · Mobbin, tres apps financieras",
  "home.riso.supportingLink": "Ver el estudio de caso de Mobbin →",
  "home.riso.contactKicker": "Contacto",
  "home.dispatch.eyebrow": "Proyecto de hackathon",
  "home.dispatch.trainAttribution": "Creado con datos públicos de MTA · Prototipo de hackathon",
  "home.dispatch.title": "El viaje de regreso",
  "home.dispatch.question": "¿Puede una persona saber, en lugar de adivinar, si el viaje de regreso es accesible?",
  "home.dispatch.body":
    "Un proyecto de hackathon en la Biblioteca Pública de Nueva York, creado con Jacqueline Gordon. Con datos públicos de MTA y de la ciudad de Nueva York, hicimos un prototipo funcional que muestra si un viaje en metro es accesible, por plataforma y dirección, además de las rampas cercanas.",
  "home.dispatch.findingLabel": "Lo que encontramos",
  "home.dispatch.finding":
    "Ocho andenes son accesibles en una sola dirección. Como un viaje solo es tan accesible como sus paradas, el viaje de regreso está en riesgo en 22,937 de los 77,236 viajes programados del sistema.",
  "home.dispatch.role":
    "Jacqueline dirigió las funciones de accesibilidad. Yo dirigí el plan de producto y la lógica de datos, y construí el prototipo con ayuda de IA.",
  "home.dispatch.ruleLabel": "Cómo se comporta",
  "home.dispatch.rule": "Advertir, nunca bloquear.",
  "home.dispatch.ruleBody":
    "Una parada puede ser accesible siempre, solo a veces o desconocida. El planificador explica el riesgo y aun así muestra la ruta.",
  "home.dispatch.primary": "Probar el prototipo",
  "home.dispatch.devpost": "Ver la entrada del hackathon en Devpost",
  "home.dispatch.linkedin": "Leer la publicación en LinkedIn",
  "home.dispatch.photoCaption": "NYPL · Hackathon Built for NYC AI",
  "home.dispatch.photoLink": "Probar el prototipo de transporte accesible",
  "home.dispatch.statLabel": "viajes en riesgo al regresar",
  "home.dispatch.prototypeLabel": "Prototipo de hackathon · No es un servicio en vivo",
  "home.dispatch.openJournal": "Leer el proyecto",
  "home.dispatch.closeJournal": "Cerrar el proyecto",

  // ── Home: mini about ──
  "home.about.eyebrow": "Sobre mí",
  "home.about.blurb":
    "En 2020 reporté al Pentágono las operaciones médicas de la Guardia Nacional de Nueva Jersey durante la COVID-19.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: proof stats ──
  "home.stat.research": "Personas encuestadas antes del rediseño",
  "home.stat.scale": "Personal clínico y administrativo en los flujos incluidos",
  "home.stat.logistics": "Reabastecimiento médico en siete estaciones de ayuda",
  "home.stat.groveSource": "Investigación de descubrimiento de FloraGrove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.stat.logisticsSource": "Informe de Evaluación de Oficial",
  "home.stat.scaleTag": "Alcance",
  "home.stat.logisticsTag": "Dirigí",
  "home.stat.researchTag": "Método",
  "home.trustAria": "Credenciales",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA · Green Belt de Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",

  // ── Home: projects ──
  "home.eyebrow": "Trabajo seleccionado",
  "home.proj.grove.subtitle": "Prototipo previo al lanzamiento · Fase 2 de 3",
  "home.proj.msk.subtitle": "Coordinadora de oficina, mensajes del portal de pacientes",
  "home.proj.logistics.subtitle": "Ejército de EE. UU. · Siete estaciones de ayuda",
  "home.proj.uxwoman.subtitle": "Aceleradora UX Woman · Nueva York",
  "home.proj.knowunity.subtitle": "Knowunity · Yummy Labs AI Design Sprint",
  // Titles are project labels (2026-11-19). A no-break space before the last
  // word keeps it from sitting alone on the final line.
  "home.proj.grove.title": "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento",
  "home.proj.msk.title": "Proyecto de diseño de servicios para Memorial Sloan\u00a0Kettering Cancer\u00a0Center",
  // Same wording as the Spanish case-study title.
  "home.proj.logistics.title": "Diseño de servicios para el suministro médico del Ejército de EE.\u00a0UU., con reabastecimiento de 1–2 meses a 1–2\u00a0semanas",
  "home.proj.uxwoman.title": "Investigación en salud basada en los requisitos cambiantes de\u00a0Medicaid",
  "home.proj.mobbin.title": "Documentación freelance de tres apps financieras para\u00a0Mobbin",
  "home.proj.mobbin.subtitle": "Kikoff, Polymarket, Discover",
  "home.riso.mobbinDesc": "Capturé, ordené y etiqueté las pantallas de cada app para que otros diseñadores las encuentren por tarea. No diseñé estos productos.",
  "home.proj.hackathon.title": "Un planificador de transporte que muestra si el viaje de regreso es accesible",
  "home.proj.hackathon.subtitle": "Hackathon de la Biblioteca Pública de Nueva York · con Jacqueline Gordon",
  "home.riso.hackathonDesc": "Con datos públicos del metro de Nueva York, encontramos ocho andenes que son accesibles en una sola dirección. Eso pone en riesgo el viaje de regreso en 22,937 de 77,236 viajes programados. Jacqueline dirigió las funciones de accesibilidad; yo dirigí el plan de producto y la lógica de datos.",
  "home.proj.knowunity.title": "Sprint de diseño de 2.5 semanas con una startup de tecnología educativa, dirigido por Yummy\u00a0Labs",

  // ── Home: contact / CTA ──
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
