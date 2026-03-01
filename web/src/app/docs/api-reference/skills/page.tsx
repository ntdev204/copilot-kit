import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Skills Reference" };

const { prev, next } = getPrevNext("/docs/api-reference/skills");

const skills = [
  {
    name: "ai-engineering",
    category: "AI/ML",
    desc: "ML, DL, RL, DRL principles. Framework selection, model architecture, training, evaluation, deployment, MLOps.",
  },
  {
    name: "api-patterns",
    category: "Backend",
    desc: "REST vs GraphQL vs tRPC, response formats, versioning, pagination.",
  },
  {
    name: "app-builder",
    category: "Architecture",
    desc: "Full-stack app orchestrator. Creates applications from natural language. Coordinates agents.",
  },
  {
    name: "architecture",
    category: "Architecture",
    desc: "Architectural decision-making, requirements analysis, trade-off evaluation, ADR documentation.",
  },
  {
    name: "bash-linux",
    category: "Ops",
    desc: "Bash/Linux terminal patterns, piping, error handling, scripting.",
  },
  {
    name: "behavioral-modes",
    category: "Core",
    desc: "AI operational modes (brainstorm, implement, debug, review, teach, ship, orchestrate).",
  },
  {
    name: "brainstorming",
    category: "Core",
    desc: "Socratic questioning protocol + user communication. For complex requests or unclear requirements.",
  },
  {
    name: "clean-code",
    category: "Quality",
    desc: "Pragmatic coding standards — concise, direct, no over-engineering.",
  },
  {
    name: "code-review-checklist",
    category: "Quality",
    desc: "Code review guidelines covering code quality, security, and best practices.",
  },
  {
    name: "control-systems",
    category: "Robotics",
    desc: "PID control, fuzzy logic, LQR, MPC, sliding mode control system design.",
  },
  {
    name: "conventional-commits",
    category: "DX",
    desc: "Conventional Commits v1.0.0 spec, commit types, scope, breaking changes.",
  },
  {
    name: "database-design",
    category: "Backend",
    desc: "Schema design, indexing strategy, ORM selection, serverless databases.",
  },
  {
    name: "deployment-procedures",
    category: "Ops",
    desc: "Safe deployment workflows, rollback strategies, verification.",
  },
  {
    name: "documentation-templates",
    category: "DX",
    desc: "README, API docs, code comments, AI-friendly documentation templates.",
  },
  {
    name: "find-skills",
    category: "Core",
    desc: "Helps discover and install agent skills dynamically.",
  },
  {
    name: "frontend-design",
    category: "Frontend",
    desc: "Design thinking for web UI, components, layouts, color, typography.",
  },
  {
    name: "game-development",
    category: "Specialized",
    desc: "Game development orchestrator, routes to platform-specific skills.",
  },
  {
    name: "geo-fundamentals",
    category: "SEO",
    desc: "Generative Engine Optimization for AI search engines.",
  },
  {
    name: "i18n-localization",
    category: "DX",
    desc: "Internationalization patterns, translation management, RTL support.",
  },
  {
    name: "intelligent-routing",
    category: "Core",
    desc: "Automatic agent selection and intelligent task routing.",
  },
  {
    name: "iot-solutions",
    category: "Specialized",
    desc: "IoT architecture, hardware selection, communication protocols, cloud platforms.",
  },
  {
    name: "lint-and-validate",
    category: "Quality",
    desc: "Automatic quality control, linting, and static analysis procedures.",
  },
  {
    name: "mcp-builder",
    category: "Architecture",
    desc: "Model Context Protocol server building, tool design, resource patterns.",
  },
  {
    name: "mobile-design",
    category: "Mobile",
    desc: "Mobile-first design for iOS/Android. Touch interaction, platform conventions.",
  },
  {
    name: "nodejs-best-practices",
    category: "Backend",
    desc: "Node.js framework selection, async patterns, security, architecture.",
  },
  {
    name: "parallel-agents",
    category: "Core",
    desc: "Multi-agent orchestration patterns for independent tasks.",
  },
  {
    name: "performance-profiling",
    category: "Quality",
    desc: "Measurement, analysis, and optimization techniques.",
  },
  {
    name: "plan-writing",
    category: "Architecture",
    desc: "Structured task planning with breakdowns, dependencies, verification.",
  },
  {
    name: "powershell-windows",
    category: "Ops",
    desc: "PowerShell Windows patterns, operator syntax, error handling.",
  },
  {
    name: "python-patterns",
    category: "Backend",
    desc: "Python framework selection, async patterns, type hints, project structure.",
  },
  {
    name: "red-team-tactics",
    category: "Security",
    desc: "Red team tactics based on MITRE ATT&CK, attack phases, detection evasion.",
  },
  {
    name: "robotics-automation",
    category: "Robotics",
    desc: "Robot types, locomotion, sensor integration, PLC/SCADA, industrial automation.",
  },
  {
    name: "ros2-humble",
    category: "Robotics",
    desc: "ROS2 Humble nodes, topics, services, actions, lifecycle, simulation.",
  },
  {
    name: "rust-pro",
    category: "Backend",
    desc: "Rust 1.75+ modern async patterns, advanced type system.",
  },
  {
    name: "seo-fundamentals",
    category: "SEO",
    desc: "SEO fundamentals, E-E-A-T, Core Web Vitals, Google algorithm principles.",
  },
  {
    name: "server-management",
    category: "Ops",
    desc: "Process management, monitoring strategy, scaling decisions.",
  },
  {
    name: "systematic-debugging",
    category: "Quality",
    desc: "4-phase debugging methodology with root cause analysis and evidence-based verification.",
  },
  {
    name: "tailwind-patterns",
    category: "Frontend",
    desc: "Tailwind CSS v4 principles, CSS-first config, container queries, design tokens.",
  },
  {
    name: "tdd-workflow",
    category: "Quality",
    desc: "Test-Driven Development RED-GREEN-REFACTOR cycle.",
  },
  {
    name: "testing-patterns",
    category: "Quality",
    desc: "Unit, integration, E2E testing patterns and mocking strategies.",
  },
  {
    name: "vercel-react-best-practices",
    category: "Frontend",
    desc: "React and Next.js performance optimization. 57 rules across 8 categories.",
  },
  {
    name: "vulnerability-scanner",
    category: "Security",
    desc: "OWASP 2025, supply chain security, attack surface mapping, risk prioritization.",
  },
  {
    name: "web-design-guidelines",
    category: "Frontend",
    desc: "Web Interface Guidelines compliance, accessibility, UX audit.",
  },
  {
    name: "webapp-testing",
    category: "Quality",
    desc: "Web application testing, E2E, Playwright, deep audit strategies.",
  },
];

const categories = [...new Set(skills.map((s) => s.category))].sort();

export default function SkillsPage() {
  return (
    <div>
      <DocHeader
        title="Skills Reference"
        description="All 45 domain skills available in copilot-kit — loaded on-demand based on request context."
        breadcrumbs={[
          { title: "API Reference", href: "/docs/api-reference" },
          { title: "Skills Reference" },
        ]}
      />

      <div className="space-y-6">
        {/* Category filter badges */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Badge key={cat} variant="outline" className="text-xs">
              {cat} ({skills.filter((s) => s.category === cat).length})
            </Badge>
          ))}
        </div>

        {/* Full table */}
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 text-left font-semibold text-xs">
                  Skill
                </th>
                <th className="px-4 py-2.5 text-left font-semibold text-xs">
                  Category
                </th>
                <th className="px-4 py-2.5 text-left font-semibold text-xs">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {skills.map((s) => (
                <tr
                  key={s.name}
                  className="text-muted-foreground hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <code className="font-mono text-xs text-foreground">
                      {s.name}
                    </code>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant="secondary" className="text-xs">
                      {s.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-xs leading-relaxed">
                    {s.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
