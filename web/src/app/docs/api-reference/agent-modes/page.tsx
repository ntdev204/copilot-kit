import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Agent Modes" };

const { prev, next } = getPrevNext("/docs/api-reference/agent-modes");

const modes = [
  {
    name: "brainstorm",
    file: "brainstorm.md",
    trigger: "Plan mode / complex questions",
    desc: "Socratic exploration mode. Asks structured clarifying questions before proposing solutions. Uses brainstorming + behavioral-modes skills.",
  },
  {
    name: "create",
    file: "create.md",
    trigger: "Build, implement, scaffold",
    desc: "Full implementation mode. Coordinates agents, checks CODEBASE.md, applies all quality rules. Offers task plan file for complex work.",
  },
  {
    name: "debug",
    file: "debug.md",
    trigger: "Error, investigate, trace, why",
    desc: "4-phase systematic debugging: Reproduce → Isolate → Root Cause → Fix. Evidence-based, never guesses.",
  },
  {
    name: "deploy",
    file: "deploy.md",
    trigger: "Deploy, production, release",
    desc: "Activates L3 LOCKDOWN. Runs full 5-phase gate: security scan → lint → tests → UX audit → performance. Requires explicit confirm.",
  },
  {
    name: "enhance",
    file: "enhance.md",
    trigger: "Improve, optimize, refactor, upgrade",
    desc: "Enhancement mode. Measure before changing. Risk Engine scores changes, applies rollback thinking for L2+.",
  },
  {
    name: "orchestrate",
    file: "orchestrate.md",
    trigger: "Multi-domain, cross-module, complex",
    desc: "Multi-agent coordination. Decomposes complex tasks, assigns to specialist agents in parallel, synthesizes results.",
  },
  {
    name: "plan",
    file: "plan.md",
    trigger: "Copilot Plan mode",
    desc: "4-phase planning: ANALYSIS → PLANNING → SOLUTIONING (no code) → IMPLEMENTATION. project-planner agent.",
  },
  {
    name: "preview",
    file: "preview.md",
    trigger: "Preview, show, demonstrate",
    desc: "Preview mode. Shows what would be done without making changes. Ideal for reviewing impact before committing.",
  },
  {
    name: "test",
    file: "test.md",
    trigger: "Test, coverage, spec, TDD",
    desc: "Testing-focused mode. Activates tdd-workflow + testing-patterns. AAA pattern, test pyramid, meaningful coverage.",
  },
  {
    name: "ui-ux-pro-max",
    file: "ui-ux-pro-max.md",
    trigger: "Design, UI, component, layout",
    desc: "Premium UI/UX mode. Activates frontend-design + web-design-guidelines. Accessibility, Core Web Vitals, design principles.",
  },
  {
    name: "rai",
    file: "rai.md",
    trigger: "AI safety, ethics, responsible AI",
    desc: "Responsible AI mode. Evaluates AI outputs for bias, fairness, safety, and ethical considerations.",
  },
  {
    name: "status",
    file: "status.md",
    trigger: "Status, progress, what did you do",
    desc: "Status reporting mode. Summarizes what was done, what remains, and any blockers in a structured format.",
  },
];

export default function AgentModesPage() {
  return (
    <div>
      <DocHeader
        title="Agent Modes"
        description="All 12 agent modes that define specialized behaviors for different development workflows."
        breadcrumbs={[
          { title: "API Reference", href: "/docs/api-reference" },
          { title: "Agent Modes" },
        ]}
      />

      <div className="space-y-3">
        {modes.map((mode) => (
          <div key={mode.name} className="flex gap-4 rounded-lg border p-4">
            <div className="shrink-0">
              <Badge variant="secondary" className="font-mono text-xs">
                {mode.name}
              </Badge>
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs text-muted-foreground">
                  .github/agent/{mode.file}
                </code>
                <span className="text-xs text-muted-foreground/70">
                  Trigger: {mode.trigger}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {mode.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
