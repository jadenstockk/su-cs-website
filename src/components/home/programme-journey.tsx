"use client";

import { ContentContainer } from "@/components/content-container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Award,
  BookOpen,
  FlaskConical,
  Telescope,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const programmes = [
  {
    titleKey: "bscTitle" as const,
    subtitleKey: "bscSubtitle" as const,
    descKey: "bscDesc" as const,
    icon: BookOpen,
    href: "/programmes/undergraduate/guide" as const,
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    hoverBorder: "border-blue-500/20 hover:border-blue-500/40",
    iconColor: "text-blue-400",
  },
  {
    titleKey: "honsTitle" as const,
    subtitleKey: "honsSubtitle" as const,
    descKey: "honsDesc" as const,
    icon: Award,
    href: "/programmes/postgraduate/honours" as const,
    gradient: "from-su-gold to-amber-400",
    bgColor: "bg-su-gold/10",
    hoverBorder: "border-su-gold/20 hover:border-su-gold/40",
    iconColor: "text-su-gold",
  },
  {
    titleKey: "mscTitle" as const,
    subtitleKey: "mscSubtitle" as const,
    descKey: "mscDesc" as const,
    icon: FlaskConical,
    href: "/programmes/postgraduate/masters" as const,
    gradient: "from-su-maroon to-rose-400",
    bgColor: "bg-su-maroon-light/10",
    hoverBorder: "border-su-maroon/20 hover:border-su-maroon/40",
    iconColor: "text-su-maroon-light",
  },
  {
    titleKey: "phdTitle" as const,
    subtitleKey: "phdSubtitle" as const,
    descKey: "phdDesc" as const,
    icon: Telescope,
    href: "/programmes/postgraduate/phd" as const,
    gradient: "from-purple-500 to-violet-400",
    bgColor: "bg-purple-500/10",
    hoverBorder: "border-purple-500/20 hover:border-purple-500/40",
    iconColor: "text-purple-400",
  },
];

export function ProgrammeJourneySection({ className }: { className?: string }) {
  const t = useTranslations("Journey");

  return (
    <section className={cn("py-24 sm:py-32", className)}>
      <ContentContainer>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="mb-16 items-center"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="pointer-events-none absolute top-1/2 right-0 left-0 hidden h-px origin-left bg-gradient-to-r from-blue-500/30 via-su-gold/30 to-purple-500/30 lg:block"
            style={{ translateY: "-50%" }}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.titleKey}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Step indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="absolute -top-3 left-1/2 z-10 hidden -translate-x-1/2 items-center justify-center lg:flex"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-background font-mono text-xs text-white/60 shadow-lg">
                      {i + 1}
                    </span>
                  </motion.div>

                  <Link href={p.href} className="block h-full">
                    <div
                      className={cn(
                        "group relative h-full overflow-hidden rounded-2xl border bg-white/[0.04] p-6 backdrop-blur-sm",
                        "transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-black/20",
                        p.hoverBorder,
                      )}
                    >
                      {/* Gradient accent line at top */}
                      <div
                        className={cn(
                          "absolute top-0 right-0 left-0 h-1 rounded-t-2xl bg-gradient-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          p.gradient,
                        )}
                      />

                      <div
                        className={cn(
                          "mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
                          p.bgColor,
                        )}
                      >
                        <Icon className={cn("h-6 w-6", p.iconColor)} />
                      </div>

                      <div className="mb-2 text-xs font-medium tracking-wider text-white/40 uppercase">
                        {t(p.subtitleKey)}
                      </div>

                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {t(p.titleKey)}
                      </h3>

                      <p className="mb-4 text-sm leading-relaxed text-white/45">
                        {t(p.descKey)}
                      </p>

                      <span className="inline-flex items-center gap-1 text-sm font-medium text-white/50 transition-colors duration-300 group-hover:text-white">
                        {t("viewProgramme")}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link href="/programmes">
            <Button
              variant="glass"
              size="lg"
              slideReveal
              className="cursor-pointer"
            >
              {t("findYourPath")}
            </Button>
          </Link>
        </motion.div>
      </ContentContainer>
    </section>
  );
}
