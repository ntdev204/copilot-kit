"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenIcon,
  ChevronRightIcon,
  CompassIcon,
  FileCodeIcon,
  PackageIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { docsNavigation } from "@/lib/docs-navigation";
import { cn } from "@/lib/utils";

const sectionIcons: Record<string, React.FC<{ className?: string }>> = {
  "Getting Started": BookOpenIcon,
  Guides: CompassIcon,
  "API Reference": FileCodeIcon,
};

export function DocsSidebar() {
  const pathname = usePathname();
  // Track which sections are open (all open by default, purely client state)
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >(() => Object.fromEntries(docsNavigation.map((s) => [s.title, true])));

  function toggle(title: string) {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border">
      {/* Brand header */}
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
            <PackageIcon className="size-3.5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="text-sm font-semibold tracking-tight leading-none">
              copilot-kit
            </span>
            <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
              Documentation
            </span>
          </div>
          <Badge
            variant="secondary"
            className="ml-auto shrink-0 h-5 rounded px-1.5 text-[10px] font-medium"
          >
            v1.0
          </Badge>
        </Link>
      </SidebarHeader>

      <ScrollArea className="flex-1">
        <SidebarContent className="gap-0 px-2 py-3">
          {docsNavigation.map((section) => {
            const Icon = sectionIcons[section.title];
            const isOpen = openSections[section.title] ?? true;

            return (
              <div key={section.title} className="py-0.5">
                {/* Section trigger — plain button, no asChild merge to avoid hydration mismatch */}
                <button
                  type="button"
                  onClick={() => toggle(section.title)}
                  className="mb-0.5 flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {Icon && <Icon className="size-3.5 shrink-0" />}
                  <span className="flex-1 truncate text-left">
                    {section.title}
                  </span>
                  <ChevronRightIcon
                    className={cn(
                      "size-3.5 shrink-0 transition-transform duration-200",
                      isOpen && "rotate-90",
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="ml-3">
                    <SidebarMenu className="gap-px">
                      {section.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                              asChild
                              isActive={active}
                              className={cn(
                                "relative h-7 rounded-md pl-3 text-[13px] transition-all",
                                "before:absolute before:inset-y-1.5 before:left-0 before:w-0.5 before:rounded-full before:transition-colors",
                                active
                                  ? "bg-accent font-medium text-foreground before:bg-foreground"
                                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground before:bg-transparent",
                              )}
                            >
                              <Link href={item.href}>
                                {item.title}
                                {item.badge && (
                                  <Badge
                                    variant="secondary"
                                    className="ml-auto h-4 rounded px-1 text-[9px]"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </div>
                )}
              </div>
            );
          })}
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}
