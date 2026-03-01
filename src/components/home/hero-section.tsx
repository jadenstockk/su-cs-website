"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ContentContainer } from "@/components/content-container";
import { HeroVideo } from "@/components/home/hero-video";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlipWords } from "../ui/flip-words";

export function HeroSection() {
  const t = useTranslations("Hero");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={cn("relative")}>
      <HeroVideo
        src={"/assets/videos/cs-hero-video.mp4"}
        overlayOpacity={50}
        className="h-[70vh] md:h-[90vh] min-h-160"
      >
        {/* Hero content */}
        <ContentContainer className="flex items-center h-[70vh] md:h-[90vh] min-h-160 pt-20 sm:pt-32">
          <div className="flex flex-col gap-6">
            <motion.h1
              className="text-3xl text-balance font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {t("titleConstant")}
              <FlipWords
                words={[t("title1"), t("title2"), t("title3"), t("title4")]}
                className="sm:ml-1"
              />
            </motion.h1>
            <motion.p
              className="max-w-xl text-pretty text-sm sm:text-lg"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            >
              {t("description")}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 pt-2"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            >
              <Link href="/programmes">
                <Button
                  className="cursor-pointer"
                  variant="white"
                  size="lg"
                  slideReveal
                >
                  {t("exploreProgrammes")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  className="cursor-pointer"
                  variant="glass"
                  size="lg"
                  slideReveal
                >
                  {t("contactUs")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </ContentContainer>
      </HeroVideo>
    </section>
  );
}
