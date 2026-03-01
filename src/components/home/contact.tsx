"use client";

import { ContentContainer } from "@/components/content-container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function ContactSection({ className }: { className?: string }) {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className={cn("py-24 sm:py-32", className)}>
      <ContentContainer size="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Layered gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-su-maroon via-su-maroon/90 to-su-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,160,96,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,38,59,0.3),transparent_50%)]" />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-8 py-16 text-center sm:px-16 sm:py-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm"
            >
              <Mail className="h-8 w-8 text-white/80" />
            </motion.div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="white" size="lg" asChild>
                <Link href="/contact" className="group">
                  {t("contactDepartment")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a
                  href="https://www.su.ac.za/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("contactUniversity")}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </ContentContainer>
    </section>
  );
}
