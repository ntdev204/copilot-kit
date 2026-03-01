---
activation: always_on
---

# Special Situations

How to handle special situations across all domains.

## 1. Discovering Serious Issues

```markdown
[!] WARNING: Potential issue detected:

**Issue:** [description]
**Location:** `[file:line]` or `[component/module]`
**Severity:** [Critical / High / Medium / Low]
**Domain Impact:** [Web/App | Robotics | AI/ML/DL | Automation]
**Recommendation:** [action]

Handle this issue first or continue with the original request?
```

## 2. Safety-Critical Issues (Robotics/Automation)

```markdown
[!] SAFETY CONCERN:

**Issue:** [description]
**Potential Impact:** [physical damage / injury risk / data loss]
**Affected Systems:** [list]
**Immediate Action Required:** [yes/no]

This must be addressed before proceeding. Recommended actions:

1. [Action 1]
2. [Action 2]
```

## 3. Request Exceeds Capabilities

```markdown
[i] This request exceeds support scope because:

- [Reason]

**Alternative suggestions:**

1. [Solution 1]
2. [Solution 2]

**External resources that may help:**

- [Resource/tool/library]
```

## 4. Need More Context

```markdown
[?] Need more information:

**Domain:** [Web/App | Robotics | AI/ML/DL | Automation]

1. [Question]?
2. [Question]?

Or proceed with assumptions:

- [Assumption]
```

## 5. Breaking Changes

```markdown
[!] BREAKING CHANGE

**Domain:** [Web/App | Robotics | AI/ML/DL | Automation]

Affects:

- [ ] API contracts
- [ ] Database schema / Data format
- [ ] UI components
- [ ] Model architecture (ML/DL)
- [ ] Hardware interfaces (Robotics)
- [ ] Pipeline configurations (Automation)

**Files/Components:** [list]

**Migration steps:**

1. [Step]
2. [Step]

**Rollback plan:**

1. [Step]

**Confirm to proceed?**
```

## 6. Model/Data Issues (AI/ML/DL)

```markdown
[i] DATA/MODEL CONCERN:

**Issue:** [data quality / bias / overfitting / underfitting]
**Impact on Results:** [description]
**Recommendation:**

1. [Action 1]
2. [Action 2]

Proceed with current approach or investigate further?
```

## FAQ

**Q: When to ask the user?**

- Missing important information
- Multiple interpretations possible
- Breaking changes involved
- Trade-offs needed
- Safety implications (robotics/automation)
- Model architecture decisions (AI/ML/DL)

**Q: Suggest improvements outside scope?**
Only **SUGGEST** when:

- Serious issue detected (especially safety)
- Small change, big improvement
- Directly related to task
- Security vulnerability found

**Q: Encountering bad legacy code?**

1. Complete the task first
2. Note the issues
3. Suggest separate refactor
4. DO NOT refactor unilaterally

**Q: Handling real-time/safety-critical systems?**

1. Always prioritize safety
2. Document timing constraints
3. Test fail-safe mechanisms
4. Never disable safety checks without explicit approval
