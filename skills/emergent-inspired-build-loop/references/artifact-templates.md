# Build Loop Artifact Templates

## Build contract

```markdown
# Build Contract: [Project]

**Date:** [YYYY-MM-DD]
**Profile:** [Prototype / Standard / Deep / Mobile]
**Selected queue:** [Feature / Bug / Visual]

## Outcome
- Problem:
- Users:
- Primary task:
- Success evidence:

## Current Release
- Essential feature 1:
- Essential feature 2:
- Essential feature 3:
- Key screens:

## Experience Direction
- Approved strategy:
- Design system:
- Taste direction:
- Responsive locks:
- Input modes:

## Technical Boundaries
- Inputs and outputs:
- Data and persistence:
- Authentication:
- Integrations:
- Existing architecture:

## Inclusive Requirements
- Accessibility:
- Cognitive and neuroinclusive UX:
- Motion and adaptation:

## Scope Control
- In scope:
- Out of scope:
- Preserve unchanged:

## Recovery
- Existing commit SHA:
- Dirty-worktree notes:
- Rollback approach:

## Matrix Check
- Applied dimensions:
- Hard gates:
- Evidence status:
- Validation required:
```

## Focused context packet

```markdown
# Context Packet: [Slice]

**Objective:**
**Queue:**
**Files/surfaces:**
**Relevant decisions:**
**Tokens/components/copy to reuse:**
**Invariants and preserve list:**
**Acceptance criteria:**
**Verification commands:**
**Known risks:**
**Open assumptions:**
**Stop condition:**
**Return:** changed files, decisions, deviations, tests, screenshot, remaining risks
```

## Visual change request

```markdown
**Element:**
**Location:**
**Current:**
**Target:**
**Scope:**
**Preserve:**
**Reason:**
**Evidence:**
**Verification:**
```

## Bug request

```markdown
**Task:**
**Expected:**
**Observed:**
**Reproduction:**
**Error/log evidence:**
**Scope:**
**Preserve:**
**Regression test:**
```

## Health report

```markdown
# Local Build Health Report: [Project]

**Build:** [Pass/Fail]
**Automated tests:** [Pass/Fail]
**Primary task:** [Pass/Fail]
**Error and recovery paths:** [Pass/Fail]
**Accessibility:** [Pass/Fail]
**Responsive locks:** [Pass/Fail]
**Data persistence/migrations:** [Pass/Fail/N/A]
**Dependencies/configuration:** [Pass/Fail]
**Secrets:** [Pass/Fail]
**Performance/resource risks:** [Pass/Warning/Fail]
**Rollback path:** [Verified/Missing]
**Reviewer status:** [Pass/Conditional/Fail]
**Design debt:** [Summary]

## Verdict
[Ready / Conditional / Blocked]

## Matrix Check
- Applied dimensions:
- Failed hard gates:
- Evidence status:
- Validation still required:
```
