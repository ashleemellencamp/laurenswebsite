import { ContactCTASection } from "@/components/home/ContactCTASection";
import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { ScrapbookCollageSection } from "@/components/home/ScrapbookCollageSection";
import { ValueSection } from "@/components/home/ValueSection";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ScrapbookCollageSection />
      <IntroSection />
      <ValueSection />
      <ContactCTASection backgroundSrc={getCtaBackground("home")} />
    </>
  );
}