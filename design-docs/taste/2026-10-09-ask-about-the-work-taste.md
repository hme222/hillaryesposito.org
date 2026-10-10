# Taste Profile: Ask about the work — the paper-map bird

Calibrated with Hillary 2026-10-09. Inherits the portfolio taste profile
(~/.designpowers/taste-profile.md: quiet authority, warm restraint, one Gen Z
flair moment per project) and the house direction lock (Riso tokens only).

## Existing Design System
Riso tokens and compositions (paper, ink, coral, green; light accent #3d6b3f,
dark accent #7cb069), restrained registration, texture via opacity rather
than new colours, radius vocabulary 4/6/10px. `RisoDefs` already provides the
print-texture filters used across the site.

### Where this evolves the system
One character, the project's single flair moment. It must look printed on the
same press as everything else, not dropped in from another product.

## Emotional Target
A small travelling companion on the map of Hillary's career: warm, curious,
quiet. It notices you, it never needs you. Present in the dialog, absent from
the page until someone asks.

## Aesthetic Principles
1. **Printed, not rendered** — two inks (green and coral) with slight
   misregistration and grain; fold lines from a paper map; no gradients,
   glows, or 3D.
   _Test: does it look like it came off the same Riso press as the site?_
2. **The route is the detail** — a thin coral route line runs across the
   wings like a path on a folded map; that one line ties it to the journey.
   _Test: remove the route — does it become a generic bird? Then the route
   is doing its job._
3. **Small and still** — it rests most of the time; motion is a single,
   slow gesture tied to a state change, never a loop for attention.
   _Test: with the dialog open and idle for 10 seconds, nothing moves._
4. **Never the messenger** — the bird does not speak, carry speech bubbles,
   or deliver answers. Text carries every meaning; the bird only reacts.
   _Test: hide the bird — is any information lost? It must not be._

## Quality Level
Flagship (inherited). Hand-drawn quality shapes, deliberate fold geometry,
consistent at 24px (nav) and ~80px (dialog).

## References
| Reference | Borrow | Avoid |
|---|---|---|
| The site's own Riso cartography | Ink palette, registration offset, grain, map-fold language | Adding a new colour |
| Origami / folded paper maps | Flat folded planes; crease lines as structure | Complex origami detail that blurs at 24px |
| Designpowers welcome bird (coincidental echo) | Small, simple bird silhouette | Treating it as a brand mark |

## Anti-References
| Anti-reference | Why it's wrong for us |
|---|---|
| Duolingo owl energy (Hillary) | Loud personality, bouncing for attention, guilt and nagging, constant animation |
| (implied by strategy) AI sparkle / glowing orb | Announces "AI inside" — the feature must not explain its own intelligence |

## States
| State | Bird | Text carries |
|---|---|---|
| Nav entry | 24px static bird beside the word "Ask" | "Ask" |
| Idle (dialog open) | Perched, wings folded | Starter questions + input label |
| Thinking | One slow head-tilt while the answer is fetched (≤600ms per gesture, stops when done) | "Finding the passage…" in the live region |
| Answered | Settles back to idle; no celebration | The answer + sources |
| Not covered | Tucks its head, one wing gestures toward the links below | "That isn't covered in the portfolio" + related links + email |
| Error / AI unavailable | Same as idle | Retrieved passages shown; no apology theatre |

## Craft Standards
- Inks: green and coral from existing tokens only; ink-on-paper, both themes (dark mode uses the dark accent values).
- Registration: coral layer offset 1–1.5px from green; grain via `RisoDefs`.
- Shape: flat folded planes, 2–3 visible creases, one coral route line across the wings, single dot eye.
- Size: 24px in the nav (simplified: silhouette + route line), ~80px in the dialog.
- Motion: one gesture per state change, ease-out, ≤600ms; no idle loops; `prefers-reduced-motion` → static pose per state, instant swaps.
- Accessibility: decorative (`aria-hidden`); never the only carrier of state; any meaningful graphic parts ≥3:1 against paper in both themes.

## Personality
A paper bird that has travelled the same map. Wears ink and creases. Says
nothing; tilts its head when you ask something, points the way when the map
runs out.

## Open question
Illustration source: a hand-drawn SVG built to these standards, or a
real/generated Riso print traced to SVG. Earlier Riso work found procedural
faking reads as fake — the bird needs a real drawing pass, reviewed by Hillary
at both sizes before build.

## Final art (2026-10-09, chosen by Hillary)
Style revised to match the Weekend Dispatch train (Hillary: "make it the same
style as the train"): a cut-paper collage — cream paper cut-out with clean
scissor edges, thin coral and blue marker linework, flat charcoal eye, beak
and legs — rather than the two-ink green/coral print first proposed.

- Generated on Higgsfield (Nano Banana 2) from a still of
  `my-app/public/assets/video/weekend-journal-riso-train-v1.mp4`; explorations
  A/B/C → A with a second wing (C) → idle pose → "not covered" pose generated
  from the idle bird for consistency; backgrounds removed on Higgsfield.
  ~22 credits total.
- Masters and explorations: `design-docs/media/ask-bird/`.
- Dialog images (shared canvas, feet aligned): `my-app/public/assets/ask/bird-idle@{160,320}.webp`,
  `bird-not-covered@{160,320}.webp`. Kept as raster on purpose — tracing to SVG
  would flatten the paper texture (procedural-faking risk).
- Thinking state: the idle image tilted ~6° once with CSS; no tilt under
  reduced motion. No separate artwork.
- Nav (24px): `design-docs/media/ask-bird/bird-icon.svg` — simplified line
  drawing of the idle pose (ink outline via currentColor, paper fill, coral
  route via var(--coral), dot eye); reads in both themes. Eye/wing to refine
  in build review.
- Dark theme: add a soft paper drop shadow in CSS (charcoal legs vanish on
  near-black; the bird is decorative so nothing is lost).

## Amendment (2026-10-10): the nav entry becomes a standalone bird

Owner direction, Hillary 2026-10-10: "standalone, kinda moving" - option 3,
"travels the route." The nav item is no longer the text "Ask" with a small
bird riding beside it; it's the bird itself, perched on a short route line,
with no visible text label in steady state. This evolves two of the
Aesthetic Principles above rather than replacing them:

- **Small and still** still holds as the resting default - the bird does not
  idle-animate, loop, or breathe. What changes is that a page change now
  earns one short hop (≤450ms, ease-out, once) along the route line, and
  hover/focus earns a small head-tilt (≤250ms) - both are still single
  gestures tied to a real state change, not attention-seeking loops. The "10
  seconds idle, nothing moves" test still passes with the dialog closed and
  the nav bird at rest.
- **Never the messenger** still holds - the bird carries no text of its own
  in its resting or moving states. The one exception, scoped tightly: a
  first-visit-only "Ask" / "Preguntar" label (decorative, `aria-hidden`,
  duplicate of the button's own accessible name) that fades in once, fades
  out after ~6 seconds or the moment the dialog first opens, and then never
  shows again (`localStorage` flag). It exists to teach a first-time visitor
  what the standalone icon does, once - it is not the bird speaking, and it
  never returns.

Implementation: `src/components/ask/AskBirdNav.tsx` (desktop + mobile top
bar); the plain-text "Ask about the work" item from the original nav design
survives unchanged inside the mobile hamburger menu, where list items are
still text. See `design-docs/strategy/2026-10-09-ask-about-the-work-strategy.md`
for the "tool, not a trick" principle this stays inside: still no sparkle,
no persona, no simulated typing - just a bird finding its way across the
same map, a little more visibly than before.
