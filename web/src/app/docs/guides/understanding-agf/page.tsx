import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Understanding AGF" };

const { prev, next } = getPrevNext("/docs/guides/understanding-agf");

const layers = [
  {
    n: "1",
    title: "Meta Principles",
    subtitle: "Always Active · Non-Negotiable",
    color: "bg-blue-500",
    desc: "10 immutable anchors that no other rule can override. Covers safety (never produce harmful output), scope (do exactly what is asked), security (never hardcode secrets), quality, reproducibility, and language mirroring.",
    examples: [
      "MP-1: Safety-first — hard block",
      "MP-5: Security-first deployment — secrets never hardcoded",
      "MP-8: Clarify before assuming when ambiguity > 0.4",
    ],
  },
  {
    n: "2",
    title: "Risk Engine",
    subtitle: "Silent · Per-Request",
    color: "bg-purple-500",
    desc: "Every request is scored on 4 axes (0–3 each), producing a total score 0–12. The score maps to a risk level: L0 Trivial, L1 Routine, L2 Elevated, or L3 Critical. This computation is internal — Copilot never narrates it.",
    examples: [
      "Axis A: Blast Radius (1 file → cross-repo)",
      "Axis B: Reversibility (trivially undone → irrecoverable)",
      "Axis C: Security Surface (none → critical path auth)",
      "Axis D: Ambiguity (fully specified → vague/contradictory)",
    ],
  },
  {
    n: "3",
    title: "Strictness Modes",
    subtitle: "Auto-Set by Risk · User-Overridable",
    color: "bg-orange-500",
    desc: "Four operational modes that control response format, Socratic questioning, agent banners, and validation checklist scope. Auto-set by the Risk Engine but overridable with plain English commands.",
    examples: [
      "FLUID (L0): No headers, compact response",
      "STANDARD (L1): Optional plan summary",
      "STANDARD+ (L2): Structured 6-field output",
      "LOCKDOWN (L3): Full 10-field deterministic output",
    ],
  },
  {
    n: "4",
    title: "Conflict Resolution",
    subtitle: "Priority Tiers P0–P4",
    color: "bg-green-500",
    desc: "When rules conflict, the Conflict Resolution Matrix determines the winner. Priority tiers are: P0 (governance rules) > P1 (agent frontmatter) > P2 (skills) > P3 (workflows) > P4 (user request). Safety rules at P0 are absolute.",
    examples: [
      "User request vs MP-1/MP-5 → Block + explain",
      "Two skills match same domain → Score by keyword density",
      "Style conflict → Apply user preference, log deviation",
    ],
  },
  {
    n: "4.5",
    title: "Response Format Contract",
    subtitle: "Output Schema by Risk Level",
    color: "bg-yellow-500",
    desc: "The output schema adapts to the final risk level. L0–L1 uses free-form prose. L2 requires 6 structured fields. L3 requires 10 fields including an explicit rollback plan and Final Safety Confirmation.",
    examples: [
      "L0–L1: Free-form, concise",
      "L2: Risk Classification, Intent, Impact, Assumptions, Solution, Mitigation",
      "L3: + Failure Modes, Safeguards, Implementation Plan, Rollback Plan",
    ],
  },
  {
    n: "5",
    title: "Validation Feedback Loop",
    subtitle: "Post-Action",
    color: "bg-red-500",
    desc: "After generating a response, Copilot scores it against the active Meta Principles and Strictness Mode. Violations surface as inline notes (L0–L1), Quality Flags (L2), or full blocks (L3). Breaking changes auto-elevate the score by +3.",
    examples: [
      "L0–L1 violation: ⚠ [MP-X]: [alternative]",
      "L2 violation: Quality Flag at response end",
      "L3 violation: Prepend warning, require confirm",
    ],
  },
];

export default function UnderstandingAGFPage() {
  return (
    <div>
      <DocHeader
        title="Understanding AGF"
        description="A complete walkthrough of the Adaptive Governance Framework v3.2 — the 5-layer system powering copilot-kit."
        breadcrumbs={[
          { title: "Guides", href: "/docs/guides" },
          { title: "Understanding AGF" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What is the AGF?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Adaptive Governance Framework (AGF) v3.2 is a risk-activated
            enforcement system embedded in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .github/copilot-instructions.md
            </code>
            . It runs silently on every GitHub Copilot request, scoring it for
            risk and adapting the response format, strictness, and validation
            accordingly.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The AGF has <strong className="text-foreground">5.5 layers</strong>{" "}
            (Layer 4.5 is the Response Format Contract). Each layer builds on
            the previous, creating a coherent system from safety rules to output
            schemas.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">The 5.5 Layers</h2>
          <div className="space-y-4">
            {layers.map((layer) => (
              <div key={layer.n} className="rounded-lg border p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full ${layer.color} text-white font-bold text-xs`}
                  >
                    {layer.n}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{layer.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {layer.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {layer.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {layer.examples.map((ex) => (
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
            ))}
          </div>
        </section>

        <Callout variant="info" title="The scoring is silent">
          The Risk Engine computation is internal. Copilot never says &quot;I am
          scoring your request on 4 axes.&quot; You only see the output — which
          adapts automatically to the computed risk level.
        </Callout>

        <Callout variant="tip" title="Learn about risk levels">
          Read the{" "}
          <a
            href="/docs/guides/risk-levels"
            className="underline underline-offset-4"
          >
            Risk Levels Explained
          </a>{" "}
          guide to understand exactly how L0–L3 scores are calculated and what
          they mean in practice.
        </Callout>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
