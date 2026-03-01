import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { InfoCard } from "@/components/programmes/info-card";
import { PageHero } from "@/components/programmes/page-hero";
import {
  ArrowRight,
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const bt = await getTranslations("Breadcrumb");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumb={
          <BreadcrumbNav
            items={[{ label: bt("home"), href: "/" }, { label: bt("contact") }]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Email enquiries */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("emailTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: t("adminEnquiries"),
                email: "secretary@cs.sun.ac.za",
              },
              {
                label: t("pgEnquiries"),
                email: "postgrad@cs.sun.ac.za",
              },
              {
                label: t("ugEnquiries"),
                email: "undergrad@cs.sun.ac.za",
              },
            ].map((item) => (
              <GlassPanel
                key={item.email}
                variant="default"
                rounded="xl"
                blur="lg"
                className="p-6 transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:shadow-black/10"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.label}
                </h3>
                <a
                  href={`mailto:${item.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-2"
                >
                  {item.email}
                </a>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Phone & Fax */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("phoneTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassPanel
              variant="default"
              rounded="xl"
              blur="lg"
              className="flex items-center gap-4 p-6"
            >
              <Phone className="h-5 w-5 text-white/60 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {t("telephone")}
                </h3>
                <a
                  href="tel:+27218084232"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  +27 21 808 4232
                </a>
              </div>
            </GlassPanel>
            <GlassPanel
              variant="default"
              rounded="xl"
              blur="lg"
              className="flex items-center gap-4 p-6"
            >
              <Phone className="h-5 w-5 text-white/60 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {t("fax")}
                </h3>
                <span className="text-sm text-white/60">+27 86 603 7130</span>
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* Addresses */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("addressesTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              title={t("postalTitle")}
              icon={<Mail className="h-5 w-5" />}
            >
              <p>Computer Science Division,</p>
              <p>Dept of Mathematical Sciences,</p>
              <p>Stellenbosch University</p>
              <p>Private Bag X1, 7602 Matieland, SOUTH AFRICA</p>
            </InfoCard>
            <InfoCard
              title={t("physicalTitle")}
              icon={<MapPin className="h-5 w-5" />}
            >
              <p>Computer Science,</p>
              <p>Stellenbosch University</p>
              <p>Decanting Facility, Hammanshand Road</p>
              <p>7600 Stellenbosch, SOUTH AFRICA</p>
            </InfoCard>
          </div>
        </section>

        {/* Visit us */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-5 w-5 text-white/50" />
              {t("visitTitle")}
            </span>
          </h2>
          <GlassPanel variant="default" rounded="xl" blur="lg" className="p-6">
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              {t("visitText")}
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/50">
              <span>
                <span className="font-medium text-white/70">
                  {t("coordinates")}:
                </span>{" "}
                33° 55′ 30.90″ S, 18° 51′ 55.10″ E
              </span>
            </div>
          </GlassPanel>

          {/* Google Maps embed */}
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <iframe
              title="Computer Science Department Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.7!2d18.8653!3d-33.9253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcdb4e25c9c4c01%3A0x1234567890abcdef!2sStellenbosch%20University%20Engineering!5e0!3m2!1sen!2sza!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </section>

        {/* Quick links */}
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="p-6 border-white/10"
        >
          <h3 className="text-base font-semibold text-white mb-3">
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4 text-white/50" />
              {t("quickLinksTitle")}
            </span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: t("contactUniversity"),
                href: "https://www.su.ac.za/contact-us",
                external: true,
              },
              {
                label: t("exploreProgrammes"),
                href: "/programmes/undergraduate/prospective",
                external: false,
              },
              {
                label: t("researchGroups"),
                href: "/research",
                external: false,
              },
            ].map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label} <ArrowRight className="h-3 w-3" />
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label} <ArrowRight className="h-3 w-3" />
                </a>
              ),
            )}
          </div>
        </GlassPanel>
      </ContentContainer>
    </>
  );
}
