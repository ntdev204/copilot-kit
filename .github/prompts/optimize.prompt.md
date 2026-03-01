description: Optimize code for performance — profiling, bottleneck detection, and improvements
agent: edit

# Optimize Performance

Analyze and optimize the selected code (or current file) for performance.

## Process

1. **Profile** — Identify the bottleneck (don't optimize blindly)
2. **Measure** — Establish baseline metrics (time complexity, memory, bundle size)
3. **Optimize** — Apply targeted improvements
4. **Verify** — Confirm improvement without regression

## Common Optimizations

### Algorithmic

- Reduce time complexity (O(n²) → O(n log n))
- Use appropriate data structures (Map/Set vs Array for lookups)
- Eliminate unnecessary iterations

### Frontend

- Memoization (`useMemo`, `useCallback`, `React.memo`)
- Code splitting, lazy loading
- Virtual scrolling for large lists
- Image optimization, font subsetting

### Backend

- Database query optimization (indexes, query plans)
- Caching strategy (in-memory, Redis, CDN)
- Connection pooling, batch operations
- Async/parallel processing

### Bundle / Build

- Tree-shaking, dead code elimination
- Dynamic imports for heavy dependencies
- Compression (gzip, brotli)

## Output Format

```markdown
## ⚡ Optimization: [target]

### Bottleneck

[What's slow and why — with evidence]

### Before

[Original code with complexity annotation]

### After

[Optimized code with complexity annotation]

### Impact

- Time: [before] → [after]
- Memory: [before] → [after]
- Bundle: [before] → [after] (if applicable)
```

## Rules

- **Measure first** — No premature optimization
- **Readability matters** — Don't sacrifice clarity for marginal gains
- **Show tradeoffs** — Every optimization has a cost; document it

Reference skills: `performance-profiling`, `clean-code`
