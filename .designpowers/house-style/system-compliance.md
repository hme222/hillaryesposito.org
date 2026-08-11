# System Compliance

Canonical source: portfolio `design-state.md`, `portfolio-overrides/`, `my-app/src/styles/riso.css`, `my-app/src/styles/riso-page.css`, and generated registry
Registry fingerprint: 00c669a33605da70ef0ffa10af96a7dabb1b6ac71b11ec721f4aa1b8492f920d
Allowed token namespaces: existing `--rp-*`, `--paper-*`, `--ink-*`, `--coral`, and curated `--rp-accent-l` / `--rp-accent-d`
Allowed components/variants: registry at `docs/design-system/registry.md`; specifically `CuratedRolePage`, `CartoField`, `RisoDefs`, React Router `Link`, existing `rp-hero`, `rp-metagrid`, `rp-outcomes`, `rp-numlist`, `rp-split`, `rp-note`, and `rp-close` compositions
Composition rules: Keep one H1, existing chapter targets, current section classes, semantic lists, descriptive links, noindex behavior, and existing light/dark accent contract. Optional fields may change order and action labels for one page without changing global defaults. Do not add a local component, style file, dependency, token, or Supabase-branded template.
Documented gaps: None. The existing renderer contains every needed primitive; optional data-controlled composition closes the ordering/action gap.
Escalation owner: Hillary Esposito
