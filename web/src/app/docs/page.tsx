import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CommandIcon,
  ZapIcon,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sections = [
  {
    icon: ZapIcon,
    title: "Getting Started",
    description:
      "Install copilot-kit and run your first init in under 2 minutes.",
    href: "/docs/getting-started",
    cta: "Start here",
  },
  {
    icon: BookOpenIcon,
    title: "Guides",
    description:
      "Deep dives into AGF layers, risk levels, skills, and agent routing.",
    href: "/docs/guides",
    cta: "Explore guides",
  },
  {
    icon: CommandIcon,
    title: "API Reference",
    description:
      "Complete reference for CLI commands, skills, rules, prompts, and agent modes.",
    href: "/docs/api-reference",
    cta: "View reference",
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Everything you need to transform GitHub Copilot into a structured,
          risk-aware coding partner using the Adaptive Governance Framework.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map(({ icon: Icon, title, description, href, cta }) => (
          <Card
            key={href}
            className="group relative flex flex-col overflow-hidden transition-shadow hover:shadow-md"
          >
            <CardHeader className="flex-1 space-y-3 pb-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-5 text-primary" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {description}
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <Button variant="outline" size="sm" asChild className="gap-1.5">
                <Link href={href}>
                  {cta}
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick links */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Quick links</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            {
              title: "Installation",
              href: "/docs/getting-started/installation",
            },
            { title: "Quick Start", href: "/docs/getting-started/quick-start" },
            {
              title: "Understanding AGF",
              href: "/docs/guides/understanding-agf",
            },
            { title: "Risk Levels", href: "/docs/guides/risk-levels" },
            { title: "CLI Commands", href: "/docs/api-reference/cli-commands" },
            { title: "Skills Reference", href: "/docs/api-reference/skills" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center justify-between rounded-lg border p-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span>{link.title}</span>
              <ArrowRightIcon className="size-3.5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
