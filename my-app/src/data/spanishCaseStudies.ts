import type { SpanishCaseStudyData } from "../components/SpanishCaseStudy";

export const GROVE_ES: SpanishCaseStudyData = {
  title: "Once funciones se convirtieron en tres",
  breadcrumb: "Grove",
  meta: "Grove · Diseño de producto · Prototipo funcional · Fase 2 de 3",
  intro:
    "Grove es una app de cuidado de plantas. Una herramienta de IA llamada Emergent construyó una primera versión rápida y llena de funciones. Una prueba exploratoria con 5 usuarios, entre marzo y mayo de 2026, señaló sobrecarga; el registro conservado no incluye resultados por tarea, así que no hago una afirmación más amplia con esa prueba. Después, una encuesta de 34 personas redujo once funciones a las tres prioridades que guían la Fase 2. La encuesta registra prioridades declaradas, no comportamiento observado ni demanda de mercado.",
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
        "La mayoría de la gente que compra una planta quiere una sola cosa: mantenerla viva. Pero se olvidan de regarla, o la riegan de más, y de cualquier forma se sienten mal. Les pregunté a 34 dueños de plantas qué haría que una app de plantas se ganara un lugar en su teléfono. Una de las dos respuestas más comunes: “Los consejos son demasiado genéricos, no toman en cuenta mi casa.” Lo que más rápido hace que borren una app, dicho por 11 de 34 sin que se lo preguntara: demasiadas notificaciones. Una persona lo resumió así: “El cuidado de plantas debería sentirse tranquilo y sano, no estresante.”",
        "El punto débil: en lo que peor están los dueños nuevos es en la luz — dónde poner una planta, y por qué. Ninguna app grande lo enseña. Los dueños nuevos calificaron su confianza para darles la luz del sol correcta en 2.4 de 5 (12 personas); los experimentados, en 3.4 (14 personas). Ahí, más la confianza, es donde Grove gana o no gana.",
      ],
    },
    {
      anchor: "grove-research",
      eyebrow: "Investigación",
      title: "Les pregunté a 34 dueños de plantas qué importa de verdad",
      body: [
        "Después de que una prueba con 5 usuarios mostró que la primera versión estaba sobrecargada, hice una encuesta para decidir qué debía conservar el rediseño. 34 personas, desde principiantes hasta coleccionistas serios, respondieron entre el 22 de mayo y el 8 de julio de 2026.",
        "Emergent había construido las funciones sociales dentro de la app. La encuesta dijo que no es por eso que la gente la descarga. Así que hice una pregunta difícil: “Si Grove solo pudiera lanzarse con TRES funciones, ¿cuáles no podría dejar de tener?” El rediseño empieza por esas tres. Todo lo demás espera.",
        "Límite de la evidencia: la encuesta registra prioridades declaradas. La usé para decidir qué construir y probar después, no para afirmar comportamiento observado ni demanda de mercado.",
      ],
      bullets: [
        "Recordatorios inteligentes: la función más pedida (74%), pero solo con límites claros.",
        "Identificar la planta con la cámara (56%) y diagnóstico por foto: esenciales, pero tenían que mostrar cuánta confianza tienen y sus fuentes.",
        "Las advertencias para plantas tóxicas para mascotas (4 de 12 dueños nuevos las marcaron entre lo más estresante del cuidado) y la educación sobre la luz pasaron a ser parte del núcleo de confianza, aunque yo ni siquiera las había construido.",
      ],
    },
    {
      anchor: "grove-decisions",
      eyebrow: "Producto",
      title: "Agrupé las plantas por dónde viven, no en una sola lista larga",
      body: [
        "Otras apps meten todas las plantas en una sola lista larga. Abruma — ¿por dónde empieza? Grove agrupa las plantas por dónde viven: la ventana de la cocina, el estante de la sala, la recámara. Cada pantalla responde una sola pregunta: ¿qué grupo estoy viendo? Un usuario nuevo solo ve una tarea al día.",
        "También anoté las cuatro decisiones donde le dije que no a la IA: el tono que hace sentir culpa, las recompensas tipo juego, la falsa certeza al identificar una planta y la seguridad para mascotas. Cada una respaldada por lo que dijo la encuesta. La quinta es un error mío: la lógica del calendario de riego, que todavía estoy corrigiendo.",
        "Esa quinta es la que estoy diseñando ahora. La IA armó un calendario de riego: cada planta con su intervalo fijo. Pero regar de más mata más plantas de interior que olvidarlas, y un intervalo fijo es justo como pasa. El recordatorio le va a pedir que revise, no que riegue: “Ficus lirado — revise la primera pulgada de tierra.” Mi propia guía de cuidado ya lo decía; el motor de recordatorios no se había puesto al día.",
      ],
    },
    {
      anchor: "grove-override",
      eyebrow: "Cuando algo sale mal",
      title: "El producto se decide en los momentos difíciles",
      body: [
        "Cuando todo sale bien, cualquier app se ve bien. La prueba real son los momentos difíciles: la pantalla vacía, cuando la IA no está segura, volver después de varios días sin que le haga sentir culpa, la advertencia de una planta tóxica para mascotas, y el tono de los recordatorios. Esos detalles deciden si la app se siente útil o estresante.",
      ],
    },
    {
      anchor: "grove-outcomes",
      eyebrow: "Resultado",
      title: "Fase 2 de 3: el rediseño está decidido; la nueva prueba es lo siguiente",
      body: [
        "Lo que quedó no fue solo una app bonita. Fue una definición más honesta de la primera versión, una hipótesis clara para las pruebas con personas reales, y un registro de decisiones que muestra dónde la IA acelera el trabajo y dónde un humano tiene que corregirla. La diferencia no es usar IA. Es saber cuándo confiar en ella y cuándo decir que no.",
      ],
    },
  ],
  otherProjects: [
    { title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Más de 200 pantallas por app, buscables por tarea", desc: "Mobbin · Más de 200 pantallas por app, documentadas como referencias paso a paso.", path: "/case-study/mobbin" },
    { title: "Las propias palabras del estudiante son la prueba", desc: "Knowunity · Prototipo de recuerdo activo por voz, de un sprint de diseño; recuerdo simulado.", path: "/case-study/knowunity" },
  ],
  close: {
    title: "Diseño los estados de duda.",
    body: "Las mejores opciones, qué tan segura está y de dónde salió: la identificación de plantas de Grove es mi versión pequeña de un problema que también tienen las herramientas clínicas.",
  },
};

export const MSK_ES: SpanishCaseStudyData = {
  title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas",
  breadcrumb: "Memorial Sloan Kettering",
  meta: "Memorial Sloan Kettering · UX y diseño de producto · Sistemas de salud",
  intro:
    "Durante seis años en MSK, en tres puestos, trabajé en flujos clínicos, certificación e incorporación de personal para sistemas cuyo alcance incluía a más de 21,000 profesionales clínicos y administrativos. Los mensajes del portal de pacientes vivían en el portal, no en la historia clínica, así que el personal los imprimía para escanearlos. Mapeé ese desvío entre cuatro áreas, verifiqué su viabilidad y propuse una solución digital. Los equipos de TI (tecnología de la información) y UX (experiencia de usuario) la implementaron después de que cambié de puesto.",
  stats: [
    { label: "Rol", value: "Sistemas de salud → UX y diseño de producto" },
    { label: "Organización", value: "Memorial Sloan Kettering Cancer Center" },
    { label: "Escala", value: "21,000+ clínicos y personal" },
    { label: "Puestos en MSK", value: "Coordinación de oficina → Asistencia administrativa → Facilitadora de capacitación (luego Especialista de capacitación I)" },
    { label: "Contribución", value: "Diagnóstico · mapa · viabilidad · propuesta" },
    { label: "Implementación", value: "Construida después por TI y UX" },
  ],
  sections: [
    {
      anchor: "msk-brief",
      eyebrow: "Contexto",
      title: "Diseñar para sistemas donde el error tiene\u00a0consecuencias",
      body: [
        "El trabajo no era hacer pantallas bonitas. Era entender dónde fallaba el flujo real, alinear a clínicos, líderes y TI, y cambiar herramientas que las personas usaban bajo presión.",
        "Cada mensaje impreso es una oportunidad de que la información del paciente circule, se archive en la historia equivocada o se pierda antes de la siguiente consulta.",
      ],
    },
    {
      anchor: "msk-workflow",
      eyebrow: "EMR",
      title: "De imprimir y enviar a una acción directa desde el dashboard",
      body: [
        "El rediseño consistió en agregar una acción directa en el panel que archivaba el mensaje en el expediente médico electrónico (EMR), la historia del paciente. Antes, el personal imprimía el mensaje, lo enviaba a HIM (gestión de información de salud, el equipo que escanea documentos a la historia) y esperaba que se archivara. Después, el flujo pasó de seis pasos a cinco y un área salió del circuito.",
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
        "El material de certificación de RCP (reanimación cardiopulmonar) estaba en lenguaje técnico y legal, y tan poca gente lo completaba que el equipo planeaba una prórroga de 4 meses. Lo reescribí para los clínicos que tenían que completarlo: toda el área se certificó un mes antes de la fecha límite original, sin la prórroga.",
        "El programa de incorporación para personal administrativo nuevo — Epic (el software del expediente), HIPAA (la ley de privacidad del paciente), los módulos de cumplimiento y las habilidades técnicas y blandas del puesto — se reconstruyó con el equipo de diseño y se curó cohorte por cohorte, para el rango real de habilidades que llegaba.",
      ],
    },
    {
      anchor: "msk-sustainment",
      eyebrow: "Después",
      title: "Me fui antes del lanzamiento. Esto es lo que pasó después.",
      body: [
        "Entregué el flujo a TI y UX, que lo construyeron. Se adoptó en toda la institución (dato autorreportado: mi propio registro, no una medición independiente).",
      ],
    },
    {
      anchor: "msk-outcomes",
      eyebrow: "Resultado",
      title: "Impacto medible en sistemas internos",
      body: [
        "En mi trabajo directo, toda el área se certificó en RCP un mes antes de la fecha límite original, sin la prórroga de 4 meses, y reconstruí los itinerarios de aprendizaje de la incorporación administrativa con el equipo de diseño, probándolos con distintas cohortes, para el rango de habilidades de cada una.",
        "La iniciativa organizacional más amplia reportó una reducción de 20% en costos relacionados con el EMR; no atribuyo ese resultado únicamente a la cola de archivo y el registro conservado no incluye el período ni la definición de costos.",
        "En mi propuesta para la Feria de Mejora de Procesos proyecté un ahorro de ~$1M al año en papel. Es una proyección de esa propuesta, no un ahorro medido.",
      ],
    },
  ],
  otherProjects: [
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "Más de 200 pantallas por app, buscables por tarea", desc: "Mobbin · Más de 200 pantallas por app, documentadas como referencias paso a paso.", path: "/case-study/mobbin" },
  ],
  close: {
    title: "Encuentro el desvío. Después logro que se construya.",
    body: "Lo mapeo para que cada área vea la misma falla, y luego lo convierto en una decisión que la organización va a construir.",
  },
};

export const MOBBIN_ES: SpanishCaseStudyData = {
  title: "Más de 200 pantallas por app, buscables por tarea",
  breadcrumb: "Mobbin",
  meta: "Mobbin · Documentación de flujos de experiencia de usuario (UX) · Curaduría de patrones",
  intro:
    "Mobbin es una biblioteca de capturas de apps donde los diseñadores buscan ejemplos. Trabajo freelance para Mobbin documentando experiencias móviles de principio a fin. Capturé, organicé y anoté flujos de tres apps de finanzas para la biblioteca de referencia Finance+. Documenté Kikoff, Polymarket y Discover; no diseñé esos productos ni Mobbin.",
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
      eyebrow: "Resultado",
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
  close: {
    title: "Después de 200 pantallas por app, distingo un hábito de un patrón.",
    body: "Algunos “patrones comunes” son hábitos que nadie cuestionó. Puedo decirle cuáles.",
  },
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
      eyebrow: "Por qué importaba la rapidez",
      title: "Una entrega tardía es un riesgo de\u00a0bajas.",
      body: [
        "El trabajo: tener medicinas y equipo listos antes de que se necesiten, no después de que alguien los pida. Lo que estaba en juego: una estación de ayuda sin suministros.",
        "Una estación de ayuda es donde primero se atiende a los soldados heridos.",
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
        "Acercar el punto de suministro: cada reabastecimiento empezaba demasiado lejos de las estaciones de ayuda. Planifiqué y di seguimiento a la mudanza de $2M. La hice por fases, de lo más esencial a lo menos, y dividí al personal para que ninguna estación de ayuda se quedara sin suministro durante la mudanza. Según lo reportado, el tiempo pasó de 1–2 meses a 1–2 semanas (85% menos).",
        "Una sola forma de pedir: siete estaciones usaban formatos distintos de solicitud y de reporte. Creé un protocolo de solicitud compartido y capacité a cada sitio en cómo pedir y qué significaba cada estado del pedido; el expediente reporta que los suministros críticos llegaron a las estaciones con un 15% más de eficiencia.",
        "Pedir antes de que se acabe: nadie veía el estado de los pedidos, así que unos sitios pedían de más y otros se quedaban sin nada. Creé un estado de pedidos compartido en tiempo real; el expediente reporta un 60% menos de gasto sin perder disponibilidad. La falla contra la que lo diseñé: un sitio que “se queda en negro”, sin suministros.",
      ],
    },
    {
      anchor: "log-constraints",
      eyebrow: "Lo que lo hizo difícil",
      title: "Tres restricciones que no cambiaban.",
      body: [],
      bullets: [
        "Cadena de frío · 48 horas: llegar tarde significaba que ya no servía.",
        "Tres países: sistemas y vocabulario distintos.",
        "Zona activa · mudanza de $2M: sin ensayo y sin margen de error.",
      ],
    },
    {
      anchor: "log-outcomes",
      eyebrow: "A cuánto sumó",
      title: "Medido en tiempo, dinero y cosas que no pasaron.",
      body: [
        "Moví el punto de suministro, estandaricé la solicitud e hice visible el estado de los pedidos.",
        "Límite de la evidencia: son cifras de mi expediente de servicio, reportadas por mí; no se conservaron los periodos ni los métodos de medición. Aquí no se describen posiciones, rutas ni ubicaciones de unidades.",
      ],
      bullets: [
        "85%: reducción reportada del tiempo de reabastecimiento médico después de acercar el almacén.",
        "60%: reducción reportada del gasto, cuando el estado compartido de pedidos acabó con los pedidos de más y los faltantes.",
        "15%: según lo reportado, los suministros críticos llegaron a las estaciones con más eficiencia tras un solo protocolo de comunicación.",
      ],
    },
  ],
  otherProjects: [
    { title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
  ],
  close: {
    title: "Las cadenas de suministro y los flujos clínicos fallan de la misma manera.",
    body: "En ambos, encontré el paso que no debería existir y cambié la secuencia.",
  },
};

// Condensed from FlagshipKnowunity.tsx. Nothing is added beyond the English
// page; Knowunity's internal numbers stay off both. Section anchors match the
// English chapter ids so the language switch lands in place.
export const KNOWUNITY_ES: SpanishCaseStudyData = {
  title: "Las propias palabras del estudiante son la\u00a0prueba",
  breadcrumb: "Knowunity",
  meta: "Knowunity · Sprint de diseño · Prototipo móvil interactivo · Recuerdo simulado",
  intro:
    "Knowunity es una app de estudio para estudiantes. Un estudiante dice una definición en voz alta; Knowie, el asistente de Knowunity, responde por texto. Cuando acierta, le cita sus propias palabras como prueba. Sprint individual de dos semanas y media de Yummy Labs con el brief de Knowunity; prototipo funcional sobre su kit de componentes. El reconocimiento de voz es simulado y no se probó con estudiantes; no es una función publicada de Knowunity.",
  stats: [
    { label: "Rol", value: "Participación individual · sprint de diseño de Yummy Labs · brief y kit de Knowunity" },
    { label: "Brief", value: "Voz de entrada, texto de salida · iOS, 390px, modo oscuro · recuerdo simulado" },
    { label: "Mi parte", value: "Flujos y decisiones · prototipo codificado · catálogo en Storybook" },
    { label: "Resultado", value: "Insignia Design Sprint de Yummy Labs · revisado por Knowunity · no publicado" },
  ],
  sections: [
    {
      anchor: "knowunity-brief",
      eyebrow: "Dónde empieza esto",
      title: "Ver el material no es saberlo.",
      body: [
        "Después de repasar, el estudiante vio el material, pero no ha demostrado que pueda recuperarlo. Los cuestionarios prueban reconocimiento. Nada le pide que lo diga.",
        "El brief de Knowunity pedía una sensación de “esto ya lo sé”. Las metas, en palabras: que más estudiantes que ven el paso lo empiecen, y que más de los que empiezan lo terminen.",
        "A mitad del sprint, Knowunity publicó una versión ligera en beta. El brief pedía tratarla como el primer intento de un equipo y encontrar la versión más fuerte, no copiarla.",
      ],
      bullets: [
        "Voz de entrada, texto de salida: Knowie nunca habla.",
        "Pulsar para hablar: el estudiante inicia y detiene la grabación. Nadie adivina cuándo terminó.",
        "Nunca atrapar al estudiante: cada acción obligatoria tiene salida, incluso para quien no puede hablar en ese momento.",
        "Juzgar con generosidad: un “incorrecto” falso cuesta más aquí que en opción múltiple.",
      ],
    },
    {
      anchor: "knowunity-decisions",
      eyebrow: "Cuatro decisiones",
      title: "Quien demuestra es el estudiante, no Knowie.",
      body: ["Devolver las palabras. Ofrecer los fallos. Pedir el micrófono cuando hace falta. Decir en qué punto va."],
      bullets: [
        "Devolver las palabras: cuando acierta, Knowie le cita su propia transcripción como prueba. Ver su propia explicación correcta es evidencia de que puede recuperarla, y son las palabras que usará en el examen.",
        "Ofrecer los fallos, no reencolarlos: un término fallado volvía al final de la serie. Ahora la sesión pasa directo al resumen, que empieza con “Practicar lo que fallé”. Cada fila dice por qué está ahí y recomienda un ejercicio o repetirlo.",
        "Pedir el micrófono cuando hace falta: primero la pregunta. La hoja de permiso se abre encima al primer toque del micrófono, no como pantalla entre una introducción y la pregunta uno. La pantalla de introducción desapareció.",
        "Decir en qué punto va: una pista en el primer fallo, una pista de completar el hueco en el segundo, la respuesta en el tercero. El título de la tarjeta lo dice: “Un intento más y le muestro la respuesta”. Nada desaparece sin aviso.",
      ],
    },
    {
      anchor: "knowunity-prototype",
      eyebrow: "Cómo lo construí",
      title: "Un prototipo funcional, no una presentación.",
      body: [
        "Knowunity aportó a Knowie, la fuente Greed, su kit de Figma y acceso a la app y a la beta. Yo hice los flujos, las decisiones y el código: un prototipo en Next.js con 43 rutas, a 390px en modo oscuro, y un catálogo en Storybook sobre su kit. Cada pantalla es su propia ruta, a la que se llega tocando.",
        "IA en la construcción: yo diseñé y dirigí. Claude Code escribió la mayor parte del código de Next.js y Storybook a partir de mis especificaciones y de los componentes de Figma de Knowunity.",
        "Lo que cambiaría: poner antes una versión con reconocimiento de voz real frente a estudiantes. El recuerdo fue simulado todo el tiempo.",
      ],
    },
    {
      anchor: "knowunity-outcomes",
      eyebrow: "Resultado",
      title: "Una insignia, una revisión y una simulación que aún necesita\u00a0estudiantes.",
      body: [
        "Yummy Labs otorgó a la entrada una insignia Design Sprint y Knowunity revisó el trabajo. El reconocimiento de voz es simulado: cuánto tiempo se mantiene el micrófono decide el resultado. No hubo pruebas con estudiantes. No es una función publicada de Knowunity, y aquí no se publican cifras internas de Knowunity.",
        "Siguiente paso: una versión con reconocimiento de voz frente a estudiantes.",
      ],
    },
  ],
  otherProjects: [
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "El reabastecimiento médico tardó un 85% menos", desc: "Logística médica del Ejército · siete estaciones de ayuda, tres países.", path: "/case-study/logistics" },
  ],
  close: {
    title: "Hago prototipos para encontrar la siguiente prueba.",
    body: "Say It Back muestra cómo trabajo: construirlo, decir qué es simulado y nombrar la siguiente prueba.",
  },
};

// Condensed from FlagshipUxWoman.tsx. Nothing is added beyond the English
// page: no outcome, no patient claim. Interviewees stay anonymized, by role
// only. Section anchors match the English chapter ids so the language switch
// lands in place.
export const UXWOMAN_ES: SpanishCaseStudyData = {
  title: "¿Quién tiene el siguiente paso? Seis entrevistas de salud, una hipótesis.",
  breadcrumb: "UX Woman",
  meta: "UX Woman · Investigación en salud · Activo, fase de investigación",
  intro:
    "En seis entrevistas de salud, el personal describió atención en espera mientras nadie podía ver quién tenía el siguiente paso. Lo trato como una hipótesis. La evidencia aún no muestra un solo problema compartido, así que el siguiente paso es reconstruir casos reales antes de construir nada.",
  stats: [
    { label: "Evidencia", value: "Seis entrevistas de salud · una entrevista adyacente de RR. HH. · ninguna entrevista dedicada con pacientes" },
    { label: "Mi parte", value: "Planes de entrevista · reclutamiento por conducta · síntesis · cinco diseños de pretotipo" },
    { label: "Estado", value: "Activo · fase de investigación · cinco pretotipos diseñados, ninguno ejecutado" },
    { label: "Siguiente", value: "Reconstruir casos reales y luego decidir qué construir" },
  ],
  sections: [
    {
      anchor: "uxwoman-problem",
      eyebrow: "Dónde empieza esto",
      title: "El personal y los pacientes no ven quién actúa después.",
      body: [
        "Cuando la atención espera por la cobertura, el papeleo o un documento faltante, personas de distintos roles describieron no saber quién tenía el siguiente paso.",
        "Esa señal se repite, pero los mecanismos difieren: un mensaje mal dirigido, una llamada de revisión de utilización, una cola de autorizaciones que nadie ve. Es una hipótesis por probar, no una necesidad validada.",
      ],
    },
    {
      anchor: "uxwoman-research",
      eyebrow: "Qué hice",
      title: "Seis entrevistas de salud, reclutadas por lo que la gente hace.",
      body: [
        "Recluté por conducta, no por cargo. Cada entrevista cuenta una vez. Las sesiones del estudio se hacen en UserTesting.",
        "Seis entrevistas de salud: servicios financieros al paciente, operaciones de ingresos, asistente médico de ortopedia, enfermera de revisión de utilización, psiquiatra y una persona que fue responsable de servicios al afiliado en un plan de salud. Una persona también habló desde su experiencia personal como paciente.",
        "No hay un flujo de entrevistas con pacientes. Lo que sé de los pacientes es de segunda mano, salvo ese testimonio. Una séptima entrevista, adyacente, con una persona a cargo de RR. HH. trató sobre la verificación de fuentes de IA. No valida nada en salud. No se recopiló información de salud protegida (PHI) y las personas participantes están anonimizadas.",
        "Investigación secundaria: un análisis de flujos de IA e información en hospitales grandes, con informes federales y encuestas profesionales. Muestra patrones del sistema, no lo que necesita un hospital en particular.",
      ],
    },
    {
      anchor: "uxwoman-findings",
      eyebrow: "Lo que mostraron las entrevistas",
      title: "Cinco señales, cada una con su nivel de confianza.",
      body: [
        "Un nivel dice qué tan directamente las entrevistas respaldan una afirmación, no cuántas personas la dijeron. Todo es exploratorio y de autorreporte.",
      ],
      bullets: [
        "El trabajo cruza roles y organizaciones a mano. Confianza: moderada en que importa en varios flujos; baja en que sea una sola falla compartida.",
        "La información debe ajustarse al caso. Confianza: moderada como observación entre casos.",
        "Las barreras de cobertura pueden interrumpir la atención. Confianza: moderada en que los actores ven el riesgo; baja en cuán común es y en la experiencia del paciente.",
        "Las personas conservan el juicio y el trabajo de recuperación. Confianza: alta en que hay trabajo humano; baja en que sea una necesidad sin atender o que la automatización la resuelva.",
        "La experiencia con IA varía. Confianza: alta en que difiere; la IA es una herramienta posible para una tarea, no el problema compartido.",
        "Lo que no puedo afirmar: un solo problema compartido, cuán común es cada problema, ni que los traspasos causen los retrasos.",
      ],
    },
    {
      anchor: "uxwoman-pretotypes",
      eyebrow: "Pruebas baratas, diseñadas",
      title: "Cinco pretotipos diseñados. Ninguno ejecutado.",
      body: [
        "Cada uno intenta refutar su propia premisa. Son cinco pruebas separadas, no cinco funciones de un solo producto. Cada una tiene una condición de parada: si añade papeleo sin cambiar una acción siguiente, se detiene.",
      ],
      bullets: [
        "Tarjetas “¿Qué significa este estado?”: ¿puede un afiliado distinguir una recomendación de una aprobación y ver su propio siguiente paso?",
        "Navegador de cobertura en contexto: ¿ayuda más una guía en el momento de una tarea de cobertura que una biblioteca general de seguros?",
        "Recibo de traspaso de información faltante: ¿nombrar lo que falta y quién lo debe reduce la ambigüedad entre roles?",
        "Hoja de evidencia para la carta de necesidad médica: ¿ayuda una lista de fuentes y revisor a preparar o revisar una carta?",
        "Sesión con un navegador humano: cuando la información es confusa o delicada, ¿una persona resuelve algo que el autoservicio no?",
      ],
    },
    {
      anchor: "uxwoman-next",
      eyebrow: "Dónde está",
      title: "Una hipótesis, no un producto.",
      body: [
        "Activo, fase de investigación. Seis entrevistas de salud, más una adyacente de RR. HH. que no valida nada en salud. Cero de cinco pretotipos ejecutados: los cinco están diseñados y ninguno ha producido evidencia.",
        "Siguiente paso: reconstruir casos reales recientes, con las mismas preguntas neutrales para cada persona, antes de elegir qué construir.",
      ],
    },
  ],
  otherProjects: [
    { title: "Las propias palabras del estudiante son la prueba", desc: "Knowunity · Sprint de diseño, recuerdo por voz simulado.", path: "/case-study/knowunity" },
    { title: "Once funciones se convirtieron en tres", desc: "Grove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
  ],
  close: {
    title: "Reviso la premisa antes de construir.",
    body: "UX Woman muestra cómo trabajo: decir qué respalda la evidencia, calificarla y nombrar la siguiente prueba.",
  },
};
