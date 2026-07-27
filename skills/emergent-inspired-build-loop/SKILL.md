---
name: emergent-inspired-build-loop
description: Orchestrate an approved product or design direction into small, working, testable implementation slices using an Emergent-inspired local workflow. Use when building or revising a web app, mobile experience, prototype, portfolio, landing page, dashboard, or full-stack feature through Designpowers; when the user asks for an Emergent-like, vibe-coding, prompt-to-app, multi-agent, preview-first, or incremental build process; or when a long design build needs scoped context packets, separate feature/bug/visual queues, visible progress, screenshot feedback, recovery checkpoints, and a pre-deployment health gate.
---

# Emergent-Inspired Build Loop

Use Emergent's publicly documented workflow patterns without claiming access to its private prompts, agents, or build engine. Keep Designpowers' stronger discovery, accessibility, neurodiversity, design-system, critique, and verification requirements.

Read [references/emergent-public-patterns.md](references/emergent-public-patterns.md) before attributing any behavior to Emergent. Read [references/artifact-templates.md](references/artifact-templates.md) when creating the build contract, context packet, change request, or health report.

## Hard Gates

- Start only from an approved brief or design direction.
- Do not mix feature development, bug repair, and visual refinement in one build slice.
- Do not begin implementation until the user has approved the build contract in Direct mode.
- Keep every worker's context relevant, sufficient, and bounded.
- Preserve a recoverable state before material changes. Record the existing commit SHA or diff; do not create a commit unless authorized.
- Preview and test before any deployment recommendation.
- Never deploy, replace production, migrate live data, or expose secrets without explicit user authorization.
- Treat accessibility failures, missing recovery, secret exposure, destructive behavior, and absent representative tests as blockers.

## 1. Create the Build Contract

Create `docs/designpowers/builds/YYYY-MM-DD-<project>-build-contract.md`.

Include:

- problem, users, and desired outcome;
- approved design direction and design-system source;
- 2–3 essential features for the current release;
- primary task and one or two screens that matter most;
- input, output, data, authentication, and integration needs;
- responsive locks and supported input methods;
- accessibility and neuroinclusive requirements;
- exclusions and “keep unchanged” constraints;
- success evidence;
- source status: Verified, Index-only, or Practitioner synthesis;
- Matrix check with applicable dimensions and hard gates.

Do not turn a vague vibe into an implementation contract. Ask only questions whose answers materially change architecture, scope, risk, or experience.

## 2. Choose a Local Build Profile

| Profile | Use for | Required rigor |
|---|---|---|
| **Prototype** | Visual or interaction validation | Real UI, representative content, basic task path; no production claims |
| **Standard** | Everyday portfolio or product feature | Complete states, responsive checks, automated tests, accessibility review |
| **Deep** | Complex logic, integrations, sensitive data, or high-consequence flows | Threat/recovery analysis, expanded tests, explicit checkpoints, no silent assumptions |
| **Mobile** | Touch-first or cross-platform experiences | Device constraints, touch/gesture alternatives, offline/interruption behavior |

Record the profile, reason, time/token budget if known, and stop conditions. Prefer the smallest profile that can produce credible evidence.

## 3. Slice the Work

Create one functional slice at a time. Each slice must produce something visible or testable.

Examples:

- one primary screen with real content and responsive structure;
- one end-to-end task path including loading, empty, error, and success;
- one integration with a test fixture and failure state.

Maintain three queues:

- **Feature queue** — new behavior or capability.
- **Bug queue** — behavior that differs from an accepted expectation.
- **Visual queue** — styling, hierarchy, spacing, motion, or responsive refinement.

Select exactly one queue for the current slice. Finish or consciously stop it before switching.

## 4. Create a Focused Context Packet

Before handing work to a Designpowers agent, provide only:

- objective and selected queue;
- relevant brief and contract excerpts;
- relevant design-state decisions;
- exact files or surfaces in scope;
- existing tokens, components, and copy;
- invariants and “keep unchanged” constraints;
- acceptance criteria and verification commands;
- known risks and unresolved assumptions;
- stop condition and return format.

Exclude unrelated history, stale options, and prior experiments that no longer constrain the work. The complete codebase remains available for lookup; the packet defines what deserves active attention.

## 5. Run the Slice

Use the existing Designpowers agents rather than inventing Emergent agent names:

1. `design-strategist` resolves flow-level ambiguity.
2. `design-lead`, `content-writer`, and `motion-designer` provide approved specifications when relevant.
3. `design-builder` implements the selected slice.
4. `taste-feedback` handles visual checkpoints.
5. Reviewers evaluate the rendered result.

During the build, report meaningful evidence:

- current phase and selected queue;
- files changed;
- material decision or deviation;
- commands and tests run;
- blocker, recovery action, or remaining uncertainty;
- preview screenshot when a visible checkpoint exists.

Do not interrupt a running slice with unrelated instructions. Queue new requests for the next slice unless they resolve a blocker or prevent harm.

## 6. Process Changes Precisely

For visual changes, use:

```markdown
**Element:** [What]
**Location:** [Where]
**Current:** [Observed state]
**Target:** [Desired state]
**Scope:** [Exact pages/components/breakpoints]
**Preserve:** [What must not change]
**Reason:** [Optional rationale]
**Evidence:** [Screenshot or rendered observation]
**Verification:** [How the change will be checked]
```

For bugs, record expected behavior, observed behavior, reproduction steps, error/log evidence, scope, and regression test.

For features, update the contract first if the feature changes scope, architecture, data, risk, or the primary journey.

## 7. Preview and Review

After every slice:

1. Run the relevant build and tests.
2. Start or inspect the real rendered experience.
3. Capture screenshots at required responsive locks.
4. Walk the primary task, error path, and interruption/resumption path.
5. In Direct mode, show the preview and wait for user direction before the next slice.
6. Record feedback in the correct queue.

A preview is evidence of appearance, not proof of readiness.

## 8. Run the Local Health Gate

Before recommending deployment, verify:

- build and automated tests;
- critical task success;
- accessibility, keyboard, zoom, and reduced motion;
- responsive behavior;
- loading, empty, error, success, and recovery states;
- data persistence and safe migrations when applicable;
- dependencies and environment configuration;
- no hardcoded secrets or production-only assumptions;
- performance and resource risks;
- rollback or recovery path;
- reviewer and design-debt status.

Return **Ready**, **Conditional**, or **Blocked**. Critical failures block deployment.

## 9. Close the Loop

Update `design-state.md` with:

- contract and build profile;
- current queue and completed slices;
- decisions and deviations;
- preview evidence;
- health-gate result;
- remaining debt and next slice.

Include:

```markdown
**Matrix check**
- Applied dimensions: [dimensions]
- Hard gates: [pass/fail/N/A]
- Evidence status: [Verified/Index-only/Practitioner synthesis]
- Validation still required: [items]
```

## Integration

- **Follows:** `design-discovery`, `design-strategy`, and `writing-design-plans`
- **Orchestrates:** existing Designpowers agents and skills; it does not replace them
- **Uses:** `design-system-alignment`, `laws-of-ux`, `taste-feedback`, `designpowers-critique`, `neurodiversity-review`, and `verification-before-shipping`
- **State:** `design-state.md`
- **Deployment:** recommend only; require explicit authorization for production changes
