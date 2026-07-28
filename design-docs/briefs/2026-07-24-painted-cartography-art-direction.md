# Design Brief: Painted Cartography Art Direction

## Problem Statement

The portfolio's cartography currently reads as land navigation: graticules, coordinates, route pins, compass, scale bar, and survey labels make the work feel operational and military. Hillary wants cartography to behave like painting and collage—emotional, layered, imperfect, and image-led—while retaining the current portfolio hierarchy and Riso design system.

## Users

The primary audience is recruiters and product-design hiring managers scanning quickly for role, proof, work, and contact. The visual layer must remain decorative for screen readers, preserve stable DOM reading order, support low-vision contrast, avoid motion dependence, and reflow without cropping content at 320–1440px.

## Design Direction

Use painted cartographic collage as the shared visual primitive:

- irregular map fragments instead of a single navigational field;
- photographic memory layered into selected compositions;
- translucent ink blooms, offset print registration, halftone, and hand-drawn marks;
- quiet captions instead of coordinates, scale bars, compass points, and route pins;
- portrait imagery blended into the collage rather than isolated in a polished card.

The reference supplies principles and atmosphere, not a copied composition.

## Constraints

- Preserve the existing Riso semantic palette, typography, navigation, content, and truthful evidence.
- Keep decorative artwork `aria-hidden`.
- Maintain readable contrast through the existing clearing surface.
- Avoid new runtime dependencies and motion-heavy effects.
- Support light mode, dark mode, reduced motion, and responsive crops.

## Existing Design System

- Shared primitive: `my-app/src/components/riso/CartoField.tsx`
- Shared styling: `my-app/src/styles/riso-page.css`
- Existing Riso assets: `my-app/public/riso/`
- Existing taste profile: quiet authority, warm restraint, flagship craft

## Taste Direction

Borrow from the supplied Risograph Cartography reference:

- collage feels assembled and painted rather than measured;
- image fragments overlap, interrupt, and partially erase one another;
- organic photography and hand-drawn contour language soften technical mapping;
- imperfect edges and ink density create authorship.

Avoid:

- military land-navigation symbolism;
- GIS/dashboard precision;
- a full-screen map with instrumentation on top;
- decorative noise that compromises scan speed.

## Success Criteria

- The first impression is “painted cartographic collage,” not “navigation map.”
- No compass, scale bar, coordinate ticks, registration targets, dashed route, or pin system dominates the hero.
- Homepage portrait and cartography feel like one composition.
- Text hierarchy and interactive paths remain unchanged and accessible.
- Representative pages render without horizontal overflow at 320, 390, 900, and 1440px.

## Out of Scope

- Rewriting portfolio content or case-study evidence.
- Changing navigation structure.
- Copying the reference artwork or its exact layout.
- Adding generative animation or a new graphics dependency.

## Matrix Check

Applied dimensions:

- **Enterprise Design Systems & Prototyping:** preserve the shared `CartoField` contract, semantic palette, responsive behavior, accessible clearing, and prototype-to-production continuity.
- **UX Research / Strategy:** solve the stated perception problem—land navigation versus painted collage—without expanding scope into unrelated page redesign.
- **Agentic UX / Trust and accessibility:** keep decorative imagery hidden from assistive technology and protect critical navigation, contrast, motion preferences, and recruiter flows.
- **Representative evaluation:** render the shared primitive across Home, About, Grove, MSK, and a tailored role page at 320, 390, 900, and 1440px; run the existing accessibility/interaction suite and production build.

Evidence status:

- User-provided visual reference: **Verified** as a supplied artifact.
- Canonical evaluation matrix: **Verified** as a supplied local document.
- Transfer of reference qualities into implementation criteria: **Practitioner synthesis**.

Hard gates:

- Critical flows remain accessible.
- No copied source artwork or unsupported attribution claim.
- Shared-system changes receive representative responsive and regression coverage.
