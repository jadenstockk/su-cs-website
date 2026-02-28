"use client";

import { ContentContainer } from "@/components/content-container";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("Footer");

  return (
    <footer className={cn("border-t border-white/10 py-10", className)}>
      <ContentContainer>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <Logo width={90} height={32} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white/80">
                {t("computerScience")}
              </span>
              <span className="text-xs text-white/40">
                {t("stellenboschUniversity")}
              </span>
            </div>
          </div>
          <p className="text-xs text-white/30">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </ContentContainer>
    </footer>
  );
}
