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
  "notFound.eyebrow": "Wrong turn · useful recovery",
  "notFound.title": "This page wandered off.",
  "notFound.body": "The link may be outdated, but the work is still here. Return to the portfolio or browse the selected work.",
  "notFound.home": "Return home",
  "notFound.work": "Browse selected work →",

  // ── Navbar ──
  "nav.ariaPrimary": "Primary navigation",
  "nav.logoAria": "Go to home",
  "nav.tagline": "Product Design",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "nav.home": "HOME",
  "nav.work": "WORK",
  "nav.projects": "PROJECTS",
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
  "home.heroAria": "Home section",
  "home.status": "Available for opportunities",
  "home.positioning":
    "Product designer for products people have to trust.",
  "home.description":
    "Research rigor, AI judgment, and consumer craft — shaped by six years building software for 21,000 clinicians and staff.",
  "home.getInTouch": "Get in touch",
  "home.seeApproach": "See my approach →",
  "home.replay": "Replay intro",
  "home.replayAria": "Replay the animation",
  "home.riso.eyebrow": "Hillary Esposito · product design",
  "home.riso.heroTitle": "Products people have to trust.",
  "home.riso.heroLead":
    "Research rigor, AI judgment, and consumer craft — shaped by six years building software for",
  "home.riso.heroProof": "21,000 clinicians and staff",
  "home.riso.heroClose": "who couldn't afford a wrong guess.",
  "home.riso.railYears": "13+ years",
  "home.riso.railFocus": "Healthcare · consumer",
  "home.riso.railVeteran": "Army veteran",
  "home.riso.railAvailable": "Available",
  "home.riso.workTitle": "Three products, one belief: get it right where it counts",
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
  "home.riso.proofTitle": "Judgment, backed by real numbers",
  "home.riso.aboutTitle": "I design for the person under pressure",
  "home.riso.contactKicker": "Get in touch",
  "home.riso.contactBody":
    "The difference isn't using AI — it's knowing when to trust it and when to say no. If your team needs a product designer who pairs consumer taste with research rigor, let's talk.",

  // ── Home: mini about ──
  "home.about.aria": "About Hillary Esposito",
  "home.about.photoAlt": "Portrait of Hillary Esposito",
  "home.about.eyebrow": "A little about me",
  "home.about.blurb":
    "13+ years inside high-stakes systems: military medical logistics, cancer-care operations, internal tools, and AI-assisted product work. The through-line across all of it: I design for the person using the system under pressure, the clinician between patients, not the org chart above them. Whether it’s 21,000 clinicians and staff or one new plant owner, the job is the same: make the software trustworthy where a wrong answer costs something.",
  "home.about.link": "More about me →",

  // ── Home: credentials strip ──
  "home.credentialsAria": "Professional credentials",
  "home.credentials": "Healthcare systems UX · Internal tools · Role-based workflows · AI-assisted product design · Army veteran",

  // ── Home: product proof ──
  "home.productProofAria": "Product UI proof",
  "home.productProofEyebrow": "Product proof",
  "home.productProofTitle": "Workflow thinking, visible in the interface.",
  "home.productProofBody":
    "Recreated artifacts from the work: an internal EMR filing queue and a Grove care flow. The point is not decoration. It is showing how status, action, and trust become UI.",

  // ── Home: proof stats ──
  "home.proofAria": "Experience highlights",
  "home.stat.patterns": "App screens studied for craft & patterns",
  "home.stat.research": "People surveyed before I designed anything",
  "home.stat.scale": "People relying on systems I redesigned",
  "home.stat.mobbinSource": "Mobbin pattern study",
  "home.stat.groveSource": "Grove discovery research",
  "home.stat.mskSource": "MSK clinical operations",
  "home.riso.aboutPlate": "Current practice · research, systems, and product craft",
  "home.trustAria": "Trust and credibility signals",
  "home.trust.msk": "MSK Cancer Center",
  "home.trust.mobbin": "Mobbin client work",
  "home.trust.grove": "Responsible-AI focus",
  "home.trust.army": "Army Veteran",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingual EN/ES",
  "home.clientsAria": "Companies I have been contracted to support",
  "home.clientsLabel": "Companies I have been contracted to support",
  "home.clients.mobbinAria": "Mobbin, freelance UX documentation (view case study)",

  // ── Home: tailored relevance ──
  "home.tailorAria": "Role-specific portfolio paths",
  "home.tailorEyebrow": "Start here by role",
  "home.tailorTitle": "Find the proof your team needs",
  "home.tailorBody":
    "Shortcuts to the work that matters for your role — consumer and social product, healthcare, internal tools, AI-assisted product, and visual craft.",
  "home.tailor.consumer.title": "Consumer & social product",
  "home.tailor.consumer.desc": "Interaction craft, taste, and research for products people actually enjoy using.",
  "home.tailor.healthcare.title": "Healthcare product teams",
  "home.tailor.healthcare.desc": "MSK, clinical workflows, internal tools, and healthcare product judgment.",
  "home.tailor.enterprise.title": "Enterprise and internal tools",
  "home.tailor.enterprise.desc": "Role-based workflows, permissions, handoffs, dense systems, and admin-style UX.",
  "home.tailor.ai.title": "AI-assisted product work",
  "home.tailor.ai.desc": "Grove, AI workflow decisions, override judgment, and trust calibration.",
  "home.tailor.visual.title": "Visual craft and UI systems",
  "home.tailor.visual.desc": "Grove and the broader body of work: interface hierarchy, polish, documentation quality, and production care.",
  "home.tailor.view": "Review this path →",

  // ── Home: role fit ──
  "home.fitAria": "Role fit highlights",
  "home.fitEyebrow": "Where I’m strongest",
  "home.fitTitle": "The work I’m built for",
  "home.fit.internal.title": "Internal tools",
  "home.fit.internal.desc": "Clinical dashboards, EMR workflows, onboarding systems, and certification tools where work has to move cleanly across teams.",
  "home.fit.roles.title": "Multiple user types",
  "home.fit.roles.desc": "Clinicians, managers, admins, IT, compliance, patients, and designers each need different views, permissions, and levels of detail.",
  "home.fit.logic.title": "Workflow logic",
  "home.fit.logic.desc": "Status models, handoffs, exceptions, audit needs, and next-best actions for healthcare and internal tools people depend on under pressure.",
  "home.fit.ai.title": "AI-assisted design",
  "home.fit.ai.desc": "I use AI to accelerate research synthesis, prototyping, and build work, then document where human judgment overrides the output.",

  // ── Home: projects ──
  "home.projectsAria": "Projects section",
  "home.projectIndexAria": "Selected work quick index",
  "home.eyebrow": "Selected work",
  "home.projectsTitle": "Projects",
  "home.proj.grove.subtitle": "Product Design · AI Judgment",
  "home.proj.grove.desc":
    "32-user survey to a working prototype. MVP reset, AI override log, and moderated testing plan.",
  "home.proj.grove.alt": "Grove plant care app",
  "home.proj.msk.subtitle": "UX & Product Design · Healthcare Systems",
  "home.proj.msk.desc":
    "21K+ clinicians and staff, 20% EMR cost reduction, and 70% certification workflow gain across six years at MSK.",
  "home.proj.msk.alt": "Memorial Sloan Kettering Cancer Center",
  "home.proj.mobbin.subtitle": "Freelance · 200+ consumer app screens, studied for craft",
  "home.proj.mobbin.desc":
    "Documented 200+ screens across three finance apps for Mobbin — pattern fluency and taste for how the best consumer apps behave.",
  "home.proj.mobbin.alt": "Fintech app screens catalogued for UX pattern library",
  "home.proj.ndaTitle": "Protected Case Study",
  "home.proj.ndaDesc":
    "Three fintech apps documented at production quality. Password required to view.",
  "home.proj.view": "View case study →",
  "home.proj.unlock": "Unlock case study →",
  "home.proj.comingSoon": "Coming soon",
  "home.proj.passwordBadge": "Password protected",
  "home.proj.patentBadge": "Patent pending",
  "home.proj.viewAria": "View {title} case study",
  "home.proj.lockedViewAria": "Unlock the protected case study",
  "home.proj.soonAria": "{title}, coming soon",

  // ── Home: contact / CTA ──
  "home.contactAria": "Contact section",
  "home.ctaTitle": "Building a product people have to trust?",
  "home.ctaBody":
    "If your team needs a product designer who pairs consumer taste with research rigor — and gets the details people actually notice right — let’s talk.",
  "home.ctaEmail": "Send me a note",
  "home.ctaEmailAria": "Send me a note",
  "home.ctaCall": "Book a call →",
  "home.ctaCallAria": "Book a call (opens in new tab)",
  "home.linkedinAria": "LinkedIn profile (opens in new tab)",
  "home.resumeLink": "Résumé",
  "home.aboutLink": "About me",

  // ── Recruiter pill (global trigger only - the panel stays English in Phase 1) ──
  "recruiter.pill": "Recruiter view",
  "recruiter.pillAria": "Open recruiter view: 90-second tour",
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
  "notFound.eyebrow": "Ruta equivocada · recuperación útil",
  "notFound.title": "Esta página se desvió.",
  "notFound.body": "Puede que el enlace esté desactualizado, pero el trabajo sigue aquí. Vuelva al portafolio o explore el trabajo seleccionado.",
  "notFound.home": "Volver al inicio",
  "notFound.work": "Ver trabajo seleccionado →",

  // ── Navbar ──
  "nav.ariaPrimary": "Navegación principal",
  "nav.logoAria": "Ir al inicio",
  "nav.tagline": "Diseño de Producto",
  "nav.menuOpen": "Abrir menú",
  "nav.menuClose": "Cerrar menú",
  "nav.home": "INICIO",
  "nav.work": "TRABAJO",
  "nav.projects": "PROYECTOS",
  "nav.about": "SOBRE MÍ",
  "nav.contact": "CONTACTO",
  "nav.resume": "CV",
  "nav.resumeAria": "Ver CV (se abre en una pestaña nueva)",
  "nav.themeToDark": "Cambiar a modo oscuro",
  "nav.themeToLight": "Cambiar a modo claro",
  "nav.langSwitch": "Switch to English",
  "nav.langCode": "EN",

  // ── Home: hero ──
  "home.heroAria": "Sección de inicio",
  "home.status": "Disponible para nuevas oportunidades",
  "home.positioning":
    "Diseñadora de productos en los que la gente tiene que confiar.",
  "home.description":
    "Rigor de investigación, criterio con IA y oficio de producto de consumo, forjados durante seis años creando software para 21,000 clínicos y personal.",
  "home.getInTouch": "Contácteme",
  "home.seeApproach": "Conozca mi enfoque →",
  "home.replay": "Repetir intro",
  "home.replayAria": "Repetir la animación",
  "home.riso.eyebrow": "Hillary Esposito · diseño de producto",
  "home.riso.heroTitle": "Productos en los que la gente tiene que confiar.",
  "home.riso.heroLead":
    "Rigor de investigación, criterio con IA y oficio de producto de consumo, forjados durante seis años creando software para",
  "home.riso.heroProof": "21,000 clínicos y personal",
  "home.riso.heroClose": "que no podían permitirse un error.",
  "home.riso.railYears": "Más de 13 años",
  "home.riso.railFocus": "Salud · consumo",
  "home.riso.railVeteran": "Veterana del Ejército",
  "home.riso.railAvailable": "Disponible",
  "home.riso.workTitle": "Tres productos, una convicción: acertar donde importa",
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
  "home.riso.proofTitle": "Criterio respaldado por números reales",
  "home.riso.aboutTitle": "Diseño para la persona que trabaja bajo presión",
  "home.riso.contactKicker": "Contacto",
  "home.riso.contactBody":
    "La diferencia no está en usar IA, sino en saber cuándo confiar en ella y cuándo decir que no. Si su equipo necesita una diseñadora de producto que combine criterio de consumo con rigor de investigación, hablemos.",

  // ── Home: mini about ──
  "home.about.aria": "Sobre Hillary Esposito",
  "home.about.photoAlt": "Retrato de Hillary Esposito",
  "home.about.eyebrow": "Un poco sobre mí",
  "home.about.blurb":
    "Más de 13 años dentro de sistemas de alto riesgo: logística médica militar, operaciones oncológicas, herramientas internas y trabajo de producto asistido por IA. El hilo común: diseño para la persona que usa el sistema bajo presión, el clínico entre pacientes, no el organigrama por encima. Ya sean 21,000 clínicos y personal o un nuevo dueño de plantas, el trabajo es el mismo: hacer que el software sea confiable donde una respuesta equivocada cuesta algo.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: credentials strip ──
  "home.credentialsAria": "Credenciales profesionales",
  "home.credentials": "UX para sistemas de salud · Herramientas internas · Flujos por rol · Diseño de producto asistido por IA · Veterana del Ejército",

  // ── Home: product proof ──
  "home.productProofAria": "Prueba de interfaz de producto",
  "home.productProofEyebrow": "Prueba de producto",
  "home.productProofTitle": "Pensamiento de flujo, visible en la interfaz.",
  "home.productProofBody":
    "Artefactos recreados del trabajo: una cola interna de archivo EMR y un flujo de cuidado en Grove. No es decoración. Muestra cómo estado, acción y confianza se convierten en UI.",

  // ── Home: proof stats ──
  "home.proofAria": "Experiencia destacada",
  "home.stat.patterns": "Pantallas de apps estudiadas por su oficio y patrones",
  "home.stat.research": "Personas encuestadas antes de diseñar nada",
  "home.stat.scale": "Personas que dependen de sistemas que rediseñé",
  "home.stat.mobbinSource": "Estudio de patrones de Mobbin",
  "home.stat.groveSource": "Investigación de descubrimiento de Grove",
  "home.stat.mskSource": "Operaciones clínicas de MSK",
  "home.riso.aboutPlate": "Práctica actual · investigación, sistemas y diseño de producto",
  "home.trustAria": "Señales de confianza y credibilidad",
  "home.trust.msk": "MSK Cancer Center",
  "home.trust.mobbin": "Trabajo para cliente Mobbin",
  "home.trust.grove": "Enfoque en IA responsable",
  "home.trust.army": "Veterana del Ejército",
  "home.trust.credentials": "MHA + Lean Six Sigma",
  "home.trust.bilingual": "Bilingüe EN/ES",
  "home.clientsAria": "Empresas que he apoyado por contrato",
  "home.clientsLabel": "Empresas que he apoyado por contrato",
  "home.clients.mobbinAria": "Mobbin, documentación UX freelance (ver estudio de caso)",

  // ── Home: tailored relevance ──
  "home.tailorAria": "Rutas de portafolio por tipo de rol",
  "home.tailorEyebrow": "Empiece aquí por tipo de rol",
  "home.tailorTitle": "Encuentre la prueba que su equipo necesita",
  "home.tailorBody":
    "Atajos al trabajo que importa para tu rol — producto de consumo y social, salud, herramientas internas, producto asistido por IA y craft visual.",
  "home.tailor.consumer.title": "Producto de consumo y social",
  "home.tailor.consumer.desc": "Oficio de interacción, gusto e investigación para productos que la gente disfruta usar.",
  "home.tailor.healthcare.title": "Equipos de producto en salud",
  "home.tailor.healthcare.desc": "MSK, flujos clínicos, herramientas internas y criterio de producto en salud.",
  "home.tailor.enterprise.title": "Enterprise y herramientas internas",
  "home.tailor.enterprise.desc": "Flujos por rol, permisos, traspasos, sistemas densos y UX para administración.",
  "home.tailor.ai.title": "Trabajo de producto asistido por IA",
  "home.tailor.ai.desc": "Grove, decisiones de flujo con IA, criterio de corrección y calibración de confianza.",
  "home.tailor.visual.title": "Craft visual y sistemas UI",
  "home.tailor.visual.desc": "Grove y el resto del trabajo: jerarquía de interfaz, pulido, calidad de documentación y cuidado de producción.",
  "home.tailor.view": "Revisar esta ruta →",

  // ── Home: role fit ──
  "home.fitAria": "Fortalezas para el puesto",
  "home.fitEyebrow": "Donde soy más fuerte",
  "home.fitTitle": "El trabajo para el que estoy preparada",
  "home.fit.internal.title": "Herramientas internas",
  "home.fit.internal.desc": "Dashboards clínicos, flujos de EMR, onboarding y sistemas de certificación donde el trabajo debe moverse claramente entre equipos.",
  "home.fit.roles.title": "Múltiples tipos de usuario",
  "home.fit.roles.desc": "Profesionales clínicos, gerentes, administradores, IT, cumplimiento, pacientes y diseñadores necesitan vistas, permisos y niveles de detalle distintos.",
  "home.fit.logic.title": "Lógica de flujos",
  "home.fit.logic.desc": "Estados, traspasos, excepciones, auditoría y próximas acciones para herramientas que se usan bajo presión.",
  "home.fit.ai.title": "Diseño asistido por IA",
  "home.fit.ai.desc": "Uso IA para acelerar síntesis, prototipos y desarrollo, y documento dónde el criterio humano debe corregir el resultado.",

  // ── Home: projects ──
  "home.projectsAria": "Sección de proyectos",
  "home.projectIndexAria": "Índice rápido de trabajo seleccionado",
  "home.eyebrow": "Trabajo seleccionado",
  "home.projectsTitle": "Proyectos",
  "home.proj.grove.subtitle": "Diseño de producto · Criterio con IA",
  "home.proj.grove.desc":
    "Encuesta a 32 usuarios a un prototipo funcional. MVP redefinido, registro de decisiones con IA y plan de pruebas moderadas.",
  "home.proj.grove.alt": "Aplicación Grove para el cuidado de plantas",
  "home.proj.msk.alt": "Memorial Sloan Kettering Cancer Center",
  "home.proj.msk.subtitle": "Diseño UX y de producto · Sistemas de salud",
  "home.proj.msk.desc":
    "Más de 21,000 profesionales clínicos y administrativos, 20% de reducción de costos del EMR y 70% de mejora en certificación durante seis años en MSK.",
  "home.proj.mobbin.subtitle": "Freelance · Más de 200 pantallas de apps de consumo, estudiadas por su oficio",
  "home.proj.mobbin.desc":
    "Documenté más de 200 pantallas de tres apps de finanzas para Mobbin — fluidez de patrones y gusto por cómo se comportan las mejores apps de consumo.",
  "home.proj.mobbin.alt": "Pantallas de apps fintech catalogadas para una biblioteca de patrones UX",
  "home.proj.ndaTitle": "Estudio de caso protegido",
  "home.proj.ndaDesc":
    "Tres apps fintech documentadas con calidad de producción. Se requiere contraseña para ver el contenido.",
  "home.proj.view": "Ver estudio de caso →",
  "home.proj.unlock": "Desbloquear estudio de caso →",
  "home.proj.comingSoon": "Próximamente",
  "home.proj.passwordBadge": "Protegido con contraseña",
  "home.proj.patentBadge": "Patente en trámite",
  "home.proj.viewAria": "Ver el estudio de caso de {title}",
  "home.proj.lockedViewAria": "Desbloquear el estudio de caso protegido",
  "home.proj.soonAria": "{title}, próximamente",

  // ── Home: contact / CTA ──
  "home.contactAria": "Sección de contacto",
  "home.ctaTitle": "¿Está creando un producto en el que la gente tiene que confiar?",
  "home.ctaBody":
    "Si su equipo necesita una diseñadora de producto que combine buen gusto de consumo con rigor de investigación — y que acierte en los detalles que la gente sí nota — hablemos.",
  "home.ctaEmail": "Escríbame",
  "home.ctaEmailAria": "Envíeme un correo",
  "home.ctaCall": "Agende una llamada →",
  "home.ctaCallAria": "Agendar una llamada (se abre en una pestaña nueva)",
  "home.linkedinAria": "Perfil de LinkedIn (se abre en una pestaña nueva)",
  "home.resumeLink": "CV",
  "home.aboutLink": "Sobre mí",

  // ── Recruiter pill ──
  "recruiter.pill": "Vista para reclutadores",
  "recruiter.pillAria": "Abrir la vista para reclutadores: resumen de proyectos en 90 segundos",
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
