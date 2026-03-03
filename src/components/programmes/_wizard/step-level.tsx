import { BookOpen, Microscope } from "lucide-react";
import { motion } from "motion/react";
import { OptionCard } from "./option-card";
import type { Level } from "./types";
import { pageVariants } from "./variants";

interface StepLevelProps {
  direction: number;
  onSelect: (level: Level) => void;
  t: (key: string) => string;
}

export function StepLevel({ direction, onSelect, t }: StepLevelProps) {
  return (
    <motion.div
      key="step-level"
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mb-5 sm:mb-8 text-center">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {t("chooseLevelTitle")}
        </h2>
        <p className="mt-1.5 text-xs text-white/50 sm:text-sm">
          {t("chooseLevelSubtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <OptionCard
          title={t("undergraduate")}
          description={t("undergraduateDesc")}
          icon={<BookOpen className="h-6 w-6" />}
          badge={t("ugBadge")}
          onClick={() => onSelect("undergraduate")}
        />
        <OptionCard
          title={t("postgraduate")}
          description={t("postgraduateDesc")}
          icon={<Microscope className="h-6 w-6" />}
          badge={t("pgBadge")}
          onClick={() => onSelect("postgraduate")}
        />
      </div>
    </motion.div>
  );
}
