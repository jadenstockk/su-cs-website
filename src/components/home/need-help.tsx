"use client";

import { ContentContainer } from "@/components/content-container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function NeedHelp({ className }: { className?: string }) {
  const t = useTranslations("GetInTouch");

  return (
    <section className={cn("py-24 bg-primary", className)}>
      <ContentContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-base text-white/60 sm:text-lg text-balance">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-row items-center gap-3 sm:justify-center">
            <Button variant="white" size="lg" asChild>
              <Link href="/contact" className="group">
                {t("cta")}
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <a
                href="https://www.sun.ac.za/english/faculty/science/Pages/Apply.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </Button>
          </div>
        </motion.div>
      </ContentContainer>
    </section>
  );
}
