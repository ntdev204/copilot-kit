import Link from "next/link";
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  CommandIcon,
  GithubIcon,
  LayersIcon,
  PackageIcon,
  RouteIcon,
  ShieldCheckIcon,
  TerminalIcon,
  ZapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { VERSION } from "@/lib/version";

const features = [
  {
    icon: LayersIcon,
    title: "Adaptive Governance Framework",
    description:
      "5-layer system that scores every request for risk (L0–L3) and adapts response format, strictness, and validation accordingly.",
  },
  {
    icon: BrainCircuitIcon,
    title: "45 Domain Skills",
    description:
      "From frontend design to robotics, Rust to AI/ML — specialist knowledge loaded on-demand based on your request context.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Risk Engine",
    description:
      "Silent per-request scoring on 4 axes: blast radius, reversibility, security surface, and ambiguity. Auto-elevates security-critical requests.",
  },
  {
    icon: RouteIcon,
    title: "Intelligent Routing",
    description:
      "Automatically detects your request domain and routes to the right specialist agent — no extra syntax required.",
  },
  {
    icon: PackageIcon,
    title: "Zero Config",
    description:
      "One command, no flags, no environment variables. Works with GitHub Copilot in VS Code out of the box.",
  },
  {
    icon: ZapIcon,
    title: "Always Latest",
    description:
      "Downloads fresh content from GitHub at runtime. Re-run init anytime to get the newest skills and rules.",
  },
];

const stats = [
  { label: "Domain Skills", value: "45" },
  { label: "Governance Rules", value: "11" },
  { label: "Prompt Templates", value: "8" },
  { label: "Agent Modes", value: "12" },
];

const allSkills = [
  "clean-code",
  "frontend-design",
  "api-patterns",
  "database-design",
  "ai-engineering",
  "systematic-debugging",
  "testing-patterns",
  "vulnerability-scanner",
  "ros2-humble",
  "rust-pro",
  "game-development",
  "iot-solutions",
  "control-systems",
  "robotics-automation",
  "mcp-builder",
  "tailwind-patterns",
  "python-patterns",
  "nodejs-best-practices",
  "architecture",
  "plan-writing",
  "mobile-design",
  "tdd-workflow",
  "performance-profiling",
  "deployment-procedures",
  "server-management",
  "bash-linux",
  "powershell-windows",
  "vercel-react-best-practices",
  "web-design-guidelines",
  "webapp-testing",
  "seo-fundamentals",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <PackageIcon className="size-4 text-primary" />
            copilot-kit
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            {[
              { label: "Docs", href: "/docs" },
              { label: "Guides", href: "/docs/guides" },
              { label: "API", href: "/docs/api-reference" },
            ].map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                asChild
                className="h-8 px-3 text-sm text-muted-foreground hover:text-foreground"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-9" asChild>
              <a
                href="https://github.com/ntdev204/copilot-kit"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GithubIcon className="size-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="mb-6 flex justify-center">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
            <ZapIcon className="size-3" />
            AGF v1.0 · 45 Skills · Zero Config
          </Badge>
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Transform GitHub Copilot
          <br />
          <span className="text-muted-foreground">
            into a structured partner
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          copilot-kit scaffolds a complete{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            .github/
          </code>{" "}
          configuration with the Adaptive Governance Framework — turning Copilot
          from a basic assistant into a risk-aware coding partner with 45 domain
          skills.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="gap-2 px-8">
            <Link href="/docs/getting-started">
              Get Started <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2 px-8">
            <a
              href="https://github.com/ntdev204/copilot-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="size-4" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Terminal */}
        <div className="mx-auto mt-12 max-w-lg overflow-hidden rounded-xl border bg-zinc-950 text-left shadow-xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
            <div className="size-3 rounded-full bg-red-500/70" />
            <div className="size-3 rounded-full bg-yellow-500/70" />
            <div className="size-3 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-xs text-zinc-500">
              Terminal
            </span>
          </div>
          <div className="space-y-1 p-4 font-mono text-sm">
            <p className="text-zinc-400">
              <span className="text-green-400">~</span>{" "}
              <span className="text-zinc-300">
                npx @ntdev204/copilot-kit init
              </span>
            </p>
            <p className="text-zinc-500">
              ✓ Downloading latest .github/ configuration...
            </p>
            <p className="text-zinc-500">
              ✓ Extracting 45 skills, 11 rules, 8 prompts...
            </p>
            <p className="text-green-400">
              ✓ Done! Copilot is now AGF-powered.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center space-y-1">
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Everything you need
          </h2>
          <p className="text-muted-foreground">
            One init command unlocks a complete AI governance system.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-border/60">
              <CardHeader className="space-y-2 pb-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <CardTitle className="text-sm">{title}</CardTitle>
                <CardDescription className="text-xs leading-relaxed">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* How it works */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <p className="text-muted-foreground">
            Three steps from zero to a governed Copilot session.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              icon: TerminalIcon,
              title: "Run init",
              desc: "npx @ntdev204/copilot-kit init — downloads and extracts the complete .github/ configuration.",
            },
            {
              step: "2",
              icon: PackageIcon,
              title: "Reload VS Code",
              desc: "Copilot automatically picks up .github/copilot-instructions.md on reload. No extension needed.",
            },
            {
              step: "3",
              icon: CommandIcon,
              title: "Code with Copilot",
              desc: "Every request is now risk-scored, domain-routed, and validated against 10 meta principles.",
            },
          ].map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="relative space-y-3 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full border-2 bg-background">
                <Icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Skills showcase */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-6 text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            45 Specialist Skills
          </h2>
          <p className="text-muted-foreground">
            Loaded on-demand. Never bloating your context.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {allSkills.map((skill) => (
            <Badge key={skill} variant="outline" className="font-mono text-xs">
              {skill}
            </Badge>
          ))}
          <Badge variant="secondary" className="text-xs">
            + 14 more
          </Badge>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">
          Ready to supercharge Copilot?
        </h2>
        <p className="mb-8 text-muted-foreground">
          One command. No configuration. Works immediately.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="gap-2 px-8">
            <Link href="/docs/getting-started">
              Read the docs <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2 px-8">
            <a
              href="https://www.npmjs.com/package/@ntdev204/copilot-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on NPM
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <PackageIcon className="size-4" />
            <span>copilot-kit v{VERSION} · MIT License</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <a
              href="https://github.com/ntdev204/copilot-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@ntdev204/copilot-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              NPM
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
