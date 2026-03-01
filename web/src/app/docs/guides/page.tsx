import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = { title: "Guides" };

const guides = [
  {
    title: "Understanding AGF",
    description: "Deep dive into the 5-layer Adaptive Governance Framework.",
    href: "/docs/guides/understanding-agf",
  },
  {
    title: "Risk Levels Explained",
    description: "L0–L3 risk levels, the 4 scoring axes, and how to override.",
    href: "/docs/guides/risk-levels",
  },
  {
    title: "Working with Skills",
    description: "How skills load on-demand and how to use all 45 of them.",
    href: "/docs/guides/working-with-skills",
  },
  {
    title: "Agent Routing",
    description: "Domain detection, specialist agents, and @agent overrides.",
    href: "/docs/guides/agent-routing",
  },
  {
    title: "Strictness Modes",
    description: "FLUID, STANDARD, STANDARD+, and LOCKDOWN modes explained.",
    href: "/docs/guides/strictness-modes",
  },
  {
    title: "Custom Prompts",
    description: "Using the 8 built-in prompt templates for common workflows.",
    href: "/docs/guides/custom-prompts",
  },
];

export default function GuidesPage() {
  return (
    <div>
      <DocHeader
        title="Guides"
        description="In-depth guides for every major feature of copilot-kit and the Adaptive Governance Framework."
        breadcrumbs={[{ title: "Guides" }]}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="group flex flex-col gap-1.5 rounded-lg border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{g.title}</p>
              <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
