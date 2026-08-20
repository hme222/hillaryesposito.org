import type { SpanishCaseStudyData } from "../components/SpanishCaseStudy";

export const GROVE_ES: SpanishCaseStudyData = {
  title: "Once funciones se convirtieron en tres",
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
    { title: "Una cola de archivo reemplazó un desvío de cuatro sistemas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
    { title: "Más de 200 pantallas por app, buscables por tarea", desc: "Mobbin · Más de 200 pantallas por app, documentadas como referencias paso a paso.", path: "/case-study/mobbin" },
  ],
};

export const MSK_ES: SpanishCaseStudyData = {
  title: "Una cola de archivo reemplazó un desvío de cuatro sistemas",
  meta: "Memorial Sloan Kettering · UX y diseño de producto · Sistemas de salud",
  intro:
    "Durante seis años en MSK, rediseñé flujos clínicos, certificación e incorporación de personal para sistemas usados por más de 21,000 profesionales clínicos y administrativos. El día de cada clínico gira en torno al EMR: el expediente médico electrónico, la historia clínica digital donde vive toda la información del paciente. Un registro en tránsito es un registro que no está en la historia clínica cuando el siguiente clínico la abre. El flujo de archivo que propuse sigue en uso después de dos actualizaciones del sistema. Este trabajo muestra diseño aplicado a herramientas internas, permisos, estados y adopción en un entorno de salud real.",
  stats: [
    { label: "Rol", value: "Sistemas de salud → UX y diseño de producto" },
    { label: "Organización", value: "Memorial Sloan Kettering Cancer Center" },
    { label: "Escala", value: "21,000+ clínicos y personal" },
    { label: "Impacto", value: "Contribución a una reducción de 20% en costos EMR" },
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
        "El trabajo contribuyó a una reducción de 20% en costos relacionados con EMR; todas las certificaciones de RCP se recogieron un 70% antes del plazo; y el programa de incorporación del personal administrativo se rediseñó para el rango de habilidades de cada cohorte.",
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
    { title: "Una cola de archivo reemplazó un desvío de cuatro sistemas", desc: "MSK · Seis años rediseñando flujos clínicos para trabajo que alcanzaba a más de 21,000 clínicos y personal administrativo.", path: "/case-study/msk" },
  ],
};
