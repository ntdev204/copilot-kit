import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Installation" };

const { prev, next } = getPrevNext("/docs/getting-started/installation");

export default function InstallationPage() {
  return (
    <div>
      <DocHeader
        title="Installation"
        description="Install copilot-kit in your project using npx or as a global CLI tool."
        breadcrumbs={[
          { title: "Getting Started", href: "/docs/getting-started" },
          { title: "Installation" },
        ]}
      />

      <div className="space-y-8">
        {/* Prerequisites */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Prerequisites</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">✓</span>
              <span>
                <strong className="text-foreground">Node.js ≥ 22</strong> —
                required for the CLI runtime
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">✓</span>
              <span>
                <strong className="text-foreground">
                  GitHub Copilot extension
                </strong>{" "}
                in VS Code (free or paid plan)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-primary">✓</span>
              <span>
                <strong className="text-foreground">Internet connection</strong>{" "}
                — the CLI downloads content from GitHub at runtime
              </span>
            </li>
          </ul>
        </section>

        <Separator />

        {/* Method 1 — npx */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Option A: Use with npx (recommended)
          </h2>
          <p className="text-sm text-muted-foreground">
            No installation required. Run directly from npm:
          </p>
          <CodeBlock code="npx @ntdev204/copilot-kit init" language="bash" />
          <p className="text-sm text-muted-foreground">
            This downloads and runs the latest version every time. Ideal for
            one-time use or when you want to always use the newest release.
          </p>
        </section>

        <Separator />

        {/* Method 2 — global */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Option B: Install globally</h2>
          <p className="text-sm text-muted-foreground">
            Install once, use anywhere:
          </p>
          <CodeBlock
            code={`npm install -g @ntdev204/copilot-kit\ncopilot-kit init`}
            language="bash"
          />
        </section>

        <Separator />

        {/* What happens */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What happens during init?</h2>
          <p className="text-sm text-muted-foreground">
            Running{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              init
            </code>{" "}
            downloads and extracts the following into your project&apos;s root:
          </p>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2.5 text-left font-semibold">Path</th>
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Contents
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                {[
                  [
                    ".github/copilot-instructions.md",
                    "AGF v3.2 — the core governance brain",
                  ],
                  [".github/skills/", "45 domain skill files loaded on-demand"],
                  [".github/rules/", "11 governance rule files"],
                  [".github/prompts/", "8 reusable prompt templates"],
                  [".github/agent/", "12 agent mode definitions"],
                  [".github/scripts/", "Validation & automation scripts"],
                  [".github/ARCHITECTURE.md", "System architecture overview"],
                  [".github/CODEBASE.md", "Codebase conventions & map"],
                ].map(([path, desc]) => (
                  <tr key={path}>
                    <td className="px-4 py-2">
                      <code className="text-xs font-mono">{path}</code>
                    </td>
                    <td className="px-4 py-2 text-xs">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Overwrite prompt */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Existing .github/ directory</h2>
          <p className="text-sm text-muted-foreground">
            If a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              .github/
            </code>{" "}
            directory already exists, the CLI prompts before overwriting:
          </p>
          <CodeBlock
            code={`⚠  .github/ already exists. Overwrite? (y/N)`}
            language="bash"
          />
          <Callout variant="warning" title="Backup your customizations">
            If you have custom <code>.github/</code> rules or workflows, back
            them up before running init again. The tool overwrites the entire
            directory.
          </Callout>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Troubleshooting</h2>
          <div className="space-y-3 text-sm">
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-medium">
                <code className="text-xs font-mono">
                  npx: command not found
                </code>
              </p>
              <p className="text-muted-foreground">
                Ensure Node.js ≥ 22 is installed. Run{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  node --version
                </code>{" "}
                to check.
              </p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-medium">Network / download errors</p>
              <p className="text-muted-foreground">
                The CLI fetches from{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  api.github.com
                </code>
                . Check your internet connection and any corporate firewall or
                proxy settings.
              </p>
            </div>
            <div className="rounded-lg border p-4 space-y-1">
              <p className="font-medium">
                Copilot doesn&apos;t seem to use the new rules
              </p>
              <p className="text-muted-foreground">
                Reload VS Code after init (Ctrl+Shift+P → &quot;Developer:
                Reload Window&quot;). Copilot picks up{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  .github/copilot-instructions.md
                </code>{" "}
                automatically.
              </p>
            </div>
          </div>
        </section>

        <Callout variant="tip" title="Next step">
          Follow the Quick Start guide to run your first governed Copilot
          session.
        </Callout>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
