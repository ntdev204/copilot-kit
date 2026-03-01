description: Review code for quality, bugs, security, and best practices
agent: ask

# Code Review

Review the selected code (or the current file) following these criteria:

## Checklist

1. **Correctness** — Logic errors, off-by-one, null/undefined, race conditions
2. **Security** — Injection, XSS, CSRF, secrets exposure, insecure dependencies
3. **Performance** — Unnecessary re-renders, N+1 queries, memory leaks, blocking calls
4. **Clean Code** — SRP, DRY, KISS, YAGNI. Functions ≤20 lines, ≤3 args
5. **Naming** — Self-documenting, consistent conventions, no abbreviations
6. **Error Handling** — Graceful failures, meaningful messages, no swallowed errors
7. **Type Safety** — Proper types, no `any`, union types where needed
8. **Testing** — Testable design, edge cases considered

## Output Format

```markdown
## Review: [file/component name]

### 🔴 Critical (must fix)

- [issue + suggested fix]

### 🟡 Warnings (should fix)

- [issue + suggested fix]

### 🟢 Suggestions (nice to have)

- [improvement idea]

### ✅ What's Good

- [positive observations]
```

Be direct. Show code diffs for each issue. Prioritize by severity.

Reference skills: `code-review-checklist`, `clean-code`, `vulnerability-scanner`
