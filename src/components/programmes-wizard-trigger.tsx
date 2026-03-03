"use client";

import { ProgrammesWizardDialog } from "@/components/home/programmes-wizard-dialog";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ProgrammesWizardTriggerProps {
  className?: string;
}

export function ProgrammesWizardTrigger({
  className,
}: ProgrammesWizardTriggerProps) {
  const t = useTranslations("ProgrammesWizard");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className={className}
        variant="glass"
        size="lg"
        slideReveal
        onClick={() => setOpen(true)}
      >
        <Wand2 className="mr-2 h-4 w-4" />
        {t("heroTitle")}
      </Button>
      <ProgrammesWizardDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
