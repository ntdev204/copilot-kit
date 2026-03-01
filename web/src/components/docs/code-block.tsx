"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "group relative my-4 overflow-hidden rounded-lg border bg-zinc-950 text-zinc-50 dark:bg-zinc-900",
        className,
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2 dark:bg-zinc-800/80">
          <span className="font-mono text-xs text-zinc-400">{filename}</span>
          <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-700">
            {language}
          </span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className={`language-${language} font-mono`}>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 size-7 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-zinc-700"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-green-400" />
          ) : (
            <CopyIcon className="size-3.5 text-zinc-400" />
          )}
        </Button>
      </div>
    </div>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] font-medium">
      {children}
    </code>
  );
}
