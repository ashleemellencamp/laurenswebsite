"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { PortfolioFilterBar } from "@/components/portfolio/PortfolioFilterBar";
import { PortfolioGallerySection } from "@/components/portfolio/PortfolioGallerySection";
import {
  parsePortfolioFilter,
  type PortfolioFilterId,
} from "@/lib/portfolio-categories";
import { filterGalleriesByCategory } from "@/lib/portfolio-galleries";
import { sectionPadding, sectionPaddingX } from "@/lib/section-padding";

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
      <section className={`bg-cream text-center ${sectionPaddingX} pt-12 pb-8 lg:pt-16 lg:pb-10`}>
        <h1 className="text-4xl leading-tight lg:text-5xl">Portfolio</h1>
        <div className="mt-6">
          <PortfolioFilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </section>

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
