import { portfolioGalleries } from "@/lib/portfolio-galleries";

export type CtaPageId = "home" | "about" | "portfolio" | "investment" | "experience";

/** All portfolio images available for CTA backgrounds. */
export const portfolioCtaImages = portfolioGalleries.flatMap((gallery) =>
  gallery.images.flatMap((image) => (image.src ? [image.src] : [])),
);

const ctaBackgroundsByPage: Record<CtaPageId, string> = {
  home: "/images/portfolio/manchester-wedding/01.jpg",
  about: "/images/portfolio/mcminnville-wedding/04.jpg",
  portfolio: "/images/portfolio/las-vegas-wedding/01.jpg",
  investment: "/images/portfolio/franklin-engagement/01.jpg",
  experience: "/images/portfolio/flagstaff-engagement/01.jpg",
};

export function getCtaBackground(page: CtaPageId) {
  return ctaBackgroundsByPage[page];
}
