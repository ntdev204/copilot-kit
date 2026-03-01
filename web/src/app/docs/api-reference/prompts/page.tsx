import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Prompts Reference" };

const { prev, next } = getPrevNext("/docs/api-reference/prompts");

const prompts = [
  {
    name: "fix-error",
    file: "fix-error.prompt.md",
    skills: ["systematic-debugging", "clean-code"],
    desc: "Systematically diagnose and fix errors using 4-phase debugging: Reproduce → Isolate → Root Cause → Fix.",
    params: ["Error message or stack trace", "Relevant code snippet"],
  },
  {
    name: "generate-tests",
    file: "generate-tests.prompt.md",
    skills: ["tdd-workflow", "testing-patterns"],
    desc: "Generate comprehensive tests following the AAA pattern (Arrange, Act, Assert). Covers unit, integration, and edge cases.",
    params: [
      "Function or component to test",
      "Test framework (optional, auto-detected)",
    ],
  },
  {
    name: "refactor",
    file: "refactor.prompt.md",
    skills: ["clean-code", "code-review-checklist"],
    desc: "Refactor code to improve readability, reduce complexity, and apply SRP/DRY/KISS/YAGNI principles.",
    params: ["Code to refactor", "Specific areas of concern (optional)"],
  },
  {
    name: "code-review",
    file: "code-review.prompt.md",
    skills: ["code-review-checklist", "vulnerability-scanner"],
    desc: "Comprehensive code review covering correctness, security, maintainability, and performance.",
    params: ["Code or PR diff to review"],
  },
  {
    name: "explain",
    file: "explain.prompt.md",
    skills: [],
    desc: "Explain code, concepts, or patterns with examples. Adapts depth to context (L0 Trivial for simple questions).",
    params: ["Code, concept, or error to explain"],
  },
  {
    name: "optimize",
    file: "optimize.prompt.md",
    skills: ["performance-profiling"],
    desc: "Profile and optimize code. Focuses on measurement-first approach — identify bottlenecks before optimizing.",
    params: ["Code to optimize", "Performance target or metric (optional)"],
  },
  {
    name: "document",
    file: "document.prompt.md",
    skills: ["documentation-templates"],
    desc: "Generate professional documentation: JSDoc, README sections, API docs, or inline comments.",
    params: ["Code or API to document", "Documentation format (optional)"],
  },
  {
    name: "new-skill",
    file: "new-skill.prompt.md",
    skills: ["find-skills"],
    desc: "Scaffold a new skill file with the correct SKILL.md structure for .github/skills/.",
    params: [
      "Skill name (e.g., graphql-patterns)",
      "Domain description (optional)",
    ],
  },
];

export default function PromptsPage() {
  return (
    <div>
      <DocHeader
        title="Prompts Reference"
        description="All 8 built-in prompt templates with parameters, activated skills, and usage details."
        breadcrumbs={[
          { title: "API Reference", href: "/docs/api-reference" },
          { title: "Prompts Reference" },
        ]}
      />

      <div className="space-y-4">
        {prompts.map((p) => (
          <div key={p.name} className="rounded-lg border p-5 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className="font-mono text-xs">/{p.name}</Badge>
              <code className="text-xs text-muted-foreground font-mono">
                {p.file}
              </code>
            </div>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div>
                <p className="font-medium mb-1.5">Parameters</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {p.params.map((param, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-primary shrink-0">·</span>
                      <span>{param}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1.5">Activates skills</p>
                {p.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {p.skills.map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className="font-mono text-xs"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Domain auto-detected</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
