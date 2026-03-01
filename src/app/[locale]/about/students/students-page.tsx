import { ContentContainer } from "@/components/content-container";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import { getTranslations } from "next-intl/server";
import { StudentRow } from "./student-row";
import { doctoralStudents, mastersStudents } from "./students-data";

export async function StudentsPage() {
  const t = await getTranslations("StudentsPage");
  const bt = await getTranslations("Breadcrumb");

  const labels = {
    supervisor: t("supervisor"),
    researchTopic: t("researchTopic"),
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
              { label: bt("students") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Doctoral Students */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            {t("doctoralStudents")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {doctoralStudents.map((student) => (
              <StudentRow
                key={student.name}
                student={student}
                labels={labels}
              />
            ))}
          </div>
        </section>

        {/* Masters Students */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">
            {t("mastersStudents")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mastersStudents.map((student) => (
              <StudentRow
                key={student.name}
                student={student}
                labels={labels}
              />
            ))}
          </div>
        </section>
      </ContentContainer>
    </>
  );
}
