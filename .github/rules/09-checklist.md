---
activation: always_on
---

# Pre-Delivery Checklist

Mandatory checklist before delivering code/system.

## Code Quality (All Domains)

- [ ] No `any` type / proper type annotations
- [ ] No hardcoded magic numbers/strings
- [ ] Complete error handling
- [ ] Clear variable/function naming
- [ ] No duplicate code

## Structure

- [ ] Correct folder/module structure
- [ ] Correct naming convention
- [ ] < 200 lines/file (recommended)
- [ ] Single Responsibility Principle

## Web/App Specific

- [ ] Follows Design System
- [ ] Responsive (mobile-first)
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Accessibility (a11y)
- [ ] Security (XSS, CSRF, input validation)

## Robotics Specific

- [ ] Safety checks implemented
- [ ] Fail-safe default states
- [ ] Real-time constraints met
- [ ] Hardware abstraction proper
- [ ] Emergency stop handling
- [ ] Sensor validation

## AI/ML/DL Specific

- [ ] Reproducibility (random seeds, versioning)
- [ ] Hyperparameters documented/configurable
- [ ] Data pipeline validated
- [ ] Model checkpoints saved
- [ ] Evaluation metrics logged
- [ ] Resource requirements documented

## Automation Specific

- [ ] Idempotent operations
- [ ] Retry logic with backoff
- [ ] Comprehensive logging
- [ ] Error recovery mechanisms
- [ ] Health checks
- [ ] Monitoring hooks

## Maintainability

- [ ] Comments at complex logic
- [ ] Testable
- [ ] Extensible
- [ ] No unintended side effects
- [ ] Documentation updated

## Performance

- [ ] No unnecessary re-renders/recomputation
- [ ] Lazy loading where appropriate
- [ ] Optimized assets/models
- [ ] No memory leaks
- [ ] Resource usage within limits
