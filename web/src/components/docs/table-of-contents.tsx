"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TocItem {
  slug: string;
  title: string;
  level: number;
  el: HTMLElement;
}

/**
 * Collect headings WITHOUT mutating el.id — avoids React hydration mismatch.
 * Generates a slug from text content used as a client-only key/anchor.
 */
function collectHeadings(): TocItem[] {
  const article = document.querySelector("[data-docs-content]");
  if (!article) return [];

  const elements = article.querySelectorAll<HTMLElement>("h2, h3");
  const seen = new Map<string, number>();
  const items: TocItem[] = [];

  elements.forEach((el) => {
    const text = el.textContent?.trim() ?? "";
    if (!text) return;

    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Deduplicate slugs
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count}`;

    items.push({ slug, title: text, level: el.tagName === "H2" ? 2 : 3, el });
  });
  return items;
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = React.useState<TocItem[]>([]);
  const [activeSlug, setActiveSlug] = React.useState<string>("");

  // Re-scan on every navigation (delay lets RSC content paint)
  React.useEffect(() => {
    const timer = setTimeout(() => setHeadings(collectHeadings()), 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  React.useEffect(() => {
    if (headings.length === 0) return;

    const slugMap = new Map(headings.map((h) => [h.el, h.slug]));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const slug = slugMap.get(visible[0].target as HTMLElement);
          if (slug) setActiveSlug(slug);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  // Hide when ≤ 1 heading
  if (headings.length <= 1) return null;

  return (
    <nav aria-label="Table of contents" className="w-full">
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-px">
        {headings.map((heading) => (
          <li key={heading.slug}>
            <a
              href={`#${heading.slug}`}
              onClick={(e) => {
                e.preventDefault();
                heading.el.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                setActiveSlug(heading.slug);
              }}
              className={cn(
                "block border-l-2 py-1 text-[12px] leading-snug transition-colors",
                heading.level === 2 ? "pl-3" : "pl-5",
                activeSlug === heading.slug
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
              )}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
