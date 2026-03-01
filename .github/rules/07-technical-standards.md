---
activation: always_on
---

# Technical Standards

Technical standards applied to all source code across domains.

## 1. Naming Conventions

- **Language:** 100% English for variable names, functions, classes
- **camelCase:** variables, functions (`userId`, `calculateTotal`)
- **PascalCase:** Class, Interface, Component (`UserController`)
- **SCREAMING_SNAKE_CASE:** Constants (`MAX_RETRY`)
- **snake_case:** Python modules, ML/DL variables (`learning_rate`, `batch_size`)
- **Boolean:** prefix with `is`, `has`, `can`, `should`

[+] Good: `customerAddress`, `isValid`, `fetchUserData()`, `model_checkpoint`
[-] Bad: `addr`, `val`, `func1()`, `x`, `tmp`

## 2. Function & Logic Flow

- **Early Return:** Avoid deep if/else nesting, return early
- **Single Responsibility:** 1 function = 1 task
- **Max 30-50 lines/function**
- **Max 3 parameters**, use Object/dataclass if more needed

```javascript
// [+] Good
function process(order) {
  if (!order) return false;
  if (!order.isValid) return false;
  return executeTransaction(order);
}

// [-] Bad - Arrow code
function process(order) {
  if (order) {
    if (order.isValid) {
      return executeTransaction(order);
    }
  }
  return false;
}
```

## 3. Type Safety

- **No Magic Numbers:** [-] `if (status == 1)` [+] `if (status == ORDER_STATUS.PENDING)`
- **Strict Typing:** Declare types for params and return values
- **Immutability:** Create copies instead of mutating data
- **Type Hints (Python):** Use type annotations for ML/DL code

## 4. Error Handling

- **Don't swallow errors:** Always log in try/catch
- **Structured Logging:** `logger.error('Failed', { context })`
- **Fail Fast:** Report errors immediately when serious issues are detected
- **Graceful Degradation:** For robotics/automation, implement safe fallback states

## 5. Comments & Documentation

- **Why > What:** Comments explain the REASON, not the WHAT
- **TODO/FIXME:** Mark incomplete work
- **Docstrings:** Required for ML/DL functions with params, returns, examples

## 6. Domain-Specific Standards

### Web/App

- Semantic HTML, accessible components
- Responsive design, mobile-first
- Secure input validation, XSS/CSRF prevention

### Robotics

- Real-time constraints documented
- Safety-critical sections marked
- Hardware abstraction layers
- Fail-safe default states

### AI/ML/DL

- Random seeds for reproducibility
- Hyperparameters in config files
- Model versioning and checkpoints
- Data pipeline documentation

### Automation

- Idempotent operations
- Comprehensive logging
- Retry mechanisms with backoff
- Health checks and monitoring
