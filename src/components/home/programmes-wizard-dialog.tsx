"use client";

import { GlassPanel } from "@/components/glass-panel";
import {
  StepIndicator,
  StepLevel,
  StepPgProgramme,
  StepResults,
  StepSituation,
  getPersonalizedTip,
  getQuickFacts,
  getResultCards,
  type Level,
  type PgProgramme,
  type Situation,
  type WizardState,
} from "@/components/programmes/_wizard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";

const initialState: WizardState = {
  step: 0,
  level: null,
  pgProgramme: null,
  situation: null,
};

interface ProgrammesWizardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgrammesWizardDialog({
  open,
  onOpenChange,
}: ProgrammesWizardDialogProps) {
  const t = useTranslations("ProgrammesWizard");

  const [state, setState] = useState<WizardState>(initialState);
  const [direction, setDirection] = useState(1);

  /* -- reset wizard when dialog closes ----------------------------- */
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) {
        setState(initialState);
        setDirection(1);
      }
      onOpenChange(next);
    },
    [onOpenChange],
  );

  /* -- navigation helpers ----------------------------------------- */

  const goForward = useCallback((patch: Partial<WizardState>) => {
    setDirection(1);
    setState((prev) => ({ ...prev, ...patch, step: prev.step + 1 }));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setState((prev) => {
      if (prev.step === 0) return prev;
      const newStep = prev.step - 1;
      return {
        ...prev,
        step: newStep,
        ...(newStep === 0
          ? { level: null, pgProgramme: null, situation: null }
          : {}),
        ...(newStep === 1 && prev.level === "postgraduate"
          ? { situation: null }
          : {}),
        ...(newStep === 1 && prev.level === "undergraduate"
          ? { situation: null }
          : {}),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setDirection(-1);
    setState(initialState);
  }, []);

  const selectLevel = useCallback(
    (level: Level) => goForward({ level }),
    [goForward],
  );

  const selectPgProgramme = useCallback(
    (pgProgramme: PgProgramme) => goForward({ pgProgramme }),
    [goForward],
  );

  const selectSituation = useCallback(
    (situation: Situation) => goForward({ situation }),
    [goForward],
  );

  /* -- derived state ---------------------------------------------- */

  const isPostgrad = state.level === "postgraduate";
  const isUg = state.level === "undergraduate";
  const resultsStep = isPostgrad ? 3 : 2;

  const stepLabels = useMemo(() => {
    if (isPostgrad) {
      return [
        t("stepLevel"),
        t("stepPgProgramme"),
        t("stepAboutYou"),
        t("stepResults"),
      ];
    }
    return [t("stepLevel"), t("stepAboutYou"), t("stepResults")];
  }, [isPostgrad, t]);

  const visualStep = useMemo(() => {
    if (state.step === 0) return 0;
    if (isUg) return Math.min(state.step, 2);
    return Math.min(state.step, 3);
  }, [state.step, isUg, isPostgrad]);

  const tip =
    state.step === resultsStep
      ? getPersonalizedTip(state.situation, isUg, state.pgProgramme, t)
      : null;

  /* -- render ----------------------------------------------------- */

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-3xl max-h-[calc(100dvh-2rem)] overflow-y-auto no-scrollbar border-white/10 bg-black/80 p-0 backdrop-blur-xl sm:rounded-xl [&>button[data-slot=dialog-close]]:text-white"
      >
        <DialogTitle className="sr-only">{t("heroTitle")}</DialogTitle>

        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="xl"
          className="px-6 py-5 sm:px-10 sm:py-8"
        >
          {/* Step indicator */}
          <div className="mb-5 sm:mb-8 flex flex-col items-center gap-4">
            <StepIndicator steps={stepLabels} current={visualStep} />
          </div>

          {/* Animated step content */}
          <AnimatePresence mode="wait" custom={direction}>
            {state.step === 0 && (
              <StepLevel direction={direction} onSelect={selectLevel} t={t} />
            )}

            {state.step === 1 && isUg && (
              <StepSituation
                motionKey="step-ug-situation"
                direction={direction}
                onSelect={selectSituation}
                onBack={goBack}
                t={t}
              />
            )}

            {state.step === 1 && isPostgrad && (
              <StepPgProgramme
                direction={direction}
                onSelect={selectPgProgramme}
                onBack={goBack}
                t={t}
              />
            )}

            {state.step === 2 && isPostgrad && (
              <StepSituation
                motionKey="step-pg-situation"
                direction={direction}
                onSelect={selectSituation}
                onBack={goBack}
                isPostgrad
                t={t}
              />
            )}

            {state.step === resultsStep && (
              <StepResults
                direction={direction}
                facts={getQuickFacts(isUg, state.pgProgramme, t)}
                tip={tip}
                cards={getResultCards(
                  state.situation,
                  isUg,
                  state.pgProgramme,
                  t,
                )}
                onReset={reset}
                t={t}
              />
            )}
          </AnimatePresence>
        </GlassPanel>
      </DialogContent>
    </Dialog>
  );
}
