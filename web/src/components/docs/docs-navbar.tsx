import Link from "next/link";
import { GithubIcon, PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchDialog } from "@/components/docs/search-dialog";

const navLinks = [
  { title: "Docs", href: "/docs" },
  { title: "Guides", href: "/docs/guides" },
  { title: "API", href: "/docs/api-reference" },
];

export function DocsNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="flex w-full items-center gap-2 px-4">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="md:hidden" />
        <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />

        {/* Logo — visible only when sidebar is collapsed */}
        <Link
          href="/"
          className="mr-4 hidden items-center gap-2 text-sm font-semibold md:flex lg:hidden"
        >
          <PackageIcon className="size-4" />
          <span>copilot-kit</span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              asChild
              className="h-8 px-3 text-[13px] font-normal text-muted-foreground hover:text-foreground"
            >
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <SearchDialog />

        {/* Actions */}
        <div className="ml-1 flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <a
              href="https://github.com/ntdev204/copilot-kit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
            >
              <GithubIcon className="size-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
