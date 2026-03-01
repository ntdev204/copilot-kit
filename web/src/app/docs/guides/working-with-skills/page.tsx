import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Working with Skills" };

const { prev, next } = getPrevNext("/docs/guides/working-with-skills");

const skillCategories = [
  {
    category: "Code Quality",
    skills: [
      "clean-code",
      "code-review-checklist",
      "tdd-workflow",
      "testing-patterns",
      "lint-and-validate",
    ],
  },
  {
    category: "Frontend",
    skills: [
      "frontend-design",
      "tailwind-patterns",
      "vercel-react-best-practices",
      "web-design-guidelines",
      "seo-fundamentals",
      "geo-fundamentals",
    ],
  },
  {
    category: "Backend & API",
    skills: [
      "api-patterns",
      "database-design",
      "nodejs-best-practices",
      "python-patterns",
      "rust-pro",
    ],
  },
  {
    category: "AI & ML",
    skills: ["ai-engineering", "ml-patterns"],
  },
  {
    category: "Mobile",
    skills: ["mobile-design"],
  },
  {
    category: "Systems & Robotics",
    skills: [
      "ros2-humble",
      "robotics-automation",
      "iot-solutions",
      "control-systems",
    ],
  },
  {
    category: "Security",
    skills: ["vulnerability-scanner", "red-team-tactics"],
  },
  {
    category: "Infrastructure & Ops",
    skills: [
      "deployment-procedures",
      "server-management",
      "bash-linux",
      "powershell-windows",
    ],
  },
  {
    category: "Architecture & Planning",
    skills: [
      "architecture",
      "plan-writing",
      "parallel-agents",
      "app-builder",
      "mcp-builder",
    ],
  },
  {
    category: "Developer Experience",
    skills: [
      "systematic-debugging",
      "performance-profiling",
      "conventional-commits",
      "i18n-localization",
      "documentation-templates",
      "brainstorming",
      "behavioral-modes",
      "game-development",
      "intelligent-routing",
      "find-skills",
      "webapp-testing",
    ],
  },
];

export default function WorkingWithSkillsPage() {
  return (
    <div>
      <DocHeader
        title="Working with Skills"
        description="How copilot-kit's 45 domain skills are loaded on-demand and how to get the most out of them."
        breadcrumbs={[
          { title: "Guides", href: "/docs/guides" },
          { title: "Working with Skills" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How skills work</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Skills are domain-specific knowledge files stored in{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              .github/skills/
            </code>
            . Each skill has a{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              SKILL.md
            </code>{" "}
            containing detailed instructions, examples, and best practices for
            its domain.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Skills are{" "}
            <strong className="text-foreground">lazily loaded</strong> — they
            are only read when the request keywords match the skill&apos;s
            domain signals. This keeps responses fast while enabling deep
            expertise when needed.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Skill loading protocol</h2>
          <div className="space-y-2">
            {[
              { step: "1", text: "Agent is activated by the Risk Engine" },
              {
                step: "2",
                text: "Agent checks the request for domain keywords",
              },
              {
                step: "3",
                text: "Matching skills are identified by their description field",
              },
              {
                step: "4",
                text: "Only the matching sections of SKILL.md are read (selective reading)",
              },
              {
                step: "5",
                text: "ARCHITECTURE.md is read on first multi-file or cross-module action",
              },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3 text-sm">
                <Badge
                  variant="secondary"
                  className="size-5 shrink-0 justify-center rounded-full p-0 text-xs"
                >
                  {step}
                </Badge>
                <p className="text-muted-foreground mt-0.5">{text}</p>
              </div>
            ))}
          </div>
          <Callout variant="info">
            Bulk-reading skill folders is prohibited. Skills stay dormant until
            request keywords match their <code>description</code> field. This
            prevents context bloat from irrelevant knowledge.
          </Callout>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All 45 skills</h2>
          <div className="space-y-4">
            {skillCategories.map(({ category, skills }) => (
              <div key={category}>
                <p className="mb-2 text-sm font-medium">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="font-mono text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">
            Triggering skills explicitly
          </h2>
          <p className="text-sm text-muted-foreground">
            While skills fire automatically, you can name a skill explicitly in
            your request to guarantee it loads:
          </p>
          <div className="space-y-2 text-sm">
            {[
              {
                trigger: 'Mention "security audit" or "vulnerabilities"',
                loads: "vulnerability-scanner skill",
              },
              {
                trigger: 'Mention "architecture" or "system design"',
                loads: "architecture skill",
              },
              {
                trigger: 'Mention "test" or "TDD" or "coverage"',
                loads: "tdd-workflow + testing-patterns",
              },
              {
                trigger: 'Mention "deploy" or "production" or ".env"',
                loads: "deployment-procedures (L3 gate)",
              },
            ].map(({ trigger, loads }) => (
              <div key={trigger} className="flex gap-3 rounded border p-3">
                <span className="text-xs text-muted-foreground shrink-0">
                  If you
                </span>
                <div>
                  <p className="text-xs font-medium">{trigger}</p>
                  <p className="text-xs text-muted-foreground">→ {loads}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
