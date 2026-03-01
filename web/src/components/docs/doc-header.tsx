import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface DocHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  breadcrumbs?: Array<{ title: string; href?: string }>;
}

export function DocHeader({
  title,
  description,
  badge,
  breadcrumbs,
}: DocHeaderProps) {
  return (
    <div className="mb-8 space-y-3">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/docs">Docs</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.title}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {i === breadcrumbs.length - 1 || !crumb.href ? (
                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {badge && (
          <Badge variant="secondary" className="h-5 text-[10px]">
            {badge}
          </Badge>
        )}
      </div>
      {description && (
        <p className="max-w-2xl text-[15px] text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      <Separator className="opacity-60" />
    </div>
  );
}
