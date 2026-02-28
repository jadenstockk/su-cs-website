import { ContentContainer } from "@/components/content-container";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
  return (
    <div
      className={cn(
        "relative pt-28 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-primary/40 via-background/80 to-background",
        className,
      )}
    >
      <ContentContainer>
        {breadcrumb && <div className="mb-6">{breadcrumb}</div>}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
            {subtitle}
          </p>
        )}
      </ContentContainer>
    </div>
  );
}
