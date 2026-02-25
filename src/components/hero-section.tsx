"use client";

import { ContentContainer } from "@/components/content-container";
import { HeroVideo } from "@/components/hero-video";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className={cn("relative")}>
      <HeroVideo
        src={"/assets/videos/cs-hero-video.mp4"}
        // poster={videoPoster}
        overlayOpacity={50}
        className="min-h-[70vh] md:min-h-svh"
      >
        {/* Hero content */}
        <ContentContainer className="flex items-center min-h-[60vh] pt-32 md:min-h-svh">
          <div className="flex max-w-2xl flex-col gap-6">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-balance text-base sm:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#programmes"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
              >
                {t("exploreProgrammes")}
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
              >
                {t("learnMore")}
              </a>
            </div>
          </div>
        </ContentContainer>
      </HeroVideo>
    </section>
  );
}
