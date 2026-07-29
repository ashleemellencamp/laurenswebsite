import type { Metadata } from "next";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { ExperienceFAQSection } from "@/components/experience/ExperienceFAQSection";
import { ExperienceHeroSection } from "@/components/experience/ExperienceHeroSection";
import { JourneyBeginningSection } from "@/components/experience/JourneyBeginningSection";
import { MyStyleSection } from "@/components/experience/MyStyleSection";
import { PhilosophyQuoteSection } from "@/components/experience/PhilosophyQuoteSection";
import { TravelMapSection } from "@/components/experience/TravelMapSection";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Learn what it's like to work with Lauren Nichols — from first inquiry to final gallery, plus destination wedding travel availability.",
};

export default function ExperiencePage() {
  return (
    <div className="bg-cream">
      <ExperienceHeroSection />
      <JourneyBeginningSection />
      <PhilosophyQuoteSection />
      <MyStyleSection />
      <TravelMapSection />
      <ExperienceFAQSection />
      <ContactCTASection backgroundSrc={getCtaBackground("experience")} />
    </div>
  );
}
