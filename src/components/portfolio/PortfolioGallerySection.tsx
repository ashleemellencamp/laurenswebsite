"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  extractGalleryAccentColor,
  hexToRgba,
} from "@/lib/extract-gallery-accent-color";
import {
  getPortfolioCategoryLabel,
  portfolioHref,
} from "@/lib/portfolio-categories";
import type { PortfolioGallery } from "@/lib/portfolio-galleries";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";
import { contentTitleClassName } from "@/lib/typography";

import { PortfolioGalleryCarousel } from "./PortfolioGalleryCarousel";

type PortfolioGallerySectionProps = {
  gallery: PortfolioGallery;
};

const DEFAULT_ACCENT = "#42586e";

export function PortfolioGallerySection({
  gallery,
}: PortfolioGallerySectionProps) {
  const categoryLabel = getPortfolioCategoryLabel(gallery.category);
  const imageSources = useMemo(
    () =>
      gallery.images
        .map((image) => image.src)
        .filter((src): src is string => Boolean(src)),
    [gallery.images],
  );

  const [accentColor, setAccentColor] = useState(
    gallery.accentColor ?? DEFAULT_ACCENT,
  );

  useEffect(() => {
    if (gallery.accentColor) {
      setAccentColor(gallery.accentColor);
      return;
    }

    if (imageSources.length === 0) {
      setAccentColor(DEFAULT_ACCENT);
      return;
    }

    let cancelled = false;

    extractGalleryAccentColor(imageSources).then((color) => {
      if (!cancelled && color) {
        setAccentColor(color);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [gallery.accentColor, gallery.id, imageSources]);

  const themeStyle = {
    "--gallery-accent": accentColor,
    "--gallery-accent-soft": hexToRgba(accentColor, 0.14),
    "--gallery-accent-border": hexToRgba(accentColor, 0.28),
  } as React.CSSProperties;

  return (
    <section
      className={`gallery-themed border-b border-slate/10 bg-cream ${sectionPaddingY}`}
      style={themeStyle}
    >
      <div className={sectionPaddingX}>
        <div className="flex items-start justify-between gap-6">
          <h2
            className={`${contentTitleClassName} transition-colors duration-700 ease-out`}
            style={{ color: accentColor }}
          >
            {gallery.title}
          </h2>
          <Link
            href={portfolioHref(gallery.category)}
            className="shrink-0 rounded-full border px-4 py-1.5 font-serif text-xs uppercase tracking-[0.05em] transition-[color,border-color,background-color] duration-700 ease-out hover:bg-[var(--gallery-accent-soft)]"
            style={{
              color: accentColor,
              borderColor: "var(--gallery-accent-border)",
            }}
          >
            {categoryLabel}
          </Link>
        </div>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-body">
          {gallery.description}
        </p>
      </div>

      <PortfolioGalleryCarousel gallery={gallery} accentColor={accentColor} />
    </section>
  );
}
