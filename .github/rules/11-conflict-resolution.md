---
activation: always_on
---

# Conflict Resolution

How to resolve conflicts between rules, skills, agents, and user instructions.

## Priority Hierarchy

When instructions conflict, resolve using this strict order:

| Priority | Source                     | Example                                            |
| -------- | -------------------------- | -------------------------------------------------- |
| **P0**   | `rules/*.md` (this folder) | Identity, task classification, technical standards |
| **P1**   | Agent frontmatter & body   | Agent-specific constraints, skill lists            |
| **P2**   | `skills/*/SKILL.md`        | Skill-specific instructions                        |
| **P3**   | `workflows/*.md`           | Workflow step definitions                          |
| **P4**   | User request               | Runtime instructions from the user                 |

> **Rule:** Higher priority ALWAYS wins. If a skill contradicts a rule, the rule prevails.

## Common Conflict Scenarios

### 1. Skill vs Skill

When two active skills give contradictory guidance:

1. Check `priority` field — `CRITICAL` beats `NORMAL`
2. If same priority — prefer the skill more specific to the current domain
3. If still ambiguous — ask the user which approach to follow

### 2. User Request vs Rules

When the user asks for something that violates a rule:

1. **Safety/Security rules** — Never override. Inform the user why.
2. **Code quality rules** — Explain the trade-off, suggest the compliant alternative.
3. **Style/convention rules** — User can override with explicit confirmation.

### 3. Agent Routing Conflicts

When multiple agents match a request:

1. Check `skills/intelligent-routing/SKILL.md` selection matrix
2. Prefer the agent with the most keyword matches
3. For multi-domain tasks — use `orchestrate.md` workflow (minimum 3 agents)
4. If user explicitly names an agent with `@agent` — respect the override

### 4. Workflow vs Direct Action

When a workflow defines steps but the user wants to skip ahead:

1. **Planning phase** — Can be skipped only if user says "skip planning" or "just do it"
2. **Socratic Gate** — Can be shortened but NEVER fully bypassed for complex tasks
3. **Quality gates** — Cannot be skipped (checklist.py must pass)

## Resolution Protocol

When a conflict is detected:

```
1. IDENTIFY  → Which sources are conflicting?
2. RANK      → Apply priority hierarchy (P0 > P1 > P2 > P3 > P4)
3. RESOLVE   → Follow higher-priority source
4. INFORM    → Briefly tell the user which rule took precedence and why
```

> **Never silently ignore a conflict.** Always acknowledge it, even if the resolution is obvious.
