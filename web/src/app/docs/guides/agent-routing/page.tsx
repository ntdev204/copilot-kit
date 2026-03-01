import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Agent Routing" };

const { prev, next } = getPrevNext("/docs/guides/agent-routing");

const agentMap = [
  {
    domain: "Mobile (iOS, Android, RN, Flutter)",
    agent: "mobile-developer",
    skills: "mobile-design",
  },
  {
    domain: "Web / Next.js / React",
    agent: "frontend-specialist",
    skills: "frontend-design",
  },
  {
    domain: "API / Backend / DB",
    agent: "backend-specialist",
    skills: "api-patterns, database-design",
  },
  {
    domain: "Security / Auth / Secrets",
    agent: "security-auditor",
    skills: "vulnerability-scanner",
  },
  {
    domain: "Multi-domain / Orchestration",
    agent: "orchestrator",
    skills: "Per sub-agent",
  },
  {
    domain: "Planning / Architecture",
    agent: "project-planner",
    skills: "plan-writing",
  },
  {
    domain: "Debug / Investigation",
    agent: "debugger",
    skills: "clean-code, domain skill",
  },
  { domain: "AI / ML / DL", agent: "ml-engineer", skills: "ai-engineering" },
];

export default function AgentRoutingPage() {
  return (
    <div>
      <DocHeader
        title="Agent Routing"
        description="How copilot-kit detects the domain of your request and routes it to the right specialist agent."
        breadcrumbs={[
          { title: "Guides", href: "/docs/guides" },
          { title: "Agent Routing" },
        ]}
      />

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How routing works</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Agent routing is{" "}
            <strong className="text-foreground">silent and automatic</strong>.
            The Risk Engine analyzes domain signals in your request (not just
            keywords — context-aware) and maps them to the best specialist
            agent. No extra commands or syntax required.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In FLUID and STANDARD mode, routing happens with no announcement. In
            STANDARD+ mode, a compact banner appears:{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              [frontend applied]
            </code>
            . In LOCKDOWN, the full agent header is shown.
          </p>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Domain → Agent mapping</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">
                    Domain signal
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">
                    Primary agent
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-xs">
                    Skills loaded
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y text-xs">
                {agentMap.map(({ domain, agent, skills }) => (
                  <tr key={agent} className="text-muted-foreground">
                    <td className="px-4 py-2.5">{domain}</td>
                    <td className="px-4 py-2.5">
                      <code className="font-mono">{agent}</code>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground/80">
                      {skills}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout variant="warning">
            <strong>Mobile ≠ frontend-specialist.</strong> Mobile requests
            always route to <code>mobile-developer</code>, not{" "}
            <code>frontend-specialist</code>. The domain detection disambiguates
            these automatically.
          </Callout>
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Explicit @agent override</h2>
          <p className="text-sm text-muted-foreground">
            Mention an agent explicitly with the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              @agent-name
            </code>{" "}
            syntax to bypass auto-routing:
          </p>
          <CodeBlock
            code={`@security-auditor Review this Express middleware for vulnerabilities\n\n@ml-engineer Help me choose between fine-tuning vs RAG for my use case\n\n@debugger Investigate why this React component re-renders 40 times on mount`}
            language="text"
          />
        </section>

        <Separator />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Multi-domain requests</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            When a request spans multiple domains, all matching agents are
            scored by keyword density. The top two collaborate, with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              orchestrator
            </code>{" "}
            coordinating if 3 or more agents are needed.
          </p>
          <div className="rounded-lg border p-4 text-sm space-y-2">
            <p className="font-medium">Example: Full-stack feature request</p>
            <p className="text-xs text-muted-foreground">
              <em>
                &quot;Add authentication to this Next.js app using Prisma and
                JWT&quot;
              </em>
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Badge variant="secondary" className="text-xs">
                frontend-specialist
              </Badge>
              <span className="text-muted-foreground text-xs self-center">
                +
              </span>
              <Badge variant="secondary" className="text-xs">
                backend-specialist
              </Badge>
              <span className="text-muted-foreground text-xs self-center">
                +
              </span>
              <Badge variant="secondary" className="text-xs">
                security-auditor
              </Badge>
              <span className="text-muted-foreground text-xs self-center">
                →
              </span>
              <Badge className="text-xs">orchestrator coordinates</Badge>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">All available agents</h2>
          <div className="flex flex-wrap gap-1.5">
            {[
              "orchestrator",
              "project-planner",
              "security-auditor",
              "backend-specialist",
              "frontend-specialist",
              "mobile-developer",
              "debugger",
              "ml-engineer",
              "game-developer",
            ].map((a) => (
              <Badge key={a} variant="outline" className="font-mono text-xs">
                {a}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
