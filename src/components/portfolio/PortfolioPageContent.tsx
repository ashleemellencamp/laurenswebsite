"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { PortfolioFilterBar } from "@/components/portfolio/PortfolioFilterBar";
import { PortfolioGallerySection } from "@/components/portfolio/PortfolioGallerySection";
import { InteriorPageHero } from "@/components/ui/InteriorPageHero";
import {
  parsePortfolioFilter,
  type PortfolioFilterId,
} from "@/lib/portfolio-categories";
import { filterGalleriesByCategory } from "@/lib/portfolio-galleries";
import { sectionPadding } from "@/lib/section-padding";

type PortfolioPageContentProps = {
  initialCategory?: string;
};

export function PortfolioPageContent({
  initialCategory,
}: PortfolioPageContentProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterId>(() =>
    parsePortfolioFilter(initialCategory),
  );

  const visibleGalleries = filterGalleriesByCategory(activeFilter);

  const handleFilterChange = useCallback(
    (filter: PortfolioFilterId) => {
      setActiveFilter(filter);

      const nextUrl =
        filter === "all" ? "/portfolio" : `/portfolio?category=${filter}`;

      router.replace(nextUrl, { scroll: false });
    },
    [router],
  );

  return (
    <>
      <InteriorPageHero
        eyebrow="The Portfolio"
        headline="Some stories I've been lucky to tell."
      >
        <div className="mt-8">
          <PortfolioFilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </InteriorPageHero>

      <div id="portfolio-galleries" className="bg-cream">
        {visibleGalleries.length > 0 ? (
          visibleGalleries.map((gallery) => (
            <PortfolioGallerySection key={gallery.id} gallery={gallery} />
          ))
        ) : (
          <section className={`text-center ${sectionPadding}`}>
            <p className="text-base leading-relaxed text-body">
              Galleries for this category are coming soon. Try another filter or
              view the full portfolio.
            </p>
          </section>
        )}
      </div>
    </>
  );
}
