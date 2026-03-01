import type { Metadata } from "next";
import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsNavbar } from "@/components/docs/docs-navbar";
import { TableOfContents } from "@/components/docs/table-of-contents";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s | Copilot Kit Docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <DocsSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <DocsNavbar />
        <div className="flex flex-1 gap-0">
          {/* Main content */}
          <main
            data-docs-content
            className="flex-1 px-6 py-8 md:px-10 lg:px-12 min-w-0 max-w-4xl"
          >
            {children}
          </main>
          {/* Right sidebar — TOC */}
          <aside className="hidden xl:block shrink-0 border-l border-border/60">
            <div className="sticky top-14 overflow-y-auto px-3 py-6 max-h-[calc(100vh-3.5rem)]">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </SidebarProvider>
  );
}
