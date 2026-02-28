"use client";

import { ContentContainer } from "@/components/content-container";
import { HeroVideo } from "@/components/home/hero-video";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { FlipWords } from "../ui/flip-words";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className={cn("relative")}>
      <HeroVideo
        src={"/assets/videos/cs-hero-video.mp4"}
        // poster={videoPoster}
        overlayOpacity={50}
        className="h-[70vh] md:h-[90vh] min-h-160"
      >
        {/* Hero content */}
        <ContentContainer className="flex items-center h-[70vh] md:h-[90vh] min-h-160 pt-20 sm:pt-32">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl text-balance font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("titleConstant")}
              <FlipWords
                words={[t("title1"), t("title2"), t("title3"), t("title4")]}
                className="sm:ml-1"
              />
            </h1>
            <p className="max-w-xl text-pretty text-sm sm:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="white" size="lg" asChild>
                <a href="#programmes">{t("exploreProgrammes")}</a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#about">{t("learnMore")}</a>
              </Button>
            </div>
          </div>
        </ContentContainer>
      </HeroVideo>
    </section>
  );
}
