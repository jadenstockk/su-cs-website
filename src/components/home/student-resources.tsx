"use client";

import { ContentContainer } from "@/components/content-container";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import {
  Calendar,
  ClipboardCheck,
  Code2,
  ExternalLink,
  Laptop,
  MessagesSquare,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const resources = [
  {
    icon: ClipboardCheck,
    labelKey: "applications",
    descriptionKey: "applicationsDesc",
    href: "https://student.sun.ac.za",
    external: true,
    colour: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    icon: Laptop,
    labelKey: "stemlearn",
    descriptionKey: "stemlearnDesc",
    href: "https://stemlearn.sun.ac.za",
    external: true,
    colour: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Code2,
    labelKey: "gitlab",
    descriptionKey: "gitlabDesc",
    href: "https://git.cs.sun.ac.za",
    external: true,
    colour: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: Calendar,
    labelKey: "calendar",
    descriptionKey: "calendarDesc",
    href: "https://www.su.ac.za/en/dates",
    external: true,
    colour: "text-su-gold",
    bg: "bg-su-gold/10",
  },
  {
    icon: ExternalLink,
    labelKey: "mysun",
    descriptionKey: "mysunDesc",
    href: "https://my.sun.ac.za",
    external: true,
    colour: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: MessagesSquare,
    labelKey: "contactUs",
    descriptionKey: "contactUsDesc",
    href: "/contact",
    external: false,
    colour: "text-rose-400",
    bg: "bg-rose-500/10",
  },
] as const;

export function StudentResources({ className }: { className?: string }) {
  const t = useTranslations("StudentResources");

  return (
    <section className={cn("py-20 bg-primary", className)}>
      <ContentContainer>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-14"
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {resources.map((res, i) => {
            const Icon = res.icon;
            const Wrapper = res.external ? "a" : Link;
            const extraProps = res.external
              ? { href: res.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: res.href };

            return (
              <motion.div
                key={res.labelKey}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Wrapper {...extraProps} className="group block">
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/8">
                    <div
                      className={cn(
                        "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        res.bg,
                      )}
                    >
                      <Icon className={cn("h-4.5 w-4.5", res.colour)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-semibold text-white leading-snug">
                          {t(res.labelKey)}
                        </p>
                        {res.external && (
                          <ExternalLink className="h-3 w-3 text-white/30 shrink-0" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-white/50 leading-snug">
                        {t(res.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </ContentContainer>
    </section>
  );
}
