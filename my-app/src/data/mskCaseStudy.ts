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
    /** Tag over the two After nodes that are Hillary's design rules, not MSK's build. */
    designTag: string;
    legend: { aria: string; observed: string; built: string; design: string };
    /** One line under the drawing: what it is built from. */
    builtFrom: string;
    swipeHint: string;
    canvasAria: string;
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
    /** How the rules could be checked; restates the three measures under "What I would have measured". */
    check: string;
    steps: { n: string; title: string; body: string; note: string }[];
  };

  redesigns: {
    kicker: string;
    title: string;
    lede: string;
    wrongLabel: string;
    items: { n: string; title: string; finding: string; change: string; wrong?: string }[];
    mechanismLabels: {
      beforeProse: string; denseBlock: string; afterSteps: string;
      beforeCohort: string; sameStandard: string; afterCohort: string;
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
  pageTitle: "MSK: Clinical Systems Case Study",
  breadcrumb: { work: "Work", here: "Memorial Sloan Kettering" },
  jumpLabel: "In this case study",
  chapters: [
    { id: "msk-start", label: "Start" },
    { id: "msk-brief", label: "Problem" },
    { id: "msk-workflow", label: "What I did" },
    { id: "msk-decisions", label: "Button rules" },
    { id: "msk-redesigns", label: "More fixes" },
    { id: "msk-systems", label: "Background" },
    { id: "msk-outcomes", label: "Results" },
  ],

  hero: {
    eyebrow: "Memorial Sloan Kettering · service design",
    title: "Service design project for Memorial Sloan Kettering Cancer\u00a0Center",
    readTime: "6 min",
    readMeta: "read · 6 years, 3 jobs",
    ledeOpen:
      "Messages from the patient portal didn’t save to the patient’s chart, so staff printed them to be scanned in. As an office coordinator, I mapped that workaround across four departments: clinical, IT, operations, and HIM (health information management, the team that scans paper into charts). Then I pitched an online fix. It was built two jobs later, at a cancer center of ",
    ledeScale: "21,000+ staff",
    ledeMiddle: ", and ",
    ledeSustain: "I later saw it in the live system while training new employees",
    ledeClose: ".",
    cta: "See the workflow →",
    artifactTag: "RE-CREATION",
    artifactName: "Office Coordinator filing queue",
    dashboardAria: "Re-created concept of the Office Coordinator filing queue",
  },

  receipt: {
    kicker: "It started with a workaround",
    titleLines: ["Online messages", "ended up on\u00a0paper."],
    body:
      "The care team needed to see everything in the patient’s chart right away. Until the scan was done, they switched between systems to check the facts, or they waited. That could delay a patient’s care.",
    run: "Play the online path",
    replay: "Play the online path again",
    ready: "Ready to file.",
    steps: ["Queue opened", "Permission checked", "Filed to the patient’s chart", "Back to the queue, status updated"],
    boundary: "Re-created, not the real software",
  },

  workflow: {
    kicker: "So I counted the steps",
    title: "I drew one map that all four departments could see.",
    lede:
      "Nobody had written the whole path down. On one page, four departments saw the same problem, not four versions of it.",
    figcaption: "Re-created map of the path before and after · no patient data",
    beforeLabel: "Before · six steps",
    beforeHeading: "Print, route, wait, check again",
    afterLabel: "After · five steps",
    afterHeading: "File from the queue, return with status",
    before: [
      "Open the dashboard queue",
      "Find the message",
      "Print the portal message",
      "Send the paper to HIM",
      "Wait for it to be scanned",
      "Come back later to check it was filed",
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
    mapNodesBefore: ["Open queue", "Find message", "Print", "Send to HIM", "Wait for scan", "Check it was filed"],
    mapNodesAfter: ["Open queue", "Select message", "Send to EMR", "Files in chart", "Status updated"],
    provenanceKicker: "How I made these screens",
    provenanceBody:
      "I redrew every screen and map here from memory of my own notes on how the work was done. The original notes were lost. There’s no private patient information, no exported records, and no copy of the real software’s screens. Showing the path doesn’t need a patient, so it doesn’t show one.",
  },

  blueprint: {
    introKicker: "Then I counted the handoffs",
    introTitle: "Six steps became five, and one department dropped out.",
    introLede:
      "On screen, the change was one fewer step. Behind the scenes, one whole department no longer had to handle the message. Below is the same path, sorted by who was holding it.",
    beforeBtn: "Before · one handoff",
    afterBtn: "After · no handoff",
    statusBefore:
      "For two steps the message drops out of sight. The coordinator can’t tell who has it.",
    statusAfter: "The message never leaves the coordinator’s sight, and the queue shows when it’s filed.",
    // The four departments (msk.md, 2026-10-14 answer 6): clinical writes the
    // message, operations is the coordinator, HIM scans paper, IT owns the
    // portal, the EMR, and permissions.
    lanes: { evidence: "Care team message", front: "Coordinator", back: "HIM · scanning team", support: "Portal + EMR" },
    laneSubs: { evidence: "The message", front: "Operations · in view", back: "Out of sight", support: "IT · systems" },
    visibility: "LINE OF SIGHT",
    // Synthesis-lens review 2026-11-19: the shaded band read like a measured
    // wait. No one measured it, so the label says so.
    waiting: "coordinator is waiting (length not measured)",
    noSignal: "No word comes back, which is why step 6 exists",
    nodesBefore: [
      "Dashboard queue", "Open queue", "In the portal",
      "Message on screen", "Find message",
      "Printed page", "Print the message",
      "Paper on its way", "Send to HIM",
      "Scan pile", "Wait for scan",
      "Chart entry", "Check it was filed", "Now in the EMR",
    ],
    nodesAfter: [
      "Dashboard queue", "Open queue", "In the portal",
      "Message on screen", "Select message", "Ready + role checked",
      "One button", "Send to EMR", "Permission allows it",
      "Chart entry", "Files in the chart",
      "Queue status", "Back, status updated", "Now in the EMR",
    ],
    designTag: "my design, not MSK’s",
    legend: {
      aria: "What each box shows",
      observed: "Before: what I saw (observed)",
      built: "After, solid boxes: built by IT and UX",
      design: "Dotted boxes: my design, not MSK’s",
    },
    builtFrom: "Built from memory of my own notes on the work. No patient data. My counts were lost, so I make no claim about how often this happened.",
    swipeHint: "Swipe to see all steps",
    canvasAria: "Service blueprint drawing. Scroll sideways to see all steps.",
    key: {
      frontTerm: "Coordinator (operations) · in view",
      frontBefore:
        "Opens the queue, finds the message, prints it, then has to come back later to check it was ever filed.",
      frontAfter:
        "Opens the queue, picks the message, sends it to the chart, and lands back on the queue with the status already updated.",
      backTerm: "HIM (the scanning team) · out of sight",
      backBefore:
        "Gets the paper and scans it. They do the job right, but out of sight, with no way to report back to the queue.",
      backAfter:
        "Off this path. The team that used to get the paper no longer handles these messages.",
      supportTerm: "IT: portal, EMR, and permissions · systems",
      supportBefore:
        "Their systems hold the message before it’s printed and after it’s scanned. Not in between, and that’s the gap.",
      supportAfter:
        "Writes the message into the chart, and exposes the action only when the message is ready and the role allows it.",
      changedTerm: "What changed",
      changedBefore:
        "Six steps, but one matters most: the message passes to another department, and no word comes back.",
      changedAfter:
        "One department left the path. The coordinator can see the message from start to finish.",
    },
    switchAria: "Choose which path the map shows",
  },

  dashboard: {
    groupAria: "Anonymized mock-up of the Office Coordinator filing queue",
    tableAria: "Anonymized queue of patient messages to file",
    eyebrow: "Anonymized concept of a staff-only tool",
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
    rule: "appears only when the message is ready and the coordinator’s role includes filing rights.",
  },

  decisions: {
    kicker: "The fix looked like one button",
    title: "I set four rules for how the button behaves.",
    intro:
      "One button replaced the three steps that left the system. IT and UX built the real one. I wrote the four rules below for this portfolio version. They are not MSK’s actual design.",
    check:
      "How I’d check them: minutes from a message arriving to it landing in the chart, messages filed to the wrong patient’s chart, and pages printed.",
    steps: [
      { n: "01", title: "Show the button only when the message is ready", body: "So staff don’t open messages that still need a review.", note: "Ready means you can act on it" },
      { n: "02", title: "Show who is allowed to file", body: "Staff who can only view see the status and who has it, not a gray button with no reason.", note: "Who can do what is part of the design" },
      { n: "03", title: "Tell stuck messages apart from new ones", body: "A stuck message gets a reason and a person in charge, so it can’t hide in the pile.", note: "Stuck needs a person" },
      { n: "04", title: "Send people back to the queue", body: "After filing, staff land where they started, with the status updated.", note: "Don’t lose their place" },
    ],
  },

  redesigns: {
    kicker: "Then it turned up twice more",
    title: "I found the same problem in two more places.",
    // Synthesis-lens review 2026-11-19: "people couldn't tell what to do next"
    // fit the CPR card but not the new-hire card (one course for every skill
    // level). This line is labelled as her reading and is true of both.
    lede:
      "My reading of the pattern: both were written for someone other than the person using them. Clinicians got legal language. New hires got one course for every skill level.",
    wrongLabel: "What I got wrong",
    items: [
      {
        n: "02",
        title: "CPR certification",
        finding: "The CPR (cardiopulmonary resuscitation) course was written in technical, legal language. So few clinicians got through it that the team planned a 4-month extension.",
        change: "I rewrote it in plain language for the people who had to finish it. The whole department certified a month before the original deadline.",
      },
      {
        n: "03",
        title: "Training new office staff",
        finding: "Every new office hire learned Epic, HIPAA, the compliance courses, and the people skills of the job the same way. Some already knew the systems. Some had never opened them.",
        change: "I worked with the design team to rebuild the program. Then I adjusted it for each group, so the one-to-three-week course fit the people actually in the room.",
      },
    ],
    mechanismLabels: {
      beforeProse: "BEFORE · LEGAL LANGUAGE", denseBlock: "one dense block",
      afterSteps: "AFTER · STEPS A CLINICIAN CAN FOLLOW",
      beforeCohort: "BEFORE · ONE COURSE FOR EVERY GROUP", sameStandard: "same standard",
      afterCohort: "AFTER · ADJUSTED FOR EACH GROUP",
    },
  },

  systems: {
    kicker: "Why I could see it",
    title: "I did the jobs before I redesigned them.",
    lede: "You don’t spot a problem like this from outside. I had already done three jobs inside it.",
    rolesAria: "Three roles at MSK, in order",
    methodLabel: "The method it gave me",
    roles: [
      {
        n: "01", role: "Office Coordinator", taught: "Where people got stuck",
        term: "Lean Six Sigma Green Belt (Purdue) · Master of Healthcare Administration (Rutgers)",
        body: "I finished both in this job, while running a clinic’s paperwork. The Green Belt is a certificate in improving how work gets done. It’s how I saw one filing task passing through four departments.",
      },
      {
        n: "02", role: "Administrative Assistant", taught: "How to write for the person doing the task",
        term: "Writing for the person doing the task",
        body: "No certificate for this one. Technical, legal language kept clinicians from finishing CPR certification. I rewrote it in plain language, and the department certified a month before the original deadline.",
      },
      {
        n: "03", role: "Training Facilitator", taught: "The authority to redesign it",
        term: "Training & Facilitation (ATD, the Association for Talent Development) · mapping how work really happens",
        body: "I taught Epic (the medical record software), HIPAA (the patient-privacy law), and the compliance courses. To teach the system well, I wrote down what staff really did, not what the policy said. The gap between the two is where the design work is.",
      },
    ],
    cards: [
      { tag: "01 · Watch", title: "Find the workarounds", body: "Shadow real shifts. The sticky notes and personal spreadsheets told the truth the policy map missed." },
      { tag: "02 · Share", title: "Show everyone the same problem", body: "Maps of how the work really ran gave four departments one picture to argue with, not four email threads." },
      { tag: "03 · Redesign", title: "Put the next step in reach", body: "Move the task to where the decision already happens. Then show who owns it and what’s stuck." },
    ],
    ownershipLabel: "My scope:",
    ownershipBody:
      "I own the whole path a task takes, across four departments that didn’t report to me, not just the screen at the end. The queue above is one screen. It works because of everything behind it.",
    boundaryAria: "What this research does and doesn’t show",
    boundaryLabel: "What this proves, and what it doesn’t",
    boundaryBody:
      "My notes kept the path, the departments, the decisions, and the results. I didn’t record how many people I watched on shift, so this explains the decisions. It doesn’t prove how common the problem was.",
    mapFallback: "One task, four departments → mapped → redesigned → in the live system",
    mapStagesAria: "Stages of the change",
    mapStages: ["One task, four departments", "Mapped", "Redesigned", "In the live system"],
  },

  sustainment: {
    kicker: "The real test came later",
    title: "What happened after I left that role.",
    lede:
      "IT approved it once funding came in and built it as I pitched it. I don’t know what changed behind the scenes. Later, while training new employees, I saw it in the live system.",
    // Claim audit 2026-10-13: the lanes used to say "system upgrade" ×2,
    // "still in use" and "still used by other admins" — claims Hillary cut on
    // 2026-09-27 (msk.md F2/F3: no source; she was not present after launch).
    // The drawing kept them after the text list was corrected. Lanes now carry
    // only what the sources support: the handoff, the button in production
    // (seen first-hand while training; register 2026-11-01), and compliance a month early (Q3/Q5).
    figcaption: "What happened after each one launched",
    shipped: "LAUNCHED",
    lanes: [
      {
        name: "Filing to the chart",
        events: [{ at: 0.42, label: "handed to IT and UX" }],
        outcome: "added to the live system",
      },
      {
        name: "CPR course rewrite",
        events: [{ at: 0.5, label: "certified a month early" }],
        outcome: "no extension needed",
      },
    ],
    survived: [
      { fact: "Filing to the chart", what: "Added to the live system. I saw it there while training new employees." },
      { fact: "CPR course rewrite", what: "The whole department certified a month before the original deadline. No extension needed." },
    ],
    why:
      "A personal workaround became part of the shared system. The plain-language course got the department certified before the deadline.",
    proofLabel: "Profile · MSK News",
    proofTitle: "From the military to Memorial Sloan Kettering",
    proofAria: "Read Hillary Esposito’s career profile in MSK News (opens in new tab)",
  },

  outcomes: {
    kicker: "What it added up to",
    title: "What changed, and who gets the credit.",
    intro:
      "As a coordinator, I started the push to file portal messages straight to the online chart. It was built from my pitch two jobs later. I also rewrote the CPR course for the clinicians taking it. And I rebuilt training for new office staff: Epic, HIPAA, compliance, and the people skills of the job.",
    disclaimer: "Details anonymized · hospital-wide results belong to the whole effort, not just me · the ~$1M/year is a forecast from my pitch, not measured savings",
    metrics: [
      { tag: "Led", n: "1 month", label: "early: the whole department certified before the original deadline, with no 4-month extension" },
      { tag: "Trained", n: "~2,000", label: "new employees I trained on Epic, HIPAA, and compliance, by my estimate" },
      { tag: "Contributed to", n: "20%", label: "lower printing and scanning costs, from my review of the numbers with the head of the finance department" },
      { tag: "Projection", n: "~$1M/year", label: "projected paper savings in my Process Improvement Fair pitch, not measured savings" },
    ],
    route: ["Watch the real work", "Map the problem", "Get every team on board", "Get it built"],
  },

  close: {
    title: "I find the workaround. Then I get it built.",
    body: "I map it so every department sees the same problem. Then I turn it into a plan the hospital will build.",
    cta: "Email me →",
  },
  next: { eyebrow: "Next case study", title: "Mobbin", tag: "Screen labeling · three finance apps" },
};

const es: MskCopy = {
  pageTitle: "MSK: Estudio de caso de sistemas clínicos",
  breadcrumb: { work: "Trabajo", here: "Memorial Sloan Kettering" },
  jumpLabel: "En este caso",
  chapters: [
    { id: "msk-start", label: "Inicio" },
    { id: "msk-brief", label: "Problema" },
    { id: "msk-workflow", label: "Lo que hice" },
    { id: "msk-decisions", label: "Reglas del botón" },
    { id: "msk-redesigns", label: "Más arreglos" },
    { id: "msk-systems", label: "Antecedentes" },
    { id: "msk-outcomes", label: "Resultados" },
  ],

  hero: {
    eyebrow: "Memorial Sloan Kettering · diseño de servicios",
    title: "Proyecto de diseño de servicios para Memorial Sloan Kettering Cancer\u00a0Center",
    readTime: "6 min",
    readMeta: "de lectura · 6 años, 3 trabajos",
    ledeOpen:
      "Los mensajes del portal de pacientes no se guardaban en la historia clínica del paciente, así que el personal los imprimía para escanearlos. Como coordinadora de oficina, mapeé ese desvío en cuatro áreas: clínica, TI (el equipo de tecnología), operaciones y HIM (gestión de información de salud, el equipo que escanea el papel a las historias). Luego propuse una solución en línea. Se construyó dos trabajos después, en un centro oncológico de ",
    ledeScale: "más de 21,000 empleados",
    ledeMiddle: ", y ",
    ledeSustain: "después la vi en el sistema en uso mientras capacitaba a nuevos empleados",
    ledeClose: ".",
    cta: "Ver el flujo →",
    artifactTag: "RECREACIÓN",
    artifactName: "Cola de archivo de coordinación",
    dashboardAria: "Concepto recreado de la cola de archivo de coordinación de oficina",
  },

  receipt: {
    kicker: "Empezó con un desvío",
    titleLines: ["Los mensajes en línea", "terminaban en\u00a0papel."],
    body:
      "El equipo de atención necesitaba ver todo lo que había en la historia del paciente de inmediato. Hasta que terminaba el escaneo, pasaban de un sistema a otro para comprobar los datos, o esperaban. Eso podía retrasar la atención de un paciente.",
    run: "Ver la ruta en línea",
    replay: "Ver otra vez la ruta en línea",
    ready: "Listo para archivar.",
    steps: ["Cola abierta", "Permiso verificado", "Archivado en la historia del paciente", "De vuelta en la cola, estado actualizado"],
    boundary: "Recreación, no el software real",
  },

  workflow: {
    kicker: "Así que conté los pasos",
    title: "Dibujé un mapa que las cuatro áreas podían ver.",
    lede:
      "Nadie había escrito la ruta completa. En una sola página, cuatro áreas vieron el mismo problema, no cuatro versiones de él.",
    figcaption: "Mapa recreado de la ruta antes y después · sin datos de pacientes",
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
      "Volver después a comprobar que se archivó",
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
    mapNodesBefore: ["Abrir cola", "Buscar mensaje", "Imprimir", "Enviar a HIM", "Esperar escaneo", "Ver si se archivó"],
    mapNodesAfter: ["Abrir cola", "Elegir mensaje", "Enviar al EMR", "Archiva en historia", "Estado actualizado"],
    provenanceKicker: "Cómo se hicieron estos artefactos",
    provenanceBody:
      "Redibujé de memoria cada pantalla y cada mapa de aquí, a partir de mis propias notas sobre cómo se hacía el trabajo. Las notas originales se perdieron. No hay información privada de pacientes, ni registros exportados, ni copias de las pantallas del software real. Mostrar la ruta no requiere mostrar a un paciente, así que no se muestra ninguno.",
  },

  blueprint: {
    introKicker: "Luego conté los traspasos",
    introTitle: "Seis pasos se volvieron cinco, y un área dejó de participar.",
    introLede:
      "En pantalla, el cambio fue un paso menos. Por detrás, un área entera ya no tuvo que manejar el mensaje. Abajo está la misma ruta, ordenada según quién tenía el mensaje.",
    beforeBtn: "Antes · un traspaso",
    afterBtn: "Después · sin traspaso",
    statusBefore:
      "Durante dos pasos el mensaje se pierde de vista. La coordinación no sabe quién lo tiene.",
    statusAfter: "El mensaje nunca sale de la vista de la coordinación, y la cola muestra cuándo se archiva.",
    lanes: { evidence: "Mensaje del equipo de atención", front: "Coordinación", back: "HIM · equipo de escaneo", support: "Portal + EMR" },
    laneSubs: { evidence: "El mensaje", front: "Operaciones · a la vista", back: "Fuera de la vista", support: "TI · sistemas" },
    visibility: "LÍNEA DE VISTA",
    waiting: "la coordinación espera (no se midió cuánto)",
    noSignal: "No vuelve ninguna respuesta, por eso existe el paso 6",
    nodesBefore: [
      "Cola del panel", "Abrir la cola", "En el portal",
      "Mensaje en pantalla", "Buscar mensaje",
      "Página impresa", "Imprimir el mensaje",
      "Papel en camino", "Enviar a HIM",
      "Pila de escaneo", "Esperar el escaneo",
      "Entrada en la historia", "Ver si se archivó", "Ya en el EMR",
    ],
    nodesAfter: [
      "Cola del panel", "Abrir la cola", "En el portal",
      "Mensaje en pantalla", "Seleccionar mensaje", "Listo + permiso verificado",
      "Un botón", "Enviar al EMR", "El permiso lo autoriza",
      "Entrada en la historia", "Se archiva en la historia",
      "Estado de la cola", "Volver, estado actualizado", "Ya en el EMR",
    ],
    designTag: "mi diseño, no el de MSK",
    legend: {
      aria: "Qué muestra cada recuadro",
      observed: "Antes: lo que vi (observado)",
      built: "Después, recuadros sólidos: los construyeron TI y UX",
      design: "Recuadros punteados: mi diseño, no el de MSK",
    },
    builtFrom: "Hecho de memoria a partir de mis propias notas sobre el trabajo. Sin datos de pacientes. Mis conteos se perdieron, así que no afirmo con qué frecuencia pasaba.",
    swipeHint: "Deslice para ver todos los pasos",
    canvasAria: "Dibujo del plano del servicio. Desplácese de lado para ver todos los pasos.",
    key: {
      frontTerm: "Coordinación (operaciones) · a la vista",
      frontBefore:
        "Abre la cola, busca el mensaje, lo imprime, y después tiene que volver para comprobar si alguna vez se archivó.",
      frontAfter:
        "Abre la cola, elige el mensaje, lo envía a la historia y vuelve a la cola con el estado ya actualizado.",
      backTerm: "HIM (el equipo de escaneo) · fuera de la vista",
      backBefore:
        "Recibe el papel y lo escanea. Hace bien su trabajo, pero fuera de la vista y sin manera de avisar a la cola.",
      backAfter:
        "Fuera de esta ruta. El equipo que antes recibía el papel ya no maneja estos mensajes.",
      supportTerm: "TI: portal, EMR y permisos · sistemas",
      supportBefore:
        "Sus sistemas guardan el mensaje antes de imprimirlo y después de escanearlo. No en medio, y ese es el hueco.",
      supportAfter:
        "Escribe el mensaje en la historia y muestra la acción solo cuando el mensaje está listo y el permiso lo autoriza.",
      changedTerm: "Qué cambió",
      changedBefore:
        "Seis pasos, pero uno importa más: el mensaje pasa a otra área y no vuelve ninguna respuesta.",
      changedAfter:
        "Un área salió de la ruta. La coordinación puede ver el mensaje de principio a fin.",
    },
    switchAria: "Elegir qué ruta muestra el mapa",
  },

  dashboard: {
    groupAria: "Maqueta anonimizada de la cola de archivo de coordinación de oficina",
    tableAria: "Cola anonimizada de mensajes de pacientes por archivar",
    eyebrow: "Concepto anonimizado de una herramienta solo para el personal",
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
    title: "Definí cuatro reglas para cómo se comporta el botón.",
    intro:
      "Un botón reemplazó los tres pasos que salían del sistema. TI y UX (el equipo de diseño de experiencia de usuario) construyeron el botón real. Escribí las cuatro reglas de abajo para esta versión del portafolio. No son el diseño real de MSK.",
    check:
      "Cómo las comprobaría: los minutos desde que llega un mensaje hasta que queda en la historia clínica, los mensajes archivados en la historia clínica del paciente equivocado y las páginas impresas.",
    steps: [
      { n: "01", title: "Mostrar el botón solo cuando el mensaje está listo", body: "Así el personal no abre mensajes que todavía necesitan revisión.", note: "Listo significa que se puede actuar" },
      { n: "02", title: "Mostrar quién puede archivar", body: "El personal que solo puede ver ve el estado y quién lo tiene, no un botón gris sin motivo.", note: "Quién puede hacer qué es parte del diseño" },
      { n: "03", title: "Distinguir los mensajes atascados de los nuevos", body: "Un mensaje atascado recibe un motivo y una persona a cargo, para que no se esconda en la pila.", note: "Lo atascado necesita una persona" },
      { n: "04", title: "Devolver a la gente a la cola", body: "Después de archivar, el personal vuelve a donde empezó, con el estado actualizado.", note: "No perder su lugar" },
    ],
  },

  redesigns: {
    kicker: "Luego apareció dos veces más",
    title: "Encontré el mismo problema en dos lugares más.",
    lede:
      "Mi lectura del patrón: los dos estaban escritos para alguien que no era la persona que los usaba. El personal clínico recibía lenguaje legal. El personal nuevo recibía un solo curso para todos los niveles.",
    wrongLabel: "En qué me equivoqué",
    items: [
      {
        n: "02",
        title: "Certificación de RCP",
        finding: "El curso de RCP (reanimación cardiopulmonar) estaba escrito en lenguaje técnico y legal. Tan poca gente clínica lo completaba que el equipo planeaba una prórroga de 4 meses.",
        change: "Lo reescribí en lenguaje sencillo para las personas que tenían que terminarlo. Toda el área se certificó un mes antes de la fecha límite original.",
      },
      {
        n: "03",
        title: "Capacitación del personal nuevo de oficina",
        finding: "Cada persona nueva de oficina aprendía de la misma forma Epic, HIPAA, los cursos de cumplimiento y el trato con la gente que pide el puesto. Algunas ya conocían los sistemas. Otras nunca los habían abierto.",
        change: "Trabajé con el equipo de diseño para reconstruir el programa. Luego lo ajusté para cada grupo, para que el curso de una a tres semanas sirviera a las personas que de verdad estaban en la sala.",
      },
    ],
    mechanismLabels: {
      beforeProse: "ANTES · LENGUAJE LEGAL", denseBlock: "un bloque denso",
      afterSteps: "DESPUÉS · PASOS QUE SE PUEDEN SEGUIR",
      beforeCohort: "ANTES · EL MISMO CURSO PARA TODOS LOS GRUPOS", sameStandard: "mismo estándar",
      afterCohort: "DESPUÉS · AJUSTADO PARA CADA GRUPO",
    },
  },

  systems: {
    kicker: "Por qué pude verlo",
    title: "Hice los trabajos antes de rediseñarlos.",
    lede: "Un problema así no se ve desde fuera. Yo ya había hecho tres trabajos adentro.",
    rolesAria: "Tres puestos en MSK, en orden",
    methodLabel: "El método que me dio",
    roles: [
      {
        n: "01", role: "Coordinación de oficina", taught: "Dónde se atascaba la gente",
        term: "Lean Six Sigma Green Belt (Purdue) · Maestría en Administración de Salud (Rutgers)",
        body: "Terminé ambas en este trabajo, mientras llevaba el papeleo de una clínica. El Green Belt es un certificado en mejorar cómo se hace el trabajo. Gracias a él vi que una sola tarea de archivo pasaba por cuatro áreas.",
      },
      {
        n: "02", role: "Asistencia administrativa", taught: "Cómo escribir para la persona que hace la tarea",
        term: "Escribir para la persona que hace la tarea",
        body: "Aquí no hay certificado. El lenguaje técnico y legal impedía que el personal clínico terminara la certificación de RCP. Lo reescribí en lenguaje sencillo, y el área se certificó un mes antes de la fecha límite original.",
      },
      {
        n: "03", role: "Facilitadora de capacitación", taught: "La autoridad para rediseñarlo",
        term: "Capacitación y facilitación (ATD, la Association for Talent Development) · mapear cómo se hace de verdad el trabajo",
        body: "Enseñé Epic (el software de la historia clínica), HIPAA (la ley de privacidad del paciente) y los cursos de cumplimiento. Para enseñar bien el sistema, anoté lo que el personal hacía de verdad, no lo que decía la política. La brecha entre las dos cosas es donde está el trabajo de diseño.",
      },
    ],
    cards: [
      { tag: "01 · Observar", title: "Encontrar los desvíos", body: "Acompañar turnos reales. Las notas adhesivas y las hojas de cálculo personales decían la verdad que el mapa de políticas no veía." },
      { tag: "02 · Compartir", title: "Mostrarles a todos el mismo problema", body: "Los mapas de cómo se hacía de verdad el trabajo le dieron a cuatro áreas una sola imagen para discutir, no cuatro cadenas de correo." },
      { tag: "03 · Rediseñar", title: "Poner el siguiente paso a la mano", body: "Mover la tarea a donde ya se toma la decisión. Luego mostrar quién se encarga y qué está atascado." },
    ],
    ownershipLabel: "Mi alcance:",
    ownershipBody:
      "Me hago cargo de toda la ruta que recorre una tarea, a través de cuatro áreas que no me reportaban, no solo de la pantalla del final. La cola de arriba es una pantalla. Funciona por todo lo que tiene detrás.",
    boundaryAria: "Lo que esta investigación muestra y lo que no",
    boundaryLabel: "Lo que esto demuestra, y lo que no",
    boundaryBody:
      "Mis notas guardaron la ruta, las áreas, las decisiones y los resultados. No anoté a cuántas personas observé en los turnos, así que esto explica las decisiones. No demuestra qué tan común era el problema.",
    mapFallback: "Una tarea, cuatro áreas → mapeada → rediseñada → en el sistema en uso",
    mapStagesAria: "Etapas de transformación del sistema clínico",
    mapStages: ["Una tarea, cuatro áreas", "Mapeada", "Rediseñada", "En el sistema en uso"],
  },

  sustainment: {
    kicker: "La prueba de verdad llegó después",
    title: "Lo que pasó después de que dejé ese puesto.",
    lede:
      "TI lo aprobó cuando llegó el financiamiento y lo construyó tal como lo propuse. No sé qué cambió por detrás. Más tarde, mientras capacitaba a nuevos empleados, lo vi en el sistema en uso.",
    figcaption: "Qué pasó después de lanzar cada uno",
    shipped: "LANZADO",
    lanes: [
      {
        name: "Archivo en la historia clínica",
        events: [{ at: 0.42, label: "entregado a TI y UX" }],
        outcome: "agregado al sistema en uso",
      },
      {
        name: "Reescritura del curso de RCP",
        events: [{ at: 0.5, label: "certificada un mes antes" }],
        outcome: "sin prórroga",
      },
    ],
    survived: [
      { fact: "Archivo en la historia clínica", what: "Agregado al sistema en uso. Lo vi ahí mientras capacitaba a nuevos empleados." },
      { fact: "Reescritura del curso de RCP", what: "Toda el área se certificó un mes antes de la fecha límite original. Sin prórroga." },
    ],
    why:
      "Un desvío personal pasó a ser parte del sistema compartido. El curso en lenguaje sencillo logró que el área se certificara antes de la fecha límite.",
    proofLabel: "Perfil · MSK News",
    proofTitle: "Del ejército a Memorial Sloan Kettering",
    proofAria: "Leer el perfil de carrera de Hillary Esposito en MSK News (se abre en una pestaña nueva)",
  },

  outcomes: {
    kicker: "A cuánto sumó",
    title: "Qué cambió, y a quién le corresponde el mérito.",
    intro:
      "Como coordinadora, impulsé que los mensajes del portal se archivaran directamente en la historia clínica en línea. Se construyó a partir de mi propuesta dos trabajos después. También reescribí el curso de RCP para el personal clínico que lo tomaba. Y reconstruí la capacitación del personal nuevo de oficina: Epic, HIPAA, cumplimiento y el trato con la gente que pide el puesto.",
    disclaimer: "Detalles anonimizados · los resultados de todo el hospital son del esfuerzo completo, no solo míos · los ~$1M/año son una previsión de mi propuesta, no un ahorro medido",
    metrics: [
      { tag: "Dirigí", n: "1 mes", label: "antes: toda el área se certificó antes de la fecha límite original, sin la prórroga de 4 meses" },
      { tag: "Capacité", n: "~2,000", label: "nuevos empleados que capacité en Epic, HIPAA y cumplimiento, según mi estimación" },
      { tag: "Contribuí a", n: "20%", label: "menos costos de impresión y escaneo, según mi revisión de las cifras con el jefe del departamento de finanzas" },
      { tag: "Proyección", n: "~$1M/año", label: "ahorro proyectado en papel en mi propuesta para la Feria de Mejora de Procesos, no un ahorro medido" },
    ],
    route: ["Observar el trabajo real", "Mapear el problema", "Sumar a todos los equipos", "Lograr que se construya"],
  },

  close: {
    title: "Encuentro el desvío. Después logro que se construya.",
    body: "Lo mapeo para que cada área vea el mismo problema. Luego lo convierto en un plan que el hospital va a construir.",
    cta: "Escríbame →",
  },
  next: { eyebrow: "Siguiente estudio de caso", title: "Mobbin", tag: "Etiquetado de pantallas · tres apps financieras" },
};

export const MSK_COPY: Record<Lang, MskCopy> = { en, es };
