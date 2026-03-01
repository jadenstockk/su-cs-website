import { GlassPanel } from "@/components/glass-panel";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { cardHover } from "./variants";

interface OptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  badge?: string;
  className?: string;
}

export function OptionCard({
  title,
  description,
  icon,
  onClick,
  badge,
  className,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative w-full cursor-pointer text-left",
        className,
      )}
    >
      <GlassPanel
        variant="default"
        rounded="xl"
        blur="lg"
        className="flex items-start gap-4 p-6 transition-colors duration-200 hover:bg-white/15 sm:p-8"
      >
        <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-colors group-hover:bg-white/20 group-hover:text-white">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              {title}
            </h3>
            {badge && (
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/50">
            {description}
          </p>
        </div>
        <ChevronRight className="mt-2 h-5 w-5 shrink-0 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white/60" />
      </GlassPanel>
    </motion.button>
  );
}
