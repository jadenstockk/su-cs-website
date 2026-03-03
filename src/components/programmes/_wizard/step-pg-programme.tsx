import { Microscope, Sparkles, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { BackButton } from "./back-button";
import { OptionCard } from "./option-card";
import type { PgProgramme } from "./types";
import { pageVariants } from "./variants";

interface StepPgProgrammeProps {
  direction: number;
  onSelect: (programme: PgProgramme) => void;
  onBack: () => void;
  t: (key: string) => string;
}

export function StepPgProgramme({
  direction,
  onSelect,
  onBack,
  t,
}: StepPgProgrammeProps) {
  return (
    <motion.div
      key="step-pg"
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mb-5 sm:mb-8 text-center">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {t("choosePgTitle")}
        </h2>
        <p className="mt-1.5 text-xs text-white/50 sm:text-sm">
          {t("choosePgSubtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <OptionCard
          title={t("honours")}
          description={t("honoursDesc")}
          icon={<Trophy className="h-6 w-6" />}
          badge={t("honsBadge")}
          onClick={() => onSelect("honours")}
        />
        <OptionCard
          title={t("masters")}
          description={t("mastersDesc")}
          icon={<Sparkles className="h-6 w-6" />}
          badge={t("mscBadge")}
          onClick={() => onSelect("masters")}
        />
        <OptionCard
          title={t("phd")}
          description={t("phdDesc")}
          icon={<Microscope className="h-6 w-6" />}
          badge={t("phdBadgeLabel")}
          onClick={() => onSelect("phd")}
        />
      </div>

      <BackButton onClick={onBack} label={t("back")} />
    </motion.div>
  );
}
