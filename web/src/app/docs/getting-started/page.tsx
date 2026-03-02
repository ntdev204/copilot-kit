import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  LayersIcon,
  PackageIcon,
  RouteIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";

export const metadata: Metadata = { title: "Introduction" };

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Adaptive Governance Framework",
    description:
      "5-layer AI governance system that scores every request for risk and adapts Copilot behavior accordingly.",
  },
  {
    icon: BrainCircuitIcon,
    title: "45 Domain Skills",
    description:
      "From frontend design to robotics, Rust to AI/ML — specialist skills loaded on-demand based on your request.",
  },
  {
    icon: LayersIcon,
    title: "Risk Engine",
    description:
      "Automatic L0–L3 risk scoring on 4 axes: blast radius, reversibility, security surface, and ambiguity.",
  },
  {
    icon: RouteIcon,
    title: "Intelligent Agent Routing",
    description:
      "Silently detects the domain and routes to the right specialist agent without any extra commands.",
  },
  {
    icon: PackageIcon,
    title: "Zero Config",
    description:
      "One command scaffolds everything. No config files, no flags, no environment variables needed.",
  },
  {
    icon: ZapIcon,
    title: "Always Latest",
    description:
      "Downloads the latest skills and rules at runtime — re-run init anytime to get updated content.",
  },
];

const { prev, next } = getPrevNext("/docs/getting-started");

export default function IntroductionPage() {
  return (
    <div>
      <DocHeader
        title="Introduction"
        description="What is copilot-kit, why it exists, and how it turns GitHub Copilot into a structured AI coding partner."
        breadcrumbs={[{ title: "Getting Started" }]}
      />

      <div className="prose-like space-y-8">
        {/* What is it */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What is copilot-kit?</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">copilot-kit</strong> is a CLI
            tool that scaffolds a complete{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              .github/
            </code>{" "}
            configuration into any project with a single command. Once
            installed, GitHub Copilot in VS Code picks up the configuration
            automatically — no extra extensions required.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Without copilot-kit, Copilot answers questions and suggests code.{" "}
            <strong className="text-foreground">With it</strong>, Copilot
            applies domain-specific skills, enforces clean code standards,
            routes requests to specialist agents, scores every task for risk,
            and self-validates output against governance rules.
          </p>
        </section>

        <Separator />

        {/* Comparison */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Before vs. After</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-semibold">
                    Without copilot-kit
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-primary">
                    With copilot-kit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Generic Q&A assistant", "Domain-aware specialist agents"],
                  ["No risk awareness", "L0–L3 risk scoring on every request"],
                  [
                    "One-size-fits-all responses",
                    "FLUID → LOCKDOWN strictness modes",
                  ],
                  [
                    "No coding standards enforcement",
                    "SRP, DRY, KISS, YAGNI enforced by default",
                  ],
                  [
                    "Manual debugging",
                    "4-phase systematic debugging methodology",
                  ],
                  [
                    "No deployment safety",
                    "5-phase deploy gate with security scans",
                  ],
                ].map(([before, after], i) => (
                  <tr key={i} className="text-muted-foreground">
                    <td className="px-4 py-2.5">{before}</td>
                    <td className="px-4 py-2.5 text-foreground">{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Separator />

        {/* Features */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Key features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <CardTitle className="text-sm">{title}</CardTitle>
                  </div>
                  <CardDescription className="text-xs leading-relaxed">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* AGF overview */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            The Adaptive Governance Framework
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The AGF v1.0 is the brain powering copilot-kit. It consists of 5
            layers that operate silently on every Copilot request:
          </p>
          <div className="space-y-2">
            {[
              {
                label: "Layer 1",
                title: "Meta Principles",
                desc: "10 immutable anchors (safety-first, scope-bound, clean code, security, reproducibility)",
              },
              {
                label: "Layer 2",
                title: "Risk Engine",
                desc: "Scores requests on 4 axes → L0 Trivial to L3 Critical",
              },
              {
                label: "Layer 3",
                title: "Strictness Modes",
                desc: "FLUID → STANDARD → STANDARD+ → LOCKDOWN, auto-set by risk level",
              },
              {
                label: "Layer 4",
                title: "Conflict Resolution",
                desc: "Priority tiers P0–P4 with deterministic override rules",
              },
              {
                label: "Layer 5",
                title: "Validation Loop",
                desc: "Post-action scoring against active constraints before responding",
              },
            ].map(({ label, title, desc }) => (
              <div key={label} className="flex gap-4 rounded-lg border p-3">
                <Badge variant="outline" className="h-fit shrink-0 text-xs">
                  {label}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Callout variant="tip" title="Ready to install?">
          Follow the{" "}
          <Link
            href="/docs/getting-started/installation"
            className="underline underline-offset-4"
          >
            Installation guide
          </Link>{" "}
          to set up copilot-kit in your project in under 2 minutes.
        </Callout>

        <div className="flex justify-start">
          <Button asChild>
            <Link href="/docs/getting-started/installation">
              Get started <ArrowRightIcon className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
