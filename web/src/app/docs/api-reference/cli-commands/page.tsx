import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "CLI Commands" };

const { prev, next } = getPrevNext("/docs/api-reference/cli-commands");

export default function CliCommandsPage() {
  return (
    <div>
      <DocHeader
        title="CLI Commands"
        description="Complete reference for the @ntdev204/copilot-kit CLI."
        breadcrumbs={[
          { title: "API Reference", href: "/docs/api-reference" },
          { title: "CLI Commands" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            <code className="font-mono">copilot-kit init</code>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The only command. Scaffolds the complete{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .github/
            </code>{" "}
            configuration directory into the current working directory.
          </p>

          <div className="rounded-lg border p-5 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Package
                </p>
                <p className="font-mono text-xs">@ntdev204/copilot-kit</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Version
                </p>
                <p className="font-mono text-xs">1.0.0</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Node.js
                </p>
                <p className="font-mono text-xs">≥ 22</p>
              </div>
            </div>
          </div>

          <h3 className="text-base font-semibold">Syntax</h3>
          <CodeBlock code="npx @ntdev204/copilot-kit init" language="bash" />

          <h3 className="text-base font-semibold">Global install</h3>
          <CodeBlock
            code={`npm install -g @ntdev204/copilot-kit\ncopilot-kit init`}
            language="bash"
          />

          <h3 className="text-base font-semibold">Flags</h3>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">
                    Flag
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y">
                <tr>
                  <td className="px-4 py-2.5">
                    <code className="font-mono">—</code>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    No flags supported. Zero-config by design.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold">Behavior</h3>
          <div className="space-y-2 text-sm">
            {[
              {
                event: "No .github/ exists",
                action:
                  "Downloads tarball from main branch, extracts to .github/",
              },
              {
                event: ".github/ already exists",
                action: "Prompts: ⚠ .github/ already exists. Overwrite? (y/N)",
              },
              {
                event: "User confirms overwrite",
                action:
                  "Replaces entire .github/ directory with latest content",
              },
              { event: "User declines", action: "Exits without changes" },
              {
                event: "No args / unknown command",
                action: "Prints usage help",
              },
              {
                event: "Network error",
                action: "Exits with error message, no files modified",
              },
            ].map(({ event, action }) => (
              <div key={event} className="flex gap-4 rounded border p-3">
                <div className="w-48 shrink-0">
                  <p className="text-xs font-medium">{event}</p>
                </div>
                <p className="text-xs text-muted-foreground">{action}</p>
              </div>
            ))}
          </div>

          <h3 className="text-base font-semibold">Exit codes</h3>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-semibold">Code</th>
                  <th className="px-4 py-2 text-left font-semibold">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y text-muted-foreground">
                <tr>
                  <td className="px-4 py-2">
                    <code className="font-mono">0</code>
                  </td>
                  <td className="px-4 py-2">Success</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">
                    <code className="font-mono">1</code>
                  </td>
                  <td className="px-4 py-2">
                    Error (network failure, file system error)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold">Security</h3>
          <div className="space-y-1 text-sm">
            {[
              "Writes only to .github/ relative to process.cwd() — no path traversal",
              "All downloads over HTTPS from api.github.com",
              "No credentials, secrets, or tokens read, stored, or transmitted",
              "Uses tar@7.x (0 known vulnerabilities at 1.0.0 release)",
            ].map((note, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-muted-foreground text-xs"
              >
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                <span>{note}</span>
              </div>
            ))}
          </div>

          <Callout variant="info" title="Always-latest content">
            The CLI downloads from the{" "}
            <Badge variant="outline" className="text-xs font-mono">
              main
            </Badge>{" "}
            branch at runtime. Re-running <code>init</code> always gets the
            newest skills, rules, and prompts — no npm update needed for content
            changes.
          </Callout>
        </section>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
