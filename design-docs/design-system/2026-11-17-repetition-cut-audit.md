# Sitewide repetition cut: audit (2026-11-17)

Read-only audit. Nothing was edited. Rendered text came from the production build at `localhost:3023` (Chrome, 1440x900, networkidle). Folded `<details>` content was read too and is marked **[folded]**. "px" means the element's measured height plus its vertical margins at 1440 wide. "—" means not measured.

All paths are relative to `my-app/src/`. Line numbers match the working tree on branch `component-qa-copyemail` at the time of the audit.

Bias: cut. Each guarded caveat keeps exactly one instance, in the spot where it does the most work. A cut that would break a test is still listed, marked **breaks test → update**.

Tests checked: `pages/case-studies/FlagshipCaseStudies.a11y.test.tsx` (cited below as `a11y:<line>`), `pages/case-studies/RisoGrove.ux-structure.test.tsx`, `components/PortfolioHiringPath.test.tsx`, `components/LogisticsMoveMap.test.tsx`, `components/Footer.test.tsx`, `components/CopyEmail.test.tsx`.

---

## Sitewide patterns (fix once, every page benefits)

| # | Element | Repeats what | Action | px |
|---|---|---|---|---|
| S1 | The `route` recap line in the outcomes: `EvidenceField route={[...]}`. It appears in Knowunity `FlagshipKnowunity.tsx:309`, Mobbin `FlagshipMobbin.tsx:180`, Logistics `FlagshipLogistics.tsx:205` and UX Woman `FlagshipUxWoman.tsx:258` | Each one restates that page's decisions or moves as a four-step arrow line. Mobbin's ("Capture the task → Map the sequence → Name the pattern → Make it searchable") is the **fourth** telling of its four steps. Even the component's own comment (`components/flagship/EvidenceField.tsx:61-65`) says a method recap is the least durable thing on the page. | **CUT** the `route` prop on Knowunity, Mobbin and Logistics. Keep it on UX Woman (see the Keep list). | 36 each |
| S2 | The `<span>Decisions</span>` label before every step's note, at `components/flagship/DecisionStory.tsx:125` | It prints "Decisions" four times inside a section already titled as decisions (Knowunity, Mobbin). It's a decorative label that carries no claim. | **CUT** the span and keep `<b>{step.note}</b>`. | 19 × 4 per page |
| S3 | `<CopyEmail />` in each case-study close section: Knowunity `:317`, Mobbin `:188`, UX Woman `:265`, Logistics `:216`, MSK `:399`, Grove `RisoGrove.tsx:597` | The global footer, about 400px further down, renders the same address and Copy button (`components/Footer.tsx:34`). Every case study shows "My email / Copy" twice. | **CUT** it from the six close sections. Keep "Email me →" and the footer copy. **Needs Hillary's call:** this branch just put CopyEmail through QA. | 64 each |
| S4 | `<ShareCaseStudy>` "Share this case study", in all six close sections | Junk: a third action under "Email me" in the hiring close. Nobody hiring shares a case study from the page itself. | **CUT** (optional, lower priority than S1–S3). | 44 each |

---

## Home (`pages/RisoHome.tsx`, `i18n/strings.ts`)

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| H1 | `"home.index.moreSummary": "4 more: Logistics, UX Woman, Mobbin and a hackathon project."` at `strings.ts:103` (ES `:300`) | It names UX Woman, but UX Woman is card 01, already visible above. Knowunity is the card actually folded. So the line is both repetitive and **wrong**. | **FIX + CUT** to `"4 more"`, or name the right four: Logistics, Knowunity, Mobbin, a hackathon project. Listing names just repeats the titles one click down, so prefer `"4 more"`. | — |
| H2 | `<CopyEmail />` in #contact at `RisoHome.tsx:236` | The footer's CopyEmail sits about 260px lower (`Footer.tsx:34`). Two "Copy" buttons share one screen. | **CUT.** **Breaks test** `PortfolioHiringPath.test.tsx:123` (`contact.textContent` contains the address). Update it to check the mailto href, or keep the address visible as plain text. Same caveat as S3. | 64 |
| H3 | MSK card desc "Six steps became five, and one department left the loop." at `strings.ts:84` | The same line appears as the folded h3 on the MSK page (`FlagshipMSK.tsx:245`). Across pages that's fine, because the card is the entry point. | Keep here. Cut the page copy instead (see M5). | — |

The hero sub, status and work title carry no repeats. Card descriptions mirror the case-study hero subs on purpose: they're the entry point. The UX Woman card (`strings.ts:88`) is nearly the hero sub word for word, and that's acceptable.

**Conflicts to surface, not repetition.** The recruiter panel (a hidden dialog on every page) says "Product Designer" and "Enterprise workflows · service design · research". The site h1 says "UX designer and researcher for healthcare and internal tools". The panel's Grove line, "Five tests and a 37-person survey" (locked by `PortfolioHiringPath.test.tsx:85`), conflicts with the page's "I tested it with 5 people", which describes one five-user test. Raise these with Hillary. Don't silently pick one.

---

## About (`pages/AboutMe.tsx`)

No repetition found. The page is four short paragraphs, a slideshow and the footer. **0 cuts.**

---

## MSK (`pages/case-studies/FlagshipMSK.tsx`, `data/mskCaseStudy.ts`, `components/MSKJourney.tsx`)

The core problem ("portal messages lived outside the record, I printed them, we waited for the scan") is stated **three times in the first 1,100px**. Send to EMR is pitched twice. The before/after steps exist in **four** forms: the hero journey, the decisions journey, the folded exact-steps list and the folded blueprint.

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| M1 | humanLine "I printed the notes myself. Then we waited." at `:166` (ES `spanishCaseStudies.ts:100`) | The hero sub one line above says "so I printed them and we waited for them to be scanned in" (`:163`). | **CUT.** The sub carries it, and the sub is test-locked. | 55 |
| M2 | Receipt body, first two sentences: "Patient portal messages lived outside the medical record. I printed them, and then we waited for them to be scanned in." at `mskCaseStudy.ts:221` | A third telling of the hero sub. | **CUT** both sentences. Start at "The clinical team needed to see everything…", which is the stake and is new. Mirror in `MSK_COPY.es`. | ~50 |
| M3 | Workflow lede, first sentence: "I suggested a Send to EMR button so messages could file straight to the record." at `:203` | The hero sub says "I suggested a Send to EMR button so they would file straight to the record" (`:163`, test-locked at `a11y:140`). | **CUT** that sentence. Start the lede at "I talked with every department it touched…" | ~26 |
| M4 | Blueprint lede at `:246` [folded]: "The visible change is one fewer step. The service change is one fewer department touching the record. Frontstage is…" | Its first two sentences are verbatim from `:204`. | **CUT** those two sentences and keep the frontstage/backstage sentence. | — |
| M5 | Blueprint h3 "Six steps became five. One department left the loop." at `:245` [folded] | Restates `:204`, the journey count badges and the Home card. | **CUT** the h3, or make it "Service blueprint". | — |
| M6 | CaseMore "The exact steps, before and after" at `:205-219` [folded] | Both MSKJourney instances already show the same six and five steps, labeled. | **CUT.** **Breaks test** `a11y:124-128` and `a11y:624` (they require `.fp-workflow[data-evidence]` containing "Print the portal message"). The tests protect a text alternative the journey `<ol>` already provides, so update them to read from `.msk-journey`. | 60 |
| M7 | Second MSKJourney (decisions visual, `:264`): the Before/After tabs, "Walk it through", and the figcaption "One patient-portal message, drawn as a picture. Illustration, not a screenshot." (`MSKJourney.tsx:200-227`) | The hero journey has the same tabs, button and **identical figcaption** (it renders twice on the page). | **MERGE:** add a prop such as `bare`/`afterOnly` so the decisions instance renders just the after track, with no tabs, walk button or caption. Removing the instance outright **breaks** `a11y:639-640`. | 96 (52 bar + 44 foot) |
| M8 | CaseMore "How I made these screens", inner label `<p className="rp-note__k">How I made these screens</p>` at `:222` | The summary label is repeated verbatim as the first line inside it. | **CUT** `:222`. The summary still satisfies `a11y:796`. **Also stale:** "these screens" refers to the queue screens retired on 2026-11-15, and the page now shows illustrations. The body text is test-locked (`a11y:836`), so only reword the label, for example "Where this comes from". | ~24 |
| M9 | REDESIGNS[0], the "EMR filing workflow" card at `:92-97` (plus its `MSKMechanism n="01"`) [folded] | The section h2 is "The same failure, **in two more places**" (`:280`), yet the first card is the main workflow again. | **CUT** the item. The card count then matches the h2. Check `MSK_COPY.es` for the mirror. | ~300 [folded] |
| M10 | ROLE_METHODS["02"].body at `:45` [folded]: "Technical, legal copy kept clinicians from finishing CPR certification. I rewrote it… the department certified a month before the original deadline." | Verbatim from REDESIGNS[1].finding (`:101`) and the outcome stat (`:388`). | **CUT** to "No certificate for this one. I rewrote legal copy for the person who has to act." | — |
| M11 | REDESIGNS[1].change at `:102`: "…a month before the original deadline, with no 4-month extension." [folded] | Outcome stat `:388`, the sustainment figure and SURVIVED `:76`: the CPR month-early fact appears five times. | **CUT** ", with no 4-month extension". The stat at `:388` still satisfies `a11y:147`. | — |
| M12 | Sustainment figcaption "What happened after each one shipped" at `:353` | Restates the h2 "What happened after I left that role." (`:344`). | **CUT** the `<figcaption>`. | 40 |
| M13 | Sustainment lede at `:345`: "It was adopted. After I left that role, they got funding." | "After I left that role" echoes the h2 directly above. | **CUT** to "It was adopted, then funded. The built version changed along the way, and I wasn't there for it. I later saw it in production while training new employees." | ~0–26 |
| M14 | Outcomes intro "Each tag says whose result it is." at `:378` | Meta-commentary. The tags (Led / Scope / Initiative result / Projection) say it themselves. | **CUT.** `intro` is a required prop, so make it optional in `EvidenceField.tsx:34`. | 58 |
| M15 | Decisions intro, first sentence "One action replaced the three steps that left the system." at `:257` | The After journey beside it says "One action replaces the print, the walk and the wait." | **CUT** the first sentence and keep "These four rules are my portfolio design… not MSK's specification." That second sentence is an honesty caveat. | ~26 |
| M16 | Comment at `:323-328`: "'Service design' appears in this page's hero eyebrow" | Stale. There's no hero eyebrow any more. | Code hygiene only. Not visible. | — |

---

## Logistics (`pages/case-studies/FlagshipLogistics.tsx`, `components/LogisticsMoveMap.tsx`)

The 1–2 months to 1–2 weeks result appears **six times**: h1, sub, hero dl, map badge, move 01 and the outcome stat. "Owner-reported" or "my service record" appears **seven times**.

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| L1 | Hero dl row "Result: Resupply went from 1–2 months to 1–2 weeks · $2M warehouse move" at `:109` | Repeats the h1, the sub (`:104`) and the map's count badge right beside it ("1–2 weeks to resupply, after the $2M move"). | **CUT** the Result row and keep Role. **Breaks test** `a11y:201` (hero contains "1–2 months to 1–2 weeks"). Either update the test to look for "1–2 weeks", or reword the sub's last sentence to "Resupply went from 1–2 months to 1–2 weeks, by my own service record." | ~50 |
| L2 | Map figcaption tail "Times are owner-reported." at `LogisticsMoveMap.tsx:80` | The sub already says "by my own service record". | **CUT** the tail. Keep "A schematic, not a map: no real places, routes or unit positions." (locked by `LogisticsMoveMap.test.tsx:32`). | 0 (shortens the line) |
| L3 | Cinema bridge p, second sentence "My job was to get medicine and equipment there before anyone needed it, so no station ran out." at `:134` | Repeats "THE JOB: Medicine and equipment, before it is needed / Not after someone asks." and "THE STAKE: An aid station that runs out" (`:126-128`) in the same viewport. | **CUT** that sentence. Keep "An aid station is where wounded soldiers are treated first." | ~46 |
| L4 | Moves lede at `:142` (136px): "I moved the warehouse in stages, the most needed supplies first, and split my team so no aid station went without during the move. I did the heavy lifting alongside them. Afterward… one shared way to request supplies and an order status…" | Moves 01, 02 and 03 directly below restate all of it ("in phases from most essential to least, with personnel split so no aid station went unsupplied"). | **CUT** to "I did the heavy lifting alongside my team. Afterward the stations asked to track their own orders." That's the only new information. | ~80 |
| L5 | Move 01 change tail: "`<Term>Owner-reported</Term>` resupply time changed from 1–2 months to 1–2 weeks." at `:54` | The fifth telling of the result, and the outcome stat sits right below. | **CUT** that sentence. The outcome stat carries it (test-locked at `a11y:205`). | ~24 |
| L6 | Move 02 change: "; the service record reports a 15% efficiency gain… How it was measured is not preserved." at `:60` | The 15% stat at `:203` is test-locked. The measurement caveat repeats the outcome disclaimer (`:199`, test-locked at `a11y:204`). | **CUT** from "; the service record…" to the end. | ~48 |
| L7 | Move 03 change: "; the service record reports 60% lower spending while maintaining availability." at `:66` | Repeats the 60% stat at `:202`. | **CUT** the number clause. **MERGE** "while maintaining availability" into the stat label at `:202` (keep the label starting with "reported reduction in spending" to satisfy `a11y:206`). | ~24 |
| L8 | Status board read "Every station uses one request format, and a station that is running low shows before it runs out." (`components/flagship/OrderStatusBoard.tsx`, `.fp-statusBoard__read`) | Restates the titles of moves 02 and 03 ("One way of asking", "Order before it runs out"). The board shows it anyway. | **CUT.** | 61 |
| L9 | CaseMore "Why the move came first" at `:154-156` | Restates the h2 "Move the warehouse. Then fix the handoffs." | **CUT.** | 60 |
| L10 | Folded MOVES grid at `:182-190` (01/02/03 titles again, each with a LogisticsMechanism diagram) | The same three titles and numbers as the visible moves at `:143-152`. The deep-dive title "See what made it hard **and what I changed**" promises a repeat. | **MERGE:** move each `<LogisticsMechanism n={m.n} />` into the visible move card at `:145-150` and delete the folded grid. Retitle the deep dive "See what made it hard". | ~420 [folded] |
| L11 | Folded ownership "Service-design scope: People, inventory, requests, and handoffs, and how long recovery took." at `:178-181` | A label-only claim. Nothing else on this page refers to it. | **CUT.** Unlike MSK, no test locks it here. | — |
| L12 | Outcomes intro "Owner-reported figures from my service record." at `:198` | Every stat label already says "reported" (test-locked), and stat 1 says "in my service record". | **CUT.** Make `intro` optional (same change as M14). | 58 |
| L13 | Disclaimer second sentence "No unit positions, routes, or locations are described here." at `:199` | The map caption says "no real places, routes or unit positions". | **CUT** that sentence. Keep "Measurement periods and methods are not preserved." (`a11y:204`). | 0–18 |
| L14 | Route recap at `:205` | See S1. | **CUT.** | 36 |

---

## UX Woman (`pages/case-studies/FlagshipUxWoman.tsx`)

The hero is already trimmed. What's left is caveat stacking. "Not tested" appears **five times** (sub, reel caption, guide note, outcomes title, route plus disclaimer). "No patient interviewed" appears **three times**. "Six interviews with clinic and insurer staff" appears **four times**. The two tests are described **three times**.

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| U1 | Reel caption at `:71`: "My midterm presentation for the UX Woman UX Design Accelerator, about 13 minutes. The guide is built but not yet tested." | The first clause repeats the h2 "My midterm presentation." (`:154`) and the program name in the hero sub and Role row. The second sentence repeats the hero caveat and the outcomes title. | **CUT** to "About 13 minutes, narrated." The reel test (`a11y:300+`) only checks Knowunity's reel. | ~26 |
| U2 | CaseMore "The question I took to the letter" at `:174-176`: "Does the letter say what applies, by when, what to do, and what counts as proof?" | Hypothesis 2 (`:214`): "Readers cannot say what applies, by when, or what counts as proof." Also the "Six things a reader needs" list. | **CUT.** | 60 |
| U3 | In the CaseMore at `:197`: "Six interviews with clinic and insurer staff," and "No patient was interviewed." | The hero sub ("interviewed six people who work at clinics and insurers… no patient was interviewed", test-locked) and the h2 "Six interviews, six themes." | **CUT** both phrases. Keep "UX Woman is a 7-month, mentor-led UX design accelerator." (test-locked), "one affinity board per interview, plus six publicly available sources", and the anonymization line. | ~0–26 |
| U4 | Guide note tail "Built, not yet tested with readers." at `:236` | The outcomes title "Built, not yet tested." (`:251`), which is the instance satisfying the test string (`a11y:446`). | **CUT** the tail. Keep "Design concept, not an official notice." (test-locked). | 0 |
| U5 | Outcomes intro "Two tests come next: an audit of the letter, then readers answering questions about it." at `:252` | The Test 1 / Test 2 stat cards right below it, plus "Test: audit the letter" / "Test: readers answer" in the hypothesis cards (`:210`, `:215`). | **CUT.** Make `intro` optional (M14). | 58 |
| U6 | Disclaimer at `:253`: "Six interviews with clinic and insurer staff · no patient interviews · journey maps built from public rule text and one sample notice · nothing tested with readers yet" | Every item repeats something: the hero sub (×2), the CaseMore at `:198` (journey maps), and the title (not tested). | **CUT** the whole disclaimer. Make `disclaimer` optional in `EvidenceField.tsx:35`, as Grove already does without one. | 37 |
| U7 | Role row "Sole researcher and designer · UX Woman UX Design Accelerator · 2026" at `:128` | The program name is already in the hero sub ("In UX Woman, a 7-month… design program"). | **CUT** the middle clause, giving "Sole researcher and designer · 2026". The dt "Role" must stay (`a11y:437`). | 0 |

ES mirror: `UXWOMAN_ES` at `spanishCaseStudies.ts:506+`. Keep "UX Woman es una aceleradora de diseño UX de 7 meses, guiada por mentores." and "no se entrevistó a ningún paciente" (`a11y:466-467`).

---

## Grove (`pages/case-studies/RisoGrove.tsx`, `components/riso/GroveSystemLab.tsx`)

5 / 37 / 3 appears **four times** above the fold area: the sub, the hero trace ledger, the research subhead, and the outcome stats. "Phase 2 of 3" appears three times and "retest" five times. The plant-ID "top guesses, confidence, sources" idea appears **six times**. The florist quote appears twice.

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| G1 | Hero trace ledger at `:296-302`: "5 people / exposed the navigation problem · 37 people / ranked the launch dealbreakers · 3 directions / earned the next build" | The sub one line above ("I tested it with 5 people, then surveyed 37 to cut twelve features to three"). This is the same pattern as the 5-number ledger Hillary had cut from UX Woman. | **CUT.** **Breaks test** `a11y:188` (hero contains "3 directions"). Update it to check the sub, or drop the check. | 94 |
| G2 | Research subhead "Five people found the problem. Thirty-seven chose what came next." at `:335` | The fourth telling of 5/37. The stats directly below, and the "Who took part" CaseMore, give the detail. | **CUT.** | 81 |
| G3 | Survey stats 76% and 54% at `:41-42` | The ranked core list at `:352+` shows "Smart care reminders 76% Core" and "AI plant identification (camera) 54% Core" about 500px lower. | **CUT** those two and keep 12-of-37 and 2.4. **Or MERGE:** move "28 of 37" into the core list row. | ~180 (est.; grid is 438) |
| G4 | rp-fcard descriptions at `:485-486` [folded]: "Five moderated sessions showed people stalled when care led with a feed and a mission." / "Based on the five moderated sessions; task records are not preserved." | The CaseMore at `:345` (same sentence) and the Limit at `:349` ("task records are not preserved"). | **CUT** both second sentences. | — |
| G5 | Folded quoteCard at `:383-388`: the florist quote "Any generative AI in this will remove any sense of trust." | The same quote, word for word, in the CaseMore "Why plant ID shows its sources" (`:541`). | **CUT** the figure. **MERGE** its unique clause, "I removed AI-written care sheets from scope.", into the end of the `:540-545` paragraph. | ~150 [folded] |
| G6 | Decisions lede, first sentence "The three directions stay visible together." at `:496` | Meta-commentary about layout. | **CUT** the sentence. Keep "They are decisions for the next prototype, not completed redesigns." (`a11y:189`). | ~26 |
| G7 | "Why the reminder leads: it carries the clearest research-to-design change. The next chapter shows how its tone and care logic change." at `:505-507` | Signposting. The next section's h2 makes the point. | **CUT.** | 78 |
| G8 | "This is Phase 2 of 3." inside "Still unbuilt…" at `:510` | The PhaseIndicator label (`:557`) and the "What the three phases mean" note (`:581`) are both test-locked. | **CUT** that sentence. "Still unbuilt: high-fidelity redesign, edge states, and retest" stays (`a11y:192`, `ux-structure:69`). | 0 |
| G9 | Override lede "Remove guilt. Preserve one useful next action." at `:520` | Restates the h2 "One calm reminder instead of three guilty ones." | **CUT.** | 58 |
| G10 | Outcomes lede "Three features scoped. One care-logic mistake found. Retest pending." at `:558` | The h2 ("…Retest next."), the "3 features" stat, and the routeVerdict ("I got the care logic wrong…") cover it point for point. | **CUT.** | 74 |
| G11 | CaseMore bridge "Why a plant app: Uncertain recommendations, sources to check, a human final call: the same problems as a clinical tool…" at `:575-578` [folded] | The close p at `:592-594` makes the same clinical-tool bridge. | **CUT** the bridge `<p>` and keep the visible close p. Rename the CaseMore to "What the phases mean". **Note:** `a11y:524` requires "What the three phases mean", the inner label at `:580`, which stays. | — |
| G12 | Hero demo note tail "Reloading the page starts it fresh." at `:311` | Junk: it's an instruction for an edge case. | **CUT** the tail. Keep "The current app on sample data." | ~0 |
| G13 | GroveSystemLab: "Interactive reconstruction · built from the research and decision log, not a shipped-product claim." (`GroveSystemLab.tsx:73`) **and** "Reconstructed from Grove's research and decision log, not a live model…" (`:166`) [folded] | The same provenance caveat twice in one panel. | **CUT** `:73` and keep `:166`. It sits under the confidence UI, where the caveat matters. | — |
| G14 | Folded "Try the working prototype." h2 plus "Try the Grove demo" CTA at `:412`, `:445` | The hero CTA at `:307` is the same link. | **CUT** the folded demo CTA and keep the Storybook link. | — |

Not cut, test-locked: the "37" outcome stat (`a11y:522`), "Phase 2 of 3" in the PhaseIndicator and the note, and "self-report prioritized the next build" (`a11y:797`).

---

## Knowunity (`pages/case-studies/FlagshipKnowunity.tsx`)

"Recall is mocked / no speech recognition / no student testing" appears **seven times on screen**: hero sub, hero dl, reel caption, mock note, "What I'd change", outcomes lede and disclaimer. "Try the working prototype" appears twice. 43 routes appears twice. "Tapping, not URL" appears twice.

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| K1 | Hero dl "Built here: Four interaction decisions · coded prototype · Storybook catalog / Not proved: Recall mocked · no student testing · not shipped" at `:165-168` | The sub's last sentence ("It doesn't hear or grade real speech yet, and no student has tried it.") plus the "I did" workSplit card and the outcome disclaimer. | **CUT.** This is the same "competing information" pattern she flagged on UX Woman. The `a11y:818` ordering test falls back to `.rp-sub`. | 101 |
| K2 | humanLine "Knowunity's top ask: students recalling it. I built for that." at `:164` | The brief lede ("Knowunity wanted a moment where the student feels, 'I actually know this now.'") at `:203`. | **CUT** (optional). It came from the Better Stories pass, so confirm with Hillary. Of the human lines, this one is the weakest; it adds no anecdote. | 87 |
| K3 | CaseMore "How the prototype works" at `:221-223`: "Every screen is its own route, reached by tapping. Storybook is the component catalog." | The 43-routes stat label ("every screen reached by tapping, none by typing a URL"), "43 routes" in the workSplit, and the "Open the Storybook" button directly below. | **CUT.** | 60 |
| K4 | Mock note lead "No speech recognition:" at `:232` | The reel caption ("Recall is mocked: no real speech recognition.", test-locked) sits about 200px above. | **CUT** the lead clause. Keep "How long you hold the mic decides the result. Question 2's first try is scripted to mishear so that state is always seen." That's useful to someone opening the prototype. | 0 |
| K5 | "What I'd change" band at `:294-296`: "Put a real speech-to-text version in front of students earlier. Recall was mocked the whole way." | The outcomes lede ("Next: a speech-to-text build in front of students.") and the disclaimer. | **CUT** the band. ES: check `KNOWUNITY_ES` (`spanishCaseStudies.ts:399+`). | 143 |
| K6 | Outcomes lede, middle sentence "Recall is mocked and no students have tested it." at `:303` | The disclaimer directly below (`:304`), which is the test-locked spot (`a11y:282-283`). | **CUT** that sentence. | ~26 |
| K7 | Disclaimer at `:304`: "…hold time decides the result · … · not a shipped Knowunity feature · Knowunity's internal numbers are not published here" | "Hold time" repeats the mock note. "Internal numbers are not published here" is meta-commentary about the page. | **CUT** those two items, giving "Design-sprint prototype · recall is mocked: no speech recognition · no student testing · not a shipped Knowunity feature". | 0–20 |
| K8 | Route recap at `:309` | See S1. It restates decisions 01–04. | **CUT.** | 36 |
| K9 | Folded ownership "AI in the build: I designed and directed. Claude Code wrote most of the Next.js and Storybook code…" at `:255-258`, alongside the visible workSplit "…implementation was AI-assisted." at `:218` | Two AI disclosures, and the more specific one is hidden. | **MERGE:** change `:218` to "…Storybook catalog on their kit. Claude Code wrote most of the code from my specs." Then cut `:255-258`. | — |
| K10 | Folded constraint "Judge generously" at `:253` | Decision 04 note "Judge generously, out loud" (`:117`). | **CUT** the folded dt/dd. Three constraints remain. | — |

---

## Mobbin (`pages/case-studies/FlagshipMobbin.tsx`, `components/flagship/MobbinIndexLens.tsx`)

The four steps (capture whole task, cut splashes, name it in Mobbin's words, write for a stranger) are told **five times**: lede, workSplit, decisions intro, the decisions themselves, and the route. The vocabulary lesson appears three times. "I did not design" appears three times. 200+ / 3 apps / 4 months are each stated in the hero and again in the stats.

| # | Text / element (file:line) | Repeats what | Action | px |
|---|---|---|---|---|
| B1 | Lede at `:109`, sentences 2–3: "So I went through each app the way a real person would, kept the empty screens and error messages, and put the screens in order. I left out the marketing screens." | Decisions 01 ("Walk the app like a real person, including empty states, errors…") and 02 ("Marketing splashes did not earn the same space…"). | **CUT** both sentences. Keep "Designers come to Mobbin looking for a task, like logging in or opening an account." | ~60 |
| B2 | workSplit at `:110-113`: "The mechanical part / Capture the screen / Any tool can do this part. · The actual work / Decide what travels / Choose the task, sequence, cuts, and searchable label." | The four decisions, compressed. The decisions h2 "Editing is the work." says the same thing. | **CUT.** | 176 |
| B3 | CaseMore "What I got wrong" at `:114-116`. The label is repeated inside as `<span>What I got wrong</span>`, then "My first batch used my vocabulary. Revisions dropped once I learned Mobbin's." | The humanLine ("My first batch used my words, not Mobbin's. I was embarrassed.", `:93`) and decision 03's note ("Mobbin's words cut my revisions", `:41`). | **CUT.** | 60 |
| B4 | Decisions intro "Preserve the useful state, sequence the task, name it for retrieval." at `:124` | The step titles directly below. | **CUT.** `intro` must become optional in `DecisionStory.tsx` (Props). | 58 |
| B5 | Route recap at `:180` | See S1. This is the fifth telling. | **CUT.** | 36 |
| B6 | Outcomes intro, second sentence "I did not design Kikoff, Polymarket, Discover, or Mobbin." at `:173` | The hero sub (`:90`): "I did not design these apps or Mobbin." That's the instance satisfying `a11y:798`, and it sits where the reader forms the impression. | **CUT** that sentence. | ~26 |
| B7 | Disclaimer "Freelance app-capture work." at `:174` | The hero sub ("As a freelancer…") and the Home subtitle. | **CUT.** Make `disclaimer` optional (U6). | 37 |
| B8 | Stats "3 live finance apps…" and "4 months building reusable references…" at `:177-178` | The hero sub: "four months going through three apps". | **CUT** both and keep 200+, which carries "sequenced, annotated, and labeled". Alternatively cut all three: the h1 is the 200+ number. | ~120 |
| B9 | Close p at `:186`: "Kikoff shows proof after each action, Polymarket shows risk before you commit, Discover makes the fine print findable." | The folded apps h2 (`:154`) and the APPS summaries (`:33-35`). | **CUT.** The close h2 stands alone. | 107 |
| B10 | IndexLens boundary "Source interfaces documented, not designed, by Hillary" at `MobbinIndexLens.tsx:56` [folded] | The third "I did not design". | **CUT.** | — |
| B11 | IndexLens lede at `MobbinIndexLens.tsx` (about `:21`) [folded]: "Mobbin users search for a task, sign in, browse, open an account, not for a screenshot number…" | The visible lede at `:109`. | **CUT** the first sentence. | — |

---

## Keep: looks repetitive but carries weight

- **Hero sub caveats** on UX Woman ("It is untested, and no patient was interviewed."), Grove ("…has not been tested yet."), Mobbin ("I did not design these apps or Mobbin.") and Knowunity ("It doesn't hear or grade real speech yet…"). These are the one instance of each caveat that every visitor sees. Three are test-locked.
- **Knowunity reel caption** "Recall is mocked: no real speech recognition." It's test-locked (`a11y:336`), and it's the caveat sitting on the media that could mislead.
- **Knowunity outcome disclaimer** "recall is mocked… no student testing" (trimmed per K7). It's test-locked and is the formal limits line.
- **Knowunity decision 01** "My guess, untested with students:". This frames one specific causal claim, not the project.
- **Second "Try the working prototype" CTA** (Knowunity `:225`). It pairs with the Storybook link, about 1,300px below the hero.
- **UX Woman** "A projection and an observed count are different measures." (`:173`) and "UX Woman is a 7-month, mentor-led UX design accelerator." (`:197`). Both test-locked, each said once.
- **UX Woman route** "v1: built, untested → v2: only if tests find gaps → v3: only if a state-approved route allows it" (`:258`). This is the only place the gating is stated. Optionally trim "v1: built, untested" to "v1: built".
- **UX Woman reel transcript slide titles** (`:73-87`). They echo section headings, but they're the video's text alternative.
- **MSK SURVIVED list** (`:71-81`, folded). It repeats the sustainment drawing, but it's that drawing's text alternative (the figure is aria-hidden).
- **MSK** "not MSK's specification" (decisions intro), "not attributed solely to this filing workflow" and "projection… not measured savings". These are honesty caveats, each said once and test-locked.
- **MSK "Service-design scope:"** (`:330`). Test-locked (`a11y:835`).
- **Logistics stat labels saying "reported" three times** and "85% faster in my service record". Test-locked (`a11y:203-207`), and these are the attributions.
- **Logistics map caption** "A schematic, not a map…". It's the security boundary for military content and is test-locked.
- **Logistics close CaseMore** "How this connects to clinic work". It's the only support for the h2's cross-domain claim.
- **Grove** "Limit: self-report prioritized the next build…" (`:349`), "not completed redesigns", "Still unbuilt…", the PhaseIndicator and "What the three phases mean". All test-locked, and each states a different limit.
- **Grove close p** "Top guesses, how sure it is…". Keep this as the single visible plant-ID-to-clinical bridge (G11 cuts the folded twin).
- **Interview-sourced humanLines** on Mobbin, Logistics, Grove and UX Woman. Each adds an anecdote the sub doesn't have. (MSK's M1 and Knowunity's K2 are the exceptions: they paraphrase.)
- **"Next case study" bands.** One per page, no duplication.

---

## Top 10 cuts by impact

| Rank | Cut | Why it ranks | px | Test impact |
|---|---|---|---|---|
| 1 | **G1** Grove hero trace ledger (5 / 37 / 3) | It's in the hero, and it's the exact pattern Hillary called junk on UX Woman | 94 | `a11y:188` → update |
| 2 | **K1** Knowunity hero "Built here / Not proved" dl | Same hero pattern; caveat 2 of 7 | 101 | none |
| 3 | **B2 + B3 + B4 + B5** Mobbin: workSplit, What I got wrong, decisions intro, route | Removes four of the five tellings of the same four steps | 330 | none (make `intro` optional) |
| 4 | **K5 + K6 + K3 + K8** Knowunity: "What I'd change" band, outcomes mock sentence, "How the prototype works", route | Takes "mocked" from seven visible instances to three | 265 | none |
| 5 | **L1 + L4 + L5 + L6 + L7** Logistics result restatements (hero Result row, moves lede, number clauses in move cards) | Takes the headline result from six statements to three | ~280 | `a11y:201` → update |
| 6 | **M1 + M2 + M3** MSK problem and pitch said three times in the first screen and a half | The opening reads as one story instead of an echo | ~130 | none |
| 7 | **G2 + G6 + G7 + G9 + G10** Grove signposting and restating ledes | Five lines of meta or echo copy in the main column | ~317 | none |
| 8 | **S1 + S2** Route recaps and "Decisions" labels sitewide | One component change; removes decorative repetition on four pages | 108 + 152 | none |
| 9 | **B6–B9** Mobbin outcomes: duplicate disclaimer, "did not design", 3 / 4 stats, close p | The outcomes section stops re-reading the hero | ~297 | none |
| 10 | **U1 + U2 + U5 + U6** UX Woman caveat stacking (reel caption, question CaseMore, tests intro, disclaimer) | Finishes the hero trim she started: one instance of each caveat | ~181 | none |

Next tier: **M6 + M7** (MSK's duplicate step lists and second journey chrome: about 156px visible, breaks `a11y:124-128`, `:624`, `:639-640`); **S3 / H2** (duplicate CopyEmail on seven pages: 64px each, needs Hillary's call because the QA'd component is on this branch); **H1** (Home "4 more" summary names the wrong case study, which is a factual fix).

## Counts per page

| Page | Cuts / merges listed | Of which break a test |
|---|---|---|
| Sitewide | 4 | 0 (S3 needs a call) |
| Home | 2 (+1 keep) | 1 (H2) |
| About | 0 | 0 |
| MSK | 15 (+1 hygiene) | 2 (M6, M7 if removed outright) |
| Logistics | 14 | 1 (L1) |
| UX Woman | 7 | 0 |
| Grove | 14 | 1 (G1) |
| Knowunity | 10 | 0 |
| Mobbin | 11 | 0 |

**Component changes these cuts need:** make `intro` and `disclaimer` optional in `components/flagship/EvidenceField.tsx:34-35`; make `intro` optional in `DecisionStory.tsx`; add an `afterOnly`/`bare` prop to `MSKJourney`. Spanish (`data/spanishCaseStudies.ts`, `MSK_COPY.es` in `data/mskCaseStudy.ts`) is a condensed parallel structure. Mirror each cut where the ES block has the same element, and keep the ES strings the tests require (`a11y:399-416`, `:466-467`).

---

## Applied 2026-11-17

Cuts only. No new copy except one-word joiners where a sentence's middle went ("my team", "One affinity board…", "It was adopted, then funded" and "Where this comes from", both of which this audit specified). Every guarded caveat is still on the page once.

**Applied:** S1 (route recap cut on Knowunity, Mobbin, Logistics; UX Woman keeps it), S2 (the "Decisions" span plus its CSS), H1 ("4 more" / "4 más"; the fold holds Logistics, Knowunity, Mobbin and the hackathon), M1–M16 (M5: h3 cut; M6: folded step lists cut; M7: new `afterOnly` prop on MSKJourney; M8: summary renamed "Where this comes from" and inner label cut; M9: EMR card and its `MSKMechanism` "01" diagram deleted), L1–L14 (L8 also drops the before-view read; L10: the mechanisms moved into the visible move cards and the folded grid is gone), U1–U7, G1–G14 (G14 cut the folded demo CTA only; the "Try the working prototype." h2 stays because the interactive lab sits under it), K1, K3–K10, B1–B11.

**Component changes:** `intro` and `disclaimer` are optional in EvidenceField, `intro` is optional in DecisionStory, MSKJourney has `afterOnly`, and `close.body` is optional in SpanishCaseStudy (a close with no body now renders no fallback line). Dead code removed: WORKFLOW_BEFORE/AFTER, the "01" filing diagram and its labels, the OrderStatusBoard read strings, and the CSS for `.fp-workflow`, `.fp-journalLine`, `.fp-knowunityChange`, `.fp-constraintAnnotations--four`, `.fp-ownership--paper`, `.fp-indexLens__boundary`, `.rp-heroEvidence--boundary`/`--trace`, `.rp-specimenTruth`, `.rp-bridge`, `.rp-quoteCard`, `.fp-statusBoard__read`, plus the Decisions-label span. The Grove survey grid went from a "lead plus three" layout to two columns, because the lead tile (76%) was cut.

**Spanish:** mirrored wherever the ES block has the same element (MSK, Mobbin, Logistics, Knowunity, UX Woman). Grove ES has none of the cut elements, so it is unchanged. Two places the ES deliberately keeps more than the EN: Logistics ES keeps "Aquí no se describen posiciones, rutas ni ubicaciones de unidades." because the ES page has no map caption to carry that boundary, and Knowunity ES keeps the hold-time sentence because it has no mock note.

**Skipped:** S3 and H2 (removing CopyEmail; Hillary's call). The recruiter panel wording and Grove's "Five tests" (Hillary's call). S4 (ShareCaseStudy; marked optional and not in the requested sitewide set). K2 (Knowunity human line; marked optional, "confirm with Hillary"). The Keep list.

**Tests updated (233 still pass):** `a11y` logistics hero (checks the sub's before/after/source), Grove hero (checks the sub instead of "3 directions"), MSK workflow steps (now read from the two `.msk-journey` lists), MSK "no film" test (asserts two journey lists), MSK journey test (one set of tabs and one caption), MSK boundary label ("Where this comes from"). No honesty-phrase assertion was removed.
