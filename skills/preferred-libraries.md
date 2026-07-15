# Preferred Frontend Libraries

When a design task moves into implementation, prefer these libraries for the matching job instead of writing the behavior from scratch. Install the library only when it is not already present and the task is large enough to justify the dependency.

## Library Map

| Need | Preferred library |
|------|-------------------|
| Animations, transitions, gestures | Motion, imported from `motion/react` |
| Smooth, premium scroll feel | Lenis |
| Scroll-triggered or timeline animation | GSAP with ScrollTrigger |
| 3D scenes | React Three Fiber with Drei helpers |
| Charts and data visualization | Recharts; use Visx or Nivo for custom work |
| Icons | Lucide |
| Command palette | cmdk |
| Toasts and notifications | Sonner |
| Drag and drop | dnd-kit |
| Sortable, filterable tables | TanStack Table |
| Dates | date-fns |
| Confetti or celebratory moments | canvas-confetti |

## Design system: Astryx

This repo has the Astryx design system available (`@astryxdesign/cli` installed).
Before using it, read [`design-system-alignment/astryx-integration.md`](design-system-alignment/astryx-integration.md)
— the panel-derived Adopt / Adapt / Skip posture. Short version: **Astryx is
infrastructure, not aesthetic** (primitives, Dialog, form a11y, AppShell skip-link,
spacing/motion tokens). Hand-author all color/type/radius tokens; keep the
WorkflowKnot hero, fluid `clamp()` type, matcha-honey dark mode, i18n, and the
JumpNav scroll-spy custom. **Gate:** `@astryxdesign/core` needs React ≥19 +
StyleX; the app is React 18.3.1 + CRA, so adopting runtime components requires a
toolchain migration first.

## Guardrails

- Do not add a library when the platform already does the job well. A simple fade, hover, or one-off transform belongs in native CSS.
- Match the tool to the size of the job. A one-off transition does not justify a 30-50KB animation runtime.
- Prefer libraries that are actively maintained and widely used.
- Use the current package and API syntax. If unsure, check the library docs before writing code.
- For performance, animate only `transform`, `opacity`, and `filter`. Avoid animating `width`, `height`, or `margin`.
- Respect `prefers-reduced-motion` in every animation.
- Before installing anything new, tell the user which library you are using and why.

