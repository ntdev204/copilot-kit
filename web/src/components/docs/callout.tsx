import * as React from "react";
import {
  InfoIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  XCircleIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "tip" | "danger";

const variants: Record<
  CalloutVariant,
  { icon: React.FC<{ className?: string }>; className: string; label: string }
> = {
  info: {
    icon: InfoIcon,
    className:
      "border-blue-500/30 bg-blue-500/5 text-blue-900 dark:text-blue-100 [&_svg]:text-blue-500",
    label: "Note",
  },
  warning: {
    icon: AlertTriangleIcon,
    className:
      "border-yellow-500/30 bg-yellow-500/5 text-yellow-900 dark:text-yellow-100 [&_svg]:text-yellow-500",
    label: "Warning",
  },
  tip: {
    icon: LightbulbIcon,
    className:
      "border-green-500/30 bg-green-500/5 text-green-900 dark:text-green-100 [&_svg]:text-green-500",
    label: "Tip",
  },
  danger: {
    icon: XCircleIcon,
    className:
      "border-red-500/30 bg-red-500/5 text-red-900 dark:text-red-100 [&_svg]:text-red-500",
    label: "Danger",
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const { icon: Icon, className: variantCls, label } = variants[variant];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4 text-sm",
        variantCls,
        className,
      )}
      role="note"
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="flex-1 space-y-1">
        {title && (
          <p className="font-semibold leading-none tracking-tight">
            {title ?? label}
          </p>
        )}
        <div className="leading-relaxed [&_code]:rounded [&_code]:bg-black/10 [&_code]:px-1 [&_code]:dark:bg-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}
