export type InvestmentPackage = {
  id: string;
  number: string;
  title: string;
  description: string;
  coverageHours?: string;
  priceFrom?: string;
};

export function getInvestmentPricingLabel(pkg: InvestmentPackage) {
  return pkg.priceFrom ? `Starting at ${pkg.priceFrom}` : "Inquire for pricing";
}

export const investmentPackages: InvestmentPackage[] = [
  {
    id: "weddings",
    number: "I.",
    title: "Weddings",
    coverageHours: "6, 8, or 10 hours",
    description:
      "Full-day coverage from getting ready through reception, with a curated online gallery, print release, and planning support along the way. Every collection is tailored to your timeline, guest count, and priorities.",
    priceFrom: "$3,000",
  },
  {
    id: "elopements",
    number: "II.",
    title: "Elopements",
    coverageHours: "2 or 4 hours",
    description:
      "Intimate coverage for couples exchanging vows somewhere meaningful, whether that's a mountaintop, a courthouse, or somewhere halfway across the world. Includes travel coordination for select destinations.",
    priceFrom: "$1,750",
  },
  {
    id: "engagements",
    number: "III.",
    title: "Engagements",
    description:
      "Relaxed couple sessions crafted around your favorite places and the story you're stepping into. Includes a curated online gallery delivered within three weeks, perfect for save-the-dates and sharing the news.",
  },
  {
    id: "portraits",
    number: "IV.",
    title: "Portraits",
    description:
      "Family sessions, anniversaries, and milestone celebrations. Easygoing, guided sessions with a curated online gallery delivered within three weeks.",
    priceFrom: "$500",
  },
];
