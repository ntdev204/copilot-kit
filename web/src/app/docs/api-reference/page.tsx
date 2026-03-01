import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { DocHeader } from "@/components/docs/doc-header";

export const metadata: Metadata = { title: "API Reference" };

const refs = [
  {
    title: "CLI Commands",
    desc: "The init command — flags, behavior, and output.",
    href: "/docs/api-reference/cli-commands",
  },
  {
    title: "Skills Reference",
    desc: "All 45 domain skills with descriptions and trigger keywords.",
    href: "/docs/api-reference/skills",
  },
  {
    title: "Rules Reference",
    desc: "All 11 governance rules from identity to conflict resolution.",
    href: "/docs/api-reference/rules",
  },
  {
    title: "Prompts Reference",
    desc: "All 8 prompt templates with parameters and examples.",
    href: "/docs/api-reference/prompts",
  },
  {
    title: "Agent Modes",
    desc: "All 12 agent modes including brainstorm, debug, deploy, and more.",
    href: "/docs/api-reference/agent-modes",
  },
];

export default function ApiReferencePage() {
  return (
    <div>
      <DocHeader
        title="API Reference"
        description="Complete reference documentation for all copilot-kit CLI commands, skills, rules, prompts, and agent modes."
        breadcrumbs={[{ title: "API Reference" }]}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {refs.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group flex flex-col gap-1.5 rounded-lg border p-4 transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">{r.title}</p>
              <ArrowRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {r.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
