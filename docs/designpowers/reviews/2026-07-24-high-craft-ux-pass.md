# High-Craft Visual and UX Pass

Date: 2026-07-24  
Scope: Riso Home, About, Grove, MSK, Mobbin, tailored role pages, global navigation, Spanish mode, recruiter path, metadata, and responsive behavior  
Reviewed against: the approved remaining-portfolio brief, quiet-authority taste profile, WCAG 2.2 AA guardrails, and the canonical evaluation matrix

## Verdict

Ready for owner review. No deployment was performed.

The Riso/cartography direction is now both expressive and dependable. The pass preserved its authored texture, warm restraint, and evidence-led storytelling while repairing the quiet UX regressions introduced when the new Riso Home replaced the previous homepage.

## Findings and fixes

| Priority | Finding | Fix |
|---|---|---|
| Major | Global Work and Contact controls targeted section IDs that no longer existed on the active homepage | Restored the `home`, `projects`, `about`, and `contact` section contract and verified same-page navigation |
| Major | Footer and case-study links using `/?scrollTo=…` were not handled by Riso Home | Added deep-link handling, reduced-motion-safe scrolling, URL cleanup, and a second positioning pass for late layout changes |
| Major | The new homepage remained English when the global shell switched to Spanish | Added complete Riso Home translations and connected the page to the shared language state |
| Major | The mobile homepage no longer exposed the fast recruiter path | Restored Recruiter View as a restrained 44px tertiary action, with `EN` disclosure in Spanish mode |
| Moderate | Tailored role pages had long evidence sections but no chapter wayfinding | Added Fit, Proof, Work, and Experience shortcuts with verified targets |
| Moderate | Flagship hero copy and CTA touched visually on Mobbin and shared the same risk across studies | Added a shared 16px transition from introductory copy to the primary action |
| Minor | Browser-title code overwrote the canonical public positioning | Aligned the default page title with “Product Designer for products people trust” |
| Minor | About’s opening controls and hero carried excess top rhythm | Tightened the Riso-scoped opening spacing and made the return control explicitly legible within the semantic palette |

## Craft assessment

- The homepage remains the strongest expressive surface: cartographic field, dark clearing, coral instrumentation, and portrait create a memorable first frame without turning the proof into decoration.
- Grove, MSK, and Mobbin read as distinct issues of one publication. Shared pacing and navigation create coherence; project-specific artifacts keep them from becoming a template.
- The system’s strongest choice is restraint. No additional texture, animation, or card layer was added in this pass.
- Typography continues to carry the hierarchy. The repaired action spacing and tighter opening rhythm make the interface feel composed rather than merely styled.
- Tailored pages now inherit the same long-form orientation contract as About and the flagship studies.

## UX and accessibility assessment

- Home navigation works from the mobile menu and lands with the selected-work heading below the persistent navigation.
- Cross-route `scrollTo` entry lands correctly and cleans the query parameter.
- Spanish mode updates `<html lang>`, homepage content, project descriptions, contact framing, and the recruiter-language disclosure.
- The recruiter shortcut remains visible on mobile without competing with the two primary hero actions.
- All added chapter shortcuts point to real sections.
- Reduced-motion preference is respected by the homepage contact and deep-link behavior.
- No truthful evidence, attribution qualifier, project status, or ownership claim was changed.

## Responsive verification

Rendered checks covered:

- Widths: 320px, 390px, 900px, and 1440px
- Routes: Home, About, Grove, MSK, Mobbin, and a Meta/Instagram tailored role page
- Result: 24/24 route-width combinations had `scrollWidth === innerWidth`
- Headline bounds remained within the viewport at every reviewed width
- Mobbin’s mobile hero now has a measured 16px copy-to-CTA gap
- The added tailored-page chapter strip fits at 390px and all four targets resolve

## Automated verification

- Accessibility, interaction, and anchor suite: 16/16 passing
- Production build: compiled successfully
- Build warning: the local Browserslist database is six months old; this is maintenance, not a release blocker

## Matrix check

Applied:

- Enterprise Design Systems & Prototyping
- UX Research / Strategy
- Agentic UX / Trust and accessibility
- Representative regression evaluation

Hard gates:

- Accessible critical flows: passed for the reviewed implementation
- User control and recovery: passed for navigation, deep links, language switching, recruiter access, and long-form wayfinding
- Provenance and attribution: preserved
- Representative coverage: passed across six routes, four widths, automated structure, interaction behavior, and production build

