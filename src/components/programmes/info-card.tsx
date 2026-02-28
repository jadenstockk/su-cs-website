import { GlassPanel } from "@/components/glass-panel";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

/**
 * A glass card for displaying a titled info block — used across programme pages.
 */
export function InfoCard({ title, children, icon, className }: InfoCardProps) {
  return (
    <GlassPanel
      variant="default"
      rounded="xl"
      blur="lg"
      className={cn(
        "p-6 transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:shadow-black/10",
        className,
      )}
    >
      {icon && <div className="mb-3 text-white/60">{icon}</div>}
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <div className="text-sm leading-relaxed text-white/60">{children}</div>
    </GlassPanel>
  );
}
