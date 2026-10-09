# Rubric — Hillary's portfolio

For grading this site. Six dimensions, two scoring rules, five hard gates.

Anchors are written against this project, not against design in general. They
name things that actually happened here, so a grader can check a claim rather
than form an impression. Where an anchor cites a rule it comes from
`.designpowers/house-style/voice-spec.md`, `antipatterns.md`,
`.claude/rules/tokens.md`, `CLAUDE.md` § "Design principles", or
`design-docs/design-system/registry.md`.

**Primary viewport:** 390px and 1440px both count. A desktop-only pass is
incomplete — the recruiter path starts on a phone.

**What the work is trying to earn:** a hiring manager, in a six-second scan,
understanding that Hillary changed a safety-critical system for 21,000+ staff —
and being able to reach the evidence for that from where the claim is made.

---

## Scoring rules

These override any anchor below.

1. **"Looks good" is a 6, not a 9. A 9 survives a senior critique untouched.**
   A page that reads well on first glance has cleared 6. Nine means someone who
   knows this system went looking for the seam and did not find one.

2. **A dimension scores 8 or above only if it was verified by rendering,
   measuring or testing. Never from reading code.**
   Two incidents from this repo worth holding in mind while grading:
   - `design-state.md` records port 3000 as unverified for this CRA source. It
     was in fact serving a different project entirely. **A 200 is not evidence
     you loaded this site.** Confirm the app before trusting the screenshot.
   - Intersection observers, `requestAnimationFrame` and scroll handlers do not
     fire in the automated tab (`reference_browser_verification_limits`). Scroll
     UI must be verified with rect maths, not by watching for a class to appear.
     If you could not verify it, that is a blind spot, not a finding.

---

## The six dimensions

| Dimension | What it asks | Weight |
| --- | --- | --- |
| System fidelity | Does every value trace to a token and every component to the registry | High |
| Coherence | Does it read as one portfolio — including the Spanish half | High |
| Craft | Headlines, spacing, states, the decisions nobody asked for | High |
| UX judgment | Recruiter comprehension, claim truth, and the paths that fail | High |
| Accessibility | Contrast, targets, colour-only meaning, reduced motion | Medium |
| Structure | Every route renders, holds and is reachable by clicking | Low |

Numeric weights for a single score: High 3, Medium 2, Low 1.

---

### 1. System fidelity — High

**Scoring:** whether values are bound rather than typed, and whether the
registry was consulted before a component was written. Not whether it looks
consistent — whether it is.

**4** — Raw hex or raw px in `my-app/src/styles/**` for a colour the palette
already has. A component written without checking
`design-docs/design-system/registry.md` for a sibling. `npm run check:registry`
fails, or the registry is stale and nobody regenerated it.

**6** — Values reference `var(--token)` and components are reused, but the
bindings were never checked, or the check was run before the last edit. The
canonical local failure is the registry one: `DecisionStory`,
`GroveDecisionStory` and `DecisionCard` existed as three components doing one
job before anyone noticed — each individually defensible, the set indefensible.
Looking at one page cannot catch that. Only reading the registry family can.

**9** — Every value resolves through a token path and that was verified. A
colour not in the system was raised rather than approximated with a nearby hex,
per `.claude/rules/tokens.md`. Anything that looks like drift was checked
against `tokens/drift-audit.md` first and not re-flagged. `npm run check:registry`
passes on the current tree. No new component duplicates a registry family.

---

### 2. Coherence — High

**Scoring:** whether the pages were built from one set of decisions, or
assembled over fourteen months and made to match.

**4** — A section pattern that means one thing on Home and another on a case
study. The same action named three ways across the work list. A private lab
carrying a voice register the flagship studies don't.

**6** — Components and spacing are consistent, but the seams show in language
and attribution. Candidates to check, all of which have drifted here before:
English and Spanish telling different versions of the same case
(`src/data/spanishCaseStudies.ts` against the flagship pages); Grove described
as a prototype in one place and something stronger in another, against
voice-spec's rule that it is *always* a functional prototype in Phase 2 of 3;
MSK's separation of Hillary's direct work from later implementation holding on
one page and blurring on another.

**9** — Every page sits on the same editorial scaffold, so chrome never shifts
between routes. One action has one name and one variant everywhere — `Review
Grove`, not `Learn more` beside it. The Spanish path says the same thing as the
English one or explicitly hands off, as the Grove Spanish study does. Where a
page departs from the house pattern, the departure is recorded in
`divergence-ledger.md`, so it reads as a decision rather than an inconsistency.

---

### 3. Craft — High

**Scoring:** the decisions nobody asked for. Whether the small things were
chosen or defaulted.

**4** — A headline wrapping to a stranded word on line two — banned outright in
`CLAUDE.md` § Never. Default spacing where a choice was called for. Motion that
decorates. Repeated rounded cards of equal weight with no evidence priority
(`antipatterns.md` visual tell).

**6** — Spacing comes off the scale, headlines balance, motion exists. But
nothing shows a decision being made: a section that introduces a decision or a
before/after without the artifact it produced; a screenshot gallery with equal
thumbnails and generic captions, so evidence priority is unreadable. Both are
named visual tells.

**9** — The small decisions are visible and each has a reason. `prefers-reduced-motion`
removing animation while the evidence still reads, because a static equivalent
is a stated gate on every motion slice in this repo. A caption that points at
the one thing its visual proves, in 8–24 words, rather than summarising the
project. Fixed-width graphics scaling type down to hold one line instead of
wrapping. A senior reviewer asking "why is this like that?" gets an answer.

**The local trap:** craft is not process disclosure. `"i hate the frame of
intent"` was the response to a checkpoint that added a system name, duplicated
copy, four controls and an expandable method explainer. It announced judgment
instead of delivering it. A page that explains its own intelligence is not
scoring 9 here; it is the failure this dimension exists to catch.

---

### 4. UX judgment — High

**Scoring:** whether the hard parts were designed or avoided. For a portfolio
the hard parts are comprehension and truth.

**4** — A claim with no reachable evidence. A number with no method or scope
attached. A fit claim with no named project, decision or result — a voice-spec
hard ban. A first mobile viewport containing positioning and no result.

**6** — Claims are specific and evidence exists, but the reader has to work for
it: a stat in the hero whose proof is four scrolls into a case study with no
path between them; a research number that states a finding without the method
or the decision it informed; a caption carrying method but not the limitation
that changes how the number reads.

**9** — Every claim names the project, Hillary's contribution, the observable
output, and the status or limitation where material. Numbers carry scope —
`22,937` appears with *scheduled trips affected by eight one-direction
accessibility gaps*, never bare. Attribution survives: MSK separates Hillary's
diagnosis and pitch from later IT/UX implementation, and Mobbin names three
documented apps without implying she designed the source products. Failure paths
are designed: the 404 and a case study reached directly rather than from Home
both recover with an action, not an apology. Nothing asks the recruiter to
choose before seeing proof.

**The dimension's own failure mode here:** on 2026-08-03 five fabricated
mechanisms were found in case-study copy. Plausible, well-written, and not
things that happened. A claim you cannot trace to the résumé or to
`git log -S` is a finding regardless of how good it reads.

---

### 5. Accessibility — Medium

**Scoring:** whether it works for someone who cannot see colour, is at 200%
zoom, or is using a screen reader. Hard gates are pass/fail and sit outside this
score.

**4** — A gate fails. State or evidence status signalled by colour alone. A
control with no accessible name. Motion with no reduced-motion path.

**6** — Gates pass, but status rests on a single channel: an `Observed` /
`Unverified` / `Next gate` label carried by colour with no shape or word beside
it; or motion carrying the meaning of a sequence that stops meaning anything
when motion is off.

**9** — Gates pass *and were measured*. Every status reads on at least two
channels. Accessible names match visible labels. Essential method, limitation,
ownership or status is never only inside a bitmap or video — a named visual tell
in `antipatterns.md`, and the fastest way this portfolio loses its evidence for
a screen-reader user. Reflow holds at 200%. Focus is visible and ordered.
`scripts/axe-primary-audit.cjs` passes on the routes under review.

---

### 6. Structure — Low

**Scoring:** whether it holds up. Low weight because it is table stakes — but a
4 here caps every other dimension, since an unrendered page cannot be graded on
craft.

**4** — A route renders blank or errors. A route that exists in `AppRoutes.tsx`
and is reachable only by typing the URL.

**6** — Holds at 1440 but breaks at 390, or the reverse: a fixed-width plate
that forces horizontal scroll on a phone, chrome that scrolls with the content,
a mockup that shrinks a desktop layout instead of reflowing.

**9** — Renders and holds at 390 and 1440, with the content region absorbing the
difference. Every public route in `AppRoutes.tsx` is reachable by clicking from
another page. Private lab routes such as `/lab/higgsfield-abc` have their
orphan status recorded as deliberate. Tests and the house-style validators
pass.

---

## Hard gates

Pass/fail. **Not scored, and not tradeable against a high score elsewhere.**

| Gate | Threshold | How to check |
| --- | --- | --- |
| **Claim truth** | Zero unverifiable claims | Every number, mechanism and outcome traces to the résumé or to `git log -S`. Five fabricated mechanisms shipped once; this gate exists because of them. |
| **Banned language** | Zero hits | The `@ban-regex` lines in `antipatterns.md`: `seamless`, `leverage`, `elevate`, `cutting-edge`, `game-changing`, `unlock`, plus `functional beta`, `shipped consumer app`, `production product`. Grep the rendered copy and the data files, not just the components. |
| **Contrast** | 4.5:1 body text against its actual background | Measure rendered pixels, not the token's documented value. Check text over tinted evidence cards and translucent surfaces, where the composite differs from the swatch. |
| **Touch targets** | 44px minimum | Measure the hit area, not the visible pill. |
| **No orphaned headline** | Zero | A headline wrapping to a single stranded word on line two, at 390 and at 1440. `CLAUDE.md` § Never states it outright. Render it; `text-wrap: balance` is an instruction, not a guarantee. |

**On the claim-truth gate specifically:** it is the one most often passed by
assertion. Copy that reads as evidence, cites a plausible mechanism and matches
the house voice can still describe something that never happened. Tracing is the
only check that finds it.
