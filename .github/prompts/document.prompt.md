description: Generate documentation — README, API docs, JSDoc/TSDoc, or inline comments
agent: ask

# Generate Documentation

Create or improve documentation for the selected code, file, or project.

## Documentation Types

### 1. README

- Project overview, setup instructions, usage examples
- Badge links, tech stack, architecture diagram (Mermaid)
- Contributing guidelines, license

### 2. API Documentation

- Endpoint descriptions, request/response schemas
- Authentication, rate limits, error codes
- cURL examples for each endpoint

### 3. Code Documentation (JSDoc / TSDoc / Docstrings)

- Function purpose, parameters, return values
- Usage examples for complex functions
- `@throws`, `@deprecated`, `@since` tags where relevant

### 4. Inline Comments

- Only for non-obvious logic (WHY, not WHAT)
- No redundant comments that repeat the code
- TODO/FIXME with ticket references

## Guidelines

- Match the existing documentation style in the project
- Be concise — every sentence must add value
- Include real, runnable examples
- Use tables for structured data (parameters, options, config)
- Keep README under 300 lines for libraries, up to 500 for full apps

## Output

Generate the appropriate documentation type based on context. If unclear, default to code-level documentation (JSDoc/docstrings).

Reference skills: `documentation-templates`, `clean-code`
