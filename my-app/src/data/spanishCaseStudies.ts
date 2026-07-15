import type { SpanishCaseStudyData } from "../components/SpanishCaseStudy";

export const GROVE_ES: SpanishCaseStudyData = {
  title: "Grove",
  meta: "Diseño de producto · IA · Investigación UX · Prototipo funcional",
  intro:
    "Grove es una app de cuidado de plantas que estoy rediseñando a partir de un prototipo funcional de Emergent. La investigación con 32 participantes redefinió el MVP: menos funciones sociales, más confianza, educación sobre la iluminación, recordatorios tranquilos y criterio humano sobre la IA.",
  stats: [
    { label: "Rol", value: "Diseño de producto, investigación, prototipo" },
    { label: "Muestra", value: "32 respuestas de encuesta" },
    { label: "Tiempo", value: "Fase 2 de 3" },
    { label: "Estado", value: "Rediseño en curso; pruebas moderadas a continuación" },
  ],
  sections: [
    {
      eyebrow: "Problema",
      title: "Las apps de plantas prometen cuidado, pero muchas generan estrés",
      body: [
        "Los usuarios no rechazaban la guía. Rechazaban consejos genéricos, contradictorios y sin fuentes. También rechazaban recordatorios que se sentían como regaños.",
        "El hallazgo más fuerte fue que la brecha principal para nuevos dueños de plantas no era solo agua. Era luz: dónde colocar la planta, por qué ese lugar importa y cómo reconocer señales antes de que la planta esté en riesgo.",
      ],
    },
    {
      eyebrow: "Investigación",
      title: "La encuesta cambió el MVP",
      body: [
        "La encuesta obligó a separar funciones atractivas de funciones esenciales. Comunidad, swaps y recompensas eran interesantes, pero no eran la razón para descargar la app.",
      ],
      bullets: [
        "Recordatorios inteligentes fueron la función más importante, pero solo si tenían límites claros.",
        "Identificación por cámara y diagnóstico por foto eran esenciales, pero necesitaban confianza, fuentes y niveles de certeza.",
        "La educación sobre la luz y la toxicidad para mascotas se convirtió en parte del núcleo de confianza.",
      ],
    },
    {
      eyebrow: "Producto",
      title: "Diseñé una cola de cuidado, no una lista de tareas",
      body: [
        "La pantalla principal prioriza lo que necesita atención hoy. Oculta funciones secundarias hasta que la tarea de cuidado está clara. La intención era reducir carga cognitiva y evitar que la app se sintiera como administración extra.",
        "También documenté decisiones donde rechacé salidas de IA: tono culpabilizador, recompensas tipo juego, confianza falsa en identificación de plantas y notificaciones demasiado frecuentes.",
      ],
    },
    {
      eyebrow: "Estados y casos límite",
      title: "El producto se define en los estados difíciles",
      body: [
        "Diseñé estados vacíos, baja confianza de IA, regreso después de varios días, advertencias de toxicidad y límites de notificaciones. Esos detalles importan porque determinan si la experiencia se siente útil o estresante.",
      ],
    },
    {
      eyebrow: "Resultado",
      title: "El prototipo demostró pensamiento de producto y criterio con IA",
      body: [
        "El resultado no fue solo una app visual. Fue una definición más honesta del MVP, una hipótesis clara para pruebas moderadas y un registro de decisiones que muestra dónde la IA acelera el trabajo y dónde debe ser corregida por criterio humano.",
      ],
    },
  ],
  otherProjects: [
    { title: "MSK Cancer Center", desc: "Seis años rediseñando flujos clínicos, onboarding y certificación para más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Good Harvest", desc: "Las pruebas con mapas de calor con 22 usuarios revelaron un problema de confianza: la gente encontraba la información estacional, pero no creía que aplicara a su zona.", path: "/case-study/good-harvest" },
  ],
};

export const MSK_ES: SpanishCaseStudyData = {
  title: "Memorial Sloan Kettering",
  meta: "UX y diseño de producto · Sistemas de salud · Herramientas internas",
  intro:
    "Durante seis años en MSK, rediseñé flujos clínicos, onboarding y procesos operativos para sistemas usados por más de 21,000 profesionales clínicos y administrativos. Este trabajo muestra diseño aplicado a herramientas internas, permisos, estados y adopción en un entorno de salud real.",
  stats: [
    { label: "Rol", value: "Sistemas de salud → UX y diseño de producto" },
    { label: "Organización", value: "Memorial Sloan Kettering Cancer Center" },
    { label: "Escala", value: "21,000+ clínicos y personal" },
    { label: "Impacto", value: "20% reducción de costos EMR" },
  ],
  sections: [
    {
      eyebrow: "Contexto",
      title: "Diseñar para sistemas donde el error tiene consecuencias",
      body: [
        "El trabajo no era hacer pantallas bonitas. Era entender dónde fallaba el flujo real, alinear a clínicos, líderes e IT, y cambiar herramientas que las personas usaban bajo presión.",
      ],
    },
    {
      eyebrow: "EMR",
      title: "De imprimir y enviar a una acción directa desde el dashboard",
      body: [
        "El rediseño de EMR consistió en agregar una acción directa en el dashboard que llevaba al EMR en línea. Antes, el equipo imprimía, enviaba a otro sitio y esperaba que se archivara. Después, el flujo redujo pasos y quitó trabajo duplicado.",
        "La decisión de UI fue mostrar estado, responsabilidad y acción en el mismo lugar, pero exponer la acción directa solo cuando el registro estaba listo y la persona tenía permiso.",
      ],
    },
    {
      eyebrow: "Proceso",
      title: "Mapear, probar, alinear y sostener",
      body: [
        "Mapeé el estado actual, encontré puntos de fallo, alineé stakeholders y diseñé cambios que podían sostenerse después del lanzamiento. La adopción importaba tanto como la solución técnica.",
      ],
      bullets: [
        "El flujo EMR necesitó capacitación práctica en el lugar de trabajo porque las personas habían usado la solución alternativa anterior durante años.",
        "El rediseño de certificaciones ganó 70% de eficiencia al reorganizar tareas, estados y visibilidad.",
        "El onboarding se ajustó después de ver que nuevos clínicos necesitaban un siguiente paso claro, no un dashboard completo.",
      ],
    },
    {
      eyebrow: "Resultado",
      title: "Impacto medible en sistemas internos",
      body: [
        "El trabajo contribuyó a una reducción de 20% en costos relacionados con EMR, una mejora de 70% en el flujo de certificación y mejores experiencias de onboarding para equipos clínicos.",
      ],
    },
  ],
  otherProjects: [
    { title: "Grove", desc: "App de cuidado de plantas con IA. Sola, de la investigación a un prototipo funcional.", path: "/case-study/grove" },
    { title: "Good Harvest", desc: "Las pruebas con mapas de calor con 22 usuarios revelaron un problema de confianza en la información estacional.", path: "/case-study/good-harvest" },
  ],
};

export const GOOD_HARVEST_ES: SpanishCaseStudyData = {
  title: "Good Harvest",
  meta: "Diseño de producto · Prototipo móvil · Pruebas de mapa de calor",
  intro:
    "Good Harvest fue un proyecto de UX Bootcamp donde tomé investigación proporcionada, diseñé un prototipo móvil y generé evidencia propia con pruebas de usabilidad y mapas de calor.",
  stats: [
    { label: "Contexto", value: "Proyecto UX Bootcamp" },
    { label: "Rol", value: "Diseño, prototipo, pruebas" },
    { label: "Investigación", value: "Datos iniciales proporcionados" },
    { label: "Pruebas", value: "22 participantes en Maze" },
  ],
  sections: [
    {
      eyebrow: "Punto de partida",
      title: "La investigación indicaba un problema de confianza, no solo de descubrimiento",
      body: [
        "La investigación proporcionada mostraba que las personas podían encontrar información sobre productos de temporada, pero no necesariamente creían que aplicaba a su situación.",
        "Mi trabajo fue convertir esos hallazgos en decisiones de diseño, prototipo y pruebas.",
      ],
    },
    {
      eyebrow: "Diseño",
      title: "Hacer que lo local y lo estacional se sintiera específico",
      body: [
        "Rediseñé el flujo para conectar productos locales, recetas y contexto de temporada. El objetivo era que la información no se sintiera genérica, sino accionable y relevante.",
      ],
    },
    {
      eyebrow: "Validación",
      title: "Los mapas de calor cambiaron la iteración",
      body: [
        "Usé pruebas no moderadas en Maze para ver dónde tocaban primero los usuarios, dónde dudaban y qué información ignoraban. La iteración priorizó claridad, jerarquía y confianza.",
      ],
      bullets: [
        "3 de 4 tareas clave se completaron sin ayuda.",
        "El flujo bajó de 7 toques a 4 toques.",
        "Los primeros toques se concentraron en el módulo de productos de temporada.",
      ],
    },
    {
      eyebrow: "Aprendizaje",
      title: "El diseño no podía depender de más texto",
      body: [
        "La solución no era explicar más. Era estructurar mejor la información, mostrar contexto en el momento correcto y reducir dudas antes de pedir acción.",
      ],
    },
  ],
  otherProjects: [
    { title: "Grove", desc: "App de cuidado de plantas con IA. Sola, de la investigación a un prototipo funcional.", path: "/case-study/grove" },
    { title: "MSK Cancer Center", desc: "Seis años rediseñando flujos clínicos, onboarding y certificación para más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
  ],
};

export const MOBBIN_ES: SpanishCaseStudyData = {
  title: "Mobbin",
  meta: "App Capture Specialist · Documentación de flujos UX · Curaduría de patrones",
  intro:
    "Trabajo freelance para Mobbin documentando experiencias móviles de principio a fin. Capturé, organicé y anoté flujos de tres productos fintech para una biblioteca de referencia usada por equipos de UX, producto y diseño.",
  stats: [
    { label: "Cliente", value: "Mobbin · Freelance" },
    { label: "Tiempo", value: "mar.–jun. 2026 · 4 meses" },
    { label: "Output", value: "3 apps · 200+ pantallas" },
    { label: "Ubicación", value: "Remoto" },
  ],
  sections: [
    {
      eyebrow: "Trabajo",
      title: "Documentar flujos es criterio editorial",
      body: [
        "El trabajo no era capturar pantallas al azar. Era caminar productos reales como usuaria, entender secuencias completas, identificar patrones reutilizables y escribir anotaciones útiles para diseñadores que llegarían sin contexto.",
      ],
    },
    {
      eyebrow: "Método",
      title: "Captura, taxonomía y calidad",
      body: [
        "Organicé onboarding, rutas de conversión, puntos de entrada a funciones, comportamientos de interacción y estados especiales. Revisé cada flujo para claridad, completitud y precisión.",
      ],
    },
    {
      eyebrow: "Producto",
      title: "Aprender de productos reales fortaleció mi juicio",
      body: [
        "Estudiar cómo apps líderes estructuran información, guían usuarios y reducen fricción fortaleció mi criterio de producto. También me enseñó a nombrar patrones según cómo otros diseñadores los buscarían.",
      ],
    },
  ],
  otherProjects: [
    { title: "Grove", desc: "App de cuidado de plantas con IA. Sola, de la investigación a un prototipo funcional.", path: "/case-study/grove" },
    { title: "MSK Cancer Center", desc: "Seis años rediseñando flujos clínicos, onboarding y certificación para más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
  ],
};
