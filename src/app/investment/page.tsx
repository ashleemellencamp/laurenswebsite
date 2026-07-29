import type { Metadata } from "next";
import { ContactCTASection } from "@/components/home/ContactCTASection";
import { InvestmentHeroSection } from "@/components/investment/InvestmentHeroSection";
import { InvestmentPackagesSection } from "@/components/investment/InvestmentPackagesSection";
import { InvestmentPhilosophySection } from "@/components/investment/InvestmentPhilosophySection";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export const metadata: Metadata = {
  title: "Investment",
  description:
    "Wedding, elopement, and portrait photography collections — transparent starting prices and thoughtfully tailored coverage.",
};

export default function InvestmentPage() {
  return (
    <>
      <InvestmentHeroSection />
      <InvestmentPhilosophySection />
      <InvestmentPackagesSection />
      <ContactCTASection backgroundSrc={getCtaBackground("investment")} />
    </>
  );
}
