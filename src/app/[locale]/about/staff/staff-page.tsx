import { ContentContainer } from "@/components/content-container";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import { getTranslations } from "next-intl/server";
import { StaffCard } from "./staff-card";
import { academicStaff, administrativeStaff } from "./staff-data";

export async function StaffPage() {
  const t = await getTranslations("StaffPage");
  const bt = await getTranslations("Breadcrumb");

  const labels = {
    office: t("office"),
    website: t("website"),
    researchInterests: t("researchInterests"),
  };

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumb={
          <BreadcrumbNav
            items={[
              { label: bt("home"), href: "/" },
              { label: bt("about"), href: "/about/department" },
              { label: bt("staff") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Academic Staff */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            {t("academicStaff")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {academicStaff.map((member) => (
              <StaffCard key={member.name} member={member} labels={labels} />
            ))}
          </div>
        </section>

        {/* Administrative Staff */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">
            {t("administrativeStaff")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {administrativeStaff.map((member) => (
              <StaffCard key={member.name} member={member} labels={labels} />
            ))}
          </div>
        </section>
      </ContentContainer>
    </>
  );
}
