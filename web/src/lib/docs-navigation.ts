export type NavItem = {
  title: string;
  href: string;
  badge?: string;
  items?: NavItem[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Quick Start", href: "/docs/getting-started/quick-start" },
      {
        title: "Project Structure",
        href: "/docs/getting-started/project-structure",
      },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Overview", href: "/docs/guides" },
      {
        title: "Understanding AGF",
        href: "/docs/guides/understanding-agf",
      },
      { title: "Risk Levels Explained", href: "/docs/guides/risk-levels" },
      {
        title: "Working with Skills",
        href: "/docs/guides/working-with-skills",
      },
      { title: "Agent Routing", href: "/docs/guides/agent-routing" },
      { title: "Strictness Modes", href: "/docs/guides/strictness-modes" },
      { title: "Custom Prompts", href: "/docs/guides/custom-prompts" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Overview", href: "/docs/api-reference" },
      { title: "CLI Commands", href: "/docs/api-reference/cli-commands" },
      { title: "Skills Reference", href: "/docs/api-reference/skills" },
      { title: "Rules Reference", href: "/docs/api-reference/rules" },
      { title: "Prompts Reference", href: "/docs/api-reference/prompts" },
      { title: "Agent Modes", href: "/docs/api-reference/agent-modes" },
    ],
  },
];

export const allNavItems: NavItem[] = docsNavigation.flatMap((s) => s.items);

export function getPrevNext(href: string): {
  prev: NavItem | null;
  next: NavItem | null;
} {
  const flat = allNavItems;
  const idx = flat.findIndex((i) => i.href === href);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}
