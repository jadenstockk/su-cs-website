import { Navbar } from "@/components/navbar";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";

const suRaleway = localFont({
  variable: "--font-su-raleway",
  src: [
    {
      path: "../fonts/SU-raleway-thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-thinitalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-extralight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-extralightitalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-lightitalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-mediumitalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-semibolditalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-bolditalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-extrabold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-extrabolditalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/SU-raleway-black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/SU-raleway-blackitalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "en" | "af" | "xh")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} className="dark">
      <body
        className={`${suRaleway.variable} min-h-svh bg-background font-sans text-foreground antialiased`}
      >
        <NextIntlClientProvider>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
