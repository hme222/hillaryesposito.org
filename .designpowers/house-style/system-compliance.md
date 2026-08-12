# System Compliance

Canonical source: portfolio `design-state.md`, `portfolio-overrides/`, `my-app/src/styles/riso.css`, `my-app/src/styles/riso-page.css`, and generated registry
Registry fingerprint: 00c669a33605da70ef0ffa10af96a7dabb1b6ac71b11ec721f4aa1b8492f920d
Allowed token namespaces: existing `--rp-*`, `--paper-*`, `--ink-*`, `--coral`, and curated `--rp-accent-l` / `--rp-accent-d`
Allowed components/variants: registry at `docs/design-system/registry.md`; specifically `CuratedRolePage`, `CartoField`, `RisoDefs`, React Router `Link`, existing `rp-hero`, `rp-metagrid`, `rp-outcomes`, `rp-numlist`, `rp-split`, `rp-note`, and `rp-close` compositions
Composition rules: Keep one H1, existing chapter targets, current section classes, semantic lists, descriptive links, noindex behavior, and existing light/dark accent contract. Optional fields may change order and action labels for one page without changing global defaults. Do not add a local component, style file, dependency, token, or Supabase-branded template.
Documented gaps for the public curated-page system: None. The existing renderer contains every needed primitive; optional data-controlled composition closes the ordering/action gap.
Escalation owner: Hillary Esposito

## Higgsfield A/B/C private-lab proposal

Valid move: **Propose**, scoped to the unlinked lab only. Existing Riso tokens, buttons, rules, type, focus, route boundary, and authentic MSK media are reused. The shared-stage comparison pattern and spatial material control are experimental compositions because no canonical component fits without forcing a card, carousel, or case-study mechanism.

Locks preserved: public routes and navigation, homepage content and styling, semantic tokens, exact evidence, attribution, focus visibility, reduced motion, and content truth.

Proposal boundary: one lazy lab page and one root-scoped lab stylesheet. No new global tokens, dependency, registry graduation, public link, or component-system claim. Rollback is deletion of the lazy route, page, stylesheet, and focused tests.

Scoped exception to the earlier curated-page restriction: the approved lab may add its isolated page component and stylesheet because it is not a Supabase curated-page change. Those files may consume canonical tokens but cannot modify or graduate them.
