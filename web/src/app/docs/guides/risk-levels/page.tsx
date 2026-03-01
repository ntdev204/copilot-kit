import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Risk Levels Explained" };

const { prev, next } = getPrevNext("/docs/guides/risk-levels");

const levels = [
  {
    level: "L0",
    label: "Trivial",
    score: "0–3",
    mode: "FLUID",
    color: "bg-green-500",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-500/30",
    desc: "Proceed immediately. Compact response. No gate, no checklist, no headers.",
    examples: ["Explain a concept", "What is X?", "List examples of Y"],
  },
  {
    level: "L1",
    label: "Routine",
    score: "4–6",
    mode: "STANDARD",
    color: "bg-blue-500",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-500/30",
    desc: "Proceed with a one-line plan summary before code. Optional clarifying question if ambiguity is high.",
    examples: [
      "Fix a bug in one file",
      "Add a utility function",
      "Change a value",
    ],
  },
  {
    level: "L2",
    label: "Elevated",
    score: "7–9",
    mode: "STANDARD+",
    color: "bg-orange-500",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-500/30",
    desc: "If Axis D ≥ 2, ask one focused clarifying question. Show impact summary. Output uses structured 6-field schema.",
    examples: [
      "Refactor authentication module",
      "Implement new feature across files",
      "Database schema change",
    ],
  },
  {
    level: "L3",
    label: "Critical",
    score: "10–12",
    mode: "LOCKDOWN",
    color: "bg-red-500",
    textColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-500/30",
    desc: "Full LOCKDOWN mode. Max 2 Socratic questions. Require explicit confirm for irreversible actions. Full 10-field output schema.",
    examples: [
      "Deploy to production",
      "Hardcode a secret",
      "Cross-repo infrastructure change",
      "Irrecoverable data deletion",
    ],
  },
];

const axes = [
  {
    label: "A",
    name: "Blast Radius",
    values: [
      "0: 1 file",
      "1: 1 module",
      "2: Cross-module",
      "3: Cross-repo / infra",
    ],
  },
  {
    label: "B",
    name: "Reversibility",
    values: [
      "0: Trivially undone",
      "1: With git revert",
      "2: Migration needed",
      "3: Irrecoverable",
    ],
  },
  {
    label: "C",
    name: "Security Surface",
    values: [
      "0: None",
      "1: Indirect",
      "2: Direct (non-critical)",
      "3: Critical path (auth, secrets)",
    ],
  },
  {
    label: "D",
    name: "Ambiguity",
    values: [
      "0: Fully specified",
      "1: Minor gaps",
      "2: Significant gaps",
      "3: Vague / contradictory",
    ],
  },
];

export default function RiskLevelsPage() {
  return (
    <div>
      <DocHeader
        title="Risk Levels Explained"
        description="How the AGF Risk Engine scores every request from L0 Trivial to L3 Critical, and what happens at each level."
        breadcrumbs={[
          { title: "Guides", href: "/docs/guides" },
          { title: "Risk Levels Explained" },
        ]}
      />

      <div className="space-y-8">
        {/* Axes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Scoring Axes (0–3 each)</h2>
          <p className="text-sm text-muted-foreground">
            Every request is silently scored on 4 axes. Scores are summed (0–12
            total) to determine the risk level.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {axes.map((axis) => (
              <div key={axis.label} className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="size-6 justify-center rounded-full text-xs">
                    {axis.label}
                  </Badge>
                  <p className="font-medium text-sm">{axis.name}</p>
                </div>
                <ul className="space-y-0.5">
                  {axis.values.map((v) => (
                    <li key={v} className="text-xs text-muted-foreground">
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Callout variant="warning" title="Axis C = 3 elevation rule">
            If Axis C (Security Surface) = 3 AND total score ≤ 6, add +3 to the
            total. This ensures security-critical requests are never treated as
            routine.
          </Callout>
        </section>

        <Separator />

        {/* Levels */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Risk Levels</h2>
          <div className="space-y-4">
            {levels.map((l) => (
              <div
                key={l.level}
                className={`rounded-lg border ${l.borderColor} p-5 space-y-3`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-full ${l.color} text-white font-bold text-sm`}
                  >
                    {l.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className={`font-bold text-sm ${l.textColor}`}>
                        {l.label}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Score {l.score}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Mode: {l.mode}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {l.desc}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium mb-1.5">Examples:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {l.examples.map((ex) => (
                      <Badge
                        key={ex}
                        variant="outline"
                        className="text-xs font-normal"
                      >
                        {ex}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Overriding */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Overriding the risk level</h2>
          <p className="text-sm text-muted-foreground">
            You can override the automatically computed strictness mode at any
            time with plain English:
          </p>
          <CodeBlock
            code={`go fluid          # Force FLUID mode (no governance overhead)\nstandard+          # Force STANDARD+ (structured output)\nlockdown           # Force LOCKDOWN (maximum safety)`}
            language="bash"
          />
          <Callout variant="info">
            Overriding the mode changes the{" "}
            <strong>output format and strictness</strong>, but does not disable
            the Risk Engine&apos;s underlying scoring. Safety rules (MP-1, MP-5)
            are absolute and cannot be overridden by any mode.
          </Callout>
        </section>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
