import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/home/contact";
import { FeaturesSection } from "@/components/home/features";
import { HeroSection } from "@/components/home/hero-section";
import { ProgrammesSection } from "@/components/home/programmes";
import { StatsSection } from "@/components/home/stats";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProgrammesSection />
      <ContactSection />
      <Footer />
    </>
  );
}
