description: Refactor code for better readability, maintainability, and performance
agent: edit

# Refactor Code

Analyze the selected code (or current file) and refactor it systematically.

## Principles

- **Single Responsibility** — Each function/class does ONE thing
- **DRY** — Extract repeated logic into shared utilities
- **KISS** — Simplify complex conditionals, reduce nesting
- **YAGNI** — Remove unused code, dead branches, unnecessary abstractions
- **Naming** — Rename unclear variables/functions to be self-documenting

## Process

1. **Identify Issues** — List all code smells and anti-patterns found
2. **Plan Changes** — Describe the refactoring strategy before applying
3. **Apply Refactoring** — Make changes incrementally, preserving behavior
4. **Verify** — Ensure no functional changes (same inputs → same outputs)

## Constraints

- Do NOT change public API signatures unless explicitly requested
- Preserve existing test coverage
- Keep changes minimal and focused — don't refactor everything at once
- Explain each change with a brief comment

## Output

Show before/after comparisons for each significant change. Group related changes together.

Reference skills: `clean-code`, `performance-profiling`
