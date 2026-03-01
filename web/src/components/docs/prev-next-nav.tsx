import * as React from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { NavItem } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

interface PrevNextNavProps {
  prev: NavItem | null;
  next: NavItem | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  return (
    <div className="mt-12 flex items-center justify-between border-t pt-6">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <ChevronLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Previous</span>
            <span className="font-medium">{prev.title}</span>
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <span className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">Next</span>
            <span className="font-medium">{next.title}</span>
          </span>
          <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
