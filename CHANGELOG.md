# Changelog

All notable changes to this project will be documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

_Changes staged for the next release will appear here._

---

## [1.1.0] — 2026-03-01

### Added

- `copilot-kit update` command — checks local SHA against `ntdev204/copilot-kit@main`, shows a diff, prompts the user before overwriting `.github/`
- `copilot-kit status` command — shows installation health, lists all components with item counts, compares local vs. remote SHA and surfaces an update banner when behind
- Animated spinner (10-frame Braille) during download/extract operations
- ASCII art banner rendered in an ANSI box on every command invocation
- Coloured section headers (`▸ Preflight`, `▸ Downloading`, …) with per-section accent colours
- Boxed success / warning / error verdict at the end of each command
- `✔ / ℹ / ⚠ / ✖` log-level prefixes with distinct colours across all output lines
- SHA tracking — after every `init` / `update` a `.github/.copilot-kit-sha` file is written so future `update` and `status` calls can compare against the remote HEAD

### Changed

- CLI source refactored from a single `bin/cli.js` (640 lines) into focused modules under `src/`:
  - `src/constants.js` — shared constants; `PKG_VERSION` now read dynamically from `package.json`
  - `src/ui.js` — ANSI palette, `box()`, `section()`, log helpers, spinner, banner
  - `src/net.js` — `fetchTarball()`, `fetchJSON()`
  - `src/store.js` — `readLocalSha()`, `writeLocalSha()`, `fetchLatestSha()`
  - `src/prompt.js` — `prompt()`
  - `src/scaffold.js` — shared `downloadAndExtract()` used by both `init` and `update`
  - `src/commands/{init,update,status,help}.js` — one file per command
  - `bin/cli.js` reduced to a 22-line dispatch shim
- `PKG_VERSION` is no longer hard-coded — it is read from `package.json` at runtime
- Help screen now lists all three commands in a padded table with colour-coded names and one-line descriptions, including usage examples for each
- `package.json` `files` field updated to include `src/`

### Fixed

- `update` no longer silently overwrites without user confirmation; it now requires explicit `y` approval after showing the old → new SHA diff

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

[Unreleased]: https://github.com/ntdev204/copilot-kit/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/ntdev204/copilot-kit/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ntdev204/copilot-kit/releases/tag/v1.0.0
