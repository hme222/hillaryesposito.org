/**
 * MSK case study copy, in both languages.
 *
 * Why this file exists: until now the Spanish route returned a summary
 * (SpanishCaseStudy + MSK_ES) while English got the full page — the runnable
 * filing receipt, the workflow map, the service blueprint, the decision story.
 * For a healthcare portfolio that advertises "Bilingual EN/ES", shipping
 * nominal language access without functional parity is the exact failure mode
 * the work is supposed to understand. So the page now renders one component
 * tree and reads its words from here.
 *
 * Rules for editing:
 * - Every claim must exist in both locales or in neither. The numbers are
 *   identical, and Spanish uses the Latin American comma separator (22,937).
 * - Spanish avoids gendering the first person. Verbs carry the meaning
 *   ("rediseñé", "mapeé") so no adjective has to pick a gender.
 * - Diagram labels live here too. A Spanish reader should not meet English
 *   words inside an illustration.
 */

export type Lang = "en" | "es";

export type MskCopy = {
  pageTitle: string;
  breadcrumb: { work: string; here: string };
  jumpLabel: string;
  chapters: { id: string; label: string }[];

  hero: {
    eyebrow: string;
    title: string;
    readTime: string;
    readMeta: string;
    ledeOpen: string;
    ledeScale: string;
    ledeMiddle: string;
    ledeSustain: string;
    ledeClose: string;
    cta: string;
    artifactTag: string;
    artifactName: string;
    dashboardAria: string;
  };

  receipt: {
    kicker: string;
    /** Two phrase lines; desktop sets each on its own line (no stranded word). */
    titleLines: [string, string];
    body: string;
    run: string;
    replay: string;
    ready: string;
    steps: string[];
    boundary: string;
  };

  workflow: {
    kicker: string;
    title: string;
    lede: string;
    figcaption: string;
    beforeLabel: string;
    beforeHeading: string;
    afterLabel: string;
    afterHeading: string;
    before: string[];
    after: string[];
    mapBefore: string;
    mapAfter: string;
    mapAside: string;
    mapNodesBefore: string[];
    mapNodesAfter: string[];
    provenanceKicker: string;
    provenanceBody: string;
  };

  blueprint: {
    introKicker: string;
    introTitle: string;
    introLede: string;
    beforeBtn: string;
    afterBtn: string;
    statusBefore: string;
    statusAfter: string;
    lanes: { evidence: string; front: string; back: string; support: string };
    laneSubs: { evidence: string; front: string; back: string; support: string };
    visibility: string;
    waiting: string;
    noSignal: string;
    nodesBefore: string[];
    nodesAfter: string[];
    key: {
      frontTerm: string; frontBefore: string; frontAfter: string;
      backTerm: string; backBefore: string; backAfter: string;
      supportTerm: string; supportBefore: string; supportAfter: string;
      changedTerm: string; changedBefore: string; changedAfter: string;
    };
    switchAria: string;
  };

  dashboard: {
    groupAria: string;
    tableAria: string;
    eyebrow: string;
    title: string;
    roleView: string;
    queueMeta: string;
    toolbar: string[];
    columns: { patient: string; document: string; status: string; routedTo: string; action: string };
    /** `slug` is structural: it drives status colour and the primary-action style,
     *  so styling never depends on matching a translated string. */
    rows: { mrn: string; received: string; doc: string; status: string; slug: string; routed: string; action: string }[];
    mrnTerm: string; mrnDef: string;
    emrTerm: string; emrDef: string;
    /** Summary text when the MRN/EMR legend is a closed disclosure. */
    legendSummary: string;
    ruleLabel: string; ruleAction: string; rule: string;
  };

  decisions: {
    kicker: string;
    title: string;
    intro: string;
    steps: { n: string; title: string; body: string; note: string }[];
  };

  redesigns: {
    kicker: string;
    title: string;
    lede: string;
    wrongLabel: string;
    items: { n: string; title: string; finding: string; change: string; wrong?: string }[];
    mechanismLabels: {
      before: string; after: string;
      dashboard: string; paper: string; chart: string;
      beforeProse: string; denseBlock: string; afterSteps: string;
      beforeCohort: string; sameStandard: string;
    };
  };

  systems: {
    kicker: string;
    title: string;
    lede: string;
    rolesAria: string;
    methodLabel: string;
    roles: { n: string; role: string; taught: string; term: string; body: string }[];
    cards: { tag: string; title: string; body: string }[];
    ownershipLabel: string;
    ownershipBody: string;
    boundaryAria: string;
    boundaryLabel: string;
    boundaryBody: string;
    mapFallback: string;
    mapStagesAria: string;
    mapStages: string[];
  };

  sustainment: {
    kicker: string;
    title: string;
    lede: string;
    figcaption: string;
    shipped: string;
    lanes: { name: string; events: { at: number; label: string }[]; outcome: string }[];
    survived: { fact: string; what: string }[];
    why: string;
    proofLabel: string;
    proofTitle: string;
    proofAria: string;
  };

  outcomes: {
    kicker: string;
    title: string;
    intro: string;
    disclaimer: string;
    metrics: { tag: string; n: string; label: string }[];
    route: string[];
  };

  close: { title: string; body: string; cta: string };
  next: { eyebrow: string; title: string; tag: string };
};

const en: MskCopy = {
  pageTitle: "MSK — Clinical Systems Case Study",
  breadcrumb: { work: "Work", here: "Memorial Sloan Kettering" },
  jumpLabel: "Jump to",
  chapters: [
    { id: "msk-start", label: "Start" },
    { id: "msk-brief", label: "Problem" },
    { id: "msk-workflow", label: "Workflow" },
    { id: "msk-decisions", label: "Decisions" },
    { id: "msk-redesigns", label: "Redesigns" },
    { id: "msk-systems", label: "Context" },
    { id: "msk-outcomes", label: "Outcomes" },
  ],

  hero: {
    eyebrow: "Memorial Sloan Kettering · clinical systems",
    title: "A filing queue replaced a four-department paper detour.",
    readTime: "6 min",
    readMeta: "read · 6 years, 3 roles",
    ledeOpen:
      "Patient-portal messages lived in the portal, not the patient's chart, so staff printed them to be scanned in. As an office coordinator, I mapped that workaround across clinical, IT, HIM (health information management, the team that scans documents into charts), and operations, then presented the online workflow that was implemented two roles later. It served work touching ",
    ledeScale: "21,000+ clinicians and staff",
    ledeMiddle: ", and it is ",
    ledeSustain: "owner-reported as adopted organization-wide",
    ledeClose: ".",
    cta: "See the workflow →",
    artifactTag: "RECREATED ARTIFACT",
    artifactName: "Office Coordinator filing queue",
    dashboardAria: "Recreated Office Coordinator filing queue concept",
  },

  receipt: {
    kicker: "It started with a workaround",
    titleLines: ["A digital workflow", "became a paper\u00a0ritual."],
    body:
      "Patient-portal messages (patients’ questions and clinicians’ replies) lived in the portal, not in the patient’s chart, the electronic medical record (EMR), so staff printed them to be scanned into the chart. Every printed message is a chance for patient information to travel, get filed to the wrong chart, or go missing before the next visit.",
    run: "Run the online path",
    replay: "Replay the online path",
    ready: "Ready to file.",
    steps: ["Queue opened", "Role confirmed", "Filed to the online chart", "Returned with status updated"],
    boundary: "Recreated interaction",
  },

  workflow: {
    kicker: "So I counted the steps",
    title: "One map made four departments see the same failure.",
    lede:
      "Nobody had written the whole path down. On one page, four departments saw the same failure instead of four versions of it.",
    figcaption: "Recreated current-state and future-state map · no patient data",
    beforeLabel: "Before · six steps",
    beforeHeading: "Print, route, wait, check again",
    afterLabel: "After · five steps",
    afterHeading: "File from the queue, return with status",
    before: [
      "Open the dashboard queue",
      "Find the message",
      "Print the portal message",
      "Route the paper to HIM",
      "Wait for it to be scanned",
      "Return later to confirm filing",
    ],
    after: [
      "Open the dashboard queue",
      "Select the message",
      "Choose Send to EMR",
      "It files to the patient’s chart",
      "Return with status updated",
    ],
    mapBefore: "BEFORE · 6 STEPS · LEAVES THE EMR",
    mapAfter: "AFTER · 5 STEPS · NEVER LEAVES THE EMR",
    mapAside: "three steps outside the system",
    mapNodesBefore: ["Open queue", "Find message", "Print", "Route to HIM", "Wait for scan", "Re-check filing"],
    mapNodesAfter: ["Open queue", "Select message", "Send to EMR", "Files in chart", "Status updated"],
    provenanceKicker: "How these artifacts were made",
    provenanceBody:
      "Every screen and map here was rebuilt from memory of my own current-state documentation; the original notes didn't survive. No protected health information, no exported records, and no reproduction of the vendor interface. Showing the workflow does not require showing a patient, so it does not.",
  },

  blueprint: {
    introKicker: "Then I counted the handoffs",
    introTitle: "Six steps became five. One department left the loop.",
    introLede:
      "The visible change is one fewer step. The service change is one fewer department touching the record. Below is the same path drawn by who was holding it.",
    beforeBtn: "Before · one handoff",
    afterBtn: "After · no handoff",
    statusBefore:
      "For two steps the message sits below the line of visibility, owned by nobody the coordinator can see.",
    statusAfter: "The message never leaves the coordinator's line of sight, and the queue reports back.",
    // The four departments (msk.md, 2026-10-14 answer 6): clinical writes the
    // message, operations is the coordinator, HIM scans paper, IT owns the
    // portal, the EMR, and permissions.
    lanes: { evidence: "Clinical message", front: "Coordinator", back: "HIM · document imaging", support: "Portal + EMR" },
    laneSubs: { evidence: "What exists", front: "Operations · front", back: "Backstage", support: "IT · support" },
    visibility: "LINE OF VISIBILITY",
    waiting: "coordinator is waiting",
    noSignal: "NO RETURN SIGNAL — WHICH IS WHY STEP 06 EXISTS",
    nodesBefore: [
      "Dashboard queue", "Open queue", "In the portal",
      "Message on screen", "Find message",
      "Printed page", "Print the message",
      "Paper in transit", "Route to HIM",
      "Scan queue", "Wait for scan",
      "Chart entry", "Re-check filing", "Now in the EMR",
    ],
    nodesAfter: [
      "Dashboard queue", "Open queue", "In the portal",
      "Message on screen", "Select message", "Ready + role checked",
      "One action", "Send to EMR", "Permission allows it",
      "Chart entry", "Files in the chart",
      "Queue status", "Return, status updated", "Now in the EMR",
    ],
    key: {
      frontTerm: "Coordinator (operations) · frontstage",
      frontBefore:
        "Opens the queue, finds the message, prints it — then has to return later and check whether it was ever filed.",
      frontAfter:
        "Opens the queue, selects the message, sends it to the chart, and lands back on the queue with the status already updated.",
      backTerm: "HIM (document imaging) · backstage",
      backBefore:
        "Receives the paper and scans it. Doing the work correctly, out of sight, with no way to report back into the queue.",
      backAfter:
        "Not on this path any more. The department that used to receive paper never enters the filing workflow.",
      supportTerm: "IT: portal, EMR, and permissions · support",
      supportBefore:
        "Holds the message in the portal before it is printed and in the chart after it is scanned — but not in between, which is where the gap is.",
      supportAfter:
        "Writes the message into the chart, and exposes the action only when the message is ready and the role allows it.",
      changedTerm: "What changed",
      changedBefore:
        "Six steps, but only one that matters: the moment the message crosses a department line with no signal coming back.",
      changedAfter:
        "One department left the path. The message stays above the line of visibility from open to confirmation.",
    },
    switchAria: "Choose which path the blueprint shows",
  },

  dashboard: {
    groupAria: "Anonymized Office Coordinator filing queue mockup",
    tableAria: "Anonymized patient-message filing queue",
    eyebrow: "Anonymized internal tool concept",
    title: "My filing queue",
    roleView: "Office Coordinator view",
    queueMeta: "47 in queue · 09:42",
    toolbar: ["All patients", "Ready to send", "Needs review"],
    columns: { patient: "Patient", document: "Message", status: "Status", routedTo: "Routed to", action: "Action" },
    rows: [
      // Portal messages only (msk.md, 2026-10-14 answer 2): what got printed
      // was patient messages and clinician replies, not documents.
      { mrn: "••••4821", received: "Received 2h ago", doc: "Patient message", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
      { mrn: "••••5518", received: "Received 5h ago", doc: "Physician reply", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
      { mrn: "••••7305", received: "Received 1d ago", doc: "Care team note", status: "Needs review", slug: "needs-review", routed: "Supervisor", action: "Review" },
      { mrn: "••••1043", received: "Received 1d ago", doc: "Patient reply", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
      { mrn: "••••2960", received: "Received 3d ago", doc: "Nurse reply", status: "In the chart", slug: "filed-to-chart", routed: "Complete", action: "View log" },
    ],
    mrnTerm: "MRN",
    mrnDef: "medical record number, the ID for one patient’s chart. Masked to the last four digits.",
    emrTerm: "EMR",
    emrDef: "electronic medical record, the patient’s chart. Portal messages sit outside it until they are filed.",
    legendSummary: "What these terms mean",
    ruleLabel: "Rule:",
    ruleAction: "Send to EMR",
    rule: "appears only when the message is ready and the coordinator's role includes filing rights.",
  },

  decisions: {
    kicker: "The fix looked like one button",
    title: "One button, four rules.",
    intro:
      "One action replaced the three steps that left the system. IT and UX built the real one after I changed roles; the four rules below are how this recreation makes it safe to press. My portfolio design, not MSK's specification.",
    steps: [
      { n: "01", title: "Show the action only when the record is ready", body: "Staff stop opening records that still need review.", note: "Ready means actionable" },
      { n: "02", title: "Make permission limits visible", body: "View-only roles see status and ownership, not a disabled mystery button.", note: "Permission is product logic" },
      { n: "03", title: "Separate blocked from not started", body: "Exceptions get a reason and an owner, so the backlog stops hiding them.", note: "Blocked needs an owner" },
      { n: "04", title: "Return people to the queue", body: "Staff land back where they started, status updated.", note: "Preserve place and context" },
    ],
  },

  redesigns: {
    kicker: "Then it turned up twice more",
    title: "The same failure, in two more places.",
    lede:
      "Certification and onboarding had the same problem: the next action was buried.",
    wrongLabel: "What I got wrong",
    items: [
      {
        n: "01",
        title: "EMR filing workflow",
        finding: "A portal message was printed, routed to HIM, then waited to appear in the chart.",
        change: "One dashboard action, placed where the decision was already being made.",
        wrong: "I misjudged how small it would look to IT. They deprioritized it as not worth the effort, and I had to keep raising it to get it built.",
      },
      {
        n: "02",
        title: "CPR certification",
        finding: "The CPR (cardiopulmonary resuscitation) material was written in technical, legal language. So few clinicians got through it that the team planned a 4-month extension.",
        change: "I rewrote it for the people who had to complete it. The whole department certified a month before the original deadline, with no 4-month extension.",
      },
      {
        n: "03",
        title: "Administrative onboarding",
        finding: "Epic, HIPAA, the compliance modules, and the technical and soft skills of the job were taught the same way to every new administrative hire — people who arrived with very different starting points, some fluent with the systems, some never having opened them.",
        change: "I worked with the design team to rebuild the program, then curated the instruction cohort by cohort so a one-to-three-week course met the range of abilities actually in the room.",
      },
    ],
    mechanismLabels: {
      before: "BEFORE", after: "AFTER",
      dashboard: "Dashboard", paper: "Paper", chart: "Chart",
      beforeProse: "BEFORE · LEGAL PROSE", denseBlock: "one dense block",
      afterSteps: "AFTER · STEPS A CLINICIAN CAN FOLLOW",
      beforeCohort: "BEFORE · ONE COURSE FOR EVERY COHORT", sameStandard: "same standard",
    },
  },

  systems: {
    kicker: "Why I could see it",
    title: "I did the jobs before I redesigned them.",
    lede: "You do not spot that pattern from outside a system. I had already sat in three of its seats.",
    rolesAria: "Three roles at MSK, in order",
    methodLabel: "The method it gave me",
    roles: [
      {
        n: "01", role: "Office Coordinator", taught: "Where people paused",
        term: "Lean Six Sigma Green Belt (Purdue) · Master of Healthcare Administration (Rutgers)",
        body: "Both finished in this seat, while I was running a clinic's paperwork. The Green Belt, a process-improvement certification, is the lens that showed one filing task crossing four departments.",
      },
      {
        n: "02", role: "Administrative Assistant", taught: "How to brief people who have to act",
        term: "Writing for the person who has to act",
        body: "No certificate for this one. Turning leadership decisions into clear briefs taught me to write for the person who has to act. The CPR rewrite and the EMR presentation both came from that practice.",
      },
      {
        n: "03", role: "Training Facilitator", taught: "The authority to redesign it",
        term: "Training & Facilitation (ATD) · current-state mapping",
        body: "I instructed on Epic (the record software), HIPAA (the patient-privacy law), and the compliance modules. Owning how staff were taught the system meant documenting what actually happens, not what the policy says — and the gap between the two is where the design work lives.",
      },
    ],
    cards: [
      { tag: "01 · Observe", title: "Find the workarounds", body: "Shadow real shifts. The sticky notes and personal spreadsheets told the truth the policy map missed." },
      { tag: "02 · Align", title: "Make the failure shared", body: "Current-state maps gave four departments one picture to argue with instead of four email threads." },
      { tag: "03 · Redesign", title: "Sequence the next action", body: "Move the task to where the decision already happens, then make ownership and exceptions visible." },
    ],
    ownershipLabel: "What service design means here:",
    ownershipBody:
      "I own the whole path a task takes — across four departments that did not report to me — not the screen at the end of it. The queue above is one screen. The reason it works is everything behind it.",
    boundaryAria: "MSK research evidence boundary",
    boundaryLabel: "Evidence boundary",
    boundaryBody:
      "The source record preserves the workflow, departments, decisions, and outcomes. Participant counts from shift observation were not recorded, so I use this evidence to explain the decisions—not to claim prevalence.",
    mapFallback: "Four departments, one task → mapped → redesigned → adopted",
    mapStagesAria: "Clinical system transformation stages",
    mapStages: ["Four departments, one task", "Mapped", "Redesigned", "Adopted organization-wide"],
  },

  sustainment: {
    kicker: "The real test came later",
    title: "I left before launch. Here’s what happened next.",
    lede:
      "I handed the workflow to IT and UX, who built it. It was adopted organization-wide (owner-reported: my own record, not independently measured).",
    // Claim audit 2026-10-13: the lanes used to say "system upgrade" ×2,
    // "still in use" and "still used by other admins" — claims Hillary cut on
    // 2026-09-27 (msk.md F2/F3: no source; she was not present after launch).
    // The drawing kept them after the text list was corrected. Lanes now carry
    // only what msk.md supports: the handoff, organization-wide adoption
    // (owner-reported, Q5/F2), and compliance a month early (Q3/Q5).
    figcaption: "What happened after each one shipped",
    shipped: "SHIPPED",
    lanes: [
      {
        name: "EMR filing workflow",
        events: [{ at: 0.42, label: "handed to IT and UX" }],
        outcome: "adopted organization-wide",
      },
      {
        name: "CPR certification format",
        events: [{ at: 0.5, label: "compliant a month early" }],
        outcome: "no extension needed",
      },
    ],
    survived: [
      { fact: "EMR filing workflow", what: "Owner-reported as adopted organization-wide" },
      { fact: "CPR certification format", what: "Department compliant a month before the original deadline — no extension needed" },
    ],
    why:
      "The work moved from personal workaround to shared system; the plain-language format got the department compliant before the deadline.",
    proofLabel: "Independent proof · MSK News",
    proofTitle: "From the military to Memorial Sloan Kettering",
    proofAria: "Read Hillary Esposito's career profile in MSK News (opens in new tab)",
  },

  outcomes: {
    kicker: "What it added up to",
    title: "The numbers, and who they belong to.",
    intro:
      "I initiated the dashboard-to-online-EMR workflow redesign as a coordinator and it was implemented off my presentation to the company two roles later, rewrote the CPR certification material for the clinicians completing it, and rebuilt the onboarding program — Epic, HIPAA, compliance, and the technical and soft skills — for new administrative staff.",
    disclaimer: "Anonymized evidence · organization-wide results are attributed to the initiative · the ~$1M/year is a projection from my pitch, not measured savings",
    metrics: [
      { tag: "Led", n: "1 month", label: "early: the whole department certified before the original deadline, with no 4-month extension" },
      { tag: "Scale", n: "21,000+", label: "clinicians and administrative staff across the workflows I redesigned" },
      { tag: "Contributed to", n: "20%", label: "organization-wide EMR cost reduction, inside a larger initiative" },
      { tag: "Projection", n: "~$1M/year", label: "projected paper savings in my Process Improvement Fair pitch, not measured savings" },
    ],
    route: ["Observe the real work", "Map the failure", "Align the system", "Get it built"],
  },

  close: {
    title: "I find the workaround. Then I get it built.",
    body: "I map it so every department sees the same failure, then turn it into a decision the organization will build.",
    cta: "Email me →",
  },
  next: { eyebrow: "Next case study", title: "Mobbin", tag: "UX flow documentation · 200+ screens per app" },
};

const es: MskCopy = {
  pageTitle: "MSK — Estudio de caso de sistemas clínicos",
  breadcrumb: { work: "Trabajo", here: "Memorial Sloan Kettering" },
  jumpLabel: "Ir a",
  chapters: [
    { id: "msk-start", label: "Inicio" },
    { id: "msk-brief", label: "Problema" },
    { id: "msk-workflow", label: "Flujo" },
    { id: "msk-decisions", label: "Decisiones" },
    { id: "msk-redesigns", label: "Rediseños" },
    { id: "msk-systems", label: "Contexto" },
    { id: "msk-outcomes", label: "Resultados" },
  ],

  hero: {
    eyebrow: "Memorial Sloan Kettering · sistemas clínicos",
    title: "Una cola de archivo reemplazó un desvío de papel entre cuatro áreas.",
    readTime: "6 min",
    readMeta: "de lectura · 6 años, 3 puestos",
    ledeOpen:
      "Los mensajes del portal de pacientes vivían en el portal, no en la historia clínica, así que el personal los imprimía para escanearlos. En el puesto de coordinación de oficina, mapeé ese desvío entre las áreas clínica, de TI, de HIM (gestión de información de salud, el equipo que escanea documentos a la historia) y de operaciones, y luego presenté el flujo en línea que se implementó dos puestos después. Sirvió a un trabajo que alcanzaba a ",
    ledeScale: "más de 21,000 clínicos y personal administrativo",
    ledeMiddle: ", y ",
    ledeSustain: "reportado por la organización como adoptado en toda la institución",
    ledeClose: ".",
    cta: "Ver el flujo →",
    artifactTag: "ARTEFACTO RECREADO",
    artifactName: "Cola de archivo de coordinación",
    dashboardAria: "Concepto recreado de la cola de archivo de coordinación de oficina",
  },

  receipt: {
    kicker: "Empezó con un desvío",
    titleLines: ["Un flujo digital", "se volvió un ritual de\u00a0papel."],
    body:
      "Los mensajes del portal de pacientes (las preguntas de los pacientes y las respuestas del personal clínico) vivían en el portal, no en la historia del paciente, el expediente médico electrónico (EMR), así que el personal los imprimía para escanearlos a la historia. Cada mensaje impreso es una oportunidad de que la información del paciente circule, se archive en la historia equivocada o se pierda antes de la siguiente consulta.",
    run: "Recorrer la ruta en línea",
    replay: "Repetir la ruta en línea",
    ready: "Listo para archivar.",
    steps: ["Cola abierta", "Permiso confirmado", "Archivado en la historia en línea", "Regreso con el estado actualizado"],
    boundary: "Interacción recreada",
  },

  workflow: {
    kicker: "Así que conté los pasos",
    title: "La cola de archivo reemplazó el desvío.",
    lede:
      "Nadie había escrito la ruta completa. En una sola página, cuatro áreas vieron la misma falla en lugar de cuatro versiones de ella.",
    figcaption: "Mapa recreado del estado actual y del estado futuro · sin datos de pacientes",
    beforeLabel: "Antes · seis pasos",
    beforeHeading: "Imprimir, enviar, esperar, volver a revisar",
    afterLabel: "Después · cinco pasos",
    afterHeading: "Archivar desde la cola, volver con el estado",
    before: [
      "Abrir la cola del panel",
      "Encontrar el mensaje",
      "Imprimir el mensaje del portal",
      "Enviar el papel a HIM",
      "Esperar a que lo escaneen",
      "Volver después a confirmar el archivo",
    ],
    after: [
      "Abrir la cola del panel",
      "Seleccionar el mensaje",
      "Elegir Enviar al EMR",
      "Se archiva en la historia del paciente",
      "Volver con el estado actualizado",
    ],
    mapBefore: "ANTES · 6 PASOS · SALE DEL EMR",
    mapAfter: "DESPUÉS · 5 PASOS · NUNCA SALE DEL EMR",
    mapAside: "tres pasos fuera del sistema",
    mapNodesBefore: ["Abrir cola", "Buscar mensaje", "Imprimir", "Enviar a HIM", "Esperar escaneo", "Revisar archivo"],
    mapNodesAfter: ["Abrir cola", "Elegir mensaje", "Enviar al EMR", "Archiva en historia", "Estado actualizado"],
    provenanceKicker: "Cómo se hicieron estos artefactos",
    provenanceBody:
      "Cada pantalla y cada mapa aquí se reconstruyeron de memoria a partir de mi propia documentación del estado actual; las notas originales no se conservaron. Sin información de salud protegida, sin registros exportados y sin reproducir la interfaz del proveedor. Mostrar el flujo no exige mostrar a un paciente, así que no lo hace.",
  },

  blueprint: {
    introKicker: "Luego conté los traspasos",
    introTitle: "Seis pasos se volvieron cinco. Un área salió del circuito.",
    introLede:
      "El cambio visible es un paso menos. El cambio en el servicio es un área menos tocando el expediente. Abajo está la misma ruta, dibujada según quién tenía el mensaje en la mano.",
    beforeBtn: "Antes · un traspaso",
    afterBtn: "Después · sin traspaso",
    statusBefore:
      "Durante dos pasos el mensaje queda bajo la línea de visibilidad, en manos de nadie que la coordinación pueda ver.",
    statusAfter: "El mensaje nunca sale de la vista de la coordinación, y la cola informa de vuelta.",
    lanes: { evidence: "Mensaje clínico", front: "Coordinación", back: "HIM · imágenes", support: "Portal + EMR" },
    laneSubs: { evidence: "Lo que existe", front: "Operaciones · frente", back: "Trastienda", support: "TI · soporte" },
    visibility: "LÍNEA DE VISIBILIDAD",
    waiting: "la coordinación espera",
    noSignal: "SIN SEÑAL DE VUELTA — POR ESO EXISTE EL PASO 06",
    nodesBefore: [
      "Cola del panel", "Abrir la cola", "En el portal",
      "Mensaje en pantalla", "Buscar mensaje",
      "Página impresa", "Imprimir el mensaje",
      "Papel en tránsito", "Enviar a HIM",
      "Cola de escaneo", "Esperar el escaneo",
      "Entrada en la historia", "Revisar el archivo", "Ya en el EMR",
    ],
    nodesAfter: [
      "Cola del panel", "Abrir la cola", "En el portal",
      "Mensaje en pantalla", "Seleccionar mensaje", "Listo + permiso verificado",
      "Una acción", "Enviar al EMR", "El permiso lo autoriza",
      "Entrada en la historia", "Se archiva en la historia",
      "Estado de la cola", "Volver, estado actualizado", "Ya en el EMR",
    ],
    key: {
      frontTerm: "Coordinación (operaciones) · escenario visible",
      frontBefore:
        "Abre la cola, busca el mensaje, lo imprime — y después tiene que volver a revisar si alguna vez se archivó.",
      frontAfter:
        "Abre la cola, selecciona el mensaje, lo envía a la historia y regresa a la cola con el estado ya actualizado.",
      backTerm: "HIM (imágenes de documentos) · trastienda",
      backBefore:
        "Recibe el papel y lo escanea. Hace el trabajo bien, fuera de la vista, y sin manera de informar de vuelta a la cola.",
      backAfter:
        "Ya no está en esta ruta. El área que antes recibía papel nunca entra al flujo de archivo.",
      supportTerm: "TI: portal, EMR y permisos · soporte",
      supportBefore:
        "Tiene el mensaje en el portal antes de imprimirlo y en la historia después de escanearlo — pero no en medio, que es justo donde está el hueco.",
      supportAfter:
        "Escribe el mensaje en la historia y muestra la acción solo cuando el mensaje está listo y el permiso lo autoriza.",
      changedTerm: "Qué cambió",
      changedBefore:
        "Seis pasos, pero solo uno importa: el momento en que el mensaje cruza la línea de un área sin que vuelva ninguna señal.",
      changedAfter:
        "Un área salió de la ruta. El mensaje se queda por encima de la línea de visibilidad desde que se abre hasta que se confirma.",
    },
    switchAria: "Elegir qué ruta muestra el plano de servicio",
  },

  dashboard: {
    groupAria: "Maqueta anonimizada de la cola de archivo de coordinación de oficina",
    tableAria: "Cola anonimizada de archivo de mensajes de pacientes",
    eyebrow: "Concepto anonimizado de herramienta interna",
    title: "Mi cola de archivo",
    roleView: "Vista de coordinación de oficina",
    queueMeta: "47 en la cola · 09:42",
    toolbar: ["Todos los pacientes", "Listo para enviar", "Requiere revisión"],
    columns: { patient: "Paciente", document: "Mensaje", status: "Estado", routedTo: "Enviado a", action: "Acción" },
    rows: [
      { mrn: "••••4821", received: "Recibido hace 2 h", doc: "Mensaje del paciente", status: "Listo para enviar", slug: "ready-to-file", routed: "Cola de archivo", action: "Enviar al EMR" },
      { mrn: "••••5518", received: "Recibido hace 5 h", doc: "Respuesta del médico", status: "Listo para enviar", slug: "ready-to-file", routed: "Cola de archivo", action: "Enviar al EMR" },
      { mrn: "••••7305", received: "Recibido hace 1 d", doc: "Nota del equipo de atención", status: "Requiere revisión", slug: "needs-review", routed: "Supervisión", action: "Revisar" },
      { mrn: "••••1043", received: "Recibido hace 1 d", doc: "Respuesta del paciente", status: "Listo para enviar", slug: "ready-to-file", routed: "Cola de archivo", action: "Enviar al EMR" },
      { mrn: "••••2960", received: "Recibido hace 3 d", doc: "Respuesta de enfermería", status: "En la historia", slug: "filed-to-chart", routed: "Completo", action: "Ver registro" },
    ],
    mrnTerm: "MRN",
    mrnDef: "número de expediente médico, el identificador de la historia de un paciente. Enmascarado a los últimos cuatro dígitos.",
    emrTerm: "EMR",
    emrDef: "expediente médico electrónico, la historia del paciente. Los mensajes del portal quedan fuera hasta que se archivan.",
    legendSummary: "Qué significan estos términos",
    ruleLabel: "Regla:",
    ruleAction: "Enviar al EMR",
    rule: "aparece solo cuando el mensaje está listo y el puesto de coordinación tiene permisos de archivo.",
  },

  decisions: {
    kicker: "El arreglo parecía un solo botón",
    title: "Un botón, cuatro reglas.",
    intro:
      "Una acción reemplazó los tres pasos que salían del sistema. TI y UX construyeron el botón real después de que cambié de puesto; las cuatro reglas de abajo son cómo esta recreación lo hace seguro de presionar. Es mi diseño para el portafolio, no la especificación de MSK.",
    steps: [
      { n: "01", title: "Mostrar la acción solo cuando el registro está listo", body: "El personal deja de abrir registros que aún necesitan revisión.", note: "Listo significa accionable" },
      { n: "02", title: "Hacer visibles los límites de permiso", body: "Los puestos de solo lectura ven estado y responsabilidad, no un botón desactivado y misterioso.", note: "El permiso es lógica de producto" },
      { n: "03", title: "Separar bloqueado de no iniciado", body: "Las excepciones reciben un motivo y una persona responsable, para que el rezago deje de esconderlas.", note: "Lo bloqueado necesita responsable" },
      { n: "04", title: "Devolver a la gente a la cola", body: "El personal aterriza donde empezó, con el estado actualizado.", note: "Conservar el lugar y el contexto" },
    ],
  },

  redesigns: {
    kicker: "Luego apareció dos veces más",
    title: "La misma falla, en dos lugares más.",
    lede:
      "La certificación y la incorporación tenían el mismo problema: el siguiente paso estaba escondido.",
    wrongLabel: "En qué me equivoqué",
    items: [
      {
        n: "01",
        title: "Flujo de archivo del EMR",
        finding: "Un mensaje del portal se imprimía, se enviaba a HIM y luego esperaba para aparecer en la historia clínica.",
        change: "Una sola acción en el panel, puesta donde la decisión ya se estaba tomando.",
        wrong: "Calculé mal lo pequeño que le parecería a TI. Lo despriorizaron porque no valía el esfuerzo, y tuve que seguir insistiendo para que se construyera.",
      },
      {
        n: "02",
        title: "Certificación de RCP",
        finding: "El material de RCP (reanimación cardiopulmonar) estaba escrito en lenguaje técnico y legal. Tan poca gente clínica lo completaba que el equipo planeaba una prórroga de 4 meses.",
        change: "Lo reescribí para las personas que tenían que completarlo. Toda el área se certificó un mes antes de la fecha límite original, sin la prórroga de 4 meses.",
      },
      {
        n: "03",
        title: "Incorporación administrativa",
        finding: "Epic, HIPAA, los módulos de cumplimiento y las habilidades técnicas y blandas del puesto se enseñaban igual a cada nueva persona administrativa — gente que llegaba con puntos de partida muy distintos, algunas con soltura en los sistemas y otras que nunca los habían abierto.",
        change: "Trabajé con el equipo de diseño para reconstruir el programa y luego ajusté la instrucción cohorte por cohorte, para que un curso de una a tres semanas respondiera al rango de habilidades que de verdad había en la sala.",
      },
    ],
    mechanismLabels: {
      before: "ANTES", after: "DESPUÉS",
      dashboard: "Panel", paper: "Papel", chart: "Historia",
      beforeProse: "ANTES · PROSA LEGAL", denseBlock: "un bloque denso",
      afterSteps: "DESPUÉS · PASOS QUE SE PUEDEN SEGUIR",
      beforeCohort: "ANTES · UN SOLO CURSO PARA TODA COHORTE", sameStandard: "mismo estándar",
    },
  },

  systems: {
    kicker: "Por qué pude verlo",
    title: "Hice los trabajos antes de rediseñarlos.",
    lede: "Ese patrón no se ve desde fuera de un sistema. Yo ya me había sentado en tres de sus sillas.",
    rolesAria: "Tres puestos en MSK, en orden",
    methodLabel: "El método que me dio",
    roles: [
      {
        n: "01", role: "Coordinación de oficina", taught: "Dónde se detenía la gente",
        term: "Lean Six Sigma Green Belt (Purdue) · Maestría en Administración de Salud (Rutgers)",
        body: "Terminé ambas en este puesto, mientras llevaba el papeleo de una clínica. El Green Belt, una certificación de mejora de procesos, es la lente que mostró una tarea de archivo cruzando cuatro áreas.",
      },
      {
        n: "02", role: "Asistencia administrativa", taught: "Cómo informar a quien tiene que actuar",
        term: "Escribir para quien tiene que actuar",
        body: "Aquí no hay certificado. Convertir decisiones de liderazgo en informes claros me enseñó a escribir para la persona que tiene que actuar. La reescritura de RCP y la presentación del EMR salieron de esa práctica.",
      },
      {
        n: "03", role: "Facilitadora de capacitación", taught: "La autoridad para rediseñarlo",
        term: "Capacitación y facilitación (ATD) · mapeo del estado actual",
        body: "Di instrucción sobre Epic (el software del expediente), HIPAA (la ley de privacidad del paciente) y los módulos de cumplimiento. Hacerme cargo de cómo se le enseñaba el sistema al personal significó documentar lo que de verdad pasa, no lo que dice la política — y la brecha entre las dos es donde vive el trabajo de diseño.",
      },
    ],
    cards: [
      { tag: "01 · Observar", title: "Encontrar los desvíos", body: "Acompañar turnos reales. Las notas adhesivas y las hojas de cálculo personales decían la verdad que el mapa de políticas no veía." },
      { tag: "02 · Alinear", title: "Volver compartida la falla", body: "Los mapas del estado actual le dieron a cuatro áreas una sola imagen con la cual discutir, en vez de cuatro cadenas de correo." },
      { tag: "03 · Rediseñar", title: "Ordenar la siguiente acción", body: "Mover la tarea a donde la decisión ya ocurre, y luego hacer visibles la responsabilidad y las excepciones." },
    ],
    ownershipLabel: "Qué significa aquí el diseño de servicios:",
    ownershipBody:
      "Me hago cargo de toda la ruta que recorre una tarea — a través de cuatro áreas que no me reportaban — no de la pantalla del final. La cola de arriba es una pantalla. La razón por la que funciona es todo lo que está detrás.",
    boundaryAria: "Límite de evidencia de la investigación en MSK",
    boundaryLabel: "Límite de la evidencia",
    boundaryBody:
      "El registro original conserva el flujo, las áreas, las decisiones y los resultados. Los conteos de participantes de la observación de turnos no se registraron, así que uso esta evidencia para explicar las decisiones, no para afirmar una prevalencia.",
    mapFallback: "Cuatro áreas, una tarea → mapeados → rediseñados → adoptados",
    mapStagesAria: "Etapas de transformación del sistema clínico",
    mapStages: ["Cuatro áreas, una tarea", "Mapeados", "Rediseñados", "Adoptado en toda la institución"],
  },

  sustainment: {
    kicker: "La prueba de verdad llegó después",
    title: "Me fui antes del lanzamiento. Esto es lo que pasó después.",
    lede:
      "Entregué el flujo a TI y UX, que lo construyeron. Se adoptó en toda la institución (dato autorreportado: mi propio registro, no una medición independiente).",
    figcaption: "Qué pasó después de lanzar cada uno",
    shipped: "LANZADO",
    lanes: [
      {
        name: "Flujo de archivo del EMR",
        events: [{ at: 0.42, label: "entregado a TI y UX" }],
        outcome: "adoptado en toda la institución",
      },
      {
        name: "Formato de certificación de RCP",
        events: [{ at: 0.5, label: "conforme un mes antes" }],
        outcome: "sin prórroga",
      },
    ],
    survived: [
      { fact: "Flujo de archivo del EMR", what: "Adoptado en toda la institución, según lo que reporta Hillary" },
      { fact: "Formato de certificación de RCP", what: "Área conforme un mes antes de la fecha límite original — sin prórroga" },
    ],
    why:
      "El trabajo pasó de un desvío personal a un sistema compartido; el formato en lenguaje sencillo dejó al área conforme antes de la fecha límite.",
    proofLabel: "Prueba independiente · MSK News",
    proofTitle: "Del ejército a Memorial Sloan Kettering",
    proofAria: "Leer el perfil de carrera de Hillary Esposito en MSK News (se abre en una pestaña nueva)",
  },

  outcomes: {
    kicker: "A cuánto sumó",
    title: "Los números, y a quién pertenecen.",
    intro:
      "Inicié el rediseño del flujo del panel al EMR en línea desde el puesto de coordinación, y se implementó a partir de mi presentación a la organización dos puestos después; reescribí el material de certificación de RCP para el personal clínico que debía completarlo; y reconstruí el programa de incorporación — Epic, HIPAA, cumplimiento y las habilidades técnicas y blandas — para el nuevo personal administrativo.",
    disclaimer: "Evidencia anonimizada · los resultados de toda la organización se atribuyen a la iniciativa · los ~$1M/año son una proyección de mi propuesta, no un ahorro medido",
    metrics: [
      { tag: "Dirigí", n: "1 mes", label: "antes: toda el área se certificó antes de la fecha límite original, sin la prórroga de 4 meses" },
      { tag: "Escala", n: "21,000+", label: "clínicos y personal administrativo en los flujos que rediseñé" },
      { tag: "Contribuí a", n: "20%", label: "reducción de costos del EMR en toda la organización, dentro de una iniciativa mayor" },
      { tag: "Proyección", n: "~$1M/año", label: "ahorro proyectado en papel en mi propuesta para la Feria de Mejora de Procesos, no un ahorro medido" },
    ],
    route: ["Observar el trabajo real", "Mapear la falla", "Alinear el sistema", "Lograr que se construya"],
  },

  close: {
    title: "Encuentro el desvío. Después logro que se construya.",
    body: "Lo mapeo para que cada área vea la misma falla, y luego lo convierto en una decisión que la organización va a construir.",
    cta: "Escríbame →",
  },
  next: { eyebrow: "Siguiente estudio de caso", title: "Mobbin", tag: "Documentación de flujos UX · más de 200 pantallas por app" },
};

export const MSK_COPY: Record<Lang, MskCopy> = { en, es };
