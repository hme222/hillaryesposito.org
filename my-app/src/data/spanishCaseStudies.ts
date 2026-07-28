import type { SpanishCaseStudyData } from "../components/SpanishCaseStudy";

export const GROVE_ES: SpanishCaseStudyData = {
  title: "Grove",
  meta: "Diseño de producto · Producto con IA · Prototipo funcional",
  intro:
    "Grove es una app de cuidado de plantas. Una herramienta de IA llamada Emergent me construyó la app entera, rápido, llena de funciones. La probé con 5 usuarios y el problema fue evidente: demasiadas cosas, en el orden equivocado. Así que hice una encuesta a 34 personas para encontrar las pocas funciones en las que valía la pena concentrarme, y empecé a rehacerla alrededor de esas: aplazo las funciones sociales que casi nadie pidió y le enseño a la IA a admitir cuando no está segura. Porque cuando una planta es tóxica para un gato, adivinar mal no es una sugerencia. Es un riesgo.",
  stats: [
    { label: "Rol", value: "Diseñadora de producto (en solitario)" },
    { label: "Muestra", value: "34 respuestas de encuesta" },
    { label: "Tiempo", value: "Fase 2 de 3" },
    { label: "Estado", value: "Rediseño en curso" },
  ],
  sections: [
    {
      eyebrow: "Dónde empieza esto",
      title: "Los dueños de plantas se olvidan. Y luego se sienten culpables.",
      body: [
        "La mayoría de la gente que compra una planta quiere una sola cosa: mantenerla viva. Pero se olvidan de regarla, o la riegan de más, y de cualquier forma se sienten mal. Les pregunté a 34 dueños de plantas qué haría que una app de plantas se ganara un lugar en su teléfono. La respuesta más común: “Los consejos son demasiado genéricos, no toman en cuenta mi casa.” Lo que más rápido hace que borren una app, dicho por 11 de 34 sin que se lo preguntara: demasiadas notificaciones. Una persona resumió todo el trabajo en seis palabras: “El cuidado de plantas debería sentirse tranquilo, no estresante.”",
        "El punto débil: en lo que peor están los dueños nuevos es en la luz — dónde poner una planta, y por qué. Ninguna app grande lo enseña. Los dueños nuevos calificaron su confianza sobre la luz en 2.4 de 5 (n=16); los experimentados, en 3.3, y pidió, sin que se lo preguntara, una app que “me diga exactamente dónde colocar una planta.” Ahí, más la confianza, es donde Grove gana o no gana.",
      ],
    },
    {
      eyebrow: "Investigación",
      title: "Les pregunté a 34 dueños de plantas qué importa de verdad",
      body: [
        "Después de que una prueba con 5 usuarios mostró que la primera versión estaba sobrecargada, hice una encuesta para decidir qué debía conservar el rediseño. 34 personas, desde principiantes hasta coleccionistas serios, respondieron entre el 22 de mayo y el 8 de julio de 2026.",
        "Emergent había construido las funciones sociales dentro de la app. La encuesta dijo que no es por eso que la gente la descarga. Así que hice una pregunta difícil: “Si Grove solo pudiera lanzarse con TRES funciones, ¿cuáles no podrías dejar de tener?” Las tres primeras se construyeron primero. Todo lo demás espera.",
      ],
      bullets: [
        "Recordatorios inteligentes: la función más pedida (74%), pero solo con límites claros.",
        "Identificar la planta con la cámara (61%) y diagnóstico por foto: esenciales, pero tenían que mostrar cuánta confianza tienen y sus fuentes.",
        "Las advertencias para plantas tóxicas para mascotas (dueños nuevos las pidieron solos, sin que se lo preguntara) y la educación sobre la luz pasaron a ser parte del núcleo de confianza, aunque yo ni siquiera las había construido.",
      ],
    },
    {
      eyebrow: "Producto",
      title: "Agrupé las plantas por dónde viven, no en una sola lista larga",
      body: [
        "Otras apps meten todas las plantas en una sola lista larga. Abruma — ¿por dónde empiezas? Grove agrupa las plantas por dónde viven: la ventana de la cocina, el estante de la sala, la recámara. Cada pantalla responde una sola pregunta: ¿qué grupo estoy viendo? Un usuario nuevo solo ve una tarea al día.",
        "También anoté las cinco decisiones donde le dije que no a la IA: el tono que hace sentir culpa, las recompensas tipo juego, la falsa certeza al identificar una planta, y las notificaciones demasiado frecuentes. Cada una respaldada por lo que dijo la encuesta.",
      ],
    },
    {
      eyebrow: "Cuando algo sale mal",
      title: "El producto se decide en los momentos difíciles",
      body: [
        "Cuando todo sale bien, cualquier app se ve bien. La prueba real son los momentos difíciles: la pantalla vacía, cuando la IA no está segura, volver después de varios días sin que te haga sentir culpa, la advertencia de una planta tóxica para mascotas, y el límite de notificaciones. Esos detalles deciden si la app se siente útil o estresante.",
      ],
    },
    {
      eyebrow: "Resultado",
      title: "Un prototipo que muestra criterio, no solo pantallas bonitas",
      body: [
        "Lo que quedó no fue solo una app bonita. Fue una definición más honesta de la primera versión, una hipótesis clara para las pruebas con personas reales, y un registro de decisiones que muestra dónde la IA acelera el trabajo y dónde un humano tiene que corregirla. La diferencia no es usar IA. Es saber cuándo confiar en ella y cuándo decir que no.",
      ],
    },
  ],
  otherProjects: [
    { title: "MSK Cancer Center", desc: "Seis años rediseñando flujos clínicos, onboarding y certificación para más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Mobbin", desc: "Más de 200 pantallas de tres apps de finanzas, documentadas como referencias buscables paso a paso para la biblioteca de Mobbin.", path: "/case-study/mobbin" },
  ],
};

export const MSK_ES: SpanishCaseStudyData = {
  title: "Memorial Sloan Kettering",
  meta: "UX y diseño de producto · Sistemas de salud · Herramientas internas",
  intro:
    "Durante seis años en MSK, rediseñé flujos clínicos, onboarding y procesos operativos para sistemas usados por más de 21,000 profesionales clínicos y administrativos. El día de cada clínico gira en torno al EMR: el expediente médico electrónico, la historia clínica digital donde vive toda la información del paciente. Este trabajo muestra diseño aplicado a herramientas internas, permisos, estados y adopción en un entorno de salud real.",
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
    { title: "Mobbin", desc: "Más de 200 pantallas de tres apps de finanzas, documentadas como referencias buscables paso a paso para la biblioteca de Mobbin.", path: "/case-study/mobbin" },
  ],
};

export const MOBBIN_ES: SpanishCaseStudyData = {
  title: "Mobbin",
  meta: "Documentación de flujos UX · Curaduría de patrones",
  intro:
    "Trabajo freelance para Mobbin documentando experiencias móviles de principio a fin. Capturé, organicé y anoté flujos de tres apps de finanzas para una biblioteca de referencia usada por equipos de UX, producto y diseño.",
  stats: [
    { label: "Cliente", value: "Mobbin · Freelance" },
    { label: "Tiempo", value: "mar.–jun. 2026 · 4 meses" },
    { label: "Entrega", value: "3 apps · 200+ pantallas" },
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
