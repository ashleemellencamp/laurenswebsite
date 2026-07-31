import type { Metadata } from "next";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { InvestmentHeroSection } from "@/components/investment/InvestmentHeroSection";
import { InvestmentIntroSection } from "@/components/investment/InvestmentIntroSection";
import { InvestmentPackagesSection } from "@/components/investment/InvestmentPackagesSection";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export const metadata: Metadata = {
  title: "Investment",
  description:
    "Wedding, elopement, and portrait photography collections with transparent starting prices and thoughtfully tailored coverage.",
};

export default function InvestmentPage() {
  return (
    <>
      <InvestmentHeroSection />
      <InvestmentIntroSection />
      <InvestmentPackagesSection />
      <ContactCTASection backgroundSrc={getCtaBackground("investment")} />
    </>
  );
}
