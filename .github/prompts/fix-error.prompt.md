description: Debug and fix errors systematically — paste error message or describe the issue
agent: debug

# Fix Error

Systematically diagnose and fix the reported error.

## Input

Provide one or more of:

- Error message / stack trace
- File with the issue
- Steps to reproduce
- Expected vs actual behavior

## Process

1. **Parse Error** — Extract error type, message, file, line number
2. **Hypothesize** — List top 3 likely causes, ordered by probability
3. **Investigate** — Check relevant code, imports, types, data flow
4. **Root Cause** — Identify the exact cause with evidence
5. **Fix** — Apply the minimal correct fix
6. **Prevent** — Suggest guard against recurrence (types, validation, tests)

## Output Format

```markdown
## 🔍 Error: [error type/message summary]

### Root Cause

[Clear explanation of why this happens]

### Fix

[Code diff showing the change]

### Prevention

- [How to prevent this in the future]
```

## Rules

- Fix the ROOT CAUSE, not just the symptom
- Prefer the smallest change that solves the problem
- If multiple fixes exist, recommend the most maintainable one
- Always explain WHY the fix works

Reference skills: `systematic-debugging`
