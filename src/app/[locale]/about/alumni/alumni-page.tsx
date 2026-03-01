import { getTranslations } from "next-intl/server";
import { ContentContainer } from "@/components/content-container";
import { FadeIn } from "@/components/fade-in";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import {
  type AlumniGraduate,
  alumniFaculty,
  doctoralGraduates,
  mastersGraduates,
} from "./alumni-data";

function GraduateGroup({
  graduates,
  year,
}: {
  graduates: AlumniGraduate[];
  year: number;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white/80 mb-3">{year}</h3>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {graduates.map((g) => (
          <GlassPanel
            key={`${g.name}-${g.year}`}
            variant="default"
            rounded="xl"
            blur="lg"
            className="p-4 transition-all duration-300 hover:bg-white/15"
          >
            <p className="text-sm font-semibold text-white">{g.name}</p>
            <p className="mt-1 text-xs text-white/45 leading-relaxed">
              {g.thesisTitle}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}

export async function AlumniPage() {
  const t = await getTranslations("AlumniPage");
  const bt = await getTranslations("Breadcrumb");

  // Group graduates by year
  const groupByYear = (graduates: AlumniGraduate[]) => {
    const groups: Record<number, AlumniGraduate[]> = {};
    for (const g of graduates) {
      if (!groups[g.year]) groups[g.year] = [];
      groups[g.year].push(g);
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, grads]) => ({ year: Number(year), graduates: grads }));
  };

  const doctoralByYear = groupByYear(doctoralGraduates);
  const mastersByYear = groupByYear(mastersGraduates);

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
              { label: bt("alumni") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Alumni Faculty */}
        <FadeIn>
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              {t("alumniFaculty")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {alumniFaculty.map((name) => (
                <GlassPanel
                  key={name}
                  variant="default"
                  rounded="xl"
                  blur="lg"
                  className="px-4 py-3 transition-all duration-300 hover:bg-white/15"
                >
                  <p className="text-sm font-medium text-white/80">{name}</p>
                </GlassPanel>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Doctoral Graduates */}
        <FadeIn delay={0.05}>
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              {t("doctoralGraduates")}
            </h2>
            <div className="space-y-8">
              {doctoralByYear.map(({ year, graduates }) => (
                <GraduateGroup key={year} year={year} graduates={graduates} />
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Masters Graduates */}
        <FadeIn delay={0.05}>
          <section>
            <h2 className="text-2xl font-bold text-white mb-8">
              {t("mastersGraduates")}
            </h2>
            <div className="space-y-8">
              {mastersByYear.map(({ year, graduates }) => (
                <GraduateGroup key={year} year={year} graduates={graduates} />
              ))}
            </div>
          </section>
        </FadeIn>
      </ContentContainer>
    </>
  );
}
