# @ntdev204/copilot-kit

[![npm version](https://img.shields.io/npm/v/@ntdev204/copilot-kit?color=blue&label=npm)](https://www.npmjs.com/package/@ntdev204/copilot-kit)
[![npm downloads](https://img.shields.io/npm/dm/@ntdev204/copilot-kit?color=brightgreen)](https://www.npmjs.com/package/@ntdev204/copilot-kit)
[![license](https://img.shields.io/github/license/ntdev204/copilot-kit)](LICENSE)
[![Node.js](https://img.shields.io/node/v/@ntdev204/copilot-kit)](package.json)

> Scaffold a complete **GitHub Copilot configuration** into any project with one command.  
> Powered by the **Adaptive Governance Framework (AGF) v3.2** — a 5-layer AI governance system that turns GitHub Copilot into a structured, risk-aware coding partner.

```bash
# Scaffold .github/ for the first time
npx @ntdev204/copilot-kit init

# Check for updates & upgrade .github/ if behind
npx @ntdev204/copilot-kit update

# Show installation health & version info
npx @ntdev204/copilot-kit status
```

---

## What it does

Running `init` downloads the full `.github/` configuration from
[ntdev204/copilot-kit](https://github.com/ntdev204/copilot-kit) and places it in
your current project directory. GitHub Copilot picks it up automatically — no
extra settings required.

Without `copilot-kit`, Copilot answers questions. **With it**, Copilot applies
domain-specific skills, enforces coding standards, routes requests to the right
specialist agent, and self-validates its output against a risk engine.

---

## What gets created

```
.github/
├── copilot-instructions.md      ← AGF v3.2 — the brain of the whole system
├── skills/                      ← 40+ domain skill files (loaded on-demand)
│   ├── clean-code/
│   ├── frontend-design/
│   ├── api-patterns/
│   ├── systematic-debugging/
│   ├── ai-engineering/
│   ├── database-design/
│   ├── testing-patterns/
│   └── ... (40+ skills total)
├── rules/                       ← 11 governance rule files (identity → conflict)
├── prompts/                     ← 8 reusable prompt templates
│   ├── fix-error.prompt.md
│   ├── generate-tests.prompt.md
│   ├── refactor.prompt.md
│   ├── code-review.prompt.md
│   └── ...
├── agent/                       ← Agent mode definitions (debug, deploy, plan…)
├── scripts/                     ← Validation & automation scripts
│   ├── checklist.py
│   ├── verify_all.py
│   └── session_manager.py
├── ARCHITECTURE.md              ← System architecture overview
└── CODEBASE.md                  ← Codebase conventions & map
```

---

## Requirements

| Requirement | Version  |
| ----------- | -------- |
| Node.js     | ≥ 22     |
| npm / npx   | any      |
| Internet    | required |

---

## Usage

| Command                            | Description                                        |
| ---------------------------------- | -------------------------------------------------- |
| `npx @ntdev204/copilot-kit init`   | Scaffold `.github/` into the current project       |
| `npx @ntdev204/copilot-kit update` | Check for a newer version and upgrade if available |
| `npx @ntdev204/copilot-kit status` | Show installation health and version info          |

```bash
# First-time setup
npx @ntdev204/copilot-kit init

# Keep .github/ current (safe — asks before overwriting)
npx @ntdev204/copilot-kit update

# Inspect installation
npx @ntdev204/copilot-kit status
```

**`init` on an existing project** — the CLI will ask before overwriting:

```
?  Overwrite existing .github/? (y/N)
```

**`update`** — compares your local SHA against the remote HEAD. If behind, shows the diff and prompts:

```
ℹ  Current : abc1234
ℹ  Latest  : e339ca5  ← new version available

?  Update .github/ to the latest version? (y/N)
```

---

## After installation

Open the project in **VS Code** and start a Copilot Chat session. The framework
activates automatically. Try any of the built-in prompt templates to see it in
action:

| What you type    | What happens                                                                |
| ---------------- | --------------------------------------------------------------------------- |
| `fix this error` | `fix-error.prompt.md` + `systematic-debugging` skill activated              |
| `generate tests` | `generate-tests.prompt.md` + `testing-patterns` skill activated             |
| `refactor this`  | `refactor.prompt.md` + `clean-code` skill activated                         |
| `review my UI`   | `web-design-guidelines` + `frontend-design` skill activated                 |
| `/debug`         | Full debug agent mode with 4-phase methodology                              |
| `/plan`          | Project planning agent — analysis → planning → solutioning → implementation |

---

## How it works

The package ships a small Node.js CLI split across focused modules under `src/`:

```
bin/cli.js          ← 22-line dispatch entry point
src/
  constants.js      ← shared constants (version read from package.json)
  ui.js             ← ANSI colours, spinner, banner, box/section/log helpers
  net.js            ← fetchTarball(), fetchJSON()
  store.js          ← SHA read/write/fetch helpers
  scaffold.js       ← shared downloadAndExtract() logic
  commands/
    init.js         ← copilot-kit init
    update.js       ← copilot-kit update
    status.js       ← copilot-kit status
    help.js         ← usage / help screen
```

At `init` time it fetches the GitHub tarball from `ntdev204/copilot-kit@main`,
gunzips it, and extracts only the `.github/` subtree into your project.

This means:

- The npm package stays tiny and rarely needs a new release
- `update` compares a locally stored SHA against the remote HEAD — no unnecessary re-downloads
- No `.github/` content is ever bundled into the npm tarball

---

## Contributing

1. Fork the repo and create a branch: `git checkout -b feat/my-skill`
2. Add your skill or fix under `.github/skills/` or `.github/rules/`
3. Open a pull request against `main` — describe what the skill does and when it activates

Please follow the existing file format for skill files (frontmatter + sections).

---

## License

MIT © [ntdev204](https://github.com/ntdev204)
