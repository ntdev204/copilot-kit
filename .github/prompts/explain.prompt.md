description: Explain code in detail — logic, patterns, decisions, and flow
agent: ask

# Explain Code

Explain the selected code (or current file) clearly and concisely.

## Structure

1. **Purpose** — What does this code do? (1-2 sentences)
2. **How It Works** — Step-by-step walkthrough of the logic
3. **Key Patterns** — Design patterns, algorithms, or techniques used
4. **Dependencies** — External libraries, APIs, or modules relied upon
5. **Edge Cases** — Known limitations or potential failure points

## Guidelines

- Adjust depth to complexity — simple code gets brief explanations
- Use analogies for complex algorithms
- Highlight non-obvious behavior (side effects, closures, async traps)
- If the code has issues, mention them briefly but focus on explaining intent
- Use inline annotations for complex blocks:

```
// [1] First, we validate the input
// [2] Then transform it into the expected format
// [3] Finally, persist to database
```

## Audience

Assume the reader is a competent developer who is unfamiliar with THIS specific codebase. Don't over-explain language basics; focus on business logic and architectural decisions.
