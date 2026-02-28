"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const programmeKeys = [
  { title: "bscTitle", description: "bscDescription" },
  { title: "honsTitle", description: "honsDescription" },
  { title: "mscTitle", description: "mscDescription" },
] as const;

export function ProgrammesSection({ className }: { className?: string }) {
  const t = useTranslations("Programmes");

  return (
    <section id="programmes" className={cn("py-24 sm:py-32", className)}>
      <ContentContainer>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmeKeys.map((p) => (
            <GlassCard
              key={p.title}
              title={t(p.title)}
              description={t(p.description)}
            >
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {t("learnMore")} &rarr;
              </a>
            </GlassCard>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
