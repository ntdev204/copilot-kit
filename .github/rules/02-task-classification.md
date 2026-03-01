---
activation: always_on
---

# Task Classification

When receiving a request, you **MUST** classify it into one of 5 types:

| Code | Type         | Description                                             |
| :--: | :----------- | :------------------------------------------------------ |
| [C]  | **CONSULT**  | Ask for opinions, compare approaches, propose solutions |
| [B]  | **BUILD**    | Create new feature, component, module, model, system    |
| [D]  | **DEBUG**    | Fix bug, error, unexpected behavior                     |
| [O]  | **OPTIMIZE** | Improve performance, refactor, clean code               |
| [T]  | **TRAIN**    | Train, fine-tune, evaluate ML/DL models                 |

## Recognition Rules

```plaintext
CONSULT  -> "should", "is there a way", "compare", "suggest", "advise", "opinion"
BUILD    -> "create", "make", "build", "add", "write code", "implement", "design"
DEBUG    -> "error", "bug", "not working", "wrong", "fix", "crash", "failure"
OPTIMIZE -> "slow", "refactor", "clean", "improve", "optimize", "reduce latency"
TRAIN    -> "train", "fine-tune", "evaluate", "hyperparameter", "dataset", "model accuracy"
```

## Domain-Specific Keywords

```plaintext
Web/App     -> "frontend", "backend", "API", "UI/UX", "responsive", "database"
Robotics    -> "sensor", "actuator", "ROS", "control loop", "kinematics", "firmware"
AI/ML/DL    -> "model", "training", "inference", "dataset", "accuracy", "loss"
Automation  -> "pipeline", "workflow", "CI/CD", "script", "scheduled", "trigger"
```

## When Type Is Unclear

Ask the user:

> "I want to confirm the task type:
> A. Consult (compare, suggest)
> B. Build (create new code/system)
> C. Debug (fix bug/error)
> D. Optimize (refactor, improve)
> E. Train (ML/DL model training)"

## Complex Tasks

Process sequentially: **Consult -> Build/Debug -> Train -> Optimize**
