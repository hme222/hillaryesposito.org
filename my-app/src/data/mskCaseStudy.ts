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
 *   identical; only the separators localise (22.937 vs 22,937 style).
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
  chapters: { id: string; label: string; note: string }[];

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
    title: string;
    body: string;
    run: string;
    replay: string;
    ready: string;
    steps: string[];
    nodes: { n: string; label: string; value: string }[];
    paperLabel: string;
    paperValue: string;
    paperNote: string;
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
    { id: "msk-start", label: "Start", note: "Digital records, printed to be filed digitally" },
    { id: "msk-brief", label: "Problem", note: "A digital workflow became a paper ritual" },
    { id: "msk-workflow", label: "Workflow", note: "A filing queue replaced the workaround" },
    { id: "msk-decisions", label: "Decisions", note: "The simple button was not simple" },
    { id: "msk-redesigns", label: "Redesigns", note: "The same failure, in two more places" },
    { id: "msk-systems", label: "Background", note: "Why I could see it" },
    { id: "msk-outcomes", label: "Outcomes", note: "Evidence that lasted" },
  ],

  hero: {
    eyebrow: "Memorial Sloan Kettering · clinical systems",
    title: "A filing queue replaced a four-system workaround.",
    readTime: "6 min",
    readMeta: "read · 6 years, 3 roles",
    ledeOpen:
      "Clinicians printed digital records just to file them digitally again — and a record in transit is a record that is not in the chart when the next clinician opens it. As an office coordinator, I mapped that workaround across clinical, IT, imaging, and operations, then presented the online workflow that was implemented two roles later. It served work touching ",
    ledeScale: "21,000+ clinicians and staff",
    ledeMiddle: ", and it is ",
    ledeSustain: "still in use through two system upgrades",
    ledeClose: ".",
    cta: "See the workflow →",
    artifactTag: "RECREATED ARTIFACT",
    artifactName: "Office Coordinator filing queue · no patient data",
    dashboardAria: "Recreated Office Coordinator filing queue concept",
  },

  receipt: {
    kicker: "It started with a workaround",
    title: "The digital workflow had become a paper ritual.",
    body:
      "Every clinical day runs through the EMR—the electronic medical record where a patient’s history lives. The online queue kept the filing on screen and returned with its status updated.",
    run: "Run the online path",
    replay: "Replay the online path",
    ready: "Ready to file.",
    steps: ["Queue opened", "Role confirmed", "Filed to the online chart", "Returned with status updated"],
    nodes: [
      { n: "01", label: "Queue", value: "Worklist ready" },
      { n: "02", label: "File action", value: "Role confirmed" },
      { n: "03", label: "Online chart", value: "Filed" },
      { n: "04", label: "Return", value: "Status updated" },
    ],
    paperLabel: "QUEUE STATUS",
    paperValue: "FILED",
    paperNote: "Returned to dashboard · status updated",
    boundary: "Recreated interaction · no patient data",
  },

  workflow: {
    kicker: "So I counted the steps",
    title: "The filing queue replaced the workaround.",
    lede:
      "Nobody had written the whole path down. On one page, four departments saw the same failure instead of four versions of it.",
    figcaption: "Recreated current-state and future-state map · no patient data",
    beforeLabel: "Before · six steps",
    beforeHeading: "Print, route, wait, check again",
    afterLabel: "After · five steps",
    afterHeading: "File from the queue, return with status",
    before: [
      "Open the dashboard queue",
      "Find the document",
      "Print the digital record",
      "Route paper to imaging",
      "Wait for it to be scanned",
      "Return later to confirm filing",
    ],
    after: [
      "Open the dashboard queue",
      "Select the document",
      "Choose Send to EMR",
      "It files inside the online chart",
      "Return with status updated",
    ],
    mapBefore: "BEFORE · 6 STEPS · LEAVES THE EMR",
    mapAfter: "AFTER · 5 STEPS · NEVER LEAVES THE EMR",
    mapAside: "three steps outside the system",
    mapNodesBefore: ["Open queue", "Find doc", "Print", "Route to imaging", "Wait for scan", "Re-check filing"],
    mapNodesAfter: ["Open queue", "Select doc", "Send to EMR", "Files in chart", "Status updated"],
    provenanceKicker: "How these artifacts were made",
    provenanceBody:
      "Every screen and map here was rebuilt from my own current-state documentation. No protected health information, no exported records, and no reproduction of the vendor interface. Showing the workflow does not require showing a patient, so it does not.",
  },

  blueprint: {
    introKicker: "Then I counted the handoffs",
    introTitle: "One step removed a department.",
    introLede:
      "Six steps to five is the change you can count. The change that mattered is that the record stopped crossing a line no one could see across. Below is the same path drawn by who was holding the record.",
    beforeBtn: "Before · one handoff",
    afterBtn: "After · no handoff",
    statusBefore:
      "For two steps the record sits below the line of visibility, owned by nobody the coordinator can see.",
    statusAfter: "The record never leaves the coordinator's line of sight, and the queue reports back.",
    lanes: { evidence: "Evidence", front: "Coordinator", back: "Imaging", support: "EMR + permissions" },
    laneSubs: { evidence: "What exists", front: "Frontstage", back: "Backstage", support: "Support" },
    visibility: "LINE OF VISIBILITY",
    waiting: "coordinator is waiting",
    noSignal: "NO RETURN SIGNAL — WHICH IS WHY STEP 06 EXISTS",
    nodesBefore: [
      "Dashboard queue", "Open queue", "Record in the EMR",
      "Record on screen", "Find document",
      "Printed page", "Print the record",
      "Paper in transit", "Route to imaging",
      "Scan queue", "Wait for scan",
      "Chart entry", "Re-check filing", "Back in the EMR",
    ],
    nodesAfter: [
      "Dashboard queue", "Open queue", "Record in the EMR",
      "Record on screen", "Select document", "Ready + role checked",
      "One action", "Send to EMR", "Permission allows it",
      "Chart entry", "Files in the chart",
      "Queue status", "Return, status updated", "Still in the EMR",
    ],
    key: {
      frontTerm: "Coordinator · frontstage",
      frontBefore:
        "Opens the queue, finds the document, prints it — then has to return later and check whether it was ever filed.",
      frontAfter:
        "Opens the queue, selects the document, sends it to the chart, and lands back on the queue with the status already updated.",
      backTerm: "Imaging · backstage",
      backBefore:
        "Receives the paper and scans it. Doing the work correctly, out of sight, with no way to report back into the queue.",
      backAfter:
        "Not on this path any more. The department that used to receive paper never enters the filing workflow.",
      supportTerm: "EMR and permissions · support",
      supportBefore:
        "Holds the record before it is printed and after it is scanned — but not in between, which is where the gap is.",
      supportAfter:
        "Writes the record into the online chart, and exposes the action only when the record is ready and the role allows it.",
      changedTerm: "What changed",
      changedBefore:
        "Six steps, but only one that matters: the moment the record crosses a department line with no signal coming back.",
      changedAfter:
        "One department left the path. The record stays above the line of visibility from open to confirmation.",
    },
    switchAria: "Choose which path the blueprint shows",
  },

  dashboard: {
    groupAria: "Anonymized Office Coordinator filing queue mockup",
    tableAria: "Anonymized patient document filing queue",
    eyebrow: "Anonymized internal tool concept",
    title: "My filing queue",
    roleView: "Office Coordinator view",
    queueMeta: "47 in queue · 09:42",
    toolbar: ["All patients", "Ready to send", "Needs review"],
    columns: { patient: "Patient", document: "Document", status: "Status", routedTo: "Routed to", action: "Action" },
    rows: [
      { mrn: "••••4821", received: "Received 2h ago", doc: "Signed consent", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
      { mrn: "••••5518", received: "Received 5h ago", doc: "Signed order", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
      { mrn: "••••7305", received: "Received 1d ago", doc: "Outside records", status: "Needs review", slug: "needs-review", routed: "Supervisor", action: "Review" },
      { mrn: "••••1043", received: "Received 1d ago", doc: "Path report", status: "Ready to send", slug: "ready-to-file", routed: "Filing queue", action: "Send to EMR" },
      { mrn: "••••2960", received: "Received 3d ago", doc: "Discharge summary", status: "In the chart", slug: "filed-to-chart", routed: "Complete", action: "View log" },
    ],
    mrnTerm: "MRN",
    mrnDef: "medical record number, the ID for one patient’s chart. Masked to the last four digits.",
    emrTerm: "EMR",
    emrDef: "electronic medical record, the digital chart where a patient’s whole history lives.",
    ruleLabel: "Rule:",
    ruleAction: "Send to EMR",
    rule: "appears only when the document is ready and the coordinator's role includes filing rights.",
  },

  decisions: {
    kicker: "The fix looked like one button",
    title: "The “simple” button carried the whole system.",
    intro:
      "One action replaced the three steps that left the system. Everything that made it safe to press had to be legible before anyone pressed it.",
    steps: [
      { n: "01", title: "Show the action only when the record is ready", body: "Staff stop opening records that still need review.", note: "Ready means actionable" },
      { n: "02", title: "Make permission limits visible", body: "View-only roles see status and ownership, not a disabled mystery button.", note: "Permission is product logic" },
      { n: "03", title: "Separate blocked from not started", body: "Exceptions get a reason and an owner, so the backlog stops hiding them.", note: "Blocked needs an owner" },
      { n: "04", title: "Return people to the queue", body: "Staff land back where they started, status updated.", note: "Preserve place and context" },
    ],
  },

  redesigns: {
    kicker: "Then the same shape turned up again",
    title: "The same failure, in two more places.",
    lede:
      "Once I knew what it looked like, I found it in the CPR certification and in the onboarding program. Same root cause every time: built for the institution, not for the person who had to get through it.",
    wrongLabel: "What I got wrong",
    items: [
      {
        n: "01",
        title: "EMR filing workflow",
        finding: "A digital record was printed, routed out, then waited to reappear in the chart.",
        change: "One dashboard action, placed where the decision was already being made.",
        wrong: "I underestimated change management. Training on their own workstations, during shift changes, fixed it in two weeks.",
      },
      {
        n: "02",
        title: "CPR certification",
        finding: "The material was written in technical, legal language. So few clinicians got through it that the compliance deadline was about to be pushed back.",
        change: "I rewrote it for the people who had to complete it, not the people who wrote it. Every certification came in — 70% ahead of the deadline that was about to slip.",
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
    title: "I learned the system from the floor up.",
    lede: "You do not spot that pattern from outside a system. I had already sat in three of its seats.",
    rolesAria: "Three roles at MSK, in order",
    methodLabel: "The method it gave me",
    roles: [
      {
        n: "01", role: "Office Coordinator", taught: "Where people paused",
        term: "Lean Six Sigma Green Belt (Purdue) · Master of Healthcare Administration (Rutgers)",
        body: "Both finished in this seat, while I was running a clinic's paperwork. The Green Belt is the lens that showed four systems doing the work of two; the MHA is why the redesign survived budget talks and leadership changes.",
      },
      {
        n: "02", role: "Administrative Assistant", taught: "How evidence survives a room",
        term: "Writing for the person who has to act",
        body: "No certificate for this one. Turning leadership decisions into clear briefs taught me to write for the person who has to act. The CPR rewrite and the EMR presentation both came from that practice.",
      },
      {
        n: "03", role: "Trainer I Specialist", taught: "The authority to redesign it",
        term: "Training & Facilitation (ATD) · current-state mapping",
        body: "I instructed on Epic, HIPAA, and the compliance modules. Owning how staff were taught the system meant documenting what actually happens, not what the policy says — and the gap between the two is where the design work lives.",
      },
    ],
    cards: [
      { tag: "01 · Observe", title: "Find the workarounds", body: "Shadow real shifts. The sticky notes and personal spreadsheets told the truth the policy map missed." },
      { tag: "02 · Align", title: "Make the failure shared", body: "Current-state maps gave four departments one picture to argue with instead of four email threads." },
      { tag: "03 · Redesign", title: "Sequence the next action", body: "Move the task to where the decision already happens, then make ownership and exceptions visible." },
    ],
    ownershipLabel: "What service design means here:",
    ownershipBody:
      "I own the whole path a task takes — across four systems and three departments that did not report to me — not the screen at the end of it. The queue above is one screen. The reason it works is everything behind it.",
    boundaryAria: "MSK research evidence boundary",
    boundaryLabel: "Evidence boundary",
    boundaryBody:
      "The source record preserves the workflow, departments, decisions, and outcomes. Participant counts from shift observation were not recorded, so I use this evidence to explain the decisions—not to claim prevalence.",
    mapFallback: "Tangled systems → mapped → redesigned → trusted",
    mapStagesAria: "Clinical system transformation stages",
    mapStages: ["Tangled systems", "Mapped", "Redesigned", "Trusted by clinicians"],
  },

  sustainment: {
    kicker: "The real test came later",
    title: "Most internal tools die quietly. These did not.",
    lede:
      "A system upgrade, or the project simply ending — these are what usually finish an internal tool, whatever anyone thought of it at launch. Both of these carried straight on past that.",
    figcaption: "What each system survived, and where it stands now",
    shipped: "SHIPPED",
    lanes: [
      {
        name: "EMR filing workflow",
        events: [{ at: 0.3, label: "system upgrade" }, { at: 0.62, label: "system upgrade" }],
        outcome: "still in use",
      },
      {
        name: "CPR certification format",
        events: [{ at: 0.34, label: "project closes early" }],
        outcome: "still used by other admins",
      },
    ],
    survived: [
      { fact: "EMR filing workflow", what: "Adopted organization-wide, and still in use through two system upgrades" },
      { fact: "CPR certification format", what: "A two-month project that closed early — other admins still use the collection method today" },
    ],
    why:
      "None of that is luck. The filing queue survived two upgrades because it had stopped being a workaround people maintained by hand — the work was in the system, not in someone's spreadsheet. The certification format outlived its own project by two months, then kept going, because the people it was written for preferred it to what came before.",
    proofLabel: "Independent proof · MSK News",
    proofTitle: "From the military to Memorial Sloan Kettering",
    proofAria: "Read Hillary Esposito's career profile in MSK News (opens in new tab)",
  },

  outcomes: {
    kicker: "What it added up to",
    title: "The numbers, and who they belong to.",
    intro:
      "I initiated the dashboard-to-online-EMR workflow redesign as a coordinator and it was implemented off my presentation to the company two roles later, rewrote the CPR certification material for the clinicians completing it, and rebuilt the onboarding program — Epic, HIPAA, compliance, and the technical and soft skills — for new administrative staff.",
    disclaimer: "Anonymized evidence · organization-wide results are attributed to the initiative",
    metrics: [
      { tag: "Scale", n: "21,000+", label: "clinicians and administrative staff across the workflows I redesigned" },
      { tag: "Contributed to", n: "20%", label: "organization-wide EMR cost reduction, inside a larger initiative" },
      { tag: "Led", n: "70%", label: "ahead of deadline — every CPR certification collected early, on a deadline that was about to be pushed back" },
    ],
    route: ["Observe the real work", "Map the failure", "Align the system", "Ship what lasts"],
  },

  close: {
    title: "Designing a system people cannot afford to distrust?",
    body: "I know how to find the workaround, make it visible, and turn it into a product decision a complicated organization can actually ship.",
    cta: "Send me a note →",
  },
  next: { eyebrow: "Next case study", title: "Mobbin", tag: "UX flow documentation · 200+ screens" },
};

const es: MskCopy = {
  pageTitle: "MSK — Estudio de caso de sistemas clínicos",
  breadcrumb: { work: "Trabajo", here: "Memorial Sloan Kettering" },
  jumpLabel: "Ir a",
  chapters: [
    { id: "msk-start", label: "Inicio", note: "Registros digitales, impresos para archivarse digitalmente" },
    { id: "msk-brief", label: "Problema", note: "Un flujo digital se volvió un ritual de papel" },
    { id: "msk-workflow", label: "Flujo", note: "Una cola de archivo reemplazó el desvío" },
    { id: "msk-decisions", label: "Decisiones", note: "El botón simple no era simple" },
    { id: "msk-redesigns", label: "Rediseños", note: "La misma falla, en dos lugares más" },
    { id: "msk-systems", label: "Contexto", note: "Por qué pude verlo" },
    { id: "msk-outcomes", label: "Resultados", note: "Evidencia que duró" },
  ],

  hero: {
    eyebrow: "Memorial Sloan Kettering · sistemas clínicos",
    title: "Una cola de archivo reemplazó un desvío de cuatro sistemas.",
    readTime: "6 min",
    readMeta: "de lectura · 6 años, 3 puestos",
    ledeOpen:
      "El personal clínico imprimía registros digitales solo para volver a archivarlos digitalmente — y un registro en tránsito es un registro que no está en la historia clínica cuando el siguiente clínico la abre. En el puesto de coordinación de oficina, mapeé ese desvío entre las áreas clínica, de TI, de imagenología y de operaciones, y luego presenté el flujo en línea que se implementó dos puestos después. Sirvió a un trabajo que alcanzaba a ",
    ledeScale: "más de 21,000 clínicos y personal administrativo",
    ledeMiddle: ", y ",
    ledeSustain: "sigue en uso tras dos actualizaciones del sistema",
    ledeClose: ".",
    cta: "Ver el flujo →",
    artifactTag: "ARTEFACTO RECREADO",
    artifactName: "Cola de archivo de coordinación · sin datos de pacientes",
    dashboardAria: "Concepto recreado de la cola de archivo de coordinación de oficina",
  },

  receipt: {
    kicker: "Empezó con un desvío",
    title: "El flujo digital se había vuelto un ritual de papel.",
    body:
      "Cada jornada clínica pasa por el EMR: el expediente médico electrónico, donde vive la historia de un paciente. La cola en línea mantuvo el archivo en pantalla y regresó con su estado actualizado.",
    run: "Recorrer la ruta en línea",
    replay: "Repetir la ruta en línea",
    ready: "Listo para archivar.",
    steps: ["Cola abierta", "Permiso confirmado", "Archivado en la historia en línea", "Regreso con el estado actualizado"],
    nodes: [
      { n: "01", label: "Cola", value: "Lista de trabajo lista" },
      { n: "02", label: "Acción de archivo", value: "Permiso confirmado" },
      { n: "03", label: "Historia en línea", value: "Archivado" },
      { n: "04", label: "Regreso", value: "Estado actualizado" },
    ],
    paperLabel: "ESTADO DE LA COLA",
    paperValue: "ARCHIVADO",
    paperNote: "Regresó al panel · estado actualizado",
    boundary: "Interacción recreada · sin datos de pacientes",
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
      "Encontrar el documento",
      "Imprimir el registro digital",
      "Enviar el papel a imagenología",
      "Esperar a que lo escaneen",
      "Volver después a confirmar el archivo",
    ],
    after: [
      "Abrir la cola del panel",
      "Seleccionar el documento",
      "Elegir Enviar al EMR",
      "Se archiva dentro de la historia en línea",
      "Volver con el estado actualizado",
    ],
    mapBefore: "ANTES · 6 PASOS · SALE DEL EMR",
    mapAfter: "DESPUÉS · 5 PASOS · NUNCA SALE DEL EMR",
    mapAside: "tres pasos fuera del sistema",
    mapNodesBefore: ["Abrir cola", "Buscar doc.", "Imprimir", "Enviar a imagen.", "Esperar escaneo", "Revisar archivo"],
    mapNodesAfter: ["Abrir cola", "Elegir doc.", "Enviar al EMR", "Archiva en historia", "Estado actualizado"],
    provenanceKicker: "Cómo se hicieron estos artefactos",
    provenanceBody:
      "Cada pantalla y cada mapa aquí se reconstruyeron a partir de mi propia documentación del estado actual. Sin información de salud protegida, sin registros exportados y sin reproducir la interfaz del proveedor. Mostrar el flujo no exige mostrar a un paciente, así que no lo hace.",
  },

  blueprint: {
    introKicker: "Luego conté los traspasos",
    introTitle: "Un paso eliminó un área entera.",
    introLede:
      "De seis pasos a cinco es el cambio que se puede contar. El cambio que importó es que el registro dejó de cruzar una línea que nadie podía ver. Abajo está la misma ruta, dibujada según quién tenía el registro en la mano.",
    beforeBtn: "Antes · un traspaso",
    afterBtn: "Después · sin traspaso",
    statusBefore:
      "Durante dos pasos el registro queda bajo la línea de visibilidad, en manos de nadie que la coordinación pueda ver.",
    statusAfter: "El registro nunca sale de la vista de la coordinación, y la cola informa de vuelta.",
    lanes: { evidence: "Evidencia", front: "Coordinación", back: "Imagenología", support: "EMR + permisos" },
    laneSubs: { evidence: "Lo que existe", front: "Escenario visible", back: "Trastienda", support: "Soporte" },
    visibility: "LÍNEA DE VISIBILIDAD",
    waiting: "la coordinación espera",
    noSignal: "SIN SEÑAL DE VUELTA — POR ESO EXISTE EL PASO 06",
    nodesBefore: [
      "Cola del panel", "Abrir la cola", "Registro en el EMR",
      "Registro en pantalla", "Buscar documento",
      "Página impresa", "Imprimir el registro",
      "Papel en tránsito", "Enviar a imagenología",
      "Cola de escaneo", "Esperar el escaneo",
      "Entrada en la historia", "Revisar el archivo", "De vuelta en el EMR",
    ],
    nodesAfter: [
      "Cola del panel", "Abrir la cola", "Registro en el EMR",
      "Registro en pantalla", "Seleccionar documento", "Listo + permiso verificado",
      "Una acción", "Enviar al EMR", "El permiso lo autoriza",
      "Entrada en la historia", "Se archiva en la historia",
      "Estado de la cola", "Volver, estado actualizado", "Sigue en el EMR",
    ],
    key: {
      frontTerm: "Coordinación · escenario visible",
      frontBefore:
        "Abre la cola, busca el documento, lo imprime — y después tiene que volver a revisar si alguna vez se archivó.",
      frontAfter:
        "Abre la cola, selecciona el documento, lo envía a la historia y regresa a la cola con el estado ya actualizado.",
      backTerm: "Imagenología · trastienda",
      backBefore:
        "Recibe el papel y lo escanea. Hace el trabajo bien, fuera de la vista, y sin manera de informar de vuelta a la cola.",
      backAfter:
        "Ya no está en esta ruta. El área que antes recibía papel nunca entra al flujo de archivo.",
      supportTerm: "EMR y permisos · soporte",
      supportBefore:
        "Tiene el registro antes de imprimirlo y después de escanearlo — pero no en medio, que es justo donde está el hueco.",
      supportAfter:
        "Escribe el registro en la historia en línea y muestra la acción solo cuando el registro está listo y el permiso lo autoriza.",
      changedTerm: "Qué cambió",
      changedBefore:
        "Seis pasos, pero solo uno importa: el momento en que el registro cruza la línea de un área sin que vuelva ninguna señal.",
      changedAfter:
        "Un área salió de la ruta. El registro se queda por encima de la línea de visibilidad desde que se abre hasta que se confirma.",
    },
    switchAria: "Elegir qué ruta muestra el plano de servicio",
  },

  dashboard: {
    groupAria: "Maqueta anonimizada de la cola de archivo de coordinación de oficina",
    tableAria: "Cola anonimizada de archivo de documentos de pacientes",
    eyebrow: "Concepto anonimizado de herramienta interna",
    title: "Mi cola de archivo",
    roleView: "Vista de coordinación de oficina",
    queueMeta: "47 en la cola · 09:42",
    toolbar: ["Todos los pacientes", "Listo para enviar", "Requiere revisión"],
    columns: { patient: "Paciente", document: "Documento", status: "Estado", routedTo: "Enviado a", action: "Acción" },
    rows: [
      { mrn: "••••4821", received: "Recibido hace 2 h", doc: "Consentimiento firmado", status: "Listo para enviar", slug: "ready-to-file", routed: "Cola de archivo", action: "Enviar al EMR" },
      { mrn: "••••5518", received: "Recibido hace 5 h", doc: "Orden firmada", status: "Listo para enviar", slug: "ready-to-file", routed: "Cola de archivo", action: "Enviar al EMR" },
      { mrn: "••••7305", received: "Recibido hace 1 d", doc: "Registros externos", status: "Requiere revisión", slug: "needs-review", routed: "Supervisión", action: "Revisar" },
      { mrn: "••••1043", received: "Recibido hace 1 d", doc: "Informe de patología", status: "Listo para enviar", slug: "ready-to-file", routed: "Cola de archivo", action: "Enviar al EMR" },
      { mrn: "••••2960", received: "Recibido hace 3 d", doc: "Resumen de alta", status: "En la historia", slug: "filed-to-chart", routed: "Completo", action: "Ver registro" },
    ],
    mrnTerm: "MRN",
    mrnDef: "número de expediente médico, el identificador de la historia de un paciente. Enmascarado a los últimos cuatro dígitos.",
    emrTerm: "EMR",
    emrDef: "expediente médico electrónico, la historia digital donde vive todo el historial de un paciente.",
    ruleLabel: "Regla:",
    ruleAction: "Enviar al EMR",
    rule: "aparece solo cuando el documento está listo y el puesto de coordinación tiene permisos de archivo.",
  },

  decisions: {
    kicker: "El arreglo parecía un solo botón",
    title: "El botón “simple” cargaba con todo el sistema.",
    intro:
      "Una acción reemplazó los tres pasos que salían del sistema. Todo lo que hacía seguro presionarlo tenía que ser legible antes de que alguien lo presionara.",
    steps: [
      { n: "01", title: "Mostrar la acción solo cuando el registro está listo", body: "El personal deja de abrir registros que aún necesitan revisión.", note: "Listo significa accionable" },
      { n: "02", title: "Hacer visibles los límites de permiso", body: "Los puestos de solo lectura ven estado y responsabilidad, no un botón desactivado y misterioso.", note: "El permiso es lógica de producto" },
      { n: "03", title: "Separar bloqueado de no iniciado", body: "Las excepciones reciben un motivo y una persona responsable, para que el rezago deje de esconderlas.", note: "Lo bloqueado necesita responsable" },
      { n: "04", title: "Devolver a la gente a la cola", body: "El personal aterriza donde empezó, con el estado actualizado.", note: "Conservar el lugar y el contexto" },
    ],
  },

  redesigns: {
    kicker: "Y luego apareció la misma forma otra vez",
    title: "La misma falla, en dos lugares más.",
    lede:
      "Una vez que supe cómo se veía, la encontré en la certificación de RCP y en el programa de incorporación. La misma causa de fondo cada vez: hecho para la institución, no para la persona que tenía que atravesarlo.",
    wrongLabel: "En qué me equivoqué",
    items: [
      {
        n: "01",
        title: "Flujo de archivo del EMR",
        finding: "Un registro digital se imprimía, se enviaba fuera y luego esperaba para reaparecer en la historia clínica.",
        change: "Una sola acción en el panel, puesta donde la decisión ya se estaba tomando.",
        wrong: "Subestimé la gestión del cambio. Capacitar en sus propias estaciones de trabajo, durante los cambios de turno, lo resolvió en dos semanas.",
      },
      {
        n: "02",
        title: "Certificación de RCP",
        finding: "El material estaba escrito en lenguaje técnico y legal. Tan poca gente clínica lo completaba que el plazo de cumplimiento estaba a punto de posponerse.",
        change: "Lo reescribí para las personas que tenían que completarlo, no para quienes lo redactaron. Llegaron todas las certificaciones — un 70% antes del plazo que estaba por incumplirse.",
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
    title: "Aprendí el sistema desde el piso hacia arriba.",
    lede: "Ese patrón no se ve desde fuera de un sistema. Yo ya me había sentado en tres de sus sillas.",
    rolesAria: "Tres puestos en MSK, en orden",
    methodLabel: "El método que me dio",
    roles: [
      {
        n: "01", role: "Coordinación de oficina", taught: "Dónde se detenía la gente",
        term: "Lean Six Sigma Green Belt (Purdue) · Maestría en Administración de Salud (Rutgers)",
        body: "Terminé ambas en este puesto, mientras llevaba el papeleo de una clínica. El Green Belt es la lente que mostró cuatro sistemas haciendo el trabajo de dos; la maestría es la razón por la que el rediseño sobrevivió a las discusiones de presupuesto y a los cambios de liderazgo.",
      },
      {
        n: "02", role: "Asistencia administrativa", taught: "Cómo sobrevive la evidencia a una sala",
        term: "Escribir para quien tiene que actuar",
        body: "Aquí no hay certificado. Convertir decisiones de liderazgo en informes claros me enseñó a escribir para la persona que tiene que actuar. La reescritura de RCP y la presentación del EMR salieron de esa práctica.",
      },
      {
        n: "03", role: "Especialista de capacitación I", taught: "La autoridad para rediseñarlo",
        term: "Capacitación y facilitación (ATD) · mapeo del estado actual",
        body: "Di instrucción sobre Epic, HIPAA y los módulos de cumplimiento. Hacerme cargo de cómo se le enseñaba el sistema al personal significó documentar lo que de verdad pasa, no lo que dice la política — y la brecha entre las dos es donde vive el trabajo de diseño.",
      },
    ],
    cards: [
      { tag: "01 · Observar", title: "Encontrar los desvíos", body: "Acompañar turnos reales. Las notas adhesivas y las hojas de cálculo personales decían la verdad que el mapa de políticas no veía." },
      { tag: "02 · Alinear", title: "Volver compartida la falla", body: "Los mapas del estado actual le dieron a cuatro áreas una sola imagen con la cual discutir, en vez de cuatro cadenas de correo." },
      { tag: "03 · Rediseñar", title: "Ordenar la siguiente acción", body: "Mover la tarea a donde la decisión ya ocurre, y luego hacer visibles la responsabilidad y las excepciones." },
    ],
    ownershipLabel: "Qué significa aquí el diseño de servicios:",
    ownershipBody:
      "Me hago cargo de toda la ruta que recorre una tarea — a través de cuatro sistemas y tres áreas que no me reportaban — no de la pantalla del final. La cola de arriba es una pantalla. La razón por la que funciona es todo lo que está detrás.",
    boundaryAria: "Límite de evidencia de la investigación en MSK",
    boundaryLabel: "Límite de la evidencia",
    boundaryBody:
      "El registro original conserva el flujo, las áreas, las decisiones y los resultados. Los conteos de participantes de la observación de turnos no se registraron, así que uso esta evidencia para explicar las decisiones, no para afirmar una prevalencia.",
    mapFallback: "Sistemas enredados → mapeados → rediseñados → confiables",
    mapStagesAria: "Etapas de transformación del sistema clínico",
    mapStages: ["Sistemas enredados", "Mapeados", "Rediseñados", "Con la confianza del personal clínico"],
  },

  sustainment: {
    kicker: "La prueba de verdad llegó después",
    title: "Casi todas las herramientas internas mueren en silencio. Estas no.",
    lede:
      "Una actualización del sistema, o que el proyecto simplemente termine — eso es lo que normalmente acaba con una herramienta interna, sin importar lo que se pensara de ella al lanzarla. Estas dos siguieron de largo.",
    figcaption: "Qué sobrevivió cada sistema, y dónde está hoy",
    shipped: "LANZADO",
    lanes: [
      {
        name: "Flujo de archivo del EMR",
        events: [{ at: 0.3, label: "actualización del sistema" }, { at: 0.62, label: "actualización del sistema" }],
        outcome: "sigue en uso",
      },
      {
        name: "Formato de certificación de RCP",
        events: [{ at: 0.34, label: "el proyecto cierra antes" }],
        outcome: "lo siguen usando otras áreas administrativas",
      },
    ],
    survived: [
      { fact: "Flujo de archivo del EMR", what: "Adoptado en toda la organización, y todavía en uso tras dos actualizaciones del sistema" },
      { fact: "Formato de certificación de RCP", what: "Un proyecto de dos meses que cerró antes de tiempo — otras personas administrativas siguen usando hoy el método de recolección" },
    ],
    why:
      "Nada de eso es suerte. La cola de archivo sobrevivió a dos actualizaciones porque había dejado de ser un desvío que la gente mantenía a mano — el trabajo estaba en el sistema, no en la hoja de cálculo de alguien. El formato de certificación sobrevivió dos meses a su propio proyecto, y luego siguió, porque las personas para quienes se escribió lo preferían a lo que había antes.",
    proofLabel: "Prueba independiente · MSK News",
    proofTitle: "Del ejército a Memorial Sloan Kettering",
    proofAria: "Leer el perfil de carrera de Hillary Esposito en MSK News (se abre en una pestaña nueva)",
  },

  outcomes: {
    kicker: "A cuánto sumó",
    title: "Los números, y a quién pertenecen.",
    intro:
      "Inicié el rediseño del flujo del panel al EMR en línea desde el puesto de coordinación, y se implementó a partir de mi presentación a la organización dos puestos después; reescribí el material de certificación de RCP para el personal clínico que debía completarlo; y reconstruí el programa de incorporación — Epic, HIPAA, cumplimiento y las habilidades técnicas y blandas — para el nuevo personal administrativo.",
    disclaimer: "Evidencia anonimizada · los resultados de toda la organización se atribuyen a la iniciativa",
    metrics: [
      { tag: "Escala", n: "21,000+", label: "clínicos y personal administrativo en los flujos que rediseñé" },
      { tag: "Contribuí a", n: "20%", label: "reducción de costos del EMR en toda la organización, dentro de una iniciativa mayor" },
      { tag: "Dirigí", n: "70%", label: "antes del plazo — todas las certificaciones de RCP recolectadas temprano, en un plazo que estaba por posponerse" },
    ],
    route: ["Observar el trabajo real", "Mapear la falla", "Alinear el sistema", "Lanzar lo que dura"],
  },

  close: {
    title: "¿Diseñando un sistema en el que la gente no puede permitirse desconfiar?",
    body: "Sé cómo encontrar el desvío, hacerlo visible y convertirlo en una decisión de producto que una organización complicada de verdad pueda lanzar.",
    cta: "Escríbeme →",
  },
  next: { eyebrow: "Siguiente estudio de caso", title: "Mobbin", tag: "Documentación de flujos UX · más de 200 pantallas" },
};

export const MSK_COPY: Record<Lang, MskCopy> = { en, es };
