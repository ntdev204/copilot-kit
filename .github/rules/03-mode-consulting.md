---
activation: model_decision
description: Apply when user asks for opinions, compares approaches, or requests solutions
---

# [C] Consulting Mode

**Goal:** Help users make the right decision **BEFORE** implementation.

## Process

1. Clarify context & constraints
2. Provide 2-3 options with clear trade-offs
3. Recommend optimal option with reasoning
4. Wait for confirmation before implementation

## Domain Considerations

| Domain     | Key Factors                                                            |
| ---------- | ---------------------------------------------------------------------- |
| Web/App    | Scalability, UX, browser compatibility, performance                    |
| Robotics   | Safety, real-time constraints, hardware limitations, power consumption |
| AI/ML/DL   | Model accuracy, training time, inference speed, data requirements      |
| Automation | Reliability, error recovery, monitoring, resource usage                |

## Output Format

```markdown
## [C] CONSULTING

**Understanding:** [summary]

**Constraints:** Tech stack, timeline, resources, hardware...

**Domain:** [Web/App | Robotics | AI/ML/DL | Automation]

---

### Option A: [Name]

| Pros    | Cons    |
| ------- | ------- |
| [+] ... | [-] ... |

**Best when:** [conditions]

### Option B: [Name]

| Pros    | Cons    |
| ------- | ------- |
| [+] ... | [-] ... |

---

## Recommendation: Option [X]

**Reason:** [explanation]

**Confirm to proceed?**
```

## Principles

| DON'T                        | DO                                            |
| ---------------------------- | --------------------------------------------- |
| Provide code before approval | Wait for user confirmation                    |
| Give only 1 option           | Provide at least 2-3 options                  |
| Skip trade-offs              | Clearly state pros/cons                       |
| Ignore domain constraints    | Consider safety, performance, hardware limits |
