import Link from "next/link";
import { PackageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full border bg-muted">
        <PackageIcon className="size-7 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">404 — Not Found</h1>
        <p className="max-w-md text-muted-foreground">
          This page doesn&apos;t exist. Check the URL or head back to the docs.
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/docs">Go to docs</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
