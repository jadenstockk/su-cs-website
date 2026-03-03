import { Globe, GraduationCap, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import { BackButton } from "./back-button";
import { OptionCard } from "./option-card";
import type { Situation } from "./types";
import { pageVariants } from "./variants";

interface StepSituationProps {
  motionKey: string;
  direction: number;
  onSelect: (situation: Situation) => void;
  onBack: () => void;
  /** Whether this is for the postgraduate flow (uses PG-specific descriptions). */
  isPostgrad?: boolean;
  t: (key: string) => string;
}

export function StepSituation({
  motionKey,
  direction,
  onSelect,
  onBack,
  isPostgrad = false,
  t,
}: StepSituationProps) {
  return (
    <motion.div
      key={motionKey}
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mb-5 sm:mb-8 text-center">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          {t("situationTitle")}
        </h2>
        <p className="mt-1.5 text-xs text-white/50 sm:text-sm">
          {t("situationSubtitle")}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <OptionCard
          title={t("situationProspective")}
          description={t(
            isPostgrad
              ? "situationProspectiveDescPg"
              : "situationProspectiveDesc",
          )}
          icon={<UserCheck className="h-6 w-6" />}
          onClick={() => onSelect("prospective")}
        />
        <OptionCard
          title={t("situationCurrent")}
          description={t(
            isPostgrad ? "situationCurrentDescPg" : "situationCurrentDesc",
          )}
          icon={<GraduationCap className="h-6 w-6" />}
          onClick={() => onSelect("current")}
        />
        <OptionCard
          title={t("situationInternational")}
          description={t(
            isPostgrad
              ? "situationInternationalDescPg"
              : "situationInternationalDesc",
          )}
          icon={<Globe className="h-6 w-6" />}
          onClick={() => onSelect("international")}
        />
      </div>

      <BackButton onClick={onBack} label={t("back")} />
    </motion.div>
  );
}
