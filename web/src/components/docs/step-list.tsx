import * as React from "react";
import { cn } from "@/lib/utils";

interface StepListProps {
  children: React.ReactNode;
  className?: string;
}

export function StepList({ children, className }: StepListProps) {
  return (
    <div className={cn("my-6 space-y-0 [counter-reset:step]", className)}>
      {children}
    </div>
  );
}

interface StepProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Step({ title, children, className }: StepProps) {
  return (
    <div
      className={cn(
        "relative border-l-2 border-border pb-8 pl-8 [counter-increment:step] last:pb-0",
        "before:absolute before:-left-4.5 before:flex before:size-9 before:items-center before:justify-center",
        "before:rounded-full before:border-2 before:border-border before:bg-background",
        "before:font-mono before:text-sm before:font-bold before:text-foreground",
        "before:content-[counter(step,decimal)]",
        className,
      )}
    >
      <h3 className="mb-2 mt-1 text-base font-semibold leading-snug">
        {title}
      </h3>
      <div className="text-sm text-muted-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
