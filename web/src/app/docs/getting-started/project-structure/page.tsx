import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Project Structure" };

const { prev, next } = getPrevNext("/docs/getting-started/project-structure");

const structure = [
  {
    path: ".github/",
    type: "dir",
    desc: "Root of all copilot-kit configuration",
  },
  {
    path: ".github/copilot-instructions.md",
    type: "file",
    desc: "AGF v3.2 core governance brain — the main instructions file Copilot reads",
  },
  {
    path: ".github/skills/",
    type: "dir",
    desc: "Domain skill files. Each skill is a SKILL.md loaded on-demand",
  },
  {
    path: ".github/skills/clean-code/SKILL.md",
    type: "file",
    desc: "Example: Clean code standards (SRP, DRY, KISS, YAGNI)",
  },
  {
    path: ".github/skills/frontend-design/SKILL.md",
    type: "file",
    desc: "Example: Frontend design principles for web UI",
  },
  {
    path: ".github/rules/",
    type: "dir",
    desc: "Governance rule files loaded by the Rule Engine",
  },
  {
    path: ".github/rules/01-identity.md",
    type: "file",
    desc: "Agent identity and persona rules",
  },
  {
    path: ".github/rules/11-conflict-resolution.md",
    type: "file",
    desc: "Conflict resolution between rules, user requests, and agents",
  },
  {
    path: ".github/prompts/",
    type: "dir",
    desc: "Reusable prompt templates (.prompt.md files)",
  },
  {
    path: ".github/agent/",
    type: "dir",
    desc: "Agent mode definitions (brainstorm, debug, create, etc.)",
  },
  {
    path: ".github/scripts/",
    type: "dir",
    desc: "Validation & automation scripts (security scans, lint, tests)",
  },
  {
    path: ".github/ARCHITECTURE.md",
    type: "file",
    desc: "System architecture overview — read by agents on first multi-file action",
  },
  {
    path: ".github/CODEBASE.md",
    type: "file",
    desc: "Codebase conventions map — how the project is structured",
  },
];

export default function ProjectStructurePage() {
  return (
    <div>
      <DocHeader
        title="Project Structure"
        description="A full walkthrough of every file and directory created by copilot-kit init."
        breadcrumbs={[
          { title: "Getting Started", href: "/docs/getting-started" },
          { title: "Project Structure" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            After running{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              npx @ntdev204/copilot-kit init
            </code>
            , the following directory structure is created in your project root:
          </p>
        </section>

        <section className="space-y-3">
          <div className="overflow-hidden rounded-lg border">
            <div className="border-b bg-muted/50 px-4 py-2.5">
              <span className="font-mono text-xs text-muted-foreground">
                Project root
              </span>
            </div>
            <div className="divide-y">
              {structure.map(({ path, type, desc }) => (
                <div key={path} className="flex gap-4 px-4 py-2.5 text-sm">
                  <div className="shrink-0 w-72">
                    <code
                      className={`font-mono text-xs ${
                        type === "dir"
                          ? "text-primary font-semibold"
                          : "text-foreground"
                      }`}
                    >
                      {path}
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            How Copilot reads these files
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GitHub Copilot in VS Code automatically reads{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              .github/copilot-instructions.md
            </code>{" "}
            on every request. This file contains the full AGF v3.2 framework.
            Skills in{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              .github/skills/
            </code>{" "}
            are loaded lazily — only when the request keywords match their
            domain. This keeps every response fast while enabling deep
            expertise.
          </p>

          <div className="space-y-2">
            {[
              {
                trigger: "Request mentions frontend/React/Next.js",
                loads:
                  "frontend-design, vercel-react-best-practices, tailwind-patterns",
              },
              {
                trigger: "Request mentions security/auth/secrets",
                loads: "security-auditor, vulnerability-scanner",
              },
              {
                trigger: "Request mentions database/schema/ORM",
                loads: "database-design, api-patterns",
              },
              {
                trigger: "Request mentions debug/investigate/trace",
                loads: "systematic-debugging, clean-code",
              },
            ].map(({ trigger, loads }) => (
              <div
                key={trigger}
                className="flex gap-3 rounded-lg border p-3 text-sm"
              >
                <span className="shrink-0 text-xs text-muted-foreground mt-0.5">
                  Trigger:
                </span>
                <div>
                  <p className="font-medium text-xs">{trigger}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    → Loads: <code className="font-mono">{loads}</code>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Callout variant="info" title="Customizing the structure">
          You can edit any file in <code>.github/</code> to customize behavior
          for your team. Add your own rules to <code>.github/rules/</code> or
          update <code>CODEBASE.md</code> with your project conventions.
          Re-running <code>init</code> will overwrite everything, so keep custom
          files in a separate location.
        </Callout>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
