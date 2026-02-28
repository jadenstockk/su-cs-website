"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const statKeys = [
  { value: "yearsValue", label: "yearsLabel" },
  { value: "alumniValue", label: "alumniLabel" },
  { value: "facultyValue", label: "facultyLabel" },
  { value: "researchValue", label: "researchLabel" },
] as const;

export function StatsSection({ className }: { className?: string }) {
  const t = useTranslations("Stats");

  return (
    <section
      className={cn(
        "relative z-10 py-16 -mt-5 bg-background rounded-t-4xl",
        className,
      )}
    >
      <ContentContainer className="">
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="xl"
          className="px-6 py-10 sm:px-12"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {statKeys.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {t(s.value)}
                </span>
                <span className="text-sm font-medium text-white/50">
                  {t(s.label)}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </ContentContainer>
    </section>
  );
}
