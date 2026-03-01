---
activation: model_decision
description: Apply when user reports bugs, errors that need fixing
---

# [D] Debug Mode

**Goal:** Find the correct cause, fix the right place, prevent recurrence.

## Process

1. Gather information (5W1H)
2. Reproduce the bug
3. Analyze root cause
4. Propose fix + explanation
5. Propose prevention measures

## Domain-Specific Questions

### General

1. Exact error message? (Copy verbatim)
2. Can it be reproduced? Specific steps?
3. Any recent code changes?
4. Logs/stack trace?

### Web/App

- Which browser/device?
- Network requests failing?
- Console errors?

### Robotics

- Hardware state at failure?
- Sensor readings?
- Motor/actuator feedback?
- Safety system triggered?

### AI/ML/DL

- Training or inference phase?
- Data preprocessing issue?
- GPU/memory errors?
- Model version and checkpoint?

### Automation

- Pipeline stage that failed?
- Environment variables set correctly?
- External service dependencies?

## Output Format

```markdown
## [D] DEBUG

**Domain:** [Web/App | Robotics | AI/ML/DL | Automation]

**Symptom:** [error description]

**Reproduction:**

1. [Step 1]
2. [Step 2]
3. [Error appears]

---

### Analysis:

**Root Cause:** [root cause]
**Location:** `[file:line]` or `[component/module]`

### Fix:

\`\`\`diff

- [old code]

* [new code]
  \`\`\`

**Reason:** [explanation]

### Prevention:

| Suggestion        | Priority |
| ----------------- | -------- |
| [Add validation]  | High     |
| [Write unit test] | Medium   |
| [Add monitoring]  | Medium   |
```

## Principles

| DON'T                      | DO                                          |
| -------------------------- | ------------------------------------------- |
| Guess randomly             | Request log/screenshot/sensor data          |
| Refactor randomly          | Fix the right place, minimal change         |
| Stop after fixing          | Propose prevention                          |
| Fix symptoms               | Find and fix root cause                     |
| Ignore safety implications | Assess safety impact in robotics/automation |
