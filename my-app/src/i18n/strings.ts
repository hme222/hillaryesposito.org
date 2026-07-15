// src/i18n/strings.ts
//
// Lightweight i18n dictionaries — no library, no runtime cost beyond a lookup.
// PHASE 1: home page + global nav only. Everything else (About, case studies)
// intentionally has no `es` entry and falls back to the English default, so an
// untranslated key never renders blank.
//
// NOTE FOR OWNER REVIEW: all Spanish strings below are marked for native-
// speaker proofread. Aim was natural, Latin-American-neutral professional
// Spanish — see the EN → ES table in the handoff notes.

export type Lang = "en" | "es";

// English is the source of truth: every key exists here, and its value is the
// fallback for any language that hasn't translated it yet.
const en = {
  // ── App shell ──
  "app.skip": "Skip to main content",

  // ── Navbar ──
  "nav.ariaPrimary": "Primary navigation",
  "nav.logoAria": "Go to home",
  "nav.tagline": "UX & Product Design",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "nav.home": "HOME",
  "nav.work": "WORK",
  "nav.projects": "PROJECTS",
  "nav.about": "ABOUT",
  "nav.contact": "CONTACT",
  "nav.resume": "RESUME",
  "nav.resumeAria": "Download resume (opens in new tab)",
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
    "UX/Product Designer for AI-enabled workflows, healthcare systems, and complex data-heavy products.",
  "home.description":
    "6 years at Memorial Sloan Kettering\u00a0\u00b7 21,000+ clinicians & staff\u00a0\u00b7 US Army veteran.",
  "home.getInTouch": "Get in touch",
  "home.seeApproach": "See my approach →",
  "home.replay": "Replay",
  "home.replayAria": "Replay the animation",

  // ── Home: mini about ──
  "home.about.aria": "About Hillary Esposito",
  "home.about.photoAlt": "Portrait of Hillary Esposito",
  "home.about.eyebrow": "A little about me",
  "home.about.blurb":
    "I’ve spent 13+ years inside high-stakes systems across military medical logistics, cancer care operations, internal workflows, and AI-assisted product work. I design where the workflow meets the person using it.",
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
  "home.stat.clinicians": "Clinicians impacted, MSK Cancer Center",
  "home.stat.emr": "EMR cost reduction, MSK Cancer Center",
  "home.stat.cert": "Certification workflow gain, MSK Cancer Center",
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
    "Shortcuts to case studies, outcomes, and artifacts for healthcare product, internal tools, AI-assisted product work, and visual craft roles.",
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
  "home.proj.gh.subtitle": "Product Design · UX Research",
  "home.proj.gh.desc":
    "Heatmap testing with 22 users found a trust problem: people located the seasonal info but didn't believe it applied to them.",
  "home.proj.gh.alt": "Good Harvest wireframe, final design, and heatmap testing",
  "home.proj.mobbin.subtitle": "Freelance · UX Flow Documentation · Pattern Curation",
  "home.proj.mobbin.desc":
    "Freelance app capture specialist documenting end-to-end UX flows, interaction patterns, and product journeys for Mobbin.",
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
  "home.ctaTitle": "Let’s talk about the workflow your team needs to make clearer",
  "home.ctaBody":
    "If your team needs a UX/product designer who can turn messy workflows, permissions, data, and edge cases into usable tools, let’s talk.",
  "home.ctaEmail": "Send me a note",
  "home.ctaEmailAria": "Send me a note",
  "home.ctaCall": "Book a call →",
  "home.ctaCallAria": "Book a call (opens in new tab)",
  "home.linkedinAria": "LinkedIn profile (opens in new tab)",
  "home.resumeLink": "Resume",
  "home.aboutLink": "About me",

  // ── Recruiter pill (global trigger only — the panel stays English in Phase 1) ──
  "recruiter.pill": "Recruiter view",
  "recruiter.pillAria": "Open recruiter view: 90-second tour",
} as const;

export type StringKey = keyof typeof en;

// Spanish — Phase 1 (home + nav). /* TODO: native-speaker (owner) review */
const es: Partial<Record<StringKey, string>> = {
  // ── App shell ──
  "app.skip": "Saltar al contenido principal",

  // ── Navbar ──
  "nav.ariaPrimary": "Navegación principal",
  "nav.logoAria": "Ir al inicio",
  "nav.tagline": "Diseño UX y de Producto",
  "nav.menuOpen": "Abrir menú",
  "nav.menuClose": "Cerrar menú",
  "nav.home": "INICIO",
  "nav.work": "TRABAJO",
  "nav.projects": "PROYECTOS",
  "nav.about": "SOBRE MÍ",
  "nav.contact": "CONTACTO",
  "nav.resume": "CV",
  "nav.resumeAria": "Descargar CV (se abre en una pestaña nueva)",
  "nav.themeToDark": "Cambiar a modo oscuro",
  "nav.themeToLight": "Cambiar a modo claro",
  "nav.langSwitch": "Switch to English",
  "nav.langCode": "EN",

  // ── Home: hero ──
  "home.heroAria": "Sección de inicio",
  "home.status": "Disponible para nuevas oportunidades",
  "home.positioning":
    "UX/Product Designer para flujos de trabajo habilitados por IA, sistemas de salud y productos complejos con muchos datos.",
  "home.description":
    "6 años en Memorial Sloan Kettering · más de 21,000 profesionales clínicos y administrativos · veterana del Ejército de EE. UU.",
  "home.getInTouch": "Contácteme",
  "home.seeApproach": "Conozca mi enfoque →",
  "home.replay": "Repetir",
  "home.replayAria": "Repetir la animación",

  // ── Home: mini about ──
  "home.about.aria": "Sobre Hillary Esposito",
  "home.about.photoAlt": "Retrato de Hillary Esposito",
  "home.about.eyebrow": "Un poco sobre mí",
  "home.about.blurb":
    "Llevo más de 13 años dentro de sistemas de alto riesgo en logística médica militar, operaciones oncológicas, flujos internos y trabajo de producto asistido por IA. Diseño donde el flujo se encuentra con la persona que tiene que usarlo.",
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
  "home.stat.clinicians": "Profesionales clínicos beneficiados, MSK Cancer Center",
  "home.stat.emr": "Reducción de costos del EMR, MSK Cancer Center",
  "home.stat.cert": "Mejora del flujo de certificación, MSK Cancer Center",
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
    "Atajos a estudios de caso, resultados y artefactos para producto en salud, herramientas internas, trabajo de producto asistido por IA y roles de craft visual.",
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
  "home.proj.gh.subtitle": "Diseño de producto · Investigación UX",
  "home.proj.gh.desc":
    "Pruebas de mapas de calor con 22 usuarios revelaron un problema de confianza: las personas encontraban la información de temporada, pero no creían que aplicara a su caso.",
  "home.proj.gh.alt": "Wireframe, diseño final y pruebas de mapa de calor de Good Harvest",
  "home.proj.mobbin.subtitle": "Freelance · Documentación de flujos UX · Curaduría de patrones",
  "home.proj.mobbin.desc":
    "Especialista freelance en captura de apps, documentando flujos UX completos, patrones de interacción y recorridos de producto para Mobbin.",
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
  "home.ctaTitle": "Hablemos del flujo que su equipo necesita hacer más claro",
  "home.ctaBody":
    "Si su equipo necesita una diseñadora UX y de producto que convierta flujos, permisos, datos y casos límite en herramientas utilizables, hablemos.",
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
