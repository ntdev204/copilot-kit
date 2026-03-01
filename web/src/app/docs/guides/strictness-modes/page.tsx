import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Strictness Modes" };

const { prev, next } = getPrevNext("/docs/guides/strictness-modes");

const modes = [
  {
    name: "FLUID",
    autoAt: "L0",
    gate: "Off",
    checklist: "None",
    color: "bg-green-500",
    desc: "Minimal overhead. Direct answers, no governance banners. Ideal for questions, explanations, and trivial code snippets.",
    example:
      "User: 'What is the difference between let and const?'\nCopilot: Concise direct answer. No headers, no risk classification.",
  },
  {
    name: "STANDARD",
    autoAt: "L1",
    gate: "If Axis D ≥ 2 → 1 question",
    checklist: "Security + lint only",
    color: "bg-blue-500",
    desc: "Optional one-line plan summary before code. Compact agent notice. Triggers a single clarifying question only when significant ambiguity is detected.",
    example:
      "User: 'Add a loading spinner to the button'\nCopilot: [Optional one-line intent summary]\n[Implementation]",
  },
  {
    name: "STANDARD+",
    autoAt: "L2",
    gate: "Max 2 focused questions",
    checklist: "Core (phases 1–3)",
    color: "bg-orange-500",
    desc: "Full structured 6-field output: Risk Classification, Intent Summary, Impact Analysis, Assumptions, Proposed Solution, Risk Mitigation, and a Validation Checklist.",
    example:
      "Risk Classification: L2 — Elevated | Score: 8/12 | Mode: STANDARD+\nIntent Summary: ...\nImpact Analysis: ...\nAssumptions: ...\nProposed Solution: ...\nRisk Mitigation: ...\nValidation Checklist: ...",
  },
  {
    name: "LOCKDOWN",
    autoAt: "L3",
    gate: "Full gate + confirm loop",
    checklist: "All 12 scripts (phases 1–5)",
    color: "bg-red-500",
    desc: "Maximum safety. 10-field deterministic output including Failure Modes, Required Safeguards, Implementation Plan, Rollback Plan, and Final Safety Confirmation (PROCEED / HOLD).",
    example:
      "Risk Classification: L3 — Critical | Score: 11/12 (A:3 B:3 C:2 D:3) | Mode: LOCKDOWN\n...\nFinal Safety Confirmation: HOLD — Migration is irreversible. Provide a rollback script before proceeding.",
  },
];

export default function StrictnessModesPage() {
  return (
    <div>
      <DocHeader
        title="Strictness Modes"
        description="How FLUID, STANDARD, STANDARD+, and LOCKDOWN modes control Copilot's response format, questioning, and validation."
        breadcrumbs={[
          { title: "Guides", href: "/docs/guides" },
          { title: "Strictness Modes" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Strictness modes are automatically set by the Risk Engine based on
            the computed risk level. They control three things: how much Copilot
            questions before acting, the output format schema, and which
            validation checklists run.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">The four modes</h2>
          <div className="space-y-4">
            {modes.map((mode) => (
              <div key={mode.name} className="rounded-lg border p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full ${mode.color} text-white font-bold text-xs`}
                  >
                    {mode.name[0]}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{mode.name}</p>
                    <Badge variant="outline" className="text-xs">
                      Auto at {mode.autoAt}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Gate: {mode.gate}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{mode.desc}</p>
                <div>
                  <p className="text-xs font-medium mb-1.5">Example output:</p>
                  <pre className="rounded bg-muted p-3 text-xs font-mono text-muted-foreground whitespace-pre-wrap overflow-x-auto">
                    {mode.example}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">User overrides</h2>
          <p className="text-sm text-muted-foreground">
            Override the auto-set mode at any point in a conversation:
          </p>
          <CodeBlock
            code={`"go fluid"     → FLUID mode (no governance headers)\n"standard+"    → STANDARD+ (structured output)\n"lockdown"     → LOCKDOWN (maximum safety, full 10-field output)`}
            language="text"
          />
          <Callout variant="warning" title="Safety is absolute">
            Overriding to FLUID does not disable safety rules. Meta Principles
            MP-1 (safety-first) and MP-5 (security-first) are non-negotiable
            regardless of strictness mode. Requesting secrets in code will
            always result in an L3 block.
          </Callout>
        </section>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
