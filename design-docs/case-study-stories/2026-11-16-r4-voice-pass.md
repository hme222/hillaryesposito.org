# R4 voice pass: bar-story drafts for the other case studies (2026-11-16)

DRAFTS ONLY. Nothing here is on the site. No file under `my-app/src` was changed.
Drafted by the content-writer agent (Fable) after Lex's note that the case studies read
"punchy and scannable only". Target voice: the MSK intro (`FlagshipMSK.tsx:162-164`) and
its "What I did." paragraph (`FlagshipMSK.tsx:207`).

Scope: hero sub-line plus the opening story paragraphs. All five H1s stay as they are.
Covered: Logistics, Knowunity, Mobbin, UX Woman, Grove. Grove lives in `RisoGrove.tsx`,
outside the `Flagship*.tsx` glob, but it is a case study with the same problem, so it is
included.

Every proposed sentence traces to a story file in this folder or to copy already on the
page (English or Spanish). Sources are named under each draft. Numbers are locked as
they appear now.

## MISSING: questions for Hillary (7)

1. **Logistics.** When you arrived, what was the 1–2 month wait doing to the soldiers or
   medics at the aid stations? (Asked as Q2b on 2026-11-16; the answer covered your role,
   not what was going wrong.)
2. **Logistics.** The bar interview stopped after the six-plus-one question. Still open,
   in your words: why it mattered, and what happened in the end.
3. **Knowunity.** In your own words, why is showing a student their own answer better
   than praise? (The reasons on file were picked from offered options.)
4. **Mobbin.** In the first batch, what did you call things, and what did Mobbin say or
   do that showed the names were off?
5. **UX Woman.** How did you get from interviews about insurance pre-approvals to one
   Medicaid letter? The page jumps from one to the other. A slide title names the move;
   no source tells it.
6. **UX Woman.** Which role did the "hospital leader" hold, and did anyone else say the
   same thing? (Open since 2026-11-10. The line is already live at `FlagshipUxWoman.tsx:129`.)
7. **Grove.** Which moment in the five test sessions most changed your mind?

## Conflicts and decisions to settle (not filled in)

- **Logistics, naming Iraq.** You said "my deployment to iraq" on 2026-11-16. The visible
  site does not name Iraq (only the hidden Ask knowledge base does), and the page's rule is
  no locations. The draft says "an Army deployment". Say if Iraq may be named.
- **Logistics, "a month ahead of schedule".** It is in `logistics.md` (Q1, Chapter 1) but
  not on the page. Left out, because adding it would put a new figure on the site.
- **Knowunity, what Knowie is.** `knowunity.md` says "Knowie (the mascot)". The Spanish
  page says "el asistente de Knowunity" (`spanishCaseStudies.ts:405`). The draft uses
  "mascot". Pick one for both languages.
- **Knowunity, "revising".** `FlagshipKnowunity.tsx:193` says "After revising". In US
  English that reads as editing, not studying. The draft says "studying".
- **Knowunity, naming Claude Code.** The story file names it; the page says "AI-assisted".
  The draft keeps the page's wording ("AI coding tools").
- **UX Woman, Medicaid.** A 5-year-old reader would need one clause on what Medicaid is.
  No source gives one, so none is added.
- **Grove, "for my friends".** Your voice file has "Grove was built for my friends who
  want to be plant-friendly, but need a bit of help." It is not in the story files, so it
  is not used. It would be a stronger opener than anything below if you approve it.

## The biggest voice problem

The story is told in labels and fragments, and the full sentences are folded away. The
heroes open on the result and skip "what it was". The first section after each hero is a
card of nouns ("THE JOB", "The mechanical part", "The job: one calm next action") with
the plain sentences hidden inside a "more" toggle. The Spanish pages already tell it
straight ("Grove es una app de cuidado de plantas."). The English pages do not.

---

## 1. Logistics

### Hero sub-line

**Current** (`FlagshipLogistics.tsx:104`)
> I planned and tracked a warehouse move for seven aid stations in three countries.

**Proposed**
> On an Army deployment, I was in charge of medical resupply for six satellite aid stations and the main station, in three countries. When I arrived, a resupply took 1–2 months. I made the case to move the warehouse closer, then planned and tracked the move. **Resupply dropped to 1–2 weeks, by my own service record.**

**Reason:** The current line names the task but not the problem or what changed, so the H1 has no story under it.

**Sources:** `logistics.md` 2026-11-16 Q2b and Q2c (in charge of resupply; six satellites plus the main station make the page's seven); Q1 Chapter 1 (1–2 months on arrival; "presented a case"); page `:54` (planned and tracked; owner-reported).

**Spanish (draft for Hillary's review)**
> En un despliegue del Ejército, estuve a cargo del reabastecimiento médico de seis estaciones de ayuda satélite y la estación principal, en tres países. Cuando llegué, un reabastecimiento tardaba 1–2 meses. Propuse acercar el almacén, y luego planifiqué y di seguimiento a la mudanza. **El reabastecimiento bajó a 1–2 semanas, según mi propio expediente de servicio.**

### Opening story: the problem

**Current** (`FlagshipLogistics.tsx:126-134`)
> THE JOB · Medicine and equipment, before it is needed · Not after someone asks. → THE STAKE · An aid station that runs out
> A late delivery is a casualty risk.
> An aid station is where wounded soldiers are treated first.

**Proposed** (keep the H2 "A late delivery is a casualty risk."; this replaces the line under it)
> An aid station is where wounded soldiers are treated first. My job was to get medicine and equipment there before anyone needed it, so no station ran out. [MISSING: ask Hillary: when you arrived, what was the 1–2 month wait doing to the soldiers or medics at the aid stations?]

**Reason:** "THE JOB" and "THE STAKE" are labels; the same facts read as a story once they are one sentence in her voice.

**Sources:** page `:126-134`; `logistics.md` 2026-11-16 Q2b ("making sure we had enough if they ran out").

**Spanish (draft for Hillary's review)**
> Una estación de ayuda es donde primero se atiende a los soldados heridos. Mi trabajo era llevar medicinas y equipo antes de que alguien los necesitara, para que ninguna estación se quedara sin suministros. [FALTA: preguntar a Hillary]

### Opening story: what I did

**Current** (`FlagshipLogistics.tsx:141`, then three cards; the only prose is folded at `:154`)
> Move the warehouse. Then fix the handoffs.
> The physical move removed the largest delay. A shared request and visible order status kept it from returning.

**Proposed** (one visible paragraph under the H2, above the cards)
> I moved the warehouse in phases, the most essential supplies first, and split my team so no aid station went without during the move. I did the physical work alongside them. Afterward the stations asked to track their own orders, so I built one shared way to request supplies and an order status every station could see.

**Reason:** The cards say what changed but never say "I"; this is the MSK "What I did." paragraph for Logistics.

**Sources:** `logistics.md` Q1 and Q2 Chapters 1 and 2 (phases, split personnel, physical labor, sites asked to track orders, status visible to every site); page `:60` (one shared request protocol).

**Spanish (draft for Hillary's review)**
> Mudé el almacén por fases, primero lo más esencial, y dividí a mi equipo para que ninguna estación de ayuda se quedara sin suministros durante la mudanza. Hice el trabajo físico junto a ellos. Después, las estaciones pidieron dar seguimiento a sus propios pedidos, así que creé una sola forma de pedir suministros y un estado de pedidos que todas podían ver.

---

## 2. Knowunity

### Hero sub-line

**Current** (`FlagshipKnowunity.tsx:161`)
> In a solo 2.5‑week sprint, I designed and built a prototype where Knowie quotes a student's own spoken definition back as proof.

**Proposed**
> In a 2.5-week design sprint run by Yummy Labs, I worked alone on a real brief from Knowunity, a study app for students. I designed and built a prototype where a student explains an idea out loud and Knowie, the app's mascot, shows their own words back when they get it right. **It does not hear or grade real speech yet, and no student has tried it.**

**Reason:** The current line never says what Knowunity or Knowie is, so a new reader cannot follow it.

**Sources:** `knowunity.md` Q1 (Yummy Labs, real brief, 2.5 weeks, solo, mascot, recall mocked: no real speech-to-text or judging), Q5 (no student testing); Spanish page `spanishCaseStudies.ts:405` ("una app de estudio para estudiantes").

**Spanish (draft for Hillary's review)**
> En un sprint de diseño de dos semanas y media, organizado por Yummy Labs, trabajé sola con un brief real de Knowunity, una app de estudio para estudiantes. Diseñé y construí un prototipo donde el estudiante explica una idea en voz alta y Knowie, la mascota de la app, le muestra sus propias palabras cuando acierta. **Todavía no escucha ni califica voz real, y ningún estudiante lo ha probado.**

### Opening story

**Current** (`FlagshipKnowunity.tsx:191`, with all prose folded at `:193-195`)
> Seeing the material is not knowing it.
> After revising, a student has seen the material but hasn't proved they can pull it back out. Quizzes test recognition. Nothing makes them say it.
> Knowunity's brief asked for a felt "I actually know this now." The goals, in words: more students who see the step start it, and more of those who start it finish it.

**Proposed** (visible under the H2; the goals and beta paragraphs can stay folded)
> After studying, a student has seen the material, but they have not shown they can pull it back out. Quizzes check whether you recognize an answer, and nothing asks you to say it. Knowunity's brief asked for a moment where the student feels, "I actually know this now."
>
> So when a student gets it right, Knowie quotes their own words back in place of praise. [MISSING: ask Hillary: in your own words, why is showing a student their own answer better than praise?] Knowunity supplied Knowie, their font, their Figma kit, and access to the app. The flows and the decisions are mine, and I built the prototype with AI coding tools. Yummy Labs awarded me its AI Design Sprinter badge, and Knowunity reviewed the work. It is not a shipped Knowunity feature.

**Reason:** The problem is the heart of this story and it is hidden behind a toggle; the second paragraph adds the "what I did" and "what happened" beats the page never states in a sentence.

**Sources:** page `:193-194`, `:206-207`; `knowunity.md` Q2, Q3, Q5, Validation (badge name; review not quoted).

**Spanish (draft for Hillary's review)**
> Después de estudiar, el estudiante vio el material, pero no ha demostrado que pueda recuperarlo. Los cuestionarios revisan si reconoces una respuesta, y nada te pide que la digas. El brief de Knowunity pedía un momento en que el estudiante sienta: "esto ya lo sé".
>
> Así que, cuando el estudiante acierta, Knowie le cita sus propias palabras en lugar de elogiarlo. [FALTA: preguntar a Hillary] Knowunity aportó a Knowie, su tipografía, su kit de Figma y acceso a la app. Los flujos y las decisiones son míos, y construí el prototipo con herramientas de programación con inteligencia artificial (IA). Yummy Labs me otorgó su insignia AI Design Sprinter, y Knowunity revisó el trabajo. No es una función publicada de Knowunity.

---

## 3. Mobbin

### Hero sub-line

**Current** (`FlagshipMobbin.tsx:90`)
> For Mobbin, a screenshot library designers search, I captured and labeled **200+ screens per app** across Kikoff, Polymarket and Discover. I did not design these products or Mobbin.

**Proposed**
> Mobbin is a library of app screenshots that designers search for examples. As a freelancer, I spent four months walking through three finance apps (Kikoff, Polymarket, and Discover) and capturing **200+ screens per app**. I labeled them by task, so a designer can find them. **I did not design these apps or Mobbin.**

**Reason:** The closest of the five to the target already; this version says what Mobbin is first and why the labels matter.

**Sources:** page `:90`, `:172` (freelance), `:176` (4 months); `mobbin.md` (freelancer, confirmed); Spanish page `spanishCaseStudies.ts:226`.

**Spanish (draft for Hillary's review)**
> Mobbin es una biblioteca de capturas de apps donde los diseñadores buscan ejemplos. Como freelance, pasé cuatro meses recorriendo tres apps financieras (Kikoff, Polymarket y Discover) y capturando **más de 200 pantallas por app**. Las etiqueté por tarea, para que un diseñador pueda encontrarlas. **No diseñé estas apps ni Mobbin.**

### Opening story

**Current** (`FlagshipMobbin.tsx:106-113`)
> A screenshot is not a flow.
> The mechanical part · Capture the screen · Any tool can do this part.
> The actual work · Decide what travels · Choose the task, sequence, cuts, and searchable label.
> Walk the task. Keep useful states. Order the sequence. Name it in Mobbin's vocabulary.
> What I got wrong · My first batch used my vocabulary. Revisions dropped once I learned Mobbin's.

**Proposed** (visible under the H2)
> Designers come to Mobbin looking for a task, like logging in or opening an account. So I walked each app the way a real person would, kept the empty states and the errors, and put the screens in order. I left out the marketing splash screens.
>
> My first batch used my own words for things. [MISSING: ask Hillary: what did you call things, and what did Mobbin say or do that showed the names were off?] Revisions dropped once I learned Mobbin's vocabulary.

**Reason:** Four commands in a row ("Walk the task. Keep useful states.") read as a checklist; the same steps in the past tense read as something she did.

**Sources:** Spanish page `spanishCaseStudies.ts:241` (people search for a task: log in, open an account); page `:39-40` (walk like a real person, empty states, errors, splashes cut), `:113`. The embarrassment beat stays in the human line at `:93`, so it is not repeated here.

**Spanish (draft for Hillary's review)**
> Los diseñadores llegan a Mobbin buscando una tarea, como iniciar sesión o abrir una cuenta. Así que recorrí cada app como lo haría una persona real, conservé los estados vacíos y los errores, y puse las pantallas en orden. Dejé fuera las pantallas de bienvenida publicitarias.
>
> Mi primer lote usó mis propias palabras. [FALTA: preguntar a Hillary] Las revisiones bajaron cuando aprendí el vocabulario de Mobbin.

---

## 4. UX Woman

### Hero sub-line

**Current** (`FlagshipUxWoman.tsx:126`)
> I turned six interviews with clinic and insurer staff into a guide for one New York Medicaid letter. **It is untested, and no patient was interviewed.**

**Proposed**
> In UX Woman, a 7-month user experience (UX) design accelerator, I interviewed six people who work at clinics and insurers. Then I built a guide for one sample New York Medicaid letter about new work requirements. **It is untested, and I did not interview any patients.**

**Reason:** "Turned six interviews into a guide" hides two steps and never says what UX Woman or the letter is.

**Sources:** `ux-woman.md` (7-month, mentor-led accelerator; solo project); page `:126`, `:193`; Spanish page `spanishCaseStudies.ts:512` (public sample letter about the new work requirements).

**Spanish (draft for Hillary's review)**
> En UX Woman, una aceleradora de diseño de experiencia de usuario (UX) de 7 meses, entrevisté a seis personas que trabajan en clínicas y aseguradoras. Luego construí una guía para una carta de muestra de Medicaid de Nueva York sobre los nuevos requisitos de trabajo. **No está probada, y no entrevisté a ningún paciente.**

### Opening story

**Current** (`FlagshipUxWoman.tsx:162-175`; the only sentence is folded at `:175`)
> Coverage can be lost to a missed response.
> Projected, New York · 475,000+ could lose coverage, per the New York Department of Health ("at least")
> Already seen, Arkansas 2018 · 18,164 lost coverage under a work requirement
> Does the letter say what applies, by when, what to do, and what counts as proof?

**Proposed** (visible under the H2, above the two figures, which stay as they are)
> [MISSING: ask Hillary: how did you get from interviews about insurance pre-approvals to one Medicaid letter?] The letter tells people about a new Medicaid work requirement. If they miss the response, they can lose their coverage. So I read a public sample of the letter with one question: does it say what applies, by when, what to do, and what counts as proof?
>
> I have not tested the guide with readers. No patient was interviewed, so the patient journey map comes from public rule text and one sample notice, and its feelings are guesses to test. Two tests come next: an audit of the letter, then readers answering questions about it.

**Reason:** The section opens on two statistics with no sentence saying what the letter is or why she picked it up.

**Sources:** page `:162`, `:175`, `:194`, `:248`; Spanish page `spanishCaseStudies.ts:512`; guide screen alt text `:57` ("Understand the Medicaid work requirement"). The pre-approvals move appears only as a slide title (`:76`), so it is a MISSING, not a sentence. The leader's AI and denials remark is not used here: it is single-source and its role is unconfirmed (`ux-woman.md`, 2026-11-10).

**Spanish (draft for Hillary's review)**
> [FALTA: preguntar a Hillary] La carta le avisa a la gente de un nuevo requisito de trabajo de Medicaid. Si no responden a tiempo, pueden perder su cobertura. Así que leí una muestra pública de la carta con una pregunta: ¿dice qué aplica, para cuándo, qué hacer y qué cuenta como prueba?
>
> No he probado la guía con lectores. No se entrevistó a ningún paciente, así que el mapa de recorrido del paciente sale del texto público de la regla y de un aviso de muestra, y sus emociones son suposiciones por probar. Siguen dos pruebas: una auditoría de la carta, y luego lectores que responden preguntas sobre ella.

---

## 5. Grove

### Hero sub-line

**Current** (`RisoGrove.tsx:292`)
> I tested the first build, made with the AI app builder Emergent, with 5 people, then used a 37-person self-report survey to cut twelve features to three.

**Proposed**
> Grove is a plant-care app for new plant owners. The first version, made with the AI app builder Emergent, came out crowded with features. I tested it with 5 people, then surveyed 37 to cut twelve features to three. **It is a working prototype, and the redesign has not been tested yet.**

**Reason:** One 30-word sentence carries four facts and never says what Grove is; this splits it and states the limit in plain words.

**Sources:** Spanish page `spanishCaseStudies.ts:10` (plant-care app; first version fast and full of features); `grove.md` Q1 to Q5 (new users, too wide a range of features, 5 users, 37-person survey, twelve to three, retest not yet run); page `:575` (functional prototype).

**Note:** "self-report" leaves the sub-line. The limit line at `RisoGrove.tsx:343` still carries it, and the voice spec needs it kept somewhere visible.

**Spanish (draft for Hillary's review)**
> Grove es una app de cuidado de plantas para quienes empiezan. La primera versión, hecha con la herramienta de IA Emergent, salió llena de funciones. La probé con 5 personas y luego encuesté a 37 para reducir doce funciones a tres. **Es un prototipo funcional, y el rediseño aún no se ha probado.**

### Opening story

**Current** (`RisoGrove.tsx:324-325`; who took part is folded at `:339`)
> Plant parents forget. Then they feel guilty.
> The job: one calm next action, with visible uncertainty when a wrong answer can cause harm.

**Proposed** (replaces the line under the H2)
> Most people who buy a plant want one thing: to keep it alive. Then they forget to water it, or water it too much, and feel bad either way. Grove's job is to give one calm next step, and to say when it is not sure.
>
> In the first test, people stalled when care led with a feed and a mission before their own plants. [MISSING: ask Hillary: which moment in the five sessions most changed your mind?] So I asked 37 people to each pick three features a plant app must have at launch. Smart care reminders, camera plant identification, and AI photo diagnosis came out on top. I wrote the survey and read the results myself, with no AI.

**Reason:** "The job: one calm next action, with visible uncertainty" is a spec line; the Spanish page already tells this part like a person would.

**Sources:** Spanish page `spanishCaseStudies.ts:26` (keep it alive; forget or overwater; feel bad); page `:325`, `:339`, `:56-58` (feature names); `grove.md` Q2 (she designed and read the survey herself, no AI).

**Spanish (draft for Hillary's review)**
> La mayoría de la gente que compra una planta quiere una sola cosa: mantenerla viva. Pero se olvidan de regarla, o la riegan de más, y de cualquier forma se sienten mal. El trabajo de Grove es dar un solo paso siguiente, con calma, y decir cuando no está segura.
>
> En la primera prueba, la gente se atascaba cuando el cuidado empezaba con un feed y una misión antes que con sus propias plantas. [FALTA: preguntar a Hillary] Así que les pedí a 37 personas que eligieran tres funciones que una app de plantas debe tener al lanzarse. Los recordatorios inteligentes de cuidado, la identificación de plantas con la cámara y el diagnóstico por foto con IA quedaron arriba. Escribí la encuesta y leí los resultados yo misma, sin IA.

---

## Checks run on these drafts

- **Numbers:** 1–2 months, 1–2 weeks, six plus one (the page's seven), three countries, 2.5-week, 200+, four months, 7-month, six interviews, 5 people, 37, twelve to three. No new or rounded figures. 475,000+ and 18,164 stay in their existing component, untouched.
- **Acronyms:** user experience (UX) and inteligencia artificial (IA) spelled out on first use in each draft. "AI" in the English Grove and Knowunity drafts follows existing page copy; spell it out on first use if the builder places these above the page's first "artificial intelligence".
- **House style:** US spelling, no em dashes, no banned words, sentences 5 to 24 words.
- **Length:** each hero sub-line is 3 or 4 sentences, close to MSK's 3. The Logistics and Grove subs are the longest; if they crowd the hero, cut the first sentence of Grove last, since it is the one that says what the thing is.
- **Layout note for design-builder:** Logistics `:126-134` and Mobbin `:108-109` are card components, not paragraphs. The proposed text needs a visible `rp-lede` beside or in place of them. That is a layout call, not a copy one.

## Weakest line

UX Woman, opening story. Without the answer to MISSING 5, the paragraph starts cold on
"The letter tells people" and the six interviews never connect to the letter. No wording
fixes that; it needs her answer. Second weakest: Logistics "why it mattered" still rests
on page copy ("a casualty risk"), not on anything she said in the bar interview.

---

## Knowunity step trims (R7)

Drafts only. Nothing under `my-app/src` was changed. The four `STEPS` bodies sit in a pinned DecisionStory panel that measures 1,004px (steps 231, 274, 255, 233px) against about 825px free at 1440×900. Target: under about 760px. Mobbin's bodies run 20 to 22 words in an 801px panel. These run 20 to 26.

Trim only: every word below is already on the page. No numbers appear in these bodies. **Heights are not re-measured.** The builder needs to paste these in and measure the panel before calling it fixed.

### 01 · Echo the words back

**Current** (`my-app/src/pages/case-studies/FlagshipKnowunity.tsx:98`, 40 words)
> On a clean pass, Knowie quotes the student’s own transcript back as the proof. My reasoning, untested with students: seeing your own correct explanation is evidence you can retrieve it. Those are also the words you’ll use in the exam.

**Trimmed** (26 words)
> On a clean pass, Knowie quotes the student’s own transcript back. My reasoning, untested with students: your own correct explanation is evidence you can retrieve it.

Cut: "as the proof" (the note already says "Proof, not praise"), "seeing", and the exam sentence. The "untested with students" caveat stays.

**Spanish current** (`my-app/src/data/spanishCaseStudies.ts:437`, 40 words, bullet label included)
> Devolver las palabras: cuando acierta, Knowie le cita su propia transcripción como prueba. Mi razonamiento, aún sin probar con estudiantes: ver su propia explicación correcta es evidencia de que puede recuperarla, y son las palabras que usará en el examen.

**Spanish trimmed (draft for Hillary's review)** (28 words)
> Devolver las palabras: cuando acierta, Knowie le cita su propia transcripción. Mi razonamiento, aún sin probar con estudiantes: su propia explicación correcta es evidencia de que puede recuperarla.

### 02 · Offer the misses, don’t requeue them

**Current** (`my-app/src/pages/case-studies/FlagshipKnowunity.tsx:104`, 43 words)
> A missed term used to come back at the end of the set. Now the run goes straight to the Recap, which leads with “Practice what I missed.” Each row says why the term is there and recommends a drill or a say-it-again.

**Trimmed** (22 words)
> A missed term used to come back at the end of the set. Now the Recap leads with “Practice what I missed.”

Cut: "the run goes straight to" and the sentence about what each Recap row says. The paired screen shows the rows.

**Spanish current** (`my-app/src/data/spanishCaseStudies.ts:438`, 41 words, bullet label included)
> Ofrecer los fallos, no reencolarlos: un término fallado volvía al final de la serie. Ahora la sesión pasa directo al resumen, que empieza con “Practicar lo que fallé”. Cada fila dice por qué está ahí y recomienda un ejercicio o repetirlo.

**Spanish trimmed (draft for Hillary's review)** (23 words)
> Ofrecer los fallos, no reencolarlos: un término fallado volvía al final de la serie. Ahora el resumen empieza con “Practicar lo que fallé”.

### 03 · Ask for the mic when it’s needed

**Current** (`my-app/src/pages/case-studies/FlagshipKnowunity.tsx:110`, 38 words)
> The question comes first. The permission sheet opens over it on the first mic tap, not as a full screen between an intro and question one. The intro screen is gone; every way in lands on question one.

**Trimmed** (20 words)
> The question comes first. The permission sheet opens over it on the first mic tap. The intro screen is gone.

Cut: the "not as a full screen between an intro and question one" contrast and "every way in lands on question one".

**Spanish current** (`my-app/src/data/spanishCaseStudies.ts:439`, 36 words, bullet label included)
> Pedir el micrófono cuando hace falta: primero la pregunta. La hoja de permiso se abre encima al primer toque del micrófono, no como pantalla entre una introducción y la pregunta uno. La pantalla de introducción desapareció.

**Spanish trimmed (draft for Hillary's review)** (26 words)
> Pedir el micrófono cuando hace falta: primero la pregunta. La hoja de permiso se abre encima al primer toque del micrófono. La pantalla de introducción desapareció.

### 04 · Say where you are on the ladder

**Current** (`my-app/src/pages/case-studies/FlagshipKnowunity.tsx:116`, 36 words)
> One hint on the first miss, a fill-the-gap hint on the second, the answer on the third. The card’s headline says it: “One more go, then I’ll show you the answer.” Nothing vanishes without a word.

**Trimmed** (22 words)
> One hint on the first miss, a fill-the-gap hint on the second, the answer on the third. Nothing vanishes without a word.

Cut: the quoted card headline. The paired screen is the second-miss card, which shows that headline.

**Spanish current** (`my-app/src/data/spanishCaseStudies.ts:440`, 44 words, bullet label included)
> Decir en qué punto va: una pista en el primer fallo, una pista de completar el hueco en el segundo, la respuesta en el tercero. El título de la tarjeta lo dice: “Un intento más y le muestro la respuesta”. Nada desaparece sin aviso.

**Spanish trimmed (draft for Hillary's review)** (29 words)
> Decir en qué punto va: una pista en el primer fallo, una pista de completar el hueco en el segundo, la respuesta en el tercero. Nada desaparece sin aviso.

**English total:** 157 words before, 90 after.

### Notes

- **Weakest line:** step 04. It loses the quoted headline (“One more go, then I’ll show you the answer.”), which was the proof that the ladder is said out loud. It now leans on the screenshot. If Hillary wants the quote back, cut "Nothing vanishes without a word." instead; that version is 31 words and may not fit.
- **If the panel is still over 760px:** step 01 is the longest at 26 words. Its caveat cannot go. The next cut would be step 02's first sentence, which costs the before/after.
- **Spanish:** the Spanish page renders these as bullets in `SpanishCaseStudy`, not as `STEPS`. Whether that list is pinned was not checked. The Spanish trims keep both pages in sync; they are drafts until Hillary reads them.
- **Step 03, Spanish:** the current Spanish already lacks "every way in lands on question one", so its trim only drops the "no como pantalla" contrast.
