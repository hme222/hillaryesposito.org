import type { SpanishCaseStudyData } from "../components/SpanishCaseStudy";

export const GROVE_ES: SpanishCaseStudyData = {
  title: "Once funciones se convirtieron en tres",
  breadcrumb: "Grove",
  meta: "Grove · Diseño de producto · Prototipo funcional · Fase 2 de 3",
  intro:
    "Grove es una app de cuidado de plantas. Una herramienta de IA llamada Emergent construyó una primera versión rápida y llena de funciones. Una prueba exploratoria con 5 usuarios señaló sobrecarga; el registro conservado no incluye fechas ni resultados por tarea, así que no hago una afirmación más amplia con esa prueba. Después, una encuesta de 34 personas redujo once funciones a las tres prioridades que guían la Fase 2. La encuesta registra prioridades declaradas, no comportamiento observado ni demanda de mercado.",
  stats: [
    { label: "Rol", value: "Diseñadora de producto (en solitario)" },
    { label: "Muestra", value: "34 respuestas de encuesta" },
    { label: "Tiempo", value: "Fase 2 de 3" },
    { label: "Estado", value: "Rediseño en curso" },
  ],
  sections: [
    {
      anchor: "grove-brief",
      eyebrow: "Dónde empieza esto",
      title: "Los dueños de plantas se olvidan. Y luego se sienten culpables.",
      body: [
        "La mayoría de la gente que compra una planta quiere una sola cosa: mantenerla viva. Pero se olvidan de regarla, o la riegan de más, y de cualquier forma se sienten mal. Les pregunté a 34 dueños de plantas qué haría que una app de plantas se ganara un lugar en su teléfono. La respuesta más común: “Los consejos son demasiado genéricos, no toman en cuenta mi casa.” Lo que más rápido hace que borren una app, dicho por 11 de 34 sin que se lo preguntara: demasiadas notificaciones. Una persona resumió todo el trabajo en seis palabras: “El cuidado de plantas debería sentirse tranquilo, no estresante.”",
        "El punto débil: en lo que peor están los dueños nuevos es en la luz — dónde poner una planta, y por qué. Ninguna app grande lo enseña. Los dueños nuevos calificaron su confianza sobre la luz en 2.4 de 5 (n=16); los experimentados, en 3.3, y pidió, sin que se lo preguntara, una app que “me diga exactamente dónde colocar una planta.” Ahí, más la confianza, es donde Grove gana o no gana.",
      ],
    },
    {
      anchor: "grove-research",
      eyebrow: "Investigación",
      title: "Les pregunté a 34 dueños de plantas qué importa de verdad",
      body: [
        "Después de que una prueba con 5 usuarios mostró que la primera versión estaba sobrecargada, hice una encuesta para decidir qué debía conservar el rediseño. 34 personas, desde principiantes hasta coleccionistas serios, respondieron entre el 22 de mayo y el 8 de julio de 2026.",
        "Emergent había construido las funciones sociales dentro de la app. La encuesta dijo que no es por eso que la gente la descarga. Así que hice una pregunta difícil: “Si Grove solo pudiera lanzarse con TRES funciones, ¿cuáles no podrías dejar de tener?” Las tres primeras se construyeron primero. Todo lo demás espera.",
        "Límite de la evidencia: la encuesta registra prioridades declaradas. La usé para decidir qué construir y probar después, no para afirmar comportamiento observado ni demanda de mercado.",
      ],
      bullets: [
        "Recordatorios inteligentes: la función más pedida (74%), pero solo con límites claros.",
        "Identificar la planta con la cámara (56%) y diagnóstico por foto: esenciales, pero tenían que mostrar cuánta confianza tienen y sus fuentes.",
        "Las advertencias para plantas tóxicas para mascotas (dueños nuevos las pidieron solos, sin que se lo preguntara) y la educación sobre la luz pasaron a ser parte del núcleo de confianza, aunque yo ni siquiera las había construido.",
      ],
    },
    {
      anchor: "grove-decisions",
      eyebrow: "Producto",
      title: "Agrupé las plantas por dónde viven, no en una sola lista larga",
      body: [
        "Otras apps meten todas las plantas en una sola lista larga. Abruma — ¿por dónde empiezas? Grove agrupa las plantas por dónde viven: la ventana de la cocina, el estante de la sala, la recámara. Cada pantalla responde una sola pregunta: ¿qué grupo estoy viendo? Un usuario nuevo solo ve una tarea al día.",
        "También anoté las cinco decisiones donde le dije que no a la IA: el tono que hace sentir culpa, las recompensas tipo juego, la falsa certeza al identificar una planta, la seguridad para mascotas, y las notificaciones demasiado frecuentes. Cada una respaldada por lo que dijo la encuesta.",
        "Hay una sexta, y es la que estoy diseñando ahora. La IA armó un calendario de riego: cada planta con su intervalo fijo. Pero regar de más mata más plantas de interior que olvidarlas, y un intervalo fijo es justo como pasa. El recordatorio va a pedirte que revises, no que riegues: “Ficus lirado — revisa la primera pulgada de tierra.” Mi propia guía de cuidado ya lo decía; el motor de recordatorios no se había puesto al día.",
      ],
    },
    {
      anchor: "grove-override",
      eyebrow: "Cuando algo sale mal",
      title: "El producto se decide en los momentos difíciles",
      body: [
        "Cuando todo sale bien, cualquier app se ve bien. La prueba real son los momentos difíciles: la pantalla vacía, cuando la IA no está segura, volver después de varios días sin que te haga sentir culpa, la advertencia de una planta tóxica para mascotas, y el límite de notificaciones. Esos detalles deciden si la app se siente útil o estresante.",
      ],
    },
    {
      anchor: "grove-outcomes",
      eyebrow: "Resultado",
      title: "Un prototipo que muestra criterio, no solo pantallas bonitas",
      body: [
        "Lo que quedó no fue solo una app bonita. Fue una definición más honesta de la primera versión, una hipótesis clara para las pruebas con personas reales, y un registro de decisiones que muestra dónde la IA acelera el trabajo y dónde un humano tiene que corregirla. La diferencia no es usar IA. Es saber cuándo confiar en ella y cuándo decir que no.",
      ],
    },
  ],
  otherProjects: [
    { title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Más de 200 pantallas por app, buscables por tarea", desc: "Mobbin · Más de 200 pantallas por app, documentadas como referencias paso a paso.", path: "/case-study/mobbin" },
  ],
};

export const MSK_ES: SpanishCaseStudyData = {
  title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas",
  breadcrumb: "Memorial Sloan Kettering",
  meta: "Memorial Sloan Kettering · UX y diseño de producto · Sistemas de salud",
  intro:
    "Durante seis años en MSK, trabajé en flujos clínicos, certificación e incorporación de personal para sistemas cuyo alcance incluía a más de 21,000 profesionales clínicos y administrativos. En el flujo de archivo, diagnostiqué y mapeé un desvío en papel, verifiqué su viabilidad y propuse una solución digital. Los equipos de TI y UX la implementaron después de que cambié de puesto. Este trabajo muestra diseño aplicado a herramientas internas, permisos, estados y adopción en un entorno de salud real.",
  stats: [
    { label: "Rol", value: "Sistemas de salud → UX y diseño de producto" },
    { label: "Organización", value: "Memorial Sloan Kettering Cancer Center" },
    { label: "Escala", value: "21,000+ clínicos y personal" },
    { label: "Contribución", value: "Diagnóstico · mapa · viabilidad · propuesta" },
    { label: "Implementación", value: "Construida después por TI y UX" },
  ],
  sections: [
    {
      anchor: "msk-brief",
      eyebrow: "Contexto",
      title: "Diseñar para sistemas donde el error tiene consecuencias",
      body: [
        "El trabajo no era hacer pantallas bonitas. Era entender dónde fallaba el flujo real, alinear a clínicos, líderes e IT, y cambiar herramientas que las personas usaban bajo presión.",
      ],
    },
    {
      anchor: "msk-workflow",
      eyebrow: "EMR",
      title: "De imprimir y enviar a una acción directa desde el dashboard",
      body: [
        "El rediseño de EMR consistió en agregar una acción directa en el dashboard que llevaba al EMR en línea. Antes, el equipo imprimía, enviaba a otro sitio y esperaba que se archivara. Después, el flujo redujo pasos y quitó trabajo duplicado.",
        "La decisión de UI fue mostrar estado, responsabilidad y acción en el mismo lugar, pero exponer la acción directa solo cuando el registro estaba listo y la persona tenía permiso.",
      ],
    },
    {
      anchor: "msk-decisions",
      eyebrow: "Proceso",
      title: "Mapear, probar, alinear y sostener",
      body: [
        "Mapeé el estado actual, encontré puntos de fallo, alineé stakeholders y diseñé cambios que podían sostenerse después del lanzamiento. La adopción importaba tanto como la solución técnica.",
        "Límite de la evidencia: el registro conserva el flujo, los departamentos, las decisiones y los resultados. No se registraron los conteos de participantes de la observación de turnos, por eso uso la evidencia para explicar decisiones y no para afirmar prevalencia.",
      ],
      bullets: [
        "El flujo EMR necesitó capacitación práctica en el lugar de trabajo porque las personas habían usado la solución alternativa anterior durante años.",
        "El material de certificación de RCP estaba en lenguaje técnico y legal, y tan poca gente lo completaba que el plazo estaba a punto de aplazarse. Lo reescribí para los clínicos que tenían que completarlo: llegaron todas las certificaciones, un 70% antes del plazo.",
        "El programa de incorporación para personal administrativo nuevo — Epic, HIPAA, los módulos de cumplimiento y las habilidades técnicas y blandas del puesto — se reconstruyó con el equipo de diseño y se curó cohorte por cohorte, para el rango real de habilidades que llegaba.",
      ],
    },
    {
      anchor: "msk-outcomes",
      eyebrow: "Resultado",
      title: "Impacto medible en sistemas internos",
      body: [
        "La iniciativa organizacional más amplia reportó una reducción de 20% en costos relacionados con EMR; no atribuyo ese resultado únicamente a la cola de archivo y el registro conservado no incluye el período ni la definición de costos. En mi trabajo directo, todas las certificaciones de RCP se recogieron un 70% antes del plazo y el programa de incorporación del personal administrativo se rediseñó para el rango de habilidades de cada cohorte.",
      ],
    },
  ],
  otherProjects: [
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "Más de 200 pantallas por app, buscables por tarea", desc: "Mobbin · Más de 200 pantallas por app, documentadas como referencias paso a paso.", path: "/case-study/mobbin" },
  ],
};

export const MOBBIN_ES: SpanishCaseStudyData = {
  title: "Más de 200 pantallas por app, buscables por tarea",
  breadcrumb: "Mobbin",
  meta: "Mobbin · Documentación de flujos UX · Curaduría de patrones",
  intro:
    "Trabajo freelance para Mobbin documentando experiencias móviles de principio a fin. Capturé, organicé y anoté flujos de tres apps de finanzas para la biblioteca de referencia Finance+. Documenté Kikoff, Polymarket y Discover; no diseñé esos productos ni Mobbin.",
  stats: [
    { label: "Cliente", value: "Mobbin · Freelance" },
    { label: "Tiempo", value: "mar.–jun. 2026 · 4 meses" },
    { label: "Entrega", value: "3 apps · 200+ pantallas cada una" },
    { label: "Ubicación", value: "Remoto" },
  ],
  sections: [
    {
      anchor: "mobbin-brief",
      eyebrow: "Trabajo",
      title: "Documentar flujos es criterio editorial",
      body: [
        "El trabajo no era capturar pantallas al azar. Era caminar productos reales como usuaria, entender secuencias completas, identificar patrones reutilizables y escribir anotaciones útiles para diseñadores que llegarían sin contexto.",
      ],
    },
    {
      anchor: "mobbin-work",
      eyebrow: "Método",
      title: "Captura, taxonomía y calidad",
      body: [
        "Organicé onboarding, rutas de conversión, puntos de entrada a funciones, comportamientos de interacción y estados especiales. Revisé cada flujo para claridad, completitud y precisión.",
      ],
    },
    {
      anchor: "mobbin-outcomes",
      eyebrow: "Producto",
      title: "Aprender de productos reales fortaleció mi juicio",
      body: [
        "Estudiar cómo apps líderes estructuran información, guían usuarios y reducen fricción fortaleció mi criterio de producto. También me enseñó a nombrar patrones según cómo otros diseñadores los buscarían.",
      ],
    },
  ],
  otherProjects: [
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
  ],
};

// Condensed from FlagshipLogistics.tsx. Every figure and limit here is already
// on the English page; nothing is added. Section anchors match the English
// chapter ids so the language switch and homepage stat links land in place.
export const LOGISTICS_ES: SpanishCaseStudyData = {
  breadcrumb: "Logística médica del Ejército",
  // Worded to break into multi-word lines; "reabastecimiento" alone filled a line.
  title: "El reabastecimiento médico tardó un\u00a085% menos",
  meta: "Logística médica del Ejército · Operaciones · Diseño de servicios · 2024",
  intro:
    "Como oficial de logística médica, planifiqué y di seguimiento a la reubicación de un almacén de $2M que abastecía a siete estaciones de ayuda en tres países. Según mi expediente de servicio, el reabastecimiento pasó de 1–2 meses a 1–2 semanas, resumido como un 85% menos de tiempo. Son cifras reportadas por mí; no se conservaron los periodos ni los métodos de medición.",
  stats: [
    { label: "Rol", value: "Oficial de logística médica · líder de reubicación y servicio" },
    { label: "Escala", value: "5,000+ soldados · $2M en suministros" },
    { label: "Sistema", value: "Siete estaciones de ayuda · tres países" },
    { label: "Resultado", value: "85% menos tiempo tras la reubicación · dato autorreportado" },
  ],
  sections: [
    {
      anchor: "log-brief",
      eyebrow: "Por qué importaba el proceso",
      title: "En una zona de combate, una falla de proceso no es una molestia. Es un riesgo de bajas.",
      body: [
        "El trabajo: tener medicinas y equipo listos antes de que se necesiten, no después de que alguien los pida. Lo que estaba en juego: una estación de ayuda sin suministros, que es donde primero se atiende a los soldados heridos.",
        "Cada retraso gastaba el único recurso que un herido no puede recuperar: tiempo.",
      ],
    },
    {
      anchor: "log-moves",
      eyebrow: "Lo que cambié",
      title: "Mover el almacén. Después, arreglar los traspasos.",
      body: [
        "La mudanza física eliminó el retraso más grande. Una solicitud compartida y un estado de pedidos visible evitaron que volviera.",
      ],
      bullets: [
        "Acercar el punto de suministro: cada reabastecimiento empezaba demasiado lejos de las estaciones de ayuda. Planifiqué y di seguimiento a la mudanza de $2M. Según lo reportado, el tiempo pasó de 1–2 meses a 1–2 semanas (85% menos).",
        "Una sola forma de pedir: siete estaciones usaban formatos distintos de solicitud y de reporte. Creé un protocolo de solicitud compartido; el expediente reporta un 15% más de eficiencia al desplegar recursos críticos.",
        "Pedir antes de que se acabe: nadie veía el estado de los pedidos, así que unos sitios pedían de más y otros se quedaban sin nada. Creé un estado de pedidos compartido en tiempo real; el expediente reporta un 60% menos de gasto sin perder disponibilidad.",
      ],
    },
    {
      anchor: "log-constraints",
      eyebrow: "Lo que lo hizo difícil",
      title: "Las restricciones no eran negociables.",
      body: ["El nuevo proceso tenía que respetar cada restricción fija."],
      bullets: [
        "Cadena de frío · 48 horas: llegar tarde significaba que ya no servía.",
        "Tres países: sistemas y vocabulario distintos.",
        "Zona activa · mudanza de $2M: sin ensayo y sin margen de error.",
      ],
    },
    {
      anchor: "log-outcomes",
      eyebrow: "En qué se tradujo",
      title: "Medido en tiempo, dinero y cosas que no pasaron.",
      body: [
        "Moví el punto de suministro, estandaricé la solicitud e hice visible el estado de los pedidos.",
        "Límite de la evidencia: son cifras de mi expediente de servicio, reportadas por mí; no se conservaron los periodos ni los métodos de medición. Aquí no se describen posiciones, rutas ni ubicaciones de unidades.",
      ],
      bullets: [
        "85%: reducción reportada del tiempo de reabastecimiento médico después de acercar el almacén.",
        "60%: reducción reportada del gasto, cuando el estado compartido de pedidos acabó con los pedidos de más y los faltantes.",
        "15%: mejora reportada de eficiencia al desplegar recursos críticos con un solo protocolo de comunicación.",
      ],
    },
  ],
  otherProjects: [
    { title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
  ],
};
