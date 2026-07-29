import type { Metadata } from "next";

import { ContactCTASection } from "@/components/home/ContactCTASection";
import { PortfolioPageContent } from "@/components/portfolio/PortfolioPageContent";
import { ScrollToTopButton } from "@/components/portfolio/ScrollToTopButton";
import { getCtaBackground } from "@/lib/cta-backgrounds";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse engagement, wedding, and portrait photography — rooftop ceremonies, lakefront sessions, and sun-drenched celebrations across the South.",
};

type PortfolioPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <PortfolioPageContent initialCategory={category} />

      <ScrollToTopButton />

      <ContactCTASection backgroundSrc={getCtaBackground("portfolio")} />
    </>
  );
}
