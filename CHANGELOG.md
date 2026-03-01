# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

_Changes staged for the next release will appear here._

---

## [1.0.0] — 2026-03-01

### Added

- `npx @ntdev204/copilot-kit init` command — downloads and extracts `.github/` from the `main` branch of `ntdev204/copilot-kit` into the user's project
- Interactive overwrite prompt (`y/N`) when `.github/` already exists in the target directory
- Runtime tarball download via built-in `https` + `zlib` + `tar` — no bundling of `.github/` content in the npm package
- Automatic HTTPS redirect-following (up to 5 hops) to handle GitHub API → CDN redirects
- Clear success output listing all created directories after extraction
- Usage help printed when the CLI is invoked with no arguments or an unknown command
- `.github/copilot-instructions.md` — **Adaptive Governance Framework (AGF) v3.2** with 5-layer AI governance (Meta Principles → Risk Engine → Strictness Mode → Conflict Resolution → Validation Feedback Loop)
- 40+ domain skill files under `.github/skills/` (clean-code, frontend-design, api-patterns, systematic-debugging, ai-engineering, database-design, testing-patterns, and more)
- 11 governance rule files under `.github/rules/` (identity, task classification, consulting/build/debug/optimize modes, technical standards, communication, checklist, special situations, conflict resolution)
- 8 reusable prompt templates under `.github/prompts/` (fix-error, generate-tests, refactor, code-review, explain, optimize, document, new-skill)
- Agent mode definitions under `.github/agent/` (brainstorm, create, debug, deploy, enhance, orchestrate, plan, preview, test, ui-ux-pro-max)
- Validation & automation scripts under `.github/scripts/` (checklist, verify_all, session_manager, auto_preview)
- `ARCHITECTURE.md` and `CODEBASE.md` reference documents

### Security

- CLI writes only to `.github/` relative to `process.cwd()` — no path traversal possible
- All downloads over HTTPS from `api.github.com`
- No credentials or secrets are read, stored, or transmitted
- Upgraded from `tar@6.x` (known vulnerability) to `tar@7.x` (0 vulnerabilities at release)

---

[Unreleased]: https://github.com/ntdev204/copilot-kit/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ntdev204/copilot-kit/releases/tag/v1.0.0
