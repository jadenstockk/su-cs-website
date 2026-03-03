"use client";

import { ContentContainer } from "@/components/content-container";
import { SectionHeading } from "@/components/section-heading";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const FAQ_COUNT = 8;

export function FAQS() {
  const t = useTranslations("StudentResources");

  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`faq${i + 1}q` as Parameters<typeof t>[0]),
    answer: t(`faq${i + 1}a` as Parameters<typeof t>[0]),
  }));

  return (
    <section className={"bg-background py-20"}>
      <ContentContainer>
        <SectionHeading
          title={t("faqTitle")}
          subtitle={t("faqSubtitle")}
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <details className="group rounded-2xl border border-white/10 bg-white/5 transition-all duration-200 hover:border-white/20 hover:bg-white/8">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 font-semibold text-white">
                  <span className="text-sm leading-snug">{faq.question}</span>
                  <ChevronDown className="h-4 w-4 text-white/50 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-white/10 px-4 py-3">
                  <p className="text-sm  leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
