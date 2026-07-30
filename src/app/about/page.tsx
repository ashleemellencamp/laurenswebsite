import type { Metadata } from "next";
import { AboutScrapbookSections } from "@/components/about/AboutScrapbookSections";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { TravelMapSection } from "@/components/experience/TravelMapSection";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Lauren Nichols — a Nashville wedding and portrait photographer capturing love across the South and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutScrapbookSections />
      <TravelMapSection />
      <ContactCTASection backgroundSrc={getCtaBackground("about")} />
    </>
  );
}
