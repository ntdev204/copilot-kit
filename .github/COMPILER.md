# Copilot Compiler Architecture

---

## 1. Conceptual Model

```
┌─────────────────────────────────────────────────────────────────┐
│                   SOURCE OF TRUTH (.github/)                    │
│                                                                 │
│  rules/        prompts/      skills/       workflows/           │
│  12 × .md      8 × .prompt   218 × dir     12 × .md             │
│                               SKILL.md                          │
│  COMPILER.md                  references/                       │
│                               scripts/                          │
└──────────────┬──────────────────────────────────────────────────┘
               │
               │  compile_instructions.py
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│              COMPILATION PIPELINE                               │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐    │
│  │ EXTRACT  │→ │ CLASSIFY │→ │ COMPRESS │→ │   ASSEMBLE    │    │
│  │ Phase 1  │  │ Phase 2  │  │ Phase 3  │  │   Phase 4     │    │
│  └──────────┘  └──────────┘  └──────────┘  └───────────────┘    │
│       │              │             │              │             │
│  Parse YAML     Priority      Deduplicate    Render §1-§10      │
│  frontmatter    classify      & inline       markdown           │
│  + body         + rank        + compress                        │
└──────────────┬──────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────┐
│         COMPILED RUNTIME (.github/copilot-instructions.md)      │
│                                                                 │
│  §1  Request Classifier        ← rules/02-task-classification.md│
│  §2  Agent Routing Matrix      ← prompts/*.prompt.md            │
│  §3  Behavioral Modes          ← skills/behavioral-modes/       │
│  §4  Workflow Macros           ← workflows/*.md                 │
│  §5  Socratic Gate             ← skills/brainstorming/          │
│  §6  Universal Rules           ← rules/07-technical-standards.md│
│  §7  Quality Gates             ← rules/09-checklist.md          │
│  §8  Decision Frameworks       ← skills/architecture/           │
│  §9  Response Format Rules     ← workflows/ output formats      │
│  §10 Execution Guard           ← rules/COPILOT.md               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Source File Inventory & Classification

### 2.1 Source Types

| Source Type       | Path Pattern            | Count | Extraction Target       |
| ----------------- | ----------------------- | ----- | ----------------------- |
| **Rules**         | `rules/*.md`            | 12    | §1, §5, §6, §7, §10     |
| **Prompts**       | `prompts/*.prompt.md`   | 8     | §2 (routing matrix)     |
| **Skills**        | `skills/*/SKILL.md`     | 218   | §3, §5, §6, §8          |
| **Workflows**     | `workflows/*.md`        | 12    | §4 (macros)             |
| **Architecture**  | `COMPILER.md`           | 1     | Manifest/validation     |
| **Scripts**       | `scripts/*.py`          | 4     | Excluded (runtime-only) |
| **Skill refs**    | `skills/*/references/*` | N     | Excluded (too large)    |
| **Skill scripts** | `skills/*/scripts/*`    | N     | Excluded (runtime-only) |

### 2.2 Extraction Eligibility

```
INCLUDE in compilation:
  ✅ rules/*.md              → Full extraction (global rules)
  ✅ prompts/*.prompt.md     → Frontmatter only (description, agent)
  ✅ skills/*/SKILL.md       → Frontmatter + first H2 section (core principles only)
  ✅ workflows/*.md          → Frontmatter + Steps section
  ✅ COMPILER.md             → Agent/Skill/Workflow manifest tables

EXCLUDE from compilation:
  ❌ scripts/*.py            → Copilot cannot execute Python scripts
  ❌ skills/*/references/*   → Too large; context-specific detail
  ❌ skills/*/scripts/*      → Runtime execution artifacts
  ❌ .shared/**              → Shared tooling (design system scripts)
```

---

## 3. Extraction Logic (Phase 1)

### 3.1 Parser Contract

Each source type has a defined extraction schema:

```
┌──────────────────────────────────────────────┐
│           PROMPT EXTRACTION                  │
│                                              │
│  Input:  prompts/{name}.prompt.md            │
│  Parse:  YAML frontmatter between --- marks  │
│                                              │
│  Extract:                                    │
│    .agent          → agent capability/role   │
│    .description    → domain signal keywords  │
│    body > H2[0]    → core philosophy (1 line)│
│    body > tables   → decision frameworks     │
│                                              │
│  Output: PromptRecord {                      │
│    name: string                              │
│    triggers: string[]   ← from description   │
│    agent: string                             │
│    philosophy: string                        │
│    decisions: Table[]                        │
│  }                                           │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│           SKILL EXTRACTION                   │
│                                              │
│  Input:  skills/{name}/SKILL.md              │
│  Parse:  YAML frontmatter                    │
│                                              │
│  Extract:                                    │
│    .name           → skill identifier        │
│    .description    → capability summary      │
│    .priority       → if CRITICAL → inline    │
│    body > H2[0:2]  → top 2 principle blocks  │
│    body > tables   → rule tables (if any)    │
│                                              │
│  Output: SkillRecord {                       │
│    name: string                              │
│    description: string                       │
│    priority: "CRITICAL" | "NORMAL"           │
│    principles: string[]                      │
│    rules: Table[]                            │
│  }                                           │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│          WORKFLOW EXTRACTION                 │
│                                              │
│  Input:  workflows/{name}.md                 │
│  Parse:  YAML frontmatter + body             │
│                                              │
│  Extract:                                    │
│    .description    → command purpose         │
│    body > "Steps"  → ordered step list       │
│    body > "Output" → output format template  │
│    body > "Examples" → usage examples        │
│                                              │
│  Output: WorkflowRecord {                    │
│    command: string     ← filename stem       │
│    description: string                       │
│    steps: string[]                           │
│    outputFormat: string                      │
│  }                                           │
└──────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          RULES EXTRACTION                       │
│                                                 │
│  Input:  rules/*.md                             │
│  Parse:  Full markdown body                     │
│                                                 │
│  Extract by section:                            │
│    02-task-classification.md  → §1 table        │
│    COPILOT.md                 → §2 checklist    │
│    07-technical-standards.md  → §6 universal    │
│    09-checklist.md            → §7 Quality gates│
│                                                 │
│  Output: RulesRecord {                          │
│    sections: Map<SectionID, Content>            │
│  }                                              │
└─────────────────────────────────────────────────┘
```

### 3.2 Trigger Keyword Extraction (from Prompt descriptions)

```python
# Pseudocode: Extract trigger keywords from prompt description field
def extract_triggers(description: str) -> list[str]:
    """
    Prompt .md descriptions follow the pattern:
    "... Triggers on keyword1, keyword2, keyword3."

    If no explicit "Triggers on" clause, extract from
    "Use when" or "Use for" clauses.
    """
    if "Triggers on" in description:
        trigger_clause = description.split("Triggers on")[1].rstrip(".")
        return [kw.strip() for kw in trigger_clause.split(",")]
    elif "Use when" in description or "Use for" in description:
        # Extract domain nouns from the clause
        clause = description.split("Use when")[-1] if "Use when" in description \
                 else description.split("Use for")[-1]
        return extract_domain_nouns(clause)
    else:
        # Fallback: extract capitalized domain terms from full description
        return extract_domain_nouns(description)
```

---

## 4. Classification & Priority Ordering (Phase 2)

### 4.1 Priority Tiers

Every extracted record is assigned a compilation priority:

```
P0  CRITICAL — Always inlined verbatim. Cannot be compressed.
    Sources: rules/*.md (classifier, routing checklist, Socratic gate)
             skills/clean-code/ (priority: CRITICAL)

P1  STRUCTURAL — Framework-defining. Compress to table rows.
    Sources: prompts/*.prompt.md (→ §2 routing matrix rows)
             workflows/*.md (→ §4 macro definitions)
             skills/behavioral-modes/ (→ §3 mode table)
             skills/brainstorming/ (→ §5 gate rules)

P2  CONTEXTUAL — Domain knowledge. Compress to single-line summaries.
    Sources: skills/*/SKILL.md (non-critical)
             Inline as skill tags within §2 prompt rows

P3  REFERENCE — Runtime-only. Excluded from compilation.
    Sources: skills/*/references/*, scripts/*, .shared/
```

### 4.2 Priority Resolution Table

| Source File                       | Priority | Target Section | Compression                 |
| --------------------------------- | -------- | -------------- | --------------------------- |
| `rules/02-task-classification.md` | P0       | §1             | Verbatim table              |
| `rules/COPILOT.md`                | P0       | §2 preamble    | Verbatim checklist          |
| `rules/11-conflict-resolution.md` | P0       | §8             | Verbatim framework table    |
| `rules/07-technical-standards.md` | P0       | §6             | Principle table             |
| `rules/09-checklist.md`           | P0       | §7             | Priority list               |
| `prompts/*.prompt.md` × 8         | P1       | §2 matrix      | 1 row per prompt            |
| `workflows/*.md` × 12             | P1       | §4             | 5-step sequence per command |
| `skills/behavioral-modes/`        | P1       | §3             | Mode table (7 rows)         |
| `skills/brainstorming/`           | P1       | §5             | Gate trigger table          |
| `skills/clean-code/`              | P0       | §6.1           | Principle table (8 rows)    |
| `skills/intelligent-routing/`     | P1       | §2             | Merged into format matrix   |
| `skills/parallel-agents/`         | P1       | §2.1           | Orchestration rules         |
| `skills/architecture/`            | P2       | §8             | Decision framework tables   |
| `skills/frontend-design/`         | P2       | §6.3           | UI rules DO/DON'T table     |
| `skills/api-patterns/`            | P2       | §8             | Backend tech selection      |
| All other skills (200+)           | P2       | §2             | Skill tag in matrix row     |
| `scripts/*.py`                    | P3       | —              | Excluded                    |
| `skills/*/references/*`           | P3       | —              | Excluded                    |
| `.shared/**`                      | P3       | —              | Excluded                    |

---

## 5. Compression Logic (Phase 3)

### 5.1 Compression Strategies by Type

```
┌──────────────────────────────────────────────────────────┐
│  STRATEGY 1: Table Compression (Prompts)                 │
│                                                          │
│  Input:  8 prompt .md files                              │
│  Output: 8 rows × 3 columns = ~10 lines                  │
│                                                          │
│  Method:                                                 │
│    Per prompt:                                           │
│      - domain_signal = extract_triggers(description)     │
│      - target_agent = agent (e.g. ask, code)             │
│    Emit: | {domain_signal} | {target_agent} | {logic} |  │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  STRATEGY 2: Step Sequence (Workflows)                   │
│                                                          │
│  Input:  12 workflow .md files (avg 80 lines = 960)      │
│  Output: 12 × 5 steps = ~72 lines                        │
│                                                          │
│  Method:                                                 │
│    Per workflow:                                         │
│      - command = "/" + filename_stem                     │
│      - steps = body.find("Steps") → extract ordered list │
│      - Limit to 5 steps max                              │
│      - Compress each step to single imperative sentence  │
│    Emit: ### `/{command}` \n 1. ... \n 2. ...            │
│                                                          │
│  Compression ratio: 960 lines → 72 lines (13:1)          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  STRATEGY 3: Inline Absorption (Skills → Prompts/Rules)  │
│                                                          │
│  Input:  218 skill SKILL.md files                        │
│  Output: 0 dedicated lines (absorbed into §2, §6, §8)    │
│                                                          │
│  Method by priority:                                     │
│    P0 skills (clean-code):                               │
│      → Principles inlined as §6.1 table rows             │
│    P1 skills (behavioral-modes, brainstorming):          │
│      → Promoted to dedicated subsections (§3, §5)        │
│    P2 skills (all others):                               │
│      → Appear ONLY as skill tags in §2 mapping matrix    │
│      → Core principles absorbed into §6 or §8 if unique  │
│    P3 skills (reference-heavy, runtime scripts):         │
│      → Completely excluded                               │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  STRATEGY 4: Verbatim Passthrough (P0 Rules)             │
│                                                          │
│  Input:  rules/*.md sections                             │
│  Output: ~80 lines (tables, checklists, gates)           │
│                                                          │
│  Method:                                                 │
│    Copy table structure directly                         │
│    Strip markdown comments, navigation links             │
│    Replace with section references (§N)                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Deduplication Rules

```
DEDUP RULE 1: Skill Convergence
  Problem:  clean-code appears in many prompt templates
  Solution: Extract to §6.1 (universal).

DEDUP RULE 2: Quality Gate Convergence
  Problem:  rules/09-checklist.md overlaps with workflow test specs
  Solution: Merge into §7.

DEDUP RULE 3: Cross-Reference Elimination
  Problem:  Prompt files reference skills via @[skills/...] syntax
            Copilot cannot resolve @[...] references
  Solution: Resolve all references at compile time. Inline the content.
```

### 5.3 Budget Allocation

```
Total budget: 400 lines maximum

§1  Request Classifier                               18 lines
§2  Agent Routing (matrix + orchestration + guard)   50 lines
§3  Behavioral Modes                                 16 lines
§4  Workflow Macros (12 commands)                    80 lines
§5  Socratic Gate                                    16 lines
§6  Universal Rules (6.1-6.5)                        56 lines
§7  Quality Gates                                    34 lines
§8  Decision Frameworks                              28 lines
§9  Response Format Rules                            28 lines
§10 Execution Guard                                  14 lines
    Header + separators                              20 lines
                                                   ─────────
    TOTAL                                          ~360 lines
    RESERVE                                         ~40 lines
```

---

## 6. Assembly Logic (Phase 4)

### 6.1 Section Assembly Order

Sections are assembled in strict execution order — the order a user request would flow through them:

```
User Request
     │
     ├─1→ §1  REQUEST CLASSIFIER         (what type?)
     ├─2→ §2  AGENT ROUTING              (which persona/prompt?)
     ├─3→ §3  BEHAVIORAL MODES           (how to approach?)
     ├─4→ §4  WORKFLOW MACROS            (if /command)
     ├─5→ §5  SOCRATIC GATE              (ask before code?)
     ├─6→ §6  UNIVERSAL RULES            (always-on constraints)
     ├─7→ §7  QUALITY GATES              (pre/post checks)
     ├─8→ §8  DECISION FRAMEWORKS        (tech choices)
     ├─9→ §9  RESPONSE FORMAT            (output shape)
     └─10→ §10 EXECUTION GUARD           (final validation)
```

### 6.2 Section-to-Source Mapping

```
§1  ← rules/02-task-classification.md

§2  ← prompts/*.prompt.md (8 files)
     ← skills/intelligent-routing/SKILL.md (routing logic)
     ← skills/parallel-agents/SKILL.md (orchestration patterns)

§3  ← skills/behavioral-modes/SKILL.md

§4  ← workflows/*.md (×12)

§5  ← skills/brainstorming/SKILL.md

§6  ← rules/07-technical-standards.md
     ← skills/clean-code/SKILL.md
     ← skills/frontend-design/SKILL.md
     ← skills/web-design-guidelines/SKILL.md
     ← skills/vulnerability-scanner/SKILL.md

§7  ← rules/09-checklist.md

§8  ← rules/11-conflict-resolution.md
     ← skills/api-patterns/SKILL.md

§9  ← workflows/ (output sections)

§10 ← rules/COPILOT.md
```

---

## 7. Conflict Resolution

### 7.1 Conflict Types & Resolution Strategy

| Conflict Type                    | Example                                                               | Resolution                                               |
| -------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------- |
| **Same rule, different wording** | COPILOT.md says "SRP" + clean-code says "Single Responsibility"       | Use skill version (more precise). Deduplicate.           |
| **Workflow vs agent behavior**   | /debug workflow defines 4 steps, fix-error.prompt.md defines 4 phases | Merge: use workflow structure, use prompt phase content. |

### 7.2 Priority Cascade

```
CONFLICT RESOLUTION ORDER (highest wins):

  1. rules/*.md (P0)                  — Global enforcement
  2. prompts/*.prompt.md (P1)         — Agent identity
  3. skills/*/SKILL.md (P1-P2)        — Domain knowledge
  4. workflows/*.md (P1)              — Procedure steps
  5. COMPILER.md (P2)                 — Manifest/inventory
```

---

## 8. File Dependency Model

### 8.1 Dependency Graph

```
COMPILER.md ───────────────────────────── (manifest, validates completeness)
       │
       ├── prompts/*.prompt.md ──┬── skills/*.md (via @[skills/...])
       │                          │
       │                          └── rules/*.md (via global rules)
       │
       ├── workflows/*.md ─────── skills/*.md
       │
       └── rules/COPILOT.md ── rules/01-identity.md (and others)
```

### 8.2 Impact Matrix (If source X changes, recompile sections Y)

| Changed Source                     | Sections to Recompile |
| ---------------------------------- | --------------------- |
| Any `rules/*.md`                   | §1, §6, §7, §8, §10   |
| Any `prompts/*.prompt.md`          | §2                    |
| `skills/clean-code/SKILL.md`       | §6.1                  |
| `skills/behavioral-modes/SKILL.md` | §3                    |
| Any `workflows/*.md`               | §4                    |

---

## 9. Incremental Rebuild Strategy

### 9.1 Change Detection

```
compile_instructions.py --mode=incremental

1. HASH CHECK
   - Maintain .github/.compile_cache.json
   - Store SHA-256 hash of each source file

2. DIFF CLASSIFICATION
   For each changed file, look up impact matrix.

3. SELECTIVE RECOMPILE
   - Re-extract and re-compress DIRTY sections only.

4. CACHE UPDATE
```

---

## 10. Compilation Invariants

These invariants must hold after every compilation:

```
INV-1: line_count(output) ≤ 400

INV-2: ∀ prompt ∈ COMPILER.md/prompts →
         ∃ row in §2 mapping to prompt capability

INV-3: ∀ workflow ∈ COMPILER.md/workflows →
         ∃ entry in §4 where entry.command == "/" + workflow.name

INV-4: No @[skills/...] references survive in output

INV-5: No runtime dependencies survive in output
        (no python commands, no script paths)

INV-6: §1-§10 appear in strict numerical order
```

---

## 11. Compiler CLI Interface

```
Usage:
  python .github/scripts/compile_instructions.py [OPTIONS]

Options:
  --mode=full|incremental|validate    Compilation mode (default: incremental)
  --budget=N                          Max output lines (default: 400)
  --check                             Diff-only mode for CI (no write)

Output:
  .github/copilot-instructions.md     Compiled runtime file
  .github/.compile_cache.json         Hash cache for incremental builds
```
