# CODEBASE.md — File Dependency & Impact Map

> **Load policy:** Check at **L1+** before multi-file edits. At L0 (single-file, low blast), skip.
> **Runtime role:** Dependency tracing — tells you which files to update when a source file changes.

---

## How to Use This File

1. Find the file you are about to modify in the tables below.
2. Check the **Dependents** column — all listed files may need updating.
3. Check the **Section Recompile** column — if a rules or skill file changes, those compiled sections are dirty.

---

## Dependency Graph

```
copilot-instructions.md (compiled runtime)
 └── rules/*.md                       (P0 — verbatim extraction)
      ├── copilot.instructions.md     (master protocol, §1–§10)
      ├── 02-task-classification.md   → §1 request classifier
      ├── 07-technical-standards.md   → §6 universal rules
      ├── 09-checklist.md             → §7 quality gates
      └── 11-conflict-resolution.md   → §8 decision framework
 └── prompts/*.prompt.md              (P1 — routing matrix rows)
      └── skills/*/SKILL.md           (P2 — via @[skills/...] refs)
 └── workflows/*.md                   (P1 — slash-command macros)
      └── skills/*/SKILL.md           (P2 — referenced by steps)
 └── skills/clean-code/SKILL.md       (P0 — inlined into §6.1)
 └── skills/behavioral-modes/         (P1 — §3 mode table)
 └── skills/brainstorming/            (P1 — §5 Socratic gate)
 └── skills/intelligent-routing/      (P1 — §2 routing logic)
```

---

## Rules Files (`rules/`)

| File                        | Dependents                                      | Compiled Sections | Safe to Edit Alone?                              |
| --------------------------- | ----------------------------------------------- | ----------------- | ------------------------------------------------ |
| `copilot.instructions.md`   | None (it IS the compiled output)                | All §1–§10        | ⚠️ Regenerate via compiler                       |
| `COPILOT.md`                | None (v3 runtime)                               | Layers 1–5        | ✅ Edit directly                                 |
| `01-identity.md`            | `copilot.instructions.md`                       | §6 preamble       | ✅                                               |
| `02-task-classification.md` | `copilot.instructions.md`                       | §1                | ✅ → recompile §1                                |
| `03-mode-consulting.md`     | `copilot.instructions.md`                       | §3                | ✅                                               |
| `04-mode-build.md`          | `copilot.instructions.md`                       | §3                | ✅                                               |
| `05-mode-debug.md`          | `copilot.instructions.md`, `workflows/debug.md` | §3                | ✅ — also update debug workflow if logic changes |
| `06-mode-optimize.md`       | `copilot.instructions.md`                       | §3                | ✅                                               |
| `07-technical-standards.md` | `copilot.instructions.md`                       | §6                | ✅ → recompile §6                                |
| `08-communication.md`       | `copilot.instructions.md`                       | §9                | ✅                                               |
| `09-checklist.md`           | `copilot.instructions.md`, all `workflows/*.md` | §7                | ⚠️ Changes affect all workflow outputs           |
| `10-special-situations.md`  | `copilot.instructions.md`                       | §10               | ✅                                               |
| `11-conflict-resolution.md` | `copilot.instructions.md`                       | §8                | ✅                                               |

---

## Prompts (`prompts/`)

| File                       | Dependents                                           | When Changed                                   |
| -------------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| `code-review.prompt.md`    | `copilot.instructions.md` §2 routing row             | Recompile §2                                   |
| `document.prompt.md`       | `copilot.instructions.md` §2 routing row             | Recompile §2                                   |
| `explain.prompt.md`        | `copilot.instructions.md` §2 routing row             | Recompile §2                                   |
| `fix-error.prompt.md`      | `copilot.instructions.md` §2, `workflows/debug.md`   | Recompile §2; cross-check debug workflow steps |
| `generate-tests.prompt.md` | `copilot.instructions.md` §2, `workflows/test.md`    | Recompile §2                                   |
| `new-skill.prompt.md`      | `copilot.instructions.md` §2, `skills/doc.md`        | Recompile §2; verify doc.md authoring guide    |
| `optimize.prompt.md`       | `copilot.instructions.md` §2, `workflows/enhance.md` | Recompile §2                                   |
| `refactor.prompt.md`       | `copilot.instructions.md` §2                         | Recompile §2                                   |

---

## Workflows (`workflows/`)

| File               | Skills Referenced                                    | Dependents                                          | Notes                                              |
| ------------------ | ---------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| `brainstorm.md`    | `brainstorming`                                      | `copilot.instructions.md` §4                        | Gate questions must match `brainstorming/SKILL.md` |
| `create.md`        | `app-builder`, `intelligent-routing`                 | `copilot.instructions.md` §4                        | Coordinates specialist agents                      |
| `debug.md`         | `systematic-debugging`                               | `copilot.instructions.md` §4, `fix-error.prompt.md` | 4-step: gather→hypothesize→investigate→fix         |
| `deploy.md`        | `vulnerability-scanner`, `deployment-procedures`     | `copilot.instructions.md` §4, `09-checklist.md`     | Must run all 5 deploy phases                       |
| `enhance.md`       | domain skill (auto-routed)                           | `copilot.instructions.md` §4                        |                                                    |
| `orchestrate.md`   | `parallel-agents`, `intelligent-routing`             | `copilot.instructions.md` §4                        | Min 3 agents required                              |
| `plan.md`          | `plan-writing`, `architecture`                       | `copilot.instructions.md` §4                        | Output: `docs/PLAN-{slug}.md`                      |
| `preview.md`       | `scripts/auto_preview.py`                            | `copilot.instructions.md` §4                        |                                                    |
| `rai.md`           | `vulnerability-scanner`, `red-team-tactics`          | `copilot.instructions.md` §4                        |                                                    |
| `status.md`        | —                                                    | `copilot.instructions.md` §4                        |                                                    |
| `test.md`          | `testing-patterns`, `tdd-workflow`, `webapp-testing` | `copilot.instructions.md` §4                        |                                                    |
| `ui-ux-pro-max.md` | `.shared/ui-ux-pro-max/`                             | `copilot.instructions.md` §4                        |                                                    |

---

## Critical Skills (P0 — Changes impact compiled runtime)

| File                                  | Compiled Into        | Dependents                                                 |
| ------------------------------------- | -------------------- | ---------------------------------------------------------- |
| `skills/clean-code/SKILL.md`          | §6.1 universal rules | All code-producing agents                                  |
| `skills/behavioral-modes/SKILL.md`    | §3 mode table        | All modes; `03/04/05/06-mode-*.md`                         |
| `skills/brainstorming/SKILL.md`       | §5 Socratic gate     | `rules/copilot.instructions.md`, `workflows/brainstorm.md` |
| `skills/intelligent-routing/SKILL.md` | §2 routing matrix    | All agent prompts                                          |
| `skills/parallel-agents/SKILL.md`     | §2.1 orchestration   | `workflows/orchestrate.md`                                 |

---

## Scripts (`scripts/`)

Scripts are not compiled into runtime. They are invoked by agents/workflows as shell commands.

| Script               | Used By                         | Side Effects                                        |
| -------------------- | ------------------------------- | --------------------------------------------------- |
| `checklist.py`       | Any agent at L1+, all workflows | Reads project files; no writes                      |
| `verify_all.py`      | Deploy workflow, pre-merge      | Runs all 12 audit scripts; may create report files  |
| `auto_preview.py`    | `/preview` workflow             | Starts local dev server; port 3000/8080             |
| `session_manager.py` | Orchestrator agent              | Reads/writes session state (`.agent/.session.json`) |

---

## Impact Matrix — What to Recompile

When you change a source file, these compiled sections become stale:

| Changed Source                        | Recompile Sections             | Risk Level         |
| ------------------------------------- | ------------------------------ | ------------------ |
| Any `rules/*.md`                      | §1, §6, §7, §8, §10            | L2 — cross-module  |
| Any `prompts/*.prompt.md`             | §2 routing matrix              | L1                 |
| `skills/clean-code/SKILL.md`          | §6.1                           | L2                 |
| `skills/behavioral-modes/SKILL.md`    | §3                             | L1                 |
| `skills/brainstorming/SKILL.md`       | §5                             | L1                 |
| `skills/intelligent-routing/SKILL.md` | §2 routing logic               | L2                 |
| Any `workflows/*.md`                  | §4                             | L1                 |
| `COMPILER.md`                         | All sections (manifest change) | L3                 |
| `COPILOT.md`                          | Runtime direct                 | L2 — edit in place |

**Recompile command:**

```bash
python .github/scripts/compile_instructions.py --mode=incremental
```

**Full verify:**

```bash
python .github/scripts/verify_all.py
```

---

## File Naming Conventions

| Pattern                         | Description                                                   |
| ------------------------------- | ------------------------------------------------------------- |
| `rules/NN-name.md`              | Numbered rules; NN = load order (01–11). Always active.       |
| `skills/<name>/SKILL.md`        | Skill entry point. Always named `SKILL.md`.                   |
| `skills/<name>/scripts/*.py`    | Runtime scripts for the skill.                                |
| `skills/<name>/references/*.md` | Deep-reference docs (excluded from compilation).              |
| `prompts/<name>.prompt.md`      | Agent prompt file (must end in `.prompt.md`).                 |
| `workflows/<name>.md`           | Workflow = slash command `/name`.                             |
| `scripts/*.py`                  | Top-level validation scripts (checklist, verify, etc.).       |
| `docs/PLAN-{task-slug}.md`      | Output of `/plan` workflow (written to project root `docs/`). |

---

## Adding New Files — Checklist

### New Skill

- [ ] Create `skills/<name>/SKILL.md` with YAML frontmatter (`name`, `description`, `priority`)
- [ ] Follow authoring guide: `skills/doc.md`
- [ ] Add to agent frontmatter `skills:` field if domain-specific
- [ ] Run `verify_all.py` to confirm no broken `@[skills/...]` refs

### New Agent Prompt

- [ ] Create `prompts/<name>.prompt.md` with frontmatter (`agent`, `description`, `skills`)
- [ ] Add domain signal keywords to `description` for auto-routing
- [ ] Recompile: §2 routing matrix will update automatically

### New Workflow

- [ ] Create `workflows/<name>.md` with `description` frontmatter + `Steps` section
- [ ] Slash command becomes `/<name>`
- [ ] Reference skill dependencies in Steps (skills must exist)

### New Rule

- [ ] Create `rules/NN-name.md` (next available number)
- [ ] Add `activation: always_on` frontmatter
- [ ] Recompile to confirm it lands in the correct §

---

_Last updated: 2026-02-28 | Framework v3.1 AGF_
