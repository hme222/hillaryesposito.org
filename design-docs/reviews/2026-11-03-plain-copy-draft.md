# Plain-copy draft: headings, labels and em dashes

Date: 2026-11-03
Status: draft only. Nothing in `src/` is changed. Needs Hillary's approval, then a Spanish sync.
Rules applied (copywriter skill): plain words before specialist words, no em dashes, no decorative threes, no invented facts. Every rewrite below only renames or removes jargon. No number or claim is added.

## One question first

The site says MSK's EMR cost reduction was 20% (About, MSK outcomes, the Ask knowledge). Your copy voice file lists "20% cost reduction" and "70% workflow efficiency gain" as two proof points that are not in your résumé facts. The page scopes the 20% to the organization-wide initiative, which is careful. Is 20% confirmed in your résumé or records, and should the 70% appear anywhere?

## Jargon in visitor-facing headings and labels

| Where | Now | Plain version |
| --- | --- | --- |
| Home, section label | Primary product cases | Main case studies |
| Home, section label | Supporting evidence | More work |
| Home, section heading | Decisions you can inspect. | Selected work. |
| Grove, heading | Locked principles | Rules I kept |
| Grove, heading | The decision record | What I decided |
| Grove, label | Representative first-build artifact | First-build screen |
| Grove, label | All five calls, in full | All five decisions |
| MSK and Logistics, disclosure | How these artifacts were made | How I made these screens |
| Knowunity, disclosure | Inspect all Knowunity implementation decisions | See how I built it |
| Logistics, disclosure | Inspect the logistics constraints and mechanisms | See what made it hard and what I changed |
| Mobbin, disclosure | Explore the complete three-app capture archive | See every screen I captured |
| Knowunity, section | Knowunity build and evidence boundary | What I built and what is untested |
| MSK, section | MSK research evidence boundary | What the research does and does not show |
| UX Woman, table | Interview and pretotype ledger | Interviews and tests so far |
| MSK, heading | The numbers, and who they belong to. | The numbers, and whose they are. |
| MSK, label | Clinical system transformation stages | Stages of the change |
| Knowunity and Mobbin, kicker | Four decisions · my calls, not test findings | Four decisions I made, not yet tested |
| Knowunity and Mobbin, log tag | Decision log | Decisions |
| UX Woman, confidence line | Moderate that stakeholders see the risk. | Moderate that people in several roles see the risk. |
| UX Woman, test question | Does guidance ... help more than a general insurance library? | Does guidance at the moment of one coverage task beat a general insurance library? |

Words to retire from visitor copy when they appear: artifact, ledger, mechanism, boundary, stakeholders, "evidence field." Where the word is a real thing (the MSK diagram, the survey table), name the thing instead.

## Em dashes (40 found in visitor-facing text)

Replace each with the punctuation that matches its job.

| Kind | Example now | Plain version |
| --- | --- | --- |
| Page title | MSK — a case study by Hillary Esposito | MSK: a case study by Hillary Esposito |
| Document title | Knowunity — Voice Active Recall Case Study | Knowunity: Voice Active Recall Case Study |
| Aside in a sentence | Department compliant a month before the original deadline — no extension needed | Department compliant a month before the original deadline, with no extension |
| Aside in a sentence | Show top guesses, confidence, and sources—not one false verdict. | Show top guesses, confidence and sources instead of one false verdict. |
| Aside in a sentence | ...as what would make them delete it — the most-cited reason by far | ...as what would make them delete it. It was the most-cited reason by far. |
| Label | NO RETURN SIGNAL — WHICH IS WHY STEP 06 EXISTS | No return signal, which is why step 6 exists |

Apply with a search for the em dash character in `src/pages`, `src/data` and `src/i18n`, then read each hit. Spanish strings use the same fix.

## Left alone on purpose

- Headline claims that already carry a number or a named change ("One queue. Four teams.", "Twelve features became three.").
- Your own first-person lines about the work.
- The MSK "taught me" rewrite and the other lines changed on 2026-11-02.

## Not copy: motion plan (after approval)

GSAP is not installed. Candidate moments, each tied to the work and each reduced-motion safe: the MSK queue row changing to "In the chart", the Grove twelve-to-three cut, and section reveals. No decorative animation.
