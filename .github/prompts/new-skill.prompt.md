description: Create a new Copilot Kit skill with proper structure and frontmatter
agent: Plan

# Create New Skill

Generate a new skill for this Copilot Kit framework.

## Required Input

- **Skill name** (kebab-case, e.g., `docker-patterns`)
- **Domain/purpose** description
- **Key knowledge areas** the skill should cover

## Structure to Generate

```
.github/skills/{skill-name}/
├── SKILL.md          # Required: metadata + instructions
├── references/       # Optional: documentation, examples
└── scripts/          # Optional: automation scripts
```

## SKILL.md Template

```markdown
---
name: { skill-name }
description:
  {
    Clear description of what this skill does and when it should trigger. Include keywords that match user requests.,
  }
---

# {Skill Title}

## When to Use

[Trigger conditions]

## Core Principles

[Key decision-making frameworks — teach thinking, not commands]

## Patterns

[Common patterns with concise examples]

## Anti-Patterns

[What to avoid and why]

## Decision Matrix

[When to choose what approach]
```

## Rules

- **Concise** — Only include knowledge the model doesn't already have
- **Teach thinking** — Principles over prescriptions, decisions over commands
- **Progressive** — SKILL.md is the entry point; details go in sub-files
- **Keyword-rich description** — Ensure the `description` field has good trigger keywords

Reference: `.github/skills/skill-creator/SKILL.md`, `.github/skills/doc.md`
