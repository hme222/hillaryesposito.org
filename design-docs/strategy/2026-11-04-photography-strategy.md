# Design Strategy: photography on the portfolio

Date: 2026-11-04
Status: draft for Hillary's alignment. Nothing beyond the leaf photo in the Home About row is built.
Trigger: Hillary's note that the stock photos (a eucalyptus leaf, crumpled parchment) "don't align with the content."

## Why the photos missed

Each photo was chosen for mood (calm, paper, green), not for what it proves. The About row is about a clinician-facing designer with Army and MSK experience. A leaf says nothing about that. The parchment suggests an antique document, while the MSK story is about modern chart filing. The site's own rule is "the artifact is the argument" (strategy of 2026-11-03, principle 2). A photo that proves nothing is decoration, and the rule already rules decoration out.

## Who it serves

- **Primary:** recruiters and hiring managers scanning in 60 to 90 seconds. A photo has to answer a question they already have: who is this person, what did the work touch, is it real.
- **Secondary:** a design lead reading one case closely, and anyone on a phone, in dark mode, on a slow connection, or using a screen reader.

## Principles

### 1. A photo answers one question about the work
**The principle:** Every photo is placed to answer a specific question a reader has at that spot, and the caption says which.
**In practice:** Before a photo goes in, write the question it answers ("Who is she?", "What did the paper process look like?", "Where did this research happen?"). If no question comes to mind, the photo does not go in.
**What this rules out:** mood images, texture bands, and "something green" for warmth.

### 2. Real before stock, and labeled either way
**The principle:** Hillary's own photographs come first. Stock is a last resort, only where the subject of the photo is literally the subject of the text.
**In practice:** Each image carries a label in the caption: "Photo by Hillary", "Recreated", or "Stock, [name] / Unsplash". Stock never appears in a position where a reader could take it for evidence.
**What this rules out:** stock people, stock devices, stock offices, and any stock image inside a case study's evidence chapters.

### 3. The subject of the photo is the subject of the section
**The principle:** A plant photo belongs beside plant-care work. Paper belongs beside paper work. Anything else is a mismatch the reader notices.
**In practice:** Photos are assigned per section by subject (table below), not per page by style.
**What this rules out:** one atmosphere image reused across unrelated sections, and leaf photos on pages about healthcare or the Army.

### 4. Nothing identifying, nothing from the unit or the patient
**The principle:** No patient data, no faces without consent, no unit positions, no routes, no insignia, no equipment that places a location.
**In practice:** Military and MSK sections use recreated or abstract artifacts only, as already decided. Research photos of whiteboards or sticky notes are allowed only after names and institutions are removed.
**What this rules out:** any photo from a hospital or base.

### 5. Readable and light for everyone
**The principle:** A photo never reduces text contrast, never carries meaning only in the image, and never costs the first screen.
**In practice:** Decorative photos use empty alt text. Informative photos have a real alt description. Text is never set directly on a photo without a measured contrast pass in light and dark. Photos below the fold load lazily and have fixed dimensions.
**What this rules out:** text over texture without measurement, and photos that shift layout.

## Where photos could go, by section

| Section | Question a reader has | Photo that answers it | Source | Verdict |
| --- | --- | --- | --- | --- |
| Home hero | Who is this person? | The existing headshot | Hers | Already there |
| Home About row | What does she do? | None. The row is a bio; the headshot already sits in the hero | n/a | **Remove the leaf** |
| Home Contact band | How do I reach her? | None | n/a | Skip the parchment |
| Weekend Dispatch | Is this a real rider trip? | The event photograph already used as provenance | Hers | Already there |
| Grove case study | What is the product about? | The eucalyptus leaf fits here: Grove is a plant-care app | Stock, labeled | Candidate: Grove hero or the "who it is for" chapter, with credit |
| MSK case study | What did the paper detour look like? | A recreated paper form or a redacted photo of one | Hers or recreated | Needs her input. Stock parchment does not fit |
| Logistics case study | What was the setting? | None. Military: recreated or abstract only | n/a | No photos |
| UX Woman case study | What did the research look like? | A photo of her synthesis board with names removed | Hers | Needs her input |
| Mobbin case study | What did the library look like? | Captured screens, already planned | Hers | Waiting on the archive location |
| Knowunity case study | What was tested? | The prototype screens, already shown | Hers | Already there |

## Experience map

| Moment | Reader does | Should feel | Inclusive note |
| --- | --- | --- | --- |
| Hero | Looks at the headshot, reads the role | "A real person" | Alt text names her; image has fixed size |
| Home work row | Scans cases | "Each one shows something real" | Thumbnails are artifacts, not stock |
| Grove case | Sees the plant product's context | "This is about plants and new owners" | Credit directly under the stock image; decorative alt |
| MSK case | Sees the paper before-state | "That was the real problem" | Label says real or recreated |
| About page | Reads background | "She did this in practice" | No stock photos |

## Success metrics

| Metric | Measures | Target | How |
| --- | --- | --- | --- |
| Photo purpose | Every photo has a written question and a label | 100% | Checklist in the review pass |
| Stock placement | Stock appears only where its subject matches the section | 0 mismatches | Reviewer reads each placement |
| Contrast | Text on or near photos | 4.5:1 body, both themes | Rendered measurement |
| Weight | Added image bytes on the first screen | 0 for decorative photos | Network panel |
| Credits | Every stock image has a linked credit under it | 100% | Grep for `images.unsplash.com` against credits |

## Constraints and trade-offs

- **Not optimizing for atmosphere.** The site loses some warmth. It gains trust, because each image claims something true.
- **Real photos are the bottleneck.** The best images (paper form, research board, MSK before-state) need her material. Until then those sections stay without photos.
- **Unsplash terms.** Only free-license photos, hotlinked from `images.unsplash.com`, credited. Unsplash+ images are excluded (paid, separate license, hosted elsewhere).
- **One photo can be right in one place only.** The leaf is right on Grove and wrong on Home. Reuse across unrelated pages is not allowed.

## Decisions for Hillary

1. Remove the leaf from the Home About row. (Recommended.)
2. Move the leaf to the Grove case study, with the credit, if she wants a photo there.
3. Drop the parchment photo, and send a real or redacted paper form for the MSK before-state instead.
4. Send any research photos with names removed for UX Woman.

## Next

After alignment: build only the approved placements, run contrast and credit checks, and record the rules in the portfolio design system's image guidelines, which are marked "not built yet."
