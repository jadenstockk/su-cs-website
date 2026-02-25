import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** Background color/opacity — override with any Tailwind bg class */
  variant?: "default" | "dark" | "light";
  /** Border radius preset */
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
  /** Blur intensity */
  blur?: "sm" | "md" | "lg" | "xl";
}

const variantMap = {
  default: "bg-white/10 border border-white/15",
  dark: "bg-black/30 border border-white/10",
  light: "bg-white/20 border border-white/20",
} as const;

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
  none: "rounded-none",
} as const;

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
} as const;

/**
 * A glassmorphic panel with backdrop blur, translucent background, and subtle border.
 * Use for cards, navbars, modals, and overlays.
 */
export function GlassPanel({
  children,
  className,
  variant = "default",
  rounded = "xl",
  blur = "lg",
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        variantMap[variant],
        roundedMap[rounded],
        blurMap[blur],
        "shadow-lg shadow-black/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
