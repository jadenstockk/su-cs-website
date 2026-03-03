"use client";

import { ContentContainer } from "@/components/content-container";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Undergraduate() {
  const t = useTranslations("Undergraduate");

  return (
    <section className="relative z-10 bg-background pt-20 pb-10">
      <ContentContainer className="pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8 md:flex-row md:items-stretch md:gap-12"
        >
          {/* Photo side */}
          <div className="relative w-full overflow-hidden rounded-2xl md:order-1 md:w-[42%] aspect-16/10 md:aspect-auto md:min-h-65">
            <Image
              src="/assets/images/scenes/math-lecture2.webp"
              alt="Computer Science lecture hall at Stellenbosch University"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 42vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
          </div>

          {/* Text side */}
          <div className="flex flex-1 flex-col justify-center md:order-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-su-gold">
              {t("badge")}
            </p>
            <h2 className="mb-4 text-3xl text-balance font-bold leading-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-base leading-relaxed text-white/70">
              {t("description")}
            </p>

            <Link
              href="/programmes/undergraduate/guide"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/30"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </ContentContainer>
    </section>
  );
}
