"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { investmentPackages } from "@/lib/investment-packages";
import type { PortfolioCategoryId } from "@/lib/portfolio-categories";
import { getPortfolioCategoryCoverImage } from "@/lib/portfolio-galleries";
import { sectionPadding, sectionPaddingX } from "@/lib/section-padding";

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-3.5 text-slate transition-transform duration-200 lg:size-4 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function InvestmentPackagesSection() {
  const [activeId, setActiveId] = useState<string | null>(investmentPackages[0].id);
  const [imageId, setImageId] = useState(investmentPackages[0].id);
  const [accordionHeight, setAccordionHeight] = useState<number | null>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  function togglePackage(id: string) {
    if (activeId === id) {
      setActiveId(null);
      return;
    }

    setActiveId(id);
    setImageId(id);
  }

  const activeCoverImage = getPortfolioCategoryCoverImage(
    imageId as PortfolioCategoryId,
  );

  const imageColumnWidth = 420;
  const imageSizes =
    accordionHeight != null
      ? `(max-width: 1024px) 100vw, ${Math.max(
          imageColumnWidth,
          Math.ceil(accordionHeight * (2 / 3)),
        )}px`
      : `(max-width: 1024px) 100vw, ${imageColumnWidth}px`;

  useEffect(() => {
    const node = accordionRef.current;
    if (!node) return;

    function syncImageHeight() {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const current = accordionRef.current;
      setAccordionHeight(isDesktop && current ? current.offsetHeight : null);
    }

    syncImageHeight();

    const observer = new ResizeObserver(syncImageHeight);
    observer.observe(node);
    window.addEventListener("resize", syncImageHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncImageHeight);
    };
  }, [activeId]);

  return (
    <section className={`bg-cream ${sectionPadding}`}>
      <div
        className={`mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(280px,420px)_1fr] lg:items-stretch lg:gap-16 ${sectionPaddingX}`}
      >
        <div
          className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-0 lg:self-stretch"
          style={
            accordionHeight ? { height: `${accordionHeight}px` } : undefined
          }
        >
          <Image
            key={activeCoverImage.src}
            src={activeCoverImage.src}
            alt={activeCoverImage.alt}
            fill
            sizes={imageSizes}
            quality={90}
            className="object-cover object-center transition-opacity duration-300"
          />
        </div>

        <div ref={accordionRef}>
          <ul className="flex flex-col gap-4">
            {investmentPackages.map((pkg) => {
              const isActive = activeId === pkg.id;

              return (
                <li key={pkg.id}>
                  <div className="rounded-[2rem] bg-sage px-5 py-4 lg:px-7 lg:py-5">
                    <button
                      type="button"
                      onClick={() => togglePackage(pkg.id)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                      aria-expanded={isActive}
                    >
                      <span className="text-base leading-snug text-slate lg:text-lg">
                        {pkg.number} {pkg.title}
                      </span>
                      <span className="flex size-[37px] shrink-0 items-center justify-center rounded-full bg-blue-light">
                        <ChevronIcon isOpen={isActive} />
                      </span>
                    </button>

                    {isActive && (
                      <div className="mt-4 rounded-2xl bg-white p-5 lg:p-6">
                        <p className="text-sm leading-relaxed text-body lg:text-base">
                          {pkg.description}
                        </p>
                        <p className="mt-6 font-sans text-xs uppercase tracking-[0.12em] text-slate">
                          Prices begin at {pkg.priceFrom}
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
