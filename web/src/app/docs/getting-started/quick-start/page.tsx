import type { Metadata } from "next";
import { DocHeader } from "@/components/docs/doc-header";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { StepList, Step } from "@/components/docs/step-list";
import { PrevNextNav } from "@/components/docs/prev-next-nav";
import { getPrevNext } from "@/lib/docs-navigation";

export const metadata: Metadata = { title: "Quick Start" };

const { prev, next } = getPrevNext("/docs/getting-started/quick-start");

export default function QuickStartPage() {
  return (
    <div>
      <DocHeader
        title="Quick Start"
        description="From zero to a governed Copilot session in under 2 minutes."
        breadcrumbs={[
          { title: "Getting Started", href: "/docs/getting-started" },
          { title: "Quick Start" },
        ]}
      />

      <div className="space-y-8">
        <StepList>
          <Step title="Run init in your project root">
            <p>Open a terminal in your project directory and run:</p>
            <CodeBlock code="npx @ntdev204/copilot-kit init" language="bash" />
            <p>
              The CLI downloads the latest{" "}
              <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-xs">
                .github/
              </code>{" "}
              configuration from GitHub and extracts it into your project.
            </p>
          </Step>

          <Step title="Reload VS Code">
            <p>
              After init completes, reload VS Code so Copilot picks up the new
              instructions file:
            </p>
            <CodeBlock
              code="Ctrl+Shift+P → Developer: Reload Window"
              language="text"
            />
          </Step>

          <Step title="Open a Copilot Chat session">
            <p>
              Open GitHub Copilot Chat (Ctrl+Shift+I) and try a request that
              exercises the risk engine:
            </p>
            <CodeBlock
              code={`Refactor the authentication module to use JWT tokens instead of session cookies`}
              language="text"
            />
            <p>
              You&apos;ll notice Copilot now responds with a{" "}
              <strong>structured risk assessment</strong> before making any
              changes — this is the AGF L2 (Elevated) mode in action.
            </p>
          </Step>

          <Step title="Try a simple request (L0 Trivial)">
            <p>Ask Copilot something low-risk to see FLUID mode in action:</p>
            <CodeBlock
              code={`What is the difference between map() and forEach() in JavaScript?`}
              language="text"
            />
            <p>
              The response is concise and direct — no risk headers, no
              checklists. The Risk Engine scored this L0 Trivial and entered
              FLUID mode automatically.
            </p>
          </Step>

          <Step title="Activate a specialist agent">
            <p>
              Use the{" "}
              <code className="rounded bg-muted/80 px-1 py-0.5 font-mono text-xs">
                @agent
              </code>{" "}
              syntax to explicitly invoke a specialist:
            </p>
            <CodeBlock
              code={`@security-auditor Review this API endpoint for vulnerabilities:\n\napp.post('/login', (req, res) => {\n  const { username, password } = req.body\n  db.query(\`SELECT * FROM users WHERE username='${"{username}"}'...\`)\n})`}
              language="text"
            />
          </Step>

          <Step title="Override strictness mode">
            <p>
              You can override the strictness mode at any time during a
              conversation:
            </p>
            <CodeBlock
              code={`go fluid          # Switches to FLUID mode (no governance headers)\nstandard+          # Switches to STANDARD+ (structured output)\nlockdown           # Switches to LOCKDOWN (maximum safety)`}
              language="bash"
            />
          </Step>
        </StepList>

        <Callout variant="info" title="What just happened?">
          You ran <code>init</code>, which placed 45 skills, 11 rules, 8
          prompts, and 12 agent modes into your <code>.github/</code> directory.
          GitHub Copilot now reads <code>.github/copilot-instructions.md</code>{" "}
          on every request and applies the full AGF governance system
          automatically.
        </Callout>

        <Callout variant="tip" title="Next: understand the internals">
          Read the{" "}
          <a
            href="/docs/guides/understanding-agf"
            className="underline underline-offset-4"
          >
            Understanding AGF
          </a>{" "}
          guide to learn exactly how the 5-layer governance framework works.
        </Callout>
      </div>

      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
