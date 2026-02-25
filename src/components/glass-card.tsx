import { GlassPanel } from "@/components/glass-panel";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Optional icon or image slot rendered at the top */
  icon?: ReactNode;
  title?: string;
  description?: string;
}

/**
 * A glassmorphic content card — ideal for feature grids, stat blocks, etc.
 */
export function GlassCard({
  children,
  className,
  icon,
  title,
  description,
}: GlassCardProps) {
  return (
    <GlassPanel
      variant="default"
      rounded="xl"
      blur="lg"
      className={cn(
        "p-6 transition-all duration-300 hover:bg-white/15 hover:shadow-xl hover:shadow-black/10",
        className,
      )}
    >
      {icon && <div className="mb-4 text-white/70">{icon}</div>}
      {title && (
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      )}
      {description && (
        <p className="mb-4 text-sm leading-relaxed text-white/60">
          {description}
        </p>
      )}
      {children}
    </GlassPanel>
  );
}
