# @ntdev204/copilot-kit

> Scaffold a full **GitHub Copilot configuration** into any project with one command.

```bash
npx @ntdev204/copilot-kit init
```

---

## What it does

Running `init` downloads the complete `.github/` configuration from
[ntdev204/copilot-kit](https://github.com/ntdev204/copilot-kit) and places it in
your current project directory. GitHub Copilot picks it up automatically — no
extra settings required.

---

## What gets created

```
.github/
├── copilot-instructions.md      ← Adaptive Governance Framework (AGF) v3.2
├── skills/                      ← 40+ domain skill files
│   ├── clean-code/
│   ├── frontend-design/
│   ├── api-patterns/
│   ├── systematic-debugging/
│   └── ... (40+ skills)
├── rules/                       ← 11 governance rule files
├── prompts/                     ← 8 reusable prompt templates
│   ├── fix-error.prompt.md
│   ├── generate-tests.prompt.md
│   ├── refactor.prompt.md
│   └── ...
├── agent/                       ← Agent mode definitions (debug, deploy, plan …)
├── scripts/                     ← Validation & automation scripts
├── ARCHITECTURE.md
└── CODEBASE.md
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

```bash
# Inside any project directory:
npx @ntdev204/copilot-kit init
```

If `.github/` already exists the CLI will ask for confirmation before
overwriting:

```
⚠  .github/ already exists. Overwrite? (y/N):
```

---

## How it works

The package itself is intentionally tiny — it only ships the CLI (`bin/cli.js`).
On `init`, it fetches the GitHub tarball for `main` at runtime, gunzips it, and
extracts only the `.github/` subtree into your project. This means you always get
the **latest configuration** without a new npm release.

---

## License

MIT © [ntdev204](https://github.com/ntdev204)
