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
  "nav.tagline": "UX × Process Improvement",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "nav.home": "HOME",
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
    "UX/Product Designer turning complex healthcare and enterprise workflows into trusted digital products.",
  "home.description":
    "13+ years of leadership across process improvement, clinical systems, military operations, and UX research. Army veteran.",
  "home.getInTouch": "Get in touch",
  "home.seeApproach": "See my approach →",
  "home.replay": "Replay",
  "home.replayAria": "Replay the animation",

  // ── Home: mini about ──
  "home.about.aria": "About Hillary Esposito",
  "home.about.photoAlt": "Portrait of Hillary Esposito",
  "home.about.eyebrow": "A little about me",
  "home.about.blurb":
    "I've spent 13 years where systems meet the people who use them: directing medical logistics in the Army, redesigning clinical operations at Memorial Sloan Kettering, and now bringing that judgment to responsible AI. Systems don't fail in flowcharts. They fail at the point where a real person has to use them, and that's where I work.",
  "home.about.link": "More about me →",

  // ── Home: credentials strip ──
  "home.credentialsAria": "Professional credentials",
  "home.credentials": "Lean Six Sigma Green Belt · MHA, Rutgers · Bilingual EN/ES",

  // ── Home: proof stats ──
  "home.proofAria": "Experience highlights",
  "home.stat.years": "Years of leadership across healthcare, military, and UX",
  "home.stat.clinicians": "Clinicians impacted, MSK Cancer Center",
  "home.stat.resupply": "Faster resupply, NJ Army National Guard",
  "home.stat.emr": "EMR cost reduction, MSK Cancer Center",

  // ── Home: projects ──
  "home.projectsAria": "Projects section",
  "home.eyebrow": "Selected work",
  "home.projectsTitle": "Projects",
  "home.proj.grove.subtitle": "Product Design · AI Judgment",
  "home.proj.grove.desc":
    "Research to working prototype in 3 weeks, solo. 32-user survey reshaped the MVP. AI accelerated the build. Testing next.",
  "home.proj.grove.alt": "Grove plant care app",
  "home.proj.msk.subtitle": "UX & Product Design · Healthcare Systems",
  "home.proj.msk.desc":
    "Six years, three roles. Redesigned clinical workflows, onboarding, and EMR systems for 21,000+ clinicians at one of the world's top cancer centers.",
  "home.proj.msk.alt": "Memorial Sloan Kettering Cancer Center",
  "home.proj.gh.subtitle": "Product Design · UX Research",
  "home.proj.gh.desc":
    "Heatmap testing with 22 users found a trust problem: people located the seasonal info but didn't believe it applied to them.",
  "home.proj.gh.alt": "Good Harvest wireframe, final design, and heatmap testing",
  "home.proj.mobbin.subtitle": "Freelance · UX Flow Documentation · Pattern Curation",
  "home.proj.mobbin.desc":
    "Documented end-to-end mobile experiences across three fintech apps for Mobbin's design reference library. 200+ screens captured, annotated, and tagged.",
  "home.proj.mobbin.alt": "Fintech app screens catalogued for UX pattern library",
  "home.proj.ndaTitle": "NDA Project",
  "home.proj.ndaDesc":
    "Three fintech apps documented at production quality. Password required to view.",
  "home.proj.view": "View case study →",
  "home.proj.unlock": "Unlock case study →",
  "home.proj.comingSoon": "Coming soon",
  "home.proj.passwordBadge": "Password protected",
  "home.proj.patentBadge": "Patent Pending",
  "home.proj.viewAria": "View {title} case study",
  "home.proj.soonAria": "{title}, coming soon",

  // ── Home: contact / CTA ──
  "home.contactAria": "Contact section",
  "home.ctaTitle": "Let’s talk about your product",
  "home.ctaBody":
    "I turn complex workflows into tools people trust. If your team needs a UX/product designer with deep healthcare, enterprise, or operations experience, let’s talk.",
  "home.ctaEmail": "Send me a note",
  "home.ctaEmailAria": "Send me a note",
  "home.ctaCall": "Book a call →",
  "home.ctaCallAria": "Book a call (opens in new tab)",
  "home.linkedinAria": "LinkedIn profile (opens in new tab)",
  "home.resumeLink": "Resume",
  "home.aboutLink": "About me",

  // ── Recruiter pill (global trigger only — the panel stays English in Phase 1) ──
  "recruiter.pill": "Recruiter view",
  "recruiter.pillAria": "Open recruiter view: 90-second project breakdown",
} as const;

export type StringKey = keyof typeof en;

// Spanish — Phase 1 (home + nav). /* TODO: native-speaker (owner) review */
const es: Partial<Record<StringKey, string>> = {
  // ── App shell ──
  "app.skip": "Saltar al contenido principal",

  // ── Navbar ──
  "nav.ariaPrimary": "Navegación principal",
  "nav.logoAria": "Ir al inicio",
  "nav.tagline": "UX × Mejora de procesos",
  "nav.menuOpen": "Abrir menú",
  "nav.menuClose": "Cerrar menú",
  "nav.home": "INICIO",
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
    "Diseñadora UX y de Producto que convierte flujos de trabajo complejos del sector salud y de entornos empresariales en productos digitales confiables.",
  "home.description":
    "Más de 13 años de liderazgo en mejora de procesos, sistemas clínicos, operaciones militares e investigación UX. Veterana del Ejército de EE. UU.",
  "home.getInTouch": "Contácteme",
  "home.seeApproach": "Conozca mi enfoque →",
  "home.replay": "Repetir",
  "home.replayAria": "Repetir la animación",

  // ── Home: mini about ──
  "home.about.aria": "Sobre Hillary Esposito",
  "home.about.photoAlt": "Retrato de Hillary Esposito",
  "home.about.eyebrow": "Un poco sobre mí",
  "home.about.blurb":
    "Llevo 13 años trabajando donde los sistemas se encuentran con las personas que los usan: dirigí logística médica en el Ejército, rediseñé operaciones clínicas en Memorial Sloan Kettering y hoy aplico ese mismo criterio a la adopción responsable de la IA. Los sistemas no fallan en los diagramas de flujo. Fallan en el punto donde una persona real tiene que usarlos, y ahí es donde trabajo.",
  "home.about.link": "Conozca más sobre mí →",

  // ── Home: credentials strip ──
  "home.credentialsAria": "Credenciales profesionales",
  "home.credentials": "Lean Six Sigma Green Belt · MHA, Rutgers · Bilingüe EN/ES",

  // ── Home: proof stats ──
  "home.proofAria": "Experiencia destacada",
  "home.stat.years": "Años de liderazgo en salud, ámbito militar y UX",
  "home.stat.clinicians": "Profesionales clínicos beneficiados, MSK Cancer Center",
  "home.stat.resupply": "Reabastecimiento más rápido, Guardia Nacional del Ejército de NJ",
  "home.stat.emr": "Reducción de costos del EMR, MSK Cancer Center",

  // ── Home: projects ──
  "home.projectsAria": "Sección de proyectos",
  "home.eyebrow": "Trabajo seleccionado",
  "home.projectsTitle": "Proyectos",
  "home.proj.grove.subtitle": "Diseño de producto · Criterio con IA",
  "home.proj.grove.desc":
    "De la investigación a un prototipo funcional en 3 semanas, en solitario. Una encuesta a 32 usuarios redefinió el MVP. La IA aceleró la construcción. Próximo paso: pruebas con usuarios.",
  "home.proj.grove.alt": "Aplicación Grove para el cuidado de plantas",
  "home.proj.msk.subtitle": "Diseño UX y de producto · Sistemas de salud",
  "home.proj.msk.desc":
    "Seis años, tres roles. Rediseñé flujos de trabajo clínicos, onboarding y sistemas de EMR para más de 21,000 profesionales clínicos en uno de los principales centros oncológicos del mundo.",
  "home.proj.gh.subtitle": "Diseño de producto · Investigación UX",
  "home.proj.gh.desc":
    "Pruebas de mapas de calor con 22 usuarios revelaron un problema de confianza: las personas encontraban la información de temporada, pero no creían que aplicara a su caso.",
  "home.proj.gh.alt": "Wireframe, diseño final y pruebas de mapa de calor de Good Harvest",
  "home.proj.mobbin.subtitle": "Freelance · Documentación de flujos UX · Curaduría de patrones",
  "home.proj.mobbin.desc":
    "Documenté experiencias móviles de principio a fin en tres apps fintech para la biblioteca de referencia de diseño de Mobbin. Más de 200 pantallas capturadas, anotadas y etiquetadas.",
  "home.proj.mobbin.alt": "Pantallas de apps fintech catalogadas para una biblioteca de patrones UX",
  "home.proj.ndaTitle": "Proyecto bajo NDA",
  "home.proj.ndaDesc":
    "Tres apps fintech documentadas con calidad de producción. Se requiere contraseña para ver el contenido.",
  "home.proj.view": "Ver caso de estudio →",
  "home.proj.unlock": "Desbloquear caso de estudio →",
  "home.proj.comingSoon": "Próximamente",
  "home.proj.passwordBadge": "Protegido con contraseña",
  "home.proj.patentBadge": "Patente en trámite",
  "home.proj.viewAria": "Ver el caso de estudio de {title}",
  "home.proj.soonAria": "{title}, próximamente",

  // ── Home: contact / CTA ──
  "home.contactAria": "Sección de contacto",
  "home.ctaTitle": "Hablemos de su producto",
  "home.ctaBody":
    "Convierto flujos de trabajo complejos en herramientas que inspiran confianza. Si su equipo necesita una diseñadora UX y de producto con amplia experiencia en salud, entornos empresariales u operaciones, hablemos.",
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
