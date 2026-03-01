import { ContentContainer } from "@/components/content-container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { GoBackButton } from "./go-back-button";

export default async function NotFoundContent() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-svh items-center justify-center bg-background">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-su-maroon/10 blur-[120px]" />
      </div>

      <ContentContainer className="relative z-10 flex flex-col items-center py-20 text-center">
        {/* 404 */}
        <span className="text-[10rem] sm:text-[14rem] md:text-[18rem] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-white/20 to-white/[0.03] bg-clip-text text-transparent select-none">
          {t("title")}
        </span>

        {/* Heading + description */}
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {t("heading")}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          {t("description")}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="white" size="lg" slideReveal>
              {t("goHome")}
            </Button>
          </Link>
          <GoBackButton label={t("goBack")} />
        </div>
      </ContentContainer>
    </main>
  );
}
