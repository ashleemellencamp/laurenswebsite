import { PortfolioCategoryCard } from "@/components/home/PortfolioCategoryCard";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { portfolioHref } from "@/lib/portfolio-categories";
import { sectionPadding } from "@/lib/section-padding";
import { stripeBackground } from "@/lib/stripe-background";
import { featuredHeadlineClassName } from "@/lib/typography";

const portfolioCategories = [
  {
    title: "Engagements",
    description:
      "Relaxed sessions for couples celebrating what's next — golden hour drives, favorite places, and photos that feel like you.",
    href: portfolioHref("engagements"),
    imageSrc: "/images/portfolio/nunelly-lake-session/01.jpg",
    imageAlt: "Couple sitting together on a wooden dock over a lake",
  },
  {
    title: "Weddings",
    description:
      "Full-day coverage for celebrations big or small, focused on connection, happy tears, and all the moments that tell the full story of your day.",
    href: portfolioHref("weddings"),
    imageSrc: "/images/home/weddings-card.jpg",
    imageAlt: "Bride holding a floral bouquet",
  },
  {
    title: "Elopements",
    description:
      "Intimate, flexible coverage for couples who want to keep things simple, intentional, and centered around the two of you.",
    href: portfolioHref("elopements"),
    imageSrc: "/images/home/elopements-card.jpg",
    imageAlt: "Couple embracing in a forest",
  },
  {
    title: "Portraits",
    description:
      "Families, anniversaries, and everyday stories. Easygoing sessions that feel like hanging out together, with a camera third-wheeling.",
    href: portfolioHref("portraits"),
    imageSrc: "/images/home/portraits-card.jpg",
    imageAlt: "Close-up portrait of a couple",
  },
] as const;

export function IntroSection() {
  return (
    <section
      className={sectionPadding}
      style={{ backgroundImage: stripeBackground }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <SectionEyebrow className="text-center">The Portfolio</SectionEyebrow>
        <h2 className={`max-w-2xl ${featuredHeadlineClassName}`}>
          However You Celebrate, I&apos;m In
        </h2>

        <div className="mt-12 grid w-full grid-cols-1 gap-6 overflow-visible py-2 sm:grid-cols-2 sm:py-6 lg:mt-14 lg:grid-cols-4 lg:gap-6 lg:py-8">
          {portfolioCategories.map((category) => (
            <PortfolioCategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
