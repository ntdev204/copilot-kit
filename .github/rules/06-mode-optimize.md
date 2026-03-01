---
activation: model_decision
description: Apply when user requests refactoring, optimization, or performance improvement
---

# [O] Optimize Mode

**Goal:** Improve quality **WITHOUT changing behavior**.

## Process

1. Measure current state (baseline)
2. Identify main bottleneck
3. Propose improvements + predict results
4. Refactor by priority order
5. Compare before/after
6. Ensure tests still pass

## Domain-Specific Metrics

### Web/App

| Criterion   | Tool        | Good Threshold  |
| ----------- | ----------- | --------------- |
| Bundle size | Build tools | < 500KB         |
| Render time | DevTools    | < 16ms          |
| Memory      | Profiler    | No leaks        |
| Complexity  | Linter      | Cyclomatic < 10 |

### Robotics

| Criterion         | Tool                  | Good Threshold    |
| ----------------- | --------------------- | ----------------- |
| Control loop      | Oscilloscope/Profiler | < 10ms cycle      |
| Latency           | Timing analysis       | Deterministic     |
| Power consumption | Power meter           | Within budget     |
| Memory footprint  | Profiler              | Within MCU limits |

### AI/ML/DL

| Criterion      | Tool                | Good Threshold         |
| -------------- | ------------------- | ---------------------- |
| Inference time | Profiler            | < target latency       |
| Model size     | Disk/memory         | Deployment constraints |
| Accuracy       | Evaluation metrics  | > baseline             |
| GPU memory     | nvidia-smi/profiler | Within VRAM            |

### Automation

| Criterion      | Tool        | Good Threshold     |
| -------------- | ----------- | ------------------ |
| Execution time | Timing logs | < SLA              |
| Resource usage | Monitoring  | Within limits      |
| Error rate     | Metrics     | < 0.1%             |
| Throughput     | Benchmarks  | Meets requirements |

## Output Format

```markdown
## [O] OPTIMIZE

**Domain:** [Web/App | Robotics | AI/ML/DL | Automation]

**Issue:** [slow / duplicate code / hard to maintain / resource heavy]

**Baseline:**

- [Metric 1]: X
- [Metric 2]: X
- LOC: X

---

### Bottleneck:

| Issue         | Location    | Severity        |
| ------------- | ----------- | --------------- |
| [Description] | `file:line` | High/Medium/Low |

### Proposal:

| Item     | Before | After | Delta |
| -------- | ------ | ----- | ----- |
| [Metric] | X      | Y     | -Z%   |

### Regression Check:

- [ ] Tests still pass
- [ ] Behavior unchanged
- [ ] Safety constraints maintained (robotics)
- [ ] Accuracy preserved (ML/DL)
```

## Principles

| DON'T                             | DO                                         |
| --------------------------------- | ------------------------------------------ |
| Optimize prematurely              | Measure first, optimize later              |
| Change behavior                   | Keep behavior unchanged                    |
| Prioritize cleverness             | Readability > Performance                  |
| Skip tests                        | Re-run tests                               |
| Sacrifice accuracy for speed (ML) | Balance accuracy and performance           |
| Ignore real-time constraints      | Maintain deterministic behavior (robotics) |
