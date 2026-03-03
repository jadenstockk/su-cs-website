import { GlassPanel } from "@/components/glass-panel";
import { motion } from "motion/react";
import type { QuickFact } from "./types";

interface QuickFactsPanelProps {
  facts: QuickFact[];
}

export function QuickFactsPanel({ facts }: QuickFactsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <GlassPanel variant="default" rounded="xl" blur="lg" className="mb-6 p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/60">
                {fact.icon}
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
                  {fact.label}
                </p>
                <p className="text-sm font-semibold text-white">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.div>
  );
}
