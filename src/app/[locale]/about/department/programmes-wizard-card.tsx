"use client";

import { ProgrammesWizardDialog } from "@/components/home/programmes-wizard-dialog";
import { GlassPanel } from "@/components/glass-panel";
import { ArrowRight, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function ProgrammesWizardCard() {
  const t = useTranslations("DepartmentPage");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block h-full w-full text-left cursor-pointer"
      >
        <GlassPanel
          variant="default"
          rounded="xl"
          blur="lg"
          className="flex h-full flex-col justify-between p-6 transition-all duration-300 hover:bg-white/15 hover:border-su-gold/30"
        >
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-su-gold/15">
              <GraduationCap className="h-5 w-5 text-su-gold" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              {t("exploreProgrammes")}
            </h3>
            <p className="text-sm leading-relaxed text-white/60">
              {t("exploreProgrammesDesc")}
            </p>
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-su-gold transition-transform group-hover:translate-x-1">
            {t("exploreReadMore")}
            <ArrowRight className="h-4 w-4" />
          </div>
        </GlassPanel>
      </button>
      <ProgrammesWizardDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
