import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Custom Prompts" };

const { prev, next } = getPrevNext("/docs/guides/custom-prompts");

const prompts = [
  {
    name: "fix-error",
    desc: "Diagnose and fix an error with root cause analysis. Activates systematic-debugging skill.",
    example:
      "/fix-error\n\nTypeError: Cannot read properties of undefined (reading 'map')\n  at ProductList.tsx:23",
  },
  {
    name: "generate-tests",
    desc: "Generate comprehensive tests following the AAA pattern. Activates tdd-workflow + testing-patterns.",
    example:
      "/generate-tests\n\nfunction calculateDiscount(price: number, percentage: number): number",
  },
  {
    name: "refactor",
    desc: "Refactor code for readability, maintainability, and adherence to clean code principles.",
    example: "/refactor\n\n[paste code to refactor]",
  },
  {
    name: "code-review",
    desc: "Perform a comprehensive code review using the code-review-checklist skill.",
    example: "/code-review\n\n[paste code or PR diff]",
  },
  {
    name: "explain",
    desc: "Explain code, concepts, or patterns in depth with examples.",
    example:
      "/explain\n\nWhat is the difference between useCallback and useMemo in React?",
  },
  {
    name: "optimize",
    desc: "Profile and optimize code for performance. Activates performance-profiling skill.",
    example: "/optimize\n\n[paste performance-critical code]",
  },
  {
    name: "document",
    desc: "Generate professional documentation (JSDoc, README sections, API docs).",
    example:
      "/document\n\nexport function parseSearchParams(url: string): Record<string, string>",
  },
  {
    name: "new-skill",
    desc: "Scaffold a new skill file with the correct structure for your .github/skills/ directory.",
    example: "/new-skill graphql-patterns",
  },
];

export default function CustomPromptsPage() {
  return (
    <div>
      <DocHeader
        title="Custom Prompts"
        description="Using copilot-kit's 8 built-in prompt templates to accelerate common development workflows."
        breadcrumbs={[
          { title: "Guides", href: "/docs/guides" },
          { title: "Custom Prompts" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What are prompt templates?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Prompt templates are pre-built{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .prompt.md
            </code>{" "}
            files in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .github/prompts/
            </code>
            . They automatically activate the relevant skills, set the
            appropriate strictness mode, and structure the request in the
            optimal way for each workflow.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In VS Code, use them via the Copilot Chat prompt picker (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              /
            </code>{" "}
            in chat) or reference them by name.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Built-in templates</h2>
          <div className="space-y-4">
            {prompts.map((p) => (
              <div key={p.name} className="rounded-lg border p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="font-mono text-xs">/{p.name}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <div>
                  <p className="text-xs font-medium mb-1.5">Usage:</p>
                  <pre className="rounded bg-muted p-3 text-xs font-mono text-muted-foreground whitespace-pre-wrap">
                    {p.example}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Creating custom templates</h2>
          <p className="text-sm text-muted-foreground">
            Create your own prompt templates by adding{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .prompt.md
            </code>{" "}
            files to{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .github/prompts/
            </code>
            . Use the{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              /new-skill
            </code>{" "}
            prompt to scaffold one with the correct structure:
          </p>
          <CodeBlock
            code={`/new-skill my-framework-patterns`}
            language="bash"
          />
          <Callout variant="tip">
            Custom templates placed in <code>.github/prompts/</code> are picked
            up automatically by VS Code Copilot Chat — no configuration needed.
            They survive re-runs of <code>init</code> only if you add them to a
            separate location before overwriting.
          </Callout>
        </section>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
