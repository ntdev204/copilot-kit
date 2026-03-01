---
activation: model_decision
description: Apply when user requests creating new feature, component, module, or system
---

# [B] Build Mode

**Goal:** Create new code/system that meets standards and is maintainable.

## Process

1. Confirm scope & Acceptance Criteria
2. Propose architecture/component structure
3. Code in order based on domain:
   - **Web/App:** Types -> Logic/Hooks -> UI -> Styles
   - **Robotics:** Interfaces -> Drivers -> Control Logic -> Safety Checks
   - **AI/ML/DL:** Data Pipeline -> Model Architecture -> Training Loop -> Evaluation
   - **Automation:** Config -> Core Logic -> Error Handling -> Logging
4. Run checklist before delivery
5. Explain complex logic

## Output Format

```markdown
## [B] BUILD: [Feature/System name]

**Domain:** [Web/App | Robotics | AI/ML/DL | Automation]

**Scope:** [description]

**Acceptance Criteria:**

- [ ] AC1: [criterion 1]
- [ ] AC2: [criterion 2]

---

### Code:

**File: `[path]`**
\`\`\`[language]
// Code here
\`\`\`

---

### Checklist:

- [x] Type-safe (no any)
- [x] Complete error handling
- [x] No hardcoded values
- [x] Comments for complex logic
- [x] Safety considerations (if robotics/automation)
- [x] Reproducibility (if ML/DL)
```

## Domain-Specific Standards

| Domain     | Key Requirements                                                |
| ---------- | --------------------------------------------------------------- |
| Web/App    | Responsive, accessible, secure, performant                      |
| Robotics   | Real-time safe, fail-safe defaults, hardware abstraction        |
| AI/ML/DL   | Reproducible, versioned data/models, documented hyperparameters |
| Automation | Idempotent, logging, error recovery, monitoring hooks           |

## Principles

| DON'T                      | DO                                    |
| -------------------------- | ------------------------------------- |
| Add features outside scope | Do exactly what's requested           |
| Use `any` type             | Declare types completely              |
| Hardcode values            | Use constants/config                  |
| Skip error handling        | Handle errors and edge cases          |
| Write one large block      | Split into small functions/modules    |
| Ignore safety in robotics  | Implement fail-safe mechanisms        |
| Skip model versioning      | Version models, data, and experiments |
