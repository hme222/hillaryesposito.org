# Emergent Public Pattern Map

This file records only publicly documented Emergent behavior retrieved from official Emergent pages. It does not describe private system prompts, proprietary model instructions, or unpublished implementation details.

_Retrieved: 2026-07-27_

## Verified sources

### First app workflow

Source: [Your First App](https://help.emergent.sh/first-app) — **Verified**

Public patterns:

- frame the problem, audience, essential features, and design direction;
- ask setup questions before building;
- show live progress;
- preview and test the first version;
- iterate with specific changes;
- report errors with expected behavior, observed behavior, and error evidence;
- start small and add integrations only when they serve the product.

### Prompting and incremental work

Source: [Prompting — Basics](https://help.emergent.sh/prompting-basics) — **Verified**

Public patterns:

- provide business context and user needs;
- start with a small essential feature set;
- build incrementally;
- test before expanding;
- keep bug/UI fixes separate from feature work;
- use clear examples and constraints;
- preserve changes in version control and use rollback when needed.

### Focused context and specialized agents

Source: [Context Limits](https://help.emergent.sh/context-limits) — **Verified**

Public patterns:

- maintain structured project memory;
- give specialized agents filtered, task-specific context;
- return test results or artifacts to the coordinating agent;
- compress or fork long sessions while preserving essential decisions and the current codebase.

Designpowers adaptation:

- use focused context packets;
- preserve `design-state.md` as the shared decision record;
- do not copy Emergent's agent names or context-window claims.

### Design refinement

Source: [Fixing Design Inconsistencies](https://help.emergent.sh/fixing-design-inconsistencies) — **Verified**

Public patterns:

- use screenshot evidence;
- identify the exact element and location;
- describe current and desired states;
- specify scope and breakpoints;
- use exact values when known;
- say what must remain unchanged.

### Preview and health checks

Sources:

- [Deployment on Emergent](https://help.emergent.sh/deployment-on-emergent) — **Verified**
- [Pre-Deployment Health Check](https://help.emergent.sh/pre-deployment-health-check) — **Verified**

Public patterns:

- keep preview and production separate;
- interact with the preview before deployment;
- run an automated readiness review;
- classify results as pass, warning, or blocker;
- fix critical issues and rerun the check before deployment.

### Emergent MCP

Source: [Emergent as an MCP](https://help.emergent.sh/emergent-as-mcp) — **Verified**

Emergent publicly offers an MCP connector for building and managing apps from other AI environments. This local skill does not imply that connector is installed or callable.

## Practitioner synthesis

The following are Designpowers adaptations, not claims about Emergent internals:

- use `Prototype`, `Standard`, `Deep`, and `Mobile` as local build profiles;
- maintain separate feature, bug, and visual queues;
- use the existing Designpowers reviewer set;
- make accessibility, neuroinclusive UX, laws-of-UX evidence, and user confirmation hard gates;
- require a local health report before any deployment recommendation.

## Prohibited claims

Do not say:

- this skill uses Emergent's private agents or prompts;
- outputs are production-ready because they passed a preview;
- automated tests replace usability or accessibility validation;
- an Emergent MCP connection exists unless the tool is actually callable.
