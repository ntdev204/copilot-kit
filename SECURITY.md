# Security Policy

## Supported Versions

| Version | Supported         |
| ------- | ----------------- |
| 1.x     | ✅ Active support |
| < 1.0   | ❌ Not supported  |

---

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities privately via one of these channels:

- **GitHub Security Advisories** (preferred):  
  [github.com/ntdev204/copilot-kit/security/advisories/new](https://github.com/ntdev204/copilot-kit/security/advisories/new)

- **Email**: reach out via the GitHub profile at [github.com/ntdev204](https://github.com/ntdev204)

### What to include

A useful report contains:

1. A description of the vulnerability and its potential impact
2. Steps to reproduce (or a minimal proof-of-concept)
3. The version(s) affected
4. Any suggested mitigations (optional but appreciated)

### Response timeline

| Stage                      | Target                 |
| -------------------------- | ---------------------- |
| Acknowledgement            | within 48 hours        |
| Initial triage             | within 5 business days |
| Fix shipped (if confirmed) | within 30 days         |

You will be credited in the release notes unless you prefer to remain anonymous.

---

## Scope

Issues within scope of this policy:

- Malicious or unexpected code execution triggered by the `init` command
- Supply-chain risks in the npm package itself (`bin/cli.js`, dependencies)
- Download/extraction behaviour that could overwrite unintended files outside the project directory
- Dependency vulnerabilities in `tar` or transitive packages

Out of scope:

- Vulnerabilities in GitHub Copilot itself (report to Microsoft/GitHub)
- Content of `.github/` configuration files (these are plain Markdown/text)
- Issues in third-party tools referenced by the scripts under `.github/scripts/`

---

## Security Design Notes

- The CLI only writes files under `.github/` relative to **`process.cwd()`** — it never traverses outside the current working directory
- The tarball is fetched over HTTPS from the official GitHub API (`api.github.com`) with redirect-following capped at 5 hops
- No credentials, tokens, or secrets are ever read, stored, or transmitted
- The npm package ships only `bin/cli.js` (4.7 kB) — the `.github/` content is never bundled; it is fetched from the public GitHub repo at runtime
