export type InvestmentPackage = {
  id: string;
  number: string;
  title: string;
  description: string;
  priceFrom: string;
};

export const investmentPackages: InvestmentPackage[] = [
  {
    id: "weddings",
    number: "I.",
    title: "Weddings",
    description:
      "Full-day coverage from getting ready through reception, with a curated online gallery, print release, and planning support along the way. Every collection is tailored to your timeline, guest count, and priorities.",
    priceFrom: "$4,800",
  },
  {
    id: "elopements",
    number: "II.",
    title: "Elopements",
    description:
      "Intimate coverage for couples exchanging vows somewhere meaningful — whether that's a mountaintop, a courthouse, or somewhere halfway across the world. Includes travel coordination for select destinations.",
    priceFrom: "$2,800",
  },
  {
    id: "engagements",
    number: "III.",
    title: "Engagements",
    description:
      "Relaxed couple sessions crafted around your favorite places and the story you're stepping into. Includes a curated online gallery delivered within three weeks — perfect for save-the-dates and sharing the news.",
    priceFrom: "$650",
  },
  {
    id: "portraits",
    number: "IV.",
    title: "Portraits",
    description:
      "Family sessions, anniversaries, and milestone celebrations. Easygoing, guided sessions with a gallery delivered within three weeks.",
    priceFrom: "$650",
  },
];
