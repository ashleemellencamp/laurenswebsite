import type { Metadata } from "next";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { ExperienceFAQSection } from "@/components/experience/ExperienceFAQSection";
import { ExperienceHeroSection } from "@/components/experience/ExperienceHeroSection";
import { JourneyBeginningSection } from "@/components/experience/JourneyBeginningSection";
import { ExperienceStyleSections } from "@/components/experience/ExperienceStyleSections";
import { PhilosophyQuoteSection } from "@/components/experience/PhilosophyQuoteSection";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Learn what it's like to work with Lauren Nichols — from first inquiry to final gallery.",
};

export default function ExperiencePage() {
  return (
    <div className="bg-cream">
      <ExperienceHeroSection />
      <JourneyBeginningSection />
      <PhilosophyQuoteSection />
      <ExperienceStyleSections />
      <ExperienceFAQSection />
      <ContactCTASection backgroundSrc={getCtaBackground("experience")} />
    </div>
  );
}
