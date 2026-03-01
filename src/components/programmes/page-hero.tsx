"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ContentContainer } from "@/components/content-container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: ReactNode;
  className?: string;
}

/**
 * Consistent hero header for programme sub-pages.
 */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
  className,
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative pt-28 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-primary/40 via-background/80 to-background",
        className,
      )}
    >
      <ContentContainer>
        {breadcrumb && (
          <motion.div
            className="mb-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {breadcrumb}
          </motion.div>
        )}
        <motion.h1
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </ContentContainer>
    </div>
  );
}
