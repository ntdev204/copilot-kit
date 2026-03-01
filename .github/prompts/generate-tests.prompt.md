description: Generate comprehensive tests for the selected code or file
agent: test

# Generate Tests

Create thorough tests for the selected code (or current file).

## Strategy

1. **Detect Framework** — Use the project's existing test framework (Jest, Vitest, Pytest, etc.)
2. **Analyze Code** — Identify all public functions, methods, and branches
3. **Plan Coverage** — Map test cases to ensure full coverage

## Test Categories

| Priority | Category    | Description                          |
| -------- | ----------- | ------------------------------------ |
| 1        | Happy Path  | Normal inputs, expected behavior     |
| 2        | Edge Cases  | Boundaries, empty inputs, max values |
| 3        | Error Cases | Invalid inputs, failures, exceptions |
| 4        | Integration | Interactions between components      |

## Guidelines

- Follow AAA pattern: **Arrange → Act → Assert**
- One assertion concept per test (multiple asserts OK if testing same concept)
- Use descriptive test names: `should [expected behavior] when [condition]`
- Mock external dependencies (DB, API, file system)
- Don't test implementation details — test behavior
- Include both positive and negative test cases

## Output

```
[test file path]

[Generated test code]

Coverage: [list of what's covered]
Not covered: [any intentional omissions and why]
```

Reference skills: `testing-patterns`, `tdd-workflow`
