import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Rules Reference" };

const { prev, next } = getPrevNext("/docs/api-reference/rules");

const rules = [
  {
    n: "01",
    name: "identity",
    title: "Identity",
    desc: "Defines the agent's persona, voice, and core identity as a structured AGF-governed coding partner.",
  },
  {
    n: "02",
    name: "task-classification",
    title: "Task Classification",
    desc: "Maps request types to starting risk scores. QUESTION: 0 (L0), SURVEY: 2 (L0), SIMPLE EDIT: 4 (L1), COMPLEX BUILD: 7 (L2), DEPLOY: 10 (L3).",
  },
  {
    n: "03",
    name: "operational-modes",
    title: "Operational Modes",
    desc: "Defines consulting, build, debug, and optimize modes. Each mode has distinct behaviors and interaction patterns.",
  },
  {
    n: "04",
    name: "technical-standards",
    title: "Technical Standards",
    desc: "Code quality standards: SRP, DRY, KISS, YAGNI. Functions ≤20 lines, ≤3 args. Test pyramid (Unit > Integration > E2E).",
  },
  {
    n: "05",
    name: "security",
    title: "Security",
    desc: "Security-first rules. Secrets never hardcoded. 5-phase deploy gate. OWASP compliance. Supply chain security checks.",
  },
  {
    n: "06",
    name: "communication",
    title: "Communication",
    desc: "Response format, tone, and language guidelines. Respond in user's language, code stays in English.",
  },
  {
    n: "07",
    name: "planning",
    title: "Planning",
    desc: "Plan Mode phases: ANALYSIS → PLANNING → SOLUTIONING → IMPLEMENTATION. No code before Phase 4.",
  },
  {
    n: "08",
    name: "context-management",
    title: "Context Management",
    desc: "How to read ARCHITECTURE.md and CODEBASE.md. Lazy loading, progressive disclosure, and context economy.",
  },
  {
    n: "09",
    name: "error-handling",
    title: "Error Handling",
    desc: "How to handle ambiguous requests, missing context, and recoverable vs irrecoverable situations.",
  },
  {
    n: "10",
    name: "checklists",
    title: "Checklists",
    desc: "5-phase deploy gate scripts. Post-action validation. Final checklist trigger conditions.",
  },
  {
    n: "11",
    name: "conflict-resolution",
    title: "Conflict Resolution",
    desc: "Priority tiers P0–P4. Deterministic override rules for all conflict types. Safety rules at P0 are absolute.",
  },
];

export default function RulesPage() {
  return (
    <div>
      <DocHeader
        title="Rules Reference"
        description="All 11 governance rules that form the backbone of the AGF enforcement system."
        breadcrumbs={[
          { title: "API Reference", href: "/docs/api-reference" },
          { title: "Rules Reference" },
        ]}
      />

      <div className="space-y-3">
        {rules.map((rule) => (
          <div key={rule.n} className="flex gap-4 rounded-lg border p-4">
            <div className="shrink-0">
              <Badge variant="outline" className="font-mono text-xs">
                {rule.n}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{rule.title}</p>
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-muted-foreground">
                  {rule.n}-{rule.name}.md
                </code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {rule.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
