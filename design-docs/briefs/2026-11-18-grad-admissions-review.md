# Grad admissions review: three readers

Date: 2026-11-18. Reviewer: design-critic (Fable). Read-only review.

**What I reviewed:** the local production build at http://localhost:3023 (this includes today's unpublished changes, not the live hillaryesposito.com). Routes: `/`, `/about`, and six case studies (msk, logistics, ux-woman, grove, knowunity, mobbin), at 1440x900 and 390x844, with every `<details>` fold opened. I also read the linked résumé PDF (`my-app/public/assets/Hillary_Esposito_Portfolio_Resume.pdf`).

**What I did not review:** the MTA hackathon site, the Grove live demo, the Knowunity prototype, both Storybooks, the 13-minute UX Woman midterm video (I read only its slide list), and the MSK News article. My findings about those links rest on how the portfolio describes them.

Screenshots and extracted text: `/private/tmp/claude-501/-Users-hills-mac-Documents-portfolio-github-hme222-github-io/26f3bab3-90d6-45e7-84b1-538b16ff2a24/scratchpad/review/`

---

## The problem every reader hits first

The site's headline is "UX designer and researcher for healthcare and internal tools." The résumé goes further: "UX Designer, Product Designer & Researcher," with a summary that opens "UX designer, product designer and researcher with six years at a cancer center (MSK)."

Your brief says you have no paid UX role. An admissions reader sees two problems here:

1. **Credibility.** The résumé reads as if you did UX work at MSK. You were an office coordinator, then an administrative assistant, then a training facilitator.
2. **Motivation.** If you already are a UX designer and researcher, why do you need the degree? The site never answers that.

A hiring site and an application portfolio want different framings. Right now the site is a hiring site.

---

## Lens 1: Bentley, MS Human Factors in Information Design

**Verdict: Borderline, leaning weak.** None of the work shows a full research loop: a planned study, then a run, then findings that changed the design, then a retest. Every project stops before that last step, and the site says so. Being honest about it is good. It also proves the gap.

**Two strongest pieces of evidence**
1. **Grove.** It combines a five-person moderated test, a 37-person survey with a stated sample breakdown (31 owners and caretakers, 3 florists, 3 bouquet buyers), and a ranked feature cut with percentages. It also states its limit: "self-report prioritized the next build; it does not prove behavior or demand." That sentence is graduate-level thinking.
2. **UX Woman.** Six interviews go into one affinity board per interview, then six themes, then two falsifiable hypotheses with tests ("Holds if at least one is absent or ambiguous"). The plan to set the pass bar before the test runs is a real study-design habit. Labeling two themes as "Added after an AI cross-check" is unusually transparent.

**Three biggest gaps this reader notices**
1. **The one usability test has no surviving data.** Grove: "its task records are not preserved." The only test you ran can't be inspected: no tasks, no success rates, no quotes tied to tasks. The 2.4 vs 3.4 confidence comparison (13 vs 14 people) has no spread and no caveat about the small sample.
2. **No healthcare user is ever tested.** UX Woman interviewed staff, not patients, and the guide is untested. MSK is "rebuilt from memory," and "observation counts didn't survive." Knowunity: "no student has tried it." For a human-factors program, healthcare is your claimed domain, and that is exactly where the evidence is thinnest.
3. **No outcome was measured by you, with a method.** Every number is self-reported or projected, and the site says "measurement periods and methods are not preserved." The MSK page lists "What I would have measured." That is a good instinct, but it is a plan, not evidence. A reader will notice that the human-factors skill they train (measurement) is the one thing missing.

**Claims that look inflated or unsupported (this reader is the strictest)**
- **"Led 21,000+ clinicians and administrative staff across the workflows in scope"** (MSK numbers block, labeled "Led"). The résumé says 21,000+ is the size of the organization the training tracks served. "Led 21,000" reads as a leadership claim a training facilitator can't support. This is the single most damaging line.
- **"20% organization-wide EMR cost reduction."** The site qualifies it ("not attributed solely," "period and cost definition… not preserved"). The résumé summary puts it in your opening paragraph as "a workflow redesign I initiated contributed to a 20%…" A metric you can't define shouldn't lead.
- **Logistics: 60% spending cut, 15% improvement, 85% faster.** All are "reported" with no method. The 15% is described differently in each place (see the conflicts list). "60% less spend… while maintaining availability" credits the drop to the tracker, which you can't show.
- **"Independent proof · MSK News."** This is a profile of your career path. Unless the article describes the filing button, "proof" overstates it. I can't judge, because I didn't read the article.
- **"Six interviews, six themes."** Saying six interviews produced six themes, two of them added by an AI cross-check, invites the question of whether the themes came from the data.

**Interview questions this reader would ask**
- "Walk me through the Grove moderated sessions. What were the tasks, what did you measure, and why weren't the records kept?"
- "Your survey was a convenience sample of 37. How did you recruit, and what bias does that bring in?"
- "You've never tested anything with a patient. How would you design a study with Medicaid recipients, and what would you need from an IRB (the review board that approves research with people)?"
- "What does '21,000+, Led' mean? What exactly did you lead?"
- "Have you run any statistics? What would you need to learn here that you can't do now?"
- "Bentley prefers UX work experience. What's your closest equivalent, and who could vouch for it?"

**Does it make up for having no paid UX role?** Not on its own. It shows research literacy and honesty, not research practice. The interview is where you'd close the gap.

---

## Lens 2: Pratt, MS Information Experience Design

**Verdict: Borderline, leaning strong.** The interaction and service-design thinking is good, and the site itself is a well-crafted, coherent artifact. But no case study shows a complete process from problem to tested solution, and two of the six aren't design work.

**Two strongest pieces of evidence**
1. **MSK service blueprint plus "One button, four rules."** It has a frontstage/backstage blueprint with a line of visibility and a handoff gap named precisely ("For two steps the message sits below the line of visibility, owned by nobody"). Then come four interaction rules: show the action only when the record is ready, make permission limits visible, separate blocked from not started, return people to the queue. This is real information-architecture and interaction reasoning about states and permissions, and it's clearly labeled as your portfolio design, not MSK's spec.
2. **Knowunity.** A built, tappable prototype (43 routes) on a real brief, with state-level decisions: push-to-talk, the mic permission asked only when needed, a step-by-step hint path after each miss, "never trap the student." This is the clearest interaction-design work on the site.

**Three biggest gaps this reader notices**
1. **No case study closes the loop.** UX Woman: "Built, not yet tested." Grove: "redesign has not been tested yet," "Still unbuilt: high-fidelity redesign, edge states." Knowunity: no students. MSK: you left before it was built. Pratt wants to see iteration, and there's none to see.
2. **Little visible design artifact work in the healthcare pieces.** UX Woman has three low-fidelity screens and one wireframe image. MSK is reconstructed illustrations. The richest UI (Grove, Knowunity) is consumer work. Grove's hero shows the old gamified app ("Nothing is unlocked yet," a "Progress" tab), which contradicts the "Personality, not points" decision lower on the page.
3. **Authorship of the craft is unclear.** Grove's first build was made with Emergent (an AI app builder). For Knowunity, "Claude Code wrote most of the code from my specs." Mobbin is curation of other companies' screens ("I did not design these apps"). Logistics is operations and service work, not interface design. A craft reader will ask what you made with your own hands, and the answer is buried.

**Inflated or unsupported claims**
- "Medical resupply went from months to weeks," tagged **"Service Design"** on Home. This was a warehouse relocation. Calling it service design stretches the term for this reader.
- "Founder, Product Designer, Developer · Grove Plant Care" (résumé). "Founder" for a prototype with no users or company is a stretch.
- "Twelve features became three." The survey ranked 12 options, but the 12 options came from your first build. Fine, as long as nobody reads it as 12 shipped features being cut.

**Interview questions this reader would ask**
- "Show me your sketches and wireframes before the React prototype. Where's the divergent thinking?"
- "Which visual and interaction decisions in Knowunity were yours, and which came from their kit or from Claude?"
- "Grove's hero still shows unlocking and progress. Is that the version you're defending?"
- "Take one case study from start to finish. Where did a test change your design?"
- "How did you decide the information architecture for the Medicaid guide's branches?"

**Is the craft good enough?** The portfolio site itself, yes. It has a consistent editorial system, clear type hierarchy, intentional collage art direction, and keyboard-operable interactions. The design work inside the case studies is mixed: strong interaction reasoning, thin visual design deliverables in the healthcare work.

---

## Lens 3: Pace, MS Human-Centered Design

**Verdict: Strong on readiness. Borderline on "clear reason for the degree," because the portfolio never states one.** This reader sees someone who already speaks the field's language (hypotheses, service blueprints, affinity mapping, accessibility, uncertainty states) and tells the truth about limits. That predicts success in the coursework. What's missing is the "why," and the About page actively misses the chance to give it.

**Two strongest pieces of evidence**
1. **The MSK "I did the jobs before I redesigned them" section.** Three seats (Office Coordinator, Administrative Assistant, Training Facilitator), each tied to a method. It's the clearest human-centered origin story on the site: you found the workaround because you lived inside it.
2. **The site's honesty about limits.** "It is untested, and no patient was interviewed." "Recall mocked, not shipped." "I did not design these products." To a reader who takes career changers, this signals a self-aware learner who knows what she doesn't know yet. It counts for more than a polished claim would.

**Three biggest gaps this reader notices**
1. **No statement of why a master's, why now.** The Home page is aimed at hiring ("Building a clinical workflow or internal tool? Email me"). There's no line about what you want to learn.
2. **The About page is plants, a cat and half marathons.** Nothing on the career change, the military-to-healthcare path, or what pulled you into design. Pace weighs motivation, and this page is the natural place for it.
3. **Your formal UX training is invisible on the site.** The site never mentions the Google UX certificate or Noble Desktop (they appear only on the résumé). The UX Woman program appears only inside one case study. A reader can't see your learning path, which is exactly what readiness is judged on.

**Inflated or unsupported claims:** the same headline problem. A reader at a program that welcomes non-design backgrounds would find "career changer with real healthcare operations experience" more credible than "UX designer and researcher."

**Interview questions this reader would ask**
- "Why human-centered design, and why a degree rather than more bootcamps?"
- "You've done the Google certificate, Noble Desktop and UX Woman. What did each leave you unable to do?"
- "How do 13 years of military logistics shape how you'd work with patients?"
- "What does a successful outcome of this degree look like for you in 2029?"
- "Tell me about a time research proved you wrong." (Grove's "I know plants, so I wanted more features" line is a ready answer.)

---

## Across all three

### Lead with one case study, cut or move another

**Lead with MSK** for all three programs. It's the only case study where you were inside a real healthcare system, found the problem yourself, worked across four departments, and saw it go into production. It's your differentiator, and it's healthcare. It's currently third on Home.

The condition: fix the "21,000+ Led" line and move the 20% figure down first. MSK has the weakest evidence and the strongest story, so an inflated number there drags down everything around it.

If you're writing a Bentley-specific version, Grove or UX Woman shows more research method. MSK still leads because Bentley's actual question is experience.

**Move down or cut Mobbin.** It's documentation work, and by your own words you didn't design anything. It also creates a "freelance" conflict with your brief (see the conflicts list). Logistics should stay but be reframed as background, not design.

### Does the healthcare background come through?

**Partly. It gets diluted.** The headline says healthcare, but:
- Grove (plants) is second on Home.
- Knowunity, Mobbin and logistics are not healthcare.
- MSK sits third.
- The About page doesn't mention healthcare at all.
- Your BS in Public Health is never mentioned on the site. The MHA appears only in a sub-section of the MSK page.

For a healthcare-software applicant, the public-health and MHA degrees are evidence. Right now only the résumé shows them.

### All the work is unpaid: how readers react, and how to frame it

- **Bentley** will notice and interview you about it. Their stated preference is UX or technology work experience.
- **Pratt** cares less about pay than about whether the process is complete.
- **Pace** expects it.

Every reader reacts worse to finding out than to being told. Today the site never says "unpaid" or "self-directed." The résumé lists Grove under "Product Design Experience" and calls you "Founder." Mobbin says "freelancer."

Honest framing, in one line: say plainly which projects were coursework (UX Woman), a competition (Knowunity, the hackathon), or self-directed (Grove). Make the paid experience the healthcare operations and training work. Its design-relevant parts are real: you found a workflow failure and got it built.

That is a stronger story than claiming a UX title. "I worked inside the systems I want to design, and I've done self-directed UX training to get here" is exactly the career-changer case these programs accept.

### Five changes, in priority order

| # | Change | Effort |
|---|---|---|
| 1 | Fix the inflated claims. Change "Led 21,000+" to the org size you trained within. Take the 20% out of the résumé summary. Reconcile 15% / 60% / 85% between the site and résumé. Reconcile "Army" vs "Army National Guard." | **One week** |
| 2 | Reframe the headline and résumé title for applications: a healthcare operations and training professional moving into UX research and design. Add one honest line about what's self-directed or coursework. Add a "why a master's" paragraph to About, including your UX training path (Google, Noble Desktop, UX Woman) and the BS in Public Health plus the MHA. | **One week** |
| 3 | Reorder Home: MSK first, then UX Woman, then Grove. Move Mobbin and Logistics down into "More work." Fix Grove's hero so it shows the redesign direction, or label it "before." | **One week** |
| 4 | Run one real usability test on the UX Woman Medicaid guide (5 participants, adults 19 to 64, the four comprehension questions you already wrote, pass bar set first). Publish the tasks, results and one design change. This one project closes the gap for Bentley and Pratt at once. | **New work** (2 to 4 weeks) |
| 5 | Write one research artifact that can be inspected: the Grove survey instrument plus raw tallies, or the UX Woman interview guide and affinity board. Rerun Grove's moderated test on the redesign and keep the task records this time. | **New work** |

### Unfinished, broken or unprofessional

**Real issues**
- **The case studies end with "Email me," aimed at hiring managers.** Home ends with "Building a clinical workflow or internal tool?" For admissions readers it reads as if they landed on the wrong site. It isn't broken, but it's off-audience.
- **Grove hero shows the pre-redesign gamified app** ("Nothing is unlocked yet," Progress tab) beside a case study that says points were removed.
- **Mobile 390px, case-study nav:** the "In this case study" chip is cut off at the right edge ("In this case…"). Minor, but visible on first load.
- **Home's Logistics thumbnail** is an abstract leaf-shaped network. It doesn't read as logistics or as a map, and it looks unfinished next to the other thumbnails.
- **The site's headline (MSK case study) doesn't match its Home card.** The page says "One queue. Four teams." The card says "A filing queue replaced the paper detour." Small, but it reads as two different stories.
- **Much of the key content sits inside closed folds** ("Inspect the complete service blueprint," "See the related MSK workflow redesigns," "Inspect Grove's complete research evidence," all the "Show less" sections). A skimming admissions reader will miss the blueprint and the research evidence, which are your strongest artifacts for Bentley and Pratt.

**Testing artifacts I checked and ruled out (not bugs)**
- A console error, "Unexpected token '<'," appears on every page. It comes from `/_vercel/insights/script.js`, which only exists on Vercel. Locally it falls back to the HTML page. It shouldn't happen in production, but confirm once on the live deploy.
- Images that looked broken (Knowunity webp files, the UX Woman wireframe) are lazy-loaded. They loaded once scrolled into view.
- I checked for horizontal overflow at 390px on every route and found none.

---

## Conflicts between your stated background, the site and the résumé

These are not resolved here, only listed.

| # | Topic | Your brief | Site | Résumé |
|---|---|---|---|---|
| 1 | MSK roles | "administrative assistant, then training facilitator" | Three seats: **Office Coordinator**, Administrative Assistant, Training Facilitator (MSK page) | "Office Coordinator → Administrative Assistant" (2018–2022), "Training Facilitator (retitled Trainer I Specialist)" (Jan 2022–Jul 2024). The brief leaves out Office Coordinator. |
| 2 | MSK tenure | Six years | "six years in cancer-care operations" (Home) | 2018 to July 2024 is about 6 to 6.5 years. Consistent. |
| 3 | "Cancer-care operations" | Admin, then training | "cancer-care operations" | "six years at a cancer center." "Operations" is the site's framing, not your stated roles. |
| 4 | Military branch | "Army **National Guard** officer" | "13+ years in the **Army**" (Home); "On an Army deployment" (Logistics). The National Guard is never named. | "Commissioned Officer · **NJ Army National Guard**, 2013–2026"; the summary says "13+ years of Army service… U.S. Army veteran." |
| 5 | Years of service | 13 years | "13+" | 2013–2026 = 13. "13+" overstates slightly. Also: is 2026 the end date ("veteran") or current service? |
| 6 | Military specialty | "13 years… in medical logistics" | Logistics role: "Medical logistics officer" | Roles listed: Platoon Leader, Company Commander, Brigade Medical Supply Officer. Not all 13 years were medical logistics. |
| 7 | Deployment setting | (not stated) | "three countries," "Active zone" | "moving the warehouse into a **combat zone**" |
| 8 | Resupply metric | (not stated) | "1–2 wk… **85% faster** in my service record" | Same, "85% faster per service record." Consistent with each other, but 1–2 months to 1–2 weeks works out to about 75–88%, so 85% is a single point picked from a range. |
| 9 | 15% metric | — | "15% reported: critical supplies reached the stations more efficiently after one shared **communication protocol**" | "**deployment coordination** improved 15%," attached to **order-status tracking** |
| 10 | 60% metric | — | "60% reported reduction in spending, while maintaining availability" | "cutting spending 60%." Neither says what spending or over what period. |
| 11 | $2M and 5,000+ soldiers | — | "$2M move," "5,000+ soldiers" | Not on the résumé |
| 12 | 21,000 | — | "**Led** 21,000+ clinicians and administrative staff across the workflows in scope" | "role-specific workflows for a 21,000+ **person organization**" (org size, not people led) |
| 13 | 20% EMR cost | — | "organization-wide EMR cost reduction; not attributed solely to this filing workflow"; definition not preserved | Lead claim in the summary: "a workflow redesign I initiated contributed to a 20%…" |
| 14 | ~$1M | — | "projected… not measured" | "pitch projected ~$1M/year." Consistent, and labeled correctly. |
| 15 | UX training | Google UX certificate; **full-time Noble Desktop program** | Neither is mentioned anywhere. "UX Woman, a 7-month… mentor-led UX design accelerator" appears only in that case study. | "Google UX Design Certificate"; "**UX, Data Analytics, and Software Engineering Bootcamps**, Noble Desktop" (three bootcamps, not one full-time program). UX Woman is **not on the résumé**. |
| 16 | Degrees | BS Public Health (3.04 GPA); MHA with honors, Rutgers | MHA (Rutgers) only, inside the MSK page, "finished in this seat" (Office Coordinator). The BS is not mentioned. | MHA with honors; BS Public Health; plus an **Associate of Science, Valley Forge Military College** (not in your brief). No GPA (fine). |
| 17 | Other credentials | — | Lean Six Sigma Green Belt (Purdue); Training & Facilitation (ATD) | Green Belt (Purdue). ATD is not on the résumé. Neither is in your brief. |
| 18 | Training role description | "teaching Epic, HIPAA, and compliance" | "instructed on Epic… HIPAA… and the compliance modules" | "**Rebuilt** the learning tracks for administrative onboarding." Rebuilding is a bigger claim than teaching. |
| 19 | Paid vs unpaid | "No paid UX or design role… All portfolio projects are unpaid or self-directed" | Mobbin: "**As a freelancer**… four months"; Home tag: "Freelance app documentation" | Mobbin not listed. Grove listed under "Product Design Experience" as "Founder, Product Designer, Developer." If Mobbin paid you, the brief is wrong. If it didn't, "freelancer" is wrong. |
| 20 | Positioning | Goal: UX designer or researcher in healthcare software | Present tense: "UX designer and researcher for healthcare and internal tools"; Home says "I also design consumer apps" | "UX Designer, Product Designer & Researcher · Healthcare and consumer products." Present-tense titles with no paid UX role. |
| 21 | Bilingual | Not stated | "bilingual in English and Spanish" | Same. Not a conflict, just not in your brief. |
| 22 | Hackathon | Not stated | NYPL hackathon project, on Home | Not on the résumé |
| 23 | MSK attribution | — | Home: "pitched the digital filing workflow that replaced it." MSK page: "The hospital's IT and UX teams built the real version," "changed along the way, and I wasn't there for it" | "IT and UX built the button after I changed roles." Consistent, but Home's wording claims more than the case study does. |

## Hillary's answers (interview, 2026-11-18)
| # | Issue | Her answer | Action |
|---|---|---|---|
| 1 | MSK role order | Office Coordinator → Administrative Assistant → Training Facilitator | Site already matches. No change. |
| 2 | "Training Specialist I" (ES only) | MSK changed titles a month before she left (rename, not promotion) | Removed the ES parenthetical so EN and ES match. |
| 3 | Mobbin paid vs unpaid | Paid | "As a freelancer" is accurate; her brief's "all unpaid" was wrong. Correction 2026-11-18: it was not a UX role or title. Describe it as freelance app documentation (the site's wording), never as a UX or design job. |
| 4 | Army branch/years | All accurate. Summer 2012 basic training + a year in the Reserves; sworn into the NJ Army National Guard 2013; National Guard every year except 2024, active duty on deployment as medical logistics officer / medical operations officer; service ended January 2026. | "13+ years" and "U.S. Army veteran" are accurate. Proposed: say "Army National Guard" where the site says "Army", so it matches the résumé. Résumé dates 2013–2026 understate the 2012 start (her call). |
| 5 | 13 years of medical logistics? | Medical logistics was the 2024 deployment (official title Brigade Medical Supply Officer). Before that: Company Commander, Executive Officer, Platoon Leader. The Logistics case study is from that deployment. | Site never claims 13 years of medical logistics (it says "13+ years in the Army"): no site change. Her brief/application wording "13 years ... in medical logistics" overstates; use "13+ years of service, including a deployment as Brigade Medical Supply Officer". Résumé should add Executive Officer if missing. Found while checking: the meta/page descriptions in index.html:30 and usePageTitle.ts:9,46 still say "product designer with a strong UX and research lean" (fix with the title question). |
| 6 | "Combat zone" vs "active zone" | "Combat zone is better." She may name Iraq, nothing further; "two surrounding countries" is fine (unnamed). | Proposed: FlagshipLogistics.tsx:170 "Active zone" → "Combat zone" and ES spanishCaseStudies.ts:352 "Zona activa" → "Zona de combate"; hero "on an Army deployment ... seven aid stations in three countries" → may say "in Iraq and two neighboring countries". Never name the other two countries, units, routes or sites. |
| 7 | 21,000 | 21,000 = all MSK employees (MSK's published headcount); in theory most used the EMR. She trained newer employees: estimated ~2,000 (cohorts of ~30 across 2 years). | Proposed: stop using 21,000+ as the workflow's reach/"scale" tile. Use it only as org size ("a 21,000-employee cancer center, per MSK's published headcount"). Add "trained ~2,000 new employees (her estimate)" if she wants a reach number. Math check pending: 2,000 ÷ 30 ≈ 65 cohorts in 2 years (about one a week). |
| 8 | 2,000 trained (math) | Confirmed: about one cohort of ~30 a week for 2 years. | ~2,000 new employees trained (her estimate) is supportable. |
| 9 | 20% | Measured printing and scanning costs. Source: going over the financials with a finance department head. | Supported but undocumented. Proposed wording everywhere (site + résumé): "printing and scanning costs fell about 20%, per a review of the financials with the finance department head". Never "EMR costs" or "workflow costs" generally. |
| 10 | 85% / 60% / 15% | All three come from her Officer Evaluation Report (OER). | Documented source (written by her rater). Proposed: replace "service record" / "owner-reported" / "reported" with "per my Officer Evaluation Report" (define OER) on site + résumé. Keep 85% = 1–2 months → 1–2 weeks as stated in the OER. |
| 11 | Unit name (44th Infantry Brigade Combat Team) in a public code comment | "yeah thats fine" | Keep. |
| 12 | $2M / 5,000+ | $2M = value of the medical supplies and warehouse inventory (the same thing). 5,000+ = all New Jersey soldiers on the deployment that her team supported. Source: OER. | Proposed: "$2M in medical supplies and warehouse inventory" (not "$2M move"); "supported 5,000+ New Jersey soldiers"; cite the OER; add both to the résumé to match. |
| 13 | Noble Desktop (her pasted dashboard, 2026-11-18) | Certificate programs listed: Data Analytics Certificate (May 6, 2025 – Apr 27, 2026, 10 courses); Software Engineering Certificate (Jul 8 – Dec 11, 2025, 12 courses); AutoCAD Certification Program (Jan 2026); Generative AI Certificate (Jan 26 – Apr 23, 2026, 8 courses); AI Software Engineering Bootcamp (Oct 5 – Dec 15, 2026, 5 courses, IN PROGRESS). UX courses: UX & UI Design Certificate, in person, Feb 3 – Mar 14 (2025, inferred from list order), attended 24 of 24; a second UX & UI Design Certificate run, live online, Jan 21 – Jul 20 (2026, inferred), attended 29 of 48; AI Coding for Product & UX, Oct 19–30, 2026, attended 10 of 10. Some courses inside certificate date ranges show 0 attended (e.g. Python Data Visualization, Python Machine Learning). | Dashboard shows attendance, not which certificates were awarded. Pending: which certificates she was actually awarded; Google UX cert year; UX Woman completion. Résumé "UX, Data Analytics, and Software Engineering Bootcamps" roughly matches but needs exact names. |
| 14 | Training, confirmed | Awarded all Noble Desktop certificates/programs, including UX & UI Design Certificate (Feb–Mar 2025). The 2026 UX & UI run was a repeat. Google UX Design certificate: 2025. UX Woman: still in it (in progress). | Training list for site/résumé: Google UX Design Certificate (2025); Noble Desktop UX & UI Design Certificate (2025); Software Engineering Certificate (2025); Data Analytics Certificate (2026); Generative AI Certificate (2026); AutoCAD Certification (2026); AI Software Engineering Bootcamp (in progress, ends Dec 2026); UX Woman UX Design Accelerator (in progress, 2026). Don't list the repeat. Add UX Woman to the résumé as in progress. |
| 15 | Degrees | Associate of Science, Valley Forge Military College, 2014; BS Public Health, Rutgers, 2017 (3.04); MHA, Rutgers, 2019, "with honors" = GPA distinction (3.6). | Keep all three. Write "MHA, Rutgers, 2019 (3.6 GPA)" unless the diploma/transcript says "with honors" verbatim. Site: add a one-line education mention (About or résumé link) if she wants the BS visible. |
| 16 | Associate degree (Valley Forge, 2014) | "its not needed if theres not enough room" (answer was about the associate degree, not Grove; corrected 2026-11-18) | Keep the AS if the résumé has room; drop it first when space is tight. |
| 17 | Grove "Founder" | Personal project; "independent project is fine". | Résumé: "Grove · Independent project · Designer & developer · 2025–present", under Projects (not Product Design Experience). Drop "Founder". |
| 18 | Title | Options 1 + 2: "UX Designer & Researcher" on the site and the job résumé (drop "Product Designer" from the résumé title to match); school applications (statements, application forms) use a transition framing, e.g. "healthcare operations and training, moving into UX design and research". | Also fix stale "product designer with a strong UX and research lean" in index.html:30 and usePageTitle.ts:9,46. |
| 19 | MSK credit | She presented the workflow to leadership and IT, and at an MSK internal conference on internal changes. | Proposed: replace "pitched" with "presented the workflow to leadership and IT, and at an MSK internal conference". Keep the MSK page's honest line that IT and UX built a changed version after she left the role. Pending: who approved/funded; what changed. |
| 20 | MSK approval / what changed | IT approved once funding came in. The built version was the same as what she presented; unsure of back-end flow changes. | CONFLICT with site: mskCaseStudy.ts:432 (+ ES) says "The built version changed along the way". Proposed: "IT approved it once funding came in and built it as I presented it. I don't know what changed behind the scenes." Also review mskCaseStudy.ts:352 "IT and UX built the real one" for consistency. |
| 21 | MSK News link | The article covers her path from the military to MSK and her career there. It does not describe the filing workflow. | "Independent proof · MSK News" overstates it. Relabel as "Profile · MSK News" (FlagshipMSK.tsx:318; mskCaseStudy.ts:459-461; ES ~751). |
| 22 | Certifications | Lean Six Sigma Green Belt, Purdue: "I think it was 2019" (her recollection; confirm against the certificate before printing a year). ATD Training & Facilitation: completed 2023. The Green Belt is what led her to spot the four-department filing detour. | Site claims match. Add ATD (2023) to the résumé. Do not print the Green Belt year until confirmed. |

## Applied (2026-11-18)
Rows 6, 7, 9, 10, 12, 18, 19, 20, 21 applied to the site (EN + ES): Combat zone; Iraq and two neighboring countries; 21,000+ only as MSK headcount, tile replaced by ~2,000 trained (her estimate); 20% = printing and scanning costs per her financials review with the finance department head; OER cited for 85/60/15 (no more "service record"/"reported"); 5,000+ New Jersey soldiers; $2M in supplies; "pitched" → "presented"; built-as-presented line; "Profile · MSK News"; meta descriptions now "UX designer and researcher". Not yet changed: the hidden Ask knowledge base (en.json/es.json, Ask is disabled) and the résumé PDF.
