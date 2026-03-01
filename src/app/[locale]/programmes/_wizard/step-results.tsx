import { Link } from "@/i18n/navigation";
import { ArrowRight, RotateCcw, Wand2 } from "lucide-react";
import { motion } from "motion/react";
import { PersonalizedTip } from "./personalized-tip";
import { QuickFactsPanel } from "./quick-facts-panel";
import { ResultLink } from "./result-link";
import type { QuickFact, ResultCard } from "./types";
import { pageVariants } from "./variants";

interface StepResultsProps {
  direction: number;
  facts: QuickFact[];
  tip: string | null;
  cards: ResultCard[];
  onReset: () => void;
  t: (key: string) => string;
}

export function StepResults({
  direction,
  facts,
  tip,
  cards,
  onReset,
  t,
}: StepResultsProps) {
  return (
    <motion.div
      key="step-results"
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Wand2 className="h-7 w-7 text-white/70" />
        </div>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t("resultsTitle")}
        </h2>
        <p className="mt-2 text-sm text-white/50 sm:text-base">
          {t("resultsSubtitle")}
        </p>
      </div>

      {/* Quick facts */}
      <QuickFactsPanel facts={facts} />

      {/* Personalized tip */}
      {tip && <PersonalizedTip message={tip} delay={0.15} />}

      {/* Result cards */}
      <div className="flex flex-col gap-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
          >
            <ResultLink card={card} visitLabel={t("visitPage")} />
          </motion.div>
        ))}
      </div>

      {/* Browse all + actions */}
      <div className="mt-10 space-y-4">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-white/30">
          {t("orBrowseAll")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/programmes/undergraduate/prospective"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t("allUg")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/programmes/postgraduate/prospective"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t("allPg")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onReset}
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-45" />
            {t("startOver")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
