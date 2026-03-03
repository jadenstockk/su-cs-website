"use client";

import { ContentContainer } from "@/components/content-container";
import { HeroVideo } from "@/components/home/hero-video";
import { ProgrammesWizardDialog } from "@/components/home/programmes-wizard-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { FlipWords } from "../ui/flip-words";

export function HeroSection() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <section className={cn("relative")}>
      <HeroVideo
        src={"/assets/videos/cs-hero-video.mp4"}
        overlayOpacity={50}
        className="h-[70vh] md:h-[90vh] min-h-160"
      >
        {/* Hero content */}
        <ContentContainer className="flex items-center h-[70vh] md:h-[90vh] min-h-160 pt-20 sm:pt-32">
          <div className="flex flex-col items-center text-center gap-6 sm:items-start sm:text-left mx-auto sm:mx-0">
            <motion.h1
              className="text-[33px] overflow-visible font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl  sm:max-w-none"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {t("titleConstant")}{" "}
              <FlipWords
                words={[t("title1"), t("title2"), t("title3"), t("title4")]}
                className="p-0 text-center sm:text-left"
              />
            </motion.h1>

            <motion.p
              className="max-w-sm sm:max-w-xl text-pretty text-base sm:text-lg"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            >
              {t("description")}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-3 pt-2 sm:justify-start sm:flex-row "
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            >
              <Button
                className="cursor-pointer"
                variant="white"
                size="lg"
                slideReveal
                onClick={() => setWizardOpen(true)}
              >
                {t("exploreProgrammes")}
              </Button>

              <ProgrammesWizardDialog
                open={wizardOpen}
                onOpenChange={setWizardOpen}
              />

              <Link
                href="https://www.su.ac.za/en/apply"
                target="_blank"
                rel="noopener"
              >
                <Button
                  className="cursor-pointer w-full"
                  variant="glass"
                  size="lg"
                  slideReveal
                >
                  {t("applyNow")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </ContentContainer>
      </HeroVideo>
    </section>
  );
}
