import type { Metadata } from "next";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { BeyondTheLensSection } from "@/components/about/BeyondTheLensSection";
import { ThingsThatMoveMeSection } from "@/components/about/ThingsThatMoveMeSection";
import { TravelBucketListSection } from "@/components/about/TravelBucketListSection";
import { ContactCTASection } from "@/components/home/ContactCTASection";
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
      <BeyondTheLensSection />
      <ThingsThatMoveMeSection />
      <TravelBucketListSection />
      <ContactCTASection backgroundSrc={getCtaBackground("about")} />
    </>
  );
}
