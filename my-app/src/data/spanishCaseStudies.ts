import type { SpanishCaseStudyData } from "../components/SpanishCaseStudy";
import { KNOWUNITY_BADGE_ASSET } from "./knowunityBadge";

export const GROVE_ES: SpanishCaseStudyData = {
  // No-break space before the last word, so it never strands on line two.
  title: "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento",
  breadcrumb: "FloraGrove",
  meta: "FloraGrove · Antes del lanzamiento · Prototipo funcional · Fase 2 de 3",
  // Pre-launch rebuild (2026-11-19): mirrors the English page. No mention of
  // the AI app builder behind the first version, at Hillary's direction.
  intro:
    "FloraGrove es una app de cuidado de plantas para quienes empiezan. Le dice lo que cada planta necesita hoy, desde el agua y la luz hasta la tierra, y por qué. Antes del lanzamiento: nada de esto se ha lanzado. FloraGrove es un prototipo funcional en la Fase 2 de 3.",
  /* Interview-sourced human line (Better Stories pass, 2026-11-10). Spanish is a draft translation for Hillary to review. */
  humanLine: "Sé de plantas, así que quería más funciones. Cinco usuarios lo cambiaron.",
  heroLink: { label: "Unirse a la lista de espera", href: "https://floragrove.app" },
  // Said once, here; the survey section no longer repeats it.
  resultLine: { eyebrow: "Lo que encontré", text: "Doce funciones se volvieron tres." },
  stats: [
    { label: "Rol", value: "Diseñadora de producto (en solitario)" },
    { label: "Muestra", value: "37 respuestas de encuesta" },
    { label: "Fase", value: "Fase 2 de 3" },
    { label: "Estado", value: "Antes del lanzamiento" },
  ],
  sections: [
    {
      anchor: "grove-research",
      chapter: "Primera prueba",
      eyebrow: "Primera versión",
      title: "La primera versión intentaba hacer demasiado.",
      body: [
        "Abría con publicaciones de otras personas y una misión, no con sus propias plantas. De marzo a mayo de 2026, la probé con cinco personas. Se atoraron justo ahí.",
        "Límite: las sesiones de prueba mostraron confusión, pero no guardé notas de cada tarea.",
      ],
    },
    {
      anchor: "grove-survey",
      chapter: "Encuesta",
      eyebrow: "Encuesta",
      title: "Luego 37 personas eligieron lo que la app necesitaba para lanzarse.",
      body: [
        "Del 22 de mayo al 16 de octubre, 37 personas respondieron una encuesta: 31 dueños y cuidadores de plantas, tres floristas y tres compradores de ramos. Cada una eligió tres funciones.",
        "Límite: una encuesta muestra lo que la gente dice que quiere. Me sirvió para ordenar lo próximo que construyo, pero no prueba lo que la gente haría de verdad.",
      ],
      bullets: [
        "Recordatorios inteligentes: 76%.",
        "Identificar la planta con la cámara (IA): 54%.",
        "Diagnóstico por foto (IA): 49%.",
      ],
    },
    {
      anchor: "grove-decisions",
      chapter: "Siguiente",
      eyebrow: "Lo que sigue",
      title: "El rediseño está planeado. Después, lo pruebo con personas.",
      body: [
        "Estos son planes para el próximo prototipo, no pantallas terminadas.",
        "Todavía no está construido: el rediseño pulido, las pantallas para momentos vacíos o de error, y una segunda ronda de pruebas.",
      ],
      bullets: [
        "Recordatorios: cambiar las misiones insistentes y las publicaciones por un solo resumen tranquilo por la mañana.",
        "Identificar la planta con la cámara: mostrar las mejores opciones, qué tan segura está y sus fuentes, no una sola respuesta que podría estar mal.",
        "Personalidad, no puntos: conservar la personalidad de la planta y quitar los puntajes que hacen que el cuidado se sienta como una tarea.",
      ],
    },
  ],
  otherProjects: [
    { title: "Proyecto de diseño de servicios para Memorial Sloan\u00a0Kettering Cancer\u00a0Center", desc: "MSK · Propuse la cola de archivo; TI y UX la construyeron.", path: "/case-study/msk" },
    { title: "Documentación freelance de tres apps financieras para\u00a0Mobbin", desc: "Mobbin · Tres apps financieras, con las pantallas etiquetadas por tarea.", path: "/case-study/mobbin" },
    { title: "Sprint de diseño de 2.5 semanas con una startup de tecnología educativa, dirigido por Yummy\u00a0Labs", desc: "Knowunity · Prototipo de recuerdo activo por voz, de un sprint de diseño; recuerdo simulado.", path: "/case-study/knowunity" },
  ],
  close: {
    title: "¿Quiere probar FloraGrove cuando esté listo?",
  },
};

// Condensed from FlagshipMSK.tsx, chapter by chapter (rebuilt 2026-10-15).
// Every claim is already on the English page; nothing is added. Chapter names
// match the English page's; section anchors match its ids, so Home's
// "cuatro reglas" link (#es-msk-decisions), the About proof links, and the
// language switch all land in place. Sustainment stays out of the chapter
// strip, as it does in English.
export const MSK_ES: SpanishCaseStudyData = {
  title: "Proyecto de diseño de servicios para Memorial Sloan\u00a0Kettering Cancer\u00a0Center",
  breadcrumb: "Memorial Sloan Kettering",
  meta: "Memorial Sloan Kettering · diseño de servicios",
  resultLine: { eyebrow: "Lo que cambió", text: "El personal ya no espera un escaneo." },
  intro:
    "Como coordinadora de oficina, mapeé cómo los mensajes del portal de pacientes pasaban por cuatro áreas. No se guardaban en la historia clínica electrónica del paciente (EMR, por sus siglas en inglés), así que los imprimíamos y esperábamos al equipo de escaneo. Propuse un botón Enviar al EMR para archivarlos directo. Los equipos de tecnología de la información (TI) y de experiencia de usuario (UX) del hospital construyeron la versión real.",
  stats: [
    // Two rows, matching the English hero (2026-10-16): the rest restated the
    // intro and the workflow section's provenance note.
    { label: "Puestos en MSK", value: "Coordinadora de oficina → Asistente administrativa → Facilitadora de capacitación" },
    { label: "Rol", value: "Diseño de servicios · mejora de procesos · UX/producto" },
  ],
  sections: [
    {
      anchor: "msk-brief",
      chapter: "Problema",
      eyebrow: "Empezó con un desvío",
      title: "Los mensajes en línea terminaban en papel.",
      body: [
        "El equipo de atención necesitaba ver al momento todo lo que estaba en la historia clínica del paciente. Mientras no terminaba el escaneo, pasaban de un sistema a otro para revisar los datos, o esperaban. Eso podía retrasar la atención del paciente.",
      ],
    },
    {
      anchor: "msk-workflow",
      chapter: "Lo que hice",
      eyebrow: "Así que conté los pasos",
      title: "Dibujé un mapa que las cuatro áreas podían ver.",
      body: [
        "Hablé con todas las áreas que tocaba el papel: clínica, TI, operaciones y HIM (gestión de información de salud). Aprendí el recorrido haciendo esos trabajos, hablando con cada área y revisando el rastro en papel. Trabajé con la dirección en la implementación. Repasé cada decisión con TI y UX en una propuesta completa.",
      ],
      bullets: [
        "Antes · seis pasos: abrir la cola del panel, encontrar el mensaje, imprimirlo, enviar el papel a HIM, esperar a que lo escaneen y volver después a revisar que se archivó.",
        "Después · cinco pasos: abrir la cola del panel, seleccionar el mensaje, elegir Enviar al EMR, que se archive en la historia del paciente y volver con el estado actualizado.",
      ],
    },
    {
      anchor: "msk-decisions",
      chapter: "Reglas del botón",
      eyebrow: "El arreglo parecía un solo botón",
      title: "Puse cuatro reglas sobre cómo funciona el botón.",
      body: [
        "TI y UX construyeron el botón real. Escribí estas reglas para esta versión del portafolio. No son el diseño real de MSK.",
        "Cómo las comprobaría: los minutos desde que llega un mensaje hasta que queda en la historia clínica, los mensajes archivados en la historia clínica del paciente equivocado y las páginas impresas.",
      ],
      bullets: [
        "Mostrar el botón solo cuando el mensaje está listo: así el personal no abre mensajes que todavía necesitan revisión.",
        "Mostrar quién puede archivar: el personal que solo puede ver recibe el estado y quién tiene el mensaje, no un botón gris sin explicación.",
        "Distinguir los mensajes atascados de los nuevos: un mensaje atascado recibe un motivo y una persona a cargo, para que no se esconda en la pila.",
        "Devolver a la gente a la cola: después de archivar, el personal vuelve a donde empezó, con el estado actualizado.",
      ],
    },
    {
      anchor: "msk-redesigns",
      chapter: "Más arreglos",
      eyebrow: "Luego apareció dos veces más",
      title: "Encontré el mismo problema en dos lugares más.",
      // Synthesis-lens review 2026-11-19: mirrors the English "my reading" line,
      // which is true of both cards.
      body: ["Mi lectura del patrón: la capacitación de RCP (reanimación cardiopulmonar) y la de nuevos empleados estaban escritas para alguien que no era la persona que las usaba."],
      bullets: [
        "Certificación de RCP: el curso estaba escrito en lenguaje técnico y legal, así que el personal clínico no lo terminaba. Lo reescribí en lenguaje sencillo. Toda el área se certificó un mes antes de la fecha límite original.",
        "Capacitación del nuevo personal de oficina: todos los nuevos empleados recibían el mismo curso, sin importar cuánto sabían. Adapté el programa de una a tres semanas a cada grupo, según quién estaba en la sala.",
      ],
    },
    {
      anchor: "msk-systems",
      chapter: "Trasfondo",
      eyebrow: "Por qué pude verlo",
      title: "Hice los trabajos antes de rediseñarlos.",
      body: [
        "Un problema así no se ve desde fuera.",
        "Mi alcance: todo el camino que recorría el mensaje, entre software, áreas, quién podía hacer qué y cada traspaso. No solo una pantalla.",
        "Lo que esto prueba y lo que no: mis notas conservaron el camino, las áreas, las decisiones y los resultados. No anoté a cuántas personas observé en sus turnos, así que esto explica las decisiones, pero no prueba qué tan común era el problema.",
      ],
      bullets: [
        "01 · Coordinadora de oficina: dónde se atascaba la gente. En este puesto terminé el Lean Six Sigma Green Belt (Purdue) y la Maestría en Administración de Salud (Rutgers), mientras llevaba el papeleo de una clínica. El Green Belt es un certificado para mejorar cómo se hace el trabajo. Así vi una tarea de archivo pasar por cuatro áreas.",
        "02 · Asistente administrativa: cómo escribir para quien hace la tarea. No hay certificado para esto.",
        "03 · Facilitadora de capacitación: la autoridad para rediseñarlo. Enseñé Epic (el software de la historia clínica), HIPAA (la ley de privacidad del paciente) y los cursos de cumplimiento. Para enseñar bien el sistema, anoté lo que el personal hacía de verdad, no lo que decía la política. La diferencia entre las dos cosas es donde está el trabajo de diseño.",
      ],
    },
    {
      anchor: "msk-sustainment",
      chapter: false,
      eyebrow: "La prueba de verdad llegó después",
      title: "Lo que pasó después de que dejé ese puesto.",
      body: [
        "TI estaba en medio de una gran renovación, y el plan necesitaba financiamiento para un puesto permanente: alguien que supervisara la parte digital del escaneo y del EMR. TI lo aprobó cuando llegó el financiamiento y lo construyó tal como lo propuse. No sé qué cambió por detrás. Más tarde, mientras capacitaba a nuevos empleados, lo vi en el sistema en uso.",
        "Un desvío personal pasó a ser parte del sistema compartido. El curso en lenguaje sencillo logró que el área se certificara antes de la fecha límite.",
        "Lo que habría medido: que yo sepa, nadie lo midió. Habría seguido tres cosas: los minutos desde que llega un mensaje hasta que queda en la historia clínica, los mensajes archivados en la historia clínica del paciente equivocado y las páginas impresas.",
      ],
      bullets: [
        "Archivar en la historia clínica: se agregó al sistema en uso.",
        "Reescritura del curso de RCP: toda el área se certificó un mes antes de la fecha límite original. No hizo falta prórroga.",
      ],
    },
    {
      anchor: "msk-outcomes",
      chapter: "Resultados",
      eyebrow: "A cuánto sumó",
      title: "Qué cambió, y a quién le corresponde el mérito.",
      body: [
        "Como coordinadora, impulsé la idea de archivar los mensajes del portal directo en la historia clínica en línea. Se construyó a partir de mi propuesta dos puestos después. También reescribí el curso de RCP para el personal clínico que lo tomaba. Y, con el equipo de diseño, rehíce la capacitación del nuevo personal de oficina: Epic, HIPAA, cumplimiento y las habilidades sociales del puesto.",
        "El 20% no se atribuye solo a la cola de archivo · los ~$1M/año son una proyección de mi propuesta, no un ahorro medido.",
      ],
      bullets: [
        "Dirigí · 1 mes antes: toda el área se certificó antes de la fecha límite original, sin la prórroga de 4 meses.",
        "Capacité · ~2,000: nuevos empleados que capacité en Epic, HIPAA y cumplimiento. Mi estimación: más o menos un grupo de 30 por semana durante dos años.",
        "Resultado de la iniciativa · 20%: menos costos de impresión y escaneo en 2018–2019, según mi revisión de las cifras con la persona a cargo del departamento de finanzas; no se atribuye solo a este flujo de archivo.",
        "Proyección · ~$1M/año: ahorro proyectado en papel en mi propuesta para la Feria de Mejora de Procesos, no un ahorro medido.",
      ],
    },
  ],
  otherProjects: [
    { title: "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento", desc: "FloraGrove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "Documentación freelance de tres apps financieras para\u00a0Mobbin", desc: "Mobbin · Tres apps financieras, con las pantallas etiquetadas por tarea.", path: "/case-study/mobbin" },
  ],
  close: {
    title: "Encuentro el desvío. Después logro que se construya.",
    body: "Lo mapeo para que cada área vea el mismo problema. Luego lo convierto en un plan que el hospital va a construir.",
  },
};

// Condensed from FlagshipMobbin.tsx and MobbinIndexLens.tsx, chapter by
// chapter (rebuilt 2026-10-15). Nothing is added beyond the English page;
// chapter names and section anchors match it.
export const MOBBIN_ES: SpanishCaseStudyData = {
  title: "Documentación freelance de tres apps financieras para\u00a0Mobbin",
  breadcrumb: "Mobbin",
  meta: "Mobbin · Etiquetado de pantallas de apps · tres apps financieras",
  intro:
    "Mobbin es un sitio donde los diseñadores buscan capturas de apps reales para inspirarse. Como freelance, pasé cuatro meses con tres apps: Kikoff, Polymarket y Discover. No diseñé estas apps ni Mobbin.",
  resultLine: {
    eyebrow: "Lo que hice",
    text: "Tomé capturas de más de 200 pantallas por app y etiqueté cada una por tarea, para que los diseñadores puedan encontrarla.",
  },
  stats: [
    { label: "Cliente", value: "Mobbin · trabajo freelance" },
    { label: "Tiempo", value: "Contrato de cuatro meses" },
    { label: "Entrega", value: "3 apps · más de 200 pantallas cada una · una biblioteca buscable" },
  ],
  sections: [
    {
      anchor: "mobbin-brief",
      chapter: "Problema",
      eyebrow: "El método · criterio antes de capturar",
      title: "Una sola captura no muestra la tarea completa.",
      body: [
        "Los diseñadores llegan a Mobbin para ver cómo las apps resuelven una tarea, como iniciar sesión o abrir una cuenta.",
      ],
    },
    {
      anchor: "mobbin-work",
      chapter: "Qué hice",
      eyebrow: "Una captura tiene que encontrarse después",
      title: "Nombrar la tarea, no solo la app.",
      body: [
        "Dejé cada captura original intacta y nombré la tarea a su lado con el vocabulario de la biblioteca.",
      ],
    },
    {
      anchor: "mobbin-decisions",
      chapter: "Decisiones",
      eyebrow: "Cuatro decisiones · un sistema de documentación",
      title: "Elegir qué conservar fue el trabajo.",
      body: [],
      bullets: [
        "Capturar la tarea completa: usar la app como lo haría una persona real. Conservar las pantallas vacías, los mensajes de error y las pantallas que solo tienen sentido en orden.",
        "Recortar lo que no ayuda: las pantallas de bienvenida de marketing no merecían el mismo espacio que registrarse, pagar, manejar una cuenta o volver a entrar a ella.",
        "Usar las palabras de Mobbin: una pantalla solo se encuentra fácil cuando su etiqueta coincide con lo que otro diseñador escribe en el buscador, no con las palabras que a mí me gustan.",
        "Escribir para alguien que nunca voy a conocer: cada nota dice qué hace la pantalla, en qué parte de la app aparece y por qué importa, para que nadie necesite tener la app abierta.",
      ],
    },
    {
      anchor: "mobbin-apps",
      chapter: false,
      eyebrow: "Las apps",
      title: "Kikoff muestra el avance. Polymarket muestra el riesgo. Discover se siente familiar.",
      body: ["Las pantallas están en Mobbin Finance+, la biblioteca a la que se integraron."],
      bullets: [
        "Kikoff · construcción de crédito: el registro es largo, pero cada paso te devuelve algo: un puntaje, un plan o una señal de que funcionó.",
        "Polymarket · apuestas sobre eventos reales: antes de poner dinero, las probabilidades, las reglas de cómo se paga una apuesta y el riesgo quedan a la vista.",
        "Discover · banca: la app se parece a las apps de bancos y tarjetas que la gente ya conoce. La letra pequeña es fácil de encontrar.",
      ],
    },
    {
      anchor: "mobbin-outcomes",
      chapter: "Resultados",
      eyebrow: "A cuánto sumó",
      title: "Un registro buscable de cómo funcionan tres apps\u00a0financieras.",
      body: [
        "Mis capturas y etiquetas entraron en la biblioteca Finance+ de Mobbin.",
      ],
    },
  ],
  otherProjects: [
    { title: "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento", desc: "FloraGrove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "Proyecto de diseño de servicios para Memorial Sloan\u00a0Kettering Cancer\u00a0Center", desc: "MSK · Propuse la cola de archivo; TI y UX la construyeron.", path: "/case-study/msk" },
  ],
  // The closing line was cut (2026-11-20, matching the English page): the
  // page ends on the outcomes, then the contact buttons.
  close: {},
};

// Condensed from FlagshipLogistics.tsx. Every figure and limit here is already
// on the English page; nothing is added. Section anchors match the English
// chapter ids so the language switch and homepage stat links land in place.
export const LOGISTICS_ES: SpanishCaseStudyData = {
  breadcrumb: "Logística médica del Ejército",
  // Worded to break into multi-word lines; "reabastecimiento" alone filled a line.
  title: "Diseño de servicios para el suministro médico del Ejército de EE.\u00a0UU., con reabastecimiento de 1–2 meses a 1–2\u00a0semanas",
  meta: "Logística médica del Ejército · Operaciones · Diseño de servicios · 2024",
  intro:
    "En un despliegue de la Guardia Nacional del Ejército en Irak y dos países vecinos, estuve a cargo de los suministros médicos de siete estaciones de ayuda, donde primero se atiende a los soldados heridos. Cuando llegué, reabastecerlas tardaba 1–2 meses. Propuse acercar nuestro almacén, y luego planifiqué y di seguimiento a la mudanza.",
  /* Interview-sourced human line (Better Stories pass, 2026-11-10). Spanish is a draft translation for Hillary to review. */
  humanLine: "Yo estaba a cargo de llevar vacunas contra la rabia a tres países. Una vez, las entregué yo misma.",
  // The result sentence lives only here (cut from the intro, 2026-11-19); 1–2 kept together with a word joiner, as on the English page.
  resultLine: {
    eyebrow: "Lo que cambió",
    text: "Después, reabastecerlas tardaba 1–\u20602\u00a0semanas, según mi Informe de Evaluación de Oficial.",
    source: "Mi Informe de Evaluación de Oficial es la evaluación escrita que el Ejército hace de mi trabajo.",
  },
  stats: [
    { label: "Rol", value: "Oficial de logística médica · dirigí la mudanza del almacén y el reabastecimiento de las estaciones" },
    { label: "Tamaño", value: "5,000+ soldados de Nueva Jersey · $2M en suministros" },
  ],
  sections: [
    {
      anchor: "log-brief",
      eyebrow: "Por qué importaba la rapidez",
      title: "Una entrega tardía ponía en riesgo a los soldados\u00a0heridos.",
      body: [
        "Ninguna estación podía esperar 1–2 meses por suministros.",
      ],
    },
    {
      anchor: "log-moves",
      eyebrow: "Lo que hice",
      title: "Moví el almacén. Después arreglé cómo pedían las\u00a0estaciones.",
      body: [
        "Hice el trabajo físico de la mudanza con mi equipo. Después, las estaciones pidieron seguir sus propios pedidos.",
      ],
      bullets: [
        "Acerqué el almacén: cada entrega de suministros empezaba demasiado lejos de las estaciones de ayuda. Planifiqué y di seguimiento a la mudanza de $2M en suministros. Movimos primero lo más esencial, y dividí al equipo para que todas las estaciones siguieran recibiendo suministros durante la mudanza.",
        "Una sola forma de pedir para todas las estaciones: cada una de las siete estaciones pedía y reportaba en su propio formato. Creé una forma compartida de pedir y le enseñé a cada estación a usarla y qué significaba cada estado del pedido.",
        "Cada estación puede seguir sus pedidos: nadie veía dónde estaba un pedido, así que las estaciones pedían de más o se quedaban sin nada. Creé un sistema en línea que le mostraba a cada estación sus pedidos a medida que cambiaba su estado. Su trabajo era evitar que una estación “se quedara en negro”, es decir, sin suministros.",
      ],
    },
    {
      anchor: "log-status",
      chapter: false,
      eyebrow: "Cómo se ve",
      title: "El estado de los pedidos, antes y después.",
      body: [
        "Recreado para explicar la idea. No es el sistema original y no hay datos reales.",
      ],
      bullets: [
        "Antes, estaciones 1 a 6: estado no visible. Estación 7: sin suministros, descubierto tarde.",
        "Después, estaciones 1 a 7: recibido, en tránsito, aprobado, solicitado, en tránsito, recibido y, en la estación 7, queda poco: pedir ahora.",
      ],
    },
    {
      anchor: "log-constraints",
      eyebrow: "Límites",
      title: "Tres límites dentro de los que tuve que trabajar.",
      body: [],
      bullets: [
        "Vacunas en frío · 48 horas: si llegaban tarde, ya no se podían usar.",
        "Tres países: cada uno con sus propios sistemas y sus propias palabras para las cosas.",
        "Zona de combate · $2M en suministros: sin ensayo previo y sin margen de error.",
      ],
    },
    {
      anchor: "log-outcomes",
      eyebrow: "A cuánto sumó",
      title: "Los suministros llegaron más rápido y costaron menos.",
      body: [
        "Las tres cifras vienen de mi Informe de Evaluación de Oficial. No se guardaron registros de cómo ni durante qué periodo se midieron. Aquí no se describen posiciones, rutas ni ubicaciones de unidades.",
      ],
      bullets: [
        "1–2 semanas: para reabastecer suministros médicos después de acercar el almacén, antes 1–2 meses · cerca de 85% más rápido, mi estimación.",
        "60%: menos gasto, con los suministros todavía disponibles, cuando las estaciones pudieron ver sus pedidos y dejaron de pedir de más o de quedarse sin nada.",
        "15%: entrega más eficiente de suministros críticos después de crear una forma compartida de comunicarnos. Mi estimación.",
      ],
    },
  ],
  otherProjects: [
    { title: "Proyecto de diseño de servicios para Memorial Sloan\u00a0Kettering Cancer\u00a0Center", desc: "MSK · Propuse la cola de archivo; TI y UX la construyeron.", path: "/case-study/msk" },
    { title: "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento", desc: "FloraGrove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
  ],
  close: {
    title: "Las cadenas de suministro del Ejército y el papeleo de una clínica fallan de la misma manera.",
    body: "En el Ejército, las entregas de suministros empezaban demasiado lejos de las estaciones de ayuda. En el hospital, los mensajes de los pacientes se imprimían y escaneaban antes de llegar a la historia clínica. En los dos trabajos, moví el paso que estaba en el lugar equivocado.",
  },
};

// Condensed from FlagshipKnowunity.tsx. Nothing is added beyond the English
// page; Knowunity's internal numbers stay off both. Section anchors match the
// English chapter ids so the language switch lands in place.
export const KNOWUNITY_ES: SpanishCaseStudyData = {
  title: "Sprint de diseño de 2.5 semanas con una startup de tecnología educativa, dirigido por Yummy\u00a0Labs",
  breadcrumb: "Knowunity",
  meta: "Knowunity · Sprint de diseño · Prototipo móvil interactivo · Recuerdo simulado",
  intro:
    "En el sprint (un reto de diseño con tiempo limitado), trabajé sola en un encargo real de Knowunity, una app de estudio cuya mascota es Knowie. Diseñé y construí un prototipo funcional. Todavía no puede escuchar ni calificar voz real, y ningún estudiante lo ha probado.",
  /* Interview-sourced human line (Better Stories pass, 2026-11-10). Spanish is a draft translation for Hillary to review. */
  resultLine: {
    eyebrow: "Lo que construí",
    text: "El estudiante explica una idea en voz alta y, cuando acierta, Knowie le muestra sus propias palabras.",
  },
  stats: [
    { label: "Rol", value: "Participación individual · Yummy Labs AI Design Sprint · encargo y kit de diseño de Knowunity" },
    { label: "Encargo", value: "El estudiante habla, Knowie responde con texto · iOS, 390px de ancho, modo oscuro · la escucha es simulada" },
    { label: "Resultado", value: "Insignia AI Design Sprinter de Yummy Labs · revisado por Knowunity · no es parte de la app real de Knowunity" },
  ],
  sections: [
    {
      anchor: "knowunity-brief",
      eyebrow: "Dónde empieza esto",
      title: "Knowunity quería que los estudiantes demostraran que recuerdan.",
      body: [
        "Después de estudiar, el estudiante ya vio el material, pero no ha demostrado que pueda recordarlo por su cuenta. Los pasos de práctica de la app revisan si reconoces o usas la respuesta correcta. No te piden que la expliques. Knowunity quería un momento en que el estudiante sienta: “esto ya lo sé”.",
        "Dos metas: que más de los estudiantes que ven el nuevo paso lo empiecen, y que más de los que lo empiezan lo terminen.",
        "A mitad del sprint, Knowunity lanzó su propia versión de prueba sencilla (una beta). El encargo pedía tratarla como el primer intento de un equipo y encontrar una versión más fuerte, no copiarla.",
      ],
      bullets: [
        "Voz de entrada, texto de salida: el estudiante habla. Knowie solo responde con texto.",
        "Pulsar para hablar: el estudiante inicia y detiene la grabación, así la app nunca adivina cuándo terminó.",
        "Siempre hay una salida: todo lo que el estudiante tiene que hacer tiene otro camino, como escribir cuando no puede hablar en ese momento.",
      ],
    },
    {
      anchor: "knowunity-decisions",
      eyebrow: "Cuatro decisiones que tomé, aún sin probar",
      title: "Hice que el estudiante sea quien demuestra, no Knowie.",
      body: ["No se puede obligar a un estudiante a explicar en voz alta. Por eso, cada uno de estos cuatro cambios le facilita seguir."],
      bullets: [
        "Mostrarle sus palabras: cuando acierta, Knowie le muestra lo que dijo. Mi suposición, aún sin probar con estudiantes: ver sus propias palabras demuestra que puede recordarlas.",
        "Repetir cuando esté listo: una pregunta fallada antes volvía sola al final. Ahora el resumen ofrece “Practicar lo que fallé”.",
        "Pedir el micrófono cuando hace falta: la primera pregunta aparece enseguida, sin pantalla de introducción. La app pide usar el micrófono solo cuando el estudiante lo toca.",
        "Decir qué pasa después de cada fallo: primer fallo, una pista. Segundo, una pista de completar el espacio, más “Un intento más y luego te muestro la respuesta”. Tercero, la respuesta.",
      ],
    },
    {
      anchor: "knowunity-prototype",
      eyebrow: "Cómo lo construí",
      title: "Construí una versión que se puede tocar y recorrer, no diapositivas.",
      body: [
        "Knowunity me dio a Knowie, la fuente Greed, su kit de diseño en Figma (una herramienta de diseño) y acceso a la app real y a la beta. Yo hice las pantallas, las decisiones y el código: un prototipo en Next.js con 43 páginas, del tamaño de un teléfono (390px de ancho), en modo oscuro. Además, un Storybook, un catálogo de sus piezas, construido sobre su kit. Claude Code, una herramienta de inteligencia artificial (IA) para programar, escribió la mayor parte del código a partir de mis planes escritos.",
      ],
      // Same asset as the English page. The reel's on-screen text is in
      // English; the list translates it and the note says so.
      reel: {
        src: "/assets/knowunity/say-it-back-sizzle-720.mp4",
        poster: "/assets/knowunity/say-it-back-sizzle-poster.jpg",
        captionsSrc: "/assets/knowunity/say-it-back-sizzle-captions-en.vtt",
        kicker: "El video de 52 segundos",
        label: "Say It Back, el video de 52 segundos",
        caption: "La escucha es simulada: todavía no puede oír ni calificar voz real.",
        transcriptSummary: "Qué muestra el video",
        transcript: [
          "Knowie le indica por dónde empezar",
          "Explíquelo con sus propias palabras",
          "Dígalo en voz alta. Knowie escucha.",
          "Revise lo que oyó. Diga qué tan seguro está.",
          "Las propias palabras del estudiante son la prueba",
          "Dos tipos de error. Dos tipos de ayuda. (El micrófono no lo captó / A medias)",
          "Vea lo que retuvo",
          "Luego recupere lo que falló",
          "Tarjeta final: Say It Back: Explíquelo. Demuestre que lo retuvo.",
        ],
        transcriptNote: "Solo música, sin narración. El texto en pantalla está en inglés.",
      },
    },
    {
      anchor: "knowunity-outcomes",
      eyebrow: "Resultado",
      title: "Yummy Labs me dio una insignia, y Knowunity revisó el\u00a0trabajo.",
      body: [
        "La escucha es simulada: en el prototipo, cuánto tiempo mantienes el micrófono decide el resultado, porque no entiende el habla. No se probó con estudiantes. No es parte de la app real de Knowunity.",
        "Siguiente paso: una versión que convierta la voz real en texto, frente a estudiantes.",
      ],
      credential: {
        ...KNOWUNITY_BADGE_ASSET,
        alt: "Insignia de Yummy Labs: Hillary Esposito, AI Design Sprinter, completó el Yummy Labs AI Design Sprint en colaboración con Knowunity, septiembre de 2026.",
        caption: "Insignia AI Design Sprinter · Yummy Labs AI Design Sprint, en colaboración con Knowunity · sept. 2026",
        linkLabel: "Verificar en LinkedIn",
        newTabLabel: " (se abre en una pestaña nueva)",
      },
    },
  ],
  otherProjects: [
    { title: "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento", desc: "FloraGrove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
    { title: "Diseño de servicios para el suministro médico del Ejército de EE.\u00a0UU., con reabastecimiento de 1–2 meses a 1–2\u00a0semanas", desc: "Logística médica del Ejército · siete estaciones de ayuda, tres países.", path: "/case-study/logistics" },
  ],
  close: {
    title: "Construyo versiones que funcionan para saber qué probar después.",
    body: "Say It Back muestra cómo trabajo: construirlo, decir qué es simulado y nombrar la siguiente prueba.",
  },
};

// Condensed from FlagshipUxWoman.tsx. Nothing is added beyond the English
// page: no outcome, no patient claim. Interviewees stay anonymized, by role
// only. Section anchors match the English chapter ids so the language switch
// lands in place.
export const UXWOMAN_ES: SpanishCaseStudyData = {
  title: "Investigación en salud basada en los requisitos cambiantes de\u00a0Medicaid",
  breadcrumb: "UX Woman",
  meta: "UX Woman · Investigación en salud · Guía para una carta de Medicaid",
  intro:
    "UX Woman es una aceleradora de diseño de experiencia de usuario (UX) de 7 meses, guiada por mentores. Entrevisté a seis personas que trabajan en clínicas y aseguradoras. Luego diseñé una guía para una carta pública de muestra de Medicaid de Nueva York, el programa público de seguro médico, sobre su nuevo requisito de trabajo.",
  /* Interview-sourced human line (Better Stories pass, 2026-11-10). Spanish is a draft translation for Hillary to review. */
  humanLine: "Un líder de hospital me dijo: la IA (inteligencia artificial) ayuda a los hospitales a prepararse y a las aseguradoras a denegar.",
  // "La guía empieza por la carta…" is said once, here; "No está probada" stays in the intro too as the honesty limit.
  resultLine: {
    eyebrow: "En qué punto está",
    text: "Diseñé una guía que empieza por la carta que tienes en la mano. No está probada.",
    source: "No se entrevistó a ningún paciente.",
  },
  stats: [
    { label: "Rol", value: "Investigadora y diseñadora en solitario · 2026" },
    { label: "Evidencia", value: "Seis entrevistas con personal de clínicas y aseguradoras · seis fuentes públicas · ninguna entrevista con pacientes" },
    { label: "Hice", value: "Mapa de afinidad · persona · mapas de recorrido · flujos · wireframes · prototipo de alta fidelidad" },
    { label: "Estado", value: "Construida, sin probar · dos pruebas planificadas" },
  ],
  sections: [
    {
      anchor: "uxwoman-problem",
      eyebrow: "Problema",
      title: "Si no respondes a tiempo, puedes perder la cobertura.",
      body: [
        "La carta le avisa a la gente de una nueva regla: algunas personas tienen que mostrar horas de trabajo o ingresos, o mostrar que la regla no les aplica.",
        "Pronóstico para Nueva York: al menos 475,000 personas podrían perder la cobertura, según calcula el Departamento de Salud de Nueva York. Ya pasó en Arkansas en 2018: 18,164 personas perdieron la cobertura bajo un requisito de trabajo. Son datos públicos. Una cifra es un pronóstico y la otra es un conteo real, así que no se comparan directamente.",
      ],
    },
    {
      anchor: "uxwoman-research",
      eyebrow: "Entrevistas",
      title: "De las entrevistas salieron seis temas.",
      body: [
        // Hillary's themes line (2026-11-16); Spanish is a draft for her review.
        "Mientras aprendía sobre rechazos y autorizaciones previas (cuando el seguro tiene que aprobar la atención primero), vi que algunos cambios en las reglas de Medicaid podrían dejar a pacientes sin cobertura en el próximo año. Quiero ayudar al personal que guía a los pacientes en esos cambios.",
        "Por cada entrevista, agrupé mis notas por tema en un tablero. También usé seis fuentes públicas. No se nombra a nadie y no recopilé información privada de salud.",
      ],
      bullets: [
        "Nadie es claramente responsable: el personal no ve quién tiene una solicitud ni dónde está.",
        "La vida se atraviesa: la vivienda, el transporte y el cuidado de otras personas pueden cambiar el plan.",
        "Seguimiento a mano: el personal da seguimiento por teléfono, por fax y con muchos clics.",
        "La IA ayuda, una persona revisa: el personal todavía revisa lo que produce la herramienta de IA.",
        "Probar que el tratamiento es necesario: las aseguradoras dicen que no según el papeleo. Añadido tras una segunda revisión con IA.",
        "Las reglas de las aseguradoras no son claras: cambian de una aseguradora a otra y las razones son difíciles de encontrar. Añadido tras una segunda revisión con IA.",
      ],
    },
    {
      anchor: "uxwoman-findings",
      eyebrow: "Ideas para probar",
      title: "Hice dos suposiciones que se pueden probar.",
      body: [
        "Suposición 1, sobre la carta: la carta pública de muestra omite, esconde o deja confusa al menos una cosa que el lector necesita. Prueba: revisar la carta con la lista de abajo.",
        "Suposición 2, sobre el lector: quienes la leen no pueden saber qué les aplica, para cuándo ni qué cuenta como prueba. Prueba: hacerles preguntas a los lectores sobre la carta.",
        "Seis cosas que el lector necesita saber: en qué punto está todo, qué falta, quién actúa después, la fecha límite, una persona a quien llamar y qué cuenta como prueba.",
      ],
    },
    {
      anchor: "uxwoman-guide",
      eyebrow: "Guía",
      title: "La guía que hice.",
      body: [
        "Una pregunta elige el camino: ¿hay una fecha en la carta? Si la hay, la guía muestra lo que pide la carta y luego una lista de pasos con un botón que agrega la fecha límite a tu calendario. Si no, muestra dónde encontrar la fecha y cómo hablar con una persona. Cada pantalla tiene un botón para hablar con una persona.",
        "Mi segunda idea es una hoja de estado para el personal de la clínica: quién tiene cada solicitud abierta, qué falta y quién actúa después. Responde una pregunta: ¿el siguiente paso me toca a mí? Es un concepto de diseño, no un aviso oficial.",
      ],
    },
    {
      anchor: "uxwoman-next",
      eyebrow: "Siguiente paso",
      title: "Construida, aún sin probar.",
      body: [
        "Prueba 1, revisión de la carta: calificar la carta de muestra según las seis cosas que el lector necesita saber. La suposición 1 se sostiene si al menos una falta o no está clara.",
        "Prueba 2, preguntas a lectores: adultos de 19 a 64 años responden cuatro preguntas sobre la carta y luego dicen qué más necesitaban. Fijaré la calificación para aprobar antes de hacer la prueba.",
        "Versión 1: construida, sin probar. Versión 2: solo si las pruebas encuentran vacíos. Versión 3: solo si el estado aprueba una forma de ofrecerla.",
      ],
    },
  ],
  otherProjects: [
    { title: "Sprint de diseño de 2.5 semanas con una startup de tecnología educativa, dirigido por Yummy\u00a0Labs", desc: "Knowunity · Sprint de diseño, recuerdo por voz simulado.", path: "/case-study/knowunity" },
    { title: "Diseño de producto e investigación para FloraGrove, una app de cuidado de plantas antes de su\u00a0lanzamiento", desc: "FloraGrove · Prototipo funcional de cuidado de plantas, Fase 2 de 3.", path: "/case-study/grove" },
  ],
  close: {
    title: "De una carta a un siguiente paso.",
    body: "Primero la auditoría de la carta, después la prueba con lectores.",
  },
};
