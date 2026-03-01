"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
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
} from "./_wizard";

export function ProgrammesWizard() {
  const t = useTranslations("ProgrammesWizard");
  const bt = useTranslations("Breadcrumb");

  const [state, setState] = useState<WizardState>({
    step: 0,
    level: null,
    pgProgramme: null,
    situation: null,
  });
  const [direction, setDirection] = useState(1);

  /* -- helpers ---------------------------------------------------- */

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
    setState({ step: 0, level: null, pgProgramme: null, situation: null });
  }, []);

  const selectLevel = useCallback(
    (level: Level) => {
      goForward({ level });
    },
    [goForward],
  );

  const selectPgProgramme = useCallback(
    (pgProgramme: PgProgramme) => {
      goForward({ pgProgramme });
    },
    [goForward],
  );

  const selectSituation = useCallback(
    (situation: Situation) => {
      goForward({ situation });
    },
    [goForward],
  );

  /* -- derived state ---------------------------------------------- */

  const isPostgrad = state.level === "postgraduate";
  const isUg = state.level === "undergraduate";

  const resultsStep = isPostgrad ? 3 : 2;

  /* -- step labels ------------------------------------------------ */

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

  /* -- render ----------------------------------------------------- */

  const tip =
    state.step === resultsStep
      ? getPersonalizedTip(state.situation, isUg, state.pgProgramme, t)
      : null;

  return (
    <>
      <PageHero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        breadcrumb={
          <BreadcrumbNav
            items={[
              { label: bt("home"), href: "/" },
              { label: bt("programmes") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="xl"
          className="mx-auto max-w-3xl px-6 py-10 sm:px-10 sm:py-12"
        >
          {/* Step indicator */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <StepIndicator steps={stepLabels} current={visualStep} />
          </div>

          {/* Animated step content */}
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 0: Choose level */}
            {state.step === 0 && (
              <StepLevel direction={direction} onSelect={selectLevel} t={t} />
            )}

            {/* Step 1 (UG): About you */}
            {state.step === 1 && isUg && (
              <StepSituation
                motionKey="step-ug-situation"
                direction={direction}
                onSelect={selectSituation}
                onBack={goBack}
                t={t}
              />
            )}

            {/* Step 1 (PG): Choose programme */}
            {state.step === 1 && isPostgrad && (
              <StepPgProgramme
                direction={direction}
                onSelect={selectPgProgramme}
                onBack={goBack}
                t={t}
              />
            )}

            {/* Step 2 (PG): About you */}
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

            {/* Results step */}
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
      </ContentContainer>
    </>
  );
}
