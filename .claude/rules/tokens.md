---
paths:
  - "my-app/src/styles/**"
---

# Token rules

- Use the color values that exist. `tokens/tokens.json` is the canonical
  export of App.css's `:root` palette (light + dark) — reference
  `var(--token-name)`, never a raw hex. If a color you need genuinely isn't
  in the system, say so explicitly and ask before inventing one; don't
  approximate with a nearby hex.
- Known drift and deliberate exclusions are recorded in `tokens/drift-audit.md`
  — read it before "fixing" anything that looks like a raw hex bypassing a
  token. Some are intentional (fixed-color components, a separate demo
  palette, Riso illustration one-offs) and documented as such; don't
  re-flag them.
