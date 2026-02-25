import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer" | "nav";
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
} as const;

export function ContentContainer({
  children,
  className,
  as: Tag = "div",
  size = "xl",
}: ContentContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
