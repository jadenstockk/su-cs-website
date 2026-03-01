import { Lightbulb } from "lucide-react";
import { motion } from "motion/react";

interface PersonalizedTipProps {
  message: string;
  delay?: number;
}

export function PersonalizedTip({
  message,
  delay = 0.2,
}: PersonalizedTipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/15 bg-amber-500/5 p-4">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
        <p className="text-sm leading-relaxed text-amber-200/80">{message}</p>
      </div>
    </motion.div>
  );
}
