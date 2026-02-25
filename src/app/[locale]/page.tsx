import { HeroSection } from "@/components/hero-section";
import {
  ContactSection,
  FeaturesSection,
  Footer,
  ProgrammesSection,
  StatsSection,
} from "@/components/sections";

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
