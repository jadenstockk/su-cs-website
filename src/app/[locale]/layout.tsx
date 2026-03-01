import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { routing } from "@/i18n/routing";
import { suRaleway } from "../fonts";
import "../globals.css";

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

  const mod = await import(`@/i18n/messages/${locale}/common.json`);
  const m = mod.default.Metadata as Record<string, string>;

  const title = m.title;
  const description = m.description;
  const siteUrl = "https://cs.sun.ac.za";

  return {
    title: {
      default: title,
      template: `%s | CS - Stellenbosch University`,
    },
    description,
    keywords: m.keywords,
    authors: [
      {
        name: "Department of Computer Science, Stellenbosch University",
        url: siteUrl,
      },
    ],
    creator: "Stellenbosch University Computer Science Department",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        af: "/af",
        xh: "/xh",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "af" ? "af_ZA" : locale === "xh" ? "xh_ZA" : "en_ZA",
      url: `${siteUrl}/${locale}`,
      siteName: title,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
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
          <PageTransition>{children}</PageTransition>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
