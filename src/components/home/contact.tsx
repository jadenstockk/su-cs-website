"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ContactSection({ className }: { className?: string }) {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className={cn("py-24 sm:py-32", className)}>
      <ContentContainer size="md">
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="xl"
          className="px-8 py-14 text-center sm:px-16"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            {t("description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="white" size="lg" asChild>
              <a href="mailto:csinfo@sun.ac.za">{t("emailUs")}</a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#">{t("visitCampus")}</a>
            </Button>
          </div>
        </GlassPanel>
      </ContentContainer>
    </section>
  );
}
