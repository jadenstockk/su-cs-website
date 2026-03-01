import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AlumniPage } from "./alumni-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("aboutAlumniTitle"),
    description: t("aboutAlumniDescription"),
    alternates: {
      canonical: `/${locale}/about/alumni`,
      languages: {
        en: "/en/about/alumni",
        af: "/af/about/alumni",
        xh: "/xh/about/alumni",
      },
    },
  };
}

export default function Page() {
  return <AlumniPage />;
}
