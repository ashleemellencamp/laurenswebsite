"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

import { hexToRgba } from "@/lib/extract-gallery-accent-color";
import {
  getPortfolioGalleryScrollHint,
  usePortfolioGalleryScroll,
} from "@/hooks/usePortfolioGalleryScroll";
import type { PortfolioGallery, PortfolioGalleryImage } from "@/lib/portfolio-galleries";
import { sectionPaddingX } from "@/lib/section-padding";

import { PortfolioLightbox } from "./PortfolioLightbox";

type PortfolioGalleryCarouselProps = {
  gallery: PortfolioGallery;
  accentColor?: string;
};

const portraitFrameClass = "aspect-[2/3] w-[min(391px,70vw)]";
const galleryPageBg = "#fbf6f2";

function getGalleryEdgeFadeBase(accent: string, isActive: boolean) {
  return isActive
    ? `color-mix(in srgb, ${accent} 10%, ${galleryPageBg})`
    : galleryPageBg;
}

function getGalleryEdgeFadeGradient(side: "left" | "right", baseColor: string) {
  const direction = side === "left" ? "to right" : "to left";

  return `linear-gradient(${direction}, color-mix(in srgb, ${baseColor} 62%, transparent) 0%, color-mix(in srgb, ${baseColor} 22%, transparent) 42%, transparent 78%)`;
}

function GalleryScrollIndicator({
  scrollRef,
  accentColor,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
  accentColor?: string;
}) {
  const [metrics, setMetrics] = useState({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
  });

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const update = () => {
      setMetrics({
        scrollLeft: element.scrollLeft,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
      });
    };

    update();
    element.addEventListener("scroll", update, { passive: true });

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [scrollRef]);

  const maxScroll = metrics.scrollWidth - metrics.clientWidth;
  const thumbRatio =
    metrics.scrollWidth > 0 ? metrics.clientWidth / metrics.scrollWidth : 1;
  const thumbWidthPercent = Math.min(thumbRatio * 100, 100);
  const travelPercent = 100 - thumbWidthPercent;
  const thumbLeftPercent =
    maxScroll > 0 ? (metrics.scrollLeft / maxScroll) * travelPercent : 0;

  if (maxScroll <= 0) return null;

  return (
    <div className="relative h-1.5 w-full" aria-hidden>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: hexToRgba(accentColor ?? "#42586e", 0.16),
        }}
      />
      <div
        className="absolute top-0 h-full rounded-full transition-[left] duration-100 ease-out"
        style={{
          width: `${thumbWidthPercent}%`,
          left: `${thumbLeftPercent}%`,
          backgroundColor: accentColor ?? "var(--color-blue-light)",
        }}
      />
    </div>
  );
}

function GalleryImageFrame({
  image,
  galleryTitle,
  onOpen,
}: {
  image: PortfolioGalleryImage;
  galleryTitle: string;
  onOpen: () => void;
}) {
  const frameClass = image.aspectClass ?? portraitFrameClass;
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const didMoveRef = useRef(false);

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    didMoveRef.current = false;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!pointerStartRef.current) return;

    const dx = event.clientX - pointerStartRef.current.x;
    const dy = event.clientY - pointerStartRef.current.y;

    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      didMoveRef.current = true;
    }
  }

  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    if (didMoveRef.current) {
      event.preventDefault();
      return;
    }

    onOpen();
  }

  return (
    <div className={`relative shrink-0 overflow-hidden rounded-2xl ${frameClass}`}>
      {image.src ? (
        <button
          type="button"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onClick={handleOpen}
          className="absolute inset-0 z-10 cursor-zoom-in appearance-none border-0 bg-transparent p-0 touch-manipulation"
          aria-label={`View larger: ${image.alt ?? galleryTitle}`}
        >
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            fill
            draggable={false}
            sizes="(max-width: 640px) 70vw, 391px"
            className="pointer-events-none select-none object-cover"
          />
        </button>
      ) : (
        <div aria-hidden className={`size-full ${image.tone ?? "bg-slate/70"}`} />
      )}
    </div>
  );
}

export function PortfolioGalleryCarousel({
  gallery,
  accentColor,
}: PortfolioGalleryCarouselProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const {
    scrollRef,
    trackRef,
    galleryUnitRef,
    isGalleryHovered,
    isAtStart,
    isAtEnd,
    phase,
    canWheelScroll,
    isGalleryScrollActive,
    galleryUnitHandlers,
  } = usePortfolioGalleryScroll();

  const accent = accentColor ?? "#42586e";
  const activeBg = hexToRgba(accent, 0.1);
  const edgeFadeBase = getGalleryEdgeFadeBase(accent, isGalleryScrollActive);
  const scrollHint = getPortfolioGalleryScrollHint({
    canWheelScroll,
    isHovered: isGalleryHovered,
    phase,
  });

  const lightboxImages = gallery.images.flatMap((image) =>
    image.src ? [{ src: image.src, alt: image.alt ?? "" }] : [],
  );

  const openLightbox = (index: number) => {
    const image = gallery.images[index];
    if (!image?.src) return;

    const nextLightboxIndex = lightboxImages.findIndex(
      (item) => item.src === image.src,
    );

    if (nextLightboxIndex >= 0) {
      setLightboxIndex(nextLightboxIndex);
    }
  };

  return (
    <>
      <div className={`${sectionPaddingX} mt-10 lg:mt-12`}>
        <div
          ref={galleryUnitRef}
          className="relative"
          tabIndex={0}
          role="region"
          aria-label={`${gallery.title} photo gallery. Hover and scroll to explore.`}
          {...galleryUnitHandlers}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-5 -inset-y-4 rounded-[2rem] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.33,1,0.38,1)] lg:-inset-x-7 lg:-inset-y-5"
            style={{
              backgroundColor: activeBg,
              opacity: isGalleryScrollActive ? 1 : 0,
              transform: isGalleryScrollActive ? "scale(1)" : "scale(0.985)",
            }}
          />

          <div className="relative z-[1]">
            {!isAtStart && (
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 bottom-3 left-0 z-10 w-7 transition-[opacity,background] duration-500 ease-[cubic-bezier(0.33,1,0.38,1)] sm:w-8 lg:bottom-4 lg:w-10"
                style={{
                  background: getGalleryEdgeFadeGradient("left", edgeFadeBase),
                }}
              />
            )}
            {!isAtEnd && (
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 bottom-3 z-10 w-7 transition-[opacity,background] duration-500 ease-[cubic-bezier(0.33,1,0.38,1)] sm:w-8 lg:bottom-4 lg:w-10"
                style={{
                  background: getGalleryEdgeFadeGradient("right", edgeFadeBase),
                }}
              />
            )}

            <div
              ref={scrollRef}
              className={`scrollbar-hide overflow-x-auto overflow-y-hidden overscroll-x-contain pb-3 outline-none lg:pb-4 ${
                isGalleryScrollActive ? "cursor-ew-resize" : ""
              }`}
            >
              <div
                ref={trackRef}
                className="relative flex w-max flex-nowrap gap-4 lg:gap-6"
              >
                {gallery.images.map((image, index) => (
                  <GalleryImageFrame
                    key={image.id}
                    image={image}
                    galleryTitle={gallery.title}
                    onOpen={() => openLightbox(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-[1] mt-3 lg:mt-4">
            <div
              className={`flex items-center gap-4 ${
                isGalleryScrollActive ? "justify-between" : "justify-end"
              }`}
            >
              {isGalleryScrollActive ? (
                <div className="min-w-0 flex-1">
                  <GalleryScrollIndicator
                    scrollRef={scrollRef}
                    accentColor={accent}
                  />
                </div>
              ) : null}
              <p
                className={`shrink-0 text-right font-sans text-[0.62rem] uppercase tracking-[0.12em] transition-[color,opacity] duration-500 ${
                  isGalleryScrollActive ? "font-medium" : "text-body/60"
                }`}
                style={isGalleryScrollActive ? { color: accent } : undefined}
              >
                {scrollHint}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PortfolioLightbox
        images={lightboxImages}
        activeIndex={lightboxIndex}
        galleryTitle={gallery.title}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  );
}
