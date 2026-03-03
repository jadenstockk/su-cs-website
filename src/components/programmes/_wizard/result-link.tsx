import { GlassPanel } from "@/components/glass-panel";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { ResultCard } from "./types";

interface ResultLinkProps {
  card: ResultCard;
  visitLabel: string;
}

export function ResultLink({ card, visitLabel }: ResultLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link href={card.href} className="group block">
        <GlassPanel
          variant={card.primary ? "default" : "dark"}
          rounded="xl"
          blur="lg"
          className={cn(
            "flex items-start gap-4 p-5 transition-colors duration-200 sm:p-6",
            card.primary
              ? "border-white/20 bg-white/15 hover:bg-white/20"
              : "hover:bg-white/10",
          )}
        >
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
              card.primary
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white/60 group-hover:text-white",
            )}
          >
            {card.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white sm:text-base">
                {card.title}
              </h4>
              {card.badge && (
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/25">
                  {card.badge}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-white/50 sm:text-sm">
              {card.description}
            </p>
          </div>
          <span className="mt-1 hidden sm:flex items-center gap-1 whitespace-nowrap text-xs font-medium text-white/40 transition-colors group-hover:text-white/70">
            {visitLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </GlassPanel>
      </Link>
    </motion.div>
  );
}
