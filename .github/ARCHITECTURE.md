# ARCHITECTURE.md — Copilot Kit Framework

> **Load policy:** Lazy — read on first multi-file or cross-module action, not at session start.
> **Runtime role:** System map for agent/skill/script selection and dependency tracing.

---

## Overview

This workspace contains **no application code** — only configuration, rules, skills, workflows, and scripts that govern AI agent behavior. The compiled runtime entry point is `copilot-instructions.md` (or its v3 successor `rules/copilot-instructions-v3.md`).

```
.github/
├── rules/              # 12 × always-on behavioral rules (P0)
├── skills/             # 45 × on-demand knowledge packages (P1–P2)
├── workflows/          # 12 × slash-command recipes (P1)
├── prompts/            # 8 × agent prompt files (P1)
├── scripts/            # 4 × Python validation/audit scripts
├── .shared/            # Shared tooling (UI/UX design system)
├── COMPILER.md         # Compilation pipeline spec & file manifest
├── ARCHITECTURE.md     # This file — system map
└── copilot-instructions.md  # Compiled runtime (auto-generated)
```

---

## Governance Framework (v3 AGF)

Runtime governance file: [COPILOT.md](rules/COPILOT.md)

```
Every request → Risk Engine → Risk Level (L0–L3) → Active Constraints + Strictness Mode
```

| Risk Level  | Score | Mode     | Gate                                  |
| ----------- | ----- | -------- | ------------------------------------- |
| L0 Trivial  | 0–3   | FLUID    | None                                  |
| L1 Routine  | 4–6   | STANDARD | Axis D ≥ 2 → 1 question               |
| L2 Elevated | 7–9   | STRICT   | Max 2 questions, phases 1–3 checklist |
| L3 Critical | 10–12 | LOCKDOWN | Full gate, all 12 scripts             |

---

## Rules Layer (`rules/` — P0, Always Active)

| File                        | Role                                                         | Governance Section           |
| --------------------------- | ------------------------------------------------------------ | ---------------------------- |
| `copilot.instructions.md`   | Master runtime (v2, compiled)                                | §1–§10                       |
| `COPILOT.md`                | Master runtime (v3 AGF)                                      | Layers 1–5                   |
| `01-identity.md`            | Agent identity, 7 core principles                            | Layer 1 / MP-1→MP-7          |
| `02-task-classification.md` | Request type classifier (CONSULT/BUILD/DEBUG/OPTIMIZE/TRAIN) | Layer 2 / Request Classifier |
| `03-mode-consulting.md`     | CONSULT mode behavior                                        | Layer 3 / STANDARD           |
| `04-mode-build.md`          | BUILD mode behavior                                          | Layer 3 / STRICT             |
| `05-mode-debug.md`          | DEBUG mode behavior                                          | Systematic debug protocol    |
| `06-mode-optimize.md`       | OPTIMIZE mode behavior                                       | Refactor + perf standards    |
| `07-technical-standards.md` | Universal technical rules                                    | Layer 1 / MP-4, MP-6         |
| `08-communication.md`       | Response formatting, tone                                    | Layer 1 / MP-3, MP-10        |
| `09-checklist.md`           | Quality gate definitions                                     | Layer 5 / Validation Loop    |
| `10-special-situations.md`  | Issue/breaking change handling                               | Layer 5 / Feedback Loop      |
| `11-conflict-resolution.md` | Priority hierarchy P0→P4                                     | Layer 4 / Conflict Matrix    |

**Priority hierarchy:** P0 (`rules/`) > P1 (agent frontmatter) > P2 (`skills/`) > P3 (`workflows/`) > P4 (user request)

---

## Agents (`prompts/` — P1)

Each prompt file defines an agent persona with domain signals for auto-routing.

| Agent File                 | Domain                     | Skills Loaded                         |
| -------------------------- | -------------------------- | ------------------------------------- |
| `code-review.prompt.md`    | Code review, quality audit | `clean-code`, `code-review-checklist` |
| `document.prompt.md`       | Documentation generation   | `documentation-templates`             |
| `explain.prompt.md`        | Concept explanation        | `behavioral-modes`                    |
| `fix-error.prompt.md`      | Bug investigation & fix    | `systematic-debugging`                |
| `generate-tests.prompt.md` | Test generation            | `testing-patterns`, `tdd-workflow`    |
| `new-skill.prompt.md`      | Skill authoring            | See `skills/doc.md`                   |
| `optimize.prompt.md`       | Performance & refactoring  | `performance-profiling`, `clean-code` |
| `refactor.prompt.md`       | Code restructuring         | `clean-code`, `architecture`          |

**Named agents (from routing):**

| Agent                 | Primary Skill Set                                             | Routing Signal                      |
| --------------------- | ------------------------------------------------------------- | ----------------------------------- |
| `orchestrator`        | `parallel-agents`, `intelligent-routing`                      | Multi-domain, /orchestrate          |
| `project-planner`     | `plan-writing`, `architecture`                                | "plan", /plan                       |
| `security-auditor`    | `vulnerability-scanner`, `red-team-tactics`                   | auth, secrets, deploy               |
| `backend-specialist`  | `api-patterns`, `database-design`, `nodejs-best-practices`    | API, backend, DB                    |
| `frontend-specialist` | `frontend-design`, `nextjs-react-expert`, `tailwind-patterns` | UI, web, Next.js                    |
| `mobile-developer`    | `mobile-design`                                               | iOS, Android, React Native, Flutter |
| `debugger`            | `systematic-debugging`, `clean-code`                          | error, crash, not working           |
| `ml-engineer`         | `ai-engineering`                                              | model, training, inference, dataset |
| `game-developer`      | `game-development`                                            | game, physics, engine               |

---

## Skills (`skills/` — P1/P2, Lazy-Loaded)

**Loading protocol:** Agent activated → check frontmatter `skills:` → read `SKILL.md` (index only) → load matching sections on demand. Never bulk-read a skill folder.

### Critical Skills (P0 — always applied when writing code)

| Skill                   | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `clean-code`            | SRP, DRY, KISS, YAGNI; functions ≤20 lines, ≤3 args |
| `vulnerability-scanner` | Security scanning, dependency analysis              |

### Domain Skills (P1/P2 — activated by routing)

| Category         | Skills                                                                                                                           |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**     | `frontend-design`, `nextjs-react-expert`, `tailwind-patterns`, `web-design-guidelines`, `vercel-react-best-practices`            |
| **Mobile**       | `mobile-design`                                                                                                                  |
| **Backend**      | `api-patterns`, `database-design`, `nodejs-best-practices`, `python-patterns`, `rust-pro`                                        |
| **AI/ML**        | `ai-engineering`                                                                                                                 |
| **Testing**      | `testing-patterns`, `tdd-workflow`, `webapp-testing`                                                                             |
| **Infra/Deploy** | `deployment-procedures`, `server-management`, `bash-linux`, `powershell-windows`                                                 |
| **Architecture** | `architecture`, `app-builder`, `mcp-builder`, `parallel-agents`                                                                  |
| **Robotics**     | `robotics-automation`, `ros2-humble`, `control-systems`, `iot-solutions`                                                         |
| **Quality**      | `lint-and-validate`, `code-review-checklist`, `conventional-commits`                                                             |
| **UX/Process**   | `brainstorming`, `behavioral-modes`, `intelligent-routing`, `plan-writing`, `find-skills`                                        |
| **Docs**         | `documentation-templates`                                                                                                        |
| **Other**        | `game-development`, `geo-fundamentals`, `i18n-localization`, `seo-fundamentals`, `performance-profiling`, `systematic-debugging` |

---

## Workflows (`workflows/` — P1, Slash-Command Triggered)

| Command          | Purpose                                                    | Key Output                 |
| ---------------- | ---------------------------------------------------------- | -------------------------- |
| `/create`        | App creation via `app-builder`                             | New application scaffold   |
| `/plan`          | Planning-only mode                                         | `docs/PLAN-{task-slug}.md` |
| `/debug`         | Systematic debug: gather → hypothesize → investigate → fix | Root cause + fix           |
| `/orchestrate`   | Multi-agent coordination (≥3 agents)                       | Parallel execution plan    |
| `/enhance`       | Feature enhancement                                        | Targeted improvements      |
| `/deploy`        | 5-phase deploy gate                                        | Validated deployment       |
| `/preview`       | Preview/demo setup                                         | Running preview            |
| `/test`          | Test suite generation                                      | Test files                 |
| `/brainstorm`    | Ideation session                                           | Ideas + trade-off matrix   |
| `/rai`           | Responsible AI review                                      | Risk assessment            |
| `/status`        | Project status check                                       | Status report              |
| `/ui-ux-pro-max` | Premium UI/UX mode via `.shared/ui-ux-pro-max`             | High-fidelity UI           |

---

## Scripts (`scripts/` — Runtime Validation)

> Scripts are **excluded from compilation** — Copilot cannot execute Python directly. Agents reference them as commands.

| Script               | Purpose                              | Risk Gate       |
| -------------------- | ------------------------------------ | --------------- |
| `checklist.py`       | Priority-based project audit (P0→P5) | L1+             |
| `verify_all.py`      | Full suite validation                | L3 / pre-deploy |
| `auto_preview.py`    | Auto-launch preview server           | FLUID/STANDARD  |
| `session_manager.py` | Session state tracking               | Any             |

**Skill-specific scripts** (in `skills/<name>/scripts/`):

| Script                     | Skill                   | Phase   |
| -------------------------- | ----------------------- | ------- |
| `security_scan.py`         | `vulnerability-scanner` | Phase 1 |
| `dependency_analyzer.py`   | `vulnerability-scanner` | Phase 1 |
| `lint_runner.py`           | `lint-and-validate`     | Phase 2 |
| `schema_validator.py`      | `database-design`       | Phase 2 |
| `test_runner.py`           | `testing-patterns`      | Phase 3 |
| `playwright_runner.py`     | `webapp-testing`        | Phase 3 |
| `ux_audit.py`              | `frontend-design`       | Phase 4 |
| `accessibility_checker.py` | `frontend-design`       | Phase 4 |
| `seo_checker.py`           | `seo-fundamentals`      | Phase 4 |
| `bundle_analyzer.py`       | `performance-profiling` | Phase 5 |
| `lighthouse_audit.py`      | `performance-profiling` | Phase 5 |
| `mobile_audit.py`          | `mobile-design`         | Phase 4 |

**Run order:** Security → Lint/Schema → Tests → UX/SEO → Performance/E2E

---

## Compilation Pipeline

Source files are compiled into the runtime via a 4-phase pipeline. Full spec: [COMPILER.md](COMPILER.md).

```
EXTRACT (Phase 1)  →  CLASSIFY (Phase 2)  →  COMPRESS (Phase 3)  →  ASSEMBLE (Phase 4)
Parse YAML             Priority rank           Deduplicate              Render §1–§10
frontmatter + body     P0/P1/P2/P3             & inline                 markdown
```

**Output:** `.github/copilot-instructions.md` (≤400 lines)

**Compile command:**

```bash
python .github/scripts/compile_instructions.py --mode=incremental
```

---

## Shared Tooling (`.shared/`)

| Path                     | Contents                                                   |
| ------------------------ | ---------------------------------------------------------- |
| `.shared/ui-ux-pro-max/` | Premium UI design system used by `/ui-ux-pro-max` workflow |

---

_Last updated: 2026-02-28 | Framework v3.1 AGF_
